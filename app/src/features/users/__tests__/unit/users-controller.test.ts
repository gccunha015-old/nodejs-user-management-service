import { Request } from "express";
import {
  expressMocks,
  expressSpies,
} from "../../../../__mocks__/express-doubles";
import { uuidSchema } from "../../../../utils";
import { UsersController } from "../../users-controller";
import { UsersService } from "../../users-service";
import { createUserDtoSchema } from "../../zod-schemas";
import { FindUserDto } from "../../types";

jest.unmock("../../users-controller");
describe("Unit Testing | UsersController", () => {
  const mocks = {} as {
    usersService: jest.MockedObjectDeep<UsersService>;
  };
  const sut = {} as { controller: UsersController };

  beforeAll(() => {
    mocks.usersService = jest.mocked(new UsersService());
    sut.controller = new UsersController(mocks.usersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findById", () => {
    const suiteInputs = {} as { request: Request };
    const suiteMocks = {} as {
      uuidSchema: jest.MockedObjectDeep<typeof uuidSchema>;
    };

    beforeAll(() => {
      suiteInputs.request = {
        params: { id: "0" },
      } as Partial<Request> as Request;
      suiteMocks.uuidSchema = jest.mocked(uuidSchema);
    });

    it("should call uuidSchema.parseAsync, usersService.findById, response.status and response.json", async () => {
      async function arrange() {}
      async function act() {
        await sut.controller.findById(
          suiteInputs.request,
          expressSpies.response,
          expressMocks.nextFunction
        );
      }
      async function assert() {
        expect(suiteMocks.uuidSchema.parseAsync).toHaveBeenLastCalledWith(
          suiteInputs.request.params.id
        );
        expect(mocks.usersService.findById).toHaveBeenCalledTimes(1);
        expect(expressSpies.response.status).toHaveBeenCalledTimes(1);
        expect(expressSpies.response.json).toHaveBeenCalledTimes(1);
      }

      await arrange().then(act).then(assert);
    });

    it("when an error occurs, should call next with it", async () => {
      const testStubReturns = {} as { uuidSchema: { parseAsync: Error } };
      async function arrange() {
        testStubReturns.uuidSchema = { parseAsync: new Error() };
        suiteMocks.uuidSchema.parseAsync.mockRejectedValueOnce(
          testStubReturns.uuidSchema.parseAsync
        );
      }
      async function act() {
        await sut.controller.findById(
          suiteInputs.request,
          expressSpies.response,
          expressMocks.nextFunction
        );
      }
      async function assert() {
        expect(suiteMocks.uuidSchema.parseAsync).toHaveBeenLastCalledWith(
          suiteInputs.request.params.id
        );
        expect(expressMocks.nextFunction).toHaveBeenLastCalledWith(
          testStubReturns.uuidSchema.parseAsync
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

    it("should call usersService.findAll, response.status and response.json", async () => {
      async function arrange() {}
      async function act() {
        await sut.controller.findAll(
          suiteInputs.request,
          expressSpies.response,
          expressMocks.nextFunction
        );
      }
      async function assert() {
        expect(mocks.usersService.findAll).toHaveBeenCalledTimes(1);
        expect(expressSpies.response.status).toHaveBeenCalledTimes(1);
        expect(expressSpies.response.json).toHaveBeenCalledTimes(1);
      }

      await arrange().then(act).then(assert);
    });

    it("when an error occurs, should call next with it", async () => {
      const testStubReturns = {} as { usersService: { findAll: Error } };
      async function arrange() {
        testStubReturns.usersService = { findAll: new Error() };
        mocks.usersService.findAll.mockRejectedValueOnce(
          testStubReturns.usersService.findAll
        );
      }
      async function act() {
        await sut.controller.findAll(
          suiteInputs.request,
          expressSpies.response,
          expressMocks.nextFunction
        );
      }
      async function assert() {
        expect(mocks.usersService.findAll).toHaveBeenCalledTimes(1);
        expect(expressMocks.nextFunction).toHaveBeenLastCalledWith(
          testStubReturns.usersService.findAll
        );
      }

      await arrange().then(act).then(assert);
    });
  });

  describe("create", () => {
    const suiteInputs = {} as { request: Request };
    const suiteMocks = {} as {
      createUserDtoSchema: jest.MockedObjectDeep<typeof createUserDtoSchema>;
    };

    beforeAll(() => {
      suiteInputs.request = {
        body: {},
      } as Partial<Request> as Request;
      suiteMocks.createUserDtoSchema = jest.mocked(createUserDtoSchema);
    });

    it("should call createUserDtoSchema.parseAsync, usersService.create, response.status, response.location and response.json", async () => {
      const testStubReturns = {} as {
        createUserDtoSchema: { parseAsync: FindUserDto };
      };
      async function arrange() {
        testStubReturns.createUserDtoSchema = {
          parseAsync: { id: "0" } as FindUserDto,
        };
        mocks.usersService.create.mockResolvedValueOnce(
          testStubReturns.createUserDtoSchema.parseAsync
        );
      }
      async function act() {
        await sut.controller.create(
          suiteInputs.request,
          expressSpies.response,
          expressMocks.nextFunction
        );
      }
      async function assert() {
        expect(
          suiteMocks.createUserDtoSchema.parseAsync
        ).toHaveBeenLastCalledWith(suiteInputs.request.body);
        expect(mocks.usersService.create).toHaveBeenCalledTimes(1);
        expect(expressSpies.response.status).toHaveBeenCalledTimes(1);
        expect(expressSpies.response.location).toHaveBeenCalledTimes(1);
        expect(expressSpies.response.json).toHaveBeenCalledTimes(1);
      }

      await arrange().then(act).then(assert);
    });

    it("when an error occurs, should call next with it", async () => {
      const testStubReturns = {} as {
        createUserDtoSchema: { parseAsync: Error };
      };
      async function arrange() {
        testStubReturns.createUserDtoSchema = { parseAsync: new Error() };
        suiteMocks.createUserDtoSchema.parseAsync.mockRejectedValueOnce(
          testStubReturns.createUserDtoSchema.parseAsync
        );
      }
      async function act() {
        await sut.controller.create(
          suiteInputs.request,
          expressSpies.response,
          expressMocks.nextFunction
        );
      }
      async function assert() {
        expect(
          suiteMocks.createUserDtoSchema.parseAsync
        ).toHaveBeenLastCalledWith(suiteInputs.request.body);
        expect(expressMocks.nextFunction).toHaveBeenLastCalledWith(
          testStubReturns.createUserDtoSchema.parseAsync
        );
      }

      await arrange().then(act).then(assert);
    });
  });
});
