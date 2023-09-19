import { z } from "zod";
import { createUserDtoSchema, findUserDtoSchema } from "../zod-parsers";

export type CreateUserDto = z.infer<typeof createUserDtoSchema>;
export type FindUserDto = z.infer<typeof findUserDtoSchema>;
