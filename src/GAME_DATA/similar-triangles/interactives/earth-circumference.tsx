import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import Earth from '../assets/image/earth.webp';

interface EarthCircumferenceProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const EratosthenesCalculator: React.FC<EarthCircumferenceProps> = ({ onInteraction }) => {
  const [time, setTime] = useState(10.0);
  const [, setCircumference] = useState(40000);
  const [isCorrectTime, setIsCorrectTime] = useState(false);

  const { t } = useTranslations();

  const formatTime = (decimalTime: number) => {
    const hours = Math.floor(decimalTime);
    const minutes = Math.floor((decimalTime - hours) * 60);
    const period = hours >= 12 ? t('scenes.S8.S8_D0_FX_C9.pm') : t('scenes.S8.S8_D0_FX_C9.am');
    const displayHours = hours > 12 ? hours - 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const prevTime = useRef(time);

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    const slider = document.getElementById(`slider-timeOfDay`) as HTMLInputElement;
    if (slider) {
      updateSliderBackground(slider);
    }
  }, [time, updateSliderBackground]);

  const sliderRef = useRef<HTMLInputElement>(null);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);

    if (newValue !== time) {
      setTime(Number(e.target.value));
      updateSliderBackground(e.target as HTMLInputElement);
    }

    setTimeout(() => {
      sliderRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    if (isCorrectTime) {
      onInteraction({
        'is-correct-time': true,
      });
    }
    prevTime.current = time;
  }, [time, isCorrectTime]);

  useEffect(() => {
    setIsCorrectTime(time === 12);

    if (isCorrectTime) {
      const distance = 500;
      const calculatedCircumference = Math.round((distance * 360) / 7.2);
      setCircumference(calculatedCircumference);
    }
  }, [time, isCorrectTime]);

  return (
    <div className="mx-auto mb-4">
      <div
        className="bg-white p-4 rounded-lg shadow-lg"
        aria-label={t('scenes.S8.S8_D0_FX_C9.image_description')}
        role="img"
      >
        <div className="flex justify-start items-center mb-3">
          <div className="text-gray-700 font-medium mr-4 text-base">{t('scenes.S8.S8_D0_FX_C9.june_21st')}</div>
          <div className="bg-gray-200 rounded-lg px-4 py-2 text-gray-700 shadow-sm flex items-center text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            {formatTime(time)}
          </div>
        </div>

        <div className="relative h-[360px] 2xl:h-[500px] overflow-hidden">
          <svg viewBox="0 0 400 350" className="w-full">
            <defs>
              <radialGradient id="earthGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.7" />
                <stop offset="60%" stopColor="#1067F4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.5" />
              </radialGradient>

              <linearGradient id="sunRayGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFDD00" stopOpacity="1" />
                <stop offset="100%" stopColor="#754C00" stopOpacity="0.8" />
              </linearGradient>

              <linearGradient id="stickGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B4513" />
                <stop offset="50%" stopColor="#A0522D" />
                <stop offset="100%" stopColor="#8B4513" />
              </linearGradient>

              <linearGradient id="wellGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6B7280" />
                <stop offset="20%" stopColor="#000000" />
                <stop offset="40%" stopColor="#6B7280" />
                <stop offset="60%" stopColor="#000000" />
                <stop offset="80%" stopColor="#6B7280" />
                <stop offset="100%" stopColor="#374151" />
              </linearGradient>
            </defs>

            {/* Sun rays - fixed position directly above earth */}
            <g>
              <line x1="50" y1="0" x2="50" y2="80" stroke="#754C00" strokeWidth="1.5" strokeDasharray="8,4" />
              <line x1="100" y1="0" x2="100" y2="80" stroke="#754C00" strokeWidth="1.5" strokeDasharray="8,4" />
              <line x1="150" y1="0" x2="150" y2="80" stroke="#754C00" strokeWidth="1.5" strokeDasharray="8,4" />
              <line x1="200" y1="0" x2="200" y2="80" stroke="#754C00" strokeWidth="1.5" strokeDasharray="8,4" />
              <line x1="250" y1="0" x2="250" y2="80" stroke="#754C00" strokeWidth="1.5" strokeDasharray="8,4" />
              <line x1="300" y1="0" x2="300" y2="80" stroke="#754C00" strokeWidth="1.5" strokeDasharray="8,4" />
              <line x1="350" y1="0" x2="350" y2="80" stroke="#754C00" strokeWidth="1.5" strokeDasharray="8,4" />
              <text x="170" y="15" fontSize="12" fill="#754C00" fontWeight="medium">
                {t('scenes.S8.S8_D0_FX_C9.sun_rays')}
              </text>
            </g>

            {/* Earth with rotation - scientifically accurate heliocentric model */}
            <g transform={`rotate(${(time - 12) * 15} 200 200)`}>
              {/* Realistic Earth image as background */}
              <defs>
                <clipPath id="earthClip">
                  <circle cx="200" cy="200" r="150" />
                </clipPath>
              </defs>
              <image
                href={Earth}
                x="0"
                y="0"
                width="400"
                height="400"
                clipPath="url(#earthClip)"
                preserveAspectRatio="xMidYMid slice"
              />

              {/* Cities positioned on rotating Earth - scientifically accurate */}
              <g>
                <text x="80" y="40" fontSize="12" fill="#1F2937" fontWeight="bold">
                  {t('scenes.S8.S8_D0_FX_C9.alexandria')}
                </text>

                {/* Shadow gradient definition */}
                <defs>
                  <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#000000" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Stick shadow - only shown at exactly noon (12:00 PM) */}
                {time === 12 && (
                  <>
                    {/* Curved shadow that connects the stick base to the sun ray */}
                    <path
                      d="M118,76 L100,90"
                      stroke="url(#shadowGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <text x="90" y="105" fontSize="12" fill="#000000" style={{ zIndex: 1000 }}>
                      {t('scenes.S8.S8_D0_FX_C9.stick_shadow')}
                    </text>
                  </>
                )}

                {/* Stick - positioned on the Earth's surface (original angled position) */}
                <line x1="118" y1="76" x2="100" y2="50" stroke="#8B4513" strokeWidth="2" />
                <text x="110" y="65" fontSize="12" fill="#000000">
                  {t('scenes.S8.S8_D0_FX_C9.stick')}
                </text>

                {/* Angle arc at Alexandria - only visible at exactly noon */}
                {time === 12 && (
                  <>
                    <path d="M 100, 63 A 10 10 0 0 0 110, 63" fill="none" stroke="#A71B1B" strokeWidth="1.2" />
                    <text x="70" y="75" fontSize="12" fill="#A71B1B" fontWeight="bold">
                      7.2°
                    </text>
                  </>
                )}
              </g>

              {/* Syene - positioned at top when at noon */}
              <g>
                <text x="210" y="40" fontSize="12" fill="#1F2937" fontWeight="bold">
                  {t('scenes.S8.S8_D0_FX_C9.syene')}
                </text>

                {/* Well - no shadow at noon due to direct overhead sun */}
                <rect x="190" y="50" width="20" height="20" fill="url(#wellGradient)" />

                {/* Well texture lines */}
                <line x1="190" y1="55" x2="210" y2="55" stroke="#374151" strokeWidth="0.5" strokeOpacity="0.7" />
                <line x1="190" y1="60" x2="210" y2="60" stroke="#374151" strokeWidth="0.5" strokeOpacity="0.7" />
                <line x1="190" y1="65" x2="210" y2="65" stroke="#374151" strokeWidth="0.5" strokeOpacity="0.7" />
                <line x1="195" y1="50" x2="195" y2="70" stroke="#374151" strokeWidth="0.5" strokeOpacity="0.7" />
                <line x1="200" y1="50" x2="200" y2="70" stroke="#374151" strokeWidth="0.5" strokeOpacity="0.7" />
                <line x1="205" y1="50" x2="205" y2="70" stroke="#374151" strokeWidth="0.5" strokeOpacity="0.7" />

                <text x="215" y="80" fontSize="12" fill="#000000">
                  {t('scenes.S8.S8_D0_FX_C9.well')}
                </text>
              </g>
            </g>

            {/* Geometric construction - educational elements */}
            {time === 12 && (
              <g>
                {/* Center of Earth */}
                <circle cx="200" cy="200" r="3" fill="#FFDD00" />

                {/* Radius lines to both cities - shown in Earth's reference frame */}
                <g transform={`rotate(${(time - 12) * 15} 200 200)`}>
                  {/* Radius line to Syene */}
                  <line
                    x1="200"
                    y1="200"
                    x2="200"
                    y2="50"
                    stroke="#FFFFFF"
                    strokeWidth="1.2"
                    strokeDasharray="5,3"
                  />

                  {/* Radius line to Alexandria */}
                  <line
                    x1="200"
                    y1="200"
                    x2="118"
                    y2="76"
                    stroke="#FFFFFF"
                    strokeWidth="1.2"
                    strokeDasharray="5,3"
                  />

                  {/* Central angle - arc showing 7.2° at center */}
                  <path d="M 200, 180 A 20 20 0 0 0 188.8, 183.4" fill="none" stroke="#A71B1B" strokeWidth="1.2" />
                  <text x="210" y="172" fontSize="12" fill="#A71B1B" fontWeight="bold">
                    7.2°
                  </text>
                </g>
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Time slider - updated to match image */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
        <label className="block text-base text-gray-700 font-semibold mb-2">
          {t('scenes.S8.S8_D0_FX_C9.time_of_day')}
        </label>
        <div className="relative pt-1">
          <input
            id="slider-timeOfDay"
            type="range"
            min="8"
            max="16"
            step="0.25"
            placeholder="0"
            value={time}
            onChange={handleSliderChange}
            className="w-full global-slider"
            style={{ zIndex: 10 }}
            aria-label={t('scenes.S8.S8_D0_FX_C9.time_slider')}
          />
          <div className="flex justify-between text-base font-medium mt-1">
            <span>{t('scenes.S8.S8_D0_FX_C9.sunrise')}</span>
            <span>{t('scenes.S8.S8_D0_FX_C9.noon')}</span>
            <span>{t('scenes.S8.S8_D0_FX_C9.sunset')}</span>
          </div>
        </div>
      </div>

      {!isCorrectTime && (
        <div className="p-4 mt-4 bg-white rounded-lg text-left text-red-800">
          <p className="font-semibold flex items-center text-base">
            {t('scenes.S8.S8_D0_FX_C9.eratosthenes_condition')}
          </p>
        </div>
      )}

      {/* Calculations - updated to match image */}
      {isCorrectTime && (
        <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">{t('scenes.S8.S8_D0_FX_C9.circumference_calculation')}:</h2>
          <div className="flex flex-col items-center justify-center" aria-hidden="true">
            <div className="text-base mb-2 font-medium text-gray-700 flex justify-center items-center gap-x-2 font-besley font-bold">
              <div className="flex flex-col">
                <span className="text-red-800 border-b border-b-black pb-0.5 font-besley font-bold italic">
                  {t('scenes.S8.S8_D0_FX_C9.angle_at_alexandria')}
                </span>
                <span className="text-blue-800 text-center font-besley font-bold">360°</span>
              </div>
              <div>=</div>
              <div className="flex flex-col">
                <span className="text-red-800 border-b border-b-black pb-0.5 font-besley font-bold italic">
                  {t('scenes.S8.S8_D0_FX_C9.distance_between_cities')}
                </span>
                <span className="text-blue-800 text-center font-besley font-bold italic">
                  {t('scenes.S8.S8_D0_FX_C9.earth_circumference')}
                </span>
              </div>
            </div>

            <div className="text-base mb-2 font-medium text-gray-700 flex justify-center items-center gap-x-2 font-besley font-bold">
              <div className="flex flex-col text-center">
                <span className="text-red-800 border-b border-b-black pb-0.5 font-besley font-bold">7.2°</span>
                <span className="text-blue-800 text-center font-besley font-bold">360°</span>
              </div>
              <div>=</div>
              <div className="flex flex-col text-center">
                <span className="text-red-800 border-b border-b-black pb-0.5 font-besley font-bold">
                  {t('scenes.S8.S8_D0_FX_C9.distance_miles')}
                </span>
                <span className="text-blue-800 text-center font-besley font-bold italic">
                  {t('scenes.S8.S8_D0_FX_C9.earth_circumference')}
                </span>
              </div>
            </div>
          </div>
          <span className="sr-only">{t('scenes.S8.S8_D0_FX_C9.formula_1')}</span>
          <div
            className="flex justify-center items-center font-medium text-gray-700 gap-x-2 font-besley font-bold"
            aria-hidden="true"
          >
            <span className="text-blue-800 text-center font-besley font-bold italic">
              {t('scenes.S8.S8_D0_FX_C9.earth_circumference')}
            </span>
            <span>=</span>
            <span className="text-black font-besley font-bold">
              {t('scenes.S8.S8_D0_FX_C9.circumference_value')}
            </span>
          </div>
          <span className="sr-only">{t('scenes.S8.S8_D0_FX_C9.formula_2')}</span>
        </div>
      )}
    </div>
  );
};

export default EratosthenesCalculator;
