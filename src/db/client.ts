import { MongoClient } from 'mongodb'
import config from '../config'
import { Article } from './types'

export const mongoClient = new MongoClient(config.db.connStr)

export const db = mongoClient.db(config.db.dbName)

export const articleColl = db.collection<Article>('article')

export interface MongoStatus { status: 'connecting' | 'connected' | 'error', detail: string }
export const getMongoStatus = ((): () => MongoStatus => {
  let mongoStatus: MongoStatus = { status: 'connecting', detail: '' }
  const connect = () => {
    mongoClient.connect().then(() => {
      mongoStatus = { status: 'connected', detail: '' }
    }, e => {
      mongoStatus = { status: 'error', detail: typeof e?.message === 'string' ? e.message : JSON.stringify(e) }
      setTimeout(() => connect())
    })
  }
  connect()
  return () => mongoStatus
})()