import { User } from "../../models/models.js";
import signupSchema from "../../schema/signupSchema.js";
import {hashPassword} from "../../utils/passwordHasher.js";
import { sessionCreator } from "../../utils/sessionCreator.js";
import jwt from "jsonwebtoken";
const COOKIE_NAME = 'sessionToken';

const createUser = async (req, res) => {
    try{
        const { name, email, password, role } = req.body;

        const isValid = signupSchema.safeParse(req.body);
        if (!isValid.success) {
            return res.status(400).json({ message: 'Invalid inputs', errors: isValid.error.errors });
        }
    
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({ email, hashedPassword, name, role });
        if(!newUser) {
            return res.status(500).json({ message: 'User creation failed' });
        }

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

        res.cookie(COOKIE_NAME, token,{
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        res.status(201).json({ message: 'User created', user: newUser });
    
    }catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default createUser;