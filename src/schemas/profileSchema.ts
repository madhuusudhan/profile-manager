import { z } from "zod";

export const ProfileSchema = z.object({
    name: z.string().min(3, "Name must be atleast 3 characters"),
    email: z.email("Invalid email address"),
    age: z.preprocess(
        (v) => (v === "" || v === null || v === undefined ? undefined : Number(v)),
        z.number().int("Age must be an Integer").min(18, "Age must be at least 18").lt(100, "Age must be less than 100").optional()
      ),
});

export type profileForm = z.infer<typeof ProfileSchema>;