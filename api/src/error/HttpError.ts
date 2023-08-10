import { StatusCodes } from 'http-status-codes'
import { toErrorWithMessage } from './utils'

class HttpError implements Error {
  readonly cause: Error
  constructor(
    readonly name: string,
    readonly message: string,
    readonly httpStatusCode: StatusCodes,
    cause: unknown
  ) {
    this.cause = toErrorWithMessage(cause)
  }

  /* Source:
    https://www.baeldung.com/rest-api-error-handling-best-practices
  */
  toRFC7807Standard() {
    return {
      type: `/errors/incorrect-user-pass`,
      title: `Incorrect username or password.`,
      detail: `Authentication failed due to incorrect username or password.`,
      instance: `/login/log/abc123`
    }
  }
}

export { HttpError }
