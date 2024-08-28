import {z} from 'zod';


export const messageSchema = z.object({
     content: z
     .string()
     .min(10,{message:"content should be atleast 10 characters"})
     .max(300, {message:"content should be not more than 300 characters"})
})