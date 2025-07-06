import { Blog } from "../../models/models.js";

const getAllPosts = async (req, res) => {
    try{
        // const allPost = await Blog.find();

        const allPosts = await Blog.aggregate([{
            $lookup : {
                from : "users",
                localField : "userId",
                foreignField : "_id",
                as : "user"
            }
        },
        {
            $sort: {date: -1}
        }
    ]);

        //console.log(allPosts);
        
        if(!allPosts) return res.status(400).json({ message: 'Error fetching posts' });
        if(allPosts.length === 0) {
            return res.status(400).json({ message: 'No posts exist.' });
        }
        res.status(201).json({ message: 'Fetching succesfull', posts: allPosts });
    
    }catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching posts' });
    }
}

export default getAllPosts;