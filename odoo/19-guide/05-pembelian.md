# Bab 05 — Pembelian (Purchase)

[← Penjualan](04-penjualan.md) | [Berikutnya: Inventaris →](06-inventaris.md)

---

## 5.1 Gambaran Umum Modul Pembelian

Modul **Purchase** di Odoo 19 mengelola seluruh proses pengadaan barang dan jasa — mulai dari permintaan penawaran (RFQ), perbandingan vendor, pesanan pembelian (PO), penerimaan barang, hingga pembayaran faktur vendor. Fitur **3-Way Matching** memastikan pembayaran hanya dilakukan setelah verifikasi lengkap.

### Alur Pembelian Odoo 19
```
Kebutuhan Barang
    → Request for Quotation (RFQ)
        → Kirim ke Vendor
            → Terima Penawaran Vendor
                → Bandingkan Penawaran
                    → Pesanan Pembelian (PO)
                        → Terima Barang
                            → Verifikasi Faktur Vendor
                                → Bayar
```

---

## 5.2 Pengaturan Modul Pembelian

**Pembelian → Konfigurasi → Pengaturan**

### 5.2.1 Pengaturan Pesanan

| Pengaturan | Opsi | Keterangan |
|-----------|------|-----------|
| **Peringatan Pembelian** | Aktif/Nonaktif | Peringatan kondisi khusus produk/vendor |
| **Kunci Pesanan** | Aktif/Nonaktif | Cegah edit setelah konfirmasi |
| **Pengiriman Ke 3** | Aktif/Nonaktif | Kirim langsung dari vendor ke pelanggan |
| **Mata Uang Pembelian** | Multi/Single | Beli dalam berbagai mata uang |

### 5.2.2 Kebijakan Faktur

| Kebijakan | Kapan Faktur Dibuat |
|-----------|-------------------|
| **Berdasarkan Pesanan** | Segera setelah PO dikonfirmasi |
| **Berdasarkan Penerimaan** | Hanya setelah barang diterima (3-Way Match) |

> **Rekomendasi**: Gunakan "Berdasarkan Penerimaan" untuk kontrol pembayaran yang ketat.

---

## 5.3 Manajemen Vendor

### 5.3.1 Membuat/Edit Data Vendor

**Pembelian → Pesanan → Vendor** atau **Kontak → Buat**

```
Nama Perusahaan  : PT. Distributor Elektronik Nusantara
Tipe             : Perusahaan
Alamat           : Jl. Raya Pasar Baru No. 45, Jakarta Pusat
NPWP             : 02.345.678.9-001.000
Telepon          : +62-21-9876543
Email            : sales@den.co.id
Kategori Vendor  : Elektronik, Distributor
```

**Tab Pembelian** (khusus vendor):
```
Mata Uang        : IDR
Lead Time Vendor : 5 hari kerja
Min. Qty Pesanan : 5 unit
Harga            : [daftar harga vendor]
```

### 5.3.2 Daftar Harga Vendor per Produk

Di record produk → Tab **Pembelian**:

```
Vendor        | Harga       | Min. Qty | Lead Time | Berlaku Hingga
──────────────┼─────────────┼──────────┼───────────┼───────────────
PT. DEN       | Rp 6.800.000|        5 | 5 hari    | 31 Des 2026
CV. Global    | Rp 6.950.000|        3 | 3 hari    | 30 Jun 2026
Toko Mulia   | Rp 7.100.000|        1 | 1 hari    | -
```

Odoo otomatis pilih vendor terbaik berdasarkan harga & ketersediaan.

---

## 5.4 Request for Quotation (RFQ)

### 5.4.1 Membuat RFQ Manual

**Pembelian → Pesanan → RFQ** → Klik **Baru**

```
Vendor           : PT. Distributor Elektronik Nusantara
Tanggal Pesanan  : 22 April 2026
Tanggal Jatuh Tempo: 26 April 2026
Perusahaan Tujuan: PT. Toko Berkah
Gudang           : Gudang Utama Jakarta

Baris Produk:
No | Produk                  | Qty | UoM  | Harga    | Subtotal
───┼─────────────────────────┼─────┼──────┼──────────┼──────────
 1 │ Laptop ASUS VivoBook 14 │  20 │ Pcs  │ 6.800.000│136.000.000
 2 │ Mouse Wireless Logitech │  20 │ Pcs  │   220.000│  4.400.000
───┴─────────────────────────┴─────┴──────┴──────────┴──────────
                                              Subtotal│140.400.000
                                              PPN 11% │ 15.444.000
                                                 Total│155.844.000
```

### 5.4.2 Kirim RFQ ke Multiple Vendor

**Cara Kirim ke Banyak Vendor Sekaligus (Tender)**:

1. Buat RFQ pertama untuk vendor utama
2. Di atas form, klik **Kirim RFQ**
3. Di popup email, klik **Tambah CC Vendor Lain**
4. Atau gunakan **Call for Tender** (lihat 5.5)

### 5.4.3 Konfirmasi RFQ → PO

Setelah vendor setuju:
1. Buka RFQ
2. Klik **Konfirmasi Pesanan**
3. Status berubah ke **Pesanan Pembelian**

---

## 5.5 Calls for Tender (Perbandingan Vendor)

Fitur ini memungkinkan perbandingan penawaran dari beberapa vendor sebelum memilih.

### Langkah-langkah Tender

**Langkah 1**: Aktifkan fitur di **Pembelian → Konfigurasi → Pengaturan → Tender Pembelian**

**Langkah 2**: Buat RFQ Utama
1. Buat RFQ seperti biasa
2. Di tombol atas, klik **Ganda ke Tender**
3. Odoo otomatis buat beberapa RFQ dari template yang sama

**Langkah 3**: Kirim ke Semua Vendor
1. Di halaman tender, klik **Kirim RFQ ke Semua**
2. Email dikirim ke semua vendor yang dipilih
3. Lacak status buka email vendor

**Langkah 4**: Bandingkan Penawaran

Setelah vendor merespon:
1. Di tender, klik **Bandingkan Baris Pesanan**
2. Tampilan perbandingan:

```
Produk               | PT. DEN        | CV. Global     | Toko Mulia
─────────────────────┼────────────────┼────────────────┼────────────
Laptop ASUS VivoBook │ Rp 6.800.000 ✓│ Rp 6.950.000   │ Rp 7.100.000
Mouse Wireless       │ Rp 220.000     │ Rp 215.000 ✓   │ Rp 240.000
Lead Time            │ 5 hari         │ 3 hari ✓        │ 1 hari ✓
─────────────────────┴────────────────┴────────────────┴────────────
TOTAL                │ 140.400.000 ✓  │ 141.300.000    │ 147.400.000
```

**Langkah 5**: Pilih Pemenang
1. Centang vendor pemenang per produk
2. Klik **Konfirmasi Pesanan**
3. RFQ lain otomatis dibatalkan

---

## 5.6 Pesanan Pembelian (Purchase Order)

### 5.6.1 Konfirmasi PO

Setelah PO dikonfirmasi:
- Status: **Pesanan Pembelian**
- Email konfirmasi otomatis dikirim ke vendor
- Dokumen Penerimaan dibuat di Inventory

### 5.6.2 Melacak Status PO

Dari PO, lihat tombol pintas di bagian atas:
```
[Penerimaan: 1] [Faktur: 0]
```
- **Penerimaan**: Jumlah dokumen penerimaan barang
- **Faktur**: Jumlah faktur vendor terkait

### 5.6.3 Amandemen PO

Jika perlu ubah PO setelah konfirmasi:
1. Klik **Kunci/Buka Kunci** (jika fitur kunci aktif)
2. Edit kuantitas atau harga
3. Kirim notifikasi ke vendor tentang perubahan

---

## 5.7 Penerimaan Barang

### 5.7.1 Proses Penerimaan

Dari PO → Klik **Penerimaan** → Buka dokumen penerimaan

**Verifikasi Kuantitas**:
```
Produk               | Qty Dipesan | Qty Diterima | Selisih
─────────────────────┼─────────────┼──────────────┼────────
Laptop ASUS VivoBook │          20 │           20 │      0
Mouse Wireless       │          20 │           18 │      2 ← Kurang!
```

**Jika Ada Kekurangan**:
1. Isi qty sebenarnya yang diterima
2. Klik **Validasi**
3. Odoo tanya: Buat Backorder? → **Ya, Buat Backorder**
4. Backorder dibuat untuk sisa 2 mouse yang belum tiba

### 5.7.2 Penerimaan dengan Barcode Scanner

Di aplikasi mobile atau halaman barcode:
1. Scan barcode produk
2. Qty otomatis bertambah
3. Validasi ketika selesai

### 5.7.3 Kontrol Kualitas saat Penerimaan

Jika modul Quality aktif:
- Quality Check otomatis muncul saat penerimaan
- Petugas gudang mengisi hasil inspeksi
- Jika gagal: produk masuk Quarantine / dikembalikan

---

## 5.8 Faktur Vendor (Bill)

### 5.8.1 Membuat Faktur dari PO

**Cara 1 — Dari PO**:
1. Buka PO → Klik **Buat Faktur**
2. Odoo otomatis isi baris dari PO
3. Review dan sesuaikan tanggal faktur vendor
4. Klik **Konfirmasi**

**Cara 2 — Dari Penerimaan**:
1. Buka Penerimaan → Klik **Buat Faktur**

**Cara 3 — Upload Faktur (AI OCR)** `[Enterprise]`:
1. Pembelian → Faktur Vendor → **Upload**
2. Upload PDF/scan faktur vendor
3. AI membaca dan mengisi data otomatis
4. Review dan konfirmasi

### 5.8.2 3-Way Matching

Odoo 19 otomatis verifikasi 3 dokumen:

```
PO (Dipesan)     ←→   Penerimaan (Diterima)   ←→   Faktur Vendor (Ditagih)
   20 Laptop              20 Laptop                    20 Laptop
                                                       = MATCH ✓
```

Jika tidak match:
- Peringatan muncul di faktur vendor
- Akuntan harus investigasi sebelum bayar

### 5.8.3 Kebijakan Kontrol Tagihan

| Status | Keterangan |
|--------|-----------|
| ✓ Match | Boleh langsung bayar |
| ⚠ Lebih Banyak Ditagih | Verifikasi kelebihan qty |
| ⚠ Lebih Sedikit Diterima | Tunggu sisa pengiriman |

---

## 5.9 Pengadaan Otomatis (Auto-Procurement)

### 5.9.1 Aturan Reorder

**Inventaris → Konfigurasi → Aturan Reorder**

```
Produk         : Laptop ASUS VivoBook 14
Lokasi         : Gudang Jakarta
Qty Min        : 5 (jika stok < 5, buat pembelian)
Qty Maks       : 30 (beli sampai stok = 30)
Qty Tetap      : -
Lead Time      : 5 hari
Rute           : Beli
Vendor Pilihan : PT. DEN (otomatis dari vendor list)
```

**Cara Kerja**:
- Odoo memeriksa stok setiap hari
- Jika stok < 5 → Otomatis buat RFQ ke PT. DEN
- RFQ butuh konfirmasi manual (atau bisa auto-confirm)

### 5.9.2 Procurement dari Sales Order

Jika produk dipesan pelanggan tapi stok tidak ada:
1. Konfirmasi Sales Order
2. Odoo deteksi stok kurang
3. Otomatis buat RFQ ke vendor pilihan
4. Hubungkan PO ke SO (smart linking)

---

## 5.10 Pelaporan Pembelian

### 5.10.1 Statistik Pembelian

**Pembelian → Pelaporan → Statistik Pembelian**

```
Metrik yang tersedia:
- Total pembelian per vendor
- Total pembelian per produk
- Total pembelian per bulan/kuartal
- Lead time aktual vs. yang dijanjikan
- Nilai PO yang masih outstanding
```

### 5.10.2 Analisis Kinerja Vendor

```
Vendor           | Total Order | Total Nilai    | On-Time% | Return%
─────────────────┼─────────────┼────────────────┼──────────┼────────
PT. DEN          |          12 | Rp 850.000.000 |      95% |    1%
CV. Global       |           8 | Rp 420.000.000 |      88% |    3%
Toko Mulia       |           3 | Rp  95.000.000 |     100% |    0%
```

---

## 5.11 Simulasi Lengkap: Proses Pembelian dengan Tender

**Skenario**: PT. Toko Berkah perlu beli 50 laptop untuk stok akhir kuartal.

### Step 1: Identifikasi Kebutuhan
- Dari laporan stok: stok laptop tersisa 8 unit
- Target stok minimum: 30 unit
- Perlu beli: 50 unit (stok + buffer)

### Step 2: Buat RFQ Tender
1. Pembelian → RFQ → Baru
2. Tambah produk: 50 Laptop ASUS VivoBook 14
3. Klik **Ganda ke Tender**
4. Tambah 3 vendor: PT. DEN, CV. Global, Toko Mulia
5. Klik **Kirim RFQ ke Semua**

### Step 3: Kumpulkan Penawaran (5 hari)
- PT. DEN: Rp 6.800.000/unit, 5 hari, pengiriman gratis
- CV. Global: Rp 6.750.000/unit, 7 hari, minimum 30 unit
- Toko Mulia: Rp 7.000.000/unit, 2 hari, tersedia sekarang

### Step 4: Analisis & Pilih Vendor
- CV. Global paling murah TAPI delivery 7 hari → tidak cocok
- PT. DEN: harga kompetitif, track record bagus → PILIH
- Klik **Konfirmasi** untuk PO ke PT. DEN

### Step 5: Terima Barang (5 hari kemudian)
1. Kurior datang dengan 50 laptop
2. Buka dokumen penerimaan
3. Scan/hitung fisik: semua 50 unit ada ✓
4. Validasi penerimaan → Stok bertambah 50

### Step 6: Proses Faktur
1. PT. DEN kirim invoice PDF
2. Upload ke Odoo (AI OCR baca otomatis)
3. Verifikasi 3-way matching: PO = Terima = Faktur ✓
4. Konfirmasi faktur → Jadwalkan pembayaran

### Step 7: Bayar
1. Di Akuntansi → Buat pembayaran
2. Transfer ke rekening PT. DEN
3. Rekonsiliasi bank → Hutang lunas

---

[← Penjualan](04-penjualan.md) | [Berikutnya: Inventaris →](06-inventaris.md)
