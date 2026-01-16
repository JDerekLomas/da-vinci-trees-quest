import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';

interface ThalesShadowCalculatorProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const ThalesShadowCalculator: React.FC<ThalesShadowCalculatorProps> = ({ onInteraction }) => {
  const [sunPosition, setSunPosition] = useState(25);
  const [rodHeight, setRodHeight] = useState(5.25);
  const [pyramidHeight] = useState(479);
  const [rodShadow, setRodShadow] = useState(0);
  const [pyramidShadow, setPyramidShadow] = useState(0);
  const [calculatedHeight, setCalculatedHeight] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState('9:00 AM');
  const { payload } = useEventListener('thales-shadow-calculator');

  useEffect(() => {
    if (timeOfDay === '10:00 AM' && rodHeight === 4.6) {
      onInteraction({
        'thales-shadow-calculator-completion': true,
      });
    }
  }, [payload, timeOfDay, rodHeight]);

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    const slider = document.getElementById(`slider-timeOfDay`) as HTMLInputElement;
    const rodSlider = document.getElementById(`slider-rodHeight`) as HTMLInputElement;
    if (slider) {
      updateSliderBackground(slider);
    }
    if (rodSlider) {
      updateSliderBackground(rodSlider);
    }
  }, [rodHeight, updateSliderBackground]);

  const sliderRef = useRef<HTMLInputElement>(null);
  const rodSliderRef = useRef<HTMLInputElement>(null);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);

    if (newValue !== rodHeight) {
      setSunPosition(Number(e.target.value));
      updateSliderBackground(e.target as HTMLInputElement);
    }

    setTimeout(() => {
      sliderRef.current?.focus();
    }, 0);
  };

  const handleRodSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (newValue !== rodHeight) {
      setRodHeight(newValue);
      updateSliderBackground(e.target as HTMLInputElement);
    }

    setTimeout(() => {
      rodSliderRef.current?.focus();
    }, 0);
  };

  const { t } = useTranslations();

  const isNoon = () => {
    return Math.abs(sunPosition - 48) < 0.1;
  };

  useEffect(() => {
    let sunAngle;
    if (sunPosition <= 50) {
      sunAngle = 10 + (sunPosition / 50) * 80;
    } else {
      sunAngle = 90 - ((sunPosition - 50) / 50) * 80;
    }

    const rodShadowLength = rodHeight / Math.tan((sunAngle * Math.PI) / 180);
    const pyramidShadowLength = pyramidHeight / Math.tan((sunAngle * Math.PI) / 180);

    setRodShadow(parseFloat(rodShadowLength.toFixed(2)));
    setPyramidShadow(parseFloat(pyramidShadowLength.toFixed(2)));

    if (rodShadowLength > 0) {
      const calculatedPyramidHeight = (rodHeight / rodShadowLength) * pyramidShadowLength;
      setCalculatedHeight(parseFloat(calculatedPyramidHeight.toFixed(2)));
    }

    let timeString;

    if (sunPosition < 2) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.6am');
    else if (sunPosition < 6) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.630am');
    else if (sunPosition < 10) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.7am');
    else if (sunPosition < 14) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.730am');
    else if (sunPosition < 18) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.8am');
    else if (sunPosition < 22) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.830am');
    else if (sunPosition < 26) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.9am');
    else if (sunPosition < 30) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.930am');
    else if (sunPosition < 34) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.10am');
    else if (sunPosition < 38) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.1030am');
    else if (sunPosition < 42) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.11am');
    else if (sunPosition < 46) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.1130am');
    else if (sunPosition < 50) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.12pm');
    else if (sunPosition < 54) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.1230pm');
    else if (sunPosition < 58) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.1pm');
    else if (sunPosition < 62) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.130pm');
    else if (sunPosition < 66) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.2pm');
    else if (sunPosition < 70) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.230pm');
    else if (sunPosition < 74) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.3pm');
    else if (sunPosition < 78) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.330pm');
    else if (sunPosition < 82) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.4pm');
    else if (sunPosition < 86) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.430pm');
    else if (sunPosition < 90) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.5pm');
    else if (sunPosition < 94) timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.530pm');
    else timeString = t('scenes.S5.S5_D0_FX_C9.thales.time.6pm');

    setTimeOfDay(timeString);
  }, [sunPosition, rodHeight, pyramidHeight, t]);

  const shouldShowVerification = () => {
    return !isNoon() && calculatedHeight > 0;
  };

  const getSkyGradient = () => {
    if (sunPosition < 20) {
      return {
        top: '#FF7F50',
        middle: '#FFD700',
        bottom: '#87CEEB',
      };
    } else if (sunPosition > 80) {
      return {
        top: '#4169E1',
        middle: '#87CEEB',
        bottom: '#FFA07A',
      };
    } else {
      return {
        top: '#1E90FF',
        middle: '#87CEEB',
        bottom: '#ADD8E6',
      };
    }
  };

  const getSunColor = () => {
    if (sunPosition < 20 || sunPosition > 80) {
      return '#FF8C00';
    }
    return '#FFFF00';
  };

  const getSunGlow = () => {
    if (sunPosition < 20 || sunPosition > 80) {
      return 'drop-shadow(0 0 15px rgba(255,140,0,0.8))';
    }
    return 'drop-shadow(0 0 20px rgba(255,255,0,0.8))';
  };

  const getSunX = () => {
    return 50 + sunPosition * 5;
  };

  const getSunY = () => {
    const normalizedPosition = (sunPosition - 50) / 50;
    return 30 + normalizedPosition * normalizedPosition * 100;
  };

  const personX = 140;
  const pyramidX = 400;
  const groundY = 220;

  const baseRodHeight = rodHeight * 12;
  const svgRodHeight = Math.min(baseRodHeight, 100);
  const svgPyramidHeight = 120;

  const rodRatio = rodShadow < 0.1 ? 10 : rodHeight / rodShadow;

  const maxLeftRodShadow = personX - 20;
  const maxRightRodShadow = 580 - personX;

  const maxLeftPyramidShadow = pyramidX - 20;
  const maxRightPyramidShadow = 580 - pyramidX;

  const shadowDirection = sunPosition < 50 ? 1 : -1;

  const baseRodShadow = rodShadow * 12;
  const basePyramidShadow = svgPyramidHeight / rodRatio;

  const maxRodShadow = shadowDirection === 1 ? maxRightRodShadow : maxLeftRodShadow;
  const maxPyramidShadow = shadowDirection === 1 ? maxRightPyramidShadow : maxLeftPyramidShadow;

  const rodScaleFactor = baseRodShadow > maxRodShadow ? maxRodShadow / baseRodShadow : 1;
  const pyramidScaleFactor = basePyramidShadow > maxPyramidShadow ? maxPyramidShadow / basePyramidShadow : 1;

  const scaleFactor = Math.min(rodScaleFactor, pyramidScaleFactor);

  const svgRodShadow = baseRodShadow * scaleFactor;
  const svgPyramidShadow = basePyramidShadow * scaleFactor;

  const skyColors = getSkyGradient();

  return (
    <div
      className="flex flex-col mx-auto overflow-hidden"
      style={{ fontFamily: 'Avenir Next, system-ui, sans-serif' }}
    >
      <div
        className="bg-white rounded-lg p-4 mb-4 w-full overflow-x-auto"
        aria-label={t('scenes.S5.S5_D0_FX_C9.thales.image_description')}
        role="img"
      >
        <svg width="600" height="300" viewBox="0 0 600 300" className="rounded-lg mx-auto">
          <defs>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={skyColors.top} />
              <stop offset="50%" stopColor={skyColors.middle} />
              <stop offset="100%" stopColor={skyColors.bottom} />
            </linearGradient>

            <pattern id="sandPattern" width="10" height="10" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="#D2B48C" />
              <circle cx="5" cy="5" r="1" fill="#C19A6B" opacity="0.3" />
            </pattern>

            <pattern id="stonePattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="#D2B48C" />
              <line x1="0" y1="0" x2="20" y2="20" stroke="#C19A6B" strokeWidth="0.5" />
              <line x1="20" y1="0" x2="0" y2="20" stroke="#C19A6B" strokeWidth="0.5" />
            </pattern>

            <pattern id="pyramidPattern" width="10" height="10" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="#D2B48C" />
              <rect width="10" height="10" stroke="#8B4513" strokeWidth="0.5" fill="transparent" />
              <rect
                x="5"
                y="0"
                width="5"
                height="5"
                stroke="#8B4513"
                strokeWidth="0.5"
                fill="#C19A6B"
                fillOpacity="0.3"
              />
              <rect
                x="0"
                y="5"
                width="5"
                height="5"
                stroke="#8B4513"
                strokeWidth="0.5"
                fill="#C19A6B"
                fillOpacity="0.3"
              />
            </pattern>

            <radialGradient id="pyramidGradient" cx="50%" cy="30%" r="70%" fx="40%" fy="30%">
              <stop offset="0%" stopColor="#E6D2B8" />
              <stop offset="70%" stopColor="#D2B48C" />
              <stop offset="100%" stopColor="#C19A6B" />
            </radialGradient>

            <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.7)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="600" height={groundY} fill="url(#skyGradient)" />

          <rect x="0" y={groundY} width="600" height="80" fill="url(#sandPattern)" />

          <path
            d={`M0,${groundY} Q100,${groundY - 20} 200,${groundY} T400,${groundY - 10} T600,${groundY}`}
            fill="#E6C388"
            opacity="0.7"
          />

          <circle cx={getSunX()} cy={getSunY()} r="20" fill={getSunColor()} filter={getSunGlow()} />

          <path d={`M480,${groundY} L510,${groundY - 25} L540,${groundY} Z`} fill="#E6C388" opacity="0.4" />

          <path
            d={`M${pyramidX - svgPyramidHeight * 0.8} ${groundY} L${pyramidX} ${groundY - svgPyramidHeight} L${pyramidX + svgPyramidHeight * 0.8} ${groundY} Z`}
            fill="url(#pyramidPattern)"
          />

          <path
            d={`M${pyramidX - svgPyramidHeight * 0.8} ${groundY} L${pyramidX} ${groundY - svgPyramidHeight} L${pyramidX + svgPyramidHeight * 0.8} ${groundY} Z`}
            fill="url(#pyramidGradient)"
            opacity="0.7"
          />

          {!isNoon() && (
            <path
              d={`M${pyramidX} ${groundY} L${pyramidX + shadowDirection * svgPyramidShadow} ${groundY} L${pyramidX + (shadowDirection * svgPyramidShadow) / 2} ${groundY + 10} Z`}
              fill="url(#shadowGradient)"
              opacity="0.6"
              strokeDasharray={shouldShowVerification() ? 'none' : '5,5'}
            />
          )}

          <line
            x1={personX}
            y1={groundY}
            x2={personX}
            y2={groundY - svgRodHeight}
            stroke="#8B4513"
            strokeWidth="3"
          />
          <rect x={personX - 2} y={groundY - svgRodHeight - 4} width="4" height="4" fill="#A0522D" />

          <g>
            <rect
              x={personX + 20}
              y={groundY - svgRodHeight / 2 - 38}
              rx="4"
              ry="4"
              width="125"
              height="35"
              fill="white"
              opacity="0.8"
            />
            <text
              x={personX + 80}
              y={groundY - svgRodHeight / 2 - 20}
              textAnchor="middle"
              fill="#006BE0"
              fontSize="16"
              fontWeight="600"
            >
              <tspan fontFamily="Besley" fontWeight="bold" fontStyle="italic" fontSize="22">
                h
              </tspan>
              <tspan baselineShift="sub" fontFamily="Besley" fontWeight="bold" fontStyle="italic">
                {t('scenes.S5.S5_D0_FX_C9.thales.stick')}
              </tspan>{' '}
              = {rodHeight + ' ' + t('scenes.S5.S5_D0_FX_C9.units.feet')}
            </text>
          </g>

          {!isNoon() && (
            <path
              d={`M${personX} ${groundY} L${personX + shadowDirection * svgRodShadow} ${groundY} L${personX + (shadowDirection * svgRodShadow) / 2} ${groundY + 6} Z`}
              fill="url(#shadowGradient)"
              opacity="0.6"
            />
          )}

          {shouldShowVerification() && (
            <>
              <path
                d={`M${personX} ${groundY} L${personX} ${groundY - svgRodHeight} L${personX + shadowDirection * svgRodShadow} ${groundY} Z`}
                fill="rgba(0, 0, 204, 0.3)"
                stroke="#006BE0"
                strokeWidth="2"
              />
              <path
                d={`M${pyramidX} ${groundY} L${pyramidX} ${groundY - svgPyramidHeight} L${pyramidX + shadowDirection * svgPyramidShadow} ${groundY} Z`}
                fill="rgba(204, 0, 0, 0.3)"
                stroke="#EB0000"
                strokeWidth="2"
              />
              <rect
                y={groundY - 8}
                x={shadowDirection === 1 ? personX : personX - 8}
                width="8"
                height="8"
                fill="none"
                stroke="#006BE0"
                strokeWidth="2"
              />
              <rect
                y={groundY - 8}
                x={shadowDirection === 1 ? pyramidX : pyramidX - 8}
                width="8"
                height="8"
                fill="none"
                stroke="#EB0000"
                strokeWidth="2"
              />
            </>
          )}

          <g>
            <rect
              x={personX - 30}
              y={groundY + 10}
              rx="4"
              ry="4"
              width="60"
              height="22"
              fill="white"
              opacity="0.8"
            />
            <text x={personX} y={groundY + 26} textAnchor="middle" fill="#006BE0" fontSize="16" fontWeight="600">
              {t('scenes.S5.S5_D0_FX_C9.thales.stick')}
            </text>
          </g>

          <g>
            <rect
              x={pyramidX - 30}
              y={groundY + 10}
              rx="4"
              ry="4"
              width="60"
              height="22"
              fill="white"
              opacity="0.8"
            />
            <text x={pyramidX} y={groundY + 26} textAnchor="middle" fill="#EB0000" fontSize="16" fontWeight="600">
              {t('scenes.S5.S5_D0_FX_C9.thales.pyramid')}
            </text>
          </g>

          {!isNoon() && (
            <g>
              <rect
                x={personX + (shadowDirection * svgRodShadow) / 2 - 58}
                y={groundY + 30}
                rx="4"
                ry="4"
                width="135"
                height="30"
                fill="white"
                opacity="0.8"
              />
              <text
                x={personX + ((shadowDirection * svgRodShadow) / 2 + 10)}
                y={groundY + 44}
                textAnchor="middle"
                fill="#006BE0"
                fontSize="16"
                fontWeight="600"
              >
                <tspan fontFamily="Besley" fontWeight="bold" fontStyle="italic" fontSize="22">
                  s
                </tspan>
                <tspan baselineShift="sub" fontFamily="Besley" fontWeight="bold" fontStyle="italic">
                  {t('scenes.S5.S5_D0_FX_C9.thales.stick')}
                </tspan>{' '}
                = {rodShadow.toFixed(2) + ' ' + t('scenes.S5.S5_D0_FX_C9.units.feet')}
              </text>
            </g>
          )}

          {!isNoon() && (
            <g>
              <rect
                x={pyramidX + (shadowDirection * svgPyramidShadow) / 2 - 85}
                y={groundY + 28}
                rx="4"
                ry="4"
                width="185"
                height="40"
                fill="white"
                opacity="0.8"
              />
              <text
                x={pyramidX + ((shadowDirection * svgPyramidShadow) / 2 + 7)}
                y={groundY + 46}
                textAnchor="middle"
                fill="#EB0000"
                fontSize="16"
                fontWeight="600"
              >
                <tspan fontFamily="Besley" fontWeight="bold" fontStyle="italic" fontSize="22">
                  s
                </tspan>
                <tspan baselineShift="sub" fontFamily="Besley" fontWeight="bold" fontStyle="italic">
                  {t('scenes.S5.S5_D0_FX_C9.thales.pyramid')}
                </tspan>{' '}
                = {pyramidShadow.toFixed(2) + ' ' + t('scenes.S5.S5_D0_FX_C9.units.feet')}
              </text>
            </g>
          )}

          <g>
            <rect x="10" y="10" rx="5" ry="5" width="130" height="30" fill="white" opacity="0.7" />
            {/* <circle cx="25" cy="25" r="10" fill="none" stroke="#8B4513" strokeWidth="1.5" /> */}
            {/* <line x1="25" y1="25" x2="25" y2="19" stroke="#8B4513" strokeWidth="1.5" /> */}
            {/* <line x1="25" y1="25" x2="30" y2="25" stroke="#8B4513" strokeWidth="1.5" /> */}
            <text x="42" y="30" fill="black" fontSize="16" fontWeight="bold">
              {timeOfDay}
            </text>
          </g>
        </svg>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4 shadow-md sliders-container">
        <div className="w-full">
          <div className="flex items-center h-10">
            <label className="block text-lg text-gray-700 font-semibold">
              {t('scenes.S5.S5_D0_FX_C9.thales.timeOfDay')}
            </label>
          </div>
          <div className="relative mt-2">
            <input
              id="slider-timeOfDay"
              ref={sliderRef}
              type="range"
              placeholder="0"
              min="0"
              max="100"
              step="4"
              value={sunPosition}
              onChange={handleSliderChange}
              className="global-slider w-full"
              aria-valuetext={`${t('scenes.S5.S5_D0_FX_C9.thales.timeOfDay')}: ${timeOfDay}`}
            />
            <div className="flex justify-between text-base font-medium mt-1">
              <span className="text-lg">{t('scenes.S5.S5_D0_FX_C9.thales.sunrise')}</span>
              <span className="text-lg">{t('scenes.S5.S5_D0_FX_C9.thales.noon')}</span>
              <span className="text-lg">{t('scenes.S5.S5_D0_FX_C9.thales.sunset')}</span>
            </div>
          </div>
        </div>

        <div className="w-full mt-6 slider-second">
          <div className="flex items-center h-10">
            <label className="block text-lg text-gray-700 font-semibold">
              {t('scenes.S5.S5_D0_FX_C9.thales.measuringStickHeight')} : {rodHeight}{' '}
              {t('scenes.S5.S5_D0_FX_C9.units.feet')}
            </label>
          </div>
          <div className="relative mt-2">
            <input
              type="range"
              id="slider-rodHeight"
              ref={rodSliderRef}
              placeholder="3"
              min="3"
              max="7"
              step="0.05"
              value={rodHeight}
              onChange={handleRodSliderChange}
              className="global-slider w-full"
              aria-valuetext={`${t('scenes.S5.S5_D0_FX_C9.thales.measuringStickHeight')}: ${rodHeight}`}
            />
          </div>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
            .sliders-container {
              display: flex;
              flex-direction: column;
              gap: 1.5rem;
            }
            
            @media (min-width: 1025px) {
              .sliders-container {
                flex-direction: row;
              }
              .slider-second {
                margin-top: 0;
              }
            }
          `,
          }}
        />
      </div>

      {isNoon() && (
        <div className="p-4 bg-white rounded-lg text-center text-red-500 border border-red-300">
          <p className="font-semibold text-lg">
            <span className="inline-block mr-2">⚠️</span>
            {t('scenes.S5.S5_D0_FX_C9.thales.noonWarning')}
          </p>
        </div>
      )}
      {!isNoon() && (
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {t('scenes.S5.S5_D0_FX_C9.thales.pyramidHeightCalculation')}
          </h2>

          <div className="flex justify-center items-center">
            <div className="text-center w-full">
              <div className="text-xl">
                <div className="flex items-center justify-center" aria-hidden="true">
                  <div className="flex flex-col items-center mr-4">
                    <span
                      className="border-b border-black px-2 pb-1"
                      style={{ color: '#006BE0', fontFamily: 'Besley', fontStyle: 'italic', fontWeight: 'bold' }}
                    >
                      <span style={{ fontSize: '22px' }}>h</span>
                      <sub className="text-base">{t('scenes.S5.S5_D0_FX_C9.thales.stick')}</sub>
                    </span>
                    <span
                      style={{ color: '#006BE0', fontFamily: 'Besley', fontStyle: 'italic', fontWeight: 'bold' }}
                    >
                      <span style={{ fontSize: '22px' }}>s</span>
                      <sub className="text-base">{t('scenes.S5.S5_D0_FX_C9.thales.stick')}</sub>
                    </span>
                  </div>
                  <span className="mx-2">{t('scenes.S5.S5_D0_FX_C9.thales.equals')}</span>
                  <div className="flex flex-col items-center ml-2">
                    <span
                      className="border-b border-black px-2 pb-1"
                      style={{ color: '#EB0000', fontFamily: 'Besley', fontStyle: 'italic', fontWeight: 'bold' }}
                    >
                      <span style={{ fontSize: '22px' }}>h</span>
                      <sub className="text-base">{t('scenes.S5.S5_D0_FX_C9.thales.pyramid')}</sub>
                    </span>
                    <span
                      style={{ color: '#EB0000', fontFamily: 'Besley', fontStyle: 'italic', fontWeight: 'bold' }}
                    >
                      <span style={{ fontSize: '22px' }}>s</span>
                      <sub className="text-base">{t('scenes.S5.S5_D0_FX_C9.thales.pyramid')}</sub>
                    </span>
                  </div>
                </div>
                <span className="sr-only">{t('scenes.S5.S5_D0_FX_C9.thales.formula_1')}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-2 text-lg">
            <div className="text-center w-full">
              <div className="text-lg">
                <div className="flex items-center justify-center" aria-hidden="true">
                  <div className="flex flex-col items-center mr-4">
                    <span
                      className="border-b border-black px-2 pb-1"
                      style={{ fontWeight: 'bold', fontFamily: 'Besley' }}
                    >
                      {rodHeight} {t('scenes.S5.S5_D0_FX_C9.units.feet')}
                    </span>
                    <span className="" style={{ fontWeight: 'bold', fontFamily: 'Besley' }}>
                      {rodShadow} {t('scenes.S5.S5_D0_FX_C9.units.feet')}
                    </span>
                  </div>
                  <span className="mx-2">{t('scenes.S5.S5_D0_FX_C9.thales.equals')}</span>
                  <div className="flex flex-col items-center ml-2">
                    <span
                      className="border-b border-black px-2 pb-1"
                      style={{ color: '#EB0000', fontWeight: 'bold', fontFamily: 'Besley', fontStyle: 'italic' }}
                    >
                      <span style={{ fontSize: '22px' }}>h</span>
                      <sub className="text-base">{t('scenes.S5.S5_D0_FX_C9.thales.pyramid')}</sub>
                    </span>
                    <span className="" style={{ fontWeight: 'bold', fontFamily: 'Besley' }}>
                      {pyramidShadow} {t('scenes.S5.S5_D0_FX_C9.units.feet')}
                    </span>
                  </div>
                </div>
                <span className="sr-only">{`${rodHeight} ${t('scenes.S5.S5_D0_FX_C9.thales.divide_by')} ${rodShadow} ${t('scenes.S5.S5_D0_FX_C9.thales.equals_text')} ${t('scenes.S5.S5_D0_FX_C9.thales.h_pyramid')} ${t('scenes.S5.S5_D0_FX_C9.thales.divide_by')} ${pyramidShadow}. `}</span>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center items-center mt-2 text-lg" aria-hidden="true">
            <span
              className="px-2"
              style={{ color: '#EB0000', fontFamily: 'Besley', fontStyle: 'italic', fontWeight: 'bold' }}
            >
              <span style={{ fontSize: '22px' }}>h</span>
              <sub className="text-base">{t('scenes.S5.S5_D0_FX_C9.thales.pyramid')}</sub>
            </span>
            <span className="mx-2">{t('scenes.S5.S5_D0_FX_C9.thales.equals')}</span>
            <span className="px-2 font-medium" style={{ fontFamily: 'Besley', fontWeight: 'bold' }}>
              {((rodHeight * pyramidShadow) / rodShadow).toFixed(2)} {t('scenes.S5.S5_D0_FX_C9.units.feet')}
            </span>
          </div>
          <span className="sr-only">{`${t('scenes.S5.S5_D0_FX_C9.thales.h_pyramid')} ${t('scenes.S5.S5_D0_FX_C9.thales.equals_text')} ${((rodHeight * pyramidShadow) / rodShadow).toFixed(2)} ${t('scenes.S5.S5_D0_FX_C9.units.feet')}`}</span>
        </div>
      )}
    </div>
  );
};

export default ThalesShadowCalculator;
