import { z } from "zod";

const postSchema = z.object({
    title : z.string().min(1, { message: "Title is required" }),
    content : z.string().min(1, { message: "Post content cannot be empty" }),
    imageUrl : z.string().url({ message: "Image URL must be a valid URL" }),
    category: z.enum(["technology", "travel", "food", "health", "finance", "education", "lifestyle", "news", "international", "entertainment","sports", "others"], {
        errorMap: () => ({ message: "Please select a valid category" }),
    }),
    userId : z.string().min(1, { message: "User ID is required" })
});

export default postSchema;