import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BASE_URL } from '../config/utils'
import { CreateUserDto } from './dtos/CreateSessionDto'
import { UserService } from './SessionService'
import { CreateUserError } from './errors/CreateSessionError'
import { FindUserByIdError } from './errors/FindSessionError'
import { encrypt } from '../utils'

class UserController {
  private readonly _baseUrl = `${BASE_URL}/users`
  constructor(private readonly _service = new UserService()) {}

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id
      const user = await this._service.findById(id)
      res.status(StatusCodes.OK).json(user)
    } catch (error: unknown) {
      throw new FindUserByIdError(error)
    }
  }

  async findAll(_req: Request, res: Response): Promise<void> {
    const users = await this._service.findAll()
    res.status(StatusCodes.OK).json(users)
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const createUserDto = {
        email: req.body.email as string,
        password: await encrypt(req.body.password as string)
      } as CreateUserDto
      const user = await this._service.create(createUserDto)
      res
        .location(`${this._baseUrl}/${user.id}`)
        .status(StatusCodes.CREATED)
        .json(user)
    } catch (error: unknown) {
      throw new CreateUserError(error)
    }
  }
}

export { UserController }
