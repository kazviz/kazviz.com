import CirclePlay from "lucide-solid/icons/circle-play"
import Mesh from "~/components/svg/Mesh"

export default function LandingHero() {
  return (
    <section id="hero">
      <div class="space stars1"></div>
      <div class="space stars2"></div>
      <div class="space stars3"></div>
      <div class="ship cn-ctr">
        <div class="cnt">
          <h1>
            <div>
              <small>Hello, I am</small>
            </div>
            <div>
              <b>KazViz</b>
            </div>
          </h1>
          <p>Bocah desa yang ketagihan menjelajah</p>
          <div class="cta">
            <div class="cta mono">
              <a href="/kodeks" class="btn m bd br-10">
                <CirclePlay /> <span>Kenalan!</span>
              </a>
            </div>
          </div>

          <Mesh className="logo" />
        </div>
      </div>
    </section>
  )
}
