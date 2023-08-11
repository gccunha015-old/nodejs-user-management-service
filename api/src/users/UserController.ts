import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BASE_URL } from '../config/utils'
import { CreateUserDto } from './dtos/CreateUserDto'
import { UserService } from './UserService'
import { CreateUserError } from './errors/CreateUserError'
import { FindUserByIdError } from './errors/FindUserByIdError'

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
      const createUserDto = req.body as CreateUserDto
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
