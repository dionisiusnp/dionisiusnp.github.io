# Bab 17 — Panduan Migrasi & Perubahan Breaking

[← Studio](16-studio.md) | [Kembali ke Index →](index.md)

---

## 17.1 Gambaran Umum Migrasi ke Odoo 19

Migrasi ke Odoo 19 memerlukan perencanaan yang matang karena versi ini membawa **130 perubahan nama model**, restrukturisasi beberapa modul inti, dan pembaruan sistem yang signifikan. Panduan ini khusus untuk tim teknis dan admin sistem.

---

## 17.2 Jalur Upgrade yang Didukung

### Aturan Wajib: Upgrade Bertahap
```
Odoo 16 → Odoo 17 → Odoo 18 → Odoo 19
```

**TIDAK BISA melompat versi**:
```
✗ Odoo 16 langsung ke Odoo 19
✗ Odoo 17 langsung ke Odoo 19
✗ Odoo 18.0 langsung ke Odoo 19.1
```

Setiap versi menerapkan perubahan database spesifik yang bergantung pada versi sebelumnya.

---

## 17.3 Perubahan Breaking Utama Odoo 19

### 17.3.1 Perubahan HTTP Routes

**Odoo 18 dan sebelumnya**:
```python
@http.route('/api/products', type='json', auth='public')
def get_products(self):
    ...
```

**Odoo 19 (wajib diubah)**:
```python
@http.route('/api/products', type='jsonrpc', auth='public')
def get_products(self):
    ...
```

**Dampak**: Semua modul kustom yang punya JSON routes harus diperbarui.

**Script Pencarian**:
```bash
grep -r "type='json'" /path/to/custom/modules/ --include="*.py"
```

### 17.3.2 Penghapusan Model res.partner.title

**Sebelumnya (Odoo 18)**:
```python
# Model masih ada
partner_title = fields.Many2one('res.partner.title', string='Jabatan')
```

**Odoo 19**:
```
Model res.partner.title dihapus!
Ganti dengan: field text biasa atau Selection field
```

**Script Migrasi**:
```python
# Dalam modul kustom, hapus referensi ke res.partner.title
# dan ganti dengan implementasi baru

# Sebelum:
title = fields.Many2one('res.partner.title')

# Sesudah:
title = fields.Selection([
    ('mr', 'Bpk.'),
    ('mrs', 'Ibu'),
    ('dr', 'Dr.'),
], string='Gelar')
```

### 17.3.3 Restrukturisasi HR Module

**Perubahan Besar**:
- Modul `hr_contract` digabungkan ke `hr` (core)
- Model `hr.contract` diganti menjadi `hr.version`
- Data kontrak **dipreservasi** otomatis saat upgrade

**Dampak pada Modul Kustom**:
```python
# Sebelum (Odoo 18):
from odoo import models
class MyModel(models.Model):
    _inherit = 'hr.contract'
    my_field = fields.Char()

# Sesudah (Odoo 19):
class MyModel(models.Model):
    _inherit = 'hr.version'  # Nama model baru!
    my_field = fields.Char()
```

### 17.3.4 Perubahan Sistem UoM (Unit of Measure)

**Odoo 19** melakukan overhaul sistem UoM:
- Penghapusan kategori UoM yang redundan
- Hubungan langsung yang lebih sederhana
- Konfigurasi UoM lebih intuitif

**Dampak**: Cek semua UoM kustom setelah migrasi, pastikan konversi masih benar.

### 17.3.5 Perubahan Access Control (res.groups)

```python
# Odoo 19 merestrukturisasi kategori res.groups
# Cek semua definisi grup di file XML kustom

# Periksa: ir.model.access.csv dan security/*.xml
# Pastikan group_id masih valid di Odoo 19
```

**Cari potensi masalah**:
```bash
grep -r "group_id" /path/to/custom/modules/ --include="*.csv"
grep -r "groups=" /path/to/custom/modules/ --include="*.xml"
```

### 17.3.6 Total Model yang Berganti Nama (130+)

Beberapa contoh penting:
| Nama Lama (Odoo 18) | Nama Baru (Odoo 19) |
|---------------------|---------------------|
| `hr.contract` | `hr.version` |
| `sale.order.line` field perubahan | cek changelog resmi |
| `purchase.order.line` | cek changelog resmi |

> **Sumber Lengkap**: https://github.com/odoo/odoo/blob/19.0/odoo/upgrade/CHANGES.md

---

## 17.4 Checklist Persiapan Migrasi

### 17.4.1 Audit Kustom Sebelum Migrasi

```bash
# 1. Daftar semua modul kustom
ls /opt/odoo/custom_addons/

# 2. Cari penggunaan type='json' (wajib ganti ke jsonrpc)
grep -r "type='json'" custom_addons/

# 3. Cari referensi res.partner.title
grep -r "res.partner.title" custom_addons/

# 4. Cari referensi hr.contract
grep -r "hr.contract" custom_addons/

# 5. Cari referensi grup access control
grep -r "res.groups" custom_addons/
grep -r "group_id" custom_addons/ --include="*.csv"
```

### 17.4.2 Backup Lengkap

```bash
# Backup database PostgreSQL
pg_dump -U odoo -Fc nama_database > backup_pre_migration_$(date +%Y%m%d_%H%M).dump

# Backup filestore (attachments)
tar -czf filestore_backup_$(date +%Y%m%d).tar.gz /var/lib/odoo/.local/share/Odoo/filestore/

# Backup konfigurasi
cp /etc/odoo/odoo.conf /etc/odoo/odoo.conf.backup
```

### 17.4.3 Setup Staging Environment

```bash
# 1. Buat database staging dari backup produksi
pg_restore -U odoo -d staging_db backup_pre_migration.dump

# 2. Install Odoo 19 di server staging
# (ikuti panduan instalasi Bab 02)

# 3. Test migrasi di staging DULU
# JANGAN migrasi langsung di produksi!
```

---

## 17.5 Proses Migrasi Step-by-Step

### 17.5.1 Fase 1: Test Migrasi di Staging

```bash
# Di server staging
./odoo-bin -d staging_db -u all --stop-after-init

# Cek log error:
tail -f /var/log/odoo/odoo.log | grep -i "error\|warning\|critical"
```

**Yang Perlu Diverifikasi Setelah Upgrade Staging**:
- [ ] Login berhasil
- [ ] Semua modul standar berfungsi
- [ ] Modul kustom tidak error saat load
- [ ] Data karyawan & kontrak masih ada (hr.contract → hr.version)
- [ ] Data UoM masih benar
- [ ] Routes API masih berfungsi
- [ ] Laporan PDF masih generate dengan benar
- [ ] Integrasi payment gateway masih berfungsi

### 17.5.2 Fase 2: Update Modul Kustom

Untuk setiap modul kustom yang bermasalah:

```python
# Buat migration script di modul kustom
# File: custom_module/migrations/19.0.1.0.0/pre-migrate.py

def migrate(cr, version):
    """Migrasi data sebelum upgrade model"""
    # Contoh: pindah data dari hr.contract ke hr.version
    cr.execute("""
        UPDATE my_custom_table 
        SET contract_id_new = contract_id_old
        WHERE contract_id_old IS NOT NULL
    """)
```

### 17.5.3 Fase 3: Upgrade Produksi

**Maintenance Window yang Disarankan**: Sabtu/Minggu dini hari (01:00-06:00 WIB)

```bash
# 1. Beritahu pengguna: sistem akan maintenance
# 2. Stop semua koneksi ke Odoo
sudo systemctl stop odoo

# 3. Backup FINAL sebelum upgrade
pg_dump -U odoo -Fc production_db > FINAL_backup_$(date +%Y%m%d_%H%M).dump

# 4. Install Odoo 19 (atau update jika sudah ada)
sudo apt update && sudo apt upgrade odoo

# 5. Jalankan upgrade dengan update all
sudo -u odoo /usr/bin/odoo -c /etc/odoo/odoo.conf -d production_db -u all --stop-after-init

# 6. Cek log
sudo journalctl -u odoo -f

# 7. Start kembali
sudo systemctl start odoo

# 8. Test login & fungsi dasar
# 9. Beritahu pengguna: sistem kembali normal
```

---

## 17.6 Fitur yang Dihapus/Diubah

### Diubah (Bukan Dihapus)

| Fitur | Odoo 18 | Odoo 19 |
|-------|---------|---------|
| Payroll Batches | Masih ada | Diganti Pay Runs |
| hr.contract | Model `hr.contract` | Model `hr.version` |
| JSON Routes | `type='json'` | `type='jsonrpc'` |
| UoM System | Kategori lama | Sistem baru yang disederhanakan |

### Dihapus Sepenuhnya

| Fitur | Keterangan |
|-------|-----------|
| `res.partner.title` model | Gunakan Selection field |
| Beberapa fungsi deprecated Odoo 17/18 | Cek upgrade notes |

---

## 17.7 Perubahan UI/UX yang Perlu Diketahui Pengguna

Informasikan perubahan ini ke tim pengguna sebelum upgrade:

### 17.7.1 Form View — Tombol Aksi

**Sebelumnya**: Semua tombol aksi terlihat di bar atas
**Odoo 19**: Tombol pertama terlihat penuh, sisanya dalam menu "..." (ellipsis)

### 17.7.2 Mobile — Tampilan List

**Sebelumnya**: Tampilan card di mobile
**Odoo 19**: Tampilan spreadsheet-like (lebih padat, lebih banyak info)

### 17.7.3 Kanban — Tombol Tambah Tahap

**Sebelumnya**: Tombol tersebar
**Odoo 19**: Tombol "Tambah Tahap" lebih bersih dan konsisten

### 17.7.4 Gantt — Tampilan Cerdas

**Sebelumnya**: Zoom manual
**Odoo 19**: Smart zoom otomatis + label lebih jelas

### 17.7.5 Rekrutmen — Board Baru

**Sebelumnya**: Board sederhana
**Odoo 19**: Modern ATS-like dengan drag & drop yang lebih intuitif

---

## 17.8 Panduan Rollback (Jika Ada Masalah Kritis)

Jika setelah upgrade ada masalah kritis yang tidak bisa diselesaikan cepat:

```bash
# STOP Odoo 19
sudo systemctl stop odoo

# Restore backup
sudo -u postgres dropdb production_db
sudo -u postgres createdb production_db
pg_restore -U postgres -d production_db FINAL_backup_20260422.dump

# Install kembali Odoo 18
sudo apt install odoo=18.0.*

# Start Odoo 18
sudo systemctl start odoo
```

> **Catatan**: Rollback hanya bisa ke versi yang backup-nya diambil SEBELUM upgrade. Setelah database diupgrade dan ada transaksi baru, rollback akan kehilangan data transaksi baru tersebut.

---

## 17.9 Kompatibilitas Python 3.12

Odoo 19 memerlukan Python 3.12 (tidak kompatibel dengan Python 3.11):

```bash
# Cek versi Python
python3 --version

# Jika masih 3.11, install 3.12
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.12 python3.12-dev

# Verifikasi
python3.12 --version

# Update virtual environment (jika dari source)
deactivate
python3.12 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

## 17.10 Checklist Final Post-Migrasi

Setelah upgrade ke Odoo 19, verifikasi:

### Fungsionalitas Dasar
- [ ] Login semua akun berhasil
- [ ] Dashboard semua modul terbuka tanpa error
- [ ] Buat SO baru → konfirmasi → kirim → invoice
- [ ] Buat PO baru → konfirmasi → terima → bayar
- [ ] Rekonsiliasi bank berjalan
- [ ] Payroll/Pay Run bisa dijalankan

### Integrasi
- [ ] Email masuk/keluar berfungsi
- [ ] Payment gateway test transaction
- [ ] OCR/AI bekerja (jika Enterprise)
- [ ] Integrasi external API masih berfungsi

### Kustom
- [ ] Semua modul kustom load tanpa error
- [ ] Field kustom masih ada di form
- [ ] Laporan kustom generate dengan benar
- [ ] Aturan otomatis berjalan

### Data
- [ ] Data karyawan & kontrak masih lengkap
- [ ] Stok produk masih benar
- [ ] Bagan akun & jurnal masih lengkap
- [ ] Riwayat transaksi masih bisa diakses

---

## 17.11 Sumber Referensi Migrasi

| Sumber | URL |
|--------|-----|
| Odoo Upgrade Docs | https://www.odoo.com/documentation/19.0/administration/upgrade.html |
| Odoo 19 Changelog | https://github.com/odoo/odoo/blob/19.0/CHANGES.md |
| Community Forum | https://www.odoo.com/forum |
| Migration Script | https://github.com/OCA/openupgradelib |

---

## 17.12 Timeline Rekomendasi Migrasi

```
Minggu 1-2  : Audit kustom, baca breaking changes
Minggu 3    : Setup staging environment
Minggu 4-5  : Test migrasi di staging, fix issues
Minggu 6    : UAT (User Acceptance Testing) di staging
Minggu 7    : Training pengguna tentang perubahan UI
Minggu 8    : Jadwalkan maintenance window produksi
Hari H      : Backup final → Upgrade → Verify → Go-live
```

---

[← Studio](16-studio.md) | [Kembali ke Index →](index.md)
