import React, { useState, useRef, useEffect, useContext } from 'react';
import interaction from '../configs/interactive-1';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';
import { GameContext } from '../../../contexts/GameContext';

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

// Audio Context setup
const createAudioContext = (): AudioContext => {
  return new (window.AudioContext || window.webkitAudioContext)();
};

interface MusicalIntervalVisualizationProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

interface ButtonProps {
  className?: string;
  onClick: () => void;
  variant?: 'default' | 'outline';
  children: React.ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({ className, onClick, children, disabled, ariaLabel }) => {
  const baseClasses = 'px-6 py-3 rounded-md w-64';
  return (
    <button
      className={`${baseClasses} ${className || ''} ${disabled ? 'disabled:bg-[#757575] disabled:cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {children}
    </button>
  );
};

// Types for oscillator nodes
interface OscillatorNodeWrapper {
  oscillator: globalThis.OscillatorNode;
  gainNode: GainNode;
}

interface ReverbNode {
  delayNode: DelayNode;
  gainNode: GainNode;
}

interface OrganNote {
  oscillators: OscillatorNodeWrapper[];
  mainGainNode: GainNode;
  reverbNetwork: ReverbNode[];
}

interface PianoKeyProps {
  frequency: number;
  note: string;
  ariaLabel: string;
}

interface Interactive1State {
  octaveMode: boolean;
}

const MusicalIntervalVisualization: React.FC<MusicalIntervalVisualizationProps> = ({ onInteraction }) => {
  const { t } = useTranslations();
  const audioContext = useRef<AudioContext | null>(null);
  const oscillators = useRef<Record<string, OrganNote>>({});
  const statusRef = useRef<HTMLDivElement>(null);
  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};
  const savedState =
    interactiveResponses?.octaves_and_fifths && typeof interactiveResponses?.octaves_and_fifths === 'object'
      ? (interactiveResponses?.octaves_and_fifths as unknown as Interactive1State)
      : undefined;
  const { payload } = useEventListener('interactive-1');

  // Reduced ADSR envelope settings
  const attack = 0.05; // Faster attack
  const decay = 0.2; // Shorter decay
  const sustain = 0.7; // Lower sustain level
  const release = 0.6; // Shorter release

  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [octaveMode, setOctaveMode] = useState<boolean>(savedState?.octaveMode ?? true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const initAudioContext = () => {
    if (!audioContext.current) {
      try {
        audioContext.current = createAudioContext();
        setStatusMessage('Audio context created successfully');
      } catch (error) {
        setStatusMessage('Error creating audio context: ' + (error as Error).message);
      }
    }
  };

  const createOrganNote = (frequency: number): OrganNote | null => {
    try {
      if (!audioContext.current) {
        setStatusMessage('No audio context available');
        return null;
      }

      const now = audioContext.current.currentTime;

      // Create main mixing node
      const mainGainNode = audioContext.current.createGain();
      mainGainNode.gain.setValueAtTime(0.4, now);

      // Create ranks (different pipe sounds)
      const ranks = [
        // Principal 8' (fundamental)
        { frequency: frequency, type: 'sine', gain: 0.5 },
        // Octave 4' (one octave up)
        { frequency: frequency * 2, type: 'sine', gain: 0.4 },
        // Fifteenth 2' (two octaves up)
        { frequency: frequency * 4, type: 'sine', gain: 0.25 },
        // Mixture I (harmonics)
        { frequency: frequency * 3, type: 'square', gain: 0.1 },
        { frequency: frequency * 5, type: 'square', gain: 0.1 },
        // Sub Bass 16' (one octave down)
        { frequency: frequency * 0.5, type: 'sine', gain: 0.35 },
        // Mixture II (additional harmonics)
        { frequency: frequency * 6, type: 'square', gain: 0.08 },
        { frequency: frequency * 8, type: 'square', gain: 0.06 },
      ];

      const oscillators = ranks.map((rank) => {
        const oscillator = audioContext.current!.createOscillator();
        const gainNode = audioContext.current!.createGain();

        oscillator.type = rank.type as OscillatorType;
        oscillator.frequency.setValueAtTime(rank.frequency, now);

        // ADSR envelope with reduced sustain
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(rank.gain, now + attack);
        gainNode.gain.exponentialRampToValueAtTime(Math.max(0.001, rank.gain * sustain), now + attack + decay);

        oscillator.connect(gainNode);
        gainNode.connect(mainGainNode);
        oscillator.start(now);

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
        const delayNode = audioContext.current!.createDelay();
        const gainNode = audioContext.current!.createGain();

        delayNode.delayTime.setValueAtTime(delay, now);
        gainNode.gain.setValueAtTime(gain, now);

        mainGainNode.connect(delayNode);
        delayNode.connect(gainNode);
        gainNode.connect(audioContext.current!.destination);

        return { delayNode, gainNode };
      });

      // Direct sound
      mainGainNode.connect(audioContext.current.destination);

      setStatusMessage('Created organ sound at frequency: ' + frequency + ' Hz');
      return { oscillators, mainGainNode, reverbNetwork };
    } catch (error) {
      setStatusMessage('Error creating note: ' + (error as Error).message);
      return null;
    }
  };

  const startNote = (frequency: number, noteName: string) => {
    try {
      initAudioContext();
      const noteId = `freq_${frequency}`;
      const nodes = createOrganNote(frequency);
      if (nodes) {
        oscillators.current[noteId] = nodes;
        setActiveNotes((prev) => new Set([...prev, noteId]));
        setStatusMessage(`Playing note ${noteName} at ${frequency} Hz`);
      }
    } catch (error) {
      setStatusMessage('Error starting note: ' + (error as Error).message);
    }
  };

  const stopNote = (frequency: number, noteName: string) => {
    try {
      const noteId = `freq_${frequency}`;
      if (oscillators.current[noteId]) {
        const { oscillators: oscs, mainGainNode, reverbNetwork } = oscillators.current[noteId];
        const now = audioContext.current!.currentTime;

        // Quicker release for all oscillators
        oscs.forEach(({ oscillator, gainNode }) => {
          const currentGain = gainNode.gain.value;
          gainNode.gain.setValueAtTime(currentGain, now);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + release);
          oscillator.stop(now + release + 0.1);
        });

        // Gradual release for reverb
        mainGainNode.gain.setValueAtTime(mainGainNode.gain.value, now);
        mainGainNode.gain.linearRampToValueAtTime(0, now + release + 0.1);

        if (reverbNetwork) {
          reverbNetwork.forEach(({ gainNode }) => {
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
        setStatusMessage(`Stopped note ${noteName} at ${frequency} Hz`);
      }
    } catch (error) {
      setStatusMessage('Error stopping note: ' + (error as Error).message);
    }
  };

  const playSequence = async () => {
    setIsPlaying(true);
    // Stop any currently playing notes
    Object.keys(oscillators.current).forEach((key) => {
      const frequency = parseInt(key.split('_')[1]);
      stopNote(
        frequency,
        frequency === 440
          ? t(interaction.noteA)
          : frequency === 660
            ? t(interaction.noteE)
            : t(interaction.noteAPrime),
      );
    });

    setStatusMessage(octaveMode ? t(interaction.playingOctaveSequence) : t(interaction.playingFifthSequence));

    // Determine which sequence to play based on mode
    if (octaveMode) {
      onInteraction({ 'interactive-1-playsequence-completed': true });
      setTimeout(() => {
        startNote(440, t(interaction.noteA));
        setStatusMessage(t(interaction.playingNoteA));
        setTimeout(() => stopNote(440, t(interaction.noteA)), 1000);
      }, 0);

      setTimeout(() => {
        startNote(880, t(interaction.noteAPrime));
        setStatusMessage(t(interaction.playingNoteAPrime));
        setTimeout(() => stopNote(880, t(interaction.noteAPrime)), 1000);
      }, 1500);

      setTimeout(() => {
        startNote(440, t(interaction.noteA));
        startNote(880, t(interaction.noteAPrime));
        setStatusMessage(t(interaction.playingBothOctave));
        setTimeout(() => {
          stopNote(440, t(interaction.noteA));
          stopNote(880, t(interaction.noteAPrime));
          setIsPlaying(false);
          setStatusMessage(t(interaction.sequenceComplete));
        }, 1500);
      }, 3000);
    } else {
      // Fifth sequence: A, then E, then both together
      setTimeout(() => {
        startNote(440, t(interaction.noteA));
        setStatusMessage(t(interaction.playingNoteA));
        setTimeout(() => stopNote(440, t(interaction.noteA)), 1000);
      }, 0);

      setTimeout(() => {
        startNote(660, t(interaction.noteE));
        setStatusMessage(t(interaction.playingNoteE));
        setTimeout(() => stopNote(660, t(interaction.noteE)), 1000);
      }, 1500);

      setTimeout(() => {
        startNote(440, t(interaction.noteA));
        startNote(660, t(interaction.noteE));
        setStatusMessage(t(interaction.playingBothFifth));
        setTimeout(() => {
          stopNote(440, t(interaction.noteA));
          stopNote(660, t(interaction.noteE));
          setIsPlaying(false);
          setStatusMessage(t(interaction.sequenceComplete));
        }, 1500);
      }, 3000);
    }
  };

  const PianoKey: React.FC<PianoKeyProps> = ({ frequency, note, ariaLabel }) => {
    const [isPressed, setIsPressed] = useState<boolean>(false);
    const noteId = `freq_${frequency}`;
    const isActive = activeNotes.has(noteId);
    const isPlayingRef = useRef<boolean>(false);

    const handleMouseDown = () => {
      setIsPressed(true);
      startNote(frequency, note);
    };

    const handleMouseUp = () => {
      setIsPressed(false);
      stopNote(frequency, note);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      e.preventDefault();
      setIsPressed(true);
      startNote(frequency, note);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
      e.preventDefault();
      setIsPressed(false);
      stopNote(frequency, note);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !isPlayingRef.current) {
        e.preventDefault();
        isPlayingRef.current = true;
        setIsPressed(true);
        startNote(frequency, note);
        setTimeout(() => {
          setIsPressed(false);
          stopNote(frequency, note);
          isPlayingRef.current = false;
        }, 300);
      }
    };

    const handleKeyUp = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
      }
    };

    return (
      <button
        type="button"
        className={`border-2 rounded-md shadow-md w-28 h-36 flex flex-col items-center justify-center cursor-pointer
        ${isPressed || isActive ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        tabIndex={0}
        aria-label={ariaLabel}
        aria-pressed={isPressed || isActive}
        // Add role to ensure proper button semantics
        role="button"
      >
        <div className="text-lg font-bold" aria-hidden="true">
          {frequency} Hz
        </div>
        <div className="text-3xl font-bold mt-2" aria-hidden="true">
          {note}
        </div>
      </button>
    );
  };

  const PlaySymbol = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-play-icon lucide-play"
      >
        <polygon points="6 3 20 12 6 21 6 3" />
      </svg>
    );
  };

  const PauseSymbol = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-pause-icon lucide-pause"
      >
        <rect x="14" y="4" width="4" height="16" rx="1" />
        <rect x="6" y="4" width="4" height="16" rx="1" />
      </svg>
    );
  };

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      if (payload.step === 1) {
        setOctaveMode(true);
      }
      if (payload.step === 1 && octaveMode && isPlaying) {
        onInteraction({
          'interactive-1-playsequence-completed': true,
        });
      } else if (payload.step === 2) {
        setOctaveMode(false);
      } else if (payload.step === 3 && !octaveMode && isPlaying) {
        onInteraction({
          'interactive-1-perfectfifth-completed': true,
        });
      }
    }
  }, [payload, octaveMode, isPlaying]);

  useEffect(() => {
    if (!setInteractiveResponses) return;

    const currentState: Interactive1State = { octaveMode };
    setInteractiveResponses((prev: any) => ({
      ...prev,
      octaves_and_fifths: currentState,
    }));
  }, [octaveMode, setInteractiveResponses]);

  return (
    <div className="max-w-3xl mx-auto mb-5">
      <div className="flex flex-col items-center gap-8">
        {/* Visually hidden live region for screen readers */}
        <div className="sr-only" aria-live="polite" ref={statusRef}>
          {statusMessage}
        </div>

        {/* Piano keys at the top */}
        <div className="flex gap-4 mb-4" aria-live="off" role="group" aria-label={t(interaction.pianoKeysLabel)}>
          <PianoKey frequency={440} note={t(interaction.noteA)} ariaLabel={t(interaction.playNoteA)} />
          <PianoKey frequency={660} note={t(interaction.noteE)} ariaLabel={t(interaction.playNoteE)} />
          <PianoKey frequency={880} note={t(interaction.noteAPrime)} ariaLabel={t(interaction.playNoteAPrime)} />
        </div>

        {/* Musical intervals visualization */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center" id="intervals-heading">
            {t(interaction.musicalInterval)}
          </h2>

          {/* Horizontal line with note markers - with added red circle dots */}
          <div
            className="relative w-full h-20"
            role="figure"
            aria-labelledby="intervals-heading"
            aria-describedby="intervals-description"
          >
            <div className="absolute w-full h-1 bg-gray-800 top-8"></div>

            {/* A marker */}
            <div className="absolute left-0 -mt-1">
              <div
                className={`h-8 w-2 ${
                  activeNotes.has('freq_440') ? 'bg-red-500' : 'bg-gray-800'
                } mx-auto transition-colors duration-100`}
                aria-hidden="true"
              ></div>
              <div className="text-xl font-bold mt-2">440 Hz</div>
              {/* Red dot for A */}
              {activeNotes.has('freq_440') && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-5" aria-hidden="true">
                  <div className="h-6 w-6 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>

            {/* E marker */}
            <div className="absolute left-1/2 -translate-x-1/2 -mt-1">
              <div
                className={`h-8 w-2 ${
                  activeNotes.has('freq_660') ? 'bg-red-500' : 'bg-gray-800'
                } mx-auto transition-colors duration-100`}
                aria-hidden="true"
              ></div>
              <div className="text-xl font-bold mt-2">660 Hz</div>
              {/* Red dot for E */}
              {activeNotes.has('freq_660') && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-5" aria-hidden="true">
                  <div className="h-6 w-6 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>

            {/* A' marker */}
            <div className="absolute right-0 -mt-1">
              <div
                className={`h-8 w-2 ${
                  activeNotes.has('freq_880') ? 'bg-red-500' : 'bg-gray-800'
                } mx-auto transition-colors duration-100`}
                aria-hidden="true"
              ></div>
              <div className="text-xl font-bold mt-2">880 Hz</div>
              {/* Red dot for A' */}
              {activeNotes.has('freq_880') && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-5" aria-hidden="true">
                  <div className="h-6 w-6 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          </div>

          {/* Hidden description for screen readers */}
          <div id="intervals-description" className="sr-only">
            {t(interaction.visualizationDescription).replace(
              '{0}',
              octaveMode
                ? `${t(interaction.noteE)} at 660 ${t(interaction.hertz)}`
                : `${t(interaction.noteE)} at 660 ${t(interaction.hertz)}`,
            )}
          </div>
        </div>

        {/* Buttons at the bottom */}
        <div className="flex flex-col gap-2 items-center">
          <div className="flex justify-center items-center">
            <Button
              className="bg-[#006be0] hover:bg-[#006be0] text-white px-6 py-3 rounded-md w-64"
              onClick={playSequence}
              disabled={isPlaying}
              ariaLabel={`${t(interaction.playText)} ${octaveMode ? `${t(interaction.octaveModeText)}` : `${t(interaction.perfectFifthModeText)}`} sequence`}
            >
              <div className="flex items-center gap-2 justify-center">
                {isPlaying ? <PauseSymbol /> : <PlaySymbol />} {t(interaction.playSequence)}
              </div>
            </Button>
          </div>
          <p className="text-center text-2xl mt-4">
            {octaveMode
              ? `${t(interaction.octaveModeText)} (2:1)`
              : `${t(interaction.perfectFifthModeText)} (3:2)`}
          </p>

          {/* Mode info with ratio calculation - Controlled announcements */}
          <div className="text-center" aria-hidden="true">
            <div className="mt-4 text-gray-700 flex items-center justify-center gap-4">
              {octaveMode ? (
                <>
                  <div className="flex flex-col items-center border border-gray-300 rounded-lg p-2">
                    <div className="text-xl font-semibold">880</div>
                    <div className="w-16 h-px bg-black my-1"></div>
                    <div className="text-xl font-semibold">440</div>
                  </div>
                  <div className="text-xl font-semibold">=</div>
                  <div className="flex flex-col items-center bg-amber-500 text-gray-800 rounded-lg p-2">
                    <div className="text-xl font-semibold">2</div>
                    <div className="w-16 h-px bg-gray-800 my-1"></div>
                    <div className="text-xl font-semibold">1</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center border border-gray-300 rounded-lg p-2">
                    <div className="text-xl font-semibold">660</div>
                    <div className="w-16 h-px bg-black my-1"></div>
                    <div className="text-xl font-semibold">440</div>
                  </div>
                  <div className="text-xl font-semibold">=</div>
                  <div className="flex flex-col items-center bg-amber-500 text-gray-800 rounded-lg p-2">
                    <div className="text-xl font-semibold">3</div>
                    <div className="w-16 h-px bg-gray-800 my-1"></div>
                    <div className="text-xl font-semibold">2</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicalIntervalVisualization;
