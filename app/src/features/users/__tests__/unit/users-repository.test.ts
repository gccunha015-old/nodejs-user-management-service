import { Collection } from "mongodb";
import { database } from "../../../../database";
import { User } from "../../types";
import { UsersRepository } from "../../users-repository";

jest.unmock("../../users-repository");
describe("Unit Testing | UsersRepository", () => {
  const mocks = {} as {
    users: jest.MockedObjectDeep<Collection<User>>;
  };
  const sut = {} as { repository: UsersRepository };

  beforeAll(() => {
    mocks.users = jest.mocked(database.collection(""));
    sut.repository = new UsersRepository(mocks.users);
  });

  describe("findById", () => {
    it("when user with id exists, should call users.findOne and return the found user", async () => {
      const input = {} as { id: string };
      const testStubReturns = {} as { users: { findOne: User } };
      async function arrange() {
        input.id = "0";
        testStubReturns.users = { findOne: {} as User };
        mocks.users.findOne.mockResolvedValueOnce(
          testStubReturns.users.findOne
        );
      }
      async function act() {
        await sut.repository.findById(input.id);
      }
      async function assert() {
        expect(mocks.users.findOne).toHaveBeenCalledTimes(1);
      }

      await arrange().then(act).then(assert);
    });

    it("when user with id doesn't exist, should throw Error", async () => {
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
        expect(actResult).toBeInstanceOf(Error);
      }

      await arrange().then(act).then(assert);
    });
  });
});
