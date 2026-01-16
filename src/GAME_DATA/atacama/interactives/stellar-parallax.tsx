import React, { useState, useEffect, useCallback } from 'react';
import { StellarParallaxInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
}

interface StellarParallaxVisualizationProps {
  interaction: StellarParallaxInteraction;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const StellarParallaxVisualization: React.FC<StellarParallaxVisualizationProps> = ({ 
  interaction,
  onInteraction 
}) => {
  const { t } = useTranslations();

  const {
    sun,
    star,
    earth,
    months,
    position1,
    position2,
    baseline,
    parallaxLabel,
    baselineLabel,
    startMotion,
    stopMotion,
    animationStartMessage,
    animationStopMessage,
    animationPositionMessage1,
    animationPositionMessage2,
  } = interaction.translations;

  // Destructure the new configuration options with defaults
  const { 
    enableMotion, 
    showMotionControls 
  } = interaction;

  const [angle, setAngle] = useState<number>(0);
  const [isMoving, setIsMoving] = useState<boolean>(enableMotion);
  const [stars, setStars] = useState<Star[]>([]);
  const [animationPositionMessage, setAnimationPositionMessage] = useState<string>('');
  const [animationMessage, setAnimationMessage] = useState<string>('');
  const [hasStartedMotion, setHasStartedMotion] = useState<boolean>(enableMotion);

  const parallaxArcsec: number = 1.0;

  const polarToCartesian = useCallback(
    (centerX: number, centerY: number, radius: number, angleInDegrees: number): { x: number; y: number } => {
      const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
      };
    },
    [],
  );

  const describeArc = useCallback(
    (x: number, y: number, radius: number, startAngle: number, endAngle: number): string => {
      const start = polarToCartesian(x, y, radius, endAngle);
      const end = polarToCartesian(x, y, radius, startAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
      const sweepFlag = endAngle > startAngle ? '0' : '1';
      return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, sweepFlag, end.x, end.y].join(' ');
    },
    [polarToCartesian],
  );

  useEffect(() => {
    const newStars: Star[] = Array.from({ length: 100 }, () => ({
      x: Math.random() * 500,
      y: Math.random() * 400,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.5,
    }));
    setStars(newStars);
  }, []);

  useEffect(() => {
    // set animation message
    let animationFrameId: number;
    if (isMoving) {
      const animate = () => {
        setAngle((prev) => {
          if (prev + 0.02 > 2 * Math.PI) {
            return 0;
          }
          return prev + 0.02;
        });
        animationFrameId = requestAnimationFrame(animate);
      };
      animationFrameId = requestAnimationFrame(animate);
    }
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isMoving]);

  useEffect(() => {
    if (!isMoving) {
      setAnimationPositionMessage('');
      return;
    }
    if (angle.toFixed(2) === (0).toFixed(2)) {
      setAnimationPositionMessage(t(animationPositionMessage2));
    } else if (angle.toFixed(2) === Math.PI.toFixed(2)) {
      setAnimationPositionMessage(t(animationPositionMessage1));
    }
  }, [angle, isMoving, t, animationPositionMessage1, animationPositionMessage2]);

  // Calculate positions
  const earthX: number = 250 + 175 * Math.cos(angle);
  const earthY: number = 300 + 87.5 * Math.sin(angle);
  const starX: number = 250;
  const starY: number = 25;
  const sunX: number = 250;
  const sunY: number = 300;

  const baselineAngle: number = Math.atan2(sunX - starX, sunY - starY);
  const sightlineAngle: number = Math.atan2(earthX - starX, earthY - starY);

  const arcStart: number = (baselineAngle * 180) / Math.PI + 180;
  const arcEnd: number = (sightlineAngle * 180) / Math.PI + 180;

  // Handler for the motion button
  const handleMotionToggle = () => {
    const newIsMoving = !isMoving;
    setIsMoving(newIsMoving);
    
    // If starting motion and it's the first time, trigger interaction
    if (newIsMoving && !hasStartedMotion) {
      setHasStartedMotion(true);
      onInteraction({ 'stellar-parallax-motion-started': true });
    }
    
    setAnimationMessage(() => (isMoving ? t(animationStopMessage) : t(animationStartMessage)));
    setTimeout(() => {
      setAnimationMessage('');
    }, 200);
    setAnimationPositionMessage('');
  };

  return (
    <div className="w-full bg-black text-white" role="region" aria-label={t(interaction.ariaLabel)}>
      {showMotionControls && (
        <div className="w-full flex justify-end pt-4 pr-4">
          <button
            onClick={handleMotionToggle}
            className="px-4 py-2 text-base bg-white text-[#0055B2] rounded-lg transition-all"
          >
            {isMoving ? t(stopMotion) : t(startMotion)}
          </button>
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {animationMessage}
          </div>
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {animationPositionMessage}
          </div>
        </div>
      )}

      <div className='relative w-full h-[450px]'>
        <svg viewBox="0 0 500 415" className="absolute w-full h-full pt-4">
          <g>
            {stars.map((star, i) => (
              <circle
                key={i}
                cx={star.x + (4 * (earthX - 250)) / 175}
                cy={star.y}
                r={star.r}
                fill="white"
                opacity={star.opacity}
              />
            ))}
          </g>

          {/* Left triangle */}
          {earthX < 250 && (
            <path
              d={`M ${starX} ${starY} L ${sunX} ${sunY} L 75 300 Z`}
              fill="rgba(191, 0, 30, 0.15)"
              stroke="rgba(191, 0, 30, 1)"
              strokeWidth="1"
              strokeDasharray={'4 4'}
            />
          )}

          {/* Right triangle */}
          {earthX > 250 && (
            <path
              d={`M ${starX} ${starY} L ${sunX} ${sunY} L 425 300 Z`}
              fill="rgba(0, 102, 204, 0.15)"
              stroke="rgba(0, 102, 204, 1)"
              strokeWidth="1"
              strokeDasharray={'4 4'}
            />
          )}

          <path
            d={`M ${sunX} ${sunY - 20} L ${sunX} ${sunY} L ${sunX + 20} ${sunY}`}
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
          <text x={sunX + 22} y={sunY - 12} fill="white" fontSize={16} fontWeight="bold">
            90°
          </text>

          {/* Arc */}
          <path
            d={describeArc(starX, starY, 30, 360 - arcEnd, arcStart)}
            fill="none"
            stroke="white"
            strokeWidth={1}
            strokeDasharray="2 2"
            style={{
              filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.8))',
            }}
          />

          <text
            x={starX + 35}
            y={starY + 15}
            fill="white"
            fontSize={16}
            fontWeight="bold"
            role="textbox"
            aria-label={t(parallaxLabel)}
            className="font-besley"
          >
            <tspan fontStyle="italic">P</tspan> = {parallaxArcsec.toFixed(2)}″
          </text>

          <line
            x1={starX}
            y1={starY}
            x2={starX}
            y2={starY + 50}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth={1}
            strokeDasharray="2 2"
          />
          <line
            x1={starX}
            y1={starY}
            x2={earthX}
            y2={earthY}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth={1}
            strokeDasharray="2 2"
          />

          {/* Star */}
          <circle cx={250} cy={25} r={6} fill="yellow" />
          {/* Sun */}
          <circle cx={250} cy={300} r={20} fill="orange" />
          <ellipse cx={250} cy={300} rx={175} ry={87.5} fill="none" stroke="#666" strokeWidth={1} />
          {/* Earth */}
          <circle cx={earthX} cy={earthY} r={8} fill="#3399FF" />
          <circle cx={75} cy={300} r={3} fill="yellow" />
          <circle cx={425} cy={300} r={3} fill="yellow" />

          <text x={250} y={12} textAnchor="middle" fill="white" fontSize={16}>
            {t(star)}
          </text>
          <text x={90} y={265} textAnchor="middle" fill="white" fontSize={16}>
            {t(position1)}
          </text>
          <text x={90} y={280} textAnchor="middle" fill="white" fontSize={16}>
            {t(months)}
          </text>
          <text x={410} y={265} textAnchor="middle" fill="white" fontSize={16}>
            {t(position2)}
          </text>
          <text x={410} y={280} textAnchor="middle" fill="white" fontSize={16}>
            {t(months)}
          </text>
          <text x={250} y={335} textAnchor="middle" fill="white" fontSize={16}>
            {t(sun)}
          </text>
          <text
            x={250}
            y={sunY + 55}
            textAnchor="middle"
            fill="white"
            fontSize={16}
            fontWeight="bold"
            role="textbox"
            aria-label={t(baselineLabel)}
          >
            {t(baseline)}
          </text>
          <text x={earthX} y={earthY + 25} textAnchor="middle" fill="white" fontSize={16}>
            {t(earth)}
          </text>
        </svg>
      </div>
    </div>
  );
};

export default StellarParallaxVisualization;