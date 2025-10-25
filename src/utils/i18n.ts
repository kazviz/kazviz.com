// Delay loading of translation helpers to avoid early module evaluation issues in production
// We'll dynamically import inside functions instead of static import at module top

// Critical translations yang akan di-bundle dengan app
export const CRITICAL_NAMESPACES = [
  "common",
  "main/harbor",
  "main/moores"
] as const

// Preload strategy berdasarkan route
export const ROUTE_TRANSLATIONS: Record<string, string[]> = {
  "/": ["main/harbor", "main/moores"]
  // "/learn": ["course/html", "course/css", "course/javascript"],
  // "/belajar": ["course/html", "course/css", "course/javascript"],
  // "/learn/html": ["course/html"],
  // "/learn/css": ["course/css"],
}

// Initialize translations untuk app startup
export async function initializeTranslations(lang: Lang, route?: string) {
  try {
    const { preloadCriticalTranslations, preloadTranslations } = await import(
      "~/hooks/trans"
    )
    // Preload critical translations
    await preloadCriticalTranslations(lang)

    // Preload route-specific translations jika ada
    if (route && ROUTE_TRANSLATIONS[route]) {
      const routeNamespaces = ROUTE_TRANSLATIONS[route]
      await preloadTranslations(lang, routeNamespaces)
    }
  } catch (error) {
    console.error("[i18n] Failed to initialize translations:", error)
  }
}

// Validation untuk memastikan semua translation keys ada
export function validateTranslationKeys(
  translations: Record<string, any>,
  namespace: string | string[],
  requiredKeys: string[]
): string[] {
  const missing: string[] = []
  const nsString = Array.isArray(namespace) ? namespace.join(",") : namespace

  for (const key of requiredKeys) {
    if (!(key in translations)) {
      missing.push(key)
      console.warn(`[i18n] Missing translation key: ${nsString}:${key}`)
    }
  }

  return missing
}
