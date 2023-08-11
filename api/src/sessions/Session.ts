import { CreateUserDto } from './dtos/CreateSessionDto'

interface User extends CreateUserDto {
  id: bigint
  external_id: string
  created_at: Date
}

export { User }
