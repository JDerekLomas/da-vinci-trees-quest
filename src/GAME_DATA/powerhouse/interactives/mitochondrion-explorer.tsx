import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MitochondrionExplorerInteraction, InteractionState } from './interface';

interface Props {
  interaction: MitochondrionExplorerInteraction;
  interactionState?: InteractionState;
  onInteraction: (state: InteractionState) => void;
  onSubmit?: () => void;
  isSubmitTriggered?: boolean;
}

// One slider drives everything. zoom = 0 -> a single, beautiful mitochondrion
// with labeled parts. zoom = 1 -> we pull WAY back and the frame fills with
// ~1,500 mitochondria packed into one heart-muscle cell. Scale is the point.

const W = 660;
const H = 430;
const CX = W / 2;
const CY = H / 2;
const TARGET_COUNT = 1500;

type PartKey = 'outer' | 'inter' | 'cristae' | 'matrix';
interface Part {
  label: string;
  blurb: string;
}
const PARTS: Record<PartKey, Part> = {
  outer: {
    label: 'Outer membrane',
    blurb: 'A smooth gold wrapper, fairly leaky — it lets small molecules pass freely.',
  },
  inter: {
    label: 'Intermembrane space',
    blurb: 'The thin gap where protons (H+) pile up — the charged "battery" that powers ATP.',
  },
  cristae: {
    label: 'Cristae (inner folds)',
    blurb: 'The inner membrane folds inward. More folds = more surface = more energy machinery.',
  },
  matrix: {
    label: 'Matrix',
    blurb: "The deep-purple core holding enzymes, ribosomes and the mitochondrion's own loop of DNA.",
  },
};
const PART_ORDER: PartKey[] = ['outer', 'inter', 'cristae', 'matrix'];

interface Mito {
  x: number;
  y: number;
  r: number;
  rot: number;
  squash: number;
  depth: number; // 0 far .. 1 near (parallax/brightness)
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

// Draw a single detailed bean-shaped mitochondrion centered at the origin.
const drawMito = (
  ctx: CanvasRenderingContext2D,
  scale: number,
  detail: number, // 0..1 how much fine internal detail to render
  highlight: PartKey | null,
  alpha: number,
) => {
  const rx = 150 * scale;
  const ry = 96 * scale;
  ctx.save();
  ctx.globalAlpha = alpha;

  const dim = (part: PartKey) => (highlight && highlight !== part ? 0.32 : 1);
  const glow = (part: PartKey) => highlight === part;

  // body gradient
  const body = ctx.createRadialGradient(-rx * 0.3, -ry * 0.4, ry * 0.2, 0, 0, rx);
  body.addColorStop(0, '#4a2f72');
  body.addColorStop(1, '#2b1b46');
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();

  // ---- matrix gradient core ----
  ctx.save();
  ctx.globalAlpha = alpha * dim('matrix');
  const mg = ctx.createRadialGradient(-rx * 0.2, -ry * 0.3, ry * 0.15, 0, 0, rx * 0.92);
  mg.addColorStop(0, glow('matrix') ? '#5a3a92' : '#3a2363');
  mg.addColorStop(1, '#2b1b46');
  ctx.fillStyle = mg;
  ctx.beginPath();
  ctx.ellipse(0, 0, rx * 0.9, ry * 0.86, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  if (detail > 0.05) {
    ctx.save();
    ctx.globalAlpha = alpha * detail * dim('matrix');
    // faint ribosome dots
    ctx.fillStyle = 'rgba(200,180,255,0.55)';
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2 + i;
      const rr = ((i * 37) % 100) / 130 + 0.15;
      ctx.beginPath();
      ctx.arc(Math.cos(a) * rx * 0.55 * rr, Math.sin(a) * ry * 0.55 * rr, 1.6 * scale, 0, Math.PI * 2);
      ctx.fill();
    }
    // mtDNA loop
    ctx.strokeStyle = 'rgba(255,225,150,0.85)';
    ctx.lineWidth = 2 * scale;
    ctx.beginPath();
    ctx.ellipse(rx * 0.28, ry * 0.28, 14 * scale, 9 * scale, 0.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // ---- cristae: inner membrane folding inward as rounded shelves ----
  ctx.save();
  ctx.globalAlpha = alpha * dim('cristae');
  ctx.lineWidth = (glow('cristae') ? 5 : 3.4) * scale;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  const folds = 7;
  for (let i = 0; i < folds; i++) {
    const t = (i + 0.5) / folds;
    const px = lerp(-rx * 0.74, rx * 0.74, t);
    const fromTop = i % 2 === 0;
    const baseY = fromTop ? -ry * 0.78 : ry * 0.78;
    const tipY = fromTop ? ry * 0.34 : -ry * 0.34;
    const wob = (1 - Math.abs(t - 0.5) * 1.6) * rx * 0.12;
    const grd = ctx.createLinearGradient(px - wob, baseY, px, tipY);
    grd.addColorStop(0, glow('cristae') ? '#7fc4ff' : '#5aa9ff');
    grd.addColorStop(1, '#3f7fff');
    ctx.strokeStyle = grd;
    ctx.beginPath();
    ctx.moveTo(px - wob - 12 * scale, baseY);
    ctx.bezierCurveTo(
      px - wob - 14 * scale, lerp(baseY, tipY, 0.45),
      px - 9 * scale, tipY + (fromTop ? -8 : 8) * scale,
      px, tipY,
    );
    ctx.bezierCurveTo(
      px + 9 * scale, tipY + (fromTop ? -8 : 8) * scale,
      px + wob + 14 * scale, lerp(baseY, tipY, 0.45),
      px + wob + 12 * scale, baseY,
    );
    ctx.stroke();
  }
  ctx.restore();

  // ---- intermembrane space (thin gap, highlightable) ----
  ctx.save();
  ctx.globalAlpha = alpha * dim('inter');
  ctx.strokeStyle = glow('inter') ? 'rgba(150,210,255,0.95)' : 'rgba(120,180,255,0.45)';
  ctx.lineWidth = (glow('inter') ? 7 : 4) * scale;
  ctx.beginPath();
  ctx.ellipse(0, 0, rx * 0.95, ry * 0.91, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // ---- outer membrane: gold double line ----
  ctx.save();
  ctx.globalAlpha = alpha * dim('outer');
  ctx.strokeStyle = glow('outer') ? '#fbe592' : '#e7c869';
  ctx.lineWidth = (glow('outer') ? 7 : 4.5) * scale;
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = glow('outer') ? '#e7c869' : '#c79a2f';
  ctx.lineWidth = 2.2 * scale;
  ctx.beginPath();
  ctx.ellipse(0, 0, rx - 7 * scale, ry - 7 * scale, 0, 0, Math.PI * 2);
  ctx.stroke();
  // top highlight sheen
  ctx.globalAlpha = alpha * 0.5 * dim('outer');
  ctx.strokeStyle = 'rgba(255,255,255,0.7)';
  ctx.lineWidth = 2 * scale;
  ctx.beginPath();
  ctx.ellipse(-rx * 0.15, -ry * 0.35, rx * 0.5, ry * 0.3, -0.3, Math.PI * 0.9, Math.PI * 1.7);
  ctx.stroke();
  ctx.restore();

  ctx.restore();
};

const MitochondrionExplorer: React.FC<Props> = ({ onInteraction }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const zoomRef = useRef(0); // 0 = one mito, 1 = whole cell
  const dispZoomRef = useRef(0); // eased display value
  const highlightRef = useRef<PartKey | null>(null);
  const mitosRef = useRef<Mito[]>([]);
  const countAnim = useRef(0);
  const reported = useRef(false);

  const [zoom, setZoom] = useState(0);
  const [highlight, setHighlight] = useState<PartKey | null>(null);
  const [explored, setExplored] = useState<Set<PartKey>>(new Set());
  const [count, setCount] = useState(1);

  const report = useCallback(() => {
    if (reported.current) return;
    reported.current = true;
    onInteraction({ isCorrect: true, isEmpty: false, value: 'explored' });
  }, [onInteraction]);

  const selectPart = useCallback((p: PartKey) => {
    const next = highlightRef.current === p ? null : p;
    highlightRef.current = next;
    setHighlight(next);
    if (next) {
      setExplored((prev) => {
        if (prev.has(next)) return prev;
        const s = new Set(prev);
        s.add(next);
        return s;
      });
    }
    report();
  }, [report]);

  const onZoom = useCallback((v: number) => {
    zoomRef.current = v;
    setZoom(v);
    report();
  }, [report]);

  useEffect(() => {
    // scatter a packed field of mitochondria inside the cell outline
    const arr: Mito[] = [];
    const ax = W * 0.46;
    const by = H * 0.4;
    let guard = 0;
    while (arr.length < 520 && guard < 9000) {
      guard++;
      const a = rand(0, Math.PI * 2);
      const rr = Math.sqrt(Math.random());
      const x = CX + Math.cos(a) * ax * rr;
      const y = CY + Math.sin(a) * by * rr;
      const depth = Math.random();
      arr.push({
        x,
        y,
        r: lerp(7, 16, depth) * rand(0.8, 1.2),
        rot: rand(-0.9, 0.9),
        squash: rand(0.5, 0.66),
        depth,
      });
    }
    arr.sort((p, q) => p.depth - q.depth);
    mitosRef.current = arr;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    let last = 0;
    let frame = 0;

    const draw = (t: number) => {
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016;
      last = t;
      frame++;

      // ease the display zoom toward the slider value
      dispZoomRef.current += (zoomRef.current - dispZoomRef.current) * Math.min(1, dt * 7);
      const z = easeInOut(dispZoomRef.current);

      ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#0a1426');
      bg.addColorStop(1, '#0a0f1c');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ---- WHOLE-CELL VIEW (fades in as we zoom out) ----
      const cellAlpha = Math.max(0, (z - 0.35) / 0.65);
      if (cellAlpha > 0.01) {
        ctx.save();
        ctx.globalAlpha = cellAlpha;
        const cellG = ctx.createRadialGradient(CX, CY, 40, CX, CY, W * 0.5);
        cellG.addColorStop(0, 'rgba(150,180,215,0.22)');
        cellG.addColorStop(1, 'rgba(90,120,165,0.10)');
        ctx.fillStyle = cellG;
        ctx.beginPath();
        ctx.ellipse(CX, CY, W * 0.47, H * 0.42, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(180,205,235,0.5)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(CX, CY, W * 0.47, H * 0.42, 0, 0, Math.PI * 2);
        ctx.stroke();
        // nucleus hint
        ctx.fillStyle = 'rgba(120,150,200,0.18)';
        ctx.beginPath();
        ctx.ellipse(CX + W * 0.22, CY - H * 0.16, 52, 40, 0, 0, Math.PI * 2);
        ctx.fill();

        // packed field of mitochondria (parallax by depth)
        const fieldT = Math.min(1, (z - 0.35) / 0.45);
        for (const m of mitosRef.current) {
          const drift = Math.sin(frame * 0.01 + m.x) * m.depth * 0.6;
          const a = m.depth * fieldT;
          ctx.save();
          ctx.globalAlpha = cellAlpha * (0.4 + m.depth * 0.6);
          ctx.translate(m.x + drift, m.y);
          ctx.rotate(m.rot);
          const r = m.r * fieldT;
          const g2 = ctx.createLinearGradient(-r, -r, r, r);
          g2.addColorStop(0, `rgba(90,60,140,${0.6 + a * 0.3})`);
          g2.addColorStop(1, '#2b1b46');
          ctx.fillStyle = g2;
          ctx.beginPath();
          ctx.ellipse(0, 0, r, r * m.squash, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = `rgba(231,200,105,${0.45 + a * 0.4})`;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.ellipse(0, 0, r, r * m.squash, 0, 0, Math.PI * 2);
          ctx.stroke();
          // hint of cristae lines
          ctx.strokeStyle = `rgba(90,169,255,${0.3 + a * 0.3})`;
          ctx.lineWidth = 0.9;
          for (let k = -1; k <= 1; k++) {
            ctx.beginPath();
            ctx.moveTo(k * r * 0.4, -r * m.squash * 0.6);
            ctx.lineTo(k * r * 0.4, r * m.squash * 0.6);
            ctx.stroke();
          }
          ctx.restore();
        }
        ctx.restore();
      }

      // ---- HERO single mitochondrion (shrinks as we zoom out) ----
      const heroScale = lerp(1, 0.07, z);
      const heroAlpha = Math.max(0, 1 - z / 0.85);
      if (heroAlpha > 0.01) {
        ctx.save();
        ctx.translate(CX, CY);
        drawMito(ctx, heroScale, Math.max(0, 1 - z * 1.6), highlightRef.current, heroAlpha);
        ctx.restore();
      }

      // live count rises with zoom-out
      const targetCount = z < 0.4 ? 1 : Math.round(lerp(1, TARGET_COUNT, Math.min(1, (z - 0.4) / 0.6)));
      countAnim.current += (targetCount - countAnim.current) * Math.min(1, dt * 4);
      if (frame % 4 === 0) setCount(Math.round(countAnim.current));

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const zoomedOut = zoom > 0.55;
  const exploredN = explored.size;
  const activeBlurb = highlight ? PARTS[highlight].blurb : null;

  return (
    <div className="w-full h-full flex flex-col" style={{ color: '#fff' }}>
      <div style={{ flex: 1, minHeight: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          aria-label="Mitochondrion explorer: zoom from one mitochondrion out to a whole muscle cell"
          style={{ width: '100%', maxWidth: 660, height: 'auto', borderRadius: 14, boxShadow: '0 6px 24px rgba(0,0,0,0.4)' }}
        />
        {zoomedOut && (
          <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(10,16,30,0.78)', border: '1px solid rgba(90,169,255,0.5)', borderRadius: 10, padding: '8px 14px' }}>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Mitochondria in this cell</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#5aa9ff', lineHeight: 1 }}>~{count.toLocaleString()}</div>
          </div>
        )}
      </div>

      <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.96)', color: '#222' }}>
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, color: '#0E7C86' }}>
            <span>🔬 One mitochondrion</span>
            <span>Whole muscle cell 🔭</span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={zoom}
            onChange={(e) => onZoom(parseFloat(e.target.value))}
            aria-label="Zoom from one mitochondrion to a whole cell"
            style={{ width: '100%', accentColor: '#0E7C86', cursor: 'pointer' }}
          />
        </div>

        {!zoomedOut ? (
          <>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
              {PART_ORDER.map((p) => {
                const on = highlight === p;
                return (
                  <button
                    key={p}
                    onClick={() => selectPart(p)}
                    style={{
                      background: on ? '#0E7C86' : '#eef2f4',
                      color: on ? '#fff' : '#234',
                      border: `1px solid ${on ? '#0E7C86' : '#cdd6da'}`,
                      borderRadius: 8,
                      padding: '6px 11px',
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: 'pointer',
                    }}
                  >
                    {PARTS[p].label}
                  </button>
                );
              })}
            </div>
            <div style={{ fontSize: 13, minHeight: 34, color: '#333' }}>
              {activeBlurb ?? 'Tap a part to highlight it in the diagram. Then drag the slider right to see the bigger picture.'}
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 13, fontWeight: 600, marginTop: 6, flexWrap: 'wrap' }}>
              <span style={{ color: '#0E7C86' }}>{exploredN}/4 parts explored</span>
              <span style={{ color: '#555' }}>Key idea: cristae fold to maximize surface area = more energy machinery.</span>
            </div>
          </>
        ) : (
          <div style={{ fontSize: 13, color: '#333' }}>
            <div style={{ fontWeight: 700, color: '#0E7C86', marginBottom: 4 }}>
              About ~{count.toLocaleString()} mitochondria fill this one heart-muscle cell.
            </div>
            <div style={{ marginBottom: 3 }}>In a heart-muscle cell, mitochondria make up roughly <b>35% of the volume</b>.</div>
            <div style={{ marginBottom: 3 }}>A mitochondrion is ~1–2 µm — about <b>1/10 the width of the cell</b>, so thousands fit inside.</div>
            <div style={{ color: '#0E7C86', fontWeight: 700 }}>Your whole body holds roughly <b>10 quadrillion</b> of them.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MitochondrionExplorer;
