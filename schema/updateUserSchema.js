import { z } from "zod";

const signupSchema = z.object({
    name : z.string().min(1, { message: "Name is required" }),
    role : z.enum(["user", "admin"], { errorMap: () => ({ message: "Role is required" }) })
});

export default signupSchema;