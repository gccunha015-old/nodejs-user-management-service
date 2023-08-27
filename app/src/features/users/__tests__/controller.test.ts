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
      usersServiceMock.findById.mockClear();
    });

    it("should return user with valid id", async () => {
      const requestStub: Request = {
        params: { id: idStub1 },
      } as Partial<Request> as Request;
      async function arrange() {
        UuidSchemaMock.parseAsync.mockResolvedValueOnce(idStub1);
        usersServiceMock.findById.mockResolvedValueOnce(userStub1);
        FindUserDtoSchemaMock.parseAsync.mockResolvedValueOnce(
          findUserDtoStub1
        );
      }
      async function act() {
        await controller.findById(requestStub, responseMock, nextFunctionMock);
      }
      function assert() {
        expect(responseMock.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(responseMock.json).toHaveBeenCalledWith(findUserDtoStub1);
        expect(UuidSchemaMock.parseAsync).toHaveBeenCalledWith(idStub1);
        expect(usersServiceMock.findById).toHaveBeenCalledWith(idStub1);
        expect(FindUserDtoSchemaMock.parseAsync).toHaveBeenCalledWith(
          userStub1
        );
      }

      await arrange().then(act).then(assert);
    });

    it("should throw error for invalid id", async () => {
      const idStub2 = "2";
      const requestStub: Request = {
        params: { id: idStub2 },
      } as Partial<Request> as Request;
      const errorStub = new Error();
      async function arrange() {
        UuidSchemaMock.parseAsync.mockRejectedValueOnce(errorStub);
      }
      async function act() {
        await controller.findById(requestStub, responseMock, nextFunctionMock);
      }
      function assert() {
        expect(nextFunctionMock).toHaveBeenCalledWith(errorStub);
        expect(UuidSchemaMock.parseAsync).toHaveBeenCalledWith(idStub2);
        expect(usersServiceMock.findById).not.toHaveBeenCalled();
        expect(FindUserDtoSchemaMock.parseAsync).not.toHaveBeenCalled();
      }

      await arrange().then(act).then(assert);
    });
  });
});
