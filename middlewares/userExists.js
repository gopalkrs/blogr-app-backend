import { User } from "../models/models.js";

const userExists = async (req, res, next) => {
  try {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "UserId is required" });
    }

    const doesUserExist = await User.findById(userId);
    if (!doesUserExist) {
      return res.status(400).json({ message: "User does not exist" });
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error while fetching user" });
  }
};

export default userExists;
