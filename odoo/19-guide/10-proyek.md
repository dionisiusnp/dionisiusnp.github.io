# Bab 10 — Manajemen Proyek

[← SDM](09-sdm.md) | [Berikutnya: Website & eCommerce →](11-website-ecommerce.md)

---

## 10.1 Gambaran Umum Manajemen Proyek Odoo 19

Modul **Project** di Odoo 19 menyediakan platform manajemen proyek yang fleksibel dengan tampilan Kanban, Gantt, List, dan Kalender. Odoo 19 secara khusus meningkatkan **tampilan Gantt** dengan zoom cerdas berdasarkan skala tugas dan visibilitas tanggal mulai/akhir yang lebih jelas saat drag & drop.

---

## 10.2 Pengaturan Proyek

**Proyek → Konfigurasi → Pengaturan**

| Pengaturan | Keterangan |
|-----------|-----------|
| **Sub-tugas** | Aktifkan hierarki tugas |
| **Milestone** | Tonggak pencapaian proyek |
| **Timesheet** | Catat jam kerja per tugas |
| **Penagihan** | Bill berdasarkan waktu atau milestone |
| **Perencanaan** | Integrasi dengan modul Planning |
| **Pelanggan Portal** | Klien bisa lihat progres di portal |

---

## 10.3 Membuat Proyek

### 10.3.1 Buat Proyek Baru

**Proyek → Baru** atau klik **+** di tampilan kanban proyek

```
Nama Proyek       : Implementasi ERP PT. Mandiri Jaya
Manajer Proyek    : Dewi Rahayu
Perusahaan        : PT. Toko Berkah
Pelanggan         : PT. Mandiri Jaya
Tanggal Mulai     : 2 Mei 2026
Tanggal Tenggat   : 31 Juli 2026
Visibilitas       : Terbatas (hanya internal + klien)

Tag               : ERP, Implementasi, Enterprise
Warna             : Biru

Penagihan:
  Kebijakan       : Berdasarkan Timesheet
  Harga per Jam   : Rp 750.000/jam
  Anggaran        : Rp 150.000.000
```

### 10.3.2 Template Proyek

Untuk proyek berulang:
1. Dari proyek yang sudah ada → Klik **Simpan sebagai Template**
2. Template tersimpan
3. Proyek baru → **Pilih Template** → Semua tahap & tugas ter-copy

---

## 10.4 Manajemen Tugas

### 10.4.1 Tampilan Kanban

Default tampilan proyek adalah Kanban per tahap:

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  BACKLOG     │  │  TO DO       │  │  IN PROGRESS │  │  DONE        │
│              │  │              │  │              │  │              │
│ ┌──────────┐ │  │ ┌──────────┐ │  │ ┌──────────┐ │  │ ┌──────────┐ │
│ │ Setup    │ │  │ │ Instalasi│ │  │ │ Migrasi  │ │  │ │Analisis  │ │
│ │ Server   │ │  │ │ Odoo     │ │  │ │ Data     │ │  │ │Kebutuhan │ │
│ │ ⏱ 8h   │ │  │ │ ⏱ 40h   │ │  │ │ ⏱ 20h   │ │  │ │ ✓ Done   │ │
│ └──────────┘ │  │ └──────────┘ │  │ └──────────┘ │  │ └──────────┘ │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

### 10.4.2 Membuat Tugas

Dari Kanban: Klik **+** di kolom, atau klik **Baru**

```
Judul         : Instalasi & Konfigurasi Odoo di Server
Proyek        : Implementasi ERP PT. Mandiri Jaya
Pengguna Tugas: Budi Santoso (Technical)
Tenggat       : 5 Mei 2026
Tag           : Technical, Setup
Prioritas     : ★ Tinggi

Deskripsi:
  1. Install Odoo 19 di Ubuntu 24.04
  2. Konfigurasi PostgreSQL
  3. Setup Nginx reverse proxy
  4. Konfigurasi SSL/HTTPS
  5. Test akses dari jaringan klien

Estimasi Jam  : 16 jam
```

### 10.4.3 Sub-Tugas

Untuk tugas besar, tambahkan sub-tugas:

```
[TUGAS INDUK] Instalasi & Konfigurasi Server
  ├── Sub-tugas 1: Install Ubuntu 24.04 LTS (2h)
  ├── Sub-tugas 2: Install PostgreSQL 16 (1h)
  ├── Sub-tugas 3: Install Odoo 19 (4h)
  ├── Sub-tugas 4: Konfigurasi Nginx (3h)
  ├── Sub-tugas 5: Setup SSL/HTTPS (2h)
  └── Sub-tugas 6: Testing & UAT (4h)
Total: 16 jam
```

---

## 10.5 Tampilan Gantt (Diperbarui Odoo 19)

### 10.5.1 Akses Gantt

Dari proyek → Klik ikon **Gantt** di bar tampilan

### 10.5.2 Fitur Gantt Odoo 19

**Peningkatan utama Odoo 19**:
- **Smart Zoom**: Otomatis sesuaikan skala (hari/minggu/bulan) berdasarkan durasi proyek
- **Tanggal Terlihat**: Tanggal mulai & akhir tampil saat drag & drop
- **Label Lebih Jelas**: Nama tugas lebih terbaca di bar gantt
- **Dependensi**: Lihat hubungan antar tugas

```
Proyek: Implementasi ERP PT. Mandiri Jaya
[Mei 2026 → Juli 2026]

Fase 1: Perencanaan
  └─ Analisis Kebutuhan    [●━━━━━━━━━━━━━━━●] 2-8 Mei
  └─ Desain Solusi         [     ●━━━━━━━━━━━●] 6-15 Mei

Fase 2: Instalasi
  └─ Setup Server          [          ●━━━━━●] 12-16 Mei
  └─ Instalasi Odoo        [              ●━━━━━━━━━━━●] 16-25 Mei

Fase 3: Konfigurasi
  └─ Konfigurasi Modul     [                   ●━━━━━━━━━━━━━━━━━━●] 25 Mei-15 Jun
  └─ Migrasi Data          [                         ●━━━━━━━━━━━━━━━●] 5-20 Jun

Fase 4: Training
  └─ Training User         [                                   ●━━━━━━━━●] 20-30 Jun

Fase 5: Go-Live
  └─ UAT & Fix             [                                         ●━━━━━━━━●] 1-15 Jul
  └─ Go Live               [                                                  ●] 18 Jul
```

### 10.5.3 Mengelola Dependensi Tugas

1. Aktifkan di **Proyek → Konfigurasi → Pengaturan → Dependensi Tugas**
2. Di form tugas → Tab **Blokir oleh**: Pilih tugas yang harus selesai dulu
3. Di Gantt, panah menghubungkan tugas yang saling bergantung

---

## 10.6 Timesheet (Pencatatan Jam Kerja)

### 10.6.1 Catat Jam Kerja di Tugas

Dari form tugas → Tab **Timesheet**:

```
Tanggal  | Karyawan     | Deskripsi                    | Durasi
─────────┼──────────────┼──────────────────────────────┼────────
22/04/26 │ Budi Santoso │ Setup Ubuntu 24.04           │  2 jam
22/04/26 │ Budi Santoso │ Instalasi PostgreSQL          │  1 jam
23/04/26 │ Budi Santoso │ Instalasi Odoo 19            │  4 jam
23/04/26 │ Budi Santoso │ Konfigurasi Nginx            │  3 jam
────────────────────────────────────────────────────────────────
Total Jam yang Dicatat   : 10 jam
Estimasi                 : 16 jam
Sisa                     : 6 jam
```

### 10.6.2 Timer Timesheet

Klik **▶ Mulai** di form tugas → Timer berjalan otomatis
Klik **■ Stop** saat selesai → Durasi tersimpan

---

## 10.7 Milestone & Penagihan

### 10.7.1 Buat Milestone

**Proyek → [pilih proyek] → Milestone**

```
Milestone 1: Instalasi Selesai
  Tanggal Target: 25 Mei 2026
  Nilai          : Rp 30.000.000

Milestone 2: Training Selesai
  Tanggal Target: 30 Juni 2026
  Nilai          : Rp 60.000.000

Milestone 3: Go-Live & Serah Terima
  Tanggal Target: 18 Juli 2026
  Nilai          : Rp 60.000.000
```

### 10.7.2 Penagihan Berdasarkan Milestone

Saat milestone tercapai:
1. Tandai milestone: **Selesai**
2. Klik **Buat Invoice**
3. Invoice senilai Rp 30.000.000 dibuat
4. Kirim ke klien

### 10.7.3 Penagihan Berdasarkan Timesheet

Pada akhir bulan:
1. **Proyek → [proyek] → Faktur → Buat Faktur**
2. Pilih periode: April 2026
3. Odoo hitung: 40 jam × Rp 750.000 = Rp 30.000.000
4. Review → Konfirmasi → Kirim

---

## 10.8 Pelaporan Proyek

### 10.8.1 Progress Proyek

**Proyek → Pelaporan → Analisis Tugas**

```
Proyek: Implementasi ERP PT. Mandiri Jaya

Tahap        | Tugas | Selesai | Progress
─────────────┼───────┼─────────┼──────────
Perencanaan  |     4 |       4 |    100%
Instalasi    |     3 |       2 |     67%
Konfigurasi  |     8 |       0 |      0%
Training     |     4 |       0 |      0%
Go-Live      |     2 |       0 |      0%
─────────────┴───────┴─────────┴──────────
Total        |    21 |       6 |     29%
```

### 10.8.2 Laporan Profitabilitas

```
Proyek: Implementasi ERP PT. Mandiri Jaya

Pendapatan:
  Milestone 1 (Tertagih)     : Rp  30.000.000
  Milestone 2 (Belum)        : Rp  60.000.000
  Milestone 3 (Belum)        : Rp  60.000.000
  Total Kontrak              : Rp 150.000.000

Biaya:
  Jam Kerja (80h × Rp 250.000): Rp  20.000.000
  Biaya Server & Lisensi      : Rp   8.000.000
  Perjalanan Dinas            : Rp   2.500.000
  Total Biaya (saat ini)      : Rp  30.500.000

Margin Saat Ini (dari M1):
  Pendapatan: Rp 30.000.000
  Biaya     : Rp 30.500.000
  Margin    : -Rp 500.000 (defisit sementara)
```

---

## 10.9 Helpdesk (Tiket Dukungan)

### 10.9.1 Gambaran Umum

Modul **Helpdesk** mengelola tiket dukungan pelanggan dengan pipeline yang dapat dikustomisasi.

### 10.9.2 Setup Tim Helpdesk

**Helpdesk → Konfigurasi → Tim**

```
Nama Tim     : Support Teknis
Visibilitas  : Pengguna Internal
Alias Email  : support@tokoberkah.co.id
Saluran      : ✓ Email, ✓ Website, ✓ Live Chat

Tahap:
  1. Baru (0%)
  2. Dalam Proses (50%)
  3. Menunggu Klien (70%)
  4. Selesai (100%)

SLA:
  Prioritas Rendah  : Respons 24 jam, Selesai 5 hari
  Prioritas Menengah: Respons 8 jam, Selesai 2 hari
  Prioritas Tinggi  : Respons 2 jam, Selesai 4 jam
```

### 10.9.3 Fitur Helpdesk Odoo 19

**Penugasan Cerdas**:
- Sistem cek jadwal karyawan sebelum assign tiket
- Karyawan yang sedang cuti tidak mendapat tiket baru
- Distribusi tiket merata (round-robin)

**Merger Tiket**:
- Deteksi tiket duplikat dari pelanggan sama
- Merge menjadi 1 tiket

**AI Smart Response** (Enterprise):
- AI sarankan respons berdasarkan riwayat tiket serupa
- Draftkan jawaban teknis yang akurat

---

## 10.10 Simulasi Lengkap: Manajemen Proyek Implementasi

**Skenario**: PT. Toko Berkah mengimplementasi Odoo untuk PT. Mandiri Jaya.

### Week 1 — Kickoff & Planning
```
Tugas:
  ✓ Kickoff meeting → Semua stakeholder hadir
  ✓ Analisis proses bisnis klien (2 hari)
  ✓ Mapping kebutuhan ke modul Odoo
  ✓ Buat project plan di Odoo

Output: Dokumen Analisis Kebutuhan + Timeline
```

### Week 2-3 — Instalasi
```
Tugas:
  ✓ Setup server Ubuntu 24.04 (2h)
  ✓ Instalasi Odoo 19 Enterprise (4h)
  ✓ Konfigurasi database (1h)
  ✓ Setup SSL & domain (2h)
  ✓ Test akses dari klien (1h)

Timesheet: 10 jam × Rp 750.000 = Rp 7.500.000
```

### Week 4-8 — Konfigurasi Modul
```
Modul dikonfigurasi:
  ✓ Chart of Accounts Indonesia
  ✓ CRM & Sales
  ✓ Inventory (3 gudang)
  ✓ Accounting (PPN, PPh)
  ✓ HR & Payroll
  ✓ Migrasi data dari sistem lama

Timesheet: 80 jam → Milestone 1 selesai
Invoice M1: Rp 30.000.000 dikirim ke klien
```

### Week 9-10 — Training
```
Sesi Training:
  - Admin sistem (4 jam)
  - Modul Sales & CRM (3 jam)
  - Modul Accounting (4 jam)
  - Modul HR (2 jam)
  - Q&A dan hands-on (5 jam)

Milestone 2 selesai → Invoice Rp 60.000.000
```

### Week 11-12 — Go Live
```
  ✓ UAT dengan pengguna aktual
  ✓ Fix 5 bug minor yang ditemukan
  ✓ Go-live: 18 Juli 2026 ✓
  ✓ Serah terima dokumentasi
  
Milestone 3 selesai → Invoice Rp 60.000.000
Total Proyek: Rp 150.000.000 ✓
```

---

[← SDM](09-sdm.md) | [Berikutnya: Website & eCommerce →](11-website-ecommerce.md)
