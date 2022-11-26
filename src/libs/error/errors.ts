export const errorTypes = {
  'default': {
    type: 'default',
    code: -1, message: 'default error: ${message}',
  },
  'article-not-found': {
    type: 'article-not-found',
    code: 1, message: 'article not found',
  },
  'api-not-found': {
    type: 'api-not-found',
    code: 2, message: 'api not found: ${apiName}',
  },
  'param-error': {
    type: 'param-error',
    code: 3, message: 'param error: ${params}',
  },
}