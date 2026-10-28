/**
 * Google Reviews Crawler — Universitas Dinamika
 * Jalankan di Console browser saat panel ulasan Google sudah terbuka.
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

  /* ── 2. Scroll sampai bawah ── */
  let lastH = 0, same = 0, scrolls = 0;
  console.log('⏳ Scrolling...');
  while (same < 5) {
    scrollTarget.scrollTop = scrollTarget.scrollHeight;
    await new Promise(r => setTimeout(r, 800));
    const h = scrollTarget.scrollHeight;
    same = h === lastH ? same + 1 : 0;
    lastH = h; scrolls++;
    if (scrolls % 10 === 0) console.log(`  ke-${scrolls}, h=${h}`);
  }
  console.log(`✅ Scroll selesai (${scrolls}x).`);

  const cards = document.querySelectorAll('[jsname="ShBeI"]');
  console.log(`Total card: ${cards.length}`);


  /* ── 3. Ekstrak ulasan ── */
  const results = [];

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    try {
      /* Nama */
      const name = card.querySelector('.rhtdWc')?.textContent?.trim() || '';

      /* Rating — hitung <svg> di .h3PQJ (confirmed: 5 svg = 5 bintang) */
      let rating = null;
      const svgs = card.querySelector('.h3PQJ')?.querySelectorAll('svg');
      if (svgs && svgs.length >= 1 && svgs.length <= 5) rating = svgs.length;

      /* Tanggal */
      const date = card.querySelector('span.m6Mr5d')?.textContent?.trim() || '';

      /* Teks ulasan — expand "Lebih banyak" dulu */
      const moreBtn = [...card.querySelectorAll('span,button')]
        .find(el => /lebih banyak|more|selengkapnya/i.test(el.textContent.trim()) && el.childElementCount === 0);
      if (moreBtn) { try { moreBtn.click(); await new Promise(r => setTimeout(r, 150)); } catch(_){} }
      const text = card.querySelector('div.d83Iyc')?.textContent?.trim() || '';

      /* Avatar */
      const avatar = card.querySelector('img[src*="googleusercontent"]')?.src ||
                     card.querySelector('.QNewyd')?.style?.backgroundImage?.match(/url\("([^"]+)"\)/)?.[1] || '';

      results.push({ index: i + 1, name, rating, date, text, avatar });
    } catch (e) {
      console.warn(`Skip card ${i}:`, e.message);
    }
  }

  const withRating = results.filter(r => r.rating !== null).length;
  const withText   = results.filter(r => r.text).length;
  console.log(`✅ Ekstrak ${results.length} | rating OK: ${withRating} | teks OK: ${withText}`);

  /* ── 4. Download JSON ── */
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
