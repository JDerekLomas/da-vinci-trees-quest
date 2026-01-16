import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
  ResponsiveContainer,
} from 'recharts';
import { Star, TrajectoryAlignmentInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { BUTTON_STYLES } from '../../../constants/constants';
import './trajectory-alignment.css';
import { useEventListener } from '../../../hooks/useEventListener';

interface CustomSliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: number;
  onValueChange: (values: number[]) => void;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
}

const {
  classes: { common: ButtonCommonClasses, secondary: ButtonSecondaryClasses, primary: ButtonPrimaryClasses },
} = BUTTON_STYLES;

const Slider: React.FC<CustomSliderProps> = ({ value, onValueChange, min, max, step, disabled, ...props }) => {
  return (
    <div className="sliderContainer">
      <input
        type="range"
        value={value}
        onChange={(e) => {
          const newValue = parseFloat(e.target.value);
          onValueChange([newValue]);
        }}
        min={min}
        max={max}
        style={
          {
            '--value-percent': calculateSliderPercentage(value, min, max),
          } as React.CSSProperties
        }
        step={step}
        disabled={disabled}
        className="custom-slider-input"
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        {...props}
      />
    </div>
  );
};

const TrajectoryAlignment: React.FC<{
  interaction: TrajectoryAlignmentInteraction;
  onInteraction: (payload: any) => void;
}> = ({ interaction, onInteraction }) => {
  const [probeH, setProbeH] = useState(interaction.controls.h.defaultValue);
  const [probeK, setProbeK] = useState(interaction.controls.k.defaultValue);
  const [probeA, setProbeA] = useState(interaction.controls.a.defaultValue);
  const [probePosition, setProbePosition] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasHit, setHasHit] = useState(false);
  const [_, setAnimationStartTime] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [stars] = useState<Star[]>(() =>
    Array.from({ length: 100 }, () => ({
      x: Math.random() * 800,
      y: Math.random() * 400,
      size: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.5,
    })),
  );
  const animationRef = useRef<number | null>(null);
  const [hitMissAnimation, setHitMissAnimation] = useState<string | null>(null); // Added for hit/miss animation

  const { t } = useTranslations();

  const ANIMATION_DURATION = 3000; // 3 seconds

  const { payload } = useEventListener('trajectory-alignment');

  useEffect(() => {
    if (probeA === -0.1) {
      onInteraction({ 'trajectory-alignment-set-a': true });
    } else {
      onInteraction({ 'trajectory-alignment-set-a': false });
    }
  }, [probeA, onInteraction]);

  const [disableAandH, setDisableAandH] = useState(false);

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      const step = Number(payload.step);
      if (step === 1) {
        setProbeA(-0.1);
        setProbeH(25);
        setDisableAandH(true);
      } else {
        setDisableAandH(false);
      }
    }
  }, [payload]);

  const generatePoints = () => {
    const points = [];
    for (let x = 0; x <= 80; x += 0.5) {
      const probeY = probeA * Math.pow(x - probeH, 2) + probeK;
      points.push({
        x,
        probe: probeY >= 0 ? probeY : null,
      });
    }
    return points;
  };
  const points = generatePoints();

  const evaluateY = useCallback(
    (x: number) => probeA * Math.pow(x - probeH, 2) + probeK,
    [probeA, probeH, probeK],
  );

  const getTrajectoryStartPoint = useCallback(() => {
    const yAtZero = evaluateY(0);
    if (yAtZero >= 0) {
      return { x: 0, y: yAtZero };
    }

    if (probeA === 0) {
      return { x: 0, y: probeK };
    }

    const discriminant = -probeK / probeA;
    if (discriminant < 0) {
      return { x: 0, y: yAtZero };
    }

    const sqrtDiscriminant = Math.sqrt(discriminant);
    const x1 = probeH - sqrtDiscriminant;
    const x2 = probeH + sqrtDiscriminant;

    if (x1 >= 0 && x1 <= 80) {
      return { x: x1, y: 0 };
    } else if (x2 >= 0 && x2 <= 80) {
      return { x: x2, y: 0 };
    } else {
      return { x: 0, y: yAtZero };
    }
  }, [evaluateY, probeA, probeH, probeK]);
  const xIntercepts =
    probeA === 0
      ? probeK === 0
        ? t('scenes.common.infinite_solution')
        : t('scenes.common.no_solution')
      : (() => {
          const discriminant = -probeK / probeA;
          if (discriminant < 0) {
            return t('scenes.common.no_solution');
          }
          return [probeH + Math.sqrt(discriminant), probeH - Math.sqrt(discriminant)];
        })();

  const validateTrajectory = useCallback(() => {
    const targetY = evaluateY(50);
    const tolerance = 0.5;

    if (Array.isArray(xIntercepts)) {
      const hasCorrectIntercept = xIntercepts.some((x) => Math.abs(x - 50) < tolerance);
      return Math.abs(targetY) < tolerance && hasCorrectIntercept;
    }

    return Math.abs(targetY) < tolerance;
  }, [evaluateY, xIntercepts]);

  const resetAnimation = useCallback(() => {
    setIsAnimating(false);
    setHasHit(false);
    setProbePosition(null);
    setFeedback(null);
    setAnimationStartTime(null);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setHitMissAnimation(null);
  }, []);

  const startAnimation = () => {
    if (isAnimating) return;

    resetAnimation();
    setIsAnimating(true);
    setAnimationStartTime(Date.now());
    setFeedback(null);

    let startTime: number | null = null;

    const animate = (timestamp: number): void => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / ANIMATION_DURATION, 1);

      // Calculate current position along trajectory
      const currentX = progress * 80; // Move from 0 to 80
      const currentY = evaluateY(currentX);

      if (currentY >= 0) {
        setProbePosition(currentX);

        // Check if we hit the target (x=50, y≈0)
        if (Math.abs(currentX - 50) < 1 && validateTrajectory()) {
          setHasHit(true);
          setProbePosition(50);
          setIsAnimating(false);
          setFeedback({
            type: 'success',
            message: t(interaction.status.perfect),
          });
          setHitMissAnimation('hit');
          setTimeout(() => setHitMissAnimation(null), 2000);
          return;
        }
      } else {
        // Probe went below ground
        setIsAnimating(false);
        setProbePosition(null);
        setFeedback({
          type: 'error',
          message: interaction.status.targetBelowLevel,
        });
        return;
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setProbePosition(null);

        if (validateTrajectory()) {
          setFeedback({
            type: 'success',
            message: t(interaction.status.perfect),
          });
          setHitMissAnimation('hit');
          setTimeout(() => setHitMissAnimation(null), 2000);
        } else {
          setFeedback({
            type: 'error',
            message: t(interaction.status.keepAdjusting),
          });
          setHitMissAnimation('miss');
          setTimeout(() => setHitMissAnimation(null), 2000);
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    resetAnimation();
  }, [probeA, probeH, probeK, resetAnimation]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto bg-slate-900 text-white p-3 sm:p-6 rounded-2xl" role="region">
      <h2 className="text-lg sm:text-xl font-bold mb-3 text-white">{t(interaction.heading)}</h2>
      <div className="space-y-4">
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 p-2"
          role="group"
          aria-label={t(interaction.inputGroupLabel)}
        >
          <div className="space-y-1 bg-slate-800/40 p-3 sm:p-4 rounded-xl">
            <div aria-live="off">
              <label className="text-sm sm:text-base font-medium text-white" htmlFor="slider-a">
                <span className="text-sm sm:text-base">{` ${t(interaction.controls.a.description)}`}</span>(
                <em className="font-[Besley,serif] text-[#C084FC]">a</em>)
              </label>
              <span className="text-sm sm:text-base text-white">{`: ${probeA.toFixed(3)}`}</span>
            </div>
            <Slider
              id="slider-a"
              min={interaction.controls.a.min}
              max={interaction.controls.a.max}
              step={interaction.controls.a.step}
              value={probeA}
              onValueChange={(val) => setProbeA(val[0])}
              disabled={isAnimating || disableAandH}
              aria-valuetext={`${t(interaction.controls.a.description)}: ${probeA.toFixed(3)}`}
            />
          </div>

          <div className="space-y-1 bg-slate-800/40 p-3 sm:p-4 rounded-xl">
            <div aria-live="off">
              <label className="text-sm sm:text-base font-medium text-white" htmlFor="slider-h">
                <span className="text-sm sm:text-base">{` ${t(interaction.controls.h.description)}`}</span>(
                <em className="font-[Besley,serif] text-[#FB7185]">h</em>)
              </label>
              <span className="text-sm sm:text-base text-white">{`: ${probeH.toFixed(1)}`}</span>
            </div>
            <Slider
              id="slider-h"
              min={interaction.controls.h.min}
              max={interaction.controls.h.max}
              step={interaction.controls.h.step}
              value={probeH}
              onValueChange={(val) => setProbeH(val[0])}
              disabled={isAnimating || disableAandH}
              aria-valuetext={`${t(interaction.controls.h.description)}: ${probeH.toFixed(1)}`}
            />
          </div>

          <div className="space-y-1 bg-slate-800/40 p-3 sm:p-4 rounded-xl">
            <div aria-live="off">
              <label className="text-sm sm:text-base font-medium text-white" htmlFor="slider-k">
                <span className="text-sm sm:text-base">{` ${t(interaction.controls.k.description)}`}</span>(
                <em className="font-[Besley,serif] text-[#34D399]">k</em>)
              </label>
              <span className="text-sm sm:text-base text-white">{`: ${probeK.toFixed(1)}`}</span>
            </div>
            <Slider
              id="slider-k"
              min={interaction.controls.k.min}
              max={interaction.controls.k.max}
              step={interaction.controls.k.step}
              value={probeK}
              onValueChange={(val) => setProbeK(val[0])}
              disabled={isAnimating}
              aria-valuetext={`${t(interaction.controls.k.description)}: ${probeK.toFixed(1)}`}
            />
          </div>
        </div>

        <div className="py-2 px-2 sm:px-10 w-full lg:w-auto">
          <h2
            className="text-base sm:text-lg font-bold text-center flex flex-wrap items-center justify-center gap-1 text-white"
            style={{
              fontFamily: 'Besley, serif',
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              lineHeight: '1.5rem',
              fontWeight: 500,
            }}
            aria-label={`${t('equation.yEquals')} ${probeA.toFixed(3)} ${t('equation.times')} ${t(
              'equation.openParen',
            )} x ${probeH >= 0 ? t('equation.minus') : t('equation.plus')} ${Math.abs(probeH).toFixed(
              1,
            )} ${t('equation.closeParen')} ${t('equation.squared')} ${t('equation.plus')} ${probeK.toFixed(1)}`}
          >
            <em className="text-[#F87171]">y</em>
            <span> = </span>
            <span className="text-[#C084FC]">{probeA.toFixed(3)}</span>
            <span>(</span>
            <em className="text-[#60A5FA]">x</em>
            <span> - </span>
            <span className="text-[#FB7185]">{probeH.toFixed(1)}</span>
            <span>)</span>
            <span className="text-[#FB7185]">²</span>
            <span> + </span>
            <span className="text-[#34D399]">{probeK.toFixed(1)}</span>
          </h2>
        </div>

        {/* Launch and Reset Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-3" role="group">
            <button
              style={BUTTON_STYLES.base}
              onClick={startAnimation}
              disabled={isAnimating || hasHit}
              className={`${ButtonCommonClasses} ${
                isAnimating || hasHit ? ButtonPrimaryClasses.disabled : ButtonPrimaryClasses.enabled
              } text-sm sm:text-base px-4 sm:px-6 py-2`}
            >
              <span aria-live="polite">{t(interaction.labels.start as string)}</span>
            </button>

            <button
              style={BUTTON_STYLES.base}
              onClick={resetAnimation}
              disabled={isAnimating}
              className={`${ButtonCommonClasses} ${
                isAnimating ? ButtonSecondaryClasses.disabled : ButtonSecondaryClasses.enabled
              } text-sm sm:text-base px-4 sm:px-6 py-2`}
            >
              {t(interaction.labels.reset)}
            </button>
          </div>{' '}
          <div className="text-sm sm:text-base text-white text-center sm:text-right">
            <div className="text-cyan-300">
              Probe Initial Point: ({getTrajectoryStartPoint().x.toFixed(1)}ft,{' '}
              {getTrajectoryStartPoint().y.toFixed(1)}ft)
            </div>
            <div>Target: (50ft, 0ft)</div>
            {probePosition !== null && (
              <div className="text-amber-300">
                Probe Position: ({probePosition.toFixed(1)}ft, {evaluateY(probePosition).toFixed(1)}ft)
              </div>
            )}
            <p className="text-sm sm:text-base text-white" aria-live="polite">
              {t(interaction.xIntercepts)}: (
              {Array.isArray(xIntercepts) ? (
                <>
                  <span className="text-[#60A5FA] font-bold">{xIntercepts[0].toFixed(2)}</span>,{' '}
                  <span className="text-[#60A5FA] font-bold">{xIntercepts[1].toFixed(2)}</span>
                </>
              ) : (
                <span className="text-[#60A5FA]">{t(String(xIntercepts))}</span>
              )}
              )
            </p>
          </div>
        </div>

        <div className="p-2 max-w-3xl mx-auto">
          <div className="relative w-full h-[300px] bg-[#0A1324] rounded-2xl overflow-hidden">
            {/* Stars background */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {stars.map((star, i) => (
                <circle
                  key={`star-${i}`}
                  cx={`${(star.x / 800) * 100}%`}
                  cy={`${(star.y / 400) * 100}%`}
                  r={star.size}
                  fill="white"
                  opacity={star.opacity}
                />
              ))}
            </svg>
            {/* Simple Hit/Miss text overlay - positioned over the graph */}
            {hitMissAnimation && (
              <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none simple-text-overlay">
                <div
                  className={`text-6xl font-bold ${
                    hitMissAnimation === 'hit' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {hitMissAnimation === 'hit' ? t(interaction.labels.hit) : t(interaction.labels.miss)}
                </div>
              </div>
            )}

            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={points}
                margin={{ top: 10, bottom: 20 }}
                role="img"
                aria-label={t(interaction.graph.ariaDescription)}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="x"
                  domain={[interaction.graph.axis.x.min, interaction.graph.axis.x.max]}
                  ticks={interaction.graph.axis.x.ticks}
                  type="number"
                  label={{ value: t(interaction.graph.axis.x.label), position: 'bottom', offset: 0 }}
                  fontSize={12}
                  aria-label={t(interaction.graph.axis.x.ariaLabel)}
                  role="img"
                  tick={{ fill: '#e2e8f0' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis
                  domain={[interaction.graph.axis.y.min, interaction.graph.axis.y.max]}
                  ticks={interaction.graph.axis.y.ticks}
                  type="number"
                  label={{ value: t(interaction.graph.axis.y.label), angle: -90, position: 'insideLeft' }}
                  fontSize={12}
                  aria-label={t(interaction.graph.axis.y.ariaLabel)}
                  role="img"
                  tick={{ fill: '#e2e8f0' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip
                  formatter={(value: number) => [
                    `${t(interaction.graph.axis.y.var)} : ${value.toFixed(1)} ${interaction.graph.tooltip.unit}`,
                  ]}
                  labelFormatter={(value: number) => [
                    `${t(interaction.graph.axis.x.var)} : ${value.toFixed(1)} ${interaction.graph.tooltip.unit}`,
                  ]}
                  label={t(interaction.graph.axis.x.label)}
                  aria-label={t(interaction.graph.tooltip.ariaLabel)}
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#e2e8f0',
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Line
                  type="monotone"
                  dataKey="probe"
                  stroke="#60A5FA"
                  name={interaction.graph.line.name}
                  strokeWidth={interaction.graph.line.width}
                  strokeDasharray={hasHit ? 'none' : '5,5'}
                  opacity={hasHit ? '1' : '0.5'}
                  dot={false}
                  isAnimationActive={false}
                  connectNulls
                />

                {/* Enhanced Target */}
                <ReferenceDot
                  x={50}
                  y={0}
                  r={8}
                  fill={hasHit ? '#4ADE80' : '#EF4444'}
                  stroke="white"
                  strokeWidth="2"
                  role="img"
                  aria-label="Target point at (50,0)"
                />

                {/* Simple flying probe - only visible when animating */}
                {isAnimating && probePosition !== null && (
                  <ReferenceDot
                    x={probePosition}
                    y={evaluateY(probePosition)}
                    r={4}
                    fill="#fbbf24"
                    stroke="#e59e0b"
                    strokeWidth="2"
                    role="img"
                    aria-label={`Probe at (${probePosition.toFixed(1)}, ${evaluateY(probePosition).toFixed(1)})`}
                  />
                )}

                {/* Static Probe at Origin - Always visible */}
                <g transform="translate(70, 210)">
                  {/* Main Probe Body - Much larger and more visible */}
                  <ellipse cx="0" cy="0" rx="25" ry="15" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="3" />

                  {/* Command Module */}
                  <ellipse cx="15" cy="-3" rx="8" ry="6" fill="#fbbf24" stroke="#e59e0b" strokeWidth="2" />

                  {/* Service Module */}
                  <ellipse cx="-15" cy="0" rx="6" ry="8" fill="#64748b" stroke="#475569" strokeWidth="2" />

                  {/* Landing Legs - More prominent */}
                  <g stroke="#94a3b8" strokeWidth="4" fill="none">
                    <path d="M -12 10 L -25 35 L -30 35" />
                    <path d="M 12 10 L 25 35 L 30 35" />
                    <path d="M 0 12 L 0 35 L -5 35 L 5 35" />
                  </g>

                  {/* Landing Pads - Larger and more visible */}
                  <circle cx="-27" cy="35" r="5" fill="#475569" stroke="#334155" strokeWidth="2" />
                  <circle cx="27" cy="35" r="5" fill="#475569" stroke="#334155" strokeWidth="2" />
                  <circle cx="0" cy="35" r="5" fill="#475569" stroke="#334155" strokeWidth="2" />

                  {/* Antenna Array */}
                  <line x1="0" y1="-15" x2="0" y2="-30" stroke="#fbbf24" strokeWidth="3" />
                  <circle cx="0" cy="-30" r="4" fill="#fbbf24" stroke="#e59e0b" strokeWidth="2" />

                  {/* Side Antennas */}
                  <line x1="-8" y1="-10" x2="-15" y2="-20" stroke="#fbbf24" strokeWidth="2" />
                  <line x1="8" y1="-10" x2="15" y2="-20" stroke="#fbbf24" strokeWidth="2" />
                  <circle cx="-15" cy="-20" r="2" fill="#fbbf24" />
                  <circle cx="15" cy="-20" r="2" fill="#fbbf24" />

                  {/* Thruster Nozzles - More detailed */}
                  <ellipse cx="-20" cy="12" rx="4" ry="2" fill="#374151" stroke="#1f2937" strokeWidth="1" />
                  <ellipse cx="20" cy="12" rx="4" ry="2" fill="#374151" stroke="#1f2937" strokeWidth="1" />
                  <ellipse cx="0" cy="15" rx="3" ry="1.5" fill="#374151" stroke="#1f2937" strokeWidth="1" />

                  {/* Solar Panels */}
                  <rect
                    x="-35"
                    y="-8"
                    width="12"
                    height="16"
                    fill="#1e40af"
                    stroke="#1d4ed8"
                    strokeWidth="2"
                    rx="2"
                  />
                  <rect
                    x="23"
                    y="-8"
                    width="12"
                    height="16"
                    fill="#1e40af"
                    stroke="#1d4ed8"
                    strokeWidth="2"
                    rx="2"
                  />

                  {/* Solar Panel Details */}
                  <g stroke="#3b82f6" strokeWidth="1">
                    <line x1="-31" y1="-6" x2="-31" y2="6" />
                    <line x1="-27" y1="-6" x2="-27" y2="6" />
                    <line x1="27" y1="-6" x2="27" y2="6" />
                    <line x1="31" y1="-6" x2="31" y2="6" />
                  </g>

                  {/* Window/Viewport */}
                  <circle cx="18" cy="-5" r="3" fill="#60a5fa" stroke="#3b82f6" strokeWidth="2" opacity="0.8" />

                  {/* Status Lights */}
                  <circle cx="-5" cy="8" r="1.5" fill="#10b981" opacity="0.9">
                    <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="5" cy="8" r="1.5" fill="#f59e0b" opacity="0.9">
                    <animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </g>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status and Feedback */}
        <div className="space-y-2">
          {feedback && (
            <div
              className={`py-2 text-center px-3 rounded-md ${
                feedback.type === 'success'
                  ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-500/30'
                  : 'bg-red-900/40 text-red-300 border border-red-500/30'
              }`}
              role="alert"
              aria-live="polite"
            >
              {t(feedback.message)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function calculateSliderPercentage(value: number, min: number, max: number): string {
  return `${((value - min) / (max - min)) * 100}%`;
}

export default TrajectoryAlignment;
