import { z } from "zod";
import { UserSchema } from "../model";

export const FindUserDtoSchema = UserSchema.transform(
  ({ externalId, ...rest }) => ({ id: externalId, ...rest })
);

export type FindUserDto = z.infer<typeof FindUserDtoSchema>;
