# Bab 04 — Penjualan (Sales)

[← CRM](03-crm.md) | [Berikutnya: Pembelian →](05-pembelian.md)

---

## 4.1 Gambaran Umum Modul Penjualan

Modul **Sales** di Odoo 19 mengelola seluruh siklus penjualan mulai dari pembuatan penawaran (quotation) hingga konfirmasi pesanan, pengiriman, dan pembuatan faktur. Odoo 19 memperkenalkan tampilan penawaran yang lebih modern dengan drag & drop produk, tanda tangan online, dan saran email berbasis AI.

### Alur Penjualan Odoo 19
```
Penawaran (Draft) 
    → Penawaran Terkirim 
        → Pesanan Penjualan (Terkonfirmasi) 
            → Pengiriman 
                → Faktur 
                    → Pembayaran Diterima
```

---

## 4.2 Pengaturan Modul Penjualan

**Penjualan → Konfigurasi → Pengaturan**

### 4.2.1 Konfigurasi Penawaran & Pesanan

| Pengaturan | Opsi | Keterangan |
|-----------|------|-----------|
| **Tanda Tangan Online** | Aktif/Nonaktif | Pelanggan tanda tangan di portal |
| **Pembayaran Online** | Aktif/Nonaktif | Pelanggan bayar di portal |
| **Masa Berlaku Penawaran** | 30 hari (default) | Penawaran kedaluwarsa otomatis |
| **Peringatan Pesanan** | Aktif/Nonaktif | Notifikasi kondisi khusus pelanggan |
| **Kunci Pesanan** | Aktif/Nonaktif | Cegah edit setelah konfirmasi |

### 4.2.2 Pengiriman & Faktur

| Pengaturan | Opsi |
|-----------|------|
| **Kebijakan Pengiriman** | Kirim sesuai pesanan / Kirim satu kali |
| **Kebijakan Faktur** | Berdasarkan pesanan / Berdasarkan pengiriman |
| **Biaya Pengiriman** | Aktifkan hitung otomatis ongkos kirim |

### 4.2.3 Harga & Diskon

| Pengaturan | Keterangan |
|-----------|-----------|
| **Pricelists** | Daftar harga per pelanggan/region/mata uang |
| **Diskon Baris** | Diskon per baris produk di penawaran |
| **Margin** | Tampilkan margin keuntungan di penawaran |
| **Kupon & Promosi** | Aktifkan kode promo dan program loyalitas |

---

## 4.3 Produk & Katalog

### 4.3.1 Membuat Produk

**Penjualan → Produk → Produk** → Klik **Baru**

```
Nama Produk   : Laptop ASUS VivoBook 14
Tipe          : Produk yang Dapat Disimpan (Storable)
Harga Jual    : Rp 8.500.000
Harga Beli    : Rp 6.800.000
Pajak Pelanggan: PPN 11%
Satuan        : Pcs
Kategori      : Elektronik / Laptop
Kode Internal : LAP-ASUS-VB14
Barcode       : 8992774540148
```

**Tab Penjualan**:
```
Kebijakan Faktur   : Berdasarkan Pesanan
Garansi            : 12 bulan
Catatan Pelanggan  : Produk dikirim dalam kemasan original
```

**Tab Varian** (jika ada pilihan):
```
Atribut: Warna → Silver, Gold, Hitam
Atribut: RAM   → 8GB (+Rp 0), 16GB (+Rp 500.000)
```

### 4.3.2 Daftar Harga (Pricelists)

**Penjualan → Konfigurasi → Daftar Harga** → Klik **Baru**

```
Nama         : Harga Grosir
Mata Uang    : IDR
Negara       : Indonesia
Aturan Harga :
  - Produk: Semua → Diskon 15% dari harga normal
  - Produk: Laptop → Harga tetap Rp 7.000.000
Pelanggan    : [Tag: Reseller] atau [Min. Pembelian 10 pcs]
```

---

## 4.4 Membuat Penawaran (Quotation)

### 4.4.1 Cara Membuat Penawaran Baru

**Penjualan → Pesanan → Penawaran** → Klik **Baru**

**Header Penawaran**:
```
Pelanggan      : PT. Sukses Makmur (pilih dari kontak)
Tanggal Penawaran: 22 April 2026
Berlaku Hingga : 22 Mei 2026 (30 hari)
Penjual        : Dewi Rahayu
Tim Penjualan  : Tim A
Sumber         : CRM / Referensi / Website
Daftar Harga   : Harga Normal / Harga Grosir
```

**Syarat Pembayaran**:
```
Syarat Pembayaran: 30 hari neto
  atau: 50% DP, sisanya sebelum pengiriman
```

### 4.4.2 Menambahkan Produk ke Penawaran

1. Di tab **Baris Pesanan**, klik **Tambah Produk**
2. Ketik nama/kode produk → Pilih dari dropdown
3. Atur kuantitas dan harga

```
No | Produk                    | Qty | Satuan | Harga Satuan | Diskon | Subtotal
───┼───────────────────────────┼─────┼────────┼──────────────┼────────┼──────────
 1 │ Laptop ASUS VivoBook 14   │   5 │ Pcs    │ Rp 8.500.000 │   0%   │ Rp 42.500.000
 2 │ Mouse Wireless Logitech   │   5 │ Pcs    │ Rp 350.000   │   5%   │ Rp  1.662.500
 3 │ Tas Laptop               │   5 │ Pcs    │ Rp 150.000   │   0%   │ Rp    750.000
───┼───────────────────────────┼─────┼────────┼──────────────┼────────┼──────────
                                                              Subtotal │ Rp 44.912.500
                                                              PPN 11%  │ Rp  4.940.375
                                                              TOTAL    │ Rp 49.852.875
```

**Fitur Baru Odoo 19 — Drag & Drop Produk**:
- Seret baris produk untuk ubah urutan tampilan
- Berguna untuk menempatkan produk utama di atas

### 4.4.3 Seksi & Sub-seksi (Fitur Odoo 19)

Untuk penawaran panjang, tambahkan seksi:

1. Klik **Tambah Seksi** di bawah baris produk
2. Isi nama seksi: "Hardware"
3. Tambah produk hardware di bawah seksi
4. Klik **Tambah Seksi** lagi: "Software & Lisensi"
5. Tambah produk software

```
[SEKSI] HARDWARE
  1. Laptop ASUS VivoBook 14   x5  Rp 42.500.000
  2. Mouse Wireless Logitech   x5  Rp  1.662.500
[SEKSI] SOFTWARE & LISENSI
  3. Microsoft Office 2025     x5  Rp  7.500.000
  4. Antivirus Business        x5  Rp  1.250.000
[SEKSI] JASA INSTALASI
  5. Instalasi & Konfigurasi   x1  Rp  2.500.000
```

**Sembunyikan Harga di Seksi Tertentu**:
- Klik ikon ⚙️ pada baris seksi
- Centang "Sembunyikan Harga" → Seksi tersebut tidak tampilkan detail harga

### 4.4.4 Tab Produk Opsional (Cross-Selling)

Di tab **Produk Opsional**, tambahkan rekomendasi:
```
- Garansi Extended 2 Tahun    (+Rp 500.000/unit)
- Antivirus Premium           (+Rp 300.000/tahun)
- Keyboard Wireless           (+Rp 450.000)
```
Pelanggan dapat memilih item ini di portal pemesanan online.

### 4.4.5 Kustomisasi PDF Penawaran

**Tab Pengaturan Lainnya** → **Catatan Tambahan**:
```
Header    : [Logo Perusahaan + Info Perusahaan]
Catatan   : Harga sudah termasuk PPN 11%. Pengiriman 3-5 hari kerja.
            Garansi sesuai ketentuan produsen.
Footer    : Terima kasih atas kepercayaan Anda — PT. Toko Berkah
```

---

## 4.5 Mengirim & Konfirmasi Penawaran

### 4.5.1 Kirim via Email

1. Klik tombol **Kirim via Email**
2. Preview email template (dapat diedit)
3. Lampiran PDF penawaran otomatis ditambahkan
4. Klik **Kirim**

**Fitur AI Email Drafting**:
- Klik ✨ AI di kotak email
- AI menganalisis konten penawaran
- Draftkan email penjualan yang profesional dan persuasif

### 4.5.2 Tanda Tangan Online

Pelanggan menerima email → Klik link portal → Lihat penawaran → **Tanda Tangan & Konfirmasi**

1. Pelanggan buka link portal
2. Review isi penawaran
3. Klik **Tanda Tangan & Konfirmasi**
4. Gambar tanda tangan digital
5. Konfirmasi → Status penawaran berubah ke **Terkonfirmasi**

**Pemberitahuan ke Sales**: Notifikasi otomatis dikirim ke sales saat pelanggan tanda tangan.

### 4.5.3 Pembayaran DP Online

1. Aktifkan di **Pengaturan → Pembayaran Online**
2. Di penawaran, set **Jumlah DP**: 50%
3. Pelanggan di portal dapat bayar langsung via:
   - Transfer bank (virtual account)
   - Kartu kredit
   - Dompet digital (tergantung payment provider)

### 4.5.4 Konfirmasi Manual

Jika tidak menggunakan portal:
1. Buka penawaran
2. Klik **Konfirmasi Pesanan**
3. Status berubah ke **Pesanan Penjualan**

---

## 4.6 Pesanan Penjualan (Sales Order)

### 4.6.1 Status Pesanan

```
Draft → Terkirim → Pesanan Penjualan → [Pengiriman] → [Invoice]
                        ↓
                    Dibatalkan
```

### 4.6.2 Dari Pesanan ke Pengiriman

Setelah pesanan dikonfirmasi:
1. Tombol **Pengiriman** muncul di atas
2. Klik → Odoo buat dokumen transfer otomatis di Inventory
3. Gudang memproses pengambilan & pengemasan
4. Konfirmasi pengiriman → Stok berkurang

### 4.6.3 Membuat Invoice dari Pesanan

**Cara 1 — Invoice Berdasarkan Pesanan**:
1. Dari SO, klik **Buat Invoice**
2. Pilih: **Invoice Biasa**
3. Klik **Buat Invoice**
4. Review → **Konfirmasi** → **Kirim & Cetak**

**Cara 2 — Invoice Berdasarkan Pengiriman** (jika diatur):
1. Setelah pengiriman selesai, tombol **Invoice** muncul
2. Klik → Invoice dibuat otomatis sesuai qty yang dikirim

**Cara 3 — Invoice Sebagian (Milestone)**:
1. Di baris produk SO, ubah qty yang ditagih
2. Buat invoice hanya untuk qty tersebut

---

## 4.7 Template Penawaran

### Membuat Template

**Penjualan → Konfigurasi → Template Penawaran** → Klik **Baru**

```
Nama Template     : Paket Laptop Bisnis
Berlaku Selama    : 30 hari
Konfirmasi Online : ✓ Tanda Tangan & Pembayaran

Baris Produk:
- Laptop [pilih saat quotation]     x[qty]
- Mouse Wireless                    x[sama dengan laptop]
- Tas Laptop                        x[sama dengan laptop]
- Instalasi & Setup                 x1

Produk Opsional:
- Antivirus Business (1 tahun)
- Keyboard Wireless
- Monitor Eksternal

Email Konfirmasi: Template "Pesanan Diterima"
```

**Penggunaan**:
1. Buat penawaran baru
2. Di field **Template Penawaran**: Pilih "Paket Laptop Bisnis"
3. Semua produk dan pengaturan terisi otomatis

---

## 4.8 Kode Promo & Diskon

### 4.8.1 Program Diskon

**Penjualan → Katalog → Diskon & Loyalitas** → Klik **Baru**

```
Nama        : Promo Lebaran 2026
Tipe        : Kode Promo
Kode        : LEBARAN2026
Diskon      : 10% untuk semua produk
Berlaku     : 1 April - 10 April 2026
Min. Pembelian: Rp 5.000.000
```

**Cara Pakai di Penawaran**:
1. Di penawaran, klik tab **Diskon & Loyalitas**
2. Masukkan kode: `LEBARAN2026`
3. Diskon 10% diterapkan otomatis

### 4.8.2 Program Loyalitas

```
Nama       : Program Pelanggan Setia
Poin       : 1 poin per Rp 100.000 pembelian
Reward     : 1000 poin = Voucher Rp 50.000
```

---

## 4.9 Pelaporan Penjualan

### 4.9.1 Analisis Penjualan

**Penjualan → Pelaporan → Penjualan**

Filter dan kelompokkan berdasarkan:
- Produk
- Pelanggan
- Penjual
- Periode (bulan/kuartal/tahun)
- Tim penjualan
- Negara/Kota

### 4.9.2 Prakiraan Pendapatan

**Penjualan → Pelaporan → Prakiraan**

```
Bulan       | Revenue Aktual | Revenue Proyeksi
────────────┼────────────────┼─────────────────
Jan 2026    | Rp 850.000.000 | Rp 800.000.000
Feb 2026    | Rp 720.000.000 | Rp 750.000.000
Mar 2026    | Rp 980.000.000 | Rp 900.000.000
Apr 2026    | [berjalan]     | Rp 950.000.000
```

---

## 4.10 Simulasi Lengkap: Penjualan B2B

**Skenario**: PT. Toko Berkah menjual paket workstation ke PT. Mandiri Jaya

### Step 1: Buat Penawaran dari Peluang CRM
1. Di CRM, buka peluang PT. Mandiri Jaya
2. Klik **Buat Penawaran**
3. Penawaran terbuka dengan data pelanggan terisi otomatis

### Step 2: Isi Produk
```
Produk              | Qty | Harga     | Subtotal
─────────────────────┼─────┼───────────┼──────────────
Laptop Dell E5540   |  10 | 12.000.000| 120.000.000
Monitor 24" Samsung |  10 |  3.500.000|  35.000.000
Keyboard + Mouse Set|  10 |    400.000|   4.000.000
Instalasi & Setup   |   1 |  5.000.000|   5.000.000
─────────────────────┴─────┴───────────┼──────────────
                              PPN 11%  |  18.040.000
                                 TOTAL | 182.040.000
```

### Step 3: Tambahkan Syarat & Ketentuan
- Pembayaran: 50% DP, 50% setelah instalasi
- Pengiriman: 7 hari kerja
- Garansi: 1 tahun (hardware produsen)

### Step 4: Kirim ke Pelanggan
1. Klik **Kirim via Email**
2. AI auto-draft email penjualan profesional
3. Kirim → status: **Terkirim**

### Step 5: Terima DP
1. Pelanggan transfer 50% = Rp 91.020.000
2. Di Akuntansi, catat pembayaran → Rekonsiliasi

### Step 6: Konfirmasi & Kirim
1. Tanda tangan diterima → Konfirmasi otomatis
2. Proses pengiriman di Inventory
3. Konfirmasi kirim → Stok berkurang

### Step 7: Invoice & Pelunasan
1. Buat invoice pelunasan 50%
2. Kirim ke pelanggan
3. Terima pembayaran → Rekonsiliasi
4. Pesanan selesai ✓

---

[← CRM](03-crm.md) | [Berikutnya: Pembelian →](05-pembelian.md)
