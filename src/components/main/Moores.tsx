import { useTrans } from "@hooks/trans"
import { Show } from "solid-js"
import Logo from "@comp/svg/Logo"
import "@style/main/moores.scss"

export default function Moores() {
  const { t } = useTrans("main/moores")

  return (
    <Show when={t()}>
      {(tFunc) => {
        const t = () => tFunc()

        return (
          <footer id="moores">
            <div class="ship">
              <div class="banner">
                <h2>KazViz</h2>
                <div class="slogan">{t()("slogan")}</div>
                <br />
                <div class="socials">
                  <a href="https://www.github.com/kazviz">
                    <Logo name="github" />
                  </a>
                  <a href={"https://www.instagram.com/kazviz"}>
                    <Logo name="instagram_mono" />
                  </a>
                  <a href={"https://www.x.com/kazviz_"}>
                    <Logo name="x" />
                  </a>
                </div>
              </div>

              <div class="legal">
                <h3>{t()("legal")}</h3>
                <ul>
                  <li>
                    <a href={t()("r_term")}>{t()("term")}</a>
                  </li>
                  <li>
                    <a href={t()("r_privacy")}>{t()("privacy")}</a>
                  </li>
                  <li>
                    <a href={t()("r_cookie")}>{t()("cookie")}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="copyright">
              {t()("copyright")} &copy; 2025 - All rights reserved.
            </div>
          </footer>
        )
      }}
    </Show>
  )
}
