import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import { BeatFrequencyDemoInteraction } from './interface';

interface FrequencyRatioExplorerProps {
  interaction: BeatFrequencyDemoInteraction;
}

const FrequencyRatioExplorer: React.FC<FrequencyRatioExplorerProps> = ({ interaction }) => {
  const { t } = useTranslations();
  const { freqInputs, translations, ratios } = interaction;
  const [freqSliders, setFreqSliders] = useState([
    { ...freqInputs[0], value: 220 },
    { ...freqInputs[1], value: 440 },
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeRatio, setActiveRatio] = useState<string>('octave');
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillator1Ref = useRef<OscillatorNode | null>(null);
  const oscillator2Ref = useRef<OscillatorNode | null>(null);
  const [autoStopTimeout, setAutoStopTimeout] = useState<NodeJS.Timeout | null>(null);

  // Initialize Audio Context
  useEffect(() => {
    audioContextRef.current = new window.AudioContext();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Handle Play/Stop
  const togglePlay = useCallback(() => {
    if (!isPlaying) {
      // Start audio
      const ctx = audioContextRef.current;
      if (!ctx) return;

      oscillator1Ref.current = ctx.createOscillator();
      oscillator2Ref.current = ctx.createOscillator();

      const gainNode1 = ctx.createGain();
      const gainNode2 = ctx.createGain();

      gainNode1.gain.value = 0.5;
      gainNode2.gain.value = 0.5;

      oscillator1Ref.current.frequency.value = freqSliders[0].value;
      oscillator2Ref.current.frequency.value = freqSliders[1].value;

      oscillator1Ref.current.connect(gainNode1).connect(ctx.destination);
      oscillator2Ref.current.connect(gainNode2).connect(ctx.destination);

      oscillator1Ref.current.start();
      oscillator2Ref.current.start();

      // Set auto-stop timer for 5 seconds
      const timeout = setTimeout(() => {
        oscillator1Ref.current?.stop();
        oscillator2Ref.current?.stop();
        oscillator1Ref.current = null;
        oscillator2Ref.current = null;
        setIsPlaying(false);
        setAutoStopTimeout(null);
      }, 5000);
      setAutoStopTimeout(timeout);
    } else {
      // Stop audio
      oscillator1Ref.current?.stop();
      oscillator2Ref.current?.stop();
      oscillator1Ref.current = null;
      oscillator2Ref.current = null;
      // Clear auto-stop timer if user stops early
      if (autoStopTimeout) {
        clearTimeout(autoStopTimeout);
        setAutoStopTimeout(null);
      }
    }
    setIsPlaying((prev) => !prev);
  }, [isPlaying, freqSliders, autoStopTimeout]);

  // Update oscillator frequencies when sliders change
  useEffect(() => {
    if (isPlaying && oscillator1Ref.current && oscillator2Ref.current) {
      oscillator1Ref.current.frequency.value = freqSliders[0].value;
      oscillator2Ref.current.frequency.value = freqSliders[1].value;
    }
  }, [freqSliders, isPlaying]);

  const handleRatioClick = useCallback(
    (ratio: number, ratioKey: string) => {
      const baseFreq = freqSliders[0].value;
      const newFreq2 = baseFreq * ratio;

      setFreqSliders((prev: typeof freqSliders) => [prev[0], { ...prev[1], value: Math.round(newFreq2) }]);
      setActiveRatio(ratioKey);
    },
    [freqSliders],
  );

  const handleSliderChange = useCallback((index: number, value: number) => {
    setFreqSliders((prev: typeof freqSliders) =>
      prev.map((slider, i) => (i === index ? { ...slider, value } : slider)),
    );
    // Clear active state when user manually adjusts sliders
    setActiveRatio('');
  }, []);

  const currentRatio = freqSliders[1].value / freqSliders[0].value;

  // Find matching ratio key from sliders
  const matchingRatioKey = Object.entries(ratios || {}).find(
    ([, ratio]) => Number(currentRatio.toFixed(3)) === Number(ratio.ratio.toFixed(3)),
  )?.[0];

  return (
    <div className="frequency-ratio-explorer" style={{ padding: '20px', fontFamily: 'Avenir Next' }}>
      {/* Sliders in same row */}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '20px',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: '10px', fontSize: '16px', fontWeight: '600' }}>
            {t(translations.firstFrequency)}: {freqSliders[0].value} Hz
          </h3>
          <input
            type="range"
            min={freqSliders[0].min}
            max={freqSliders[0].max}
            value={freqSliders[0].value}
            onChange={(e) => handleSliderChange(0, parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: '10px', fontSize: '16px', fontWeight: '600' }}>
            {t(translations.secondFrequency)}: {freqSliders[1].value} Hz
          </h3>
          <input
            type="range"
            min={freqSliders[1].min}
            max={freqSliders[1].max}
            value={freqSliders[1].value}
            onChange={(e) => handleSliderChange(1, parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Play button and ratio display - in same row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '20px',
          padding: '15px',
        }}
      >
        <button
          onClick={togglePlay}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            backgroundColor: isPlaying ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            minWidth: '120px',
          }}
        >
          {isPlaying ? t(translations.stop) : t(translations.play)}
        </button>
        <div style={{ fontSize: '18px', fontWeight: '500' }}>
          {t(translations.ratio)}: <strong>{currentRatio.toFixed(3)}</strong>
        </div>
      </div>

      {/* Musical Intervals Grid */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '15px', fontSize: '18px', fontWeight: '600' }}>Musical Intervals</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '15px',
          }}
        >
          {ratios &&
            Object.entries(ratios).map(([key, ratio]) => {
              const isActive = activeRatio === key || (!activeRatio && matchingRatioKey === key);
              return (
                <div
                  key={key}
                  onClick={() => handleRatioClick(ratio.ratio, key)}
                  style={{
                    padding: '15px',
                    border: `2px solid ${isActive ? '#007bff' : '#e0e0e0'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: isActive ? '#f0f8ff' : 'white',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = '#007bff';
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = '#e0e0e0';
                      e.currentTarget.style.backgroundColor = 'white';
                    }
                  }}
                >
                  <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '5px' }}>{t(ratio.name)}</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>{t(ratio.description)}</div>
                  <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                    Ratio: {ratio.ratio.toFixed(3)}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FrequencyRatioExplorer;
