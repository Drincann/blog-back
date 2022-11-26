import { errorTypes, ResponseError } from "../../../libs/error"
import { verify } from "../../../libs/jwt"

export const requireManager = (api: (...args: any[]) => any) => {
  return async ({ token, ...args }: { token: string }) => {
    const payload = await verify(token)
    if (payload === null) {
      throw ResponseError.create(errorTypes['verify-error'], { token })
    }
    return await api({ ...args })
  }
}