import { useState, useEffect, useCallback, useMemo } from 'react';
import { AnchorAngleInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { useGameContext } from '../../../hooks/useGameContext';
import { useEventListener } from '../../../hooks/useEventListener';

interface Point {
  x: number;
  y: number;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  r: number;
  speed: number;
}

interface TunnelVisualizationProps {
  interaction: AnchorAngleInteraction;
}

interface Payload {
  target: string;
  step: number;
}

const TunnelVisualization = ({ interaction }: TunnelVisualizationProps) => {
  const { t } = useTranslations();
  const { dialogIndex } = useGameContext();
  const { payload } = useEventListener('anchor-angle') as { payload: Payload };

  const { ariaLabel, depthInput, totalSteps, CONSTS, translations } = interaction;
  const { tunnelDiameterLabel, cableLength } = translations;
  const { SVG_WIDTH, SVG_HEIGHT, SCALE_FACTOR, TUNNEL_DIAMETER } = CONSTS;

  const [currentSlide, setCurrentSlide] = useState(dialogIndex === 1 ? 1 : totalSteps);
  const [depthSlider, setDepthSlider] = useState(depthInput);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [waveOffset, setWaveOffset] = useState(0);

  // Constants for visualization
  const circleRadius = (TUNNEL_DIAMETER / 2) * SCALE_FACTOR;
  const pontoonWidth = TUNNEL_DIAMETER * 1.5 * SCALE_FACTOR;
  const pontoonHeight = TUNNEL_DIAMETER * 0.25 * SCALE_FACTOR;
  const squareSize = 8;
  const waterLineY = 70;
  const angleArcRadius = 15;

  const mToFt = useCallback((num: number) => num * 3.28084, []);

  // handle slides
  useEffect(() => {
    if (payload && (payload as Payload).step !== currentSlide) {
      if (payload.step === 1) {
        setCurrentSlide(1);
      } else if (payload.step === 2) {
        setCurrentSlide(2);
      } else if (payload.step === 3) {
        setCurrentSlide(3);
      }
    }
  }, [payload, currentSlide]);

  // Generate random bubbles once on mount
  useEffect(() => {
    setBubbles(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * SVG_WIDTH,
        y: Math.random() * SVG_HEIGHT,
        r: Math.random() * 4 + 2,
        speed: Math.random() * 1.5 + 0.5,
      })),
    );
  }, []);

  // Wave animation
  useEffect(() => {
    let animationFrameId: number;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      // Update wave offset (0 to 100, then repeat)
      setWaveOffset((elapsed * 0.02) % 100);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const updateBubbles = useCallback(() => {
    setBubbles((prevBubbles) =>
      prevBubbles.map((bubble) => ({
        ...bubble,
        y: bubble.y <= waterLineY + 5 ? SVG_HEIGHT : bubble.y - bubble.speed,
        x: bubble.x + Math.sin(bubble.y / 30) * 0.3,
      })),
    );
  }, [SVG_HEIGHT]);

  // Animate bubbles
  useEffect(() => {
    const intervalId = setInterval(updateBubbles, 50);
    return () => clearInterval(intervalId);
  }, [updateBubbles]);

  // Calculate geometry based on depth
  const geometry = useMemo(() => {
    const height = depthSlider.value * SCALE_FACTOR;
    const circleCenter = { x: SVG_WIDTH / 2, y: waterLineY + height };
    const pontoonY = waterLineY - pontoonHeight / 2;
    const leftAnchor = { x: circleCenter.x - circleRadius, y: pontoonY + pontoonHeight };
    const rightAnchor = { x: circleCenter.x + circleRadius, y: pontoonY + pontoonHeight };
    const verticalTangents = {
      left: { x: circleCenter.x - circleRadius, y: circleCenter.y },
      right: { x: circleCenter.x + circleRadius, y: circleCenter.y },
    };
    const calculateTangentPoint = (anchorPoint: Point) => {
      const dx = anchorPoint.x - circleCenter.x;
      const dy = anchorPoint.y - circleCenter.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const tangentAngle = Math.acos(circleRadius / distance);
      const baseAngle = Math.atan2(dy, dx);
      const angle = anchorPoint.x < circleCenter.x ? baseAngle + tangentAngle : baseAngle - tangentAngle;
      return {
        x: circleCenter.x + circleRadius * Math.cos(angle),
        y: circleCenter.y + circleRadius * Math.sin(angle),
      };
    };
    // Calculate vertical cable length
    const verticalDepth = depthSlider.value;
    const tunnelRadius = TUNNEL_DIAMETER / 2;
    const cableLength = Math.sqrt(verticalDepth * verticalDepth - tunnelRadius * tunnelRadius);

    return {
      leftAnchor,
      rightAnchor,
      circleCenter,
      verticalTangents,
      crossTangents: {
        leftToRight: calculateTangentPoint(leftAnchor),
        rightToLeft: calculateTangentPoint(rightAnchor),
      },
      cableLengths: {
        left: cableLength.toFixed(1),
        right: cableLength.toFixed(1),
      },
    };
  }, [depthSlider.value, SCALE_FACTOR, SVG_WIDTH, pontoonHeight, circleRadius, TUNNEL_DIAMETER]);

  // Calculate angles based on geometry
  const angles = useMemo(() => {
    const angleToVerticalTangent = Math.atan2(
      geometry.verticalTangents.left.x - geometry.circleCenter.x,
      geometry.verticalTangents.left.y - geometry.circleCenter.y,
    );
    const angleToCrossTangent = Math.atan2(
      geometry.crossTangents.leftToRight.x - geometry.circleCenter.x,
      geometry.crossTangents.leftToRight.y - geometry.circleCenter.y,
    );
    let arcAngle = ((angleToCrossTangent - angleToVerticalTangent) * 180) / Math.PI;
    if (arcAngle < 0) arcAngle += 360;
    const gammaDegrees = arcAngle;
    const betaDegrees = 360 - gammaDegrees;
    const alphaDegrees = Math.abs(gammaDegrees - betaDegrees) / 2;
    return {
      beta: betaDegrees.toFixed(1),
      gamma: gammaDegrees.toFixed(1),
      alpha: alphaDegrees.toFixed(1),
    };
  }, [geometry]);

  // Create arc path for angle visualization
  const arcData = useMemo(() => {
    const verticalVector = {
      x: geometry.verticalTangents.left.x - geometry.leftAnchor.x,
      y: geometry.verticalTangents.left.y - geometry.leftAnchor.y,
    };
    const crossVector = {
      x: geometry.crossTangents.leftToRight.x - geometry.leftAnchor.x,
      y: geometry.crossTangents.leftToRight.y - geometry.leftAnchor.y,
    };
    const verticalAngle = Math.atan2(verticalVector.y, verticalVector.x);
    const crossAngle = Math.atan2(crossVector.y, crossVector.x);
    let startAngle = Math.min(verticalAngle, crossAngle);
    let endAngle = Math.max(verticalAngle, crossAngle);
    if (endAngle - startAngle > Math.PI) {
      [startAngle, endAngle] = [endAngle, startAngle + 2 * Math.PI];
    }
    const arcStart = {
      x: geometry.leftAnchor.x + angleArcRadius * Math.cos(startAngle),
      y: geometry.leftAnchor.y + angleArcRadius * Math.sin(startAngle),
    };
    const arcEnd = {
      x: geometry.leftAnchor.x + angleArcRadius * Math.cos(endAngle),
      y: geometry.leftAnchor.y + angleArcRadius * Math.sin(endAngle),
    };
    const midAngle = (startAngle + endAngle) / 2;
    const labelOffset = angleArcRadius * 1.2;
    const labelPos = {
      x: geometry.leftAnchor.x + labelOffset * Math.cos(midAngle),
      y: geometry.leftAnchor.y + labelOffset * Math.sin(midAngle) + 10,
    };
    const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';
    return {
      path: `M ${arcStart.x} ${arcStart.y} A ${angleArcRadius} ${angleArcRadius} 0 ${largeArcFlag} 1 ${arcEnd.x} ${arcEnd.y}`,
      labelPos,
    };
  }, [geometry, angleArcRadius]);

  const showGreekSymbols = currentSlide > 1;
  const showFormulas = currentSlide > 2;

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

  // Slider change handler
  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDepthSlider((prev) => ({ ...prev, value: Number(e.target.value) }));
  }, []);

  // Render optimized component
  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-2">
        <div className="w-full max-w-md text-lg font-medium flex flex-col">
          <div aria-live="off" className="font-semibold">
            <label htmlFor={`slider-${depthSlider.id}`}>{t(depthSlider.label)}</label>:{' '}
            {mToFt(depthSlider.value).toFixed(1)} {t(depthSlider.unit ?? '')}
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
                aria-valuetext={`${t(depthSlider.label ?? '')}: ${mToFt(depthSlider.value).toFixed(1)} ${t(depthSlider.unit ?? '')}`}
              />
            </div>
          </div>
          <p className="pt-4 text-center font-semibold">
            {t(tunnelDiameterLabel)}: {mToFt(TUNNEL_DIAMETER).toFixed(1)} ft
          </p>
        </div>

        <div aria-label={t(ariaLabel!)} role="region" className="flex justify-center items-center w-full">
          <svg
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            className="lg:h-[400px] sm:h-[380px] border border-blue-700 rounded"
          >
            {/* Defs section */}
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
                <stop offset="100%" stopColor="#222" />
              </radialGradient>

              <filter id="waterRipple">
                <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
              </filter>
            </defs>

            {/* Water background */}
            <rect x="0" y="0" width={SVG_WIDTH} height={waterLineY} fill="url(#skyGradient)" />
            <rect
              x="0"
              y={waterLineY}
              width={SVG_WIDTH}
              height={SVG_HEIGHT - waterLineY}
              fill="url(#waterGradient)"
            />

            {/* Animated water ripples */}
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
            {bubbles.map((bubble) => (
              <circle
                key={`bubble-${bubble.id}`}
                cx={bubble.x}
                cy={bubble.y}
                r={bubble.r}
                fill="rgba(255,255,255,0.3)"
              />
            ))}

            {/* Animated wavy water line */}
            <path
              d={`M 0 ${waterLineY}
              Q ${25 - (waveOffset % 50)} ${waterLineY - 3} ${50 - (waveOffset % 50)} ${waterLineY}
              Q ${75 - (waveOffset % 50)} ${waterLineY + 3} ${100 - (waveOffset % 50)} ${waterLineY}
              Q ${125 - (waveOffset % 50)} ${waterLineY - 3} ${150 - (waveOffset % 50)} ${waterLineY}
              Q ${175 - (waveOffset % 50)} ${waterLineY + 3} ${200 - (waveOffset % 50)} ${waterLineY}
              Q ${225 - (waveOffset % 50)} ${waterLineY - 3} ${250 - (waveOffset % 50)} ${waterLineY}
              Q ${275 - (waveOffset % 50)} ${waterLineY + 3} ${300 - (waveOffset % 50)} ${waterLineY}
              Q ${325 - (waveOffset % 50)} ${waterLineY - 3} ${350 - (waveOffset % 50)} ${waterLineY}
              Q ${375 - (waveOffset % 50)} ${waterLineY + 3} ${400 - (waveOffset % 50)} ${waterLineY}
              Q ${425 - (waveOffset % 50)} ${waterLineY - 3} ${450 - (waveOffset % 50)} ${waterLineY}`}
              stroke="#3498db"
              strokeWidth="2"
              fill="none"
            />

            {/* Formulas (only in third slide) */}
            {showFormulas && (
              <>
                <text
                  x={SVG_WIDTH / 2 - 137}
                  y="390"
                  textAnchor="middle"
                  className="font-bold font-besley italic"
                  fontSize={18}
                  fill="#b3e0ff"
                >
                  α = ½(γ − β)
                </text>
                <text
                  x={SVG_WIDTH / 2 - 60}
                  y="415"
                  textAnchor="middle"
                  className="font-bold font-besley"
                  fontSize={18}
                  fill="#b3e0ff"
                >
                  <tspan className="italic">α</tspan> = {angles.alpha}° = ½({angles.gamma}° − {angles.beta}°)
                </text>

                <text
                  x={geometry.circleCenter.x - circleRadius * 2.5}
                  y={waterLineY + 180}
                  textAnchor="end"
                  className="font-bold font-besley"
                  fontSize={18}
                  fill="#b3e0ff"
                >
                  <tspan className="italic">β</tspan> = {angles.beta}°
                </text>
                <text
                  x={geometry.circleCenter.x + circleRadius * 2.5}
                  y={waterLineY + 180}
                  textAnchor="start"
                  className="font-bold font-besley"
                  fontSize={18}
                  fill="#b3e0ff"
                >
                  <tspan className="italic">γ</tspan> = {angles.gamma}°
                </text>
                {/* Legend */}
                <g transform={`translate(${SVG_WIDTH * 0.015}, ${SVG_HEIGHT * 0.92})`}>
                  <text x="5" y="26" fill="#fff" fontSize={18}>
                    {t(cableLength)}: {mToFt(Number(geometry.cableLengths.left)).toFixed(1)} ft
                  </text>
                </g>
              </>
            )}

            {/* Pontoon */}
            <rect
              x={geometry.circleCenter.x - pontoonWidth / 2}
              y={waterLineY - pontoonHeight / 2}
              width={pontoonWidth}
              height={pontoonHeight}
              fill="#34495e"
            />

            {/* Tunnel circle */}
            <circle
              cx={geometry.circleCenter.x}
              cy={geometry.circleCenter.y}
              r={circleRadius}
              fill="url(#tunnelGradient)"
              stroke="#4a5568"
              strokeWidth="2"
            />

            {/* Cable length labels */}
            <text
              aria-hidden
              x={geometry.circleCenter.x - 110}
              y={(geometry.leftAnchor.y + geometry.crossTangents.leftToRight.y) / 2}
              fontSize={18}
              fill="#ffd700"
            >
              {mToFt(Number(geometry.cableLengths.left)).toFixed(1)} ft
            </text>
            <text
              aria-hidden
              x={geometry.circleCenter.x + 45}
              y={(geometry.rightAnchor.y + geometry.crossTangents.rightToLeft.y) / 2}
              fontSize={18}
              fill="#ffd700"
            >
              {mToFt(Number(geometry.cableLengths.right)).toFixed(1)} ft
            </text>

            {/* Vertical lines */}
            <line
              x1={geometry.leftAnchor.x}
              y1={geometry.leftAnchor.y}
              x2={geometry.verticalTangents.left.x}
              y2={geometry.verticalTangents.left.y}
              stroke="#ffd700"
              strokeWidth="3"
              opacity={currentSlide > 1 ? '0.8' : '1'}
            />
            <line
              x1={geometry.rightAnchor.x}
              y1={geometry.rightAnchor.y}
              x2={geometry.verticalTangents.right.x}
              y2={geometry.verticalTangents.right.y}
              stroke="#ffd700"
              strokeWidth="2"
              opacity={currentSlide > 1 ? '0.8' : '1'}
            />

            {/* Cross lines */}
            <line
              x1={geometry.leftAnchor.x}
              y1={geometry.leftAnchor.y}
              x2={geometry.crossTangents.leftToRight.x}
              y2={geometry.crossTangents.leftToRight.y}
              stroke="#ffd700"
              strokeWidth="3"
            />
            <line
              x1={geometry.rightAnchor.x}
              y1={geometry.rightAnchor.y}
              x2={geometry.crossTangents.rightToLeft.x}
              y2={geometry.crossTangents.rightToLeft.y}
              stroke="#ffd700"
              strokeWidth="2"
              opacity={currentSlide > 1 ? '0.8' : '1'}
            />

            {/* Radius lines */}
            <line
              x1={geometry.circleCenter.x}
              y1={geometry.circleCenter.y}
              x2={geometry.verticalTangents.left.x}
              y2={geometry.verticalTangents.left.y}
              stroke="#ffd700"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
            <line
              x1={geometry.circleCenter.x}
              y1={geometry.circleCenter.y}
              x2={geometry.crossTangents.leftToRight.x}
              y2={geometry.crossTangents.leftToRight.y}
              stroke="#ffd700"
              strokeWidth="1"
              strokeDasharray="2,2"
            />

            {/* Greek symbols */}
            {showGreekSymbols && (
              <>
                <text
                  x={geometry.circleCenter.x - circleRadius / 4}
                  y={geometry.circleCenter.y - 10}
                  className="font-bold font-besley italic"
                  fontSize={18}
                  fill="#b3e0ff"
                >
                  β
                </text>
                <text
                  x={geometry.circleCenter.x - circleRadius / 4}
                  y={geometry.circleCenter.y + 20}
                  className="font-bold font-besley italic"
                  fontSize={18}
                  fill="#b3e0ff"
                >
                  γ
                </text>
              </>
            )}

            {/* Square markers */}
            <rect
              x={geometry.verticalTangents.left.x - squareSize / 2}
              y={geometry.verticalTangents.left.y - squareSize / 2}
              width={squareSize}
              height={squareSize}
              fill="#e6c200"
            />
            <rect
              x={geometry.verticalTangents.right.x - squareSize / 2}
              y={geometry.verticalTangents.right.y - squareSize / 2}
              width={squareSize}
              height={squareSize}
              fill="#e6c200"
              opacity="0.8"
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
              opacity="0.8"
            />

            {/* Arc and alpha symbol */}
            <path d={arcData.path} fill="none" stroke="#b3e0ff" strokeWidth="1" strokeDasharray="2,2" />

            {showGreekSymbols && (
              <text
                x={arcData.labelPos.x}
                y={arcData.labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-bold font-besley italic"
                fontSize={18}
                fill="#b3e0ff"
              >
                α
              </text>
            )}

            {/* Anchor points */}
            <circle
              cx={geometry.leftAnchor.x}
              cy={geometry.leftAnchor.y}
              r="6"
              fill="#ffd700"
              stroke="#fff"
              strokeWidth="1.5"
            />
            <circle
              cx={geometry.rightAnchor.x}
              cy={geometry.rightAnchor.y}
              r="6"
              fill="#ffd700"
              stroke="#fff"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TunnelVisualization;
