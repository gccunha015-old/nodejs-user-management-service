import { randomUUID } from "node:crypto";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { UuidSchema } from "../../../utils";
import { UsersController } from "../controller";
import { User } from "../model";
import { UsersService } from "../service";
import { FindUserDto, FindUserDtoSchema } from "../dtos";

jest.unmock("bcrypt");
jest.unmock("zod");
jest.unmock("../model");

jest.unmock("../controller");
describe("UsersController", () => {
  const stubs = {} as { id: string; user: User; findUserDto: FindUserDto };
  const mocks = {} as {
    uuidSchema: jest.MockedObjectDeep<typeof UuidSchema>;
    findUserDtoSchema: jest.MockedObjectDeep<typeof FindUserDtoSchema>;
    usersService: jest.MockedObjectDeep<UsersService>;
    response: jest.MockedObjectDeep<Response>;
    nextFunction: jest.MockedFunction<NextFunction>;
  };
  const sut = {} as { controller: UsersController };

  beforeAll(() => {
    stubs.id = randomUUID();
    stubs.user = {
      externalId: stubs.id,
      email: "test@test.com",
      password: "password",
      createdAt: new Date(),
    };
    stubs.findUserDto = {
      ...(({ externalId: id, ...rest }) => ({ ...rest, id }))(stubs.user),
    };
    mocks.uuidSchema = jest.mocked(UuidSchema);
    mocks.findUserDtoSchema = jest.mocked(FindUserDtoSchema);
    mocks.usersService = jest.mocked(new UsersService());
    mocks.response = {
      status: jest.fn(() => mocks.response),
      json: jest.fn(),
    } as Partial<Response> as jest.MockedObjectDeep<Response>;
    mocks.nextFunction = jest.fn();
    sut.controller = new UsersController(mocks.usersService);
  });

  describe("findById", () => {
    it("should respond with status OK and json of user for valid id", async () => {
      const testStubs = {} as { request: Request };
      async function arrange() {
        testStubs.request = {
          params: { id: stubs.id },
        } as Partial<Request> as Request;
        mocks.uuidSchema.parseAsync.mockResolvedValueOnce(stubs.id);
        mocks.usersService.findById.mockResolvedValueOnce(stubs.user);
        mocks.findUserDtoSchema.parseAsync.mockResolvedValueOnce(
          stubs.findUserDto
        );
      }
      async function act() {
        try {
          return await sut.controller.findById(
            testStubs.request,
            mocks.response,
            mocks.nextFunction
          );
        } catch (error) {
          return error;
        }
      }
      function assert(actResult: unknown) {
        expect(actResult).not.toBeDefined();
        expect(mocks.response.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(mocks.response.json).toHaveBeenCalledWith(stubs.findUserDto);
      }

      await arrange().then(act).then(assert);
    });

    it("should call next with error for invalid id", async () => {
      const testStubs = {} as { id: string; request: Request; error: Error };
      async function arrange() {
        testStubs.id = "0";
        testStubs.request = {
          params: { id: testStubs.id },
        } as Partial<Request> as Request;
        testStubs.error = new Error();
        mocks.uuidSchema.parseAsync.mockRejectedValueOnce(testStubs.error);
      }
      async function act() {
        try {
          return await sut.controller.findById(
            testStubs.request,
            mocks.response,
            mocks.nextFunction
          );
        } catch (error) {
          return error;
        }
      }
      function assert(actResult: unknown) {
        expect(actResult).not.toBeDefined();
        expect(mocks.nextFunction).toHaveBeenCalledWith(testStubs.error);
      }

      await arrange().then(act).then(assert);
    });
  });
});
