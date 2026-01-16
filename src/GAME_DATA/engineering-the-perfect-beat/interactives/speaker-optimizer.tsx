import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import speakerOptimizerConfig from '../configs/speaker-optimizer';

// Define types for positions and other structures
interface Position {
  x: number;
  y: number;
}

interface Coverage {
  start: number;
  end: number;
}

interface SpeakerPosition extends Position {
  coverage: Coverage;
  label: string;
}

interface Wave {
  size: number;
  opacity: number;
}

interface SpeakerDetail {
  speakerNum: number;
  distance: number;
  individualLevel: number;
  intensity: number;
}

interface SoundCalculations {
  speakerDetails: SpeakerDetail[];
  combinedLevel: number;
}

// SVG components
const Speaker = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <rect x="4" y="3" width="16" height="20" rx="2" ry="2" stroke="currentColor" />
    <circle cx="12" cy="14" r="3" stroke="currentColor" />
    <circle cx="12" cy="7" r="1" stroke="currentColor" />
  </svg>
);

const User: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

// Custom formula components with stacked fractions
const InverseSquareFormula: React.FC = () => {
  const { t } = useTranslations();
  return (
    <div
      className="text-center"
      style={{ fontFamily: 'Besley, serif', fontWeight: 'bold' }}
      role="text"
      aria-label={t(speakerOptimizerConfig.formulas.inverseSquare.ariaLabel)}
    >
      <span style={{ color: '#8E24AA', fontStyle: 'italic' }}>L</span>
      <sub style={{ color: '#8E24AA' }}>2</sub>
      <span className="mx-2">=</span>
      <span style={{ color: '#E0002B', fontStyle: 'italic' }}>L</span>
      <sub style={{ color: '#E0002B' }}>1</sub>
      <span className="mx-2">-</span>
      <span style={{ color: '#DB0072', marginRight: '2px' }}>20</span>
      <span style={{ color: '#8E24AA' }}>log</span>
      <sub style={{ color: '#8E24AA' }}>10</sub>
      <span className="mx-1">(</span>
      <div style={{ display: 'inline-block', textAlign: 'center', verticalAlign: 'middle' }}>
        <div
          style={{ display: 'block', borderBottom: '1px solid #374151', paddingBottom: '2px', lineHeight: '1.2' }}
        >
          <span style={{ color: '#008217', fontStyle: 'italic' }}>r</span>
          <sub style={{ color: '#008217' }}>2</sub>
        </div>
        <div style={{ display: 'block', paddingTop: '2px', lineHeight: '1.2' }}>
          <span style={{ color: '#677600', fontStyle: 'italic' }}>r</span>
          <sub style={{ color: '#677600' }}>1</sub>
        </div>
      </div>
      <span>)</span>
    </div>
  );
};

const LogarithmicAdditionFormula: React.FC = () => {
  const { t } = useTranslations();
  return (
    <div
      className="text-center"
      style={{ fontFamily: 'Besley, serif', fontWeight: 'bold' }}
      role="text"
      aria-label={t(speakerOptimizerConfig.formulas.logarithmicAddition.ariaLabel)}
    >
      <span style={{ color: '#00749D', fontStyle: 'italic' }}>L</span>
      <sub style={{ color: '#00749D' }}>total</sub>
      <span className="mx-2">=</span>
      <span style={{ color: '#DB0072', marginRight: '2px' }}>10</span>
      <span style={{ color: '#8E24AA' }}>log</span>
      <sub style={{ color: '#8E24AA' }}>10</sub>
      <span className="mx-2">(∑</span>
      <span style={{ color: '#DB0072' }}>10</span>
      <sup style={{ color: '#DB0072' }}>
        (
        <div
          style={{
            display: 'inline-block',
            textAlign: 'center',
            verticalAlign: 'middle',
            margin: '0 2px',
            fontSize: '12px',
          }}
        >
          <div
            style={{
              display: 'block',
              borderBottom: '1px solid #374151',
              paddingBottom: '2px',
              lineHeight: '1.2',
            }}
          >
            <span style={{ color: '#E0002B', fontStyle: 'italic' }}>L</span>
            <sub style={{ color: '#E0002B' }}>i</sub>
          </div>
          <div style={{ display: 'block', paddingTop: '2px', lineHeight: '1.2' }}>
            <span style={{ color: '#DB0072' }}>10</span>
          </div>
        </div>
        )
      </sup>
      <span>)</span>
    </div>
  );
};

const SpeakerOptimizer: React.FC = () => {
  const { t } = useTranslations();
  const [speakerDistance, setSpeakerDistance] = useState<number>(speakerOptimizerConfig.defaults.speakerDistance);
  const [sourceLevel, setSourceLevel] = useState<number>(speakerOptimizerConfig.defaults.sourceLevel);
  const [wavePhase, setWavePhase] = useState<number>(0);

  // Refs for accessibility
  const announcementRef = useRef<HTMLDivElement>(null);
  const distanceSliderRef = useRef<HTMLInputElement>(null);
  const sourceLevelSliderRef = useRef<HTMLInputElement>(null);

  // A fixed reference point for calculations (e.g. center of the stage)
  const selectedPoint: Position = { x: 50.5, y: 50 };

  const { audienceStartX, audienceEndX, audienceStartY, audienceEndY } = speakerOptimizerConfig.dimensions;

  // Animate wave phases
  useEffect(() => {
    const interval = setInterval(() => {
      setWavePhase((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Convert slider percentage to meter (50-90 meters)
  const getDistanceInMeter = useCallback((percentage: number): number => {
    return Math.round((50 + percentage * 0.4) * 10) / 10;
  }, []);

  // Create a grid of audience (listener) positions
  const generateCrowdPositions = (): Position[] => {
    const positions: Position[] = [];
    const rows: number = 8;
    const cols: number = 10;
    const spacingX: number = (audienceEndX - audienceStartX) / (cols - 1);
    const spacingY: number = (audienceEndY - audienceStartY) / (rows - 1);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        positions.push({
          x: audienceStartX + col * spacingX,
          y: audienceStartY + row * spacingY,
        });
      }
    }
    return positions;
  };

  // Calculate speaker positions based on distance and fixed angles
  const getSpeakerPositions = (): SpeakerPosition[] => {
    const positions = [
      {
        angle: 45,
        coverage: { start: -45, end: 135 },
        label: t(speakerOptimizerConfig.staticText.speaker) + ' 1',
      },
      {
        angle: 135,
        coverage: { start: 45, end: 225 },
        label: t(speakerOptimizerConfig.staticText.speaker) + ' 2',
      },
      {
        angle: 225,
        coverage: { start: 135, end: 315 },
        label: t(speakerOptimizerConfig.staticText.speaker) + ' 3',
      },
      {
        angle: 315,
        coverage: { start: 225, end: 45 },
        label: t(speakerOptimizerConfig.staticText.speaker) + ' 4',
      },
    ];

    // Calculate the radial distance from the selected point (in percentage units)
    const distance: number = 20 + speakerDistance * 0.6;
    return positions.map((pos) => ({
      x: selectedPoint.x + distance * Math.cos((pos.angle * Math.PI) / 180),
      y: selectedPoint.y + distance * Math.sin((pos.angle * Math.PI) / 180),
      coverage: pos.coverage,
      label: pos.label,
    }));
  };

  // Calculate individual sound levels and the combined level at center point (REAL calculations)
  const calculateDetailedSoundLevels = (_point: Position, speakers: SpeakerPosition[]): SoundCalculations => {
    const actualDistance = getDistanceInMeter(speakerDistance);

    const speakerDetails: SpeakerDetail[] = speakers.map((_speaker, idx) => {
      const levelAtDistance: number = sourceLevel - 20 * Math.log10(Math.max(1, actualDistance));
      const intensity: number = Math.pow(10, levelAtDistance / 10);
      return {
        speakerNum: idx + 1,
        distance: Math.round(actualDistance * 100) / 100,
        individualLevel: Math.round(levelAtDistance * 10) / 10,
        intensity,
      };
    });

    const totalIntensity: number = speakerDetails.reduce((sum, detail) => sum + detail.intensity, 0);
    const combinedLevel: number = Math.round(10 * Math.log10(totalIntensity) * 10) / 10;
    return { speakerDetails, combinedLevel };
  };

  // Calculate sound levels for individual audience members
  const calculateAudienceSoundLevel = (point: Position, combinedLevelAtCenter: number): number => {
    // Round the combined level to match displayed precision to avoid floating point issues
    const roundedCombinedLevel = Math.round(combinedLevelAtCenter * 10) / 10;

    // If combined level is safe (≤ 95.0 dB), all people should be green
    if (roundedCombinedLevel <= 95.0) {
      return 85; // Return a value in the green range (75-95 dB)
    }

    // If combined level is dangerous (> 95.0 dB), show red people based on position
    // Use the same grid calculation as generateCrowdPositions
    const rows: number = 8;
    const cols: number = 10;
    const spacingX: number = (audienceEndX - audienceStartX) / (cols - 1);
    const spacingY: number = (audienceEndY - audienceStartY) / (rows - 1);

    // Calculate which grid position this point corresponds to
    const col = Math.round((point.x - audienceStartX) / spacingX);
    const row = Math.round((point.y - audienceStartY) / spacingY);

    // Calculate how much above 95.0 dB we are (using rounded value)
    const excessLevel = roundedCombinedLevel - 95.0;

    // Define risk levels based on position (lower number = higher risk)
    let riskLevel = 10; // Default safe level

    // Most corner people (4 corners) - highest risk
    if ((row === 0 || row === 7) && (col === 0 || col === 9)) {
      riskLevel = 1;
    }
    // Next corner level (edges near corners)
    else if ((row <= 1 || row >= 6) && (col <= 1 || col >= 8)) {
      riskLevel = 2;
    }
    // Edge people
    else if ((row <= 2 || row >= 5) && (col <= 2 || col >= 7)) {
      riskLevel = 3;
    }
    // Near edge people
    else if ((row <= 3 || row >= 4) && (col <= 3 || col >= 6)) {
      riskLevel = 4;
    }
    // Everyone else is safe for longer
    else {
      riskLevel = 10;
    }

    // Define thresholds for each risk level (how much above 95.0 dB to start showing red)
    const riskThresholds: { [key: number]: number } = {
      1: 0.1, // Corner people turn red first (even 0.1 dB above 95)
      2: 1.0, // Next level
      3: 2.0, // Edge people
      4: 3.0, // Near edge people
      10: 8.0, // Center people (very high threshold)
    };

    // Show red people based on how much above 95.0 dB we are
    // Use small epsilon to handle floating point precision
    if (excessLevel >= riskThresholds[riskLevel] - 0.001) {
      return 96; // Force red color (above 95dB)
    }

    // Everyone else stays in optimal range
    return 85; // Force green color (75-95dB range)
  };

  // Determine color coding for sound levels
  const getSoundLevelColor = (level: number): string => {
    if (level > 95) return 'text-[#E0002B]';
    if (level >= 75 && level <= 95) return 'text-[#008217]';
    return 'text-[#A16207]';
  };

  // Generate animated wave arcs for each speaker
  const generateWaves = (): Wave[] => {
    const waves: Wave[] = [];
    for (let i = 0; i < speakerOptimizerConfig.wave.count; i++) {
      const phase = (wavePhase + i * speakerOptimizerConfig.wave.interval) % 100;
      const size = phase * speakerOptimizerConfig.wave.scaleFactor;
      const opacity = (100 - phase) / 100;
      waves.push({ size, opacity });
    }
    return waves;
  };

  // Helper to create an SVG arc path
  const createArc = (
    centerX: number,
    centerY: number,
    radius: number,
    startAngle: number,
    endAngle: number,
  ): string => {
    const start = {
      x: centerX + radius * Math.cos((startAngle * Math.PI) / 180),
      y: centerY + radius * Math.sin((startAngle * Math.PI) / 180),
    };
    const end = {
      x: centerX + radius * Math.cos((endAngle * Math.PI) / 180),
      y: centerY + radius * Math.sin((endAngle * Math.PI) / 180),
    };
    const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  const crowdPositions: Position[] = generateCrowdPositions();
  const speakerPositions: SpeakerPosition[] = getSpeakerPositions();
  const soundCalcs: SoundCalculations = calculateDetailedSoundLevels(selectedPoint, speakerPositions);

  // Update slider background
  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #e0e0e0 ${percent}%)`;
  }, []);

  // Update slider backgrounds when values change
  useEffect(() => {
    if (distanceSliderRef.current) {
      updateSliderBackground(distanceSliderRef.current);
    }
    if (sourceLevelSliderRef.current) {
      updateSliderBackground(sourceLevelSliderRef.current);
    }
  }, [speakerDistance, sourceLevel, updateSliderBackground]);

  // Announce changes for screen readers
  useEffect(() => {
    if (announcementRef.current) {
      const speakerDistMeter = getDistanceInMeter(speakerDistance);
      let safetyStatus = '';

      if (soundCalcs.combinedLevel > 95) {
        safetyStatus = t(speakerOptimizerConfig.zones.danger);
      } else if (soundCalcs.combinedLevel >= 75) {
        safetyStatus = t(speakerOptimizerConfig.zones.optimal);
      } else {
        safetyStatus = t(speakerOptimizerConfig.zones.tooWeak);
      }

      announcementRef.current.textContent = `${t(speakerOptimizerConfig.staticText.speakersAt)} ${speakerDistMeter} ${t(speakerOptimizerConfig.staticText.meter)}. ${t(speakerOptimizerConfig.staticText.combinedLevel)}: ${soundCalcs.combinedLevel} dB. ${safetyStatus}`;
    }
  }, [soundCalcs.combinedLevel, speakerDistance, sourceLevel, t, getDistanceInMeter]);

  const handleDistanceSliderKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const step = e.shiftKey ? 5 : 1;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        setSpeakerDistance((prev) => Math.min(100, prev + step));
        e.preventDefault();
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        setSpeakerDistance((prev) => Math.max(0, prev - step));
        e.preventDefault();
        break;
      case 'Home':
        setSpeakerDistance(0);
        e.preventDefault();
        break;
      case 'End':
        setSpeakerDistance(100);
        e.preventDefault();
        break;
      default:
        break;
    }
  };

  const handleSourceLevelSliderKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const step = e.shiftKey ? 5 : 1;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        setSourceLevel((prev) => Math.min(135, prev + step));
        e.preventDefault();
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        setSourceLevel((prev) => Math.max(120, prev - step));
        e.preventDefault();
        break;
      case 'Home':
        setSourceLevel(120);
        e.preventDefault();
        break;
      case 'End':
        setSourceLevel(135);
        e.preventDefault();
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full max-w-3xl mt-[-16px] mx-auto">
      {/* Screen reader announcements */}
      <div ref={announcementRef} aria-live="polite" className="sr-only" />

      {/* Stage & Simulation Area */}
      <div className="mb-3">
        <div
          className="relative w-full h-[350px] border-2 border-slate-300 rounded-lg"
          aria-label={t(speakerOptimizerConfig.staticText.simulationArea)}
        >
          <div className="absolute top-0 left-0 right-0 h-14 bg-slate-100 border-b border-slate-300 flex items-center justify-center">
            <div className="text-lg text-slate-600">{t(speakerOptimizerConfig.staticText.stage)}</div>
          </div>

          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" aria-hidden="true">
            {speakerPositions.map((speaker, speakerIdx) => (
              <g key={`waves-${speakerIdx}`}>
                {generateWaves().map((wave, waveIdx) => (
                  <path
                    key={`wave-${speakerIdx}-${waveIdx}`}
                    d={createArc(speaker.x, speaker.y, wave.size, speaker.coverage.start, speaker.coverage.end)}
                    fill="none"
                    stroke="rgba(59, 130, 246, 0.5)"
                    strokeWidth="1"
                    style={{
                      opacity: wave.opacity * 0.5,
                      transform: 'translate(-50%, -50%)',
                      transformOrigin: 'center',
                    }}
                  />
                ))}
              </g>
            ))}
          </svg>

          {/* Selected point marker */}
          <div
            className="absolute w-4 h-4 border-2 border-[#0055B2] rounded-full z-20"
            style={{
              left: `${selectedPoint.x}%`,
              top: `${selectedPoint.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Audience (Listeners) */}
          {crowdPositions.map((pos, idx) => {
            const soundLevel = Math.round(calculateAudienceSoundLevel(pos, soundCalcs.combinedLevel));
            return (
              <div
                key={`person-${idx}`}
                className={`absolute m-px transform -translate-x-2 -translate-y-2 ${getSoundLevelColor(soundLevel)}`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <User />
              </div>
            );
          })}

          {/* Speakers */}
          {speakerPositions.map((speaker, idx) => (
            <div
              key={`speaker-${idx}`}
              className="absolute transform -translate-x-4 -translate-y-4 z-10"
              style={{ left: `${speaker.x}%`, top: `${speaker.y}%` }}
            >
              <Speaker />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                id="slider-source-level-label"
                htmlFor="slider-source-level"
                className="text-base font-medium"
              >
                {t(speakerOptimizerConfig.sliderLabels.intensity)} : {sourceLevel} dB
              </label>
            </div>
            <input
              ref={sourceLevelSliderRef}
              id="slider-source-level"
              type="range"
              value={sourceLevel}
              onChange={(e) => setSourceLevel(Number(e.target.value))}
              onKeyDown={handleSourceLevelSliderKeyDown}
              min={120}
              max={135}
              step={1}
              className="w-full global-slider"
              aria-labelledby="slider-source-level-label"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label id="slider-distance-label" htmlFor="slider-distance" className="text-base font-medium">
                {t(speakerOptimizerConfig.sliderLabels.distance)}: {getDistanceInMeter(speakerDistance)} m
              </label>
            </div>
            <input
              ref={distanceSliderRef}
              id="slider-distance"
              type="range"
              value={speakerDistance}
              onChange={(e) => setSpeakerDistance(Number(e.target.value))}
              onKeyDown={handleDistanceSliderKeyDown}
              min={0}
              max={100}
              step={0.1}
              className="w-full global-slider"
              aria-labelledby="slider-distance-label"
            />
          </div>
        </div>

        <div
          className="grid grid-cols-3 gap-2 text-m"
          aria-label={t(speakerOptimizerConfig.staticText.soundLevelZones)}
        >
          <div className="text-[#A16207] text-center font-medium">{t(speakerOptimizerConfig.zones.tooWeak)}</div>
          <div className="text-[#008217] text-center font-medium">{t(speakerOptimizerConfig.zones.optimal)}</div>
          <div className="text-[#E0002B] text-center font-medium">{t(speakerOptimizerConfig.zones.danger)}</div>
        </div>
      </div>

      {/* Combined Level Result */}
      <div className="p-3 rounded-lg m-4 text-base bg-green-50 border border-green-200 text-center">
        <div className="font-bold text-green-800">
          {t('Combined Level')}: {soundCalcs.combinedLevel} dB
        </div>
      </div>

      {/* Formulas and Calculation Details */}
      <div className="p-3 rounded-lg mb-4 text-base" aria-labelledby="calculations-heading">
        <h2 id="calculations-heading" className="font-bold text-xl mb-4">
          {t(speakerOptimizerConfig.staticText.calculationsHeading)}
        </h2>

        <div className="mb-2">
          {t(speakerOptimizerConfig.formulas.inverseSquare.label)}: <InverseSquareFormula />
        </div>

        <div aria-hidden="true" className="grid grid-cols-2 gap-2">
          {soundCalcs.speakerDetails.map((detail) => (
            <div key={detail.speakerNum} className="mb-1">
              {t(speakerOptimizerConfig.staticText.speaker)} {detail.speakerNum} (
              <span className="font-bold italic text-[#0061FC]" style={{ fontFamily: 'Besley, serif' }}>
                r
              </span>
              {' = '}
              {detail.distance} m): {detail.individualLevel} dB
            </div>
          ))}
        </div>

        <div className="mt-3 mb-2">
          {t(speakerOptimizerConfig.formulas.logarithmicAddition.label)}: <LogarithmicAdditionFormula />
        </div>
      </div>
    </div>
  );
};

export default SpeakerOptimizer;
