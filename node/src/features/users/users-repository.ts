import { Collection, UUID } from "mongodb";
import { database } from "../../database";
import { IUsersRepository, User } from "./types";

export class UsersRepository implements IUsersRepository {
  private readonly _usersCollection: Collection<User>;

  constructor(
    usersCollection: Collection<User> = database.collection<User>("users")
  ) {
    this._usersCollection = usersCollection;
  }

  async findById(id: string): Promise<User> {
    const user = await this._usersCollection.findOne<User>(
      { external_id: new UUID(id) },
      { projection: { _id: 0 } }
    );
    if (!user) throw new Error(`User with id ${id} doesn't exist`);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this._usersCollection
      .find<User>({}, { projection: { _id: 0 } })
      .toArray();
  }

  async create(newUser: User): Promise<User> {
    await this._usersCollection.insertOne(newUser);
    return this.findById(newUser.external_id.toHexString());
  }
}

export const usersRepository = new UsersRepository();
