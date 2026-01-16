import React, { useState, useRef, useEffect, useContext } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';
import { useTranslations } from '../../../hooks/useTranslations';
import interaction from '../configs/interactive-3';
import Button from './button';
import parse from 'html-react-parser';
import { GameContext } from '../../../contexts/GameContext';
import { useEventListener } from '../../../hooks/useEventListener';

declare global {
  interface Window {
    AudioContext: typeof AudioContext;
    webkitAudioContext?: typeof AudioContext;
  }
}

// Audio Context setup
const createAudioContext = () => {
  return new (window.AudioContext || window.webkitAudioContext)();
};

interface OscillatorNodePair {
  oscillator: globalThis.OscillatorNode;
  gainNode: GainNode;
}

interface ReverbNode {
  delayNode: DelayNode;
  gainNode: GainNode;
}

interface AudioNodes {
  oscillators: OscillatorNodePair[];
  mainGainNode: GainNode;
  reverbNetwork: ReverbNode[];
}

interface LineProps {
  cx?: number;
  cy?: number;
  payload?: {
    step: number;
    ratio: number;
    standardRatio?: number;
    frequency: number;
    standardFrequency?: number;
  };
  dataKey?: string;
}

interface TooltipInfoType {
  x: number;
  y: number;
  step: number;
  ratio: number;
  standardRatio?: number;
  frequency: number;
  standardFrequency?: number;
  visible: boolean;
}

interface Interactive3State {
  currentStep: number;
}

interface MusicalRatioVisualizationProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const MusicalRatioVisualization: React.FC<MusicalRatioVisualizationProps> = ({ onInteraction }) => {
  const { t } = useTranslations();
  const audioContext = useRef<AudioContext | null>(null);
  const oscillators = useRef<Record<string, AudioNodes>>({});
  const timeoutIds = useRef<number[]>([]); // Track all scheduled timeouts
  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfoType | null>(null);
  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};
  const savedState =
    interactiveResponses?.interactive_3 && typeof interactiveResponses?.interactive_3 === 'object'
      ? (interactiveResponses?.interactive_3 as unknown as Interactive3State)
      : undefined;
  const [currentStep, setCurrentStep] = useState(savedState?.currentStep ?? 1);
  const { payload } = useEventListener('interactive-3');

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      setCurrentStep(payload.step as number);
    }
  }, [payload]);

  useEffect(() => {
    if (!setInteractiveResponses) return;

    if (currentStep === 2) setBaseValue(2);

    const currentState: Interactive3State = { currentStep };
    setInteractiveResponses((prev: any) => ({
      ...prev,
      interactive_3: currentState,
    }));
  }, [currentStep, setInteractiveResponses]);

  // ADSR envelope settings
  const attack = 0.05;
  const decay = 0.2;
  const sustain = 0.7;
  const release = 0.6;

  const [activeNotes, setActiveNotes] = useState(new Set<string>());
  const [baseValue, setBaseValue] = useState(2); // Default to octave (2)
  const [isPlaying, setIsPlaying] = useState({
    status: false,
    song: '',
    baseValue: 2,
  });

  // Base frequency
  const baseFrequency = 440; // A4

  // Create 12 equal-tempered notes between 1 and the selected base value
  const getRatio = () => Math.pow(baseValue, 1 / 12);

  const generateKeys = () => {
    const ratio = getRatio();
    const keys = [];
    for (let i = 0; i <= 12; i++) {
      const stepRatio = Math.pow(ratio, i);
      keys.push({
        note: i,
        ratio: i === 0 ? '1' : i === 12 ? baseValue.toString() : stepRatio.toFixed(3),
        value: stepRatio,
        frequency: baseFrequency * stepRatio,
        alphabet: String.fromCharCode(65 + i),
      });
    }
    return keys;
  };

  const keys = generateKeys();

  const initAudioContext = () => {
    if (!audioContext.current) {
      try {
        audioContext.current = createAudioContext();
      } catch (error) {
        console.error('Error creating audio context: ' + (error as Error).message);
      }
    }
  };

  const createOrganNote = (frequency: number, isBass = false) => {
    try {
      if (!audioContext.current || frequency === 0) {
        return null;
      }

      const now = audioContext.current.currentTime;

      // Create main mixing node
      const mainGainNode = audioContext.current.createGain();
      mainGainNode.gain.setValueAtTime(0.4, now);

      // Create ranks (different pipe sounds)
      const ranks = isBass
        ? [
            // Bass note configuration
            { frequency: frequency, type: 'sine', gain: 0.6 },
            { frequency: frequency * 2, type: 'sine', gain: 0.3 },
            { frequency: frequency * 3, type: 'sine', gain: 0.2 },
            { frequency: frequency * 4, type: 'sine', gain: 0.1 },
          ]
        : [
            // Regular note configuration
            { frequency: frequency, type: 'sine', gain: 0.5 },
            { frequency: frequency * 2, type: 'sine', gain: 0.4 },
            { frequency: frequency * 4, type: 'sine', gain: 0.25 },
            { frequency: frequency * 3, type: 'square', gain: 0.1 },
            { frequency: frequency * 5, type: 'square', gain: 0.1 },
            { frequency: frequency * 0.5, type: 'sine', gain: 0.35 },
            { frequency: frequency * 6, type: 'square', gain: 0.08 },
            { frequency: frequency * 8, type: 'square', gain: 0.06 },
          ];

      const oscillators = ranks.map((rank) => {
        const oscillator = audioContext.current?.createOscillator();
        const gainNode = audioContext.current?.createGain();

        oscillator!.type = rank.type as OscillatorType;
        oscillator!.frequency.setValueAtTime(rank.frequency, now);

        // ADSR envelope with reduced sustain
        gainNode!.gain.setValueAtTime(0, now);
        gainNode!.gain.linearRampToValueAtTime(rank.gain, now + attack);
        gainNode!.gain.exponentialRampToValueAtTime(Math.max(0.001, rank.gain * sustain), now + attack + decay);

        oscillator!.connect(gainNode!);
        gainNode!.connect(mainGainNode);
        oscillator!.start(now);

        return { oscillator, gainNode };
      });

      // Create reverb network
      const reverbNetwork = [
        { delay: 0.03, gain: 0.7 },
        { delay: 0.05, gain: 0.5 },
        { delay: 0.07, gain: 0.3 },
        { delay: 0.11, gain: 0.2 },
        { delay: 0.13, gain: 0.1 },
        { delay: 0.17, gain: 0.05 },
      ].map(({ delay, gain }) => {
        const delayNode = audioContext.current?.createDelay();
        const gainNode = audioContext.current?.createGain();

        if (!delayNode || !gainNode) {
          throw new Error('Failed to create audio nodes');
        }

        delayNode.delayTime.setValueAtTime(delay, now);
        gainNode.gain.setValueAtTime(gain, now);

        mainGainNode.connect(delayNode);
        delayNode.connect(gainNode);
        gainNode.connect(audioContext.current!.destination);

        return { delayNode, gainNode };
      });

      // Direct sound
      mainGainNode.connect(audioContext.current!.destination);

      return { oscillators, mainGainNode, reverbNetwork };
    } catch (error) {
      console.error('Error creating note: ' + (error as Error).message);
      return null;
    }
  };

  const startNote = (frequency: number, isBass = false) => {
    try {
      if (frequency === 0) return;

      initAudioContext();
      const noteId = `freq_${frequency}`;
      const nodes = createOrganNote(frequency, isBass);
      if (nodes && nodes.oscillators) {
        const validNodes = {
          oscillators: nodes.oscillators.filter(
            (osc): osc is OscillatorNodePair => osc.oscillator !== undefined && osc.gainNode !== undefined,
          ),
          mainGainNode: nodes.mainGainNode,
          reverbNetwork: nodes.reverbNetwork,
        };
        oscillators.current[noteId] = validNodes;
        setActiveNotes((prev) => new Set([...prev, noteId]));
      }
    } catch (error) {
      console.error('Error starting note: ' + (error as Error).message);
    }
  };

  const stopNote = (frequency: number) => {
    try {
      if (frequency === 0) return;

      const noteId = `freq_${frequency}`;
      if (oscillators.current[noteId]) {
        const { oscillators: oscs, mainGainNode, reverbNetwork } = oscillators.current[noteId];
        const now = audioContext.current?.currentTime || 0;

        // Quicker release for all oscillators
        oscs.forEach((osc: OscillatorNodePair) => {
          const { oscillator, gainNode } = osc;
          const currentGain = gainNode.gain.value;
          gainNode.gain.setValueAtTime(currentGain, now);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + release);
          oscillator.stop(now + release + 0.1);
        });

        // Gradual release for reverb
        mainGainNode.gain.setValueAtTime(mainGainNode.gain.value, now);
        mainGainNode.gain.linearRampToValueAtTime(0, now + release + 0.1);

        if (reverbNetwork) {
          reverbNetwork.forEach(({ gainNode }: { gainNode: GainNode }) => {
            gainNode.gain.setValueAtTime(gainNode.gain.value, now);
            gainNode.gain.linearRampToValueAtTime(0, now + release + 0.2);
          });
        }

        delete oscillators.current[noteId];
        setActiveNotes((prev) => {
          const next = new Set(prev);
          next.delete(noteId);
          return next;
        });
      }
    } catch (error) {
      console.error('Error stopping note: ' + (error as Error).message);
    }
  };

  // Play Mary Had a Little Lamb
  const playMaryLamb = () => {
    // Stop any currently playing notes
    stopAllSounds();
    // Mary Had a Little Lamb in C major
    // Format: [note index, duration in ms]
    // Note: Scale degrees in base-0: C=0, D=2, E=4, F=5, G=7, A=9, B=11
    const melody = [
      // Mary had a little lamb
      [4, 400],
      [2, 400],
      [0, 400],
      [2, 400],
      [4, 400],
      [4, 400],
      [4, 600],

      // Little lamb, little lamb
      [2, 400],
      [2, 400],
      [2, 600],
      [4, 400],
      [7, 400],
      [7, 600],

      // Mary had a little lamb
      [4, 400],
      [2, 400],
      [0, 400],
      [2, 400],
      [4, 400],
      [4, 400],
      [4, 400],
      [4, 400],

      // Its fleece was white as snow
      [2, 400],
      [2, 400],
      [4, 400],
      [2, 400],
      [0, 800],
    ];

    // Calculate note frequencies based on our current base value
    const ratio = getRatio();
    let currentTime = 0;
    setIsPlaying({ status: true, song: 'mary-lamb', baseValue: baseValue });
    melody.forEach(([noteIndex, duration], index) => {
      // Calculate the frequency for this note using the current base value ratio
      const frequency = baseFrequency * Math.pow(ratio, noteIndex);
      const startTimeoutId = setTimeout(() => {
        startNote(frequency);
        const stopTimeoutId = setTimeout(() => {
          stopNote(frequency);
          if (index === melody.length - 1) {
            setIsPlaying({ song: '', status: false, baseValue: baseValue });
          }
        }, duration * 0.85); // Slight release before next note
        timeoutIds.current.push(stopTimeoutId as unknown as number);
      }, currentTime);
      timeoutIds.current.push(startTimeoutId as unknown as number);

      currentTime += duration;
    });
  };

  // Play Twinkle Twinkle Little Star
  const playTwinkleStar = () => {
    // Stop any currently playing notes
    stopAllSounds();
    setIsPlaying({ status: true, song: 'twinkle-star', baseValue: baseValue });
    // Twinkle Twinkle Little Star melody in C major
    // Format: [note index, duration in ms]
    // Note: Scale degrees in base-0: C=0, D=2, E=4, F=5, G=7, A=9, B=11
    const melody = [
      // Twinkle twinkle little star
      [0, 400],
      [0, 400],
      [7, 400],
      [7, 400],
      [9, 400],
      [9, 400],
      [7, 800],

      // How I wonder what you are
      [5, 400],
      [5, 400],
      [4, 400],
      [4, 400],
      [2, 400],
      [2, 400],
      [0, 800],

      // Up above the world so high
      [7, 400],
      [7, 400],
      [5, 400],
      [5, 400],
      [4, 400],
      [4, 400],
      [2, 800],

      // Like a diamond in the sky
      [7, 400],
      [7, 400],
      [5, 400],
      [5, 400],
      [4, 400],
      [4, 400],
      [2, 800],

      // Twinkle twinkle little star
      [0, 400],
      [0, 400],
      [7, 400],
      [7, 400],
      [9, 400],
      [9, 400],
      [7, 800],

      // How I wonder what you are
      [5, 400],
      [5, 400],
      [4, 400],
      [4, 400],
      [2, 400],
      [2, 400],
      [0, 800],
    ];

    // Calculate note frequencies based on our current base value
    const ratio = getRatio();
    let currentTime = 0;

    melody.forEach(([noteIndex, duration], index) => {
      // Calculate the frequency for this note using the current base value ratio
      const frequency = baseFrequency * Math.pow(ratio, noteIndex);

      const startTimeoutId = setTimeout(() => {
        startNote(frequency);
        const stopTimeoutId = setTimeout(() => {
          stopNote(frequency);
          if (index === melody.length - 1) {
            setIsPlaying({ song: '', status: false, baseValue: baseValue });
          }
        }, duration * 0.85); // Slight release before next note
        timeoutIds.current.push(stopTimeoutId as unknown as number);
      }, currentTime);
      timeoutIds.current.push(startTimeoutId as unknown as number);

      currentTime += duration;
    });
  };

  const handleBaseValueChange = (value: number) => {
    setBaseValue(value);

    // Stop all currently playing notes when changing the base value
    Object.keys(oscillators.current).forEach((key) => {
      const frequency = parseFloat(key.split('_')[1]);
      stopNote(frequency);
    });
  };

  // Function to stop all currently playing sounds and clear scheduled notes
  const stopAllSounds = () => {
    // Clear all scheduled timeouts
    timeoutIds.current.forEach((id) => clearTimeout(id));
    timeoutIds.current = []; // Reset timeout array

    // Stop all currently playing notes
    Object.keys(oscillators.current).forEach((key) => {
      const frequency = parseFloat(key.split('_')[1]);
      stopNote(frequency);
    });
    setIsPlaying({ status: false, song: '', baseValue: baseValue });
  };

  // Generate data for Recharts
  const generateChartData = () => {
    const data = [];
    for (let i = 0; i <= 12; i++) {
      const currentRatio = Math.pow(baseValue, i / 12);
      const standardRatio = Math.pow(2, i / 12);

      data.push({
        step: i,
        ratio: currentRatio,
        standardRatio: baseValue !== 2 ? standardRatio : null,
        frequency: baseFrequency * currentRatio,
        standardFrequency: baseValue !== 2 ? baseFrequency * standardRatio : null,
      });
    }
    return data;
  };

  const chartData = generateChartData();

  // Generate data for step 1: base value vs frequency graph
  const generateStep1ChartData = () => {
    const data = [];
    // Generate data points from base value 1.0 to 4.0 with step size 0.5
    for (let x = 1.0; x <= 4.0; x += 0.5) {
      const frequency = baseFrequency * Math.pow(x, 1 / 12);
      data.push({
        baseValue: x,
        frequency: frequency,
      });
    }
    return data;
  };

  const step1ChartData = generateStep1ChartData();

  // Define proper type for tooltip props
  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      value: number;
      dataKey: string;
      name?: string;
    }>;
    label?: string;
  }

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded text-xs">
          <p className="font-bold">
            {t(interaction.textSteps)} <span className="text-[#00749D]">{label}</span>:
          </p>
          <p>
            <span className="">{t(interaction.textFrequency)}:</span>{' '}
            <b className="text-[#8E24AA]">{payload[0].value.toFixed(1)} Hz</b>
          </p>
          <p>
            <span className="">{t(interaction.textRatio)}:</span>{' '}
            <b className="text-[#677600]">{(payload[0].value / baseFrequency).toFixed(3)}</b>
          </p>
          {baseValue !== 2 && payload[1] && (
            <>
              <p>
                {t(interaction.textStandard)} {t(interaction.textFrequency)}:{' '}
                <b className="text-[#006be0]">{payload[1].value.toFixed(1)} Hz</b>
              </p>
              <p>
                {t(interaction.textStandard)} {t(interaction.textRatio)}:{' '}
                <b className="text-[#006be0]">{(payload[1].value / baseFrequency).toFixed(3)}</b>
              </p>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  const buttonClassName = {
    active: 'bg-[#006be0] hover:bg-[# ] text-white',
    inactive: 'bg-white border border-[#006be0] hover:bg-[#dbeafe] text-[#006be0]',
  };

  const handleDotKeyDown = (
    e: React.KeyboardEvent,
    step: number,
    cx: number,
    cy: number,
    payload: LineProps['payload'],
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();

      const tooltipY = cy < 100 ? cy + 10 : cy - 80;

      setTooltipInfo({
        x: cx,
        y: tooltipY,
        step: step,
        ratio: payload?.ratio || 0,
        standardRatio: payload?.standardRatio,
        frequency: payload?.frequency || 0,
        standardFrequency: payload?.standardFrequency,
        visible: true,
      });
    }
  };

  const handleDotBlur = () => {
    setTooltipInfo(null);
  };

  // Format frequency for display
  const formatFreq = (freq: number) => {
    if (freq >= 1000) {
      return `${(freq / 1000).toFixed(2)}kHz`;
    }
    return `${Math.round(freq)}Hz`;
  };

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'baseValue' in payload) {
      if (
        payload.baseValue === 2 &&
        isPlaying.status &&
        isPlaying.song === 'mary-lamb' &&
        isPlaying.baseValue === 2
      ) {
        onInteraction({
          'is-mary-lamb-playing-base-value-2': true,
        });
      } else if (
        payload.baseValue === 1.5 &&
        isPlaying.status &&
        isPlaying.song === 'mary-lamb' &&
        isPlaying.baseValue === 1.5
      ) {
        onInteraction({
          'is-mary-lamb-playing-base-value-1.5': true,
        });
      }
    }
  }, [isPlaying]);

  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4">
        {/* Graph and Keys */}
        <div className="flex flex-col gap-4">
          {/* Step 1: Base Value vs Frequency Graph */}
          {currentStep === 1 && (
            <div role="region" aria-label={t(interaction.step1_ariaLabelChart)} className="relative">
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart data={step1ChartData} margin={{ top: 5, right: 30, left: 6, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis
                    dataKey="baseValue"
                    label={{
                      value: t(interaction.step1_x_label),
                      position: 'insideBottom',
                      offset: -5,
                      fontSize: 14,
                      fontWeight: 'bold',
                      fill: '#00749D',
                    }}
                    tick={{ fontSize: 12, fill: '#718096' }}
                    domain={[1, 4]}
                  />
                  <YAxis
                    label={{
                      value: t(interaction.step1_y_label),
                      angle: -90,
                      position: 'insideLeft',
                      fontSize: 14,
                      fill: '#677600',
                      fontWeight: 'bold',
                      offset: 0,
                      dy: 56,
                    }}
                    domain={[440, 500]}
                    tick={{ fontSize: 12, fill: '#718096' }}
                    tickFormatter={(value) => `${Math.round(value)} Hz`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const frequency = typeof payload[0].value === 'number' ? payload[0].value : 0;
                        return (
                          <div className="bg-white p-2 border border-gray-200 shadow-md rounded text-xs">
                            <p className="font-bold">
                              {t(interaction.step1_tooltip_base_value)}:{' '}
                              <span className="text-[#00749D]">{label}</span>
                            </p>
                            <p>
                              {t(interaction.step1_tooltip_frequency)}:{' '}
                              <b className="text-[#8E24AA]">{frequency.toFixed(1)} Hz</b>
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="frequency"
                    stroke="#8E24AA"
                    strokeWidth={3}
                    dot={(props) => {
                      // Only show dot for the current base value
                      if (props.payload && Math.abs(props.payload.baseValue - baseValue) < 0.01) {
                        return (
                          <circle
                            cx={props.cx}
                            cy={props.cy}
                            r={6}
                            fill="#8E24AA"
                            stroke="white"
                            strokeWidth={2}
                          />
                        );
                      }
                      return <></>;
                    }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Frequency Graph - Recharts implementation */}
          {currentStep === 2 && (
            <div role="region" aria-label={t(interaction.ariaLabelChart)} className="relative">
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart data={chartData} margin={{ top: 5, right: 20, left: 30, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis
                    dataKey="step"
                    label={{
                      value: t(interaction.x_label),
                      position: 'insideBottom',
                      offset: -5,
                      fontSize: 14,
                      fontWeight: 'bold',
                      fill: '#00749D',
                    }}
                    tick={{ fontSize: 12, fill: '#718096' }}
                  />
                  <YAxis
                    label={{
                      value: t(interaction.textFrequency),
                      angle: -90,
                      position: 'insideLeft',
                      fontSize: 14,
                      fill: '#8E24AA',
                      fontWeight: 'bold',
                      offset: -5,
                      dy: 32,
                    }}
                    domain={[400, 900]}
                    tick={{ fontSize: 12, fill: '#718096' }}
                    tickFormatter={(value) => `${value} Hz`}
                    ticks={[400, 500, 600, 700, 800, 900]}
                  />
                  <Tooltip content={<CustomTooltip />} />

                  {/* Lines */}
                  <Line
                    type="monotone"
                    dataKey="frequency"
                    stroke="#8E24AA"
                    strokeWidth={3}
                    dot={(props: LineProps) => {
                      const { cx, cy, payload, dataKey } = props;
                      if (!cx || !cy || !payload) {
                        return <></>;
                      }
                      const step = payload.step;
                      const value = payload[dataKey as keyof typeof payload];
                      const isStandardFrequency = dataKey === 'standardFrequency';
                      const color = isStandardFrequency ? '#006be0' : '#8E24AA';

                      // Create accessible label for screen readers
                      const ariaLabel = `${t(interaction.ariaLabelStep)} ${step}, ${t(interaction.ariaLabelFrequency)} ${value?.toFixed(1)} ${t(interaction.ariaLabelHz)}`;

                      return (
                        <g>
                          <circle
                            cx={cx}
                            cy={cy}
                            r={isStandardFrequency ? 4 : 4}
                            fill={color}
                            stroke="white"
                            strokeWidth={1}
                            tabIndex={0}
                            onKeyDown={(e) => handleDotKeyDown(e, step, cx, cy, payload)}
                            onFocus={() => {
                              const tooltipY = cy < 100 ? cy + 10 : cy - 80;
                              setTooltipInfo({
                                x: cx,
                                y: tooltipY,
                                step: step,
                                ratio: payload.ratio,
                                standardRatio: payload.standardRatio,
                                frequency: payload.frequency,
                                standardFrequency: payload.standardFrequency,
                                visible: true,
                              });
                            }}
                            onBlur={handleDotBlur}
                            role="button"
                            aria-label={ariaLabel}
                          />
                        </g>
                      );
                    }}
                  />
                  {baseValue !== 2 && (
                    <Line
                      type="monotone"
                      dataKey="standardFrequency"
                      stroke="#006be0"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={(props: LineProps) => {
                        const { cx, cy, payload, dataKey } = props;
                        if (!cx || !cy || !payload) {
                          return <></>;
                        }
                        const step = payload.step;
                        const value = payload[dataKey as keyof typeof payload];

                        // Create accessible label for screen readers
                        const ariaLabel = `${t(interaction.ariaLabelStep)} ${step}, ${t(interaction.textStandard)} ${t(interaction.ariaLabelFrequency)} ${value?.toFixed(1)} ${t(interaction.ariaLabelHz)}`;

                        return (
                          <g>
                            <circle
                              cx={cx}
                              cy={cy}
                              r={4}
                              fill="#006be0"
                              stroke="white"
                              strokeWidth={1}
                              tabIndex={0}
                              onKeyDown={(e) => handleDotKeyDown(e, step, cx, cy, payload)}
                              onFocus={() => {
                                const tooltipY = cy < 100 ? cy + 10 : cy - 80;
                                setTooltipInfo({
                                  x: cx,
                                  y: tooltipY,
                                  step: step,
                                  ratio: payload.ratio,
                                  standardRatio: payload.standardRatio,
                                  frequency: payload.frequency,
                                  standardFrequency: payload.standardFrequency,
                                  visible: true,
                                });
                              }}
                              onBlur={handleDotBlur}
                              role="button"
                              aria-label={ariaLabel}
                            />
                          </g>
                        );
                      }}
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>

              {/* External HTML tooltip overlay that appears above the SVG chart */}
              {tooltipInfo && tooltipInfo.visible && (
                <div
                  className="absolute bg-white p-2 border border-gray-200 shadow-md rounded text-xs"
                  style={{
                    position: 'absolute',
                    left: tooltipInfo.x > window.innerWidth - 200 ? tooltipInfo.x - 200 : tooltipInfo.x - 100,
                    top: tooltipInfo.y,
                    width: '200px',
                    zIndex: 1000,
                    pointerEvents: 'none',
                  }}
                  role="tooltip"
                >
                  <p className="font-bold">
                    {t(interaction.ariaLabelStep)} <span className="text-[#00749D]">{tooltipInfo.step}</span>:
                  </p>
                  <p>
                    <span className="">{t(interaction.textRatio)}:</span>{' '}
                    <b className={`${baseValue != 2 ? 'text-[#677600]' : 'text-[#677600]'}`}>
                      {tooltipInfo.ratio.toFixed(3)}
                    </b>
                  </p>
                  <p>
                    <span className="">{t(interaction.textFrequency)}:</span>{' '}
                    <b className={`${baseValue != 2 ? 'text-[#8E24AA]' : 'text-[#8E24AA]'}`}>
                      {tooltipInfo.frequency.toFixed(1)} Hz
                    </b>
                  </p>
                  {baseValue !== 2 && tooltipInfo.standardRatio && (
                    <>
                      <p>
                        {t(interaction.textStandard)} {t(interaction.textRatio)}:{' '}
                        <b className={`${baseValue != 2 ? 'text-[#006be0]' : 'text-[#006be0]'}`}>
                          {tooltipInfo.standardRatio?.toFixed(3)}
                        </b>
                      </p>
                      <p>
                        {t(interaction.textStandard)} {t(interaction.textFrequency)}:{' '}
                        <b className={`${baseValue != 2 ? 'text-[#006be0]' : 'text-[#006be0]'}`}>
                          {tooltipInfo.standardFrequency?.toFixed(1)} Hz
                        </b>
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="flex flex-col justify-center items-center p-4 shadow-md rounded-lg">
              <h3 className="text-lg font-bold mb-2">{t(interaction.textFrequencyFormula)}</h3>
              <div className="text-lg flex items-center justify-center font-besley font-bold" role="alert">
                <span className="sr-only">{t(interaction.step2_formula_pronunciation)}</span>
                <span className="ml-2" aria-hidden="true">
                  <span className="text-[#8E24AA] italic">f (n)</span> = 440 × (
                  <span className="text-[#633300]" aria-hidden="true">
                    2
                  </span>
                  )
                </span>
                <sup className="text-sm flex" aria-hidden="true">
                  <span className="px-1 text-[#00749D]">n</span>
                  <span className="mx-0.5">/</span>
                  <span className="px-1">12</span>
                </sup>
              </div>
              <p className="mt-2">{parse(t(interaction.step2_formula_explanation))}</p>
            </div>
          )}
        </div>

        {/* Right column - Controls and Formula */}
        <div className="flex flex-col gap-1">
          {currentStep === 1 && (
            <div className="flex flex-col justify-center items-center p-4 shadow-md rounded-lg">
              <h3 className="text-lg font-bold mb-2">{t(interaction.textFrequencyFormula)}</h3>
              <div className="text-lg flex items-center justify-center font-besley font-bold" role="alert">
                <span className="sr-only">{t(interaction.step1_formula_pronunciation)}</span>
                <span className="ml-2" aria-hidden="true">
                  <span className="text-[#8E24AA] italic">f (x)</span> = 440 × (
                  <span className="text-[#633300] italic" aria-hidden="true">
                    x
                  </span>
                  )
                </span>
                <sup className="text-sm flex" aria-hidden="true">
                  <span className="px-1 text-[#00749D]">1</span>
                  <span className="mx-0.5">/</span>
                  <span className="px-1">12</span>
                </sup>
              </div>
              <p className="mt-2">{parse(t(interaction.step1_formula_explanation))}</p>
              <div className="text-base flex items-center justify-center font-besley font-bold mt-4" role="alert">
                <span className="sr-only">
                  {t(interaction.step1_calculation_pronunciation)
                    .replace('{{baseValue}}', baseValue.toString())
                    .replace('{{frequency}}', Math.round(baseFrequency * Math.pow(baseValue, 1 / 12)).toString())}
                </span>
                <span className="ml-2" aria-hidden="true">
                  <span className="text-[#8E24AA] italic">f ({baseValue})</span> = 440 × (
                  <span className="text-[#633300] italic" aria-hidden="true">
                    {baseValue}
                  </span>
                  )
                </span>
                <sup className="text-sm flex" aria-hidden="true">
                  <span className="px-1 text-[#00749D]">1</span>
                  <span className="mx-0.5">/</span>
                  <span className="px-1">12</span>
                </sup>
                <span>= {formatFreq(baseFrequency * Math.pow(baseValue, 1 / 12))}</span>
              </div>
            </div>
          )}

          {/* Base Value Selection - Only for Step 1 */}
          {currentStep === 1 && (
            <div className="mt-4">
              <h2 className="font-bold mb">
                {t(interaction.base_label)} (<span className="italic font-besley font-bold text-[#633300]">x</span>
                ):
              </h2>
              <div className="flex gap-2 justify-between mt-1">
                {[1.5, 2, 2.5, 3, 4].map((value) => {
                  const frequency = baseFrequency * Math.pow(value, 1 / 12);
                  return (
                    <Button
                      key={`base-${value}`}
                      className={`${
                        baseValue === value
                          ? 'bg-[#006be0] hover:bg-[#006be0] text-white'
                          : 'bg-white border border-[#006be0] hover:bg-[#dbeafe] text-[#006be0]'
                      } py-2 rounded text-sm font-bold flex flex-col`}
                      onClick={() => {
                        handleBaseValueChange(value);
                        // Play a quick note to demonstrate the base value
                        startNote(frequency);
                        setTimeout(() => stopNote(frequency), 300);
                      }}
                      disabled={isPlaying.status && baseValue != value}
                      ariaLabel={`${t(interaction.ariaLabelBaseValue)} ${value}${value === 2 ? ' ' + t(interaction.textOctave) : ''}`}
                    >
                      <span>{value === 2 ? `2 (${t(interaction.textOctave)})` : value}</span>
                      <span className="text-xs opacity-75">{formatFreq(frequency)}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Controls */}
          {currentStep === 1 && (
            <div className="flex gap-2 justify-between mt-2">
              <Button
                className={`${buttonClassName[isPlaying.status && isPlaying.song === 'mary-lamb' ? 'active' : 'inactive']} px-2 py-2 rounded flex-1 text-sm font-bold`}
                onClick={playMaryLamb}
                disabled={isPlaying.status && isPlaying.song != 'mary-lamb'}
                ariaLabel={`${t(interaction.ariaLabelPlay)} ${t(interaction.playMaryLamb)}`}
              >
                {t(interaction.playMaryLamb)}
              </Button>
              <Button
                className={`${buttonClassName[isPlaying.status && isPlaying.song === 'twinkle-star' ? 'active' : 'inactive']} px-2 py-2 rounded flex-1 text-sm font-bold`}
                onClick={playTwinkleStar}
                disabled={isPlaying.status && isPlaying.song != 'twinkle-star'}
                ariaLabel={`${t(interaction.ariaLabelPlay)} ${t(interaction.playTwinkle)}`}
              >
                {t(interaction.playTwinkle)}
              </Button>

              <Button
                className="bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded text-sm font-bold w-16"
                onClick={stopAllSounds}
                ariaLabel={t(interaction.ariaLabelStop)}
              >
                {t(interaction.playStop)}
              </Button>
            </div>
          )}

          {/* Frequencies & Ratios Table */}
          {currentStep === 2 && (
            <div className="mt-4">
              <h2 className="font-bold mb">{t(interaction.freq_ratio_label)}:</h2>

              <div className="border border-[#757575] rounded-lg overflow-hidden mt-2">
                <table className="w-full text-base text-center">
                  <thead className={``}>
                    <tr className="border-b border-[#757575]">
                      <th className="px-4 py-2 font-bold font-besley text-center">{t(interaction.textNotes)}</th>
                      <th className="px-4 py-2  text-[#00749D] font-bold font-besley text-center">
                        {t(interaction.textSteps)}
                      </th>
                      <th className="px-4 py-2 text-[#677600] font-bold font-besley text-center">
                        {t(interaction.textRatio)}
                      </th>
                      <th className="px-4 py-2 text-[#8E24AA] font-bold font-besley text-center">
                        {t(interaction.textFrequency)}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {keys.map((key, index) => (
                      <tr
                        key={`row-${index}`}
                        className={`border-b border-[#757575] last:border-b-0  ${activeNotes.has(`freq_${key.frequency}`) ? 'bg-gray-300' : 'bg-white'}`}
                      >
                        <td className="px-4 py-2 text-[#000000]">{key.alphabet}</td>
                        <td className="px-4 py-2 text-[#000000]">{key.note}</td>
                        <td className="px-4 py-2 text-[#000000]">{key.ratio}</td>
                        <td className="px-4 py-2 text-[#000000]">{formatFreq(key.frequency)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicalRatioVisualization;
