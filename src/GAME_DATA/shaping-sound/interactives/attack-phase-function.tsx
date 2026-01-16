import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import { AttackPhaseFunctionInteraction } from './interface';
import * as Tone from 'tone';
import parse from 'html-react-parser';
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
import { useEventListener } from '../../../hooks/useEventListener';
import { useGameContext } from '../../../hooks/useGameContext';

interface AttackEnvelopeWithKickDrumProps {
  interaction: AttackPhaseFunctionInteraction;
}

const stripHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

const AttackEnvelopeWithKickDrum: React.FC<AttackEnvelopeWithKickDrumProps> = ({ interaction }) => {
  const { t } = useTranslations();
  const { dialogIndex } = useGameContext();

  const { payload } = useEventListener('attack-phase-function') as { payload: { step: number } };

  const { inputs, totalSteps, translations } = interaction;
  const {
    originalFunctionLabel,
    originalFunctionAriaLabel,
    transformedFunctionLabel,
    transformedFunctionAriaLabel,
    functionTransformationsLabel,
    functionTransDescription,
    testLabel,
    testDescription,
    playLabel,
    xAxisLabel,
    yAxisLabel,
    volumeLabel,
    transformed,
    target,
    functionDescription,
    attack,
    targetFunctionLabel,
    targetFunctionAriaLabel,
  } = translations;

  const [currentStep, setCurrentStep] = useState(dialogIndex === 1 ? 1 : totalSteps);
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
  const [currentPosition, setCurrentPosition] = useState<{ time: string; amplitude: string } | null>(null);

  const params = { attack: 0.1 };

  const initialized = useRef(false);
  const startTimeRef = useRef<number | null>(null);
  const gainNodeRef = useRef<Tone.Gain | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const kickDrumRef = useRef<Tone.MembraneSynth | null>(null);
  const audioContextRef = useRef<Tone.BaseContext | null>(null);

  const targetCurve = useMemo(
    () => ({
      verticalScale: 2,
      horizontalScale: 1,
      verticalShift: 0,
      horizontalShift: 0,
    }),
    [],
  );

  // handle step change
  useEffect(() => {
    if (payload) {
      setCurrentStep(payload.step);
    }
  }, [payload]);

  const envelopeData = useMemo(() => {
    const data = [];
    const step = 0.01;
    const startTime = 0;
    const endTime = 1;

    // Initialize with correct vertical shift for target curve
    data.push({
      time: startTime.toFixed(2),
      amplitude: Math.max(0, transforms.verticalShift || 0).toFixed(3),
      originalAmplitude: '0.000',
      targetAmplitude: targetCurve.verticalShift.toFixed(3),
      yEquals10x: '0.000',
    });

    const getAmplitude = (
      t: number,
      transforms: Record<string, number>,
    ): { transformed: number; original: number } => {
      let originalAmplitude = 0;
      if (t <= 0) {
        originalAmplitude = 0;
      } else if (t <= params.attack) {
        originalAmplitude = 10 * t;
      } else {
        originalAmplitude = 1;
      }
      let transformedAmplitude: number;
      // For target curve, we want to ensure it rises until 0.1s then flat
      if (transforms === targetCurve) {
        const transformedTime = (t - transforms.horizontalShift) * transforms.horizontalScale;
        if (transformedTime <= 0) {
          transformedAmplitude = 0;
        } else if (transformedTime <= params.attack) {
          // Rise linearly until attack time (0.1s)
          transformedAmplitude = 5 * transformedTime;
        } else {
          // Remain flat after attack time at the value 1.0
          transformedAmplitude = 5 * params.attack;
        }
      } else {
        // For other curves, use regular transformation
        const transformedTime = (t - transforms.horizontalShift) * transforms.horizontalScale;
        if (transformedTime <= 0) {
          transformedAmplitude = 0;
        } else if (transformedTime <= params.attack) {
          transformedAmplitude = currentStep === 2 ? transformedTime / params.attack : 5 * transformedTime;
        } else {
          transformedAmplitude = currentStep === 2 ? 1 : 5 * params.attack;
        }
      }
      transformedAmplitude = transformedAmplitude * transforms.verticalScale + transforms.verticalShift;
      return {
        transformed: Math.max(0, Math.min(3, transformedAmplitude)),
        original: originalAmplitude,
      };
    };

    let t = startTime + step;
    while (t <= endTime) {
      const { transformed, original } = getAmplitude(t, transforms);
      const { transformed: targetTransformed } = getAmplitude(t, targetCurve);

      // Calculate y = coefficient*x for the original function (only for t <= 0.1)
      const functionCoefficient = [2, 4].includes(currentStep) ? 5 : 10;
      const yEquals10xValue = t <= 0.1 ? (functionCoefficient * t).toFixed(3) : null;

      data.push({
        time: t.toFixed(2),
        amplitude: transformed.toFixed(3),
        originalAmplitude: original.toFixed(3),
        targetAmplitude: targetTransformed.toFixed(3),
        yEquals10x: yEquals10xValue,
      });
      t += step;
    }
    return data;
  }, [transforms, params.attack, targetCurve, currentStep]);

  // Initialize audio and kick drum synth
  useEffect(() => {
    if (initialized.current) return;
    const initAudio = async () => {
      try {
        await Tone.start();
        audioContextRef.current = Tone.context;
        // Create a limiter to prevent clipping
        const limiter = new Tone.Limiter(-1).toDestination();
        // Create kick drum using MembraneSynth
        const kickDrum = new Tone.MembraneSynth({
          pitchDecay: 0.05,
          octaves: 5,
          oscillator: { type: 'sine' },
          envelope: {
            attack: 0.01,
            decay: 0.2,
            sustain: 0.5,
            release: 0.3,
          },
        }).connect(limiter);
        // Set initial volume
        kickDrum.volume.value = 6;
        // Store for later use
        kickDrumRef.current = kickDrum;
        initialized.current = true;
      } catch (error) {
        console.error('Error initializing audio:', error);
      }
    };
    initAudio();
    const gainNode = gainNodeRef.current;
    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (kickDrumRef.current) {
        kickDrumRef.current.dispose();
      }
      if (gainNode) {
        gainNode.dispose();
      }
    };
  }, []);

  // Update kick drum envelope parameters when transforms change
  useEffect(() => {
    if (!initialized.current || !kickDrumRef.current) return;
    // Update the kick drum envelope parameters based on the current transforms
    const kick = kickDrumRef.current;
    if (kick && kick.envelope) {
      // Apply the attack transformation (limit to reasonable values)
      const transformedAttack = Math.max(0.001, Math.min(0.5, params.attack / transforms.horizontalScale));
      kick.envelope.attack = transformedAttack;
      // Scale other envelope parameters based on verticalScale with progressive scaling
      const decayScale =
        transforms.verticalScale > 1
          ? transforms.verticalScale * 1.5 // More pronounced effect when > 1
          : transforms.verticalScale;
      // Apply the scaling with constraints to keep reasonable sound
      kick.envelope.decay = Math.max(0.01, Math.min(1, 0.2 * decayScale));
      kick.envelope.sustain = Math.max(0.1, Math.min(0.9, 0.5 * transforms.verticalScale));
      kick.envelope.release = Math.max(0.01, Math.min(2, 0.3 * transforms.verticalScale));
      // Also adjust the pitch decay for more dramatic effects at higher amplitudes
      kick.pitchDecay =
        transforms.verticalScale > 1.5
          ? 0.03 + transforms.verticalScale * 0.02 // Slower pitch decay for bigger sound
          : 0.05; // Default
      // For very high amplitudes, increase octaves to create more dramatic low-end
      kick.octaves = transforms.verticalScale > 2 ? 6 : 5;
    }
  }, [transforms, params.attack]);

  const EPSILON = 0.01; // Requires high precision for matching

  const checkParameterMatch = (paramKey: string) => {
    return Math.abs(transforms[paramKey] - targetCurve[paramKey as keyof typeof targetCurve]) <= EPSILON;
  };

  const animateMarker = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = (timestamp - startTimeRef.current) / 1000;
    const transformedAttack = params.attack / transforms.horizontalScale;
    // Total duration includes the horizontal shift time plus the attack time
    const totalDuration = Math.max(0, transforms.horizontalShift) + transformedAttack;

    if (elapsed <= totalDuration) {
      // Calculate current x position (time value) - always moves along x-axis
      const currentTime = elapsed.toFixed(2);
      // Find the corresponding point on the curve based on elapsed time
      let amplitude;

      if (elapsed <= transforms.horizontalShift) {
        // Before horizontal shift point, amplitude remains at vertical shift
        amplitude = transforms.verticalShift.toFixed(3);
      } else {
        // After horizontal shift, marker follows the curve upward
        // Calculate how far we are into the attack phase
        const attackProgress = (elapsed - transforms.horizontalShift) / transformedAttack;
        // Find the appropriate amplitude based on attack progress
        if (attackProgress >= 1) {
          // If we've reached the end of attack, use the peak value
          const functionCoefficient = [2, 4].includes(currentStep) ? 5 : 10;
          const peakValue = functionCoefficient * params.attack * transforms.verticalScale;
          amplitude = (peakValue + transforms.verticalShift).toFixed(3);
        } else {
          // During attack, linearly interpolate
          const functionCoefficient = [2, 4].includes(currentStep) ? 5 : 10;
          const attackAmplitude = attackProgress * functionCoefficient * params.attack * transforms.verticalScale;
          amplitude = (attackAmplitude + transforms.verticalShift).toFixed(3);
        }
      }

      setCurrentPosition({
        time: currentTime,
        amplitude: amplitude,
      });
      animationFrameRef.current = requestAnimationFrame(animateMarker);
    } else {
      // Clear the animation marker
      setCurrentPosition(null);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
  };

  // Play the kick drum with the current envelope settings
  const playKickDrum = async () => {
    console.log('playKickDrum called, initialized:', initialized.current, 'kickDrum:', !!kickDrumRef.current);
    if (!initialized.current || !kickDrumRef.current) return;
    try {
      // Ensure audio context is resumed
      if (Tone.context.state === 'suspended') {
        await Tone.context.resume();
      }
      // Reset any existing animation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      startTimeRef.current = null;
      const transformedAttack = params.attack / transforms.horizontalScale;
      const totalDuration = Math.max(0, transforms.horizontalShift) + transformedAttack;
      console.log('Sound params:', { transformedAttack, totalDuration, transforms });
      // Ensure we have a valid duration
      if (totalDuration <= 0) return;
      const kick = kickDrumRef.current;
      // Scale volume based on vertical scale/amplitude
      const originalVolume = kick.volume.value;
      // Calculate volume boost based on vertical scale - allow it to go much louder when amplitude > 1
      const volumeBoost =
        transforms.verticalScale > 1
          ? 6 + transforms.verticalScale * 3 // Amplify effect when above 1
          : 6 + transforms.verticalScale; // Gentler scaling when below 1
      kick.volume.value = volumeBoost;

      // Apply horizontal shift delay to audio - the sound should start after the horizontal shift
      const startTime = Tone.now() + transforms.horizontalShift;

      // Play the kick drum sound with pitch affected by vertical scale too
      // Lower pitch slightly for higher amplitudes to simulate louder kick drums
      const pitchAdjust = transforms.verticalScale > 1 ? 'A0' : 'C1';
      console.log('Triggering sound:', { pitchAdjust, duration: transformedAttack + 0.1, startTime });
      kick.triggerAttackRelease(pitchAdjust, transformedAttack + 0.1, startTime);

      // Set initial position - dot should always start at the vertical shift level
      setCurrentPosition({
        time: '0.00',
        amplitude: transforms.verticalShift.toFixed(3),
      });

      // Start the animation for visualization immediately - timing is handled within animateMarker
      requestAnimationFrame(animateMarker);

      // Reset volume after playing
      setTimeout(
        () => {
          if (kick) kick.volume.value = originalVolume;
        },
        (totalDuration + 0.5) * 1000,
      );
    } catch (error) {
      console.error('Error playing kick drum:', error);
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
  }, [currentStep, inputs, updateSliderBackground]);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const id = e.target.id.split('-')[1];
    setTransforms((prev) => ({ ...prev, [id]: value }));
    updateSliderBackground(e.target as HTMLInputElement);
  }, []);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      if ([1, 3].includes(currentStep) && Number(payload[0].payload.time) > 0.1) return null;

      return (
        <div className="bg-white p-4 border rounded shadow-lg">
          <p>
            {t(xAxisLabel)} : {Number(payload[0].payload.time)}
          </p>
          {payload.map((entry: any, index: number) => {
            if ([1, 3].includes(currentStep) && entry.dataKey === 'targetAmplitude') return null;

            return (
              <p key={`item-${index}`} style={{ color: entry.color }} className="text-base">
                {`${t(entry.name)} : ${Number(entry.value)}`}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul aria-live="off" className="flex flex-row justify-center items-center gap-4 text-base mt-2">
        {payload.map((entry: any, index: number) => {
          const strokeDasharray = entry.dataKey === 'targetAmplitude' ? '5 5' : '0';

          if (entry.dataKey === 'targetAmplitude' && [1, 3].includes(currentStep)) return null;

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
      <div>
        <div className="w-full">
          <p>
            <span className="font-semibold">{t(originalFunctionLabel)}:</span>{' '}
            <span className="sr-only">{t(originalFunctionAriaLabel)}</span>
            <span aria-hidden="true" className="font-besley font-bold">
              <span className="text-[#E0002B] italic">f</span>(<span className="text-[#008217] italic">t</span>) ={' '}
              <span className="text-[#DB0072]">{[4].includes(currentStep) ? 5 : 10}</span>
              <span className="text-[#008217] italic">t</span>
            </span>
          </p>
          {[1, 3].includes(currentStep) && <p>{parse(t(functionDescription))}</p>}
          {/* Render this only if the current step is 2 or 4 */}
          {[2, 4].includes(currentStep) && (
            <p>
              <span className="font-semibold">{t(transformedFunctionLabel)}:</span>{' '}
              <span className="sr-only">{t(transformedFunctionAriaLabel)}</span>
              <span aria-hidden="true" className="font-besley font-bold">
                <span className="text-[#E0002B] italic">f</span>(<span className="text-[#008217] italic">t</span>)
                = <span className="text-[#677600]">{transforms.verticalScale.toFixed(1)}</span> ×{' '}
                <span className="text-[#E0002B] italic">f</span> (
                <span className="text-[#DB0072]">{transforms.horizontalScale.toFixed(1)}</span> (
                <span className="text-[#008217] italic">t</span> +{' '}
                <span className="text-[#0061FC]">{transforms.horizontalShift.toFixed(1)}</span>)) +{' '}
                <span className="text-[#00749D]">{transforms.verticalShift.toFixed(1)}</span>
              </span>
            </p>
          )}
          {currentStep === 4 && (
            <p>
              <span className="font-semibold">{t(targetFunctionLabel)}:</span>{' '}
              <span className="sr-only">{t(targetFunctionAriaLabel)}</span>
              <span aria-hidden="true" className="font-besley font-bold">
                <span className="text-[#E0002B] italic">f</span>(<span className="text-[#008217] italic">t</span>)
                = <span className="text-[#DB0072]">10</span>
                <span className="text-[#008217] italic">t</span>
              </span>
            </p>
          )}
        </div>
      </div>

      <div>
        {[2, 4].includes(currentStep) && <div className="font-semibold">{t(functionTransformationsLabel)}</div>}
        {/* Render this only if the current step is 4 */}
        {[4].includes(currentStep) && (
          <div>
            <p>{parse(t(functionTransDescription))}</p>
          </div>
        )}
      </div>

      {/* Render this only if the current step is 2 or 4 */}
      {[2, 4].includes(currentStep) && (
        <>
          {/* Control Sliders */}
          <div className="h-max grid grid-cols-1 lg:grid-cols-2 gap-4 border border-gray-500 rounded p-4">
            {inputs.map((slider, index) => (
              <div key={`h-${index}`} className="w-full text-lg font-medium flex flex-col">
                <div aria-live="off" className="flex justify-between text-base font-semibold">
                  <span>
                    <label htmlFor={`slider-${slider.id}`}>{parse(t(slider.label))}</label>:{' '}
                    {transforms[slider.id].toFixed(1)} {t(slider.unit ?? '')}
                  </span>
                  {/* Render this only if the current step is 4 */}
                  {[4].includes(currentStep) && (
                    <span aria-live="polite" className="text-[#008217]">
                      {checkParameterMatch(slider.id) ? '✓' : ''}
                    </span>
                  )}
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
                      aria-valuetext={`${stripHtml(t(slider.label ?? ''))} : ${transforms[slider.id].toFixed(1)} ${t(slider.unit ?? '')}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Kick Drum Section */}
          <div>
            <div className="flex justify-between items-center gap-2">
              <div>
                <span className="font-semibold">{t(testLabel)}:</span>
                <p>{t(testDescription)}</p>
              </div>
              <button
                className="w-1/4 px-2 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-4 lg:py-2 text-[#006BE0] bg-white hover:bg-blue-100 border border-blue-500"
                onClick={playKickDrum}
              >
                <div className="text-center">
                  <div>{t(playLabel)}</div>
                  {transforms.verticalScale > 1 && (
                    <div className={`font-bold ${transforms.verticalScale > 1.5 ? 'text-[#E0002B]' : ''}`}>
                      +{((transforms.verticalScale - 1) * 100).toFixed(0)}% {t(volumeLabel)}
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Graph Section */}
      <div className="h-[330px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={envelopeData} margin={{ top: 5, right: 20, bottom: 40, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis
              dataKey="time"
              label={{ value: t(xAxisLabel), dy: 25 }}
              stroke="#666"
              ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]}
              tickFormatter={(value) => value.toFixed(1)}
              domain={[0, 1]}
              type="number"
            />
            <YAxis
              label={{
                value: t(yAxisLabel),
                angle: -90,
                dx: -20,
              }}
              domain={[0, 3]}
              stroke="#666"
              tickCount={6}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              align="center"
              verticalAlign="top"
              content={renderLegend}
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
            {/* Render this only if the current step is 1, 3, or 4 */}
            {[1, 3, 4].includes(currentStep) && (
              <Line
                type="monotone"
                dataKey="targetAmplitude"
                stroke="#666666"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
                name={t(target)}
              />
            )}
            {/* Render this only if the current step is 2 or 4 */}
            {[2, 4].includes(currentStep) && (
              <Line
                type="monotone"
                dataKey="amplitude"
                stroke="#8E24AA"
                strokeWidth={2}
                dot={false}
                name={t(transformed)}
              />
            )}
            {/* Render red line for y = 10x function only for steps 1 and 3 */}
            {[1, 3].includes(currentStep) && (
              <Line
                type="monotone"
                dataKey="yEquals10x"
                stroke="#E0002B"
                strokeWidth={2}
                dot={false}
                name={t(attack)}
              />
            )}
            {currentPosition && (
              <ReferenceDot
                x={currentPosition.time}
                y={currentPosition.amplitude}
                r={4}
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

export default AttackEnvelopeWithKickDrum;
