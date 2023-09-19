import { ZodType } from "zod";

export const zodMocks = {
  createZodType: () =>
    ({
      parseAsync: jest.fn(),
    } as Partial<ZodType> as jest.MockedObject<ZodType>),
};
