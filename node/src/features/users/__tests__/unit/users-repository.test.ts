import { Collection, FindCursor, UUID } from "mongodb";
import { database } from "../../../../database/mongo-database";
import { User } from "../../types";
import { UsersRepository } from "../../users-repository";

jest.unmock("../../users-repository");
describe("Unit Testing | UsersRepository", () => {
  const mocks = {} as {
    findCursor: jest.MockedObjectDeep<FindCursor>;
    usersCollection: jest.MockedObjectDeep<Collection<User>>;
  };
  const sut = {} as { repository: UsersRepository };

  beforeAll(() => {
    mocks.findCursor = jest.mocked(new FindCursor());
    mocks.usersCollection = jest.mocked(database.collection(""));
    mocks.usersCollection.find.mockReturnValue(mocks.findCursor);
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

    it("should call usersCollection.findOne and throw Error('User with id ${id} doesn't exist')", async () => {
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
        expect(actResult).toStrictEqual(
          Error(`User with id ${input.id} doesn't exist`)
        );
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
        expect(mocks.findCursor.toArray).toHaveBeenCalledTimes(1);
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
        input.user = { external_id: new UUID() } as User;
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

  describe("update", () => {
    const suiteSpies = {} as { repository: { findById: jest.SpyInstance } };

    beforeAll(() => {
      suiteSpies.repository = {
        findById: jest.spyOn(sut.repository, "findById").mockImplementation(),
      };
    });

    afterAll(() => {
      suiteSpies.repository.findById.mockRestore();
    });

    it("should call usersCollection.updateOne and usersRepository.findById", async () => {
      const input = {} as { user: User };
      async function arrange() {
        input.user = { external_id: new UUID() } as User;
      }
      async function act() {
        await sut.repository.update(input.user);
      }
      async function assert() {
        const { external_id, email, password, sessions, roles } = input.user;
        expect(mocks.usersCollection.updateOne).toHaveBeenLastCalledWith(
          { external_id },
          { $set: { email, password, sessions, roles } }
        );
        expect(suiteSpies.repository.findById).toHaveBeenCalledTimes(1);
      }

      await arrange().then(act).then(assert);
    });
  });
});
