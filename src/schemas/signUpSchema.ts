import {z} from 'zod';

export const usernameValidation = z
   .string()
   .min(2, "username must be 2 character")
   .max(20, "username must be not more than 20 character")
   .regex(/^[a-zA-Z0-9_]+$/, "username must not contain special character")

export const signUpSchema = z.object({
     username: usernameValidation,
     email: z.string().email({message: "Invalid email address"}),
     password: z.string().min(2, {message:"password must br at least 6 characters"})
})   