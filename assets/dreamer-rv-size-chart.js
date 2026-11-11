class DRVSizeFinder {
  constructor(root) {
    this.root = root;
    this.config = this.readConfig();

    this.svg = root.querySelector('[data-drv-svg]');
    this.emptyEl = root.querySelector('[data-drv-empty]');
    this.labelEl = root.querySelector('[data-drv-label]');
    this.findBtn = root.querySelector('[data-drv-find-btn]');
    this.noMatchEl = root.querySelector('[data-drv-no-match]');
    this.form = root.querySelector('[data-drv-form]');
    this.lengthInput = root.querySelector('[data-drv-length]');
    this.widthInput = root.querySelector('[data-drv-width]');
    this.cornerInput = root.querySelector('[data-drv-corner]');

    // Measurements throughout this file are centimetres, matching the form's
    // "Width of mattress (cm)" / "Length of mattress (cm)" labels and the
    // Min/Max Width/Length (cm) fields on each size block.
    this.SCALE = 1.7;
    this.PAD = 36;

    const sizes = this.config.sizes || [];
    this.MAX_W = sizes.length ? Math.max.apply(null, sizes.map(s => s.wMax || 0)) * this.SCALE : 0;
    this.MAX_L = sizes.length ? Math.max.apply(null, sizes.map(s => s.lMax || 0)) * this.SCALE : 0;

    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  readConfig() {
    const raw = this.root.querySelector('[data-drv-config]');
    try {
      return JSON.parse(raw.textContent);
    } catch (err) {
      console.error('DRV Size Finder: could not parse config JSON', err);
      return { sizes: [], shapeColor: '#5EB2B0', findLabel: 'Find my size', shopLabelTemplate: 'Shop [size] products' };
    }
  }

  slugify(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  shapePath(x, y, w, l, corner) {
    const r = corner === 'square' ? 0 : 24;
    return corner === 'left-cut'
      ? `M ${x + r} ${y} L ${x + w} ${y} L ${x + w} ${y + l - r} Q ${x + w} ${y + l} ${x + w - r} ${y + l} L ${x + 80} ${y + l} L ${x} ${y + l - 80} L ${x} ${y + r} Q ${x} ${y} ${x + r} ${y} Z`
      : `M ${x + r} ${y} L ${x + w - r} ${y} Q ${x + w} ${y} ${x + w} ${y + r} L ${x + w} ${y + l - r} Q ${x + w} ${y + l} ${x + w - r} ${y + l} L ${x + r} ${y + l} Q ${x} ${y + l} ${x} ${y + l - r} L ${x} ${y + r} Q ${x} ${y} ${x + r} ${y} Z`;
  }

  // Inclusive min/max range match on both width and length, restricted to the
  // selected corner profile. When a measurement falls inside more than one
  // overlapping band (e.g. a broad catch-all plus a narrower specific range),
  // the most specific match wins: the candidate with the smallest width x
  // length range area. A tie on area falls back to whichever candidate's
  // range centre is closer to the entered measurements.
  findMatch(widthCm, lengthCm, corner) {
    widthCm = Math.round(widthCm);
    lengthCm = Math.round(lengthCm);
    let best = null;
    let bestArea = Infinity;
    let bestCenterDist = Infinity;

    (this.config.sizes || []).forEach(s => {
      if (s.corner !== corner) return;
      if (widthCm < s.wMin || widthCm > s.wMax) return;
      if (lengthCm < s.lMin || lengthCm > s.lMax) return;

      const area = Math.max(s.wMax - s.wMin, 0) * Math.max(s.lMax - s.lMin, 0);
      const centerW = (s.wMin + s.wMax) / 2;
      const centerL = (s.lMin + s.lMax) / 2;
      const centerDist = Math.abs(widthCm - centerW) + Math.abs(lengthCm - centerL);

      if (area < bestArea || (area === bestArea && centerDist < bestCenterDist)) {
        bestArea = area;
        bestCenterDist = centerDist;
        best = s;
      }
    });

    return best;
  }

  renderNoMatch() {
    this.svg.innerHTML = '';
    this.svg.setAttribute('width', 0);
    this.svg.setAttribute('height', 0);
    this.emptyEl.hidden = false;
    this.emptyEl.textContent = 'No exact match for those measurements';
    this.labelEl.textContent = '';
    this.noMatchEl.hidden = false;
  }

  handleSubmit() {
    const width = parseFloat(this.widthInput.value);
    const length = parseFloat(this.lengthInput.value);
    const corner = this.cornerInput.value;
    if (Number.isNaN(length) || Number.isNaN(width) || !corner) return;

    const match = this.findMatch(width, length, corner);
    if (match) {
      window.location.href = `/collections/${this.slugify(match.name)}`;
      return;
    }
    this.renderNoMatch();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-drv-size-finder]').forEach(root => {
    new DRVSizeFinder(root);
  });
});