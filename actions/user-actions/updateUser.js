import jwt from "jsonwebtoken";
import { User } from "../../models/models.js";
import mongoose from "mongoose";
const COOKIE_NAME = "sessionToken";
const updateUser = async (req, res) => {
  const token = req.cookies[COOKIE_NAME];

  // if (!token) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded)
      return res.status(401).json({ message: "Error authorizing user" });

    req.userId = decoded.id;
    const userId = new mongoose.Types.ObjectId(decoded.id);

    // const isValid = loginSchema.safeParse(req.body);
    // if (!isValid.success) {
    //   return res
    //     .status(400)
    //     .json({ message: "Invalid inputs", errors: isValid.error.errors });
    // }

    const { name, role } = req.body;

    const userData = await User.findByIdAndUpdate(userId, {name : name, role : role} );

    if(!userData) return res.status(401).json({message : "Error while updating user"})
    // req.body.userId = decoded.id;
    return res.status(200).json({
      message: "User Updated",
      user: {
        email: userData.email,
        name: userData.name,
        id: userData._id,
        role: userData.role,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Error verifying user" });
  }
};

export default updateUser;
