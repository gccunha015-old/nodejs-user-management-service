import { randomUUID } from 'node:crypto'
import { prisma } from '@config/prisma'
import { CreateUserDto } from './dtos/create'

class UserRepository {
  constructor(private readonly _users = prisma.user) {}

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
