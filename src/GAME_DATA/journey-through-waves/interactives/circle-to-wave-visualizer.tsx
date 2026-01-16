import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CircleToWaveVisualizerInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';

interface CircleToWaveVisualizerProps {
  interaction: CircleToWaveVisualizerInteraction;
}

const CircleToWaveVisualizer = ({ interaction }: CircleToWaveVisualizerProps) => {
  const { t } = useTranslations();

  const { angleInput, ariaLabel, interactiveConstants, specialAngles, translations } = interaction;
  const { SVG_WIDTH, SVG_HEIGHT, RADIUS, CENTER_X, CENTER_Y } = interactiveConstants;
  const { play, pause, animationStartMsg, animationStopMsg } = translations;

  const [angleSlider, setAngleSlider] = useState(angleInput);
  const [announcement, setAnnouncement] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);

  // Constants for visualization
  const waveStart = CENTER_X + RADIUS * 1.5;
  const waveWidth = 450;

  const { circleX, circleY } = useMemo(() => {
    return {
      circleX: CENTER_X + RADIUS * Math.cos(angleSlider.value),
      circleY: CENTER_Y - RADIUS * Math.sin(angleSlider.value),
    };
  }, [CENTER_X, CENTER_Y, RADIUS, angleSlider.value]);

  const { sinValue, cosValue } = useMemo(() => {
    return {
      sinValue: Math.sin(angleSlider.value),
      cosValue: Math.cos(angleSlider.value),
    };
  }, [angleSlider.value]);

  const radToDeg = useCallback((angle: number) => (angle * 180) / Math.PI, []);

  const getExactValue = useCallback(
    (value: string, angle: number) => {
      const deg = Math.round(radToDeg(angle));
      if (specialAngles[deg]) {
        return value === 'sin' ? specialAngles[deg].sin : specialAngles[deg].cos;
      }
      return value === 'sin' ? sinValue.toFixed(3) : cosValue.toFixed(3);
    },
    [radToDeg, specialAngles, sinValue, cosValue],
  );

  // Animation effect
  useEffect(() => {
    let animationId: number;
    // Set screen reader announcement based on isPlaying state
    setAnnouncement(isPlaying ? t(animationStartMsg) : t(animationStopMsg));
    if (isPlaying) {
      const animate = () => {
        setAngleSlider((prev) => ({ ...prev, value: (prev.value + 0.02) % (Math.PI * 2) }));
        animationId = requestAnimationFrame(animate);
      };
      animationId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, t]);

  // Generate wave points for both sin and cos
  const generateWavePoints = useCallback(() => {
    const points: {
      sin: { x: number; y: number }[];
      cos: { x: number; y: number }[];
    } = { sin: [], cos: [] };
    for (let x = 0; x <= waveWidth; x += 2) {
      const xAngle = (x / waveWidth) * Math.PI * 2;
      points.sin.push({
        x: waveStart + x,
        y: CENTER_Y - RADIUS * Math.sin(xAngle),
      });
      points.cos.push({
        x: waveStart + x,
        y: CENTER_Y - RADIUS * Math.cos(xAngle),
      });
    }
    return points;
  }, [waveWidth, waveStart, CENTER_Y, RADIUS]);

  const getPerimeterArcPath = useCallback(() => {
    const startX = CENTER_X + RADIUS;
    const startY = CENTER_Y;
    return `M ${startX} ${startY}
            A ${RADIUS} ${RADIUS} 0
            ${angleSlider.value > Math.PI ? 1 : 0}
            0 ${circleX} ${circleY}`;
  }, [CENTER_X, CENTER_Y, RADIUS, angleSlider.value, circleX, circleY]);

  const wavePoints = useMemo(() => generateWavePoints(), [generateWavePoints]);

  const piLabels = useMemo(
    () => [
      { x: waveStart, label: '0' },
      { x: waveStart + waveWidth / 4, label: 'π∕2' },
      { x: waveStart + waveWidth / 2, label: 'π' },
      { x: waveStart + (3 * waveWidth) / 4, label: '3π∕2' },
      { x: waveStart + waveWidth, label: '2π' },
    ],
    [waveStart, waveWidth],
  );

  // Handle slider updates
  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    const sliderElement = document.getElementById(`slider-${angleSlider.id}`) as HTMLInputElement;
    if (sliderElement) {
      updateSliderBackground(sliderElement);
    }
  }, [angleSlider, isPlaying, updateSliderBackground]);

  // Slider change handler
  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.id === `slider-${angleSlider.id}`) {
        setAngleSlider((prev) => ({ ...prev, value: Number(e.target.value) }));
      }
    },
    [angleSlider],
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="w-[29%]">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-full px-2 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-4 lg:py-2 bg-[#006BE0] hover:bg-blue-600 text-white"
          >
            {isPlaying ? t(pause) : t(play)}
          </button>
          {/* Screen reader announcement */}
          <div className="sr-only">{announcement}</div>
        </div>

        <div className="flex-1 flex items-center justify-center gap-4">
          <div className="w-full text-lg font-medium flex flex-col">
            <div aria-live="off" className="text-base font-semibold">
              <label htmlFor={`slider-${angleSlider.id}`}>{t(angleSlider.label)}</label>:{' '}
              {radToDeg(angleSlider.value).toFixed(0)}° / {angleSlider.value.toFixed(2)}{' '}
              {t(angleSlider.unit ?? '')}
            </div>
            <div className="w-full">
              <div>
                <input
                  id={`slider-${angleSlider.id}`}
                  type="range"
                  value={angleSlider.value}
                  onChange={handleSliderChange}
                  step={angleSlider.step}
                  min={angleSlider.min}
                  max={angleSlider.max}
                  disabled={isPlaying}
                  className={`global-slider w-full ${isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
                  aria-valuetext={`${t(angleSlider.label ?? '')}: ${radToDeg(angleSlider.value).toFixed(0)}° / ${angleSlider.value.toFixed(2)} ${t(angleSlider.unit ?? '')}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div role="region" aria-label={t(ariaLabel!)} className="flex items-center justify-center">
        <svg className="w-full" viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          <line
            x1={CENTER_X - RADIUS * 1.2}
            y1={CENTER_Y - RADIUS}
            x2={waveStart + waveWidth + 50}
            y2={CENTER_Y - RADIUS}
            stroke="#888888"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1={CENTER_X - RADIUS * 1.2}
            y1={CENTER_Y + RADIUS}
            x2={waveStart + waveWidth + 50}
            y2={CENTER_Y + RADIUS}
            stroke="#888888"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Coordinate axes */}
          <line
            x1={CENTER_X - RADIUS * 1.2}
            y1={CENTER_Y}
            x2={waveStart + waveWidth + 50}
            y2={CENTER_Y}
            stroke="#888888"
            strokeWidth="2"
          />
          <line
            x1={CENTER_X}
            y1={CENTER_Y - RADIUS * 1.2}
            x2={CENTER_X}
            y2={CENTER_Y + RADIUS * 1.2}
            stroke="#888888"
            strokeWidth="2"
          />

          {/* Visual separator */}
          <line
            x1={CENTER_X + RADIUS * 1.2}
            y1={CENTER_Y - RADIUS * 1.2}
            x2={CENTER_X + RADIUS * 1.2}
            y2={CENTER_Y + RADIUS * 1.2}
            stroke="#888888"
            strokeDasharray="4 4"
            strokeWidth="2"
          />

          {/* π labels with ticks */}
          {piLabels.map(({ x, label }) => (
            <React.Fragment key={label}>
              <line x1={x} y1={CENTER_Y} x2={x} y2={CENTER_Y + 10} stroke="#888888" strokeWidth="2" />
              <text x={x} y={CENTER_Y + 25} textAnchor="middle" className="font-mono text-[#333333]">
                {label}
              </text>
            </React.Fragment>
          ))}

          {/* Unit Circle */}
          <circle cx={CENTER_X} cy={CENTER_Y} r={RADIUS} fill="none" stroke="#888888" strokeWidth="2" />

          {/* Angle Arc */}
          <path
            d={`M ${CENTER_X + RADIUS * 0.3} ${CENTER_Y}
                    A ${RADIUS * 0.3} ${RADIUS * 0.3} 0
                    ${angleSlider.value > Math.PI ? 1 : 0}
                    0
                    ${CENTER_X + Math.cos(angleSlider.value) * RADIUS * 0.3}
                    ${CENTER_Y - Math.sin(angleSlider.value) * RADIUS * 0.3}`}
            fill="none"
            stroke="#A22DDC"
            strokeWidth="3"
          />

          {/* Angle Label */}
          <text
            x={CENTER_X + RADIUS * 0.5 * Math.cos(angleSlider.value / 2)}
            y={CENTER_Y - RADIUS * 0.5 * Math.sin(angleSlider.value / 2)}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#000000"
            className="font-bold text-[#000000] text-md"
          >
            {`${radToDeg(angleSlider.value).toFixed(0)}°`}
          </text>

          {/* Arc following circle perimeter */}
          <path d={getPerimeterArcPath()} fill="none" stroke="#238B21" strokeWidth="8" strokeLinecap="round" />

          {/* Radius line */}
          <line x1={CENTER_X} y1={CENTER_Y} x2={circleX} y2={circleY} stroke="#A22DDC" strokeWidth="2" />

          {/* Sine line (vertical) */}
          <line x1={circleX} y1={circleY} x2={circleX} y2={CENTER_Y} stroke="#EB0000" strokeWidth="2" />

          {/* Cosine line (horizontal) */}
          <line x1={CENTER_X} y1={CENTER_Y} x2={circleX} y2={CENTER_Y} stroke="#006BE0" strokeWidth="2" />

          {/* Sine Wave */}
          <path
            d={`M ${wavePoints.sin[0].x} ${wavePoints.sin[0].y}
                    ${wavePoints.sin.map((p) => `L ${p.x} ${p.y}`).join(' ')}`}
            fill="none"
            stroke="#EB0000"
            strokeWidth="2"
          />

          {/* Cosine Wave */}
          <path
            d={`M ${wavePoints.cos[0].x} ${wavePoints.cos[0].y}
                    ${wavePoints.cos.map((p) => `L ${p.x} ${p.y}`).join(' ')}`}
            fill="none"
            stroke="#006BE0"
            strokeWidth="2"
          />

          {/* Vertical projection lines */}
          <line
            x1={waveStart + (angleSlider.value / (Math.PI * 2)) * waveWidth}
            y1={CENTER_Y}
            x2={waveStart + (angleSlider.value / (Math.PI * 2)) * waveWidth}
            y2={circleY}
            stroke="#EB0000"
            strokeWidth="4"
          />

          <line
            x1={waveStart + (angleSlider.value / (Math.PI * 2)) * waveWidth}
            y1={CENTER_Y}
            x2={waveStart + (angleSlider.value / (Math.PI * 2)) * waveWidth}
            y2={CENTER_Y - RADIUS * Math.cos(angleSlider.value)}
            stroke="#006BE0"
            strokeWidth="4"
          />

          {/* Points */}
          <circle cx={circleX} cy={circleY} r="6" fill="#dc2626" />

          <circle
            cx={waveStart + (angleSlider.value / (Math.PI * 2)) * waveWidth}
            cy={circleY}
            r="6"
            fill="#dc2626"
          />

          <circle
            cx={waveStart + (angleSlider.value / (Math.PI * 2)) * waveWidth}
            cy={CENTER_Y - RADIUS * Math.cos(angleSlider.value)}
            r="6"
            fill="#2563eb"
          />

          {/* Unit labels */}
          <text x={CENTER_X - RADIUS - 30} y={CENTER_Y - RADIUS + 5} className="font-mono text-[#333333]">
            1
          </text>
          <text x={CENTER_X - RADIUS - 30} y={CENTER_Y + RADIUS + 5} className="font-mono text-[#333333]">
            -1
          </text>
        </svg>
      </div>

      <div className="mt-6 text-center flex justify-center gap-8">
        <p className="text-xl font-besley font-bold">
          <span className="text-[#E0002B]">
            sin(<span className="italic">θ</span>)
          </span>
          &nbsp;=&nbsp;
          <span>{getExactValue('sin', angleSlider.value)}</span>
        </p>
        <p className="text-xl font-besley font-bold">
          <span className="text-[#0061FC]">
            cos(<span className="italic">θ</span>)
          </span>
          &nbsp;=&nbsp;
          <span>{getExactValue('cos', angleSlider.value)}</span>
        </p>
      </div>
    </div>
  );
};

export default CircleToWaveVisualizer;
