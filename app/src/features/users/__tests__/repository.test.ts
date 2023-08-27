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

    beforeEach(() => {
      usersFindSpy.mockClear();
    });

    it("should return user with valid id", async () => {
      async function arrange() {
        users.push(userStub1);
      }
      async function act() {
        try {
          return await repository.findById("1");
        } catch (error) {
          return error;
        }
      }
      function assert(actResult: unknown) {
        expect(actResult).toStrictEqual(userStub1);
        expect(usersFindSpy).toHaveBeenCalledTimes(1);
      }

      await arrange().then(act).then(assert);
    });

    it("should throw error for invalid id", async () => {
      async function act() {
        try {
          return await repository.findById("1");
        } catch (error) {
          return error;
        }
      }
      function assert(actResult: unknown) {
        expect(actResult).toBeInstanceOf(Error);
        expect(usersFindSpy).toHaveBeenCalledTimes(1);
        expect(usersFindSpy).toReturnWith(undefined);
      }

      await act().then(assert);
    });
  });

  describe("findAll", () => {
    const userStub2: User = {
      ...userStub1,
      externalId: "2",
    };
    const usersStubs = [userStub1, userStub2];

    it("should return all users", async () => {
      async function arrange() {
        users.push(...usersStubs);
      }
      async function act() {
        try {
          return await repository.findAll();
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
          return await repository.findAll();
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
    const repositoryFindByIdSpy = jest.spyOn(repository, "findById");

    beforeEach(() => {
      repositoryFindByIdSpy.mockClear();
    });

    it("should create a user", async () => {
      async function act() {
        try {
          return await repository.create(userStub1);
        } catch (error) {
          return error;
        }
      }
      function assert(actResult: unknown) {
        expect(actResult).toStrictEqual(userStub1);
        expect(users).toHaveLength(1);
        expect(usersPushSpy).toHaveBeenCalledWith(userStub1);
        expect(repositoryFindByIdSpy).toHaveBeenCalledWith(
          userStub1.externalId
        );
      }

      await act().then(assert);
    });
  });
});
