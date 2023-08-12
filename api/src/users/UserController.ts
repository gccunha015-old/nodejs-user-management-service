import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BASE_URL } from '../config/utils'
import { CreateUserRequestDto, CreateUserResponseDto } from './dtos'
import { UserService } from './UserService'
import { CreateUserError, FindUserByIdError } from './errors'
import { encrypt } from '../utils'
import { UUID } from 'node:crypto'

class UserController {
  private readonly _baseUrl = `${BASE_URL}/users`
  constructor(private readonly _service = new UserService()) {}

  // async findById(req: Request, res: Response): Promise<void> {
  //   try {
  //     const id = req.params.id as UUID
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
      const newUser: CreateUserRequestDto = {
        email: req.body.email as string,
        password: await encrypt(req.body.password as string)
      }
      const createdUser: CreateUserResponseDto = await this._service.create(
        newUser
      )
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
