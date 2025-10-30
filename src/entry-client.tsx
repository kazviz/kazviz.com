// @refresh reload
import { mount, StartClient } from "@solidjs/start/client"
import { lazyLoadFonts } from "./utils/font"
import {
  fetchBuildVersion,
  getI18nCacheVersion,
  setI18nCacheVersion,
  clearTranslationCache
} from "@hooks/trans"
import { forceReloadBypassCache as doReload } from "./utils/reload"

// Optimize back/forward cache
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    // Page was restored from bfcache
    window.location.reload()
  }
})

// Prevent unload events that might block bfcache
window.addEventListener("beforeunload", () => {
  // Clean up any event listeners or timers
})

// Initialize minimal font loading
lazyLoadFonts()

const startApp = () => {
  mount(() => <StartClient />, document.getElementById("galleon")!)
}

// Check build version and prompt reload if mismatch (best-effort)
async function startWithVersionCheck() {
  try {
    const serverVersion = await fetchBuildVersion()
    if (serverVersion) {
      try {
        ;(window as any).__APP_BUILD_VERSION = serverVersion
      } catch {}

      const key = "app_build_version"
      const seen = localStorage.getItem(key)

      // First time seeing this version: persist and continue silently
      if (!seen) {
        try {
          localStorage.setItem(key, serverVersion)
        } catch {}
      } else if (seen !== serverVersion) {
        // New deploy detected — perform immediate reload to ensure full
        // application and assets are in sync with the server.
        try {
          // Update runtime i18n version so any in-memory cache can migrate
          setI18nCacheVersion(serverVersion)
        } catch {}
        try {
          clearTranslationCache()
        } catch {}
        try {
          localStorage.setItem(key, serverVersion)
        } catch {}
        window.location.reload()
        return
      }
    }
    // If build.json is missing, we do not set a runtime token. This allows
    // browser/CDN caching to work normally. CI should write public/build.json
    // to enable deterministic cache-busting on deploys.
  } catch (e) {
    /* ignore */
  }

  startApp()
}

// Start the app with version check
startWithVersionCheck()

// Reload behavior lives in `src/utils/reload.ts` and is used as a shared
// implementation (imported as `doReload`) so callers should dispatch
// `app:update:available` or call the helper directly when needed.

// Global handlers: if a dynamic import fails (mismatched chunk), trigger
// a forced cache-bypassing reload so the client fetches the new manifest.
window.addEventListener("unhandledrejection", (ev) => {
  try {
    const reason: any = ev.reason
    const msg = (reason && reason.message) || String(reason)
    if (
      msg &&
      msg.toLowerCase().includes("error loading dynamically imported module")
    ) {
      doReload(getI18nCacheVersion())
    }
    // Some dev servers return network errors like "Failed to fetch" for chunks
    if (
      msg &&
      (msg.toLowerCase().includes("failed to fetch") ||
        msg.toLowerCase().includes("networkerror"))
    ) {
      doReload(getI18nCacheVersion())
    }
  } catch {}
})

window.addEventListener("error", (ev) => {
  try {
    const msg = (ev && (ev as ErrorEvent).message) || ""
    if (
      msg &&
      msg.toLowerCase().includes("error loading dynamically imported module")
    ) {
      // Instead of mounting UI here, dispatch a custom event so the app-level
      // UI (which sits outside error boundaries) can present the Nebula overlay.
      try {
        const e = new CustomEvent("app:update:available", {
          detail: { version: getI18nCacheVersion() }
        })
        window.dispatchEvent(e)
      } catch (e) {
        // Fallback to direct reload behavior if dispatch fails
        doReload(getI18nCacheVersion())
      }
    }
  } catch {}
})

// Show Nebula (dust) modal informing user that app updated, then reload after 3s
// The app-level UI will handle showing the Nebula overlay and performing the
// delayed reload. Keep a small helper to dispatch the same signal so callers
// can request the overlay from anywhere.
function requestAppUpdate(serverVersion?: string) {
  try {
    const e = new CustomEvent("app:update:available", {
      detail: { version: serverVersion }
    })
    window.dispatchEvent(e)
  } catch (e) {
    // Fallback: perform immediate cache-bypassing reload
    doReload(serverVersion)
  }
}

// Export default for Vite
export default startApp
