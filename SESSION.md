# Session State — Last Updated: 2026-07-22

## Proyek
Rak Perpustakaan — portal multi-rak (Proyekan, Pengajar, Pemasaran, Mitra) tanpa personal branding, tanpa label komunitas.

## Completed

### Homepage (`/index.html`)
- Hero minimalis + 4 nav cards saja (no extra sections)
- No gradient text, no ghost-card shadow
- Dark theme default with sun/moon toggle (localStorage)

### Proyekan (`/proyekan/index.html`)
- 6 tab: Laravel, Spring Boot, Flutter, Docker, Git, AI
- Command + description rows with copy button 📋 (clipboard API + fallback)
- Search box filters commands
- AI tab: prompt tips, prompt builder tool (6 fields → Generate + Copy), 8 attack types, protection tips

### Pengajar (`/pengajar/index.html`)
- 3 sector groups: Primer 5, Sekunder 6, Tersier 6 = 17 sub-sectors
- Each card uses `<ul class="erp-list">` with `›` marker
- Each ERP module has detailed explanation per sector
- Reference table of 10 universal ERP modules
- **BUG:** Listing "kurang rapi" — needs investigation

### Pemasaran (`/pemasaran/index.html`)
- 4 sales stages with 3 routes each (Positif/Negatif/Edge)
- KPI metrics per stage, 6 tool categories, flow diagram, 4 scenario cards
- Flow steps now compact: font `.6rem`, padding `4px 8px`, arrow `1px`, `text-align:center`

### Mitra (`/mitra/index.html`)
- 11 partner logos with lightbox
- Logo paths updated to use actual filenames: `bimbasi.png`, `gadas.png`, `himakuntansi.png`, `hmsi.png`, `jdg.png`, `mighty.png`, `mitsutech.png`, `novo.png`, `savendra.png`, `ssiacademy.png`, `ukki.png`
- 3 collaboration types, sector grouping, ecosystem section, CTA

### Theme System (all pages)
- CSS variables: `--bg:#0b0b12, --card:#181825, --bd:#23233a, --accent:#6c6ff5`
- Light theme via `[data-theme="light"]` with `--bg:#f5f5f8, --card:#fff, --bd:#ddd`
- Sun/moon toggle button in nav, localStorage persistence

### Tag Colors
- Dedicated CSS classes with hardcoded hex + `!important` (no more inline `var()`)

## Blocked / Needs Attention

1. **Pengajar listing "kurang rapi"** — user reported ERP listing formatting needs improvement. Investigate spacing/alignment/card layout.

2. **Mitra logo mapping** — file names don't match org names. Current mapping is guessed. User may need to provide correct mapping:
   - bimbasi.png → ?
   - gadas.png → ?
   - himakuntansi.png → ?
   - hmsi.png → ?
   - jdg.png → ?
   - mighty.png → ?
   - mitsutech.png → ?
   - novo.png → ?
   - savendra.png → ?
   - ssiacademy.png → ?
   - ukki.png → ?

## Next Moves

1. Fix pengajar listing formatting
2. Get correct logo-mitra mapping from user
3. Any new feature requests

## Key Files
- `/index.html` — homepage
- `/proyekan/index.html` — 6-tab code reference + AI tools
- `/pengajar/index.html` — 17 sector cards with ERP listing
- `/pemasaran/index.html` — 4-stage sales pipeline
- `/mitra/index.html` — partner logos + lightbox + collab
- `/mitra/logo/*.png` — 11 partner logo assets
- `/scrapper/viewer.html` — preserved scraper tool
