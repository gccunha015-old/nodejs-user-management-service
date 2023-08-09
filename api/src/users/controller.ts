import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BASE_URL } from '@config/utils'
import { CreateUserDto } from './dtos/create'
import { userService } from './service'
import { toErrorWithMessage } from '@error/utils'

class UserController {
  private readonly _baseUrl = `${BASE_URL}/users`
  constructor(private readonly _userService = userService) {}

  // async findAll(req: Request, res: Response) {
  //   return await this._userService.findAll()
  // }

  async create(req: Request, res: Response) {
    try {
      const createUserDto = req.body as CreateUserDto
      const createdUser = await this._userService.create(createUserDto)
      res
        .location(`${this._baseUrl}/${createdUser.external_id}`)
        .status(StatusCodes.CREATED)
        .json(createdUser)
    } catch (_error: unknown) {
      const error = toErrorWithMessage(_error) as Error
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Couldn't create user" + error.message })
    }
  }
}

const userController = new UserController()

export { userController }
