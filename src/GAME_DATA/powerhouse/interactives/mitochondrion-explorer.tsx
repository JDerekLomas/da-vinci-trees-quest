import React, { useCallback, useMemo, useRef, useState } from 'react';
import { MitochondrionExplorerInteraction, InteractionState } from './interface';

interface Props {
  interaction: MitochondrionExplorerInteraction;
  interactionState?: InteractionState;
  onInteraction: (state: InteractionState) => void;
  onSubmit?: () => void;
  isSubmitTriggered?: boolean;
}

// A clickable anatomy of a single mitochondrion, drawn as a textbook-style
// cutaway. Tap each labelled part to highlight it (the rest dims) and read a
// friendly explanation. Headline idea: the inner membrane folds inward into
// deep CRISTAE to pack in surface area = more room for the energy machinery.

type PartId = 'outer' | 'inter' | 'inner' | 'matrix';

interface Part {
  id: PartId;
  label: string;
  blurb: string;
}

const PARTS: Part[] = [
  {
    id: 'outer',
    label: 'Outer membrane',
    blurb:
      "The smooth outer wall — the mitochondrion's outer boundary, fairly porous so small molecules pass through.",
  },
  {
    id: 'inter',
    label: 'Intermembrane space',
    blurb:
      "The narrow gap between the two membranes — where protons pile up to power the turbines (the 'dam').",
  },
  {
    id: 'inner',
    label: 'Cristae (inner folds)',
    blurb:
      'The deep folds of the inner membrane. Folding it like a scrunched bedsheet packs in huge surface area — more room for the machinery that makes energy. THIS is the key idea.',
  },
  {
    id: 'matrix',
    label: 'Matrix',
    blurb:
      "The inner fluid space — home to the reactions that feed the energy line, plus the mitochondrion's own DNA.",
  },
];

const W = 560;
const H = 340;
const CX = W / 2;
const CY = H / 2;
const RX = 232; // outer membrane radii
const RY = 132;

// Build a smooth closed bean/oval path from a radius function.
const ovalPath = (rx: number, ry: number): string => {
  const steps = 96;
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    // gentle bean asymmetry: pinch the lower-right a touch
    const pinch = 1 + 0.05 * Math.sin(t * 2 + 0.6);
    pts.push([CX + Math.cos(t) * rx * pinch, CY + Math.sin(t) * ry]);
  }
  // Catmull-Rom -> cubic bezier for a smooth closed curve
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d + ' Z';
};

const MitochondrionExplorer: React.FC<Props> = ({ onInteraction }) => {
  const [selected, setSelected] = useState<PartId | null>(null);
  const [discovered, setDiscovered] = useState<Set<PartId>>(new Set());
  const [hovered, setHovered] = useState<PartId | null>(null);
  const reportedRef = useRef(false);

  const outerD = useMemo(() => ovalPath(RX, RY), []);
  const innerD = useMemo(() => ovalPath(RX - 18, RY - 16), []);
  const matrixD = useMemo(() => ovalPath(RX - 26, RY - 23), []);

  // Cristae: finger-like loops of the inner membrane folding INWARD from the
  // top and bottom walls. Each crista is a tall rounded "U" projecting toward
  // the centre — like the shelves in a real mitochondrion cutaway.
  const cristae = useMemo(() => {
    const list: string[] = [];
    const innerRx = RX - 26;
    const innerRy = RY - 23;
    const count = 7;
    for (let i = 0; i < count; i++) {
      const from = i % 2 === 0 ? 1 : -1; // alternate top / bottom wall
      // distribute fold mouths across the long axis
      const fx = CX + ((i - (count - 1) / 2) / (count / 2)) * (innerRx - 30);
      // wall y at this x (where the fold attaches)
      const norm = (fx - CX) / innerRx;
      const wallY = CY + from * innerRy * Math.sqrt(Math.max(0, 1 - norm * norm));
      const mouth = 26; // width of the fold mouth at the wall
      const depth = (innerRy * 0.92) * (0.62 + 0.32 * (1 - Math.abs(norm))); // reaches toward centre
      const x1 = fx - mouth / 2;
      const x2 = fx + mouth / 2;
      const tipY = wallY - from * depth;
      const bulge = 13; // how rounded the finger tip is
      // up one side, round the tip, back down the other side
      const d =
        `M${x1.toFixed(1)},${wallY.toFixed(1)} ` +
        `C${(x1 - 2).toFixed(1)},${(wallY - from * depth * 0.55).toFixed(1)} ` +
        `${(fx - bulge).toFixed(1)},${(tipY + from * bulge).toFixed(1)} ` +
        `${fx.toFixed(1)},${tipY.toFixed(1)} ` +
        `C${(fx + bulge).toFixed(1)},${(tipY + from * bulge).toFixed(1)} ` +
        `${(x2 + 2).toFixed(1)},${(wallY - from * depth * 0.55).toFixed(1)} ` +
        `${x2.toFixed(1)},${wallY.toFixed(1)}`;
      list.push(d);
    }
    return list;
  }, []);

  const select = useCallback(
    (id: PartId) => {
      setSelected(id);
      setDiscovered((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);
        return next;
      });
      if (!reportedRef.current) {
        reportedRef.current = true;
        onInteraction({ isCorrect: true, isEmpty: false, value: id });
      }
    },
    [onInteraction]
  );

  const active = selected ? PARTS.find((p) => p.id === selected) ?? null : null;
  const focus = hovered ?? selected;
  // opacity helper: full when this part is focused or nothing is focused; dim otherwise
  const dim = (id: PartId): number => (focus === null || focus === id ? 1 : 0.32);
  const glow = (id: PartId): boolean => focus === id;
  const enter = (id: PartId) => () => setHovered(id);
  const leave = () => setHovered(null);
  const hot = { cursor: 'pointer' as const };

  return (
    <div className="w-full h-full flex flex-col" style={{ color: '#fff' }}>
      <div
        className="flex-1"
        style={{ minHeight: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          aria-label="Clickable cutaway diagram of a mitochondrion"
          style={{ maxWidth: 560, height: 'auto', borderRadius: 16, background: '#170b2e' }}
        >
          <defs>
            <radialGradient id="me-matrix" cx="46%" cy="40%" r="78%">
              <stop offset="0%" stopColor="#3a2363" />
              <stop offset="100%" stopColor="#2b1b46" />
            </radialGradient>
            <linearGradient id="me-outer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e7c869" />
              <stop offset="100%" stopColor="#c79a2f" />
            </linearGradient>
            <linearGradient id="me-inner" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7fc0ff" />
              <stop offset="100%" stopColor="#3f7fff" />
            </linearGradient>
            <filter id="me-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="me-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* OUTER MEMBRANE — gold double line, gradient body */}
          <g opacity={dim('outer')} onClick={() => select('outer')} onMouseEnter={enter('outer')} onMouseLeave={leave} style={hot}>
            <path d={outerD} fill="url(#me-outer)" filter="url(#me-soft)" />
            <path d={outerD} fill="none" stroke="#fff6d8" strokeWidth={glow('outer') ? 4 : 2} opacity={0.85} />
            <path d={ovalPath(RX - 5, RY - 4)} fill="none" stroke="#b8861f" strokeWidth={1.5} opacity={0.7} />
          </g>

          {/* INTERMEMBRANE SPACE — the gap (sits between outer body and inner membrane) */}
          <g opacity={dim('inter')} onClick={() => select('inter')} onMouseEnter={enter('inter')} onMouseLeave={leave} style={hot}>
            <path d={ovalPath(RX - 10, RY - 8)} fill={glow('inter') ? '#cfe1ff' : '#9fb9ee'} opacity={0.95} />
          </g>

          {/* MATRIX — deep purple interior */}
          <g opacity={dim('matrix')} onClick={() => select('matrix')} onMouseEnter={enter('matrix')} onMouseLeave={leave} style={hot}>
            <path d={matrixD} fill="url(#me-matrix)" stroke={glow('matrix') ? '#b79bff' : 'none'} strokeWidth={glow('matrix') ? 3 : 0} />
            {/* faint ribosome dots + a small mtDNA loop for realism */}
            <circle cx={CX - 70} cy={CY + 38} r={3} fill="#7d6cf0" opacity={0.5} />
            <circle cx={CX + 64} cy={CY - 30} r={2.5} fill="#9b8cff" opacity={0.5} />
            <circle cx={CX + 30} cy={CY + 46} r={2.5} fill="#7d6cf0" opacity={0.45} />
            <ellipse cx={CX - 40} cy={CY - 40} rx={16} ry={9} fill="none" stroke="#b79bff" strokeWidth={2} opacity={0.55} transform={`rotate(-18 ${CX - 40} ${CY - 40})`} />
          </g>

          {/* INNER MEMBRANE + CRISTAE — teal/blue wall folding inward */}
          <g opacity={dim('inner')} onClick={() => select('inner')} onMouseEnter={enter('inner')} onMouseLeave={leave} style={hot} filter={glow('inner') ? 'url(#me-glow)' : undefined}>
            <path d={innerD} fill="none" stroke="url(#me-inner)" strokeWidth={glow('inner') ? 6 : 4} strokeLinejoin="round" />
            {cristae.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke={glow('inner') ? '#a7d8ff' : '#5aa9ff'}
                strokeWidth={glow('inner') ? 5 : 3.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </g>

          {/* hint */}
          {selected === null && hovered === null && (
            <text x={CX} y={CY + 4} textAnchor="middle" fontSize={13} fontWeight={700} fill="rgba(255,255,255,0.78)" pointerEvents="none">
              tap a part
            </text>
          )}
        </svg>
      </div>

      <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.96)', color: '#222' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
          {PARTS.map((p) => {
            const found = discovered.has(p.id);
            const on = selected === p.id;
            return (
              <button
                key={p.id}
                onClick={() => select(p.id)}
                onMouseEnter={enter(p.id)}
                onMouseLeave={leave}
                style={{
                  background: on ? '#0E7C86' : found ? '#eef6f7' : '#fafafa',
                  color: on ? '#fff' : '#333',
                  border: `2px solid ${on ? '#0E7C86' : '#cfd8dc'}`,
                  borderRadius: 8,
                  padding: '6px 10px',
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                {found ? '✓ ' : ''}
                {p.label}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0E7C86' }}>
            {discovered.size} / {PARTS.length} parts explored
          </span>
          {discovered.size === PARTS.length && (
            <span style={{ fontSize: 13, fontWeight: 700, color: '#2b1b46' }}>
              Nice — you found them all!
            </span>
          )}
        </div>

        <div style={{ fontSize: 13, minHeight: 56, lineHeight: 1.45, color: '#333' }}>
          {active ? (
            <span>
              <strong style={{ color: '#0E7C86' }}>{active.label}.</strong> {active.blurb}
            </span>
          ) : (
            <span style={{ color: '#666' }}>
              This is one mitochondrion — your cell's power plant. Tap each labelled part above (or
              click the diagram) to highlight it and learn what it does.
            </span>
          )}
        </div>

        <div style={{ fontSize: 12, marginTop: 8, color: '#0E7C86', fontWeight: 600 }}>
          Key idea: the inner membrane is folded into cristae to maximise surface area — more folds
          means more room for the machinery that makes energy.
        </div>
      </div>
    </div>
  );
};

export default MitochondrionExplorer;
