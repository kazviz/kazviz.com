import { MetaProvider, Title, Meta } from "@solidjs/meta"
import LegalLayout from "@layout/Legal"

const legalData = {
  "lang": "id",
  "title": "Kebijakan Privasi - KazViz.com",
  "subtitle": "Terakhir diperbarui 29 Oktober 2025",
  "h1": "Kebijakan Privasi",
  "description": "Kebijakan Privasi KazViz.com menjelaskan secara transparan praktik privasi kami sebagai situs statis personal. Kami menggunakan analytics privacy-friendly dan hanya mengumpulkan data minimal yang diperlukan. Tidak ada data pribadi yang dijual atau dibagikan ke pihak ketiga.",
  "toc": [
    {
      "depth": 2,
      "href": "#privasi-anda-adalah-prioritas-kami",
      "text": "Privasi Anda adalah Prioritas Kami"
    },
    {
      "depth": 2,
      "href": "#daftar-isi",
      "text": "Daftar Isi"
    },
    {
      "depth": 2,
      "href": "#ringkasan-poin-penting",
      "text": "Ringkasan Poin Penting"
    },
    {
      "depth": 2,
      "href": "#1-tentang-kazvizcom",
      "text": "1. Tentang KazViz.com"
    },
    {
      "depth": 2,
      "href": "#2-data-yang-kami-kumpulkan",
      "text": "2. Data yang Kami Kumpulkan"
    },
    {
      "depth": 3,
      "href": "#a-analytics-umami",
      "text": "A. Analytics (Umami)"
    },
    {
      "depth": 3,
      "href": "#b-cookies",
      "text": "B. Cookies"
    },
    {
      "depth": 2,
      "href": "#3-data-yang-tidak-kami-kumpulkan",
      "text": "3. Data yang TIDAK Kami Kumpulkan"
    },
    {
      "depth": 2,
      "href": "#4-pembagian-data",
      "text": "4. Pembagian Data"
    },
    {
      "depth": 3,
      "href": "#umami-analytics-cloud-hosted",
      "text": "Umami Analytics (Cloud-Hosted)"
    },
    {
      "depth": 3,
      "href": "#tidak-ada-pihak-ketiga-lainnya",
      "text": "Tidak Ada Pihak Ketiga Lainnya"
    },
    {
      "depth": 3,
      "href": "#pembagian-wajib-hukum",
      "text": "Pembagian Wajib Hukum"
    },
    {
      "depth": 2,
      "href": "#5-hak-anda",
      "text": "5. Hak Anda"
    },
    {
      "depth": 3,
      "href": "#hak-privasi-anda",
      "text": "Hak Privasi Anda"
    },
    {
      "depth": 3,
      "href": "#mengelola-cookies",
      "text": "Mengelola Cookies"
    },
    {
      "depth": 3,
      "href": "#opt-out-dari-analytics",
      "text": "Opt-out dari Analytics"
    },
    {
      "depth": 2,
      "href": "#6-anak-anak",
      "text": "6. Anak-anak"
    },
    {
      "depth": 2,
      "href": "#7-do-not-track",
      "text": "7. Do Not Track"
    },
    {
      "depth": 2,
      "href": "#8-transfer-data-internasional",
      "text": "8. Transfer Data Internasional"
    },
    {
      "depth": 2,
      "href": "#9-berapa-lama-kami-menyimpan-data",
      "text": "9. Berapa Lama Kami Menyimpan Data"
    },
    {
      "depth": 3,
      "href": "#data-analytics",
      "text": "Data Analytics"
    },
    {
      "depth": 3,
      "href": "#cookies",
      "text": "Cookies"
    },
    {
      "depth": 2,
      "href": "#10-keamanan-data",
      "text": "10. Keamanan Data"
    },
    {
      "depth": 2,
      "href": "#11-perubahan-kebijakan",
      "text": "11. Perubahan Kebijakan"
    },
    {
      "depth": 2,
      "href": "#12-kepatuhan-hukum",
      "text": "12. Kepatuhan Hukum"
    },
    {
      "depth": 2,
      "href": "#13-kontak",
      "text": "13. Kontak"
    }
  ],
  "content": "<h2 id=\"privasi-anda-adalah-prioritas-kami\">Privasi Anda adalah Prioritas Kami</h2>\n<p>KazViz.com adalah situs statis personal yang dirancang untuk menghormati privasi Anda dengan meminimalkan pengumpulan data.</p>\n<p>Kami tidak memiliki sistem backend untuk menyimpan data pengguna, tidak ada registrasi akun, dan tidak ada database yang menyimpan informasi pribadi Anda. Yang kami kumpulkan hanya data analytics agregat yang bersifat anonim untuk memahami bagaimana situs ini digunakan, serta dua cookies sederhana untuk menyimpan preferensi tampilan Anda.</p>\n<p><strong>Kami tidak pernah:</strong></p>\n<ul>\n<li>Menjual atau membagikan data Anda ke pihak ketiga untuk tujuan komersial</li>\n<li>Mengumpulkan informasi pribadi seperti nama atau email</li>\n<li>Melacak Anda di luar situs ini</li>\n<li>Menggunakan iklan atau tracker pihak ketiga</li>\n</ul>\n<p>Transparansi adalah fondasi kepercayaan kami dengan Anda.</p>\n<p>Mohon luangkan waktu untuk membaca bagaimana kami menghormati privasi Anda.</p>\n<hr>\n<h2 id=\"daftar-isi\">Daftar Isi</h2>\n<nav id=\"toc\"><ul><li><a href=\"#privasi-anda-adalah-prioritas-kami\">Privasi Anda adalah Prioritas Kami</a></li><li><a href=\"#daftar-isi\">Daftar Isi</a></li><li><a href=\"#ringkasan-poin-penting\">Ringkasan Poin Penting</a></li><li><a href=\"#1-tentang-kazvizcom\">1. Tentang KazViz.com</a></li><li><a href=\"#2-data-yang-kami-kumpulkan\">2. Data yang Kami Kumpulkan</a></li><ul><li><a href=\"#a-analytics-umami\">A. Analytics (Umami)</a></li><li><a href=\"#b-cookies\">B. Cookies</a></li></ul><li><a href=\"#3-data-yang-tidak-kami-kumpulkan\">3. Data yang TIDAK Kami Kumpulkan</a></li><li><a href=\"#4-pembagian-data\">4. Pembagian Data</a></li><ul><li><a href=\"#umami-analytics-cloud-hosted\">Umami Analytics (Cloud-Hosted)</a></li><li><a href=\"#tidak-ada-pihak-ketiga-lainnya\">Tidak Ada Pihak Ketiga Lainnya</a></li><li><a href=\"#pembagian-wajib-hukum\">Pembagian Wajib Hukum</a></li></ul><li><a href=\"#5-hak-anda\">5. Hak Anda</a></li><ul><li><a href=\"#hak-privasi-anda\">Hak Privasi Anda</a></li><li><a href=\"#mengelola-cookies\">Mengelola Cookies</a></li><li><a href=\"#opt-out-dari-analytics\">Opt-out dari Analytics</a></li></ul><li><a href=\"#6-anak-anak\">6. Anak-anak</a></li><li><a href=\"#7-do-not-track\">7. Do Not Track</a></li><li><a href=\"#8-transfer-data-internasional\">8. Transfer Data Internasional</a></li><li><a href=\"#9-berapa-lama-kami-menyimpan-data\">9. Berapa Lama Kami Menyimpan Data</a></li><ul><li><a href=\"#data-analytics\">Data Analytics</a></li><li><a href=\"#cookies\">Cookies</a></li></ul><li><a href=\"#10-keamanan-data\">10. Keamanan Data</a></li><li><a href=\"#11-perubahan-kebijakan\">11. Perubahan Kebijakan</a></li><li><a href=\"#12-kepatuhan-hukum\">12. Kepatuhan Hukum</a></li><li><a href=\"#13-kontak\">13. Kontak</a></li></ul></nav>\n\n<hr>\n<p><strong>Pemberitahuan Privasi ini</strong> menjelaskan bagaimana KazViz.com (&quot;<strong>kami</strong>&quot; atau &quot;<strong>milik kami</strong>&quot;) menghormati privasi Anda saat Anda mengunjungi situs kami.</p>\n<blockquote>\n<p>Kami tahu membaca kebijakan privasi bisa terasa membosankan, tapi ini penting agar Anda tahu bahwa privasi Anda aman di sini.</p>\n</blockquote>\n<h2 id=\"ringkasan-poin-penting\">Ringkasan Poin Penting</h2>\n<blockquote>\n<p><strong><em>Bagian ini merangkum poin-poin utama dari kebijakan privasi KazViz.com. Anda bisa membaca lebih detail dengan mengklik tautan di tiap poin, atau langsung menuju ke <a href=\"#daftar-isi\">daftar isi</a>.</em></strong></p>\n</blockquote>\n<p><strong>Apa itu KazViz.com?</strong><br>KazViz.com adalah situs statis personal tanpa backend, database, atau sistem akun. Semua konten bersifat publik dan dapat diakses tanpa registrasi. <a href=\"#1-tentang-kazvizcom\">Pelajari lebih lanjut</a>.</p>\n<p><strong>Data apa yang kami kumpulkan?</strong><br>Kami hanya mengumpulkan data analytics agregat dan anonim melalui Umami Analytics, plus dua cookies untuk preferensi tema dan bahasa. <a href=\"#2-data-yang-kami-kumpulkan\">Lihat detail</a>.</p>\n<p><strong>Apakah data pribadi dikumpulkan?</strong><br>Tidak. Kami tidak mengumpulkan nama, email, alamat, nomor telepon, atau data pribadi lainnya. <a href=\"#3-data-yang-tidak-kami-kumpulkan\">Lihat data yang TIDAK kami kumpulkan</a>.</p>\n<p><strong>Apakah data dibagikan ke pihak ketiga?</strong><br>Saat ini, data analytics dikirim ke cloud Umami (akan dipindah ke self-hosted). Selain itu, kami tidak membagikan data ke pihak manapun. <a href=\"#4-pembagian-data\">Baca lebih lanjut</a>.</p>\n<p><strong>Apa hak Anda?</strong><br>Anda dapat menonaktifkan cookies melalui browser. Karena tidak ada data pribadi yang dikumpulkan, tidak ada data yang perlu dihapus. <a href=\"#5-hak-anda\">Lihat hak Anda</a>.</p>\n<p><strong>Bagaimana dengan anak-anak?</strong><br>Situs ini ditujukan untuk umum 18+, namun tidak ada data pribadi yang dikumpulkan dari siapapun termasuk anak-anak. <a href=\"#6-anak-anak\">Baca selengkapnya</a>.</p>\n<blockquote>\n<p>&quot;Privasi bukan tentang menyembunyikan sesuatu,<br>tapi tentang menghormati batasan dan memberikan kontrol.&quot;<br><em>— KazViz</em></p>\n</blockquote>\n<hr>\n<h2 id=\"1-tentang-kazvizcom\">1. Tentang KazViz.com</h2>\n<p><strong><em>Singkatnya:</em></strong> <em>KazViz.com adalah situs statis personal tanpa sistem backend atau database.</em>\n<br /><strong><em>Mengapa ini penting:</em></strong> Memahami sifat situs membantu Anda memahami mengapa kami mengumpulkan data sangat minimal.</p>\n<p>KazViz.com adalah situs statis personal yang berisi berbagai artikel, publikasi, dan blog multi-disiplin. Situs ini:</p>\n<ul>\n<li><strong>Tidak memiliki backend</strong> — tidak ada server yang menyimpan data pengguna</li>\n<li><strong>Tidak memiliki database</strong> — tidak ada penyimpanan informasi pribadi</li>\n<li><strong>Tidak memiliki sistem akun</strong> — tidak ada registrasi atau login</li>\n<li><strong>Tidak memiliki fitur interaktif</strong> — tidak ada komentar, forum, atau chat</li>\n</ul>\n<p>Semua konten bersifat publik dan dapat diakses oleh siapa saja tanpa perlu mendaftar atau memberikan informasi pribadi.</p>\n<h2 id=\"2-data-yang-kami-kumpulkan\">2. Data yang Kami Kumpulkan</h2>\n<p><strong><em>Singkatnya:</em></strong> <em>Kami hanya mengumpulkan data analytics anonim dan dua cookies untuk preferensi.</em>\n<br /><strong><em>Mengapa ini penting:</em></strong> Transparansi penuh tentang data yang dikumpulkan.</p>\n<h3 id=\"a-analytics-umami\">A. Analytics (Umami)</h3>\n<p>Kami menggunakan <a href=\"https://umami.is/\">Umami Analytics</a>, sebuah alternatif analytics yang ramah privasi, untuk memahami bagaimana pengunjung menggunakan situs kami.</p>\n<p><strong>Status saat ini:</strong> Cloud-hosted oleh Umami (data dikirim ke server Umami)<br><strong>Rencana:</strong> Akan dipindahkan ke self-hosted (data hanya di server kami sendiri)</p>\n<p><strong>Data yang dikumpulkan oleh Umami:</strong></p>\n<ul>\n<li><strong>Halaman yang dikunjungi</strong> — URL halaman yang dibuka</li>\n<li><strong>Sumber rujukan</strong> — Dari mana pengunjung datang (Google, media sosial, dll)</li>\n<li><strong>Negara</strong> — Berdasarkan alamat IP (tanpa menyimpan IP secara langsung)</li>\n<li><strong>Jenis perangkat</strong> — Desktop, mobile, atau tablet</li>\n<li><strong>Browser dan OS</strong> — Jenis browser dan sistem operasi (agregat)</li>\n<li><strong>Durasi kunjungan</strong> — Berapa lama pengunjung berada di situs</li>\n</ul>\n<p><strong>Data yang TIDAK dikumpulkan:</strong></p>\n<ul>\n<li>⛌ Alamat IP lengkap</li>\n<li>⛌ Fingerprinting browser</li>\n<li>⛌ Tracking lintas situs</li>\n<li>⛌ Data pribadi yang dapat diidentifikasi</li>\n<li>⛌ Cookies untuk tracking</li>\n</ul>\n<p>Umami tidak menggunakan cookies dan sepenuhnya mematuhi GDPR, CCPA, dan PECR. Data yang dikumpulkan bersifat agregat dan anonim.</p>\n<p>Anda dapat membaca lebih lanjut tentang kebijakan privasi Umami di <a href=\"https://umami.is/privacy\">umami.is/privacy</a>.</p>\n<h3 id=\"b-cookies\">B. Cookies</h3>\n<p>Kami menggunakan <strong>dua HTTP cookies</strong> yang disimpan di browser Anda untuk meningkatkan pengalaman pengguna:</p>\n<p><strong>1. <code>ambience</code></strong> — Menyimpan preferensi tema (mode gelap atau terang)<br><strong>2. <code>lang</code></strong> — Menyimpan preferensi bahasa (Bahasa Indonesia atau English)</p>\n<p><strong>Karakteristik cookies kami:</strong></p>\n<ul>\n<li>✓ Hanya untuk preferensi tampilan</li>\n<li>✓ Tidak mengandung data pribadi</li>\n<li>✓ Tidak digunakan untuk tracking atau iklan</li>\n<li>✓ Dikirim ke server untuk konsistensi antar halaman</li>\n<li>✓ Dapat dihapus kapan saja melalui pengaturan browser</li>\n</ul>\n<p>Kedua cookies ini bersifat <strong>fungsional</strong> dan diperlukan agar preferensi Anda tersimpan saat berpindah halaman. Tanpa cookies ini, tema dan bahasa akan kembali ke default setiap kali Anda membuka halaman baru.</p>\n<h2 id=\"3-data-yang-tidak-kami-kumpulkan\">3. Data yang TIDAK Kami Kumpulkan</h2>\n<p><strong><em>Singkatnya:</em></strong> <em>Daftar lengkap data yang tidak kami kumpulkan.</em>\n<br /><strong><em>Mengapa ini penting:</em></strong> Memberikan kepastian tentang apa yang TIDAK dilakukan situs ini.</p>\n<p>Kami dengan tegas menyatakan bahwa kami <strong>TIDAK</strong> mengumpulkan:</p>\n<ul>\n<li>⛌ <strong>Nama lengkap</strong> — tidak ada form pendaftaran</li>\n<li>⛌ <strong>Alamat email</strong> — tidak ada newsletter atau notifikasi</li>\n<li>⛌ <strong>Nomor telepon</strong> — tidak ada verifikasi atau kontak</li>\n<li>⛌ <strong>Alamat rumah atau pos</strong> — tidak ada pengiriman fisik</li>\n<li>⛌ <strong>Data pembayaran</strong> — tidak ada transaksi</li>\n<li>⛌ <strong>Alamat IP lengkap</strong> — Umami hanya menggunakan untuk negara</li>\n<li>⛌ <strong>Data lokasi presisi</strong> — tidak ada GPS tracking</li>\n<li>⛌ <strong>Riwayat browsing</strong> — tidak ada tracking lintas situs</li>\n<li>⛌ <strong>Informasi login</strong> — tidak ada sistem akun</li>\n<li>⛌ <strong>Data biometrik</strong> — tidak ada scan wajah atau sidik jari</li>\n<li>⛌ <strong>Data sensitif</strong> — tidak ada informasi ras, agama, orientasi seksual, atau kesehatan</li>\n</ul>\n<p>Jika tidak disebutkan di bagian <a href=\"#2-data-yang-kami-kumpulkan\">Data yang Kami Kumpulkan</a>, maka kami <strong>tidak</strong> mengumpulkannya.</p>\n<h2 id=\"4-pembagian-data\">4. Pembagian Data</h2>\n<p><strong><em>Singkatnya:</em></strong> <em>Data analytics saat ini dikirim ke Umami cloud, tidak ada pembagian lainnya.</em>\n<br /><strong><em>Mengapa ini penting:</em></strong> Menjelaskan pihak ketiga yang terlibat (jika ada).</p>\n<h3 id=\"umami-analytics-cloud-hosted\">Umami Analytics (Cloud-Hosted)</h3>\n<p>Saat ini, data analytics dikirim ke server <strong>Umami cloud</strong> untuk diproses. Umami adalah layanan analytics yang fokus pada privasi dan tidak membagikan data Anda ke pihak lain.</p>\n<p><strong>Catatan penting:</strong></p>\n<ul>\n<li>Kami berencana memindahkan Umami ke <strong>self-hosted</strong> (dijalankan di server kami sendiri)</li>\n<li>Setelah self-hosted, <strong>tidak ada data yang dikirim ke pihak ketiga</strong></li>\n<li>Umami tidak menjual atau membagikan data ke advertiser atau pihak lain</li>\n</ul>\n<h3 id=\"tidak-ada-pihak-ketiga-lainnya\">Tidak Ada Pihak Ketiga Lainnya</h3>\n<p>Kami <strong>TIDAK</strong> menggunakan:</p>\n<ul>\n<li>⛌ Google Analytics atau layanan tracking Google lainnya</li>\n<li>⛌ Facebook Pixel atau Meta tracking</li>\n<li>⛌ Layanan iklan pihak ketiga</li>\n<li>⛌ CDN yang melakukan tracking (kami menggunakan CDN privacy-friendly)</li>\n<li>⛌ Penyedia email marketing</li>\n<li>⛌ Payment gateway (tidak ada transaksi)</li>\n<li>⛌ Chat widget atau customer support tracking</li>\n</ul>\n<h3 id=\"pembagian-wajib-hukum\">Pembagian Wajib Hukum</h3>\n<p>Kami dapat membagikan data <strong>hanya jika diwajibkan oleh hukum</strong>, seperti:</p>\n<ul>\n<li>Perintah pengadilan yang sah</li>\n<li>Proses hukum yang berlaku</li>\n<li>Permintaan resmi dari penegak hukum</li>\n</ul>\n<p>Namun, karena kami tidak mengumpulkan data pribadi yang dapat diidentifikasi, hampir tidak ada data yang dapat dibagikan.</p>\n<h2 id=\"5-hak-anda\">5. Hak Anda</h2>\n<p><strong><em>Singkatnya:</em></strong> <em>Anda memiliki kontrol penuh atas data Anda (yang sangat minimal).</em>\n<br /><strong><em>Mengapa ini penting:</em></strong> Memberikan Anda kontrol dan transparansi.</p>\n<h3 id=\"hak-privasi-anda\">Hak Privasi Anda</h3>\n<p>Karena kami tidak mengumpulkan data pribadi yang dapat diidentifikasi, tidak ada data yang perlu:</p>\n<ul>\n<li>✓ Diakses (tidak ada akun untuk diakses)</li>\n<li>✓ Dikoreksi (tidak ada profil untuk diperbaiki)</li>\n<li>✓ Dihapus (tidak ada data pribadi yang disimpan)</li>\n<li>✓ Diunduh (tidak ada data untuk diunduh)</li>\n</ul>\n<h3 id=\"mengelola-cookies\">Mengelola Cookies</h3>\n<p>Anda dapat mengelola atau menghapus cookies melalui pengaturan browser Anda:</p>\n<p><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data<br><strong>Firefox:</strong> Settings → Privacy &amp; Security → Cookies and Site Data<br><strong>Safari:</strong> Preferences → Privacy → Manage Website Data<br><strong>Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</p>\n<p>Menghapus cookies <code>ambience</code> dan <code>lang</code> akan mereset preferensi tema dan bahasa Anda ke default.</p>\n<h3 id=\"opt-out-dari-analytics\">Opt-out dari Analytics</h3>\n<p>Meskipun Umami tidak menggunakan cookies dan data bersifat anonim, Anda tetap dapat memblokir analytics dengan:</p>\n<ol>\n<li><strong>Menggunakan Do Not Track</strong> — Umami menghormati sinyal DNT dari browser</li>\n<li><strong>Browser Privacy Mode</strong> — Mode incognito/private tidak akan mengirim data</li>\n<li><strong>Ad Blocker</strong> — Extension seperti uBlock Origin akan memblokir script analytics</li>\n<li><strong>Browser Settings</strong> — Blokir JavaScript dari domain analytics</li>\n</ol>\n<h2 id=\"6-anak-anak\">6. Anak-anak</h2>\n<p><strong><em>Singkatnya:</em></strong> <em>Situs ini untuk umum 18+, namun tidak ada data pribadi yang dikumpulkan dari siapapun.</em>\n<br /><strong><em>Mengapa ini penting:</em></strong> Perlindungan anak-anak di internet.</p>\n<p>Situs ini ditujukan untuk pengguna berusia 18 tahun ke atas. Kami tidak secara sengaja mengumpulkan data pribadi dari anak-anak di bawah 18 tahun.</p>\n<p>Karena situs ini tidak memiliki sistem registrasi atau mengumpulkan data pribadi, risiko pengumpulan data anak-anak sangat minimal. Namun, kami tetap menyarankan orang tua atau wali untuk mengawasi aktivitas online anak-anak mereka.</p>\n<p>Jika Anda percaya bahwa kami secara tidak sengaja mengumpulkan informasi dari anak di bawah 18 tahun, silakan hubungi kami di <a href=\"mailto:support@kazviz.com\">support@kazviz.com</a>.</p>\n<h2 id=\"7-do-not-track\">7. Do Not Track</h2>\n<p><strong><em>Singkatnya:</em></strong> <em>Kami menghormati sinyal Do Not Track dan tidak melakukan tracking lintas situs.</em>\n<br /><strong><em>Mengapa ini penting:</em></strong> Menghormati preferensi privasi pengguna.</p>\n<p>Fitur <strong>Do Not Track (DNT)</strong> adalah pengaturan browser yang memberi sinyal bahwa Anda tidak ingin dilacak.</p>\n<p><strong>Posisi kami:</strong></p>\n<ul>\n<li>✓ Umami Analytics <strong>menghormati sinyal DNT</strong> — jika DNT aktif, data Anda tidak akan dikumpulkan</li>\n<li>✓ Kami tidak menggunakan tracking lintas situs</li>\n<li>✓ Kami tidak menggunakan iklan atau retargeting</li>\n</ul>\n<p>Untuk mengaktifkan Do Not Track:</p>\n<ul>\n<li><strong>Chrome:</strong> Settings → Privacy and security → Send a &quot;Do Not Track&quot; request</li>\n<li><strong>Firefox:</strong> Settings → Privacy &amp; Security → Send websites a &quot;Do Not Track&quot; signal</li>\n<li><strong>Safari:</strong> Preferences → Privacy → Ask websites not to track me</li>\n</ul>\n<h2 id=\"8-transfer-data-internasional\">8. Transfer Data Internasional</h2>\n<p><strong><em>Singkatnya:</em></strong> <em>Data analytics mungkin diproses di luar Indonesia (saat ini Umami cloud).</em>\n<br /><strong><em>Mengapa ini penting:</em></strong> Transparansi tentang lokasi pemrosesan data.</p>\n<p>Saat ini, karena kami menggunakan <strong>Umami cloud</strong>, data analytics mungkin diproses di server yang berlokasi di luar Indonesia. Namun, data yang dikirim bersifat anonim dan agregat, bukan data pribadi yang dapat diidentifikasi.</p>\n<p><strong>Setelah kami beralih ke self-hosted:</strong></p>\n<ul>\n<li>Semua data akan diproses di server kami sendiri</li>\n<li>Tidak ada transfer data ke pihak ketiga atau negara lain</li>\n</ul>\n<p>Kami berkomitmen untuk mematuhi standar perlindungan data internasional seperti GDPR dan CCPA, meskipun situs ini berbasis di Indonesia.</p>\n<h2 id=\"9-berapa-lama-kami-menyimpan-data\">9. Berapa Lama Kami Menyimpan Data</h2>\n<p><strong><em>Singkatnya:</em></strong> <em>Data analytics disimpan selamanya untuk analisis historis, cookies sampai Anda hapus.</em>\n<br /><strong><em>Mengapa ini penting:</em></strong> Transparansi tentang retensi data.</p>\n<h3 id=\"data-analytics\">Data Analytics</h3>\n<p>Data analytics yang dikumpulkan oleh Umami disimpan <strong>tanpa batas waktu</strong> untuk keperluan:</p>\n<ul>\n<li>Analisis tren jangka panjang</li>\n<li>Memahami pertumbuhan situs</li>\n<li>Identifikasi konten yang paling bermanfaat</li>\n</ul>\n<p>Karena data bersifat agregat dan anonim (tidak dapat diidentifikasi kembali ke individu tertentu), penyimpanan jangka panjang tidak menimbulkan risiko privasi.</p>\n<h3 id=\"cookies\">Cookies</h3>\n<p>Cookies <code>ambience</code> dan <code>lang</code> disimpan di browser Anda sampai:</p>\n<ul>\n<li>Anda menghapusnya secara manual</li>\n<li>Anda membersihkan data browser</li>\n<li>Cookies mencapai masa expired (default: 1 tahun)</li>\n</ul>\n<h2 id=\"10-keamanan-data\">10. Keamanan Data</h2>\n<p><strong><em>Singkatnya:</em></strong> <em>Kami menggunakan HTTPS dan praktik keamanan standar industri.</em>\n<br /><strong><em>Mengapa ini penting:</em></strong> Melindungi data yang dikumpulkan dari akses tidak sah.</p>\n<p>Meskipun kami mengumpulkan data minimal, kami tetap menerapkan langkah keamanan:</p>\n<ul>\n<li><strong>HTTPS/TLS</strong> — Semua koneksi ke KazViz.com dienkripsi</li>\n<li><strong>Secure Cookies</strong> — Cookies menggunakan flag <code>Secure</code> dan <code>HttpOnly</code></li>\n<li><strong>No SQL Injection</strong> — Tidak ada database untuk dieksploitasi</li>\n<li><strong>No XSS</strong> — Situs statis tanpa user input</li>\n<li><strong>Regular Updates</strong> — Dependency dan library selalu diperbarui</li>\n</ul>\n<p>Karena tidak ada data pribadi yang disimpan, risiko kebocoran data sangat minimal.</p>\n<h2 id=\"11-perubahan-kebijakan\">11. Perubahan Kebijakan</h2>\n<p><strong><em>Singkatnya:</em></strong> <em>Kami akan memperbarui kebijakan ini jika ada perubahan material.</em>\n<br /><strong><em>Mengapa ini penting:</em></strong> Menjaga transparansi berkelanjutan.</p>\n<p>Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan ditandai dengan memperbarui tanggal &quot;Terakhir diperbarui&quot; di bagian atas dokumen.</p>\n<p>Jika ada perubahan <strong>material</strong> (seperti menambahkan layanan pihak ketiga baru atau mengubah cara pengumpulan data), kami akan:</p>\n<ul>\n<li>Memperbarui tanggal di dokumen ini</li>\n<li>Menampilkan pemberitahuan di situs (jika perubahan signifikan)</li>\n</ul>\n<p>Kami mendorong Anda untuk meninjau kebijakan ini secara berkala.</p>\n<h2 id=\"12-kepatuhan-hukum\">12. Kepatuhan Hukum</h2>\n<p><strong><em>Singkatnya:</em></strong> <em>Kami berkomitmen mematuhi hukum perlindungan data yang berlaku.</em>\n<br /><strong><em>Mengapa ini penting:</em></strong> Menjamin praktik yang sesuai dengan regulasi.</p>\n<p>Meskipun KazViz.com adalah situs personal yang sangat minimal dalam pengumpulan data, kami tetap berkomitmen untuk mematuhi:</p>\n<ul>\n<li><strong>UU Perlindungan Data Pribadi Indonesia (UU PDP No. 27/2022)</strong></li>\n<li><strong>General Data Protection Regulation (GDPR)</strong> — Uni Eropa</li>\n<li><strong>California Consumer Privacy Act (CCPA)</strong> — Amerika Serikat</li>\n</ul>\n<p>Prinsip yang kami terapkan:</p>\n<ul>\n<li><strong>Minimisasi data</strong> — Hanya kumpulkan yang benar-benar diperlukan</li>\n<li><strong>Transparansi</strong> — Jelaskan dengan jelas apa yang dikumpulkan</li>\n<li><strong>Kontrol pengguna</strong> — Berikan opsi untuk opt-out</li>\n<li><strong>Keamanan</strong> — Lindungi data yang dikumpulkan</li>\n</ul>\n<blockquote>\n<p>Kami tidak hanya menjaga privasi karena diwajibkan hukum,<br>tapi karena itu prinsip kami.</p>\n</blockquote>\n<h2 id=\"13-kontak\">13. Kontak</h2>\n<p>Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami:</p>\n<p><strong>Email:</strong> <a href=\"mailto:support@kazviz.com\">support@kazviz.com</a></p>\n<p>Kami akan merespons pertanyaan Anda sesegera mungkin.</p>\n<blockquote>\n<p><em>&quot;Privasi adalah hak fundamental. Di KazViz.com, kami menghormati hak itu dengan tidak mengumpulkan lebih dari yang benar-benar kami butuhkan — yang hampir tidak ada sama sekali.&quot;</em></p>\n</blockquote>\n",
  "tocInjected": true
}

export default function LegalPage() {
  const title = () => legalData.title || legalData.h1 || "Legal"
  const description = () => legalData.description || ""
  return (
    <LegalLayout h1={legalData.h1 || legalData.title} subtitle={legalData.subtitle}>
      <div class="legal-content">
        <MetaProvider>
          <Title>{title()}</Title>
          <Meta name="description" content={description()} />
        </MetaProvider>
        <article innerHTML={legalData.content}></article>
      </div>
    </LegalLayout>
  )
}
