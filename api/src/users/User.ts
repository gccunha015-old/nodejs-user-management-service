import { CreateUserDto } from './dtos/CreateUserDto'

interface User extends CreateUserDto {
  id: bigint
  external_id: string
  created_at: Date
}

export { User }
