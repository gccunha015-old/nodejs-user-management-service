import type * as RepositoryModule from "../repository";
import { User } from "../model";

const { InMemoryUsersRepository } =
  jest.requireActual<typeof RepositoryModule>("../repository");

describe("InMemoryUsersRepository", () => {
  const user: User = {
    externalId: "1",
    email: "test",
    password: "pass",
    createdAt: new Date(),
  };

  describe("create", () => {
    const repository = new InMemoryUsersRepository();

    it("should create a user", async () => {
      const created = await repository.create(user);
      expect(created).toBe(user);
    });
  });

  describe("findById", () => {
    const repository = new InMemoryUsersRepository();

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
});
