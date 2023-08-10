import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BASE_URL } from '../config/utils'
import { CreateUserDto } from './dtos/CreateUserDto'
import { userService } from './service'
import { CreateUserError } from './errors/CreateUserError'

class UserController {
  private readonly _baseUrl = `${BASE_URL}/users`
  constructor(private readonly _userService = userService) {}

  async findAll(_req: Request, res: Response) {
    const users = await this._userService.findAll()
    res.status(StatusCodes.OK).json(users)
  }

  async create(req: Request, res: Response) {
    try {
      const createUserDto = req.body as CreateUserDto
      const createdUser = await this._userService.create(createUserDto)
      res
        .location(`${this._baseUrl}/${createdUser.external_id}`)
        .status(StatusCodes.CREATED)
        .json(createdUser)
    } catch (error: unknown) {
      throw new CreateUserError(error)
    }
  }
}

const userController = new UserController()

export { userController }
