import mongoose from "mongoose";
import { Like } from "../../models/models.js";

const getLikedPostById = async (req, res) => {
    try {
        const {postId} = req.params;
        const {userId} = req;
        if(!postId){
            return res.status(400).json({success: false, message: "Post ID is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid Post ID or User ID" });
        }

        const likedPost = await Like.findOne({userId, blogId: postId});
        if(!likedPost){
            return res.status(400).json({success: false, message: "Post Not Liked By User" });
        }
        res.status(200).json({success: true, message: "Post is liked by user", post: likedPost});
    }catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Error fetching liked post by user" });
    }
}

export default getLikedPostById;