import { JSX } from "solid-js"
import Harbor from "@comp/main/Harbor"
import Moores from "@comp/main/Moores"
import "@style/layout/codex.scss"
import "@style/main/artes.scss"

export default function CodexLayout(props: { children: JSX.Element }) {
  return (
    <>
      <Harbor realm="codex" letterSpacing={5} />
      <main id="voyage">{props.children}</main>
      <Moores />
    </>
  )
}
