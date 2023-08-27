import { UsersInMemoryRepository } from "../repository";
import { User } from "../model";

jest.unmock("../repository");
describe("UsersInMemoryRepository", () => {
  const users: User[] = [];
  const usersPushSpy = jest.spyOn(users, "push");
  const repository = new UsersInMemoryRepository(users);
  const userStub1: User = {
    externalId: "1",
    email: "test",
    password: "pass",
    createdAt: new Date(),
  };

  beforeEach(() => {
    users.splice(0, users.length);
  });

  describe("findById", () => {
    const usersFindSpy = jest.spyOn(users, "find");

    it("should return user with valid id", async () => {
      users.push(userStub1);

      const found = await repository.findById("1");
      expect(found).toStrictEqual(userStub1);

      expect(usersFindSpy).toHaveBeenCalled();
    });

    it("should throw error for invalid id", async () => {
      await expect(repository.findById("1")).rejects.toThrowError();

      expect(usersFindSpy).toHaveBeenCalled();
      expect(usersFindSpy).toReturnWith(undefined);
    });
  });

  describe("findAll", () => {
    const userStub2: User = {
      ...userStub1,
      externalId: "2",
    };
    const usersStubs = [userStub1, userStub2];

    it("should return all users", async () => {
      users.push(...usersStubs);

      const found = await repository.findAll();
      expect(found).toHaveLength(2);
    });

    it("should return empty array", async () => {
      const found = await repository.findAll();
      expect(found).toHaveLength(0);
    });
  });

  describe("create", () => {
    const repositoryFindByIdSpy = jest.spyOn(repository, "findById");

    it("should create a user", async () => {
      const created = await repository.create(userStub1);
      expect(created).toStrictEqual(userStub1);

      expect(users).toHaveLength(1);
      expect(usersPushSpy).toHaveBeenCalledWith(userStub1);
      expect(repositoryFindByIdSpy).toHaveBeenCalledWith(userStub1.externalId);
    });
  });
});
