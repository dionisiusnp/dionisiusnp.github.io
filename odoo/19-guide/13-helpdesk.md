# Bab 13 — Helpdesk & Layanan Pelanggan

[← POS](12-pos.md) | [Berikutnya: Marketing →](14-marketing.md)

---

## 13.1 Gambaran Umum Helpdesk Odoo 19

Modul **Helpdesk** di Odoo 19 mengelola tiket dukungan pelanggan dari berbagai saluran dalam satu dasbor terpadu. Odoo 19 meningkatkan fitur **penugasan cerdas** (tidak assign ke karyawan yang sedang cuti), **penggabungan tiket duplikat**, dan **AI smart email drafting** untuk respons yang lebih cepat.

---

## 13.2 Pengaturan Helpdesk

### 13.2.1 Buat Tim Helpdesk

**Helpdesk → Konfigurasi → Tim** → Klik **Baru**

```
Nama Tim          : Support Teknis
Visibilitas       : Pengguna Internal + Portal Pelanggan
Alias Email       : support@tokoberkah.co.id
Ikon              : 🔧

Saluran Dukungan:
  ✓ Email (alias: support@...)
  ✓ Portal Website (form di website)
  ✓ Live Chat
  ✓ API (integrasi aplikasi eksternal)

Anggota Tim:
  - Agus (Level 1 Support)
  - Rina (Level 2 Support)
  - Budi (Manajer/Eskalasi)

Penugasan Tiket:
  ○ Manual (assign oleh manajer)
  ● Otomatis (round-robin)
  ● Cek Cuti: ✓ (jangan assign ke yang cuti)
```

### 13.2.2 Konfigurasi Tahap Tiket

**Helpdesk → Konfigurasi → Tahap**

```
Tahap 1: Baru (0%)
  - Tiket baru masuk
  - Email konfirmasi penerimaan otomatis

Tahap 2: Dalam Investigasi (25%)
  - Agent sedang menganalisis masalah
  - Email ke pelanggan: "Kami sedang investigasi..."

Tahap 3: Menunggu Info Pelanggan (50%)
  - Butuh info tambahan dari pelanggan
  - Email otomatis: "Mohon berikan informasi berikut..."

Tahap 4: Solusi Dikirim (75%)
  - Solusi sudah diberikan
  - Timer SLA berhenti
  - Email: "Kami telah mengirimkan solusi..."

Tahap 5: Selesai (100%)
  - Pelanggan konfirmasi selesai
  - Survey kepuasan terkirim otomatis
```

### 13.2.3 Konfigurasi SLA (Service Level Agreement)

**Helpdesk → Konfigurasi → SLA**

```
SLA 1: Prioritas Rendah
  Kondisi    : Prioritas = Rendah
  Waktu Respons: 24 jam kerja
  Waktu Selesai: 5 hari kerja
  Target Tahap : Solusi Dikirim

SLA 2: Prioritas Tinggi
  Kondisi    : Prioritas = Tinggi atau Tag = VIP
  Waktu Respons: 2 jam kerja
  Waktu Selesai: 8 jam kerja
  Target Tahap : Solusi Dikirim

SLA 3: Pelanggan Enterprise
  Kondisi    : Tag Pelanggan = Enterprise
  Waktu Respons: 1 jam
  Waktu Selesai: 4 jam kerja
```

---

## 13.3 Manajemen Tiket

### 13.3.1 Membuat Tiket Manual

**Helpdesk → Baru**

```
Judul         : Laptop tidak menyala setelah update Windows
Pelanggan     : PT. Mandiri Jaya
Kontak        : Budi Santoso (budi@mandiri.co.id)
Tim           : Support Teknis
Tipe          : Teknis
Prioritas     : ★★★ Tinggi
SLA           : SLA Prioritas Tinggi (otomatis)

Deskripsi:
  Setelah melakukan Windows Update pada tanggal 20 April,
  laptop tidak bisa menyala. Layar tetap hitam.
  Unit: Laptop Dell E5540, SN: DL2024-001
  
Tag           : Hardware, Laptop, Windows
```

### 13.3.2 Tiket Masuk via Email

Email ke `support@tokoberkah.co.id` → Odoo otomatis:
1. Buat tiket baru
2. Isi nama & email dari header email
3. Isi judul dari subject email
4. Isi deskripsi dari body email
5. Assign ke tim "Support Teknis" (berdasarkan alias)
6. Kirim konfirmasi ke pelanggan

**Email Pelanggan Mendapat**:
```
Subject: Re: [Tiket #HD-2026-0145] Laptop tidak menyala

Halo Budi Santoso,

Kami telah menerima laporan Anda dengan nomor tiket #HD-2026-0145.
Tim kami akan menindaklanjuti dalam waktu 2 jam kerja.

Untuk melacak status tiket, kunjungi:
https://portal.tokoberkah.co.id/helpdesk/ticket/HD-2026-0145

Salam,
Support Teknis PT. Toko Berkah
```

---

## 13.4 Fitur Baru Odoo 19

### 13.4.1 Penugasan Cerdas (Smart Assignment)

Saat Odoo otomatis assign tiket:
1. Cek availability semua anggota tim
2. **Integrasi dengan Cuti**: Jika Agus sedang cuti → skip, assign ke Rina
3. **Lookahead Kalender**: Jika Rina cuti besok & tiket butuh 2 hari → assign ke Budi
4. Distribusi merata (yang paling sedikit tiket terbuka mendapat tiket baru)

### 13.4.2 Penggabungan Tiket Duplikat

Fitur ini membutuhkan modul **Data Cleaning**:

1. Odoo deteksi: 2 tiket dari pelanggan sama, subjek mirip, dalam 24 jam
2. Notifikasi muncul: "Tiket #145 mungkin duplikat dari #143"
3. Klik **Merge** → Pilih tiket mana yang jadi induk
4. Histori keduanya digabung → 1 tiket tekonsolidasi

### 13.4.3 AI Smart Email Response `[Enterprise]`

Ketika agent akan balas tiket:
1. Klik **Balas**
2. Klik ✨ **AI Suggest Response**
3. AI menganalisis:
   - Deskripsi masalah
   - Tiket serupa yang sudah diselesaikan sebelumnya
   - Knowledge Base artikel
4. AI draftkan respons teknis yang relevan
5. Agent review & edit → Kirim

**Contoh AI Response**:
```
Problem: Laptop tidak menyala setelah Windows Update

AI Draft:
"Selamat siang Budi,

Terima kasih telah menghubungi kami. Untuk masalah laptop tidak 
menyala setelah Windows Update, berikut langkah-langkah yang dapat 
dicoba:

1. Hard Reset: Tekan tombol power selama 15 detik
2. Lepas adaptor & baterai (jika bisa dilepas), tunggu 30 detik
3. Hubungkan kembali adaptor, coba nyalakan
4. Jika masih tidak bisa, coba boot ke Safe Mode:
   - Tekan F8 saat startup
   - Pilih Safe Mode
   
Jika masih belum berhasil, kemungkinan update menyebabkan driver 
bermasalah. Kami sarankan untuk bring-in unit untuk penanganan lebih 
lanjut.

Mohon informasikan hasilnya. Terima kasih."
```

### 13.4.4 Eskalasi & Kolaborasi

**Eskalasi ke Manajer**:
1. Di tiket → Klik **Eskalasi**
2. Pilih: Eskalasi ke Tim Lain / Manajer
3. Notifikasi terkirim ke manajer
4. Manajer masuk ke diskusi tiket

**Undang Expert**:
1. Di chatter tiket → @mention: `@teknis-senior`
2. Teknis Senior Budi mendapat notifikasi
3. Budi bisa diskusi dalam thread yang sama

---

## 13.5 Pelaporan Helpdesk

### 13.5.1 Laporan Tiket

**Helpdesk → Pelaporan → Analisis Tiket**

```
Bulan April 2026 — Tim Support Teknis

Total Tiket Masuk   : 128
Tiket Selesai       : 112 (87.5%)
Tiket Masih Terbuka :  16

Rata-rata Waktu Resolusi: 6.5 jam
Target SLA              : 8 jam
Status SLA              : ✓ Di Bawah Target

Kepuasan Pelanggan (CSAT): 4.3/5.0

Tiket per Saluran:
  Email   : 65 (51%)
  Live Chat: 35 (27%)
  Website  : 20 (16%)
  POS      :  8  (6%)
```

### 13.5.2 Laporan SLA

```
SLA Compliance Report — April 2026

SLA              | Target  | Aktual  | Compliance
─────────────────┼─────────┼─────────┼────────────
Prioritas Rendah │ 24j     │ 18.5j   │    100% ✓
Prioritas Tinggi │  2j     │  1.8j   │     96% ✓
Enterprise SLA   │  1j     │  1.2j   │     85% ✗

Action: Review kapasitas tim untuk pelanggan Enterprise
```

---

## 13.6 Simulasi Lengkap: Siklus Tiket Helpdesk

**Skenario**: Pelanggan PT. Mandiri Jaya melaporkan laptop tidak bisa menyala.

### Step 1: Tiket Masuk (Email)
```
09:15 WIB — Email masuk ke support@tokoberkah.co.id
Dari    : budi@mandiri.co.id
Subject : Laptop Dell tidak menyala - URGENT

Odoo buat tiket: #HD-2026-0145
Assign ke: Agus (sesuai round-robin)
Notifikasi ke Agus: ✓
Email konfirmasi ke Budi: ✓
```

### Step 2: Agus Investigasi (09:30 WIB)
```
Agus buka tiket → Review masalah
Pindah ke tahap: Dalam Investigasi

Agus balas (AI draft + edit):
"Selamat pagi Budi, coba langkah-langkah berikut: [langkah teknis]
Mohon dicoba dan informasikan hasilnya."

Email terkirim ke Budi → 09:32 WIB
```

### Step 3: Tunggu Respons Pelanggan
```
10:45 WIB — Budi balas:
"Sudah dicoba semua langkah, laptop tetap tidak menyala."

Tiket pindah: Menunggu Info Pelanggan → Dalam Investigasi
Agus: "Sepertinya perlu bring-in unit. 
       Apakah bisa antar ke kantor kami?"
```

### Step 4: Eskalasi ke Teknisi Senior
```
11:00 WIB — Agus eskalasi:
@mention ke Budi (Teknisi Senior)
"Budi, unit perlu dikerjakan langsung. Bisa handle?"
Budi masuk ke diskusi tiket
```

### Step 5: Solusi
```
13/05 — Unit di-bawa ke kantor
Teknisi Budi diagnosa: Motherboard terpengaruh update yang rusak
Perbaikan: Roll-back update + driver reinstall
Durasi perbaikan: 3 jam
```

### Step 6: Selesai & Survey
```
Status diubah ke: Selesai
Email survey kepuasan otomatis dikirim ke Budi Santoso
Rating: 5/5 ⭐⭐⭐⭐⭐
"Pelayanan cepat dan profesional, terima kasih!"
```

---

[← POS](12-pos.md) | [Berikutnya: Marketing →](14-marketing.md)
