import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

function errorHandler(
  _error: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
}

export { errorHandler }
