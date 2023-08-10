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
  if (error instanceof HttpError)
    res.status(error.httpStatusCode).json(error.toRFC7807Standard())
  else res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
}

export { errorHandler }
