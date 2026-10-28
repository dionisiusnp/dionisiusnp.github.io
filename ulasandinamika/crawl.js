/**
 * Google Reviews Crawler — Universitas Dinamika
 * Jalankan di Console browser saat panel ulasan Google sudah terbuka.
 *
 * Cara pakai:
 * 1. Buka Google → cari "Universitas Dinamika"
 * 2. Klik "981 ulasan" untuk buka panel ulasan
 * 3. DevTools → Console → paste script → Enter
 * 4. Tunggu selesai (~5-15 menit)
 * 5. File JSON otomatis ter-download
 */

(async function crawlReviews() {
  /* ── 1. Temukan scrollable container ── */
  const scrollTarget =
    document.querySelector('.review-dialog-body') ||
    document.querySelector('[jscontroller="AdYPFb"]') ||
    document.querySelector('.RVCQse') ||
    [...document.querySelectorAll('div')].find(el => {
      const s = getComputedStyle(el);
      return (s.overflowY === 'scroll' || s.overflowY === 'auto') && el.clientHeight > 300;
    });

  if (!scrollTarget) { alert('Panel ulasan tidak ditemukan.'); return; }
  console.log('✅ Scroll target:', scrollTarget.className || scrollTarget.tagName);

  /* ── 2. Fungsi ekstrak card yang sedang visible ── */
  function extractVisible() {
    const cards = document.querySelectorAll('[jsname="ShBeI"]');
    const extracted = [];
    cards.forEach(card => {
      try {
        const name = card.querySelector('.rhtdWc')?.textContent?.trim() || '';
        const svgs = card.querySelector('.h3PQJ')?.querySelectorAll('svg');
        const rating = (svgs && svgs.length >= 1 && svgs.length <= 5) ? svgs.length : null;
        const date = card.querySelector('span.m6Mr5d')?.textContent?.trim() || '';
        const text = card.querySelector('div.d83Iyc')?.textContent?.trim() || '';
        const avatar =
          card.querySelector('img[src*="googleusercontent"]')?.src ||
          card.querySelector('.QNewyd')?.style?.backgroundImage?.match(/url\("([^"]+)"\)/)?.[1] || '';
        if (name) extracted.push({ name, rating, date, text, avatar });
      } catch(_) {}
    });
    return extracted;
  }

  /* ── 3. Scroll sambil kumpulkan — virtual scroll safe ── */
  const seen = new Map(); // key: name+date → data (teks bisa bertambah saat expand)
  let noNewCount = 0;
  let scrolls = 0;
  const STEP = 400;       // scroll step px
  const DELAY = 1200;     // ms antar step
  const MAX_NO_NEW = 15;  // berhenti setelah 15x tanpa review baru

  console.log('⏳ Scroll + ekstrak... (virtual scroll: ambil data sambil jalan)');

  // mulai dari atas
  scrollTarget.scrollTop = 0;
  await new Promise(r => setTimeout(r, 1000));

  while (noNewCount < MAX_NO_NEW) {
    // ambil yang visible sekarang
    const batch = extractVisible();
    let newFound = 0;
    for (const item of batch) {
      const key = item.name + '|' + item.date;
      if (!seen.has(key)) {
        seen.set(key, item);
        newFound++;
      } else if (item.text && !seen.get(key).text) {
        // update teks kalau sebelumnya kosong
        seen.get(key).text = item.text;
      }
    }

    if (newFound > 0) {
      noNewCount = 0;
    } else {
      noNewCount++;
    }

    // scroll ke bawah selangkah
    scrollTarget.scrollTop += STEP;
    scrolls++;

    if (scrolls % 20 === 0) {
      console.log(`  scroll ke-${scrolls} | terkumpul: ${seen.size} ulasan unik`);
    }

    await new Promise(r => setTimeout(r, DELAY));
  }

  console.log(`✅ Selesai | ${scrolls} scroll | ${seen.size} ulasan unik terkumpul`);

  /* ── 4. Klik expand pada semua review yang masih visible ── */
  document.querySelectorAll('[jsname="ShBeI"]').forEach(card => {
    const moreBtn = [...card.querySelectorAll('span')].find(el =>
      /lebih banyak|selengkapnya/i.test(el.textContent.trim()) && el.childElementCount === 0
    );
    if (moreBtn) { try { moreBtn.click(); } catch(_){} }
  });
  await new Promise(r => setTimeout(r, 500));

  // update teks dari card yang sedang visible
  document.querySelectorAll('[jsname="ShBeI"]').forEach(card => {
    const name = card.querySelector('.rhtdWc')?.textContent?.trim() || '';
    const date = card.querySelector('span.m6Mr5d')?.textContent?.trim() || '';
    const text = card.querySelector('div.d83Iyc')?.textContent?.trim() || '';
    const key = name + '|' + date;
    if (seen.has(key) && text) seen.get(key).text = text;
  });

  /* ── 5. Build result array ── */
  const results = [...seen.values()].map((r, i) => ({ index: i + 1, ...r }));

  const withRating = results.filter(r => r.rating !== null).length;
  const withText   = results.filter(r => r.text).length;
  console.log(`📊 Total: ${results.length} | rating: ${withRating} | teks: ${withText}`);

  /* ── 6. Download JSON ── */
  const blob = new Blob([JSON.stringify({
    source: 'Google Reviews — Universitas Dinamika',
    crawledAt: new Date().toISOString(),
    total: results.length,
    reviews: results
  }, null, 2)], { type: 'application/json' });

  const filename = `ulasan-dinamika-${new Date().toISOString().slice(0,10)}.json`;
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: filename });
  document.body.appendChild(a); a.click(); a.remove();
  console.log(`🎉 Download: ${filename}`);
  console.table(results.slice(0, 10));
})();
