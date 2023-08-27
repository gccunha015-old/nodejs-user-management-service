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
  const UuidSchemaMock = jest.mocked(UuidSchema);
  const FindUserDtoSchemaMock = jest.mocked(FindUserDtoSchema);
  const usersServiceMock = jest.mocked(new UsersService());
  const controller = new UsersController(usersServiceMock);
  const idStub1 = randomUUID();
  const userStub1: User = {
    externalId: idStub1,
    email: "test@test.com",
    password: "password",
    createdAt: new Date(),
  };
  const findUserDtoStub1: FindUserDto = {
    ...(({ externalId: id, ...rest }) => ({ ...rest, id }))(userStub1),
  };
  const responseMock: Response = {
    status: jest.fn(() => responseMock),
    json: jest.fn(),
  } as Partial<Response> as Response;
  const nextFunctionMock: NextFunction = jest.fn();

  beforeEach(() => {
    FindUserDtoSchemaMock.parseAsync.mockClear();
  });

  describe("findById", () => {
    beforeEach(() => {
      UuidSchemaMock.parseAsync.mockClear();
      usersServiceMock.findById.mockClear();
    });

    it("should return user with valid id", async () => {
      let requestStub: Request;
      async function arrange() {
        requestStub = {
          params: { id: idStub1 },
        } as Partial<Request> as Request;
        UuidSchemaMock.parseAsync.mockResolvedValueOnce(idStub1);
        usersServiceMock.findById.mockResolvedValueOnce(userStub1);
        FindUserDtoSchemaMock.parseAsync.mockResolvedValueOnce(
          findUserDtoStub1
        );
      }
      async function act() {
        try {
          return await controller.findById(
            requestStub,
            responseMock,
            nextFunctionMock
          );
        } catch (error) {
          return error;
        }
      }
      function assert(actResult: unknown) {
        expect(actResult).not.toBeDefined();
        expect(responseMock.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(responseMock.json).toHaveBeenCalledWith(findUserDtoStub1);
        expect(UuidSchemaMock.parseAsync).toHaveBeenCalledWith(idStub1);
        expect(usersServiceMock.findById).toHaveBeenCalledWith(idStub1);
        expect(FindUserDtoSchemaMock.parseAsync).toHaveBeenCalledWith(
          userStub1
        );
        expect(nextFunctionMock).not.toHaveBeenCalled();
      }

      await arrange().then(act).then(assert);
    });

    it("should throw error for invalid id", async () => {
      let idStub2: string, requestStub: Request, errorStub: Error;
      async function arrange() {
        idStub2 = "2";
        requestStub = {
          params: { id: idStub2 },
        } as Partial<Request> as Request;
        errorStub = new Error();
        UuidSchemaMock.parseAsync.mockRejectedValueOnce(errorStub);
      }
      async function act() {
        try {
          return await controller.findById(
            requestStub,
            responseMock,
            nextFunctionMock
          );
        } catch (error) {
          return error;
        }
      }
      function assert(actResult: unknown) {
        expect(actResult).not.toBeDefined();
        expect(nextFunctionMock).toHaveBeenCalledWith(errorStub);
        expect(UuidSchemaMock.parseAsync).toHaveBeenCalledWith(idStub2);
        expect(usersServiceMock.findById).not.toHaveBeenCalled();
        expect(FindUserDtoSchemaMock.parseAsync).not.toHaveBeenCalled();
      }

      await arrange().then(act).then(assert);
    });
  });
});
