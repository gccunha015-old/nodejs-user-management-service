import { UUID } from 'node:crypto'
import { User } from './User'
import { CreateUserResponseDto } from './dtos'

class UserMapper {
  public static fromUserToCreateUserResponseDto({
    external_id,
    ...user
  }: User): CreateUserResponseDto {
    return {
      ...user,
      id: external_id as UUID
    }
  }
}

export { UserMapper }
