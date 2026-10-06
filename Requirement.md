# Requirement — Website Klinik Sehati Unit Bondolharjo

- **Nama proyek:** Website Klinik Sehati Unit Bondolharjo
- **Pemilik/pengelola:** Klinik Sehati Unit Bondolharjo
- **Pengembang:** Siti Maesaroh — 2503002531
- **Tahun:** 2026

---

## 1. Tujuan dan Ruang Lingkup

Website ini menjadi halaman informasi dan layanan digital Klinik Sehati Unit Bondolharjo untuk mendukung UMKM dan pendamping halal di Jawa Tengah. Pengunjung dapat menemukan tautan pendaftaran, mengecek ketersediaan dokumen pengajuan menggunakan kode registrasi, melihat dokumentasi kegiatan dan infografis, serta menghubungi layanan Klinik melalui WhatsApp.

Website berupa situs statis sisi klien. Data pemetaan kode registrasi disimpan dalam berkas JSON di repository; website tidak menyediakan akun pengguna, dashboard internal, atau pengelolaan data melalui server.

## 2. Pengguna

- Pelaku UMKM yang mencari informasi dan layanan pendampingan usaha/produk halal.
- Pemohon yang ingin melihat dokumen berdasarkan kode registrasi.
- Pendamping dan masyarakat yang ingin melihat informasi kegiatan atau menghubungi Klinik.

## 3. Fitur dan Kebutuhan Fungsional

### 3.1 Header dan informasi waktu

- Menampilkan foto/logo ESMA dan teks pengenalan layanan dengan efek mesin ketik berulang.
- Menampilkan sapaan sesuai waktu setempat, tanggal berbahasa Indonesia, serta jam yang diperbarui setiap detik.
- Menyediakan tombol Light/Dark Mode. Pilihan mode disimpan pada `localStorage` dengan key `darkMode` dan diterapkan kembali saat halaman dibuka.

### 3.2 Informasi layanan dan pendaftaran

- Menampilkan identitas Klinik Sehati Unit Bondolharjo dan deskripsi layanan pendampingan halal.
- Menyediakan tautan pendaftaran:
  - Sertifikat halal gratis: <https://bit.ly/SEHATI-Jateng>
  - Pendamping halal: <https://bit.ly/Esma-P3h>
- Menampilkan logo halal dan gambar latar bertema produk halal.
- Menyediakan notifikasi petunjuk menuju bagian cek status. Notifikasi dapat diciutkan/diperluas dan disembunyikan setelah pengunjung menggulir halaman.

### 3.3 Kampanye

- Menampilkan banner Gerakan Wajib Halal Oktober 2026 di bagian cek status.
- Banner berisi teks kampanye berjalan dan ilustrasi/foto pendamping.

### 3.4 Cek status pengajuan dan akses dokumen

- Pengunjung memasukkan kode registrasi; kolom menerima 5–30 karakter yang terdiri dari huruf, angka, titik, garis bawah, atau tanda hubung.
- Pencarian kode tidak membedakan huruf besar dan kecil. Pemetaan dokumen utama dimuat dari `database/index.json`.
- Hasil menampilkan nomor registrasi dan daftar dokumen yang tersedia, antara lain NIB, Sertifikat Halal, dan Stiker Halal, sesuai data pemetaan.
- Setiap tautan dokumen meminta kode verifikasi. Kode verifikasi adalah empat karakter terakhir kode registrasi yang sedang dibuka.
- Maksimal dua percobaan verifikasi yang gagal diperbolehkan untuk setiap dokumen. Setelah batas tercapai, pengunjung menerima pemberitahuan timeout dan diarahkan kembali ke halaman utama.
- Dokumen yang lolos verifikasi dibuka dalam dialog pratinjau. PDF ditampilkan menggunakan `iframe`; gambar ditampilkan sebagai gambar.
- Dialog menyediakan tautan WhatsApp untuk meminta bantuan layanan cetak dokumen.
- Jika format kode registrasi tidak valid, halaman menampilkan pesan kesalahan.

### 3.5 Dokumentasi dan infografis

- Menyediakan bagian Dokumentasi Kegiatan dengan tiga tautan artikel.
- Menyediakan bagian Infografis dengan empat tautan artikel.
- Kartu media memiliki fokus keyboard dan efek hover. Konten kartu/artikel dikelola sebagai berkas HTML di bawah `documents/`.

### 3.6 Footer dan layanan WhatsApp

- Menampilkan logo EWI, Kemenpar, dan Sihati beserta keterangan dukungan dan atribusi proyek.
- Menyediakan tombol WhatsApp mengambang untuk layanan pengaduan, menggunakan ikon SVG dan tautan yang membuka tab baru.
- Ikon WhatsApp memiliki animasi pulse dan efek hover.

## 4. Kebutuhan Visual, Responsif, dan Aksesibilitas

- Gaya visual menggunakan identitas warna hijau, ungu, dan emas yang sesuai dengan tema layanan halal.
- Tata letak menyesuaikan layar desktop dan perangkat bergerak.
- Banner kampanye, notifikasi scroll, galeri media, dialog dokumen, dan kontrol halaman harus tetap dapat digunakan pada layar kecil.
- Lapisan dekoratif, termasuk animasi partikel, tidak boleh menghalangi klik atau interaksi pada konten.
- Elemen kontrol interaktif menyediakan label atau nama aksesibel. Preferensi `prefers-reduced-motion` menonaktifkan animasi banner kampanye dan petunjuk scroll.

## 5. Efek dan Perilaku Antarmuka

- Efek mesin ketik pada teks pengenalan di header dan kedipan kursor.
- Animasi gerak pada logo halal, banner kampanye, petunjuk scroll, serta tombol WhatsApp.
- Latar animasi partikel hijau-emas menggunakan Canvas API: 100 partikel bergerak perlahan dan berkelip.
- Animasi dekoratif memakai `pointer-events: none` bila berada di atas konten, agar tidak memblokir interaksi.
- Dark Mode mengubah tampilan halaman dan menyimpan preferensi secara lokal pada browser pengunjung.

## 6. Teknologi dan Data

- HTML5 untuk struktur halaman.
- CSS3 untuk tata letak, tema, responsivitas, dan animasi.
- JavaScript murni untuk interaksi halaman, pemuatan pemetaan dokumen, pratinjau, dan Canvas.
- `localStorage` digunakan untuk menyimpan preferensi Dark Mode.
- `database/index.json` berisi pemetaan kode registrasi ke nama dan label dokumen.
- Dokumen per registrasi disimpan di dalam direktori `database/`.
- Tidak diperlukan framework JavaScript untuk menjalankan halaman.

## 7. Struktur Berkas Utama

```text
project/
├── index.html
├── style.css
├── script.js
├── Requirement.md
├── design.md
├── README.md
├── assets/
│   ├── background.png
│   ├── ewi.png
│   ├── kemenpar.png
│   ├── logo-esma.png
│   ├── logo-halal.png
│   ├── sihati.png
│   └── siti.tellunjuk.png
├── database/
│   ├── index.json
│   └── <kode-registrasi>/
└── documents/
    ├── dokumentasi-kegiatan/
    └── infografis/
```

## 8. Batasan dan Operasional

- Berkas `database/index.json` dan berkas dokumen terkait harus tersedia serta memakai nama/path yang sesuai dengan pemetaan.
- Jika kode yang valid tidak memiliki entri di `database/index.json`, implementasi saat ini masih memakai daftar dokumen fallback; fallback tersebut dapat menampilkan tautan ke berkas yang tidak tersedia. Pencarian kode yang tidak terdaftar belum selalu berakhir dengan pesan “tidak ditemukan”.
- Verifikasi dokumen berbasis empat karakter terakhir kode registrasi, bukan autentikasi akun atau layanan verifikasi jarak jauh.
- Data preferensi Dark Mode tersimpan hanya di browser yang digunakan dan bukan disinkronkan antarperangkat.
- Website ditujukan untuk hosting statis; repository proyek dikelola dengan Git dan target publikasi adalah GitHub Pages.
