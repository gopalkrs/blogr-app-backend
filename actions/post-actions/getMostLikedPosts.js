import { Blog } from "../../models/models.js";

const getMostLikedPosts = async (req, res) => {
  try {
    // const allPost = await Blog.find();

    const mostLikedPosts = await Blog.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $sort: { likes: -1 },
      },
      {
        $limit: 3,
      }
    ]);

    //console.log(allPosts);

    if (!mostLikedPosts)
      return res.status(400).json({ message: "Error fetching posts" });
    if (mostLikedPosts.length === 0) {
      return res.status(400).json({ message: "No posts exist." });
    }
    res.status(201).json({ message: "Fetching succesfull", posts: mostLikedPosts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

export default getMostLikedPosts;
