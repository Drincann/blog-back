import { errorTypes, ResponseError } from "../../../libs/error"
import { verify } from "../../../libs/jwt"

export const requireManager = (api: (...args: any[]) => any) => {
  return async ({ token, ...args }: { token: string }) => {
    const payload = verify(token)
    if (payload === null) {
      throw ResponseError.create(errorTypes['auth-error'])
    }
    return await api({ ...args })
  }
}