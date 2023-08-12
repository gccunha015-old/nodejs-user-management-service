import { UUID } from 'node:crypto'
import { CreateUserRequestDto, CreateUserResponseDto } from './dtos'
import { UserMapper } from './UserMapper'
import { UserRepository } from './UserRepository'

class UserService {
  constructor(private readonly _repository = new UserRepository()) {}

  // async findById(id: UUID): Promise<FindUserDto> {
  //   return UserMapper.fromUserToFindUserDto(await this._repository.findById(id))
  // }

  // async findAll(): Promise<FindUserDto[]> {
  //   return (await this._repository.findAll()).map((user) =>
  //     UserMapper.fromUserToFindUserDto(user)
  //   )
  // }

  async create(newUser: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    return UserMapper.fromUserToCreateUserResponseDto(
      await this._repository.create(newUser)
    )
  }
}

export { UserService }
