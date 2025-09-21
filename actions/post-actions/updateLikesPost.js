import { Blog, Like } from "../../models/models.js";

const updateLikesPost = async (req, res) => {
    const {postId} = req.params;
    const {userId} = req;

    try {
        if(!postId){
            return res.status(400).json({success: false, message: "Post ID is required" });
        }
        
        const likedPost = await Like.findOne({userId, blogId: postId});
        if(likedPost){
            return res.status(400).json({success: false, message: "Post already liked" });
        }
        const newLike = new Like({userId, blogId: postId});
        await newLike.save();
        await Blog.findByIdAndUpdate(postId, { $inc: { likes: 1 }});
        res.status(200).json({success: true, message: "Post Liked", post: likedPost});
    }catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Error liking post" });
    }


}

export default updateLikesPost;