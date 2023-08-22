import { User } from "./model";
import { IUserRepository } from "./interfaces";

export class InMemoryUserRepository implements IUserRepository {
  private readonly _users: User[] = [];

  findAll(): Promise<User[]> {
    return Promise.resolve(this._users);
  }

  findById(id: string): Promise<User | undefined> {
    return Promise.resolve(this._users.find((u) => u.externalId === id));
  }

  create(newUser: User): Promise<User | undefined> {
    this._users.push(newUser);
    return Promise.resolve(
      this._users.find((u) => u.externalId === newUser.externalId)
    );
  }
}
