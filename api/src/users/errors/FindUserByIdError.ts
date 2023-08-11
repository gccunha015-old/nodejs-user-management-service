import { StatusCodes } from 'http-status-codes'
import { HttpError } from '../../errors/HttpError'

class FindUserByIdError extends HttpError {
  constructor(cause: unknown) {
    super('FindUserByIdError', 'Invalid id.', StatusCodes.NOT_FOUND, cause)
  }
}

export { FindUserByIdError }
