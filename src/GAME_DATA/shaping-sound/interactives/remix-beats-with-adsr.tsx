import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useEventListener } from '../../../hooks/useEventListener';
import { useTranslations } from '../../../hooks/useTranslations';
import { useGameContext } from '../../../hooks/useGameContext';
import { RemixBeatsWithADSRInteraction } from './interface';
import * as Tone from 'tone';

interface BeatMakerWithADSRProps {
  interaction: RemixBeatsWithADSRInteraction;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

// Target ADSR values from the learning objectives
const TARGET_ADSR_VALUES = {
  kick: {
    attack: 0.01,
    decay: 0.2,
    sustain: 0.8,
    release: 0.2,
  },
  cymbal: {
    attack: 0.1,
    decay: 0.4,
    sustain: 0.1,
    release: 0.8,
  },
} as const;

const BeatMakerWithADSR: React.FC<BeatMakerWithADSRProps> = ({ interaction, onInteraction }) => {
  const { t } = useTranslations();
  const { dialogIndex } = useGameContext();
  const { payload } = useEventListener('remix-beats-with-adsr') as { payload: { step: number } };

  const { adsrInputs, totalSteps, translations } = interaction;
  const {
    ariaLabel,
    playLabel,
    stopLabel,
    secondsLabel,
    editingLabel,
    selectedLabel,
    kickInstrument,
    cymbalInstrument,
  } = translations;

  const [adsrMode, setAdsrMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(dialogIndex === 1 ? 1 : totalSteps);
  const [playingTestSound, setPlayingTestSound] = useState<string | null>(null);

  // States to track if user has matched target ADSR values
  const [kickAdsrMatched, setKickAdsrMatched] = useState(false);
  const [cymbalAdsrMatched, setCymbalAdsrMatched] = useState(false);

  // Fixed tempo values
  const kickTempo = 120;
  const cymbalTempo = 120;

  const [adsrValues, setAdsrValues] = useState(
    Object.fromEntries(
      Object.entries(adsrInputs).map(([k, v]) => [
        k,
        { attack: v.attack.value, decay: v.decay.value, sustain: v.sustain.value, release: v.release.value },
      ]),
    ),
  );
  const nonAdsrValues = useMemo(
    () => ({
      kick: { attack: 0, decay: 0, sustain: 0.8, release: 0 },
      cymbal: { attack: 0.001, decay: 0.2, sustain: 0.05, release: 0.4 },
    }),
    [],
  );

  type ADSRType = keyof (typeof adsrValues)[keyof typeof adsrValues];
  type InstrumentType = 'kick' | 'cymbal';

  const [activeInstrument, setActiveInstrument] = useState<InstrumentType>('kick');

  const instruments = useRef<
    Record<
      string,
      {
        synth: Tone.MembraneSynth | Tone.MetalSynth;
        trigger: (time: number, duration: string) => void;
      }
    >
  >({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const analyzerRef = useRef<Tone.Analyser | null>(null);
  const loops = useRef<Record<string, Tone.Loop>>({});
  const animationFrame = useRef<number | null>(null);
  const initialized = useRef<boolean>(false);
  const audioElements = useRef<{
    kick?: Tone.MembraneSynth;
    cymbal?: Tone.MetalSynth;
    kickCompressor?: Tone.Compressor;
    cymbalCompressor?: Tone.Compressor;
    cymbalReverb?: Tone.Reverb;
    masterLimiter?: Tone.Limiter;
  }>({});

  // Function to check if ADSR values match target
  const checkAdsrMatch = useCallback(
    (instrument: InstrumentType, values: (typeof adsrValues)[typeof instrument]) => {
      const target = TARGET_ADSR_VALUES[instrument];
      const tolerance = 0.0; // 0.02 tolerance for matching

      const isMatch =
        Math.abs(values.attack - target.attack) == tolerance &&
        Math.abs(values.decay - target.decay) == tolerance &&
        Math.abs(values.sustain - target.sustain) == tolerance &&
        Math.abs(values.release - target.release) == tolerance;

      return isMatch;
    },
    [],
  );

  // Function to check if individual ADSR parameter matches target
  const checkParameterMatch = useCallback(
    (instrument: InstrumentType, parameter: ADSRType) => {
      const target = TARGET_ADSR_VALUES[instrument];
      const currentValue = adsrValues[instrument][parameter];
      const targetValue = target[parameter];
      const tolerance = 0.0; // 0.02 tolerance for matching

      return Math.abs(currentValue - targetValue) <= tolerance;
    },
    [adsrValues],
  );

  // Check ADSR matches whenever values change
  useEffect(() => {
    if (adsrMode) {
      const kickMatch = checkAdsrMatch('kick', adsrValues.kick);
      const cymbalMatch = checkAdsrMatch('cymbal', adsrValues.cymbal);

      setKickAdsrMatched(kickMatch);
      setCymbalAdsrMatched(cymbalMatch);
    } else {
      setKickAdsrMatched(false);
      setCymbalAdsrMatched(false);
    }
  }, [adsrValues, adsrMode, checkAdsrMatch]);

  // handle step change
  useEffect(() => {
    if (payload) {
      setCurrentStep(payload.step);
    }
  }, [payload]);

  // handle adsr mode
  useEffect(() => {
    if (currentStep === 1) {
      setAdsrMode(false);
    }
    if (currentStep === 2) {
      setAdsrMode(true);
    } else {
      setAdsrMode(false);
    }
  }, [currentStep]);

  const getInstrumentName = (name: string) => {
    switch (name) {
      case 'kick':
        return t(kickInstrument);
      case 'cymbal':
        return t(cymbalInstrument);
      default:
        break;
    }
  };

  const getAdsrValue = (param: ADSRType) => {
    if (param === 'sustain') {
      return Number(parseFloat((adsrValues[activeInstrument][param] * 100).toFixed(0)));
    }
    return Number(adsrValues[activeInstrument][param].toFixed(2));
  };

  // Initialize Tone.js and set up instruments
  useEffect(() => {
    if (initialized.current) return;
    const setupInstruments = () => {
      const masterLimiter = new Tone.Limiter(-6).toDestination();
      const kickCompressor = new Tone.Compressor({
        threshold: -20,
        ratio: 4,
        attack: 0.001,
        release: 0.1,
      });
      const kickEnvelope = adsrMode ? adsrValues.kick : nonAdsrValues.kick;
      const kick = new Tone.MembraneSynth({
        pitchDecay: 0.08,
        octaves: 3,
        oscillator: { type: 'sine' },
        envelope: {
          attack: kickEnvelope.attack,
          decay: kickEnvelope.decay,
          sustain: kickEnvelope.sustain,
          release: kickEnvelope.release,
        },
      }).connect(kickCompressor);
      kickCompressor.connect(masterLimiter);
      kick.volume.value = -2;
      const cymbalEnvelope = adsrMode ? adsrValues.cymbal : nonAdsrValues.cymbal;
      const cymbal = new Tone.MetalSynth({
        envelope: {
          attack: cymbalEnvelope.attack,
          decay: cymbalEnvelope.decay,
          sustain: cymbalEnvelope.sustain,
          release: cymbalEnvelope.release,
        },
        harmonicity: adsrMode ? 3.5 : 5.1,
        modulationIndex: adsrMode ? 24 : 32,
        resonance: adsrMode ? 3000 : 4000,
        octaves: adsrMode ? 1.2 : 1.5,
      }).connect(masterLimiter);
      cymbal.frequency.value = adsrMode ? 250 : 200;
      const cymbalCompressor = new Tone.Compressor({
        threshold: adsrMode ? -24 : -20,
        ratio: adsrMode ? 12 : 4,
        attack: adsrMode ? 0.003 : 0.001,
        release: adsrMode ? 0.25 : 0.2,
      });
      const cymbalReverb = new Tone.Reverb({
        decay: adsrMode ? 1.2 : 1.0,
        wet: adsrMode ? 0.1 : 0.15,
      }).toDestination();
      cymbal.connect(cymbalCompressor);
      cymbalCompressor.connect(cymbalReverb);
      cymbal.volume.value = adsrMode ? -8 : 0;
      const analyzer = new Tone.Analyser('waveform', 128);
      analyzerRef.current = analyzer;
      kick.connect(analyzer);
      cymbal.connect(analyzer);
      instruments.current = {
        kick: {
          synth: kick,
          trigger: (time, duration) => {
            kick.triggerAttackRelease('C1', duration, time);
          },
        },
        cymbal: {
          synth: cymbal,
          trigger: (time, duration) => {
            cymbal.triggerAttackRelease('C1', duration, time);
          },
        },
      };
      audioElements.current = {
        kick,
        cymbal,
        kickCompressor,
        cymbalCompressor,
        cymbalReverb,
        masterLimiter,
      };
    };
    const setupLoops = () => {
      const kickLoop = new Tone.Loop((time) => {
        instruments.current.kick.trigger(time, '8n');
      }, 60 / kickTempo);
      const cymbalLoop = new Tone.Loop((time) => {
        instruments.current.cymbal.trigger(time, '8n');
      }, 60 / cymbalTempo);
      loops.current = {
        kick: kickLoop,
        cymbal: cymbalLoop,
      };
    };
    const initTone = async () => {
      try {
        await Tone.start();
        setupInstruments();
        setupLoops();
        initialized.current = true;
        startVisualizations();
      } catch (error) {
        console.error('Error initializing audio:', error);
      }
    };
    initTone();
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      if (loops.current) {
        if (loops.current.kick) loops.current.kick.dispose();
        if (loops.current.cymbal) loops.current.cymbal.dispose();
      }
      Object.values(audioElements.current).forEach((element: Tone.ToneAudioNode | undefined) => {
        if (element && typeof element.dispose === 'function') {
          element.dispose();
        }
      });
      if (Tone.Transport.state !== 'stopped') {
        Tone.Transport.stop();
      }
      Tone.Transport.cancel();
    };
  }, []);

  // Update ADSR values when changed
  useEffect(() => {
    if (!initialized.current) return;
    const currentValues = adsrMode ? adsrValues : nonAdsrValues;
    Object.entries(currentValues).forEach(([instrumentName, values]) => {
      const inst = instruments.current[instrumentName];
      if (!inst || !inst.synth) return;
      if (instrumentName === 'cymbal') {
        try {
          const cymbalSynth = inst.synth;
          cymbalSynth.envelope.set({
            attack: values.attack,
            decay: values.decay,
            sustain: adsrMode ? Math.min(values.sustain, 0.2) : values.sustain,
            release: values.release,
          });
        } catch (error) {
          console.error('Error updating cymbal envelope:', error);
        }
      } else {
        inst.synth.envelope.attack = values.attack;
        inst.synth.envelope.decay = values.decay;
        inst.synth.envelope.sustain = values.sustain;
        inst.synth.envelope.release = values.release;
      }
    });
  }, [adsrValues, adsrMode]);

  // Update loops when tempos change
  useEffect(() => {
    if (!initialized.current || !loops.current?.kick) return;
    const kickInterval = 60 / kickTempo;
    loops.current.kick.interval = kickInterval;
  }, [kickTempo]);

  useEffect(() => {
    if (!initialized.current || !loops.current?.cymbal) return;
    const cymbalInterval = 60 / cymbalTempo;
    loops.current.cymbal.interval = cymbalInterval;
  }, [cymbalTempo]);

  // Handle play/pause
  const togglePlay = async () => {
    if (!initialized.current) {
      try {
        await Tone.start();
        setTimeout(() => {
          if (initialized.current) {
            // Start loops
            loops.current.kick.start(0);
            loops.current.cymbal.start(0);
            Tone.Transport.start();
            setIsPlaying(true);
          }
        }, 100);
      } catch (error) {
        console.error('Error starting audio:', error);
      }
      return;
    }

    try {
      if (!isPlaying) {
        Tone.Transport.start();
        loops.current.kick.start(0);
        loops.current.cymbal.start(0);
      } else {
        Tone.Transport.stop();
        loops.current.kick.stop();
        loops.current.cymbal.stop();
      }

      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error toggling play state:', error);
    }
  };

  // Handle ADSR value changes
  const handleAdsrChange = (parameter: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseFloat(e.target.value);
    updateSliderBackground(e.target as HTMLInputElement);
    setAdsrValues((prev) => ({
      ...prev,
      [activeInstrument]: {
        ...prev[activeInstrument],
        [parameter]: numValue,
      },
    }));
  };

  // Start visualizations
  const startVisualizations = () => {
    const canvas = canvasRef.current;
    if (!canvas || !analyzerRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const draw = () => {
      try {
        const dataArray = analyzerRef.current?.getValue();
        if (!dataArray) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 2;
        const sliceWidth = canvas.width / dataArray.length;
        let x = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const v = dataArray[i];
          const value = v instanceof Float32Array ? v[0] : v;
          const y = ((value + 1) / 2) * canvas.height;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }
        ctx.stroke();
      } catch (error) {
        console.error('Error drawing waveform:', error);
      }
      animationFrame.current = requestAnimationFrame(draw);
    };
    draw();
  };

  // Trigger individual sounds for testing
  const playSound = (instrument: InstrumentType) => {
    if (!initialized.current) return;
    const inst = instruments.current[instrument];
    if (inst && inst.trigger) {
      try {
        setPlayingTestSound(instrument);

        if (instrument === 'kick') {
          inst.synth.volume.value = 2;
          inst.trigger(Tone.now(), '8n');
          setTimeout(() => {
            inst.synth.volume.value = -2;
            setPlayingTestSound(null);
          }, 1000);
        } else if (instrument === 'cymbal') {
          const values = adsrMode ? adsrValues.cymbal : nonAdsrValues.cymbal;
          if (inst.synth.envelope) {
            inst.synth.envelope.attack = values.attack;
            inst.synth.envelope.decay = values.decay;
            inst.synth.envelope.sustain = values.sustain;
            inst.synth.envelope.release = values.release;
          }
          inst.synth.volume.value = adsrMode ? -2 : 6;
          inst.trigger(Tone.now(), adsrMode ? '16n' : '16n');
          setTimeout(() => {
            inst.synth.volume.value = adsrMode ? -8 : 0;
            setPlayingTestSound(null);
          }, 1500);
        }
      } catch (error) {
        console.error(`Error playing sound for ${instrument}:`, error);
        setPlayingTestSound(null);
      }
    }
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
    [activeInstrument, adsrMode],
  );

  useEffect(() => {
    Object.entries(adsrInputs).forEach(([, params]) => {
      Object.entries(params).forEach(([, value]) => {
        const sliderElement = document.getElementById(`slider-${value.id}`) as HTMLInputElement;
        if (sliderElement) {
          updateSliderBackground(sliderElement);
        }
      });
    });
  }, [adsrInputs, updateSliderBackground]);

  const getUnitLabel = useCallback(
    (unit: string) => {
      switch (unit) {
        case 's':
          return secondsLabel;
        default:
          return unit;
      }
    },
    [secondsLabel],
  );

  useEffect(() => {
    if (!kickAdsrMatched && !cymbalAdsrMatched && isPlaying) {
      onInteraction({
        'playing-beat-without-adsr': true,
      });
    }
    if (kickAdsrMatched) {
      onInteraction({
        'kick-adsr-matched': true,
      });
    }
    if (cymbalAdsrMatched) {
      onInteraction({
        'cymbal-adsr-matched': true,
      });
    }
    if (kickAdsrMatched && cymbalAdsrMatched && isPlaying) {
      onInteraction({
        'playing-beat-with-adsr': true,
      });
    }
  }, [isPlaying, kickAdsrMatched, cymbalAdsrMatched]);

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Main Waveform */}
      <div role="region" aria-label={t(ariaLabel)} className="rounded h-24 border border-gray-500">
        <canvas ref={canvasRef} className="w-full h-full" width="600" height="100"></canvas>
      </div>
      {/* Instrument Selection */}
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={togglePlay}
          className="px-2 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-4 lg:py-2 bg-[#006BE0] hover:bg-blue-600 text-white"
        >
          {isPlaying ? t(stopLabel) : t(playLabel)}
        </button>
        {Object.keys(adsrValues).map((instrument) => (
          <button
            key={instrument}
            className={`flex items-center justify-center gap-2 px-2 py-1 lg:px-4 lg:py-2 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              activeInstrument === instrument
                ? 'bg-[#006BE0] hover:bg-blue-600 text-white'
                : 'text-[#006BE0] bg-white hover:bg-blue-100 border border-blue-500'
            }`}
            onClick={() => {
              setActiveInstrument(instrument as InstrumentType);
              playSound(instrument as InstrumentType);
            }}
          >
            {getInstrumentName(instrument)}
            {playingTestSound === instrument ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
      {/* ADSR or Simple Controls depending on mode */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="font-semibold">
            {' '}
            {adsrMode ? t(editingLabel) : t(selectedLabel)}: {getInstrumentName(activeInstrument)}
          </div>
        </div>
        {adsrMode && (
          <div className="flex flex-col gap-4">
            {/* ADSR Diagram */}
            <div className="h-16 rounded border border-gray-500">
              <svg width="100%" height="100%" viewBox="0 0 400 60" preserveAspectRatio="none">
                {/* ADSR Envelope Visualization */}
                <path
                  d={`
                  M 0,60 
                  L ${(adsrValues[activeInstrument].attack / adsrInputs[activeInstrument].attack.max) * 100},10 
                  L ${
                    (adsrValues[activeInstrument].attack / adsrInputs[activeInstrument].attack.max) * 100 +
                    (adsrValues[activeInstrument].decay / adsrInputs[activeInstrument].decay.max) * 100
                  },${60 - adsrValues[activeInstrument].sustain * 50} 
                  L ${
                    (adsrValues[activeInstrument].attack / adsrInputs[activeInstrument].attack.max) * 100 +
                    (adsrValues[activeInstrument].decay / adsrInputs[activeInstrument].decay.max) * 100 +
                    100
                  },${60 - adsrValues[activeInstrument].sustain * 50} 
                  L ${
                    (adsrValues[activeInstrument].attack / adsrInputs[activeInstrument].attack.max) * 100 +
                    (adsrValues[activeInstrument].decay / adsrInputs[activeInstrument].decay.max) * 100 +
                    100 +
                    (adsrValues[activeInstrument].release / adsrInputs[activeInstrument].release.max) * 100
                  },60
                `}
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                />
                {/* Labels */}
                <text x="5" y="20" fontSize="10" fill="#333">
                  A
                </text>
                <text
                  x={(adsrValues[activeInstrument].attack / adsrInputs[activeInstrument].attack.max) * 100 + 5}
                  y="20"
                  fontSize="10"
                  fill="#333"
                >
                  D
                </text>
                <text
                  x={
                    (adsrValues[activeInstrument].attack / adsrInputs[activeInstrument].attack.max) * 100 +
                    (adsrValues[activeInstrument].decay / adsrInputs[activeInstrument].decay.max) * 100 +
                    50
                  }
                  y="20"
                  fontSize="10"
                  fill="#333"
                >
                  S
                </text>
                <text
                  x={
                    (adsrValues[activeInstrument].attack / adsrInputs[activeInstrument].attack.max) * 100 +
                    (adsrValues[activeInstrument].decay / adsrInputs[activeInstrument].decay.max) * 100 +
                    105
                  }
                  y="20"
                  fontSize="10"
                  fill="#333"
                >
                  R
                </text>
              </svg>
            </div>
            <div className="h-max grid grid-cols-1 lg:grid-cols-4 gap-4">
              {Object.keys(adsrValues[activeInstrument]).map((param, index) => (
                <div key={`h-${index}`} className="w-full text-lg font-medium flex flex-col">
                  <div aria-live="off" className="flex justify-between text-base font-semibold">
                    <span>
                      <label htmlFor={`slider-${adsrInputs[activeInstrument][param].id}`}>
                        {t(adsrInputs[activeInstrument][param].label)}
                      </label>
                      : {getAdsrValue(param as ADSRType)} {t(adsrInputs[activeInstrument][param].unit ?? '')}
                    </span>
                    <span aria-live="polite" className="text-[#008217]">
                      {checkParameterMatch(activeInstrument, param as ADSRType) ? '✓' : ''}
                    </span>
                  </div>
                  <div className="w-full">
                    <div>
                      <input
                        type="range"
                        min={adsrInputs[activeInstrument][param].min}
                        max={adsrInputs[activeInstrument][param].max}
                        step={adsrInputs[activeInstrument][param].step}
                        value={adsrValues[activeInstrument][param as ADSRType].toFixed(2)}
                        id={`slider-${adsrInputs[activeInstrument][param].id}`}
                        onChange={(e) => handleAdsrChange(param, e)}
                        className="global-slider w-full"
                        aria-valuetext={`${t(adsrInputs[activeInstrument][param].label ?? '')} : ${getAdsrValue(param as ADSRType)} ${t(getUnitLabel(adsrInputs[activeInstrument][param].unit ?? ''))}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeatMakerWithADSR;
