import React, { useState, useEffect, useCallback } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import './quadratic-visualizer.css';
import { useTranslations } from '../../../hooks/useTranslations';
import { QuadraticVisualizerInteraction, Star } from './interface';
import { BUTTON_STYLES } from '../../../constants/constants';

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

const QuadraticVisualizer: React.FC<{
  interaction: QuadraticVisualizerInteraction;
}> = ({ interaction }) => {
  const [a, setA] = useState(interaction.aCoefficient.default);
  const [x1, setX1] = useState(interaction.roots.defaultX1); // First root
  const [x2, setX2] = useState(interaction.roots.defaultX2); // Second root
  const [probePosition, setProbePosition] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
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
  const [animationStartTime, setAnimationStartTime] = useState<number | null>(null);
  const [hitMissAnimation, setHitMissAnimation] = useState<string | null>(null); // Added for hit/miss animation
  const { t } = useTranslations();

  // Calculate b and c from roots and a
  const b = -a * (x1 + x2);
  const c = a * x1 * x2;

  // Function to evaluate y for any x
  const evaluateY = useCallback((x: number) => a * x * x + b * x + c, [a, b, c]);

  // Generate points for the quadratic curve
  const points = React.useMemo(() => {
    const data = [];
    for (let x = -10; x <= 80; x += 0.5) {
      data.push({ x, y: evaluateY(x) });
    }
    return data;
  }, [evaluateY]);

  // Find roots (where y = 0)
  const findRoots = useCallback(() => {
    if (x1 === x2) {
      return [x1];
    }
    return [x1, x2].sort((a, b) => a - b);
  }, [x1, x2]);

  // Check if curve passes through required points
  const validateTrajectory = useCallback(() => {
    const startY = Math.abs(evaluateY(0));
    const endY = Math.abs(evaluateY(50));
    const tolerance = interaction.tolerance;
    return startY < tolerance && endY < tolerance;
  }, [evaluateY, interaction.tolerance]);

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      if (!isAnimating || !animationStartTime) return;

      const elapsed = Date.now() - animationStartTime;
      const duration = interaction.animationDuration; // 2 seconds
      const progress = Math.min(elapsed / duration, 1);

      const roots = findRoots();
      if (roots.length >= 2) {
        const startX = points[0].x;
        const endX = points[points.length - 1].x;
        const currentX = startX + (endX - startX) * progress;
        setProbePosition(currentX);

        if (progress < 1) {
          animationId = requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
          setAnimationStartTime(null);
          setProbePosition(null);

          if (validateTrajectory()) {
            setFeedback({
              type: 'success',
              message: t(interaction.feedback.success),
            });
            setHitMissAnimation('hit');
            setTimeout(() => setHitMissAnimation(null), 2000);
          } else {
            setFeedback({
              type: 'error',
              message: t(interaction.feedback.error.invalidTrajectory),
            });
            setHitMissAnimation('miss');
            setTimeout(() => setHitMissAnimation(null), 2000);
          }
        }
      }
    };

    if (isAnimating) {
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [
    isAnimating,
    animationStartTime,
    points,
    interaction.animationDuration,
    interaction.feedback.success,
    interaction.feedback.error.invalidTrajectory,
    findRoots,
    validateTrajectory,
    t,
  ]);

  const resetSimulation = useCallback(() => {
    const roots = findRoots();
    if (roots.length >= 1) {
      setProbePosition(null);
    }
    setFeedback(null);
    setIsAnimating(false);
    setAnimationStartTime(null);
    setHitMissAnimation(null);
  }, [findRoots]);

  const startAnimation = () => {
    const roots = findRoots();
    if (roots.length < 2) {
      setFeedback({
        type: 'error',
        message: t(interaction.feedback.error.needTwoRoots),
      });
      return;
    }

    setProbePosition(roots[0]);
    setIsAnimating(true);
    setAnimationStartTime(Date.now());
    setFeedback(null);
  };

  useEffect(() => {
    resetSimulation();
  }, [a, resetSimulation, x1, x2]);

  return (
    <div className="w-full max-w-5xl mx-auto bg-slate-900 text-white p-6 rounded-2xl" role="region">
      <div className="space-y-2">
        {' '}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-2 pl-0"
          role="group"
          aria-label={t(interaction.aria.controls)}
        >
          <div className="space-y-2 bg-slate-800/40 p-4 rounded-xl">
            <div aria-live="off">
              <label className="text-m font-medium text-white" htmlFor="slider-a">
                {t(interaction.controls.parabolaOpening)} (
                <em className="text-[#C084FC] font-[Besley,serif]">a</em>)
              </label>
              <span className="text-white">: {a.toFixed(3)}</span>
            </div>
            <Slider
              id="slider-a"
              value={a}
              onValueChange={([val]) => setA(val)}
              min={interaction.aCoefficient.min}
              max={interaction.aCoefficient.max}
              step={interaction.aCoefficient.step}
              aria-valuetext={`${t(interaction.controls.parabolaOpening)}: ${a.toFixed(3)}`}
            />{' '}
          </div>

          <div className="space-y-2 bg-slate-800/40 p-4 rounded-xl">
            <div aria-live="off">
              <label className="text-m font-medium text-white" htmlFor="slider-x1">
                {t(interaction.controls.firstRoot)} (
                <em className="text-[#FB7185] font-[Besley,serif]">
                  x<sub>1</sub>
                </em>
                )
              </label>
              <span className="text-white">: {x1.toFixed(1)}ft</span>
            </div>
            <Slider
              id="slider-x1"
              value={x1}
              onValueChange={([val]) => setX1(val)}
              min={interaction.roots.min}
              max={interaction.roots.max}
              step={interaction.roots.step}
              aria-valuetext={`${t(interaction.controls.firstRoot)}: ${x1.toFixed(1)}ft`}
            />{' '}
          </div>

          <div className="space-y-2 bg-slate-800/40 p-4 rounded-xl">
            <div aria-live="off">
              <label className="text-m font-medium text-white" htmlFor="slider-x2">
                {t(interaction.controls.secondRoot)} (
                <em className="text-[#60A5FA] font-[Besley,serif]">
                  x<sub>2</sub>
                </em>
                )
              </label>
              <span className="text-white">: {x2.toFixed(1)}ft</span>
            </div>
            <Slider
              id="slider-x2"
              value={x2}
              onValueChange={([val]) => setX2(val)}
              min={interaction.roots.min}
              max={interaction.roots.max}
              step={interaction.roots.step}
              aria-valuetext={`${t(interaction.controls.secondRoot)}: ${x2.toFixed(1)}ft`}
            />
          </div>
        </div>
        <div className="sr-only">
          {`
                            ${t('equation.yEquals')} 
                            ${a >= 0 ? a.toFixed(3) : `${t('equation.qty')} ${a.toFixed(3)}`}
                            ${t('equation.times')} 
                            ${t('equation.qty')} x ${x1 >= 0 ? t('equation.minus') : t('equation.plus')
            } ${Math.abs(x1).toFixed(1)}
                            ${t('equation.times')} 
                            ${t('equation.qty')} x ${x2 >= 0 ? t('equation.minus') : t('equation.plus')
            } ${Math.abs(x2).toFixed(1)}
                        `}
        </div>{' '}
        <p
          className="text-2xl font-semibold font-[Besley,serif] leading-[2rem] text-center py-3 text-white"
          aria-hidden="true"
        >
          <em className="text-[#F87171]">y</em>
          <span> = </span>
          <span className="text-[#C084FC]">{a >= 0 ? a.toFixed(3) : `(${a.toFixed(3)})`}</span>
          <span> (</span>
          <em className="text-[#60A5FA]">x</em>
          <span> {x1 >= 0 ? '−' : '+'} </span>
          <span className="text-[#FB7185]">{Math.abs(x1).toFixed(1)}</span>
          <span>) (</span>
          <em className="text-[#60A5FA]">x</em>
          <span> {x2 >= 0 ? '−' : '+'} </span>
          <span className="text-[#60A5FA]">{Math.abs(x2).toFixed(1)}</span>
          <span>)</span>
        </p>
        <div className="flex lg:flex-row flex-col lg:gap-0 gap-3 justify-between items-center py-2">
          <div className="flex gap-3" role="group">
            <button
              style={BUTTON_STYLES.base}
              onClick={startAnimation}
              disabled={isAnimating || !!feedback}
              className={`${ButtonCommonClasses} ${isAnimating || !!feedback ? ButtonPrimaryClasses.disabled : ButtonPrimaryClasses.enabled
                }`}
              aria-label={t(interaction.aria.launchButton)}
            >
              {t(interaction.buttons.launchProbe)}
            </button>
            <button
              style={BUTTON_STYLES.base}
              onClick={resetSimulation}
              className={`${ButtonCommonClasses} ${isAnimating ? ButtonSecondaryClasses.disabled : ButtonSecondaryClasses.enabled
                }`}
              disabled={isAnimating}
              aria-label={t(interaction.aria.resetButton)}
            >
              {t(interaction.buttons.resetProbe)}
            </button>
          </div>{' '}
          <p className="text-m text-white">
            {t(interaction.instruction)}
            <br />
            <span aria-live="polite">
              {t(interaction.currentPoints)}: (<span className="text-[#FB7185]">{x1.toFixed(1)}</span>ft, 0ft), (
              <span className="text-[#60A5FA]">{x2.toFixed(1)}</span>ft, 0ft)
            </span>
            <br />
            {t(interaction.description)}
          </p>
        </div>{' '}
        <div className="w-full h-[20rem] pt-3 relative" role="img" aria-label="Trajectory graph visualization">
          {/* Simple Hit/Miss text overlay - positioned over the graph */}
          {hitMissAnimation && (
            <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none simple-text-overlay">
              <div className={`text-6xl font-bold ${hitMissAnimation === 'hit'
                ? 'text-green-400'
                : 'text-red-400'
                }`}>
                {hitMissAnimation === 'hit' ? t(interaction.feedback.hit) : t(interaction.feedback.miss)}
              </div>
            </div>
          )}

          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={points}
              margin={{ top: 10, right: 30, bottom: 20, left: 10 }}
              className="bg-[#0A1324] rounded-2xl"
            >
              <defs>
                <radialGradient id="earthGradient">
                  <stop offset="0%" stopColor="#4B91F1" />
                  <stop offset="100%" stopColor="#1D4ED8" />
                </radialGradient>
              </defs>

              {/* Stars Background */}
              {stars.map((star, i) => (
                <circle
                  key={`star-${i}`}
                  cx={star.x}
                  cy={star.y}
                  r={star.size}
                  fill="white"
                  opacity={star.opacity}
                />
              ))}
              <CartesianGrid stroke="#334155" />
              <XAxis
                dataKey="x"
                domain={[interaction.xAxisMin, interaction.xAxisMax]}
                type="number"
                tickCount={16}
                allowDataOverflow={true}
                tickFormatter={(value) => `${value}`}
                label={{
                  value: t(interaction.graph.xAxisLabel),
                  position: 'bottom',
                }}
                tick={{ fill: '#e2e8f0' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis
                domain={[interaction.yAxisMin, interaction.yAxisMax]}
                tickCount={14}
                tickFormatter={(value) => `${value}`}
                allowDataOverflow={true}
                label={{
                  value: t(interaction.graph.yAxisLabel),
                  angle: -90,
                  position: 'insideLeft',
                }}
                tick={{ fill: '#e2e8f0' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />{' '}
              <Tooltip
                formatter={(value: number) => [`${value.toFixed(1)}ft`, t(interaction.graph.tooltipHeight)]}
                labelFormatter={(value: number) => `${t(interaction.graph.tooltipDistance)}: ${value}ft`}
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <ReferenceLine y={0} stroke="#e2e8f0" strokeWidth={1} />
              <Line
                type="monotone"
                dataKey="y"
                stroke="#60A5FA"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                isAnimationActive={false}
              />
              <ReferenceDot
                x={0}
                y={0}
                r={6}
                fill="#34D399"
                stroke="none"
                role="img"
                aria-label={t(interaction.points.launchPoint)}
              />
              <ReferenceDot
                x={50}
                y={0}
                r={6}
                fill="#EF4444"
                stroke="none"
                role="img"
                aria-label={t(interaction.points.targetPoint)}
              />
              {probePosition !== null && (
                <ReferenceDot
                  x={probePosition}
                  y={evaluateY(probePosition)}
                  r={4}
                  fill="#FBBF24"
                  stroke="none"
                  role="img"
                  aria-label={`${t(interaction.points.probePosition)} (${probePosition.toFixed(1)}, ${evaluateY(
                    probePosition,
                  ).toFixed(1)})`}
                />
              )}
              {/* Static Probe at Origin - Always visible */}
              <g transform="translate(170, 155)">
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
                <rect x="-35" y="-8" width="12" height="16" fill="#1e40af" stroke="#1d4ed8" strokeWidth="2" rx="2" />
                <rect x="23" y="-8" width="12" height="16" fill="#1e40af" stroke="#1d4ed8" strokeWidth="2" rx="2" />

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
        </div>{' '}
        <div
          className={`py-2 text-center px-3 rounded-md ${feedback
              ? feedback.type === 'success'
                ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-500/30'
                : 'bg-red-900/40 text-red-300 border border-red-500/30'
              : 'h-10'
            }`}
          role="alert"
          aria-live="polite"
        >
          {feedback && feedback.message}
        </div>
      </div>
    </div>
  );
};

function calculateSliderPercentage(value: number, min: number, max: number): string {
  return `${((value - min) / (max - min)) * 100}%`;
}

export default QuadraticVisualizer;
