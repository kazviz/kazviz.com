import { getRequestEvent, isServer } from "solid-js/web"
import { getCookie, setCookie } from "./cookie"

// Valid language/locale constants
export const VALID_LANGUAGES = ["en", "id", "my", "ph", "th", "vn"] as const

/**
 * Get current language from either server locals or client cookie
 * Works consistently on both server and client side
 */
export function getCurrentLang(): Lang {
  // On server-side, try to get from request event first
  if (isServer) {
    const requestEvent = getRequestEvent()
    if (requestEvent?.locals.lang) {
      return requestEvent.locals.lang as Lang
    }
  }

  // On client-side or fallback, read from cookie
  const cookieLang = getCookie("lang")
  return (cookieLang as Lang) || "en"
}

/**
 * Set language cookie and optionally reload page to sync server state
 */
export function setCurrentLang(lang: Lang, reload = false) {
  setCookie("lang", lang, 365) // Set for 1 year

  if (reload && !isServer) {
    window.location.reload()
  }
}

/**
 * Sync cookie language with URL locale parameter
 * Only updates if the locale is different from current cookie
 */
export function syncLangCookie(urlLocale: string) {
  if (isServer) return // Only run on client-side

  if (!VALID_LANGUAGES.includes(urlLocale as any)) return

  const currentCookieLang = getCookie("lang") || "en"

  // Only update if different to avoid redundant updates
  if (currentCookieLang !== urlLocale) {
    setCookie("lang", urlLocale, 365)
  }
}
