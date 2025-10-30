// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server"
import { getRequestEvent } from "solid-js/web"
import fs from "fs"
import path from "path"

// Critical namespaces to inline (small, always needed for shell/footer/navigation)
const CRITICAL_NAMESPACES = ["common", "main/harbor", "main/moores"]

// Cache loaded translations in-memory (per server process)
const inlineI18NCache: Record<string, Record<string, any>> = {}

function loadCriticalTranslations(lang: string) {
  if (inlineI18NCache[lang]) return inlineI18NCache[lang]

  const base = path.join(process.cwd(), "public", "locale", lang)
  const store: Record<string, any> = {}
  for (const ns of CRITICAL_NAMESPACES) {
    // Namespace file path mapping: namespaces with slash map to nested dirs
    const parts = ns.split("/")
    let filePath: string
    if (parts.length === 1) {
      filePath = path.join(base, `${ns}.json`)
    } else {
      const last = parts.pop()!
      filePath = path.join(base, ...parts, `${last}.json`)
    }
    try {
      const raw = fs.readFileSync(filePath, "utf-8")
      store[ns] = JSON.parse(raw)
    } catch (e) {
      // Fail soft: don't block render if a translation file missing
      console.warn(`[i18n-inline] Failed to load ${lang}/${ns}:`, e)
    }
  }
  inlineI18NCache[lang] = store
  return store
}

export default createHandler(() => {
  const ambience = getRequestEvent()?.locals.ambience || "star"

  return (
    <StartServer
      document={({ assets, children, scripts }) => (
        <html lang="id">
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            <link
              rel="alternate icon"
              href="/favicon.ico"
              type="image/x-icon"
            />

            {/* ONLY Critical fonts - preload for first render */}
            <link
              rel="preload"
              href="/font/FiraSans-Regular.subset.woff2"
              as="font"
              type="font/woff2"
              crossorigin="anonymous"
            />
            <link
              rel="preload"
              href="/font/FiraSans-Bold.subset.woff2"
              as="font"
              type="font/woff2"
              crossorigin="anonymous"
            />
            <link
              rel="preload"
              href="/font/SourceSerif4Variable-Roman.ttf.subset.woff2"
              as="font"
              type="font/woff2"
              crossorigin="anonymous"
            />
            {/* Inline critical CSS with optimized font loading */}
            <style>{`
              body{margin:0;padding:0;cursor:default;min-height:100vh;overflow-x:hidden;scroll-behavior:smooth;font-family:"Fira Sans",sans-serif}
              *{box-sizing:border-box}
              *::after,*::before{box-sizing:inherit}
              *:not(article *,input,textarea)::selection{background:none}
              a{text-decoration:none}
              button{cursor:pointer;font-family:"Fira Sans",sans-serif}

              /* Critical fonts - use swap for better performance */
              @font-face{
                font-family:"Fira Sans";
                src:url("/font/FiraSans-Regular.subset.woff2") format("woff2");
                font-weight:400;
                font-style:normal;
                font-display:swap;
              }
              @font-face{
                font-family:"Fira Sans";
                src:url("/font/FiraSans-Bold.subset.woff2") format("woff2");
                font-weight:600;
                font-style:normal;
                font-display:swap;
              }

              /* Load other fonts only when needed - optional for best performance */
              @font-face{
                font-family:"Fira Sans";
                src:url("/font/FiraSans-Italic.subset.woff2") format("woff2");
                font-weight:400;
                font-style:italic;
                font-display:optional;
              }

              @font-face{
                font-family:"Fira Sans";
                src:url("/font/FiraSans-Black.subset.woff2") format("woff2");
                font-weight:900;
                font-style:bold;
                font-display:optional;
              }

              /* Monospace fonts - load only when code appears */
              @font-face{
                font-family:"Fira Mono";
                src:url("/font/FiraMono-Regular.subset.woff2") format("woff2");
                font-weight:400;
                font-style:normal;
                font-display:optional;

              }

              /* Source Serif variable font (Roman + Italic) - optional load */
              @font-face{
                font-family:"Source Serif 4";
                src:url("/font/SourceSerif4Variable-Roman.ttf.subset.woff2") format("woff2");
                font-weight:100 900;
                font-style:normal;
                font-display:swap;
              }

              @font-face{
                font-family:"Source Serif 4";
                src:url("/font/SourceSerif4Variable-Italic.ttf.subset.woff2") format("woff2");
                font-weight:100 900;
                font-style:italic;
                font-display:swap;
              }

            `}</style>
            {assets}
            {/* Inline critical translations to eliminate initial network fetches */}
            <script
              // Avoid re-parsing if already present (unlikely on first load)
              innerHTML={`window.__I18N__=window.__I18N__||${JSON.stringify({
                id: loadCriticalTranslations("id"),
                en: loadCriticalTranslations("en")
              })};`}
            />
          </head>
          <body id="galleon" class={"gen " + ambience}>
            {children}
            {scripts}
            {import.meta.env.PROD ? (
              <script
                defer
                src="https://cloud.umami.is/script.js"
                data-website-id={
                  (import.meta.env.VITE_UMAMI_WEBSITE_ID as string) || "abcdf"
                }></script>
            ) : null}
          </body>
        </html>
      )}
    />
  )
})
