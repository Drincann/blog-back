import 'koa-body'
import KoaRouter from 'koa-router'
import * as apis from '../api'
import { ResponseError, errorTypes } from '../libs/error'
import { logger } from '../libs/logger'
export const v1Router = new KoaRouter()

v1Router.post('/api/v1/:apiName', async ctx => {
  const api = (apis as any)[ctx.params?.apiName];
  ctx.status = 200
  if (api instanceof Function) {
    try {
      ctx.body = {
        code: 0,
        message: '',
        data: await api(ctx.request.body ?? {}),
      }
    } catch (error) {
      let errorVal: { code?: number, message?: string, detail?: any } = {}
      if (!(error instanceof ResponseError)) {
        error = typeof error === 'object' ? error : { message: error }
        errorVal = ResponseError.create(errorTypes.default, { ...(error as any) }).valueOf()
        logger.error('error', errorVal, error)
      } else {
        errorVal = error.valueOf()
      }
      ctx.body = { data: null, ...errorVal }
    }
  } else {
    const error = ResponseError.create(errorTypes['api-not-found'], { apiName: ctx.params?.apiName })
    const errorVal = error.valueOf()
    logger.error('error', errorVal)
    ctx.body = { data: null, ...errorVal }
  }
})
