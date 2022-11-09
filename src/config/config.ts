export default {
  port: 8080,
  host: undefined, // default 127.0.0.1
  env: 'dev',
  db: {
    connStr: 'mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority',
    dbName: 'blog',
  },
} as {
  port: number
  host: string | undefined
  env: 'dev' | 'prod'
  db: {
    connStr: string
    dbName: string
  }
}