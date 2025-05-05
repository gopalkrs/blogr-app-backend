import mongoose from "mongoose";
import { User } from "../models/models.js";


const checkUserRole = async (req, res, next) => {
  try {
    const userId = req.userId;

    
    try{
      const userIdObject = new mongoose.Types.ObjectId(userId);
      
      const userData = await User.findById(userIdObject);
      console.log(userData);
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (userData.role === "admin") {
        return next(); // only proceed if admin
      }
      return res.status(403).json({ message: "You are not authorized to perform this request" });
    
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
