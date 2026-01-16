import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RDFBearingStationConfig } from '../configs/rdf-bearing-station';
import { useTranslations } from '../../../hooks/useTranslations';
import './rdf-bearing-station.css';
import { useEventListener } from '../../../hooks/useEventListener';
import { useGameContext } from '../../../hooks/useGameContext';

interface Beacon {
  id: string;
  name: string;
  frequency: number;
  targetBearing: number;
  color: string;
  enabled?: boolean;
}

interface Flags {
  enableFrequencyTuning?: boolean;
  enableAntennaDirection?: boolean;
  enableSignalStrength?: boolean;
  enableLockBearing?: boolean;
  enableReset?: boolean;
  enableCompassBearing?: boolean;
  enableBearingsLog?: boolean;
}

interface RDFPayload {
  step: number;
  target: string;
  disabled?: string;
  flags?: Flags;
}

interface RecordedBearing {
  beacon: string;
  bearing: number;
  targetBearing: number;
  accuracy: number;
}

interface RDFBearingStationProps {
  interaction: RDFBearingStationConfig;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const RDFBearingStation: React.FC<RDFBearingStationProps> = ({ interaction, onInteraction }) => {
  const { t } = useTranslations();
  const { translations, totalSteps } = interaction;
  let beacons = interaction.beacons;
  const { dialogIndex, currentSceneIndex, interactiveResponses } = useGameContext();
  const { payload } = useEventListener('rdf-bearing-station') as { payload: RDFPayload };

  // Existing state
  const [currentStep, setCurrentStep] = useState(dialogIndex === 1 ? 1 : totalSteps);
  const [currentBeacon, setCurrentBeacon] = useState<Beacon | null>(beacons[0]);
  const [frequency, setFrequency] = useState(260);
  const [antennaAngle, setAntennaAngle] = useState(0);
  const [signalStrength, setSignalStrength] = useState(0);
  const [recordedBearings, setRecordedBearings] = useState<RecordedBearing[]>([]);
  const [bearingLocked, setBearingLocked] = useState(false);
  const [tuned, setTuned] = useState(false);

  // New state to persist beacon frequencies and antenna angles
  const [beaconFrequencies, setBeaconFrequencies] = useState<Record<string, number>>({});
  const [beaconAntennaAngles, setBeaconAntennaAngles] = useState<Record<string, number>>({});

  // New accessibility state
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const [statusAnnouncement, setStatusAnnouncement] = useState('');
  const [lastSignalLevel, setLastSignalLevel] = useState('');

  // Refs for focus management
  const frequencySliderRef = useRef<HTMLInputElement>(null);
  const antennaSliderRef = useRef<HTMLInputElement>(null);
  const lockButtonRef = useRef<HTMLButtonElement>(null);

  // Helper functions
  const tInterpolate = (key: string, variables: Record<string, string | number> = {}) => {
    let translatedString = t(key);
    Object.entries(variables).forEach(([variable, value]) => {
      const placeholder = `{{${variable}}}`;
      translatedString = translatedString.replace(new RegExp(placeholder, 'g'), String(value));
    });
    return translatedString;
  };

  const announceToScreenReader = (message: string, isStatus: boolean = false) => {
    if (isStatus) {
      setStatusAnnouncement(message);
      setTimeout(() => setStatusAnnouncement(''), 100);
    } else {
      setLiveAnnouncement(message);
      setTimeout(() => setLiveAnnouncement(''), 100);
    }
  };

  // Add slider background update function (from reference component)
  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    if (payload && payload?.step && payload.step !== currentStep) {
      setCurrentStep(payload.step);
    }
  }, [payload]);

  // Update slider backgrounds when values change
  useEffect(() => {
    if (frequencySliderRef.current) {
      updateSliderBackground(frequencySliderRef.current);
    }
    if (antennaSliderRef.current) {
      updateSliderBackground(antennaSliderRef.current);
    }
  }, [frequency, antennaAngle, updateSliderBackground]);

  const getFlag = (payload: RDFPayload | null, flagName: keyof Flags): boolean => {
    // If payload is null/undefined, return true (allow normal logic)
    if (!payload) {
      return false;
    }

    const flag = payload.flags?.[flagName];

    // If flag is explicitly false, return false (override condition)
    if (flag === true) {
      return true;
    }

    // If flag is not present or true, return true (allow normal logic)
    return false;
  };

  // ROBUST signal strength calculation - NO random interference
  const calculateSignalStrength = () => {
    if (!currentBeacon) return 0;

    // First check if properly tuned to frequency
    const freqError = Math.abs(frequency - currentBeacon.frequency);
    if (freqError > 5) return 0; // No signal if frequency is off

    const freqStrength = Math.max(0, 100 - freqError * 20); // Frequency tuning accuracy

    // Then check antenna direction - precise signal strength based on target bearing
    const angleDiff = Math.abs(antennaAngle - currentBeacon.targetBearing);
    const normalizedDiff = Math.min(angleDiff, 360 - angleDiff);

    // ROBUST direction strength calculation - deterministic and precise
    let directionStrength = 0;

    if (normalizedDiff === 0) {
      directionStrength = 100; // Exact target bearing - always 100%
    } else if (normalizedDiff === 1) {
      directionStrength = 95; // ±1 degree
    } else if (normalizedDiff === 2) {
      directionStrength = 90; // ±2 degrees
    } else if (normalizedDiff <= 5) {
      // Linear drop from 90% to 70% for 3-5 degrees
      directionStrength = 90 - (normalizedDiff - 2) * 6.67;
    } else if (normalizedDiff <= 10) {
      // Linear drop from 70% to 40% for 6-10 degrees
      directionStrength = 70 - (normalizedDiff - 5) * 6;
    } else if (normalizedDiff <= 20) {
      // Linear drop from 40% to 10% for 11-20 degrees
      directionStrength = 40 - (normalizedDiff - 10) * 3;
    } else {
      directionStrength = 0; // No signal beyond 20 degrees
    }

    // Calculate final strength - NO random interference for consistency
    const finalStrength = (freqStrength * directionStrength) / 100;

    // Round to avoid floating point precision issues
    return Math.round(Math.max(0, Math.min(100, finalStrength)));
  };

  // Enhanced signal strength with accessibility announcements
  useEffect(() => {
    const newStrength = calculateSignalStrength();
    const previousStrength = signalStrength;
    setSignalStrength(newStrength);

    // Check if properly tuned and save frequency and antenna angle
    if (currentBeacon) {
      const freqError = Math.abs(frequency - currentBeacon.frequency);
      const wasJustTuned = !tuned && freqError <= 2;
      setTuned(freqError <= 2);

      // Save the current frequency for this beacon
      setBeaconFrequencies((prev) => ({
        ...prev,
        [currentBeacon.id]: frequency,
      }));

      // Save the current antenna angle for this beacon
      setBeaconAntennaAngles((prev) => ({
        ...prev,
        [currentBeacon.id]: antennaAngle,
      }));

      // Announce when tuned
      if (wasJustTuned) {
        announceToScreenReader(
          tInterpolate(translations.accessibility.frequencyTuned, {
            beacon: t(translations.ui[currentBeacon.name as keyof typeof translations.ui]),
            frequency: currentBeacon.frequency,
            unit: t(translations.ui.frequencyUnitFull),
          }),
        );
      }
    }

    // Announce significant signal strength changes
    const strengthText = getSignalStrengthText();
    if (strengthText !== lastSignalLevel && Math.abs(newStrength - previousStrength) >= 15) {
      setLastSignalLevel(strengthText);
      announceToScreenReader(
        tInterpolate(translations.accessibility.signalStrengthChanged, {
          strength: newStrength,
          percentage: t(translations.ui.percentageSymbol),
          level: strengthText,
        }),
      );
    }

    // Announce when peak signal found
    if (newStrength === 100 && previousStrength < 100) {
      announceToScreenReader(t(translations.accessibility.peakSignalFound), true);
    }
  }, [frequency, antennaAngle, currentBeacon, tuned, signalStrength, lastSignalLevel]);

  const selectBeacon = (beacon: Beacon) => {
    const isCompleted = recordedBearings.some((rb) => rb.beacon === beacon.id);

    // Allow selecting completed beacons when all bearings are complete (for viewing)
    if (isCompleted && recordedBearings.length < 3) return;

    setCurrentBeacon(beacon);

    // Use saved antenna angle or default to 0
    const savedAntennaAngle = beaconAntennaAngles[beacon.id] || 0;
    setAntennaAngle(savedAntennaAngle);

    setBearingLocked(false); // Reset bearing locked state

    // Use saved frequency or default to 260
    const savedFrequency = beaconFrequencies[beacon.id] || 260;
    setFrequency(savedFrequency);

    // Check if the saved frequency is tuned
    const freqError = Math.abs(savedFrequency - beacon.frequency);
    setTuned(freqError <= 2);

    // Announce beacon selection
    announceToScreenReader(
      tInterpolate(translations.accessibility.beaconSelected, {
        beacon: t(translations.ui[beacon.name as keyof typeof translations.ui]),
        frequency: beacon.frequency,
        unit: t(translations.ui.frequencyUnitFull),
      }),
    );

    // Focus frequency slider when beacon changes
    setTimeout(() => {
      frequencySliderRef.current?.focus();
    }, 100);
  };

  const lockBearing = () => {
    // Only allow recording when signal strength is exactly 100% (exact target bearing)
    if (signalStrength === 100 && tuned && currentBeacon) {
      const bearing: RecordedBearing = {
        beacon: currentBeacon.id,
        bearing: antennaAngle,
        targetBearing: currentBeacon.targetBearing,
        accuracy: Math.abs(antennaAngle - currentBeacon.targetBearing),
      };

      setRecordedBearings((prev) => [...prev, bearing]);
      setBearingLocked(true);

      // Announce bearing recorded
      announceToScreenReader(
        tInterpolate(translations.accessibility.bearingRecorded, {
          beacon: t(translations.ui[currentBeacon.name as keyof typeof translations.ui]),
          bearing: antennaAngle,
          degree: t(translations.ui.degreeSymbol),
          total: recordedBearings.length + 1,
          remaining: 3 - (recordedBearings.length + 1),
        }),
      );

      // Check if all complete
      if (recordedBearings.length + 1 === 3) {
        announceToScreenReader(t(translations.accessibility.allBearingsComplete), true);
      }
    }
  };

  // Updated handlers for sliders to include background updates
  const handleFrequencyChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFreq = parseInt(e.target.value);
      setFrequency(newFreq);
      updateSliderBackground(e.target as HTMLInputElement);
    },
    [updateSliderBackground],
  );

  const handleAntennaChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newAngle = parseInt(e.target.value);
      setAntennaAngle(newAngle);
      updateSliderBackground(e.target as HTMLInputElement);
    },
    [updateSliderBackground],
  );

  // Keyboard handlers for sliders
  const handleFrequencyKeyDown = (e: React.KeyboardEvent) => {
    let newFreq = frequency;
    let step = 5;

    if (e.shiftKey) step = 1; // Fine adjustment with Shift

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        e.preventDefault();
        newFreq = Math.min(450, frequency + step);
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        e.preventDefault();
        newFreq = Math.max(250, frequency - step);
        break;
      case 'Home':
        e.preventDefault();
        newFreq = 250;
        break;
      case 'End':
        e.preventDefault();
        newFreq = 450;
        break;
      case 'PageUp':
        e.preventDefault();
        newFreq = Math.min(450, frequency + 25);
        break;
      case 'PageDown':
        e.preventDefault();
        newFreq = Math.max(250, frequency - 25);
        break;
      default:
        return;
    }

    if (newFreq !== frequency) {
      setFrequency(newFreq);
      if (frequencySliderRef.current) {
        frequencySliderRef.current.value = String(newFreq);
        updateSliderBackground(frequencySliderRef.current);
      }
      announceToScreenReader(
        tInterpolate(translations.accessibility.frequencyAdjusted, {
          frequency: newFreq,
          unit: t(translations.ui.frequencyUnit),
        }),
      );
    }
  };

  const handleAntennaKeyDown = (e: React.KeyboardEvent) => {
    let newAngle = antennaAngle;
    let step = 1;

    if (e.shiftKey) step = 0.5; // Fine adjustment
    if (e.ctrlKey) step = 5; // Coarse adjustment

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        e.preventDefault();
        // Don't increase beyond 359
        if (antennaAngle < 359) {
          newAngle = Math.min(359, antennaAngle + step);
        }
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        e.preventDefault();
        // Don't decrease below 0
        if (antennaAngle > 0) {
          newAngle = Math.max(0, antennaAngle - step);
        }
        break;
      case 'Home':
        e.preventDefault();
        newAngle = 0;
        break;
      case 'End':
        e.preventDefault();
        newAngle = 359;
        break;
      default:
        return;
    }

    const roundedAngle = Math.round(newAngle * 10) / 10;
    if (roundedAngle !== antennaAngle) {
      setAntennaAngle(roundedAngle);
      if (antennaSliderRef.current) {
        antennaSliderRef.current.value = String(roundedAngle);
        updateSliderBackground(antennaSliderRef.current);
      }
      announceToScreenReader(
        tInterpolate(translations.accessibility.antennaAdjusted, {
          angle: Math.round(roundedAngle),
          degree: t(translations.ui.degreeSymbol),
        }),
      );
    }
  };

  // Restore state from interactive responses when component mounts
  useEffect(() => {
    const sceneKey = `${currentSceneIndex}_0`;
    const response = interactiveResponses[sceneKey];

    if (response) {
      // Restore recorded bearings
      const restoredBearings: RecordedBearing[] = [];
      beacons.forEach((beacon) => {
        const bearingKey = `beacon-${beacon.id}-bearing-recorded`;
        if (response[bearingKey]) {
          // Try to get the actual bearing data from the response
          const bearingValue = response[`beacon-${beacon.id}-bearing-value`];
          const bearingAccuracy = response[`beacon-${beacon.id}-bearing-accuracy`];

          if (bearingValue !== undefined) {
            restoredBearings.push({
              beacon: beacon.id,
              bearing: bearingValue as number,
              targetBearing: beacon.targetBearing,
              accuracy: (bearingAccuracy as number) || 0,
            });
          } else {
            // Fallback to target bearing if no saved value
            restoredBearings.push({
              beacon: beacon.id,
              bearing: beacon.targetBearing,
              targetBearing: beacon.targetBearing,
              accuracy: 0,
            });
          }
        }
      });

      if (restoredBearings.length > 0) {
        setRecordedBearings(restoredBearings);
      }
    }
  }, [currentSceneIndex, interactiveResponses, beacons]);

  // Beacon enable/disable logic based on dialogIndex and completion state
  useEffect(() => {
    // If all bearings are complete, enable all beacons for viewing
    if (recordedBearings.length === 3) {
      beacons.forEach((beacon) => {
        beacon.enabled = true;
      });
      return; // Don't auto-select any beacon when complete
    }

    beacons.forEach((beacon, idx) => {
      if (dialogIndex >= 1 && dialogIndex <= 8 && idx === 0) beacon.enabled = true;
      else if (dialogIndex >= 9 && dialogIndex <= 15 && idx === 1) beacon.enabled = true;
      else if (dialogIndex >= 16 && dialogIndex <= 21 && idx === 2) beacon.enabled = true;
      else beacon.enabled = false;
    });

    // When entering a new beacon dialog (1, 9, 16), auto-select the next beacon if available
    if (dialogIndex === 1 || dialogIndex === 9 || dialogIndex === 16) {
      let currentBeaconIndex;
      switch (dialogIndex) {
        case 1:
          currentBeaconIndex = 0;
          break;
        case 9:
          currentBeaconIndex = 1;
          break;
        case 16:
          currentBeaconIndex = 2;
          break;
        default:
          currentBeaconIndex = 0;
          break;
      }
      const nextBeacon = beacons[currentBeaconIndex];
      setCurrentBeacon(nextBeacon);

      // Use saved frequency or default to 260
      const savedFrequency = beaconFrequencies[nextBeacon.id] || 260;
      setFrequency(savedFrequency);

      // Use saved antenna angle or default to 0
      const savedAntennaAngle = beaconAntennaAngles[nextBeacon.id] || 0;
      setAntennaAngle(savedAntennaAngle);

      setBearingLocked(false);

      // Check if the saved frequency is tuned
      const freqError = Math.abs(savedFrequency - nextBeacon.frequency);
      setTuned(freqError <= 2);
    }
  }, [dialogIndex, beacons, currentBeacon, recordedBearings]);

  const getSignalColor = () => {
    if (signalStrength === 100) return interaction.signalColors.peak;
    if (signalStrength >= 80) return interaction.signalColors.veryStrong;
    if (signalStrength >= 50) return interaction.signalColors.strong;
    if (signalStrength >= 15) return interaction.signalColors.weak;
    return interaction.signalColors.noise;
  };

  const getLockButtonClassName = () => {
    const isDisabled = signalStrength < 100;
    const colors = interaction.buttonColors.lockButton;

    const baseClasses =
      'lock-button w-full px-4 py-3 text-white rounded-lg disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';

    if (isDisabled) {
      return `${baseClasses} ${colors.disabled.background} ${colors.disabled.hover}`;
    } else {
      return `${baseClasses} ${colors.enabled.background} ${colors.enabled.hover} ${colors.enabled.focus}`;
    }
  };

  // UPDATED signal strength text with new thresholds
  const getSignalStrengthText = () => {
    if (signalStrength === 100) return t(translations.ui.signalPeak); // "Peak" - exactly 100%
    if (signalStrength >= 80) return t(translations.ui.signalVeryStrong); // "Very Strong" - 80-99%
    if (signalStrength >= 50) return t(translations.ui.signalStrong); // "Strong" - 50-79%
    if (signalStrength >= 15) return t(translations.ui.signalWeak); // "Weak" - 15-49%
    return t(translations.ui.signalNoise); // "Noise" - <15%
  };

  // Helper function to get beacon conditions
  const getBeaconConditions = () => {
    const conditions: Record<string, boolean> = {};

    beacons.forEach((beacon) => {
      const beaconLetter = beacon.id; // A, B, or C
      const isCurrentBeacon = currentBeacon?.id === beacon.id;
      const isRecorded = recordedBearings.some((rb) => rb.beacon === beacon.id);

      // Frequency tuned condition - exact frequency match only
      conditions[`beacon-${beaconLetter}-frequency-tuned`] = isCurrentBeacon && frequency === beacon.frequency;

      // Bearing found condition - signal strength > 85% for current beacon
      conditions[`beacon-${beaconLetter}-bearing-found`] =
        isCurrentBeacon && signalStrength >= 100 && frequency === beacon.frequency;

      // Bearing recorded condition - bearing has been recorded for this beacon
      conditions[`beacon-${beaconLetter}-bearing-recorded`] = isRecorded;
    });

    return conditions;
  };

  // Update interaction state for the game system
  useEffect(() => {
    const beaconConditions = getBeaconConditions();

    // Create interaction data with all beacon conditions
    const interactionData: Record<string, string | number | boolean | null> = {
      currentBeacon: currentBeacon?.id || null,
      frequency,
      antennaAngle,
      signalStrength,
      recordedBearings: recordedBearings.length,
      allBearingsComplete: recordedBearings.length === 3,
      tuned,
      bearingLocked,
      // Add all beacon conditions
      ...beaconConditions,
    };

    // Add bearing values and accuracy for each recorded bearing
    recordedBearings.forEach((bearing) => {
      interactionData[`beacon-${bearing.beacon}-bearing-value`] = bearing.bearing;
      interactionData[`beacon-${bearing.beacon}-bearing-accuracy`] = bearing.accuracy;
    });

    onInteraction(interactionData);
  }, [
    currentBeacon,
    frequency,
    antennaAngle,
    signalStrength,
    recordedBearings,
    tuned,
    bearingLocked,
    onInteraction,
  ]);

  return (
    <div className="rdf-bearing-station h-full w-full bg-white p-6">
      {/* Live Regions for Screen Reader Announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {liveAnnouncement}
      </div>
      <div aria-live="assertive" aria-atomic="true" className="sr-only">
        {statusAnnouncement}
      </div>

      {/* Screen Reader Instructions */}
      <div className="sr-only">
        <h2>{t(translations.accessibility.instructions)}</h2>
        <ul>
          <li>{t(translations.accessibility.instructionStep1)}</li>
          <li>{t(translations.accessibility.instructionStep2)}</li>
          <li>{t(translations.accessibility.instructionStep3)}</li>
          <li>{t(translations.accessibility.instructionStep4)}</li>
        </ul>
        <p>{t(translations.accessibility.keyboardInstructions)}</p>
      </div>

      <main role="main" aria-labelledby="station-title">
        <h1 id="station-title" className="sr-only">
          {t(translations.title)}
        </h1>

        {/* Progress Section */}
        <section aria-labelledby="progress-heading" className="mb-4">
          <h2 id="progress-heading" className="sr-only">
            {t(translations.accessibility.progressHeading)}
          </h2>
          <div className="sr-only" aria-live="polite">
            {tInterpolate(translations.accessibility.progressStatus, {
              completed: recordedBearings.length,
              total: 3,
            })}
          </div>
        </section>

        {/* Main Radio Equipment Interface */}
        <div className="space-y-6">
          {/* Radio Controls - Hide when all bearings complete */}
          {recordedBearings.length < 3 && (
            <div className="space-y-6">
              {/* Beacon Selection */}
              <fieldset>
                <legend className="text-base font-medium text-slate-600 mb-3">
                  {t(translations.ui.selectBeacon)}:
                </legend>
                <div className="grid grid-cols-3 gap-2" role="group" aria-labelledby="beacon-selection-legend">
                  {beacons.map((beacon, index) => {
                    const isCompleted = recordedBearings.some((rb) => rb.beacon === beacon.id);
                    const isActive = currentBeacon?.id === beacon.id;

                    // Can only select beacons up to the current progress level, or any beacon if all complete
                    const maxSelectableIndex = recordedBearings.length; // 0 means only A, 1 means A or B, etc.
                    const canSelect =
                      (index <= maxSelectableIndex && !isCompleted && beacon.enabled) ||
                      (recordedBearings.length === 3 && beacon.enabled);
                    const isLocked = index > maxSelectableIndex && beacon.enabled && recordedBearings.length < 3;

                    return (
                      <button
                        key={beacon.id}
                        onClick={() => canSelect && selectBeacon(beacon)}
                        disabled={!canSelect}
                        aria-pressed={isActive}
                        aria-describedby={`beacon-${beacon.id}-description`}
                        className={`beacon-button p-3 rounded border-2 text-base font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          isCompleted
                            ? 'border-green-500 bg-green-50 text-green-700 cursor-default'
                            : isActive
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : canSelect
                                ? 'border-slate-300 bg-slate-50 text-slate-700 hover:border-slate-400 cursor-pointer'
                                : 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
                        }`}
                      >
                        <div className="text-lg">
                          {t(translations.ui[beacon.name as keyof typeof translations.ui])}
                        </div>
                        <div className="text-base opacity-75">
                          {tInterpolate(translations.ui.frequencyDisplay, {
                            frequency: beacon.frequency,
                            unit: t(translations.ui.frequencyUnit),
                          })}
                        </div>
                        {isCompleted && (
                          <div className="text-base text-green-600 mt-1">
                            {t(translations.ui.checkmarkSymbol)} {t(translations.ui.complete)}
                          </div>
                        )}
                        {isLocked && (
                          <div className="text-base text-slate-400 mt-1">{t(translations.ui.locked)}</div>
                        )}

                        {/* Hidden descriptions for screen readers */}
                        <div id={`beacon-${beacon.id}-description`} className="sr-only">
                          {isCompleted && t(translations.accessibility.beaconCompleted)}
                          {isActive && !isCompleted && t(translations.accessibility.beaconActive)}
                          {canSelect && !isActive && t(translations.accessibility.beaconAvailable)}
                          {isLocked && t(translations.accessibility.beaconLocked)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Frequency Tuning */}
              {currentBeacon && (
                <fieldset>
                  <legend className="flex items-center justify-between mb-2 w-full">
                    <h3 style={{ marginBottom: '10px', fontSize: '16px', fontWeight: '600' }}>
                      {t(translations.ui.frequencyTuning)}:{' '}
                      {tInterpolate(translations.ui.frequencyDisplay, {
                        frequency: frequency,
                        unit: t(translations.ui.frequencyUnit),
                      })}
                    </h3>
                    <div
                      className={`px-2 py-1 rounded text-base font-bold ${
                        tuned ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                      role="status"
                      aria-live="polite"
                    >
                      {tuned ? t(translations.ui.tuned) : t(translations.ui.tuning)}
                    </div>
                  </legend>
                  <div className="relative">
                    <input
                      ref={frequencySliderRef}
                      type="range"
                      min="250"
                      max="450"
                      step="5"
                      value={frequency}
                      onChange={handleFrequencyChange}
                      onKeyDown={handleFrequencyKeyDown}
                      disabled={recordedBearings.some((rb) => rb.beacon === currentBeacon.id)}
                      className="global-slider w-full"
                      aria-label={tInterpolate(translations.accessibility.frequencySliderLabel, {
                        beacon: t(translations.ui[currentBeacon.name as keyof typeof translations.ui]),
                        current: frequency,
                        target: currentBeacon.frequency,
                        unit: t(translations.ui.frequencyUnitFull),
                      })}
                      aria-describedby="frequency-help"
                      aria-valuetext={tInterpolate(translations.accessibility.frequencyValue, {
                        frequency: frequency,
                        unit: t(translations.ui.frequencyUnitFull),
                      })}
                    />
                    <div id="frequency-help" className="sr-only">
                      {t(translations.accessibility.frequencyHelp)}
                    </div>
                  </div>
                </fieldset>
              )}

              {/* Antenna Control - Only show when tuned and not completed */}
              {getFlag(payload, 'enableAntennaDirection') &&
                currentBeacon &&
                tuned &&
                !recordedBearings.some((rb) => rb.beacon === currentBeacon.id) && (
                  <fieldset>
                    <legend className="flex items-center justify-between mb-2 w-full">
                      <h3 style={{ marginBottom: '10px', fontSize: '16px', fontWeight: '600' }}>
                        {t(translations.ui.antennaDirection)}
                      </h3>
                      <div className="text-slate-800 font-bold">
                        {tInterpolate(translations.ui.antennaAngleDisplay, {
                          angle: antennaAngle.toFixed(0),
                          degree: t(translations.ui.degreeSymbol),
                        })}
                      </div>
                    </legend>
                    <div className="relative">
                      <input
                        ref={antennaSliderRef}
                        type="range"
                        min="0"
                        max="359"
                        value={antennaAngle}
                        onChange={handleAntennaChange}
                        onKeyDown={handleAntennaKeyDown}
                        className="global-slider w-full"
                        aria-label={tInterpolate(translations.accessibility.antennaSliderLabel, {
                          beacon: t(currentBeacon.name),
                          current: Math.round(antennaAngle),
                          degree: t(translations.ui.degreeSymbol),
                        })}
                        aria-describedby="antenna-help"
                        aria-valuetext={tInterpolate(translations.accessibility.antennaValue, {
                          angle: Math.round(antennaAngle),
                          degree: t(translations.ui.degreeSymbol),
                        })}
                      />
                      <div id="antenna-help" className="sr-only">
                        {t(translations.accessibility.antennaHelp)}
                      </div>
                      <div className="flex justify-between text-base text-slate-500 mt-1">
                        <span>0{t(translations.ui.degreeSymbol)}</span>
                        <span>90{t(translations.ui.degreeSymbol)}</span>
                        <span>180{t(translations.ui.degreeSymbol)}</span>
                        <span>270{t(translations.ui.degreeSymbol)}</span>
                        <span>359{t(translations.ui.degreeSymbol)}</span>
                      </div>
                    </div>
                  </fieldset>
                )}

              {/* Signal Strength Meter - Only show when tuned and not completed */}
              {getFlag(payload, 'enableSignalStrength') &&
                currentBeacon &&
                tuned &&
                !recordedBearings.some((rb) => rb.beacon === currentBeacon.id) && (
                  <section aria-labelledby="signal-strength-heading">
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        id="signal-strength-heading"
                        className="text-sm font-medium text-slate-600 flex items-center gap-2"
                        style={{ marginBottom: '10px', fontSize: '16px', fontWeight: '600' }}
                      >
                        {t(translations.ui.signalStrength)}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">
                          {tInterpolate(translations.ui.signalStrengthDisplay, {
                            strength: signalStrength.toFixed(0),
                            percentage: t(translations.ui.percentageSymbol),
                          })}
                        </span>
                      </div>
                    </div>

                    <div
                      className="w-full bg-slate-200 rounded-full h-8 overflow-hidden"
                      role="progressbar"
                      aria-valuenow={signalStrength}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={t(translations.accessibility.signalStrengthMeter)}
                      aria-describedby="signal-description"
                    >
                      <div
                        className={`signal-meter h-full rounded-full transition-all duration-300 flex items-center justify-center text-black text-base font-bold ${getSignalColor()}`}
                        style={{ width: `${Math.max(signalStrength, 8)}%` }}
                      >
                        {getSignalStrengthText()}
                      </div>
                    </div>
                    <div id="signal-description" className="sr-only">
                      {tInterpolate(translations.accessibility.signalStrengthDescription, {
                        strength: signalStrength,
                        level: getSignalStrengthText(),
                        percentage: t(translations.ui.percentageSymbol),
                      })}
                    </div>

                    <div className="text-center text-base text-slate-500 mt-2">
                      {t(translations.ui.rotateAntenna)}
                    </div>
                  </section>
                )}

              {/* Lock Bearing Button - Only show when tuned and not completed */}
              {getFlag(payload, 'enableLockBearing') &&
                currentBeacon &&
                tuned &&
                !bearingLocked &&
                !recordedBearings.some((rb) => rb.beacon === currentBeacon.id) && (
                  <>
                    <button
                      ref={lockButtonRef}
                      onClick={lockBearing}
                      disabled={signalStrength < 100}
                      className={getLockButtonClassName()}
                      aria-describedby="lock-button-help"
                    >
                      {signalStrength >= 100 ? t(translations.ui.lockBearing) : t(translations.ui.findSignalPeak)}
                    </button>
                    <div id="lock-button-help" className="sr-only">
                      {signalStrength >= 100
                        ? t(translations.accessibility.lockBearingHelp)
                        : t(translations.accessibility.findPeakHelp)}
                    </div>
                  </>
                )}
            </div>
          )}

          {/* Visual Feedback */}
          <div className="space-y-6">
            {/* Compass and Bearings Log in two columns - always visible */}
            {recordedBearings.length < 3 && (
              <div className="grid grid-cols-2 gap-4">
                {/* Compass Display */}
                {getFlag(payload, 'enableCompassBearing') && (
                  <section
                    className="bg-white rounded-lg p-4 shadow-lg border border-slate-200"
                    aria-labelledby="compass-heading"
                  >
                    <h3 id="compass-heading" className="text-lg font-semibold text-slate-700 mb-4 text-center">
                      {t(translations.ui.compassBearing)}
                    </h3>

                    <div
                      className="relative w-32 h-32 mx-auto"
                      role="img"
                      aria-label={tInterpolate(translations.accessibility.compassDescription, {
                        angle: antennaAngle.toFixed(0),
                        degree: t(translations.ui.degreeSymbol),
                      })}
                    >
                      {/* Compass circle */}
                      <div className="absolute inset-0 rounded-full border-4 border-slate-400 bg-slate-100">
                        {/* Compass markings */}
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                          <div
                            key={angle}
                            className="compass-marking"
                            style={{
                              transform: `translateX(-50%) rotate(${angle}deg)`,
                            }}
                            aria-hidden="true"
                          />
                        ))}

                        {/* Cardinal directions - positioned outside the circle */}
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-slate-800 font-bold text-base">
                          {t(translations.ui.compassNorth)}
                        </div>
                        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-slate-800 font-bold text-base">
                          {t(translations.ui.compassEast)}
                        </div>
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-slate-800 font-bold text-base">
                          {t(translations.ui.compassSouth)}
                        </div>
                        <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 text-slate-800 font-bold text-base">
                          {t(translations.ui.compassWest)}
                        </div>

                        {/* Antenna direction indicator */}
                        {currentBeacon && (
                          <div
                            className="antenna-indicator"
                            style={{
                              transform: `translateX(-50%) rotate(${antennaAngle}deg)`,
                            }}
                            aria-hidden="true"
                          />
                        )}

                        {/* Center bearing display */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center border-2 border-slate-300">
                          <div className="text-center">
                            <div className="text-slate-800 font-bold text-base">
                              {tInterpolate(translations.ui.antennaAngleDisplay, {
                                angle: antennaAngle.toFixed(0),
                                degree: t(translations.ui.degreeSymbol),
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Recorded Bearings */}
                {getFlag(payload, 'enableBearingsLog') && (
                  <section
                    className="bg-white rounded-lg p-4 shadow-lg border border-slate-200"
                    aria-labelledby="bearings-log-heading"
                  >
                    <h3 id="bearings-log-heading" className="text-lg font-semibold text-slate-700 mb-4">
                      {t(translations.ui.bearingsLog)}{' '}
                      {tInterpolate(translations.ui.bearingLogCount, {
                        current: recordedBearings.length,
                        total: 3,
                      })}
                    </h3>

                    {recordedBearings.length === 0 ? (
                      <p className="text-slate-500 text-center py-4 text-base">
                        {t(translations.ui.noBearingsRecorded)}
                      </p>
                    ) : (
                      <div
                        className="space-y-2"
                        role="list"
                        aria-label={t(translations.accessibility.recordedBearingsList)}
                      >
                        {recordedBearings.map((bearing, index) => (
                          <div
                            key={index}
                            role="listitem"
                            className="flex items-center justify-between p-2 bg-slate-50 rounded text-base border border-slate-200"
                          >
                            <span className="font-medium text-slate-700">
                              {t(translations.ui.beacon)} {bearing.beacon}
                            </span>
                            <div className="text-right">
                              <div className="text-slate-800 font-bold">
                                {tInterpolate(translations.ui.bearingDegreeDisplay, {
                                  bearing: bearing.bearing.toFixed(0),
                                  degree: t(translations.ui.degreeSymbol),
                                })}
                              </div>
                              {bearing.accuracy > 1 && (
                                <div
                                  className={`text-base ${
                                    bearing.accuracy <= 2
                                      ? 'text-green-600'
                                      : bearing.accuracy <= 5
                                        ? 'text-yellow-600'
                                        : 'text-red-600'
                                  }`}
                                >
                                  {tInterpolate(translations.ui.bearingAccuracyLabel, {
                                    plusMinus: t(translations.ui.plusMinusSymbol),
                                    accuracy: bearing.accuracy.toFixed(1),
                                    degree: t(translations.ui.degreeSymbol),
                                    accuracyText: t(translations.ui.accuracy),
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                )}
              </div>
            )}

            {/* Final Summary when all bearings complete */}
            {recordedBearings.length === 3 && (
              <section
                className="bg-white rounded-lg p-6 shadow-lg border border-slate-200"
                aria-labelledby="completion-heading"
                role="region"
              >
                <h3
                  id="completion-heading"
                  className="text-xl font-semibold text-slate-700 mb-6 text-center flex items-center justify-center gap-2"
                >
                  {t(translations.ui.allBearingsComplete)}
                </h3>

                <div
                  className="space-y-4"
                  role="list"
                  aria-label={t(translations.accessibility.completedBearingsList)}
                >
                  {recordedBearings.map((bearing, index) => {
                    const beacon = beacons.find((b) => b.id === bearing.beacon);
                    return (
                      <div
                        key={index}
                        role="listitem"
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="w-8 h-8 rounded-full bg-[#006121] flex items-center justify-center text-white font-bold"
                            aria-label={tInterpolate(translations.accessibility.completedBeaconIcon, {
                              beacon: bearing.beacon,
                            })}
                          >
                            {bearing.beacon}
                          </div>
                          <div>
                            <div className="font-medium text-lg text-slate-800">
                              {t(translations.ui.beacon)} {bearing.beacon}
                            </div>
                            <div
                              className="text-slate-600 text-base"
                              aria-label={tInterpolate(translations.ui.frequencyDisplay, {
                                frequency: beacon?.frequency || 0,
                                unit: t(translations.ui.frequencyUnitFull),
                              })}
                            >
                              {tInterpolate(translations.ui.frequencyDisplay, {
                                frequency: beacon?.frequency || 0,
                                unit: t(translations.ui.frequencyUnitFull),
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-slate-800 font-bold text-xl">
                            {tInterpolate(translations.ui.bearingDegreeDisplay, {
                              bearing: bearing.bearing.toFixed(0),
                              degree: t(translations.ui.degreeSymbol),
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RDFBearingStation;
