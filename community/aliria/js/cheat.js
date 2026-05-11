// ─────────────────────────────────────────────
//  Aliria Tech — Cheat Sheet (cheat.js)
// ─────────────────────────────────────────────

const TECH_META = {
  laravel:    { label:'Laravel',     emoji:'🐘', c:'color:#fca5a5',  b:'border-color:rgba(239,68,68,.4)',    bg:'background:rgba(239,68,68,.12)'    },
  flutter:    { label:'Flutter',     emoji:'🐦', c:'color:#93c5fd',  b:'border-color:rgba(59,130,246,.4)',   bg:'background:rgba(59,130,246,.12)'   },
  java:       { label:'Java',        emoji:'☕', c:'color:#fdba74',  b:'border-color:rgba(249,115,22,.4)',  bg:'background:rgba(249,115,22,.12)'  },
  springboot: { label:'Spring Boot', emoji:'🍃', c:'color:#86efac',  b:'border-color:rgba(34,197,94,.4)',   bg:'background:rgba(34,197,94,.12)'   },
  docker:     { label:'Docker',      emoji:'🐳', c:'color:#7dd3fc',  b:'border-color:rgba(14,165,233,.4)',  bg:'background:rgba(14,165,233,.12)'  },
  ai:         { label:'AI & Prompt', emoji:'🤖', c:'color:#d8b4fe',  b:'border-color:rgba(168,85,247,.4)',  bg:'background:rgba(168,85,247,.12)'  },
};

class CheatSystem {
  constructor(jsonPath) {
    this.jsonPath    = jsonPath;
    this.data        = [];
    this.filtered    = [];
    this.activeType  = 'all';
    this.searchQuery = '';
  }

  async init() {
    const res     = await fetch(this.jsonPath);
    this.data     = await res.json();
    this.filtered = [...this.data];
    this._render();
    this._bindEvents();
  }

  _applyFilters() {
    const q = this.searchQuery.toLowerCase();
    this.filtered = this.data.filter(item => {
      const matchType = this.activeType === 'all' || item.type === this.activeType;
      const matchQ    = !q || item.command.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
      return matchType && matchQ;
    });
    this._render();
  }

  _render() {
    const grid = document.getElementById('cheat-grid');
    if (!grid) return;

    const cnt = document.getElementById('result-count');

    if (!this.filtered.length) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:5rem 0;color:rgba(255,255,255,.2);font-size:.875rem">Tidak ada hasil.</div>`;
      if (cnt) cnt.textContent = '0 perintah';
      return;
    }

    grid.innerHTML = this.filtered.map(item => {
      const meta    = TECH_META[item.type] || TECH_META.laravel;
      const lines   = item.command.split('\n');
      const isMulti = lines.length > 1;
      const comment = isMulti ? `<div style="color:rgba(255,255,255,.28);font-size:.68rem;margin-bottom:.35rem;font-family:'JetBrains Mono',monospace">${this._esc(lines[0])}</div>` : '';
      const code    = isMulti ? lines.slice(1).join('\n') : item.command;
      const isPrompt = item.type === 'ai' && item.command.startsWith('Prompt:');
      const copyVal = code.replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\n/g,'\\n');

      return `<div style="border-radius:.75rem;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.025);padding:1rem;display:flex;flex-direction:column;gap:.65rem;cursor:default" onmouseenter="this.style.background='rgba(255,255,255,.05)'" onmouseleave="this.style.background='rgba(255,255,255,.025)'">
  <div style="display:flex;align-items:center;justify-content:space-between;gap:.5rem">
    <span style="display:inline-flex;align-items:center;gap:.3rem;padding:.15rem .55rem;border-radius:99px;border:1px solid;font-size:.65rem;font-weight:500;${meta.c};${meta.b};${meta.bg}">${meta.emoji} ${meta.label}</span>
    <button onclick="cheatCopy(this,'${copyVal}')" title="Copy" style="width:1.75rem;height:1.75rem;border-radius:.4rem;border:none;background:transparent;color:rgba(255,255,255,.3);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0" onmouseenter="this.style.color='#fff';this.style.background='rgba(255,255,255,.1)'" onmouseleave="this.style.color='rgba(255,255,255,.3)';this.style.background='transparent'">
      <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
    </button>
  </div>
  ${isPrompt
    ? `<div style="font-size:.8rem;color:rgba(255,255,255,.8);line-height:1.55;font-style:italic">"${this._esc(code.replace('Prompt: ',''))}"</div>`
    : `<div>${comment}<code style="font-family:'JetBrains Mono',monospace;font-size:.8rem;color:rgba(255,255,255,.88);line-height:1.6;white-space:pre-wrap;word-break:break-all">${this._esc(code)}</code></div>`
  }
  <p style="font-size:.72rem;color:rgba(255,255,255,.38);line-height:1.5;margin:0">${this._esc(item.description)}</p>
  ${item.common ? '<div style="font-size:.6rem;color:rgba(255,255,255,.18)">★ umum dipakai</div>' : ''}
</div>`;
    }).join('');

    if (cnt) cnt.textContent = `${this.filtered.length} perintah`;
  }

  _bindEvents() {
    const si = document.getElementById('search-input');
    if (si) si.addEventListener('input', e => { this.searchQuery = e.target.value; this._applyFilters(); });

    document.querySelectorAll('[data-type]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeType = btn.dataset.type;
        document.querySelectorAll('[data-type]').forEach(b => b.classList.toggle('active-type', b.dataset.type === this.activeType));
        this._applyFilters();
      });
    });
  }

  _esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
}

async function cheatCopy(btn, rawStr) {
  const text = rawStr.replace(/\\n/g,'\n').replace(/\\'/g,"'").replace(/\\\\/g,'\\');
  try { await navigator.clipboard.writeText(text); } catch {
    const ta = Object.assign(document.createElement('textarea'), { value: text });
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
  }
  const orig = btn.innerHTML;
  btn.innerHTML = '<svg width="13" height="13" fill="none" stroke="#4ade80" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>';
  setTimeout(() => { btn.innerHTML = orig; }, 1500);
}
