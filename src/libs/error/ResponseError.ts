import { errorTypes } from "./errors"
import { tmplReplace } from "./helper/tmplReplace"


interface ResponseErrorDetail {
  [key: string]: any
  message?: string
}

export class ResponseError extends Error {
  constructor(
    private errorType: typeof errorTypes[keyof typeof errorTypes],
    public detail?: ResponseErrorDetail,
  ) {
    let { message, type, code } = errorType
    message = tmplReplace(message, { type, message, code, ...detail })
    super(message)
    Error.captureStackTrace(this, ResponseError.create)
  }

  public static create(errorType: typeof errorTypes[keyof typeof errorTypes], detail?: ResponseErrorDetail) {
    return new ResponseError(errorType, detail)
  }

  public valueOf() {
    return {
      code: this.errorType.code,
      message: this.message,
      detail: this.detail,
    }
  }
}
