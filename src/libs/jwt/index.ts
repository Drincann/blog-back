import * as jose from 'jose'
import { KeyLike, JWTVerifyResult } from 'jose'
import fs from 'fs'
import path from 'path'
const pkcs8 = fs.readFileSync(path.resolve(__dirname, './../../../key/key'), 'utf8')
const spki = fs.readFileSync(path.resolve(__dirname, './../../../key/key.pem'), 'utf8')
const getPrivate = ((): () => Promise<KeyLike> => {
  const keyPromise = new Promise<KeyLike>((resolve, _) => {
    jose.importPKCS8(pkcs8, 'RS256').then(key => resolve(key as KeyLike))
  })
  return (): Promise<KeyLike> => keyPromise
})()
const getPublic = ((): () => Promise<KeyLike> => {
  const keyPromise = new Promise<KeyLike>((resolve, _) => {
    jose.importSPKI(spki, 'RS256').then(key => resolve(key as KeyLike))
  })
  return (): Promise<KeyLike> => keyPromise
})()

export const sign = async <T>(payload: T, exp?: string): Promise<string> => {
  return await new jose.SignJWT(payload as any)
    .setProtectedHeader({ alg: 'RS256' })
    .setIssuedAt()
    .setIssuer('blog-back')
    .setAudience('manager')
    .setExpirationTime(exp ?? '30d')
    .sign(await getPrivate())
}

export const verify = async <T>(token: string): Promise<T | null> => {
  let payload: T | null = null
  try {
    ({ payload } = (await jose.jwtVerify(token, await getPublic(), {
      issuer: 'blog-back',
      audience: 'manager',
    })) as any)
  } catch (error) { }
  return payload as T | null
}
