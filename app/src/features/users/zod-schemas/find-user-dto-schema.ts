import { userSchema } from "./user-schema";

export const findUserDtoSchema = userSchema.transform(
  ({ externalId: id, ...rest }) => ({ ...rest, id })
);
