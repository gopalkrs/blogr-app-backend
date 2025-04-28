import { User } from "../../models/models.js";
import signupSchema from "../../schema/signupSchema.js";
import {hashPassword} from "../../utils/passwordHasher.js";

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
        res.status(201).json({ message: 'User created', user: newUser });
    
    }catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default createUser;