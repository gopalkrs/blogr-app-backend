import mongoose from "mongoose";
import { Blog } from "../../models/models.js";

const getSinglePosts = async (req, res) => {
    try{
        const { postId } = req.params;
        // if(!userId) {
        //     return res.status(400).json({ message: 'All fields are required' });
        // }

        const userPosts = await Blog.findById(postId);

        const post = await Blog.aggregate([
              {
                $match: { _id: new mongoose.Types.ObjectId(postId) }, // Make sure to convert to ObjectId
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
        //console.log(post);
        if(!userPosts) return res.status(400).json({ message: 'No post created' });
        // if(userPosts.length === 0) {
        //     return res.status(400).json({ message: 'No post created' });
        // }
        res.status(201).json({ message: 'Fetching succesfull', posts: post });
    
    }catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching posts' });
    }
}

export default getSinglePosts;