import { Blog } from "../../models/models.js";

const getMostRecentPosts = async (req, res) => {
  try {
    // const allPost = await Blog.find();

    const mostRecentPosts = await Blog.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $sort: { date: -1 },
      },
      {
        $limit: 3,
      }
    ]);

    //console.log(allPosts);

    if (!mostRecentPosts)
      return res.status(400).json({ message: "Error fetching posts" });
    if (mostRecentPosts.length === 0) {
      return res.status(400).json({ message: "No posts exist." });
    }
    res.status(201).json({ message: "Fetching succesfull", posts: mostRecentPosts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

export default getMostRecentPosts;
