# Setup Sinkronisasi Data via GitHub Gist

Data Kelola Alteco disimpan di GitHub Gist agar dapat diakses dari semua device.
Viewer cukup buka URL — tidak perlu konfigurasi apapun.
Superadmin perlu melakukan setup sekali berikut ini.

---

## Prasyarat

- Akun GitHub (akun yang memiliki repo `dionisiusnp.github.io`)

---

## Langkah 1 — Buat Gist

1. Buka [gist.github.com](https://gist.github.com)
2. Isi form:
   - **Gist description**: `Alteco Data`
   - **Filename**: `alteco-data.json`
   - **Content**:
     ```json
     {"kelompoks":[],"members":[],"tasks":[],"orgName":"Alteco"}
     ```
3. Klik **"Create secret gist"**
4. Salin **Gist ID** dari URL browser:
   ```
   https://gist.github.com/dionisiusnp/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                        ini Gist ID-nya
   ```

---

## Langkah 2 — Buat Personal Access Token (PAT)

1. Buka [github.com/settings/tokens](https://github.com/settings/tokens)
2. Klik **"Generate new token (classic)"**
3. Isi:
   - **Note**: `alteco-gist`
   - **Expiration**: `No expiration`
   - **Scope**: centang **`gist`** saja
4. Klik **"Generate token"**
5. **Salin token sekarang** — hanya tampil sekali
   ```
   ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

---

## Langkah 3 — Pasang Gist ID ke Kode

Buka file `todolist/index.html`, cari baris:

```javascript
const GIST_ID  = 'GIST_ID_DISINI';
```

Ganti dengan Gist ID yang disalin di Langkah 1:

```javascript
const GIST_ID  = '6bf5ebb0397393324168d3dd14c018c8'; // contoh
```

Commit dan push ke GitHub.

> **Catatan**: Jangan taruh PAT di kode — PAT diinput manual saat login (lihat Langkah 4).

---

## Langkah 4 — Input PAT Saat Login Pertama

1. Buka halaman Kelola Alteco
2. Login dengan kode **superadmin**
3. Muncul prompt:
   ```
   Masukkan GitHub PAT untuk sinkronisasi data:
   ```
4. Paste PAT dari Langkah 2 → klik OK
5. PAT tersimpan di `localStorage` browser — tidak perlu input lagi di browser yang sama

---

## Alur Kerja

| Aksi | Penjelasan |
|------|-----------|
| Buka halaman | Data dimuat dari Gist (semua device dapat data terbaru) |
| Tambah/edit data (admin) | Tersimpan ke Gist dalam ~600ms setelah perubahan |
| Viewer buka halaman | Baca Gist tanpa PAT — tidak perlu konfigurasi |
| Gist tidak terjangkau | Fallback ke data lokal browser |

---

## Reset PAT (jika perlu ganti)

Buka browser console di halaman Kelola Alteco, jalankan:

```javascript
localStorage.removeItem('rak_alteco_pat');
```

Refresh → login ulang sebagai superadmin → input PAT baru.

---

## Revoke PAT (jika bocor)

1. Buka [github.com/settings/tokens](https://github.com/settings/tokens)
2. Klik **Delete** pada token `alteco-gist`
3. Buat PAT baru (ulangi Langkah 2)
4. Reset PAT di browser (lihat bagian Reset PAT di atas)
