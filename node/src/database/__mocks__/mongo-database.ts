import { Collection, Db } from "mongodb";

export const database = {
  collection: () =>
    ({
      findOne: jest.fn(),
      find: jest.fn(),
      insertOne: jest.fn(),
    } as jest.MockedObject<Collection>),
} as Partial<Db> as jest.MockedObject<Db>;
