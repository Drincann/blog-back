import { Context } from "koa"
import etag from 'etag'
export const setETag = async (ctx: Context, next: () => Promise<any>) => {
  await next()
  ctx.set('Cache-Control', 'no-cache')
  if (ctx.status === 200) {
    let body = ctx.body
    if (!(typeof body === 'string') || !Buffer.isBuffer(body)) body = JSON.stringify(body)
    ctx.etag = etag(body as string | Buffer /* no impl of StatsLike */)
    console.log(ctx.get('If-None-Match'), ctx.etag, ctx.fresh,)
    if (ctx.get('If-None-Match') === ctx.etag
      // 不使用 ctx.fresh，因为它会忽略 PUT/POST 请求中的 If-None-Match
    ) {
      ctx.status = 304
      ctx.body = ''
    }
  }
}