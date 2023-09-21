import { userSchema } from "./user-schema";

export const findUserDtoTransform = userSchema.transform(
  ({ externalId: id, ...rest }) => ({ id, ...rest })
);
