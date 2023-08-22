import { z } from "zod";
import { UserSchema } from "../model";

export const FindUserDTOSchema = UserSchema.omit({
  id: true,
}).transform(({ externalId, ...rest }) => ({ id: externalId, ...rest }));

export type FindUserDTO = z.infer<typeof FindUserDTOSchema>;
