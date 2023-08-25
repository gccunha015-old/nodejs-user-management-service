import { randomUUID } from "node:crypto";
import { z } from "zod";

export const UserSchema = z
  .object({
    externalId: z.string().uuid().default(randomUUID()),
    email: z.string().email(),
    password: z.string(),
    createdAt: z.date().default(new Date()),
  })
  .strict();

export type User = z.infer<typeof UserSchema>;
