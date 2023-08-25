import { z } from "zod";
import { UserSchema } from "../model";

export const CreateUserDTOSchema = UserSchema.pick({
  email: true,
  password: true,
}).strict();

export type CreateUserDTO = z.infer<typeof CreateUserDTOSchema>;
