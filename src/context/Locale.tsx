import {
  Accessor,
  createContext,
  JSX,
  useContext,
  createResource,
  createSignal
} from "solid-js"

export const LocaleContext = createContext<{
  lang: Accessor<Lang>
  hreflangs: Accessor<HrefLang[] | undefined>
  setHreflangs?: (hreflangs: HrefLang[] | undefined) => void
}>()

export function LocaleProvider(props: {
  lang: Accessor<Lang>
  hreflang?: HrefLang[]
  children: JSX.Element
}) {
  const [hreflangs, setHreflangs] = createSignal<HrefLang[] | undefined>(
    props.hreflang
  )

  return (
    <LocaleContext.Provider
      value={{ lang: props.lang, hreflangs, setHreflangs }}>
      {props.children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider")
  return ctx
}
