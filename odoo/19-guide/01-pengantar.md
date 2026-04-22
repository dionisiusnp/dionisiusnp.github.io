# Bab 01 — Pengantar & Gambaran Umum Odoo 19

[← Kembali ke Index](index.md) | [Berikutnya: Instalasi →](02-instalasi-setup.md)

---

## 1.1 Apa Itu Odoo?

**Odoo** adalah platform ERP (Enterprise Resource Planning) open-source berbasis web yang mengintegrasikan seluruh proses bisnis dalam satu sistem terpadu. Odoo mencakup lebih dari 50 modul resmi yang saling terhubung, mulai dari penjualan, pembelian, inventaris, akuntansi, HR, hingga eCommerce.

### Keunggulan Utama Odoo

| Aspek | Keterangan |
|-------|------------|
| **Open Source** | Community Edition gratis, source code terbuka |
| **Modular** | Pasang hanya modul yang dibutuhkan |
| **Terintegrasi** | Data mengalir otomatis antar modul |
| **Skalabel** | Cocok untuk UKM hingga perusahaan besar |
| **Cloud & On-Premise** | Bisa di-hosting sendiri atau pakai Odoo.sh |

---

## 1.2 Odoo 19 — Rilis & Timeline

| Versi | Tanggal Rilis | Catatan |
|-------|--------------|---------|
| Odoo 19.0 | September 2025 | Rilis utama di Odoo Experience 2025, Brussel |
| Odoo 19.1 | Januari 2026 | Patch penyempurnaan & perbaikan bug |
| Odoo 19.2 | Maret 2026 | Peningkatan fitur lanjutan |

---

## 1.3 Tema Utama Odoo 19

### 1.3.1 AI-First (Kecerdasan Buatan Terintegrasi)

Odoo 19 adalah versi pertama yang menjadikan AI sebagai fondasi inti, bukan sekadar fitur tambahan:

- **AI Agents**: Asisten obrolan yang dapat menjalankan tindakan di dalam modul Odoo
- **AI Server Actions**: Otomatisasi workflow dengan prompt bahasa alami tanpa coding
- **AI Fields di Studio**: Mengisi field secara otomatis berdasarkan prompt dan data record
- **Document Intelligence**: OCR, klasifikasi, dan perutean dokumen otomatis
- **Penyedia AI yang Didukung**: ChatGPT (OpenAI) dan Google Gemini

> **Contoh Nyata**: Ketikkan "Kirim pengingat ke semua pelanggan dengan faktur jatuh tempo" — Odoo AI akan langsung mengeksekusinya tanpa perlu membuat aturan manual.

### 1.3.2 Mobile-First Design

- Tampilan list seperti spreadsheet di perangkat mobile
- Kanban view yang lebih bersih dengan tombol "Tambah Tahap" yang dioptimalkan
- Tombol aksi form: aksi pertama terlihat penuh, sisanya dalam menu ellipsis
- Mengurangi sentuhan tidak sengaja (accidental taps)
- Checkout keranjang belanja off-canvas di mobile

### 1.3.3 Otomatisasi Tanpa Kode (No-Code Automation)

- Lebih banyak operator dalam workflow automation dibanding Odoo 18
- Performa lebih tinggi dan penundaan eksekusi lebih rendah
- Definisi workflow dengan bahasa alami

### 1.3.4 Pembaruan UX/UI

- Antarmuka lebih bersih dengan lebih sedikit klik
- Komponen modular yang konsisten di semua aplikasi
- Tampilan Gantt cerdas berdasarkan skala tugas
- Excel-like features: resize kolom, drag & drop, inline editing

---

## 1.4 Modul-Modul Odoo 19

### Kelompok Penjualan & Pemasaran
| Modul | Fungsi |
|-------|--------|
| **CRM** | Manajemen lead, pipeline peluang, skor prospek |
| **Sales** | Penawaran, pesanan penjualan, invoice |
| **Point of Sale** | Kasir toko fisik, restoran |
| **Email Marketing** | Kampanye email, segmentasi |
| **Marketing Automation** | Otomatisasi nurturing leads |
| **Events** | Manajemen acara & pendaftaran |
| **Surveys** | Survei & kuesioner |

### Kelompok Operasional
| Modul | Fungsi |
|-------|--------|
| **Inventory** | Stok, gudang, rute pengiriman |
| **Purchase** | Pembelian, vendor, RFQ |
| **Manufacturing** | Produksi, BOM, work order |
| **Quality** | Kontrol kualitas, pemeriksaan |
| **Maintenance** | Perawatan mesin & aset |
| **Field Service** | Layanan lapangan & teknisi |
| **Rental** | Manajemen sewa aset |

### Kelompok Keuangan
| Modul | Fungsi |
|-------|--------|
| **Accounting** | Pembukuan, faktur, rekonsiliasi bank |
| **Invoicing** | Faktur sederhana (tanpa akuntansi penuh) |
| **Expenses** | Klaim pengeluaran karyawan |
| **Payroll** | Penggajian & slip gaji |
| **Subscriptions** | Tagihan berlangganan berulang |

### Kelompok SDM
| Modul | Fungsi |
|-------|--------|
| **Employees** | Data karyawan & kontrak |
| **Recruitment** | ATS, lowongan, wawancara |
| **Time Off** | Cuti & absensi |
| **Attendance** | Rekam kehadiran |
| **Appraisals** | Penilaian kinerja |
| **Referrals** | Program referral karyawan |
| **Fleet** | Manajemen armada kendaraan |

### Kelompok Proyek & Produktivitas
| Modul | Fungsi |
|-------|--------|
| **Project** | Manajemen proyek, Kanban, Gantt |
| **Timesheets** | Pencatatan jam kerja |
| **Planning** | Perencanaan shift & jadwal |
| **Helpdesk** | Tiket dukungan pelanggan |
| **Documents** | Manajemen dokumen & DMS |

### Kelompok Website & eCommerce
| Modul | Fungsi |
|-------|--------|
| **Website** | Builder halaman website |
| **eCommerce** | Toko online |
| **Live Chat** | Chat langsung di website |
| **Appointments** | Booking janji temu online |
| **eLearning** | Platform pembelajaran online |
| **Forum** | Forum diskusi komunitas |
| **Blog** | Pengelolaan blog |

### Kelompok Produktivitas
| Modul | Fungsi |
|-------|--------|
| **Discuss** | Pesan internal & obrolan tim |
| **Calendar** | Kalender & jadwal pertemuan |
| **Contacts** | Direktori kontak & perusahaan |
| **IoT** | Integrasi perangkat IoT |
| **AI** | `[Enterprise]` Agen & otomatisasi AI |
| **Studio** | `[Enterprise]` Kustomisasi tanpa kode |
| **Sign** | Tanda tangan digital dokumen |
| **Spreadsheet** | Spreadsheet terintegrasi Odoo |

---

## 1.5 Odoo Community vs Enterprise

| Fitur | Community | Enterprise |
|-------|-----------|------------|
| Harga | Gratis | Berbayar per pengguna/bulan |
| Kode Sumber | Terbuka (LGPL) | Tertutup untuk modul eksklusif |
| Odoo Studio | ✗ | ✓ |
| AI & Agen | ✗ | ✓ |
| Odoo.sh Hosting | ✗ | ✓ |
| Modul Akuntansi Lengkap | ✗ | ✓ |
| Dukungan Resmi | Komunitas | Dukungan Odoo SA |
| Payroll Lengkap | ✗ | ✓ |
| Sign (Tanda Tangan Digital) | ✗ | ✓ |
| Laporan & BI | Terbatas | Penuh |

---

## 1.6 Cara Mengakses Odoo 19

### Opsi 1 — Odoo.com (Cloud/SaaS)
1. Kunjungi `https://www.odoo.com`
2. Klik **Mulai Uji Coba Gratis**
3. Pilih modul yang dibutuhkan
4. Daftar dengan email bisnis
5. Langsung dapat akses 15 hari gratis

### Opsi 2 — Odoo.sh (Platform as a Service)
- Hosting di infrastruktur Odoo SA
- CI/CD terintegrasi untuk developer
- Multi-instance (staging, development, production)

### Opsi 3 — Self-Hosted (On-Premise)
- Install di server sendiri (Ubuntu 24.04 direkomendasikan)
- Kontrol penuh atas data
- Lihat [Bab 02](02-instalasi-setup.md) untuk panduan instalasi

---

## 1.7 Arsitektur Sistem Odoo 19

```
┌─────────────────────────────────────────────────┐
│                  Browser / Mobile App            │
└───────────────────────┬─────────────────────────┘
                        │ HTTP/HTTPS
┌───────────────────────▼─────────────────────────┐
│              Odoo Server (Python 3.12)           │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │ ORM Layer│  │ Controllers│  │  AI Engine  │   │
│  └──────────┘  └──────────┘  └──────────────┘   │
│  ┌──────────────────────────────────────────┐    │
│  │           Module Registry (50+ modul)    │    │
│  └──────────────────────────────────────────┘    │
└───────────────────────┬─────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────┐
│           PostgreSQL 13+ Database                │
└─────────────────────────────────────────────────┘
```

---

## 1.8 Navigasi Antarmuka Odoo 19

### Menu Utama (Home)
- **Kiri Atas**: Logo Odoo → Kembali ke beranda
- **Grid Icon (⊞)**: Daftar semua aplikasi terinstal
- **Search Bar**: Pencarian global lintas modul
- **Bell (🔔)**: Notifikasi & aktivitas
- **Chat (💬)**: Pesan & diskusi tim
- **Avatar**: Pengaturan profil & preferensi

### Navigasi Dalam Modul
- **Breadcrumb**: Pelacak posisi navigasi
- **Views**: Pilih tampilan (Kanban, List, Form, Gantt, Calendar, Map)
- **Filters & Group By**: Filter dan pengelompokan data
- **Favorites**: Simpan kombinasi filter yang sering dipakai

### Pintasan Keyboard
| Shortcut | Fungsi |
|----------|--------|
| `Alt + N` | Buat record baru |
| `Alt + S` | Simpan record |
| `Escape` | Keluar/batalkan edit |
| `Alt + F` | Buka pencarian |

---

[← Kembali ke Index](index.md) | [Berikutnya: Instalasi →](02-instalasi-setup.md)
