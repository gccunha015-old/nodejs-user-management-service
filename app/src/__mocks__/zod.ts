import { receiveArgumentAndReturnItAsync } from "./utils";
// jest.deepUnmock("./utils");

export const zodMocks = {
  schema: {
    parseAsync: jest.fn().mockImplementation(receiveArgumentAndReturnItAsync),
  },
};
