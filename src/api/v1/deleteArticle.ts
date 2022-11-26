import { ObjectId } from "mongodb"
import { articleColl } from "../../db"
import { errorTypes, ResponseError } from "../../libs/error"

export const deleteArticle = async ({ _id }: { _id: string }) => {
  if (typeof _id !== 'string') throw ResponseError.create(errorTypes['param-error'], { params: '_id' })
  const objId = new ObjectId(_id)
  const article = await articleColl.findOne({ _id: objId })
  if (article === null) throw ResponseError.create(errorTypes['article-not-found'])
  const { acknowledged } = await articleColl.deleteOne({ _id: objId })
  if (acknowledged) return { _id }
  else throw { message: 'delete failed' }
}
