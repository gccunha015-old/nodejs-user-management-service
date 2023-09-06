import { UsersService } from "../../service";
import { UsersInMemoryRepository } from "../../repository";
import { userSchema, User } from "../../model";
import { CreateUserDto } from "../../dtos";

jest.unmock("zod");

jest.unmock("../../service");
describe("UsersService", () => {
  const stubs = {} as { id: string; user: User };
  const mocks = {} as {
    usersRepository: jest.MockedObjectDeep<UsersInMemoryRepository>;
  };
  const sut = {} as { service: UsersService };

  beforeAll(() => {
    stubs.id = "0";
    stubs.user = {
      externalId: stubs.id,
      email: "test@test.com",
      password: "password",
      createdAt: new Date(),
    };
    mocks.usersRepository = jest.mocked(new UsersInMemoryRepository());
    sut.service = new UsersService(mocks.usersRepository);
  });

  describe("findById", () => {
    it("should return user with valid id", async () => {
      async function arrange() {
        mocks.usersRepository.findById.mockResolvedValueOnce(stubs.user);
      }
      async function act() {
        try {
          return await sut.service.findById(stubs.id);
        } catch (error) {
          return error;
        }
      }
      function assert(actResult: unknown) {
        expect(actResult).toStrictEqual(stubs.user);
      }

      await arrange().then(act).then(assert);
    });

    it("should throw error for invalid id", async () => {
      async function arrange() {
        mocks.usersRepository.findById.mockRejectedValueOnce(new Error());
      }
      async function act() {
        try {
          return await sut.service.findById(stubs.id);
        } catch (error) {
          return error;
        }
      }
      function assert(actResult: unknown) {
        expect(actResult).toBeInstanceOf(Error);
      }

      await arrange().then(act).then(assert);
    });
  });

  describe("findAll", () => {
    const suiteStubs = {} as { users: User[] };

    beforeAll(() => {
      suiteStubs.users = [
        stubs.user,
        {
          ...stubs.user,
          externalId: "2",
        },
      ];
    });

    it("should return all users", async () => {
      async function arrange() {
        mocks.usersRepository.findAll.mockResolvedValueOnce(suiteStubs.users);
      }
      async function act() {
        try {
          return await sut.service.findAll();
        } catch (error) {
          return error;
        }
      }
      function assert(actResult: unknown) {
        expect(actResult).toHaveLength(2);
      }

      await arrange().then(act).then(assert);
    });

    it("should return empty array", async () => {
      async function arrange() {
        mocks.usersRepository.findAll.mockResolvedValueOnce([]);
      }
      async function act() {
        try {
          return await sut.service.findAll();
        } catch (error) {
          return error;
        }
      }
      function assert(actResult: unknown) {
        expect(actResult).toHaveLength(0);
      }

      await arrange().then(act).then(assert);
    });
  });

  describe("create", () => {
    const suiteMocks = {} as {
      userSchema: jest.MockedObjectDeep<typeof userSchema>;
    };
    const suiteStubs = {} as { createUserDto: CreateUserDto };

    beforeAll(() => {
      suiteMocks.userSchema = jest.mocked(userSchema);
      suiteStubs.createUserDto = {
        email: "test@test.com",
        password: "password",
      };
    });

    it("should create a user", async () => {
      async function arrange() {
        suiteMocks.userSchema.parseAsync.mockResolvedValueOnce(stubs.user);
        mocks.usersRepository.create.mockResolvedValueOnce(stubs.user);
      }
      async function act() {
        try {
          return await sut.service.create(suiteStubs.createUserDto);
        } catch (error) {
          return error;
        }
      }
      function assert(actResult: unknown) {
        expect(actResult).toStrictEqual(stubs.user);
      }

      await arrange().then(act).then(assert);
    });

    it("should throw error for invalid email", async () => {
      const testStubs = {} as { createUserDto: CreateUserDto };
      async function arrange() {
        testStubs.createUserDto = {
          ...suiteStubs.createUserDto,
          email: "test",
        };
        suiteMocks.userSchema.parseAsync.mockRejectedValueOnce(new Error());
      }
      async function act() {
        try {
          return await sut.service.create(testStubs.createUserDto);
        } catch (error) {
          return error;
        }
      }
      function assert(actResult: unknown) {
        expect(actResult).toBeInstanceOf(Error);
      }

      await arrange().then(act).then(assert);
    });

    it("should throw error for invalid password", async () => {
      const testStubs = {} as { createUserDto: CreateUserDto };
      async function arrange() {
        testStubs.createUserDto = {
          ...suiteStubs.createUserDto,
          password: "pass",
        };
        suiteMocks.userSchema.parseAsync.mockRejectedValueOnce(new Error());
      }
      async function act() {
        try {
          return await sut.service.create(testStubs.createUserDto);
        } catch (error) {
          return error;
        }
      }
      function assert(actResult: unknown) {
        expect(actResult).toBeInstanceOf(Error);
      }

      await arrange().then(act).then(assert);
    });
  });
});
