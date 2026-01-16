import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as Tone from 'tone';
import '../../../shared/slider.css';
import './the-virtual-monochord.css';
import { TheVirtualMonochordProps, Tuning } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';

const TUNINGS: Tuning[] = [
  { name: 'Fifth Octave', ratio: 1 / 5, display: '5 : 1', ariaLabel: 'fiveToOne' },
  { name: 'Fourth Octave', ratio: 1 / 4, display: '4 : 1', ariaLabel: 'fourToOne' },
  { name: 'Triple Octave', ratio: 1 / 3, display: '3 : 1', ariaLabel: 'threeToOne' },
  { name: 'Octave', ratio: 1 / 2, display: '2 : 1', ariaLabel: 'twoToOne' },
  { name: 'Ratio √5', ratio: 1 / Math.sqrt(5), display: '√5 : 1', ariaLabel: 'rootFiveToOne' },
  { name: 'Fifth', ratio: 2 / 3, display: '3 : 2', ariaLabel: 'threeToTwo' },
  { name: 'Ratio √3', ratio: 1 / Math.sqrt(3), display: '√3 : 1', ariaLabel: 'rootThreeToOne' },
  { name: 'Fourth', ratio: 3 / 4, display: '4 : 3', ariaLabel: 'fourToThree' },
  { name: 'Septimal Minor Third', ratio: 6 / 7, display: '7 : 6', ariaLabel: 'sevenToSix' },
  { name: 'Major Third', ratio: 4 / 5, display: '5 : 4', ariaLabel: 'fiveToFour' },
  { name: 'Minor Third', ratio: 5 / 6, display: '6 : 5', ariaLabel: 'sixToFive' },
  { name: 'Tritone (√2)', ratio: 1 / Math.sqrt(2), display: '√2 : 1', ariaLabel: 'rootTwoToOne' },
].sort((a, b) => b.ratio - a.ratio);

const TheVirtualMonochord: React.FC<TheVirtualMonochordProps> = ({ interaction }) => {
  // State
  const baseFrequency = 220; // Fixed base frequency
  const [dividedFrequency, setDividedFrequency] = useState(440);
  const [vibratingFundamental, setVibratingFundamental] = useState(false);
  const [vibratingDivided, setVibratingDivided] = useState(false);
  const [selectedProportion, setSelectedProportion] = useState<Tuning | null>(
    TUNINGS.find((tuning) => tuning.display === '2 : 1') || null,
  );

  const { translations } = interaction;
  const { t } = useTranslations();

  // Refs
  const oscARef = useRef<Tone.Oscillator | null>(null);
  const oscBRef = useRef<Tone.Oscillator | null>(null);
  const envARef = useRef<Tone.AmplitudeEnvelope | null>(null);
  const envBRef = useRef<Tone.AmplitudeEnvelope | null>(null);
  const initializedRef = useRef(false);

  // Constants
  const DIVIDED_FREQ_MIN = 100;
  const DIVIDED_FREQ_MAX = 1100;
  const TONE_TYPE = 'sawtooth4';

  // Initialize audio setup - initial setup only, audio will be properly started on user interaction
  useEffect(() => {
    // Don't auto-initialize audio due to browser autoplay policies
    // Audio will be initialized on first user interaction via startAudio()

    // Cleanup function for when component unmounts
    return () => {
      if (oscARef.current) {
        oscARef.current.dispose();
      }
      if (oscBRef.current) {
        oscBRef.current.dispose();
      }
      if (envARef.current) {
        envARef.current.dispose();
      }
      if (envBRef.current) {
        envBRef.current.dispose();
      }
    };
  }, []);

  // Play a single note
  const playNote = useCallback(
    (
      osc: Tone.Oscillator,
      env: Tone.AmplitudeEnvelope,
      freq: number,
      setVibrating: (vibrating: boolean) => void,
    ) => {
      try {
        // Ensure the oscillator is properly connected and started
        if (osc.state !== 'started') {
          console.log('Restarting oscillator...');
          osc.start();
        }

        osc.frequency.setValueAtTime(freq, Tone.now());
        env.triggerAttackRelease('1.5s', Tone.now());

        // Visual vibration
        setVibrating(true);
        setTimeout(() => setVibrating(false), 500);
      } catch (error) {
        console.error('Error playing note:', error);
        // Try to recover by restarting the audio system
        initializedRef.current = false;
      }
    },
    [],
  );

  // Start audio context - improved version
  const startAudio = useCallback(async () => {
    try {
      // Always try to start Tone.js, even if we think it's already started
      if (Tone.context.state === 'suspended') {
        await Tone.start();
      }

      // Ensure our oscillators are properly initialized and started
      if (!initializedRef.current || !oscARef.current || !oscBRef.current) {
        console.log('Re-initializing audio components...');

        // Clean up existing components if they exist
        if (oscARef.current) oscARef.current.dispose();
        if (oscBRef.current) oscBRef.current.dispose();
        if (envARef.current) envARef.current.dispose();
        if (envBRef.current) envBRef.current.dispose();

        // Create new envelopes
        const envA = new Tone.AmplitudeEnvelope({
          attack: 0.1,
          decay: 0.2,
          sustain: 1.0,
          release: 1.5,
        }).toDestination();

        const envB = new Tone.AmplitudeEnvelope({
          attack: 0.1,
          decay: 0.2,
          sustain: 1.0,
          release: 1.5,
        }).toDestination();

        // Create new oscillators
        const oscA = new Tone.Oscillator(baseFrequency, TONE_TYPE).connect(envA);
        const oscB = new Tone.Oscillator(dividedFrequency, TONE_TYPE).connect(envB);

        // Store refs
        oscARef.current = oscA;
        oscBRef.current = oscB;
        envARef.current = envA;
        envBRef.current = envB;

        // Start oscillators
        oscA.start();
        oscB.start();

        initializedRef.current = true;
      }

      console.log('Audio context state:', Tone.context.state);
    } catch (error) {
      console.error('Error starting audio:', error);
    }
  }, [baseFrequency, dividedFrequency]);

  // Handle play frequencies button - play both frequencies once
  const togglePlayPause = useCallback(async () => {
    await startAudio();

    // Play both frequencies once with staggered timing
    if (oscARef.current && envARef.current) {
      playNote(oscARef.current, envARef.current, baseFrequency, setVibratingFundamental);
    }

    if (oscBRef.current && envBRef.current) {
      setTimeout(() => {
        playNote(oscBRef.current!, envBRef.current!, dividedFrequency, setVibratingDivided);
      }, 50);
    }
  }, [startAudio, baseFrequency, dividedFrequency, playNote]);

  // Handle fundamental string click
  const handleFundamentalClick = useCallback(async () => {
    await startAudio();
    if (oscARef.current && envARef.current) {
      playNote(oscARef.current, envARef.current, baseFrequency, setVibratingFundamental);
    }
  }, [startAudio, baseFrequency, playNote]);

  // Handle divided string click
  const handleDividedClick = useCallback(async () => {
    await startAudio();
    if (oscBRef.current && envBRef.current) {
      playNote(oscBRef.current, envBRef.current, dividedFrequency, setVibratingDivided);
    }
  }, [startAudio, dividedFrequency, playNote]);

  // Handle proportion button click
  const handleProportionClick = useCallback(
    async (tuning: Tuning) => {
      await startAudio();

      const newDividedFrequency = baseFrequency / tuning.ratio;
      setDividedFrequency(newDividedFrequency);
      setSelectedProportion(tuning);

      // Update oscillator frequency
      if (oscBRef.current) {
        oscBRef.current.frequency.rampTo(newDividedFrequency, 0.1);
      }

      // Play both notes
      if (oscARef.current && envARef.current) {
        playNote(oscARef.current, envARef.current, baseFrequency, setVibratingFundamental);
      }

      if (oscBRef.current && envBRef.current) {
        setTimeout(() => {
          playNote(oscBRef.current!, envBRef.current!, newDividedFrequency, setVibratingDivided);
        }, 50);
      }
    },
    [startAudio, baseFrequency, playNote],
  );

  // Check if current frequency ratio matches any predefined proportion
  const checkProportionMatch = useCallback(() => {
    const currentRatio = baseFrequency / dividedFrequency;

    const matchingTuning = TUNINGS.find((tuning) => tuning.ratio === currentRatio);

    setSelectedProportion(matchingTuning || null);
  }, [baseFrequency, dividedFrequency]);

  // Debounced effect for checking proportion matches
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkProportionMatch();
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [baseFrequency, dividedFrequency, checkProportionMatch]);

  // Handle divided frequency slider change
  const handleDividedFreqChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFreq = parseFloat(e.target.value);
      setDividedFrequency(newFreq);

      // Ensure audio is started
      await startAudio();

      if (oscBRef.current) {
        try {
          oscBRef.current.frequency.rampTo(newFreq, 0.1);
        } catch (error) {
          console.error('Error updating divided frequency:', error);
        }
      }
    },
    [startAudio],
  );

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    const baseFrequencySlider = document.getElementById(`slider-baseFrequency`) as HTMLInputElement;
    const dividedFrequencySlider = document.getElementById(`slider-dividedFrequency`) as HTMLInputElement;
    if (baseFrequencySlider) {
      updateSliderBackground(baseFrequencySlider);
    }
    if (dividedFrequencySlider) {
      updateSliderBackground(dividedFrequencySlider);
    }
  }, [baseFrequency, dividedFrequency, updateSliderBackground]);

  return (
    <div className="w-full flex flex-col gap-6 text-lg">
      {/* Frequency Sliders */}
      <div className="w-full lg:flex-row">
        <div className="w-full mb-2">
          <label className="block font-bold">
            {t(translations.baseFrequencyLabel)}{' '}
            <span className="text-yellow-600 font-besley">{baseFrequency.toFixed(0)} Hz</span>
          </label>
        </div>
        <div className="w-full slider-first">
          <label className="block font-bold">
            {t(translations.dividedFrequencyLabel)}{' '}
            <span className="text-slate-600 font-besley">{dividedFrequency.toFixed(0)} Hz</span>
          </label>
          <div className="relative">
            <input
              type="range"
              id="slider-dividedFrequency"
              min={DIVIDED_FREQ_MIN}
              max={DIVIDED_FREQ_MAX}
              value={dividedFrequency}
              onChange={handleDividedFreqChange}
              className="global-slider w-full"
              aria-valuetext={`${t(translations.dividedFrequencyLabel)} ${dividedFrequency.toFixed(0)} Hz`}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full gap-6 flex-col xl:flex-row xl:items-start">
        {/* Left Column: String Visualizations */}
        <div className="w-60 lg:mx-auto xl:mx-0" role="region" aria-labelledby="strings-section">
          <h3 id="strings-section" className="sr-only">
            {t(translations.virtualMonochordStrings)}
          </h3>

          {/* Monochord Soundboard */}
          <div className="relative bg-gradient-to-b from-amber-800 to-amber-900 rounded-lg p-8 shadow-lg border-2 border-amber-700">
            {/* Wood grain texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-700/20 to-transparent opacity-30 rounded-lg"></div>

            {/* Fixed Bridge (top) */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-stone-600 rounded-sm shadow-md"></div>

            {/* String Tuning Pegs */}
            <div className="absolute top-2 left-4 w-3 h-3 bg-stone-700 rounded-full shadow-inner"></div>
            <div className="absolute top-2 right-4 w-3 h-3 bg-stone-700 rounded-full shadow-inner"></div>

            {/* String Anchors (bottom) */}
            <div className="absolute bottom-2 left-4 w-3 h-3 bg-stone-700 rounded-full shadow-inner"></div>
            <div className="absolute bottom-2 right-4 w-3 h-3 bg-stone-700 rounded-full shadow-inner"></div>

            {/* Strings Container */}
            <div className="relative flex justify-center items-center gap-16 h-80">
              {/* Divided String */}
              <div className="flex flex-col items-center">
                <button
                  onClick={handleDividedClick}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleDividedClick();
                    }
                  }}
                  aria-label={`${t(translations.dividedStringAriaLabel)}`}
                  className="relative h-72 w-2 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-300 rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 hover:from-slate-200 hover:via-slate-300 hover:to-slate-200 shadow-lg"
                  style={{
                    animation: vibratingDivided ? 'vibrate 0.05s linear infinite' : 'none',
                  }}
                  title={t(translations.dividedFrequencyString)}
                >
                  {/* String highlight */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent rounded-full"></div>
                  <div
                    className="absolute -left-[200%] w-10 h-4 bg-stone-500 rounded-sm shadow-lg border border-stone-400"
                    style={{
                      top: `calc(${100 - ((dividedFrequency - DIVIDED_FREQ_MIN) * 100) / DIVIDED_FREQ_MAX}% - 22.5px)`,
                    }}
                  ></div>
                </button>
                <p className="absolute top-[98%] text-white font-besley font-bold text-base" aria-hidden="true">
                  {dividedFrequency.toFixed(0)} Hz
                </p>
              </div>
              {/* Fundamental String */}
              <div className="flex flex-col items-center">
                <button
                  onClick={handleFundamentalClick}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleFundamentalClick();
                    }
                  }}
                  aria-label={`${t(translations.fundamentalStringAriaLabel)}`}
                  className="relative h-72 w-2 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-300 rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 hover:from-amber-200 hover:via-amber-300 hover:to-amber-200 shadow-lg"
                  style={{
                    animation: vibratingFundamental ? 'vibrate 0.05s linear infinite' : 'none',
                  }}
                  title={t(translations.fundamentalToneString)}
                >
                  {/* String highlight */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent rounded-full"></div>
                </button>
                <p className="absolute top-[98%] text-white font-besley font-bold text-base" aria-hidden="true">
                  {baseFrequency.toFixed(0)} Hz
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Controls and Info */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-xl font-semibold mb-4 mx-2">{t(translations.proportionsTitle)}</h2>
          <div className="grid grid-cols-3 gap-2 p-2 w-full overflow-y-auto custom-scrollbar pr-2 flex-grow">
            {TUNINGS.map((tuning, index) => (
              <button
                key={index}
                onClick={() => handleProportionClick(tuning)}
                aria-label={`${t(translations.proportionAriaLabel)} ${t(translations[tuning.ariaLabel])} ${selectedProportion?.display === tuning.display ? 'selected' : ''}`}
                className={`rounded px-4 py-2 font-besley border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  selectedProportion?.display === tuning.display
                    ? 'bg-[#006BE2] text-white border-[#006BE2] cursor-default'
                    : 'bg-white text-blue-600 border-[#006BE2] hover:bg-gray-200'
                }`}
              >
                {tuning.display}
              </button>
            ))}
          </div>
          <button
            onClick={togglePlayPause}
            className="mt-6 mb-6 py-3 mx-auto flex justify-center items-center gap-x-[6px] rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#006BE0] w-3/4 lg:w-fit lg:px-7"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#e0dcd1]"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span>{t(translations.playFrequenciesButton)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TheVirtualMonochord;
