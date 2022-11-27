import Koa from 'koa'
import koaBody from 'koa-body'
import koaStatic from 'koa-static'
import path from 'path'
import { v1Router } from './router'
import config from './config'
import { getMongoStatus } from './db'
export const app = new Koa

// Body parser
app.use(koaBody({ jsonLimit: '20mb' }))

// Log request-response
app.use(async (ctx, next) => {
  const now = Date.now()
  await next()
  console.log(new Date().toLocaleString() + `> ${ctx.path} -- ${Date.now() - now} ms\n` +
    ` <- ${JSON.stringify(ctx.request.body)}\n` +
    ` -> ${JSON.stringify(ctx.body)}\n`
  )
})

// Handle static
app.use(koaStatic(path.resolve(__dirname, '../public/index.html'))) // no cache
app.use(koaStatic(path.resolve(__dirname, '../public'), { maxage: 1000 * 60 * 60 * 24 * 30 })) // cache 30 days

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
