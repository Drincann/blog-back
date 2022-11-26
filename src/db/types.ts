export interface Article {
  type: 'card' | 'normal' | 'about' // default normal
  labels: string[]

  title: string
  content: string // markdown text

  createAt: Date
  updateAt: Date

  comments: Array<{
    name: string
    url: string

    ip: string
    browser: string
    createAt: string
  }>
}