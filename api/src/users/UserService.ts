import { CreateUserDto } from './dtos/CreateUserDto'
import { FindUserDto } from './dtos/FindUserDto'
import { UserRepository } from './UserRepository'

class UserService {
  constructor(private readonly _repository = new UserRepository()) {}

  async findAll(): Promise<FindUserDto[]> {
    return (await this._repository.findAll()).map((user) =>
      user.mapToFindUserDto()
    )
  }

  async findById(id: string): Promise<FindUserDto> {
    return (await this._repository.findById(id)).mapToFindUserDto()
  }

  async create(createUserDto: CreateUserDto): Promise<FindUserDto> {
    return (await this._repository.create(createUserDto)).mapToFindUserDto()
  }
}

export { UserService }
