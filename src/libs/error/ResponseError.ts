import { rawErrors } from "./errors"

const tmplReplace = (tmpl: string, data: any) => {
  return tmpl.replace(/\$\{(\w+)\}/g, (_, key) => data[key])
}

interface ResponseErrorDetail {
  [key: string]: any
  message?: string
}

export class ResponseError extends Error {
  constructor(
    public type: typeof rawErrors[keyof typeof rawErrors]['type'],
    public message: string,
    public code: number,
    public detail?: ResponseErrorDetail,
  ) {
    message = tmplReplace(message, { type, message, code, ...detail })
    super(message)
    // trace stack
    Error.captureStackTrace(this, ResponseError)
  }

  public static create(raw: typeof rawErrors[keyof typeof rawErrors], detail?: ResponseErrorDetail) {
    return new ResponseError(raw.type, raw.message, raw.code, detail)
  }

  public valueOf() {
    return {
      code: this.code,
      message: this.message,
      detail: this.detail,
    }
  }
}
