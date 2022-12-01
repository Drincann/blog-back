import { ObjectId } from "mongodb"
import { Article, articleColl } from "../../db"
export const getArticles = async ({
  // 筛选条件
  _id, labels, type,
  // 分页
  limit = 10, skip = 0, order = [],
  // 数据投影
  addBrief = false, pick, exclude
}: Pick<Article, 'labels' | 'type'> & {
  _id: string, limit: number, skip: number, order: Array<[string, 1 | -1]>, addBrief: boolean, pick: (keyof Article)[], exclude: (keyof Article)[]
}): Promise<Array<Partial<Article> & { brief?: string }>> => {
  limit = Math.min(limit, 100)
  skip = Math.max(skip, 0)
  const query: any = {}
  if (typeof _id === 'string') query._id = new ObjectId(_id)
  if (Array.isArray(labels)) query.labels = { $in: labels }
  if (typeof type === 'string') query.type = type
  // TODO: 校验 order
  return (
    // 处理 order
    (await order.reduce(
      (cursor, [key, ord]) => cursor.sort(key, ord),
      articleColl.find(query)
    ).sort('_id', 1)
      // 处理数据变化
      .project({
        // 处理 breif
        ...addBrief === true ?
          { brief: { $substrCP: ['$content', 0, 100] } } : {},
        // 仅使用 pick exclude 其一，优先使用 pick
        ...Array.isArray(pick)
          ? Object.fromEntries(pick.map(field => [field, 1]))
          : (Array.isArray(exclude)
            ? Object.fromEntries(exclude.map(field => [field, 0]))
            : {}),

      })
      // 分页
      .limit(limit).skip(skip).toArray())
  )
}