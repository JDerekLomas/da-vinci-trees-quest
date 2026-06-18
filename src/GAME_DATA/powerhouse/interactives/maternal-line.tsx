import React, { useCallback, useRef, useState } from 'react';
import { MaternalLineInteraction, InteractionState } from './interface';

interface Props {
  interaction: MaternalLineInteraction;
  interactionState?: InteractionState;
  onInteraction: (state: InteractionState) => void;
  onSubmit?: () => void;
  isSubmitTriggered?: boolean;
}

// Trace your unbroken mother -> daughter line back in time. The same teal
// mitochondrion is passed down every generation untouched, all the way to
// Mitochondrial Eve in Africa ~150,000 years ago.
const PINK = '#d94f9a';
const TEAL = '#0E7C86';

interface Ancestor {
  label: string;
  years: string;
}

// Each step jumps further back; the gaps accelerate toward deep time.
const CHAIN: Ancestor[] = [
  { label: 'You', years: 'today' },
  { label: 'Mom', years: '~25 years ago' },
  { label: 'Grandma', years: '~50 years ago' },
  { label: 'Great-grandma', years: '~80 years ago' },
  { label: 'Great-great-grandma', years: '~120 years ago' },
  { label: '…200 mothers back', years: '~5,000 years ago' },
  { label: '…1,500 mothers back', years: '~40,000 years ago' },
  { label: 'Mitochondrial Eve', years: '~150,000 years ago — Africa' },
];

const MaternalLine: React.FC<Props> = ({ onInteraction }) => {
  const [revealed, setRevealed] = useState(1); // how many ancestors are shown
  const reportedRef = useRef(false);

  const report = useCallback(() => {
    if (!reportedRef.current) {
      reportedRef.current = true;
      onInteraction({ isCorrect: true, isEmpty: false, value: 'traced' });
    }
  }, [onInteraction]);

  const stepBack = useCallback(() => {
    report();
    setRevealed((r) => Math.min(CHAIN.length, r + 1));
  }, [report]);

  const jumpToEve = useCallback(() => {
    report();
    setRevealed(CHAIN.length);
  }, [report]);

  const reset = useCallback(() => setRevealed(1), []);

  const atEve = revealed >= CHAIN.length;
  const shown = CHAIN.slice(0, revealed);
  const current = CHAIN[revealed - 1];

  return (
    <div className="w-full h-full flex flex-col" style={{ color: '#fff' }}>
      <div
        style={{
          flex: 1,
          minHeight: 240,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          background: 'linear-gradient(180deg,#3b1d2e 0%,#5a2440 100%)',
          borderRadius: 12,
          padding: '14px 10px',
          overflowY: 'auto',
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: PINK, marginBottom: 4 }}>
          Your unbroken maternal line
        </div>
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 10 }}>{current.years}</div>

        {/* The chain of mothers, newest at top, oldest at the bottom. */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          {shown.map((a, i) => {
            const isEve = i === CHAIN.length - 1;
            return (
              <div key={a.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {i > 0 && (
                  // The unbroken mother -> daughter connector.
                  <div style={{ width: 4, height: 22, background: PINK, borderRadius: 2 }} />
                )}
                <svg width={70} height={70} viewBox="0 0 70 70" aria-hidden="true">
                  {isEve && <circle cx={35} cy={35} r={33} fill="none" stroke={PINK} strokeWidth={2} strokeDasharray="4 3" />}
                  {/* figure */}
                  <circle cx={35} cy={20} r={9} fill={isEve ? '#ffd9ec' : '#f6c9dd'} />
                  <path d="M20 56 Q35 30 50 56 Z" fill={isEve ? PINK : '#c66a98'} />
                  {/* glowing teal mitochondrion — same one every generation */}
                  <ellipse cx={35} cy={42} rx={7} ry={4.5} fill={TEAL} stroke="#7fe3ec" strokeWidth={1.5}>
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="1.6s" repeatCount="indefinite" />
                  </ellipse>
                  <path d="M30 42 q2.5 -3 5 0 q2.5 3 5 0" fill="none" stroke="#bafff4" strokeWidth={1} />
                </svg>
                <div style={{ fontSize: 11, fontWeight: isEve ? 800 : 600, color: isEve ? PINK : '#fff', textAlign: 'center', maxWidth: 110 }}>
                  {a.label}
                </div>
                <div style={{ fontSize: 9, opacity: 0.7, marginBottom: 2 }}>{a.years}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.95)', color: '#222', marginTop: 8 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 10 }}>
          <button
            onClick={stepBack}
            disabled={atEve}
            style={{
              background: atEve ? '#bbb' : PINK,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 14px',
              fontWeight: 700,
              cursor: atEve ? 'default' : 'pointer',
            }}
          >
            ↩ Step back one generation
          </button>
          <button
            onClick={jumpToEve}
            disabled={atEve}
            style={{
              background: atEve ? '#bbb' : TEAL,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 14px',
              fontWeight: 700,
              cursor: atEve ? 'default' : 'pointer',
            }}
          >
            ⏩ Jump to the start
          </button>
          {revealed > 1 && (
            <button
              onClick={reset}
              style={{ background: '#eee', color: '#555', border: 'none', borderRadius: 8, padding: '8px 12px', fontWeight: 600, cursor: 'pointer' }}
            >
              Reset
            </button>
          )}
        </div>

        <div style={{ fontSize: 13, color: '#444', marginBottom: 8 }}>
          The same <strong style={{ color: TEAL }}>teal mitochondrion</strong> is copied straight down the{' '}
          <strong style={{ color: PINK }}>pink mother→daughter line</strong> — unchanged. Your mitochondria
          (and their own DNA) come <strong>only</strong> from your mother, never your father.
        </div>

        {atEve && (
          <div
            style={{
              background: '#fff4e6',
              border: `2px solid ${PINK}`,
              borderRadius: 8,
              padding: '10px 12px',
              fontSize: 13,
              color: '#5a2440',
              marginBottom: 8,
            }}
          >
            <strong>Myth-buster:</strong> Mitochondrial Eve was <strong>NOT</strong> the only woman alive —
            thousands of other women lived alongside her too. She is just the one whose unbroken
            mother→daughter line never died out, so everyone alive today traces back to her.
          </div>
        )}

        <div style={{ fontSize: 12, color: '#666' }}>
          🔬 Because mtDNA passes down this single unbroken line, it survives in old bones and even a single
          hair — which is why forensic scientists use it to identify remains.
        </div>
      </div>
    </div>
  );
};

export default MaternalLine;
