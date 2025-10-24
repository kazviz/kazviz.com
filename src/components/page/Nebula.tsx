import { JSX, ParentProps, onMount } from "solid-js"
import "@style/page/nebula.scss"

type Theme = "dust" | "iris" | "mist" | "ruby"
type Align = "left" | "center"

interface Redirect {
  href: string
  timeout: number
}

interface NebulaProps extends ParentProps {
  theme?: Theme
  align?: Align
  redirect?: Redirect
}

export default function Nebula(props: NebulaProps) {
  const theme = () => props.theme ?? "dust"
  const align = () => props.align ?? "center"

  onMount(() => {
    if (props.redirect) {
      setTimeout(() => {
        window.location.href = props.redirect!.href
      }, props.redirect.timeout)
    }
  })

  return (
    <main class={theme() + " nebula fn-ambience " + align()}>
      <div class="cn-main">{props.children}</div>
    </main>
  )
}
