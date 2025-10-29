// Small helper to perform a cache-bypassing reload of the app root.
// Extracted so both entry-client and App can reuse the same logic and
// keep UI mounting centralized in the App.
export async function forceReloadBypassCache(serverVersion?: string) {
  if (typeof window === "undefined") return

  const reloadKey = "app_reload_attempt"
  try {
    const seen = sessionStorage.getItem(reloadKey)
    const id = serverVersion || String(Date.now())
    if (seen === id) return // avoid reload loop
    sessionStorage.setItem(reloadKey, id)
  } catch {}

  try {
    // Try to fetch the index HTML with no-store to prime the browser
    await fetch(window.location.href.split("#")[0], {
      cache: "no-store",
      headers: { Accept: "text/html" }
    })
  } catch (e) {
    // ignore fetch errors, we'll still attempt reload
  }

  try {
    // Persist new build version if provided so our other logic doesn't re-prompt
    if (serverVersion) localStorage.setItem("app_build_version", serverVersion)
  } catch {}

  // Replace location with cache-busting query param (preserve path, remove old query)
  try {
    const base = window.location.origin + window.location.pathname
    const param = `_reload=${encodeURIComponent(
      serverVersion || Date.now().toString()
    )}`
    window.location.replace(base + "?" + param)
  } catch (e) {
    // fallback to normal reload
    window.location.reload()
  }
}
