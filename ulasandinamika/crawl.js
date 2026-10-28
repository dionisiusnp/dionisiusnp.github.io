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

  /* ── DEBUG RATING: lihat isi .h3PQJ dan .y3Ibjb di card pertama ── */
  if (cards.length > 0) {
    const c = cards[0];
    const ratingArea = c.querySelector('.h3PQJ');
    const starSpan = c.querySelector('.y3Ibjb');
    console.log('=== DEBUG RATING ===');
    console.log('.h3PQJ innerHTML:', ratingArea?.innerHTML?.slice(0, 500) || 'tidak ada');
    console.log('.y3Ibjb innerHTML:', starSpan?.innerHTML?.slice(0, 300) || 'tidak ada');
    console.log('.y3Ibjb textContent:', JSON.stringify(starSpan?.textContent));
    console.log('.y3Ibjb childElementCount:', starSpan?.childElementCount);
    // log semua img dan span tanpa filter di dalam h3PQJ
    ratingArea?.querySelectorAll('*').forEach(el => {
      console.log(`  ${el.tagName} cls="${el.className}" aria="${el.getAttribute('aria-label')||''}" txt="${el.textContent.trim().slice(0,30)}"`);
    });
    console.log('=== END DEBUG ===');
  }

  /* ── 3. Ekstrak ulasan ── */
  const results = [];

  cards.forEach((card, i) => {
    try {
      /* Nama */
      const name = card.querySelector('.rhtdWc')?.textContent?.trim() || '';

      /* Rating — fallback bertingkat */
      let rating = null;
      const starSpan = card.querySelector('.y3Ibjb');
      if (starSpan) {
        // A) aria-label di dalam starSpan
        starSpan.querySelectorAll('[aria-label]').forEach(el => {
          const m = (el.getAttribute('aria-label') || '').match(/(\d+(?:[.,]\d+)?)\s*(bintang|star)/i);
          if (m) rating = parseFloat(m[1].replace(',', '.'));
        });
        // B) hitung img bintang
        if (!rating) {
          const imgs = starSpan.querySelectorAll('img');
          if (imgs.length >= 1 && imgs.length <= 5) rating = imgs.length;
        }
        // C) hitung child elements (tiap bintang = 1 elemen)
        if (!rating) {
          const n = starSpan.childElementCount;
          if (n >= 1 && n <= 5) rating = n;
        }
        // D) karakter ★ atau unicode bintang
        if (!rating) {
          const stars = (starSpan.textContent.match(/[★⭐]/g) || []).length;
          if (stars >= 1 && stars <= 5) rating = stars;
        }
      }
      // E) cek .h3PQJ secara keseluruhan jika masih null
      if (!rating) {
        const h3 = card.querySelector('.h3PQJ');
        h3?.querySelectorAll('[aria-label]').forEach(el => {
          const m = (el.getAttribute('aria-label') || '').match(/(\d+(?:[.,]\d+)?)\s*(bintang|star)/i);
          if (m) rating = parseFloat(m[1].replace(',', '.'));
        });
      }

      /* Tanggal */
      const date = card.querySelector('span.m6Mr5d')?.textContent?.trim() || '';

      /* Teks ulasan */
      const text = card.querySelector('div.d83Iyc')?.textContent?.trim() || '';

      /* Avatar */
      const avatar = card.querySelector('img[src*="googleusercontent"]')?.src ||
                     card.querySelector('.QNewyd')?.style?.backgroundImage?.match(/url\("([^"]+)"\)/)?.[1] || '';

      results.push({ index: i + 1, name, rating, date, text, avatar });
    } catch (e) {
      console.warn(`Skip card ${i}:`, e.message);
    }
  });

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
