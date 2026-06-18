import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AtpSynthaseInteraction, InteractionState } from './interface';

interface Props {
  interaction: AtpSynthaseInteraction;
  interactionState?: InteractionState;
  onInteraction: (state: InteractionState) => void;
  onSubmit?: () => void;
  isSubmitTriggered?: boolean;
}

// The ATP synthase "molecular turbine": pump protons to build a gradient
// (water behind a dam), let them flow back through the rotor to make ATP,
// and cut the oxygen to watch the whole thing stall.
const W = 540;
const H = 320;
const MEMBRANE_Y = 150;
const MEMBRANE_H = 44;
const ROTOR_X = W / 2;
const ROTOR_Y = MEMBRANE_Y + MEMBRANE_H + 26;
const ROTOR_R = 30;

interface Proton {
  x: number;
  y: number;
  vy: number;
  flowing: boolean;
}

const AtpSynthase: React.FC<Props> = ({ onInteraction }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Live simulation values held in refs so the animation loop reads the latest.
  const gradientRef = useRef(0); // 0..1, protons piled above the membrane
  const oxygenRef = useRef(true);
  const pumpBoostRef = useRef(0); // decays after a "pump" tap
  const angleRef = useRef(0);
  const atpRef = useRef(0);
  const protonsRef = useRef<Proton[]>([]);
  const reportedRef = useRef(false);

  // Mirrored React state purely for the HUD readouts.
  const [oxygen, setOxygen] = useState(true);
  const [gradientPct, setGradientPct] = useState(0);
  const [rpm, setRpm] = useState(0);
  const [atp, setAtp] = useState(0);

  const pump = useCallback(() => {
    pumpBoostRef.current = Math.min(1.2, pumpBoostRef.current + 0.5);
    if (!reportedRef.current) {
      reportedRef.current = true;
      onInteraction({ isCorrect: true, isEmpty: false, value: 'pumped' });
    }
  }, [onInteraction]);

  const toggleOxygen = useCallback(() => {
    oxygenRef.current = !oxygenRef.current;
    setOxygen(oxygenRef.current);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // seed reservoir protons
    protonsRef.current = Array.from({ length: 60 }, () => ({
      x: 20 + Math.random() * (W - 40),
      y: 20 + Math.random() * (MEMBRANE_Y - 40),
      vy: 0,
      flowing: false,
    }));

    let last = 0;
    let frame = 0;

    const draw = (t: number) => {
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016;
      last = t;
      frame++;

      // --- physics ---
      const oxy = oxygenRef.current;
      const boost = pumpBoostRef.current;
      pumpBoostRef.current = Math.max(0, boost - dt * 0.6);

      if (oxy) {
        // electron transport chain pumps protons up the gradient
        gradientRef.current = Math.min(1, gradientRef.current + dt * (0.18 + boost * 0.9));
      } else {
        // no oxygen: the chain stalls, the dam slowly drains
        gradientRef.current = Math.max(0, gradientRef.current - dt * 0.25);
      }
      const g = gradientRef.current;

      // rotor speed scales with the gradient (turns/sec, scaled for display)
      const turnsPerSec = g * g * 13; // up to ~13 "x10" => evokes ~130/sec
      angleRef.current += turnsPerSec * dt * Math.PI * 2;

      // ATP production proportional to flow
      atpRef.current += turnsPerSec * 3 * dt;

      // --- particle motion ---
      const flowRate = turnsPerSec / 13; // 0..1
      protonsRef.current.forEach((p) => {
        if (!p.flowing) {
          // hover in reservoir; density visually tracks gradient
          p.y += Math.sin((frame + p.x) * 0.05) * 0.2;
          // occasionally a proton enters the channel when flowing
          if (flowRate > 0.05 && Math.abs(p.x - ROTOR_X) < 26 && p.y > MEMBRANE_Y - 30 && Math.random() < flowRate * 0.06) {
            p.flowing = true;
            p.vy = 30 + flowRate * 90;
          }
        } else {
          p.y += p.vy * dt;
          p.x += (ROTOR_X - p.x) * 0.06;
          if (p.y > ROTOR_Y + ROTOR_R + 10) {
            // recycle back up to the reservoir
            p.flowing = false;
            p.x = 20 + Math.random() * (W - 40);
            p.y = 20 + Math.random() * (MEMBRANE_Y - 50);
          }
        }
      });

      // --- render ---
      ctx.clearRect(0, 0, W, H);

      // matrix (below membrane)
      ctx.fillStyle = '#2b1b46';
      ctx.fillRect(0, MEMBRANE_Y + MEMBRANE_H, W, H - (MEMBRANE_Y + MEMBRANE_H));
      // intermembrane space (above)
      ctx.fillStyle = '#10233a';
      ctx.fillRect(0, 0, W, MEMBRANE_Y);

      // "dam" fill: shade the reservoir by how full the gradient is
      ctx.fillStyle = `rgba(90,170,255,${0.10 + g * 0.28})`;
      ctx.fillRect(0, MEMBRANE_Y - g * (MEMBRANE_Y - 8), W, g * (MEMBRANE_Y - 8));

      // membrane band
      ctx.fillStyle = '#c9a227';
      ctx.fillRect(0, MEMBRANE_Y, W, MEMBRANE_H);
      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      for (let x = 6; x < W; x += 26) ctx.fillRect(x, MEMBRANE_Y + 6, 12, MEMBRANE_H - 12);

      // synthase channel through the membrane
      ctx.fillStyle = '#7d6cf0';
      ctx.beginPath();
      ctx.moveTo(ROTOR_X - 16, MEMBRANE_Y - 14);
      ctx.lineTo(ROTOR_X + 16, MEMBRANE_Y - 14);
      ctx.lineTo(ROTOR_X + 10, MEMBRANE_Y + MEMBRANE_H + 8);
      ctx.lineTo(ROTOR_X - 10, MEMBRANE_Y + MEMBRANE_H + 8);
      ctx.closePath();
      ctx.fill();

      // protons
      protonsRef.current.forEach((p) => {
        ctx.fillStyle = p.flowing ? '#ffd166' : '#5aa9ff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // rotor (spinning wheel)
      ctx.save();
      ctx.translate(ROTOR_X, ROTOR_Y);
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
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('ATP synthase', ROTOR_X, ROTOR_Y + ROTOR_R + 18);

      // labels
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.font = '11px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('Protons pile up here (the "dam")', 10, 16);
      ctx.fillText('Matrix — ATP is made here', 10, H - 10);

      // sync HUD a few times a second
      if (frame % 6 === 0) {
        setGradientPct(Math.round(g * 100));
        setRpm(Math.round(turnsPerSec * 10));
        setAtp(Math.floor(atpRef.current));
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div ref={wrapRef} className="w-full h-full flex flex-col" style={{ color: '#fff' }}>
      <div style={{ flex: 1, minHeight: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          aria-label="ATP synthase turbine simulation"
          style={{ width: '100%', maxWidth: 540, height: 'auto', borderRadius: 12, background: '#0b132b' }}
        />
      </div>
      <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.95)', color: '#222' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 8 }}>
          <button
            onClick={pump}
            style={{ background: '#7d6cf0', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontWeight: 700, cursor: 'pointer' }}
          >
            ⚡ Pump protons
          </button>
          <button
            onClick={toggleOxygen}
            style={{
              background: oxygen ? '#0E7C86' : '#b00020',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 14px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Oxygen: {oxygen ? 'ON' : 'OFF'}
          </button>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 14, fontWeight: 600 }}>
          <span>Gradient: {gradientPct}%</span>
          <span>Spin: ~{rpm}/sec</span>
          <span style={{ color: '#0E7C86' }}>ATP made: {atp}</span>
        </div>
        <div style={{ fontSize: 13, marginTop: 6, color: '#555' }}>
          {oxygen
            ? 'Protons build behind the dam and rush back through the turbine — making ATP. Tap “Pump” to push harder.'
            : 'No oxygen: the dam is draining, the turbine is stalling, and ATP has flatlined. Turn oxygen back on!'}
        </div>
      </div>
    </div>
  );
};

export default AtpSynthase;
