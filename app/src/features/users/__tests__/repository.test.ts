import { UsersInMemoryRepository } from "../repository";
import { User } from "../model";

jest.unmock("../repository");

describe("UsersInMemoryRepository", () => {
  const users: User[] = [];
  const repository = new UsersInMemoryRepository(users);

  describe("create", () => {
    it("should create a user", async () => {
      const created = await repository.create({
        externalId: "1",
        email: "test",
        password: "pass",
        createdAt: new Date(),
      });
      expect(created).toHaveProperty("externalId", "1");
      expect(created).toHaveProperty("email", "test");
      expect(created).toHaveProperty("password", "pass");
      expect(created).toHaveProperty("createdAt");
    });
  });

  describe("findById", () => {
    it("should find user", async () => {
      users.push({
        externalId: "1",
        email: "test",
        password: "pass",
        createdAt: new Date(),
      });

      const found = await repository.findById("1");
      expect(found).toHaveProperty("externalId", "1");
      expect(found).toHaveProperty("email", "test");
      expect(found).toHaveProperty("password", "pass");
      expect(found).toHaveProperty("createdAt");
    });

    it("should not find user", async () => {
      await expect(repository.findById("1")).rejects.toThrowError();
    });
  });

  describe("findAll", () => {
    it("should find all users", async () => {
      users.push({
        externalId: "1",
        email: "test",
        password: "pass",
        createdAt: new Date(),
      });
      users.push({
        externalId: "2",
        email: "test",
        password: "pass",
        createdAt: new Date(),
      });

      const found = await repository.findAll();
      expect(found).toHaveLength(2);
    });
  });

  afterEach(() => {
    users.splice(0, users.length);
  });
});
