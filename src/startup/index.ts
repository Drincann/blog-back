import { app } from '../app'
import config from '../config/config'

// Start server
app.listen(config.port, config.host ?? '127.0.0.1')

