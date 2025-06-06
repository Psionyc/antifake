import googleIt from 'google-it'

const credibleDomains = ['theguardian.com', 'twitter.com']

export async function findCredibleSources(query: string): Promise<string[]> {
  try {
    const results = await googleIt({ query, disableConsole: true }) as any[]
    const domains = results.map(r => {
      try {
        return new URL(r.link).hostname.replace(/^www\./, '')
      } catch {
        return ''
      }
    })
    const found: string[] = []
    for (const cd of credibleDomains) {
      if (domains.some(d => d.includes(cd))) found.push(cd)
    }
    return [...new Set(found)]
  } catch (err) {
    console.error('google search error', err)
    return []
  }
}
