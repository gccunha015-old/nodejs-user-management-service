import {
  receiveArgumentAndReturnItAsync,
  returnArrayAsync,
} from "../../../__mocks__";
jest.deepUnmock("../../../__mocks__");

export const usersService = {
  findById: receiveArgumentAndReturnItAsync,
  findAll: returnArrayAsync,
  create: receiveArgumentAndReturnItAsync,
};

export const UsersService = jest.fn().mockReturnValue(usersService);
