import { articleColl } from "../../db/client";
import { Article } from "../../db/types";

export const postArticle = async ({
  type = 'normal', content, labels = [], title,
}: Pick<Article, 'type' | 'content' | 'labels' | 'title'>) => {
  if (content === undefined || content === null || title === undefined || title === null) {
    throw { message: 'content or title is undefined' }
  }
  const article = await articleColl.insertOne({
    type, content, labels, title,
  })
  if (article.acknowledged) {
    return (article as any)?.ops?.[0]
  } else throw { message: 'insert failed' }
}