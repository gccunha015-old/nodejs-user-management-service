import { Request, Response } from "express";
import { IUsersController, IUsersService } from "./interfaces";
import { CreateUserDTOSchema } from "./dtos";
import { usersService } from "./service";
import { encryptPassword } from "../utils";

export class UserController implements IUsersController {
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
      const { email, password } = req.body;
      const newUser = await CreateUserDTOSchema.parseAsync({
        email,
        password: await encryptPassword(password),
      });
      const user = await this._service.create(newUser);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export const usersController = new UserController(usersService);
