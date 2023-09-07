import {
  receiveArgumentAndReturnIt,
  receiveArgumentAndReturnItAsync,
} from "./mock-implementation-functions";

export const zodMocks = {
  schema: {
    parseAsync: receiveArgumentAndReturnItAsync,
    _parse: receiveArgumentAndReturnIt,
    default: jest.fn().mockReturnThis(),
  },
};
