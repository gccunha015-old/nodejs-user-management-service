import { z } from "zod";
import { hashString } from "../../../utils";
import { UserSchema } from "../model";

export const CreateUserDtoSchema = UserSchema.pick({
  email: true,
  password: true,
}).transform(async ({ password, ...rest }) => ({
  password: await hashString(password),
  ...rest,
}));

export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>;
