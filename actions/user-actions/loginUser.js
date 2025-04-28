import { User } from "../../models/models.js";
import loginSchema from "../../schema/loginSchema.js";
import { comparePassword } from "../../utils/passwordHasher.js";

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
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }

    res.status(201).json({ message: "User logged in", user: doesUserExist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default loginUser;
