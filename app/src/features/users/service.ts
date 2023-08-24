import { randomUUID } from "node:crypto";
import { FindUserDTO, FindUserDTOSchema, CreateUserDTO } from "./dtos";
import { IUsersService, IUsersRepository } from "./interfaces";
import { UserSchema } from "./model";
import { usersRepository } from "./repository";

export class UsersService implements IUsersService {
  private readonly _repository: IUsersRepository;

  constructor(repository: IUsersRepository = usersRepository) {
    this._repository = repository;
  }

  async findAll(): Promise<FindUserDTO[]> {
    const users = await this._repository.findAll();
    return await Promise.all(
      users.map(async (user) => await FindUserDTOSchema.parseAsync(user))
    );
  }

  async findById(id: string): Promise<FindUserDTO> {
    return await FindUserDTOSchema.parseAsync(
      await this._repository.findById(id)
    );
  }

  async create(newUserDTO: CreateUserDTO): Promise<FindUserDTO> {
    const newUser = await UserSchema.parseAsync({
      ...newUserDTO,
      externalId: randomUUID(),
      createdAt: new Date(),
    });
    return await FindUserDTOSchema.parseAsync(
      await this._repository.create(newUser)
    );
  }
}

export const usersService = new UsersService();
