import { logger } from "../../libs/logger/logger"

export const reportError = (error: Error) => {
  logger.error(error)
  // TODO: report
}