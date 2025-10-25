import { fetchJSON } from "@util/fetch"

// In-flight promise map to dedupe concurrent translation requests for the same
// language + namespace combination. This prevents bursty pages from issuing
// duplicate HTTP GETs for identical JSON while multiple components mount.
// Key format examples:
//  - "en|main/harbor"
//  - "en|main/harbor,main/moores" (array namespaces are sorted)
const inFlightTranslations = new Map<string, Promise<Translation | undefined>>()

// Interpolation function
function interpolate(
  str: string,
  values: Record<string, string | number | undefined>
) {
  return str.replace(/\{(\w+)\}/g, (_, key) => values[key]?.toString() || "")
}

/** `t()` function to get the intended transation string.
 * @returns transaltion string value
 */
export function t(
  translations: Translation,
  key: string,
  values?: Record<string, string | number>
) {
  const translation = translations[key]
  if (!translation) throw new Error(`Translation for ${key} is missing.`)

  if (values) {
    return interpolate(translation, values)
  }
  return translation
}

/** Translation helper function to create transation instance. So you can use
 * `t()` function directly without passing `translation` data. */
export function initTranslation(translations: Translation) {
  return (key: string, values?: Record<string, string | number>) =>
    t(translations, key, values)
}

export async function setTranslation(lang: Lang, path: string | string[]) {
  const trans = (await fetchTranslationData(lang, path)) as Translation
  return (key: string, values?: Record<string, string | number>) =>
    t(trans, key, values)
}

export async function fetchTranslationData(
  lang: string,
  path: string | string[]
): Promise<Translation | undefined> {
  const isDev = import.meta.env.DEV
  // Normalize key (sort arrays for stable dedupe)
  const key = Array.isArray(path)
    ? `${lang}|${[...path].sort().join(",")}`
    : `${lang}|${path}`

  // Check for inline global (SSR injected) translations first (client-side only)
  // Skip this fast path in dev so changes in JSON are always fetched fresh
  if (!isDev && typeof window !== "undefined" && (window as any).__I18N__) {
    const globalPack = (window as any).__I18N__[lang]
    if (globalPack) {
      if (Array.isArray(path)) {
        // Verify all exist; if yes, merge and short-circuit network
        const missing = path.filter((ns) => !globalPack[ns])
        if (missing.length === 0) {
          return Object.assign({}, ...path.map((ns) => globalPack[ns]))
        }
      } else if (globalPack[path]) {
        return globalPack[path]
      }
    }
  }

  // Return existing in-flight promise if present
  const existing = inFlightTranslations.get(key)
  if (existing) return existing

  const promise = (async () => {
    if (Array.isArray(path)) {
      try {
        const base = `${import.meta.env.VITE_BASE_URL}/locale/${lang}`
        const runtimeVersion =
          typeof window !== "undefined"
            ? (window as any).__APP_BUILD_VERSION
            : undefined
        const versionParam =
          (runtimeVersion as string) ||
          (import.meta.env.VITE_BUILD_ID as string) ||
          (import.meta.env.VITE_COMMIT_SHA as string) ||
          (import.meta.env.VITE_APP_VERSION as string) ||
          ""
        const loaded = await Promise.all(
          path.map(async (p) => {
            // In dev, always bypass cache using a timestamp param
            const devBuster = isDev ? `__ts=${Date.now()}` : ""
            const verParam =
              !isDev && versionParam
                ? `v=${encodeURIComponent(versionParam)}`
                : ""
            const query = [devBuster, verParam].filter(Boolean).join("&")
            const url = `${base}/${p}.json${query ? `?${query}` : ""}`
            const res = await fetch(url, {
              method: "GET",
              headers: {
                Accept: "application/json",
                ...(isDev
                  ? { "Cache-Control": "no-cache", Pragma: "no-cache" }
                  : {})
              },
              ...(isDev ? { cache: "no-store" as RequestCache } : {})
            })
            if (!res.ok)
              throw new Error(`Failed to fetch ${url} (${res.status})`)
            return (await res.json()) as Translation
          })
        )
        return Object.assign({}, ...loaded)
      } catch (e) {
        console.error(`Failed to load translation for ${path} in ${lang}:`, e)
      } finally {
        // Cleanup to allow future refetch attempts after resolution
        inFlightTranslations.delete(key)
      }
    } else {
      try {
        const runtimeVersion =
          typeof window !== "undefined"
            ? (window as any).__APP_BUILD_VERSION
            : undefined
        const versionParam =
          (runtimeVersion as string) ||
          (import.meta.env.VITE_BUILD_ID as string) ||
          (import.meta.env.VITE_COMMIT_SHA as string) ||
          (import.meta.env.VITE_APP_VERSION as string) ||
          ""
        const devBuster = isDev ? `__ts=${Date.now()}` : ""
        const verParam =
          !isDev && versionParam ? `v=${encodeURIComponent(versionParam)}` : ""
        const query = [devBuster, verParam].filter(Boolean).join("&")
        const url = `${
          import.meta.env.VITE_BASE_URL
        }/locale/${lang}/${path}.json${query ? `?${query}` : ""}`
        const res = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            ...(isDev
              ? { "Cache-Control": "no-cache", Pragma: "no-cache" }
              : {})
          },
          ...(isDev ? { cache: "no-store" as RequestCache } : {})
        })
        if (!res.ok) throw new Error(`Failed to fetch ${url} (${res.status})`)
        return (await res.json()) as Translation
      } catch (e) {
        console.error(`Failed to load translation for ${path} in ${lang}:`, e)
      } finally {
        inFlightTranslations.delete(key)
      }
    }
  })()

  inFlightTranslations.set(key, promise)
  return promise
}

/**
 * Fetch hreflang data from the server.
 *
 * @param {string} path - The source identifier for the hreflang data.
 * @returns {Promise<HrefLang[] | undefined>} A promise resolving to an array of hreflang objects, or `undefined` if loading fails.
 */
export async function fetchHrefLang(
  path: string
): Promise<HrefLang[] | undefined> {
  try {
    return await fetchJSON<HrefLang[]>(`/href/${path}`)
  } catch {
    return undefined
  }
}
