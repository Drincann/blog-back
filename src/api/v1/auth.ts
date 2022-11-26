import config from "../../config"
import { gencode } from "../../libs/dynamicpwd"
import { errorTypes, ResponseError } from "../../libs/error"
import { sign } from "../../libs/jwt"

export const auth = async ({ code }: { code: string }) => {
  if (code === gencode()) {
    return { token: await sign({}, config.expireTime ?? '30d') }
  } else throw ResponseError.create(errorTypes['auth-error'], { message: `invalid code ${code}` })
}