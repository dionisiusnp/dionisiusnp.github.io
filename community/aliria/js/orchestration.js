// ─────────────────────────────────────────────
//  Aliria Tech — Orchestration Node System
// ─────────────────────────────────────────────

class OrchestrationGraph {
  constructor(canvasId, onNodeClick, nodeConfig = null, orbitRatio = 0.30) {
    this.canvas = document.getElementById(canvasId);
    this.ctx    = this.canvas.getContext('2d');
    this.onNodeClick = onNodeClick;

    // state: 'idle' | 'active' | 'focused'
    this.state       = 'idle';
    this.focusedType = null;
    this.tick        = 0;
    this.packets     = [];

    this.orbitRatio = orbitRatio;
    this.nodeConfig = nodeConfig || [
      { id: 'aliria',    label: 'ALIRIA',    type: null,        isCenter: true,  color: '#3b82f6', glow: '#1d4ed8', emoji: null,  href: null         },
      { id: 'mentor',    label: 'Mentor',    type: 'mentor',    isCenter: false, color: '#60a5fa', glow: '#2563eb', emoji: '🧑‍🏫', href: null         },
      { id: 'project',   label: 'Project',   type: 'project',   isCenter: false, color: '#f87171', glow: '#b91c1c', emoji: '🛠️',  href: null         },
      { id: 'marketing', label: 'Marketing', type: 'marketing', isCenter: false, color: '#fbbf24', glow: '#d97706', emoji: '📢',  href: null         },
      { id: 'partner',   label: 'Partner',   type: 'partner',   isCenter: false, color: '#34d399', glow: '#059669', emoji: '🤝',  href: null         },
      { id: 'cheat',     label: 'Cheat',     type: 'cheat',     isCenter: false, color: '#a78bfa', glow: '#7c3aed', emoji: '📋',  href: 'cheat.html' },
    ];

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
    this.canvas.width  = p.offsetWidth  || p.getBoundingClientRect().width  || 600;
    this.canvas.height = p.offsetHeight || p.getBoundingClientRect().height || 420;
    this.W = this.canvas.width;
    this.H = this.canvas.height;
  }

  _buildNodes() {
    const cx = this.W / 2, cy = this.H / 2;
    const r  = Math.min(this.W, this.H) * this.orbitRatio;
    // 5 surrounding nodes evenly spaced, starting from top
    const surroundCount = this.nodeConfig.filter(c => !c.isCenter).length;
    let si = 0;

    this.nodes = this.nodeConfig.map((cfg, i) => {
      let x, y;
      if (cfg.isCenter) {
        x = cx; y = cy;
      } else {
        const angle = -Math.PI / 2 + (2 * Math.PI / surroundCount) * si;
        x = cx + Math.cos(angle) * r;
        y = cy + Math.sin(angle) * r;
        si++;
      }
      return { ...cfg, x, y, ox: x, oy: y, radius: cfg.radius || (cfg.isCenter ? 36 : 26), alpha: 1, phase: i * 1.1 };
    });
  }

  _buildEdges() {
    const center = this.nodes.find(n => n.isCenter);
    this.edges = this.nodes
      .filter(n => !n.isCenter)
      .map(n => ({ from: center, to: n, dashOffset: 0, packetT: Math.random(), active: false }));
  }

  _bindEvents() {
    this.canvas.addEventListener('click', (e) => this._handleClick(e));
    this.canvas.addEventListener('mousemove', (e) => this._handleHover(e));
    this.canvas.style.cursor = 'default';
  }

  _getNodeAt(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mx   = e.clientX - rect.left;
    const my   = e.clientY - rect.top;
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
      // Toggle active state — visual only, no sidebar
      if (this.state === 'active' || this.state === 'focused') {
        this.state = 'idle';
        this.focusedType = null;
        this.packets = [];
        this.nodes.forEach(n => { n.alpha = 1; });
      } else {
        this.state = 'active';
        this.focusedType = null;
        this.nodes.forEach(n => { n.alpha = 1; });
        this._spawnPackets('all');
      }
    } else {
      // Focus + trigger sidebar (or href if set)
      this.state = 'focused';
      this.focusedType = hit.type;
      this.nodes.forEach(n => { n.alpha = (n.isCenter || n.id === hit.id) ? 1 : 0.2; });
      this.packets = [];
      this._spawnPackets(hit.id);
      this.onNodeClick(hit.type);
    }
  }

  _spawnPackets(target) {
    if (target === 'all') {
      this.edges.forEach(e => {
        for (let i = 0; i < 2; i++) {
          this.packets.push({ edge: e, t: i * .5, speed: .007 + Math.random() * .005 });
        }
      });
    } else {
      const edge = this.edges.find(e => e.to.id === target);
      if (edge) {
        for (let i = 0; i < 3; i++) {
          this.packets.push({ edge, t: i * .33, speed: .01 + Math.random() * .005 });
        }
      }
    }
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
      n.x = n.ox + Math.sin(this.tick * .012 + n.phase) * 4;
      n.y = n.oy + Math.cos(this.tick * .009 + n.phase) * 3;
    });
  }

  _drawEdges() {
    this.edges.forEach(e => {
      const { from, to } = e;
      const isActive = this.state === 'active' ||
        (this.state === 'focused' && to.id === this.nodes.find(n => n.type === this.focusedType)?.id);
      const alpha = this.state === 'idle' ? .18 : (to.alpha > .5 ? .55 : .08);
      const lineW = isActive ? 1.5 : 1;

      // base line
      this.ctx.save();
      this.ctx.globalAlpha = alpha;
      this.ctx.strokeStyle = isActive ? to.color : 'rgba(99,163,255,1)';
      this.ctx.lineWidth   = lineW;
      this.ctx.setLineDash(isActive ? [6, 5] : []);
      this.ctx.lineDashOffset = isActive ? -(this.tick * 1.2) : 0;
      this.ctx.beginPath();
      this.ctx.moveTo(from.x, from.y);
      this.ctx.lineTo(to.x, to.y);
      this.ctx.stroke();

      // glow on active
      if (isActive) {
        this.ctx.shadowColor  = to.glow;
        this.ctx.shadowBlur   = 10;
        this.ctx.globalAlpha  = alpha * .6;
        this.ctx.lineWidth    = 3;
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
      this.ctx.shadowBlur  = 10;
      this.ctx.fillStyle   = to.color;
      this.ctx.globalAlpha = .85;
      this.ctx.beginPath();
      this.ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();

      return true;
    });
  }

  _drawNodes() {
    this.nodes.forEach(n => {
      this.ctx.save();
      this.ctx.globalAlpha = n.alpha;

      const pulse = 1 + Math.sin(this.tick * .05 + n.phase) * .04;
      const r = n.radius * pulse;

      // outer glow ring
      const grd = this.ctx.createRadialGradient(n.x, n.y, r * .5, n.x, n.y, r * 2.5);
      grd.addColorStop(0, n.color + '28');
      grd.addColorStop(1, 'transparent');
      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, r * 2.5, 0, Math.PI * 2);
      this.ctx.fillStyle = grd;
      this.ctx.fill();

      // node circle fill
      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      this.ctx.fillStyle   = n.isCenter ? '#0d1628' : '#0f1a2e';
      this.ctx.strokeStyle = n === this.hoveredNode
        ? n.color
        : (this.state !== 'idle' && n.alpha > .5 ? n.color : n.color + '66');
      this.ctx.lineWidth   = n === this.hoveredNode ? 2 : 1.5;
      this.ctx.shadowColor = n.glow;
      this.ctx.shadowBlur  = n === this.hoveredNode || (this.state !== 'idle' && n.alpha > .5) ? 18 : 6;
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.shadowBlur  = 0;

      // center logo image (clipped to circle)
      if (n.isCenter && this._logoImg && this._logoImg.complete && this._logoImg.naturalWidth) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(n.x, n.y, r - 1, 0, Math.PI * 2);
        this.ctx.clip();
        const s = r * 2;
        this.ctx.drawImage(this._logoImg, n.x - s / 2, n.y - s / 2, s, s);
        this.ctx.restore();
      }

      // emoji + label
      if (!n.isCenter) {
        this.ctx.font      = `${r * .65}px sans-serif`;
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText(n.emoji, n.x, n.y + r * .22);
      }

      // label below
      const labelY = n.y + r + 18;
      this.ctx.font      = n.isCenter ? 'bold 13px Inter, sans-serif' : '11px Inter, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = n.alpha > .5 ? n.color : '#ffffff44';
      this.ctx.fillText(n.label, n.x, labelY);

      this.ctx.restore();
    });
  }

  // ── Public ────────────────────────────────

  loadLogo(src) {
    this._logoImg = new Image();
    this._logoImg.src = src;
  }

  loadSegment(nodeConfig) {
    this.nodeConfig  = nodeConfig;
    this.state       = 'idle';
    this.focusedType = null;
    this.packets     = [];
    this._buildNodes();
    this._buildEdges();
    this.nodes.forEach(n => { n.alpha = 1; });
  }

  reset() {
    this.state = 'idle';
    this.focusedType = null;
    this.packets = [];
    this.nodes.forEach(n => { n.alpha = 1; });
    this.onNodeClick(null);
  }
}
