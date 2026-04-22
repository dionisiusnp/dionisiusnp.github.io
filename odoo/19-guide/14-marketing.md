# Bab 14 — Email Marketing & Otomatisasi Pemasaran

[← Helpdesk](13-helpdesk.md) | [Berikutnya: AI & Otomatisasi →](15-ai-otomatisasi.md)

---

## 14.1 Gambaran Umum Marketing Odoo 19

Odoo 19 menyediakan dua modul pemasaran utama:
- **Email Marketing**: Buat dan kirim kampanye email ke daftar kontak
- **Marketing Automation**: Buat workflow multi-langkah otomatis berbasis trigger dan kondisi

---

## 14.2 Email Marketing

### 14.2.1 Buat Kampanye Email

**Email Marketing → Baru**

```
Nama Kampanye  : Promo Lebaran 2026 — Flash Sale Laptop
Penerima       : Daftar Kontak: "Pelanggan Aktif 2025-2026"
Dari           : marketing@tokoberkah.co.id
Subjek         : 🎉 Flash Sale Lebaran! Diskon 15% Laptop Pilihan
Preview Text   : Hanya 3 hari! Jangan sampai kehabisan...
```

### 14.2.2 Desain Email dengan Builder

**Klik "Desain Email"** → Drag & drop builder:

```
[HEADER]
  Logo Toko Berkah | "Flash Sale Lebaran 2026"

[HERO BANNER]
  Gambar: Laptop dengan pita merah
  Teks besar: "DISKON 15%"
  Subtitle: "Untuk semua Laptop — 5-7 April 2026"

[TOMBOL CTA]
  [BELANJA SEKARANG] → link ke /shop

[PRODUK UNGGULAN]
  [Laptop ASUS] [Laptop Dell] [Laptop HP]
  Harga normal → Harga diskon (coret)

[FOOTER]
  Alamat perusahaan
  [Berhenti Berlangganan]
  [Lihat di Browser]
```

**Tips Desain**:
- Lebar email: 600px (standar)
- Alt text untuk semua gambar (aksesibilitas)
- Tombol CTA harus kontras dan jelas
- Mobile preview: cek tampilan di smartphone

### 14.2.3 Segmentasi Penerima

**Tipe Penerima**:

| Tipe | Keterangan | Contoh |
|------|-----------|--------|
| **Daftar Kontak** | Daftar statis | Pelanggan 2025, Import CSV |
| **Filter Dinamis** | Otomatis sesuai kondisi | Pelanggan yang beli laptop |
| **Kombinasi** | Filter + list | Pelanggan aktif + tidak beli 3 bulan |

**Buat Filter Dinamis**:
```
Kirim ke: Kontak yang memenuhi SEMUA kondisi:
  ✓ Tag mengandung: "Pelanggan"
  ✓ Belum beli sejak: 90 hari lalu
  ✓ Pernah beli kategori: Laptop
  ✓ Email tidak blacklist
  
Jumlah penerima yang cocok: 1,247 kontak
```

### 14.2.4 Uji Coba & Preview

Sebelum kirim ke semua:
1. Klik **Kirim Uji Coba** → Masukkan email internal
2. Review tampilan di berbagai email client
3. Cek link CTA berfungsi
4. Cek tombol unsubscribe berfungsi

### 14.2.5 Jadwalkan Pengiriman

```
Kirim Sekarang   : ○
Jadwalkan        : ● 5 April 2026, 08:00 WIB
```

> **Tips**: Waktu terbaik untuk email marketing Indonesia: Selasa-Kamis, 08:00-10:00 atau 13:00-15:00 WIB.

### 14.2.6 Laporan Kampanye

Setelah email dikirim:

```
Kampanye: Promo Lebaran 2026

PENGIRIMAN:
  Terkirim       : 1.247
  Gagal          : 12 (email bounced)
  Bersih         : 1.235

ENGAGEMENT:
  Dibuka         : 412 (33.4%) ← Rata2 industri: 20-25%
  Diklik         : 98 (7.9%)
  Unsubscribe    : 8 (0.6%)
  Spam Report    : 2 (0.2%)

KONVERSI:
  Kunjungi Website: 156 sesi
  Tambah Keranjang : 45
  Transaksi       : 18
  Revenue dari Email: Rp 145.000.000
```

---

## 14.3 Marketing Automation

### 14.3.1 Gambaran Umum

Marketing Automation memungkinkan Anda membuat **workflow multi-langkah** yang berjalan otomatis berdasarkan trigger dan kondisi tertentu.

### 14.3.2 Buat Campaign Automation

**Marketing Automation → Baru**

```
Nama       : Nurturing Lead Website
Target     : Lead (CRM)
Kondisi Filter:
  - Sumber lead = "Website"
  - Belum jadi pelanggan
  - Skor lead < 50
```

### 14.3.3 Membangun Workflow

**Klik "Tambah Aktivitas"**:

```
WORKFLOW: Lead Nurturing Website

[START: Lead baru dari website]
       │
       ↓
[1. Kirim Email: "Selamat Datang"]
   Template: Welcome Email
   Delay: 0 jam (langsung)
       │
       ↓ Tunggu 3 hari
[2. Cek Kondisi]
   IF: Email dibuka? 
   YES → [3a] 
   NO  → [3b]
       │           │
       ↓           ↓
[3a. Kirim Email Produk]  [3b. Kirim Email Lain]
   Template: Product Catalog  Template: "Kami Siap Membantu"
       │           │
       ↓           ↓
   Tunggu 5 hari  Tunggu 5 hari
       │           │
       ↓           ↓
[4. Cek Pembelian]
   IF: Sudah beli?
   YES → Keluar dari campaign
   NO  → [5. Kirim Penawaran Khusus]
```

### 14.3.4 Trigger Campaign

| Trigger | Keterangan |
|---------|-----------|
| **Record Dibuat** | Saat lead/kontak baru dibuat |
| **Record Diperbarui** | Saat field tertentu berubah |
| **Berbasis Waktu** | Setelah X hari dari tanggal tertentu |
| **Aktivitas Selesai** | Saat aktivitas CRM diselesaikan |
| **Email Dibuka** | Setelah penerima buka email sebelumnya |
| **Link Diklik** | Setelah klik link di email |

### 14.3.5 Jenis Aktivitas dalam Workflow

| Aktivitas | Keterangan |
|-----------|-----------|
| **Kirim Email** | Kirim email berdasarkan template |
| **Update Record** | Ubah field data (misal: skor lead +10) |
| **Buat Aktivitas** | Buat task/jadwal di CRM |
| **Tambah Tag** | Tambah tag ke kontak |
| **Hapus dari List** | Remove dari campaign saat ini |
| **Tambah ke List** | Masukkan ke campaign lain |

---

## 14.4 Manajemen Event

### 14.4.1 Buat Event

**Events → Baru**

```
Nama Event     : Webinar "Tips Memilih ERP untuk UKM"
Tanggal Mulai  : 15 Mei 2026, 14:00 WIB
Tanggal Selesai: 15 Mei 2026, 16:00 WIB
Lokasi         : Online (Zoom)
Organizer      : PT. Toko Berkah

Tiket:
  - Gratis: Rp 0 (maks 200 orang)
  - VIP (recording + konsultasi 30 min): Rp 250.000

Registrasi:
  Batas        : 200 peserta
  Penutupan    : 14 Mei 2026
  
Website Event:
  URL          : /event/webinar-erp-ukm
  Publiskan    : ✓
```

### 14.4.2 Email Otomatis Event (Odoo 19)

Odoo 19 menyediakan **3 template email default** per event:

**Email 1 — Konfirmasi Pendaftaran** (langsung setelah daftar):
```
Subject: ✅ Pendaftaran Dikonfirmasi — Webinar ERP untuk UKM

Halo {nama_peserta},

Pendaftaran Anda untuk webinar "Tips Memilih ERP untuk UKM" 
telah dikonfirmasi!

📅 Tanggal : 15 Mei 2026
⏰ Waktu   : 14:00-16:00 WIB
💻 Platform: Zoom

Link Zoom akan dikirimkan 1 jam sebelum acara.

Tambahkan ke kalender: [Google] [Outlook] [iCal]
```

**Email 2 — Pengingat (7 hari sebelum)**:
```
Subject: ⏰ 1 Minggu Lagi! Webinar ERP untuk UKM

Jangan lupa! Webinar kita 1 minggu lagi...
[detail acara]
```

**Email 3 — Pengingat (1 hari sebelum)**:
```
Subject: 🔔 Besok! Link Zoom untuk Webinar ERP

Besok adalah hari webinar kita!
Link Zoom: [link]
Bergabunglah 5 menit lebih awal...
```

**Kustomisasi Pengingat**:
- Ubah timing: 7 hari, 1 hari, 1 jam
- Tambah reminder tambahan
- Buat template email kustom

---

## 14.5 SMS Marketing

### 14.5.1 Kirim SMS Campaign

**SMS Marketing → Baru**

```
Nama        : Pengingat Jatuh Tempo
Penerima    : Pelanggan dengan Faktur Jatuh Tempo
Isi SMS     :
  "Halo {nama}, faktur #{no_faktur} senilai {total} 
   jatuh tempo {tanggal}. Info: 021-1234567"

Batas: 160 karakter
Jadwal: Hari ini 09:00 WIB
```

> **Biaya SMS**: Odoo menggunakan IAP (In-App Purchase) credit untuk SMS. Beli credit di odoo.com.

---

## 14.6 Survei (Surveys)

### 14.6.1 Buat Survei

**Survei → Baru**

```
Judul   : Survei Kepuasan Pelanggan 2026 Q1
Mode    : Web Link
Notif   : Email pemberitahuan setelah submit
Skor    : Aktifkan scoring

Pertanyaan:
  Q1: Seberapa puas Anda dengan layanan kami?
      ○ Sangat Puas  ○ Puas  ○ Netral  ○ Tidak Puas

  Q2: Apakah Anda merekomendasikan kami? (NPS: 0-10)
      [Slider 0-10]

  Q3: Apa yang bisa kami tingkatkan?
      [Teks panjang bebas]
```

### 14.6.2 Distribusi Survei

- **Via Email**: Kirim link ke daftar kontak
- **Via Website**: Embed di halaman atau pop-up
- **Via QR Code**: Cetak di struk POS atau materi cetak
- **After Sales**: Otomatis kirim setelah SO/tiket selesai

---

## 14.7 Simulasi Lengkap: Kampanye Lebaran End-to-End

**Skenario**: PT. Toko Berkah menjalankan kampanye promosi Lebaran 2026.

### Timeline Kampanye

**T-30 hari (1 Maret 2026)**:
```
Persiapan:
- Siapkan daftar pelanggan aktif: 2.400 kontak
- Desain email template Lebaran
- Setup kode promo: LEBARAN2026 (diskon 10%, 5-10 April)
```

**T-7 hari (29 Maret 2026)**:
```
Email 1 — "Teaser":
  Subject: "Sesuatu yang istimewa menanti Anda 5 April..."
  Kirim ke: 2.400 kontak
  Open Rate: 28% = 672 orang membuka
```

**T-1 hari (4 April 2026)**:
```
Email 2 — "Grand Launch":
  Subject: "🎉 RESMI! Flash Sale Lebaran 10% OFF — Kode: LEBARAN2026"
  Kirim ke: 2.400 kontak
  Open Rate: 45% = 1.080 orang
  Click Rate: 22% = 528 orang ke website
```

**Hari H (5-10 April 2026)**:
```
Otomatisasi:
- Abandoned cart email (jika tambah keranjang tapi tidak checkout)
- Flash sale countdown banner di website
- SMS reminder di 8 April: "2 hari lagi! Promo berakhir 10 April"

Hasil:
  Website visitors dari campaign: 1.850
  Order dari kode LEBARAN2026: 234 order
  Revenue: Rp 1.250.000.000
```

**T+3 hari (13 April 2026)**:
```
Email Follow-up:
  Subject: "Terima kasih sudah berbelanja! Bagaimana pengalaman Anda?"
  Isi: Survei kepuasan + rekomendasi produk serupa
  
Hasil Survey:
  Responden : 145 dari 234 pembeli
  Rata-rata  : 4.6/5.0
  NPS Score  : 72 (sangat baik)
```

---

[← Helpdesk](13-helpdesk.md) | [Berikutnya: AI & Otomatisasi →](15-ai-otomatisasi.md)
