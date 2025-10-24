export default defineNitroConfig({
  compressPublicAssets: {
    gzip: true,
    brotli: true
  },
  routeRules: {
    // Locale JSON - in dev we want zero caching; in prod this can be tuned at CDN
    "/locale/**": {
      headers: {
        // Use no-store to prevent any browser or proxy caching in dev
        "Cache-Control":
          process.env.NODE_ENV === "development"
            ? "no-store"
            : "public, max-age=3600, must-revalidate"
      }
    },
    // Static font files - cache for 1 year
    "/font/**": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*"
      }
    },
    // Images and SVG - cache for 1 month
    "/logo/**": {
      headers: {
        "Cache-Control": "public, max-age=2592000"
      }
    },
    // Main pages - cache with revalidation
    "/**": {
      headers: {
        "Cache-Control": "public, max-age=3600, must-revalidate"
      }
    }
  },
  experimental: {
    wasm: true
  },
  preset: "node-server"
})
