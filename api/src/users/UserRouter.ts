import { Request, Response, Router } from 'express'
import {
  Result,
  ValidationError,
  checkSchema,
  validationResult
} from 'express-validator'
import { UserController } from './UserController'
import { CreateUserValidation } from './validations'
import { RequestValidationError } from '../errors'

class UserRouter {
  constructor(
    private readonly _controller = new UserController(),
    public readonly router = Router()
  ) {
    // router.get(
    //   '/:id',
    //   async (req, res) => await this._controller.findById(req, res)
    // )
    // router.get(
    //   '/',
    //   async (req, res) => await this._controller.findAll(req, res)
    // )

    router.post(
      '/',
      checkSchema(CreateUserValidation.schema),
      async (req: Request, res: Response) => {
        const validations: Result<ValidationError> = validationResult(req)
        if (!validations.isEmpty())
          throw new RequestValidationError(validations)
        await this._controller.create(req, res)
      }
    )
  }
}

export { UserRouter }
