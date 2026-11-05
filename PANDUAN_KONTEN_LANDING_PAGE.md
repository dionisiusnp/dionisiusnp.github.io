# Panduan Konten Landing Page — Aliria Tech Community

File ini memandu perubahan konten pada landing page statis (`index.html` dan `artikel/`).
Tidak perlu backend; cukup edit file, commit, push ke GitHub Pages.

## 1. File Utama
- `index.html` — struktur, style, script landing page.
- `artikel/data.js` — data artikel (array `ALIRIA_ARTICLES`).
- `artikel/artikel.html` — template halaman detail artikel.

## 2. Hero Banner (Carousel)
Lokasi: `index.html`, section `#carousel`.

- Gambar slide: ganti `src` pada 3 `.slide img`:
  - `banner_1.png`, `banner_2.jpg`, `banner_3.jpg`
- Judul: edit teks di `.carousel-overlay h1`.
- Subjudul: edit teks di `.carousel-overlay p`.
- Jumlah anggota: dibaca otomatis dari `localStorage` (`kelompoks` dengan `name === 'ANGGOTA'` dan `jumlah`). Jika tidak ada, default `267+`.
- Auto-slide: interval 4000ms di script carousel (ubah jika perlu).

## 3. Artikel / Blog
Data: `artikel/data.js`.

Skema satu artikel:
```js
{
  slug: "slug-unik",          // URL-friendly, tanpa spasi
  title: "Judul Artikel",
  tag: "Kolaborasi",           // label kecil
  date: "2026-09-24",          // YYYY-MM-DD
  excerpt: "Ringkasan singkat.",
  content: [
    "Paragraf 1...",
    "Paragraf 2..."
  ]
}
```

Cara tambah artikel:
1. Tambah objek baru ke array `ALIRIA_ARTICLES`.
2. Pastikan `slug` unik.
3. Tambah card di `index.html` section `#artikel` dengan link:
   `artikel/artikel.html?slug=slug-baru`
4. Thumbnail: ubah gradient inline (`style="background:linear-gradient(...)"`) dan emoji.

Format tanggal tampil: otomatis `24 Sep 2026` (id-ID).

## 4. Dokumentasi Kegiatan
Lokasi: `index.html`, section `#dokumentasi`, `.doc-grid`.

Setiap item:
```html
<div class="doc-item" data-img="Judul Foto">
  <div class="doc-placeholder"><span class="ico">📸</span>Dokumentasi Kegiatan</div>
  <div class="doc-caption">Caption singkat</div>
</div>
```

Ganti placeholder dengan foto:
```html
<div class="doc-item" data-img="Judul Foto">
  <img src="assets/dokumentasi/foto1.jpg" alt="Judul Foto" style="width:100%;height:100%;object-fit:cover"/>
  <div class="doc-caption">Caption singkat</div>
</div>
```
Simpan foto di folder `assets/dokumentasi/` (buat folder jika belum ada).

## 5. Bentuk Kemitraan (3 Card)
Lokasi: `index.html`, section `#kerjasama`, `.kerja-grid`.

Edit per card:
- `.kerja-ico` (emoji)
- `.kerja-title`
- `.kerja-desc`

Tanpa button di card; CTA ada di FAB WhatsApp.

## 6. Footer
Lokasi: `index.html`, `<footer class="footer">`.

- Brand & deskripsi: `.footer-brand`, `.footer-desc`.
- Navigasi: `.footer-col` (ubah href/teks).
- Kontak: email, Instagram, Discord.
- Copyright: `.footer-copy`.

## 7. Floating Button (FAB)
Lokasi: `index.html`, `.fab-group`.

Tombol:
1. WhatsApp grup: ubah `href` ke link grup yang benar.
2. Referensi Command: `proyekan/index.html`.
3. Manajemen Aliria: `todolist/index.html` (teks dinamis dari `orgName`).

Icon-only default, teks muncul saat hover (desktop). Mobile tetap icon-only.

## 8. Tema & Warna
Lokasi: `index.html`, blok `<style>`.

- Variabel warna: `:root` (dark) dan `[data-theme="light"]`.
- Ubah `--accent`, `--bg`, dll. untuk ganti palet.
- Font: Google Fonts Inter (ubah di `<link>` dan `--font`).

## 9. Deploy
```bash
git add index.html artikel/ PANDUAN_KONTEN_LANDING_PAGE.md
git commit -m "Update landing page content"
git push
```
GitHub Pages akan rebuild otomatis.

## 10. Checklist Sebelum Publish
- [ ] Semua link berfungsi (artikel, nav, FAB).
- [ ] Tidak ada horizontal scroll di mobile (≤375px).
- [ ] Theme toggle dark/light OK.
- [ ] Gambar placeholder diganti atau dibiarkan.
- [ ] Teks sudah dicek (humanis, tidak ada typo).