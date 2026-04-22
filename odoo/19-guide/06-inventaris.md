# Bab 06 — Inventaris & Manajemen Gudang

[← Pembelian](05-pembelian.md) | [Berikutnya: Manufaktur →](07-manufaktur.md)

---

## 6.1 Gambaran Umum Inventaris Odoo 19

Modul **Inventory** di Odoo 19 mengelola stok produk secara real-time di seluruh lokasi gudang. Odoo 19 membawa peningkatan signifikan pada sistem replenishment multi-langkah, integrasi barcode mobile, dan visibilitas stok yang lebih akurat.

### Struktur Inventaris Odoo 19
```
Perusahaan
└── Gudang (Warehouse)
    ├── Lokasi Input (WH/IN)
    ├── Quality Control (WH/QC)  [opsional]
    ├── Stok Utama (WH/Stock)
    │   ├── Rak A
    │   ├── Rak B
    │   └── Rak C
    ├── Lokasi Pengemasan (WH/Pack) [opsional]
    └── Lokasi Output (WH/OUT)
```

---

## 6.2 Pengaturan Inventaris

**Inventaris → Konfigurasi → Pengaturan**

### 6.2.1 Pengaturan Gudang

| Pengaturan | Keterangan |
|-----------|-----------|
| **Multi-Gudang** | Kelola lebih dari 1 gudang |
| **Lokasi Penyimpanan** | Sub-lokasi dalam gudang |
| **Rute Multi-Langkah** | Aktifkan proses penerimaan/pengiriman multi-step |
| **Quarantine** | Area karantina untuk produk retur/bermasalah |

### 6.2.2 Pelacakan & Kualitas

| Pengaturan | Keterangan |
|-----------|-----------|
| **Nomor Lot** | Pelacakan batch produk |
| **Nomor Seri** | Pelacakan produk individual |
| **Tanggal Kedaluwarsa** | Pantau expiry date |
| **Kontrol Kualitas** | Integrasi modul Quality |

### 6.2.3 Operasi Lanjutan

| Pengaturan | Keterangan |
|-----------|-----------|
| **Pemindahan Batch** | Gabungkan beberapa transfer |
| **Gelombang Pengambilan** | Optimalkan urutan picking |
| **Pengepakan** | Proses pengemasan produk |
| **Dropshipping** | Kirim langsung dari vendor ke pelanggan |

---

## 6.3 Konfigurasi Gudang

### 6.3.1 Buat Gudang Baru

**Inventaris → Konfigurasi → Gudang** → Klik **Baru**

```
Nama Gudang     : Gudang Pusat Jakarta
Nama Pendek     : JPK
Perusahaan      : PT. Toko Berkah
Alamat          : Jl. Industri Raya No. 100, Jakarta Barat

Rute Pengiriman Masuk:
  ○ 1 Langkah: Terima langsung ke stok
  ● 2 Langkah: Terima & Cek Kualitas (Input → Stock)
  ○ 3 Langkah: Terima, Cek, Simpan (Input → QC → Stock)

Rute Pengiriman Keluar:
  ○ 1 Langkah: Kirim langsung dari stok
  ● 2 Langkah: Ambil & Kirim (Pick + Ship)
  ○ 3 Langkah: Ambil, Kemas, Kirim (Pick + Pack + Ship)
```

### 6.3.2 Buat Lokasi Penyimpanan

**Inventaris → Konfigurasi → Lokasi** → Klik **Baru**

```
Nama Lokasi    : Rak A1 (Lantai 1, Blok A, Rak 1)
Lokasi Induk   : WH/Stock
Tipe Lokasi    : Internal
Aktif          : ✓

Barcode        : LOC-A1-001
Pemilik        : [kosong = milik perusahaan]
```

**Struktur Lokasi Lengkap**:
```
Gudang Pusat Jakarta (JPK)
├── JPK/INPUT    → Area penerimaan barang
├── JPK/QC       → Area quality control
├── JPK/STOCK    → Stok utama
│   ├── Rak A1   → Laptop & Komputer
│   ├── Rak A2   → Aksesoris
│   ├── Rak B1   → Printer & Scanner
│   └── Rak B2   → Monitor
├── JPK/PACK     → Area pengemasan
└── JPK/OUT      → Area pengiriman
```

---

## 6.4 Produk & Konfigurasi Inventaris

### 6.4.1 Pengaturan Produk untuk Inventaris

Di form produk, tab **Inventaris**:

```
Rute           : ✓ Beli, ✓ Manufaktur (pilih sesuai kebutuhan)
Berat          : 2.5 kg
Volume         : 0.8 L
Deskripsi Pengambilan: Ambil dari Rak A1
Strategi Penghapusan : FIFO (First In First Out)
```

### 6.4.2 Konfigurasi Lot & Nomor Seri

**Untuk Pelacakan Lot** (kelompok produk):
1. Di produk → Tab **Inventaris**
2. Set **Pelacakan**: Berdasarkan Lot
3. Setiap penerimaan, masukkan nomor lot

**Untuk Pelacakan Seri** (produk individual):
1. Set **Pelacakan**: Berdasarkan Nomor Seri
2. Setiap unit produk punya SN unik
3. Contoh: Laptop dengan SN: SN2026041500001

### 6.4.3 Metode Penilaian Stok

| Metode | Keterangan |
|--------|-----------|
| **Harga Standar** | Harga tetap yang ditetapkan manual |
| **Harga Rata-rata (AVCO)** | Rata-rata tertimbang semua pembelian |
| **FIFO** | Barang masuk pertama, pertama keluar (harga dinamis) |

---

## 6.5 Operasi Inventaris

### 6.5.1 Penerimaan Barang (Receipt)

Dari PO atau Manual:

1. **Inventaris → Operasi → Penerimaan**
2. Buka dokumen penerimaan
3. Masukkan kuantitas aktual yang diterima
4. Jika ada lot/seri → isi nomor lot/seri
5. Pilih lokasi tujuan (misal: JPK/QC)
6. Klik **Validasi**

**Penerimaan dengan Barcode**:
```
1. Scan barcode dokumen penerimaan
2. Scan barcode produk
3. Input qty atau scan berulang
4. Validasi
```

### 6.5.2 Pengiriman (Delivery Order)

1. **Inventaris → Operasi → Transfer**
2. Filter: Tipe = Pengiriman
3. Buka DO yang siap diproses

**Proses 2-Langkah (Pick → Ship)**:

**Langkah 1 — Picking**:
```
Ambil dari lokasi:
  - Rak A1: 5 Laptop ASUS (SN: SN001-SN005)
  - Rak A2: 5 Mouse Wireless (Lot: LOT2026-01)
```
Validasi → Produk pindah ke OUT zone

**Langkah 2 — Shipping**:
```
Paket:
  - Box 1: 2 Laptop + 2 Mouse
  - Box 2: 2 Laptop + 2 Mouse
  - Box 3: 1 Laptop + 1 Mouse
Ekspedisi: JNE Express
No. Resi: CGK2026042201234
```
Validasi → Stok keluar, pengiriman tercatat

### 6.5.3 Transfer Internal

Memindahkan stok antar lokasi dalam gudang:

1. **Inventaris → Operasi → Transfer → Baru**
2. Tipe Operasi: Transfer Internal
3. Dari: JPK/STOCK/Rak A1
4. Ke: JPK/STOCK/Rak B1
5. Tambah produk & qty
6. Validasi

### 6.5.4 Penyesuaian Inventaris (Stock Adjustment)

Untuk koreksi fisik vs. sistem:

1. **Inventaris → Operasi → Penyesuaian Inventaris**
2. Pilih lokasi yang akan dihitung
3. Klik **Mulai Inventaris**
4. Masukkan qty fisik aktual
5. Klik **Terapkan Semua**

**Selisih akan otomatis dijurnal** (jika akuntansi aktif).

---

## 6.6 Replenishment (Pengisian Stok)

### 6.6.1 Aturan Reorder (Min/Max)

**Inventaris → Operasi → Replenishment → Aturan Reorder**

```
Produk        : Laptop ASUS VivoBook 14
Lokasi        : JPK/STOCK
Qty Min       : 5 unit
Qty Maks      : 30 unit
Qty Multipel  : 5 (selalu beli kelipatan 5)
Rute          : Beli
Lead Time Vendor: 5 hari

→ Jika stok <5: Buat RFQ ke PT. DEN untuk 25 unit (isi ke 30)
```

### 6.6.2 Replenishment Manual

1. **Inventaris → Operasi → Replenishment**
2. Sistem menampilkan produk yang perlu diisi
3. Review qty yang disarankan
4. Klik **Lakukan Pemesanan** → RFQ dibuat otomatis

### 6.6.3 Just-in-Time (JIT) dari Sales Order

Ketika SO dikonfirmasi:
1. Odoo cek ketersediaan stok
2. Jika stok kurang → Buat RFQ otomatis
3. RFQ terhubung ke SO
4. Saat barang tiba → Pengiriman ke pelanggan langsung diproses

---

## 6.7 Traceability (Keterlacakan)

### 6.7.1 Lacak Lot/Nomor Seri

**Inventaris → Produk → Lot/Nomor Seri**

```
Lot: LOT-ASUS-2026-04
Produk: Laptop ASUS VivoBook 14
Tanggal Kadaluarsa: N/A
Lokasi Sekarang: JPK/STOCK/Rak A1
Qty: 12 unit

Riwayat:
  22 Apr 2026 → Diterima dari PT. DEN (PO-2026-0045)
  25 Apr 2026 → 5 unit dikirim ke PT. Mandiri Jaya (WH-OUT-0023)
  27 Apr 2026 → 3 unit dikirim ke CV. Bersama Maju (WH-OUT-0025)
```

### 6.7.2 Laporan Traceability Produk

Dari record lot/SN:
- Klik **Traceability** → Lihat seluruh pergerakan
- Export untuk audit / klaim garansi

---

## 6.8 Inventaris dengan Barcode

### 6.8.1 Setup Perangkat Barcode

1. **Inventaris → Konfigurasi → Pengaturan → Barcode**
2. Aktifkan: **Operasi Barcode**
3. Install aplikasi **Odoo Barcode** di tablet/scanner
4. Login menggunakan akun Odoo

### 6.8.2 Operasi via Barcode

**Penerimaan Barang**:
```
[Scan dokumen penerimaan barcode]
→ Produk yang diharapkan muncul
[Scan barcode produk] → Qty bertambah 1
[Scan lagi] → Qty = 2
[Input qty manual] → Masukkan 20
[Validasi] ✓
```

**Pengambilan (Picking)**:
```
[Scan dokumen picking]
→ List produk yang perlu diambil
[Pergi ke Rak A1]
[Scan barcode rak A1]
[Scan barcode Laptop]
→ Konfirmasi lokasi & produk
[Scan 5x atau input 5]
[Validasi] ✓
```

---

## 6.9 Laporan Inventaris

### 6.9.1 Laporan Penilaian Stok

**Inventaris → Pelaporan → Penilaian**

```
Produk              | Qty | Harga Standar | Nilai Total
────────────────────┼─────┼───────────────┼─────────────────
Laptop ASUS VB14    |  12 | 6.800.000     | 81.600.000
Mouse Wireless      |  45 |   220.000     |  9.900.000
Monitor 24" Samsung |   8 | 3.000.000     | 24.000.000
────────────────────┴─────┴───────────────┴─────────────────
Total Nilai Stok    |     |               |115.500.000
```

### 6.9.2 Laporan Pergerakan Stok

Filter berdasarkan:
- Produk tertentu
- Periode waktu
- Lokasi asal/tujuan
- Tipe operasi

### 6.9.3 Forecast Stok

**Inventaris → Pelaporan → Forecast**

```
Produk: Laptop ASUS VivoBook 14

Tanggal    | Masuk | Keluar | Saldo
───────────┼───────┼────────┼──────
22 Apr '26 |    +0 |     -5 |   12
24 Apr '26 |   +20 |      0 |   32 ← PO masuk
26 Apr '26 |    +0 |    -10 |   22
30 Apr '26 |    +0 |     -8 |   14
```

---

## 6.10 Simulasi Lengkap: Alur Lengkap Inventaris

**Skenario**: Toko Berkah menerima 30 laptop, simpan di gudang, lalu kirim ke 2 pelanggan.

### Fase 1: Penerimaan (Receiving)
```
PO dari PT. DEN: 30 Laptop ASUS VivoBook 14
Kurir tiba → Buka dokumen penerimaan di Odoo

1. Pindai barcode dokumen
2. Pindai barcode tiap laptop (30x scan)
3. Lot Number: LOT-ASUS-APR-2026
4. Simpan ke: JPK/QC (untuk quality check)
5. Validasi penerimaan
```

### Fase 2: Quality Check
```
Petugas QC:
1. Buka 5 unit sampel secara acak
2. Cek fisik: tidak ada cacat ✓
3. Power on test: normal ✓
4. Tandai: LULUS
5. Transfer dari JPK/QC → JPK/STOCK/Rak A1
```

### Fase 3: Pengiriman Pesanan 1 (PT. Mandiri Jaya - 10 unit)
```
Sales Order: SO-2026-0123
Picking List: Ambil 10 Laptop dari Rak A1 (SN: 001-010)
→ Pindah ke JPK/PACK
→ Kemas dalam 5 box @2 laptop
→ Pindah ke JPK/OUT
→ Serahkan ke JNE
→ Validasi DO → Stok berkurang ke 20
```

### Fase 4: Pengiriman Pesanan 2 (CV. Bersama - 5 unit)
```
Sales Order: SO-2026-0124
Picking: Ambil 5 Laptop dari Rak A1 (SN: 011-015)
→ Pack → Ship
→ Validasi → Stok berkurang ke 15
```

### Fase 5: Laporan Akhir
```
Stok Laptop ASUS VivoBook 14:
  - Diterima     : +30
  - Dikirim (1)  : -10
  - Dikirim (2)  :  -5
  - Saldo Akhir  :  15 unit (Rak A1, SN: 016-030)
```

---

[← Pembelian](05-pembelian.md) | [Berikutnya: Manufaktur →](07-manufaktur.md)
