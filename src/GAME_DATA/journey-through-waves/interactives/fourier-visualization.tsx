import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FourierVisualizerInteraction, HarmonicInput } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';

interface FourierExplorerProps {
  interaction: FourierVisualizerInteraction;
}

const FourierExplorer = ({ interaction }: FourierExplorerProps) => {
  const { t } = useTranslations();

  const { ariaLabel, baseFreq, harmonicInputs, translations, getInitialHarmonics } = interaction;
  const { play, pause, compositeWaveLabel, useOddHarmonics, useEvenHarmonics } = translations;

  const [harmonicSliders, setHarmonicSliders] = useState(() => {
    // Initialize with only odd harmonics enabled
    return harmonicInputs.map((harmonic) => ({
      ...harmonic,
      enabled: harmonic.freqMul % 2 === 1, // Only enable odd harmonics (1, 3, 5)
    }));
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveType] = useState('square');
  const [harmonicMode, setHarmonicMode] = useState<'odd' | 'even' | null>('odd'); // 'odd', 'even', or null
  const [autoStopTimeout, setAutoStopTimeout] = useState<NodeJS.Timeout | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Update harmonics when wave type changes
  useEffect(() => {
    const newHarmonicsData = getInitialHarmonics(waveType);
    setHarmonicSliders((prev) => {
      return prev.map((harmonic) => {
        const currHarmonic = newHarmonicsData.find((h) => h.id === harmonic.id);
        return {
          ...harmonic,
          freqMul: currHarmonic?.freqMul || 0,
          freq: (currHarmonic?.freqMul || 0) * baseFreq,
          phase: { ...harmonic.phase, value: currHarmonic?.phase || 0 },
          amplitude: { ...harmonic.amplitude, value: currHarmonic?.amp || 0 },
        };
      });
    });
  }, [waveType]);

  // Set even harmonics to have same amplitudes as odd harmonics
  useEffect(() => {
    setHarmonicSliders((prev) => {
      return prev.map((harmonic) => {
        // For even harmonics (2nd, 4th, 6th), set amplitude to match corresponding odd harmonic
        if (harmonic.freqMul === 2) {
          const harmonic1 = prev.find((h) => h.freqMul === 1);
          return {
            ...harmonic,
            amplitude: { ...harmonic.amplitude, value: harmonic1?.amplitude.value || 0 },
          };
        } else if (harmonic.freqMul === 4) {
          const harmonic3 = prev.find((h) => h.freqMul === 3);
          return {
            ...harmonic,
            amplitude: { ...harmonic.amplitude, value: harmonic3?.amplitude.value || 0 },
          };
        } else if (harmonic.freqMul === 6) {
          const harmonic5 = prev.find((h) => h.freqMul === 5);
          return {
            ...harmonic,
            amplitude: { ...harmonic.amplitude, value: harmonic5?.amplitude.value || 0 },
          };
        }
        return harmonic;
      });
    });
  }, [waveType]);

  // Handle harmonic mode selection
  const handleHarmonicModeToggle = (mode: 'odd' | 'even') => {
    if (harmonicMode === mode) {
      // Deselect if clicking the same mode
      setHarmonicMode(null);
      // Enable all harmonics when deselecting
      setHarmonicSliders((prev) => prev.map((h) => ({ ...h, enabled: true })));
    } else {
      // Select new mode
      setHarmonicMode(mode);
      setHarmonicSliders((prev) =>
        prev.map((h) => {
          const isOdd = h.freqMul % 2 === 1;
          const isEven = h.freqMul % 2 === 0;
          return {
            ...h,
            enabled: (mode === 'odd' && isOdd) || (mode === 'even' && isEven),
          };
        }),
      );
    }
  };

  // Create periodic wave from harmonics
  const createPeriodicWave = (audioContext: AudioContext) => {
    const numSamples = 2048;
    const real = new Float32Array(numSamples);
    const imag = new Float32Array(numSamples);
    // Set DC offset to 0
    real[0] = 0;
    imag[0] = 0;
    // Set harmonics
    harmonicSliders.forEach((harmonic) => {
      if (harmonic.enabled) {
        const amplitude = harmonic.amplitude.value;
        const phase = harmonic.phase.value;
        real[harmonic.freqMul] = amplitude * Math.cos(phase);
        imag[harmonic.freqMul] = amplitude * Math.sin(phase);
      }
    });
    return audioContext.createPeriodicWave(real, imag, { disableNormalization: true });
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Handle play/pause
  useEffect(() => {
    const enabledHarmonics = harmonicSliders.filter((h) => h.enabled);
    const shouldPlay = isPlaying && enabledHarmonics.length > 0;

    if (shouldPlay) {
      // Initialize audio context if needed
      if (!audioContextRef.current) {
        audioContextRef.current = new window.AudioContext();
      }
      // Create new oscillator and gain node
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      // Set up the periodic wave
      const periodicWave = createPeriodicWave(audioContextRef.current);
      oscillator.setPeriodicWave(periodicWave);
      oscillator.frequency.setValueAtTime(baseFreq, audioContextRef.current.currentTime);
      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      gainNode.gain.setValueAtTime(0.5, audioContextRef.current.currentTime);
      // Start oscillator
      oscillator.start();
      oscillatorRef.current = oscillator;
      gainNodeRef.current = gainNode;
    } else {
      // Stop and clean up current audio
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
        gainNodeRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current?.close();
        audioContextRef.current = null;
      }
    }
  }, [isPlaying, harmonicSliders]);

  // Update wave shape when harmonics change
  useEffect(() => {
    if (isPlaying && audioContextRef.current && oscillatorRef.current) {
      const periodicWave = createPeriodicWave(audioContextRef.current);
      oscillatorRef.current.setPeriodicWave(periodicWave);
    }
  }, [harmonicSliders, isPlaying]);

  // Generate wave points for individual harmonics
  const generateWavePoints = (harmonic: HarmonicInput, numPoints = 1000) => {
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const x = (i / numPoints) * 2 * Math.PI;
      const y = harmonic.amplitude.value * Math.sin(harmonic.freqMul * x + harmonic.phase.value);
      points.push({ x, y });
    }
    return points;
  };

  // Generate composite wave points from enabled harmonics
  const generateCompositeWave = (numPoints = 1000) => {
    const points = Array(numPoints).fill(0);
    const enabledHarmonics = harmonicSliders.filter((h) => h.enabled);
    enabledHarmonics.forEach((harmonic) => {
      for (let i = 0; i < numPoints; i++) {
        const x = (i / numPoints) * 2 * Math.PI;
        points[i] += harmonic.amplitude.value * Math.sin(harmonic.freqMul * x + harmonic.phase.value);
      }
    });
    return points.map((y, i) => ({
      x: (i / numPoints) * 2 * Math.PI,
      y,
    }));
  };

  // Path renderer for SVG visualization
  const renderPath = (
    points: { x: number; y: number }[],
    color: string,
    strokeWidth: number = 1.5,
    yScale: number = 100,
    yCenter: number = 110,
  ): JSX.Element => {
    const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x * 100} ${p.y * yScale + yCenter}`).join(' ');
    return <path d={d} stroke={color} fill="none" strokeWidth={strokeWidth} />;
  };

  // Unified shape renderer for both visualization and legend
  const renderShapeElement = (
    shapeType: number,
    color: string,
    size: number,
    x: number,
    y: number,
    opacity: number = 1,
  ) => {
    switch (shapeType) {
      case 0: // Circle
        return <circle cx={x} cy={y} r={size} fill={color} opacity={opacity} />;
      case 1: // Square
        return (
          <rect
            x={x - size}
            y={y - size * 0.75}
            width={size * 1.5}
            height={size * 1.5}
            fill={color}
            opacity={opacity}
          />
        );
      case 2: // Diamond
        return (
          <polygon
            points={`${x},${y - size} ${x + size * 0.75},${y} ${x},${y + size} ${x - size * 0.75},${y}`}
            fill={color}
            opacity={opacity}
          />
        );
      case 3: // Triangle
        return (
          <polygon
            points={`${x},${y - size} ${x + size},${y + size} ${x - size},${y + size}`}
            fill={color}
            opacity={opacity}
          />
        );
      case 4: // Cross
        return (
          <g opacity={opacity}>
            <line x1={x - size} y1={y} x2={x + size} y2={y} stroke={color} strokeWidth={size / 2} />
            <line x1={x} y1={y - size} x2={x} y2={y + size} stroke={color} strokeWidth={size / 2} />
          </g>
        );
      case 5: // Star
        return (
          <polygon
            points={`${x},${y - size} ${x + size * 0.4},${y - size * 0.4} ${x + size},${y} ${x + size * 0.4},${
              y + size * 0.4
            } ${x},${y + size} ${x - size * 0.4},${y + size * 0.4} ${x - size},${y} ${x - size * 0.4},${
              y - size * 0.4
            }`}
            fill={color}
            opacity={opacity}
          />
        );
      case 6: // Hexagon
        return (
          <polygon
            points={`${x},${y - size} ${x + size * 0.866},${y - size * 0.5} ${x + size * 0.866},${y + size * 0.5} ${
              x
            },${y + size} ${x - size * 0.866},${y + size * 0.5} ${x - size * 0.866},${y - size * 0.5}`}
            fill={color}
            opacity={opacity}
          />
        );
      default:
        return <circle cx={x} cy={y} r={size} fill={color} opacity={opacity} />;
    }
  };

  const renderShape = (
    point: { x: number; y: number },
    color: string,
    type: number,
    size: number = 3,
    yScale: number = 100,
    yCenter: number = 110,
  ) => {
    const x = point.x * 100;
    const y = point.y * yScale + yCenter;
    return renderShapeElement(type, color, size, x, y, 1);
  };

  const renderShapeIcon = (type: number, color: string, size: number) => {
    return (
      <svg width={size * 2} height={size * 2}>
        {renderShapeElement(type, color, size, size, size, 1)}
      </svg>
    );
  };

  // Handle slider updates
  const updateSliderBackground = useCallback(
    (input: HTMLInputElement) => {
      const min = Number(input.min);
      const max = Number(input.max);
      const value = Number(input.value);
      const percent = ((value - min) / (max - min)) * 100;
      input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
    },
    [harmonicSliders],
  );

  const handleHarmonicChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
    property: 'amplitude' | 'phase',
  ) => {
    const newHarmonics = [...harmonicSliders];
    newHarmonics[idx][property].value = parseFloat(e.target.value);

    // Update corresponding even harmonic amplitude if changing odd harmonic
    if (property === 'amplitude') {
      const harmonic = newHarmonics[idx];
      if (harmonic.freqMul === 1) {
        // Update 2nd harmonic to match 1st
        const harmonic2 = newHarmonics.find((h) => h.freqMul === 2);
        if (harmonic2) {
          harmonic2.amplitude.value = harmonic.amplitude.value;
        }
      } else if (harmonic.freqMul === 3) {
        // Update 4th harmonic to match 3rd
        const harmonic4 = newHarmonics.find((h) => h.freqMul === 4);
        if (harmonic4) {
          harmonic4.amplitude.value = harmonic.amplitude.value;
        }
      } else if (harmonic.freqMul === 5) {
        // Update 6th harmonic to match 5th
        const harmonic6 = newHarmonics.find((h) => h.freqMul === 6);
        if (harmonic6) {
          harmonic6.amplitude.value = harmonic.amplitude.value;
        }
      }
    }

    setHarmonicSliders(newHarmonics);
  };

  const handleHarmonicToggle = (idx: number) => {
    const newHarmonics = [...harmonicSliders];
    newHarmonics[idx].enabled = !newHarmonics[idx].enabled;
    setHarmonicSliders(newHarmonics);
  };

  useEffect(() => {
    harmonicSliders.forEach((harmonic) => {
      [harmonic.amplitude, harmonic.phase].forEach((slider) => {
        const sliderElement = document.getElementById(`slider-${slider.id}`) as HTMLInputElement;
        if (sliderElement) {
          updateSliderBackground(sliderElement);
        }
      });
    });
  }, [harmonicSliders, updateSliderBackground]);

  useEffect(() => {
    if (isPlaying) {
      // Set auto-stop timer for 5 seconds
      const timeout = setTimeout(() => {
        setIsPlaying(false);
        setAutoStopTimeout(null);
      }, 5000);
      setAutoStopTimeout(timeout);
    } else {
      // Clear auto-stop timer if user stops early
      if (autoStopTimeout) {
        clearTimeout(autoStopTimeout);
        setAutoStopTimeout(null);
      }
    }
    // Cleanup on unmount
    return () => {
      if (autoStopTimeout) {
        clearTimeout(autoStopTimeout);
        setAutoStopTimeout(null);
      }
    };
  }, [isPlaying]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      {/* Graph Visualization */}
      <div
        aria-label={t(ariaLabel!)}
        role="region"
        className="w-full border border-gray-300 rounded-lg shadow bg-white p-4 mb-4"
      >
        <div className="flex flex-col">
          {/* Legend */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-4 px-2">
            <div className="flex items-center gap-1 mr-2">
              {renderShapeIcon(0, '#0061FC', 6)}
              <span className="font-medium">{t(compositeWaveLabel)}</span>
            </div>
            {harmonicSliders.map(
              (harmonic, index) =>
                harmonic.enabled && (
                  <div key={`legend-${harmonic.id}`} className="flex gap-1 items-center mr-2">
                    {renderShapeIcon(index + 1, harmonic.color, 6)}
                    <span className="font-medium">{t(harmonic.label)}</span>
                  </div>
                ),
            )}
          </div>
          {/* SVG Visualization */}
          <svg viewBox="0 0 628 220" style={{ display: 'block', margin: '0 auto' }}>
            {/* Render composite wave with shapes */}
            {renderPath(generateCompositeWave(), '#0061FC', 3, 100, 110)}
            {generateCompositeWave(25).map((point, i) => (
              <React.Fragment key={`composite-dot-${i}`}>
                {renderShape(point, '#0061FC', 0, 5, 100, 110)}
              </React.Fragment>
            ))}
            {/* Render individual harmonics with shapes */}
            {harmonicSliders.map((harmonic, harmonicIndex) => {
              return (
                harmonic.enabled && (
                  <g key={harmonic.id}>
                    {renderPath(generateWavePoints(harmonic), harmonic.color, 1.5, 100, 110)}
                    {generateWavePoints(harmonic, 25).map((point, i) => (
                      <React.Fragment key={`${harmonic.id}-dot-${i}`}>
                        {renderShape(point, harmonic.color, harmonicIndex + 1, 5, 100, 110)}
                      </React.Fragment>
                    ))}
                  </g>
                )
              );
            })}
          </svg>
        </div>
      </div>

      {/* Controls Row (now below the graph, not sticky) */}
      <div
        className="w-full flex items-center justify-between gap-4"
        style={{
          background: 'white',
          paddingTop: '8px',
          paddingBottom: '8px',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        {/* Harmonic Mode Toggle Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => handleHarmonicModeToggle('odd')}
            className={`px-6 py-2 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              harmonicMode === 'odd' ? 'bg-[#006BE0] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {t(useOddHarmonics)}
          </button>
          <button
            onClick={() => handleHarmonicModeToggle('even')}
            className={`px-6 py-2 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              harmonicMode === 'even' ? 'bg-[#006BE0] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {t(useEvenHarmonics)}
          </button>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-8 py-2 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-[#006BE0] hover:bg-blue-600 text-white"
        >
          {isPlaying ? t(pause) : t(play)}
        </button>
      </div>

      {/* Sliders Section */}
      <div className="w-full grid grid-cols-1  lg:grid-cols-2 gap-2 mb-4">
        {harmonicSliders.map((harmonic, idx) => (
          <div key={harmonic.id} className="p-4 rounded-lg shadow border border-gray-300 bg-white">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <div>
                  <label htmlFor={`checkbox-${harmonic.id}`} className="text-lg font-semibold">
                    {t(harmonic.label)} ({harmonic.freq} Hz)
                  </label>
                </div>
                <input
                  id={`checkbox-${harmonic.id}`}
                  type="checkbox"
                  className="w-4 h-4"
                  checked={harmonic.enabled}
                  onChange={() => handleHarmonicToggle(idx)}
                />
              </div>
              <div
                key={`amplitude-${harmonic.amplitude.id}`}
                className="w-full max-w-xl text-lg font-medium flex flex-col"
              >
                <div aria-live="off" className="text-base font-semibold">
                  <label htmlFor={`slider-${harmonic.amplitude.id}`}>{t(harmonic.amplitude.label)}</label>:{' '}
                  {Number(harmonic.amplitude.value.toFixed(2))} {t(harmonic.amplitude.unit ?? '')}
                </div>
                <div className="w-full">
                  <div>
                    <input
                      id={`slider-${harmonic.amplitude.id}`}
                      type="range"
                      disabled={!harmonic.enabled}
                      value={harmonic.amplitude.value}
                      onChange={(e) => handleHarmonicChange(e, idx, 'amplitude')}
                      step={harmonic.amplitude.step}
                      min={harmonic.amplitude.min}
                      max={harmonic.amplitude.max}
                      className="global-slider w-full"
                      aria-valuetext={`${t(harmonic.amplitude.label ?? '')}: ${harmonic.amplitude.value.toFixed(2)} ${t(harmonic.amplitude.unit ?? '')}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FourierExplorer;
