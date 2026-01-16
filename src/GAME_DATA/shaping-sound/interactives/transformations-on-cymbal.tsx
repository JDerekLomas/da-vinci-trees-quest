import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { TransformationsOnCymbalInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import parse from 'html-react-parser';
import * as Tone from 'tone';
import {
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  LineChart,
  ReferenceDot,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

interface ADSREnvelopeProps {
  interaction: TransformationsOnCymbalInteraction;
}

const ADSREnvelope: React.FC<ADSREnvelopeProps> = ({ interaction }) => {
  const { t } = useTranslations();

  const { inputs, translations } = interaction;

  const {
    target,
    testLabel,
    playLabel,
    xAxisLabel,
    yAxisLabel,
    transformed,
    adsrValuesLabel,
    transformationsParamsLabel,
  } = translations;

  const [transforms, setTransforms] = useState(() =>
    inputs.reduce(
      (acc, input) => {
        if (input.type === 'slider') {
          acc[input.id] = input.value;
        }
        return acc;
      },
      {} as Record<string, number>,
    ),
  );

  const [activeNotes, setActiveNotes] = useState(new Set());
  const [currentPosition, setCurrentPosition] = useState<{
    time: number;
    amplitude: number;
  } | null>(null);

  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const oscillatorRef = useRef<Record<string, any>>({});

  const targetParams = useMemo(
    () => ({
      attack: 0.1,
      decay: 0.4,
      sustain: 0.1,
      release: 0.8,
      duration: 0.2,
    }),
    [],
  );

  const targetCurve = useMemo(
    () => ({
      verticalScale: 1.1,
      horizontalScale: 1.0,
      verticalShift: 0.1,
      horizontalShift: 0.0,
    }),
    [],
  );

  const generateEnvelopeData = useCallback(
    (params: Record<string, number>, transformParams: Record<string, number>) => {
      const data = [];
      const step = 0.01;
      const startTime = 0;
      const totalTime =
        Math.max(
          params.attack + params.decay + params.duration + params.release,
          targetParams.attack + targetParams.decay + targetParams.duration + targetParams.release,
        ) + 1.5;

      const getAmplitude = (t: number, adsr: Record<string, number>, transforms: Record<string, number>) => {
        let originalAmplitude = 0;
        const transformedTime = (t - transforms.horizontalShift) * transforms.horizontalScale;
        if (transformedTime <= 0) {
          originalAmplitude = 0;
        } else if (transformedTime <= adsr.attack) {
          originalAmplitude = transformedTime / adsr.attack;
        } else if (transformedTime <= adsr.attack + adsr.decay) {
          const decayProgress = (transformedTime - adsr.attack) / adsr.decay;
          originalAmplitude = 1.0 - decayProgress * (1.0 - adsr.sustain);
        } else if (transformedTime <= adsr.attack + adsr.decay + adsr.duration) {
          originalAmplitude = adsr.sustain;
        } else if (transformedTime <= adsr.attack + adsr.decay + adsr.duration + adsr.release) {
          const releaseProgress = (transformedTime - adsr.attack - adsr.decay - adsr.duration) / adsr.release;
          originalAmplitude = adsr.sustain * (1.0 - releaseProgress);
        } else {
          originalAmplitude = 0;
        }
        const transformedAmplitude = originalAmplitude * transforms.verticalScale + transforms.verticalShift;
        return {
          transformed: Math.min(2, transformedAmplitude),
          original: originalAmplitude,
        };
      };

      for (let t = startTime; t <= totalTime; t += step) {
        const { transformed, original } = getAmplitude(t, params, transformParams);
        const { transformed: targetTransformed } = getAmplitude(t, targetParams, targetCurve);
        data.push({
          time: t,
          amplitude: transformed,
          originalAmplitude: original,
          targetAmplitude: targetTransformed,
        });
      }

      data.push({
        time: totalTime,
        amplitude: transforms.verticalShift,
        originalAmplitude: '0.000',
        targetAmplitude: targetCurve.verticalShift,
      });
      return data;
    },
    [targetCurve, targetParams, transforms.verticalShift],
  );

  const envelopeData = useMemo(
    () => generateEnvelopeData(targetParams, transforms),
    [generateEnvelopeData, targetParams, transforms],
  );

  const EPSILON = 0.01;

  const checkParameterMatch = (paramKey: string) => {
    return Math.abs(transforms[paramKey] - targetCurve[paramKey as keyof typeof targetCurve]) < EPSILON;
  };

  useEffect(() => {
    return () => {
      try {
        Object.keys(oscillatorRef.current).forEach((key) => {
          try {
            const sound = oscillatorRef.current[key];
            if (sound.cleanupTimeout) {
              clearTimeout(sound.cleanupTimeout);
            }
            if (sound.synth) {
              sound.synth.dispose();
            }
            if (sound.effects) {
              sound.effects.forEach((effect: any) => {
                if (effect && typeof effect.dispose === 'function') {
                  effect.dispose();
                }
              });
            }
          } catch (e) {
            console.error('Error during cleanup:', e);
          }
        });
        if (Tone.context.state === 'running') {
          Tone.context.transport.stop();
          Tone.context.transport.cancel();
        }
      } catch (e) {
        console.error('Error during Tone.js cleanup:', e);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  const animateMarker = (timestamp: number) => {
    try {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      const now = Tone.now();
      const audioStartTime = oscillatorRef.current.cymbal?.startTime || 0;
      const elapsed = now - audioStartTime;

      const getExactAmplitudeFromEnvelopeData = (time: number) => {
        const boundedTime = Math.max(0, Math.min(time, 10));
        const timeStep = 0.01;
        const timeIndex = Math.min(envelopeData.length - 1, Math.max(0, Math.floor(boundedTime / timeStep)));
        if (timeIndex < envelopeData.length) {
          return envelopeData[timeIndex].amplitude;
        }
        return transforms.verticalShift;
      };

      const totalDuration =
        targetParams.attack / transforms.horizontalScale +
        targetParams.decay / transforms.horizontalScale +
        targetParams.duration / transforms.horizontalScale +
        targetParams.release / transforms.horizontalScale;

      const amplitude = getExactAmplitudeFromEnvelopeData(elapsed);
      setCurrentPosition({
        time: Math.max(0, Math.min(4, elapsed)),
        amplitude,
      });

      if (elapsed <= totalDuration) {
        animationFrameRef.current = requestAnimationFrame(animateMarker);
      } else {
        setCurrentPosition({
          time: totalDuration,
          amplitude: transforms.verticalShift,
        });
        setTimeout(() => {
          setCurrentPosition(null);
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
          }
        }, 200);
      }
    } catch (error) {
      console.error('Animation error:', error);
      setCurrentPosition(null);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
  };

  const startCymbalSound = async (noteId = 'cymbal') => {
    try {
      setActiveNotes((prev) => new Set([...prev, noteId]));

      if (Tone.context.state === 'closed') {
        await Tone.start();
      }
      if (Tone.context.state !== 'running') {
        await Tone.start();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      setCurrentPosition(null);
      startTimeRef.current = null;

      if (oscillatorRef.current[noteId]) {
        try {
          if (oscillatorRef.current[noteId].cleanupTimeout) {
            clearTimeout(oscillatorRef.current[noteId].cleanupTimeout);
          }
          if (oscillatorRef.current[noteId].synth) {
            oscillatorRef.current[noteId].synth.dispose();
          }
          if (oscillatorRef.current[noteId].noiseSynth) {
            oscillatorRef.current[noteId].noiseSynth.dispose();
          }
          if (oscillatorRef.current[noteId].effects) {
            oscillatorRef.current[noteId].effects.forEach((effect: any) => {
              if (effect && typeof effect.dispose === 'function') {
                effect.dispose();
              }
            });
          }
        } catch (cleanupError) {
          console.error('Error during cleanup:', cleanupError);
        }
      }

      const transformedAttack = targetParams.attack / transforms.horizontalScale;
      const transformedDecay = targetParams.decay / transforms.horizontalScale;
      const transformedSustain = targetParams.sustain * transforms.verticalScale + transforms.verticalShift;
      const transformedHold = targetParams.duration / transforms.horizontalScale;
      const transformedRelease = targetParams.release / transforms.horizontalScale;
      const totalDuration = transformedAttack + transformedDecay + transformedHold + transformedRelease;

      const volume = new Tone.Volume(-8);

      const envelopePoints = [];
      const step = 0.01;
      envelopePoints.push([0, transforms.verticalShift]);

      for (let t = step; t <= transformedAttack; t += step) {
        const progress = t / transformedAttack;
        const value = progress * transforms.verticalScale + transforms.verticalShift;
        envelopePoints.push([t, value]);
      }

      const peakValue = transforms.verticalScale + transforms.verticalShift;
      envelopePoints.push([transformedAttack, peakValue]);

      for (let t = transformedAttack + step; t <= transformedAttack + transformedDecay; t += step) {
        const progress = (t - transformedAttack) / transformedDecay;
        const value = peakValue - progress * (peakValue - transformedSustain);
        envelopePoints.push([t, value]);
      }

      const metalSynth = new Tone.MetalSynth({
        envelope: {
          attack: transformedAttack,
          decay: transformedDecay,
          sustain: transformedSustain,
          release: transformedRelease,
        },
        harmonicity: 3.5,
        modulationIndex: 24,
        resonance: 3000,
        octaves: 1.2,
      }).connect(volume);
      metalSynth.frequency.value = 250;

      const cymbalCompressor = new Tone.Compressor({
        threshold: -24,
        ratio: 12,
        attack: 0.003,
        release: 0.25,
      });

      const reverb = new Tone.Reverb({
        decay: 0.3,
        wet: 0.05,
      });

      volume.chain(cymbalCompressor, reverb, Tone.Destination);

      const startTime = Tone.now();
      const releaseStartTime = startTime + transformedAttack + transformedDecay + transformedHold;

      metalSynth.triggerAttack('C1', startTime);
      metalSynth.triggerRelease(releaseStartTime);

      setTimeout(() => {
        startTimeRef.current = performance.now();
        oscillatorRef.current[noteId].toneStartTime = Tone.now();
        animationFrameRef.current = requestAnimationFrame(animateMarker);
      }, 5);

      oscillatorRef.current[noteId] = {
        synth: metalSynth,
        effects: [cymbalCompressor, reverb, volume],
        startTime: startTime,
        releaseTime: releaseStartTime,
        envelopePoints,
        transformedAttack,
        transformedDecay,
        transformedSustain,
        transformedHold,
        transformedRelease,
      };

      const cleanupTimeout = setTimeout(
        () => {
          try {
            if (oscillatorRef.current[noteId]) {
              if (oscillatorRef.current[noteId].synth) {
                oscillatorRef.current[noteId].synth.dispose();
              }
              if (oscillatorRef.current[noteId].effects) {
                oscillatorRef.current[noteId].effects.forEach((effect: any) => {
                  if (effect && typeof effect.dispose === 'function') {
                    effect.dispose();
                  }
                });
              }
              setActiveNotes((prev) => {
                const next = new Set(prev);
                next.delete(noteId);
                return next;
              });
              delete oscillatorRef.current[noteId];
              if (Object.keys(oscillatorRef.current).length === 0) {
                setCurrentPosition(null);
                startTimeRef.current = null;
                if (animationFrameRef.current) {
                  cancelAnimationFrame(animationFrameRef.current);
                  animationFrameRef.current = null;
                }
              }
            }
          } catch (cleanupError) {
            console.error('Error during automatic cleanup:', cleanupError);
            setCurrentPosition(null);
          }
        },
        totalDuration * 1000 + 100,
      );

      oscillatorRef.current[noteId].cleanupTimeout = cleanupTimeout;
    } catch (error: any) {
      if (error.name === 'InvalidStateError' && error.message.includes('closed AudioContext')) {
        await Tone.start();
        if (!oscillatorRef.current.retryCount || oscillatorRef.current.retryCount < 2) {
          oscillatorRef.current.retryCount = (oscillatorRef.current.retryCount || 0) + 1;
          setTimeout(() => {
            startCymbalSound(noteId);
          }, 100);
          return;
        } else {
          console.error('Failed to recover AudioContext after multiple attempts');
          oscillatorRef.current.retryCount = 0;
        }
      }
    }
  };

  const [lastTriggerTime, setLastTriggerTime] = useState(0);

  const handlePlayCymbal = () => {
    try {
      const now = Date.now();
      if (now - lastTriggerTime < 300) {
        return;
      }
      setLastTriggerTime(now);
      if (activeNotes.has('cymbal')) {
        return;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      setCurrentPosition(null);
      setTimeout(() => {
        startCymbalSound('cymbal');
      }, 10);
    } catch (error) {
      console.error('Error in handlePlayCymbal:', error);
      setCurrentPosition(null);
      setActiveNotes((prev) => {
        const next = new Set(prev);
        next.delete('cymbal');
        return next;
      });
    }
  };

  // Handle slider updates
  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    inputs.forEach((slider) => {
      const sliderElement = document.getElementById(`slider-${slider.id}`) as HTMLInputElement;
      if (sliderElement) {
        updateSliderBackground(sliderElement);
      }
    });
  }, [inputs, updateSliderBackground]);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const id = e.target.id.split('-')[1];
    setTransforms((prev) => ({ ...prev, [id]: value }));
    updateSliderBackground(e.target as HTMLInputElement);
  }, []);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow-lg">
          <p>
            {t(xAxisLabel)} : {Number(payload[0].payload.time).toFixed(2)}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }} className="text-base">
              {`${t(entry.name)} : ${Number(entry.value).toFixed(2)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom legend for line styles
  const renderLegend = (props: any) => {
    const { payload } = props;

    return (
      <ul aria-live="off" className="flex flex-row justify-center items-center gap-4 text-base mt-2">
        {payload.map((entry: any, index: number) => {
          let strokeDasharray;
          switch (entry.dataKey) {
            case 'amplitude':
              strokeDasharray = '0';
              break;
            case 'targetAmplitude':
              strokeDasharray = '5 5';
              break;
            default:
              strokeDasharray = '0';
          }
          return (
            <li key={`item-${index}`} className="flex items-center">
              <svg width="30" height="16" viewBox="0 0 30 16">
                <line
                  x1="0"
                  y1="8"
                  x2="30"
                  y2="8"
                  stroke={entry.color}
                  strokeWidth={2}
                  strokeDasharray={strokeDasharray}
                />
              </svg>
              <span className="ml-1">{entry.value}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div>{parse(t(adsrValuesLabel))}</div>

      <div className="text-lg font-semibold">{t(transformationsParamsLabel)}</div>

      {/* Transformation Parameters */}
      <div className="h-max grid grid-cols-1 lg:grid-cols-2 gap-4 border border-gray-500 rounded p-4">
        {inputs.map((slider, index) => (
          <div key={`h-${index}`} className="w-full text-lg font-medium flex flex-col">
            <div aria-live="off" className="flex justify-between text-base font-semibold">
              <span>
                <label htmlFor={`slider-${slider.id}`}>{t(slider.label)}</label>: {transforms[slider.id]}{' '}
                {t(slider.unit ?? '')}
              </span>
              <span aria-live="polite" className="text-[#008217]">
                {checkParameterMatch(slider.id) ? '✓' : ''}
              </span>
            </div>
            <div className="w-full">
              <div>
                <input
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  step={slider.step}
                  value={transforms[slider.id]}
                  id={`slider-${slider.id}`}
                  onChange={handleSliderChange}
                  className="global-slider w-full"
                  aria-valuetext={`${t(slider.label ?? '')} : ${transforms[slider.id]} ${t(slider.unit ?? '')}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Click Cymbal Button */}
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">{t(testLabel)}</div>
        <button
          className="w-1/4 px-2 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-4 lg:py-2 text-[#006BE0] bg-white hover:bg-blue-100 border border-blue-500"
          onClick={handlePlayCymbal}
        >
          {t(playLabel)}
        </button>
      </div>

      {/* Envelope Chart */}
      <div className="h-[330px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={envelopeData} margin={{ top: 5, right: 20, bottom: 40, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis
              dataKey="time"
              label={{ value: t(xAxisLabel), dy: 25 }}
              stroke="#666"
              type="number"
              domain={[0, 4.0]}
              allowDataOverflow={true}
              ticks={[0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0]}
            />
            <YAxis
              label={{
                value: t(yAxisLabel),
                angle: -90,
                dx: -20,
              }}
              domain={[-0.5, 2]}
              stroke="#666"
              tickCount={6}
            />
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
              content={renderLegend}
            />
            <Line
              type="monotone"
              dataKey="targetAmplitude"
              stroke="#666666"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
              name={t(target)}
            />
            <Line
              type="monotone"
              dataKey="amplitude"
              stroke="#8E24AA"
              strokeWidth={3}
              dot={false}
              name={t(transformed)}
            />
            {currentPosition && (
              <ReferenceDot
                x={currentPosition.time}
                y={currentPosition.amplitude}
                r={6}
                fill="#E0002B"
                stroke="none"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ADSREnvelope;
