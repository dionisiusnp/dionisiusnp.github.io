# Bab 03 — CRM: Manajemen Hubungan Pelanggan

[← Instalasi](02-instalasi-setup.md) | [Berikutnya: Penjualan →](04-penjualan.md)

---

## 3.1 Gambaran Umum CRM Odoo 19

Modul **CRM** (Customer Relationship Management) di Odoo 19 membantu tim penjualan mengelola seluruh siklus hubungan pelanggan — dari prospek pertama hingga deal tertutup. Fitur AI baru membantu penilaian lead secara otomatis dan menyarankan tindakan terbaik berikutnya.

### Alur Kerja CRM
```
Lead Masuk → Kualifikasi → Peluang → Penawaran → Menang/Kalah
    ↑
  (dari email, website, telepon, media sosial, event)
```

---

## 3.2 Pengaturan CRM

### 3.2.1 Aktivasi Fitur

Masuk ke **CRM → Konfigurasi → Pengaturan**:

| Opsi | Keterangan |
|------|------------|
| **Pipeline** | Aktifkan manajemen pipeline penjualan |
| **Lead Mining** | Temukan lead dari database bisnis global |
| **Prediksi Penutupan** | AI memprediksi kemungkinan menang |
| **Skor Lead** | Penilaian otomatis berdasarkan data historis |
| **Kunjungi Penjual** | Lacak kunjungan fisik tim sales |
| **Integrasi VoIP** | Buat lead dari panggilan telepon |

### 3.2.2 Konfigurasi Tahap Pipeline

1. Masuk ke **CRM → Konfigurasi → Tahap**
2. Klik **Baru** untuk tambah tahap

**Contoh Tahap Pipeline**:

| Tahap | Probabilitas | Keterangan |
|-------|-------------|------------|
| Kualifikasi | 20% | Lead baru yang perlu divalidasi |
| Terkontak | 40% | Sudah ada komunikasi awal |
| Proposal Dikirim | 60% | Penawaran sudah dikirim |
| Negosiasi | 80% | Sedang dalam proses negosiasi |
| Menang | 100% | Deal berhasil ditutup |

### 3.2.3 Konfigurasi Aktivitas

Masuk ke **CRM → Konfigurasi → Tipe Aktivitas**:

```
Aktivitas: Panggilan Telepon
  - Ikon: 📞
  - Tenggat Default: 1 hari
  - Aktivitas Lanjutan Otomatis: Kirim Email

Aktivitas: Demo Produk
  - Ikon: 🖥️
  - Tenggat Default: 3 hari
  - Template Email Default: Template Demo
```

---

## 3.3 Manajemen Lead

### 3.3.1 Sumber Lead di Odoo 19

Lead dapat masuk dari berbagai sumber secara otomatis:

| Sumber | Cara Kerja |
|--------|-----------|
| **Email** | Email ke alias CRM → otomatis jadi lead |
| **Website Form** | Formulir kontak/demo → jadi lead |
| **VoIP** | Panggilan masuk → lead dibuat otomatis |
| **Live Chat** | Percakapan chat → konversi ke lead |
| **Tiket Helpdesk** | Pertanyaan support → peluang penjualan |
| **Event** | Peserta event → lead masuk CRM |
| **Reaksi Medsos** | Facebook/LinkedIn → lead terintegrasi |
| **Manual** | Input langsung oleh tim sales |

### 3.3.2 Membuat Lead Manual

1. Masuk ke **CRM → Pipeline**
2. Klik **Baru** (atau tombol + di kolom pipeline)
3. Isi formulir:

```
Nama Peluang   : Proyek ERP PT. Sukses Makmur
Perusahaan     : PT. Sukses Makmur
Kontak         : Bpk. Andi Wijaya
Telepon        : 0812-3456-7890
Email          : andi@suksesmakmur.co.id
Sumber         : Referensi
Kampanye       : -
Pendapatan Exp.: Rp 250.000.000
Kemungkinan    : 40%
Penjual        : Dewi Rahayu
Tim Penjualan  : Tim A
Tenggat        : 31 Mei 2026
```

4. Klik **Simpan**

### 3.3.3 Penilaian Lead (Lead Scoring) dengan AI

Odoo 19 menggunakan machine learning untuk memberi skor lead berdasarkan:
- Riwayat konversi lead serupa di masa lalu
- Industri dan ukuran perusahaan
- Sumber lead
- Aktivitas yang dilakukan

**Cara Aktifkan**:
1. **CRM → Konfigurasi → Pengaturan**
2. Aktifkan **Skor Prediktif Lead**
3. Sistem perlu data historis minimal 30 hari

> **Interpretasi Skor**: Skor 0-100. Skor >70 = lead potensial tinggi, tindak lanjuti segera.

---

## 3.4 Manajemen Pipeline

### 3.4.1 Tampilan Kanban

Tampilan default pipeline CRM adalah Kanban:

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ KUALIFIKASI │  │ TERKONTAK   │  │ PROPOSAL    │  │ NEGOSIASI   │
│             │  │             │  │             │  │             │
│ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │
│ │PT. Maju │ │  │ │CV. Jaya │ │  │ │UD. Baru │ │  │ │PT.Sukses│ │
│ │Rp 50jt  │ │  │ │Rp 120jt │ │  │ │Rp 75jt  │ │  │ │Rp 250jt │ │
│ └─────────┘ │  │ └─────────┘ │  │ └─────────┘ │  │ └─────────┘ │
└─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘
```

**Fitur Kanban Odoo 19**:
- Drag & drop kartu antar tahap
- Klik kartu untuk buka detail
- Indikator warna untuk prioritas/aktivitas
- Tombol ☆ untuk tandai favorit
- Tombol 📅 untuk jadwal aktivitas cepat

### 3.4.2 Memindahkan Peluang Antar Tahap

**Cara 1 — Drag & Drop**:
Seret kartu peluang dari satu kolom ke kolom tahap berikutnya.

**Cara 2 — Ubah di Form**:
1. Buka peluang
2. Klik tombol tahap di bagian atas (status bar)
3. Pilih tahap baru

**Cara 3 — Tandai Menang/Kalah**:
- Klik **Tandai Menang** → konfirmasi → peluang berhasil
- Klik **Tandai Kalah** → isi alasan kekalahan → analisis

### 3.4.3 Tampilan List

Berguna untuk manajemen massal:
- Pilih multiple peluang
- Ubah penjual, tim, atau tahap sekaligus
- Export data ke Excel/CSV

### 3.4.4 Tampilan Pivot & Grafik

- **Pivot**: Analisis pendapatan per penjual, sumber, bulan
- **Grafik Batang**: Perbandingan kinerja antar periode
- **Grafik Lingkaran**: Distribusi peluang per tahap

---

## 3.5 Komunikasi dengan Prospek

### 3.5.1 Log Aktivitas

Dari form peluang, klik ikon aktivitas (📅) untuk log:

| Aktivitas | Keterangan |
|-----------|-----------|
| **Email** | Kirim email langsung dari Odoo |
| **Panggilan** | Catat hasil panggilan telepon |
| **Pertemuan** | Jadwalkan meeting (sinkron ke Calendar) |
| **Pengingat** | Buat pengingat untuk follow-up |
| **Upload Dokumen** | Lampirkan proposal/brosur |

### 3.5.2 AI Smart Email Drafting (Baru Odoo 19)

1. Di form peluang, klik **Kirim Email**
2. Klik ikon **AI Sparkle (✨)**
3. Odoo AI menganalisis riwayat percakapan
4. AI menyarankan draf email yang relevan
5. Edit sesuai kebutuhan → Kirim

**Contoh Prompt AI**:
```
"Tulis email follow-up setelah demo produk kemarin untuk PT. Sukses Makmur. 
Tekankan fitur integrasi akuntansi dan ROI penghematan waktu 30%."
```

### 3.5.3 Integrasi Kalender

Dari peluang:
1. Klik **Jadwalkan Aktivitas**
2. Pilih **Pertemuan**
3. Isi detail:
   ```
   Judul     : Demo ERP PT. Sukses Makmur
   Tanggal   : 28 April 2026, 10:00-11:30
   Peserta   : Dewi Rahayu, Andi Wijaya
   Lokasi    : Kantor Klien / Google Meet
   ```
4. Meeting muncul di **Kalender** dan dikirim undangan email

---

## 3.6 Pelaporan CRM

### 3.6.1 Laporan Pipeline

**CRM → Pelaporan → Pipeline**

Tampilan analisis pipeline dengan filter:
- Per penjual
- Per tim penjualan
- Per tahap
- Per periode waktu

```
Contoh Output Laporan Pipeline Bulan April 2026:
──────────────────────────────────────────────
Tahap            | Jumlah | Nilai Total
──────────────────────────────────────────────
Kualifikasi      |    12  | Rp   850.000.000
Terkontak        |     8  | Rp   620.000.000
Proposal Dikirim |     5  | Rp   450.000.000
Negosiasi        |     3  | Rp   380.000.000
──────────────────────────────────────────────
Total Pipeline   |    28  | Rp 2.300.000.000
```

### 3.6.2 Laporan Analisis Lead

**CRM → Pelaporan → Analisis Lead**

Metrik tersedia:
- Jumlah lead per sumber
- Tingkat konversi lead ke peluang
- Rasio menang/kalah per penjual
- Waktu rata-rata di setiap tahap
- Pendapatan yang dimenangkan vs. proyeksi

### 3.6.3 Laporan Prakiraan

**CRM → Pelaporan → Prakiraan**

Menampilkan proyeksi pendapatan yang akan datang:
```
Bulan   | Proyeksi       | Probabilitas | Nilai Tertimbang
────────┼────────────────┼──────────────┼─────────────────
Mei '26 | Rp 500.000.000 |         65%  | Rp 325.000.000
Jun '26 | Rp 750.000.000 |         45%  | Rp 337.500.000
```

### 3.6.4 Laporan Aktivitas

**CRM → Pelaporan → Aktivitas**

Pantau aktivitas tim:
- Aktivitas yang direncanakan vs. selesai
- Aktivitas terlambat per penjual
- Tipe aktivitas terbanyak

---

## 3.7 Fitur Lanjutan CRM

### 3.7.1 Tim Penjualan

**CRM → Konfigurasi → Tim Penjualan**

Buat tim berdasarkan:
- Wilayah (Jakarta, Surabaya, Bali)
- Produk (Hardware, Software, Services)
- Industri (Manufaktur, Ritel, Perbankan)

Setiap tim memiliki:
- Anggota tim
- Target pendapatan
- Alias email khusus (leads@tim-jakarta.co.id)
- Dashboard terpisah

### 3.7.2 Otomatisasi Lead (Lead Automation)

**CRM → Konfigurasi → Otomatisasi**

Contoh aturan otomatis:

**Aturan 1 — Auto-assign lead berdasarkan lokasi**:
```
JIKA: Provinsi = "Jawa Timur"
MAKA: Tetapkan ke Tim Surabaya
```

**Aturan 2 — Eskalasi lead tidak aktif**:
```
JIKA: Peluang tidak ada aktivitas selama 7 hari
MAKA: Kirim notifikasi ke manajer penjualan
```

**Aturan 3 — Email nurturing otomatis**:
```
JIKA: Skor lead < 30 DAN tahap = Kualifikasi
MAKA: Kirim email edukasi produk minggu ke-1
TUNGGU: 7 hari
MAKA: Kirim studi kasus pelanggan
```

### 3.7.3 Lead Mining `[Enterprise]`

Temukan prospek baru dari database bisnis global:

1. **CRM → Lead Mining**
2. Filter berdasarkan:
   - Industri: Manufaktur
   - Lokasi: Indonesia, Jawa
   - Ukuran: 50-500 karyawan
3. Klik **Temukan Lead**
4. Preview hasil → Import ke CRM

### 3.7.4 Integrasi dengan Modul Lain

| Integrasi | Cara Kerja |
|-----------|-----------|
| **Sales** | Buat penawaran langsung dari peluang CRM |
| **Accounting** | Lihat faktur terkait pelanggan dari CRM |
| **Email Marketing** | Sinkronkan daftar prospek untuk kampanye |
| **Calendar** | Meeting terjadwal muncul di Calendar |
| **Helpdesk** | Ticket pelanggan terhubung ke peluang |
| **VoIP** | Log panggilan otomatis di aktivitas CRM |

---

## 3.8 Simulasi Lengkap: Siklus CRM dari Awal ke Akhir

**Skenario**: CV. Bersama Maju menghubungi sales team PT. Toko Berkah via email untuk menanyakan sistem kasir (POS).

### Step 1: Lead Masuk via Email
```
Email masuk ke: leads@tokoberkah.co.id
Dari          : hrd@bersamemaju.co.id
Subjek        : Pertanyaan Sistem Kasir untuk 3 Outlet
```
→ Odoo otomatis buat lead baru di CRM

### Step 2: Kualifikasi Lead
1. Buka **CRM → Pipeline**
2. Temukan lead baru (tahap: Kualifikasi)
3. Buka dan isi detail:
   - Pendapatan ekspektasi: Rp 45.000.000
   - Tetapkan ke penjual: Budi Santoso
4. Klik **Konversi ke Peluang**

### Step 3: Jadwalkan Panggilan Kualifikasi
1. Klik **Jadwalkan Aktivitas**
2. Pilih: Panggilan Telepon
3. Tanggal: Besok pukul 10:00
4. Catatan: "Tanya detail kebutuhan: jumlah outlet, fitur yang dibutuhkan"

### Step 4: Lakukan Panggilan & Log Hasil
1. Setelah panggilan, klik aktivitas → **Tandai Selesai**
2. Tulis ringkasan hasil:
   ```
   Hasil panggilan:
   - 3 outlet: Serpong, Bekasi, Depok
   - Butuh integrasi inventaris
   - Budget Rp 50-60 juta
   - Decision maker: Pak Rudi (Direktur)
   - Meeting: 30 April 2026
   ```

### Step 5: Pindah ke Tahap "Proposal Dikirim"
1. Klik **Buat Penawaran** → redirect ke modul Sales
2. Buat penawaran dengan produk POS + Instalasi
3. Kirim penawaran ke klien

### Step 6: Negosiasi & Menangkan Deal
1. Pindahkan ke tahap **Negosiasi**
2. Catat poin negosiasi di chatter
3. Setelah deal setuju → Klik **Tandai Menang** 🎉
4. Konfirmasi penawaran → Sales Order otomatis dibuat

---

## 3.9 Integrasi CRM dengan AI (Ringkasan Fitur Odoo 19)

| Fitur AI | Deskripsi |
|----------|-----------|
| **Skor Lead Prediktif** | ML menilai probabilitas konversi |
| **Ringkasan Otomatis** | AI ringkas riwayat komunikasi panjang |
| **Saran Email** | AI draftkan email follow-up kontekstual |
| **Prediksi Penutupan** | Estimasi tanggal deal berhasil |
| **Tindakan Terbaik** | AI sarankan langkah selanjutnya |

---

[← Instalasi](02-instalasi-setup.md) | [Berikutnya: Penjualan →](04-penjualan.md)
