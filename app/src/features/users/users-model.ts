import { randomUUID } from "node:crypto";
import { z } from "zod";
import { dateSchema, emailSchema, uuidSchema } from "../../utils";

export const userSchema = z
  .object({
    externalId: uuidSchema.default(randomUUID),
    email: emailSchema,
    password: z.string().min(8),
    createdAt: dateSchema.default(new Date()),
  })
  .strict();

export type User = z.infer<typeof userSchema>;
