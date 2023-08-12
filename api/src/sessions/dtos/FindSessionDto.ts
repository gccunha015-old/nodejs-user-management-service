import { CreateSessionDto } from './CreateSessionDto'

interface FindSessionDto extends CreateSessionDto {
  id: string
  created_at: Date
}

export { FindSessionDto }
