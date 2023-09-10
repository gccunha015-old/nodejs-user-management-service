import { FindCursor } from "mongodb";

export const mongoMocks = {
  createFindCursor: () =>
    ({
      toArray: jest.fn(),
    } as jest.MockedObject<FindCursor>),
};
