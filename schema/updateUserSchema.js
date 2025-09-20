import { z } from "zod";

const signupSchema = z.object({
    name : z.string().min(1, { message: "Name is required" }),
    role : z.enum(["user", "admin"], { errorMap: () => ({ message: "Role is required" }) }),
    bio: z.string().max(300, { message: "Bio must be at most 300 characters long" }).optional(),
});

export default signupSchema;