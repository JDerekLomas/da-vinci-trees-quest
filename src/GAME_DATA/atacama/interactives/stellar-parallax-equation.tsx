import React, { useState, useEffect } from 'react';
import { StellarParallaxEquationInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import parse from 'html-react-parser';
import { EventBus } from '../../../services/EventBus';

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
}

const StellarParallaxVisualization: React.FC<{ interaction: StellarParallaxEquationInteraction }> = ({
  interaction,
}) => {
  const { t } = useTranslations();

  const { sun, star, earth, months, position1, position2, baseline, parallaxLabel, baselineLabel } =
    interaction.translations;

  const [stars, setStars] = useState<Star[]>([]);
  const [equationConfig, setEquationConfig] = useState<string>('stellar-parallax-equation-1');

  const parallaxArcsec: number = 1.0;

  useEffect(() => {
    const newStars: Star[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * 500,
      y: Math.random() * 300,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.5,
    }));
    setStars(newStars);
  }, []);

  useEffect(() => {
    const handleUpdateEquation = (data: any) => {
      if (data && data.configName) {
        console.log('Updating equation configuration to:', data.configName);
        setEquationConfig(data.configName);
      }
    };
        EventBus.on('updateEquationConfig', handleUpdateEquation);
    
    return () => {
      EventBus.off('updateEquationConfig', handleUpdateEquation);
    };
  }, []);

  const getEquationTranslationKey = () => {
    switch (equationConfig) {
      case 'stellar-parallax-equation-1':
        return 'scenes.S6.S6_D0_F50_C9.translations.equations_1';
      case 'stellar-parallax-equation-2':
        return 'scenes.S6.S6_D0_F50_C9.translations.equations_2';
      case 'stellar-parallax-equation':
      default:
        return 'scenes.S6.S6_D0_F50_C9.translations.equations';
    }
  };

  // Calculate positions
  const earthX: number = 200 + 140 * Math.cos(0);
  const earthY: number = 225 + 70 * Math.sin(0);
  const starX: number = 200;
  const starY: number = 20;
  const sunX: number = 200;
  const sunY: number = 225;

  return (
    <div
      className="w-full p-2 flex flex-col items-center justify-center bg-black text-white"
      role="region"
      aria-label={t(interaction.ariaLabel)}
      tabIndex={0}
    >
      <div className="flex justify-center items-center w-full">
        <svg viewBox="0 0 500 300" className="max-w-[650px] w-full mx-auto pt-1">
          {/* Shift all content 50px right to center the drawing */}
          <g transform="translate(50, 0)">
            <g>
              {stars.map((star, i) => (
                <circle key={i} cx={star.x} cy={star.y} r={star.r} fill="white" opacity={star.opacity} />
              ))}
            </g>

            {/* Left triangle */}
            <path
              d={`M ${starX} ${starY} L ${sunX} ${sunY} L 60 225 Z`}
              fill="rgba(191, 0, 30, 0.15)"
              stroke="rgba(191, 0, 30, 1)"
              strokeWidth="1"
            />

            {/* Right triangle */}
            <path
              d={`M ${starX} ${starY} L ${sunX} ${sunY} L 340 225 Z`}
              fill="rgba(0, 102, 204, 0.15)"
              stroke="rgba(0, 102, 204, 1)"
              strokeWidth="1"
            />

            {/* Angle */}
            <path
              d={`M ${sunX} ${sunY - 16} L ${sunX} ${sunY} L ${sunX + 16} ${sunY}`}
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <text x={sunX + 18} y={sunY - 10} fill="white" fontSize={12} fontWeight="bold">
              90°
            </text>

            {/* Arc */}
            <path
              d="M 200 45 A 25 25 0 0 0 213.8 41"
              fill="none"
              stroke="white"
              strokeWidth={1}
              strokeDasharray="2 2"
              style={{
                filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.8))',
              }}
            />

            <text
              x={starX + 28}
              y={starY + 12}
              fill="white"
              fontSize={12}
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
              y2={starY + 40}
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
            <circle cx={200} cy={20} r={5} fill="yellow" />
            {/* Sun */}
            <circle cx={200} cy={225} r={16} fill="orange" />
            <ellipse cx={200} cy={225} rx={140} ry={70} fill="none" stroke="#666" strokeWidth={1} />
            {/* Earth */}
            <circle cx={earthX} cy={earthY} r={7} fill="#3399FF" />
            <circle cx={60} cy={225} r={3} fill="yellow" />
            <circle cx={340} cy={225} r={3} fill="yellow" />

            <text x={200} y={10} textAnchor="middle" fill="white" fontSize={12}>
              {t(star)}
            </text>
            <text x={70} y={200} textAnchor="middle" fill="white" fontSize={12}>
              {t(position1)}
            </text>
            <text x={70} y={215} textAnchor="middle" fill="white" fontSize={12}>
              {t(months)}
            </text>
            <text x={330} y={200} textAnchor="middle" fill="white" fontSize={12}>
              {t(position2)}
            </text>
            <text x={330} y={215} textAnchor="middle" fill="white" fontSize={12}>
              {t(months)}
            </text>
            <text x={200} y={255} textAnchor="middle" fill="white" fontSize={12}>
              {t(sun)}
            </text>
            <text
              x={200}
              y={sunY + 45}
              textAnchor="middle"
              fill="white"
              fontSize={12}
              fontWeight="bold"
              role="textbox"
              aria-label={t(baselineLabel)}
            >
              {t(baseline)}
            </text>
            <text x={earthX} y={earthY + 20} textAnchor="middle" fill="white" fontSize={12}>
              {t(earth)}
            </text>
          </g>
        </svg>
      </div>

      <div className="w-[90%] mt-2 p-2 space-y-2 bg-white text-black text-lg rounded-lg">
        {parse(t(getEquationTranslationKey()))}
      </div>
    </div>
  );
};

export default StellarParallaxVisualization;
