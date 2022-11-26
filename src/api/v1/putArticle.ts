import { articleColl } from "../../db/client"
import { Article } from "../../db/types"
import { ObjectId, WithId } from 'mongodb'
import { errorTypes, ResponseError } from "../../libs/error"
export const putArticle = async ({
  _id,
  type, // labels,
  title, content,
  createAt, updateAt,
  // comments,
}: Partial<Article & { _id: string }>) => {
  if (typeof _id !== 'string') throw ResponseError.create(errorTypes['param-error'], { params: '_id' })
  const objId = new ObjectId(_id)
  const article = await articleColl.findOne({ _id: objId })
  if (article === null) throw ResponseError.create(errorTypes['article-not-found'])
  const updater = {
    type,
    title, content,
    createAt: createAt, updateAt: updateAt ?? new Date(),
  }
  const { acknowledged } = await articleColl.updateOne({ _id: objId }, { $set: updater, })
  if (acknowledged) return await articleColl.findOne({ _id: objId })
  else throw { message: 'update failed' }
}