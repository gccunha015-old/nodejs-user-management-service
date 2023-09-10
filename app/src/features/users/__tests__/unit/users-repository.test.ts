import { Collection, FindCursor } from "mongodb";
import { database } from "../../../../database";
import { User } from "../../types";
import { UsersRepository } from "../../users-repository";

jest.unmock("../../users-repository");
describe("Unit Testing | UsersRepository", () => {
  const mocks = {} as {
    usersCollection: jest.MockedObjectDeep<Collection<User>>;
  };
  const sut = {} as { repository: UsersRepository };

  beforeAll(() => {
    mocks.usersCollection = jest.mocked(database.collection(""));
    sut.repository = new UsersRepository(mocks.usersCollection);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findById", () => {
    it("should call usersCollection.findOne", async () => {
      const input = {} as { id: string };
      const testStubReturns = {} as { usersCollection: { findOne: User } };
      async function arrange() {
        input.id = "0";
        testStubReturns.usersCollection = { findOne: {} as User };
        mocks.usersCollection.findOne.mockResolvedValueOnce(
          testStubReturns.usersCollection.findOne
        );
      }
      async function act() {
        await sut.repository.findById(input.id);
      }
      async function assert() {
        expect(mocks.usersCollection.findOne).toHaveBeenCalledTimes(1);
      }

      await arrange().then(act).then(assert);
    });

    it("should call usersCollection.findOne and throw Error", async () => {
      const input = {} as { id: string };
      async function arrange() {
        input.id = "0";
      }
      async function act() {
        try {
          return await sut.repository.findById(input.id);
        } catch (error) {
          return error;
        }
      }
      async function assert(actResult: unknown) {
        expect(mocks.usersCollection.findOne).toHaveBeenCalledTimes(1);
        expect(actResult).toBeInstanceOf(Error);
      }

      await arrange().then(act).then(assert);
    });
  });

  describe("findAll", () => {
    it("should call usersCollection.find.toArray", async () => {
      async function arrange() {}
      async function act() {
        await sut.repository.findAll();
      }
      async function assert() {
        expect(mocks.usersCollection.find).toHaveBeenCalledTimes(1);
        const findCursorMock = mocks.usersCollection.find.mock.results[0]
          .value as jest.MockedObjectDeep<FindCursor>;
        expect(findCursorMock.toArray).toHaveBeenCalledTimes(1);
      }

      await arrange().then(act).then(assert);
    });
  });

  describe("create", () => {
    const suiteSpies = {} as { repository: { findById: jest.SpyInstance } };

    beforeAll(() => {
      suiteSpies.repository = {
        findById: jest.spyOn(sut.repository, "findById").mockImplementation(),
      };
    });

    afterAll(() => {
      suiteSpies.repository.findById.mockRestore();
    });

    it("should call usersCollection.insertOne and usersRepository.findById", async () => {
      const input = {} as { user: User };
      async function arrange() {
        input.user = {} as User;
      }
      async function act() {
        await sut.repository.create(input.user);
      }
      async function assert() {
        expect(mocks.usersCollection.insertOne).toHaveBeenLastCalledWith(
          input.user
        );
        expect(suiteSpies.repository.findById).toHaveBeenCalledTimes(1);
      }

      await arrange().then(act).then(assert);
    });
  });
});
