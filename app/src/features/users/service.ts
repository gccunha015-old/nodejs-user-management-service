import { CreateUserDto } from "./dtos";
import { IUsersService, IUsersRepository } from "./interfaces";
import { User, UserSchema } from "./model";
import { usersRepository } from "./repository";

export class UsersService implements IUsersService {
  private readonly _repository: IUsersRepository;

  constructor(repository: IUsersRepository = usersRepository) {
    this._repository = repository;
  }

  async findAll(): Promise<User[]> {
    return await this._repository.findAll();
  }

  async findById(id: string): Promise<User> {
    return await this._repository.findById(id);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await UserSchema.parseAsync(createUserDto);
    return await this._repository.create(newUser);
  }
}

export const usersService = new UsersService();
