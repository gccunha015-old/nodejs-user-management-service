import { Collection, Db } from "mongodb";
import { mongoMocks } from "../../__mocks__";

export const database = {
  collection: () =>
    ({
      findOne: jest.fn(),
      find: jest.fn().mockReturnValue(mongoMocks.createFindCursor()),
      insertOne: jest.fn(),
    } as jest.MockedObject<Collection>),
} as Partial<Db> as jest.MockedObject<Db>;
