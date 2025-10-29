// Minimal font loading - only load what's absolutely necessary
export function lazyLoadFonts() {
  // Strategy: Only load fonts that are actually used in visible content
  // This approach minimizes requests and improves Core Web Vitals

  if (typeof window === "undefined") return

  // Only load FiraMono when code blocks are detected
  const loadMonoFontWhenNeeded = () => {
    const hasCodeBlocks = document.querySelector("pre, code, .code-block")
    if (hasCodeBlocks) {
      const fontFace = new FontFace(
        "Fira Mono",
        "url(/font/FiraMono-Regular.subset.woff2)",
        { weight: "400", style: "normal", display: "swap" }
      )
      fontFace
        .load()
        .then((font) => document.fonts.add(font))
        .catch(() => {})
    }
  }

  // Load mono font only when needed, with delay to avoid blocking
  setTimeout(loadMonoFontWhenNeeded, 1000)
}

// Auto-initialize if in browser
if (typeof window !== "undefined") {
  lazyLoadFonts()
}
