import { getCookie, setCookie, setHeader } from "vinxi/http"
import { createMiddleware } from "@solidjs/start/middleware"

export default createMiddleware({
  onRequest: (event) => {
    // Reading a cookie
    const ambience = getCookie(event.nativeEvent, "ambience")
    const lang = getCookie(event.nativeEvent, "lang")
    event.locals.ambience = ambience || "star"
    event.locals.lang = lang || "en"

    // Set cache headers for static assets
    const url = new URL(event.request.url)
    const pathname = url.pathname

    // Font files - cache for 1 year
    if (pathname.match(/\.(woff2|woff|otf|ttf)$/)) {
      setHeader(
        event.nativeEvent,
        "Cache-Control",
        "public, max-age=31536000, immutable"
      )
      setHeader(event.nativeEvent, "Access-Control-Allow-Origin", "*")
    }

    // Images and SVG - cache for 1 month
    if (pathname.match(/\.(svg|ico|png|jpg|jpeg|webp)$/)) {
      setHeader(event.nativeEvent, "Cache-Control", "public, max-age=2592000")
    }

    // CSS and JS files - cache for 1 month with revalidation
    if (pathname.match(/\.(css|js)$/)) {
      setHeader(
        event.nativeEvent,
        "Cache-Control",
        "public, max-age=2592000, must-revalidate"
      )
    }

    // HTML pages - shorter cache with revalidation
    if (
      pathname.endsWith("/") ||
      pathname.endsWith(".html") ||
      !pathname.includes(".")
    ) {
      setHeader(
        event.nativeEvent,
        "Cache-Control",
        "public, max-age=3600, must-revalidate"
      )
    }
  }
})
