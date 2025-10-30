import {
  createSignal,
  createEffect,
  onMount,
  onCleanup,
  Show,
  For
} from "solid-js"
import { useHarbor } from "~/context/Harbor"
import { useLocale } from "~/context/Locale"
import { useTrans } from "~/hooks/trans"
import "@style/main/cross.scss"

// Language definitions
const langs: Lang[] = ["en", "id"]
const langNameMap: Record<Lang, string> = {
  en: "English",
  id: "Bahasa Indonesia"
}

export default function Cross() {
  const { openedHarborMenu } = useHarbor()
  const { lang, hreflangs } = useLocale()
  const { t } = useTrans("main/harbor")

  const [left, setLeft] = createSignal("0")
  const crossWidth = 250

  const existingLangs = () => {
    const hrefs = hreflangs()
    return hrefs
      ? hrefs
          .filter((hrefLang) => hrefLang.lang !== "x-default")
          .map((hrefLang) => hrefLang.lang as Lang)
      : undefined
  }

  const missingLangs = () => {
    const existing = existingLangs()
    return existing ? langs.filter((lang) => !existing.includes(lang)) : []
  }

  function updateLeft() {
    const btnCross = document.getElementById("btn-cross")
    if (btnCross) {
      const rect = btnCross.getBoundingClientRect()
      setLeft(`${Math.round(rect.left + rect.width / 2 - crossWidth / 2)}px`)
    }
  }

  onMount(() => {
    updateLeft()

    const btnCross = document.getElementById("btn-cross")
    if (btnCross) {
      const observer = new ResizeObserver(updateLeft)
      observer.observe(btnCross)

      const handleResize = () => updateLeft()
      window.addEventListener("resize", handleResize)

      onCleanup(() => {
        observer.disconnect()
        window.removeEventListener("resize", handleResize)
      })
    }
  })

  // Update position when harbor menu changes
  createEffect(() => {
    if (openedHarborMenu() === "cross") {
      // Small delay to ensure element is rendered
      setTimeout(updateLeft, 10)
    }
  })

  return (
    <Show when={openedHarborMenu() === "cross"}>
      <Show when={t()} fallback={<div>Loading...</div>}>
        {(tFunc) => {
          const t = () => tFunc()

          return (
            <div id="cross" style={`left: ${left()};`}>
              <div class="label">
                {t()("lang-switch")}
                <Show when={lang() !== "en"}>
                  <br />
                  (Switch Language)
                </Show>
              </div>

              <Show
                when={hreflangs()}
                fallback={
                  <For each={langs}>
                    {(langItem) => (
                      <a href={"/" + langItem}>{langNameMap[langItem]}</a>
                    )}
                  </For>
                }>
                {/* Available languages from hreflangs */}
                <For each={hreflangs()}>
                  {(hreflang) => (
                    <Show when={hreflang.lang !== "x-default"}>
                      <a href={hreflang.href}>
                        {langNameMap[hreflang.lang as Lang]}
                      </a>
                    </Show>
                  )}
                </For>

                {/* Unavailable languages */}
                <div class="label">
                  {t()("other-lang")}
                  <br />({t()("unavailable")})
                </div>
                <For each={missingLangs()}>
                  {(langItem) => (
                    <a href={"/" + langItem}>{langNameMap[langItem]}</a>
                  )}
                </For>
              </Show>
            </div>
          )
        }}
      </Show>
    </Show>
  )
}
