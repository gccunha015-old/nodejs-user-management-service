import { NextFunction, Request, Response } from "express";
import { BASE_URL, UuidSchema } from "../../utils";
import { IUsersController, IUsersService } from "./interfaces";
import { CreateUserDtoSchema, FindUserDtoSchema } from "./dtos";
import { usersService } from "./service";

export class UserController implements IUsersController {
  private readonly _baseUrl = `${BASE_URL}/users`;
  private readonly _service: IUsersService;

  constructor(service: IUsersService = usersService) {
    this._service = service;
  }

  async findAll(req: Request, res: Response, nex: NextFunction): Promise<void> {
    try {
      const users = await this._service.findAll();
      const findUserDtos = await Promise.all(
        users.map((user) => FindUserDtoSchema.parseAsync(user))
      );
      res.status(200).send(findUserDtos);
    } catch (error) {
      nex(error);
    }
  }

  async findById(
    req: Request,
    res: Response,
    nex: NextFunction
  ): Promise<void> {
    try {
      const id = await UuidSchema.parseAsync(req.params.id);
      const user = await this._service.findById(id);
      const findUserDto = await FindUserDtoSchema.parseAsync(user);
      res.status(200).send(findUserDto);
    } catch (error) {
      nex(error);
    }
  }

  async create(req: Request, res: Response, nex: NextFunction): Promise<void> {
    try {
      const createUserDto = await CreateUserDtoSchema.parseAsync(req.body);
      const user = await this._service.create(createUserDto);
      const findUserDto = await FindUserDtoSchema.parseAsync(user);
      res
        .status(201)
        .location(`${this._baseUrl}/${findUserDto.id}`)
        .json(findUserDto);
    } catch (error) {
      nex(error);
    }
  }
}

export const usersController = new UserController();
