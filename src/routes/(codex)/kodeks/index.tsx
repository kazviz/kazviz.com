import { MetaProvider, Title, Meta } from "@solidjs/meta"
import { LocaleProvider } from "@context/Locale"
import HrefLang from "@comp/common/HrefLang"
import CodexLayout from "@layout/Codex"

export default function CourseDynamic() {
  const lang = () => "id" as Lang

  // === RENDER

  return (
    <LocaleProvider lang={lang} hreflang={undefined}>
      <CodexLayout>
        <MetaProvider>
          <Title>Kodeks KazViz</Title>
          <Meta
            name="description"
            content="Kodeks lengkap mengenai bagaimana KazViz hidup dan beroperasi dalam berbagai aspek dan sudut pandang."
          />
          <HrefLang />
        </MetaProvider>
        <section id="title-banner">
          <hgroup>
            <h1>Kodeks KazViz</h1>
            <div class="tagline">Mengenai Bagaimana KazViz Beroperasi</div>
          </hgroup>
        </section>
        <article class="artes">
          {/* // === CONTENT */}
          <div id="main-content">
            <section id="intro">
              <h2>Pendahuluan</h2>
              <p>
                Codex KazViz adalah sebuah arsip kesadaran — catatan sistemik
                tentang bagaimana pikiran, perasaan, dan eksistensial dapat
                diatur seperti arsitektur yang hidup. Codex KazViz bukan
                biografi, bukan laporan penelitian, dan bukan pula sekadar
                refleksi pribadi; melainkan perpaduan dari ketiganya.
              </p>

              <p>
                Dokumen ini merekam satu sistem manusia yang beroperasi di batas
                efisiensi kognitif dan kedalaman emosional. Ia menggambarkan
                bagaimana trauma dapat diurai menjadi struktur pengetahuan,
                bagaimana kesadaran dapat melipat dirinya sendiri, dan bagaimana
                kebahagiaan dapat muncul bukan dari pencapaian, tetapi dari
                keberadaan yang utuh.
              </p>

              <p>
                KazViz — nama panggung dan sekaligus persona konseptual —
                berfungsi sebagai <i>medium demonstratif</i>. Ia adalah bentuk
                yang digunakan untuk menunjukkan bagaimana sistem kesadaran,
                kecerdasan, dan motivasi bisa diintegrasikan tanpa pusat ego.
                Yang dipelajari di sini bukan <i>siapa</i> KazViz, melainkan
                bagaimana sesuatu seperti KazViz dapat eksis dan berfungsi.
              </p>

              <p>
                Setiap halaman Codex ini adalah potongan dari mekanisme hidup:
                pikiran yang berputar secara rekursif, emosi yang mengalir
                jujur, tubuh yang terbatas namun efisien, dan sistem nilai yang
                beroperasi tanpa keterikatan pada validasi eksternal.
              </p>

              <p>
                Ia adalah "<i>living architecture</i>" — struktur yang tidak
                berhenti berevolusi, bahkan saat sedang dibaca.
              </p>
            </section>

            <section id="daftar-isi">
              <h2>Daftar Isi</h2>
              <ul>
                <li>
                  <a href="/kodeks/kognitif" title="Kodeks KazViz: Kognitif">
                    Bagian 1: Kognitif
                  </a>
                </li>
                <li>
                  <a
                    href="/kodeks/eksistensial"
                    title="Kodeks KazViz: Eksistensial">
                    Bagian 2: Eksistensial
                  </a>
                </li>
              </ul>
            </section>

            <aside id="metadata">
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
          </div>
        </article>
      </CodexLayout>
    </LocaleProvider>
  )
}
