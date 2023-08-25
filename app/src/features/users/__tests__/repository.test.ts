import { UsersInMemoryRepository } from "../repository";
import { User, UserSchema } from "../model";

describe("UsersInMemoryRepository", () => {
  const user: User = UserSchema.parse({
    email: "test@test.com",
    password: "pass",
  });

  describe("create", () => {
    const repository = new UsersInMemoryRepository();

    it("should create a user", async () => {
      const created = await repository.create(user);
      expect(created).toBe(user);
    });
  });

  describe("findById", () => {
    const repository = new UsersInMemoryRepository();

    beforeAll(async () => {
      await repository.create(user);
    });

    it("should find user", async () => {
      const found = await repository.findById(user.externalId);
      expect(found).toBe(user);
    });

    it("should not find user", async () => {
      await expect(repository.findById("2")).rejects.toThrowError();
    });
  });

  describe("findAll", () => {
    const repository = new UsersInMemoryRepository();

    it("should find all users", async () => {
      await repository.create(user);
      await repository.create({ ...user, externalId: "2" } as User);

      const found = await repository.findAll();
      expect(found).toHaveLength(2);
    });
  });
});
