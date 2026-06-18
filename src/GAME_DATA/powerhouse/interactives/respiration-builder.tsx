import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RespirationBuilderInteraction, InteractionState } from './interface';

interface Props {
  interaction: RespirationBuilderInteraction;
  interactionState?: InteractionState;
  onInteraction: (state: InteractionState) => void;
  onSubmit?: () => void;
  isSubmitTriggered?: boolean;
}

// "Build the Energy Line": feed FUEL (glucose) + OXYGEN into the mitochondrion
// and watch ATP stream out (with water + CO2 as waste). Both inputs are needed
// for full output; with fuel but no oxygen only a tiny backup trickle comes out.
const W = 660;
const H = 420;
const CX = W / 2;
const CY = H / 2 + 6;

const FUEL = '#e7c869';
const OXY = '#5aa9ff';
const ATPC = '#ffd166';
const WASTE = 'rgba(200,205,210,0.8)';

type Kind = 'fuel' | 'oxy';
interface InP { x: number; y: number; k: Kind; }
interface OutP { x: number; y: number; vy: number; life: number; t: 'atp' | 'h2o' | 'co2'; }

const rand = (a: number, b: number): number => a + Math.random() * (b - a);

const RespirationBuilder: React.FC<Props> = ({ onInteraction }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  const fuelRef = useRef(true);
  const oxyRef = useRef(true);
  const glowRef = useRef(0);
  const atpRef = useRef(0);
  const atpAccum = useRef(0);
  const insRef = useRef<InP[]>([]);
  const outsRef = useRef<OutP[]>([]);
  const reported = useRef(false);

  const [fuel, setFuel] = useState(true);
  const [oxygen, setOxygen] = useState(true);
  const [atp, setAtp] = useState(0);
  const [rate, setRate] = useState(0);

  const report = useCallback(() => {
    if (!reported.current) {
      reported.current = true;
      onInteraction({ isCorrect: true, isEmpty: false, value: 'fed-the-engine' });
    }
  }, [onInteraction]);

  const toggleFuel = useCallback(() => {
    fuelRef.current = !fuelRef.current;
    setFuel(fuelRef.current);
    report();
  }, [report]);

  const toggleOxygen = useCallback(() => {
    oxyRef.current = !oxyRef.current;
    setOxygen(oxyRef.current);
    report();
  }, [report]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let last = 0;
    let frame = 0;

    const spawnIn = (k: Kind): void => {
      const y = k === 'fuel' ? CY - 34 : CY + 34;
      insRef.current.push({ x: rand(-30, -6), y: y + rand(-10, 10), k });
    };

    const draw = (t: number): void => {
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016;
      last = t;
      frame++;

      const f = fuelRef.current;
      const o = oxyRef.current;
      // rate: 1 = full (both), 0.12 = fuel-only backup, 0 = no fuel
      const target = !f ? 0 : o ? 1 : 0.12;
      glowRef.current += (target - glowRef.current) * Math.min(1, dt * 4);
      const lvl = glowRef.current;

      // ---- spawn inputs streaming from the left ----
      if (f && Math.random() < (o ? 0.5 : 0.35)) spawnIn('fuel');
      if (o && f && Math.random() < 0.5) spawnIn('oxy');

      // ---- ATP + waste production ----
      const ratePerSec = lvl * 11; // tokens/sec at full power
      atpAccum.current += ratePerSec * dt;
      while (atpAccum.current >= 1) {
        atpAccum.current -= 1;
        atpRef.current++;
        outsRef.current.push({ x: CX + rand(22, 40), y: CY + rand(-18, 18), vy: rand(-6, 6), life: 1, t: 'atp' });
        if (lvl > 0.4 && Math.random() < 0.5) {
          outsRef.current.push({ x: CX + rand(20, 38), y: CY + rand(-26, 26), vy: rand(-10, 10), life: 1, t: Math.random() < 0.5 ? 'h2o' : 'co2' });
        }
      }

      // ---- render ----
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0a1b30';
      ctx.fillRect(0, 0, W, H);

      // IN / OUT side labels
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.font = 'bold 13px Arial';
      ctx.fillText('IN  →  fuel + oxygen', W * 0.18, 26);
      ctx.fillText('OUT  →  ATP + waste', W * 0.82, 26);

      // input pipe guides
      ctx.strokeStyle = 'rgba(255,255,255,0.10)';
      ctx.lineWidth = 16;
      ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(8, CY - 34); ctx.lineTo(CX - 70, CY - 18); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(8, CY + 34); ctx.lineTo(CX - 70, CY + 18); ctx.stroke();
      ctx.font = '11px Arial';
      ctx.textAlign = 'left';
      ctx.fillStyle = FUEL;
      ctx.fillText('glucose', 10, CY - 44);
      ctx.fillStyle = OXY;
      ctx.fillText('oxygen', 10, CY + 56);

      // moving input particles
      for (let i = insRef.current.length - 1; i >= 0; i--) {
        const p = insRef.current[i];
        const tx = CX - 60;
        const ty = p.k === 'fuel' ? CY - 18 : CY + 18;
        p.x += (tx - p.x) * Math.min(1, dt * 3);
        p.y += (ty - p.y) * Math.min(1, dt * 3);
        if (p.x > CX - 66) { insRef.current.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = p.k === 'fuel' ? FUEL : OXY;
        ctx.fill();
      }

      // ---- the mitochondrion (bean) ----
      const glow = 0.25 + lvl * 0.55;
      ctx.save();
      ctx.translate(CX, CY);
      // outer membrane (gold) — bean shape via two stacked ellipses + fill
      ctx.shadowColor = `rgba(255,209,102,${glow})`;
      ctx.shadowBlur = 20 + lvl * 30;
      const og = ctx.createLinearGradient(-90, 0, 90, 0);
      og.addColorStop(0, '#caa83f');
      og.addColorStop(0.5, '#e7c869');
      og.addColorStop(1, '#caa83f');
      ctx.fillStyle = og;
      ctx.beginPath();
      ctx.ellipse(0, 0, 96, 58, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      // matrix (purple inner)
      ctx.fillStyle = '#3a2363';
      ctx.beginPath();
      ctx.ellipse(0, 0, 84, 46, 0, 0, Math.PI * 2);
      ctx.fill();
      // cristae hints (blue folds)
      ctx.strokeStyle = `rgba(90,169,255,${0.4 + lvl * 0.4})`;
      ctx.lineWidth = 3;
      for (let i = -2; i <= 2; i++) {
        const cx = i * 26;
        ctx.beginPath();
        ctx.moveTo(cx, -42);
        ctx.quadraticCurveTo(cx + 14, 0, cx, 42);
        ctx.stroke();
      }
      // engine pulse core
      const pr = 10 + Math.sin(t / 140) * lvl * 6;
      const cg = ctx.createRadialGradient(0, 0, 1, 0, 0, pr + 10);
      cg.addColorStop(0, `rgba(255,209,102,${0.3 + lvl * 0.6})`);
      cg.addColorStop(1, 'rgba(255,209,102,0)');
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(0, 0, pr + 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // output pipe guide
      ctx.strokeStyle = 'rgba(255,255,255,0.10)';
      ctx.lineWidth = 16;
      ctx.beginPath(); ctx.moveTo(CX + 70, CY); ctx.lineTo(W - 8, CY); ctx.stroke();

      // ---- output tokens ----
      ctx.textAlign = 'center';
      for (let i = outsRef.current.length - 1; i >= 0; i--) {
        const a = outsRef.current[i];
        a.x += (60 + (1 - a.life) * 40) * dt;
        a.y += a.vy * dt;
        a.life -= dt * 0.55;
        if (a.life <= 0 || a.x > W) { outsRef.current.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(0, Math.min(1, a.life));
        if (a.t === 'atp') {
          ctx.fillStyle = ATPC;
          ctx.beginPath();
          ctx.roundRect(a.x - 13, a.y - 8, 26, 16, 5);
          ctx.fill();
          ctx.fillStyle = '#5a3d00';
          ctx.font = 'bold 9px Arial';
          ctx.fillText('ATP', a.x, a.y + 3);
        } else {
          ctx.fillStyle = WASTE;
          ctx.beginPath();
          ctx.arc(a.x, a.y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'rgba(255,255,255,0.55)';
          ctx.font = '8px Arial';
          ctx.fillText(a.t === 'h2o' ? 'H₂O' : 'CO₂', a.x, a.y - 7);
        }
        ctx.globalAlpha = 1;
      }

      // caption
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Two things go IN — fuel + oxygen. ATP comes OUT, with water + CO₂ as waste.', CX, H - 12);

      if (frame % 6 === 0) {
        setAtp(atpRef.current);
        setRate(Math.round(lvl * 100));
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const note = !fuel
    ? 'No fuel, no energy.'
    : !oxygen
      ? 'No oxygen — only a tiny backup supply. This is why you can’t sprint forever.'
      : 'Both inputs flowing — the engine is at full power, ATP streaming out.';

  return (
    <div className="w-full h-full flex flex-col" style={{ color: '#fff' }}>
      <div style={{ flex: 1, minHeight: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          aria-label="Cellular respiration builder: feed fuel and oxygen into a mitochondrion to make ATP"
          style={{ width: '100%', maxWidth: 640, height: 'auto', borderRadius: 14, background: '#0a1b30', boxShadow: '0 6px 24px rgba(0,0,0,0.35)' }}
        />
      </div>
      <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.96)', color: '#222' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 8 }}>
          <button
            onClick={toggleFuel}
            style={{ background: fuel ? '#caa83f' : '#9a9a9a', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontWeight: 700, cursor: 'pointer' }}
          >
            Fuel (glucose): {fuel ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={toggleOxygen}
            style={{ background: oxygen ? '#5aa9ff' : '#9a9a9a', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontWeight: 700, cursor: 'pointer' }}
          >
            Oxygen: {oxygen ? 'ON' : 'OFF'}
          </button>
          <div style={{ flex: 1, minWidth: 140 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#0E7C86' }}>ATP rate</div>
            <div style={{ height: 10, borderRadius: 6, background: '#eee', overflow: 'hidden' }}>
              <div style={{ width: `${rate}%`, height: '100%', background: 'linear-gradient(90deg,#0E7C86,#ffd166)', transition: 'width .2s' }} />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 14, fontWeight: 600, flexWrap: 'wrap' }}>
          <span style={{ color: '#0E7C86' }}>ATP made: {atp}</span>
          <span>Rate: {rate}%</span>
        </div>
        <div style={{ fontSize: 13, marginTop: 6, color: '#555' }}>{note}</div>
      </div>
    </div>
  );
};

export default RespirationBuilder;
