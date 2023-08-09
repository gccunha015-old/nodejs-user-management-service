import { randomUUID } from 'node:crypto'
import { database } from '@config/database'
import { CreateUserDto } from './dtos/create'

class UserRepository {
  constructor(private readonly _users = database.user) {}

  async findAll() {
    return await this._users.findMany()
  }

  async create(createUserDto: CreateUserDto) {
    return await this._users.create({
      data: {
        ...createUserDto,
        external_id: randomUUID(),
        created_at: new Date()
      }
    })
  }
}

const userRepository = new UserRepository()

export { userRepository }
