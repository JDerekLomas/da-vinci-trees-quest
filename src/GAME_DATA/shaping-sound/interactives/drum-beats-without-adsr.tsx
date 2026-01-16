import { useState, useEffect, useRef, useCallback } from 'react';
import { DrumBeatsWithoutADSRInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';
import * as Tone from 'tone';

export interface BeatMakerProps {
  interaction: DrumBeatsWithoutADSRInteraction;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const BeatMaker = ({ interaction, onInteraction }: BeatMakerProps) => {
  const { t } = useTranslations();

  const { translations } = interaction;
  const { ariaLabel, playLabel, stopLabel, kickInstrument, cymbalInstrument } = translations;

  const [isPlaying, setIsPlaying] = useState(false);
  const [playingTestSound, setPlayingTestSound] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  // Fixed tempo values
  const kickTempo = 120;
  const cymbalTempo = 120;

  const { payload } = useEventListener('drum-beats-without-adsr');

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      setStep(payload.step as number);
    }
  }, [payload]);

  useEffect(() => {
    if (step === 1 && isPlaying) {
      onInteraction({ 'step-1-completed': true });
      setTimeout(() => {
        if (isPlaying) {
          Tone.Transport.stop();
          loops.current.kick.stop();
          loops.current.cymbal.stop();
          setIsPlaying(false);
        }
      }, 3000);
    }
  }, [step, onInteraction, isPlaying]);

  const [adsrValues] = useState({
    kick: { attack: 0, decay: 0, sustain: 0.8, release: 0 },
    cymbal: { attack: 0.001, decay: 0.4, sustain: 0.2, release: 0.8 },
  });

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
      const kick = new Tone.MembraneSynth({
        pitchDecay: 0.08,
        octaves: 3,
        oscillator: { type: 'sine' },
        envelope: {
          attack: adsrValues.kick.attack,
          decay: adsrValues.kick.decay,
          sustain: adsrValues.kick.sustain,
          release: adsrValues.kick.release,
        },
      }).connect(kickCompressor);
      kickCompressor.connect(masterLimiter);
      kick.volume.value = -2;
      const cymbal = new Tone.MetalSynth({
        envelope: {
          attack: adsrValues.cymbal.attack,
          decay: adsrValues.cymbal.decay,
          sustain: adsrValues.cymbal.sustain,
          release: adsrValues.cymbal.release,
        },
        harmonicity: 5.1,
        modulationIndex: 32,
        resonance: 4000,
        octaves: 1.5,
      }).connect(masterLimiter);
      cymbal.frequency.value = 200;
      const cymbalCompressor = new Tone.Compressor({
        threshold: -20,
        ratio: 4,
        attack: 0.001,
        release: 0.2,
      });
      const cymbalReverb = new Tone.Reverb({
        decay: 1.0,
        wet: 0.2,
      }).toDestination();
      cymbal.connect(cymbalCompressor);
      cymbalCompressor.connect(cymbalReverb);
      cymbal.volume.value = 0;
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
        instruments.current.cymbal.trigger(time, '4n');
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
    Object.entries(adsrValues).forEach(([instrumentName, values]) => {
      const inst = instruments.current[instrumentName];
      if (inst && inst.synth && inst.synth.envelope) {
        if (instrumentName === 'cymbal') {
          inst.synth.envelope.set({
            attack: values.attack,
            decay: values.decay,
            sustain: values.sustain,
            release: values.release,
          });
        } else {
          inst.synth.envelope.attack = values.attack;
          inst.synth.envelope.decay = values.decay;
          inst.synth.envelope.sustain = values.sustain;
          inst.synth.envelope.release = values.release;
        }
      }
    });
  }, [adsrValues]);

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
  const togglePlay = useCallback(async () => {
    if (!initialized.current) {
      try {
        await Tone.start();
        setTimeout(() => {
          if (initialized.current) {
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
  }, [isPlaying]);

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
  const playSound = useCallback((instrument: string) => {
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
          inst.synth.volume.value = 6;
          inst.trigger(Tone.now(), '2n');
          setTimeout(() => {
            inst.synth.volume.value = 0;
            setPlayingTestSound(null);
          }, 1500);
        }
      } catch (error) {
        console.error(`Error playing sound for ${instrument}:`, error);
        setPlayingTestSound(null);
      }
    }
  }, []);

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
            className={`flex items-center justify-center gap-2 px-2 py-1 lg:px-4 lg:py-2 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-[#006BE0] hover:bg-blue-600 text-white`}
            onClick={() => {
              playSound(instrument);
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
      {/* Drum Setup Image */}
      <img
        src={t(interaction.translations.drumSetupImage)}
        alt={t(interaction.translations.drumSetupAlt)}
        aria-label={t(interaction.translations.drumSetupAriaLabel)}
        className="mb-6 mx-auto rounded-lg w-full lg:w-4/5 xl:w-3/5"
      />
    </div>
  );
};

export default BeatMaker;
