import {
  Suspense,
  onMount,
  ErrorBoundary,
  createSignal,
  onCleanup
} from "solid-js"
import { initializeTranslations } from "~/utils/i18n"
import { getI18nCacheVersion } from "@hooks/trans"
import { FileRoutes } from "@solidjs/start/router"
import { HttpStatusCode } from "@solidjs/start"
import { Router } from "@solidjs/router"
import Nebula from "./components/page/Nebula"
import NotFoundPage from "./pages/error/404"
import "@style/chery.scss"
import "@style/drupe.scss"

export default function App() {
  const [i18nError, setI18nError] = createSignal(false)
  const [showUpdateNebula, setShowUpdateNebula] = createSignal<
    false | { v?: string }
  >(false)

  onMount(async () => {
    // Initialize translations with default lang
    // TODO: detect browser lang or use a better default, currently always "id"
    const browserLang = navigator.language?.startsWith("id") ? "id" : "id"
    const defaultLang = (browserLang as Lang) || "id"

    // Pre-check that critical translation file can be fetched from server.
    // If it fails (502/5xx), show a neutral Nebula (dust) overlay and retry
    // automatically until success, then initialize translations.
    // Don't expose the signal globally here; keep it local to the App.

    const versionParam = getI18nCacheVersion() || ""
    const vq = versionParam ? `?v=${encodeURIComponent(versionParam)}` : ""
    const testUrl = `${
      import.meta.env.VITE_BASE_URL
    }/locale/${defaultLang}/main/harbor.json${vq}`

    async function tryFetchOnce() {
      try {
        const res = await fetch(testUrl, { cache: "no-store" })
        return res.ok
      } catch (e) {
        return false
      }
    }

    // Try a few times with exponential backoff, then switch to periodic retry
    let ok = false
    for (let attempt = 1; attempt <= 3; attempt++) {
      ok = await tryFetchOnce()
      if (ok) break
      // backoff
      await new Promise((r) =>
        setTimeout(r, Math.min(1000 * Math.pow(2, attempt), 5000))
      )
    }

    if (!ok) {
      // show overlay and start periodic retry every 3s
      setI18nError(true)
      const interval = setInterval(async () => {
        const ok2 = await tryFetchOnce()
        if (ok2) {
          clearInterval(interval)
          setI18nError(false)
          try {
            await initializeTranslations(defaultLang, location.pathname)
          } catch (error) {
            console.error(
              "[App] Failed to initialize translations after recovery:",
              error
            )
          }
        }
      }, 3000)
      return
    }

    // If pre-check passed, proceed to init translations
    try {
      await initializeTranslations(defaultLang, location.pathname)
    } catch (error) {
      console.error("[App] Failed to initialize translations:", error)
    }
  })

  // Listen for update events dispatched from entry-client (or anywhere)
  onMount(() => {
    function onUpdate(e: any) {
      try {
        const v = e?.detail?.version
        setShowUpdateNebula({ v })

        // After showing to user, delay then reload by bypassing cache.
        setTimeout(async () => {
          try {
            const mod = await import("~/utils/reload")
            await mod.forceReloadBypassCache(v)
          } catch (err) {
            // fallback to full reload
            try {
              window.location.reload()
            } catch {}
          }
        }, 3000)
      } catch (err) {
        // ignore
      }
    }

    window.addEventListener("app:update:available", onUpdate)
    onCleanup(() =>
      window.removeEventListener("app:update:available", onUpdate)
    )
  })

  return (
    <Router
      root={(props) => (
        <>
          {/* Show update overlay outside the ErrorBoundary so it is always visible */}
          {showUpdateNebula() && (
            <Nebula theme="dust">
              <div style="text-align:center; padding:1.5rem; max-width:640px; margin:0 auto;">
                <h2>Update available</h2>
                <p>
                  The application has been updated on the server. The page will
                  reload in a few seconds to synchronize assets.
                </p>
              </div>
            </Nebula>
          )}

          <ErrorBoundary
            fallback={(error, reset) => {
              if (
                (error as any).status === 404 ||
                error.message?.includes("not found") ||
                error.message?.includes("404")
              ) {
                return (
                  <>
                    <HttpStatusCode code={404} />
                    <NotFoundPage />
                  </>
                )
              }

              // Default error fallback
              return (
                <Nebula theme="ruby">
                  <div style="text-align: center; padding: 2rem; ">
                    <h1>Something went wrong</h1>
                    <p>{error.message}</p>
                    <button
                      onClick={reset}
                      style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--cl-0); color: var(--cl-f); border: none; border-radius: 4px; cursor: pointer;">
                      Try Again
                    </button>
                    <pre style="text-align: left; margin-top: 1rem;">
                      {error.stack}
                    </pre>
                  </div>
                </Nebula>
              )
            }}>
            {/* Show global i18n overlay if pre-check failed */}
            {i18nError() && (
              <Nebula theme="dust">
                <div style="text-align:center; padding:1.5rem; max-width:640px; margin:0 auto;">
                  <h2>Server temporarily unavailable</h2>
                  <p>
                    It looks like translation files are not available on the
                    server yet. We'll retry automatically.
                  </p>
                </div>
              </Nebula>
            )}
            <Suspense
              fallback={
                <Nebula>
                  <p>Loading ...</p>
                </Nebula>
              }>
              {props.children}
            </Suspense>
          </ErrorBoundary>
        </>
      )}>
      <FileRoutes />
    </Router>
  )
}
