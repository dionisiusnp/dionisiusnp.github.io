# Bab 08 — Akuntansi & Faktur

[← Manufaktur](07-manufaktur.md) | [Berikutnya: SDM →](09-sdm.md)

---

## 8.1 Gambaran Umum Akuntansi Odoo 19

Modul **Accounting** di Odoo 19 menyediakan sistem pembukuan double-entry penuh, manajemen faktur, rekonsiliasi bank otomatis, dan pelaporan keuangan. Odoo 19 meningkatkan kemampuan reconciliation model dan mendukung multi-mata uang dengan pembaruan kurs otomatis.

### Alur Akuntansi Utama
```
Faktur Penjualan → Pembayaran Diterima → Rekonsiliasi Bank → Laporan
Faktur Pembelian → Pembayaran Keluar  → Rekonsiliasi Bank → Laporan
Jurnal Umum → Buku Besar → Neraca / Laba Rugi
```

---

## 8.2 Pengaturan Akuntansi

### 8.2.1 Setup Awal Akuntansi

**Akuntansi → Konfigurasi → Pengaturan**

```
Mata Uang Utama   : IDR (Rupiah Indonesia)
Tahun Fiskal      : Januari - Desember
Metode Akuntansi  : Akrual (Accrual Basis)
Nomor Jurnal Auto : ✓
Lock Date         : Tanggal kunci per periode
```

### 8.2.2 Bagan Akun (Chart of Accounts)

**Akuntansi → Konfigurasi → Bagan Akun**

Odoo Indonesia menyediakan CoA standar:

```
1xxx — Aset
  1100 — Kas & Bank
    1101 — Kas Besar
    1102 — Bank BCA
    1103 — Bank Mandiri
  1200 — Piutang Usaha
  1300 — Persediaan
  1400 — Biaya Dibayar Dimuka
  1500 — Aset Tetap

2xxx — Liabilitas
  2100 — Hutang Usaha
  2200 — Hutang Pajak (PPN Keluaran)
  2300 — Hutang Jangka Panjang

3xxx — Ekuitas
  3100 — Modal Disetor
  3200 — Laba Ditahan

4xxx — Pendapatan
  4100 — Penjualan
  4200 — Pendapatan Lain

5xxx — Beban
  5100 — Harga Pokok Penjualan (HPP)
  5200 — Beban Operasional
  5300 — Beban Gaji
  5400 — Beban Penyusutan
```

### 8.2.3 Setup Pajak

**Akuntansi → Konfigurasi → Pajak**

**PPN 11%**:
```
Nama          : PPN 11%
Tipe Pajak    : Penjualan
Ruang Lingkup : PPN
Jumlah        : 11%
Grup Pajak    : PPN
Akun Pajak    : 2200 (PPN Keluaran)
```

**PPh 23 (Jasa)**:
```
Nama          : PPh 23 - Jasa 2%
Tipe Pajak    : Penjualan
Ruang Lingkup : Penghasilan
Jumlah        : -2% (pengurang)
Akun Pajak    : 2210 (PPh 23 Dipungut)
```

### 8.2.4 Jurnal

**Akuntansi → Konfigurasi → Jurnal**

```
Jurnal          | Tipe       | Akun Default
────────────────┼────────────┼─────────────────────
Penjualan       | Penjualan  | 4100 Penjualan
Pembelian       | Pembelian  | 5100 HPP
Bank BCA        | Bank       | 1102 Bank BCA
Bank Mandiri    | Bank       | 1103 Bank Mandiri
Kas             | Kas        | 1101 Kas Besar
Jurnal Umum     | Berbagai   | -
```

---

## 8.3 Faktur Penjualan (Customer Invoice)

### 8.3.1 Membuat Faktur Manual

**Akuntansi → Pelanggan → Faktur** → Klik **Baru**

```
Pelanggan     : PT. Mandiri Jaya
Tanggal Faktur: 22 April 2026
Tanggal Jatuh Tempo: 22 Mei 2026 (30 hari neto)
Jurnal        : Penjualan

Baris Faktur:
No | Akun | Produk                  | Qty | Harga    | PPN | Subtotal
───┼──────┼─────────────────────────┼─────┼──────────┼─────┼──────────
 1 │ 4100 │ Laptop ASUS VivoBook 14 │  10 │ 8.500.000│ 11% │ 85.000.000
 2 │ 4100 │ Mouse Wireless          │  10 │   350.000│ 11% │  3.500.000
────────────────────────────────────────────────────────────┼──────────
                                              Subtotal      │ 88.500.000
                                              PPN 11%       │  9.735.000
                                              TOTAL         │ 98.235.000
```

**Fitur Seksi di Faktur (Odoo 19)**:
- Sama seperti di penawaran, dapat tambahkan seksi dan sub-seksi
- Sembunyikan harga per seksi jika perlu

### 8.3.2 Faktur dari Sales Order

Jika SO sudah dikonfirmasi:
1. Buka SO → Klik **Buat Faktur**
2. Pilih:
   - **Invoice Biasa**: Semua qty
   - **Down Payment (%)**: Faktur DP persentase
   - **Down Payment (Jumlah Tetap)**: Faktur DP nominal

### 8.3.3 Kirim Faktur ke Pelanggan

1. Review faktur → Klik **Konfirmasi**
2. Klik **Kirim & Cetak**
3. Preview email + lampiran PDF
4. Klik **Kirim**

**Format Nomor Faktur Indonesia**:
```
Format: INV/[TAHUN]/[BULAN]/[NOMOR]
Contoh: INV/2026/04/0001
```

### 8.3.4 Rekap Piutang

**Akuntansi → Pelanggan → Piutang**

```
Pelanggan         | 30 Hari | 60 Hari | 90 Hari | >90 Hari | Total
──────────────────┼─────────┼─────────┼─────────┼──────────┼──────────────
PT. Mandiri Jaya  |  98jt   |    0    |    0    |     0    |    Rp 98jt
CV. Bersama Maju  |  45jt   |   20jt  |    0    |     0    |    Rp 65jt
Toko Ritel ABC    |   0     |    0    |   15jt  |   10jt   |    Rp 25jt
──────────────────┴─────────┴─────────┴─────────┴──────────┴──────────────
TOTAL             | 143jt   |   20jt  |   15jt  |   10jt   |   Rp 188jt
```

---

## 8.4 Faktur Vendor (Vendor Bill)

### 8.4.1 Membuat Faktur Vendor

**Akuntansi → Vendor → Faktur** → Klik **Baru**

```
Vendor        : PT. Distributor Elektronik Nusantara
No. Referensi : INV-DEN-2026-0456 (nomor dari vendor)
Tanggal Faktur: 20 April 2026
Jatuh Tempo   : 20 Mei 2026

Baris:
Laptop ASUS VivoBook 14  × 20 = Rp 136.000.000
PPN 11%                        = Rp  14.960.000
TOTAL                          = Rp 150.960.000
```

### 8.4.2 Upload & AI OCR `[Enterprise]`

1. **Akuntansi → Vendor → Faktur → Upload**
2. Drag & drop file PDF/scan faktur
3. AI Odoo membaca:
   - Nama vendor
   - Nomor faktur
   - Tanggal
   - Baris produk & harga
   - Total & pajak
4. Review → Konfirmasi → Hemat waktu input manual

---

## 8.5 Pembayaran

### 8.5.1 Catat Pembayaran dari Pelanggan

Saat terima transfer dari pelanggan:

1. Buka faktur pelanggan
2. Klik **Daftarkan Pembayaran**
3. Isi:
   ```
   Metode      : Bank Transfer
   Jurnal      : Bank BCA
   Jumlah      : Rp 98.235.000
   Tanggal     : 25 April 2026
   Memo        : Transfer PT. Mandiri Jaya - INV/2026/04/0001
   ```
4. Klik **Buat Pembayaran**
5. Faktur berubah status: **Lunas** ✓

### 8.5.2 Catat Pembayaran ke Vendor

1. Buka faktur vendor
2. Klik **Daftarkan Pembayaran**
3. Pilih jurnal bank yang digunakan
4. Input jumlah & tanggal transfer

### 8.5.3 Pembayaran Batch

Bayar beberapa vendor sekaligus:
1. **Akuntansi → Vendor → Faktur** → Pilih multiple faktur
2. Klik **Daftarkan Pembayaran**
3. Satu pembayaran batch dibuat

---

## 8.6 Rekonsiliasi Bank

### 8.6.1 Import Mutasi Bank

**Akuntansi → Bank → [pilih jurnal bank]**

1. Klik **Impor Mutasi**
2. Pilih format: OFX, QIF, CAMT.053, atau CSV
3. Upload file mutasi dari internet banking

### 8.6.2 Proses Rekonsiliasi

Odoo 19 otomatis mencocokkan transaksi:

```
Mutasi Bank                    | Pencocokan Odoo         | Status
───────────────────────────────┼─────────────────────────┼──────────
25/04 - Transfer PT. Mandiri   | INV/2026/04/0001 - 98jt | ✓ Otomatis
23/04 - Transfer CV. Bersama   | INV/2026/04/0003 - 65jt | ✓ Otomatis
22/04 - Bank Fee               | [Biaya Bank - Aturan]   | ✓ Model
20/04 - Transfer Gaji Karyawan | [Tidak cocok otomatis]  | ⚠ Manual
```

**Untuk transaksi tidak cocok otomatis**:
1. Klik transaksi
2. Cari/pilih entri yang cocok dari dropdown
3. Atau buat jurnal baru langsung

### 8.6.3 Model Rekonsiliasi

**Akuntansi → Konfigurasi → Model Rekonsiliasi** → Klik **Baru**

```
Nama           : Biaya Admin Bank BCA
Tipe           : Aturan
Kondisi        :
  - Label mengandung: "BIAYA ADMIN"
  - Jumlah: < Rp 100.000
Tindakan:
  - Buat jurnal ke akun: 5210 (Beban Administrasi Bank)
  - Pajak: Tidak ada
```

Setelah model dibuat, Odoo otomatis proses semua biaya admin bank tanpa input manual.

---

## 8.7 Multi-Mata Uang

### 8.7.1 Aktifkan Multi-Mata Uang

**Akuntansi → Konfigurasi → Pengaturan → Multi-Mata Uang**

```
Aktifkan: ✓
Pembaruan Kurs: Otomatis (setiap hari dari ECB/BI)
```

### 8.7.2 Faktur dalam USD

```
Pelanggan     : Acme Corp (USA)
Mata Uang     : USD
Kurs Hari Ini : 1 USD = Rp 16.200

Produk: Software License x5 = USD 500
Pajak: 11%
Total (USD): USD 555
Total (IDR): Rp 8.991.000 (kurs hari ini)
```

### 8.7.3 Selisih Kurs

Jika kurs berubah antara faktur dan pembayaran:

```
Faktur: USD 555 @ kurs 16.200 = Rp 8.991.000
Bayar : USD 555 @ kurs 16.350 = Rp 9.074.250

Selisih kurs (Rugi): Rp 83.250
→ Otomatis dijurnal ke akun "Kerugian Kurs" (6110)
```

---

## 8.8 Laporan Keuangan

### 8.8.1 Laporan Laba Rugi

**Akuntansi → Pelaporan → Laba Rugi**

```
PT. TOKO BERKAH
LAPORAN LABA RUGI
Periode: 1 Januari - 31 Maret 2026

PENDAPATAN
  Penjualan                          Rp 4.200.000.000
  Pendapatan Lain                    Rp    50.000.000
TOTAL PENDAPATAN                     Rp 4.250.000.000

BEBAN POKOK PENJUALAN
  HPP Produk                         Rp 3.000.000.000
LABA KOTOR                           Rp 1.250.000.000

BEBAN OPERASIONAL
  Gaji & Upah                        Rp   350.000.000
  Sewa Kantor                        Rp    60.000.000
  Listrik & Air                      Rp    15.000.000
  Pemasaran                          Rp    45.000.000
  Penyusutan                         Rp    20.000.000
  Beban Lain                         Rp    25.000.000
TOTAL BEBAN OPERASIONAL              Rp   515.000.000

LABA OPERASIONAL                     Rp   735.000.000
Beban Pajak (25%)                    Rp   183.750.000
LABA BERSIH                          Rp   551.250.000
```

### 8.8.2 Neraca (Balance Sheet)

**Akuntansi → Pelaporan → Neraca**

```
ASET
  Aset Lancar
    Kas & Bank                       Rp 1.200.000.000
    Piutang Usaha                    Rp   188.000.000
    Persediaan                       Rp   450.000.000
  Total Aset Lancar                  Rp 1.838.000.000

  Aset Tetap
    Peralatan (netto)                Rp   320.000.000
  Total Aset                         Rp 2.158.000.000

LIABILITAS & EKUITAS
  Hutang Usaha                       Rp   215.000.000
  Hutang Pajak                       Rp    85.000.000
  Modal Disetor                      Rp 1.000.000.000
  Laba Ditahan                       Rp   858.000.000
  TOTAL LIABILITAS & EKUITAS         Rp 2.158.000.000
```

### 8.8.3 Laporan Arus Kas

**Akuntansi → Pelaporan → Arus Kas**

```
AKTIVITAS OPERASI                    Rp   650.000.000
AKTIVITAS INVESTASI                  Rp  (120.000.000)
AKTIVITAS PENDANAAN                  Rp   (50.000.000)
KENAIKAN KAS BERSIH                  Rp   480.000.000
```

### 8.8.4 Laporan Pajak

**Akuntansi → Pelaporan → Laporan Pajak**

```
Masa Pajak: Maret 2026

PPN Keluaran (dari penjualan):  Rp  46.200.000
PPN Masukan (dari pembelian):   Rp  33.000.000
PPN KURANG BAYAR:               Rp  13.200.000
```

---

## 8.9 Periode Akuntansi & Tutup Buku

### 8.9.1 Kunci Periode

Setelah selesai rekonsiliasi bulan ini:
1. **Akuntansi → Konfigurasi → Pengaturan**
2. Set **Tanggal Kunci**: 31 Maret 2026
3. Tidak ada jurnal yang bisa dibuat sebelum tanggal ini

### 8.9.2 Proses Tutup Buku Tahunan

1. Pastikan semua rekonsiliasi bank selesai
2. Posting penyesuaian akhir tahun
3. Jalankan **Tutup Tahun Fiskal**
4. Odoo otomatis buat jurnal penutup:
   - Tutup akun pendapatan → Laba Ditahan
   - Tutup akun beban → Laba Ditahan
5. Tahun baru dimulai dengan saldo bersih

---

## 8.10 Simulasi Lengkap: Siklus Akuntansi Sebulan

**Skenario**: April 2026 — PT. Toko Berkah

### Transaksi yang Terjadi:
1. Jual 10 Laptop → Faktur Rp 98jt (PT. Mandiri)
2. Beli 20 Laptop → Faktur Rp 151jt (PT. DEN)
3. Bayar gaji → Rp 45jt
4. Terima pembayaran dari PT. Mandiri → Rp 98jt
5. Bayar ke PT. DEN → Rp 151jt

### Jurnal Otomatis yang Dibuat Odoo:

```
1) Konfirmasi Faktur Penjualan:
   Dr. Piutang Usaha    98.235.000
   Cr. Penjualan                    88.500.000
   Cr. PPN Keluaran                  9.735.000

2) Konfirmasi Faktur Pembelian:
   Dr. Persediaan      136.000.000
   Dr. PPN Masukan      14.960.000
   Cr. Hutang Usaha                150.960.000

3) Catat Pembayaran Gaji:
   Dr. Beban Gaji       45.000.000
   Cr. Bank BCA                     45.000.000

4) Terima Pembayaran Pelanggan:
   Dr. Bank BCA         98.235.000
   Cr. Piutang Usaha                98.235.000

5) Bayar Vendor:
   Dr. Hutang Usaha    150.960.000
   Cr. Bank BCA                    150.960.000
```

### Rekonsiliasi Bank:
- Import mutasi Bank BCA April 2026
- Odoo cocokkan otomatis: 4/5 transaksi
- 1 transaksi manual (transfer antar rekening)

### Laporan Akhir Bulan:
- Laba Kotor April: Rp 9.735.000 (dari 10 laptop)
- Beban Gaji: Rp 45.000.000
- Laba Bersih April: negatif (karena pembelian besar & gaji)

---

[← Manufaktur](07-manufaktur.md) | [Berikutnya: SDM →](09-sdm.md)
