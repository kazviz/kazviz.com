import { useLocale } from "~/context/Locale"
import { Link } from "@solidjs/meta"
import { Show } from "solid-js"

/**
 * Component that automatically renders hreflang meta tags
 * Should be placed inside MetaProvider
 */
export default function HrefLang() {
  const { hreflangs } = useLocale()

  return (
    <Show when={hreflangs()}>
      {(hrefs) => (
        <>
          {hrefs().map((hreflang) => (
            <Link
              rel="alternate"
              hreflang={hreflang.lang}
              href={hreflang.href}
            />
          ))}
        </>
      )}
    </Show>
  )
}
