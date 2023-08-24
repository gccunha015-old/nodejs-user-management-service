import { z } from "zod";

export const UserSchema = z
  .object({
    externalId: z.string().uuid(),
    email: z.string().email(),
    password: z.string(),
    createdAt: z.date(),
  })
  .strict();

export type User = z.infer<typeof UserSchema>;
