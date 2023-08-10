import { CreateUserDto } from './CreateUserDto'

interface FindUserDto extends CreateUserDto {
  id: string
  created_at: Date
}

export { FindUserDto }
