declare module 'google-it' {
  interface SearchOptions {
    query: string
    disableConsole?: boolean
  }
  interface SearchResult {
    link: string
    [key: string]: any
  }
  function googleIt(options: SearchOptions): Promise<SearchResult[]>
  export default googleIt
}
