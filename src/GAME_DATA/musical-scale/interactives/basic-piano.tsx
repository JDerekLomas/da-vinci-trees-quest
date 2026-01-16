/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import basicPianoConfig from '../configs/basic-piano';
import Button from './button';
import { keysBaseColor, keysActiveColor, keysClassName } from './constant';
import { useEventListener } from '../../../hooks/useEventListener';

const createAudioContext = () => {
  return new (window.AudioContext || window.webkitAudioContext)();
};

interface SimpleSynthesizerProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const SimpleSynthesizer: React.FC<SimpleSynthesizerProps> = ({ onInteraction }) => {
  const audioContext = useRef<AudioContext | null>(null);
  const oscillators = useRef({});
  const timeoutIds = useRef([]);
  const { payload } = useEventListener('basic-piano');

  const { t } = useTranslations();

  const attack = basicPianoConfig.attack;
  const decay = basicPianoConfig.decay;
  const sustain = basicPianoConfig.sustain;
  const release = basicPianoConfig.release;

  const [activeNotes, setActiveNotes] = useState(new Set());
  const [, setDebug] = useState('');
  const [isPlaying, setIsPlaying] = useState({
    status: false,
    song: '',
  });

  const baseFrequency = basicPianoConfig.baseFrequency;
  const baseValue = basicPianoConfig.baseValue;

  const noteNames = basicPianoConfig.noteNames;

  const getRatio = () => Math.pow(baseValue, 1 / 12);

  const generateKeys = () => {
    const ratio = getRatio();
    const keys = [];
    for (let i = 0; i <= 12; i++) {
      const stepRatio = Math.pow(ratio, i);
      keys.push({
        note: i,
        name: noteNames[i],
        ratio: i === 0 ? '1' : i === 12 ? '2' : stepRatio.toFixed(4),
        value: stepRatio,
        frequency: baseFrequency * stepRatio,
      });
    }
    return keys;
  };

  const keys = generateKeys();

  const initAudioContext = async () => {
    if (!audioContext.current) {
      try {
        audioContext.current = createAudioContext();
        if (audioContext.current.state === 'suspended') {
          await audioContext.current.resume();
        }
      } catch (error) {
        setDebug('Error creating audio context: ' + error);
      }
    }
  };

  const createOrganNote = (frequency: number) => {
    try {
      if (!audioContext.current || frequency === 0) {
        return null;
      }

      const now = audioContext.current.currentTime;

      const mainGainNode = audioContext.current.createGain();
      mainGainNode.gain.setValueAtTime(0.4, now);

      const ranks = [
        { frequency: frequency, type: 'sine', gain: 0.5 },
        { frequency: frequency * 2, type: 'sine', gain: 0.4 },
        { frequency: frequency * 4, type: 'sine', gain: 0.25 },
        { frequency: frequency * 3, type: 'square', gain: 0.1 },
        { frequency: frequency * 0.5, type: 'sine', gain: 0.35 },
      ];
      const oscillators = ranks.map((rank) => {
        if (!audioContext.current) return null;

        const oscillator = audioContext.current.createOscillator();
        const gainNode = audioContext.current.createGain();

        oscillator.type = rank.type as OscillatorType;
        oscillator.frequency.setValueAtTime(rank.frequency, now);

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(rank.gain, now + attack);
        gainNode.gain.exponentialRampToValueAtTime(Math.max(0.001, rank.gain * sustain), now + attack + decay);

        oscillator.connect(gainNode);
        gainNode.connect(mainGainNode);
        oscillator.start(now);

        return { oscillator, gainNode };
      });

      const reverbNetwork = basicPianoConfig.reverbNetwork.map(({ delay, gain }) => {
        const delayNode = audioContext.current?.createDelay();
        const gainNode = audioContext.current?.createGain();

        delayNode?.delayTime.setValueAtTime(delay, now);
        gainNode?.gain.setValueAtTime(gain, now);

        mainGainNode.connect(delayNode!);
        delayNode?.connect(gainNode!);
        gainNode?.connect(audioContext.current!.destination);

        return { delayNode, gainNode };
      });

      mainGainNode.connect(audioContext.current.destination);

      return { oscillators, mainGainNode, reverbNetwork };
    } catch (error) {
      setDebug('Error creating note: ' + error);
      return null;
    }
  };

  const startNote = async (frequency: number) => {
    try {
      if (frequency === 0) return;

      const noteId = `freq_${frequency}`;
      const nodes = createOrganNote(frequency);
      if (nodes) {
        (oscillators.current as Record<string, any>)[noteId] = nodes;
        setActiveNotes((prev) => new Set([...prev, noteId]));
      }
    } catch (error) {
      setDebug('Error starting note: ' + error);
    }
  };

  const stopNote = (frequency: number) => {
    try {
      if (frequency === 0) return;
      const noteId = `freq_${frequency}`;
      const oscillatorNode = (oscillators.current as Record<string, any>)[noteId];
      if (oscillatorNode) {
        const { oscillators: oscs, mainGainNode, reverbNetwork } = oscillatorNode;
        if (!audioContext.current) return;
        const now = audioContext.current.currentTime;

        oscs.forEach(({ oscillator, gainNode }: { oscillator: OscillatorNode; gainNode: GainNode }) => {
          const currentGain = gainNode.gain.value;
          gainNode.gain.setValueAtTime(currentGain, now);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + release);
          oscillator.stop(now + release + 0.1);
        });

        mainGainNode.gain.setValueAtTime(mainGainNode.gain.value, now);
        mainGainNode.gain.linearRampToValueAtTime(0, now + release + 0.1);

        if (reverbNetwork) {
          reverbNetwork.forEach(({ gainNode }: { gainNode: GainNode }) => {
            gainNode.gain.setValueAtTime(gainNode.gain.value, now);
            gainNode.gain.linearRampToValueAtTime(0, now + release + 0.2);
          });
        }

        delete (oscillators.current as Record<string, any>)[noteId];
        setActiveNotes((prev) => {
          const next = new Set(prev);
          next.delete(noteId);
          return next;
        });
      }
    } catch (error) {
      setDebug('Error stopping note: ' + error);
    }
  };

  const playSequence = async () => {
    await initAudioContext();
    stopAllSounds();
    setIsPlaying({ status: true, song: 'scale' });
    keys.forEach((note, index) => {
      const startTimeoutId = setTimeout(() => {
        startNote(note.frequency);
        const stopTimeoutId = setTimeout(() => {
          stopNote(note.frequency);
          if (index === keys.length - 1) {
            setIsPlaying({ status: false, song: '' });
          }
        }, 500);
        timeoutIds.current.push(stopTimeoutId as never);
      }, index * 700);
      timeoutIds.current.push(startTimeoutId as never);
    });
  };

  const playMaryLamb = async () => {
    await initAudioContext();
    stopAllSounds();
    setIsPlaying({ status: true, song: 'mary-lamb' });
    const melody = basicPianoConfig.maryLambMelody;

    const ratio = getRatio();
    let currentTime = 0;

    melody.forEach(([noteIndex, duration], index) => {
      const frequency = baseFrequency * Math.pow(ratio, noteIndex);

      const startTimeoutId = setTimeout(() => {
        startNote(frequency);
        const stopTimeoutId = setTimeout(() => {
          stopNote(frequency);
          if (index === melody.length - 1) {
            setIsPlaying({ status: false, song: '' });
          }
        }, duration * 0.85);
        timeoutIds.current.push(stopTimeoutId as never);
      }, currentTime);
      timeoutIds.current.push(startTimeoutId as never);

      currentTime += duration;
    });
  };

  const playTwinkleStar = async () => {
    await initAudioContext();
    stopAllSounds();
    setIsPlaying({ status: true, song: 'twinkle-star' });
    const melody = basicPianoConfig.twinkleStarMelody;

    const ratio = getRatio();
    let currentTime = 0;

    melody.forEach(([noteIndex, duration], index) => {
      const frequency = baseFrequency * Math.pow(ratio, noteIndex);

      const startTimeoutId = setTimeout(() => {
        startNote(frequency);
        const stopTimeoutId = setTimeout(() => {
          stopNote(frequency);
          if (index === melody.length - 1) {
            setIsPlaying({ status: false, song: '' });
          }
        }, duration * 0.85);
        timeoutIds.current.push(stopTimeoutId as never);
      }, currentTime);
      timeoutIds.current.push(startTimeoutId as never);

      currentTime += duration;
    });
  };

  const stopAllSounds = () => {
    timeoutIds.current.forEach((id) => clearTimeout(id));
    timeoutIds.current = [];
    Object.keys(oscillators.current).forEach((key) => {
      const frequency = parseFloat(key.split('_')[1]);
      stopNote(frequency);
    });
    setIsPlaying({ status: false, song: '' });
  };

  const PianoKey = ({ note, frequency }: { note: number; frequency: number }) => {
    const [isPressed, setIsPressed] = useState(false);
    const noteId = `freq_${frequency}`;
    const isActive = activeNotes.has(noteId);

    const handleStart = async (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      await initAudioContext();
      setIsPressed(true);
      startNote(frequency);
    };

    const handleEnd = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      setIsPressed(false);
      stopAllSounds();
    };

    const handleKey = (e: any, isKeyDown: boolean) => {
      e.preventDefault();
      e.stopPropagation();
      if (isKeyDown) {
        handleStart(e);
      } else {
        handleEnd(e);
      }
    };

    const isWhiteKey = [0, 2, 4, 5, 7, 9, 11, 12].includes(note % 12);

    return (
      <button
        className={keysClassName(isPressed, isActive, keysBaseColor(isWhiteKey), keysActiveColor(isWhiteKey))}
        onClick={(e) => {
          handleKey(e, true);
          setTimeout(() => {
            stopAllSounds();
          }, 100);
        }}
        tabIndex={0}
        aria-live="off"
        aria-label={`${t('scenes.S11.S11_D0_F77_C9.interactive_data.button_to_play_note')} ${note} ${t('scenes.S11.S11_D0_F77_C9.interactive_data.with_frequency')}: ${frequency}`}
      >
        <div className="w-full flex-grow"></div>
      </button>
    );
  };

  const buttonClassName = {
    active: 'bg-[#006be0] hover:bg-[# ] text-white',
    inactive: 'bg-white border border-[#006be0] hover:bg-[#dbeafe] text-[#006be0]',
  };

  useEffect(() => {
    if (payload && typeof payload === 'object') {
      if (
        'checkForPlayScale' in payload &&
        typeof payload.checkForPlayScale === 'boolean' &&
        payload.checkForPlayScale &&
        isPlaying.status &&
        isPlaying.song === 'scale'
      ) {
        onInteraction({
          'is-playing-scale': true,
        });
      }

      if (
        'checkForPlayTwinkle' in payload &&
        typeof payload.checkForPlayTwinkle === 'boolean' &&
        payload.checkForPlayTwinkle &&
        isPlaying.status &&
        isPlaying.song === 'twinkle-star'
      ) {
        onInteraction({
          'is-playing-twinkle': true,
        });
      }
    }
  }, [payload, isPlaying]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <div className="flex overflow-x-auto md:overflow-x-hidden mb-2">
          {keys.map((key, index) => (
            <div
              key={`note-name-${index}`}
              className="text-xs font-bold text-center w-full"
              style={{ width: `${100 / keys.length}%` }}
            >
              {key.name}
            </div>
          ))}
        </div>
        <div className="flex shadow-md overflow-x-auto md:overflow-x-hidden h-40">
          {keys.map((key, index) => (
            <div key={`key-${index}`} className="border flex-shrink-0" style={{ width: `${100 / keys.length}%` }}>
              <PianoKey note={key.note} frequency={key.frequency} />
            </div>
          ))}
        </div>
        <div className="flex overflow-x-auto md:overflow-x-hidden mt-2">
          {keys.map((key, index) => (
            <div
              key={`note-frequency-${index}`}
              className="text-xs font-bold text-center w-full"
              style={{ width: `${100 / keys.length}%` }}
            >
              {Math.round(key.frequency)} Hz
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 justify-between mb-6 mt-8">
        <Button
          className={`${buttonClassName[isPlaying.status && isPlaying.song === 'scale' ? 'active' : 'inactive']} px-2 py-2 rounded flex-1 text-sm font-bold`}
          onClick={playSequence}
          disabled={isPlaying.status && isPlaying.song != 'scale'}
        >
          {t('scenes.S11.S11_D0_F77_C9.interactive_data.place_scale')}
        </Button>
        <Button
          className={`${buttonClassName[isPlaying.status && isPlaying.song === 'mary-lamb' ? 'active' : 'inactive']} px-2 py-2 rounded flex-1 text-sm font-bold`}
          onClick={playMaryLamb}
          disabled={isPlaying.status && isPlaying.song != 'mary-lamb'}
        >
          {t('scenes.S11.S11_D0_F77_C9.interactive_data.mary_lamb')}
        </Button>
        <Button
          className={`${buttonClassName[isPlaying.status && isPlaying.song === 'twinkle-star' ? 'active' : 'inactive']} px-2 py-2 rounded flex-1 text-sm font-bold`}
          onClick={playTwinkleStar}
          disabled={isPlaying.status && isPlaying.song != 'twinkle-star'}
        >
          {t('scenes.S11.S11_D0_F77_C9.interactive_data.twinkle')}
        </Button>
        <Button
          className="bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded text-sm font-bold w-16"
          onClick={stopAllSounds}
        >
          {t('scenes.S11.S11_D0_F77_C9.interactive_data.stop')}
        </Button>
      </div>
    </div>
  );
};

export default SimpleSynthesizer;
