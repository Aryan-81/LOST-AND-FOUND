import { z } from 'zod';

export const usernameValidation = z
    .string()
    .min(3, "UserName must be atleast 3 characters")
    .max(20, "UserName must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "User must not contain special character")

export const signUpSchema = z.object({
    username: usernameValidation,

    email: z.string().email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' }),
});