import { z } from "zod";
import { userSchema } from "../users-model";

export const findUserDtoSchema = userSchema.transform(
  ({ externalId: id, ...rest }) => ({ ...rest, id })
);

export type FindUserDto = z.infer<typeof findUserDtoSchema>;
