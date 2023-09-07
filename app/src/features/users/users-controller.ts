import { NextFunction, Request, Response } from "express";
import { BASE_URL, uuidSchema } from "../../utils";
import { IUsersController, IUsersService } from "./interfaces";
import { createUserDtoSchema, findUserDtoSchema } from "./dtos";
import { usersService } from "./users-service";
import { StatusCodes } from "http-status-codes";

export class UsersController implements IUsersController {
  private readonly _baseUrl = `${BASE_URL}/users`;
  private readonly _service: IUsersService;

  constructor(service: IUsersService = usersService) {
    this._service = service;
  }

  async findById(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = await uuidSchema.parseAsync(request.params.id);
      const user = await this._service.findById(id);
      const findUserDto = await findUserDtoSchema.parseAsync(user);
      response.status(StatusCodes.OK).json(findUserDto);
    } catch (error) {
      next(error);
    }
  }

  async findAll(
    _request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await this._service.findAll();
      const findUserDtos = await Promise.all(
        users.map((user) => findUserDtoSchema.parseAsync(user))
      );
      response.status(StatusCodes.OK).json(findUserDtos);
    } catch (error) {
      next(error);
    }
  }

  async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const createUserDto = await createUserDtoSchema.parseAsync(request.body);
      const user = await this._service.create(createUserDto);
      const findUserDto = await findUserDtoSchema.parseAsync(user);
      response
        .status(StatusCodes.CREATED)
        .location(`${this._baseUrl}/${findUserDto.id}`)
        .json(findUserDto);
    } catch (error) {
      next(error);
    }
  }
}

export const usersController = new UsersController();
