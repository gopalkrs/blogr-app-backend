import { z } from "zod";

const postSchema = z.object({
    title : z.string().min(1, { message: "Title is required" }),
    content : z.string().min(1, { message: "Post content cannot be empty" }),
    userId : z.string().min(1, { message: "User ID is required" })
});

export default postSchema;