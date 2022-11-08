import config from "../../config/config";

// TODO: 生产环境 log 选型
export const logger = config.env === 'dev' ? console : console;