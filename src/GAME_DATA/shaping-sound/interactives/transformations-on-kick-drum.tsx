import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { TransformationsOnKickDrumInteraction } from './interface';
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
  interaction: TransformationsOnKickDrumInteraction;
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

  // Set transformations to starting values (different from target to demonstrate effect)
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
  const animationRef = useRef<Record<string, any>>({});

  // Target ADSR parameters
  const targetParams = useMemo(
    () => ({
      attack: 0.01, // 0.01s attack time (updated from 0.1s)
      decay: 0.2, // 0.2s decay time
      sustain: 0.8, // 80% sustain level
      release: 0.2, // 0.2s release time (updated from 0.3s)
      duration: 0.2, // 0.2s sustain duration
    }),
    [],
  );

  // Target transformations
  const targetCurve = useMemo(
    () => ({
      verticalScale: 1.3,
      horizontalScale: 1.0,
      verticalShift: 0.2,
      horizontalShift: 0.0,
    }),
    [],
  );

  const generateEnvelopeData = useCallback(
    (params: Record<string, number>, transformParams: Record<string, number>) => {
      const data = [];
      const step = 0.01;
      const startTime = 0;
      // Extend the total time to see the full release phase
      const totalTime =
        Math.max(
          params.attack + params.decay + params.duration + params.release,
          targetParams.attack + targetParams.decay + targetParams.duration + targetParams.release,
        ) + 1.5; // Extended to ensure we see full release
      // Helper function to get amplitude at a specific time for either the current or target envelope
      const getAmplitude = (t: number, adsr: Record<string, number>, transforms: Record<string, number>) => {
        // Original ADSR calculation
        let originalAmplitude = 0;
        // Apply transformations to time
        const transformedTime = (t - transforms.horizontalShift) * transforms.horizontalScale;
        if (transformedTime <= 0) {
          // Before attack starts
          originalAmplitude = 0;
        } else if (transformedTime <= adsr.attack) {
          // Attack phase - linear ramp up to 1.0
          originalAmplitude = transformedTime / adsr.attack;
        } else if (transformedTime <= adsr.attack + adsr.decay) {
          // Decay phase - decay from 1.0 to sustain level
          const decayProgress = (transformedTime - adsr.attack) / adsr.decay;
          originalAmplitude = 1.0 - decayProgress * (1.0 - adsr.sustain);
        } else if (transformedTime <= adsr.attack + adsr.decay + adsr.duration) {
          // Sustain phase - hold at sustain level
          originalAmplitude = adsr.sustain;
        } else if (transformedTime <= adsr.attack + adsr.decay + adsr.duration + adsr.release) {
          // Release phase - decay from sustain to 0
          const releaseProgress = (transformedTime - adsr.attack - adsr.decay - adsr.duration) / adsr.release;
          originalAmplitude = adsr.sustain * (1.0 - releaseProgress);
        } else {
          // After release ends
          originalAmplitude = 0;
        }
        // Apply vertical transformations
        const transformedAmplitude = originalAmplitude * transforms.verticalScale + transforms.verticalShift;
        return {
          transformed: Math.max(0, Math.min(2, transformedAmplitude)), // Clamp between 0 and 2
          original: originalAmplitude,
        };
      };
      // Generate data points for the curve
      for (let t = startTime; t <= totalTime; t += step) {
        // Get current envelope using user parameters and transforms
        const { transformed, original } = getAmplitude(t, params, transformParams);
        // Get target envelope using target parameters but no transformations
        const { transformed: targetTransformed } = getAmplitude(t, targetParams, targetCurve);
        data.push({
          time: t,
          amplitude: transformed,
          originalAmplitude: original,
          targetAmplitude: targetTransformed,
        });
      }
      // Ensure we add a final zero point
      data.push({
        time: totalTime,
        amplitude: transformParams.verticalShift,
        originalAmplitude: '0.000',
        targetAmplitude: targetCurve.verticalShift.toFixed(3),
      });
      return data;
    },
    [targetParams, targetCurve],
  );

  // Memoize the envelope data based on transforms and targetParams
  const envelopeData = useMemo(
    () => generateEnvelopeData(targetParams, transforms),
    [generateEnvelopeData, targetParams, transforms],
  );

  const EPSILON = 0.01; // Tolerance for matching

  const checkParameterMatch = (paramKey: string) => {
    return Math.abs(transforms[paramKey] - targetCurve[paramKey as keyof typeof targetCurve]) < EPSILON;
  };

  // Initialize Tone.js on component mount
  useEffect(() => {
    // Initialize Tone.js
    const initTone = async () => {
      try {
        await Tone.start();
      } catch (error) {
        console.error('Failed to initialize Tone.js:', error);
      }
    };
    initTone();
    // Capture the current ref value for cleanup
    const oscillators = oscillatorRef.current;
    return () => {
      // Clean up all Tone.js resources when component unmounts
      try {
        // Stop and dispose all synths
        Object.keys(oscillators).forEach((key) => {
          try {
            const sound = oscillators[key];
            if (sound.cleanupTimeout) {
              clearTimeout(sound.cleanupTimeout);
            }
            if (sound.synth) {
              sound.synth.dispose();
            }
          } catch (e) {
            console.error('Error cleaning up sound:', e);
          }
        });
        // Stop transport
        Tone.Transport.stop();
        Tone.Transport.cancel();
      } catch (e) {
        console.error('Error during Tone.js cleanup:', e);
      }
      // Cancel any animation frames
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  // Animation function for the marker
  const animateMarker = (timestamp: number) => {
    try {
      // Initialize start time if needed
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      // Get elapsed time since animation start
      const elapsed = (timestamp - startTimeRef.current) / 1000;
      // Check if we're in special release mode (when user releases button)
      if (animationRef.current && animationRef.current.phase === 'release') {
        try {
          // Calculate how far into release we are
          const releaseElapsed = performance.now() / 1000 - animationRef.current.startTime;
          // Ensure we don't exceed the release duration for smooth animation
          const releaseTime = animationRef.current.releaseTime || targetParams.release;
          const releaseProgress = Math.min(1, releaseElapsed / releaseTime);
          // Get the actual time position in the ADSR timeline
          const releaseStartTime = targetParams.attack + targetParams.decay + targetParams.duration;
          const currentTime = releaseStartTime + releaseProgress * targetParams.release;
          // Find the amplitude by interpolating between data points
          let startAmp = 0;
          try {
            startAmp = animationRef.current.initialGain || targetParams.sustain;
            // Clamp to reasonable values
            startAmp = Math.max(0, Math.min(1, startAmp));
          } catch (error) {
            console.error('Error accessing initial gain, using default:', error);
            startAmp = targetParams.sustain;
          }
          const endAmp = Math.max(0, transforms.verticalShift);
          // Use a proper curve shape for release
          const releaseShape = 1 - Math.pow(1 - releaseProgress, 1.5);
          let currentAmplitude = startAmp - releaseShape * (startAmp - endAmp);
          // Safety check for NaN or invalid values
          if (isNaN(currentAmplitude) || !isFinite(currentAmplitude)) {
            currentAmplitude = targetParams.sustain * (1 - releaseProgress);
          }
          // Set the position with bounded values
          setCurrentPosition({
            time: Math.max(0, Math.min(4, currentTime)),
            amplitude: Math.max(0, Math.min(2, currentAmplitude)),
          });
          // Continue animation until release is complete
          if (releaseProgress < 1) {
            animationFrameRef.current = requestAnimationFrame(animateMarker);
          } else {
            // Briefly show final position before clearing
            setTimeout(() => {
              setCurrentPosition(null);
              animationRef.current = {
                phase: 'normal',
                startTime: 0,
                initialGain: 0,
                releaseTime: 0,
                lastAnimationTime: 0,
                errorCount: 0,
              };
              if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
              }
            }, 300);
          }
          return;
        } catch (releaseError) {
          console.error('Error in release animation:', releaseError);
          // Fall back to normal animation in case of error
          animationRef.current.phase = 'normal';
        }
      }
      // Normal animation mode (follows the full ADSR curve)
      try {
        // Calculate total duration based on the ADSR parameters with applied transformations
        const transformedAttack = targetParams.attack / transforms.horizontalScale;
        const transformedDecay = targetParams.decay / transforms.horizontalScale;
        const transformedDuration = targetParams.duration / transforms.horizontalScale;
        const transformedRelease = targetParams.release / transforms.horizontalScale;
        const totalDuration = transformedAttack + transformedDecay + transformedDuration + transformedRelease;
        // Account for horizontal shift if positive
        const effectiveDuration = totalDuration + Math.max(0, transforms.horizontalShift);
        if (elapsed <= effectiveDuration) {
          // Find the closest point in our data for the current time
          // This ensures we follow the actual curve shape
          let amplitude: number | null = null;
          const closestPointIdx = Math.min(envelopeData.length - 1, Math.max(0, Math.round(elapsed / 0.01)));
          if (closestPointIdx < envelopeData.length) {
            amplitude = envelopeData[closestPointIdx].amplitude;
          } else {
            // If we somehow exceeded our data range, use the shift value
            amplitude = transforms.verticalShift;
          }
          // Set position within valid range
          setCurrentPosition({
            time: Math.max(0, Math.min(4, elapsed)),
            amplitude: amplitude,
          });
          // Continue animation
          animationFrameRef.current = requestAnimationFrame(animateMarker);
        } else {
          // Ensure we show the final position briefly before clearing
          const finalAmplitude = transforms.verticalShift;
          setCurrentPosition({
            time: Math.min(4, effectiveDuration),
            amplitude: finalAmplitude,
          });
          // Briefly pause at the end point before disappearing
          setTimeout(() => {
            setCurrentPosition(null);
            if (animationFrameRef.current) {
              cancelAnimationFrame(animationFrameRef.current);
              animationFrameRef.current = null;
            }
          }, 300);
        }
      } catch (normalAnimationError) {
        console.error('Error in normal animation:', normalAnimationError);
        // Try to recover from error
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = requestAnimationFrame(animateMarker);
        }
      }
    } catch (error) {
      console.error('Critical animation error:', error);
      // Clean up animation on critical error
      setCurrentPosition(null);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
  };

  // Play kick sound with Tone.js
  const startKickSound = async (noteId = 'kick') => {
    try {
      // Add note to active notes set
      setActiveNotes((prev) => new Set([...prev, noteId]));
      // Make sure Tone.js is started
      if (Tone.context.state !== 'running') {
        await Tone.start();
      }
      // Reset animation state
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      // Reset position and animation state
      setCurrentPosition(null);
      startTimeRef.current = null;
      animationRef.current = { phase: 'normal' };
      // Clean up any existing sound
      if (oscillatorRef.current[noteId]) {
        try {
          // Clear timeout
          if (oscillatorRef.current[noteId].cleanupTimeout) {
            clearTimeout(oscillatorRef.current[noteId].cleanupTimeout);
          }
          // Dispose synth if it exists
          if (oscillatorRef.current[noteId].synth) {
            oscillatorRef.current[noteId].synth.dispose();
          }
        } catch (error) {
          console.warn('Error cleaning up previous sound:', error);
        }
      }
      // Apply transformations to the ADSR values
      const transformedAttack = targetParams.attack / transforms.horizontalScale;
      const transformedDecay = targetParams.decay / transforms.horizontalScale;
      const transformedSustain = targetParams.sustain * transforms.verticalScale + transforms.verticalShift;
      const transformedRelease = targetParams.release / transforms.horizontalScale;
      // Create kick drum synth with the transformed ADSR values
      const kick = new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 5,
        oscillator: { type: 'sine' },
        envelope: {
          attack: Math.max(0.001, transformedAttack), // Minimum of 0.001s to avoid clicks
          decay: Math.max(0.01, transformedDecay), // Minimum of 0.01s
          sustain: Math.max(0, Math.min(1, transformedSustain)), // Between 0-1
          release: Math.max(0.01, transformedRelease), // Minimum of 0.01s
        },
      }).toDestination(); // Connect directly to destination
      // Set the volume (boost it for better audibility)
      kick.volume.value = 10; // Higher volume
      // Calculate note duration - longer for visualization purposes
      const noteDuration = Math.max(
        0.1,
        transformedAttack + transformedDecay + targetParams.duration / transforms.horizontalScale,
      );
      // Play the kick sound at current time
      kick.triggerAttackRelease('C1', noteDuration, Tone.now());
      // Store kick in oscillatorRef
      oscillatorRef.current[noteId] = {
        synth: kick,
        startTime: Tone.now(),
        transformedAttack,
        transformedDecay,
        transformedSustain,
        transformedRelease,
        noteDuration,
      };
      // Start animation
      requestAnimationFrame(() => {
        startTimeRef.current = performance.now();
        animationFrameRef.current = requestAnimationFrame(animateMarker);
      });
      // Calculate total sound duration in ms (add a bit extra to ensure complete playback)
      const totalDuration =
        (transformedAttack +
          transformedDecay +
          targetParams.duration / transforms.horizontalScale +
          transformedRelease) *
          1000 +
        500;
      // Set cleanup timeout
      const cleanupTimeout = setTimeout(() => {
        try {
          // Dispose the synth
          if (oscillatorRef.current[noteId]?.synth) {
            oscillatorRef.current[noteId].synth.dispose();
          }
          // Remove from active notes
          setActiveNotes((prev) => {
            const next = new Set(prev);
            next.delete(noteId);
            return next;
          });
          // Clean up references
          delete oscillatorRef.current[noteId];
          // Reset state if no other sounds are playing
          if (Object.keys(oscillatorRef.current).length === 0) {
            setCurrentPosition(null);
            startTimeRef.current = null;
            animationRef.current = { phase: 'normal' };
            if (animationFrameRef.current) {
              cancelAnimationFrame(animationFrameRef.current);
              animationFrameRef.current = null;
            }
          }
        } catch (error) {
          console.error('Error during kick sound cleanup:', error);
          setCurrentPosition(null);
        }
      }, totalDuration);
      oscillatorRef.current[noteId].cleanupTimeout = cleanupTimeout;
    } catch (error) {
      console.error('Error playing kick sound:', error);
      // Reset state
      setCurrentPosition(null);
      // Clean up active notes
      setActiveNotes((prev) => {
        const next = new Set(prev);
        next.delete('kick');
        return next;
      });
      // Clean up any partial setup
      if (oscillatorRef.current.kick?.synth) {
        try {
          oscillatorRef.current.kick.synth.dispose();
          delete oscillatorRef.current.kick;
        } catch (cleanupError) {
          console.warn('Error cleaning up after error:', cleanupError);
        }
      }
    }
  };

  // Prevent rapid re-triggering
  const [lastTriggerTime, setLastTriggerTime] = useState(0);

  // Handler for play button
  const handlePlayKick = async () => {
    try {
      // Debounce rapid triggering
      const now = Date.now();
      if (now - lastTriggerTime < 200) {
        return;
      }
      setLastTriggerTime(now);
      if (activeNotes.has('kick')) {
        console.log('Already playing, ignoring click');
        return;
      }
      // Force initialization if needed
      if (Tone.context.state !== 'running') {
        try {
          await Tone.start();
          // Resume in user gesture response context
          Tone.context.resume().then(() => {
            startKickSound('kick');
          });
        } catch (err) {
          console.error('Failed to start Tone.js:', err);
        }
      } else {
        startKickSound('kick');
      }
    } catch (error) {
      console.error('Error in handlePlayKick:', error);
      // Reset state in case of error
      setCurrentPosition(null);
      setActiveNotes((prev) => {
        const next = new Set(prev);
        next.delete('kick');
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
      <div className="flex flex-col gap-2">
        {/* Transformation Parameters */}
        <div className="text-lg font-semibold">{t(transformationsParamsLabel)}</div>
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

        {/* Kick Drum Button */}
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">{t(testLabel)}</div>
          <button
            className="w-1/4 px-2 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-4 lg:py-2 text-[#006BE0] bg-white hover:bg-blue-100 border border-blue-500"
            onClick={handlePlayKick}
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
                domain={[0, 2]}
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
    </div>
  );
};

export default ADSREnvelope;
