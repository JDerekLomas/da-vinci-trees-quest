import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import interaction from '../configs/geosynchronous-orbit-simulator-config';
import { constants } from '../configs/geosynchronous-orbit-simulator-config';
import { useTranslations } from '../../../hooks/useTranslations';
import { GameContext } from '../../../contexts/GameContext';

const GeosynchronousOrbit = () => {
  const { t } = useTranslations();
  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};
  const savedState =
    interactiveResponses?.['geosynchronous-orbit-simulator'] &&
    typeof interactiveResponses?.['geosynchronous-orbit-simulator'] === 'object'
      ? (interactiveResponses?.['geosynchronous-orbit-simulator'] as any)
      : undefined;

  const [isPlaying, setIsPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [lowOrbitRadius, setLowOrbitRadius] = useState(8000);
  const [center] = useState({ x: 0, y: 0 });
  const [lowOrbitAngle, setLowOrbitAngle] = useState(0);

  // Track if user has manually adjusted the orbit radius slider
  const [orbitRadiusSliderAdjusted, setOrbitRadiusSliderAdjusted] = useState(
    savedState?.orbitRadiusSliderAdjusted ?? false,
  );

  // For accessibility announcements
  const [announcement, setAnnouncement] = useState('');
  const announcementTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingSlider = useRef(false);
  const sliderValueRef = useRef(lowOrbitRadius);

  const viewBoxSize = 300;
  const centerOffset = viewBoxSize / 2;

  // Scale factor to convert miles to display units (graph shows 25k miles from center to edge to fit geosynchronous orbit)
  const milesToDisplayScale = 25000 / 150; // 150 display units = 25,000 miles

  // Derive grid from the same scale used to draw orbits
  const edgeMiles = centerOffset * milesToDisplayScale; // miles from center to edge (should be 25,000)
  const tickStepMiles = 5000; // label every 5k miles
  const tickSpacing = tickStepMiles / milesToDisplayScale; // display units per 5k
  const numTicks = Math.floor(edgeMiles / tickStepMiles); // ticks from center to edge

  // Geosynchronous orbit radius - fixed at 22,236 miles
  const geoRadiusMiles = 22236;
  const geoRadius = geoRadiusMiles / milesToDisplayScale;
  const lowOrbitRadiusDisplay = lowOrbitRadius / milesToDisplayScale;

  // Simplified announcement function
  const announce = useCallback((message: string) => {
    if (announcementTimeoutRef.current) {
      clearTimeout(announcementTimeoutRef.current);
    }
    setAnnouncement(message);
    announcementTimeoutRef.current = setTimeout(() => {
      setAnnouncement('');
    }, 1000);
  }, []);

  // Visual HTML equation generator
  const getCircleEquation = (
    radiusMiles: number,
    center: { x: number; y: number },
    useVariable = false,
  ): string => {
    // Display actual coordinate values instead of scaled values
    const h = Math.round(center.x * 10) / 10;
    const k = Math.round(-center.y * 10) / 10;
    const r = Math.round(radiusMiles * 10) / 10;
    return `(<span style='color: ${constants.x_color}; font-family: besley; font-style: italic;'><b>x</b></span> ${h >= 0 ? '-' : '+'} <span style='color: ${constants.h_color}; font-family: besley;  '>${Math.abs(h)}</span>)² + (<span style='color: ${constants.y_color}; font-family: besley; font-style: italic;'><b>y</b></span> ${k >= 0 ? '-' : '+'} <span style='color: ${constants.k_color}; font-family: besley;'>${Math.abs(k)}</span>)² = <span style='color: ${constants.r_color}; font-family: besley;'>${useVariable ? '<b>r</b>' : r}²</span>`;
  };

  // Accessible equation description generator for ARIA labels
  const getAccessibleEquation = (
    radiusMiles: number,
    center: { x: number; y: number },
    useVariable = false,
  ): string => {
    const h = Math.round(center.x * 10) / 10;
    const k = Math.round(-center.y * 10) / 10;
    const r = Math.round(radiusMiles * 10) / 10;

    // Replace placeholders in the template with appropriate values
    return t(interaction.equation_template)
      .replace('{operation1}', h >= 0 ? t(interaction.math_minus) : t(interaction.math_plus))
      .replace('{h}', Math.abs(h).toString())
      .replace('{operation2}', k >= 0 ? t(interaction.math_minus) : t(interaction.math_plus))
      .replace('{k}', Math.abs(k).toString())
      .replace('{squared}', t(interaction.math_squared))
      .replace('{plus}', t(interaction.math_plus))
      .replace('{equals}', t(interaction.math_equals))
      .replace('{r}', useVariable ? 'r' : r.toString())
      .replace('{squared}', t(interaction.math_squared));
  };

  useEffect(() => {
    let animationFrame: number;
    const animate = (): void => {
      if (isPlaying) {
        setTime((prev) => (prev + 1) % 360);
        setLowOrbitAngle((prev) => {
          const angularVelocity = Math.sqrt(
            (geoRadiusMiles * geoRadiusMiles * geoRadiusMiles) /
              (lowOrbitRadius * lowOrbitRadius * lowOrbitRadius),
          );
          return (prev + angularVelocity) % 360;
        });
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, geoRadiusMiles, lowOrbitRadius]);

  const getPosition = (radius: number, angle: number): { x: number; y: number } => {
    const x = center.x + radius * Math.cos((angle * Math.PI) / 180);
    const y = center.y + radius * Math.sin((angle * Math.PI) / 180);
    return { x, y };
  };

  const geoSat = getPosition(geoRadius, time);
  const lowSat = getPosition(lowOrbitRadiusDisplay, lowOrbitAngle);

  // Toggle play/pause state
  const togglePlayPause = useCallback(() => {
    setIsPlaying((prevState) => !prevState);
  }, []);

  // Function to handle slider background updates
  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    // Use a small timeout to ensure DOM elements are available after remount
    const timeoutId = setTimeout(() => {
      const sliderElement = document.getElementById('orbit-radius-slider') as HTMLInputElement;
      if (sliderElement) {
        updateSliderBackground(sliderElement);
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [updateSliderBackground, lowOrbitRadius]);

  // Handle slider start (mouse down)
  const handleSliderMouseDown = () => {
    isDraggingSlider.current = true;
  };

  // Handle slider end (mouse up) - only announce final value
  const handleSliderMouseUp = useCallback(() => {
    isDraggingSlider.current = false;
    // Only announce at the end of dragging
    announce(`${t(interaction.orbitRadiusText)} ${lowOrbitRadius} ${t(interaction.unitsText)}`);
  }, [announce, t, lowOrbitRadius]);

  // Handle slider change without announcements during drag
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRadius = Number(e.target.value);
    setLowOrbitRadius(newRadius);
    sliderValueRef.current = newRadius;

    // Track that the user has manually adjusted the slider
    setOrbitRadiusSliderAdjusted(true);

    // Reset satellite positions
    setTime(0);
    setLowOrbitAngle(0);

    // No announcement here - we announce only on mouse up
  };

  useEffect(() => {
    const isMatched = Math.floor(geoRadiusMiles) === Math.floor(lowOrbitRadius);
    if (isMatched) {
      announce(`${t(interaction.success_message)}`);
    }
  }, [lowOrbitRadius, announce, geoRadiusMiles, t]);

  // Save state to interactiveResponses
  useEffect(() => {
    if (setInteractiveResponses) {
      setInteractiveResponses((prev) => ({
        ...prev,
        'geosynchronous-orbit-simulator': {
          lowOrbitRadius,
          orbitRadiusSliderAdjusted,
        },
      }));
    }
  }, [lowOrbitRadius, orbitRadiusSliderAdjusted, setInteractiveResponses]);

  useEffect(() => {
    // Add global mouse up handler to detect end of slider drag
    const handleGlobalMouseUp = () => {
      if (isDraggingSlider.current) {
        handleSliderMouseUp();
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [lowOrbitRadius, handleSliderMouseUp]);

  return (
    <div className="w-full flex mb-5">
      {/* Accessibility announcement region - outside the main component flow */}
      <div className="sr-only" role="status" aria-live="assertive" aria-atomic="true">
        {announcement}
      </div>

      <div className="w-full max-w-2xl mx-auto text-lg overflow-hidden">
        <div className="flex flex-col items-center space-y-5">
          {/* Equations Display with proper ARIA labels */}
          <div className="w-full space-y-2 rounded-lg">
            <div className="text-black space-y-1">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-600 rounded-full mr-2" aria-hidden="true"></div>
                <span className="text-black">{t(interaction.geosynchronousOrbitText)}</span>
                <div
                  className="ml-2"
                  dangerouslySetInnerHTML={{ __html: getCircleEquation(geoRadiusMiles, center, true) }}
                  aria-label={getAccessibleEquation(geoRadiusMiles, center, true)}
                  role="math"
                />
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-600 rounded-full mr-2" aria-hidden="true"></div>
                <span className="text-black">{t(interaction.lowerOrbitText)}</span>
                <div
                  className="ml-2"
                  dangerouslySetInnerHTML={{ __html: getCircleEquation(lowOrbitRadius, center) }}
                  aria-label={getAccessibleEquation(lowOrbitRadius, center)}
                  role="math"
                />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Slider - with completely reworked accessibility */}
            <div className="w-full md:flex-1 md:mr-4">
              <div className="slider">
                <label className="block">
                  <span className="font-bold">{t(interaction.orbitRadiusText)}</span>
                  <span style={{ color: constants.r_color }}>
                    {' '}
                    {lowOrbitRadius} {t(interaction.unitsText)}
                  </span>
                </label>
                <div className="relative">
                  <input
                    id="orbit-radius-slider"
                    type="range"
                    min="4000"
                    max="22236"
                    step="1"
                    value={lowOrbitRadius}
                    onChange={handleSliderChange}
                    onMouseDown={handleSliderMouseDown}
                    onTouchStart={handleSliderMouseDown}
                    className="global-slider w-full"
                    aria-valuetext={`${t(interaction.orbitRadiusText)}: ${lowOrbitRadius} ${t(interaction.unitsText)}`}
                  />
                </div>
              </div>
            </div>

            {/* Play/Pause Button */}
            <div className="flex items-center mt-2 md:mt-0">
              <button
                onClick={togglePlayPause}
                className="p-2 rounded-full hover:bg-gray-700 focus:text-blue-500 text-[#006be0] hover:text-blue-500 mr-4 focus:outline-none focus:ring-2 focus:bg-gray-700"
                aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
              >
                {isPlaying ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Component */}
          <div
            className="relative w-full max-w-[384px] aspect-square bg-slate-800 border border-gray-200 rounded-lg"
            role="application"
            aria-label="Interactive geosynchronous orbit simulation"
          >
            <svg viewBox="0 0 300 300" aria-hidden="true">
              {/* Static star background */}
              {[
                { cx: 45, cy: 32, r: 0.8, o: 0.7 },
                { cx: 123, cy: 76, r: 0.6, o: 0.9 },
                { cx: 76, cy: 234, r: 0.7, o: 0.6 },
                { cx: 245, cy: 167, r: 0.9, o: 0.8 },
                { cx: 289, cy: 89, r: 0.6, o: 0.7 },
                { cx: 178, cy: 145, r: 0.8, o: 0.9 },
                { cx: 56, cy: 198, r: 0.7, o: 0.8 },
                { cx: 134, cy: 278, r: 0.6, o: 0.6 },
                { cx: 267, cy: 245, r: 0.8, o: 0.7 },
                { cx: 198, cy: 34, r: 0.7, o: 0.9 },
                { cx: 87, cy: 67, r: 0.6, o: 0.8 },
                { cx: 156, cy: 189, r: 0.9, o: 0.7 },
                { cx: 289, cy: 123, r: 0.7, o: 0.6 },
                { cx: 234, cy: 267, r: 0.8, o: 0.8 },
                { cx: 145, cy: 98, r: 0.6, o: 0.7 },
                { cx: 67, cy: 145, r: 0.7, o: 0.9 },
                { cx: 198, cy: 278, r: 0.8, o: 0.6 },
                { cx: 256, cy: 198, r: 0.6, o: 0.8 },
                { cx: 123, cy: 234, r: 0.9, o: 0.7 },
                { cx: 278, cy: 76, r: 0.7, o: 0.9 },
                { cx: 167, cy: 156, r: 0.8, o: 0.6 },
              ].map((star, i) => (
                <circle key={i} cx={star.cx} cy={star.cy} r={star.r} fill="white" opacity={star.o} />
              ))}

              <defs>
                <pattern id="integerGrid" width={tickSpacing} height={tickSpacing} patternUnits="userSpaceOnUse">
                  <path
                    d={`M ${tickSpacing} 0 L 0 0 0 ${tickSpacing}`}
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <g transform={`translate(${center.x}, ${center.y})`}>
                {Array.from({ length: numTicks * 2 + 1 }, (_, i) => i - numTicks).map((i) => (
                  <React.Fragment key={i}>
                    {/* Vertical lines */}
                    <line
                      x1={centerOffset + i * tickSpacing}
                      y1="0"
                      x2={centerOffset + i * tickSpacing}
                      y2="300"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="0.5"
                    />
                    {/* X-axis labels (skip origin) */}
                    {i !== 0 && (
                      <text
                        x={centerOffset + i * tickSpacing}
                        y={centerOffset + 20}
                        fill="white"
                        fontSize="10"
                        textAnchor="middle"
                      >
                        {(-i * tickStepMiles) / 1000}k
                      </text>
                    )}

                    {/* Horizontal lines */}
                    <line
                      x1="0"
                      y1={centerOffset + i * tickSpacing}
                      x2="300"
                      y2={centerOffset + i * tickSpacing}
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="0.5"
                    />
                    {/* Y-axis labels (skip origin) */}
                    {i !== 0 && (
                      <text
                        x={centerOffset - 10}
                        y={centerOffset + i * tickSpacing}
                        fill="white"
                        fontSize="10"
                        textAnchor="end"
                        dominantBaseline="middle"
                      >
                        {(i * tickStepMiles) / 1000}k
                      </text>
                    )}
                  </React.Fragment>
                ))}

                {/* Main X and Y axes with stronger visibility */}
                <line
                  x1="0"
                  y1={centerOffset}
                  x2="300"
                  y2={centerOffset}
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="1.5"
                />
                <line
                  x1={centerOffset}
                  y1="0"
                  x2={centerOffset}
                  y2="300"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="1.5"
                />

                {/* Origin label */}
                <text x={centerOffset - 15} y={centerOffset + 15} fill="white" fontSize="10" textAnchor="end">
                  0
                </text>
              </g>

              {/* Orbit Circles */}
              <circle
                cx={centerOffset}
                cy={centerOffset}
                r={geoRadius}
                stroke="#9333ea"
                fill="none"
                strokeDasharray="4 2"
                opacity="1"
                strokeWidth="1.5"
              />
              <circle
                cx={centerOffset}
                cy={centerOffset}
                r={lowOrbitRadiusDisplay}
                stroke="#dc2626"
                fill="none"
                strokeDasharray="4 2"
                opacity="1"
                strokeWidth="1.5"
              />

              {/* Earth */}
              <g transform={`translate(${centerOffset}, ${centerOffset}) rotate(${time})`}>
                <circle r="16" fill="#60a5fa" />
                <path d="M-16 0 L16 0" stroke="#34d399" strokeWidth="2" opacity="0.8" />
                <path d="M0 -16 L0 16" stroke="#34d399" strokeWidth="2" opacity="0.8" />
                <circle
                  cx="16"
                  cy="0"
                  r="3"
                  fill={Math.floor(geoRadiusMiles) === Math.floor(lowOrbitRadius) ? '#dc2626' : '#9333ea'}
                />
              </g>

              {/* Satellites */}
              <circle
                cx={centerOffset + (geoSat.x - center.x)}
                cy={centerOffset + (geoSat.y - center.y)}
                r="4"
                fill="#a78bfa"
              >
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle
                cx={centerOffset + (lowSat.x - center.x)}
                cy={centerOffset + (lowSat.y - center.y)}
                r="4"
                fill="#f87171"
              >
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeosynchronousOrbit;
