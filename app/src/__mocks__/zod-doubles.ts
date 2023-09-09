import { ZodSchema } from "zod";

export const zodMocks = {
  createSchema: () =>
    ({
      parseAsync: jest.fn(),
    } as Partial<ZodSchema> as jest.MockedObject<ZodSchema>),
};
