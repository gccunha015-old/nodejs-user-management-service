import { emailSchema, hashString } from "../../../utils";
import { userSchema } from "./user-schema";

export const createUserDtoTransform = userSchema
  .pick({
    email: true,
    password: true,
  })
  .transform(async ({ email, password }) => ({
    email: await emailSchema.parseAsync(email).then(hashString),
    password: await hashString(password),
  }));
