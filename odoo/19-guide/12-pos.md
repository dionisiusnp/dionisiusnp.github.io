# Bab 12 — Point of Sale (POS)

[← Website & eCommerce](11-website-ecommerce.md) | [Berikutnya: Helpdesk →](13-helpdesk.md)

---

## 12.1 Gambaran Umum POS Odoo 19

Modul **Point of Sale** di Odoo 19 adalah sistem kasir berbasis web yang bekerja di browser — tanpa aplikasi terpisah, dapat berjalan offline saat koneksi internet terputus. Odoo 19 menambahkan integrasi langsung dengan Appointments (booking), manajemen komisi penjual, dan integrasi Helpdesk dari POS.

### Keunggulan POS Odoo 19
- Berjalan di browser (Chrome/Firefox) → bisa di PC, laptop, tablet, iPad
- Mode offline otomatis saat internet mati
- Multi-kasir dalam 1 toko
- Dukungan restoran (floor plan, kitchen order)
- Integrasi inventaris real-time
- Semua data langsung masuk akuntansi

---

## 12.2 Pengaturan POS

### 12.2.1 Konfigurasi Dasar

**Point of Sale → Konfigurasi → [nama POS] → Edit**

**Tab Toko**:
```
Nama POS       : Kasir Utama Jakarta
Perusahaan     : PT. Toko Berkah
Gudang         : Gudang Jakarta

Tampilan:
  Tema         : Default / Modern
  Latar Belakang: [upload gambar atau warna]
```

**Tab Pembayaran**:
```
Metode Pembayaran:
  ✓ Tunai
  ✓ Transfer Bank (Konfirmasi Manual)
  ✓ QRIS/EDC (GoPay, OVO, ShopeePay)
  ✓ Kartu Kredit/Debit
  ✓ Voucher

Pembulatan Tunai: Rp 100 (pembulatan ke bawah)
```

**Tab Printer**:
```
Printer Struk: Network Printer / USB
IP Printer   : 192.168.1.100
Format Struk : 58mm / 80mm
Header Struk : "PT. TOKO BERKAH | JL. Sudirman No.1"
Footer Struk : "Terima Kasih! Barang yang dibeli tidak dapat ditukar."
```

### 12.2.2 Pengaturan Restoran

Aktifkan jika untuk restoran/kafe:

```
Mode Restoran: ✓ Aktif

Floor Plans:
  ✓ Buat denah lantai
  ✓ Tambah meja (nama, kursi)

Kitchen Order Display:
  ✓ Aktif
  Printer Dapur: 192.168.1.101 (printer di dapur)
  Layar Dapur  : Tampilan antrian order

Fitur Restoran:
  ✓ Split Bill (pisah tagihan per orang)
  ✓ Move Table (pindahkan order ke meja lain)
  ✓ Notes per Item (catatan ke dapur: pedas, tanpa bawang)
```

---

## 12.3 Menjalankan POS

### 12.3.1 Buka Sesi POS

1. **POS → [pilih POS] → Buka Sesi**
2. Isi **Uang Awal** (opening cash float):
   ```
   Saldo Awal: Rp 500.000
   Detail: 5× Rp 100.000 = Rp 500.000
   ```
3. Klik **Buka**
4. Layar kasir terbuka di mode fullscreen

### 12.3.2 Antarmuka Kasir

```
┌──────────────────────────────────────────────────────────────────┐
│  PRODUK (Kiri)           │  KERANJANG (Kanan)                   │
│                           │                                       │
│  [CARI PRODUK...]         │  Laptop ASUS VB14   ×1  8.500.000   │
│                           │  Mouse Wireless     ×2    700.000   │
│  [Laptop ASUS]            │  ─────────────────────────────────  │
│  Rp 8.500.000             │  Subtotal:          9.200.000        │
│                           │  Diskon (5%):        -460.000        │
│  [Mouse Wireless]         │  PPN 11%:            965.600         │
│  Rp 350.000               │  TOTAL:           9.705.600          │
│                           │                                       │
│  [Keyboard USB]           │  [Diskon] [Catatan] [Hapus]          │
│  Rp 150.000               │                                       │
│  ...                      │  [BAYAR →]                           │
└──────────────────────────────────────────────────────────────────┘
```

### 12.3.3 Proses Transaksi

**Step 1 — Tambah Produk**:
- Klik produk → langsung masuk keranjang
- Atau scan barcode → produk ditambah otomatis
- Atau cari dengan nama di search bar

**Step 2 — Atur Qty/Diskon**:
- Klik qty di keranjang → Input langsung
- Klik **Diskon** → Input % atau nominal
- Klik **Harga** → Override harga (jika diizinkan)

**Step 3 — Bayar**:
1. Klik **BAYAR**
2. Pilih metode pembayaran:

```
[Tunai]                    [Kartu Kredit/Debit]
Input: Rp 10.000.000       Swipe/tap kartu
Kembalian: Rp 294.400      → Konfirmasi

[QRIS]
QR code muncul di layar
Pelanggan scan → Konfirmasi

[Split Payment]
Tunai: Rp 5.000.000
Transfer: Rp 4.705.600
```

**Step 4 — Cetak/Kirim Struk**:
- **Cetak Struk**: Print ke printer thermal
- **Kirim Email**: Input email pelanggan
- **Tanpa Struk**: Langsung lanjut

### 12.3.4 Fitur Tambah di Kasir

**Terapkan Diskon**:
- Diskon % per item
- Diskon nominal per item
- Diskon % keseluruhan order
- Kode kupon (tekan Kupon → input kode)

**Catatan Order**:
- Catatan internal (tidak tercetak di struk)
- Catatan untuk dapur (restoran)

**Tahan Order**:
- Tombol **Tahan** → order disimpan sementara
- Layani pelanggan lain
- Ambil kembali order yang ditahan

---

## 12.4 Fitur Khusus Restoran

### 12.4.1 Floor Plan

Buat denah lantai toko/restoran:

**POS → Konfigurasi → Floor Plans**

```
Denah: Lantai 1
  Meja 1  (4 kursi) — Area Jendela
  Meja 2  (4 kursi) — Area Jendela
  Meja 3  (6 kursi) — Area Tengah
  Meja 4  (2 kursi) — Area Bar
  Meja VIP (8 kursi) — Ruang VIP
```

**Tampilan Meja di POS**:
```
┌─────────┐  ┌─────────┐  ┌─────────────────┐
│ Meja 1  │  │ Meja 2  │  │    Meja 3       │
│  [1/4]  │  │  [4/4]  │  │     [0/6]       │
│ TERSEDIA│  │  PENUH  │  │    TERSEDIA     │
└─────────┘  └─────────┘  └─────────────────┘
```
- Angka [1/4] = 1 dari 4 kursi terisi
- Warna: Hijau = tersedia, Merah = penuh, Kuning = ada order

### 12.4.2 Kitchen Order Display (KOD)

Setelah kasir kirim order:
1. **Printer dapur** cetak tiket otomatis, ATAU
2. **Layar KOD** menampilkan:
   ```
   MEJA 3 — Order #045
   ────────────────────
   × 2  Nasi Goreng Special
   × 1  Mie Ayam
   × 3  Es Teh Manis
   Catatan: Nasi goreng = EXTRA PEDAS
   [SELESAI]
   ```

### 12.4.3 Split Bill

1. Buka order → Klik **Split**
2. Pisahkan item per orang:
   ```
   Orang 1: Nasi Goreng + Es Teh = Rp 45.000
   Orang 2: Mie Ayam + Jus Jeruk = Rp 40.000
   ```
3. Proses pembayaran terpisah

---

## 12.5 Manajemen Pelanggan di POS

### 12.5.1 Tambah Pelanggan ke Order

1. Di kasir → Klik **Pelanggan**
2. Cari nama/nomor HP pelanggan
3. Jika baru → Buat pelanggan di tempat:
   ```
   Nama   : Budi Santoso
   Email  : budi@gmail.com
   HP     : 0812-3456-7890
   ```
4. Poin loyalitas otomatis terakumulasi

### 12.5.2 Loyalty Program di POS

```
Program: Poin Belanja
  1 poin per Rp 10.000 pembelian

Order Hari Ini:
  Total: Rp 9.705.600
  Poin Didapat: 970 poin
  Total Poin: 2.540 poin

Redeem:
  500 poin = Rp 5.000 voucher
  → "Gunakan 500 poin? Hemat Rp 5.000"
```

---

## 12.6 Integrasi Appointments (Baru Odoo 19)

Untuk bisnis dengan booking (salon, klinik, dll):

1. Pelanggan booking via website/telepon
2. Jadwal muncul di **Appointments**
3. Saat pelanggan datang → POS otomatis tampilkan booking:
   ```
   Booking: Budi Santoso
   Layanan: Potong Rambut + Creambath
   Jam: 14:00-15:30
   Staff: Mas Roni
   ```
4. Konfirmasi → Proses pembayaran

---

## 12.7 Komisi Penjualan (Baru Odoo 19)

### 12.7.1 Setup Komisi

**POS → Konfigurasi → Komisi Penjual**

```
Tipe Komisi: Persentase dari Penjualan
  SPG/SPB    : 2% dari total penjualan
  Senior SPG : 3% dari total penjualan

Atau per Produk:
  Laptop     : Rp 50.000/unit
  Aksesoris  : Rp 5.000/unit
```

### 12.7.2 Laporan Komisi

Laporan komisi per kasir/SPG per periode:
```
Kasir     | Total Penjualan | Komisi (2%)
──────────┼─────────────────┼────────────
Sari      | Rp 15.200.000   | Rp 304.000
Dewi      | Rp 12.800.000   | Rp 256.000
Budi      | Rp 18.500.000   | Rp 370.000
```

---

## 12.8 Integrasi Helpdesk dari POS (Baru Odoo 19)

Saat ada masalah pelanggan di kasir:
1. Kasir klik **Buat Tiket Helpdesk**
2. Isi:
   ```
   Judul    : Pelanggan komplain produk rusak
   Pelanggan: Budi Santoso
   Deskripsi: Laptop dibeli 3 hari lalu, keyboard tidak berfungsi
   Prioritas: Tinggi
   ```
3. Tiket langsung masuk ke Helpdesk
4. Tim support ditugaskan

---

## 12.9 Tutup Sesi POS

### 12.9.1 Proses Tutup Kasir

1. Klik **Tutup** di kasir
2. Masukkan **Uang Akhir** (hasil hitung kas):
   ```
   Uang Akhir: Rp 1.250.000
   
   Denominasi:
     10× Rp 100.000 = Rp 1.000.000
     5×  Rp 50.000  = Rp   250.000
   ```
3. Sistem tampilkan rekap sesi:
   ```
   Sesi: Kasir Utama Jakarta | 22 April 2026 | 09:00-21:00
   
   Total Transaksi: 48 order
   Total Penjualan: Rp 8.450.000
   
   Metode Pembayaran:
     Tunai    : Rp 3.200.000
     QRIS     : Rp 2.800.000
     Kartu    : Rp 2.450.000
   
   Saldo Awal  : Rp 500.000
   Penjualan Tunai: Rp 3.200.000
   Saldo Akhir Harusnya: Rp 3.700.000
   Saldo Aktual : Rp 3.700.000
   Selisih      : Rp 0 ✓
   ```
4. Klik **Tutup** → Jurnal akuntansi dibuat otomatis

---

## 12.10 Simulasi Lengkap: Transaksi POS Toko Elektronik

**Skenario**: Pelanggan beli laptop + aksesoris, pakai kode kupon dan bayar split (sebagian tunai, sebagian QRIS).

```
Kasir : Dewi (Shift Pagi)
Waktu : 11:30 WIB, 22 April 2026

STEP 1 — Scan produk:
  - Scan barcode Laptop ASUS VivoBook 14 → Qty: 1
  - Scan barcode Mouse Wireless → Qty: 2
  - Klik Keyboard USB → Qty: 1

STEP 2 — Tambah pelanggan:
  - Cari: Budi Santoso (member)
  - Saldo poin: 2.540 poin

STEP 3 — Terapkan kupon:
  - Masukkan: LEBARAN2026
  - Diskon 10%: -Rp 900.000

STEP 4 — Pembayaran split:
  Laptop + Aksesoris:
    Subtotal : Rp 9.000.000
    Diskon   : -Rp 900.000
    PPN 11%  : Rp 891.000
    TOTAL    : Rp 8.991.000

  Bayar:
    QRIS (GoPay): Rp 5.000.000 [scan QR → konfirmasi]
    Tunai        : Rp 4.000.000
    Kembalian    : Rp     9.000

STEP 5 — Cetak struk:
  Struk tercetak + kirim email ke budi@gmail.com

STEP 6 — Poin loyalty:
  Poin didapat: 899 poin
  Total poin Budi: 3.439 poin
```

---

[← Website & eCommerce](11-website-ecommerce.md) | [Berikutnya: Helpdesk →](13-helpdesk.md)
