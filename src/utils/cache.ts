class LocalCache {
  prefix: string

  constructor(prefix: string) {
    this.prefix = prefix
  }

  setCache(key: string, value: any) {
    window.localStorage.setItem(`${this.prefix}-${key}`, JSON.stringify(value))
  }

  getCache(key: string) {
    const value = window.localStorage.getItem(`${this.prefix}-${key}`)
    if (value) {
      return JSON.parse(value)
    }
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(`${this.prefix}-${key}`)
  }

  clearCache() {
    window.localStorage.clear()
  }
}

export const localCache = new LocalCache('medical')
