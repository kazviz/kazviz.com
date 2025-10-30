import { createEffect, createSignal, onMount, Show } from "solid-js"
import { activateAmbienceButtons } from "~/lib/mode"
import { useHarbor } from "~/context/Harbor"
import { useLocale } from "~/context/Locale"
import { useTrans } from "~/hooks/trans"
import Globe from "lucide-solid/icons/globe"
import Moon from "lucide-solid/icons/moon"
import Sun from "lucide-solid/icons/sun"
import Mesh from "~/components/svg/Mesh"
import "@style/main/naval.scss"

export default function Naval(props: { realm: string; letterSpacing: number }) {
  const lang = useLocale().lang
  const { t } = useTrans("main/harbor")
  const { openedHarborMenu, setOpenedHarborMenu } = useHarbor()

  const [isClient, setIsClient] = createSignal(false)

  let naval: HTMLElement | undefined

  onMount(() => {
    setIsClient(true)
  })

  createEffect(() => {
    if (naval && isClient()) {
      setTimeout(() => {
        activateAmbienceButtons()
      }, 10)
    }
  })

  return (
    <Show
      when={t()}
      fallback={
        <nav id="naval">
          <div class="raft" style="height: 100%; max-width: 300px;"></div>
        </nav>
      }>
      {(tFunc) => {
        // Buat t sebagai function yang reactive
        const t = () => tFunc()

        return (
          <nav
            id="naval"
            ref={(el) => {
              naval = el
              // Run holdPanel immediately on initial render
              if (naval && isClient()) {
                activateAmbienceButtons()
              }
            }}>
            <div class="ship">
              {/* banner */}
              <div id="banner-panel">
                <a href={"/"} title="Home" class="land">
                  <Mesh />
                  <div class="hide-mobile">
                    <b>KazViz</b>
                    <span style={`letter-spacing: ${props.letterSpacing}px;`}>
                      {props.realm}
                    </span>
                  </div>
                </a>
              </div>

              {/* main menu */}
              <div id="basin-panel">
                {/* <a href="/kazvizian">
                  <span>KAZVIZIAN</span>
                </a>
                <a href="/proyek">
                  <span>PROJECT</span>
                </a> */}
                <a href="/kodeks">
                  <span>CODEX</span>
                </a>
                {/* <button
                  onClick={() => openMenu("course")}
                  class={openedHarborMenu() === "course" ? "active" : ""}>
                  <span class="hide-mobile">{t()("learn")}</span>
                  <BookOpen class="show-mobile-only" />
                  <ChevronDown />
                </button> */}
              </div>

              {/* utility menu */}
              <div id="util-panel">
                <div id="util-menu">
                  {/* cross button */}
                  {/* <button
                    id="btn-cross"
                    title={t()("lang-switch")}
                    onClick={() =>
                      setOpenedHarborMenu(
                        openedHarborMenu() === "cross" ? null : "cross"
                      )
                    }
                    class={openedHarborMenu() === "cross" ? "active" : ""}>
                    <Globe strokeWidth={1.3} />
                  </button> */}

                  {/* ambience button */}
                  <button class="fn-ambience swan" title={t()("dark-mode")}>
                    <Moon strokeWidth={1.5} />
                  </button>
                  <button class="fn-ambience wolf" title={t()("light-mode")}>
                    <Sun strokeWidth={1.5} />
                  </button>
                </div>
              </div>
              {/* end of utility panel */}
            </div>
          </nav>
        )
      }}
    </Show>
  )
}
