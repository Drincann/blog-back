import * as crypto from 'crypto';
import config from './../../config'
// 动态口令
// 对时间戳取分钟数, sha1 后取前 hex 串前 6 位
export const gencode = () => {
  return crypto.createHash('sha1').update(Math.floor(Date.now() / (60 * 1000)) + '' + config.dynamicSecret).digest('hex').slice(0, 6);
}