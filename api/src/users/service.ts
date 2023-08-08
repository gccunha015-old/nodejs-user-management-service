import { CreateUserDto } from './dtos/create.js'
import { userRepository } from './repository'

class UserService {
  constructor(private readonly _repository = userRepository) {}

  async findAll() {
    return await this._repository.findAll()
  }

  async create(createUserDto: CreateUserDto) {
    return await this._repository.create(createUserDto)
  }
}

const userService = new UserService()

export { userService }
