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
              <h2>Siapa itu KazViz?</h2>
              <p>
                KazViz adalah seorang lelaki berusia 23 tahun yang tumbuh di
                dataran tinggi Asia Tenggara, berasal dari keluarga sederhana,
                dan belajar banyak hal dengan caranya sendiri. Ia tidak menempuh
                jalan akademik formal, tapi menemukan jalannya lewat rasa ingin
                tahu yang tak pernah padam.
              </p>

              <p>
                Dunia KazViz luas—ia menyelami teknologi, sains, seni, filsafat,
                sampai hal-hal yang menyentuh sisi manusia. Ia suka memahami
                cara dunia bekerja dari berbagai sudut, seolah pikirannya adalah
                laboratorium yang terus hidup dan bereksperimen.
              </p>

              <h2>Jadi, apa sebenarnya ini?</h2>
              <p>
                <b>Codex KazViz</b> adalah semacam peta pikiran—tempat di mana
                ide, perasaan, dan pengalaman disusun seperti arsitektur yang
                bernapas. Ini bukan hanya catatan hidup, tapi juga ruang
                refleksi, semacam jurnal eksperimental yang mencoba menjawab
                pertanyaan besar: bagaimana kesadaran dan motivasi bisa disusun
                tanpa harus berpusat pada ego.
              </p>

              <p>
                KazViz sendiri bukan sekadar nama panggung, tapi juga persona
                konseptual—sebuah "bentuk" yang digunakan untuk menunjukkan
                bagaimana sistem pikiran bisa bekerja, bereaksi, dan
                beradaptasi. Fokusnya bukan pada <i>siapa</i> KazViz, tapi{" "}
                <i>bagaimana</i> sesuatu seperti KazViz bisa ada dan berfungsi.
              </p>
            </section>

            <section id="daftar-isi">
              <h2>Daftar Isi</h2>
              <p>
                Silakan jelajahi bagian-bagian di bawah ini sesuai ritme dan
                rasa ingin tahu Anda. Tidak ada urutan wajib, setiap bagian bisa
                dibaca secara bebas, setiap bagian saling terhubung.
              </p>
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
                <li>
                  <a href="/kodeks/proyek" title="Kodeks KazViz: Proyek Naz-A">
                    Bagian 3: Proyek Naz-A
                  </a>
                </li>
              </ul>
            </section>

            <hr />

            <section id="intro-2">
              <p>
                Dokumen ini merekam satu sistem manusia yang beroperasi di batas
                efisiensi kognitif dan kedalaman emosional. Ia menggambarkan
                bagaimana trauma dapat diurai menjadi struktur pengetahuan,
                bagaimana kesadaran dapat melipat dirinya sendiri, dan bagaimana
                kebahagiaan dapat muncul bukan dari pencapaian, tetapi dari
                keberadaan yang utuh.
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
