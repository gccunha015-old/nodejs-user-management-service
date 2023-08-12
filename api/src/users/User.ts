import { CreateUserRequestDto } from './dtos'

interface User extends CreateUserRequestDto {
  id: bigint
  external_id: string
  created_at: Date
}

export { User }
