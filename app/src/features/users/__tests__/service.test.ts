import { randomUUID } from "node:crypto";
import { UsersService } from "../service";
import { UsersInMemoryRepository } from "../repository";

jest.deepUnmock("../service");

describe("UsersService", () => {
  const mockedUsersRepository = jest.mocked(new UsersInMemoryRepository());
  const service = new UsersService(mockedUsersRepository);

  describe("create", () => {
    it("should create a user", async () => {
      mockedUsersRepository.create.mockResolvedValue({
        externalId: randomUUID(),
        email: "test@test.com",
        password: "password",
        createdAt: new Date(),
      });

      const created = await service.create({
        email: "test@test.com",
        password: "password",
      });
      expect(created).toHaveProperty("email", "test@test.com");
      expect(created).toHaveProperty("password", "password");
      expect(created).toHaveProperty("externalId");
      expect(created).toHaveProperty("createdAt");
      expect(mockedUsersRepository.create).toHaveBeenCalledTimes(1);
    });

    afterEach(() => {
      mockedUsersRepository.create.mockClear();
    });
  });

  // describe("findById", () => {});

  // describe("findAll", () => {});
});
