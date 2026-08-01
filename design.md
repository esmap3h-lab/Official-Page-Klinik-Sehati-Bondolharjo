# Design Document — Klinik Sehati Unit Bondolharjo

**Nama Proyek:** Dashboard Layanan Pendampingan Produk Halal  
**Pembuat:** Siti Maesaroh — 2503002531  
**Tahun:** 2026  

---

## 1. Struktur Halaman

```
┌─────────────────────────────────────────────────────┐
│  HEADER (purple)                                    │
│  [Logo ESMA]  [Greeting Typewriter]  [Waktu] [🌙]  │
├─────────────────────────────────────────────────────┤
│ [☰]  SIDEBAR (fixed, kiri, z-index 1050)            │
│      └─ Tab: ⏱ Timer | 📝 To-Do | 🔗 Links         │
├─────────────────────────────────────────────────────┤
│  SECTION: LANDING PAGE (background Islami)          │
│  Judul | Deskripsi | 2 Link | Logo Halal            │
├─────────────────────────────────────────────────────┤
│  SECTION: HERO (gradient hijau-putih-ungu)          │
│  Judul | Subtitle | Form NIK | Hasil | Sponsor      │
├─────────────────────────────────────────────────────┤
│  [Layanan Pengaduan + WA Button] (fixed, kanan)     │
│  [Efek Salju Canvas] (fixed overlay, pointer-none)  │
└─────────────────────────────────────────────────────┘
```

---

## 2. Palet Warna

| Elemen | Warna |
|--------|-------|
| Header background | `purple` |
| Teks greeting | `#f1f3f5d8` (putih transparan) |
| Judul landing | `rgb(3, 65, 26)` (hijau tua) |
| Deskripsi landing | `darkgreen` |
| Hero gradient | `green → white → purple` |
| Hero title | `purple` |
| Hero subtitle | `green` |
| Tombol cek status | `purple` |
| Tombol lihat dokumen | `green` |
| Tombol download | `purple` |
| WhatsApp / label | `#25D366` (hijau WA) |
| Sidebar background | `rgba(20, 10, 40, 0.97)` (ungu gelap) |
| Pomodoro display | `#ffdf80` (kuning) |
| Quick links text | `#80cfff` (biru muda) |

---

## 3. Tipografi

| Elemen | Font | Ukuran |
|--------|------|--------|
| Semua heading (h1, h2) | Times New Roman, serif | 36pt |
| Greeting typewriter | Times New Roman, serif | 40px |
| Judul landing (.judul) | Times New Roman, serif | 50px |
| Deskripsi landing | Times New Roman, serif | 30px |
| Link pendaftaran | - | 24px |
| Teks hasil cek NIK | Times New Roman, serif | 26pt |
| Tombol lihat dokumen | - | 12pt |
| Label layanan pengaduan | Times New Roman, serif | 20pt |
| Pomodoro display | monospace | 52px |
| Sidebar konten | - | 12–13px |
| Datetime display | Times New Roman, serif | 13px |

---

## 4. Komponen Detail

### 4.1 Header
- Background: `purple`, tinggi `2cm`
- Flex layout: logo + greeting + datetime + dark mode toggle
- Logo: `125x125px`, border hijau, `border-radius: 50%`, animasi `flipLogo` 4 detik
- Greeting: animasi typewriter 80ms/karakter, kursor berkedip hijau
- Datetime: update setiap 1 detik, format: `Sapaan | Hari, Tanggal Bulan Tahun | HH:MM:SS`

### 4.2 Sidebar Mengambang
- Lebar: `300px`, tinggi penuh layar (`100vh`)
- Tombol toggle: `☰`, fixed di kiri tengah layar, background purple
- Slide-in dari kiri: `transform: translateX(-100%)` → `translateX(0)`
- Transisi: `0.35s ease`
- 3 tab: Timer, To-Do, Quick Links
- Tab aktif: background purple solid

### 4.3 Landing Page
- Background: `assets/background.png` (cover, center)
- Min-height: `100vh`
- Flex column, center semua konten
- Jarak judul ke deskripsi: `1cm` (margin-bottom pada .judul)
- Dua link pendaftaran dalam satu baris, gap `2cm`
- Logo Halal: max-width `400px`, animasi `bounceFlip` 6 detik

### 4.4 Hero Section
- Background: `linear-gradient(135deg, green, white, purple)`, animasi `gradientMove` 10 detik
- Min-height: `20cm`
- Form NIK: border ungu, box-shadow putih, tinggi `75px`
- Hasil NIK: kontainer putih semi-transparan, border ungu, `border-radius: 10px`
- Logo sponsor: flex row, tinggi seragam `80px`, gap `2cm`

### 4.5 Tombol WhatsApp
- `position: fixed`, `bottom: 80px`, `right: 30px`
- Label di atas ikon, keduanya dalam `.wa-wrapper`
- Animasi `waPulse`: scale `1 → 1.12 → 1`, durasi `4 detik` infinite

### 4.6 Efek Salju
- Canvas fullscreen `position: fixed`, `z-index: 9999`
- `pointer-events: none` — tidak mengganggu interaksi
- 120 partikel, radius `2–5px`, opacity `0.5–1`, kecepatan `1–3px/frame`
- Reset otomatis ke atas saat keluar bawah layar

---

## 5. Animasi Summary

| Animasi | Elemen | Durasi | Tipe |
|---------|--------|--------|------|
| `flipLogo` | Logo header | 4s | rotateY infinite |
| `blinkCursor` | Kursor greeting | 0.7s | border-color infinite |
| `bounceFlip` | Logo Halal | 6s | translateY + rotateY infinite |
| `gradientMove` | Hero background | 10s | background-position infinite |
| `waPulse` | Wrapper WA | 4s | scale infinite |
| Efek Salju | Canvas overlay | — | requestAnimationFrame |

---

## 6. LocalStorage Keys

| Key | Isi | Digunakan oleh |
|-----|-----|----------------|
| `darkMode` | `"true"` / `"false"` | Toggle Light/Dark mode |
| `todos` | JSON array of `{id, text, done}` | To-Do List |
| `quickLinks` | JSON array of `{name, url}` | Quick Links |
| `customName` | String nama pengguna | Greeting (opsional) |

---

## 7. Struktur File

```
project/
├── index.html       # Struktur halaman utama
├── style.css        # Semua styling
├── script.js        # Semua logika JavaScript
├── assets/
│   ├── logo-esma.png      # Logo header (foto)
│   ├── logo-halal.png     # Logo Halal Indonesia
│   ├── ewi.png            # Logo sponsor EWI
│   ├── kemenpar.png       # Logo sponsor Kemenpar
│   ├── sihati.png         # Logo sponsor Sihati
│   └── background.png     # Background landing page
└── documents/
    ├── nib.pdf            # Dokumen NIB
    ├── sertifikat.pdf     # Sertifikat Halal
    └── logo-halal.png     # Logo Halal untuk download
```
