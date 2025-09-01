import { z } from "zod";

export const ProfileSchema = z.object({
    name: z.string().min(3, "Name must be atleast 3 characters"),
    email: z.email("Invalid email address"),
    age: z.preprocess(
        (v) => (v === "" || v === null || v === undefined ? undefined : Number(v)),
        z.number().int().gt(0, "Age must be greater than 0").lt(100, "Age must be a valid number").optional()
      ),
});

export type profileForm = z.infer<typeof ProfileSchema>;