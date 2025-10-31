import { defineConfig } from "@solidjs/start/config"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const rootDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  middleware: "src/lib/middleware.ts",
  vite: {
    server: {
      port: 4040,
      strictPort: true // ⬅️ Ini akan membuat Vite error kalau port sudah dipakai
    },
    // esbuild: {
    //   // Use esbuild to minify safely and drop console/debugger in production
    //   drop: ["console", "debugger"]
    // },
    build: {
      // Disable sourcemaps in production unless explicitly enabled to cut network requests
      sourcemap: process.env.BUILD_SOURCEMAP === "true",
      rollupOptions: {
        output: {
          // Selective manual chunking to merge very small internal modules and cut request count
          manualChunks(id) {
            // Only apply to source files (not node_modules heavy vendors)
            if (id.includes("node_modules")) return undefined

            // Group frequently co-loaded small UI atoms / helpers into one chunk
            if (
              /src\/(components|hooks|context|utils|lib)\//.test(id) &&
              /Icon|Logo|Avatar|Mesh|HrefLang|lang|cookie|Locale|errcode/i.test(
                id
              )
            ) {
              return "app-core"
            }

            // Group translation related small files
            if (/src\/services\/i18n|src\/hooks\/trans|utils\/i18n/.test(id)) {
              return "i18n-core"
            }
            return undefined
          },
          assetFileNames: (assetInfo) => {
            // Defer non-critical CSS
            if (
              assetInfo.name?.endsWith(".css") &&
              !assetInfo.name.includes("main") &&
              !assetInfo.name.includes("vendor")
            ) {
              return "assets/deferred/[name]-[hash][extname]"
            }
            return "assets/[name]-[hash][extname]"
          }
        }
      },
      chunkSizeWarningLimit: 1000, // Increase warning limit to 1MB
      // Switch to esbuild minifier to avoid rare TDZ issues seen with terser
      minify: "esbuild",
      cssCodeSplit: true,
      assetsInlineLimit: 2048 // Inline small assets
    },
    resolve: {
      alias: {
        "@comp": join(rootDir, "src/components"),
        "@content": join(rootDir, "src/content"),
        "@context": join(rootDir, "src/context"),
        "@data": join(rootDir, "src/data"),
        "@hooks": join(rootDir, "src/hooks"),
        "@layout": join(rootDir, "src/layouts"),
        "@lib": join(rootDir, "src/lib"),
        "@page": join(rootDir, "src/pages"),
        "@provider": join(rootDir, "src/provider"),
        "@service": join(rootDir, "src/services"),
        "@style": join(rootDir, "src/styles"),
        "@type": join(rootDir, "src/types"),
        "@util": join(rootDir, "src/utils")
      }
    }
  }
})
