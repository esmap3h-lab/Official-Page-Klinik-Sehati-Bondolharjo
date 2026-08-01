# Requirement — Website Klinik Sehati Unit Bondolharjo

**Nama Proyek:** Klinik Sehati Unit Bondolharjo — Dashboard Layanan Pendampingan Produk Halal  
**Pembuat:** Siti Maesaroh — 2503002531  
**Tahun:** 2026  

---

## 1. Deskripsi Proyek

Website ini merupakan dashboard layanan pendampingan produk halal untuk UMKM di area Jawa Tengah, dikelola oleh Klinik Sehati Unit Bondolharjo. Website menyediakan informasi layanan, cek status pengajuan sertifikat halal, serta fitur produktivitas bagi pendamping halal.

---

## 2. Fitur Utama (MVP)

### 2.1 Header
- Logo lembaga (ESMA) dengan animasi flip berputar
- Teks greeting animasi mesin ketik: *"Layanan Pendampingan Produk Halal area Jawa Tengah"*
- Tampilan waktu dan tanggal real-time (update setiap detik)
- Sapaan berdasarkan waktu: Selamat Pagi / Siang / Sore / Malam
- Tombol toggle Light/Dark Mode (🌙 / ☀️), preferensi tersimpan di LocalStorage

### 2.2 Landing Page (Section Utama)
- Judul: **Klinik Sehati Unit Bondolharjo**
- Deskripsi: *Sahabat Halal bagi UMKM dan Halal Advisor area Jawa Tengah*
- Dua tautan pendaftaran dalam satu baris (gap 2cm):
  - Pendaftaran Sertifikat Halal Gratis → [bit.ly/SEHATI-Jateng](https://bit.ly/SEHATI-Jateng)
  - Pendaftaran Pendamping Halal → [bit.ly/Esma-P3h](https://bit.ly/Esma-P3h)
- Logo Halal Indonesia dengan animasi bouncing + flip
- Background gambar bertema Islami

### 2.3 Section Cek Status Sertifikat Halal
- Judul: *Cek Status Pengajuan Sertifikat Halal*
- Form input NIK (16 digit angka), validasi format
- Hasil cek ditampilkan dalam satu kontainer, berisi:
  - NIB: Sudah Terbit ✅ → tombol Lihat Dokumen (PDF)
  - Sertifikat Halal: Sudah Jadi ✅ → tombol Lihat Dokumen (PDF)
  - Logo Halal: Sudah Tersedia ✅ → tombol Lihat Dokumen (PNG) + tombol Download Logo (muncul setelah diklik)
- Ukuran teks keterangan: 26pt; teks tombol: 12pt

### 2.4 Sidebar Mengambang (Dashboard Tools)
Sidebar dapat dibuka/tutup via tombol ☰ di sisi kiri layar. Berisi 3 panel:

#### ⏱ Panel Focus Timer (Pomodoro)
- Countdown timer default 25 menit
- Tombol: Start, Stop, Reset
- Input ubah durasi timer (1–120 menit) — Challenge: *Change Pomodoro time*
- Tampilan waktu format MM:SS berwarna kuning

#### 📝 Panel To-Do List
- Tambah tugas baru (Enter atau klik "+")
- Edit tugas (via prompt)
- Tandai selesai / belum (toggle ✅ / ⬜)
- Hapus tugas
- Cegah duplikasi: alert jika tugas sama sudah ada — Challenge: *Prevent duplicate tasks*
- Urutkan: Default / A→Z / Selesai dulu — Challenge: *Sort tasks*
- Data tersimpan di LocalStorage (tetap ada setelah refresh)

#### 🔗 Panel Quick Links
- Tambah link favorit (nama + URL)
- Buka link di tab baru
- Hapus link
- Data tersimpan di LocalStorage

### 2.5 Tombol Layanan Pengaduan (WhatsApp)
- Floating button pojok kanan bawah, `position: fixed`
- Label "Layanan Pengaduan" (background putih, teks hijau #25D366, 20pt)
- Ikon WhatsApp SVG inline (warna #25D366)
- Animasi pulse membesar 4 detik kontinyu
- Tautan ke WhatsApp: https://bit.ly/wa.me/628989096818
- Efek hover: ikon membesar scale(1.15)

### 2.6 Logo Sponsor
- Ditampilkan dalam satu baris horizontal (flex, gap 2cm)
- Tinggi seragam 80px, lebar proporsional (width: auto)
- Logo: EWI (ewi.png), Kemenpar (kemenpar.png), Sihati (sihati.png)

### 2.7 Efek Visual
- Efek salju turun (canvas-based, 120 partikel, `z-index: 9999`, `pointer-events: none`)
- Animasi logo flip 4 detik
- Animasi bouncing logo Halal 6 detik
- Gradient animasi hero section (hijau → putih → ungu, 10 detik)
- Animasi kursor berkedip pada greeting

---

## 3. Fitur Tambahan (Challenges — 3 dipilih)

| Challenge | Implementasi |
|-----------|-------------|
| Light / Dark mode | Tombol toggle di header, `body.dark-mode`, tersimpan di LocalStorage |
| Change Pomodoro time | Input angka di panel Timer + tombol Set |
| Prevent duplicate tasks | Validasi sebelum tambah/edit, alert jika duplikat |
| Sort tasks | Dropdown: Default / A→Z / Selesai dulu |

---

## 4. Aturan Struktur File

| Aturan | Status |
|--------|--------|
| 1 file CSS | ✅ `style.css` |
| 1 file JavaScript | ✅ `script.js` |
| Kode bersih & terbaca | ✅ Komentar per section |

---

## 5. Teknologi

- HTML5, CSS3, Vanilla JavaScript
- LocalStorage untuk persistensi data
- SVG inline untuk ikon WhatsApp
- Canvas API untuk efek salju
- Tidak menggunakan library atau framework eksternal

---

## 6. Deployment

- Versi kontrol: GitHub Desktop
- Repository: GitHub
- Hosting: GitHub Pages
