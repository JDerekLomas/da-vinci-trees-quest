import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StellarParallaxMathInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import './stellar-parallax-math.css';

interface StarPosition {
  x: number;
  y: number;
  r: number;
  opacity: number;
}

const SimpleParallaxMath: React.FC<{ interaction: StellarParallaxMathInteraction }> = ({ interaction }) => {
  const { t } = useTranslations();
  const { ariaLabel, translations, parallaxInput } = interaction;
  const { sun, star, distance, parsecs, arcseconds, au, earthPosition1, earthPosition2, astronomicalUnit } =
    translations;
  const [parallaxArcsec, setParallaxArcsec] = useState<number>(parallaxInput.defaultValue);

  const { earth1, earth2 } = useMemo(() => {
    const radius = 80;
    return {
      earth1: {
        x: 100 + radius * Math.sin(0),
        y: 200 - radius * Math.cos(0),
      },
      earth2: {
        x: 100 + radius * Math.sin(Math.PI),
        y: 200 - radius * Math.cos(Math.PI),
      },
    };
  }, []);

  const starX = useMemo(() => {
    const minX = 200;
    const maxX = 600;
    const scale = 1 - parallaxArcsec;
    return minX + scale * (maxX - minX);
  }, [parallaxArcsec]);

  const parallaxArcCalculation = useMemo(() => {
    const radius = 60;
    const vec1 = {
      x: earth1.x - starX,
      y: earth1.y - 200,
    };
    const vec2 = {
      x: earth2.x - starX,
      y: earth2.y - 200,
    };

    const angle1 = Math.atan2(vec1.y, vec1.x);
    const angle2 = Math.atan2(vec2.y, vec2.x);

    let angleDiff = angle2 - angle1;
    angleDiff =
      angleDiff > Math.PI ? angleDiff - 2 * Math.PI : angleDiff < -Math.PI ? angleDiff + 2 * Math.PI : angleDiff;

    const [, endAngle] = angleDiff > 0 ? [angle1, angle2] : [angle2, angle1];

    return `M ${starX - radius} ${200} A ${radius} ${radius} 0 0 1 ${starX + radius * Math.cos(endAngle)} ${200 + radius * Math.sin(endAngle)}`;
  }, [earth1.x, earth1.y, earth2.x, earth2.y, starX]);

  const distancePC = useMemo(() => 1 / parallaxArcsec, [parallaxArcsec]);

  // Generate random stars for the background
  const backgroundStars: StarPosition[] = useMemo(() => {
    const stars: StarPosition[] = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * 700,
        y: Math.random() * 400,
        r: Math.random() * 1.5,
        opacity: Math.random() * 0.8 + 0.2,
      });
    }
    return stars;
  }, [parallaxArcsec]);

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #e0e0e0 ${percent}%)`;
  }, []);

  useEffect(() => {
    const parallaxSlider = document.getElementById(`slider-${parallaxInput.id}`) as HTMLInputElement;
    if (parallaxSlider) {
      updateSliderBackground(parallaxSlider);
    }
  }, [parallaxArcsec, updateSliderBackground]);

  return (
    <div role="region" aria-label={t(ariaLabel)} className="flex flex-col items-center p-4 bg-black text-white">
      <svg viewBox="0 0 700 400" className="w-full">
        {/* Background stars */}
        {backgroundStars.map((star, i) => (
          <circle key={i} cx={star.x} cy={star.y} r={star.r} fill="#ffffff" opacity={star.opacity} />
        ))}
        {/* Sight lines */}
        <line x1={earth1.x} y1={earth1.y} x2={starX} y2="200" stroke="#ff6e6e" strokeWidth="1.5" />
        <line x1={earth2.x} y1={earth2.y} x2={starX} y2="200" stroke="#ff6e6e" strokeWidth="1.5" />

        {/* Blue line */}
        <line x1="100" y1="200" x2={earth1.x} y2={earth1.y} stroke="#4fc3f7" strokeWidth="1.5" opacity="0.8" />
        {/* Blue Line Bottom*/}
        <line x1="100" y1="200" x2={earth2.x} y2={earth2.y} stroke="#4fc3f7" strokeWidth="1.5" opacity="0.8" />

        {/* Parallax angle arc */}
        <path d={parallaxArcCalculation} fill="none" stroke="#00E650" strokeWidth="2" />
        {/* Distance Line */}
        <line x1="100" y1="200" x2={starX} y2="200" stroke="white" strokeDasharray="2,4" strokeWidth="1" />

        <path d={`M 100 180 L 120 180 L 120 200`} stroke="#00E650" strokeWidth="1.5" />
        {/* Sun */}
        <circle cx="100" cy="200" r="10" fill="#ffd700" />
        <circle cx="100" cy="200" r="12" fill="#ffd700" opacity="0.3" />

        {/* Earth's orbit */}
        <circle cx="100" cy="200" r="80" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="2,4" />

        {/* Earth positions */}
        <circle cx={earth1.x} cy={earth1.y} r="6" fill="#4fc3f7" />
        <circle cx={earth2.x} cy={earth2.y} r="6" fill="#4fc3f7" />

        {/* Target star */}
        <circle cx={starX} cy="200" r="6" fill="#fff176" />
        <circle cx={starX} cy="200" r="8" fill="#fff176" opacity="0.3" />

        {/* Labels */}
        <text x="85" y="230" fontSize="16" fill="white">
          {t(sun)}
        </text>
        <text x={earth1.x - 20} y={earth1.y - 10} fontSize="16" fill="white">
          {t(earthPosition1)}
        </text>
        <text x={earth2.x - 20} y={earth2.y + 20} fontSize="16" fill="white">
          {t(earthPosition2)}
        </text>
        <text x={starX - 15} y="225" fontSize="16" fill="white">
          {t(star)}
        </text>
        <text x={starX} y="180" fontSize="16" fill="white" aria-hidden="true" className="font-besley">
          <tspan fontStyle="italic">P</tspan> = {Number(parallaxArcsec.toFixed(3))}″
        </text>

        <text x="55" y="165" fill="white" fontSize={16} role="textbox" aria-label={`1 ${t(astronomicalUnit)}`}>
          1 {t(au)}
        </text>

        {/* Distance scale */}
        <text x={(starX + 100) / 2} y="220" fontSize="16" fill="white" textAnchor="middle" aria-live="polite">
          {t(distance)}: {Number(distancePC.toFixed(3))} {t(parsecs)}
        </text>
      </svg>

      <div className="w-full text-lg font-medium flex flex-col">
        <div aria-live="off" className="text-base font-semibold">
          <label htmlFor={`slider-${parallaxInput.id}`}>{t(parallaxInput.label ?? '')}</label>:{' '}
          {Number(parallaxArcsec.toFixed(3))} {t(arcseconds)}
        </div>
        <div className="w-full">
          <div className="sliderContainer mr-4">
            <input
              id={`slider-${parallaxInput.id}`}
              type="range"
              value={parallaxArcsec}
              onChange={(e) => setParallaxArcsec(Number(e.target.value))}
              step={parallaxInput.step}
              min={parallaxInput.min}
              max={parallaxInput.max}
              className="w-full"
              aria-valuetext={`${t(parallaxInput.label ?? '')}: ${Number(parallaxArcsec.toFixed(3))} ${t(arcseconds)}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleParallaxMath;
