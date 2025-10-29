import { getCurrentLang } from "~/lib/lang"

/**
 * Utility for detecting language from various sources
 */

/**
 * Detect language with smart fallback chain:
 * 1. Cookie (most reliable, synced by routes)
 * 2. Browser language
 * 3. Default to English
 */
export function detectLanguage(): Lang {
  // Try to get from cookie first (most reliable, synced by URL routes)
  const cookieLang = getCurrentLang()
  if (cookieLang && cookieLang !== "en") return cookieLang

  // Fallback to browser language if available
  if (typeof window !== "undefined" && navigator.language?.startsWith("id")) {
    return "id"
  }

  // Default to English
  return "en"
}

/**
 * Create reactive language accessor for static pages without URL params
 *
 * @param defaultLang - Force a specific language (useful for test pages)
 * @returns Accessor function that returns the language
 *
 * Usage:
 * - Static pages: createStaticLang() - uses smart detection
 * - Test pages: createStaticLang("en") - forces English
 */
export function createStaticLang(defaultLang?: Lang) {
  return () => {
    if (defaultLang) return defaultLang
    return detectLanguage()
  }
}
