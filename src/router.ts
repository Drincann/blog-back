import 'koa-body'
import KoaRouter from 'koa-router'
import * as apis from './api'
export const v1Router = new KoaRouter()

v1Router.post('/api/v1/:apiName', async ctx => {
  const api = (apis as any)[ctx.params?.apiName];
  if (api instanceof Function) {
    ctx.body = await api(ctx.request.body ?? {})
    ctx.status = 200
  } else {
    ctx.status = 404
  }
})
