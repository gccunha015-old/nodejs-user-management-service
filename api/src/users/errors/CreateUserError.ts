import { StatusCodes } from 'http-status-codes'
import { HttpError } from '../../error/HttpError'

class CreateUserError extends HttpError {
  constructor(cause: unknown) {
    super(
      'Create User Error',
      'Missing or malformed fields.',
      StatusCodes.BAD_REQUEST,
      cause
    )
  }
}

export { CreateUserError }
