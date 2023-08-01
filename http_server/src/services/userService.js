import { User} from '../entities/User.js'
import { userRepository } from "../repositories/userRepository.js"

class UserService {
  constructor(repository = userRepository) {
    this.repository = repository
  }

  async findAll() {
    return await this.repository.findAll()
  }

  async create(parsedData) {
    const user = new User(parsedData)
    return await this.repository.create(user)
  }
}

const userService = new UserService()

export { userService }