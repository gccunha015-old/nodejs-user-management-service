import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { HttpError } from './HttpError'

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  const httpError = handleError(error)
  /* eslint-disable-next-line no-console */
  console.log(error)
  res.status(httpError.httpStatusCode).json(httpError.toRFC7807Standard())
}

function handleError(error: Error) {
  return error instanceof HttpError
    ? error
    : new HttpError(
        error.name,
        error.message,
        StatusCodes.INTERNAL_SERVER_ERROR,
        error
      )
}
