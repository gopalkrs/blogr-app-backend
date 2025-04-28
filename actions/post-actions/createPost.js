import postSchema from "../../schema/postSchema.js";
import { Blog, User } from "../../models/models.js";

const createPost = async (req, res) => {
  try {
    const { title, userId, content } = req.body;

    const isValid = postSchema.safeParse(req.body);
    if (!isValid.success) {
      return res
        .status(400)
        .json({ message: "Invalid inputs", errors: isValid.error.errors });
    }
    // const doesUserExist = await User.findById(userId);
    // if (!doesUserExist) {
    //   return res.status(400).json({ message: "User does not exist" });
    // }
    const newPost = await Blog.create({ title, userId, content });
    res.status(201).json({ message: "Post created", post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating post" });
  }
};

export default createPost;
