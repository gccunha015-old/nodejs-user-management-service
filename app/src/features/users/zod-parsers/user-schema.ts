import { randomUUID } from "node:crypto";
import { z } from "zod";
import { dateSchema, uuidSchema } from "../../../utils";

export const userSchema = z
  .object({
    externalId: uuidSchema.default(randomUUID),
    email: z.string(),
    password: z.string().min(8),
    createdAt: dateSchema.default(new Date()),
  })
  .strict();
