# Bab 07 — Manufaktur (MRP)

[← Inventaris](06-inventaris.md) | [Berikutnya: Akuntansi →](08-akuntansi.md)

---

## 7.1 Gambaran Umum Manufaktur Odoo 19

Modul **Manufacturing** (MRP - Material Requirements Planning) di Odoo 19 mengelola seluruh proses produksi — dari perencanaan kebutuhan bahan baku, bill of materials (BOM), work order, hingga pelaporan biaya produksi. Odoo 19 meningkatkan kemampuan Master Production Schedule (MPS) dan manajemen BOM multi-level.

### Alur Manufaktur
```
Kebutuhan Produksi
    → BOM (Bill of Materials)
        → Manufacturing Order (MO)
            → Reservasi Komponen
                → Work Orders (per Work Center)
                    → Quality Check
                        → Produk Jadi
                            → Masuk Stok
```

---

## 7.2 Pengaturan Manufaktur

**Manufaktur → Konfigurasi → Pengaturan**

### 7.2.1 Opsi Produksi

| Pengaturan | Keterangan |
|-----------|-----------|
| **Work Order** | Aktifkan routing multi-operasi |
| **Work Center** | Mesin/stasiun kerja |
| **Kapasitas** | Tentukan kapasitas per work center |
| **Subkontrak** | Produksi sebagian di vendor |
| **Produk Sampingan** | Produk tambahan dari proses produksi |
| **Kontrol Kualitas** | Pemeriksaan kualitas dalam proses |

---

## 7.3 Bill of Materials (BOM)

### 7.3.1 Membuat BOM

**Manufaktur → Produk → Bill of Materials** → Klik **Baru**

**BOM Sederhana — Meja Kerja Kayu**:
```
Produk     : Meja Kerja Kayu (150x75cm)
Tipe BOM   : Manufaktur
Qty        : 1 pcs
Versi      : 1.0

Komponen:
No | Produk               | Qty  | UoM   | Catatan
───┼──────────────────────┼──────┼───────┼─────────────────
 1 │ Papan Kayu Jati (2m) │  4   │ lembar│ Untuk permukaan
 2 │ Besi Hollow 4cm      │ 12   │ batang│ Untuk kaki
 3 │ Baut M6              │ 32   │ pcs   │
 4 │ Cat Kayu Coklat      │  1   │ liter │
 5 │ Amplas 120           │  2   │ lembar│

Operasi:
No | Operasi          | Work Center  | Durasi
───┼──────────────────┼──────────────┼─────────
 1 │ Potong Kayu      │ Mesin Gergaji│ 30 menit
 2 │ Las Rangka Besi  │ Mesin Las    │ 45 menit
 3 │ Pasang Papan     │ Manual       │ 60 menit
 4 │ Amplas & Cat     │ Manual       │ 90 menit
```

### 7.3.2 Tipe BOM

| Tipe | Keterangan | Contoh |
|------|-----------|--------|
| **Manufaktur** | BOM standar untuk produksi | Perakitan produk |
| **Kit** | Dijual sebagai bundle tanpa produksi | Bundle aksesoris |
| **Subkontrak** | BOM untuk vendor subkon | Komponen outsource |
| **Phantom** | BOM semi-jadi (tidak punya stok sendiri) | Sub-assembly |

### 7.3.3 BOM Multi-Level

Untuk produk dengan komponen yang juga diproduksi:

```
Produk Jadi: Komputer Rakitan
├── BOM Komputer Rakitan
│   ├── Casing (1x)           ← Beli dari vendor
│   ├── Motherboard (1x)      ← Beli dari vendor
│   ├── RAM 16GB (2x)         ← Beli dari vendor
│   ├── SSD 512GB (1x)        ← Beli dari vendor
│   ├── Power Supply (1x)     ← Beli dari vendor
│   └── Kabel Bundle (1x)     ← DIPRODUKSI SENDIRI
│       └── BOM Kabel Bundle
│           ├── Kabel SATA (3x)
│           ├── Kabel Power (2x)
│           └── Tie Kabel (5x)
```

**Cara Buat BOM Multi-Level**:
1. Buat BOM untuk "Kabel Bundle" (produk semi-jadi)
2. Di BOM "Komputer Rakitan", tambahkan "Kabel Bundle"
3. Odoo otomatis kenali sebagai sub-manufacturing order

### 7.3.4 BOM dengan Varian Produk

```
Produk: Meja Kerja (Pilihan Warna & Ukuran)

BOM per Varian:
  Meja Natural - 120cm: Komponen A
  Meja Natural - 150cm: Komponen A + Papan Tambahan
  Meja Dark Oak - 120cm: Komponen A + Cat Gelap
  Meja Dark Oak - 150cm: Komponen A + Papan Tambahan + Cat Gelap
```

---

## 7.4 Work Center

### 7.4.1 Membuat Work Center

**Manufaktur → Konfigurasi → Work Center** → Klik **Baru**

```
Nama              : Mesin CNC Router
Kode              : CNC-01
Jam Kerja         : Senin-Jumat 08:00-17:00
Kapasitas         : 1 (mesin)
Efisiensi         : 85%
Waktu Persiapan   : 15 menit
Waktu Bersih-bersih: 10 menit

Biaya Jam Kerja   : Rp 150.000/jam
Akun Biaya        : 5120 (Biaya Produksi Mesin)
```

### 7.4.2 Dashboard Work Center

**Manufaktur → Work Center**

Tampilkan:
- Work order yang sedang berjalan
- Antrian work order berikutnya
- Utilisasi kapasitas (%)
- Efisiensi aktual vs. target

---

## 7.5 Manufacturing Order (MO)

### 7.5.1 Membuat MO Manual

**Manufaktur → Operasi → Manufacturing Orders** → Klik **Baru**

```
Produk           : Meja Kerja Kayu 150cm
BOM              : [Otomatis terisi dari produk]
Qty              : 10 unit
Tanggal Mulai    : 25 April 2026
Tenggat          : 30 April 2026
Penanggung Jawab : Pak Hendra (Supervisor Produksi)
Gudang           : Pabrik Cikarang
```

### 7.5.2 Status MO

```
Konfirmasi → Dikonfirmasi → Dalam Proses → Selesai
                              ↓
                    [Pesan Komponen jika kurang]
```

### 7.5.3 Reservasi Komponen

Setelah MO dikonfirmasi:
1. Klik **Cek Ketersediaan**
2. Odoo cek stok semua komponen

```
Komponen              | Diperlukan | Tersedia | Status
──────────────────────┼────────────┼──────────┼────────────
Papan Kayu Jati (2m)  |         40 |       50 | ✓ Tersedia
Besi Hollow 4cm       |        120 |       80 | ✗ Kurang 40
Baut M6               |        320 |      500 | ✓ Tersedia
Cat Kayu Coklat       |         10 |        5 | ✗ Kurang 5
Amplas 120            |         20 |       30 | ✓ Tersedia
```

**Jika ada komponen kurang**:
- Klik **Pesan Komponen** → Odoo buat RFQ ke vendor untuk komponen kurang
- Atau buat MO untuk komponen yang diproduksi sendiri

### 7.5.4 Proses Produksi

1. Klik **Konfirmasi**
2. Di tab **Work Orders**:
   ```
   Operasi 1: Potong Kayu
     → Work Center: Mesin Gergaji
     → Mulai timer: [▶]
     → Selesai: [✓] Durasi aktual: 32 menit
   
   Operasi 2: Las Rangka
     → Work Center: Mesin Las
     → [▶] ... [✓] Durasi aktual: 50 menit
   
   ...dst
   ```
3. Setelah semua work order selesai → Klik **Produksi**
4. Input qty yang berhasil diproduksi: 9 (1 rusak)
5. Klik **Tandai Selesai**

**Catatan Kehilangan (Scrap)**:
- 1 unit rusak → Klik **Scrap**
- Pilih alasan: Material Cacat / Operator Error
- Qty komponen yang terpakai tetap tercatat

---

## 7.6 Master Production Schedule (MPS)

### 7.6.1 Apa Itu MPS?

MPS adalah alat perencanaan produksi jangka menengah yang membantu Anda:
- Merencanakan produksi beberapa minggu/bulan ke depan
- Memastikan bahan baku tersedia tepat waktu
- Mengoptimalkan kapasitas produksi

### 7.6.2 Konfigurasi MPS

**Manufaktur → Konfigurasi → Master Production Schedule**:
```
Frekuensi       : Mingguan
Horizon         : 3 bulan ke depan
Produk          : [Pilih produk yang direncanakan]
```

### 7.6.3 Menggunakan MPS

**Manufaktur → Perencanaan → Master Production Schedule**

```
Produk: Meja Kerja Kayu | Apr W4 | Mei W1 | Mei W2 | Mei W3
─────────────────────────┼────────┼────────┼────────┼────────
Permintaan Aktual        |     10 |      8 |     12 |      6
Stok Awal                |      5 |      0 |     -2 |      1
MO yang Sudah Ada        |     10 |      0 |     15 |      0
Stok Akhir Proyeksi      |      5 |     -2 |      1 |     -5
─────────────────────────┴────────┴────────┴────────┴────────
Sarankan Produksi        |      0 |     10 |      0 |     10
```

Klik **Launchkan MO** untuk periode yang perlu ditambah produksi.

---

## 7.7 Subkontrak

### 7.7.1 Setup Subkontrak

**Untuk produk yang sebagian produksinya diserahkan ke vendor**:

1. Buat BOM dengan tipe **Subkontrak**
2. Tentukan vendor subkontraktor
3. Tambahkan komponen yang akan dikirim ke vendor

### 7.7.2 Alur Subkontrak

```
SO / MO → PO ke Vendor Subkon → Kirim Komponen ke Vendor
         → Vendor Produksi → Terima Produk Jadi
         → Invoice Vendor → Bayar
```

**Contoh**:
```
Kita punya: Bahan Baku (Kain & Benang)
Vendor subkon: CV. Jahit Indah
Mereka produksi: Seragam Karyawan

1. PO dibuat untuk "Jasa Jahit Seragam" ke CV. Jahit Indah
2. Kirim kain & benang ke CV. Jahit Indah
3. 7 hari kemudian: terima seragam jadi
4. Bayar jasa jahit ke CV. Jahit Indah
```

---

## 7.8 Kontrol Kualitas dalam Manufaktur

### 7.8.1 Quality Control Points (QCP)

**Kualitas → Konfigurasi → QCP** → Klik **Baru**

```
Produk           : Meja Kerja Kayu
Operasi          : Pembuatan [Manufaktur]
Titik Kontrol    : Pada Produk Selesai (atau Per Operasi)

Tipe Pemeriksaan : Instruksi
Instruksi        : "Cek semua sambungan baut. Goyang meja — tidak boleh bergoyang."

Atau:
Tipe Pemeriksaan : Pengukuran
Parameter        : Tinggi Meja
Min Toleransi    : 74.5 cm
Maks Toleransi   : 75.5 cm
```

### 7.8.2 Proses Quality Check

Saat produksi mencapai titik QC:
1. Pop-up quality check muncul
2. Petugas QC mengisi hasil
3. **LULUS** → Produksi lanjut
4. **GAGAL** → Alert muncul → Supervisor dinotifikasi

---

## 7.9 Pelaporan Manufaktur

### 7.9.1 Laporan Produksi

```
Bulan April 2026 — Laporan Produksi

Produk              | MO Selesai | Qty Target | Qty Aktual | Efisiensi
────────────────────┼────────────┼────────────┼────────────┼──────────
Meja Kerja Kayu     |          8 |         80 |         78 |     97.5%
Kursi Kerja         |         12 |         60 |         59 |     98.3%
Lemari Arsip        |          3 |         15 |         14 |     93.3%
```

### 7.9.2 Analisis Biaya Produksi

```
MO: Meja Kerja Kayu x10

Komponen          | Qty | Harga/Unit | Total
──────────────────┼─────┼────────────┼────────────
Papan Kayu Jati   |  40 | Rp 125.000 | Rp 5.000.000
Besi Hollow       | 120 | Rp  15.000 | Rp 1.800.000
Baut M6           | 320 | Rp    1.500 | Rp   480.000
Cat Kayu          |  10 | Rp  45.000 | Rp   450.000
─────────────────────────────────────┼────────────
Biaya Material Total                 | Rp 7.730.000
─────────────────────────────────────┼────────────
Tenaga Kerja (30 jam × Rp 50.000)   | Rp 1.500.000
Overhead Mesin (5 jam × Rp 150.000) | Rp   750.000
─────────────────────────────────────┼────────────
TOTAL BIAYA PRODUKSI                 | Rp 9.980.000
BIAYA PER UNIT (10 meja)             | Rp   998.000
```

---

## 7.10 Simulasi Lengkap: Produksi Furnitur

**Skenario**: CV. Kayu Indah menerima pesanan 20 meja kerja dari pelanggan.

### Step 1: Sales Order Masuk
```
SO-2026-0200: 20 unit Meja Kerja Kayu 150cm
Tanggal Pengiriman: 15 Mei 2026
```

### Step 2: Buat Manufacturing Order
1. Dari SO, klik **Buat Komponen** atau buat MO manual
2. MO: 20 unit Meja Kerja Kayu
3. BOM otomatis terpilih

### Step 3: Cek Kebutuhan Material
```
Komponen yang Dibutuhkan:
  - Papan Kayu Jati (2m): 80 lembar → Stok: 45 → KURANG 35
  - Besi Hollow: 240 batang → Stok: 300 → CUKUP ✓
  - Baut M6: 640 pcs → Stok: 1000 → CUKUP ✓
  - Cat Kayu: 20 liter → Stok: 8 → KURANG 12
```

### Step 4: Beli Bahan Kurang
1. Klik **Pesan Komponen**
2. RFQ dibuat:
   - Papan Kayu Jati 35 lembar → PT. Kayu Jaya
   - Cat Kayu 12 liter → Toko Cat Mulia
3. Konfirmasi PO → Tunggu pengiriman

### Step 5: Mulai Produksi (Bahan Sudah Lengkap)
```
Work Order 1: Potong Kayu (2 hari)
  Operator: Pak Budi
  Mulai: 2 Mei, Selesai: 3 Mei

Work Order 2: Las Rangka (2 hari)  
  Operator: Pak Anton (Welder)
  Mulai: 4 Mei, Selesai: 5 Mei

Work Order 3: Pasang & Finishing (3 hari)
  Operator: Pak Hendra
  Mulai: 6 Mei, Selesai: 8 Mei
```

### Step 6: Quality Check
- 20 meja diperiksa: semua lulus ✓
- 1 meja ada baut longgar → diperbaiki → lulus

### Step 7: Selesai & Kirim
```
MO Selesai: 20 Meja Kayu → Masuk Stok
Tanggal: 8 Mei 2026

Transfer ke Pengiriman:
  20 Meja → Dikirim ke pelanggan 10 Mei 2026 (5 hari sebelum deadline) ✓
```

---

[← Inventaris](06-inventaris.md) | [Berikutnya: Akuntansi →](08-akuntansi.md)
