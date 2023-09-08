import { z } from "zod";
import { userSchema } from "../zod-schemas";

export type User = z.infer<typeof userSchema>;
