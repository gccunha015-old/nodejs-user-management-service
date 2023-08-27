import { UsersService } from "../service";
import { UsersInMemoryRepository } from "../repository";
import { UserSchema, User } from "../model";
import { CreateUserDto } from "../dtos";

jest.unmock("zod");

jest.unmock("../service");
describe("UsersService", () => {
  const usersRepositoryMock = jest.mocked(new UsersInMemoryRepository());
  const service = new UsersService(usersRepositoryMock);
  const idStub1 = "1";
  const userStub1: User = {
    externalId: idStub1,
    email: "test@test.com",
    password: "password",
    createdAt: new Date(),
  };

  describe("findById", () => {
    it("should return user with valid id", async () => {
      usersRepositoryMock.findById.mockResolvedValueOnce(userStub1);

      const found = await service.findById(idStub1);
      expect(found).toStrictEqual(userStub1);

      expect(usersRepositoryMock.findById).toHaveBeenCalledWith(idStub1);
    });

    it("should throw error for invalid id", async () => {
      usersRepositoryMock.findById.mockRejectedValueOnce(new Error());

      await expect(service.findById(idStub1)).rejects.toThrowError();

      expect(usersRepositoryMock.findById).toHaveBeenCalledWith(idStub1);
    });
  });

  describe("findAll", () => {
    const userStub2: User = {
      ...userStub1,
      externalId: "2",
    };
    const usersStubs = [userStub1, userStub2];

    it("should return all users", async () => {
      usersRepositoryMock.findAll.mockResolvedValueOnce(usersStubs);

      const found = await service.findAll();
      expect(found).toHaveLength(2);

      expect(usersRepositoryMock.findAll).toHaveBeenCalled();
    });

    it("should return empty array", async () => {
      usersRepositoryMock.findAll.mockResolvedValueOnce([]);

      const found = await service.findAll();
      expect(found).toHaveLength(0);

      expect(usersRepositoryMock.findAll).toHaveBeenCalled();
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
      usersRepositoryMock.create.mockResolvedValueOnce(userStub1);

      const created = await service.create(createUserDtoStub);
      expect(created).toStrictEqual(userStub1);

      expect(UserSchemaMock.parseAsync).toHaveBeenCalledWith(createUserDtoStub);
      expect(usersRepositoryMock.create).toHaveBeenCalledWith(userStub1);
      usersRepositoryMock.create.mockClear();
    });

    it("should throw error for invalid email", async () => {
      const createUserDtoWithInvalidEmailStub = {
        ...createUserDtoStub,
        email: "test",
      };
      UserSchemaMock.parseAsync.mockRejectedValueOnce(new Error());

      await expect(
        service.create(createUserDtoWithInvalidEmailStub)
      ).rejects.toThrowError();

      expect(UserSchemaMock.parseAsync).toHaveBeenCalledWith(
        createUserDtoWithInvalidEmailStub
      );
      expect(usersRepositoryMock.create).not.toHaveBeenCalled();
    });

    it("should throw error for invalid password", async () => {
      const createUserDtoWithInvalidPasswordStub = {
        ...createUserDtoStub,
        password: "pass",
      };
      UserSchemaMock.parseAsync.mockRejectedValueOnce(new Error());

      await expect(
        service.create(createUserDtoWithInvalidPasswordStub)
      ).rejects.toThrowError();

      expect(UserSchemaMock.parseAsync).toHaveBeenCalledWith(
        createUserDtoWithInvalidPasswordStub
      );
      expect(usersRepositoryMock.create).not.toHaveBeenCalled();
    });
  });
});
