import mongoose from "mongoose";
import { Blog } from "../../models/models.js";

const getPostsById = async (req, res) => {
  try {
    const { userId } = req;
    // if(!userId) {
    //     return res.status(400).json({ message: 'All fields are required' });
    // }
    const userPosts = await Blog.find({ userId: userId });
    const allUserPosts = await Blog.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) }, // Make sure to convert to ObjectId
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);
    //console.log(allUserPosts);

    if (!allUserPosts)
      return res.status(404).json({ message: "No post found", posts: null });
    if (allUserPosts.length === 0) {
      return res.status(400).json({ message: "No post exists" });
    }
    res.status(201).json({ message: "Fetching succesfull", posts: allUserPosts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

export default getPostsById;
