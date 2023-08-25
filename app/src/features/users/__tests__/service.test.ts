import { UsersService } from "../service";
import {
  CreateUserDTO,
  CreateUserDTOSchema,
  FindUserDTO,
  FindUserDTOSchema,
} from "../dtos";
import { User, UserSchema } from "../model";

import { UsersInMemoryRepository } from "../repository";
jest.mock("../repository");

describe("UsersService", () => {
  const mockedUsersRepository = jest.mocked(new UsersInMemoryRepository());
  const input: CreateUserDTO = CreateUserDTOSchema.parse({
    email: "test@test.com",
    password: "pass",
  });
  const user: User = UserSchema.parse(input);
  const output: FindUserDTO = FindUserDTOSchema.parse(user);

  describe("create", () => {
    const service = new UsersService(mockedUsersRepository);

    beforeEach(() => {
      mockedUsersRepository.create.mockClear();
    });

    it("should create a user", async () => {
      mockedUsersRepository.create.mockResolvedValue(user);
      const created = await service.create(input);
      expect(created).toStrictEqual(output);
    });
  });

  // describe("findById", () => {});

  // describe("findAll", () => {});
});
