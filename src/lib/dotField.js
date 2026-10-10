// Animated dot grid drawn on a canvas, used beside the Hero copy.
// Dots spring back to a grid and react to the pointer:
// - on load they burst out from the centre into place;
// - a slow wave makes them drift and pulse while idle;
// - the pointer pushes them away and turns nearby dots into a stretched mesh;
// - a click sends a shockwave ring across the grid;
// - with no pointer over it, a "ghost" cursor wanders so it never sits still.
// Dots take the canvas's CSS `color`, so they follow the light/dark theme.
// Returns a cleanup function.
export function createDotField(canvas, { spacing = 22 } = {}) {
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const POINTER_RADIUS = 120;
  const MESH_RADIUS = 150;
  const WAVE_SPEED = 0.45; // px per ms
  const WAVE_LIFE = 1400; // ms
  const WAVE_BAND = 36;
  const IDLE_AFTER = 2500; // ms without pointer movement before the ghost takes over

  let width = 0;
  let height = 0;
  let cols = 0;
  let rows = 0;
  let dots = [];
  let color = "#000";
  let frame = 0;
  let visible = true;
  let built = false;
  let last = performance.now();
  const startedAt = last;

  const pointer = {
    x: 0,
    y: 0,
    cx: 0,
    cy: 0,
    strength: 0,
    lastMove: -Infinity,
  };
  const waves = [];

  function readColor() {
    color = getComputedStyle(canvas).color || "#000";
  }

  function build() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cols = Math.max(1, Math.floor(width / spacing));
    rows = Math.max(1, Math.floor(height / spacing));
    const offsetX = (width - (cols - 1) * spacing) / 2;
    const offsetY = (height - (rows - 1) * spacing) / 2;
    const cx = width / 2;
    const cy = height / 2;
    const maxDist = Math.hypot(cx, cy);

    dots = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const hx = offsetX + col * spacing;
        const hy = offsetY + row * spacing;
        // The first build bursts out from the centre; later resizes snap into place.
        const intro = !built && !reduceMotion;
        dots.push({
          hx,
          hy,
          x: intro ? cx : hx,
          y: intro ? cy : hy,
          vx: 0,
          vy: 0,
          delay: intro ? (Math.hypot(hx - cx, hy - cy) / maxDist) * 600 : 0,
          r: 0,
          a: 0,
        });
      }
    }
    built = true;
  }

  function step(now) {
    const dt = Math.min(now - last, 50);
    last = now;
    const k = dt / 16.67;
    const t = now - startedAt;

    // Ghost cursor on a slow Lissajous path when nobody is pointing.
    const idle = now - pointer.lastMove > IDLE_AFTER;
    let targetX = pointer.x;
    let targetY = pointer.y;
    if (idle) {
      const s = t / 1000;
      targetX = width * (0.5 + 0.32 * Math.sin(s * 0.45));
      targetY = height * (0.5 + 0.3 * Math.sin(s * 0.62 + 1.3));
      pointer.strength += (0.55 - pointer.strength) * 0.02 * k;
    } else {
      pointer.strength += (1 - pointer.strength) * 0.15 * k;
    }
    // Ease towards the target so switching between ghost and real pointer glides.
    const ease = Math.min(1, (idle ? 0.04 : 0.35) * k);
    pointer.cx += (targetX - pointer.cx) * ease;
    pointer.cy += (targetY - pointer.cy) * ease;
    const px = pointer.cx;
    const py = pointer.cy;

    for (let i = waves.length - 1; i >= 0; i--) {
      if (now - waves[i].t0 > WAVE_LIFE) waves.splice(i, 1);
    }

    for (const d of dots) {
      if (t < d.delay) continue;

      // Idle drift and a diagonal pulse sweeping across the grid.
      const tx = d.hx + Math.cos(d.hy * 0.02 + t * 0.0006) * 2.5;
      const ty = d.hy + Math.sin(d.hx * 0.02 + t * 0.0007) * 2.5;
      const pulse = (Math.sin((d.hx + d.hy) * 0.012 - t * 0.0012) + 1) / 2;

      let fx = (tx - d.x) * 0.06;
      let fy = (ty - d.y) * 0.06;
      let boost = 0;

      const dx = d.x - px;
      const dy = d.y - py;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < POINTER_RADIUS) {
        const f = (1 - dist / POINTER_RADIUS) ** 2 * pointer.strength;
        fx += (dx / dist) * f * 3.2;
        fy += (dy / dist) * f * 3.2;
        boost = Math.max(boost, f);
      }

      for (const w of waves) {
        const age = now - w.t0;
        const ring = age * WAVE_SPEED;
        const wx = d.hx - w.x;
        const wy = d.hy - w.y;
        const wd = Math.hypot(wx, wy) || 1;
        const off = Math.abs(wd - ring);
        if (off < WAVE_BAND) {
          const f = (1 - off / WAVE_BAND) * (1 - age / WAVE_LIFE);
          fx += (wx / wd) * f * 4;
          fy += (wy / wd) * f * 4;
          boost = Math.max(boost, f);
        }
      }

      d.vx = (d.vx + fx * k) * 0.84 ** k;
      d.vy = (d.vy + fy * k) * 0.84 ** k;
      d.x += d.vx * k;
      d.y += d.vy * k;
      d.r = 1 + pulse * 0.6 + boost * 2;
      d.a = 0.18 + pulse * 0.17 + boost * 0.6;
    }
  }

  function draw(now) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    const t = now - startedAt;

    // Mesh: link each dot near the pointer to its right and lower neighbours,
    // so the grid looks like fabric stretched around the cursor.
    if (!reduceMotion) {
      ctx.lineWidth = 0.75;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const d = dots[row * cols + col];
          if (t < d.delay) continue;
          const dist = Math.hypot(d.x - pointer.cx, d.y - pointer.cy);
          if (dist > MESH_RADIUS) continue;
          ctx.globalAlpha = (1 - dist / MESH_RADIUS) * 0.4 * pointer.strength;
          ctx.beginPath();
          if (col + 1 < cols) {
            const n = dots[row * cols + col + 1];
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(n.x, n.y);
          }
          if (row + 1 < rows) {
            const n = dots[(row + 1) * cols + col];
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(n.x, n.y);
          }
          ctx.stroke();
        }
      }
    }

    for (const d of dots) {
      if (t < d.delay) continue;
      ctx.globalAlpha = Math.min(1, d.a);
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawStatic() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.3;
    for (const d of dots) {
      ctx.beginPath();
      ctx.arc(d.hx, d.hy, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function loop(now) {
    step(now);
    draw(now);
    frame = requestAnimationFrame(loop);
  }

  function play() {
    if (reduceMotion || frame || !visible) return;
    last = performance.now();
    frame = requestAnimationFrame(loop);
  }

  function pause() {
    cancelAnimationFrame(frame);
    frame = 0;
  }

  function onPointerMove(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const near =
      x > -POINTER_RADIUS &&
      y > -POINTER_RADIUS &&
      x < width + POINTER_RADIUS &&
      y < height + POINTER_RADIUS;
    if (!near) {
      // Hand over to the ghost cursor as soon as the pointer moves away.
      pointer.lastMove = -Infinity;
      return;
    }
    pointer.x = x;
    pointer.y = y;
    pointer.lastMove = performance.now();
  }

  function onPointerDown(e) {
    const rect = canvas.getBoundingClientRect();
    waves.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      t0: performance.now(),
    });
  }

  readColor();
  build();
  pointer.cx = width / 2;
  pointer.cy = height / 2;

  const resizeObserver = new ResizeObserver(() => {
    build();
    if (reduceMotion) drawStatic();
  });
  resizeObserver.observe(canvas);

  // The theme toggle swaps the `dark` class on <html>.
  const themeObserver = new MutationObserver(() => {
    readColor();
    if (reduceMotion) drawStatic();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) play();
    else pause();
  });
  visibilityObserver.observe(canvas);

  if (reduceMotion) {
    drawStatic();
  } else {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerdown", onPointerDown);
    play();
  }

  return () => {
    pause();
    resizeObserver.disconnect();
    themeObserver.disconnect();
    visibilityObserver.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    canvas.removeEventListener("pointerdown", onPointerDown);
  };
}
