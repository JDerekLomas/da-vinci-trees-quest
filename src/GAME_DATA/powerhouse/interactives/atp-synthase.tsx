import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AtpSynthaseInteraction, InteractionState } from './interface';

interface Props {
  interaction: AtpSynthaseInteraction;
  interactionState?: InteractionState;
  onInteraction: (state: InteractionState) => void;
  onSubmit?: () => void;
  isSubmitTriggered?: boolean;
}

// The ATP synthase "molecular turbine": the electron transport chain pumps
// protons across the inner membrane (the "dam"); they rush back through the
// rotor, spinning it and snapping out ATP. Cut the oxygen and it all stalls.
// Framed as the athlete's cellular POWER OUTPUT.
const W = 660;
const H = 430;
const MEM_TOP = 156;
const MEM_H = 46;
const MEM_BOT = MEM_TOP + MEM_H;
const CX = Math.round(W * 0.54);
const ROTOR_Y = MEM_TOP + MEM_H / 2;
const ROTOR_R = MEM_H / 2 + 5;
const F1_Y = MEM_BOT + 46;
const PUMP_X = Math.round(W * 0.16);

type PState = 'res' | 'thru' | 'mat' | 'pump';
interface Proton {
  x: number;
  y: number;
  vx: number;
  vy: number;
  s: PState;
  ph: number;
}
interface Atp {
  x: number;
  y: number;
  vy: number;
  life: number;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);

const AtpSynthase: React.FC<Props> = ({ onInteraction }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  const gRef = useRef(0); // gradient 0..1
  const oxyRef = useRef(true);
  const boostRef = useRef(0);
  const angleRef = useRef(0);
  const atpRef = useRef(0);
  const atpAccum = useRef(0);
  const protonsRef = useRef<Proton[]>([]);
  const atpsRef = useRef<Atp[]>([]);
  const reported = useRef(false);

  const [oxygen, setOxygen] = useState(true);
  const [gPct, setGPct] = useState(0);
  const [rpm, setRpm] = useState(0);
  const [atp, setAtp] = useState(0);

  const pump = useCallback(() => {
    boostRef.current = Math.min(1.4, boostRef.current + 0.6);
    if (!reported.current) {
      reported.current = true;
      onInteraction({ isCorrect: true, isEmpty: false, value: 'pumped' });
    }
  }, [onInteraction]);

  const toggleOxygen = useCallback(() => {
    oxyRef.current = !oxyRef.current;
    setOxygen(oxyRef.current);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    protonsRef.current = Array.from({ length: 80 }, () => ({
      x: rand(10, W - 10),
      y: rand(14, MEM_TOP - 10),
      vx: rand(-4, 4),
      vy: rand(-2, 2),
      s: 'res' as PState,
      ph: Math.random() * Math.PI * 2,
    }));

    let last = 0;
    let frame = 0;

    const drawProton = (p: Proton, glow: boolean) => {
      const col = p.s === 'thru' ? '#ffd270' : '#7fc4ff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, glow ? 7 : 5, 0, Math.PI * 2);
      ctx.fillStyle = p.s === 'thru' ? 'rgba(255,210,112,0.22)' : 'rgba(127,196,255,0.20)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
    };

    const draw = (t: number) => {
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016;
      last = t;
      frame++;

      const oxy = oxyRef.current;
      boostRef.current = Math.max(0, boostRef.current - dt * 0.7);
      const boost = boostRef.current;

      if (oxy) gRef.current = Math.min(1, gRef.current + dt * (0.15 + boost * 1.1));
      else gRef.current = Math.max(0, gRef.current - dt * 0.22);
      const g = gRef.current;

      const turns = g * g * 13; // display turns/sec (x10 => ~130)
      angleRef.current += turns * dt * Math.PI * 2;
      atpAccum.current += turns * dt;
      while (atpAccum.current >= 1.1) {
        atpAccum.current -= 1.1;
        atpRef.current++;
        atpsRef.current.push({ x: CX + rand(-16, 16), y: F1_Y + 18, vy: rand(18, 30), life: 1 });
      }

      // ---- proton behaviour ----
      const flow = turns / 13; // 0..1
      const ps = protonsRef.current;
      for (const p of ps) {
        p.ph += dt;
        if (p.s === 'res') {
          // gentle drift + sink toward membrane as gradient builds (crowding = "dam")
          p.x += p.vx * dt + Math.sin(p.ph * 1.6) * 0.3;
          p.vy += g * 16 * dt;
          p.y += p.vy * dt;
          p.vy *= 0.96;
          if (p.x < 8) { p.x = 8; p.vx = Math.abs(p.vx); }
          if (p.x > W - 8) { p.x = W - 8; p.vx = -Math.abs(p.vx); }
          if (p.y < 14) { p.y = 14; p.vy = 0; }
          const ceil = MEM_TOP - 6;
          if (p.y > ceil) { p.y = ceil; p.vy = 0; }
          // capture into the rotor channel
          if (flow > 0.04 && Math.abs(p.x - CX) < 30 && p.y > MEM_TOP - 30 && Math.random() < flow * 0.05) {
            p.s = 'thru';
          }
        } else if (p.s === 'thru') {
          p.x += (CX - p.x) * 0.18;
          p.y += (70 + flow * 120) * dt;
          if (p.y > MEM_BOT + 8) p.s = 'mat';
        } else if (p.s === 'mat') {
          p.x += p.vx * dt;
          p.y += 8 * dt;
          if (p.y > H - 12 || Math.random() < dt * 0.4) {
            if (oxy) { p.s = 'pump'; }
            else { p.s = 'res'; p.x = rand(10, W - 10); p.y = rand(14, MEM_TOP - 20); p.vy = 0; }
          }
        } else {
          // pumped up the ETC on the left back to the reservoir
          p.x += (PUMP_X - p.x) * 0.12;
          p.y += -120 * dt;
          if (p.y < MEM_TOP - 16) { p.s = 'res'; p.x = PUMP_X + rand(-20, 20); p.vx = rand(-4, 4); p.vy = 0; }
        }
      }

      // ---- render ----
      ctx.clearRect(0, 0, W, H);

      // intermembrane space (charged) — brighter near membrane as g rises
      const ims = ctx.createLinearGradient(0, 0, 0, MEM_TOP);
      ims.addColorStop(0, '#0a1b30');
      ims.addColorStop(1, `rgba(${40 + g * 30}, ${90 + g * 70}, ${150 + g * 80}, 1)`);
      ctx.fillStyle = ims;
      ctx.fillRect(0, 0, W, MEM_TOP);

      // matrix
      const mat = ctx.createLinearGradient(0, MEM_BOT, 0, H);
      mat.addColorStop(0, '#3a2363');
      mat.addColorStop(1, '#1d1233');
      ctx.fillStyle = mat;
      ctx.fillRect(0, MEM_BOT, W, H - MEM_BOT);

      // phospholipid bilayer
      const headTop = MEM_TOP + 9;
      const headBot = MEM_BOT - 9;
      ctx.strokeStyle = 'rgba(201,162,40,0.8)';
      ctx.lineWidth = 2;
      for (let x = 12; x < W; x += 17) {
        const nearMotor = Math.abs(x - CX) < ROTOR_R + 8;
        const nearPump = Math.abs(x - PUMP_X) < 22;
        if (nearMotor || nearPump) continue;
        ctx.beginPath(); ctx.moveTo(x, headTop + 2); ctx.lineTo(x, ROTOR_Y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x, headBot - 2); ctx.lineTo(x, ROTOR_Y); ctx.stroke();
        ctx.fillStyle = '#e0bd4d';
        ctx.beginPath(); ctx.arc(x, headTop, 5.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#cda838';
        ctx.beginPath(); ctx.arc(x, headBot, 5.5, 0, Math.PI * 2); ctx.fill();
      }

      // ETC proton pump (left) — glows when working
      const pumpOn = oxy && g < 0.999;
      ctx.fillStyle = pumpOn ? '#1f9aa8' : '#3a5560';
      ctx.beginPath();
      ctx.roundRect(PUMP_X - 18, MEM_TOP - 2, 36, MEM_H + 4, 7);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('⤴', PUMP_X, ROTOR_Y + 6);

      // protons behind the motor
      for (const p of ps) if (p.s !== 'thru') drawProton(p, p.s === 'res' && p.y > MEM_TOP - 40);

      // ATP synthase: a-subunit channel guides
      ctx.fillStyle = '#2f8f9c';
      ctx.beginPath(); ctx.roundRect(CX - ROTOR_R - 9, MEM_TOP, 8, MEM_H, 3); ctx.fill();

      // F0 rotor (spinning gear in the membrane)
      ctx.save();
      ctx.translate(CX, ROTOR_Y);
      ctx.rotate(angleRef.current);
      const rotorGrad = ctx.createRadialGradient(0, 0, 3, 0, 0, ROTOR_R);
      rotorGrad.addColorStop(0, '#b9acff');
      rotorGrad.addColorStop(1, '#6b58e0');
      ctx.fillStyle = rotorGrad;
      ctx.beginPath();
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        const r = i % 2 === 0 ? ROTOR_R : ROTOR_R - 5;
        ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // protons currently flowing through (drawn over rotor)
      for (const p of ps) if (p.s === 'thru') drawProton(p, true);

      // central stalk (rotating shaft from rotor into F1)
      ctx.save();
      ctx.translate(CX, ROTOR_Y);
      ctx.rotate(angleRef.current);
      ctx.fillStyle = '#d7d0ff';
      ctx.beginPath(); ctx.roundRect(-4, 0, 8, F1_Y - ROTOR_Y, 4); ctx.fill();
      ctx.restore();

      // F1 head (catalytic knob in the matrix — three lobes = where ATP is made)
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 + 0.5;
        const lx = CX + Math.cos(a) * 17;
        const ly = F1_Y + Math.sin(a) * 12;
        const lg = ctx.createRadialGradient(lx - 4, ly - 4, 2, lx, ly, 20);
        lg.addColorStop(0, '#8f7bff');
        lg.addColorStop(1, '#5945c0');
        ctx.fillStyle = lg;
        ctx.beginPath(); ctx.arc(lx, ly, 18, 0, Math.PI * 2); ctx.fill();
      }
      // rotating gamma cam inside head
      ctx.save();
      ctx.translate(CX, F1_Y);
      ctx.rotate(angleRef.current * 1.0);
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.beginPath(); ctx.ellipse(0, 0, 5, 11, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();

      // ATP tokens drifting out
      ctx.font = 'bold 9px Arial';
      ctx.textAlign = 'center';
      for (let i = atpsRef.current.length - 1; i >= 0; i--) {
        const a = atpsRef.current[i];
        a.y += a.vy * dt;
        a.life -= dt * 0.7;
        if (a.life <= 0) { atpsRef.current.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(0, Math.min(1, a.life));
        ctx.fillStyle = '#ffd166';
        ctx.beginPath(); ctx.roundRect(a.x - 12, a.y - 8, 24, 16, 5); ctx.fill();
        ctx.fillStyle = '#5a3d00';
        ctx.fillText('ATP', a.x, a.y + 3);
        ctx.globalAlpha = 1;
      }

      // labels
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('INTERMEMBRANE SPACE — protons pile up (the "dam")', 12, 18);
      ctx.fillText('MATRIX — ATP is made here', 12, H - 12);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('proton pump', PUMP_X, MEM_TOP - 8);
      ctx.fillText('ATP synthase', CX, F1_Y + 40);

      // gradient gauge (right)
      const gx = W - 30, gy = 30, gh = H - 80, gw = 14;
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.beginPath(); ctx.roundRect(gx, gy, gw, gh, 7); ctx.fill();
      const fill = gh * g;
      const gg = ctx.createLinearGradient(0, gy + gh - fill, 0, gy + gh);
      gg.addColorStop(0, '#7fc4ff'); gg.addColorStop(1, '#3f7fff');
      ctx.fillStyle = gg;
      ctx.beginPath(); ctx.roundRect(gx, gy + gh - fill, gw, fill, 7); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.font = '10px Arial'; ctx.textAlign = 'center';
      ctx.fillText('H+', gx + gw / 2, gy - 8);

      if (frame % 6 === 0) {
        setGPct(Math.round(g * 100));
        setRpm(Math.round(turns * 10));
        setAtp(atpRef.current);
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const power = Math.min(100, Math.round((rpm / 130) * 100));

  return (
    <div className="w-full h-full flex flex-col" style={{ color: '#fff' }}>
      <div style={{ flex: 1, minHeight: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          aria-label="ATP synthase molecular turbine simulation"
          style={{ width: '100%', maxWidth: 640, height: 'auto', borderRadius: 14, background: '#0a1b30', boxShadow: '0 6px 24px rgba(0,0,0,0.35)' }}
        />
      </div>
      <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.96)', color: '#222' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 8 }}>
          <button onClick={pump} style={{ background: '#6b58e0', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontWeight: 700, cursor: 'pointer' }}>
            ⚡ Pump protons
          </button>
          <button onClick={toggleOxygen} style={{ background: oxygen ? '#0E7C86' : '#b00020', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontWeight: 700, cursor: 'pointer' }}>
            Oxygen: {oxygen ? 'ON' : 'OFF'}
          </button>
          <div style={{ flex: 1, minWidth: 140 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#E0552B' }}>Cellular power output</div>
            <div style={{ height: 10, borderRadius: 6, background: '#eee', overflow: 'hidden' }}>
              <div style={{ width: `${power}%`, height: '100%', background: 'linear-gradient(90deg,#0E7C86,#E0552B)', transition: 'width .2s' }} />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 14, fontWeight: 600, flexWrap: 'wrap' }}>
          <span>Gradient: {gPct}%</span>
          <span>Spin: ~{rpm}/sec</span>
          <span style={{ color: '#0E7C86' }}>ATP made: {atp}</span>
        </div>
        <div style={{ fontSize: 13, marginTop: 6, color: '#555' }}>
          {oxygen
            ? 'The pump builds protons behind the "dam"; they rush back through the turbine, spinning it to make ATP. Each engine is your cellular power — train to build MORE of them.'
            : 'No oxygen: the dam is draining, the turbine is stalling, ATP has flatlined. This is the wall you hit without air. Turn oxygen back on!'}
        </div>
      </div>
    </div>
  );
};

export default AtpSynthase;
