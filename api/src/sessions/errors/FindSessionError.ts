import { StatusCodes } from 'http-status-codes'
import { HttpError } from '../../errors/HttpError'

class FindSessionError extends HttpError {
  constructor(cause: unknown) {
    super('FindSessionError', 'Invalid id.', StatusCodes.NOT_FOUND, cause)
  }
}

export { FindSessionError }
