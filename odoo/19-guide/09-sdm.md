# Bab 09 — Sumber Daya Manusia (HR)

[← Akuntansi](08-akuntansi.md) | [Berikutnya: Proyek →](10-proyek.md)

---

## 9.1 Gambaran Umum HR Odoo 19

Modul **HR** di Odoo 19 mencakup seluruh siklus pengelolaan karyawan — dari rekrutmen, onboarding, manajemen cuti, absensi, penggajian, hingga penilaian kinerja. Odoo 19 memperkenalkan sistem **Pay Runs** yang menggantikan Payroll Batches lama, serta integrasi AI untuk otomatisasi alur cuti.

### Modul HR yang Tersedia
```
Karyawan (Employees)
Rekrutmen (Recruitment)
Cuti (Time Off)
Kehadiran (Attendance)
Penggajian (Payroll)
Penilaian (Appraisals)
Armada (Fleet)
Referral Karyawan
```

---

## 9.2 Manajemen Karyawan

### 9.2.1 Membuat Data Karyawan

**Karyawan → Baru**

**Tab Informasi Utama**:
```
Nama              : Dewi Rahayu
Jabatan           : Sales Manager
Departemen        : Penjualan
Manajer           : Budi Santoso
Perusahaan        : PT. Toko Berkah
Kantor            : Jakarta

Kontak Kerja:
Email Kerja       : dewi@tokoberkah.co.id
Telepon Kerja     : +62-21-1234567 ext. 102
Mobile            : 0812-9876-5432
```

**Tab Informasi Pribadi**:
```
NIK               : 3271012345678901
Tempat, Tgl Lahir : Jakarta, 15 Maret 1990
Jenis Kelamin     : Perempuan
Status Pernikahan : Menikah
NPWP              : 12.345.678.9-001.000
BPJS Kesehatan    : 0001234567890
BPJS Ketenagakerjaan: 123456789
```

**Tab Pengaturan HR**:
```
Tipe Karyawan     : Karyawan Tetap
ID Badge          : EMP-2020-001
PIN               : [untuk absensi mesin]
Kategori          : [tag karyawan]
```

### 9.2.2 Kontrak Karyawan

**Karyawan → [pilih karyawan] → Tab Informasi Kerja → Kontrak**

```
Nama Kontrak      : Kontrak Tetap - Dewi Rahayu
Tanggal Mulai     : 1 Januari 2022
Tanggal Berakhir  : [kosong = tidak berbatas waktu]
Tipe Kontrak      : Karyawan Tetap (PKWTT)

Gaji Pokok        : Rp 12.000.000
Tunjangan         : 
  - Tunjangan Makan    : Rp  1.000.000
  - Tunjangan Transport: Rp    750.000
  - Tunjangan Jabatan  : Rp  2.000.000
BPJS Ketenagakerjaan: 5.7% (perusahaan) / 3% (karyawan)
BPJS Kesehatan    : 4% (perusahaan) / 1% (karyawan)

Struktur Gaji     : [Karyawan Tetap - Indonesia]
```

### 9.2.3 Onboarding Karyawan

**Karyawan → Konfigurasi → Rencana Onboarding**

```
Rencana: Onboarding Karyawan Baru

Aktivitas untuk Karyawan:
  ✓ Tanda tangan kontrak kerja
  ✓ Pengambilan foto untuk ID card
  ✓ Pelatihan sistem Odoo (3 hari)
  ✓ Orientasi perusahaan
  ✓ Perkenalan tim

Aktivitas untuk HR:
  ✓ Setup email kerja
  ✓ Buat akun Odoo
  ✓ Registrasi BPJS
  ✓ Pengaturan rekening gaji

Peralatan yang Diserahkan:
  ✓ Laptop Dell E5540 (SN: SN2026-001)
  ✓ Mouse & Keyboard
  ✓ Kartu Akses Kantor
```

---

## 9.3 Rekrutmen

### 9.3.1 Buat Posisi Lowongan

**Rekrutmen → Baru**

```
Nama Jabatan     : Frontend Developer
Departemen       : IT
Perusahaan       : PT. Toko Berkah
Jumlah Dibutuhkan: 2 orang
Manajer Perekrutan: Budi (IT Manager)
HR Penanggung Jawab: Sari (HR Officer)

Deskripsi Pekerjaan:
  Kami mencari Frontend Developer yang berpengalaman
  dalam React.js dan TailwindCSS...

Persyaratan:
  - Min. S1 Ilmu Komputer / Teknik Informatika
  - Min. 2 tahun pengalaman React
  - Mampu bekerja dalam tim
```

### 9.3.2 Pipeline Rekrutmen (Kanban Baru Odoo 19)

Tampilan Kanban yang diperbarui di Odoo 19 menyerupai modern ATS:

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ LAMARAN BARU    │  │ REVIEW CV       │  │ WAWANCARA       │  │ PENAWARAN KERJA │
│                 │  │                 │  │                 │  │                 │
│ ┌─────────────┐ │  │ ┌─────────────┐ │  │ ┌─────────────┐ │  │ ┌─────────────┐ │
│ │ Agus Salim  │ │  │ │ Budi Prasetyo│ │  │ │ Rini Susanti│ │  │ │ Hendra Maju │ │
│ │ S1 Kom UGM  │ │  │ │ S1 TI Undip │ │  │ │ S1 SI Binus │ │  │ │ S1 SI UNPAD │ │
│ └─────────────┘ │  │ └─────────────┘ │  │ └─────────────┘ │  │ └─────────────┘ │
│ ┌─────────────┐ │  │                 │  │                 │  │                 │
│ │ Citra Dewi  │ │  │                 │  │                 │  │                 │
│ │ D3 Kom JTIS │ │  │                 │  │                 │  │                 │
│ └─────────────┘ │  │                 │  │                 │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘
```

**Fitur Baru Odoo 19 — Kanban Rekrutmen**:
- Drag & drop kandidat antar tahap langsung dari board
- Tambah catatan kandidat inline
- Jadwalkan wawancara langsung dari kartu
- Kirim email ke kandidat dari board

### 9.3.3 Proses Rekrutmen

**Langkah 1**: Penerimaan Lamaran
- Via email (alias rekrutmen)
- Via website Karir (website modul)
- Via LinkedIn/platform rekrutmen (integrasi)
- Manual input

**Langkah 2**: Review CV
```
Buka lamaran → Review → Catatan:
"CV bagus, 3 tahun React. Panggil untuk interview."
Pindah ke tahap: Wawancara
```

**Langkah 3**: Jadwalkan Wawancara
1. Di form lamaran → Klik **Wawancara Pertama**
2. Isi:
   ```
   Tanggal  : 28 April 2026, 10:00-11:00
   Pewawancara: Budi (IT Manager), Sari (HR)
   Lokasi   : Ruang Meeting A / Google Meet
   ```
3. Undangan kalender otomatis dikirim ke semua pihak

**Langkah 4**: Buat Penawaran Kerja
1. Kandidat terpilih → Klik **Buat Penawaran**
2. Isi detail kontrak & gaji
3. Kirim via email

**Langkah 5**: Onboard
1. Kandidat terima → Klik **Buat Karyawan**
2. Data otomatis terisi dari lamaran
3. Mulai proses onboarding

---

## 9.4 Manajemen Cuti (Time Off)

### 9.4.1 Konfigurasi Tipe Cuti

**Cuti → Konfigurasi → Tipe Cuti**

```
Tipe Cuti: Cuti Tahunan
  Alokasi         : Per Tahun (12 hari)
  Validasi        : Persetujuan Manajer
  Waktu Kerja     : Hari Kerja (Senin-Jumat)
  Warna Kalender  : Hijau

Tipe Cuti: Cuti Sakit
  Alokasi         : Tanpa Batas (dengan surat dokter)
  Validasi        : Tidak Perlu (dikonfirmasi langsung)
  Bukti           : Surat Keterangan Dokter (wajib)

Tipe Cuti: Cuti Melahirkan
  Alokasi         : 90 hari (UU Ketenagakerjaan)
  Jenis Kelamin   : Perempuan
  Bukti           : Surat Bidan/RS

Tipe Cuti: Cuti Ayah (Paternity)
  Alokasi         : 2 hari
  Validasi        : Otomatis
```

### 9.4.2 Rencana Akrual (Accrual Plans)

Untuk cuti yang bertambah seiring waktu:
```
Nama          : Akrual Cuti Tahunan
Berdasarkan   : Jam Kerja
Level 1       : +1 hari/bulan (setelah 1 tahun)
Level 2       : +1.5 hari/bulan (setelah 5 tahun)
Level 3       : +2 hari/bulan (setelah 10 tahun)
```

### 9.4.3 Karyawan Ajukan Cuti

1. **Cuti → Baru** atau dari **Dashboard Karyawan**
2. Isi:
   ```
   Tipe Cuti  : Cuti Tahunan
   Dari       : 28 April 2026
   Sampai     : 2 Mei 2026 (4 hari kerja)
   Alasan     : Liburan keluarga
   ```
3. Klik **Konfirmasi** → Kirim ke manajer untuk approval

### 9.4.4 Manajer Setujui/Tolak

1. Manajer menerima notifikasi email
2. Buka request cuti → Review
3. **Setujui** → Kalender karyawan diblokir
4. **Tolak** → Karyawan dinotifikasi + alasan penolakan

**Integrasi AI (Odoo 19)**:
- AI memvalidasi apakah saldo cuti cukup
- AI cek konflik jadwal dengan karyawan lain
- AI otomatis transisi status berdasarkan aturan

### 9.4.5 Manajemen Cuti Tim

**Cuti → Manajer → Tampilan Kalender Tim**

```
April 2026 — Tim Penjualan

         Sen  Sel  Rab  Kam  Jum
Minggu 4: 27   28   29   30    1
Dewi       -    C    C    C     -   ← Cuti 28-30 April
Budi       -    -    -    -     -
Sari       -    -    -    S     -   ← Cuti Sakit 30 April
```

---

## 9.5 Absensi (Attendance)

### 9.5.1 Metode Pencatatan Kehadiran

| Metode | Keterangan |
|--------|-----------|
| **Mesin Fingerprint** | Integrasi via Odoo IoT |
| **Kiosk Mode** | Tablet di pintu masuk, scan badge/PIN |
| **Manual** | Karyawan input sendiri |
| **Mobile App** | Check-in/out via smartphone |
| **Face Recognition** | Via kamera + IoT |

### 9.5.2 Setup Kiosk Mode

1. **Kehadiran → Konfigurasi → Pengaturan**
2. Aktifkan: **Kiosk Mode**
3. Di tablet pintu masuk:
   - Buka Odoo
   - Masuk ke mode Kiosk
   - Karyawan scan badge atau masukkan PIN

### 9.5.3 Laporan Kehadiran

**Kehadiran → Pelaporan**

```
Karyawan: Dewi Rahayu | April 2026

Tanggal | Masuk  | Keluar | Durasi | Status
────────┼────────┼────────┼────────┼──────────
22/04   | 08:05  | 17:02  | 8j57m  | Normal
23/04   | -      | -      | -      | CUTI
24/04   | 07:55  | 17:30  | 9j35m  | Lembur
25/04   | 08:30  | 17:00  | 8j30m  | Terlambat 30m
```

---

## 9.6 Penggajian (Payroll)

### 9.6.1 Struktur Gaji

**Penggajian → Konfigurasi → Struktur Gaji**

**Struktur: Karyawan Tetap Indonesia**:
```
Kode  | Nama                    | Jenis  | Jumlah
──────┼─────────────────────────┼────────┼─────────────────────
BASIC | Gaji Pokok              | Input  | [dari kontrak]
MEAL  | Tunjangan Makan         | Input  | [dari kontrak]
TRANS | Tunjangan Transport     | Input  | [dari kontrak]
BPJSK | Iuran BPJS Kesehatan   | -      | 1% × (Gaji+Tunj)
BPJSTK| Iuran BPJS Ketenagakerj| -      | 3% × Gaji Pokok
PPH21 | Pajak PPh 21            | -      | [Hitung sesuai PTKP]
NET   | Gaji Bersih             | Total  | Penjumlahan
```

### 9.6.2 Pay Runs (Baru Odoo 19)

Odoo 19 mengganti sistem "Payroll Batches" dengan **Pay Runs** yang lebih terpandu:

**Penggajian → Pay Runs** → Klik **Baru**

```
Nama Pay Run  : Gaji April 2026
Periode       : 1-30 April 2026
Jurnal        : Penggajian
```

**Langkah-langkah dalam Pay Run**:

1. **Buat Slip Gaji** — Odoo otomatis tarik data:
   - Dari Kehadiran (jam kerja aktual)
   - Dari Cuti (hari tidak masuk)
   - Dari Lembur
   - Dari Kontrak (gaji pokok & tunjangan)

2. **Review Slip Gaji Individual**:
   ```
   Karyawan: Dewi Rahayu — April 2026
   
   PENDAPATAN:
   Gaji Pokok              Rp 12.000.000
   Tunjangan Makan         Rp  1.000.000
   Tunjangan Transport     Rp    750.000
   Tunjangan Jabatan       Rp  2.000.000
   ───────────────────────────────────
   Total Kotor             Rp 15.750.000
   
   POTONGAN:
   BPJS Kesehatan (1%)     Rp    157.500
   BPJS TK (3%)            Rp    360.000
   PPh 21 (efektif ~5%)    Rp    520.000
   ───────────────────────────────────
   Total Potongan          Rp  1.037.500
   
   GAJI BERSIH (Take Home Pay): Rp 14.712.500
   ```

3. **Konfirmasi & Cetak Slip Gaji**:
   - Review semua karyawan
   - Klik **Konfirmasi**
   - Cetak/kirim slip gaji ke email karyawan

4. **Bayar via Transfer Bank**:
   - Export data ke format transfer massal bank
   - Upload ke internet banking perusahaan
   - Konfirmasi pembayaran di Odoo

### 9.6.3 Work Entries (Entri Kerja)

Work entries adalah catatan waktu kerja yang menjadi dasar penggajian:

```
Tipe Work Entry:
  - WORK100  : Jam Kerja Normal
  - LEAVE110 : Cuti Tahunan (dibayar)
  - LEAVE120 : Cuti Sakit (dibayar)
  - LEAVE130 : Cuti Tanpa Bayar
  - OVERTIME : Lembur (x1.5 atau x2)
  - HOLIDAY  : Hari Libur Nasional
```

**Cara Sistem Kerja**:
1. Karyawan check-in/out → Work Entry WORK100 dibuat
2. Karyawan ambil cuti → Work Entry LEAVE110 dibuat
3. Saat payroll: semua work entry dikumpulkan
4. Hitung total jam × tarif

---

## 9.7 Penilaian Kinerja (Appraisals)

### 9.7.1 Setup Template Penilaian

**Penilaian → Konfigurasi → Template**

```
Template: Penilaian Karyawan Tetap - Tahunan

Pertanyaan:
1. Pencapaian Target (Bobot 40%)
   - Apakah target telah tercapai?
   - Nilai 1-5: [__]
   
2. Kerjasama Tim (Bobot 20%)
   - Bagaimana kolaborasi dengan rekan?
   - Nilai 1-5: [__]
   
3. Inisiatif & Inovasi (Bobot 20%)
   - Contoh inisiatif yang diambil: [___]
   - Nilai 1-5: [__]
   
4. Kedisiplinan (Bobot 20%)
   - Tingkat kehadiran & ketepatan waktu
   - Nilai 1-5: [__]
```

### 9.7.2 Proses Penilaian

1. HR buat request penilaian untuk semua karyawan
2. Karyawan isi self-assessment
3. Manajer isi penilaian atasan
4. Meeting 1-on-1 untuk diskusi
5. Finalisasi nilai → Simpan di profil karyawan

---

## 9.8 Armada Kendaraan (Fleet)

### 9.8.1 Registrasi Kendaraan

**Armada → Kendaraan → Baru**

```
Nama          : Toyota Avanza 1.3G 2022
Plat Nomor    : B 1234 ABC
Pengemudi     : Pak Joko (Sales)
Perusahaan    : PT. Toko Berkah
Departemen    : Penjualan

Data Kendaraan:
  Merek/Model : Toyota Avanza
  Tahun       : 2022
  Warna       : Silver
  Bahan Bakar : Bensin
  Transmisi   : Otomatis
  
Dokumen:
  STNK Berlaku: 2027-03-15
  KIR Berlaku : 2026-09-20
  Asuransi    : 2026-12-31
```

### 9.8.2 Laporan Kilometer & BBM

Odoo 19 menambahkan **perhitungan kilometer rata-rata per bulan**:

```
Kendaraan: Toyota Avanza B 1234 ABC

Bulan   | Odometer Awal | Odometer Akhir | Jarak | BBM (liter)
────────┼───────────────┼────────────────┼───────┼────────────
Jan '26 |        45.200 |         47.500 |  2.300| 230 liter
Feb '26 |        47.500 |         49.100 |  1.600| 165 liter
Mar '26 |        49.100 |         51.800 |  2.700| 275 liter
────────┴───────────────┴────────────────┴───────┴────────────
Rata-rata km/bulan: 2.200 km
Konsumsi BBM rata-rata: 10 km/liter
```

---

## 9.9 Simulasi Lengkap: Siklus HR Karyawan Baru

**Skenario**: Merekrut Frontend Developer baru di PT. Toko Berkah

### Step 1: Buka Lowongan
```
Posisi: Frontend Developer
Tanggal Posting: 1 April 2026
Platform: Website Karir Perusahaan, LinkedIn, Jobstreet
```

### Step 2: Proses Lamaran (2 Minggu)
```
Lamaran masuk: 45 kandidat
Shortlist CV: 10 kandidat
Interview Tahap 1 (HR): 6 kandidat
Interview Tahap 2 (Technical): 3 kandidat
Interview Tahap 3 (CEO): 1 kandidat
```

### Step 3: Buat Penawaran Kerja
```
Kandidat Terpilih: Hendra Maju
Gaji: Rp 12.000.000/bulan
Mulai: 2 Mei 2026
Lokasi: Jakarta (WFH 3 hari/minggu)
```

### Step 4: Onboarding
```
2 Mei 2026:
  ✓ Tanda tangan kontrak
  ✓ Pengambilan foto & ID card
  ✓ Setup laptop & akun
  
3-4 Mei:
  ✓ Orientasi perusahaan
  ✓ Pengenalan tim IT
  ✓ Pelatihan sistem Odoo (2 hari)
  
5 Mei:
  ✓ Mulai proyek pertama
```

### Step 5: Penggajian Bulan Pertama (Prorata)
```
Masuk 2 Mei (22 hari kerja dari 22 hari = prorata penuh)
Gaji pokok: Rp 12.000.000
BPJS & PPh: dipotong
Slip gaji dikirim via email: 30 Mei 2026
```

---

[← Akuntansi](08-akuntansi.md) | [Berikutnya: Proyek →](10-proyek.md)
