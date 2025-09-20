import { z } from "zod";

const postSchema = z.object({
    title : z.string().min(1, { message: "Title is required" }),
    content : z.string().min(1, { message: "Post content cannot be empty" }),
    imageUrl : z.string().url({ message: "Image URL must be a valid URL" }),
    category: z.enum(["Technology",
    "Lifestyle",
    "Business",
    "Health",
    "Travel",
    "Food",
    "Sports",
    "Finance",
    "Career",
    "Environment",
    "Others"], {
        errorMap: () => ({ message: "Please select a valid category" }),
    }),
    authorId : z.string().min(1, { message: "User ID is required" }),
    tags: z.array(z.string()).optional(),
    views: z.number().min(0).optional(),
    likes: z.number().min(0).optional(),
    comments: z.array(z.object({
        userId: z.string().min(1, { message: "User ID is required" }),
        comment: z.string().min(1, { message: "Comment cannot be empty" }),
        date: z.date().optional()
    })).optional(),
});

export default postSchema;