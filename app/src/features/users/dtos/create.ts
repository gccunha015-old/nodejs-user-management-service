import { z } from "zod";
import { hashString } from "../../../utils";
import { userSchema } from "../model";

export const createUserDtoSchema = userSchema
  .pick({
    email: true,
    password: true,
  })
  .transform(async ({ password, ...rest }) => ({
    password: await hashString(password),
    ...rest,
  }));

export type CreateUserDto = z.infer<typeof createUserDtoSchema>;
