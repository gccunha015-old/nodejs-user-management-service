import { UsersInMemoryRepository } from "../../users-repository";
import { User } from "../../users-model";

jest.unmock("../../users-repository");
describe("UsersInMemoryRepository", () => {
  const stubs = {} as { users: User[]; user: User };
  const sut = {} as { repository: UsersInMemoryRepository };

  beforeAll(() => {
    stubs.users = [];
    stubs.user = {
      externalId: "1",
      email: "test",
      password: "pass",
      createdAt: new Date(),
    };
    sut.repository = new UsersInMemoryRepository(stubs.users);
  });

  beforeEach(() => {
    stubs.users.splice(0, stubs.users.length);
  });

  describe("findById", () => {
    it("should return user with valid id", async () => {
      async function arrange() {
        stubs.users.push(stubs.user);
      }
      async function act() {
        try {
          return await sut.repository.findById("1");
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
      async function act() {
        try {
          return await sut.repository.findById("1");
        } catch (error) {
          return error;
        }
      }
      function assert(actResult: unknown) {
        expect(actResult).toBeInstanceOf(Error);
      }

      await act().then(assert);
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
        stubs.users.push(...suiteStubs.users);
      }
      async function act() {
        try {
          return await sut.repository.findAll();
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
      async function act() {
        try {
          return await sut.repository.findAll();
        } catch (error) {
          return error;
        }
      }
      function assert(actResult: unknown) {
        expect(actResult).toHaveLength(0);
      }

      await act().then(assert);
    });
  });

  describe("create", () => {
    const suiteSpies = {} as {
      repository: {
        findById: jest.SpyInstance;
      };
    };

    beforeAll(() => {
      suiteSpies.repository = {
        findById: jest.spyOn(sut.repository, "findById").mockImplementation(),
      };
    });

    it("should create a user", async () => {
      async function arrange() {
        suiteSpies.repository.findById.mockResolvedValueOnce(stubs.user);
      }
      async function act() {
        try {
          return await sut.repository.create(stubs.user);
        } catch (error) {
          return error;
        }
      }
      function assert(actResult: unknown) {
        expect(actResult).toStrictEqual(stubs.user);
      }

      await arrange().then(act).then(assert);
    });
  });
});
