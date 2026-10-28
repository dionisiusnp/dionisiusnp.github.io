/**
 * Google Reviews Crawler — Universitas Dinamika
 * Jalankan di Console browser saat panel ulasan Google sudah terbuka.
 *
 * Cara pakai:
 * 1. Buka Google, cari "Universitas Dinamika"
 * 2. Klik "981 ulasan" untuk buka panel ulasan
 * 3. Buka DevTools → Console
 * 4. Paste seluruh script ini → Enter
 * 5. Tunggu sampai selesai scroll (~1-2 menit)
 * 6. File JSON otomatis ter-download
 */

(async function crawlReviews() {
  /* ── 1. Temukan scrollable container ── */
  const scrollTarget =
    document.querySelector('.review-dialog-body') ||
    document.querySelector('[jscontroller="AdYPFb"]') ||
    document.querySelector('.RVCQse') ||
    (() => {
      return [...document.querySelectorAll('div')].find(el => {
        const s = getComputedStyle(el);
        return (s.overflowY === 'scroll' || s.overflowY === 'auto') && el.clientHeight > 300;
      });
    })();

  if (!scrollTarget) {
    alert('Panel ulasan tidak ditemukan. Pastikan panel ulasan sudah terbuka.');
    return;
  }

  console.log('✅ Scroll target:', scrollTarget.className || scrollTarget.tagName);

  /* ── 2. Scroll sampai bawah ── */
  let lastHeight = 0, sameCount = 0, totalScrolls = 0;
  console.log('⏳ Scrolling...');

  while (sameCount < 5) {
    scrollTarget.scrollTop = scrollTarget.scrollHeight;
    await new Promise(r => setTimeout(r, 800));
    const h = scrollTarget.scrollHeight;
    sameCount = h === lastHeight ? sameCount + 1 : 0;
    lastHeight = h;
    totalScrolls++;
    if (totalScrolls % 10 === 0) console.log(`  scroll ke-${totalScrolls}, height: ${h}px`);
  }
  console.log(`✅ Selesai scroll (${totalScrolls}x). Ekstrak data...`);

  /* ── 3. Ekstrak ulasan ── */
  const results = [];
  const cards = document.querySelectorAll('[jsname="ShBeI"]');

  cards.forEach((card, i) => {
    try {
      /* Nama — ambil hanya teks node pertama / span nama saja */
      const nameEl =
        card.querySelector('.d4r55') ||          // nama reviewer (umum)
        card.querySelector('.TSUbDb') ||
        card.querySelector('[class*="Eolon"]') ||
        card.querySelector('a[href*="contrib"] span') ||
        card.querySelector('a span');
      // Bersihkan: hapus " · X ulasan" / "X ulasan" / "X foto" dll
      let name = (nameEl?.textContent || '').trim().replace(/\s*[\d,]+\s*(ulasan|foto|review)[^]*/i, '').trim();
      // fallback: ambil dari link teks utuh lalu split
      if (!name) {
        const link = card.querySelector('a[href*="contrib"]');
        name = (link?.textContent || '').replace(/\s*[\d,]+\s*(ulasan|foto|review|Local Guide)[^]*/i, '').trim();
      }

      /* Rating — cari elemen dengan aria-label "X bintang" atau "X stars" */
      let rating = null;
      card.querySelectorAll('[aria-label]').forEach(el => {
        const lbl = el.getAttribute('aria-label') || '';
        const m = lbl.match(/^(\d+(?:[.,]\d+)?)\s*(bintang|star)/i);
        if (m) rating = parseFloat(m[1].replace(',', '.'));
      });
      // fallback: hitung img/span bintang penuh
      if (!rating) {
        const stars = card.querySelectorAll('.hCCjke, .fFtTze, [class*="filled"]');
        if (stars.length) rating = stars.length;
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

      /* Teks ulasan — expand "Lainnya" dulu */
      const expandBtn = card.querySelector('[jsaction*="pane.review"] button, .review-more-link, [data-expandable-section] button');
      if (expandBtn) { try { expandBtn.click(); } catch(_){} }

      const textEl =
        card.querySelector('[jsname="bN97Pc"]') ||
        card.querySelector('.wiI7pd') ||
        card.querySelector('.MyEned') ||
        card.querySelector('[class*="review-full"]') ||
        card.querySelector('.Jtu6Td');
      const text = textEl?.textContent?.trim() || '';

      /* Avatar */
      const avatarEl = card.querySelector('img[src*="googleusercontent"]');
      const avatar = avatarEl?.src || '';

      if (name || text) results.push({ index: i + 1, name, rating, date, text, avatar });
    } catch (e) {
      console.warn(`Skip card ${i}:`, e.message);
    }
  });

  console.log(`✅ Ekstrak ${results.length} ulasan dari ${cards.length} card.`);

  /* ── Debug: log nama semua card untuk cek selector ── */
  if (results.filter(r => !r.rating).length > results.length / 2) {
    console.warn('⚠️ Banyak rating null. Cek manual:');
    const sample = cards[0];
    if (sample) {
      console.log('Semua aria-label di card pertama:',
        [...sample.querySelectorAll('[aria-label]')].map(el => el.getAttribute('aria-label'))
      );
    }
  }

  /* ── 4. Download JSON ── */
  const payload = {
    source: 'Google Reviews — Universitas Dinamika',
    crawledAt: new Date().toISOString(),
    totalExtracted: results.length,
    reviews: results
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), {
    href: url,
    download: `ulasan-dinamika-${new Date().toISOString().slice(0,10)}.json`
  });
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);

  console.log(`🎉 Download: ${a.download}`);
  console.log('Preview 10 pertama:');
  console.table(results.slice(0, 10));
})();
