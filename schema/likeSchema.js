import { z } from "zod";

const likeSchema = z.object({
    userId: z.string().min(1, { message: "User ID is required" }),
    blogId: z.string().min(1, { message: "Blog ID is required" }),
    date: z.date().optional()
});

export default likeSchema;