import { User } from "./model";
import { IUsersRepository } from "./interfaces";

export class InMemoryUsersRepository implements IUsersRepository {
  private readonly _users: User[] = [];

  async findAll(): Promise<User[]> {
    return Promise.resolve(this._users);
  }

  async findById(id: string): Promise<User | undefined> {
    return Promise.resolve(this._users.find((u) => u.externalId === id));
  }

  async create(newUser: User): Promise<User | undefined> {
    this._users.push(newUser);
    return Promise.resolve(
      this._users.find((u) => u.externalId === newUser.externalId)
    );
  }
}

export const usersRepository = new InMemoryUsersRepository();
