import { randomUUID } from 'node:crypto'
import { database } from '../config/database'
import { CreateSessionDto } from './dtos'
import { Session } from './Session'

class SessionRepository {
  constructor(private readonly _sessions = database.session) {}

  // async findById(id: string): Promise<User> {
  //   return await this._sessions.findUniqueOrThrow({
  //     where: { external_id: id }
  //   })
  // }

  // async findAll(): Promise<User[]> {
  //   return await this._sessions.findMany()
  // }

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    return await this._sessions.create({
      data: {
        ...createSessionDto,
        external_id: randomUUID(),
        created_at: new Date()
      }
    })
  }
}

export { SessionRepository }
