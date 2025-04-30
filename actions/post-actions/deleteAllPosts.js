import { Blog } from "../../models/models.js";

const deleteAllPosts = async (req, res) => {
    try{
        const { userId } = req;
        // if(!userId) {
        //     return res.status(400).json({ message: 'All fields are required' });
        // }
        const userPosts = await Blog.find({userId : userId});
        
        if(!userPosts) return res.status(400).json({ message: 'Not found' });
        if(userPosts.length === 0) {
            return res.status(400).json({ message: 'No posts exists' });
        }
        const deletedPost = await Blog.deleteMany({ userId: userId });
        res.status(201).json({ message: 'Deleted all posts succesfully', posts: deletedPost });
    
    }catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching posts' });
    }
}

export default deleteAllPosts;