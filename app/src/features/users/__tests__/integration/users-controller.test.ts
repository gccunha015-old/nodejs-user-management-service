import { randomUUID } from "node:crypto";
import { Collection } from "mongodb";
import { Request } from "express";
import {
  expressMocks,
  expressSpies,
} from "../../../../__mocks__/express-doubles";
import { database } from "../../../../database/mongo-database";
import { FindUserDto, User } from "../../types";
import { UsersRepository } from "../../users-repository";
import { UsersService } from "../../users-service";
import { UsersController } from "../../users-controller";
import { StatusCodes } from "http-status-codes";

jest.deepUnmock("../../users-repository");
jest.deepUnmock("../../users-service");
jest.deepUnmock("../../users-controller");
describe("Integration Testing | UsersController", () => {
  const mocks = {} as {
    usersCollection: jest.MockedObjectDeep<Collection<User>>;
  };
  const sut = {} as {
    usersRepository: UsersRepository;
    usersService: UsersService;
    usersController: UsersController;
  };
  const data = {} as { id: string; user: User; findUserDto: FindUserDto };

  beforeAll(() => {
    mocks.usersCollection = jest.mocked(database.collection(""));
    sut.usersRepository = new UsersRepository(mocks.usersCollection);
    sut.usersService = new UsersService(sut.usersRepository);
    sut.usersController = new UsersController(sut.usersService);
    data.id = randomUUID();
    data.user = {
      externalId: data.id,
      createdAt: new Date(),
      email: "test@test.com",
      password: "password",
    };
    data.findUserDto = (({ externalId, ...rest }: User) => ({
      id: externalId,
      ...rest,
    }))(data.user);
  });

  describe("findById", () => {
    const suiteInputs = {} as { request: Request };

    beforeAll(() => {
      suiteInputs.request = {
        params: { id: data.id },
      } as Partial<Request> as Request;
    });

    it("when request contains id of existing user, should respond with status OK and json of user", async () => {
      async function arrange() {
        mocks.usersCollection.findOne.mockResolvedValueOnce(data.user);
      }
      async function act() {
        await sut.usersController.findById(
          suiteInputs.request,
          expressSpies.response,
          expressMocks.nextFunction
        );
      }
      async function assert() {
        expect(expressSpies.response.status).toHaveBeenLastCalledWith(
          StatusCodes.OK
        );
        expect(expressSpies.response.json).toHaveBeenLastCalledWith(
          data.findUserDto
        );
      }

      await arrange().then(act).then(assert);
    });

    it("when request contains id of invalid user, should call next with Error('User with id ${id} doesn't exist')", async () => {
      async function arrange() {
        mocks.usersCollection.findOne.mockResolvedValueOnce(null);
      }
      async function act() {
        await sut.usersController.findById(
          suiteInputs.request,
          expressSpies.response,
          expressMocks.nextFunction
        );
      }
      async function assert() {
        expect(expressMocks.nextFunction).toHaveBeenLastCalledWith(
          Error(`User with id ${data.id} doesn't exist`)
        );
      }

      await arrange().then(act).then(assert);
    });
  });
});
