import { Request } from "express";
import { expressMocks } from "../../../../__mocks__";
import { UsersController } from "../../users-controller";
import { UsersService } from "../../users-service";

jest.deepUnmock("../../../../__mocks__");

jest.unmock("../../controller");
describe("UsersController", () => {
  const mocks = {} as { usersService: jest.MockedObjectDeep<UsersService> };
  const sut = {} as { controller: UsersController };

  beforeAll(() => {
    mocks.usersService = jest.mocked(new UsersService());
    sut.controller = new UsersController(mocks.usersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findById", () => {
    it("when request has params.id, should call response.status and response.json", async () => {
      const testStubs = {} as { request: Request };
      async function arrange() {
        testStubs.request = {
          params: { id: "0" },
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
        expect(expressMocks.response.status).toHaveBeenCalledTimes(1);
        expect(expressMocks.response.json).toHaveBeenCalledTimes(1);
      }

      await arrange().then(act).then(assert);
    });

    it("when an error occurs, should call next", async () => {
      const testStubs = {} as { request: Request };
      async function arrange() {
        testStubs.request = {} as Request;
      }
      async function act() {
        await sut.controller.findById(
          testStubs.request,
          expressMocks.response,
          expressMocks.nextFunction
        );
      }
      async function assert() {
        expect(expressMocks.nextFunction).toHaveBeenCalledTimes(1);
      }

      await arrange().then(act).then(assert);
    });
  });

  describe("findAll", () => {
    it("should call response.status and response.json", async () => {
      const testStubs = {} as { request: Request };
      async function arrange() {
        testStubs.request = {} as Request;
      }
      async function act() {
        await sut.controller.findAll(
          testStubs.request,
          expressMocks.response,
          expressMocks.nextFunction
        );
      }
      async function assert() {
        expect(expressMocks.response.status).toHaveBeenCalledTimes(1);
        expect(expressMocks.response.json).toHaveBeenCalledTimes(1);
      }

      await arrange().then(act).then(assert);
    });

    it("when an error occurs, should call next", async () => {
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
      async function assert() {
        expect(expressMocks.nextFunction).toHaveBeenCalledTimes(1);
      }

      await arrange().then(act).then(assert);
    });
  });

  describe("create", () => {
    it("when request has body, should call response.status, rensponse.location and response.json", async () => {
      const testStubs = {} as { request: Request };
      async function arrange() {
        testStubs.request = { body: {} } as Request;
      }
      async function act() {
        await sut.controller.create(
          testStubs.request,
          expressMocks.response,
          expressMocks.nextFunction
        );
      }
      async function assert() {
        expect(expressMocks.response.status).toHaveBeenCalledTimes(1);
        expect(expressMocks.response.location).toHaveBeenCalledTimes(1);
        expect(expressMocks.response.json).toHaveBeenCalledTimes(1);
      }

      await arrange().then(act).then(assert);
    });

    it("when an error occurs, should call next", async () => {
      const testStubs = {} as { request: Request };
      async function arrange() {
        testStubs.request = {} as Request;
      }
      async function act() {
        await sut.controller.create(
          testStubs.request,
          expressMocks.response,
          expressMocks.nextFunction
        );
      }
      async function assert() {
        expect(expressMocks.nextFunction).toHaveBeenCalledTimes(1);
      }

      await arrange().then(act).then(assert);
    });
  });
});
