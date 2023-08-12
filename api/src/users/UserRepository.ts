import { UUID, randomUUID } from 'node:crypto'
import { database } from '../config/database'
import { CreateUserRequestDto } from './dtos'
import { User } from './User'

class UserRepository {
  constructor(private readonly _users = database.user) {}

  // async findById(id: UUID): Promise<User> {
  //   return await this._users.findUniqueOrThrow({
  //     where: { external_id: id }
  //   })
  // }

  // async findAll(): Promise<User[]> {
  //   return await this._users.findMany()
  // }

  async create(newUser: CreateUserRequestDto): Promise<User> {
    return await this._users.create({
      data: {
        ...newUser,
        external_id: randomUUID(),
        created_at: new Date()
      }
    })
  }
}

export { UserRepository }
