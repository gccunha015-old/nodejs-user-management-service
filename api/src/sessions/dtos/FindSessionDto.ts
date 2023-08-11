import { CreateUserDto } from './CreateSessionDto'

interface FindUserDto extends CreateUserDto {
  id: string
  created_at: Date
}

export { FindUserDto }
