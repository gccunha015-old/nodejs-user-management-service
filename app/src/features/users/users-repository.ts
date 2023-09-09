import { Collection } from "mongodb";
import { database } from "../../database";
import { IUsersRepository, User } from "./types";

export class UsersRepository implements IUsersRepository {
  private readonly _users: Collection<User>;

  constructor(users: Collection<User> = database.collection<User>("users")) {
    this._users = users;
  }

  async findById(id: string): Promise<User> {
    const user = await this._users.findOne<User>(
      { externalId: id },
      { projection: { _id: 0 } }
    );
    if (!user) throw new Error(`User with id ${id} doesn't exist`);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this._users.find<User>({}, { projection: { _id: 0 } }).toArray();
  }

  async create(newUser: User): Promise<User> {
    await this._users.insertOne(newUser);
    return this.findById(newUser.externalId);
  }
}

export const usersRepository = new UsersRepository();
