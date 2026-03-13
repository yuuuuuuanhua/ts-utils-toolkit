/**
 * Type-safe localStorage/sessionStorage wrapper
 */

interface StorageOptions {
  prefix?: string
  storage?: Storage
  ttl?: number // milliseconds
}

interface StorageItem<T> {
  value: T
  expires?: number
}

export function createStorage(options: StorageOptions = {}) {
  const { prefix = '', storage = typeof window !== 'undefined' ? window.localStorage : null } = options

  const getKey = (key: string) => prefix ? `${prefix}:${key}` : key

  return {
    get<T>(key: string, defaultValue?: T): T | undefined {
      if (!storage) return defaultValue
      try {
        const raw = storage.getItem(getKey(key))
        if (!raw) return defaultValue
        const item: StorageItem<T> = JSON.parse(raw)
        if (item.expires && Date.now() > item.expires) {
          storage.removeItem(getKey(key))
          return defaultValue
        }
        return item.value
      } catch {
        return defaultValue
      }
    },

    set<T>(key: string, value: T, ttl?: number): void {
      if (!storage) return
      const item: StorageItem<T> = { value }
      if (ttl) item.expires = Date.now() + ttl
      storage.setItem(getKey(key), JSON.stringify(item))
    },

    remove(key: string): void {
      storage?.removeItem(getKey(key))
    },

    clear(): void {
      if (!storage || !prefix) {
        storage?.clear()
        return
      }
      const keysToRemove: string[] = []
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i)
        if (key?.startsWith(prefix + ':')) keysToRemove.push(key)
      }
      keysToRemove.forEach((k) => storage.removeItem(k))
    },

    has(key: string): boolean {
      return this.get(key) !== undefined
    },
  }
}
