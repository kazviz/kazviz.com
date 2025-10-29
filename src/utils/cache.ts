// Universal modular cache utility for any data type
// Usage: const cache = new Cache<DataType>(...)

export interface CacheOptions<T> {
  keyPrefix: string
  version: string
  expiry: number // ms
  serialize?: (data: T) => any
  deserialize?: (raw: any) => T
}

export class Cache<T> {
  private memory = new Map<string, T>()
  public metrics = {
    cacheHits: 0,
    cacheMisses: 0,
    fetchCount: 0,
    totalFetchTime: 0
  }
  private options: CacheOptions<T>
  private localKey: string
  // Keep last raw storage string to detect external updates
  private lastStorageRaw: string | null = null

  constructor(options: CacheOptions<T>) {
    this.options = options
    // Namespace the localStorage key with the cache version so different
    // build/deploy versions don't stomps each other's stored JSON.
    this.localKey = `${options.keyPrefix}_${options.version}_cache`
    this.loadFromStorage()

    // Listen for cross-window/tab updates to this cache key.
    // When another context updates localStorage, update in-memory map once.
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      try {
        // Listen for changes on either the versioned key or the legacy key
        // and reload from storage when they change. We call loadFromStorage()
        // which will prefer the versioned key and fallback to legacy if
        // present to allow an optional migration path.
        window.addEventListener("storage", (ev: StorageEvent) => {
          if (!ev.key) return
          const legacyKey = options.keyPrefix + "_cache"
          if (ev.key !== this.localKey && ev.key !== legacyKey) return
          // Defer to loadFromStorage which will read the correct key
          try {
            this.loadFromStorage()
          } catch {
            /* ignore */
          }
        })
      } catch (e) {
        // ignore
      }
    }
  }

  // Synchronous save (no debounce) used when migrating versions so we can
  // immediately persist under a new localStorage key.
  private saveToStorageSync() {
    if (typeof window === "undefined" || typeof localStorage === "undefined")
      return
    try {
      const data: Record<string, any> = {}
      for (const [key, value] of this.memory.entries()) {
        data[key] = this.options.serialize
          ? this.options.serialize(value)
          : value
      }
      const raw = JSON.stringify({
        version: this.options.version,
        data,
        timestamp: Date.now()
      })
      localStorage.setItem(this.localKey, raw)
      this.lastStorageRaw = raw
    } catch (e) {
      // ignore
    }
  }

  // Change cache version at runtime: migrate stored data to a new versioned
  // localStorage key and clean up older versioned keys to avoid accumulation.
  setVersion(newVersion: string) {
    if (!newVersion || newVersion === this.options.version) return

    const oldLocalKey = this.localKey
    try {
      // Update options and localKey first so save will write to new key
      this.options.version = newVersion
      this.localKey = `${this.options.keyPrefix}_${newVersion}_cache`

      // Persist current memory to new version key immediately
      this.saveToStorageSync()

      // Cleanup other keys that match the pattern to avoid unbounded growth
      try {
        const prefix = this.options.keyPrefix + "_"
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i)
          if (!k) continue
          // Remove legacy unversioned key and any other versioned keys except current
          if (
            k === this.options.keyPrefix + "_cache" ||
            (k.startsWith(prefix) &&
              k.endsWith("_cache") &&
              k !== this.localKey)
          ) {
            try {
              localStorage.removeItem(k)
            } catch {}
          }
        }
      } catch {}

      // Remove oldLocalKey if still present and different
      if (oldLocalKey && oldLocalKey !== this.localKey) {
        try {
          localStorage.removeItem(oldLocalKey)
        } catch {}
      }
    } catch (e) {
      // ignore
    }
  }

  private loadFromStorage() {
    if (typeof window === "undefined" || typeof localStorage === "undefined")
      return
    try {
      // Prefer versioned key
      let cached = localStorage.getItem(this.localKey)
      // Fallback to legacy key if versioned key missing (migration path)
      if (!cached) {
        const legacyKey = this.options.keyPrefix + "_cache"
        cached = localStorage.getItem(legacyKey)
      }

      if (cached) {
        const { version, data, timestamp } = JSON.parse(cached)
        const isExpired = Date.now() - timestamp > this.options.expiry
        if (version === this.options.version && !isExpired) {
          Object.entries(data).forEach(([key, value]) => {
            this.memory.set(
              key,
              this.options.deserialize
                ? (this.options.deserialize(value) as T)
                : (value as T)
            )
          })
          // remember the raw string we loaded so we can detect changes later
          this.lastStorageRaw = cached
        } else {
          // Remove whichever key existed for cleanliness
          try {
            localStorage.removeItem(this.localKey)
          } catch {}
          try {
            localStorage.removeItem(this.options.keyPrefix + "_cache")
          } catch {}
        }
      }
    } catch (e) {
      // ignore
    }
  }

  private saveToStorage = this.debounce(() => {
    if (typeof window === "undefined" || typeof localStorage === "undefined")
      return
    try {
      const data: Record<string, any> = {}
      for (const [key, value] of this.memory.entries()) {
        data[key] = this.options.serialize
          ? this.options.serialize(value)
          : value
      }
      const raw = JSON.stringify({
        version: this.options.version,
        data,
        timestamp: Date.now()
      })
      localStorage.setItem(this.localKey, raw)
      // Keep the last raw value in sync so storage events can be compared
      this.lastStorageRaw = raw
    } catch (e) {
      // ignore
    }
  }, 1000)

  get(key: string): T | undefined {
    this.metrics.fetchCount++
    if (this.memory.has(key)) {
      this.metrics.cacheHits++
      return this.memory.get(key)
    } else {
      this.metrics.cacheMisses++
      return undefined
    }
  }

  set(key: string, value: T) {
    // Update memory and persist; no need to reload from storage here
    this.memory.set(key, value)
    this.saveToStorage()
  }

  clear() {
    this.memory.clear()
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      localStorage.removeItem(this.localKey)
    }
    Object.assign(this.metrics, {
      cacheHits: 0,
      cacheMisses: 0,
      fetchCount: 0,
      totalFetchTime: 0
    })
  }

  keys(): string[] {
    return Array.from(this.memory.keys())
  }

  has(key: string): boolean {
    return this.memory.has(key)
  }

  size(): number {
    return this.memory.size
  }

  entries(): [string, T][] {
    return Array.from(this.memory.entries())
  }

  addFetchTime(time: number) {
    this.metrics.totalFetchTime += time
  }

  metricsInfo() {
    return {
      ...this.metrics,
      cacheSize: this.memory.size,
      cacheHitRate:
        this.metrics.fetchCount > 0
          ? ((this.metrics.cacheHits / this.metrics.fetchCount) * 100).toFixed(
              2
            ) + "%"
          : "0%",
      avgFetchTime:
        this.metrics.fetchCount > 0
          ? (this.metrics.totalFetchTime / this.metrics.fetchCount).toFixed(2) +
            "ms"
          : "0ms"
    }
  }

  // Simple debounce util
  private debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): T {
    let timeout: ReturnType<typeof setTimeout>
    return ((...args: any[]) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }) as T
  }
}
