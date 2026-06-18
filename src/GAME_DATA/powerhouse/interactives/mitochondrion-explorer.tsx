import React, { useRef, useState } from 'react';
import { MitochondrionExplorerInteraction, InteractionState } from './interface';

interface Props {
  interaction: MitochondrionExplorerInteraction;
  interactionState?: InteractionState;
  onInteraction: (state: InteractionState) => void;
  onSubmit?: () => void;
  isSubmitTriggered?: boolean;
}

type PartId = 'outer' | 'inter' | 'cristae' | 'matrix';
const PARTS: { id: PartId; label: string; color: string; text: string }[] = [
  { id: 'outer', label: 'Outer membrane', color: '#e7c869',
    text: 'The smooth outer wall — the mitochondrion’s outer boundary. Fairly porous, so small molecules pass through.' },
  { id: 'inter', label: 'Intermembrane space', color: '#7fd0ff',
    text: 'The narrow gap between the two membranes — where protons pile up to power the turbines (the “dam”).' },
  { id: 'cristae', label: 'Cristae (inner folds)', color: '#3f7fff',
    text: 'The deep folds of the inner membrane. Folding it like a scrunched bedsheet packs in huge surface area — more room for the machinery that makes energy. THIS is the key idea.' },
  { id: 'matrix', label: 'Matrix', color: '#9b7bff',
    text: 'The inner fluid space — home to the energy reactions, ribosomes, and the mitochondrion’s own circular DNA (mtDNA).' },
];

const NAVY = '#0d1b2e';
const GOLD = '#e7c869';
const BLUE = '#5aa9ff';
const BLUE2 = '#3f7fff';
const PUR = '#3a2363';
const ATPY = '#ffd166';
const ORANGE = '#E0552B';
const MUTE = '#9fb3c8';
const CX = 320, CY = 215;

const MitochondrionExplorer: React.FC<Props> = ({ onInteraction }) => {
  const [sel, setSel] = useState<PartId | null>(null);
  const explored = useRef<Set<PartId>>(new Set());
  const reported = useRef(false);

  const pick = (id: PartId) => {
    setSel(id);
    explored.current.add(id);
    if (!reported.current) {
      reported.current = true;
      onInteraction({ isCorrect: true, isEmpty: false, value: id });
    }
  };

  const op = (id: PartId) => (sel === null || sel === id ? 1 : 0.25);
  const topFingers = [200, 320, 440];
  const botFingers = [260, 380];
  const selText = sel ? PARTS.find((p) => p.id === sel)!.text : 'Tap a labelled part below (or on the diagram) to explore it.';
  const count = explored.current.size;

  const finger = (x: number, yTop: number, yBot: number, key: string) => (
    <rect key={key} x={x - 16} y={Math.min(yTop, yBot)} width={32} height={Math.abs(yBot - yTop)} rx={16}
      fill={BLUE} stroke={sel === 'cristae' ? '#bfe0ff' : BLUE2} strokeWidth={sel === 'cristae' ? 3 : 2} />
  );

  const label = (id: PartId, tx: number, ty: number, lx: number, ly: number, anchor: 'start' | 'end', text: string) => (
    <g opacity={sel === null || sel === id ? 1 : 0.3} style={{ cursor: 'pointer' }} onClick={() => pick(id)}>
      <line x1={tx} y1={ty} x2={lx} y2={ly} stroke={sel === id ? '#fff' : MUTE} strokeWidth={1.5} />
      <text x={tx} y={ty - 6} fontFamily="Arial,Helvetica,sans-serif" fontSize={14}
        fill={sel === id ? '#fff' : MUTE} textAnchor={anchor} fontWeight={sel === id ? 'bold' : 'normal'}>{text}</text>
    </g>
  );

  return (
    <div className="w-full h-full flex flex-col" style={{ color: '#fff' }}>
      <div style={{ flex: 1, minHeight: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 6 }}>
        <svg viewBox="0 0 680 440" style={{ width: '100%', maxWidth: 600, height: 'auto' }} role="img" aria-label="Labelled cutaway of a mitochondrion">
          <rect x="2" y="2" width="676" height="436" rx="18" fill={NAVY} stroke="#24405f" strokeWidth="2" />

          <ellipse cx={CX} cy={CY} rx={196} ry={120} fill={PUR} opacity={op('matrix')} />

          <g opacity={op('cristae')}>
            {topFingers.map((x, i) => finger(x, 108, 232, 't' + i))}
            {botFingers.map((x, i) => finger(x, 322, 200, 'b' + i))}
          </g>

          <g opacity={op('matrix')}>
            <circle cx={158} cy={250} r={13} fill="none" stroke={ATPY} strokeWidth={5} />
            {[[160, 182], [486, 250], [470, 182]].map(([rx, ry], i) => (
              <circle key={i} cx={rx} cy={ry} r={5} fill={ORANGE} />
            ))}
          </g>

          <ellipse cx={CX} cy={CY} rx={196} ry={120} fill="none" stroke={sel === 'cristae' ? '#bfe0ff' : BLUE2} strokeWidth={4} opacity={op('cristae')} />

          <ellipse cx={CX} cy={CY} rx={208} ry={130} fill="none" stroke="#7fd0ff" strokeWidth={14} opacity={sel === 'inter' ? 0.5 : 0} />

          <g opacity={op('outer')}>
            <ellipse cx={CX} cy={CY} rx={220} ry={140} fill="none" stroke={sel === 'outer' ? '#fff3cf' : GOLD} strokeWidth={6} />
            <ellipse cx={CX} cy={CY} rx={210} ry={132} fill="none" stroke={GOLD} strokeWidth={3} opacity={0.7} />
          </g>

          {label('outer', 60, 64, 250, 116, 'start', 'Outer membrane')}
          {label('inter', 60, 152, 175, 182, 'start', 'Intermembrane space')}
          {label('cristae', 620, 116, 456, 150, 'end', 'Cristae (folds)')}
          {label('matrix', 620, 322, 360, 250, 'end', 'Matrix')}
        </svg>
      </div>

      <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.96)', color: '#222' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
          {PARTS.map((p) => (
            <button key={p.id} onClick={() => pick(p.id)}
              style={{
                border: `2px solid ${p.color}`, borderRadius: 10, padding: '7px 12px', fontWeight: 700, cursor: 'pointer',
                background: sel === p.id ? p.color : '#fff', color: sel === p.id ? '#10233a' : '#222',
              }}>
              {p.label}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 15, lineHeight: '1.4', minHeight: 44 }}>
          {sel && <strong>{PARTS.find((p) => p.id === sel)!.label}: </strong>}
          {selText}
        </div>
        <div style={{ borderTop: '1px solid #e2e8f0', marginTop: 10, paddingTop: 8 }}>
          <div style={{ color: '#0E7C86', fontWeight: 700, fontSize: 14 }}>
            Key idea: cristae fold to maximise surface area = more room for the machinery that makes energy
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
            <span style={{ color: '#E0552B', fontWeight: 700, fontSize: 13 }}>{count} / 4 parts explored</span>
            <span style={{ color: '#667', fontSize: 13 }}>You’re looking at ONE — a single muscle cell holds ~1,000–2,000 of them.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MitochondrionExplorer;
