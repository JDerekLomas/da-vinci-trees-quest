import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { calculatingTangentInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';
import { useGameContext } from '../../../hooks/useGameContext';

interface Bubble {
  id: number;
  x: number;
  y: number;
  r: number;
  speed: number;
}

interface TunnelVisualizationProps {
  interaction: calculatingTangentInteraction;
}

interface Payload {
  target: string;
  step: number;
}

const TunnelVisualization = ({ interaction }: TunnelVisualizationProps) => {
  const { t } = useTranslations();
  const { dialogIndex } = useGameContext();
  const { payload } = useEventListener('calculating-tangent') as { payload: Payload };

  const { depthInput, ariaLabel, totalSteps, CONSTS, translations } = interaction;
  const {
    mcLabel,
    cableLength,
    tunnelDiameter,
    showCalculation,
    hideCalculation,
    showCalculationAria,
    hideCalculationAria,
    pythagoreanTheorem,
    pythagoreanTheoremAriaLabel,
    hypotenuseLabel,
    radiusLabel,
    cableLengthLabel,
    step1Title,
    step1FormulaAriaLabel,
    step2Title,
    step2Formula1AriaLabel,
    step2Formula2AriaLabel,
    step2Formula3AriaLabel,
    step2Formula4AriaLabel,
    step3Title,
    step3Formula1AriaLabel,
    step3Formula2AriaLabel,
  } = translations;
  const { PIXELS_PER_METER, TUNNEL_DIAMETER, PONTOON_WIDTH, PONTOON_HEIGHT, SVG_WIDTH, SVG_HEIGHT } = CONSTS;

  // States
  const [currentStep, setCurrentStep] = useState(dialogIndex === 1 ? 1 : totalSteps);
  const [depthSlider, setDepthSlider] = useState(depthInput);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [waveOffset, setWaveOffset] = useState(0);
  const [isCalculationVisible, setIsCalculationVisible] = useState(false);

  const toPixels = useCallback((meters: number) => meters * PIXELS_PER_METER, []);
  const mToFt = useCallback((num: number) => num * 3.28084, []);

  const { circleRadius, pontoonWidth, pontoonHeight, waterLineY, squareSize } = useMemo(
    () => ({
      circleRadius: toPixels(TUNNEL_DIAMETER / 2),
      pontoonWidth: toPixels(PONTOON_WIDTH),
      pontoonHeight: toPixels(PONTOON_HEIGHT),
      waterLineY: Math.round(SVG_HEIGHT * 0.16),
      squareSize: 4,
    }),
    [toPixels, TUNNEL_DIAMETER, PONTOON_WIDTH, PONTOON_HEIGHT, SVG_HEIGHT],
  );

  // Generate random bubbles once on mount
  useEffect(() => {
    const newBubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * SVG_WIDTH,
      y: waterLineY + Math.random() * (SVG_HEIGHT - waterLineY),
      r: Math.random() * 4 + 2, // radius between 2-6
      speed: Math.random() * 1.5 + 0.5, // speed between 0.5-2
    }));
    setBubbles(newBubbles);
  }, [SVG_WIDTH, SVG_HEIGHT, waterLineY]);

  // Update bubbles position
  const updateBubbles = useCallback(() => {
    setBubbles((prevBubbles) =>
      prevBubbles.map((bubble) => ({
        ...bubble,
        y: bubble.y <= waterLineY + 5 ? SVG_HEIGHT : bubble.y - bubble.speed,
        x: bubble.x + Math.sin(bubble.y / 30) * 0.3,
      })),
    );
  }, [waterLineY, SVG_HEIGHT]);

  // Animate bubbles
  useEffect(() => {
    const intervalId = setInterval(updateBubbles, 50);
    return () => clearInterval(intervalId);
  }, [updateBubbles]);

  // handle slides
  useEffect(() => {
    if (payload && (payload as Payload).step !== currentStep) {
      if (payload.step === 1) {
        setCurrentStep(1);
      } else if (payload.step === 2) {
        setCurrentStep(2);
      }
    }
  }, [payload, currentStep]);

  const geometry = useMemo(() => {
    const circleCenter = { x: SVG_WIDTH * 0.5, y: waterLineY + toPixels(depthSlider.value) };
    const pontoonY = waterLineY - pontoonHeight / 2;
    const pointM = {
      x: circleCenter.x,
      y: pontoonY + pontoonHeight,
    };
    const verticalDepth = depthSlider.value;
    const tunnelRadius = TUNNEL_DIAMETER / 2;
    const cableLength = Math.sqrt(verticalDepth * verticalDepth - tunnelRadius * tunnelRadius);
    const tangentAngle = Math.acos(tunnelRadius / verticalDepth);
    const baseAngle = -Math.PI / 2;
    const leftTangentPoint = {
      x: circleCenter.x + circleRadius * Math.cos(baseAngle - tangentAngle),
      y: circleCenter.y + circleRadius * Math.sin(baseAngle - tangentAngle),
    };
    const rightTangentPoint = {
      x: circleCenter.x + circleRadius * Math.cos(baseAngle + tangentAngle),
      y: circleCenter.y + circleRadius * Math.sin(baseAngle + tangentAngle),
    };
    // Calculate label positions for cable lengths
    const leftCableAngle = Math.atan2(leftTangentPoint.y - pointM.y, leftTangentPoint.x - pointM.x);
    const rightCableAngle = Math.atan2(rightTangentPoint.y - pointM.y, rightTangentPoint.x - pointM.x);
    // Perpendicular offsets for labels
    const labelOffset = 20;
    const leftLabelOffset = {
      x: Math.cos(leftCableAngle - Math.PI / 2) * labelOffset,
      y: Math.sin(leftCableAngle - Math.PI / 2) * labelOffset,
    };
    const rightLabelOffset = {
      x: Math.cos(rightCableAngle - Math.PI / 2) * labelOffset,
      y: Math.sin(rightCableAngle - Math.PI / 2) * labelOffset,
    };
    // Midpoints of cables for label positioning
    const leftMidpoint = {
      x: (pointM.x + leftTangentPoint.x) / 2,
      y: (pointM.y + leftTangentPoint.y) / 2,
    };
    const rightMidpoint = {
      x: (pointM.x + rightTangentPoint.x) / 2,
      y: (pointM.y + rightTangentPoint.y) / 2,
    };
    // Final label positions
    const leftLabelPosition = {
      x: leftMidpoint.x + leftLabelOffset.x,
      y: leftMidpoint.y + leftLabelOffset.y,
    };
    const rightLabelPosition = {
      x: rightMidpoint.x + rightLabelOffset.x,
      y: rightMidpoint.y + rightLabelOffset.y,
    };
    return {
      pointM,
      circleCenter,
      crossTangents: {
        leftToRight: leftTangentPoint,
        rightToLeft: rightTangentPoint,
      },
      cableLengths: {
        left: cableLength,
        right: cableLength,
      },
      labelPositions: {
        left: leftLabelPosition,
        right: rightLabelPosition,
      },
    };
  }, [depthSlider]);

  // Wave animation
  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      setWaveOffset((elapsed * 0.02) % 100);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Handle slider updates
  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    const slider = document.getElementById(`slider-${depthSlider.id}`) as HTMLInputElement;
    if (slider) {
      updateSliderBackground(slider);
    }
  }, [depthSlider, updateSliderBackground]);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDepthSlider((prev) => ({ ...prev, value: Number(e.target.value) }));
  }, []);

  const toggleCalculation = useCallback(() => {
    setIsCalculationVisible((prev) => !prev);
  }, []);

  // Calculate values for display
  const calculationValues = useMemo(() => {
    const verticalDepth = depthSlider.value;
    const tunnelRadius = TUNNEL_DIAMETER / 2;
    const cableLength = Math.sqrt(verticalDepth * verticalDepth - tunnelRadius * tunnelRadius);
    return {
      verticalDepth,
      tunnelRadius,
      cableLength,
      verticalDepthSquared: verticalDepth * verticalDepth,
      tunnelRadiusSquared: tunnelRadius * tunnelRadius,
      cableLengthSquared: cableLength * cableLength,
    };
  }, [depthSlider.value, TUNNEL_DIAMETER]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      {/* Depth control */}
      <div className="w-full max-w-md text-lg font-medium flex flex-col ">
        <div aria-live="off" className="text-base font-semibold">
          <label htmlFor={`slider-${depthSlider.id}`}>{t(depthSlider.label)}</label>:{' '}
          {mToFt(depthSlider.value).toFixed(0)} {t(depthSlider.unit ?? '')}
        </div>
        <div className="w-full">
          <div className="sliderContainer">
            <input
              id={`slider-${depthSlider.id}`}
              type="range"
              value={depthSlider.value}
              onChange={handleSliderChange}
              step={depthSlider.step}
              min={depthSlider.min}
              max={depthSlider.max}
              className="global-slider w-full"
              aria-valuetext={`${t(depthSlider.label ?? '')}: ${mToFt(depthSlider.value).toFixed(0)} ${t(depthSlider.unit ?? '')}`}
            />
          </div>
        </div>
        <p className="pt-4 text-base text-center font-semibold">
          {t(tunnelDiameter)}: {mToFt(TUNNEL_DIAMETER).toFixed(0)} ft
        </p>
      </div>

      <div role="region" aria-label={t(ariaLabel!)} className="w-full flex justify-center items-center">
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="lg:h-[400px] sm:h-[335px] border border-blue-700 rounded"
        >
          <defs>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f0f8ff" />
              <stop offset="100%" stopColor="#c1e3ff" />
            </linearGradient>
            <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0066aa" />
              <stop offset="100%" stopColor="#003366" />
            </linearGradient>

            <radialGradient id="tunnelGradient">
              <stop offset="0%" stopColor="#444" />
              <stop offset="100%" stopColor="#333" />
            </radialGradient>

            <filter id="waterRipple">
              <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
            </filter>
          </defs>

          {/* Background elements in both steps */}
          <rect x="0" y="0" width={SVG_WIDTH} height={waterLineY} fill="url(#skyGradient)" />
          <rect
            x="0"
            y={waterLineY}
            width={SVG_WIDTH}
            height={SVG_HEIGHT - waterLineY}
            fill="url(#waterGradient)"
          />
          <rect
            x="0"
            y={waterLineY}
            width={SVG_WIDTH}
            height={SVG_HEIGHT - waterLineY}
            fill="url(#waterGradient)"
            opacity="0.3"
            filter="url(#waterRipple)"
          />

          {/* Bubbles */}
          {bubbles.map(({ id, x, y, r }) => (
            <circle key={`bubble-${id}`} cx={x} cy={y} r={r} fill="rgba(255,255,255,0.3)" />
          ))}

          {/* Generate wave path more efficiently */}
          <path
            d={Array.from({ length: SVG_WIDTH / 25 }, (_, i) => {
              const startX = i * 50;
              const offsetX = startX - (waveOffset % 50);
              return i === 0
                ? `M 0 ${waterLineY}`
                : `Q ${offsetX - 25} ${waterLineY + (i % 2 ? 3 : -3)} ${offsetX} ${waterLineY}`;
            }).join(' ')}
            stroke="#3498db"
            strokeWidth="2"
            fill="none"
          />

          {/* Elements in both steps */}
          <rect
            x={geometry.circleCenter.x - pontoonWidth / 2}
            y={waterLineY - pontoonHeight / 2}
            width={pontoonWidth}
            height={pontoonHeight}
            fill="#34495e"
          />

          <circle
            cx={geometry.circleCenter.x}
            cy={geometry.circleCenter.y}
            r={circleRadius}
            fill="url(#tunnelGradient)"
            stroke="#4a9eff"
            strokeWidth="2"
          />

          <line
            x1={geometry.pointM.x}
            y1={geometry.pointM.y}
            x2={geometry.crossTangents.leftToRight.x}
            y2={geometry.crossTangents.leftToRight.y}
            stroke="#ffd700"
            strokeWidth="2"
          />
          <line
            x1={geometry.pointM.x}
            y1={geometry.pointM.y}
            x2={geometry.crossTangents.rightToLeft.x}
            y2={geometry.crossTangents.rightToLeft.y}
            stroke="#ffd700"
            strokeWidth="2"
          />

          <rect
            x={geometry.crossTangents.leftToRight.x - squareSize / 2}
            y={geometry.crossTangents.leftToRight.y - squareSize / 2}
            width={squareSize}
            height={squareSize}
            fill="#ffd700"
          />
          <rect
            x={geometry.crossTangents.rightToLeft.x - squareSize / 2}
            y={geometry.crossTangents.rightToLeft.y - squareSize / 2}
            width={squareSize}
            height={squareSize}
            fill="#ffd700"
          />

          <circle cx={geometry.pointM.x} cy={geometry.pointM.y} r="4" fill="#ffd700" />

          {/* Step 2 additional elements */}
          {currentStep === 2 && (
            <>
              {/* Cable length labels */}
              <text
                aria-hidden
                x={geometry.pointM.x - 85}
                y={(geometry.pointM.y + geometry.crossTangents.leftToRight.y) / 2}
                fontSize={18}
                fill="#ffd700"
              >
                {mToFt(geometry.cableLengths.left).toFixed(1)} ft
              </text>
              <text
                aria-hidden
                x={geometry.pointM.x + 22}
                y={(geometry.pointM.y + geometry.crossTangents.rightToLeft.y) / 2}
                fontSize={18}
                fill="#ffd700"
              >
                {mToFt(geometry.cableLengths.right).toFixed(1)} ft
              </text>

              {/* Radius lines */}
              <line
                x1={geometry.circleCenter.x}
                y1={geometry.circleCenter.y}
                x2={geometry.crossTangents.leftToRight.x}
                y2={geometry.crossTangents.leftToRight.y}
                stroke="#4a9eff"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <line
                x1={geometry.circleCenter.x}
                y1={geometry.circleCenter.y}
                x2={geometry.crossTangents.rightToLeft.x}
                y2={geometry.crossTangents.rightToLeft.y}
                stroke="#4a9eff"
                strokeWidth="1"
                strokeDasharray="2,2"
              />

              {/* Hypotenuse */}
              <line
                x1={geometry.pointM.x}
                y1={geometry.pointM.y}
                x2={geometry.circleCenter.x}
                y2={geometry.circleCenter.y}
                stroke="#4a9eff"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />

              {/* MC depth measurement label - positioned above circle center */}
              <text
                aria-hidden
                x={(geometry.pointM.x + geometry.circleCenter.x) / 2 - 30}
                y={(geometry.pointM.y + geometry.circleCenter.y) / 2 + 30}
                fontSize={18}
                fill="#ffd700"
                className="font-besley font-medium"
              >
                {mToFt(depthSlider.value).toFixed(0)} ft
              </text>

              {/* 90 degree symbols */}
              <path
                d={`M ${geometry.crossTangents.leftToRight.x} ${geometry.crossTangents.leftToRight.y - 6}
                      L ${geometry.crossTangents.leftToRight.x + 6} ${geometry.crossTangents.leftToRight.y - 6}
                      L ${geometry.crossTangents.leftToRight.x + 6} ${geometry.crossTangents.leftToRight.y}`}
                fill="none"
                stroke="#ffd700"
                strokeWidth="1"
                transform={`rotate(9, ${geometry.crossTangents.leftToRight.x}, ${geometry.crossTangents.leftToRight.y})`}
              />
              <path
                d={`M ${geometry.crossTangents.rightToLeft.x} ${geometry.crossTangents.rightToLeft.y - 6}
                      L ${geometry.crossTangents.rightToLeft.x - 6} ${geometry.crossTangents.rightToLeft.y - 6}
                      L ${geometry.crossTangents.rightToLeft.x - 6} ${geometry.crossTangents.rightToLeft.y}`}
                fill="none"
                stroke="#ffd700"
                strokeWidth="1"
                transform={`rotate(-9, ${geometry.crossTangents.rightToLeft.x}, ${geometry.crossTangents.rightToLeft.y})`}
              />

              {/* Labels */}
              <text
                x={geometry.pointM.x - 7}
                y={geometry.pointM.y - 10}
                className="font-besley font-medium"
                fontSize={18}
                fill="#fff"
              >
                M
              </text>

              <text
                x={geometry.circleCenter.x - 7}
                y={geometry.circleCenter.y + 20}
                className="font-besley font-medium"
                fontSize={18}
                fill="#fff"
              >
                C
              </text>

              {/* Legend - Bottom left with text wrapping */}
              <foreignObject
                x={10}
                y={SVG_HEIGHT - 90}
                width={SVG_WIDTH}
                height={50}
                style={{ overflow: 'visible' }}
              >
                <div
                  style={{
                    color: '#fff',
                    fontSize: '18px',
                    lineHeight: '1.5',
                    padding: '0',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                  }}
                >
                  <div style={{ marginBottom: '4px' }}>
                    {t(cableLength)}: {mToFt(geometry.cableLengths.left).toFixed(1)} ft
                  </div>
                  <div>
                    <span className="font-besley">MC :</span> {t(mcLabel)} = {mToFt(depthSlider.value).toFixed(0)}{' '}
                    ft
                  </div>
                </div>
              </foreignObject>
            </>
          )}
        </svg>
      </div>

      {/* Calculation Section - Only show in step 2 */}
      {currentStep === 2 && (
        <div className="w-full max-w-2xl mt-4 mb-6 flex flex-col items-center">
          <button
            onClick={toggleCalculation}
            className="px-4 py-2 text-base font-medium text-white bg-[#006BE0] hover:bg-[#0056b3] rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-expanded={isCalculationVisible}
            aria-label={isCalculationVisible ? t(hideCalculationAria) : t(showCalculationAria)}
          >
            {isCalculationVisible ? t(hideCalculation) : t(showCalculation)}
          </button>

          {isCalculationVisible && (
            <div className="mt-4 p-4 bg-white rounded-md border border-gray-200 w-full">
              {/* Pythagorean Theorem */}
              <div className="mb-4 text-center">
                <p className="text-base font-semibold mb-2">{t(pythagoreanTheorem)}</p>
                <div
                  className="flex justify-center items-center font-besley font-bold text-xl mb-3"
                  role="math"
                  aria-label={t(pythagoreanTheoremAriaLabel)}
                >
                  <span className="italic" style={{ color: '#008217' }}>
                    a²
                  </span>
                  <span className="mx-2">+</span>
                  <span className="italic" style={{ color: '#8e24aa' }}>
                    b²
                  </span>
                  <span className="mx-2">=</span>
                  <span className="italic" style={{ color: '#0061fc' }}>
                    c²
                  </span>
                </div>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-besley italic font-bold" style={{ color: '#0061fc' }}>
                      c
                    </span>{' '}
                    = {t(hypotenuseLabel)}
                  </p>
                  <p>
                    <span className="font-besley italic font-bold" style={{ color: '#008217' }}>
                      a
                    </span>{' '}
                    = {t(radiusLabel)}
                  </p>
                  <p>
                    <span className="font-besley italic font-bold" style={{ color: '#8e24aa' }}>
                      b
                    </span>{' '}
                    = {t(cableLengthLabel)}
                  </p>
                </div>
              </div>

              {/* Step-by-step calculation */}
              <div className="space-y-3 text-base text-center">
                <div>
                  <p className="font-semibold mb-1">{t(step1Title)}</p>
                  <div className="font-besley italic text-lg" role="math" aria-label={t(step1FormulaAriaLabel)}>
                    <span style={{ color: '#8e24aa' }}>b²</span> = <span style={{ color: '#0061fc' }}>c²</span> -{' '}
                    <span style={{ color: '#008217' }}>a²</span>
                  </div>
                </div>

                <div>
                  <p className="font-semibold mb-1">{t(step2Title)}</p>
                  <div className="space-y-1">
                    <div role="math" aria-label={t(step2Formula1AriaLabel)}>
                      <span className="font-besley italic" style={{ color: '#8e24aa' }}>
                        b²
                      </span>{' '}
                      ={' '}
                      <span className="font-besley italic" style={{ color: '#0061fc' }}>
                        c²
                      </span>{' '}
                      -{' '}
                      <span className="font-besley italic" style={{ color: '#008217' }}>
                        a²
                      </span>
                    </div>
                    <div role="math" aria-label={t(step2Formula2AriaLabel)}>
                      <span className="font-besley italic" style={{ color: '#8e24aa' }}>
                        b²
                      </span>{' '}
                      = ({mToFt(calculationValues.verticalDepth).toFixed(1)} ft)² - (
                      {mToFt(calculationValues.tunnelRadius).toFixed(1)} ft)²
                    </div>
                    <div role="math" aria-label={t(step2Formula3AriaLabel)}>
                      <span className="font-besley italic" style={{ color: '#8e24aa' }}>
                        b²
                      </span>{' '}
                      = {mToFt(calculationValues.verticalDepthSquared).toFixed(1)} ft² -{' '}
                      {mToFt(calculationValues.tunnelRadiusSquared).toFixed(1)} ft²
                    </div>
                    <div role="math" aria-label={t(step2Formula4AriaLabel)}>
                      <span className="font-besley italic" style={{ color: '#8e24aa' }}>
                        b²
                      </span>{' '}
                      = {mToFt(calculationValues.cableLengthSquared).toFixed(1)} ft²
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-semibold mb-1">{t(step3Title)}</p>
                  <div role="math" aria-label={t(step3Formula1AriaLabel)}>
                    <span className="font-besley italic" style={{ color: '#8e24aa' }}>
                      b
                    </span>{' '}
                    = √{mToFt(calculationValues.cableLengthSquared).toFixed(1)} ft²
                  </div>
                  <div className="mt-1" role="math" aria-label={t(step3Formula2AriaLabel)}>
                    <span className="font-besley italic font-bold text-lg" style={{ color: '#8e24aa' }}>
                      b
                    </span>{' '}
                    = {mToFt(calculationValues.cableLength).toFixed(1)} ft
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TunnelVisualization;
