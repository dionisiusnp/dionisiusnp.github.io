# Style Unification Plan
> Seragamkan visual style semua `index.html` tanpa mengubah copywriting

---

## Scope

**10 file diubah, 4 file dibiarkan.**

### File yang TIDAK disentuh

| File | Alasan |
|------|--------|
| `/universitas-dinamika/index.html` | Branding institusi — merah Dinamika, Segoe UI |
| `/offering/marketplace/theme-1/index.html` | Demo produk — variasi style adalah tujuannya |
| `/offering/marketplace/theme-2/index.html` | Demo produk |
| `/offering/marketplace/theme-3/index.html` | Demo produk |

### File yang diubah

| Grup | File | Perubahan |
|------|------|-----------|
| **Tier 1** — Referensi | `/index.html` | Formalize tokens, zero visual change |
| **Tier 1** — Sudah selaras | `/detail/index.html` | Token + radius alignment |
| **Tier 1** — Sudah selaras | `/offering/marketplace/index.html` | Token + radius alignment |
| **Tier 1** — Sudah selaras | `/article/laravel-cheat/index.html` | Token + font variable alignment |
| **Tier 2** — Dark outlier | `/team-for-uk/index.html` | Accent shift sky-blue → indigo |
| **Tier 2** — Dark outlier | `/team-for-laravel-gamification/index.html` | Token rename, surface re-map |
| **Tier 2** — Dark outlier | `/universitas-dinamika/training/java-springboot/index.html` | Token rename, keep green page-accent |
| **Tier 2** — Dark outlier | `/universitas-dinamika/training/java-springboot/guidelines/index.html` | Token rename, keep orange page-accent |
| **Tier 3** — Light outlier | `/article/odoo-19/index.html` | Token rename, keep Odoo purple |
| **Tier 3** — Light outlier | `/article/mrp-simulation/index.html` | Token rename, tab active color |

---

## Design Token System

### Canonical Dark `:root`

Berlaku untuk semua file Tier 1 dan Tier 2. Copy-paste verbatim ke setiap file, **ganti seluruh `:root` lama**.

```css
:root {
  /* ── Surfaces ── */
  --bg:      #09090f;
  --surface: #0f0f18;
  --card:    rgba(255,255,255,.04);

  /* ── Borders ── */
  --bd:  rgba(255,255,255,.08);
  --bd2: rgba(255,255,255,.13);

  /* ── Text ── */
  --text:  #e2e2ee;
  --muted: #8888aa;
  --dim:   rgba(255,255,255,.22);

  /* ── Accent palette ── */
  --accent: #6366f1;   /* indigo — primary */
  --a2:     #a855f7;   /* violet — secondary */
  --a3:     #22d3ee;   /* cyan — tertiary */

  /* ── Semantic colors ── */
  --green: #34d399;
  --gold:  #fbbf24;
  --red:   #f87171;

  /* ── Per-page override slot ── */
  --page-accent: var(--accent);

  /* ── Typography ── */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* ── Radius scale ── */
  --r-xs:   4px;
  --r-sm:   7px;
  --r-md:   10px;
  --r-lg:   14px;
  --r-xl:   20px;
  --r-pill: 999px;

  /* ── Shadows ── */
  --shadow-card:  0 4px 28px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.04);
  --shadow-hover: 0 8px 38px rgba(0,0,0,.4);
  --shadow-btn:   0 4px 18px rgba(99,102,241,.35);
}
```

### Canonical Light `:root`

Berlaku untuk `odoo-19` dan `mrp-simulation`. Accent Odoo purple tetap — hanya nama token diseragamkan.

```css
:root {
  /* ── Surfaces ── */
  --bg:   #f5f6fa;
  --card: #ffffff;
  --bd:   #e5e7eb;
  --bd2:  #d1d5db;

  /* ── Text ── */
  --text:  #111827;
  --muted: #6b7280;

  /* ── Accent (Odoo brand — tidak diubah) ── */
  --accent: #714B67;
  --a2:     #5a3a52;

  /* ── Semantic colors ── */
  --green: #16a34a;
  --blue:  #2563eb;
  --red:   #dc2626;

  /* ── Typography ── */
  --font-sans: 'Segoe UI', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* ── Radius scale (sama dengan dark) ── */
  --r-xs:   4px;
  --r-sm:   7px;
  --r-md:   10px;
  --r-lg:   14px;
  --r-xl:   20px;
  --r-pill: 999px;

  /* ── Shadows ── */
  --shadow-card:  0 2px 12px rgba(0,0,0,.08);
  --shadow-hover: 0 10px 36px rgba(113,75,103,.18);
}
```

---

## Komponen Standar

### `#dion-nav` — Back Bar

Semua file non-root punya back bar. Ekstrak dari inline `style=""` ke CSS class:

```css
#dion-nav {
  position: sticky; top: 0; z-index: 9999;
  display: flex; align-items: center; gap: 10px;
  padding: 9px 20px;
  background: rgba(9,9,15,.95);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--bd);
  font-family: var(--font-sans);
  font-size: .72rem;
}
#dion-nav a.back {
  display: flex; align-items: center; gap: 6px;
  font-weight: 600; color: var(--muted);
  padding: 4px 11px;
  border-radius: var(--r-sm);
  border: 1px solid var(--bd);
  text-decoration: none;
  transition: color .18s, border-color .18s;
}
#dion-nav a.back:hover {
  color: var(--accent);
  border-color: rgba(99,102,241,.3);
}
```

Hapus `onmouseover`/`onmouseout` inline JS pada anchor tag — gantikan dengan CSS hover.

### Card

```css
.card {
  background: var(--card);
  border: 1px solid var(--bd);
  border-radius: var(--r-lg);
  padding: 20px 24px;
  transition: border-color .2s, box-shadow .2s;
}
.card:hover {
  border-color: var(--bd2);
  box-shadow: var(--shadow-card);
}
```

### Code Block / `<pre>`

Dark:
```css
pre {
  font-family: var(--font-mono);
  font-size: .76rem;
  background: rgba(0,0,0,.35);
  padding: 10px 14px;
  border-radius: var(--r-sm);
  line-height: 1.6;
  color: #c9d1d9;
  overflow-x: auto;
}
pre::-webkit-scrollbar { height: 3px; }
pre::-webkit-scrollbar-thumb { background: var(--bd2); border-radius: 3px; }
```

Light (odoo/mrp — `.formula`):
```css
pre, .formula {
  background: #1e1e2e;
  color: #cdd6f4;
  border-radius: var(--r-md);
  font-family: var(--font-mono);
  font-size: .8rem;
  padding: 14px 16px;
  line-height: 1.9;
  overflow-x: auto;
}
```

### Sidebar

```css
.sidebar {
  width: 220px;           /* canonical — guidelines saat ini 230px, ubah ke 220px */
  flex-shrink: 0;
  position: sticky; top: 44px;
  height: calc(100vh - 44px);
  overflow-y: auto;
  background: var(--surface);
  border-right: 1px solid var(--bd);
  padding: 20px 0;
}
.sb-item.active {
  color: var(--page-accent);
  border-left-color: var(--page-accent);
  background: color-mix(in srgb, var(--page-accent) 8%, transparent);
}
```

### Badge

```css
.badge {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: .56rem; font-weight: 700;
  letter-spacing: .08em; text-transform: uppercase;
  padding: 2px 8px;
  border-radius: var(--r-xs);
  vertical-align: middle;
}
.badge.blue   { background: rgba(99,102,241,.10); border: 1px solid rgba(99,102,241,.22); color: var(--accent); }
.badge.purple { background: rgba(168,85,247,.10); border: 1px solid rgba(168,85,247,.22); color: var(--a2); }
.badge.green  { background: rgba(52,211,153,.08);  border: 1px solid rgba(52,211,153,.20);  color: var(--green); }
.badge.gold   { background: rgba(251,191,36,.08);  border: 1px solid rgba(251,191,36,.20);  color: var(--gold); }
.badge.red    { background: rgba(248,113,113,.08); border: 1px solid rgba(248,113,113,.20); color: var(--red); }
```

`team-for-uk` pakai `border-radius:999px` → ganti ke `var(--r-xs)`.

### Button Primary

```css
.btn-primary {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: .72rem; font-weight: 700;
  padding: 7px 18px;
  border-radius: var(--r-sm);
  background: linear-gradient(135deg, var(--accent), var(--a2));
  color: #fff; border: none;
  transition: transform .2s, box-shadow .2s;
}
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-btn);
}
```

### Tab Navigation (mrp-simulation)

```css
.tab-btn {
  padding: 8px 18px;
  border-radius: var(--r-sm) var(--r-sm) 0 0;
  font-size: .82rem; font-weight: 700;
  background: var(--bd); color: var(--muted);
  border: none; cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all .15s;
}
.tab-btn.active {
  background: var(--card);
  color: var(--accent);
  border-bottom-color: var(--accent);
}
```

---

## Per-File Change Detail

### `/index.html` — Referensi (zero visual change)

- [ ] Rename `--dark` → `--surface` (3 occurrence di CSS)
- [ ] Tambah ke `:root`: `--font-sans`, `--font-mono`, `--r-*`, `--shadow-*`, `--page-accent`
- [ ] Ganti `border-radius:` hardcode dengan `var(--r-*)`

### `/detail/index.html`

- [ ] Ganti `:root` dengan canonical dark
- [ ] `border-radius:7px` → `var(--r-sm)` pada `.back-btn`, `.bar-dl`
- [ ] `box-shadow: 0 4px 16px rgba(99,102,241,.3)` → `var(--shadow-btn)`
- [ ] Ekstrak `#dion-nav` inline styles → CSS class

### `/offering/marketplace/index.html`

- [ ] Ganti `:root` dengan canonical dark
- [ ] `border-radius:20px` pada `.offer-card` → `var(--r-xl)`
- [ ] `border-radius:8px` pada `.h-wa` → `var(--r-sm)`
- [ ] Ekstrak `#dion-nav` inline styles → CSS class

### `/article/laravel-cheat/index.html`

- [ ] Ganti `:root` dengan canonical dark
- [ ] `border-radius:10px` → `var(--r-md)`, `border-radius:4px` → `var(--r-xs)`
- [ ] `font-family:'JetBrains Mono'` literals → `var(--font-mono)`
- [ ] `font-family:'Inter'` literals → `var(--font-sans)`
- [ ] Verifikasi `#dion-nav` sudah ada atau ekstrak

### `/team-for-uk/index.html`

- [ ] Ganti `:root` dengan canonical dark
- [ ] Hero gradient: `#38bdf8 → #818cf8` → `var(--accent) → var(--a2)`
- [ ] Ganti hardcoded `rgba(56,189,248,.35)` (1 occurrence) → `rgba(99,102,241,.35)`
- [ ] `--radius: 16px` → `--radius: var(--r-xl)` (keep local alias)
- [ ] Tambah `backdrop-filter: blur(18px)` pada nav
- [ ] Tambah `<link>` JetBrains Mono ke `<head>`
- [ ] Ekstrak `#dion-nav` inline styles → CSS class

### `/team-for-laravel-gamification/index.html`

- [ ] Ganti `:root` dengan canonical dark + `--page-accent: #3fb950`
- [ ] `var(--border)` → `var(--bd)` (replace all)
- [ ] `var(--s2)` → `var(--card)` (replace all)
- [ ] Nav `background: rgba(13,17,23,.9)` → `rgba(9,9,15,.92)`
- [ ] Dot grid color `rgba(88,166,255,.05)` → `rgba(99,102,241,.05)`
- [ ] `.btn-primary { background:#3fb950 }` → `linear-gradient(135deg, var(--accent), var(--a2))`
- [ ] Ekstrak `#dion-nav` inline styles → CSS class

### `/universitas-dinamika/training/java-springboot/index.html`

- [ ] Ganti `:root` dengan canonical dark + overrides:
  ```css
  --page-accent: #22c55e;
  --bg: #0a0a0a;
  --surface: #0d1117;
  --card: #111827;
  --bd: #1e2d3d;
  --bd2: #2a3f57;
  ```
- [ ] `var(--text-primary)` → `var(--text)` (replace all)
- [ ] `var(--text-secondary)` → `var(--muted)` (replace all)
- [ ] `var(--bg-base)` → `var(--bg)`, `var(--bg-surface)` → `var(--surface)`, `var(--bg-card)` → `var(--card)` (replace all)
- [ ] `var(--radius)` → `var(--r-md)`, `var(--radius-sm)` → `var(--r-sm)`, `var(--radius-lg)` → `var(--r-xl)`
- [ ] `var(--sans)` → `var(--font-sans)`, `var(--mono)` → `var(--font-mono)`
- [ ] Ekstrak `#dion-nav` inline styles → CSS class

### `/universitas-dinamika/training/java-springboot/guidelines/index.html`

- [ ] Ganti `:root` dengan canonical dark + overrides:
  ```css
  --page-accent: #f97316;
  --surface: #0d1117;
  --card: #111827;
  --bd: #1e2d3d;
  --bd2: #2a3f57;
  ```
- [ ] Sidebar width `230px` → `220px`
- [ ] `var(--orange)` → `var(--page-accent)` (replace all)
- [ ] `var(--orange-s)` → `color-mix(in srgb, var(--page-accent) 8%, transparent)` (replace all)
- [ ] `--text: #f0f6fc` → dihapus (canonical sudah define)
- [ ] `--muted: #8b949e` → dihapus (canonical sudah define)
- [ ] `#dion-nav background: rgba(10,10,15,.95)` → `rgba(9,9,15,.95)`

### `/article/odoo-19/index.html`

- [ ] Ganti `:root` dengan canonical light
- [ ] `var(--p)` → `var(--accent)` (replace all)
- [ ] `var(--pd)` → `var(--a2)` (replace all)
- [ ] `var(--t)` → `var(--text)` (replace all)
- [ ] `var(--m)` → `var(--muted)` (replace all)
- [ ] `var(--r)` → `var(--r-md)` (replace all)
- [ ] Ekstrak `#dion-nav` inline styles → CSS class
- [ ] **Jangan ubah**: `.stag.*` badge colors — ini data-visualization semantik

### `/article/mrp-simulation/index.html`

- [ ] Ganti `:root` dengan canonical light + tambah `--blue`, `--orange`
- [ ] `var(--p)` → `var(--accent)` (replace all)
- [ ] `var(--t)` → `var(--text)` (replace all)
- [ ] `var(--m)` → `var(--muted)` (replace all)
- [ ] Tab active: `color: var(--p)` → `var(--accent)`, `border-bottom: 3px solid var(--p)` → `var(--accent)`
- [ ] `.kpi { border-left: 4px solid var(--p) }` → `var(--accent)`
- [ ] Ekstrak `#dion-nav` inline styles → CSS class
- [ ] **Jangan ubah**: `.price-card` gradient, `.bom-badge` color, semua KPI color variants

---

## Constraints — Yang Tidak Boleh Diubah

1. **Semua teks** — heading, paragraf, label, kode contoh, nama perusahaan, tanggal, harga
2. **Struktur layout** — hero/sidebar/grid/max-width — ini identitas page
3. **Semantic accent per halaman** — orange (guidelines), green (java-springboot), purple (odoo) tetap sebagai `--page-accent` override
4. **Data visualization colors** — `.stag.*` badge odoo, KPI color variants MRP, chart colors
5. **Animations** — `@keyframes` semua tetap as-is
6. **JavaScript** — copy button, tab switch, modal, calculator — tidak disentuh
7. **Image src/alt** — tidak disentuh
8. **`<meta>` dan `<title>`** — tidak disentuh
9. **`href` pada `#dion-nav`** — link target tetap as-is
10. **4 file excluded** — universitas-dinamika landing, 3 marketplace themes

---

## Fase Implementasi

### Fase 1 — Formalize referensi (minimal risiko)
Target: `/index.html`
Estimasi: ~30 menit
Hasil: zero visual change, token system terdokumentasi

### Fase 2 — Tier 1 alignment (risiko rendah)
Target: `/detail`, `/offering/marketplace`, `/laravel-cheat`
Estimasi: ~1 jam
Hasil: token seragam, dion-nav di-class-ify

### Fase 3 — Dark outliers (risiko sedang)
Target: `team-for-uk`, `team-for-laravel`, `java-springboot`, `guidelines`
Estimasi: ~2–3 jam
Perhatian: accent shift visible pada `team-for-uk` (sky-blue → indigo)

### Fase 4 — Light theme files (risiko sedang)
Target: `mrp-simulation`, `odoo-19`
Estimasi: ~1.5 jam
Perhatian: token rename banyak, verify modal dan badge rendering

### Fase 5 — Visual QA
Buka semua 10 file di browser, periksa:
- `#dion-nav` height konsisten (44px slot)
- Scrollbar color seragam di dark pages
- Tidak ada `var()` reference yang broken (tampil kosong/invisible)
- Font JetBrains Mono terbaca di semua halaman
- 4 excluded file tidak berubah sama sekali

---

*Generated: 2026-05-01*
