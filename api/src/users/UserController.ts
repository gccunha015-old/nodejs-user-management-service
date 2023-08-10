import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BASE_URL } from '../config/utils'
import { CreateUserDto } from './dtos/CreateUserDto'
import { UserService } from './UserService'
import { CreateUserError } from './errors/CreateUserError'

class UserController {
  private readonly _baseUrl = `${BASE_URL}/users`
  constructor(private readonly _userService = new UserService()) {}

  async findAll(_req: Request, res: Response): Promise<void> {
    const users = await this._userService.findAll()
    res.status(StatusCodes.OK).json(users)
  }

  // async findById(req: Request, res: Response): Promise<void> {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const createUserDto = req.body as CreateUserDto
      const createdUser = await this._userService.create(createUserDto)
      res
        .location(`${this._baseUrl}/${createdUser.id}`)
        .status(StatusCodes.CREATED)
        .json(createdUser)
    } catch (error: unknown) {
      throw new CreateUserError(error)
    }
  }
}

export { UserController }
