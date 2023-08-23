import { User } from "./model";
import { IUsersRepository } from "./interfaces";

export class InMemoryUsersRepository implements IUsersRepository {
  private readonly _users: User[] = [];

  async findById(id: string): Promise<User> {
    const user = await Promise.resolve(
      this._users.find((u) => u.externalId === id)
    );
    if (!user) throw new Error(`User with id ${id} doesn't exist`);
    return user;
  }

  async findAll(): Promise<User[]> {
    return await Promise.resolve(this._users);
  }

  async create(newUser: User): Promise<User> {
    this._users.push(newUser);
    return await this.findById(newUser.externalId);
  }
}

export const usersRepository = new InMemoryUsersRepository();
