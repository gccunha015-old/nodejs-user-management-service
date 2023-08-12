import { UUID } from 'node:crypto'
import { CreateUserRequestDto } from './CreateUserRequestDto'

interface CreateUserResponseDto extends CreateUserRequestDto {
  id: UUID
  created_at: Date
}

export { CreateUserResponseDto }
