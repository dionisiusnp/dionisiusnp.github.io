// ─────────────────────────────────────────────
//  Homepage — Multi-level Orchestration Graph
// ─────────────────────────────────────────────

const HOME_TREE = {
  center: {
    id: 'dion', label: 'Dionisius NP',
    color: '#6366f1', glow: '#4338ca',
  },
  categories: [
    {
      id: 'karir', label: 'Karir', emoji: '🏢',
      color: '#60a5fa', glow: '#2563eb',
      angle: -90, // top
      children: [
        { id: 'undika',    label: 'Universitas Dinamika',  emoji: '🎓', color: '#67e8f9', glow: '#0891b2', href: '/universitas-dinamika/' },
        { id: 'mitra',     label: 'Mitra Super Teknologi', emoji: '🤝', color: '#60a5fa', glow: '#2563eb', href: '#' },
        { id: 'freelance', label: 'Freelance',              emoji: '💼', color: '#a5b4fc', glow: '#6366f1', href: '#' },
      ],
    },
    {
      id: 'karya', label: 'Karya', emoji: '✨',
      color: '#c084fc', glow: '#9333ea',
      angle: 0, // right
      children: [
        { id: 'gamifikasi', label: 'Tim Gamifikasi',  emoji: '🎮', color: '#c084fc', glow: '#9333ea', href: '/team-for-laravel-gamification/' },
        { id: 'summit-t',   label: 'Tim Summit Yu',   emoji: '⛰️', color: '#fbbf24', glow: '#d97706', href: '/team-for-summityu/' },
        { id: 'aliria',     label: 'Aliria Tech',     emoji: '⚡', color: '#93c5fd', glow: '#3b82f6', href: '/community/aliria/' },
      ],
    },
    {
      id: 'calculator', label: 'Calculator', emoji: '🧮',
      color: '#34d399', glow: '#059669',
      angle: 90, // bottom
      children: [
        { id: 'app-calc',    label: 'App Calculator',       emoji: '📱', color: '#34d399', glow: '#059669', href: '/offering/app-calculator/' },
        { id: 'summit-calc', label: 'Summit Yu Calculator', emoji: '🏔️', color: '#6ee7b7', glow: '#10b981', href: '/offering/summityu/calculator/' },
      ],
    },
    {
      id: 'log', label: 'Log', emoji: '📋',
      color: '#f87171', glow: '#b91c1c',
      angle: 180, // left
      children: [
        { id: 'cheat',   label: 'Cheat',   emoji: '📋', color: '#a78bfa', glow: '#7c3aed', href: '/community/aliria/cheat.html' },
        { id: 'article', label: 'Article', emoji: '📰', color: '#f87171', glow: '#ef4444', href: '#' },
        { id: 'script',  label: 'Script',  emoji: '⚙️', color: '#fbbf24', glow: '#d97706', href: '#' },
      ],
    },
  ],
};

class HomeGraph {
  constructor(canvasId, onNodeClick) {
    this.canvas = document.getElementById(canvasId);
    this.ctx    = this.canvas.getContext('2d');
    this.onNodeClick = onNodeClick;

    this.state        = 'idle';
    this.focusedCatId = null;
    this.tick         = 0;
    this.packets      = [];
    this.hoveredNode  = null;

    this._resize();
    this._buildNodes();
    this._buildEdges();
    this._bindEvents();
    this._animate();

    window.addEventListener('resize', () => {
      this._resize();
      this._buildNodes();
      this._buildEdges();
      this.packets = [];
    });
  }

  // ── Setup ──────────────────────────────────

  _resize() {
    const p = this.canvas.parentElement;
    this.canvas.width  = p.offsetWidth  || p.getBoundingClientRect().width  || 900;
    this.canvas.height = p.offsetHeight || p.getBoundingClientRect().height || 640;
    this.W = this.canvas.width;
    this.H = this.canvas.height;
  }

  _buildNodes() {
    const cx = this.W / 2, cy = this.H / 2;
    const innerR = Math.min(this.W, this.H) * 0.23;
    const outerR = Math.min(this.W, this.H) * 0.21;

    this.nodes = [];

    const center = {
      ...HOME_TREE.center,
      x: cx, y: cy, ox: cx, oy: cy,
      radius: 56, level: 0, isCenter: true,
      phase: 0, alpha: 1, childNodes: [],
    };
    this.nodes.push(center);

    HOME_TREE.categories.forEach((cat, ci) => {
      const catAngle = cat.angle * Math.PI / 180;
      const catX = cx + Math.cos(catAngle) * innerR;
      const catY = cy + Math.sin(catAngle) * innerR;

      const catNode = {
        ...cat, x: catX, y: catY, ox: catX, oy: catY,
        radius: 38, level: 1, isCenter: false,
        phase: ci * 1.4, alpha: 1, childNodes: [],
        parentNode: center,
      };
      this.nodes.push(catNode);
      center.childNodes.push(catNode);

      const n = cat.children.length;
      const spread = n === 2 ? 35 : 42;

      cat.children.forEach((child, cj) => {
        const offset    = (cj - (n - 1) / 2) * spread;
        const childAngle = (cat.angle + offset) * Math.PI / 180;
        const childX = catX + Math.cos(childAngle) * outerR;
        const childY = catY + Math.sin(childAngle) * outerR;

        const childNode = {
          ...child, x: childX, y: childY, ox: childX, oy: childY,
          radius: 28, level: 2, isCenter: false,
          phase: ci * 1.4 + cj * 0.8, alpha: 1,
          childNodes: [], parentNode: catNode,
        };
        this.nodes.push(childNode);
        catNode.childNodes.push(childNode);
      });
    });
  }

  _buildEdges() {
    this.edges = [];
    this.nodes.forEach(n => {
      if (n.level > 0) {
        this.edges.push({ from: n.parentNode, to: n, active: false });
      }
    });
  }

  _bindEvents() {
    this.canvas.addEventListener('click',     e => this._handleClick(e));
    this.canvas.addEventListener('mousemove', e => this._handleHover(e));
    this.canvas.style.cursor = 'default';
  }

  _getNodeAt(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    return this.nodes.find(n => Math.hypot(n.x - mx, n.y - my) < n.radius + 10);
  }

  _handleHover(e) {
    const hit = this._getNodeAt(e);
    this.canvas.style.cursor = hit ? 'pointer' : 'default';
    this.hoveredNode = hit || null;
  }

  _handleClick(e) {
    const hit = this._getNodeAt(e);
    if (!hit) return;

    if (hit.isCenter) {
      if (this.state !== 'idle') {
        this._resetState();
      } else {
        this.state = 'active';
        this.nodes.forEach(n => n.alpha = 1);
        this._spawnAll();
        this.onNodeClick(null);
      }
      return;
    }

    if (hit.level === 1) {
      if (this.state === 'focused' && this.focusedCatId === hit.id) {
        this._resetState();
        return;
      }
      this.state        = 'focused';
      this.focusedCatId = hit.id;
      this.packets      = [];
      this._applyFocusAlpha();
      this._spawnForCat(hit);
      this.onNodeClick(hit);
      return;
    }

    if (hit.level === 2) {
      this.onNodeClick(hit);
    }
  }

  _resetState() {
    this.state        = 'idle';
    this.focusedCatId = null;
    this.packets      = [];
    this.nodes.forEach(n => n.alpha = 1);
    this.onNodeClick(null);
  }

  _applyFocusAlpha() {
    const cat = this.nodes.find(n => n.id === this.focusedCatId);
    const visible = new Set([
      'dion', cat?.id,
      ...(cat?.childNodes?.map(c => c.id) || []),
    ]);
    this.nodes.forEach(n => { n.alpha = visible.has(n.id) ? 1 : 0.12; });
  }

  _spawnAll() {
    this.edges.forEach(edge => {
      for (let i = 0; i < 2; i++) {
        this.packets.push({ edge, t: i * 0.5, speed: 0.006 + Math.random() * 0.004 });
      }
    });
  }

  _spawnForCat(catNode) {
    const relevant = [
      this.edges.find(e => e.to.id === catNode.id),
      ...catNode.childNodes.map(c => this.edges.find(e => e.to.id === c.id)),
    ].filter(Boolean);

    relevant.forEach((edge, i) => {
      const count = i === 0 ? 3 : 2;
      for (let j = 0; j < count; j++) {
        this.packets.push({ edge, t: j / count, speed: 0.009 + Math.random() * 0.005 });
      }
    });
  }

  // ── Draw ──────────────────────────────────

  _animate() {
    this.ctx.clearRect(0, 0, this.W, this.H);
    this.tick++;
    this._floatNodes();
    this._drawEdges();
    this._drawPackets();
    this._drawNodes();
    requestAnimationFrame(() => this._animate());
  }

  _floatNodes() {
    this.nodes.forEach(n => {
      n.x = n.ox + Math.sin(this.tick * 0.012 + n.phase) * 3.5;
      n.y = n.oy + Math.cos(this.tick * 0.009 + n.phase) * 2.5;
    });
  }

  _drawEdges() {
    this.edges.forEach(e => {
      const { from, to } = e;
      const catId  = to.level === 1 ? to.id : to.parentNode?.id;
      const active = this.state === 'active' ||
        (this.state === 'focused' && catId === this.focusedCatId);
      const alpha  = this.state === 'idle' ? 0.14 : (to.alpha > 0.5 ? 0.5 : 0.05);

      this.ctx.save();
      this.ctx.globalAlpha  = alpha;
      this.ctx.strokeStyle  = active ? to.color : 'rgba(99,163,255,1)';
      this.ctx.lineWidth    = active ? 1.5 : 0.8;
      this.ctx.setLineDash(active ? [5, 5] : []);
      this.ctx.lineDashOffset = active ? -(this.tick * 0.9) : 0;
      this.ctx.beginPath();
      this.ctx.moveTo(from.x, from.y);
      this.ctx.lineTo(to.x, to.y);
      this.ctx.stroke();

      if (active) {
        this.ctx.shadowColor = to.glow;
        this.ctx.shadowBlur  = 8;
        this.ctx.globalAlpha = alpha * 0.5;
        this.ctx.lineWidth   = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(from.x, from.y);
        this.ctx.lineTo(to.x, to.y);
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;
      }
      this.ctx.restore();
    });
  }

  _drawPackets() {
    this.packets = this.packets.filter(p => {
      p.t += p.speed;
      if (p.t > 1) p.t = 0;
      const { from, to } = p.edge;
      const px = from.x + (to.x - from.x) * p.t;
      const py = from.y + (to.y - from.y) * p.t;
      this.ctx.save();
      this.ctx.shadowColor = to.glow;
      this.ctx.shadowBlur  = 8;
      this.ctx.fillStyle   = to.color;
      this.ctx.globalAlpha = 0.85;
      this.ctx.beginPath();
      this.ctx.arc(px, py, 3, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
      return true;
    });
  }

  _drawNodes() {
    // Draw level 2 first, then 1, then 0 (center on top)
    const sorted = [...this.nodes].sort((a, b) => b.level - a.level);

    sorted.forEach(n => {
      this.ctx.save();
      this.ctx.globalAlpha = n.alpha;

      const pulse = 1 + Math.sin(this.tick * 0.05 + n.phase) * 0.03;
      const r     = n.radius * pulse;

      // Glow halo
      const grd = this.ctx.createRadialGradient(n.x, n.y, r * 0.5, n.x, n.y, r * 2.4);
      grd.addColorStop(0, n.color + '20');
      grd.addColorStop(1, 'transparent');
      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, r * 2.4, 0, Math.PI * 2);
      this.ctx.fillStyle = grd;
      this.ctx.fill();

      // Circle body
      const isLit = n === this.hoveredNode || (this.state !== 'idle' && n.alpha > 0.5);
      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      this.ctx.fillStyle   = n.level === 0 ? '#080812' : '#0a0a16';
      this.ctx.strokeStyle = isLit ? n.color : n.color + '55';
      this.ctx.lineWidth   = n === this.hoveredNode ? 2.5 : 1.5;
      this.ctx.shadowColor = n.glow;
      this.ctx.shadowBlur  = isLit ? 20 : 5;
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.shadowBlur = 0;

      // Photo on center
      if (n.isCenter && this._logoImg?.complete && this._logoImg.naturalWidth) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(n.x, n.y, r - 1, 0, Math.PI * 2);
        this.ctx.clip();
        this.ctx.drawImage(this._logoImg, n.x - r, n.y - r, r * 2, r * 2);
        this.ctx.restore();
      }

      // Emoji
      if (!n.isCenter && n.emoji) {
        this.ctx.font         = `${r * 0.72}px sans-serif`;
        this.ctx.textAlign    = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle    = '#fff';
        this.ctx.fillText(n.emoji, n.x, n.y + 1);
      }

      // Label
      const labelY = n.y + r + (n.level === 0 ? 20 : n.level === 1 ? 16 : 13);
      this.ctx.font         = n.level === 0
        ? 'bold 13px Inter,sans-serif'
        : n.level === 1
        ? 'bold 11px Inter,sans-serif'
        : '10px Inter,sans-serif';
      this.ctx.textAlign    = 'center';
      this.ctx.textBaseline = 'alphabetic';
      this.ctx.fillStyle    = n.alpha > 0.5 ? n.color : '#ffffff22';
      this.ctx.fillText(n.label, n.x, labelY);

      this.ctx.restore();
    });
  }

  // ── Public ────────────────────────────────

  loadLogo(src) {
    this._logoImg = new Image();
    this._logoImg.src = src;
  }

  reset() { this._resetState(); }
}
