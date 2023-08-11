import { CreateUserDto } from './dtos/CreateUserDto'
import { FindUserDto } from './dtos/FindUserDto'
import { UserMapper } from './UserMapper'
import { UserRepository } from './UserRepository'

class UserService {
  constructor(private readonly _repository = new UserRepository()) {}

  async findById(id: string): Promise<FindUserDto> {
    return UserMapper.fromUserToFindUserDto(await this._repository.findById(id))
  }

  async findAll(): Promise<FindUserDto[]> {
    return (await this._repository.findAll()).map((user) =>
      UserMapper.fromUserToFindUserDto(user)
    )
  }

  async create(createUserDto: CreateUserDto): Promise<FindUserDto> {
    return UserMapper.fromUserToFindUserDto(
      await this._repository.create(createUserDto)
    )
  }
}

export { UserService }
