import { HarborProvider } from "@context/Harbor"
import Cross from "./harbor/Cross"
import Naval from "./harbor/Naval"

export default function Harbor(props: {
  realm: string
  letterSpacing: number
}) {
  return (
    <HarborProvider>
      <header id="harbor">
        <Naval realm={props.realm} letterSpacing={props.letterSpacing} />
        <Cross />
      </header>
    </HarborProvider>
  )
}
