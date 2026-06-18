import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AxonalTransportInteraction, InteractionState } from './interface';

interface Props {
  interaction: AxonalTransportInteraction;
  interactionState?: InteractionState;
  onInteraction: (state: InteractionState) => void;
  onSubmit?: () => void;
  isSubmitTriggered?: boolean;
}

// "Mitochondrial railroad": neurons truck mitochondria down a long axon to
// keep distant synapses powered. Dispatch a mitochondrion, watch a motor
// protein carry it right along the microtubule track, and refill synapses
// before their energy browns out.
const W = 560;
const H = 300;
const BODY_X = 70;
const BODY_Y = H / 2;
const BODY_R = 46;
const TRACK_Y = H / 2;
const TRACK_START = BODY_X + BODY_R;
const TRACK_END = W - 40;
const SYNAPSE_COUNT = 3;
const CARGO_SPEED = 150; // px/sec

interface Cargo {
  x: number;
  target: number; // index of synapse being driven toward
  arrived: boolean;
}

// Vertical fan of synapses clustered at the far terminal.
const synapsePos = (i: number): { x: number; y: number } => ({
  x: TRACK_END + 18,
  y: TRACK_Y + (i - (SYNAPSE_COUNT - 1) / 2) * 60,
});

const AxonalTransport: React.FC<Props> = ({ onInteraction }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const reportedRef = useRef(false);

  const energyRef = useRef<number[]>(Array(SYNAPSE_COUNT).fill(0.7));
  const cargoRef = useRef<Cargo[]>([]);
  const nextTargetRef = useRef(0);

  const [poweredCount, setPoweredCount] = useState(SYNAPSE_COUNT);
  const [delivered, setDelivered] = useState(0);

  const sendMitochondrion = useCallback(() => {
    // Aim at the most-depleted synapse (where calcium "stop" demand is high).
    let target = 0;
    let lowest = Infinity;
    energyRef.current.forEach((e, i) => {
      if (e < lowest) {
        lowest = e;
        target = i;
      }
    });
    nextTargetRef.current = target;
    cargoRef.current.push({ x: TRACK_START, target, arrived: false });
    if (!reportedRef.current) {
      reportedRef.current = true;
      onInteraction({ isCorrect: true, isEmpty: false, value: 'dispatched-mitochondrion' });
    }
  }, [onInteraction]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let last = 0;
    let frame = 0;

    const draw = (t: number): void => {
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016;
      last = t;
      frame++;

      // --- physics: synapses constantly drain energy ---
      for (let i = 0; i < SYNAPSE_COUNT; i++) {
        energyRef.current[i] = Math.max(0, energyRef.current[i] - dt * 0.045);
      }

      // move cargo along the track toward its synapse
      const survivors: Cargo[] = [];
      cargoRef.current.forEach((c) => {
        const dest = synapsePos(c.target);
        c.x += CARGO_SPEED * dt;
        if (c.x >= dest.x - 6) {
          // parked by a calcium stop-signal: refill the hungry synapse
          energyRef.current[c.target] = Math.min(1, energyRef.current[c.target] + 0.55);
          c.arrived = true;
          setDelivered((d) => d + 1);
        }
        if (!c.arrived) survivors.push(c);
      });
      cargoRef.current = survivors;

      // --- render ---
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0b0a18';
      ctx.fillRect(0, 0, W, H);

      // axon microtubule "railroad" track
      ctx.strokeStyle = '#5a5a6e';
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(TRACK_START, TRACK_Y);
      ctx.lineTo(TRACK_END, TRACK_Y);
      ctx.stroke();
      // rail crossties to evoke a track
      ctx.strokeStyle = '#3c3c4e';
      ctx.lineWidth = 2;
      for (let x = TRACK_START; x < TRACK_END; x += 22) {
        ctx.beginPath();
        ctx.moveTo(x, TRACK_Y - 9);
        ctx.lineTo(x, TRACK_Y + 9);
        ctx.stroke();
      }

      // cell body (soft purple neuron) with a few dendrites
      ctx.strokeStyle = '#9b7fd4';
      ctx.lineWidth = 4;
      for (let i = 0; i < 5; i++) {
        const a = Math.PI * 0.65 + (i / 4) * Math.PI * 0.7;
        ctx.beginPath();
        ctx.moveTo(BODY_X, BODY_Y);
        ctx.lineTo(BODY_X + Math.cos(a) * 70, BODY_Y + Math.sin(a) * 70);
        ctx.stroke();
      }
      ctx.fillStyle = '#7c5cc4';
      ctx.beginPath();
      ctx.arc(BODY_X, BODY_Y, BODY_R, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#b79ce6';
      ctx.beginPath();
      ctx.arc(BODY_X - 6, BODY_Y - 6, 16, 0, Math.PI * 2); // nucleus
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('cell body', BODY_X, BODY_Y + BODY_R + 14);

      // synapses with draining energy bars (green -> red), brown out at 0
      for (let i = 0; i < SYNAPSE_COUNT; i++) {
        const p = synapsePos(i);
        const e = energyRef.current[i];
        const lit = e > 0.02;
        // synapse terminal bulb
        ctx.fillStyle = lit ? '#9b7fd4' : '#4a4458';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 16, 0, Math.PI * 2);
        ctx.fill();
        if (lit) {
          ctx.fillStyle = `rgba(155,127,212,${0.18 + e * 0.25})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 16 + 8 * e, 0, Math.PI * 2);
          ctx.fill();
        }
        // energy bar
        const bw = 54;
        const bx = p.x - bw / 2;
        const by = p.y + 22;
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fillRect(bx, by, bw, 7);
        const hue = e * 120; // 0=red, 120=green
        ctx.fillStyle = `hsl(${hue},75%,50%)`;
        ctx.fillRect(bx, by, bw * e, 7);
        if (!lit) {
          ctx.fillStyle = '#e07a7a';
          ctx.font = 'bold 9px Arial';
          ctx.fillText('brownout', p.x, by + 20);
        }
      }
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = '10px Arial';
      ctx.fillText('synapses', synapsePos(0).x, 20);

      // cargo: motor-protein "truck" carrying a glowing mitochondrion
      cargoRef.current.forEach((c) => {
        // motor protein legs walking the track
        ctx.strokeStyle = '#cdc6ff';
        ctx.lineWidth = 2;
        const step = Math.sin(c.x * 0.4) * 4;
        ctx.beginPath();
        ctx.moveTo(c.x - 5, TRACK_Y);
        ctx.lineTo(c.x - 8, TRACK_Y + 8 + step);
        ctx.moveTo(c.x + 5, TRACK_Y);
        ctx.lineTo(c.x + 8, TRACK_Y + 8 - step);
        ctx.stroke();
        // glowing mitochondrion (teal core, orange rim)
        ctx.save();
        ctx.translate(c.x, TRACK_Y - 4);
        ctx.fillStyle = 'rgba(45,212,191,0.35)';
        ctx.beginPath();
        ctx.ellipse(0, 0, 16, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#2dd4bf';
        ctx.beginPath();
        ctx.ellipse(0, 0, 11, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#f59e42';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      });

      // HUD sync a few times per second
      if (frame % 6 === 0) {
        const powered = energyRef.current.filter((e) => e > 0.02).length;
        setPoweredCount(powered);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const allDim = poweredCount === 0;

  return (
    <div className="w-full h-full flex flex-col" style={{ color: '#fff' }}>
      <div style={{ flex: 1, minHeight: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          aria-label="Axonal transport: send mitochondria down the axon to power synapses"
          style={{ width: '100%', maxWidth: 560, height: 'auto', borderRadius: 12, background: '#0b0a18' }}
        />
      </div>
      <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.95)', color: '#222' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 8 }}>
          <button
            onClick={sendMitochondrion}
            style={{ background: '#2dd4bf', color: '#08312c', border: 'none', borderRadius: 8, padding: '8px 14px', fontWeight: 700, cursor: 'pointer' }}
          >
            🚚 Send mitochondrion
          </button>
          <span style={{ fontSize: 14, fontWeight: 700, color: poweredCount === SYNAPSE_COUNT ? '#0E7C86' : '#b00020' }}>
            Synapses powered: {poweredCount}/{SYNAPSE_COUNT}
          </span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Deliveries: {delivered}</span>
        </div>
        <div style={{ fontSize: 13, color: '#555' }}>
          {allDim
            ? 'All synapses have browned out! Dispatch mitochondria to re-power them — they park where calcium signals mark the highest energy demand.'
            : 'Each synapse slowly drains energy. Click “Send mitochondrion” — a motor protein trucks it down the microtubule track to refuel the hungriest synapse.'}
        </div>
        <div style={{ fontSize: 12, marginTop: 6, color: '#777' }}>
          Axons can stretch ~1 meter long, so neurons must actively haul mitochondria to distant synapses. The brain burns
          ~20% of the body’s energy — and when this delivery system fails, problems appear early in diseases like
          Alzheimer’s and Parkinson’s.
        </div>
      </div>
    </div>
  );
};

export default AxonalTransport;
