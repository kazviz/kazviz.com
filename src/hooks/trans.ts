/**
 * i18n loader with cache + circuit breaker
 *
 * Recommendation for deploys:
 * - Set VITE_BUILD_ID (or VITE_COMMIT_SHA / VITE_APP_VERSION) in build
 *   environment. This will automatically bump the client cache key on deploy.
 * - Optionally expose a backend endpoint `/i18n/version` returning
 *   { version: string } or header `x-i18n-version`. Call
 *   `invalidateTranslationCacheIfStale()` on client start to auto-clear stale
 *   caches when server translations update.
 */
import { fetchTranslationData, initTranslation } from "@service/i18n"
import { createResource, createMemo } from "solid-js"
import { useLocale } from "@context/Locale"
import { Cache } from "@util/cache"

/**
 * Translation hooks with support for single and multi-namespace
 *
 * Usage examples:
 *
 * // Single namespace (type-safe)
 * const { t } = useTrans("main/harbor")
 *
 * // Multi namespace (unified hook)
 * const { t } = useTranslation(["main/harbor", "main/moores"])
 * const { t } = useTranslation("main/harbor") // also works with single
 *
 * // Multi namespace (specific hook)
 * const { t } = useTransMulti(["course/html", "course/css"])
 */

// i18n cache instance
// Use a build/runtime-provided version to invalidate cache automatically on deploy.
// Set VITE_BUILD_ID (or reuse commit/build id) in your CI/CD so clients get a
// new cache key when translations change on the server.
// Fallback: if no build-time version is provided, use a short random token.
// This ensures clients don't rely on an indefinitely stale cache when CI isn't
// setting a version. Note: this makes cache per-client-session when env is
// absent (intended fallback).
let runtimeI18nVersion =
  (import.meta.env.VITE_BUILD_ID as string) ||
  (import.meta.env.VITE_COMMIT_SHA as string) ||
  (import.meta.env.VITE_APP_VERSION as string) ||
  (Math.random().toString(36).slice(2, 8) as string)

export function getI18nCacheVersion() {
  return runtimeI18nVersion
}

export function setI18nCacheVersion(v: string) {
  if (!v || v === runtimeI18nVersion) return
  runtimeI18nVersion = v
  try {
    // instruct cache to migrate and cleanup old keys
    translationCache.setVersion(v)
  } catch (e) {
    /* ignore */
  }
}

const translationCache = new Cache<any>({
  keyPrefix: "nazator_i18n",
  version: getI18nCacheVersion(),
  expiry: 24 * 60 * 60 * 1000 // 24 hours
})

// Export cache untuk digunakan di utils
export { translationCache }

// Circuit breaker untuk mencegah spam retry
class CircuitBreaker {
  private failures = 0
  private lastFailureTime = 0
  private state: "CLOSED" | "OPEN" | "HALF_OPEN" = "CLOSED"

  constructor(
    private maxFailures = 5,
    private timeout = 60000 // 1 minute
  ) {}

  canExecute(): boolean {
    if (this.state === "CLOSED") return true

    if (this.state === "OPEN") {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = "HALF_OPEN"
        return true
      }
      return false
    }

    // HALF_OPEN state
    return true
  }

  recordSuccess(): void {
    this.failures = 0
    this.state = "CLOSED"
  }

  recordFailure(): void {
    this.failures++
    this.lastFailureTime = Date.now()

    if (this.failures >= this.maxFailures) {
      this.state = "OPEN"
      console.warn("[trans] Circuit breaker opened due to repeated failures")
    }
  }

  getState(): string {
    return this.state
  }
}

const circuitBreaker = new CircuitBreaker()

// Retry mechanism untuk fetch translation data dengan circuit breaker
async function fetchTranslationWithRetry(
  lang: Lang,
  namespace: string | string[],
  maxRetries = 3
): Promise<any> {
  // Check circuit breaker first
  if (!circuitBreaker.canExecute()) {
    console.warn("[trans] Circuit breaker is open, skipping translation fetch")
    throw new Error("Circuit breaker is open")
  }

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await fetchTranslationData(lang, namespace)

      // Record success untuk circuit breaker
      circuitBreaker.recordSuccess()
      return result
    } catch (error: any) {
      // Check if it's a server-not-ready error (502 Bad Gateway)
      const isServerError =
        error?.message?.includes("502") ||
        error?.message?.includes("Bad Gateway") ||
        error?.message?.includes("FETCH_JSON_FAILED")

      if (isServerError && attempt < maxRetries) {
        console.warn(
          `[trans] Server not ready, retrying translation fetch (attempt ${attempt}):`,
          error.message
        )

        // Exponential backoff with jitter
        const baseDelay = Math.min(1000 * Math.pow(2, attempt - 1), 5000)
        const jitter = Math.random() * 1000
        const delay = baseDelay + jitter

        await new Promise((resolve) => setTimeout(resolve, delay))
        continue
      }

      // Record failure untuk circuit breaker
      circuitBreaker.recordFailure()

      // Non-server errors or final attempt - rethrow
      throw error
    }
  }

  // Record failure jika sampai sini
  circuitBreaker.recordFailure()
  throw new Error("Max retries exceeded for translation fetch")
}

// Preload critical translations
// Clear cache (useful for development, browser only)
export function clearTranslationCache() {
  translationCache.clear()
}

// Fetch build.json version (public/build.json) — returns version string or undefined
export async function fetchBuildVersion(): Promise<string | undefined> {
  try {
    const res = await fetch(`/build.json`, { cache: "no-store" })
    if (!res.ok) return undefined
    const json = await res.json()
    return json?.version as string | undefined
  } catch (e) {
    return undefined
  }
}

// Debug function untuk circuit breaker status
export function getCircuitBreakerStatus() {
  return {
    state: circuitBreaker.getState(),
    canExecute: circuitBreaker.canExecute()
  }
}

// Reset circuit breaker (untuk debugging)
export function resetCircuitBreaker() {
  circuitBreaker.recordSuccess()
  console.info("[trans] Circuit breaker reset")
}

// Preload critical translations dengan retry mechanism
export async function preloadCriticalTranslations(lang: Lang) {
  const critical = ["main/harbor", "main/moores"]

  await Promise.allSettled(
    critical.map(async (ns) => {
      const key = `${lang}_${ns}`
      if (!translationCache.has(key)) {
        try {
          const result = await fetchTranslationWithRetry(lang, ns)
          if (result) {
            translationCache.set(key, result)
          }
        } catch (e) {
          console.warn(
            `[trans] Failed to preload critical translation ${ns}:`,
            e
          )
          // Silent fail for preloading
        }
      }
    })
  )
}

// Preload translations with support for single namespace or array dan retry
export async function preloadTranslations(
  lang: Lang,
  namespaces: string | string[]
) {
  const isArray = Array.isArray(namespaces)
  const key = isArray
    ? `${lang}_${namespaces.join(",")}`
    : `${lang}_${namespaces}`

  if (!translationCache.has(key)) {
    try {
      const result = await fetchTranslationWithRetry(lang, namespaces)
      if (result) {
        translationCache.set(key, result)
      }
    } catch (e) {
      console.warn(`[trans] Failed to preload translation ${namespaces}:`, e)
      // Silent fail for preloading
    }
  }
}

// Type-safe version of useTrans for single namespace dengan retry
export function useTrans<T extends keyof TranslationNamespaces>(
  namespace: T
): {
  t: () => ((key: TranslationNamespaces[T]) => string) | null
  loading: () => boolean
  error: () => any
} {
  const locale = useLocale()

  const [trans] = createResource(
    () => `${locale.lang()}_${namespace}`,
    async (key) => {
      // Check cache first
      if (translationCache.has(key)) {
        return translationCache.get(key)
      }

      const [lang, ns] = key.split("_", 2)

      try {
        const result = await fetchTranslationWithRetry(lang as Lang, ns)
        if (result) {
          translationCache.set(key, result)
        }
        return result
      } catch (err) {
        console.error(`[trans] Final failure loading translation ${ns}:`, err)
        return null
      }
    }
  )

  const t = createMemo(() => {
    const translations = trans()
    if (translations) {
      return initTranslation(translations)
    }
    return null
  })

  return {
    t,
    loading: () => trans.loading,
    error: () => trans.error
  }
}

// Multi-namespace version of useTrans dengan retry
export function useTransMulti(namespaces: string | string[]): {
  t: () => ((key: string) => string) | null
  loading: () => boolean
  error: () => any
} {
  const locale = useLocale()
  const nsKey = Array.isArray(namespaces) ? namespaces.join(",") : namespaces

  const [trans] = createResource(
    () => `${locale.lang()}_${nsKey}`,
    async (key) => {
      // Check cache first
      if (translationCache.has(key)) {
        return translationCache.get(key)
      }

      const [lang, ns] = key.split("_", 2)
      const nsArray = ns.includes(",") ? ns.split(",") : ns

      try {
        const result = await fetchTranslationWithRetry(lang as Lang, nsArray)
        if (result) {
          translationCache.set(key, result)
        }
        return result
      } catch (err) {
        console.error(
          `[trans] Final failure loading multi-translation ${ns}:`,
          err
        )
        return null
      }
    }
  )

  const t = createMemo(() => {
    const translations = trans()
    if (translations) {
      return initTranslation(translations)
    }
    return null
  })

  return {
    t,
    loading: () => trans.loading,
    error: () => trans.error
  }
}

// Legacy version untuk backward compatibility (single namespace) dengan retry
export function useTranslationLegacy(namespace: string) {
  const locale = useLocale()

  const [trans] = createResource(
    () => `${locale.lang()}_${namespace}`,
    async (key) => {
      // Check cache first
      if (translationCache.has(key)) {
        return translationCache.get(key)
      }

      const [lang, ns] = key.split("_", 2)

      try {
        const result = await fetchTranslationWithRetry(lang as Lang, ns)
        if (result) {
          translationCache.set(key, result)
        }
        return result
      } catch (err) {
        console.error(
          `[trans] Final failure loading legacy translation ${ns}:`,
          err
        )
        return null
      }
    }
  )

  const t = createMemo(() => {
    const translations = trans()
    if (translations) {
      return initTranslation(translations)
    }
    return null
  })

  return {
    t,
    loading: () => trans.loading,
    error: () => trans.error
  }
}

// Unified translation hook - supports both single and multi namespace dengan retry
export function useTranslation(namespaces: string | string[]) {
  const locale = useLocale()
  const nsKey = Array.isArray(namespaces) ? namespaces.join(",") : namespaces

  const [trans] = createResource(
    () => `${locale.lang()}_${nsKey}`,
    async (key) => {
      // Check cache first
      if (translationCache.has(key)) {
        return translationCache.get(key)
      }

      const [lang, ns] = key.split("_", 2)
      const nsArray = ns.includes(",") ? ns.split(",") : ns

      try {
        const result = await fetchTranslationWithRetry(lang as Lang, nsArray)
        if (result) {
          translationCache.set(key, result)
        }
        return result
      } catch (err) {
        console.error(
          `[trans] Final failure loading unified translation ${ns}:`,
          err
        )
        return null
      }
    }
  )

  const t = createMemo(() => {
    const translations = trans()
    if (translations) {
      return initTranslation(translations)
    }
    return null
  })

  return {
    t,
    loading: () => trans.loading,
    error: () => trans.error
  }
}
