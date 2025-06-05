import { extract } from 'article-parser'

export async function fetchArticleText(url: string): Promise<string> {
  const article = await extract(url)
  return article.content || ''
}
