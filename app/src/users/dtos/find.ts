import { z } from "zod";
import { UserSchema } from "../model";

export const FindUserDTOSchema = UserSchema.transform(
  ({ externalId, ...rest }) => ({ id: externalId, ...rest })
);

export type FindUserDTO = z.infer<typeof FindUserDTOSchema>;
