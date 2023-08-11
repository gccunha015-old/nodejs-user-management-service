import { randomUUID } from 'node:crypto'
import { database } from '../config/database'
import { CreateUserDto } from './dtos/CreateSessionDto'
import { User } from './Session'

class UserRepository {
  constructor(private readonly _users = database.user) {}

  async findById(id: string): Promise<User> {
    return await this._users.findUniqueOrThrow({
      where: { external_id: id }
    })
  }

  async findAll(): Promise<User[]> {
    return await this._users.findMany()
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this._users.create({
      data: {
        ...createUserDto,
        external_id: randomUUID(),
        created_at: new Date()
      }
    })
  }
}

export { UserRepository }
