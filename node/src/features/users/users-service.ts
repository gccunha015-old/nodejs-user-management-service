import { userSchema, findUserDtoTransform } from "./zod-parsers";
import {
  IUsersService,
  IUsersRepository,
  CreateUserDto,
  FindUserDto,
  UpdateUserDto,
  User,
} from "./types";
import { usersRepository } from "./users-repository";

export class UsersService implements IUsersService {
  private readonly _repository: IUsersRepository;

  constructor(repository: IUsersRepository = usersRepository) {
    this._repository = repository;
  }

  async findById(id: string): Promise<FindUserDto> {
    const user = await this._findById(id);
    return await findUserDtoTransform.parseAsync(user);
  }

  async findAll(): Promise<FindUserDto[]> {
    const users = await this._repository.findAll();
    return await Promise.all(
      users.map((user) => findUserDtoTransform.parseAsync(user))
    );
  }

  async create(createUserDto: CreateUserDto): Promise<FindUserDto> {
    const newUser = await userSchema.parseAsync(createUserDto);
    const user = await this._repository.create(newUser);
    return await findUserDtoTransform.parseAsync(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<FindUserDto> {
    // If a property is undefined, will it overwrite?
    const user: User = { ...(await this._findById(id)), ...updateUserDto };
    const updatedUser = await this._repository.update(user);
    return await findUserDtoTransform.parseAsync(updatedUser);
  }

  private async _findById(id: string): Promise<User> {
    return this._repository.findById(id);
  }
}

export const usersService = new UsersService();
