import { JSX } from "solid-js"
import Harbor from "@comp/main/Harbor"
import Moores from "@comp/main/Moores"
import "@style/layout/legal.scss"
import "@style/main/artes.scss"

export default function LegalLayout(props: {
  children: JSX.Element
  h1?: string
  subtitle?: string
}) {
  const h1 = props.h1 ?? "Legal Information"
  const subtitle = props.subtitle ?? ""

  return (
    <>
      <Harbor realm="legal" letterSpacing={6} />
      <main id="legal">
        <section id="title-banner">
          <h1>{h1}</h1>
          <div class="subtitle">{subtitle}</div>
        </section>
        <section id="main-content">{props.children}</section>
      </main>
      <Moores />
    </>
  )
}
