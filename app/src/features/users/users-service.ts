import { userSchema, findUserDtoSchema } from "./zod-schemas";
import {
  IUsersService,
  IUsersRepository,
  CreateUserDto,
  FindUserDto,
} from "./types";
import { usersRepository } from "./users-repository";

export class UsersService implements IUsersService {
  private readonly _repository: IUsersRepository;

  constructor(repository: IUsersRepository = usersRepository) {
    this._repository = repository;
  }

  async findById(id: string): Promise<FindUserDto> {
    const user = await this._repository.findById(id);
    return await findUserDtoSchema.parseAsync(user);
  }

  async findAll(): Promise<FindUserDto[]> {
    const users = await this._repository.findAll();
    return await Promise.all(
      users.map((user) => findUserDtoSchema.parseAsync(user))
    );
  }

  async create(createUserDto: CreateUserDto): Promise<FindUserDto> {
    const newUser = await userSchema.parseAsync(createUserDto);
    const user = await this._repository.create(newUser);
    return await findUserDtoSchema.parseAsync(user);
  }
}

export const usersService = new UsersService();
