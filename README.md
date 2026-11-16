# Generator Simulasi Kasus Faraidh

> **Platform Game Asah Otak & Praktikum Waris Interaktif — Akademi Faraidh by Tim Syariah Waris Indonesia**

Aplikasi web modern berbasis React + Tailwind CSS untuk mentransformasikan latihan perhitungan waris manual (Fiqih Mawarith) menjadi game interaktif yang edukatif, memikat, dan aplikatif. Dirancang khusus untuk alumni dan peserta aktif Akademi Faraidh, sekaligus berfungsi sebagai *lead magnet* untuk menjaring calon peserta baru.

---

## ✨ Fitur Utama & Mekanik Gamifikasi

1. **Tingkat Kesulitan Terstruktur (Leveling System)**
   - **Level 1 (Dasar - Ashabul Furudh Inti):** Kasus sederhana melibatkan Suami/Istri, Ayah, Ibu, Anak Laki-laki & Perempuan. Melatih pemahaman 1/2, 1/4, 1/8, 2/3, 1/3, 1/6, dan Ashabah.
   - **Level 2 (Menengah - Kaidah Hijab & Mahjub):** Memunculkan Cucu (lk/pr), Kakek Shahih, Nenek Shahihah, Saudara (Kandung, Seayah, Seibu), dan Paman. Peserta dilatih mengidentifikasi hijab hirman dan nuqshan.
   - **Level 3 (Lanjutan - 'Aul, Radd & Kasus Khusus):** Menguji pemecahan kasus legendaris Faraidh:
     - **Gharawain (Umariyatayn):** Suami/Istri + Ibu + Ayah (Ibu mendapat *Tsulutsul Baqi* / 1/3 sisa).
     - **Al-Musyarrakah (Himyariyyah):** Suami + Ibu + 2+ Saudara Seibu + Saudara Laki-laki Kandung bersekutu dalam 1/3.
     - **Al-Akdariyah:** Suami + Ibu + Kakek + Saudari Kandung (Aul 6 ke 9 lalu Tashih ke 27).
     - **Kaidah 'Aul:** Saham melebihi asal masalah (6 -> 7..10, 12 -> 13..17, 24 -> 27 / Al-Mimbariyyah).
     - **Kaidah Radd:** Sisa dikembalikan kepada ashabul furudh nasabiyah.

2. **Input Jawaban Interaktif (Drag & Drop + Click-to-Assign + Quick Picker)**
   - Balok porsi: `1/2`, `1/4`, `1/8`, `2/3`, `1/3`, `1/6`, `1/3 Sisa`, `Ashabah`, `Mahjub`.
   - Mendukung drag & drop langsung ke kartu ahli waris.
   - Mendukung *click-to-assign* (klik balok porsi lalu klik kartu ahli waris).
   - Dilengkapi *dropdown* pilihan cepat di setiap kartu ahli waris untuk kemudahan di perangkat mobile.

3. **Perhitungan Asal Masalah (أصل المسألة) & Saham**
   - Menghitung KPK penyebut (2, 3, 4, 6, 8, 12, 24, atau angka 'Aul/Tashih).
   - Tombol cepat untuk angka asal masalah baku dan kasus khusus.
   - Tabel saham interaktif tiap ahli waris dengan deteksi otomatis keseimbangan, 'Aul, atau Radd.

4. **Feedback & Koreksi Instan dengan Dalil Syar'i**
   - Jika benar: Animasi semburan *confetti*, efek suara kemenangan, penambahan streak dan skor (+100 PTS).
   - Jika salah: Pengurangan nyawa (3 hearts), efek suara peringatan, dan pemaparan diagnostik mengapa porsi tersebut salah lengkap dengan rujukan Al-Qur'an (QS. An-Nisa: 11, 12, 176) & Hadits.

5. **Gamifikasi Skor, Streak & E-Sertifikat Digital (Lead Magnet)**
   - Peserta yang berhasil menyelesaikan **10 kasus beruntun tanpa salah** mendapatkan predikat *MUMTAZ* dan membuka E-Sertifikat resmi Akademi Faraidh.
   - E-Sertifikat digenerate otomatis menggunakan HTML5 Canvas beresolusi tinggi (1200x800) dengan ornamen geometris Islam emas & hijau.
   - Peserta dapat memasukkan nama lengkap, mengunduh file PNG, dan langsung membagikan pencapaian ke WhatsApp & media sosial.

6. **Kamus Kaidah & Tabel Furudh (Cheat Sheet)**
   - Rujukan cepat 6 Furudh Muqaddarah dan syarat-syaratnya.
   - Matriks Hijab Hirman (siapa yang menghalangi siapa).
   - 4 Kaidah Hisab Faraidh: Tamatsul, Tadakhul, Tawafuq, Tabayun.
   - Rangkuman Kasus Khusus Klasik.

7. **Sandbox & Generator Kasus Bebas**
   - Pengguna bebas memilih jenazah (pria/wanita) dan memilih kombinasi ahli waris apa pun.
   - Bisa langsung dihitung otomatis atau dijadikan soal latihan mandiri.

8. **Lead Magnet & Registrasi Akademi Faraidh**
   - Banner penawaran kelas bimbingan intensif Faraidh bersama Tim Syariah Waris Indonesia dengan integrasi formulir kontak langsung ke WhatsApp resmi (0896-6281-3637).

---

## 🛠️ Arsitektur Teknologi

- **Frontend:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 (Desain *Modern Islamic Geometric & Clean Papercraft*)
- **Icons:** Lucide React
- **Audio Synthesizer:** Web Audio API (100% offline, tanpa file mp3 eksternal)
- **Effects:** Canvas Confetti
- **Certificate Engine:** HTML5 Canvas Native High-DPI Renderer
- **Deployment Ready:** Murni Client-Side SPA, siap dideploy langsung ke **Vercel**, Netlify, atau GitHub Pages.

---

## 🚀 Menjalankan Secara Lokal

```bash
# 1. Masuk ke direktori proyek
cd "Generator Simulasi Kasus Faraidh"

# 2. Instal dependensi (jika belum)
npm install

# 3. Jalankan server pengembangan
npm run dev

# 4. Atau jalankan mode production preview
npm run build
npm run preview
```

---

## ☁️ Panduan Deploy ke Vercel

Aplikasi ini dapat langsung di-deploy ke Vercel dengan satu perintah CLI:

```bash
vercel
```

Atau hubungkan repositori Git ke dashboard [Vercel](https://vercel.com) dengan konfigurasi standar:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

---

*Dibuat dengan standar Fiqih Mawarith Ahlussunnah wal Jama'ah (Jumhur Ulama: Syafi'i, Hanbali, Maliki, Hanafi) untuk Akademi Faraidh by Tim Syariah Waris Indonesia.*
