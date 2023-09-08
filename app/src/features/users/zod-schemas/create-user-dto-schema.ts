import { hashString } from "../../../utils";
import { userSchema } from "./user-schema";

export const createUserDtoSchema = userSchema
  .pick({
    email: true,
    password: true,
  })
  .transform(async ({ password, ...rest }) => ({
    password: await hashString(password),
    ...rest,
  }));
