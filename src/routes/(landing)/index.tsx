import { Link, Meta, MetaProvider, Title } from "@solidjs/meta"
import { LocaleProvider } from "~/context/Locale"
import { syncLangCookie } from "~/lib/lang"
import { createEffect } from "solid-js"
import LandingHero from "~/pages/static/landing/hero"
import HrefLang from "~/components/common/HrefLang"
import Harbor from "~/components/main/Harbor"
import Moores from "~/components/main/Moores"
import "@style/layout/landing.scss"
import "@style/page/landing.scss"

export default function LandingID() {
  // Hard-coded Indonesian language, English version will be available soon
  const lang = () => "id" as Lang

  // Sync cookie with URL locale on mount
  createEffect(() => {
    syncLangCookie("id")
  })

  return (
    <LocaleProvider lang={lang} hreflang={[{ lang: "id", href: "/" }]}>
      <MetaProvider>
        <Title>KazViz</Title>
        <Link rel="canonical" href="https://kazviz.com/" />
        <Meta
          name="description"
          content="KazViz.com adalah situs personal multidisiplin yang menyajikan artikel, publikasi, eksperimen, dan blog reflektif. Jelajahi Codex KazViz — arsip mendalam tentang ide, karya, dan perjalanan intelektualnya."
        />
        <HrefLang />
      </MetaProvider>
      <Harbor realm="landing" letterSpacing={2.3} />
      <main id="landing">
        <LandingHero />
      </main>
      <Moores />
    </LocaleProvider>
  )
}
