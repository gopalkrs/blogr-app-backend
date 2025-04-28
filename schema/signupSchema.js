import { z } from "zod";

const signupSchema = z.object({
    email : z.string().email(),
    name : z.string().min(1, { message: "Name is required" }),
    role : z.enum(["user", "admin"], { errorMap: () => ({ message: "Role is required" }) }),
    password : z.string().min(6, { message: "Password must be at least 6 characters long" })
});

export default signupSchema;