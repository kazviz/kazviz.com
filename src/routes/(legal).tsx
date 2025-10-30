import { RouteSectionProps, useParams } from "@solidjs/router"
import { LocaleProvider } from "~/context/Locale"

export default function Legal(props: RouteSectionProps) {
  const params = useParams()

  // TODO: use params.lang when multi-lang legal pages available
  const lang = () => "id" as Lang

  return <LocaleProvider lang={lang}>{props.children}</LocaleProvider>
}
