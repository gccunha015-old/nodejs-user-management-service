import { CreateUserDto } from './CreateUserRequestDto'

interface FindUserDto extends CreateUserDto {
  id: string
  created_at: Date
}

export { FindUserDto }
