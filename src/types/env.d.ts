interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_BUILD_ID: string
  readonly VITE_UMMAI_WEBSITE_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
