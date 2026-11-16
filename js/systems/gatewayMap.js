/**
 * Interactive Tiled Gateway Map & Legends Viewer.
 * Reads ./map-tiles/manifest.json and streams tiles across zoom levels z0..z4
 * onto a pan/zoom canvas alongside a localized Evrima Map Legends explanation.
 */

const MAP_LOCALE = {
  en: {
    badge: 'EVRIMA ISLAND CARTOGRAPHY',
    title: 'Gateway Island Map & Legends',
    subtitle: 'Interactive tiled topographic map (v0.21.7) with vital survival legend explanations.',
    whyHeading: 'Why Understanding Map Legends Matters in The Isle: Evrima',
    whyBody:
      'On Gateway, spawning blind gets hatchlings killed fast. Reading terrain colors, water markings, and scent legends lets you locate safe shallow streams away from Deinosuchus ambush rivers, avoid lethal cliff drop-offs at night, converge on Migration & Sanctuary feeding zones, and call out exact grid coordinates to Primeval Malaysia packmates.',
    legendsHeading: 'Essential Map & Scent Legends',
    legends: [
      {
        color: '#22d3ee',
        name: 'Freshwater Rivers & Pools (Cyan/Blue)',
        desc: 'Primary drinking water. Narrow stream bends & isolated hillside pools are far safer than deep wide rivers infested with Deinosuchus.'
      },
      {
        color: '#0f2d5e',
        name: 'Saltwater Ocean & Tide Flats (Deep Navy)',
        desc: 'Undrinkable without the Reniculate Kidneys hidden mutation—watch coastal beaches carefully.'
      },
      {
        color: '#8f9688',
        name: 'Highlands, Cliffs & Dome Complex (Grey Contours)',
        desc: 'Steep rocky elevation & central hexagonal Gateway Dome. Dropping off shaded ridges fractures legs immediately.'
      },
      {
        color: '#5a8f3d',
        name: 'Dense Jungle, Meadows & Mud Flats (Green/Olive)',
        desc: 'Dense evergreens hide resting dinos (press H); open plains expose slow species to ambush.'
      },
      {
        color: '#ef4444',
        name: 'In-Game Scent: Sanctuary & Migration Icons (Q)',
        desc: 'Red Palm = safe Juvenile Sanctuary groves; Footprints = active Migration herbivore feeding corridors.'
      }
    ],
    zoomIn: 'Zoom +',
    zoomOut: 'Zoom −',
    resetView: 'Reset View',
    gridLabel: 'Toggle Grid',
    hint: 'Drag map to pan • Mouse wheel or +/- buttons to zoom • Press ESC or Close to return.'
  },

  ms: {
    badge: 'KARTOGRAFI PULAU EVRIMA',
    title: 'Peta Pulau Gateway & Petunjuk (Legends)',
    subtitle: 'Peta topografi interaktif (v0.21.7) bersama panduan maksud simbol & petunjuk survival.',
    whyHeading: 'Kenapa Penting Faham Petunjuk Peta (Legends) Dalam Evrima?',
    whyBody:
      'Di Pulau Gateway, berjalan tanpa memahami peta boleh membawa maut dengan cepat. Memahami warna rupa bumi, tanda air, dan simbol deria bau membolehkan anda mencari anak sungai cetek yang selamat daripada serang hendap Deinosuchus, mengelak gaung curam pada waktu malam, menjejak Zon Migrasi serta Sanctuary, dan berkongsi koordinat tepat bersama rakan Primeval Malaysia.',
    legendsHeading: 'Petunjuk Utama Peta & Deria Bau',
    legends: [
      {
        color: '#22d3ee',
        name: 'Sungai & Kolam Air Tawar (Biru Muda/Cyan)',
        desc: 'Sumber air minuman utama. Pilih anak sungai sempit atau kolam bukit—elakkan sungai besar dalam yang menjadi lubuk Deinosuchus.'
      },
      {
        color: '#0f2d5e',
        name: 'Laut Air Masin & Pantai (Biru Gelap)',
        desc: 'Tidak boleh diminum melainkan anda membuka mutasi tersembunyi Reniculate Kidneys.'
      },
      {
        color: '#8f9688',
        name: 'Bukit Tinggi, Tebing & Kompleks Kubah (Kelabu)',
        desc: 'Kawasan berbatu curam & kubah heksagon Gateway. Melompat turun tebing curam akan mematahkan kaki serta-merta.'
      },
      {
        color: '#5a8f3d',
        name: 'Hutan Tebal, Padang & Paya (Hijau/Zaitun)',
        desc: 'Semak tebal melindungi anda semasa berehat [H]; kawasan lapang pula mendedahkan anda kepada pemangsa.'
      },
      {
        color: '#ef4444',
        name: 'Deria Bau Permainan: Sanctuary & Migrasi (Q)',
        desc: 'Pokok Palma Merah = Juvenile Sanctuary; Tapak Kaki = Zon Migrasi makanan herbivor.'
      }
    ],
    zoomIn: 'Zum +',
    zoomOut: 'Zum −',
    resetView: 'Set Semula',
    gridLabel: 'Paparan Grid',
    hint: 'Seret peta untuk gerakkan • Skrol tetikus atau butang +/- untuk zum • Tekan ESC untuk tutup.'
  },

  kl: {
    badge: 'PETA PULAU EVRIMA',
    title: 'Peta Gateway & Panduan Legends',
    subtitle: 'Peta topografi interaktif Gateway (v0.21.7) dengan penerangan simbol survival penting.',
    whyHeading: 'Kenapa Kena Faham Map Legends Sebelum Main The Isle: Evrima?',
    whyBody:
      'Kat map Gateway, kalau korang main redah je memang cepat kena makan atau patah kaki jatuh gaung. Bila faham warna peta dengan legend deria bau, senang nak cari lopak air selamat jauh dari buaya Deinosuchus, elak gaung gelap masa malam, kejar Zon Migrasi/Sanctuary, dan bagitahu koordinat tepat kat member Primeval Malaysia!',
    legendsHeading: 'Senarai Legend Penting Kat Map & Deria Bau',
    legends: [
      {
        color: '#22d3ee',
        name: 'Air Tawar — Sungai & Kolam (Biru Cyan)',
        desc: 'Port minum wajib. Cari anak sungai kecik atau kolam atas bukit—jangan minum sungai besar yang dalam sebab Deinosuchus port kat situ!'
      },
      {
        color: '#0f2d5e',
        name: 'Laut Air Masin (Biru Gelap)',
        desc: 'Tak boleh minum sesuka hati kecuali korang dah unlock hidden mutation Reniculate Kidneys!'
      },
      {
        color: '#8f9688',
        name: 'Bukit Curam, Gaung & Kubah Tengah (Kelabu)',
        desc: 'Kawasan batu tinggi dengan Dome tengah Gateway. Salah langkah lompat kat sini terus fracture patah kaki!'
      },
      {
        color: '#5a8f3d',
        name: 'Hutan Tebal & Padang Rumput (Hijau)',
        desc: 'Pokok hijau gelap best untuk menyorok dan rest [H]; padang lapang senang kena kejar carnivore.'
      },
      {
        color: '#ef4444',
        name: 'Icon Hidu [Q]: Sanctuary & Migrasi',
        desc: 'Pokok Palma Merah = Juvenile Sanctuary selamat; Tapak Kaki = Zon Migrasi herbivor cari diet.'
      }
    ],
    zoomIn: 'Zoom +',
    zoomOut: 'Zoom −',
    resetView: 'Reset Peta',
    gridLabel: 'Grid Koordinat',
    hint: 'Drag peta untuk gerak • Guna wheel mouse atau +/- untuk zoom • Tekan ESC untuk tutup.'
  }
};

export class GatewayMapViewer {
  constructor() {
    this.manifest = null;
    this.tileCache = new Map();
    this.zoom = 1.0; // 1.0 fits full island in canvas
    this.panX = 0;
    this.panY = 0;
    this.showGrid = true;
    this.canvas = null;
    this.ctx = null;
    this.isDragging = false;
    this.dragLast = { x: 0, y: 0 };
    this.rafPending = false;
  }

  async _ensureManifest() {
    if (this.manifest) return this.manifest;
    const res = await fetch('./map-tiles/manifest.json');
    if (!res.ok) throw new Error('Failed to load map-tiles manifest');
    this.manifest = await res.json();
    return this.manifest;
  }

  _getTile(z, col, row) {
    const key = `${z}/${col}_${row}`;
    if (this.tileCache.has(key)) return this.tileCache.get(key);

    const entry = { loaded: false, img: null };
    this.tileCache.set(key, entry);

    const img = new Image();
    img.onload = () => {
      entry.loaded = true;
      entry.img = img;
      this._scheduleDraw();
    };
    img.src = `./map-tiles/z${z}/${col}_${row}.webp`;
    return entry;
  }

  mount(containerElement, lang = 'en') {
    const t = MAP_LOCALE[lang] || MAP_LOCALE.en;

    const legendsHtml = t.legends
      .map(
        (l) => `
        <div class="map-legend-item">
          <span class="map-legend-swatch" style="background:${l.color};"></span>
          <div>
            <strong>${l.name}</strong>
            <p>${l.desc}</p>
          </div>
        </div>
      `
      )
      .join('');

    containerElement.innerHTML = `
      <div class="gateway-map-shell">
        <div class="gateway-map-canvas-wrap">
          <div class="gateway-map-toolbar">
            <button type="button" class="secondary-btn map-ctrl-btn" id="btn-map-zoom-in">${t.zoomIn}</button>
            <button type="button" class="secondary-btn map-ctrl-btn" id="btn-map-zoom-out">${t.zoomOut}</button>
            <button type="button" class="secondary-btn map-ctrl-btn" id="btn-map-reset">${t.resetView}</button>
            <button type="button" class="secondary-btn map-ctrl-btn ${this.showGrid ? 'active' : ''}" id="btn-map-grid">${t.gridLabel}</button>
            <span class="map-zoom-readout" id="map-zoom-readout">100%</span>
          </div>
          <canvas id="gateway-map-canvas" width="640" height="540"></canvas>
          <p class="map-canvas-hint">${t.hint}</p>
        </div>

        <aside class="gateway-map-legend-panel">
          <div class="step-card" style="margin-bottom: 12px;">
            <div class="step-eyebrow">${t.badge}</div>
            <h3>${t.whyHeading}</h3>
            <p class="step-summary">${t.whyBody}</p>
          </div>

          <section class="step-card">
            <h3>${t.legendsHeading}</h3>
            <div class="map-legends-list">${legendsHtml}</div>
          </section>
        </aside>
      </div>
    `;

    this.canvas = containerElement.querySelector('#gateway-map-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.zoomReadout = containerElement.querySelector('#map-zoom-readout');

    this._bindCanvasEvents(containerElement);
    this._ensureManifest()
      .then(() => {
        this._resetView();
        this._scheduleDraw();
      })
      .catch((err) => console.error('Gateway map error:', err));
  }

  _resetView() {
    this.zoom = 1.0;
    this.panX = 0;
    this.panY = 0;
    this._scheduleDraw();
  }

  _applyZoom(factor, centerX = null, centerY = null) {
    const oldZoom = this.zoom;
    const nextZoom = Math.max(0.85, Math.min(8.0, oldZoom * factor));
    if (nextZoom === oldZoom) return;

    if (this.canvas && centerX !== null && centerY !== null) {
      const ratio = nextZoom / oldZoom;
      this.panX = centerX - (centerX - this.panX) * ratio;
      this.panY = centerY - (centerY - this.panY) * ratio;
    }

    this.zoom = nextZoom;
    this._scheduleDraw();
  }

  _bindCanvasEvents(rootEl) {
    rootEl.querySelector('#btn-map-zoom-in')?.addEventListener('click', () => {
      this._applyZoom(1.35, this.canvas.width * 0.5, this.canvas.height * 0.5);
    });
    rootEl.querySelector('#btn-map-zoom-out')?.addEventListener('click', () => {
      this._applyZoom(1 / 1.35, this.canvas.width * 0.5, this.canvas.height * 0.5);
    });
    rootEl.querySelector('#btn-map-reset')?.addEventListener('click', () => {
      this._resetView();
    });
    const gridBtn = rootEl.querySelector('#btn-map-grid');
    gridBtn?.addEventListener('click', () => {
      this.showGrid = !this.showGrid;
      gridBtn.classList.toggle('active', this.showGrid);
      this._scheduleDraw();
    });

    this.canvas.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        const cx = ((e.clientX - rect.left) / rect.width) * this.canvas.width;
        const cy = ((e.clientY - rect.top) / rect.height) * this.canvas.height;
        this._applyZoom(e.deltaY < 0 ? 1.18 : 1 / 1.18, cx, cy);
      },
      { passive: false }
    );

    this.canvas.addEventListener('pointerdown', (e) => {
      this.isDragging = true;
      this.dragLast.x = e.clientX;
      this.dragLast.y = e.clientY;
      this.canvas.setPointerCapture(e.pointerId);
    });

    this.canvas.addEventListener('pointermove', (e) => {
      if (!this.isDragging) return;
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      this.panX += (e.clientX - this.dragLast.x) * scaleX;
      this.panY += (e.clientY - this.dragLast.y) * scaleY;
      this.dragLast.x = e.clientX;
      this.dragLast.y = e.clientY;
      this._scheduleDraw();
    });

    const endDrag = () => {
      this.isDragging = false;
    };
    this.canvas.addEventListener('pointerup', endDrag);
    this.canvas.addEventListener('pointercancel', endDrag);
  }

  _scheduleDraw() {
    if (this.rafPending) return;
    this.rafPending = true;
    requestAnimationFrame(() => {
      this.rafPending = false;
      this._draw();
    });
  }

  _draw() {
    if (!this.canvas || !this.ctx || !this.manifest) return;

    const ctx = this.ctx;
    const cw = this.canvas.width;
    const ch = this.canvas.height;

    ctx.fillStyle = '#071731';
    ctx.fillRect(0, 0, cw, ch);

    const baseSide = Math.min(cw, ch) * 0.94;
    const mapSize = baseSide * this.zoom;

    // Clamp pan gently around center
    const centerOffset = (cw - baseSide) * 0.5;
    const baseTop = (ch - baseSide) * 0.5;
    const originX = centerOffset + (baseSide - mapSize) * 0.5 + this.panX;
    const originY = baseTop + (baseSide - mapSize) * 0.5 + this.panY;

    // Pick mip level from rendered map pixel size
    let z = 0;
    if (mapSize > 480) z = 1;
    if (mapSize > 980) z = 2;
    if (mapSize > 1950) z = 3;
    if (mapSize > 3800) z = 4;

    // Draw z0 base image immediately underneath to avoid blank gaps while high-res tiles stream
    const baseTile = this._getTile(0, 0, 0);
    if (baseTile.loaded && baseTile.img) {
      ctx.drawImage(baseTile.img, originX, originY, mapSize, mapSize);
    }

    const level = this.manifest.levels[z];
    if (z > 0 && level) {
      const tileW = mapSize / level.cols;
      const tileH = mapSize / level.rows;

      for (let row = 0; row < level.rows; row++) {
        const ty = originY + row * tileH;
        if (ty + tileH < 0 || ty > ch) continue;

        for (let col = 0; col < level.cols; col++) {
          const tx = originX + col * tileW;
          if (tx + tileW < 0 || tx > cw) continue;

          const tile = this._getTile(z, col, row);
          if (tile.loaded && tile.img) {
            ctx.drawImage(tile.img, tx, ty, tileW + 0.6, tileH + 0.6);
          }
        }
      }
    }

    // Optional A1-H8 Coordinate Grid Overlay
    if (this.showGrid) {
      const divs = 8;
      const cellW = mapSize / divs;
      const cellH = mapSize / divs;
      ctx.save();
      ctx.strokeStyle = 'rgba(218, 165, 75, 0.25)';
      ctx.lineWidth = 1;
      ctx.fillStyle = 'rgba(243, 235, 216, 0.72)';
      ctx.font = 'bold 11px "Segoe UI", sans-serif';

      for (let i = 0; i <= divs; i++) {
        const gx = originX + i * cellW;
        const gy = originY + i * cellH;
        ctx.beginPath();
        ctx.moveTo(gx, originY);
        ctx.lineTo(gx, originY + mapSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(originX, gy);
        ctx.lineTo(originX + mapSize, gy);
        ctx.stroke();

        if (i < divs) {
          ctx.fillText(String.fromCharCode(65 + i), gx + 6, originY + 14);
          ctx.fillText(String(i + 1), originX + 6, gy + 24);
        }
      }
      ctx.restore();
    }

    if (this.zoomReadout) {
      this.zoomReadout.textContent = `${Math.round(this.zoom * 100)}% (Z${z})`;
    }
  }
}

export function getMapLocaleTitle(lang = 'en') {
  return MAP_LOCALE[lang] || MAP_LOCALE.en;
}
