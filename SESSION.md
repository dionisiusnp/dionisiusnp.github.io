# Session State — Last Updated: 2026-09-06

## Proyek
Rak Perpustakaan — portal multi-rak (Proyekan, Pengajar, Pemasaran, Mitra) + Kelola Alteco (app organisasi).

## Completed

### Homepage (`/index.html`)
- Hero minimalis + 4 nav cards saja (no extra sections)
- No gradient text, no ghost-card shadow
- Dark theme default with sun/moon toggle (localStorage)

### Proyekan (`/proyekan/index.html`)
- 6 tab: Laravel, Spring Boot, Flutter, Docker, Git, AI
- Command + description rows with copy button (clipboard API + fallback)
- Search box filters commands
- AI tab: prompt tips, prompt builder tool (6 fields → Generate + Copy), 8 attack types, protection tips

### Pengajar (`/pengajar/index.html`)
- 3 sector groups: Primer 5, Sekunder 6, Tersier 6 = 17 sub-sectors
- Each card uses `<ul class="erp-list">` with `›` marker
- Reference table of 10 universal ERP modules

### Pemasaran (`/pemasaran/index.html`)
- 4 sales stages with 3 routes each (Positif/Negatif/Edge)
- KPI metrics per stage, 6 tool categories, flow diagram, 4 scenario cards

### Mitra (`/mitra/index.html`)
- 11 partner logos with lightbox
- 3 collaboration types, sector grouping, ecosystem section, CTA

### Theme System (all pages)
- CSS variables: `--bg:#0b0b12, --card:#181825, --bd:#23233a, --accent:#6c6ff5`
- Light theme via `[data-theme="light"]`
- Sun/moon toggle in nav, localStorage persistence

### Kelola Alteco (`/todolist/index.html`) — app manajemen organisasi
Data di GitHub Gist (`alteco-data.json`). Push notif via OneSignal + GitHub Actions (cron harian).

**Fitur yang selesai:**
- **Auth**: login superadmin/admin/member per kelompok; unlock per-card inline
- **Sidebar**: kelompok collapsible (default collapsed), auto-expand active member; vertical feature nav
- **Bagan**: org chart visual, CRUD admin, stays in org view after CRUD
- **Inventaris**: CRUD aset (superadmin), search nama, filter kategori, kolom tanggal; tanpa kolom Kondisi/Lokasi (pakai URL)
- **Pemberitahuan**: split aktif/lampau, search, force-send button; per-event dedup, H-X days before notif, tahunan support
- **Budaya Organisasi**: CRUD admin, view all
- **Proyek**: 
  - Multi-project per member
  - Task per project: datePessimistic + dateOptimistic per task, min date = project start
  - Auto-compute project optimis/pesimis from task due dates
  - Timeline auto-computed (hidden when no tasks)
  - Add-member: search typeahead dari internal list, dedup by name, sorted alpha, kelompok label untuk same-name, filter already-added by name
  - Cascade delete: kelompok → sub-kelompok → members → tasks
  - Search projects by name/client
  - Expandable project cards dengan chevron
  - Task modal: 2-col layout, pesimis full-width

**Storage schema** (Gist JSON):
```json
{"kelompoks":[],"members":[],"tasks":[],"assets":[],"events":[],"orgName":"Alteco","projects":[]}
```

## Blocked / Needs Attention

1. **Mitra logo mapping** — file names mungkin tidak match org names yang benar.

## Key Files
- `/index.html` — homepage
- `/proyekan/index.html` — 6-tab code reference + AI tools
- `/pengajar/index.html` — 17 sector cards with ERP listing
- `/pemasaran/index.html` — 4-stage sales pipeline
- `/mitra/index.html` — partner logos + lightbox + collab
- `/mitra/logo/*.png` — 11 partner logo assets
- `/todolist/index.html` — Kelola Alteco app (157KB single-file)
- `/todolist/SETUP.md` — setup guide (Gist, PAT, OneSignal, GitHub Actions)
- `/scrapper/viewer.html` — preserved scraper tool
