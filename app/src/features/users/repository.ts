import { User } from "./model";
import { IUsersRepository } from "./interfaces";

export class UsersInMemoryRepository implements IUsersRepository {
  private readonly _users: User[];

  constructor(users: User[] = []) {
    this._users = users;
  }

  async findById(id: string): Promise<User> {
    const user = this._users.find((u) => u.externalId === id);
    if (!user) throw new Error(`User with id ${id} doesn't exist`);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this._users;
  }

  async create(newUser: User): Promise<User> {
    this._users.push(newUser);
    return await this.findById(newUser.externalId);
  }
}

export const usersRepository = new UsersInMemoryRepository();
