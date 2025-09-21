import { User } from "../models/models.js";
import jwt from "jsonwebtoken";
const COOKIE_NAME = 'sessionToken';


const userIsLogged = async (req, res, next) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    //console.log("Token from cookie:", token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // console.log(decoded);
      req.userId = decoded.id;
      // req.body.userId = decoded.id;
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

export default userIsLogged;
