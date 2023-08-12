import { StatusCodes } from 'http-status-codes'
import { HttpError } from '../../errors/HttpError'

class CreateSessionError extends HttpError {
  constructor(cause: unknown) {
    super(
      'CreateSessionError',
      'Missing or malformed fields.',
      StatusCodes.BAD_REQUEST,
      cause
    )
  }
}

export { CreateSessionError }
