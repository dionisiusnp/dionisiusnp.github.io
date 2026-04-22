# Bab 15 — AI & Otomatisasi Cerdas

[← Marketing](14-marketing.md) | [Berikutnya: Studio →](16-studio.md)

---

## 15.1 Gambaran Umum AI di Odoo 19

Odoo 19 adalah versi pertama di mana **AI bukan sekadar fitur tambahan**, melainkan fondasi inti sistem. Berbeda dengan plugin AI pihak ketiga, AI di Odoo 19 tertanam langsung di setiap modul dan memahami konteks data bisnis Anda.

### Komponen AI Utama Odoo 19

```
┌─────────────────────────────────────────────────────────────┐
│                      ODOO AI ENGINE                         │
│                                                             │
│  ┌──────────────┐  ┌─────────────────┐  ┌───────────────┐  │
│  │  AI Agents   │  │  AI Server      │  │  AI Fields    │  │
│  │ (Chatbot     │  │  Actions (No-   │  │  (Studio)     │  │
│  │  Asisten)    │  │  Code Automation│  │               │  │
│  └──────────────┘  └─────────────────┘  └───────────────┘  │
│                                                             │
│  ┌──────────────┐  ┌─────────────────┐  ┌───────────────┐  │
│  │  Document    │  │  Natural        │  │  Smart Email  │  │
│  │  Intelligence│  │  Language Search│  │  Drafting     │  │
│  │  (OCR + AI)  │  │               │  │               │  │
│  └──────────────┘  └─────────────────┘  └───────────────┘  │
└─────────────────────────────────────────────────────────────┘
           │                      │
    ┌──────┴──────┐        ┌──────┴──────┐
    │  ChatGPT    │        │   Google    │
    │  (OpenAI)   │        │   Gemini    │
    └─────────────┘        └─────────────┘
```

---

## 15.2 Setup AI di Odoo 19

### 15.2.1 Aktifkan Modul AI

1. Masuk ke **Aplikasi**
2. Cari "AI"
3. Install **Odoo AI** (Enterprise)

### 15.2.2 Konfigurasi Provider AI

**AI → Konfigurasi → Provider AI**

**Opsi A — OpenAI (ChatGPT)**:
```
Provider    : OpenAI
API Key     : sk-proj-xxxxxxxxxxxxxxxxxxxx
Model       : GPT-4o (paling akurat)
             atau GPT-4o-mini (lebih murah)
Verifikasi  : [Klik Test Koneksi]
```

**Opsi B — Google Gemini**:
```
Provider    : Google AI
API Key     : AIzaSyxxxxxxxxxxxxxxxxxxxxxxxx
Model       : Gemini 1.5 Pro
Verifikasi  : [Klik Test Koneksi]
```

**Cara Dapatkan API Key**:
- OpenAI: platform.openai.com → API Keys → Create
- Google: makersuite.google.com → API Key → Create

---

## 15.3 AI Agents (Agen AI)

### 15.3.1 Apa Itu AI Agents?

AI Agents adalah **asisten percakapan** yang tidak hanya menjawab pertanyaan, tetapi juga **mengeksekusi tindakan** di dalam Odoo. Bedanya dengan chatbot biasa:

| Chatbot Biasa | AI Agent Odoo 19 |
|--------------|-----------------|
| Jawab FAQ statis | Jawab berdasarkan data Odoo Anda |
| Tidak bisa aksi | Bisa buat record, update data |
| Tidak tahu konteks bisnis | Tahu semua data CRM, Sales, dll. |

### 15.3.2 Membuat AI Agent

**AI → Konfigurasi → Agents** → Klik **Baru**

**Contoh Agent 1 — Sales Assistant**:
```
Nama           : Sales Assistant
Avatar         : 🤖
Deskripsi      : Asisten untuk tim penjualan

Model AI       : GPT-4o

Izin Akses:
  ✓ Baca: CRM Pipeline, Sales Orders, Produk
  ✓ Tulis: Buat Lead, Update Status Peluang
  ✗ Tidak bisa: Hapus data, akses akuntansi

Prompt Sistem:
  "Anda adalah asisten penjualan PT. Toko Berkah. 
   Bantu tim sales dengan analisis pipeline, 
   buat lead baru, dan update status peluang.
   Jawab dalam Bahasa Indonesia."

Tools yang Diizinkan:
  ✓ search_leads        (cari lead)
  ✓ create_lead         (buat lead baru)
  ✓ update_opportunity  (update peluang)
  ✓ get_pipeline_stats  (statistik pipeline)
  ✓ search_products     (cari produk)
```

**Contoh Agent 2 — HR Bot**:
```
Nama     : HR Assistant
Akses    : Karyawan, Cuti, Jadwal
Tools    : cek_saldo_cuti, ajukan_cuti, cari_karyawan
```

### 15.3.3 Cara Menggunakan AI Agent

Di modul **Discuss** (chat internal Odoo):
1. Buka Discuss → Cari "@Sales Assistant"
2. Ketik pertanyaan:

```
User: "Berapa peluang yang mendekati tenggat bulan ini?"

AI Agent: "Halo! Ada 8 peluang yang tenggat bulan April 2026:

1. PT. Sukses Makmur — Rp 250jt — Due: 28 Apr (6 hari lagi)
   Status: Negosiasi | Penjual: Dewi
   
2. CV. Bersama Maju — Rp 45jt — Due: 30 Apr (8 hari lagi)
   Status: Proposal Dikirim | Penjual: Budi
   
[...dan 6 lainnya]

Total nilai: Rp 1.2 Miliar
Rekomendasi: Prioritaskan PT. Sukses Makmur dan CV. Bersama Maju 
minggu ini karena paling dekat deadline-nya."
```

```
User: "Buat lead baru dari: PT. Maju Sejahtera, kontak Pak Ahmad, 
       email ahmad@majusejahtera.co.id, telepon 0813-1234-5678, 
       dari referensi Pak Budi"

AI Agent: "Lead baru berhasil dibuat!
  Perusahaan: PT. Maju Sejahtera
  Kontak: Ahmad
  Email: ahmad@majusejahtera.co.id
  Telepon: 0813-1234-5678
  Sumber: Referensi (Budi)
  ID: LEAD-2026-0456
  
Ingin saya jadwalkan panggilan kualifikasi untuk lead ini?"
```

---

## 15.4 AI Server Actions (No-Code Automation)

### 15.4.1 Apa Itu AI Server Actions?

Server Actions adalah aturan otomatis yang berjalan berdasarkan trigger. Di Odoo 19, Anda bisa mendefinisikan aksi dengan **bahasa alami** — tidak perlu coding Python.

### 15.4.2 Contoh AI Server Actions

**Pengaturan → Teknis → Automasi → AI Server Actions**

**Action 1 — Pengingat Faktur Jatuh Tempo**:
```
Nama          : Kirim Pengingat Faktur Jatuh Tempo
Model         : Akun Tagihan (account.move)
Trigger       : Berdasarkan Waktu
Kondisi Waktu : Tanggal Jatuh Tempo = Hari Ini
Filter Data   : Status = Belum Dibayar

Aksi AI (Bahasa Alami):
"Kirim email pengingat kepada pelanggan bahwa faktur #{number} 
 senilai #{amount} jatuh tempo hari ini. Gunakan nada ramah 
 tapi jelas."

→ Odoo AI terjemahkan ke kode Python dan jalankan
```

**Action 2 — Auto Restock dari Sales**:
```
Nama     : Auto Buat PO Saat Stok Kritis
Model    : Produk (product.product)
Trigger  : Ketika Record Diperbarui
Kondisi  : Qty Stok Tersedia < Qty Minimum
Aksi AI  :
"Buat Request for Quotation ke vendor pilihan produk ini 
 untuk mengisi stok hingga stok maksimum."
```

**Action 3 — Eskalasi Tiket Overdue**:
```
Nama     : Eskalasi Tiket Terlambat
Model    : Tiket Helpdesk
Trigger  : Berdasarkan Waktu
Kondisi  : Tiket terbuka > 48 jam tanpa respons
Aksi AI  :
"Ubah prioritas tiket menjadi Tinggi, assign ulang ke manajer 
 support, dan kirim notifikasi email ke pelanggan bahwa kami 
 sedang memprioritaskan kasus mereka."
```

**Action 4 — Nurturing Lead Otomatis**:
```
Nama     : Follow-up Lead Tidak Aktif
Model    : Peluang CRM
Trigger  : Berdasarkan Waktu
Kondisi  : Tidak ada aktivitas > 7 hari
Aksi AI  :
"Buat aktivitas panggilan untuk penjual yang ditugaskan, 
 dengan catatan 'Follow up peluang yang tidak ada aktivitas 
 selama 7 hari'. Jadwalkan untuk besok."
```

### 15.4.3 Keunggulan AI Server Actions Odoo 19

- **Lebih banyak operator** dibanding Odoo 18
- **Performa lebih tinggi** — delay eksekusi lebih rendah
- **Bahasa alami** → tidak perlu tahu syntax Python
- **Preview aksi** sebelum diaktifkan

---

## 15.5 Natural Language Search (Pencarian Bahasa Alami)

### 15.5.1 Cara Kerja

Di halaman list/kanban apapun, klik search bar dan ketik pertanyaan:

```
Sebelum (filter teknis):
  domain: [('state', '=', 'sale'), ('partner_id.city', '=', 'Jakarta'), 
           ('amount_total', '>', 10000000)]

Sesudah (Natural Language):
  "Pesanan penjualan yang sudah dikonfirmasi dari Jakarta di atas 10 juta"
```

### 15.5.2 Contoh Penggunaan

**Di CRM**:
```
"Peluang yang belum ada aktivitas minggu ini dengan nilai di atas 100 juta"
"Lead dari sumber website yang masuk bulan April"
"Pelanggan di Surabaya yang belum pernah beli"
```

**Di Akuntansi**:
```
"Faktur yang jatuh tempo bulan ini yang belum dibayar"
"Pelanggan yang punya utang lebih dari 3 bulan"
"Invoice di atas 50 juta yang sudah dibayar bulan lalu"
```

**Di Inventaris**:
```
"Produk dengan stok di bawah minimum reorder"
"Laptop yang tidak terjual 3 bulan terakhir"
```

---

## 15.6 Document Intelligence (AI OCR)

### 15.6.1 Cara Kerja

Upload dokumen → AI baca & ekstrak data → Pre-fill form

**Dokumen yang Didukung**:
- Faktur vendor (PDF/scan)
- Kwitansi belanja
- Dokumen identitas (NPWP, KTP)
- Kontrak (ekstrak tanggal & pihak)

### 15.6.2 Proses Upload Faktur dengan AI OCR

1. **Akuntansi → Vendor → Faktur**
2. Klik tombol **Upload**
3. Drop file PDF faktur vendor
4. AI memproses (2-5 detik):
   ```
   AI Membaca:
     Vendor   : PT. DEN (cocokkan ke kontak Odoo)
     No Faktur: INV-DEN-2026-0456
     Tanggal  : 20 April 2026
     Item     : Laptop ASUS × 20 @ Rp 6.800.000
     PPN 11%  : Rp 14.960.000
     Total    : Rp 150.960.000
   ```
5. Form terisi otomatis → Review → Konfirmasi

**Tingkat Akurasi**: ~95% untuk faktur yang tercetak rapi.

---

## 15.7 Smart Email Drafting

### 15.7.1 Di Mana Tersedia

Fitur ini tersedia di mana pun ada kotak kirim email di Odoo:
- CRM — follow-up peluang
- Helpdesk — balas tiket
- Sales — kirim penawaran
- Purchase — komunikasi dengan vendor
- HR — komunikasi dengan kandidat

### 15.7.2 Cara Menggunakan

1. Klik **Kirim Email** / **Balas**
2. Klik ikon ✨ (AI) di toolbar editor email
3. Pilih mode:

**Mode 1 — Auto-draft berdasarkan konteks**:
AI menganalisis seluruh riwayat dan menulis email yang relevan.

**Mode 2 — Dari prompt Anda**:
```
Prompt: "Tulis email follow-up ke PT. Sukses Makmur setelah 
demo kemarin. Tekankan: ROI 30% dari otomatisasi, dan tawarkan 
uji coba gratis 30 hari."

AI Draft:
"Yth. Bapak Rudi Hartono,

Terima kasih atas waktu Bapak kemarin untuk sesi demo sistem ERP 
kami. Kami sangat senang dapat menunjukkan bagaimana Odoo 19 dapat 
mentransformasi operasional PT. Sukses Makmur.

Sebagaimana telah kami demonstrasikan, implementasi Odoo rata-rata 
memberikan penghematan waktu operasional hingga 30% — yang 
berarti tim Bapak dapat fokus pada hal-hal strategis alih-alih 
pekerjaan administratif berulang.

Untuk memudahkan evaluasi, kami ingin menawarkan periode uji coba 
gratis selama 30 hari tanpa komitmen apapun. Selama masa percobaan 
ini, tim kami akan mendampingi penuh...

[lanjutan email]"
```

**Mode 3 — Tone Adjustment**:
- Formal / Semi-formal / Santai
- Tegas / Persuasif / Informatif

---

## 15.8 AI Fields di Studio

### 15.8.1 Apa Itu AI Fields?

Dengan **Odoo Studio** + **AI**, Anda bisa tambahkan field yang **otomatis diisi AI** berdasarkan data record lainnya.

### 15.8.2 Contoh AI Fields

**Field: "Ringkasan Peluang" di CRM**:
```
Pengaturan AI Field:
  Prompt: "Buat ringkasan singkat (2-3 kalimat) tentang peluang ini, 
           mencakup: pelanggan, nilai, tahap, dan tindakan yang 
           disarankan."

Hasil Otomatis:
  "PT. Sukses Makmur sedang dalam tahap negosiasi untuk proyek ERP 
   senilai Rp 250 juta. Demo berhasil dilakukan dan klien 
   menunjukkan ketertarikan pada modul Akuntansi dan HR. 
   Disarankan untuk follow-up dalam 2 hari dan kirimkan proposal 
   terperinci."
```

**Field: "Catatan Risiko Proyek"**:
```
Prompt: "Identifikasi potensi risiko proyek ini berdasarkan 
         deadline, budget, dan task yang overdue."
```

---

## 15.9 AI dalam Setiap Modul (Ringkasan)

| Modul | Fitur AI |
|-------|---------|
| **CRM** | Skor lead prediktif, ringkasan otomatis, tindakan terbaik |
| **Sales** | Draft email penawaran, analisis deal |
| **Helpdesk** | Smart response, klasifikasi tiket, saran resolusi |
| **Akuntansi** | OCR faktur, rekonsiliasi otomatis |
| **HR** | Otomatisasi alur cuti, validasi aturan |
| **Pembelian** | Rekomendasi vendor, analisis harga |
| **Inventaris** | Prediksi kebutuhan stok |
| **Manufaktur** | Optimasi jadwal produksi |
| **Website** | Saran SEO, konten produk |
| **Rekrutmen** | Skor kandidat, rangkuman CV |

---

## 15.10 Automation Non-AI (Aturan Otomatis Standar)

Selain AI, Odoo memiliki sistem otomatisasi standar yang kuat:

### 15.10.1 Aturan Otomatis (Automated Actions)

**Pengaturan → Teknis → Automasi → Aturan Otomatis**

**Contoh 1 — Welcome Email untuk Pelanggan Baru**:
```
Model   : Pelanggan (res.partner)
Trigger : Dibuat
Kondisi : Is Company = True
Aksi    : Kirim email template "Selamat Datang Pelanggan"
```

**Contoh 2 — Escalate Peluang Stagnan**:
```
Model   : Peluang CRM
Trigger : Berdasarkan Waktu
Waktu   : 10 hari setelah modifikasi terakhir
Kondisi : Tahap bukan "Menang" atau "Kalah"
Aksi    : Ubah Prioritas → Tinggi
          Tambah aktivitas: "Peluang tidak ada update 10 hari"
          Kirim email ke manajer penjualan
```

### 15.10.2 Scheduled Actions (Cron Jobs)

Tugas yang berjalan otomatis terjadwal:

**Pengaturan → Teknis → Automasi → Scheduled Actions**

```
Nama       : Laporan Pipeline Harian
Interval   : Setiap hari pukul 08:00
Aksi       : Kirim ringkasan pipeline ke semua manajer penjualan

Nama       : Periksa Stok Kritis
Interval   : Setiap 6 jam
Aksi       : Cek produk di bawah minimum → Buat notifikasi

Nama       : Sync Kurs Mata Uang
Interval   : Setiap hari
Aksi       : Perbarui kurs dari sumber eksternal
```

---

## 15.11 Simulasi: AI dalam Praktik Sehari-hari

**Pagi hari di PT. Toko Berkah:**

```
08:00 — Scheduled Action: Laporan pipeline dikirim ke semua manajer
        "Pipeline hari ini: 28 peluang aktif, 3 jatuh tempo minggu ini"

08:15 — Dewi (Sales Manager) buka Odoo
        AI Agent: "Selamat pagi Dewi! 
                   Ada 3 prioritas hari ini:
                   1. PT. Sukses Makmur (tenggat 3 hari)
                   2. 2 faktur jatuh tempo yang belum difollow-up
                   3. 5 lead baru dari website perlu dikualifikasi"

08:30 — Dewi klik peluang PT. Sukses Makmur
        AI auto-generate: Ringkasan riwayat komunikasi 3 bulan
        Saran tindakan: "Kirim proposal final hari ini"

08:45 — Dewi klik "Kirim Email" → AI draft follow-up email
        Edit minor → Kirim

09:00 — Email masuk dari vendor dengan invoice
        AI OCR membaca invoice otomatis
        Akuntan review & konfirmasi (30 detik, bukan 10 menit)

09:30 — Helpdesk: Tiket baru masuk
        AI klasifikasi: Hardware, Prioritas Tinggi
        Smart assignment: Ke Agus (paling sedikit tiket, tidak cuti)
        AI draft respons awal: Langkah troubleshoot

10:00 — Marketing: Campaign nurturing berjalan otomatis
        Email ke 45 lead yang membuka email minggu lalu
        (trigger: 7 hari setelah email pertama)
```

---

[← Marketing](14-marketing.md) | [Berikutnya: Studio →](16-studio.md)
