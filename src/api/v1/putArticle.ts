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
  const objId = new ObjectId(_id)
  if (typeof _id === 'string') {
    var article = await articleColl.findOne({ _id: objId })
    if (article === null) throw ResponseError.create(errorTypes['article-not-found'])
  }

  const updater = {
    type,
    title, content,
    createAt, updateAt,
  }
  const { acknowledged } = await articleColl.updateOne({ _id: objId }, { $set: updater, })
  for (const key of Object.keys(updater)) {
    (article as WithId<Article>)[key] = updater[key]
  }
  return article
}