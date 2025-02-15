import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().min(1, "Email is required").email("Email is invalid"),
	password: z.string().min(1, "Password is required").min(8, "Password must be more than 8 characters").max(256, "Password must be less than 256 characters"),
});
