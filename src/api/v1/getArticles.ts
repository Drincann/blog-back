import { ObjectId } from "mongodb"
import { Article, articleColl } from "../../db"

export const getArticles = async ({
  _id, labels, type, limit = 10, skip = 0,
}: Pick<Article, 'labels' | 'type'> & { _id: string, limit: number, skip: number }) => {
  limit = Math.min(limit, 100)
  skip = Math.max(skip, 0)
  const query: any = {}
  if (typeof _id === 'string') query._id = new ObjectId(_id)
  if (Array.isArray(labels)) query.labels = { $in: labels }
  if (typeof type === 'string') query.type = type
  return await articleColl.find(query).limit(limit).skip(skip).toArray()
}