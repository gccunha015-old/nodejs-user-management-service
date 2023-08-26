import { randomUUID } from "node:crypto";
import { UsersService } from "../service";
import { UsersInMemoryRepository } from "../repository";
import { UserSchema, User } from "../model";
import { CreateUserDto } from "../dtos";

jest.unmock("../service");
jest.unmock("zod");

describe("UsersService", () => {
  const UsersRepositoryMock = jest.mocked(new UsersInMemoryRepository());
  const service = new UsersService(UsersRepositoryMock);
  const userStub1: User = {
    externalId: randomUUID(),
    email: "test@test.com",
    password: "password",
    createdAt: new Date(),
  };

  describe("findById", () => {
    it("should return user with valid id", async () => {
      UsersRepositoryMock.findById.mockResolvedValueOnce(userStub1);

      const found = await service.findById("1");
      expect(found).toStrictEqual(userStub1);

      expect(UsersRepositoryMock.findById).toHaveBeenCalledWith("1");
    });

    it("should throw error for invalid id", async () => {
      UsersRepositoryMock.findById.mockRejectedValueOnce(new Error());

      await expect(service.findById("1")).rejects.toThrowError();

      expect(UsersRepositoryMock.findById).toHaveBeenCalledWith("1");
    });

    afterEach(() => {
      UsersRepositoryMock.findById.mockClear();
    });
  });

  describe("findAll", () => {
    const userStub2: User = {
      ...userStub1,
      externalId: "2",
    };
    const usersStubs = [userStub1, userStub2];

    it("should return all users", async () => {
      UsersRepositoryMock.findAll.mockResolvedValueOnce(usersStubs);

      const found = await service.findAll();
      expect(found).toHaveLength(2);

      expect(UsersRepositoryMock.findAll).toHaveBeenCalled();
    });

    it("should return empty array", async () => {
      UsersRepositoryMock.findAll.mockResolvedValueOnce([]);

      const found = await service.findAll();
      expect(found).toHaveLength(0);

      expect(UsersRepositoryMock.findAll).toHaveBeenCalled();
    });

    afterEach(() => {
      UsersRepositoryMock.findAll.mockClear();
    });
  });

  describe("create", () => {
    const UserSchemaMock = jest.mocked(UserSchema);
    const createUserDtoStub: CreateUserDto = {
      email: "test@test.com",
      password: "password",
    };

    it("should create a user", async () => {
      UserSchemaMock.parseAsync.mockResolvedValueOnce(userStub1);
      UsersRepositoryMock.create.mockResolvedValueOnce(userStub1);

      const created = await service.create(createUserDtoStub);
      expect(created).toStrictEqual(userStub1);

      expect(UserSchemaMock.parseAsync).toHaveBeenCalledWith(createUserDtoStub);
      expect(UsersRepositoryMock.create).toHaveBeenCalledWith(userStub1);
    });

    afterEach(() => {
      UsersRepositoryMock.create.mockClear();
      UserSchemaMock.parseAsync.mockClear();
    });
  });
});
