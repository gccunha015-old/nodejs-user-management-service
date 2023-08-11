import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { HttpError } from './HttpError'

function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  const httpError =
    error instanceof HttpError
      ? error
      : new HttpError(
          error.name,
          error.message,
          StatusCodes.INTERNAL_SERVER_ERROR,
          error
        )
  res.status(httpError.httpStatusCode).json(httpError.toRFC7807Standard())
}

export { errorHandler }
