import React, { useCallback, useMemo, useRef, useState } from 'react';
import { EndosymbiosisInteraction, InteractionState } from './interface';

interface Props {
  interaction: EndosymbiosisInteraction;
  interactionState?: InteractionState;
  onInteraction: (state: InteractionState) => void;
  onSubmit?: () => void;
  isSubmitTriggered?: boolean;
}

// The endosymbiosis story: an ancestral cell swallows a free-living bacterium
// ~1.5-2 billion years ago and keeps it instead of digesting it — over time it
// becomes the mitochondrion. The student steps through the merger, then plays
// detective, collecting 5 pieces of evidence to "close the case."

interface Step {
  caption: string;
  // 0 = far apart, 1 = engulfed/settled
  merge: number;
}

const STEPS: Step[] = [
  { caption: 'A big host cell drifts beside a smaller free-living bacterium.', merge: 0 },
  { caption: 'The host engulfs the bacterium — wrapping it in its own membrane.', merge: 0.55 },
  { caption: 'Instead of digesting it, the host keeps it. A partnership begins.', merge: 0.85 },
  { caption: 'Over ~1.5–2 billion years it becomes a mitochondrion: the powerhouse.', merge: 1 },
];

interface Clue {
  id: string;
  title: string;
  detail: string;
}

const CLUES: Clue[] = [
  { id: 'membrane', title: 'Double membrane', detail: 'It has TWO membranes — a leftover wrapper from being swallowed.' },
  { id: 'dna', title: 'Circular DNA', detail: 'It carries its own circular DNA — bacteria-style, not like the nucleus.' },
  { id: 'ribosomes', title: 'Bacterial ribosomes', detail: 'Its ribosomes look bacterial, and even respond to bacterial antibiotics.' },
  { id: 'divide', title: 'Divides on its own', detail: 'It splits in two by itself (binary fission), exactly like bacteria.' },
  { id: 'sequence', title: 'DNA family match', detail: 'Its DNA sequence matches a real bacterial family (the Rickettsiales).' },
];

const Endosymbiosis: React.FC<Props> = ({ onInteraction }) => {
  const [step, setStep] = useState(0);
  const [collected, setCollected] = useState<Record<string, boolean>>({});
  const reportedRef = useRef(false);

  const merge = STEPS[step].merge;
  const numCollected = useMemo(() => Object.values(collected).filter(Boolean).length, [collected]);
  const allFound = numCollected === CLUES.length;

  const report = useCallback(() => {
    if (reportedRef.current) return;
    reportedRef.current = true;
    onInteraction({ isCorrect: true, isEmpty: false, value: 'evidence-started' });
  }, [onInteraction]);

  const advance = useCallback(() => {
    setStep((s) => (s + 1) % STEPS.length);
  }, []);

  const collect = useCallback(
    (id: string) => {
      setCollected((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
      report();
    },
    [report],
  );

  // --- Inline SVG scene of the engulfment ---
  // Host cell (soft blue/purple) on the left grows a pocket; bacterium (green)
  // slides in and, at full merge, sits inside as a ribbon-cristae organelle.
  const hostCx = 150;
  const hostCy = 110;
  const hostR = 88;
  // bacterium travels from the right into the host as merge -> 1
  const bacStartX = 320;
  const bacX = bacStartX - merge * (bacStartX - hostCx);
  const bacY = hostCy;
  const bacRx = 30;
  const bacRy = 16;
  const bacColor = merge >= 1 ? '#2f7d3a' : '#3fa34d';
  // engulfment pocket opens as the bacterium approaches
  const pocket = merge > 0 && merge < 0.85 ? merge : 0;

  return (
    <div className="w-full h-full flex flex-col" style={{ color: '#fff' }}>
      <div
        style={{ flex: 1, minHeight: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <svg
          viewBox="0 0 380 220"
          role="img"
          aria-label="A host cell engulfing a bacterium that becomes a mitochondrion"
          style={{ width: '100%', maxWidth: 540, height: 'auto', borderRadius: 12, background: '#160e2e' }}
        >
          {/* host cell body */}
          <circle cx={hostCx} cy={hostCy} r={hostR} fill="#5b53b8" opacity={0.35} />
          <circle cx={hostCx} cy={hostCy} r={hostR} fill="none" stroke="#9d97f0" strokeWidth={3} />
          {/* engulfment dimple on the right edge */}
          {pocket > 0 && (
            <circle cx={hostCx + hostR - 8} cy={hostCy} r={20 + pocket * 18} fill="#160e2e" opacity={0.9} />
          )}
          {/* nucleus */}
          <circle cx={hostCx - 28} cy={hostCy - 18} r={26} fill="#3a3490" />
          <circle cx={hostCx - 28} cy={hostCy - 18} r={26} fill="none" stroke="#b9b4ff" strokeWidth={2} />
          <text x={hostCx - 28} y={hostCy - 14} textAnchor="middle" fontSize={9} fill="#e7e5ff">
            nucleus
          </text>

          {/* the bacterium / future mitochondrion */}
          <g transform={`translate(${bacX} ${bacY})`}>
            <ellipse rx={bacRx} ry={bacRy} fill={bacColor} stroke="#bfe8c4" strokeWidth={2} />
            {/* outer wrapper membrane appears once engulfed (double membrane!) */}
            {merge >= 0.55 && (
              <ellipse rx={bacRx + 6} ry={bacRy + 6} fill="none" stroke="#9d97f0" strokeWidth={2} opacity={0.9} />
            )}
            {/* cristae folds emerge as it becomes an organelle */}
            {merge >= 0.85 &&
              [-16, -6, 4, 14].map((dx) => (
                <path
                  key={dx}
                  d={`M ${dx} ${-bacRy + 3} q 6 ${bacRy} 0 ${2 * bacRy - 6}`}
                  fill="none"
                  stroke="#bfe8c4"
                  strokeWidth={1.6}
                />
              ))}
          </g>

          {/* free-living label early; mitochondrion label at the end */}
          <text x={bacX} y={bacY + 34} textAnchor="middle" fontSize={9} fill="#bfe8c4">
            {merge >= 1 ? 'mitochondrion' : merge > 0 ? 'engulfed bacterium' : 'free-living bacterium'}
          </text>

          <text x={190} y={206} textAnchor="middle" fontSize={10} fill="rgba(255,255,255,0.6)">
            Step {step + 1} of {STEPS.length}
          </text>
        </svg>
      </div>

      <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.95)', color: '#222' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
          <button
            onClick={advance}
            style={{ background: '#5b53b8', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontWeight: 700, cursor: 'pointer' }}
          >
            {step === STEPS.length - 1 ? '↺ Replay' : '▶ Next step'}
          </button>
          <span style={{ fontSize: 13, color: '#444' }}>{STEPS[step].caption}</span>
        </div>

        <div style={{ fontWeight: 700, fontSize: 14, margin: '10px 0 6px' }}>
          🔎 Collect the evidence — {numCollected} / {CLUES.length} clues collected
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {CLUES.map((c) => {
            const got = !!collected[c.id];
            return (
              <button
                key={c.id}
                onClick={() => collect(c.id)}
                aria-pressed={got}
                style={{
                  flex: '1 1 150px',
                  minWidth: 150,
                  textAlign: 'left',
                  border: got ? '2px solid #3fa34d' : '2px solid #d6d2ec',
                  background: got ? '#eef8ef' : '#f6f5fb',
                  color: '#222',
                  borderRadius: 10,
                  padding: '8px 10px',
                  cursor: got ? 'default' : 'pointer',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 13 }}>
                  {got ? '✅ ' : '❓ '}
                  {c.title}
                </div>
                <div style={{ fontSize: 12, color: '#555', marginTop: 2 }}>
                  {got ? c.detail : 'Tap to reveal the proof'}
                </div>
              </button>
            );
          })}
        </div>

        {allFound && (
          <div
            role="status"
            style={{ marginTop: 10, background: '#3fa34d', color: '#fff', borderRadius: 10, padding: '10px 12px', fontWeight: 700 }}
          >
            Case closed — mitochondria were once bacteria. You are a partnership!
            <div style={{ fontWeight: 400, fontSize: 12, marginTop: 4 }}>
              Lynn Margulis proposed this in 1967. She was doubted for years — then the DNA
              evidence proved her right.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Endosymbiosis;
