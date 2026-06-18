import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BrownFatInteraction, InteractionState } from './interface';

interface Props {
  interaction: BrownFatInteraction;
  interactionState?: InteractionState;
  onInteraction: (state: InteractionState) => void;
  onSubmit?: () => void;
  isSubmitTriggered?: boolean;
}

// Brown fat: the same proton "dam" as ATP synthase, but with a second door
// (UCP1). Open UCP1 and protons leak AROUND the turbine — instead of ATP you
// get HEAT. The slider sets how open that back door is.
const W = 540;
const H = 320;
const MEMBRANE_Y = 150;
const MEMBRANE_H = 44;
const TURBINE_X = W * 0.36;
const UCP_X = W * 0.68;
const ROTOR_Y = MEMBRANE_Y + MEMBRANE_H + 26;
const ROTOR_R = 28;

const COLD = '#5aa9ff';
const HOT = '#E0552B';
const GOLD = '#c9a227';
const UCP = '#d94f9a';

interface Proton {
  x: number;
  y: number;
  vy: number;
  flowing: boolean;
  path: 'turbine' | 'ucp';
}

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

const BrownFat: React.FC<Props> = ({ onInteraction }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  const opennessRef = useRef(0); // 0 = ATP, 1 = HEAT (back door fully open)
  const angleRef = useRef(0);
  const atpRef = useRef(0);
  const heatRef = useRef(0); // 0..1 thermometer level
  const protonsRef = useRef<Proton[]>([]);
  const reportedRef = useRef(false);

  const [openness, setOpenness] = useState(0);
  const [atp, setAtp] = useState(0);
  const [heatPct, setHeatPct] = useState(0);

  const handleSlider = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value) / 100;
      opennessRef.current = v;
      setOpenness(v);
      if (!reportedRef.current) {
        reportedRef.current = true;
        onInteraction({ isCorrect: true, isEmpty: false, value: v });
      }
    },
    [onInteraction]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    protonsRef.current = Array.from({ length: 70 }, () => ({
      x: 20 + Math.random() * (W - 40),
      y: 20 + Math.random() * (MEMBRANE_Y - 40),
      vy: 0,
      flowing: false,
      path: 'turbine',
    }));

    let last = 0;
    let frame = 0;

    const draw = (t: number) => {
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016;
      last = t;
      frame++;

      const open = opennessRef.current; // 0..1
      // Turbine drive falls as the back door opens; protons take the easy path.
      const turbineFlow = (1 - open) * (1 - open); // 0..1
      const turnsPerSec = turbineFlow * 12;
      angleRef.current += turnsPerSec * dt * Math.PI * 2;
      atpRef.current += turnsPerSec * 3 * dt;

      // Heat tracks the leak; relaxes toward the leak level.
      const targetHeat = open;
      heatRef.current += (targetHeat - heatRef.current) * Math.min(1, dt * 1.5);

      // --- particle motion ---
      protonsRef.current.forEach((p) => {
        if (!p.flowing) {
          p.y += Math.sin((frame + p.x) * 0.05) * 0.2;
          const nearTurbine = Math.abs(p.x - TURBINE_X) < 24 && turbineFlow > 0.04;
          const nearUcp = Math.abs(p.x - UCP_X) < 24 && open > 0.04;
          if (nearTurbine && p.y > MEMBRANE_Y - 30 && Math.random() < turbineFlow * 0.07) {
            p.flowing = true;
            p.path = 'turbine';
            p.vy = 30 + turbineFlow * 80;
          } else if (nearUcp && p.y > MEMBRANE_Y - 30 && Math.random() < open * 0.07) {
            p.flowing = true;
            p.path = 'ucp';
            p.vy = 30 + open * 100;
          }
        } else {
          const target = p.path === 'turbine' ? TURBINE_X : UCP_X;
          p.y += p.vy * dt;
          p.x += (target - p.x) * 0.06;
          if (p.y > ROTOR_Y + ROTOR_R + 10) {
            p.flowing = false;
            p.x = 20 + Math.random() * (W - 40);
            p.y = 20 + Math.random() * (MEMBRANE_Y - 50);
          }
        }
      });

      // --- render ---
      ctx.clearRect(0, 0, W, H);
      const h = heatRef.current;

      // matrix tint warms with heat
      const matrixCol = `rgb(${Math.round(lerp(43, 120, h))},${Math.round(lerp(27, 40, h))},${Math.round(lerp(70, 50, h))})`;
      ctx.fillStyle = matrixCol;
      ctx.fillRect(0, MEMBRANE_Y + MEMBRANE_H, W, H - (MEMBRANE_Y + MEMBRANE_H));
      const spaceCol = `rgb(${Math.round(lerp(16, 70, h))},${Math.round(lerp(35, 30, h))},${Math.round(lerp(58, 35, h))})`;
      ctx.fillStyle = spaceCol;
      ctx.fillRect(0, 0, W, MEMBRANE_Y);

      // proton reservoir shading (always fairly full — gradient is built)
      ctx.fillStyle = 'rgba(90,170,255,0.22)';
      ctx.fillRect(0, MEMBRANE_Y - (MEMBRANE_Y - 8), W, MEMBRANE_Y - 8);

      // heat-wave shimmer when hot
      if (h > 0.08) {
        ctx.strokeStyle = `rgba(224,85,43,${0.10 + h * 0.25})`;
        ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
          const baseY = MEMBRANE_Y + MEMBRANE_H + 24 + i * 22;
          ctx.beginPath();
          for (let x = 10; x < W - 10; x += 8) {
            const yy = baseY + Math.sin(x * 0.06 + frame * 0.08 + i) * 4 * h;
            if (x === 10) ctx.moveTo(x, yy);
            else ctx.lineTo(x, yy);
          }
          ctx.stroke();
        }
      }

      // membrane band
      ctx.fillStyle = GOLD;
      ctx.fillRect(0, MEMBRANE_Y, W, MEMBRANE_H);
      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      for (let x = 6; x < W; x += 26) ctx.fillRect(x, MEMBRANE_Y + 6, 12, MEMBRANE_H - 12);

      // turbine channel
      ctx.fillStyle = '#7d6cf0';
      ctx.beginPath();
      ctx.moveTo(TURBINE_X - 15, MEMBRANE_Y - 14);
      ctx.lineTo(TURBINE_X + 15, MEMBRANE_Y - 14);
      ctx.lineTo(TURBINE_X + 9, MEMBRANE_Y + MEMBRANE_H + 8);
      ctx.lineTo(TURBINE_X - 9, MEMBRANE_Y + MEMBRANE_H + 8);
      ctx.closePath();
      ctx.fill();

      // UCP1 back-door channel — width grows with openness
      const doorW = 6 + open * 16;
      ctx.fillStyle = UCP;
      ctx.globalAlpha = 0.4 + open * 0.6;
      ctx.fillRect(UCP_X - doorW, MEMBRANE_Y - 14, doorW * 2, MEMBRANE_H + 22);
      ctx.globalAlpha = 1;

      // protons
      protonsRef.current.forEach((p) => {
        ctx.fillStyle = p.flowing ? (p.path === 'ucp' ? HOT : '#ffd166') : COLD;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // turbine rotor
      ctx.save();
      ctx.translate(TURBINE_X, ROTOR_Y);
      ctx.rotate(angleRef.current);
      ctx.fillStyle = '#7d6cf0';
      ctx.beginPath();
      ctx.arc(0, 0, ROTOR_R, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#cdc6ff';
      ctx.lineWidth = 4;
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * ROTOR_R, Math.sin(a) * ROTOR_R);
        ctx.stroke();
      }
      ctx.restore();

      // labels
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('ATP turbine', TURBINE_X, ROTOR_Y + ROTOR_R + 16);
      ctx.fillStyle = UCP;
      ctx.fillText('UCP1 "back door"', UCP_X, ROTOR_Y + ROTOR_R + 16);

      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = '11px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('Protons piled up (the "dam")', 10, 16);

      if (frame % 6 === 0) {
        setAtp(Math.floor(atpRef.current));
        setHeatPct(Math.round(heatRef.current * 100));
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const opennessPct = Math.round(openness * 100);

  return (
    <div className="w-full h-full flex flex-col" style={{ color: '#fff' }}>
      <div style={{ flex: 1, minHeight: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          aria-label="Brown fat uncoupling simulation"
          style={{ width: '100%', maxWidth: 540, height: 'auto', borderRadius: 12, background: '#0b132b' }}
        />
      </div>
      <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.95)', color: '#222' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, marginBottom: 2 }}>
          <span style={{ color: '#0E7C86' }}>Make ENERGY (ATP)</span>
          <span style={{ color: HOT }}>Make HEAT</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={opennessPct}
          onChange={handleSlider}
          aria-label="UCP1 back-door openness"
          style={{ width: '100%', accentColor: UCP }}
        />
        <div style={{ display: 'flex', gap: 16, fontSize: 14, fontWeight: 600, marginTop: 6, flexWrap: 'wrap' }}>
          <span style={{ color: '#0E7C86' }}>ATP made: {atp}</span>
          <span style={{ color: HOT }}>🌡 Heat: {heatPct}%</span>
          <span style={{ color: UCP }}>UCP1 open: {opennessPct}%</span>
        </div>
        <div style={{ fontSize: 13, marginTop: 6, color: '#555' }}>
          {openness < 0.3
            ? 'Back door closed: protons rush through the turbine → it spins → ATP is made and the cell stays cool.'
            : openness > 0.7
              ? 'Back door wide open: protons LEAK around the turbine through UCP1 → almost no ATP, and the lost energy escapes as HEAT. 🔥'
              : 'Cracking the back door open: some protons leak through UCP1, so the turbine slows and a little heat appears.'}
        </div>
        <div style={{ fontSize: 12, marginTop: 6, color: '#777' }}>
          Babies and hibernating animals are packed with brown fat — they open UCP1 to burn the gradient straight into
          body heat instead of ATP. Honest note: it burns some calories, but it&apos;s no magic weight-loss trick.
        </div>
      </div>
    </div>
  );
};

export default BrownFat;
