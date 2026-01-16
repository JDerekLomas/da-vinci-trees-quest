import React, { useState, useEffect, useRef } from 'react';
import {
  LunarProbeInteraction,
  InteractionComponentProps,
  InputValues,
  Point,
  Star,
  TrailPoint,
  Particle,
} from './interface';
import './lunar-probe-interactive.css';
import { useTranslations } from '../../../hooks/useTranslations';
import { calculateProjectileDistance, checkTargetPosition } from '../utils/utility';
import { useEventListener } from '../../../hooks/useEventListener';

const LunarProbe: React.FC<InteractionComponentProps> = ({ interaction, onInteractionChange, onInteraction }) => {
  const config = interaction as LunarProbeInteraction;

  const [inputValues, setInputValues] = useState<InputValues>({
    velocity: config.inputs[0].defaultValue,
    angle: config.inputs[1].defaultValue,
  });
  const { t } = useTranslations();
  const [fullTrajectory, setFullTrajectory] = useState<Point[]>([]);
  const [hintTrajectory, setHintTrajectory] = useState<Point[]>([]);
  const [probePosition, setProbePosition] = useState<Point>({
    x: 0,
    y: 0,
    t: 0,
  });
  const [isLaunching, setIsLaunching] = useState(false);
  const [showProbe, setShowProbe] = useState(false);
  const [hasHit, setHasHit] = useState(false);
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [probeTrail, setProbeTrail] = useState<TrailPoint[]>([]);
  const [hitMissAnimation, setHitMissAnimation] = useState<string | null>(null); // Added for hit/miss animation
  const [stars] = useState<Star[]>(() =>
    Array.from({ length: 100 }, () => ({
      x: Math.random() * 800,
      y: Math.random() * 400,
      size: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.5,
    })),
  );
  const { payload } = useEventListener('lunar-probe');

  useEffect(() => {
    if (inputValues.angle === 45) {
      onInteraction({ 'lunar-probe-set-45': true });
    } else {
      onInteraction({ 'lunar-probe-set-45': false });
    }
  }, [inputValues.angle, onInteraction]);

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      const step = Number(payload.step);
      if (step === 1) {
        setInputValues((prev) => ({
          ...prev,
          angle: 45,
        }));
        document.getElementById('slider-angle')?.setAttribute('disabled', 'true');
      } else {
        document.getElementById('slider-angle')?.removeAttribute('disabled');
      }
    }
  }, [payload]);

  const animationRef = useRef<number | null>(null);
  const ANIMATION_DURATION = 4000; // this is to control the speed of trajectory

  const generateFeedback = (position: Point): string => {
    const targetX = 50;
    const landingX = position.x / (800 / 90);
    const landingY = Math.abs(400 - position.y) / (400 / 45);
    const isAngleLocked = inputValues.angle === 45;

    if (Math.abs(position.y - 400) < 20) {
      if (landingX < targetX - 5) {
        return t('scenes.S5.S5_D0_FSQ4_C9.feedback_short_distance');
      } else if (landingX > targetX + 5) {
        return t('scenes.S5.S5_D0_FSQ4_C9.feedback_long_distance');
      } else {
        return t('scenes.S5.S5_D0_FSQ4_C9.feedback_close');
      }
    } else if (landingY > 5 && !isAngleLocked) {
      return t('scenes.S5.S5_D0_FSQ4_C9.feedback_angle_high');
    }

    if (Math.abs(landingX - targetX) < 10 && !isAngleLocked) {
      return t('scenes.S5.S5_D0_FSQ4_C9.feedback_adjust_angle');
    } else if (!isAngleLocked) {
      return t('scenes.S5.S5_D0_FSQ4_C9.feedback_adjust_both');
    } else {
      // When angle is locked at 45, only provide distance-based feedback
      return t('scenes.S5.S5_D0_FSQ4_C9.feedback_short_distance');
    }
  };

  const createSuccessParticles = () => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: (50 / 90) * 800,
      y: 395,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * -4 - 2,
      life: 1.0,
      color: ['#4ADE80', '#22C55E', '#FBBF24', '#F59E0B'][Math.floor(Math.random() * 4)],
    }));
    setParticles(newParticles);
  };

  const calculateTrajectory = (): Point[] => {
    const points: Point[] = [];
    const angleRad = (inputValues.angle * Math.PI) / 180;
    const v0x = inputValues.velocity * Math.cos(angleRad);
    const v0y = inputValues.velocity * Math.sin(angleRad);
    const g = config.environment.gravity;

    const timeOfFlight = (v0y + Math.sqrt(v0y * v0y + 2 * g * 0)) / g;
    const numPoints = 200;
    const targetPosition = config.environment.target.x;
    const timeStep = timeOfFlight / numPoints;

    const distance = calculateProjectileDistance(inputValues.angle, inputValues.velocity);
    const isPerfectTrajectory = checkTargetPosition(distance);

    const maxHeight = (v0y * v0y) / (2 * g);

    const minGraphHeight = 5;
    config.graphConfig.y.max = Math.max(Math.ceil(maxHeight * 1.2), minGraphHeight); // Add 20% padding and enforce a minimum

    for (let i = 0; i < numPoints; i++) {
      const t = i * timeStep;
      const x = v0x * t;
      const y = v0y * t - 0.5 * g * t * t;

      // Break if we go beyond x-axis bounds
      if (x > 90) break;

      // Only add points that are within bounds
      if (y >= 0 && y <= config.graphConfig.y.max && x >= 0 && x <= 90) {
        points.push({
          x: (x / 90) * 800,
          y: 400 - (y / config.graphConfig.y.max) * 400, // Scale y based on configured max height
          t,
        });
      }

      // If we've gone below ground level, add one last point at ground
      if (y < 0 && points.length > 0) {
        const lastX = points[points.length - 1].x;
        points.push({
          x: lastX,
          y: 380,
          t,
        });
        break;
      }
    }

    if (isPerfectTrajectory) {
      points[points.length - 1] = {
        x: (targetPosition / 90) * 800,
        y: 400,
        t: timeOfFlight,
        isPerfectTrajectory: isPerfectTrajectory,
      };
    }

    return points;
  };

  useEffect(() => {
    const points = calculateTrajectory();
    setFullTrajectory(points);
    setHintTrajectory(points.slice(0, Math.ceil(points.length * 0.25)));
  }, [inputValues.angle, inputValues.velocity]);

  const isHit = (pos: Point): boolean => {
    return pos.isPerfectTrajectory || false;
  };

  const resetLaunch = (): void => {
    setIsLaunching(false);
    setShowProbe(false);
    setHasHit(false);
    setCurrentPathIndex(0);
    setProbePosition({ x: 0, y: 0, t: 0 });
    setFeedbackMessage('');
    setParticles([]);
    setProbeTrail([]);
    setHitMissAnimation(null); // Reset hit/miss animation
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const launchProbe = (): void => {
    if (isLaunching) return;

    resetLaunch();
    setIsLaunching(true);
    setShowProbe(true);
    let startTime: number | null = null;

    const animate = (timestamp: number): void => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / ANIMATION_DURATION;

      if (progress < 1) {
        const pointIndex = Math.min(Math.floor(progress * (2 * fullTrajectory.length)), fullTrajectory.length - 1);
        const newPosition = fullTrajectory[pointIndex];
        setProbePosition(newPosition);
        setCurrentPathIndex(pointIndex);

        // Add probe trail
        if (progress > 0.1) {
          setProbeTrail((prev) => {
            const newTrail = [...prev, { x: newPosition.x, y: newPosition.y, alpha: 1.0 }];
            return newTrail.slice(-8).map((point, index, arr) => ({
              ...point,
              alpha: ((index + 1) / arr.length) * 0.7,
            }));
          });
        }

        if (isHit(newPosition)) {
          setHasHit(true);
          createSuccessParticles();

          setHitMissAnimation('hit');
          setTimeout(() => setHitMissAnimation(null), 2000);

          setProbePosition({
            x: (50 / 90) * 800,
            y: 400,
            t: 0,
          });
          setIsLaunching(false);
          onInteractionChange({ isCorrect: true });
          return;
        }

        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsLaunching(false);
        if (!hasHit) {
          setHitMissAnimation('miss');
          setTimeout(() => setHitMissAnimation(null), 2000);

          setFeedbackMessage(generateFeedback(probePosition));
          setTimeout(() => setShowProbe(false), 500);
          onInteractionChange({ isCorrect: false });
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.15, // gravity
            life: particle.life - 0.025,
          }))
          .filter((particle) => particle.life > 0),
      );
    }, 20);

    return () => clearInterval(interval);
  }, [particles]);

  const calculateSliderPercentage = (value: number, min: number, max: number): string => {
    return `${((value - min) / (max - min)) * 100}%`;
  };

  if (interaction.type !== 'lunar-probe') {
    return null;
  }

  return (
    <div className="flex flex-col p-6 bg-slate-900 rounded-2xl">
      {/* Sliders Container */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        {config.inputs.map((input) => (
          <div key={input.id} className="bg-slate-800/40 p-4 rounded-xl">
            <div className="text-white" aria-live="off">
              <label htmlFor={`slider-${input.id}`} className="text-white">
                {t(input.label)}
              </label>
              : {inputValues[input.id]}
              {t(input.unit!)}
            </div>
            <input
              id={`slider-${input.id}`}
              type="range"
              value={inputValues[input.id]}
              onChange={(e) => {
                setInputValues((prev) => ({
                  ...prev,
                  [input.id]: Number(e.target.value),
                }));
                e.currentTarget.style.setProperty(
                  '--value-percent',
                  calculateSliderPercentage(Number(e.target.value), input.min, input.max),
                );
                resetLaunch();
              }}
              style={
                {
                  '--value-percent': calculateSliderPercentage(inputValues[input.id], input.min, input.max),
                } as React.CSSProperties
              }
              min={input.min}
              max={input.max}
              step={input.step}
              disabled={isLaunching}
              className="slider-input mt-2"
              aria-valuetext={`${t(input.label)}: ${inputValues[input.id]}${t(input.unit!)}`}
            />
          </div>
        ))}
      </div>
      {/* Controls and Status Container */}
      <div className="flex justify-between items-start mt-4 mb-4">
        {/* Buttons Group */}
        <div className="flex space-x-4">
          <button
            onClick={launchProbe}
            disabled={isLaunching || hasHit}
            className={`px-8 py-2 rounded-lg font-semibold transition-all duration-200 ${
              isLaunching
                ? 'bg-orange-500 text-white animate-pulse'
                : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105'
            } disabled:opacity-50 disabled:hover:scale-100`}
            aria-hidden={isLaunching}
          >
            {isLaunching
              ? t('scenes.S5.S5_D0_FSQ4_C9.launching')
              : hasHit
                ? t('scenes.S5.S5_D0_FSQ4_C9.target_hit')
                : t('scenes.S5.S5_D0_FSQ4_C9.launch_probe')}
          </button>
          <button
            onClick={resetLaunch}
            disabled={isLaunching}
            className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 
                            disabled:opacity-50 transition-colors duration-200"
            aria-hidden={isLaunching}
          >
            {t('scenes.S5.S5_D0_FSQ4_C9.reset')}
          </button>
        </div>

        <div role="status" aria-live="assertive" className="sr-only">
          {isLaunching && t('scenes.S5.S5_D0_FSQ4_C9.probe_in_flight')}
          {hasHit && t('scenes.S5.S5_D0_FSQ4_C9.target_hit')}
          {(hasHit || (!isLaunching && currentPathIndex > 0)) &&
            `${t('scenes.S5.S5_D0_FSQ4_C9.hit_position')} ${
              hasHit
                ? '(50ft, 0ft)'
                : `(${(probePosition.x / (800 / 90)).toFixed(3)}ft, ${(
                    Math.abs(400 - probePosition.y) /
                    (400 / 45)
                  ).toFixed(3)}ft)`
            }`}
        </div>
        {/* Status Section */}
        <div className="min-w-[200px] min-h-[80px] text-right">
          <div className="text-white">{t('scenes.S5.S5_D0_FSQ4_C9.target_position')} (50ft, 0ft)</div>

          {(hasHit || (!isLaunching && currentPathIndex > 0)) && (
            <div
              className={
                hasHit
                  ? 'text-emerald-400' // Brighter green for success (#34D399)
                  : 'text-red-300'
              }
            >
              {t('scenes.S5.S5_D0_FSQ4_C9.hit_position')}{' '}
              {hasHit
                ? '(50ft, 0ft)'
                : `(${(probePosition.x / (800 / 90)).toFixed(3)}ft, ${(Math.abs(400 - probePosition.y) / (400 / 45)).toFixed(3)}ft)`}
            </div>
          )}

          {!hasHit && !isLaunching && feedbackMessage && currentPathIndex > 0 && (
            <div className="text-amber-300 mt-2 font-medium">{feedbackMessage}</div>
          )}

          {!hasHit && !isLaunching && !feedbackMessage && (
            <div className="text-white">{t('scenes.S5.S5_D0_FSQ4_C9.adjust_slider')}</div>
          )}

          {hasHit && (
            <div className="text-emerald-400 font-medium">{t('scenes.S5.S5_D0_FSQ4_C9.target_hit_reset')}</div>
          )}

          {isLaunching && <div className="textt-white">{t('scenes.S5.S5_D0_FSQ4_C9.probe_in_flight')}</div>}
        </div>
      </div>

      {/* Graph */}
      <div
        aria-hidden="true"
        className="relative w-full h-[400px] bg-[#0A1324] rounded-2xl overflow-hidden border-slate-700/30"
      >
        {/* Simple Hit/Miss text overlay - positioned over the graph */}
        {hitMissAnimation && (
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none simple-text-overlay">
            <div
              className={`text-6xl font-bold ${hitMissAnimation === 'hit' ? 'text-green-400' : 'text-red-400'}`}
            >
              {hitMissAnimation === 'hit' ? t('scenes.S5.S5_D0_FSQ4_C9.hit') : t('scenes.S5.S5_D0_FSQ4_C9.miss')}
            </div>
          </div>
        )}
        <svg viewBox="-110 -30 950 500" className="w-full h-full">
          <defs>
            <radialGradient id="earthGradient">
              <stop offset="0%" stopColor="#4B91F1" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </radialGradient>
          </defs>

          <path d="M0 380 Q 200 360, 400 380 Q 600 400, 800 380 L 800 400 L 0 400 Z" fill="#64748b" />
          <circle cx="100" cy="385" r="8" fill="#475569" />
          <circle cx="300" cy="390" r="6" fill="#475569" />
          <circle cx="600" cy="388" r="7" fill="#475569" />

          {/* X-axis labels */}
          {Array.from({ length: config.graphConfig.x.steps }, (_, i) => (
            <React.Fragment key={`grid-v-${i}`}>
              <line
                x1={i * (800 / (config.graphConfig.x.steps - 1))}
                y1="0"
                x2={i * (800 / (config.graphConfig.x.steps - 1))}
                y2="400"
                stroke={config.environment.grid.color}
                strokeWidth="1"
              />
              {i > 0 && (
                <text
                  x={i * (800 / (config.graphConfig.x.steps - 1))}
                  y="416"
                  textAnchor="middle"
                  className="text-m fill-white"
                >
                  {i * (config.graphConfig.x.max / (config.graphConfig.x.steps - 1))}
                  ft
                </text>
              )}

              {/* Stationary Probe at Origin */}
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
            </React.Fragment>
          ))}

          {/* Y-axis labels */}
          {Array.from({ length: config.environment.grid.lines }, (_, i) => (
            <React.Fragment key={`grid-h-${i}`}>
              <line
                x1="0"
                y1={i * (400 / (config.environment.grid.lines - 1))}
                x2="800"
                y2={i * (400 / (config.environment.grid.lines - 1))}
                stroke={config.environment.grid.color}
                strokeWidth="1"
              />
              {i < config.environment.grid.lines - 1 && (
                <text
                  x="-15"
                  y={i * (400 / (config.environment.grid.lines - 1))}
                  className="text-m fill-white"
                  dominantBaseline="middle"
                  textAnchor="end"
                >
                  {(
                    config.graphConfig.y.max -
                    (i * config.graphConfig.y.max) / (config.environment.grid.lines - 1)
                  ).toFixed(1)}
                  ft
                </text>
              )}
            </React.Fragment>
          ))}

          {/* Axis Labels */}
          <text
            x="400"
            y="460"
            textAnchor="middle"
            fontSize="20"
            fill="#FFFFFF"
            fontWeight="500"
            fontFamily="avenir-next, sans-serif"
          >
            {t(config.graphConfig.x.label)}
          </text>

          <text
            x="-60"
            y="190"
            textAnchor="middle"
            transform="rotate(-90, -60, 200)"
            fontSize="16"
            fill="#FFFFFF"
            fontWeight="500"
            fontFamily="avenir-next, sans-serif"
          >
            {t(config.graphConfig.y.label)}
          </text>

          {/* Shared 0m label */}
          <text x="-10" y="400" className="text-m fill-white" dominantBaseline="middle" textAnchor="end">
            0m
          </text>

          {/* Stars */}
          {stars.map((star, i) => (
            <circle key={`star-${i}`} cx={star.x} cy={star.y} r={star.size} fill="white" opacity={star.opacity} />
          ))}

          {/* Target */}
          <g>
            <circle
              cx={(50 / 90) * 800}
              cy={395}
              r="12"
              fill={hasHit ? '#4ADE80' : '#EF4444'}
              stroke="white"
              strokeWidth="2"
              opacity={hasHit ? '1' : '0.8'}
            />
            {/* Pulsing ring */}
            <circle
              cx={(50 / 90) * 800}
              cy={395}
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

          {/* Success Particles */}
          {particles.map((particle, index) => (
            <circle
              key={index}
              cx={particle.x}
              cy={particle.y}
              r="3"
              fill={particle.color}
              opacity={particle.life}
            />
          ))}

          {/* Trajectory Path */}
          {!isLaunching && !hasHit && (
            <path
              d={hintTrajectory.map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')}
              stroke="#60A5FA"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.3"
              fill="none"
            />
          )}

          {/* Full Trajectory */}
          {(isLaunching || hasHit) && (
            <path
              d={fullTrajectory
                .slice(0, currentPathIndex + 1)
                .map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
                .join(' ')}
              stroke="#60A5FA"
              strokeWidth="2"
              opacity="0.6"
              fill="none"
            />
          )}

          {/* Probe */}
          {showProbe && (
            <g>
              {/* Probe Trail */}
              {probeTrail.map((trail, i) => (
                <circle key={i} cx={trail.x} cy={trail.y} r="4" fill="#60A5FA" />
              ))}

              {/* Main Flying Probe - Simple Dot Only */}
              <circle
                cx={probePosition.x}
                cy={probePosition.y}
                r="4"
                fill="#fbbf24"
                stroke="#e59e0b"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

export default LunarProbe;
