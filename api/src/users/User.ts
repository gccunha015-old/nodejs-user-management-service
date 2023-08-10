import { CreateUserDto } from './dtos/CreateUserDto'
import { FindUserDto } from './dtos/FindUserDto'

interface IUser extends CreateUserDto {
  id: bigint
  external_id: string
  created_at: Date
}

class User implements IUser {
  public id: bigint
  public external_id: string
  public email: string
  public password: string
  public created_at: Date

  constructor({ id, external_id, email, password, created_at }: IUser) {
    this.id = id
    this.external_id = external_id
    this.email = email
    this.password = password
    this.created_at = created_at
  }

  public mapToFindUserDto(): FindUserDto {
    return {
      id: this.external_id,
      email: this.email,
      password: this.password,
      created_at: this.created_at
    }
  }
}

export { User }
