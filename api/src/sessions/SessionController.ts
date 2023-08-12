import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BASE_URL } from '../config/utils'
import { CreateSessionDto } from './dtos/CreateSessionDto'
import { SessionService } from './SessionService'
import { encrypt } from '../utils'
import { UserService } from '../users/UserService'
import { CreateSessionError } from './errors'

class SessionController {
  private readonly _baseUrl = `${BASE_URL}/sessions`
  constructor(
    private readonly _service = new SessionService(),
    private readonly _userService = new UserService()
  ) {}

  // async findById(req: Request, res: Response): Promise<void> {
  //   try {
  //     const id = req.params.id
  //     const user = await this._service.findById(id)
  //     res.status(StatusCodes.OK).json(user)
  //   } catch (error: unknown) {
  //     throw new FindUserByIdError(error)
  //   }
  // }

  // async findAll(_req: Request, res: Response): Promise<void> {
  //   const users = await this._service.findAll()
  //   res.status(StatusCodes.OK).json(users)
  // }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const createSessionDto = {
        email: req.body.email as string,
        password: await encrypt(req.body.password as string)
      } as CreateSessionDto
      const session = await this._service.create(createSessionDto)
      res
        .location(`${this._baseUrl}/${session.id}`)
        .status(StatusCodes.CREATED)
        .json(session)
    } catch (error: unknown) {
      throw new CreateSessionError(error)
    }
  }
}

export { SessionController }
