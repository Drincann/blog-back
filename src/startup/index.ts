import { app } from '../app'
import config from '../config/config'
import { reportError } from './helper/reportError'

// Handle unhandled
app.on('error', reportError)
process.on("unhandledRejection", reportError)
process.on('uncaughtException', reportError)

// Start server
app.listen(config.port, config.host ?? '127.0.0.1')

