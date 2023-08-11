import { User } from './User'
import { FindUserDto } from './dtos/FindUserDto'

class UserMapper {
  public static fromUserToFindUserDto({
    external_id,
    ...user
  }: User): FindUserDto {
    return {
      ...user,
      id: external_id
    }
  }
}

export { UserMapper }
