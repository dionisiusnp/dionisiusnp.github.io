# Bab 11 — Website & eCommerce

[← Proyek](10-proyek.md) | [Berikutnya: POS →](12-pos.md)

---

## 11.1 Gambaran Umum Website & eCommerce Odoo 19

Odoo 19 membawa pembaruan besar pada **Website Builder** dan **eCommerce** — tampilan toko yang sepenuhnya baru, halaman produk yang diperbarui, checkout mobile yang dioptimalkan, integrasi Google Merchant Center, dan blok konten yang lebih kaya.

---

## 11.2 Website Builder

### 11.2.1 Akses Website Builder

1. Masuk ke **Website** dari menu aplikasi
2. Klik **Edit** untuk masuk mode desain
3. Atau kunjungi website → Klik **Edit** di bar atas

### 11.2.2 Fitur Drag & Drop

Seret blok dari panel kiri ke halaman:

**Kategori Blok**:
```
STRUKTUR
  - 1/2/3/4 Kolom
  - Hero Banner
  - Masonry Grid

KONTEN
  - Teks & Gambar
  - Kartu Info
  - Timeline
  - Accordion/FAQ
  - Quote/Testimonial

FITUR
  - CTA (Call to Action)
  - Pricing Table
  - Team Members
  - Counter/Stats
  - Peta Lokasi

eCOMMERCE
  - Produk Unggulan
  - Kategori Produk
  - Produk Terkait (Baru Odoo 19)

MEDIA
  - Gallery
  - Video
  - Slideshow
```

### 11.2.3 Pengaturan Halaman

- **SEO**: Title, meta description, URL slug
- **Visibilitas**: Publik / Login / Grup tertentu
- **Redirect**: 301/302 redirect
- **Header/Footer**: Template per halaman

---

## 11.3 eCommerce — Setup Toko Online

### 11.3.1 Konfigurasi Toko

**Website → Konfigurasi → eCommerce**

```
Toko Online:
  Nama Toko       : Toko Berkah Official Store
  URL Toko        : /shop

Produk:
  Tampilkan Stok  : ✓ (tampilkan qty tersedia)
  Produk Habis    : Sembunyikan / Tampilkan Non-Aktif
  Harga           : Tampilkan termasuk/tidak PPN
  Varian          : Satu Halaman / Halaman Terpisah

Checkout:
  Guest Checkout  : ✓ (tanpa daftar akun)
  Langkah Checkout: 1 Halaman / Multi-Step
  Tandatangani    : ✓ (auto-register akun)

Pengiriman:
  Metode          : [Pilih carrier yang aktif]
  Estimasi Ongkir : Tampilkan di keranjang
```

### 11.3.2 Produk di eCommerce

**Website → eCommerce → Produk**

```
Nama         : Laptop ASUS VivoBook 14
URL          : /shop/laptop-asus-vivobook-14
Harga        : Rp 8.500.000
Tag          : Laptop, ASUS, Student, Bisnis

Gambar:
  - Foto tampak depan (800×800px)
  - Foto tampak samping
  - Foto keyboard & layar detail
  - Foto warna: Silver, Gold, Hitam

Deskripsi Website:
  ASUS VivoBook 14 hadir dengan layar 14 inci FullHD
  IPS dengan teknologi Eye Care yang mengurangi cahaya biru.
  Cocok untuk profesional dan mahasiswa...

Kategori Website: Laptop > Student Laptop

Fitur Odoo 19 — Blok Produk Alternatif:
  Tampilkan: "Produk Serupa yang Mungkin Anda Suka"
  Isi dengan: Laptop ASUS lain, Laptop untuk mahasiswa
  Judul blok: "Rekomendasi Untuk Anda" [bisa dikustom]
```

---

## 11.4 Tampilan Toko Baru (Odoo 19)

### 11.4.1 Layout Halaman /shop

Odoo 19 memperkenalkan layout dan opsi baru untuk halaman toko:

**Layout Pilihan**:
```
1. Grid 3 Kolom (default) — tampilan kartu
2. Grid 4 Kolom — lebih padat
3. List View — detail lebih lengkap
4. Masonry — desain kreatif
```

**Opsi Filter Produk**:
```
Sidebar Filter:
  ✓ Kategori
  ✓ Rentang Harga (slider)
  ✓ Rating Produk
  ✓ Merek
  ✓ Atribut (Warna, Ukuran, RAM)

Sort By:
  - Terbaru
  - Harga: Rendah ke Tinggi
  - Harga: Tinggi ke Rendah
  - Terpopuler
  - Rating Tertinggi
```

### 11.4.2 Halaman Produk yang Diperbarui

**Fitur Halaman Produk Odoo 19**:
- Gambar produk besar dengan zoom hover
- Pilih varian (warna/RAM/ukuran) dengan preview gambar berubah
- Stok real-time: "Tersedia" / "Stok terbatas (5 tersisa)" / "Habis"
- Tombol Tambah ke Keranjang yang prominen
- Blok Produk Alternatif dengan judul yang dapat dikustomisasi
- Review pelanggan dengan rating bintang
- Tab: Deskripsi / Spesifikasi / Ulasan / Tanya Jawab

### 11.4.3 Keranjang Belanja Off-Canvas Mobile (Baru Odoo 19)

Di perangkat mobile:
- Klik ikon keranjang → Panel off-canvas muncul dari kanan
- Tidak perlu pindah halaman
- Review item, ubah qty, hapus langsung
- Tombol **Checkout** di bawah

---

## 11.5 Proses Checkout

### 11.5.1 Alur Checkout Standar

```
Keranjang → Detail Pengiriman → Metode Pembayaran → Konfirmasi → Done
```

**Step 1 — Detail Pengiriman**:
```
Nama         : Budi Santoso
Email        : budi@gmail.com
Telepon      : 0812-3456-7890
Alamat       : Jl. Mawar No. 12, Jakarta Selatan
Kode Pos     : 12840
Provinsi     : DKI Jakarta
```

**Step 2 — Metode Pengiriman**:
```
○ JNE Regular (3-5 hari) — Rp 15.000
● JNE YES (1-2 hari)     — Rp 25.000
○ Ambil di Toko           — Gratis
```

**Step 3 — Metode Pembayaran (Odoo 19)**:
Odoo 19 menampilkan daftar metode pembayaran yang didukung langsung di halaman checkout:
```
● Transfer Bank BCA     (Virtual Account)
○ Kartu Kredit/Debit    (Stripe)
○ GoPay / OVO / DANA   (Midtrans)
○ QRIS                  (Midtrans)
○ PayPal               (internasional)
○ Bayar di Tempat      (COD)
```

**Step 4 — Ringkasan & Konfirmasi**:
```
Laptop ASUS VivoBook 14  × 1  = Rp 8.500.000
Mouse Wireless           × 1  = Rp   350.000
Ongkir JNE YES                = Rp    25.000
PPN 11%                       = Rp   954.500
──────────────────────────────────────────────
TOTAL                         = Rp 9.829.500
```

---

## 11.6 Payment Gateway

### 11.6.1 Integrasi Payment Provider

**Website → Konfigurasi → Payment Providers**

**Provider yang Didukung Odoo 19**:
| Provider | Metode | Setup |
|---------|--------|-------|
| **Midtrans** | VA, QRIS, e-wallet | API Key dari Midtrans Dashboard |
| **Xendit** | VA, QRIS, kartu | API Key dari Xendit Dashboard |
| **Stripe** | Kartu kredit/debit | Stripe API Key |
| **PayPal** | PayPal Balance | Client ID & Secret |
| **Adyen** | Multi-metode | Merchant Account |

**Setup Midtrans** (Populer untuk Indonesia):
```
1. Daftar di midtrans.com → Dapatkan Server Key & Client Key
2. Odoo → Website → Konfigurasi → Payment Providers → Midtrans
3. Isi:
   Server Key    : [dari Midtrans Dashboard]
   Client Key    : [dari Midtrans Dashboard]
   Environment   : Sandbox (testing) / Production
4. Aktifkan
5. Test dengan kartu: 4811 1111 1111 1114
```

---

## 11.7 Pengiriman (Shipping)

### 11.7.1 Konfigurasi Carrier

**Inventaris → Konfigurasi → Metode Pengiriman**

```
Carrier: JNE
  Integrasi   : Easypost / API JNE
  Kode Area   : Jakarta, Surabaya, Bandung, dll.
  Metode      : JNE Regular, JNE YES, JNE OKE

Carrier: SiCepat
  Integrasi   : Easypost
  Metode      : REG, BEST, HALU

Carrier: Kurir Toko Sendiri
  Tipe        : Harga Tetap
  Biaya       : Rp 0 (gratis untuk area Jabodetabek)
  Batas Area  : Radius 20km dari gudang
```

### 11.7.2 Hitung Ongkir Real-Time

Saat checkout:
1. Pelanggan masukkan kode pos
2. Odoo query ke API carrier
3. Tampilkan pilihan layanan + harga aktual
4. Pelanggan pilih → harga ditambah ke total

---

## 11.8 Google Merchant Center `[Enterprise]`

### 11.8.1 Setup Integrasi

**Website → Konfigurasi → Google Merchant Center**

```
Google Merchant ID  : [dari Google Merchant Center]
Negara Target       : Indonesia
Bahasa              : Bahasa Indonesia
Mata Uang           : IDR

Sinkronisasi:
  ✓ Harga (update real-time)
  ✓ Stok (update real-time)
  ✓ Ketersediaan
  ✓ Gambar produk
  ✓ Deskripsi
```

### 11.8.2 Manfaat Integrasi

- Produk Odoo otomatis muncul di Google Shopping
- Ketika harga atau stok berubah di Odoo → Google otomatis diperbarui
- Jalankan Google Ads campaign langsung dari data produk
- Laporan performa Shopping di Odoo

---

## 11.9 SEO & Pemasaran Website

### 11.9.1 Optimasi SEO

**Setiap halaman di Website Builder**:
1. Klik tombol **SEO** di toolbar atas
2. Isi:
   ```
   Meta Title      : Laptop ASUS VivoBook 14 Harga Terbaik | Toko Berkah
   Meta Description: Beli Laptop ASUS VivoBook 14 harga terjangkau di Toko Berkah.
                     Garansi resmi. Pengiriman ke seluruh Indonesia.
   URL Slug        : /shop/laptop-asus-vivobook-14
   ```

### 11.9.2 Blog & Konten

**Website → Blog → Baru**

```
Judul    : 5 Tips Memilih Laptop untuk Kerja dari Rumah
Tanggal  : 22 April 2026
Tag      : Laptop, WFH, Tips, Produktivitas
Gambar   : [foto laptop di meja kerja]

Isi blog: [konten artikel SEO-friendly]
```

---

## 11.10 Live Chat

### 11.10.1 Setup Live Chat

1. Install modul **Live Chat**
2. **Live Chat → Konfigurasi → Saluran**
3. Tambahkan saluran:
   ```
   Nama       : Support Toko Berkah
   Operator   : Dewi, Budi (tim sales/support)
   Widget     : Tampilkan di semua halaman website
   Warna      : Biru (sesuai brand)
   ```

### 11.10.2 Fitur Live Chat Odoo 19

- **Transfer File**: Kirim gambar/dokumen dari chat ke tiket Helpdesk otomatis
- **Buat Tiket**: Dari percakapan chat → 1 klik buat tiket Helpdesk
- **Riwayat Chat**: Semua percakapan tersimpan di profil pelanggan
- **Undang Agen**: Eskalasi ke agen lain dalam percakapan yang sama
- **Bot Chat**: Chatbot untuk FAQ otomatis sebelum agen manual masuk

---

## 11.11 Simulasi Lengkap: Belanja Online di Toko Berkah

**Skenario**: Pelanggan baru membeli laptop via website.

### Pengalaman Pelanggan:

**Step 1 — Temukan Produk**
```
Buka: www.tokoberkah.co.id/shop
Filter: Kategori > Laptop
Sort: Harga Rendah ke Tinggi
Klik: Laptop ASUS VivoBook 14
```

**Step 2 — Halaman Produk**
```
Lihat foto × 4 sudut
Pilih varian: Warna = Silver, RAM = 16GB (+Rp 500.000)
Harga final: Rp 9.000.000

Baca ulasan: 4.8/5 dari 47 ulasan
"Laptop ringan, baterai tahan lama. Recommended!"

Klik: Tambah ke Keranjang
```

**Step 3 — Keranjang (Mobile Off-Canvas)**
```
[Panel muncul dari kanan]
Laptop ASUS VB14 × 1 = Rp 9.000.000
Kode Promo: LEBARAN2026 → -Rp 900.000
Total: Rp 8.100.000 (belum ongkir)

Klik: Checkout
```

**Step 4 — Checkout**
```
Alamat: Jl. Melati No. 5, Surabaya 60111
Pengiriman: JNE YES (1-2 hari) = Rp 35.000
Pembayaran: QRIS Midtrans

Total: Rp 8.135.000 + PPN = Rp 9.029.850
```

**Step 5 — Bayar**
```
Scan QR code Midtrans via GoPay
→ Notifikasi: "Pembayaran Berhasil"
→ Order Confirmation Email dikirim otomatis
→ SO dibuat di Odoo
→ Gudang: DO dibuat otomatis
→ Besoknya: Barang dikemas & dikirim JNE
→ Email tracking number dikirim ke pelanggan
```

---

[← Proyek](10-proyek.md) | [Berikutnya: POS →](12-pos.md)
