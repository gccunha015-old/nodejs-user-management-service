import { User } from './Session'
import { FindUserDto } from './dtos/FindSessionDto'

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
