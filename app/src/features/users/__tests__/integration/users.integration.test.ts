import { randomUUID } from "node:crypto";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../../users-model";
import { FindUserDto, findUserDtoSchema } from "../../dtos";
import { UsersInMemoryRepository } from "../../users-repository";
import { UsersService } from "../../users-service";
import { UsersController } from "../../users-controller";
import { expressMocks } from "../../../../__mocks__";

describe("Users integration", () => {
  const stubs = {} as { id: string; user: User; findUserDto: FindUserDto };
  const sut = {} as {
    repository: UsersInMemoryRepository;
    service: UsersService;
    controller: UsersController;
  };

  beforeAll(() => {
    stubs.id = randomUUID();
    stubs.user = {
      externalId: stubs.id,
      email: "test@test.com",
      password: "password",
      createdAt: new Date(),
    };
    stubs.findUserDto = findUserDtoSchema.parse(stubs.user);
  });

  beforeEach(() => {
    sut.repository = new UsersInMemoryRepository();
    sut.service = new UsersService(sut.repository);
    sut.controller = new UsersController(sut.service);
  });

  describe("findById", () => {
    it("when request.params has valid id, should respond with status OK and json of user", async () => {
      const testStubs = {} as { request: Request };
      async function arrange() {
        sut.repository.create(stubs.user);
        testStubs.request = {
          params: { id: stubs.id },
        } as Partial<Request> as Request;
      }
      async function act() {
        await sut.controller.findById(
          testStubs.request,
          expressMocks.response,
          expressMocks.nextFunction
        );
      }
      async function assert() {
        expect(expressMocks.response.status).toHaveBeenLastCalledWith(
          StatusCodes.OK
        );
        expect(expressMocks.response.json).toHaveBeenLastCalledWith(
          stubs.findUserDto
        );
      }

      await arrange().then(act).then(assert);
    });

    it("when request has invalid id, should call next with error", async () => {
      const testStubs = {} as { request: Request };
      async function arrange() {
        testStubs.request = {
          params: { id: randomUUID() },
        } as Partial<Request> as Request;
      }
      async function act() {
        await sut.controller.findById(
          testStubs.request,
          expressMocks.response,
          expressMocks.nextFunction
        );
      }
      function assert() {
        expect(expressMocks.nextFunction.mock.lastCall?.[0]).toBeInstanceOf(
          Error
        );
      }

      await arrange().then(act).then(assert);
    });
  });

  /*
  describe("findAll", () => {
    it("should respond with status OK and json of 2 users", async () => {
      const testStubs = {} as { request: Request; users: User[] };
      async function arrange() {
        testStubs.request = {} as Request;
        testStubs.users = [
          stubs.user,
          { ...stubs.user, externalId: randomUUID() },
        ];
        mocks.usersService.findAll.mockResolvedValueOnce(testStubs.users);
      }
      async function act() {
        await sut.controller.findAll(
          testStubs.request,
          expressMocks.response,
          expressMocks.nextFunction
        );
      }
      async function assert() {
        expect(expressMocks.response.status).toHaveBeenLastCalledWith(StatusCodes.OK);
        expect(expressMocks.response.json.mock.lastCall?.[0]).toHaveLength(2);
      }

      await arrange().then(act).then(assert);
    });

    it("should respond with status OK and json of an empty array", async () => {
      const testStubs = {} as { request: Request };
      async function arrange() {
        testStubs.request = {} as Request;
        mocks.usersService.findAll.mockResolvedValueOnce([]);
      }
      async function act() {
        await sut.controller.findAll(
          testStubs.request,
          expressMocks.response,
          expressMocks.nextFunction
        );
      }
      function assert() {
        expect(expressMocks.response.status).toHaveBeenLastCalledWith(StatusCodes.OK);
        expect(expressMocks.response.json).toHaveBeenLastCalledWith([]);
      }

      await arrange().then(act).then(assert);
    });

    it("should call next with error", async () => {
      const testStubs = {} as { request: Request };
      async function arrange() {
        testStubs.request = {} as Request;
        mocks.usersService.findAll.mockRejectedValueOnce(new Error());
      }
      async function act() {
        await sut.controller.findAll(
          testStubs.request,
          expressMocks.response,
          expressMocks.nextFunction
        );
      }
      function assert() {
        expect(expressMocks.nextFunction.mock.lastCall?.[0]).toBeInstanceOf(Error);
      }

      await arrange().then(act).then(assert);
    });
  });

  describe("create", () => {
    const suiteMocks = {} as {
      creatUserDtoSchema: jest.MockedObjectDeep<typeof createUserDtoSchema>;
    };
    const suiteStubs = {} as { createUserDto: CreateUserDto };

    beforeAll(() => {
      suiteMocks.creatUserDtoSchema = jest.mocked(createUserDtoSchema);
      suiteStubs.createUserDto = {
        email: stubs.user.email,
        password: stubs.user.password,
      };
    });

    it("should respond with status CREATED, location containing user id and json of user", async () => {
      const testStubs = {} as { request: Request };
      async function arrange() {
        testStubs.request = {
          body: suiteStubs.createUserDto,
        } as Partial<Request> as Request;
        suiteMocks.creatUserDtoSchema.parseAsync.mockResolvedValueOnce(
          suiteStubs.createUserDto
        );
        mocks.usersService.create.mockResolvedValueOnce(stubs.user);
      }
      async function act() {
        return await sut.controller.create(
          testStubs.request,
          expressMocks.response,
          expressMocks.nextFunction
        );
      }
      async function assert() {
        expect(expressMocks.response.status).toHaveBeenLastCalledWith(
          StatusCodes.CREATED
        );
        expect(expressMocks.response.location.mock.lastCall?.[0]).toMatch(
          new RegExp(`${stubs.user.externalId}`)
        );
        expect(expressMocks.response.json).toHaveBeenLastCalledWith(
          await mocks.findUserDtoSchema.parseAsync.mock.results[0].value
        );
      }

      await arrange().then(act).then(assert);
    });

    it("should call next with error for invalid email", async () => {
      const testStubs = {} as {
        request: Request;
        createUserDto: CreateUserDto;
      };
      async function arrange() {
        testStubs.request = {
          body: suiteStubs.createUserDto,
        } as Partial<Request> as Request;
        testStubs.createUserDto = {
          ...suiteStubs.createUserDto,
          email: "test",
        };
        suiteMocks.creatUserDtoSchema.parseAsync.mockRejectedValueOnce(
          new Error()
        );
      }
      async function act() {
        return await sut.controller.create(
          testStubs.request,
          expressMocks.response,
          expressMocks.nextFunction
        );
      }
      function assert() {
        expect(expressMocks.nextFunction.mock.lastCall?.[0]).toBeInstanceOf(Error);
      }

      await arrange().then(act).then(assert);
    });

    it("should call next with error for invalid password", async () => {
      const testStubs = {} as {
        request: Request;
        createUserDto: CreateUserDto;
      };
      async function arrange() {
        testStubs.request = {
          body: suiteStubs.createUserDto,
        } as Partial<Request> as Request;
        testStubs.createUserDto = {
          ...suiteStubs.createUserDto,
          password: "pass",
        };
        suiteMocks.creatUserDtoSchema.parseAsync.mockRejectedValueOnce(
          new Error()
        );
      }
      async function act() {
        return await sut.controller.create(
          testStubs.request,
          expressMocks.response,
          expressMocks.nextFunction
        );
      }
      function assert() {
        expect(expressMocks.nextFunction.mock.lastCall?.[0]).toBeInstanceOf(Error);
      }

      await arrange().then(act).then(assert);
    });
  });
  */
});
