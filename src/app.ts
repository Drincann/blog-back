import Koa from 'koa'
import koaBody from 'koa-body'
import { v1Router } from './router'
import config from './config'
import { getMongoStatus } from './db'
export const app = new Koa

// Body parser
app.use(koaBody({ jsonLimit: '20mb' }))

// Log request-response
if (config.env === 'dev') app.use(async (ctx, next) => {
  const now = Date.now()
  await next()
  console.log(new Date().toLocaleString() + `> ${ctx.path} -- ${Date.now() - now} ms\n` +
    ` <- ${JSON.stringify(ctx.request.body)}\n` +
    ` -> ${JSON.stringify(ctx.body)}\n`
  )
})

// Handle api
app.use(v1Router.middleware())

// Status by default
app.use(async (ctx, _) => {
  ctx.status = 200
  ctx.header['Content-Type'] = 'text/plain'
  const { status, detail } = getMongoStatus()
  ctx.body = `Blog backend is running on ${config.port}.
  env: ${config.env}
  mongodb: ${status}${detail !== '' ? ', ' + detail : ''}`
})
