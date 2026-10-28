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

  /* ── DEBUG: log semua elemen dalam card pertama (class + text pendek) ── */
  if (cards.length > 0) {
    console.log('=== SEMUA ELEMEN di card[0] ===');
    cards[0].querySelectorAll('*').forEach(el => {
      const cls = el.className && typeof el.className === 'string' ? el.className.trim() : '';
      const txt = el.childElementCount === 0 ? el.textContent.trim().slice(0, 80) : '';
      const tag = el.tagName.toLowerCase();
      const aria = el.getAttribute('aria-label') || '';
      const jsn = el.getAttribute('jsname') || '';
      if (cls || txt || aria) {
        console.log(`${tag}${cls?'.'+cls.split(' ').join('.'):''}${jsn?'[jsname='+jsn+']':''} | aria="${aria}" | txt="${txt}"`);
      }
    });
    console.log('=== END DEBUG ===');
  }

  /* ── 3. Ekstrak ulasan ── */
  const results = [];

  cards.forEach((card, i) => {
    try {
      /* Nama */
      const nameEl =
        card.querySelector('.rhtdWc') ||   // confirmed dari debug
        card.querySelector('.d4r55') ||
        card.querySelector('.TSUbDb') ||
        card.querySelector('[class*="Eolon"]') ||
        card.querySelector('a span:first-child');
      let name = (nameEl?.textContent || '').trim()
        .replace(/\s*[\d,.]+\s*(ulasan|foto|review|Local Guide)[^]*/i, '').trim();

      /* Rating — coba berbagai pendekatan */
      let rating = null;

      // A) aria-label langsung di elemen bintang
      card.querySelectorAll('[aria-label]').forEach(el => {
        const lbl = el.getAttribute('aria-label') || '';
        const m = lbl.match(/(\d+(?:[.,]\d+)?)\s*(bintang|stars?|out of)/i);
        if (m) rating = parseFloat(m[1].replace(',', '.'));
      });

      // B) hitung img/svg bintang terisi
      if (!rating) {
        const filled = card.querySelectorAll(
          'img[src*="star"][src*="active"], img[src*="star_rate"], ' +
          '.lTi8oc, .DkEaL, .hCCjke, .fFtTze, [class*="star"][class*="fill"]'
        );
        if (filled.length) rating = filled.length;
      }

      // C) hitung karakter ★ dalam text
      if (!rating) {
        const allText = card.textContent;
        const stars = (allText.match(/★/g) || []).length;
        if (stars >= 1 && stars <= 5) rating = stars;
      }

      // D) cari span/div yang hanya berisi angka 1-5 diikuti "/" atau "dari"
      if (!rating) {
        [...card.querySelectorAll('span,div')].forEach(el => {
          if (el.children.length === 0) {
            const m = el.textContent.trim().match(/^([1-5])(?:\s*\/\s*5|\s*dari\s*5)?$/);
            if (m) rating = parseInt(m[1]);
          }
        });
      }

      /* Tanggal */
      const dateEl =
        card.querySelector('.rsGxI') ||
        card.querySelector('.dehysf') ||
        card.querySelector('.y3Ibjb') ||
        [...card.querySelectorAll('span')].find(el =>
          /^\d+\s*(bulan|tahun|hari|minggu|jam|detik|menit|month|year|day|week)/i.test(el.textContent.trim())
        );
      const date = dateEl?.textContent?.trim() || '';

      /* Teks ulasan */
      // expand "Lainnya" dulu
      const moreBtn = card.querySelector('a.review-more-link, [jsaction*="reviewBody"] a');
      if (moreBtn) { try { moreBtn.click(); } catch(_){} }

      const textEl =
        card.querySelector('[jsname="bN97Pc"]') ||
        card.querySelector('.wiI7pd') ||
        card.querySelector('.MyEned') ||
        card.querySelector('.Jtu6Td') ||
        card.querySelector('[class*="review-full"]') ||
        card.querySelector('[data-expandable-section]') ||
        // fallback: ambil semua span teks panjang (>10 char) yang bukan nama/tanggal
        [...card.querySelectorAll('span')].find(el =>
          el.children.length === 0 &&
          el.textContent.trim().length > 15 &&
          el !== dateEl && el !== nameEl
        );
      const text = textEl?.textContent?.trim() || '';

      /* Avatar */
      const avatar = card.querySelector('img[src*="googleusercontent"]')?.src || '';

      results.push({ index: i + 1, name, rating, date, text, avatar });
    } catch (e) {
      console.warn(`Skip card ${i}:`, e.message);
    }
  });

  const withRating = results.filter(r => r.rating !== null).length;
  const withText = results.filter(r => r.text).length;
  console.log(`✅ Ekstrak ${results.length} ulasan | rating: ${withRating} | teks: ${withText}`);

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
