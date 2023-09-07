import {
  receiveArgumentAndReturnItAsync,
  returnArrayAsync,
} from "../../../__mocks__";
jest.deepUnmock("../../../__mocks__");

export const usersService = {
  findById: jest.fn().mockImplementation(receiveArgumentAndReturnItAsync),
  findAll: jest.fn().mockImplementation(returnArrayAsync),
  create: jest.fn().mockImplementation(receiveArgumentAndReturnItAsync),
};

export const UsersService = jest.fn().mockReturnValue(usersService);
