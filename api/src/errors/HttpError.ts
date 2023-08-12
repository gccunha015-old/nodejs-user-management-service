import { StatusCodes } from 'http-status-codes'
import { toErrorWithMessage } from './utils'
import { Result, ValidationError } from 'express-validator'

class HttpError implements Error {
  readonly cause: Error | Result<ValidationError>
  constructor(
    readonly name: string,
    readonly message: string,
    readonly httpStatusCode: StatusCodes,
    cause: unknown
  ) {
    if (cause instanceof Result) this.cause = cause as Result<ValidationError>
    else this.cause = toErrorWithMessage(cause)
  }

  /* Source:
    https://www.baeldung.com/rest-api-error-handling-best-practices
  */
  toRFC7807Standard() {
    return {
      title: this.name,
      detail: this.message,
      causes:
        this.cause instanceof Result
          ? this.cause
              .formatWith((error): string => error.msg)
              .array({ onlyFirstError: true })
          : undefined
    }
  }
}

export { HttpError }
