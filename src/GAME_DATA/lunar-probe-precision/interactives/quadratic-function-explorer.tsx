import React, { useState, useEffect, useRef, useCallback } from 'react';
import './quadratic-function-explorer.css';
import { useTranslations } from '../../../hooks/useTranslations';
import { QuadraticExplorerInteraction, Star } from './interface';
import { BUTTON_STYLES } from '../../../constants/constants';
import { useEventListener } from '../../../hooks/useEventListener';
interface Point {
  x: number;
  y: number;
}

interface CustomSliderProps {
  value: number;
  onValueChange: (values: number[]) => void;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
}

const {
  classes: { common: ButtonCommonClasses, secondary: ButtonSecondaryClasses, primary: ButtonPrimaryClasses },
} = BUTTON_STYLES;

const CustomSlider: React.FC<CustomSliderProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
  value,
  onValueChange,
  min,
  max,
  step,
  disabled,
  id,
  ...props
}) => {
  return (
    <div className="sliderContainer">
      <input
        id={id}
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
  interaction: QuadraticExplorerInteraction;
  onInteraction: (payload: any) => void;
}> = ({ interaction, onInteraction }) => {
  const [a, setA] = useState<number>(interaction.inputs[0].defaultValue);
  const [b, setB] = useState<number>(interaction.inputs[1].defaultValue);
  const [c, setC] = useState<number>(interaction.inputs[2].defaultValue);
  const [points, setPoints] = useState<Point[]>([]);
  const [animationPoints, setAnimationPoints] = useState<Point[]>([]);
  const [probePosition, setProbePosition] = useState<Point>({ x: 0, y: 0 });
  const [xIntercepts, setXIntercepts] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [hasHit, setHasHit] = useState<boolean>(false);
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
  const { payload } = useEventListener('quadratic-function-explorer');

  useEffect(() => {
    if (b === 1.0) {
      onInteraction({ 'quadratic-function-explorer-set-b': true });
    } else {
      onInteraction({ 'quadratic-function-explorer-set-b': false });
    }
  }, [b, onInteraction]);

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      const step = Number(payload.step);
      if (step === 1) {
        setB(1.0);
        setC(0);
        document.getElementById('slider-1')?.setAttribute('disabled', '');
        document.getElementById('slider-2')?.setAttribute('disabled', '');
      } else {
        document.getElementById('slider-1')?.removeAttribute('disabled');
        document.getElementById('slider-2')?.removeAttribute('disabled');
      }
    }
  }, [payload]);

  const {
    animation: { duration: ANIMATION_DURATION, pointDensity: POINT_DENSITY },
    xRange: X_RANGE,
    yRange: Y_RANGE,
    target: { x: TARGET_X, y: TARGET_Y },
  } = interaction;

  const calculateY = useCallback(
    (x: number, a: number, b: number, c: number): number => a * x * x + b * x + c,
    [],
  );

  const toSvgX = (x: number): number => (x / X_RANGE) * 800;
  const toSvgY = (y: number): number => 400 - (y / Y_RANGE) * 400;

  const isHit = (pos: Point): boolean => {
    return pos.y === TARGET_Y && pos.x === TARGET_X;
  };

  const resetAnimation = (): void => {
    if (hasHit) {
      setHasHit(false);
      setA(interaction.inputs[0].defaultValue);
      setB(interaction.inputs[1].defaultValue);
      setC(interaction.inputs[2].defaultValue);
    }
    setIsAnimating(false);
    const initialY = calculateY(0, a, b, c);
    setProbePosition({ x: 0, y: Math.max(0, initialY) });
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setHitMissAnimation(null);
  };

  const startAnimation = (): void => {
    if (isAnimating) return;

    resetAnimation();
    setIsAnimating(true);
    let startTime: number | null = null;
    let lastValidPosition: Point = { x: 0, y: calculateY(0, a, b, c) };

    const animate = (timestamp: number): void => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / ANIMATION_DURATION;

      if (progress < 1 && !hasHit) {
        const pointIndex = Math.min(
          Math.floor(progress * (1.5 * animationPoints.length)),
          animationPoints.length - 1,
        );
        const newPosition = animationPoints[pointIndex];

        if (isHit(newPosition)) {
          setHasHit(true);
          setProbePosition({ x: TARGET_X, y: TARGET_Y });
          setIsAnimating(false);
          setHitMissAnimation('hit');
          setTimeout(() => setHitMissAnimation(null), 2000);
          return;
        }

        if (newPosition.y >= 0) {
          setProbePosition(newPosition);
          lastValidPosition = newPosition;
        } else {
          setIsAnimating(false);
          setProbePosition({ x: lastValidPosition.x, y: 0 });
          setHitMissAnimation('miss');
          setTimeout(() => setHitMissAnimation(null), 2000);
          return;
        }

        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation completed without hitting target - show MISS animation
        setIsAnimating(false);
        if (!hasHit) {
          setHitMissAnimation('miss');
          setTimeout(() => setHitMissAnimation(null), 2000);
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };
  useEffect(() => {
    if (isAnimating) {
      return;
    }
    const currentXIntercepts = findXIntercepts(a, b, c);
    const calculatePoints = (): Point[] => {
      const points: Point[] = [];

      for (let i = 0; i <= POINT_DENSITY; i++) {
        const x = (i / POINT_DENSITY) * X_RANGE;
        const y = calculateY(x, a, b, c);
        points.push({ x, y });
      }

      /** Make sure the target coordinates are included in the points array
       *  if the target hit condition is satisfied. This check ensures the consistency with
       *  the values derived in currentXIntercepts.
       */
      if (Number(currentXIntercepts[0]) === TARGET_X && Number(currentXIntercepts[1]) === TARGET_Y) {
        for (let i = 0; i + 1 <= POINT_DENSITY; i++) {
          if (
            (points[i].x <= TARGET_X && points[i + 1].x > TARGET_X) ||
            (points[i].y >= TARGET_Y && points[i + 1].y < TARGET_Y)
          ) {
            points.splice(i + 1, 0, { x: TARGET_X, y: TARGET_Y });
          }
        }
      }
      return points;
    };

    const newPoints = calculatePoints();
    setPoints(newPoints);
    setAnimationPoints(newPoints);
    setXIntercepts(typeof currentXIntercepts === 'string' ? t(currentXIntercepts) : currentXIntercepts.join(', '));

    const currentX = probePosition.x;
    const newY = Math.max(0, calculateY(currentX, a, b, c));
    setProbePosition((prev) => ({ x: prev.x, y: newY }));
  }, [POINT_DENSITY, X_RANGE, a, b, c, calculateY, isAnimating, probePosition.x]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      className="w-full bg-slate-900 text-white p-3 sm:p-6 rounded-2xl"
      role="region"
      aria-label={t('Quadratic Function Explorer')}
    >
      <div>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6"
          role="group"
          aria-label={t(interaction.inputGroupLabel)}
        >
          {interaction.inputs.map((input, index) => (
            <div key={index} className="bg-slate-800/40 p-3 sm:p-4 rounded-xl">
              <div aria-live="off">
                <label className="text-sm sm:text-base font-medium text-white" htmlFor={`slider-${index}`}>
                  <span className="text-sm sm:text-base">{t(input.description)}</span>(
                  <em className="font-[Besley,serif] text-[#60A5FA]">{t(input.label)}</em>)
                </label>
                <span className="text-white">{`: ${[a, b, c][index].toFixed(index === 2 ? 0 : 3)}`}</span>
              </div>
              <CustomSlider
                id={`slider-${index}`}
                value={[a, b, c][index]}
                onValueChange={(v) => {
                  [setA, setB, setC][index](v[0]);
                  resetAnimation();
                }}
                min={input.min}
                max={input.max}
                step={input.step}
                disabled={isAnimating || hasHit}
                aria-valuemin={input.min}
                aria-valuemax={input.max}
                aria-valuetext={`${t(input.description)}:  ${[a, b, c][index].toFixed(index === 2 ? 0 : 3)}`}
              />
            </div>
          ))}
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
            aria-label={`${t(interaction.equation.currentEquation)}: y ${t(
              interaction.equation.equals,
            )} ${a.toFixed(3)} x ${t(interaction.equation.square)} ${
              b >= 0 ? t(interaction.equation.plus) : t(interaction.equation.minus)
            } ${Math.abs(b).toFixed(2)} x ${
              c >= 0 ? t(interaction.equation.plus) : t(interaction.equation.minus)
            } ${Math.abs(c)}`}
          >
            <span className="text-[#F87171]">
              <em>y</em>
            </span>
            <span> = </span>
            <span className="text-[#C084FC]">{a.toFixed(3)}</span>
            <span> </span>
            <span className="text-[#60A5FA]">
              <em>x²</em>
            </span>
            <span> {b >= 0 ? '+ ' : ''}</span>
            <span className="text-[#FB7185]">{b.toFixed(2)}</span>
            <span> </span>
            <span className="text-[#60A5FA]">
              <em>x</em>
            </span>
            <span> {c >= 0 ? '+ ' : ''}</span>
            <span className="text-[#34D399]">{c}</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
          <div className="flex gap-3" role="group">
            <button
              style={BUTTON_STYLES.base}
              onClick={startAnimation}
              disabled={isAnimating || hasHit}
              className={`${ButtonCommonClasses} ${
                isAnimating || hasHit ? ButtonPrimaryClasses.disabled : ButtonPrimaryClasses.enabled
              } text-sm sm:text-base px-4 sm:px-6 py-2`}
            >
              <span aria-live="polite">
                {isAnimating ? t(interaction.labels.launching) : t(interaction.labels.launch as string)}
              </span>
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
          </div>

          <div className="w-full lg:w-auto">
            <div className="text-center lg:text-right text-sm sm:text-base text-white space-y-1">
              <div>{`${t(interaction.labels.target)}: (${TARGET_X} ft, ${TARGET_Y} ft)`}</div>
              <div role="status" className="text-slate-300">
                {`${t(interaction.labels.position)}: (${probePosition.x.toFixed(1)} ft, ${probePosition.y.toFixed(
                  1,
                )} ft)`}
              </div>
              <div
                role="status"
                className="text-white"
              >{`${t(interaction.labels.xIntercepts)}: ${xIntercepts}`}</div>
            </div>
          </div>
        </div>

        <div
          className="relative w-full h-[300px] sm:h-[400px] bg-[#0A1324] rounded-2xl overflow-visible border-slate-700/30 mt-6 sm:mt-8"
          role="img"
          aria-label={t(interaction.ariaLabel)}
        >
          {/* Simple Hit/Miss text overlay - positioned over the graph */}
          {hitMissAnimation && (
            <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none simple-text-overlay">
              <div
                className={`text-6xl font-bold ${hitMissAnimation === 'hit' ? 'text-green-400' : 'text-red-400'}`}
              >
                {hitMissAnimation === 'hit' ? t(interaction.labels.hit) : t(interaction.labels.miss)}
              </div>
            </div>
          )}
          <svg viewBox="-80 -20 940 480" className="w-full h-full">
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

            {/* Grid lines and labels */}
            {Array.from({ length: 11 }, (_, i) => (
              <React.Fragment key={`grid-y-${i}`}>
                <line x1="0" y1={i * 40} x2="800" y2={i * 40} stroke="#334155" strokeWidth="1" />
                <text
                  x="-35"
                  y={i * 40 + 5}
                  fontSize="12"
                  fill="#e2e8f0"
                  fontWeight="500"
                  className="hidden sm:block"
                >
                  {50 - i * 5} ft
                </text>
                <text
                  x="-25"
                  y={i * 40 + 5}
                  fontSize="10"
                  fill="#e2e8f0"
                  fontWeight="500"
                  className="block sm:hidden"
                >
                  {50 - i * 5}
                </text>
              </React.Fragment>
            ))}
            {Array.from(
              { length: 11 },
              (_, i) =>
                i !== 0 && (
                  <React.Fragment key={`grid-x-${i}`}>
                    <line x1={i * 80} y1="0" x2={i * 80} y2="400" stroke="#334155" strokeWidth="1" />
                    <text
                      x={i * 80 - 10}
                      y="425"
                      fontSize="12"
                      fill="#e2e8f0"
                      fontWeight="500"
                      className="hidden sm:block"
                    >
                      {i * 10} ft
                    </text>
                    <text
                      x={i * 80 - 5}
                      y="425"
                      fontSize="10"
                      fill="#e2e8f0"
                      fontWeight="500"
                      className="block sm:hidden"
                    >
                      {i * 10}
                    </text>
                  </React.Fragment>
                ),
            )}
            {/* Axes */}
            <line x1="0" y1="400" x2="800" y2="400" stroke="#e2e8f0" strokeWidth="2" />
            <line x1="0" y1="0" x2="0" y2="400" stroke="#e2e8f0" strokeWidth="2" />
            {/* Axis Labels */}
            <text
              x="400"
              y="450"
              textAnchor="middle"
              fontSize="16"
              fill="#e2e8f0"
              fontWeight="500"
              fontFamily="avenir-next, sans-serif"
              className="hidden sm:block"
            >
              {t(interaction.labels.xAxisLabel)}
            </text>
            <text
              x="-60"
              y="200"
              textAnchor="middle"
              transform="rotate(-90, -60, 200)"
              fontSize="14"
              fill="#e2e8f0"
              fontWeight="500"
              fontFamily="avenir-next, sans-serif"
              className="hidden sm:block"
            >
              {t(interaction.labels.yAxisLabel)}
            </text>

            {/* Curve */}
            <path
              d={points
                .map((point, i) => {
                  if (point.y >= 0) {
                    return `${i === 0 ? 'M' : 'L'} ${toSvgX(point.x)} ${toSvgY(point.y)}`;
                  }
                  return '';
                })
                .join(' ')}
              stroke="#60A5FA"
              strokeWidth="2"
              strokeDasharray={hasHit ? 'none' : '5,5'}
              opacity={hasHit ? '1' : '0.5'}
              fill="none"
            />

            {/* Target point */}
            <g>
              <circle
                cx={toSvgX(TARGET_X)}
                cy={toSvgY(TARGET_Y)}
                r="12"
                fill={hasHit ? '#4ADE80' : '#EF4444'}
                stroke="white"
                strokeWidth="2"
                opacity={hasHit ? '1' : '0.8'}
              />
              {/* Pulsing ring */}
              <circle
                cx={toSvgX(TARGET_X)}
                cy={toSvgY(TARGET_Y)}
                r="20"
                fill="none"
                stroke={hasHit ? '#4ADE80' : '#EF4444'}
                strokeWidth="1"
                opacity="0.4"
              >
                <animate attributeName="r" values="20;25;20" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Static Probe at Origin - Always visible */}
            <g transform="translate(0, 360)">
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

            {/* Simple Flying Probe - Only visible when animating */}
            {isAnimating && probePosition.y >= 0 && (
              <circle
                cx={toSvgX(probePosition.x)}
                cy={toSvgY(probePosition.y)}
                r="4"
                fill="#fbbf24"
                stroke="#e59e0b"
                strokeWidth="2"
              />
            )}
          </svg>
        </div>
        <div
          role="status"
          className={`py-2 text-center px-3 rounded-md ${
            hasHit
              ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-500/30'
              : 'bg-red-900/40 text-red-300 border border-red-500/30'
          }`}
        >
          {hasHit
            ? t(interaction.labels.targetHit)
            : isAnimating
              ? t(interaction.labels.probeInMotion)
              : t(interaction.labels.adjustCurve)}
        </div>
      </div>
    </div>
  );
};

function findXIntercepts(a: number, b: number, c: number): string | string[] {
  if (a === 0) {
    if (b === 0) {
      return c === 0 ? 'scenes.common.infinite_solution' : 'scenes.common.no_solution';
    }
    return [(-c / b).toFixed(2)];
  }

  const discriminant = b * b - 4 * a * c;

  if (discriminant > 0) {
    const x1 = ((-b + Math.sqrt(discriminant)) / (2 * a)).toFixed(2);
    const x2 = ((-b - Math.sqrt(discriminant)) / (2 * a)).toFixed(2);
    return [x2, x1];
  } else if (discriminant === 0) {
    const x = (-b / (2 * a)).toFixed(2);
    return [x];
  } else {
    return 'No solution';
  }
}

function calculateSliderPercentage(value: number, min: number, max: number): string {
  return `${((value - min) / (max - min)) * 100}%`;
}

export default QuadraticVisualizer;
