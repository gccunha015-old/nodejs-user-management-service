import { z } from "zod";
import { UserSchema } from "../model";

export const FindUserDtoSchema = UserSchema.transform(
  ({ externalId: id, ...rest }) => ({ ...rest, id })
);

export type FindUserDto = z.infer<typeof FindUserDtoSchema>;
