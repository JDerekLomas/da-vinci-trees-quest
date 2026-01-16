import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import soundLevelConfig from '../configs/sound-level-sim';
import '../../../shared/slider.css';
import { useTranslations } from '../../../hooks/useTranslations';

// SVGs
// Speaker SVG
const Speaker = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <rect x="4" y="3" width="16" height="20" rx="2" ry="2" stroke="currentColor" />
    <circle cx="12" cy="14" r="3" stroke="currentColor" />
    <circle cx="12" cy="7" r="1" stroke="currentColor" />
  </svg>
);

// VolumeX SVG
const VolumeX = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12l4-4m0 0l-4-4m4 4H9" />
  </svg>
);

// Volume2 SVG
const Volume2 = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
    />
  </svg>
);

// User SVG
const User = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

// AlertTriangle SVG
const AlertTriangle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

const SoundLevelSim = () => {
  const [speakerCount, setSpeakerCount] = useState(1);
  const [baseLevel, setBaseLevel] = useState(85);
  const announcementRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslations();

  const soundLevel = useMemo(() => {
    const baseIntensity = Math.pow(10, baseLevel / 10);
    const totalIntensity = baseIntensity * speakerCount;
    return Math.round(10 * Math.log10(totalIntensity) * 10) / 10;
  }, [speakerCount, baseLevel]);

  const getSpeakerPositions = () => {
    const totalWidth = soundLevelConfig.SPEAKER_WIDTH * speakerCount;
    const startX = 50 - totalWidth / 2;
    return Array.from({ length: speakerCount }).map((_, idx) => ({
      x: startX + idx * soundLevelConfig.SPEAKER_WIDTH,
      y: soundLevelConfig.SPEAKER_Y,
    }));
  };

  const getSoundLevelClass = (level: number) => {
    if (level > 95) return 'text-red-700';
    if (level >= 75) return 'text-green-700';
    return 'text-yellow-700';
  };

  const getLevelIcon = (level: number) => {
    if (level > 95) return <AlertTriangle />;
    if (level >= 75) return <Volume2 />;
    return <VolumeX />;
  };

  const getSafetyInfo = (level: number) => {
    if (level > 95) return soundLevelConfig.safetyInfo.danger;
    if (level >= 75) return soundLevelConfig.safetyInfo.optimal;
    return soundLevelConfig.safetyInfo.low;
  };

  const speakerPositions = getSpeakerPositions();
  const safetyInfo = getSafetyInfo(soundLevel);

  useEffect(() => {
    if (announcementRef.current) {
      announcementRef.current.textContent = `${t(soundLevelConfig.staticText.soundLevelUpdatedTo)} ${soundLevel} dB ${t(soundLevelConfig.staticText.with)} ${speakerCount} ${t(soundLevelConfig.staticText.speakers)}`;
    }
  }, [soundLevel, speakerCount, t]);

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #e0e0e0 ${percent}%)`;
  }, []);

  useEffect(() => {
    const baseLevelSlider = document.getElementById('slider-base-level') as HTMLInputElement;
    updateSliderBackground(baseLevelSlider);
  }, [baseLevel]);

  return (
    <div>
      <div>
        <div ref={announcementRef} aria-live="polite" className="sr-only" aria-atomic="true" />

        {/* Formula Display Section */}
        <div className="mb-6 p-4 rounded-lg">
          <div className="text-center">
            <div
              role="text"
              aria-label="dB total equals 10 log base 10 of the sum of 10 raised to the power of dB i divided by 10"
              style={{ fontSize: '40px', fontFamily: 'besley', marginBottom: '20px' }}
            >
              <span style={{ fontStyle: 'italic', color: '#00749D' }} aria-hidden="true">
                dB
              </span>
              <sub style={{ fontFamily: 'besley', fontStyle: 'italic', color: '#00749D' }} aria-hidden="true">
                total
              </sub>
              <span aria-hidden="true">=</span>
              <span style={{ color: '#DB0072' }} aria-hidden="true">
                10
              </span>
              <span style={{ fontStyle: 'italic', color: '#8E24AA' }} aria-hidden="true">
                log
              </span>
              <sub style={{ color: '#8E24AA' }} aria-hidden="true">
                10
              </sub>
              <span aria-hidden="true"> (Σ </span>
              <span style={{ color: '#DB0072' }} aria-hidden="true">
                10
              </span>
              <sup aria-hidden="true">
                (<span style={{ fontStyle: 'italic', color: '#E0002B' }}>dB</span>
                <sub style={{ fontFamily: 'besley', color: '#E0002B' }}>i</sub>/
                <span style={{ color: '#DB0072' }}>10</span>)
              </sup>
              <span aria-hidden="true">)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-[-10px] mb-2 space-x-4">
          <div className="flex-1 w-[100px]">
            <label htmlFor="slider-base-level" className="text-base font-medium">
              {t(soundLevelConfig.sliderLabel)}: {baseLevel} dB
            </label>
            <input
              id="slider-base-level"
              type="range"
              value={baseLevel}
              min={soundLevelConfig.MIN_DB}
              max={soundLevelConfig.MAX_DB}
              step={1}
              onChange={(e) => setBaseLevel(Number(e.target.value))}
              className="w-full global-slider"
              aria-label={t(soundLevelConfig.sliderLabel)}
            />
            <div className="flex justify-between text-base text-slate-500">
              <span>
                {t(soundLevelConfig.staticText.standard)} ({soundLevelConfig.MIN_DB} dB)
              </span>
              <span>
                {t(soundLevelConfig.staticText.maximum)} ({soundLevelConfig.MAX_DB} dB)
              </span>
            </div>
          </div>

          <div className={`p-2 ${getSoundLevelClass(soundLevel)} transition-colors duration-300 w-[350px]`}>
            <div className="text-lg font-semibold flex items-center gap-1">
              {getLevelIcon(soundLevel)}
              {t(soundLevelConfig.combinedSoundLevel)}: {soundLevel} dB
            </div>
            {/* Current Zone Indication */}
            <div className="mt-1 flex items-center gap-2">
              {/* {getLevelIcon(soundLevel)} */}
              <span className={`pl-6 font-semibold ${getSoundLevelClass(soundLevel)}`}>{t(safetyInfo.label)}</span>
            </div>
          </div>
        </div>

        <div className="relative w-full h-64 bg-slate-100 border-2 border-slate-300 rounded-lg mb-3">
          <div className="absolute top-0 left-0 right-0 h-20 bg-slate-200 border-b border-slate-300">
            <div className="text-center text-lg text-slate-700 mt-1">{t(soundLevelConfig.staticText.stage)}</div>
          </div>

          {speakerPositions.map((pos, idx) => (
            <div
              key={idx}
              className="absolute transition-all duration-300"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(0%, -50%)',
              }}
              role="img"
              aria-label={`${t(soundLevelConfig.staticText.speaker)} ${idx + 1}`}
            >
              <Speaker />
            </div>
          ))}

          <div className="absolute top-[12%] left-1/2 -translate-x-1/2">
            <svg width="200" height="100" className="opacity-20">
              <circle cx="100" cy="0" r="50" fill="none" stroke="blue" strokeWidth="1">
                <animate attributeName="r" from="10" to="80" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="1" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="100" cy="0" r="50" fill="none" stroke="blue" strokeWidth="1">
                <animate attributeName="r" from="10" to="80" dur="2s" begin="0.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="1" to="0" dur="2s" begin="0.5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          {Object.values(soundLevelConfig.listeners).map((listener) => (
            <div
              key={listener.id}
              className="absolute transition-all duration-150 flex flex-col items-center"
              style={{
                left: `${listener.x}%`,
                top: `${listener.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              aria-label={`${t(listener.name)} ${t(soundLevelConfig.staticText.atPosition)} ${listener.x}%, ${listener.y}%`}
            >
              <User />
              <div className="text-base text-center mt-1 text-slate-600">
                {t(listener.name)} {listener.id}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 mb-2 py-2">
          {Object.values(soundLevelConfig.speakerOptions).map((n) => (
            <button
              key={n}
              className={`py-1 px-2 rounded text-base text-center ${
                speakerCount === n ? 'bg-blue-700 text-white' : 'bg-white border border-blue-500 text-blue-700'
              }`}
              onClick={() => setSpeakerCount(n)}
              aria-label={
                t(soundLevelConfig.staticText.set) + ' ' + n + ' ' + t(soundLevelConfig.staticText.speakers)
              }
            >
              {n} {t(soundLevelConfig.staticText.speaker)}
              {n > 1 ? 's' : ''}
            </button>
          ))}
        </div>

        {/*
          Level Guide moved to Help section:
          - Add a short sentence in Help explaining the color codes and dB ranges.
        */}

        {/* Removed: Zone info card and Level Guide from the bottom */}
      </div>
    </div>
  );
};

export default SoundLevelSim;
