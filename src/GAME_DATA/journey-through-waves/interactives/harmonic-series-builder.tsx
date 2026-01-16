import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LegendType } from 'recharts';
import { HarmonicSeriesBuilderInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';

interface HarmonicExplorerProps {
  interaction: HarmonicSeriesBuilderInteraction;
}

type WaveType = 'custom' | 'square' | 'sawtooth';

const HarmonicExplorer = ({ interaction }: HarmonicExplorerProps) => {
  const { t } = useTranslations();

  const { payload } = useEventListener('harmonic-series-builder');

  const { harmonicInputs, waveTypes, harmonicConfig, translations } = interaction;
  const {
    play,
    pause,
    ariaLabel,
    xAxisLabel,
    yAxisLabel,
    waveTypeLabel,
    combinedWaveLabel,
    showCombinedWaveLabel,
  } = translations;

  const [fundamentalFreq] = useState(440);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveType, setWaveType] = useState('custom');
  const [showCombinedWave, setShowCombinedWave] = useState(false);
  const [harmonicSliders, setHarmonicSliders] = useState(harmonicInputs);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [oscillators, setOscillators] = useState<Array<{ osc: OscillatorNode; gain: GainNode }>>([]);
  const [waveformData, setWaveformData] = useState<
    Array<{ showDot: boolean; time: number; total: number; [key: string]: number | boolean }>
  >([]);
  const [autoStopTimeout, setAutoStopTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      if (payload.step === 1) {
        setShowCombinedWave(true);
        if (waveType === 'custom') {
          setHarmonicSliders((prevSliders) =>
            prevSliders.map((slider) => {
              return { ...slider, value: slider.id !== 'harmonic-1' ? 0.5 : slider.value };
            }),
          );
        }
      }
    }
  }, [payload]);

  const generateWaveData = useCallback(() => {
    const points = [];
    const duration = 0.02;
    const sampleRate = 44100;
    const samples = duration * sampleRate;
    for (let i = 0; i < samples; i += 1) {
      const t = i / sampleRate;
      const harmonicValues = harmonicSliders.map((slider, i) => ({
        harmonic: slider.value * Math.sin(2 * Math.PI * fundamentalFreq * (i + 1) * t),
      }));
      const total = harmonicValues.reduce((sum, { harmonic }) => sum + harmonic, 0);
      points.push({
        showDot: i % 15 === 0,
        time: Number(t.toFixed(5)),
        total,
        ...harmonicValues.reduce(
          (obj, { harmonic }, i) => ({
            ...obj,
            [`h${i + 1}`]: harmonic,
          }),
          {},
        ),
      });
    }
    return points;
  }, [harmonicSliders, fundamentalFreq]);

  useEffect(() => {
    setWaveformData(generateWaveData());
  }, [generateWaveData]);

  // Initialize sliders with custom values
  useEffect(() => {
    updateHarmonicValues('custom');
  }, []);

  const updateHarmonicValues = (type: WaveType) => {
    setHarmonicSliders((prevSliders) =>
      prevSliders.map((slider, i) => {
        let amplitude = 0;
        switch (type) {
          case 'square':
            amplitude = i % 2 === 0 ? 1 / (i + 1) : 0;
            break;
          case 'sawtooth':
            amplitude = 1 / (i + 1);
            break;
          case 'custom':
          default:
            amplitude = i === 0 ? 1 : i === 1 ? 0 : i === 2 ? 0 : 0;
            break;
        }
        return { ...slider, value: amplitude };
      }),
    );
  };

  // Effect to update oscillator gains when harmonicSliders change
  useEffect(() => {
    if (isPlaying && oscillators.length > 0) {
      oscillators.forEach(({ gain }, index) => {
        if (index < harmonicSliders.length) {
          gain.gain.value = harmonicSliders[index].value * 0.5;
        }
      });
    }
  }, [harmonicSliders, isPlaying, oscillators]);

  const startSound = useCallback(() => {
    const ctx = new window.AudioContext();
    setAudioContext(ctx);
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.3;
    masterGain.connect(ctx.destination);
    const oscs = harmonicSliders.map((slider, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = fundamentalFreq * (i + 1);
      gain.gain.value = slider.value * 0.5;
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      return { osc, gain };
    });
    setOscillators(oscs);
  }, [fundamentalFreq, harmonicSliders]);

  const stopSound = useCallback(() => {
    oscillators.forEach(({ osc }) => osc.stop());
    setOscillators([]);
    if (audioContext?.state !== 'closed') {
      audioContext?.close();
      setAudioContext(null);
    }
  }, [oscillators, audioContext]);

  const togglePlay = () => {
    if (isPlaying) {
      stopSound();
      // Clear auto-stop timer if user stops early
      if (autoStopTimeout) {
        clearTimeout(autoStopTimeout);
        setAutoStopTimeout(null);
      }
    } else {
      startSound();
      // Set auto-stop timer for 10 seconds
      const timeout = setTimeout(() => {
        stopSound();
        setIsPlaying(false);
        setAutoStopTimeout(null);
      }, 10000);
      setAutoStopTimeout(timeout);
    }
    setIsPlaying(!isPlaying);
  };

  const changeWaveType = (type: WaveType): void => {
    setWaveType(type);
    updateHarmonicValues(type);
  };

  useEffect(() => {
    return () => {
      if (oscillators.length > 0) stopSound();
    };
  }, [oscillators, stopSound]);

  // Handle slider updates
  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    harmonicSliders.forEach((slider) => {
      const sliderElement = document.getElementById(`slider-${slider.id}`) as HTMLInputElement;
      if (sliderElement) {
        updateSliderBackground(sliderElement);
      }
    });
  }, [harmonicSliders, updateSliderBackground]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const sliderIndex = harmonicSliders.findIndex((slider) => `slider-${slider.id}` === id);
    if (sliderIndex !== -1) {
      setHarmonicSliders((prevSliders) =>
        prevSliders.map((slider, index) => (index === sliderIndex ? { ...slider, value: Number(value) } : slider)),
      );
    }
  };

  const CustomShape = ({ cx, cy, r, stroke, dataKey, payload }: any) => {
    if (payload.showDot === false) return null;

    const isActive = r > 3; // default radius is 3
    const size = r > 3 ? 3 : 4;
    // Triangle shapre for h1
    if (dataKey === 'h1')
      return (
        <polygon
          strokeWidth={1.5}
          fill={isActive ? 'white' : stroke}
          stroke={isActive ? stroke : 'white'}
          points={`${cx},${cy - size} ${cx - size},${cy + size} ${cx + size},${cy + size}`}
        />
      );
    // Square shape for h2
    if (dataKey === 'h2')
      return (
        <rect
          x={cx - size}
          y={cy - size}
          width={size * 2}
          height={size * 2}
          strokeWidth={1.5}
          fill={isActive ? 'white' : stroke}
          stroke={isActive ? stroke : 'white'}
        />
      );
    // Diamond shape for h3
    if (dataKey === 'h3')
      return (
        <polygon
          strokeWidth={1.5}
          fill={isActive ? 'white' : stroke}
          stroke={isActive ? stroke : 'white'}
          points={`${cx},${cy - 1.5 * size} ${cx + size},${cy} ${cx},${cy + 1.5 * size} ${cx - size},${cy}`}
        />
      );

    // Circle shape for total
    return (
      <circle
        r={size}
        cx={cx}
        cy={cy}
        strokeWidth={1.5}
        fill={isActive ? 'white' : stroke}
        stroke={isActive ? stroke : 'white'}
      />
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow-lg">
          <p>
            {t(xAxisLabel)} : {payload[0].payload.time.toFixed(4)}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }} className="text-base">
              {`${t(entry.name)} : ${entry.value.toFixed(2)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Controls Row */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <select
          value={waveType}
          aria-label={t(waveTypeLabel)}
          onChange={(e) => changeWaveType(e.target.value as WaveType)}
          className="px-4 py-2 rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {waveTypes.map((wave, index) => (
            <option key={index} value={wave.value.toLowerCase()}>
              {t(wave.label)}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showCombinedWave"
            checked={showCombinedWave}
            onChange={() => setShowCombinedWave(!showCombinedWave)}
            className="h-4 w-4"
          />
          <label htmlFor="showCombinedWave" className="text-base">
            {t(showCombinedWaveLabel)}
          </label>
        </div>

        <button
          onClick={togglePlay}
          className="px-8 py-2 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-[#006BE0] hover:bg-blue-600 text-white"
        >
          {isPlaying ? t(pause) : t(play)}
        </button>
      </div>

      {/* Sliders Control */}
      <div className="flex flex-col lg:flex-row justify-center gap-4">
        {harmonicSliders.map((slider, index) => (
          <div key={`h-${index}`} className="h-full text-lg font-medium flex flex-col">
            <div aria-live="off" className="text-base font-semibold">
              <label htmlFor={`slider-${slider.id}`}>
                {t(slider.label)} ({(fundamentalFreq * (index + 1)).toFixed(0)} {t(slider.unit ?? '')})
              </label>
              : {slider.value.toFixed(2)}
            </div>
            <div className="w-full">
              <div>
                <input
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  step={slider.step}
                  value={slider.value}
                  id={`slider-${slider.id}`}
                  onChange={handleSliderChange}
                  className="global-slider w-full"
                  aria-valuetext={`${t(slider.label ?? '')} (${(fundamentalFreq * (index + 1)).toFixed(0)} ${t(slider.unit ?? '')}) : ${slider.value.toFixed(2)}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Wave Visualization */}
      <div tabIndex={0} aria-label={ariaLabel} className="h-[360px] w-full">
        <ResponsiveContainer>
          <LineChart
            data={waveformData}
            margin={{
              top: 5,
              left: 0,
              right: 10,
              bottom: 20,
            }}
          >
            <XAxis dataKey="time" label={{ value: t(xAxisLabel), dy: 20 }} />
            <YAxis
              domain={[-2.5, 2.5]}
              ticks={[-2.5, 0, 2.5]}
              label={{ value: t(yAxisLabel), angle: -90, dx: -10 }}
            />
            {harmonicSliders.map((_, i) => (
              <Line
                key={i}
                type="monotone"
                strokeWidth={2}
                dataKey={`h${i + 1}`}
                dot={<CustomShape />}
                name={t(harmonicSliders[i].label)}
                stroke={harmonicConfig[i].color}
                legendType={harmonicConfig[i].shape as LegendType}
                activeDot={<CustomShape stroke={harmonicConfig[i].color} />}
              />
            ))}
            {showCombinedWave && (
              <Line
                type="monotone"
                dataKey="total"
                strokeWidth={3}
                name={t(combinedWaveLabel)}
                dot={<CustomShape />}
                stroke={harmonicConfig[3].color}
                legendType={harmonicConfig[3].shape as LegendType}
                activeDot={<CustomShape stroke={harmonicConfig[3].color} />}
              />
            )}
            <Tooltip content={<CustomTooltip />} />
            <Legend
              align="center"
              verticalAlign="top"
              wrapperStyle={{
                gap: '16px',
                width: '100%',
                display: 'flex',
                fontSize: '16px',
                flexWrap: 'wrap',
                paddingBottom: '15px',
                justifyContent: 'center',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HarmonicExplorer;
