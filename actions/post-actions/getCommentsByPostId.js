import mongoose from "mongoose";
import { Blog, Comment } from "../../models/models.js";

const getCommentsByPostId = async (req, res) => {
    const {postId} = req.params;
    const {userId} = req;
    if(!postId){
        return res.status(400).json({success: false, message: "Post ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ success: false, message: "Invalid Post ID" });
    }

    const postExists = await Blog.findById(postId);
    if (!postExists) {
        return res.status(404).json({ success: false, message: "Post not found" });
    }

    try{
        const comments = await Comment.aggregate([
            { $match: { blogId: new mongoose.Types.ObjectId(postId) } },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userInfo"
                }
            },
            {
                $unwind: "$userInfo"
            },
            {
                $project: {
                    _id: 1,
                    comment: "$comment",
                    date: 1,
                    userId: 1,
                    userName: "$userInfo.name"
                }
            }
        ]);
        console.log(comments);
        res.status(200).json({success: true, message: "Comments fetched", comments});

    }catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Error fetching comments" });
    }
}

export default getCommentsByPostId;