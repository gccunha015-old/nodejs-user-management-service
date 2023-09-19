import { randomUUID } from "node:crypto";
import { Collection, FindCursor } from "mongodb";
import { Request } from "express";
import { expressMocks, expressSpies, mongoMocks } from "../../../../__mocks__";
import { database } from "../../../../database/mongo-database";
import { FindUserDto, User } from "../../types";
import { UsersRepository } from "../../users-repository";
import { UsersService } from "../../users-service";
import { UsersController } from "../../users-controller";
import { StatusCodes } from "http-status-codes";
import { findUserDtoTransform } from "../../zod-parsers";

jest.deepUnmock("../../users-repository");
jest.deepUnmock("../../users-service");
jest.deepUnmock("../../users-controller");
describe("Integration Testing | UsersController", () => {
  const mocks = {} as {
    findCursor: jest.MockedObject<FindCursor>;
    usersCollection: jest.MockedObjectDeep<Collection<User>>;
  };
  const sut = {} as {
    usersRepository: UsersRepository;
    usersService: UsersService;
    usersController: UsersController;
  };
  const data = {} as { id: string; user: User; findUserDto: FindUserDto };

  beforeAll(() => {
    mocks.findCursor = mongoMocks.createFindCursor();
    mocks.usersCollection = jest.mocked(database.collection(""));
    mocks.usersCollection.find.mockReturnValue(mocks.findCursor);
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

  afterEach(() => {
    jest.clearAllMocks();
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

    it("when request contains id of invalid user, should call next with Error", async () => {
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
          expect.any(Error)
        );
      }

      await arrange().then(act).then(assert);
    });
  });

  describe("findAll", () => {
    const suiteInputs = {} as { request: Request };

    beforeAll(() => {
      suiteInputs.request = {} as Request;
    });

    describe("should respond with status OK and json of users", () => {
      const testData = {
        externalId: randomUUID(),
        createdAt: new Date(),
        email: "test@test.com",
        password: "password",
      };
      const testReturns = [[], [testData], [testData, testData]];

      it.each`
        findCursorReturn
        ${testReturns[0]}
        ${testReturns[1]}
        ${testReturns[2]}
      `(
        "of length $findCursorReturn.length",
        async ({ findCursorReturn }: { findCursorReturn: User[] }) => {
          async function arrange() {
            mocks.findCursor.toArray.mockResolvedValueOnce(findCursorReturn);
          }
          async function act() {
            await sut.usersController.findAll(
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
              expect.objectContaining<Pick<Array<FindUserDto>, "length">>({
                length: findCursorReturn.length,
              })
            );
          }

          await arrange().then(act).then(assert);
        }
      );
    });

    it("when an error occurs, should call next with it", async () => {
      async function arrange() {
        mocks.findCursor.toArray.mockRejectedValueOnce(new Error());
      }
      async function act() {
        await sut.usersController.findAll(
          suiteInputs.request,
          expressSpies.response,
          expressMocks.nextFunction
        );
      }
      async function assert() {
        expect(expressMocks.nextFunction).toHaveBeenLastCalledWith(
          expect.any(Error)
        );
      }

      await arrange().then(act).then(assert);
    });
  });

  describe("create", () => {
    const suiteInputs = {} as { request: Request };

    beforeAll(() => {
      suiteInputs.request = {
        body: (({ email, password }: User) => ({ email, password }))(data.user),
      } as Partial<Request> as Request;
    });

    it("when request contains valid body, should respond with status CREATED, json of created user and location with it's id", async () => {
      async function arrange() {
        mocks.usersCollection.findOne.mockResolvedValueOnce(data.user);
      }
      async function act() {
        await sut.usersController.create(
          suiteInputs.request,
          expressSpies.response,
          expressMocks.nextFunction
        );
      }
      async function assert() {
        expect(expressSpies.response.status).toHaveBeenLastCalledWith(
          StatusCodes.CREATED
        );
        expect(expressSpies.response.json).toHaveBeenLastCalledWith(
          data.findUserDto
        );
      }

      await arrange().then(act).then(assert);
    });

    it("when request contains invalid body, should call next with Error", async () => {
      const input = {} as { request: Request };
      async function arrange() {
        input.request = {
          body: {},
        } as Request;
      }
      async function act() {
        await sut.usersController.create(
          input.request,
          expressSpies.response,
          expressMocks.nextFunction
        );
      }
      async function assert() {
        expect(expressMocks.nextFunction).toHaveBeenLastCalledWith(
          expect.any(Error)
        );
      }

      await arrange().then(act).then(assert);
    });
  });
});
