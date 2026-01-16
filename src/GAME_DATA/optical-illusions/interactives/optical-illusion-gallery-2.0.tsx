'use client';
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import { HelmholtzSquareIllusionProps } from './interface';
import '../../../shared/slider.css';

const HelmholtzSquareIllusion: React.FC<HelmholtzSquareIllusionProps> = ({ onInteraction }) => {
  const [slideValue, setSlideValue] = useState(0);
  const [showCongruencyMessage, setShowCongruencyMessage] = useState(false);
  const { t } = useTranslations();
  const isOverlapped = slideValue >= 0.99;

  const updateSliderBackground = useCallback(
    (input: HTMLInputElement) => {
      const percent = slideValue * 100;
      input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
    },
    [slideValue],
  );

  useEffect(() => {
    const slider = document.getElementById('translation-slider') as HTMLInputElement;
    if (slider) {
      updateSliderBackground(slider);
    }
  }, [updateSliderBackground]);

  useEffect(() => {
    if (isOverlapped && !showCongruencyMessage) {
      setShowCongruencyMessage(true);
    } else if (!isOverlapped && showCongruencyMessage) {
      setShowCongruencyMessage(false);
    }
  }, [isOverlapped, showCongruencyMessage]);

  const handleSliderChange = (value: number) => {
    setSlideValue(value);
  };

  const getSliderAriaValueText = (value: number) => {
    const percentage = Math.round(value * 100);
    if (percentage === 0) {
      return t('scenes.S11.S11_D0_F93_C9.labels.apart');
    } else if (percentage === 100) {
      return `${t('scenes.S11.S11_D0_F93_C9.labels.overlapped')} - ${t('scenes.S11.S11_D0_F93_C9.labels.squares_aligned')}`;
    } else {
      return `${percentage}% ${t('scenes.S11.S11_D0_F93_C9.labels.overlapped').toLowerCase()}`;
    }
  };

  useEffect(() => {
    if (isOverlapped) {
      onInteraction({
        'squares-overlapped': true,
      });
    }
  }, [isOverlapped, onInteraction]);

  return (
    <div className="w-full" role="main" aria-labelledby="illusion-title">
      <div className={`w-full max-w-3xl`}>
        <div className="bg-white rounded-xl overflow-hidden mb-6">
          <div className="pl-2">
            <p className="text-gray-600 mb-4">{t('scenes.S11.S11_D0_F93_C9.helmholtz_description')}</p>
          </div>

          <div
            className="flex flex-col items-center bg-white rounded-xl"
            role="region"
            aria-label={t('scenes.S11.S11_D0_F93_C9.helmholtz_square_illusion')}
          >
            <div className="">
              <div
                className="relative w-full h-64 bg-white"
                role="img"
                aria-label={`${t('scenes.S11.S11_D0_F93_C9.helmholtz_square_illusion')}: ${t('scenes.S11.S11_D0_F93_C9.accessibility.illusion_description')} ${isOverlapped ? t('scenes.S11.S11_D0_F93_C9.accessibility.squares_aligned_state') : t('scenes.S11.S11_D0_F93_C9.accessibility.square_b_translated').replace('{percentage}', Math.round(slideValue * 100).toString())}`}
              >
                <svg width="100%" height="100%" viewBox="0 0 400 250" aria-hidden="true">
                  <g stroke="undefined">
                    {Array.from({ length: 41 }).map((_, i) => (
                      <line
                        key={`vline-${i}`}
                        x1={i * 10}
                        y1="0"
                        x2={i * 10}
                        y2="250"
                        stroke="#FFFFFF"
                        strokeWidth="1"
                      />
                    ))}
                    {Array.from({ length: 26 }).map((_, i) => (
                      <line
                        key={`hline-${i}`}
                        x1="0"
                        y1={i * 10}
                        x2="400"
                        y2={i * 10}
                        stroke="#FFFFFF"
                        strokeWidth="1"
                      />
                    ))}
                  </g>

                  <g>
                    <rect x="80" y="70" width="100" height="100" fill="none" stroke="#000000" strokeWidth="2" />
                    {Array.from({ length: 9 }).map((_, i) => (
                      <line
                        key={`h-line-${i}`}
                        x1="80"
                        y1={80 + i * 10}
                        x2="180"
                        y2={80 + i * 10}
                        stroke="#000000"
                        strokeWidth="1"
                      />
                    ))}
                    <text x="130" y="190" textAnchor="middle" fontSize="14" fill="#000000">
                      {t('scenes.S11.S11_D0_F93_C9.labels.square_a')}
                    </text>

                    <g style={{ transform: `translateX(${-(slideValue * 140)}px)` }}>
                      <rect
                        x="220"
                        y="70"
                        width="100"
                        height="100"
                        fill="none"
                        stroke={isOverlapped ? '#00AA00' : '#000000'}
                        strokeWidth={isOverlapped ? '3' : '2'}
                        opacity={isOverlapped ? '0.8' : '1'}
                      />
                      {Array.from({ length: 9 }).map((_, i) => (
                        <line
                          key={`v-line-${i}`}
                          x1={230 + i * 10}
                          y1="70"
                          x2={230 + i * 10}
                          y2="170"
                          stroke={isOverlapped ? '#00AA00' : '#000000'}
                          strokeWidth="1"
                          opacity={isOverlapped ? '0.8' : '1'}
                        />
                      ))}
                      <text
                        x="270"
                        y="190"
                        textAnchor="middle"
                        fontSize="14"
                        fill={isOverlapped ? '#00AA00' : '#000000'}
                      >
                        {t('scenes.S11.S11_D0_F93_C9.labels.square_b')}
                      </text>
                    </g>
                  </g>
                </svg>
              </div>

              {isOverlapped && (
                <div
                  className="flex justify-center mt-4"
                  role="status"
                  aria-live="assertive"
                  aria-label={t('scenes.S11.S11_D0_F93_C9.accessibility.achievement_unlocked')}
                >
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
                    {t('scenes.S11.S11_D0_F93_C9.labels.squares_aligned')}
                  </div>
                </div>
              )}

              {/* Hidden announcement for screen readers */}
              <div aria-live="assertive" aria-atomic="true" className="sr-only" id="overlap-announcement">
                {isOverlapped && t('scenes.S11.S11_D0_F93_C9.labels.squares_aligned')}
              </div>
            </div>

            <div className="w-full lg:w-3/4 flex flex-col mt-6 gap-4">
              <div className="text-center">
                <label htmlFor="translation-slider" className="block font-medium text-gray-700 mb-2">
                  {t('scenes.S11.S11_D0_F93_C9.labels.translate_square_b')}
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500" aria-hidden="true">
                    {t('scenes.S11.S11_D0_F93_C9.labels.apart')}
                  </span>
                  <input
                    id="translation-slider"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={slideValue}
                    onChange={(e) => {
                      handleSliderChange(parseFloat(e.target.value));
                      updateSliderBackground(e.target as HTMLInputElement);
                    }}
                    className="global-slider"
                    aria-valuemin={0}
                    aria-valuemax={1}
                    aria-valuenow={slideValue}
                    aria-valuetext={getSliderAriaValueText(slideValue)}
                    aria-describedby="slider-description"
                    role="slider"
                  />
                  <span className="text-sm text-gray-500" aria-hidden="true">
                    {t('scenes.S11.S11_D0_F93_C9.labels.overlapped')}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSliderChange(0)}
              className="mx-auto mt-8 px-2 py-1 rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#006BE0] lg:px-4 lg:py-2"
              aria-label={`${t('scenes.S11.S11_D0_F93_C9.button.reset_position')} - ${t('scenes.S11.S11_D0_F93_C9.accessibility.reset_button_description')}`}
            >
              {t('scenes.S11.S11_D0_F93_C9.button.reset_position')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelmholtzSquareIllusion;
