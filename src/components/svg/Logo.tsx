import { JSX, createSignal, onMount, Show } from "solid-js"
import { isServer } from "solid-js/web"

interface LogoProps {
  name: string
  inline?: boolean
}

export default function Logo(props: LogoProps): JSX.Element {
  const [mounted, setMounted] = createSignal(false)
  const [svgContent, setSvgContent] = createSignal<string>("")

  onMount(() => {
    setMounted(true)

    if (props.inline) {
      // Load inline SVG dinamis hanya di client
      import("@data/svg/logos")
        .then((module) => {
          const content = module.default[props.name] || ""
          setSvgContent(content)
        })
        .catch((error) => {
          console.error(`Failed to load SVG: ${props.name}`, error)
        })
    }
  })

  // Untuk inline SVG
  if (props.inline) {
    // SSR: render placeholder
    if (isServer) {
      return (
        <span
          style="display: inline-block; width: 24px; height: 24px; background-color: #8883; border-radius: 4px;"
          aria-label={props.name}
          role="img"
        />
      )
    }

    // Client: render content atau placeholder
    return (
      <Show
        when={mounted() && svgContent()}
        fallback={
          <span
            style="display: inline-block; width: 24px; height: 24px; background-color: #8883; border-radius: 4px;"
            aria-label={props.name}
            role="img"
          />
        }>
        <span
          // biome-ignore lint/security/noDangerouslySetInnerHtml: SVG content is from our own data
          innerHTML={svgContent()}
          aria-label={props.name}
          role="img"
        />
      </Show>
    )
  }

  // Untuk sprite-based SVG - pendekatan sederhana
  // SSR: render placeholder yang sama dengan client
  const placeholder = (
    <svg width="24" height="24" aria-label={props.name} role="img">
      <rect width="24" height="24" fill="#8883" rx="2" />
    </svg>
  )

  if (isServer) {
    return placeholder
  }

  return (
    <Show when={mounted()} fallback={placeholder}>
      <svg width="24" height="24" aria-label={props.name} role="img">
        {/* Referensi langsung ke sprite external */}
        <use
          href={`/logo/sprite.svg#${props.name}`}
          ref={(el) => {
            // Safari/older browsers fallback
            try {
              el.setAttribute("xlink:href", `/logo/sprite.svg#${props.name}`)
            } catch {}
          }}
        />
      </svg>
    </Show>
  )
}
