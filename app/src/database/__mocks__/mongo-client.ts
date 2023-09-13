import { MongoClient } from "mongodb";

export const mongoClient = {
  close: jest.fn(),
} as jest.MockedObjectDeep<MongoClient>;
