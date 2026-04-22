# Bab 02 — Instalasi & Pengaturan Awal Odoo 19

[← Pengantar](01-pengantar.md) | [Berikutnya: CRM →](03-crm.md)

---

## 2.1 Persyaratan Sistem

### Minimum Server
| Komponen | Kebutuhan |
|----------|-----------|
| **OS** | Ubuntu 24.04 LTS (Noble) — direkomendasikan |
| **Python** | Python 3.12 (wajib untuk Odoo 19) |
| **Database** | PostgreSQL 13 atau lebih baru |
| **RAM** | Minimum 2 GB (produksi: 8+ GB) |
| **CPU** | 2 Core (produksi: 4+ Core) |
| **Storage** | 20 GB minimum (produksi: 100+ GB tergantung data) |
| **Browser** | Chrome/Firefox/Edge terbaru |

> **Penting**: Odoo 19 tidak kompatibel dengan Python 3.11 atau lebih lama. Wajib Python 3.12.

---

## 2.2 Metode Instalasi

### Metode A — Instalasi via Paket (Ubuntu/Debian) [Direkomendasikan]

**Langkah 1: Update sistem**
```bash
sudo apt update && sudo apt upgrade -y
```

**Langkah 2: Install dependensi sistem**
```bash
sudo apt install -y python3.12 python3.12-dev python3-pip \
  postgresql postgresql-client \
  libxml2-dev libxslt1-dev libevent-dev \
  libsasl2-dev libldap2-dev \
  libpq-dev \
  wkhtmltopdf \
  git curl wget
```

**Langkah 3: Tambah repositori Odoo**
```bash
# Community Edition
wget -O - https://nightly.odoo.com/odoo.key | sudo gpg --dearmor -o /usr/share/keyrings/odoo-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/odoo-archive-keyring.gpg] https://nightly.odoo.com/19.0/nightly/deb/ ./" \
  | sudo tee /etc/apt/sources.list.d/odoo.list

sudo apt update
```

**Langkah 4: Install Odoo 19**
```bash
sudo apt install -y odoo
```

**Langkah 5: Konfigurasi PostgreSQL**
```bash
sudo -u postgres createuser --createdb --username postgres --no-createrole --no-superuser --pwprompt odoo
# Masukkan password saat diminta
```

**Langkah 6: Edit konfigurasi Odoo**
```bash
sudo nano /etc/odoo/odoo.conf
```

Isi konfigurasi minimal:
```ini
[options]
admin_passwd = GANTI_DENGAN_PASSWORD_KUAT
db_host = False
db_port = False
db_user = odoo
db_password = PASSWORD_POSTGRESQL_ANDA
addons_path = /usr/lib/python3/dist-packages/odoo/addons
logfile = /var/log/odoo/odoo.log
```

**Langkah 7: Start service Odoo**
```bash
sudo systemctl start odoo
sudo systemctl enable odoo
sudo systemctl status odoo
```

**Langkah 8: Akses Odoo**
- Buka browser: `http://localhost:8069`

---

### Metode B — Instalasi dari Source Code (Untuk Developer)

```bash
# Clone repository
git clone https://github.com/odoo/odoo.git --branch 19.0 --depth 1
cd odoo

# Buat virtual environment
python3.12 -m venv venv
source venv/bin/activate

# Install dependensi Python
pip install -r requirements.txt

# Buat database PostgreSQL
createdb myodoo

# Jalankan Odoo
./odoo-bin -d myodoo --addons-path=addons
```

---

### Metode C — Docker (Cepat untuk Testing)

```yaml
# docker-compose.yml
version: '3.1'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: postgres
      POSTGRES_PASSWORD: odoo
      POSTGRES_USER: odoo
    volumes:
      - db-data:/var/lib/postgresql/data

  odoo:
    image: odoo:19.0
    depends_on:
      - db
    ports:
      - "8069:8069"
    environment:
      - HOST=db
      - USER=odoo
      - PASSWORD=odoo
    volumes:
      - odoo-data:/var/lib/odoo

volumes:
  db-data:
  odoo-data:
```

```bash
docker-compose up -d
# Akses di http://localhost:8069
```

---

### Metode D — Fedora/RHEL

```bash
sudo dnf config-manager --add-repo https://nightly.odoo.com/19.0/nightly/rpm/odoo.repo
sudo dnf install -y odoo
sudo systemctl enable --now odoo
```

---

## 2.3 Pengaturan Awal (Initial Setup)

### 2.3.1 Membuat Database Pertama

1. Buka `http://localhost:8069/web/database/manager`
2. Klik **Buat Database**
3. Isi formulir:
   - **Master Password**: Password admin yang Anda set di `odoo.conf`
   - **Nama Database**: Nama database (misal: `perusahaan_saya`)
   - **Email**: Email admin
   - **Password**: Password login admin
   - **Bahasa**: Pilih **Indonesia**
   - **Negara**: Pilih **Indonesia**
   - **Demo Data**: Centang jika ingin data contoh untuk belajar
4. Klik **Buat Database**
5. Tunggu proses instalasi selesai (2-5 menit)

### 2.3.2 Wizard Pengaturan Awal

Setelah login pertama kali, Odoo akan menampilkan wizard setup:

**Langkah 1: Informasi Perusahaan**
- Nama perusahaan
- Industri
- Jumlah karyawan
- Logo perusahaan

**Langkah 2: Pilih Aplikasi**
Centang modul yang dibutuhkan:
- ☑ Penjualan
- ☑ Pembelian
- ☑ Inventaris
- ☑ Akuntansi
- ☑ CRM
- ☑ Penggajian (jika perlu)
- dll.

**Langkah 3: Konfigurasi Awal**
- Mata uang utama (IDR untuk Indonesia)
- Zona waktu (Asia/Jakarta)
- Bahasa antarmuka

---

## 2.4 Konfigurasi Perusahaan

Masuk ke **Pengaturan → Perusahaan**

### Informasi Umum
```
Nama Perusahaan    : PT. Maju Bersama
NPWP               : 01.234.567.8-001.000
Alamat             : Jl. Sudirman No. 1, Jakarta
Telepon            : +62-21-1234567
Website            : https://www.majubersama.co.id
Email              : info@majubersama.co.id
```

### Konfigurasi Akuntansi
1. **Pengaturan → Akuntansi → Mata Uang**
   - Set IDR (Rupiah Indonesia) sebagai mata uang utama
   - Aktifkan multi-mata uang jika perlu

2. **Chart of Accounts**
   - Pilih **Bagan Akun Indonesia** yang disediakan Odoo
   - Atau impor bagan akun khusus perusahaan

3. **Periode Fiskal**
   - Atur awal tahun fiskal (umumnya 1 Januari)

### Konfigurasi Pajak
```
PPN 11% (efektif April 2022)
PPh 21, 22, 23 sesuai regulasi Indonesia
```

---

## 2.5 Manajemen Pengguna

### Membuat Pengguna Baru

1. Masuk ke **Pengaturan → Pengguna & Perusahaan → Pengguna**
2. Klik **Baru**
3. Isi data pengguna:

```
Nama         : Budi Santoso
Login/Email  : budi@majubersama.co.id
Perusahaan   : PT. Maju Bersama
Bahasa       : Bahasa Indonesia
Zona Waktu   : Asia/Jakarta
```

4. Atur **Hak Akses** per modul:

| Modul | Level Akses |
|-------|-------------|
| Penjualan | Pengguna |
| Inventaris | Pengguna |
| Akuntansi | Pengguna / Akuntan / Manajer |
| Pembelian | Pengguna |
| HR | Petugas HR |
| Teknis | ✗ (hanya untuk admin) |

5. Klik **Simpan** → Pengguna akan mendapat email undangan

### Tipe Pengguna
- **Pengguna Internal**: Akses penuh ke aplikasi back-office
- **Portal**: Akses terbatas hanya ke portal pelanggan (lihat order, invoice)
- **Publik**: Pengunjung website tanpa akun

---

## 2.6 Pengaturan Email (SMTP/IMAP)

### Konfigurasi Email Keluar (SMTP)

1. **Pengaturan → Teknis → Email Keluar**
2. Klik **Baru**

```
Deskripsi     : Gmail Perusahaan
Host SMTP      : smtp.gmail.com
Port           : 587
Enkripsi       : TLS (STARTTLS)
Username       : info@majubersama.co.id
Password       : App Password Google
```

> Untuk Gmail: Aktifkan verifikasi 2 langkah → buat App Password khusus Odoo

### Konfigurasi Email Masuk (IMAP)

1. **Pengaturan → Teknis → Server Email Masuk**
2. Klik **Baru**

```
Nama          : CRM Leads
Tipe Server   : IMAP
Host          : imap.gmail.com
Port          : 993
SSL/TLS       : ✓
Username      : leads@majubersama.co.id
Password      : App Password
Tindakan      : Buat Lead (CRM)
```

---

## 2.7 Keamanan Sistem

### Rekomendasi Keamanan Produksi

**1. Proteksi Database Manager**
```ini
# /etc/odoo/odoo.conf
admin_passwd = [GENERATE RANDOM STRING 32+ KARAKTER]
```

**2. Konfigurasi HTTPS (Nginx sebagai Reverse Proxy)**
```nginx
server {
    listen 443 ssl;
    server_name odoo.majubersama.co.id;

    ssl_certificate /etc/ssl/certs/majubersama.crt;
    ssl_certificate_key /etc/ssl/private/majubersama.key;

    location / {
        proxy_pass http://127.0.0.1:8069;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**3. Backup Otomatis**
```bash
# Tambahkan ke crontab
0 2 * * * pg_dump -U odoo nama_database | gzip > /backup/odoo_$(date +%Y%m%d).sql.gz
```

**4. 2FA (Two-Factor Authentication)**
- Aktifkan di **Pengaturan → Keamanan**
- Wajibkan untuk semua pengguna admin

---

## 2.8 Pengaturan Lokalisasi Indonesia

### Install Lokalisasi Akuntansi Indonesia

1. Masuk ke **Aplikasi**
2. Cari "Indonesia"
3. Install **Indonesia - Accounting**

Ini akan menambahkan:
- Bagan akun standar Indonesia
- Konfigurasi pajak PPN
- Format laporan keuangan

### Konfigurasi Wilayah Indonesia

1. **Pengaturan → Teknis → Negara → Indonesia**
2. Pastikan provinsi dan kota telah terdaftar
3. Untuk otomatisasi penomoran faktur sesuai regulasi Indonesia:
   - Atur format nomor faktur pajak

---

## 2.9 Simulasi: Setup Lengkap untuk UKM Baru

**Skenario**: PT. Toko Berkah — toko elektronik dengan 10 karyawan

**Step 1**: Install modul:
- CRM ✓, Penjualan ✓, Pembelian ✓, Inventaris ✓, Akuntansi ✓, HR ✓

**Step 2**: Buat 3 pengguna:
- Admin (full access)
- Sales Manager (CRM + Penjualan)
- Akuntan (Akuntansi only)

**Step 3**: Konfigurasi produk awal:
```
Kategori: Elektronik → Laptop, HP, Aksesoris
Unit: Pcs, Set, Box
```

**Step 4**: Setup gudang:
```
Gudang Utama: Jakarta
Lokasi: Penerimaan / Penyimpanan / Pengiriman
```

**Step 5**: Setup akuntansi:
```
Mata Uang: IDR
PPN: 11%
Chart of Accounts: Indonesia Standard
```

**Step 6**: Test transaksi pertama:
- Buat pelanggan → Buat penawaran → Konfirmasi → Kirim → Invoice

---

[← Pengantar](01-pengantar.md) | [Berikutnya: CRM →](03-crm.md)
