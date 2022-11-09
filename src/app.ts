import Koa from 'koa'
import koaBody from 'koa-body'
import { v1Router } from './router'
import config from './config/config'

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
