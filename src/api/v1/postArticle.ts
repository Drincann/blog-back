import { articleColl } from "../../db/client";
import { Article } from "../../db/types";
import { errorTypes, ResponseError } from "../../libs/error";
import { requireManager } from "./decorator/requireManager";

export const postArticle = requireManager(async ({
  type = 'normal', content, labels = [], title,
}: Pick<Article, 'type' | 'content' | 'labels' | 'title'>) => {
  if (content === undefined || content === null || title === undefined || title === null) {
    throw ResponseError.create(errorTypes['param-error'], { params: 'content, title' })
  }
  const article = await articleColl.insertOne({
    type, content, labels, title,
    createAt: new Date(), updateAt: new Date(),
  })
  if (article.acknowledged) {
    return (article as any)?.ops?.[0]
  } else throw { message: 'insert failed' }
})
