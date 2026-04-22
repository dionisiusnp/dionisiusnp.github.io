# Bab 16 — Odoo Studio: Kustomisasi Tanpa Kode

[← AI & Otomatisasi](15-ai-otomatisasi.md) | [Berikutnya: Migrasi →](17-migrasi.md)

---

## 16.1 Gambaran Umum Studio `[Enterprise]`

**Odoo Studio** adalah alat kustomisasi berbasis drag & drop yang memungkinkan Anda memodifikasi tampilan, form, field, dan workflow Odoo **tanpa menulis kode Python sama sekali**. Odoo 19 meningkatkan Studio dengan integrasi AI untuk prediksi field, auto-konfigurasi view, dan AI Server Actions.

### Kapan Gunakan Studio vs. Custom Development?

| Situasi | Solusi |
|---------|--------|
| Tambah field baru ke form | ✓ Studio |
| Ubah tampilan list | ✓ Studio |
| Tambah tab baru di form | ✓ Studio |
| Buat laporan PDF kustom | ✓ Studio |
| Aturan otomatis sederhana | ✓ Studio |
| Logika bisnis Python kompleks | ✗ Custom Development |
| Integrasi API eksternal | ✗ Custom Development |
| Kalkulasi multi-tabel kompleks | ✗ Custom Development |

---

## 16.2 Mengakses Studio

### 16.2.1 Cara Buka Studio

**Cara 1** — Dari icon Studio:
1. Klik ikon **Studio** (pensil) di pojok kanan atas saat di dalam aplikasi apapun

**Cara 2** — Dari menu:
1. Masuk ke **Studio** dari menu aplikasi utama

**Cara 3** — Shortcut keyboard:
- `Ctrl+Alt+S` (tergantung pengaturan)

---

## 16.3 Kustomisasi Form View

### 16.3.1 Antarmuka Studio

Saat Studio aktif, antarmuka berubah:

```
┌────────────────────────────────────────────────────────────┐
│  ◀ [Kembali ke Aplikasi]         [Modus: Form View]   ✏    │
├──────────────────┬─────────────────────────────────────────┤
│  PANEL KIRI      │  FORM PREVIEW (Dapat Diedit)            │
│                  │                                          │
│  Field Baru:     │  ┌────────────────────────────────────┐ │
│  ○ Teks          │  │ Nama Pelanggan  [______________]   │ │
│  ○ Angka         │  │ Telepon         [______________]   │ │
│  ○ Tanggal       │  │ Email           [______________]   │ │
│  ○ Pilihan       │  │ [+ Drop Field Here]               │ │
│  ○ Many2one      │  └────────────────────────────────────┘ │
│  ○ Checkbox      │                                          │
│  ○ File          │  [Tab: Informasi]  [Tab: Catatan]        │
│                  │                                          │
│  [Otomatisasi]   │                                          │
│  [Tampilan]      │                                          │
└──────────────────┴─────────────────────────────────────────┘
```

### 16.3.2 Tambah Field Baru

**Skenario**: Tambah field "Kategori Pelanggan" di form kontak.

1. Buka **Kontak → Studio**
2. Di panel kiri, pilih tipe field: **Pilihan (Selection)**
3. Seret ke form, letakkan di samping "Perusahaan"
4. Konfigurasi field:
   ```
   Nama Field (teknis): x_customer_category
   Label             : Kategori Pelanggan
   Pilihan           :
     - distributor  → Distributor
     - reseller     → Reseller
     - end_user     → Pengguna Akhir
     - government   → Instansi Pemerintah
   Required          : ✗ (opsional)
   Default           : end_user
   ```
5. Klik **Konfirmasi** → Field tersimpan

**Tipe Field yang Tersedia**:
| Tipe | Keterangan | Contoh |
|------|-----------|--------|
| **Text** | Teks satu baris | Nama, Kode |
| **Text Panjang** | Teks multi-baris | Deskripsi, Catatan |
| **Angka** | Integer | Qty, Jumlah |
| **Desimal** | Bilangan desimal | Harga, Berat |
| **Moneter** | Dengan mata uang | Nilai kontrak |
| **Tanggal** | Tanggal saja | Tanggal lahir |
| **Tanggal & Waktu** | Tanggal + jam | Jadwal |
| **Checkbox** | True/False | Status aktif |
| **Pilihan** | Dropdown tetap | Status, Kategori |
| **Many2one** | Relasi ke model lain | Pelanggan, Produk |
| **Many2many** | Banyak-ke-banyak | Tag, Kategori |
| **One2many** | Daftar terkait | Baris faktur |
| **Gambar** | Upload foto | Foto karyawan |
| **File** | Upload dokumen | Kontrak |
| **HTML** | Rich text | Deskripsi produk |
| **AI** | Diisi AI otomatis | Ringkasan |

---

## 16.4 Kustomisasi Tampilan Lainnya

### 16.4.1 List View

1. Buka modul → Studio → Klik **List**
2. Tambah/hapus kolom dengan drag & drop
3. Ubah urutan kolom
4. Tambah kolom kalkulasi

```
Tampilan List CRM Sebelum:
  Nama Peluang | Pelanggan | Tahap | Pendapatan

Setelah Kustomisasi:
  Nama Peluang | Pelanggan | Kategori | Kota | Tahap | Prob.% | Pendapatan | Penjual
```

### 16.4.2 Kanban View

1. Studio → Klik **Kanban**
2. Edit kartu Kanban:
   - Ubah field yang ditampilkan di kartu
   - Tambah progress bar
   - Ubah warna berdasarkan kondisi

### 16.4.3 Search Filters & Group By

Tambah opsi filter kustom:
1. Studio → Klik **Search**
2. Tambah **Filter**:
   ```
   Nama     : Pelanggan Enterprise
   Kondisi  : x_customer_category = 'government'
   ```
3. Tambah **Group By**:
   ```
   Nama     : Per Kategori Pelanggan
   Field    : x_customer_category
   ```

---

## 16.5 Aturan Kondisional (Conditional Properties)

Odoo 19 Studio mendukung kondisi dinamis untuk field:

### 16.5.1 Field Wajib Berdasarkan Kondisi

```
Field: NPWP
Kondisi Wajib: Tipe = "Perusahaan"
(Jika tipe = Individu, NPWP tidak wajib)
```

### 16.5.2 Field Read-Only Berdasarkan Kondisi

```
Field: Harga
Read-only jika: Status = "Dikonfirmasi" (tidak bisa edit)
Dapat diedit jika: Status = "Draft"
```

### 16.5.3 Field Tersembunyi Berdasarkan Kondisi

```
Field: Catatan Retur
Tampil jika: Ada pengembalian produk = True
Tersembunyi jika: Ada pengembalian = False
```

**Cara Setup**:
1. Klik field di Studio
2. Di panel kanan → **Properti**
3. Klik **Tambah Kondisi** di bagian "Required / Readonly / Invisible"
4. Isi kondisi

---

## 16.6 Membuat Laporan PDF Kustom

### 16.6.1 Akses Report Builder

Studio → Klik **Laporan (Reports)**

### 16.6.2 Buat Template Laporan

**Contoh: Laporan Surat Jalan Kustom**

1. Dari modul Delivery Order → Studio → Reports
2. Pilih template yang ada atau buat baru
3. Desain dengan drag & drop:

```
[HEADER]
  Logo Perusahaan    |  SURAT JALAN
  Nama & Alamat      |  No: {name}
  Perusahaan         |  Tanggal: {date}

[INFORMASI PENGIRIMAN]
  Pengirim  : {company.name}
  Penerima  : {partner_id.name}
  Alamat    : {partner_id.street}, {partner_id.city}
  Telepon   : {partner_id.phone}

[TABEL PRODUK]
  No | Produk | Qty | Satuan | Keterangan
  ───┼────────┼─────┼────────┼───────────
  {untuk setiap move_line}
  {line.sequence} | {line.product_id.name} | {line.qty_done} | {line.product_uom.name} | {line.description}

[FOOTER]
  Penyerah              | Penerima
  ___________________   | ___________________
  ({nama_kasir})        | ({nama_penerima})
  Tanggal: ___________  | Tanggal: ___________
```

---

## 16.7 Membuat Aplikasi Baru dengan Studio

Studio juga bisa digunakan untuk membuat aplikasi/modul baru dari awal.

### 16.7.1 Contoh: Modul Manajemen Aset Sederhana

**Langkah 1**: Buka Studio → **Buat Aplikasi Baru**

```
Nama Aplikasi : Manajemen Aset
Menu          : Aset
Ikon          : 🏭
```

**Langkah 2**: Studio otomatis buat model kosong

**Langkah 3**: Tambah Field

```
Field yang perlu dibuat:
  - Nama Aset (Text, Required)
  - Kategori (Selection: Mesin/Kendaraan/Elektronik/Furniture)
  - Serial Number (Text)
  - Tanggal Pembelian (Date)
  - Nilai Beli (Monetary)
  - Kondisi (Selection: Baik/Perlu Servis/Rusak)
  - Lokasi (Many2one → res.partner atau location)
  - Penanggung Jawab (Many2one → hr.employee)
  - Foto (Image)
  - Catatan (Text Panjang)
```

**Langkah 4**: Atur Tampilan

```
List View: Nama | Kategori | Kondisi | Lokasi | PJ
Kanban  : Kelompok per Kondisi (Baik/Servis/Rusak)
Form    : Layout 2 kolom + Tab (Dokumen, Riwayat)
```

**Langkah 5**: Tambah Aturan Otomatis

```
Otomasi: Notifikasi Kondisi Rusak
  Trigger: Field "Kondisi" berubah ke "Rusak"
  Aksi   : Buat tiket Helpdesk + Notifikasi ke PJ
```

**Langkah 6**: Simpan & Test

---

## 16.8 AI di Studio (Fitur Odoo 19)

### 16.8.1 AI Auto-Field Generation

Saat membuat field baru:
1. Ketik deskripsi: "Saya perlu field untuk menyimpan nomor registrasi kendaraan"
2. AI saran:
   ```
   Tipe    : Text
   Nama    : x_vehicle_registration
   Label   : No. Registrasi
   Format  : Regex validation untuk format plat nomor
   ```

### 16.8.2 AI View Auto-Configuration

Saat membuat list/kanban baru:
1. AI menganalisis field yang ada
2. Saran kolom yang paling relevan untuk ditampilkan
3. Auto-arrange berdasarkan prioritas data

### 16.8.3 AI Prediction untuk Many2one

Saat tambah relasi ke model lain:
1. Ketik: "Tambah field relasi ke pelanggan"
2. AI otomatis saran: `res.partner` sebagai model target
3. Filter default: `is_company = True`

---

## 16.9 Perbedaan Studio vs. Custom Module

**Kapan Studio sudah cukup**:
```
✓ Tambah field baru di model yang ada
✓ Ubah tampilan form/list/kanban
✓ Buat filter dan group-by kustom
✓ Aturan otomatis sederhana
✓ Laporan PDF kustom
✓ Aplikasi sederhana (CRUD) baru
✓ Workflow linear sederhana
```

**Kapan perlu Custom Module (Python)**:
```
✗ Kalkulasi kompleks multi-table
✗ Override method default Odoo
✗ Integrasi API eksternal (payment, logistics)
✗ Perubahan pada model core yang tidak didukung Studio
✗ Performa tinggi untuk data besar
✗ Multi-company dengan logika berbeda
```

---

## 16.10 Best Practices Penggunaan Studio

### 16.10.1 Dokumentasi Kustomisasi

Selalu dokumentasikan setiap kustomisasi Studio:
```
Tanggal   : 22 April 2026
Oleh      : Admin Budi
Modul     : CRM
Perubahan : Tambah field "Kategori Pelanggan" (x_customer_category)
Alasan    : Kebutuhan segmentasi laporan per kategori
Test      : Diuji di staging, OK
```

### 16.10.2 Selalu Test di Staging

1. Setup server staging (terpisah dari produksi)
2. Buat semua kustomisasi di staging
3. Test semua scenario
4. Deploy ke produksi setelah approved

### 16.10.3 Backup Sebelum Kustomisasi Besar

```bash
# Backup database sebelum kustomisasi besar
pg_dump -U odoo nama_database > backup_before_studio_$(date +%Y%m%d).sql
```

### 16.10.4 Hindari Over-Kustomisasi

- Terlalu banyak kustomisasi → upgrade Odoo jadi sulit
- Pertimbangkan dulu apakah fitur default Odoo sudah cukup
- "Less is more" dalam kustomisasi ERP

---

## 16.11 Simulasi: Kustomisasi CRM untuk Toko Berkah

**Kebutuhan**: Tim sales butuh field tambahan di peluang CRM untuk tracking industri dan kompetitor.

### Step 1: Buka Studio di CRM Pipeline
```
CRM → Buka Peluang mana saja → Klik ikon Studio
```

### Step 2: Tambah Field "Industri Pelanggan"
```
Tipe  : Pilihan (Selection)
Label : Industri Pelanggan
Pilihan:
  - manufacturing → Manufaktur
  - retail        → Ritel/Perdagangan
  - services      → Jasa/Layanan
  - government    → Pemerintahan
  - education     → Pendidikan
  - healthcare    → Kesehatan
Posisi: Setelah field "Sumber"
```

### Step 3: Tambah Field "Kompetitor"
```
Tipe  : Many2many → res.partner
Label : Kompetitor
Filter: Tag = "Kompetitor"
Posisi: Tab baru "Analisis Kompetitif"
```

### Step 4: Tambah Field "Alasan Pemilihan Kami"
```
Tipe  : Teks Panjang
Label : Mengapa Memilih Kami?
Posisi: Tab "Analisis Kompetitif"
Visible jika: Tahap = Menang
```

### Step 5: Tambah Filter di Pencarian
```
Filter: Per Industri → Group By: Industri Pelanggan
```

### Step 6: Update Laporan Pipeline
```
Laporan lama: Nama | Pelanggan | Nilai
Laporan baru: Nama | Pelanggan | Industri | Kompetitor | Nilai | Prob
```

**Hasil**: Tim sales bisa analisis pipeline per industri dan tracking kompetitor untuk strategi penjualan.

---

[← AI & Otomatisasi](15-ai-otomatisasi.md) | [Berikutnya: Migrasi →](17-migrasi.md)
