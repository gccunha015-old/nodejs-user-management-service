import { z } from "zod";
import { UserSchema } from "../model";

export const CreateUserDTOSchema = UserSchema.pick({
  email: true,
  password: true,
});

export type CreateUserDTO = z.infer<typeof CreateUserDTOSchema>;
