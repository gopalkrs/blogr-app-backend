import mongoose from "mongoose";
import { User } from "../models/models.js";
import jwt from "jsonwebtoken";


const checkUserRole = async (req, res, next) => {
  try {
    const userId = req.userId;

    console.log(userId);
    try{
      const userIdObject = new mongoose.Types.ObjectId(userId);
      
      const userData = await User.findById(userId);

      if(userData.role === 'user'){
        return res.status(403).json({ message: "You are not authorized to perform this request" });
      }
      next();
    }catch(err) {
      console.log(err)
      return res.status(401).json({ message: "Error verifying user" });
    }

    // const { userId } = req.body;

    // if (!userId) {
    //     return res.status(400).json({ message: "UserId is required" });
    // }

    // const doesUserExist = await User.findById(userId);
    // if (!doesUserExist) {
    //   return res.status(400).json({ message: "User does not exist" });
    // }

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error while fetching user" });
  }
};

export default checkUserRole;
