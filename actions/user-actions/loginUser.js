import { User } from "../../models/models.js";
import loginSchema from "../../schema/loginSchema.js";
import { comparePassword } from "../../utils/passwordHasher.js";
import jwt from "jsonwebtoken";
const COOKIE_NAME = 'sessionToken';


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isValid = loginSchema.safeParse(req.body);
    if (!isValid.success) {
      return res
        .status(400)
        .json({ message: "Invalid inputs", errors: isValid.error.errors });
    }

    // if(!email || !password) {
    //     return res.status(400).json({ message: 'All fields are required' });
    // }
    const doesUserExist = await User.findOne({ email });

    if (!doesUserExist) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isPasswordCorrect = await comparePassword(
      password,
      doesUserExist.hashedPassword
    );
    // console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }

    const token = jwt.sign({ id: doesUserExist._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(201).json({ message: "User logged in", user: doesUserExist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default loginUser;
