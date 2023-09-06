import { randomUUID } from "node:crypto";
import { z } from "zod";
import { uuidSchema } from "../../utils";

export const userSchema = z
  .object({
    externalId: uuidSchema.default(randomUUID),
    email: z.string().email(),
    password: z.string().min(8),
    createdAt: z.date().default(new Date()),
  })
  .strict();

export type User = z.infer<typeof userSchema>;
