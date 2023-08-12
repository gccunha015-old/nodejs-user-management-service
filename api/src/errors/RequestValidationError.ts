import { StatusCodes } from 'http-status-codes'
import { HttpError } from './HttpError'
import { Result, ValidationError } from 'express-validator'

export class RequestValidationError extends HttpError {
  constructor(validations: Result<ValidationError>) {
    super(
      'RequestValidationError',
      'One or more fields have invalid values.',
      StatusCodes.BAD_REQUEST,
      validations
    )
  }
}
