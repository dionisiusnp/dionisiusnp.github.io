# Scraper Kemendikdasmen — Referensi Data Sekolah

**Target:** `https://referensi.data.kemendikdasmen.go.id/pendidikan/npsn/{NPSN}`
**Data diambil:** Tab Identitas Satuan Pendidikan + Tab Kontak
**Catatan:** Halaman statis (bukan AJAX) — semua data sudah ada di HTML

---

## Cara Pakai

1. Buka `https://referensi.data.kemendikdasmen.go.id` di Chrome
2. Tekan `F12` → Console
3. Isi daftar NPSN di bagian konfigurasi, lalu paste dan jalankan
4. Tunggu selesai — Excel otomatis terdownload

---

## Script Utama

```javascript
(async function scanSekolah() {
  'use strict';

  // ╔══════════════════════════════════════════════════════╗
  // ║              KONFIGURASI — UBAH DI SINI              ║
  const START_NPSN = 70000000;  // ← mulai dari NPSN berapa
  const END_NPSN   = 70070000;  // ← sampai NPSN berapa
  // ╚══════════════════════════════════════════════════════╝

  const CONCURRENCY   = 3;    // request paralel
  const DELAY_MIN     = 500;  // ms jeda minimum antar batch
  const DELAY_MAX     = 1500; // ms jeda maksimum antar batch
  const REST_EVERY    = 60;   // istirahat panjang setiap N batch
  const REST_DURATION = 6000; // ms durasi istirahat panjang
  const LOG_EVERY     = 10;   // log progress setiap N batch

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const rand  = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

  // Load SheetJS
  async function loadSheetJS() {
    if (window.XLSX) return;
    await new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.sheetjs.com/xlsx-0.20.2/package/dist/xlsx.full.min.js';
      s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
    console.log('✅ SheetJS loaded');
  }

  // Load progress sebelumnya
  window._sekolahResults = window._sekolahResults?.length
    ? window._sekolahResults
    : JSON.parse(localStorage.getItem('sekolah_results') || '[]');

  const doneFinal = new Set(window._sekolahResults.map(r => Number(r.npsn)));

  // Buat daftar NPSN yang belum diproses
  const todo = [];
  for (let i = START_NPSN; i <= END_NPSN; i++) {
    if (!doneFinal.has(i)) todo.push(i);
  }

  console.log(`📂 Sebelumnya: ${window._sekolahResults.length} sekolah tersimpan`);
  console.log(`🚀 Scan NPSN ${START_NPSN}–${END_NPSN} | ${todo.length} ID tersisa`);
  console.log(`   CONCURRENCY=${CONCURRENCY} | jeda ${DELAY_MIN}–${DELAY_MAX}ms | log tiap ${LOG_EVERY} batch`);

  // ── Parser: ekstrak data dari HTML halaman ─────────────
  function parseSekolah(html, npsn) {
    const doc = new DOMParser().parseFromString(html, 'text/html');

    // Helper ambil value dari label di tabel/list
    function extractField(label) {
      // Cari <td> atau <dd> atau <span> yang mengandung label, ambil sibling/next berikutnya
      const allText = doc.querySelectorAll('td, th, dt, dd, li, span, p, div');
      for (const el of allText) {
        const text = el.textContent.trim();
        if (text.toLowerCase().startsWith(label.toLowerCase())) {
          // Coba ambil next sibling element
          const next = el.nextElementSibling;
          if (next) return next.textContent.trim();
          // Atau ambil teks setelah titik dua dalam elemen yang sama
          const colon = text.indexOf(':');
          if (colon !== -1) return text.slice(colon + 1).trim();
        }
      }
      // Fallback: regex di raw HTML
      const pattern = new RegExp(label + '[\\s\\S]{0,5}?:\\s*([^<\\n]{1,100})', 'i');
      return html.match(pattern)?.[1]?.trim() || '';
    }

    // Nama sekolah dari <h1> atau <title>
    const nama = (
      doc.querySelector('h1')?.textContent.trim()
      || doc.querySelector('h2')?.textContent.trim()
      || doc.title?.replace(/[-|].*/, '').trim()
      || ''
    );

    // ── Tab Identitas ──
    const identitas = {
      npsn:              String(npsn),
      nama,
      alamat:            extractField('Alamat'),
      desa_kelurahan:    extractField('Desa') || extractField('Kelurahan'),
      kecamatan:         extractField('Kecamatan'),
      kabupaten_kota:    extractField('Kabupaten') || extractField('Kota'),
      provinsi:          extractField('Provinsi'),
      status_sekolah:    extractField('Status Sekolah') || extractField('Status'),
      bentuk_pendidikan: extractField('Bentuk Pendidikan') || extractField('Bentuk'),
      jenjang:           extractField('Jenjang'),
    };

    // ── Tab Kontak ──
    const kontak = {
      telepon: extractField('Telepon') || extractField('No. Telepon'),
      fax:     extractField('Fax'),
      email:   extractField('Email'),
      website: extractField('Website'),
      operator: extractField('Operator'),
    };

    const url = `https://referensi.data.kemendikdasmen.go.id/pendidikan/npsn/${npsn}`;

    // Tandai apakah ada data (minimal nama atau kontak)
    const hasData = !!nama || Object.values(kontak).some(v => !!v);

    return { ...identitas, ...kontak, url, hasData };
  }

  // ── Fetch satu NPSN ───────────────────────────────────
  async function fetchOne(npsn) {
    try {
      const r = await fetch(`/pendidikan/npsn/${npsn}`, {
        credentials: 'include',
        headers: {
          'Accept': 'text/html,application/xhtml+xml',
          'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8',
          'Cache-Control': 'no-cache',
        }
      });

      if (!r.ok) return null;

      const html = await r.text();

      // Skip halaman error / not found
      if (html.includes('404') || html.includes('tidak ditemukan') || html.includes('Data tidak') || html.length < 500) {
        return null;
      }

      const data = parseSekolah(html, npsn);
      if (!data.hasData) return null;

      return data;
    } catch (e) {
      return null;
    }
  }

  // ── MAIN LOOP ─────────────────────────────────────────
  const total   = todo.length;
  let   scanned = 0;
  let   found   = 0;
  let   batchNo = 0;

  for (let i = 0; i < total; i += CONCURRENCY) {
    const batch = todo.slice(i, i + CONCURRENCY);

    const promises = batch.map((npsn, idx) =>
      sleep(idx * rand(100, 400)).then(() => fetchOne(npsn))
    );
    const results = await Promise.all(promises);

    results.forEach(r => {
      if (r) { window._sekolahResults.push(r); found++; }
    });
    scanned += batch.length;
    batchNo++;

    // Log progress
    if (batchNo % LOG_EVERY === 0) {
      const pct       = ((scanned / total) * 100).toFixed(1);
      const lastFound = results.find(Boolean);
      const eta       = Math.round(((total - scanned) / CONCURRENCY) * ((DELAY_MIN + DELAY_MAX) / 2) / 1000 / 60);
      console.log(`📦 ${scanned}/${total} (${pct}%) | ditemukan: ${found} | ETA: ~${eta}m | ${lastFound ? `"${lastFound.nama}"` : 'tidak ada data'}`);
    }

    // Simpan progress setiap 200 scan
    if (scanned % 200 === 0) {
      localStorage.setItem('sekolah_results', JSON.stringify(window._sekolahResults));
      console.log(`💾 Progress: ${window._sekolahResults.length} sekolah valid disimpan`);
    }

    // Istirahat panjang berkala
    if (batchNo % REST_EVERY === 0) {
      const rest = REST_DURATION + rand(0, 2000);
      console.log(`😴 Istirahat ${(rest/1000).toFixed(1)}s... (batch ke-${batchNo})`);
      await sleep(rest);
    } else {
      await sleep(rand(DELAY_MIN, DELAY_MAX));
    }
  }

  // Final save & export
  localStorage.setItem('sekolah_results', JSON.stringify(window._sekolahResults));
  console.log(`\n✅ SELESAI — ${window._sekolahResults.length} sekolah ditemukan`);
  console.table(window._sekolahResults.slice(0, 5));

  await loadSheetJS();
  exportExcel(window._sekolahResults);

  // ── Export Excel ─────────────────────────────────────
  function exportExcel(data) {
    if (!data.length) { console.warn('Tidak ada data.'); return; }

    const rows = data.map((r, i) => ({
      'No':                  i + 1,
      'NPSN':                r.npsn,
      'Nama Sekolah':        r.nama,
      'Alamat':              r.alamat,
      'Desa/Kelurahan':      r.desa_kelurahan,
      'Kecamatan':           r.kecamatan,
      'Kabupaten/Kota':      r.kabupaten_kota,
      'Provinsi':            r.provinsi,
      'Status':              r.status_sekolah,
      'Bentuk Pendidikan':   r.bentuk_pendidikan,
      'Jenjang':             r.jenjang,
      'Telepon':             r.telepon,
      'Fax':                 r.fax,
      'Email':               r.email,
      'Website':             r.website,
      'Operator':            r.operator,
      'URL':                 r.url,
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [
      { wch: 5 },  // No
      { wch: 12 }, // NPSN
      { wch: 40 }, // Nama
      { wch: 40 }, // Alamat
      { wch: 20 }, // Desa
      { wch: 20 }, // Kecamatan
      { wch: 22 }, // Kabupaten
      { wch: 20 }, // Provinsi
      { wch: 10 }, // Status
      { wch: 18 }, // Bentuk
      { wch: 12 }, // Jenjang
      { wch: 15 }, // Telepon
      { wch: 15 }, // Fax
      { wch: 30 }, // Email
      { wch: 30 }, // Website
      { wch: 30 }, // Operator
      { wch: 55 }, // URL
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sekolah');
    XLSX.writeFile(wb, `sekolah_${new Date().toISOString().slice(0, 10)}.xlsx`);
    console.log(`💾 Excel didownload! (${data.length} rows)`);
  }
})();
```

---

## Resume (jika browser ditutup)

```javascript
window._sekolahResults = JSON.parse(localStorage.getItem('sekolah_results') || '[]');
console.log('Resume:', window._sekolahResults.length, 'sekolah dimuat');
// Lalu jalankan ulang script utama — NPSN yang sudah ada akan di-skip otomatis
```

---

## Download Ulang Excel

```javascript
(async function() {
  const data = JSON.parse(localStorage.getItem('sekolah_results') || '[]');
  if (!data.length) { console.warn('Belum ada hasil.'); return; }

  if (!window.XLSX) {
    await new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.sheetjs.com/xlsx-0.20.2/package/dist/xlsx.full.min.js';
      s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  const rows = data.map((r, i) => ({
    'No': i + 1, 'NPSN': r.npsn, 'Nama Sekolah': r.nama,
    'Alamat': r.alamat, 'Desa/Kelurahan': r.desa_kelurahan,
    'Kecamatan': r.kecamatan, 'Kabupaten/Kota': r.kabupaten_kota,
    'Provinsi': r.provinsi, 'Status': r.status_sekolah,
    'Bentuk Pendidikan': r.bentuk_pendidikan, 'Jenjang': r.jenjang,
    'Telepon': r.telepon, 'Fax': r.fax,
    'Email': r.email, 'Website': r.website,
    'Operator': r.operator, 'URL': r.url,
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sekolah');
  XLSX.writeFile(wb, `sekolah_${new Date().toISOString().slice(0,10)}.xlsx`);
  console.log('💾 Didownload!', data.length, 'records');
})();
```

---

## Output Kolom Excel

| Kolom | Contoh |
|---|---|
| NPSN | 70061059 |
| Nama Sekolah | KB MUTIARA TIDUNG |
| Alamat | Jl. Tidung 9 No.3 |
| Desa/Kelurahan | Tidung |
| Kecamatan | Rappocini |
| Kabupaten/Kota | Kota Makassar |
| Provinsi | Sulawesi Selatan |
| Status | Swasta |
| Bentuk Pendidikan | KB |
| Jenjang | PAUD |
| Telepon | 081234567890 |
| Email | sekolah@example.com |
| Website | - |
| Operator | nama operator |

---

## Catatan

- **Data kosong**: field yang tidak ada di halaman akan tampil sebagai string kosong di Excel — tidak error
- **NPSN tidak valid**: halaman 404 atau HTML terlalu pendek akan di-skip otomatis
- **Resume aman**: NPSN yang sudah ada di `localStorage` tidak akan di-fetch ulang — tinggal jalankan ulang script dengan range yang sama
- **CORS**: script harus dijalankan dari domain `referensi.data.kemendikdasmen.go.id` agar fetch bisa berjalan
- **Banyak gap**: NPSN tidak selalu berurutan, banyak ID yang kosong — akan di-skip otomatis seperti sisparnas
