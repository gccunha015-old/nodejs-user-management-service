import { Request, Response } from "express";
import { IUsersController, IUsersService } from "./interfaces";
import { CreateUserDTOSchema } from "./dtos";
import { usersService } from "./service";
import { BASE_URL, hashString } from "../utils";

export class UserController implements IUsersController {
  private readonly _baseUrl = `${BASE_URL}/users`;
  private readonly _service: IUsersService;

  constructor(service: IUsersService) {
    this._service = service;
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await this._service.findAll();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const user = await this._service.findById(req.params.id);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const newUser = await CreateUserDTOSchema.parseAsync(req.body);
      newUser.password = await hashString(newUser.password);
      const user = await this._service.create(newUser);
      res.status(201).location(`${this._baseUrl}/${user.id}`).json(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export const usersController = new UserController(usersService);
