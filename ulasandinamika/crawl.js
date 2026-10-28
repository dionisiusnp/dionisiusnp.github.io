/**
 * Google Reviews Crawler — Universitas Dinamika
 * Jalankan di Console browser saat panel ulasan Google sudah terbuka.
 *
 * Cara pakai:
 * 1. Buka Google, cari "Universitas Dinamika"
 * 2. Klik "981 ulasan" untuk buka panel ulasan
 * 3. Buka DevTools → Console
 * 4. Paste seluruh script ini → Enter
 * 5. Tunggu sampai selesai scroll (~1-2 menit tergantung jumlah ulasan)
 * 6. File JSON otomatis ter-download
 */

(async function crawlReviews() {
  /* ── 1. Temukan scrollable container ── */
  const scrollTarget =
    document.querySelector('.review-dialog-body') ||
    document.querySelector('[jscontroller="AdYPFb"]') ||
    document.querySelector('.RVCQse') ||
    (() => {
      // fallback: cari div yang overflow-y scroll dan tinggi > 300
      return [...document.querySelectorAll('div')].find(el => {
        const s = getComputedStyle(el);
        return (s.overflowY === 'scroll' || s.overflowY === 'auto') && el.clientHeight > 300;
      });
    })();

  if (!scrollTarget) {
    alert('Panel ulasan tidak ditemukan. Pastikan panel ulasan sudah terbuka.');
    return;
  }

  console.log('✅ Scroll target ditemukan:', scrollTarget.className || scrollTarget.tagName);

  /* ── 2. Scroll sampai bawah untuk load semua ulasan ── */
  let lastHeight = 0;
  let sameCount = 0;
  let totalScrolls = 0;

  console.log('⏳ Mulai scroll untuk load semua ulasan...');

  while (sameCount < 5) {
    scrollTarget.scrollTop = scrollTarget.scrollHeight;
    await new Promise(r => setTimeout(r, 800));

    const newHeight = scrollTarget.scrollHeight;
    if (newHeight === lastHeight) {
      sameCount++;
    } else {
      sameCount = 0;
      lastHeight = newHeight;
    }
    totalScrolls++;
    if (totalScrolls % 10 === 0) console.log(`  Scroll ke-${totalScrolls}, height: ${newHeight}px`);
  }

  console.log(`✅ Selesai scroll (${totalScrolls}x). Mulai ekstrak data...`);

  /* ── 3. Ekstrak data ulasan ── */
  const results = [];

  // Selector utama: card ulasan individual
  const reviewCards = document.querySelectorAll('[jsname="ShBeI"]');

  reviewCards.forEach((card, i) => {
    try {
      // Nama reviewer
      const nameEl = card.querySelector('[class*="Eolon"]') ||
                     card.querySelector('.TSUbDb') ||
                     card.querySelector('[jsname="r4nke"]') ||
                     card.querySelector('a[href*="contrib"]');
      const name = nameEl?.textContent?.trim() || '';

      // Rating (hitung bintang terisi)
      const starsEl = card.querySelectorAll('[aria-label*="bintang"], [aria-label*="star"], span[role="img"]');
      let rating = null;
      starsEl.forEach(el => {
        const lbl = el.getAttribute('aria-label') || '';
        const match = lbl.match(/(\d+(\.\d+)?)/);
        if (match) rating = parseFloat(match[1]);
      });
      // fallback: hitung elemen bintang aktif
      if (!rating) {
        const activeStar = card.querySelectorAll('.z3HNkc, [class*="star"][class*="active"], .hCCjke');
        if (activeStar.length) rating = activeStar.length;
      }

      // Tanggal
      const dateEl = card.querySelector('[class*="dehysf"], .rsGxI, .y3Ibjb, [jsname="MZnM8e"]') ||
                     [...card.querySelectorAll('span')].find(el => /\d+\s*(bulan|tahun|hari|minggu|jam)/i.test(el.textContent));
      const date = dateEl?.textContent?.trim() || '';

      // Teks ulasan — expand "Lainnya" dulu kalau ada
      const moreBtn = card.querySelector('[jsaction*="click:"] span[style*="cursor"]') ||
                      card.querySelector('button.review-more-link, [data-expandable]');
      if (moreBtn) moreBtn.click();

      const textEl = card.querySelector('[jsname="bN97Pc"], .Jtu6Td, [class*="review-full-text"], .wiI7pd');
      const text = textEl?.textContent?.trim() || '';

      // Foto reviewer
      const avatarEl = card.querySelector('img[src*="googleusercontent"], img[jsname]');
      const avatar = avatarEl?.src || '';

      // Hanya simpan kalau minimal ada nama atau teks
      if (name || text) {
        results.push({ index: i + 1, name, rating, date, text, avatar });
      }
    } catch (e) {
      console.warn(`Skip card ${i}:`, e.message);
    }
  });

  console.log(`✅ Berhasil ekstrak ${results.length} ulasan dari ${reviewCards.length} card.`);

  if (results.length === 0) {
    // Fallback: coba selector alternatif
    console.warn('Tidak ada hasil dengan selector utama. Coba selector fallback...');
    document.querySelectorAll('.bwb7ce').forEach((card, i) => {
      const spans = [...card.querySelectorAll('span')].map(s => s.textContent.trim()).filter(Boolean);
      results.push({ index: i + 1, raw: spans.slice(0, 10) });
    });
    console.log(`Fallback: ${results.length} card ditemukan (raw data).`);
  }

  /* ── 4. Download sebagai JSON ── */
  const payload = {
    source: 'Google Reviews — Universitas Dinamika',
    crawledAt: new Date().toISOString(),
    totalExtracted: results.length,
    reviews: results
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ulasan-dinamika-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);

  console.log(`🎉 Download selesai: ${a.download}`);
  console.table(results.slice(0, 5));
})();
