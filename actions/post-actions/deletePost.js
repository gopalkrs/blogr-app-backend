import { Blog } from "../../models/models.js";

const deleteposts = async (req, res) => {
    try{
        const { userId, postId } = req.params;
        // if(!userId) {
        //     return res.status(400).json({ message: 'All fields are required' });
        // }
        const deletedPost = await Blog.findByIdAndDelete(postId);
        
        if(!deletedPost) return res.status(400).json({ message: 'Coudnt find the post to delete' });
        // if(userPosts.length === 0) {
        //     return res.status(400).json({ message: 'No such post exists' });
        // }
        // const deletedPost = await Blog.deleteOne({ _id: postId, userId: userId });
        res.status(201).json({ message: 'Deleted post succesfully', posts: deletedPost });
    
    }catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting post' });
    }
}

export default deleteposts;