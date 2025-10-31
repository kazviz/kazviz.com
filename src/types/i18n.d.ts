// Auto-generated translation keys - jangan edit manual
// Generated at: 2025-10-30T04:55:46.242Z
// Run: bun run script/gen:i18n-types.ts

declare global {
  interface TranslationNamespaces {
    'common': 'slogan'
    'main/moores': 'cookie' | 'copyright' | 'legal' | 'license' | 'mark' | 'privacy' | 'r_cookie' | 'r_copyright' | 'r_license' | 'r_mark' | 'r_privacy' | 'r_term' | 'slogan' | 'term'
    'main/harbor': 'dark-mode' | 'lang-switch' | 'light-mode' | 'other-lang' | 'r_codex' | 'r_kazvizian' | 'r_project' | 'unavailable'
  }

  type TranslationKey<T extends keyof TranslationNamespaces> = TranslationNamespaces[T]
  
  // Helper type untuk mengextract semua possible keys
  type AllTranslationKeys = {
    [K in keyof TranslationNamespaces]: `${K}:${TranslationNamespaces[K]}`
  }[keyof TranslationNamespaces]
}

export {}
