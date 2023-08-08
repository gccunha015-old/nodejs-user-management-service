import { CreateUserDto } from './dtos/create-user.js'
import { userRepository } from './repository'

class UserService {
  constructor(private readonly repository = userRepository) {}

  async findAll() {
    return await this.repository.findAll()
  }

  async create(createUserDto: CreateUserDto) {
    return await this.repository.create(createUserDto)
  }
}

const userService = new UserService()

export { userService }
