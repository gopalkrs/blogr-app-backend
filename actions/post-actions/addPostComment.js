import mongoose from "mongoose";
import { Blog, Comment } from "../../models/models.js";

const addPostComment = async (req, res) => {
    const {userId} = req;
    const {postId} = req.params;
    const {comment} = req.body;

    if(!userId || !postId || !comment){
        return res.status(400).json({success: false, message: "Post ID and comment are required" });
    }

     if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ success: false, message: "Invalid User ID or Post ID" });
    }

    if (typeof comment !== "string" || comment.trim().length === 0) {
        return res.status(400).json({ success: false, message: "Comment must be a non-empty string" });
    }

    // Optional: Check if post exists
    const postExists = await Blog.findById(postId);
    if (!postExists) {
        return res.status(404).json({ success: false, message: "Post not found" });
    }

    try{
        const newComment = new Comment({userId, blogId: postId, comment});
        await newComment.save();

        res.status(200).json({success: true, message: "Comment added", comment: newComment});
        
    }catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Error adding comment" });
    }
}

export default addPostComment;