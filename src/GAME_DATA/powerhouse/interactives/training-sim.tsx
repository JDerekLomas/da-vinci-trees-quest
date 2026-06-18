import React, { useCallback, useRef, useState } from 'react';
import { TrainingSimInteraction, InteractionState } from './interface';

interface Props {
  interaction: TrainingSimInteraction;
  interactionState?: InteractionState;
  onInteraction: (state: InteractionState) => void;
  onSubmit?: () => void;
  isSubmitTriggered?: boolean;
}

// "Design your training week": assign each of 7 days a workout, then run 6
// weeks of simulated training and watch mitochondria density and VO2max climb.
// The model rewards a balanced mix of hard days + rest; all-hard overtrains.
type Workout = 'REST' | 'ENDURANCE' | 'HIIT' | 'SLEEP';

const ORDER: Workout[] = ['REST', 'ENDURANCE', 'HIIT', 'SLEEP'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const COLORS: Record<Workout, string> = {
  REST: '#8a94a6',
  ENDURANCE: '#0E7C86',
  HIIT: '#E0552B',
  SLEEP: '#5b6cc4',
};
const LABELS: Record<Workout, string> = {
  REST: 'Rest',
  ENDURANCE: 'Endurance',
  HIIT: 'HIIT',
  SLEEP: 'Sleep / recover',
};

const TEAL = '#0E7C86';
const ORANGE = '#E0552B';

// Final gains from a finished 6-week block, given the weekly plan.
function evaluate(plan: Workout[]): { mito: number; vo2: number; recovery: number; hard: number } {
  const hard = plan.filter((w) => w === 'ENDURANCE' || w === 'HIIT').length;
  const recovery = plan.filter((w) => w === 'REST' || w === 'SLEEP').length;

  // Each hard day adds stimulus (endurance & HIIT pay off similarly).
  let stimulus = 0;
  plan.forEach((w) => {
    if (w === 'ENDURANCE') stimulus += 8;
    else if (w === 'HIIT') stimulus += 8.5;
  });

  // Recovery lets the body adapt. Too few rest days -> overtraining penalty.
  // Sweet spot is ~1-2 recovery days; zero rest stalls or reverses gains.
  let recoveryFactor: number;
  if (recovery === 0) recoveryFactor = 0.35; // overtrained: gains stall/drop
  else if (recovery === 1) recoveryFactor = 0.95;
  else if (recovery === 2) recoveryFactor = 1.0; // ideal
  else if (recovery === 3) recoveryFactor = 0.85;
  else recoveryFactor = Math.max(0.25, 1 - (recovery - 3) * 0.18); // too lazy

  const mito = Math.round(Math.min(52, stimulus * recoveryFactor));
  const vo2 = Math.round(Math.min(28, stimulus * 0.55 * recoveryFactor));
  return { mito, vo2, recovery, hard };
}

function feedbackFor(plan: Workout[]): string {
  const { recovery, hard } = evaluate(plan);
  if (hard === 0) return 'An all-rest week barely moves the needle — your body needs a training stimulus.';
  if (recovery === 0) return 'No rest days! Hard every day overtrains you — adaptation needs recovery. Add a rest day.';
  if (recovery >= 4) return 'Lots of recovery, but not much hard work. Add another endurance or HIIT day.';
  if (hard >= 4 && (recovery === 1 || recovery === 2)) return 'Great balance! Hard work + smart recovery = the biggest gains.';
  return 'Solid plan. Aim for ~4-5 hard days with 1-2 recovery days for the best gains.';
}

const TrainingSim: React.FC<Props> = ({ onInteraction }) => {
  const [plan, setPlan] = useState<Workout[]>([
    'ENDURANCE', 'HIIT', 'REST', 'ENDURANCE', 'HIIT', 'ENDURANCE', 'SLEEP',
  ]);
  const [mito, setMito] = useState(0); // displayed % gain
  const [vo2, setVo2] = useState(0); // displayed ml/kg/min gain
  const [running, setRunning] = useState(false);
  const [week, setWeek] = useState(0);
  const [done, setDone] = useState(false);
  const reportedRef = useRef(false);
  const rafRef = useRef<number>(0);

  const cycleDay = useCallback((i: number) => {
    setPlan((prev) => {
      const next = prev.slice();
      const idx = ORDER.indexOf(prev[i]);
      next[i] = ORDER[(idx + 1) % ORDER.length];
      return next;
    });
    setDone(false);
    setMito(0);
    setVo2(0);
    setWeek(0);
    if (!reportedRef.current) {
      reportedRef.current = true;
      onInteraction({ isCorrect: true, isEmpty: false, value: 'edited-plan' });
    }
  }, [onInteraction]);

  const run = useCallback(() => {
    if (running) return;
    cancelAnimationFrame(rafRef.current);
    const target = evaluate(plan);
    setRunning(true);
    setDone(false);
    setMito(0);
    setVo2(0);
    setWeek(0);

    const startedAt = performance.now();
    const durationMs = 2600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startedAt) / durationMs);
      // ease-out so the bars decelerate as adaptation plateaus
      const e = 1 - Math.pow(1 - t, 2);
      setMito(Math.round(target.mito * e));
      setVo2(Math.round(target.vo2 * e * 10) / 10);
      setWeek(Math.min(6, Math.ceil(t * 6)));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setRunning(false);
        setDone(true);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [plan, running]);

  const result = evaluate(plan);
  const mitoFrac = Math.min(1, mito / 52);
  const vo2Frac = Math.min(1, vo2 / 28);

  const Bar = ({ label, value, unit, frac, color }: { label: string; value: number; unit: string; frac: number; color: string }) => (
    <div style={{ flex: 1, minWidth: 160 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
        <span style={{ color }}>{label}</span>
        <span style={{ color }}>+{value}{unit}</span>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.18)', borderRadius: 8, height: 22, overflow: 'hidden' }}>
        <div style={{ width: `${frac * 100}%`, height: '100%', background: color, borderRadius: 8, transition: 'width 60ms linear' }} />
      </div>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col" style={{ color: '#fff' }}>
      <div style={{ flex: 1, minHeight: 240, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 18, padding: 12, background: '#0b132b', borderRadius: 12 }}>
        <div style={{ textAlign: 'center', fontWeight: 800, fontSize: 15 }}>
          Train your mitochondria — {running ? `Week ${week} of 6...` : done ? 'After 6 weeks' : 'Plan, then run 6 weeks'}
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', maxWidth: 460, width: '100%', alignSelf: 'center' }}>
          <Bar label="MITOCHONDRIA DENSITY" value={mito} unit="%" frac={mitoFrac} color={TEAL} />
          <Bar label="VO₂max" value={vo2} unit=" ml/kg/min" frac={vo2Frac} color={ORANGE} />
        </div>
        <div style={{ fontSize: 11, textAlign: 'center', color: 'rgba(255,255,255,0.55)' }}>
          Both endurance and HIIT build mitochondria by different routes — similar payoff.
        </div>
      </div>

      <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.95)', color: '#222', marginTop: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
          Click a day to set its workout:
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 10 }}>
          {plan.map((w, i) => (
            <button
              key={i}
              onClick={() => cycleDay(i)}
              aria-label={`${DAYS[i]}: ${LABELS[w]}, click to change`}
              style={{
                background: COLORS[w],
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '8px 2px',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: 11,
                lineHeight: 1.3,
              }}
            >
              <div style={{ opacity: 0.85 }}>{DAYS[i]}</div>
              <div>{LABELS[w]}</div>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
          <button
            onClick={run}
            disabled={running}
            style={{
              background: running ? '#9aa' : ORANGE,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '9px 16px',
              fontWeight: 800,
              cursor: running ? 'default' : 'pointer',
            }}
          >
            {running ? 'Training…' : 'Run 6 weeks →'}
          </button>
          <span style={{ fontSize: 12, color: '#555' }}>
            {result.hard} hard day{result.hard === 1 ? '' : 's'} · {result.recovery} recovery day{result.recovery === 1 ? '' : 's'}
          </span>
        </div>

        <div style={{ fontSize: 13, fontWeight: 600, color: feedbackFor(plan).startsWith('Great') ? TEAL : '#333' }}>
          {feedbackFor(plan)}
        </div>
        <div style={{ fontSize: 11, marginTop: 6, color: '#777' }}>
          Exercise is the real lever — no supplement does this.
        </div>
      </div>
    </div>
  );
};

export default TrainingSim;
