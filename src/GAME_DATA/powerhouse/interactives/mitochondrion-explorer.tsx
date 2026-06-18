import React, { useCallback, useMemo, useRef, useState } from 'react';
import { MitochondrionExplorerInteraction, InteractionState } from './interface';

interface Props {
  interaction: MitochondrionExplorerInteraction;
  interactionState?: InteractionState;
  onInteraction: (state: InteractionState) => void;
  onSubmit?: () => void;
  isSubmitTriggered?: boolean;
}

// A clickable anatomy of a single mitochondrion. Tap each labelled part to
// reveal a friendly explanation. The headline idea: the inner membrane is
// scrunched into deep folds (CRISTAE) to pack in surface area = more room for
// the energy-making machinery.

type PartId = 'outer' | 'inter' | 'inner' | 'matrix';

interface Part {
  id: PartId;
  label: string;
  color: string;
  blurb: string;
}

const PARTS: Part[] = [
  {
    id: 'outer',
    label: 'Outer membrane',
    color: '#c9a227',
    blurb:
      'Outer membrane — the smooth outer skin of the mitochondrion. It is fairly leaky, letting small molecules drift in and out, like a fence with wide gaps.',
  },
  {
    id: 'inter',
    label: 'Intermembrane space',
    color: '#7597de',
    blurb:
      'Intermembrane space — the thin gap between the two membranes. Protons (H⁺) get pumped into here, piling up like water behind a dam, storing energy.',
  },
  {
    id: 'inner',
    label: 'Cristae (inner folds)',
    color: '#0E7C86',
    blurb:
      'Cristae — the deep folds of the inner wall. Folding it like a scrunched bedsheet packs in huge surface area, so there is far more room for the machinery that makes energy.',
  },
  {
    id: 'matrix',
    label: 'Matrix',
    color: '#7d6cf0',
    blurb:
      'Matrix — the jelly-like fluid inside. It is packed with enzymes (and the mitochondrion’s own DNA) that break down fuel to feed the energy line.',
  },
];

const W = 540;
const H = 320;

const MitochondrionExplorer: React.FC<Props> = ({ onInteraction }) => {
  const [selected, setSelected] = useState<PartId | null>(null);
  const [discovered, setDiscovered] = useState<Set<PartId>>(new Set());
  const [hovered, setHovered] = useState<PartId | null>(null);
  const reportedRef = useRef(false);

  // The inner membrane drawn as a wavy "cristae" path inside the bean.
  const cristaePath = useMemo(() => {
    const cx = W / 2;
    const cy = H / 2;
    const rx = 175;
    const ry = 95;
    const lobes = 9;
    const pts: string[] = [];
    const steps = 220;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      // crinkle radially to evoke deep folds (cristae)
      const wobble = 1 + 0.22 * Math.sin(t * lobes) + 0.06 * Math.sin(t * lobes * 2);
      const x = cx + Math.cos(t) * rx * 0.74 * wobble;
      const y = cy + Math.sin(t) * ry * 0.66 * wobble;
      pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(' ') + ' Z';
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
  const isOn = (id: PartId) => selected === id || hovered === id;

  return (
    <div className="w-full h-full flex flex-col" style={{ color: '#fff' }}>
      <div
        className="flex-1"
        style={{ minHeight: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          aria-label="Clickable diagram of a mitochondrion"
          style={{ maxWidth: 540, height: 'auto', borderRadius: 12, background: '#2b1055' }}
        >
          <defs>
            <radialGradient id="me-matrix" cx="50%" cy="45%" r="70%">
              <stop offset="0%" stopColor="#8a6bf5" />
              <stop offset="100%" stopColor="#5a3fb0" />
            </radialGradient>
          </defs>

          {/* OUTER MEMBRANE — the bean-shaped outer skin */}
          <ellipse
            cx={W / 2}
            cy={H / 2}
            rx={208}
            ry={118}
            fill="#3a1a6e"
            stroke={PARTS[0].color}
            strokeWidth={isOn('outer') ? 12 : 7}
            style={{ cursor: 'pointer', transition: 'stroke-width 120ms' }}
            onClick={() => select('outer')}
            onMouseEnter={() => setHovered('outer')}
            onMouseLeave={() => setHovered(null)}
          />

          {/* INTERMEMBRANE SPACE — the gap, shown as the band between the rings */}
          <ellipse
            cx={W / 2}
            cy={H / 2}
            rx={194}
            ry={106}
            fill={isOn('inter') ? '#9bb4ee' : '#7597de'}
            style={{ cursor: 'pointer', transition: 'fill 120ms' }}
            onClick={() => select('inter')}
            onMouseEnter={() => setHovered('inter')}
            onMouseLeave={() => setHovered(null)}
          />

          {/* MATRIX — inside fluid (drawn under the cristae outline) */}
          <ellipse
            cx={W / 2}
            cy={H / 2}
            rx={176}
            ry={96}
            fill="url(#me-matrix)"
            style={{ cursor: 'pointer' }}
            onClick={() => select('matrix')}
            onMouseEnter={() => setHovered('matrix')}
            onMouseLeave={() => setHovered(null)}
          />

          {/* INNER MEMBRANE / CRISTAE — the scrunched folded wall */}
          <path
            d={cristaePath}
            fill="none"
            stroke={isOn('inner') ? '#33c9d6' : PARTS[2].color}
            strokeWidth={isOn('inner') ? 6 : 4}
            strokeLinejoin="round"
            style={{ cursor: 'pointer', transition: 'stroke 120ms, stroke-width 120ms' }}
            onClick={() => select('inner')}
            onMouseEnter={() => setHovered('inner')}
            onMouseLeave={() => setHovered(null)}
          />

          {/* matrix label hint */}
          <text
            x={W / 2}
            y={H / 2 + 4}
            textAnchor="middle"
            fontSize={13}
            fontWeight={700}
            fill="rgba(255,255,255,0.75)"
            pointerEvents="none"
          >
            tap a part
          </text>
        </svg>
      </div>

      <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.95)', color: '#222' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
          {PARTS.map((p) => {
            const found = discovered.has(p.id);
            const on = selected === p.id;
            return (
              <button
                key={p.id}
                onClick={() => select(p.id)}
                style={{
                  background: on ? p.color : found ? '#eee' : '#fafafa',
                  color: on ? '#fff' : '#333',
                  border: `2px solid ${p.color}`,
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
            <span style={{ fontSize: 13, fontWeight: 700, color: '#2b1055' }}>
              Nice — you found them all!
            </span>
          )}
        </div>

        <div style={{ fontSize: 13, minHeight: 56, lineHeight: 1.45, color: '#333' }}>
          {active ? (
            <span>
              <strong style={{ color: active.color }}>{active.label}.</strong>{' '}
              {active.blurb.replace(/^[^—]*— /, '')}
            </span>
          ) : (
            <span style={{ color: '#666' }}>
              This is one mitochondrion — your cell’s power plant. Tap each labelled part above (or
              click the diagram) to learn what it does.
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
