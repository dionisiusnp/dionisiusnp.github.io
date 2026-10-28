/**
 * Google Reviews Crawler — Universitas Dinamika
 * Support: Google Maps (semua ulasan) & Google Search Knowledge Panel (~30)
 *
 * CARA TERBAIK (untuk semua 981 ulasan):
 * 1. Buka: https://maps.google.com
 * 2. Cari "Universitas Dinamika Surabaya"
 * 3. Klik nama kampus → tab "Ulasan"
 * 4. DevTools → Console → paste script → Enter
 * 5. Tunggu selesai (~10-20 menit)
 *
 * Alternatif (hanya ~30 ulasan):
 * - Google Search → klik "981 ulasan" → jalankan script
 */

(async function crawlReviews() {
  const isMaps = location.href.includes('maps.google') || location.href.includes('/maps/');

  /* ── 1. Temukan scrollable container ── */
  let scrollTarget;
  if (isMaps) {
    // Maps: panel ulasan di sidebar
    scrollTarget =
      document.querySelector('[data-review-id]')?.closest('[style*="overflow"]') ||
      document.querySelector('.m6QErb.DxyBCb') ||    // Maps review list container
      document.querySelector('.m6QErb') ||
      document.querySelector('[role="feed"]') ||
      [...document.querySelectorAll('div')].find(el => {
        const s = getComputedStyle(el);
        return (s.overflowY === 'scroll' || s.overflowY === 'auto') &&
               el.clientHeight > 400 && el.scrollHeight > el.clientHeight;
      });
  } else {
    // Google Search Knowledge Panel
    scrollTarget =
      document.querySelector('.review-dialog-body') ||
      document.querySelector('[jscontroller="AdYPFb"]') ||
      document.querySelector('.RVCQse') ||
      [...document.querySelectorAll('div')].find(el => {
        const s = getComputedStyle(el);
        return (s.overflowY === 'scroll' || s.overflowY === 'auto') && el.clientHeight > 300;
      });
  }

  if (!scrollTarget) { alert('Panel ulasan tidak ditemukan. Pastikan tab Ulasan sudah terbuka.'); return; }
  console.log(`✅ Mode: ${isMaps ? 'Google Maps' : 'Google Search'}`);
  console.log('✅ Scroll target:', scrollTarget.className?.toString?.().slice(0, 60) || scrollTarget.tagName);

  /* ── 2. Fungsi ekstrak card yang sedang visible ── */
  function extractVisible() {
    const extracted = [];

    if (isMaps) {
      // Google Maps selectors
      document.querySelectorAll('[data-review-id], .jftiEf, .GHT2ce').forEach(card => {
        try {
          const name =
            card.querySelector('.d4r55')?.textContent?.trim() ||
            card.querySelector('.WNxzHc')?.textContent?.trim() || '';
          const ratingEl = card.querySelector('[aria-label*="bintang"], [aria-label*="star"]');
          const ratingM = (ratingEl?.getAttribute('aria-label') || '').match(/(\d+(?:[.,]\d+)?)/);
          const rating = ratingM ? parseFloat(ratingM[1].replace(',', '.')) : null;
          const date =
            card.querySelector('.rsGxI')?.textContent?.trim() ||
            card.querySelector('.dehysf')?.textContent?.trim() || '';
          const moreBtn = card.querySelector('button.w8nwRe, [jsaction*="expandReview"]');
          if (moreBtn) { try { moreBtn.click(); } catch(_){} }
          const text =
            card.querySelector('.wiI7pd')?.textContent?.trim() ||
            card.querySelector('.MyEned')?.textContent?.trim() || '';
          const avatar = card.querySelector('img[src*="googleusercontent"]')?.src || '';
          if (name) extracted.push({ name, rating, date, text, avatar });
        } catch(_) {}
      });
    } else {
      // Google Search Knowledge Panel selectors
      document.querySelectorAll('[jsname="ShBeI"]').forEach(card => {
        try {
          const name = card.querySelector('.rhtdWc')?.textContent?.trim() || '';
          const svgs = card.querySelector('.h3PQJ')?.querySelectorAll('svg');
          const rating = (svgs && svgs.length >= 1 && svgs.length <= 5) ? svgs.length : null;
          const date = card.querySelector('span.m6Mr5d')?.textContent?.trim() || '';
          const moreBtn = [...card.querySelectorAll('span')].find(el =>
            /lebih banyak|selengkapnya/i.test(el.textContent.trim()) && el.childElementCount === 0
          );
          if (moreBtn) { try { moreBtn.click(); } catch(_){} }
          const text = card.querySelector('div.d83Iyc')?.textContent?.trim() || '';
          const avatar =
            card.querySelector('img[src*="googleusercontent"]')?.src ||
            card.querySelector('.QNewyd')?.style?.backgroundImage?.match(/url\("([^"]+)"\)/)?.[1] || '';
          if (name) extracted.push({ name, rating, date, text, avatar });
        } catch(_) {}
      });
    }
    return extracted;
  }

  /* ── 3. Scroll sambil kumpulkan ── */
  const seen = new Map();
  let noNewCount = 0, scrolls = 0;
  const STEP  = isMaps ? 600  : 300;
  const DELAY = isMaps ? 1500 : 1000;
  const MAX_NO_NEW = isMaps ? 20 : 12;

  console.log(`⏳ Scroll + ekstrak... (${isMaps ? 'Maps: estimasi 10-20 menit' : 'Search: ~1 menit, max ~30 ulasan'})`);
  scrollTarget.scrollTop = 0;
  await new Promise(r => setTimeout(r, 1000));

  while (noNewCount < MAX_NO_NEW) {
    const batch = extractVisible();
    let newFound = 0;
    for (const item of batch) {
      const key = item.name + '|' + item.date;
      if (!seen.has(key)) {
        seen.set(key, item);
        newFound++;
      } else if (item.text && !seen.get(key).text) {
        seen.get(key).text = item.text;
      }
    }
    noNewCount = newFound > 0 ? 0 : noNewCount + 1;
    scrollTarget.scrollTop += STEP;
    scrolls++;
    if (scrolls % 10 === 0) console.log(`  scroll ke-${scrolls} | terkumpul: ${seen.size} ulasan`);
    await new Promise(r => setTimeout(r, DELAY));
  }

  console.log(`✅ Selesai | ${scrolls} scroll | ${seen.size} ulasan unik`);

  /* ── 4. Build & download ── */
  const results = [...seen.values()].map((r, i) => ({ index: i + 1, ...r }));
  const blob = new Blob([JSON.stringify({
    source: `Google Reviews — Universitas Dinamika (via ${isMaps ? 'Maps' : 'Search'})`,
    crawledAt: new Date().toISOString(),
    total: results.length,
    reviews: results
  }, null, 2)], { type: 'application/json' });

  const filename = `ulasan-dinamika-${new Date().toISOString().slice(0,10)}.json`;
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: filename });
  document.body.appendChild(a); a.click(); a.remove();
  console.log(`🎉 Download: ${filename} (${results.length} ulasan)`);
  console.table(results.slice(0, 10));
})();
