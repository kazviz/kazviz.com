import { lazy, Show, Suspense, createMemo } from "solid-js"
import { LocaleProvider, useLocale } from "@context/Locale"
import { MetaProvider, Title, Meta } from "@solidjs/meta"
import { HttpStatusCode } from "@solidjs/start"
import { useParams } from "@solidjs/router"
import { Dynamic } from "solid-js/web"
import HrefLang from "@comp/common/HrefLang"
import NotFoundPage from "@page/error/404"
import CodexLayout from "@layout/Codex"

export default function CourseDynamic() {
  const params = useParams()

  const lang = () => "id" as Lang
  const slug = () => params.slug

  // === PAGE LOADER

  const content = import.meta.glob("@content/codex/id/*.tsx")
  const metaContent = import.meta.glob("@content/codex/id/*.tsx", {
    eager: true
  })

  const key = createMemo(() => `/src/content/codex/${lang()}/${slug()}.tsx`)
  const importer = createMemo(() => content[key()])
  const Page = createMemo(() => (importer() ? lazy(importer() as any) : null))

  // === META DATA

  const meta = createMemo(() => {
    const mod = metaContent[key()]
    return mod && typeof mod === "object" && mod !== null && "meta" in mod
      ? (mod as any).meta
      : null
  })
  const title = () => meta()?.title || "Page Not Found"
  const description = () => meta()?.description || "Page not found."
  const headline = () => meta()?.headline || title()
  const tagline = () => meta()?.tagline || undefined
  const updateDate = () => meta()?.updateDate || undefined

  // === RENDER

  return (
    <LocaleProvider lang={lang} hreflang={undefined}>
      <CodexLayout>
        <Suspense>
          <MetaProvider>
            <Title>{title()}</Title>
            <Meta name="description" content={description()} />
            <HrefLang />
          </MetaProvider>
          <Show when={meta()}>
            <section id="title-banner">
              <hgroup>
                <h1>{headline()}</h1>
                <Show when={tagline()}>
                  <div class="tagline">{tagline()}</div>
                </Show>
              </hgroup>
            </section>
          </Show>
          <Show
            when={!!Page()}
            fallback={
              <>
                <HttpStatusCode code={404} />
                <NotFoundPage />
              </>
            }>
            <article class="artes">
              <Dynamic component={Page()!} />
              <aside id="metadata">
                <Show when={updateDate()}>
                  <span class="update-date">
                    Terakhir Diperbaharui: {updateDate()}
                  </span>
                </Show>
                <span class="license">
                  Dipublikasikan di bawah{" "}
                  <a
                    href="https://creativecommons.org/licenses/by/4.0/"
                    title="Creative Commons Attribution 4.0 International"
                    target="_blank"
                    rel="noopener noreferrer">
                    CC BY 4.0
                  </a>
                </span>
              </aside>
            </article>
          </Show>
        </Suspense>
      </CodexLayout>
    </LocaleProvider>
  )
}
