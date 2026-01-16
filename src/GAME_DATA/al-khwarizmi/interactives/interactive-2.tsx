import { useState, useRef, useEffect } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import complexBalanceScaleConfig from '../configs/interactive-2';
import { useEventListener } from '../../../hooks/useEventListener';
import { useGameContext } from '../../../hooks/useGameContext';

const srOnlyStyles = {
  position: 'absolute' as const,
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap' as const,
  border: '0',
};

interface DisplayFlags {
  showRemovalButtons?: boolean;
  showHalvingButtons?: boolean;
}

interface Payload {
  step: number;
  target: string;
  disabled?: string;
  displayFlags?: DisplayFlags;
}

const BalanceScale = ({
  onInteraction,
}: {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}) => {
  const { dialogIndex } = useGameContext();
  const isFirstIndex = dialogIndex === 1;
  // Updated initial quantities
  const [currentStep, setCurrentStep] = useState(isFirstIndex ? 1 : 4);

  // State for items on plates
  const [datesOnLeftPlate, setDatesOnLeftPlate] = useState(false);
  const [datesOnRightPlate, setDatesOnRightPlate] = useState(false);
  const [coinsOnRightPlate, setCoinsOnRightPlate] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Translation hook
  const { t } = useTranslations();

  // Counters for items on scale
  const [scaleLeftCount, setScaleLeftCount] = useState(10); // All dates start here
  const [scaleRightDateCount, setScaleRightDateCount] = useState(2); // Family dates
  const [scaleRightCoinCount, setScaleRightCoinCount] = useState(60); // Coins to earn

  // Track what's in containers vs on plates
  const [containerLeftCount, setContainerLeftCount] = useState(10);
  const [containerRightCount, setContainerRightCount] = useState(62); // 2 dates + 60 coins conceptually

  const [removalPhase, setRemovalPhase] = useState(0); // 0: initial, 1: remove right dates, 2: remove left dates, 3: halving phase
  const [halvingPhase, setHalvingPhase] = useState(0); // For the final halving steps

  const beamRef = useRef<SVGRectElement | null>(null);

  const { payload } = useEventListener('interactive-2');

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload && payload.step !== currentStep) {
      moveToNewStep(payload.step as number);
    }
  }, [payload]);

  useEffect(() => {
    /**
     * The completion conditions are:
        Step 1: Dates placed on left plate and container is empty.
        Step 2: Dates and coins placed on right plate and container is empty.
        Step 3: Right dates removed (removalPhase === 1).
        Step 4: Left dates removed (removalPhase === 2).
        Step 5: Final answer (scaleLeftCount === 1 && scaleRightCoinCount === 7.5).
     */
    const step1Completed = datesOnLeftPlate && containerLeftCount === 0;
    const step2Completed = datesOnRightPlate && coinsOnRightPlate && containerRightCount === 0;
    const step3Completed = removalPhase === 1;
    const step4Completed = removalPhase === 2;
    const step5Completed = scaleLeftCount === 1 && scaleRightCoinCount === 7.5;
    if (step1Completed) {
      onInteraction({
        'step-1-completed': true,
      });
    }
    if (step2Completed) {
      onInteraction({
        'step-2-completed': true,
      });
    }
    if (step3Completed) {
      onInteraction({
        'step-3-completed': true,
      });
    }
    if (step4Completed) {
      onInteraction({
        'step-4-completed': true,
      });
    }
    if (step5Completed) {
      onInteraction({
        'step-5-completed': true,
      });
    }
  }, [
    datesOnLeftPlate,
    datesOnRightPlate,
    coinsOnRightPlate,
    scaleLeftCount,
    scaleRightCoinCount,
    removalPhase,
    onInteraction,
  ]);

  const moveToNewStep = (newStep: number) => {
    setCurrentStep(newStep);
    setErrorMessage('');
    setSuccessMessage('');

    if (newStep === 1) {
      setDatesOnLeftPlate(false);
      setDatesOnRightPlate(false);
      setCoinsOnRightPlate(false);
      setScaleLeftCount(10);
      setScaleRightDateCount(2);
      setScaleRightCoinCount(60);
      setContainerLeftCount(10);
      setContainerRightCount(62);
      setRemovalPhase(0);
      setHalvingPhase(0);
    } else if (newStep === 2) {
      setDatesOnLeftPlate(true);
      setDatesOnRightPlate(false);
      setCoinsOnRightPlate(false);
      setScaleLeftCount(10);
      setScaleRightDateCount(2);
      setScaleRightCoinCount(60);
      setContainerLeftCount(0);
      setContainerRightCount(62);
      setRemovalPhase(0);
      setHalvingPhase(0);
    } else if (newStep === 3) {
      setDatesOnLeftPlate(true);
      setDatesOnRightPlate(true);
      setCoinsOnRightPlate(true);
      setScaleLeftCount(10);
      setScaleRightDateCount(2);
      setScaleRightCoinCount(60);
      setContainerLeftCount(0);
      setContainerRightCount(0);
      setRemovalPhase(0);
      setHalvingPhase(0);
    } else if (newStep === 4) {
      setDatesOnLeftPlate(true);
      setDatesOnRightPlate(false);
      setCoinsOnRightPlate(true);
      setScaleLeftCount(10); // Start with 10 dates, will become 8 after user clicks remove button
      setScaleRightDateCount(0);
      setScaleRightCoinCount(60);
      setContainerLeftCount(0);
      setContainerRightCount(0);
      setRemovalPhase(1);
      setHalvingPhase(0);
    } else if (newStep === 5) {
      setDatesOnLeftPlate(true);
      setDatesOnRightPlate(false);
      setCoinsOnRightPlate(true);
      setScaleLeftCount(8);
      setScaleRightDateCount(0);
      setScaleRightCoinCount(60);
      setContainerLeftCount(0);
      setContainerRightCount(0);
      setRemovalPhase(2);
      setHalvingPhase(0);
    }
  };

  useEffect(() => {
    if (beamRef.current) {
      let tiltAngle = 0;

      if (currentStep === 1) {
        if (datesOnLeftPlate) {
          tiltAngle = -12; // Left side heavy
        }
      } else if (currentStep === 2) {
        if (datesOnLeftPlate && !datesOnRightPlate && !coinsOnRightPlate) {
          tiltAngle = -12; // Left side heavy
        } else if (datesOnLeftPlate && datesOnRightPlate && coinsOnRightPlate) {
          tiltAngle = 0; // Balanced
        }
      } else if (currentStep === 3) {
        if (removalPhase === 0) {
          tiltAngle = 0; // Initially balanced
        } else if (removalPhase === 1) {
          tiltAngle = -12; // Left heavy after removing right dates
        }
      } else if (currentStep === 4) {
        if (removalPhase === 1) {
          tiltAngle = -12; // Still left heavy until user removes left dates
        } else if (removalPhase === 2) {
          tiltAngle = 0; // Balanced again after removing left dates
        }
      } else if (currentStep >= 5) {
        const currentRatio = scaleLeftCount > 0 ? scaleRightCoinCount / scaleLeftCount : 0;
        const targetRatio = 60 / 8; // 7.5 dirhams per date from step 4 starting point

        // Simple approach: count how many halving steps we are from the starting point
        const startingDates = 8;
        const startingCoins = 60;

        // Calculate steps from starting point
        const dateSteps = Math.log2(startingDates / scaleLeftCount);
        const coinSteps = Math.log2(startingCoins / scaleRightCoinCount);
        const totalSteps = Math.abs(dateSteps - coinSteps);

        let tiltMagnitude;
        if (totalSteps <= 1) {
          tiltMagnitude = 8; // Small tilt
        } else if (totalSteps <= 2) {
          tiltMagnitude = 15; // Medium tilt
        } else {
          tiltMagnitude = 22; // Large tilt
        }

        // Determine direction
        if (scaleLeftCount === 1 && Math.abs(scaleRightCoinCount - 7.5) < 0.1) {
          tiltAngle = 0; // Perfect balance at the end
        } else if (Math.abs(currentRatio - targetRatio) < 0.1) {
          tiltAngle = 0; // Balanced when ratio is close to target (fixes starting balance)
        } else if (currentRatio > targetRatio) {
          tiltAngle = tiltMagnitude; // Right heavy
        } else {
          tiltAngle = -tiltMagnitude; // Left heavy
        }
      }

      beamRef.current.style.transition = 'transform 0.5s ease-in-out';
      beamRef.current.style.transform = `rotate(${tiltAngle}deg)`;
    }
  }, [
    datesOnLeftPlate,
    datesOnRightPlate,
    coinsOnRightPlate,
    currentStep,
    scaleLeftCount,
    scaleRightDateCount,
    scaleRightCoinCount,
    removalPhase,
    halvingPhase,
  ]);

  const getDisplayFlag = (payload: Payload | null, flagName: keyof DisplayFlags): boolean => {
    // If payload is null/undefined, return true (allow normal logic)
    if (!payload) {
      return true;
    }

    const flag = payload.displayFlags?.[flagName];

    // If flag is explicitly false, return false (override condition)
    if (flag === false) {
      return false;
    }

    // If flag is not present or true, return true (allow normal logic)
    return true;
  };

  const handleDatesClick = () => {
    if (currentStep === 1 && !datesOnLeftPlate) {
      if (containerLeftCount === 10) {
        setDatesOnLeftPlate(true);
        setContainerLeftCount(0);
        setSuccessMessage(t(complexBalanceScaleConfig.TRANSLATION_KEYS.STEP1_SUCCESS));
        setErrorMessage('');
      } else {
        setErrorMessage(t(complexBalanceScaleConfig.TRANSLATION_KEYS.STEP1_ERROR));
        setSuccessMessage('');
      }
    }
  };

  const handleRightItemsClick = () => {
    if (currentStep === 2 && !datesOnRightPlate && !coinsOnRightPlate) {
      setDatesOnRightPlate(true);
      setCoinsOnRightPlate(true);
      setContainerRightCount(0);
      setSuccessMessage(t(complexBalanceScaleConfig.TRANSLATION_KEYS.STEP2_SUCCESS));
      setErrorMessage('');
    }
  };

  const removeDatesFromRight = () => {
    if (currentStep === 3 && removalPhase === 0) {
      setScaleRightDateCount(0);
      setDatesOnRightPlate(false);
      setRemovalPhase(1);
      setSuccessMessage(t(complexBalanceScaleConfig.TRANSLATION_KEYS.STEP3_SUCCESS));
      setErrorMessage('');
    }
  };

  const removeDatesFromLeft = () => {
    if (currentStep === 4 && removalPhase === 1) {
      setScaleLeftCount(scaleLeftCount - 2);
      setRemovalPhase(2);
      setSuccessMessage(t(complexBalanceScaleConfig.TRANSLATION_KEYS.STEP4_SUCCESS));
      setErrorMessage('');
    }
  };

  const removeHalfDates = () => {
    if (scaleLeftCount > 1) {
      const newDateCount = Math.floor(scaleLeftCount / 2);
      setScaleLeftCount(newDateCount);

      // Only show success message when reaching final answer
      if (newDateCount === 1 && scaleRightCoinCount === 7.5) {
        setSuccessMessage(
          t(complexBalanceScaleConfig.TRANSLATION_KEYS.MERCHANT_FINAL) +
            ' ' +
            t(complexBalanceScaleConfig.TRANSLATION_KEYS.AL_KHWARIZMI_FINAL),
        );
      } else {
        setSuccessMessage(''); // Clear any existing messages
      }
      setErrorMessage('');
    }
  };

  const removeHalfCoins = () => {
    if (scaleRightCoinCount > 7.5) {
      const newCoinCount = scaleRightCoinCount / 2;
      setScaleRightCoinCount(newCoinCount);

      // Only show success message when reaching final answer
      if (scaleLeftCount === 1 && newCoinCount === 7.5) {
        setSuccessMessage(
          t(complexBalanceScaleConfig.TRANSLATION_KEYS.MERCHANT_FINAL) +
            ' ' +
            t(complexBalanceScaleConfig.TRANSLATION_KEYS.AL_KHWARIZMI_FINAL),
        );
      } else {
        setSuccessMessage(''); // Clear any existing messages
      }
      setErrorMessage('');
    }
  };

  const showRemovalButtons = () => {
    // Check display flags first
    if (!getDisplayFlag(payload as Payload | null, 'showRemovalButtons')) {
      return false;
    }

    return (currentStep === 3 && removalPhase === 0) || (currentStep === 4 && removalPhase === 1);
  };

  const showHalvingButtons = () => {
    // Check display flags first
    if (!getDisplayFlag(payload as Payload | null, 'showHalvingButtons')) {
      return false;
    }

    return currentStep >= 5 && !(scaleLeftCount === 1 && scaleRightCoinCount === 7.5);
  };

  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen"
      role="main"
      aria-label={t(complexBalanceScaleConfig.TRANSLATION_KEYS.AL_KHWARIZMI_BALANCE_SCALE_ACTIVITY)}
    >
      <div className="bg-white w-full max-w-5xl mb-6" role="region" aria-labelledby="balance-scale-heading">
        <h2 id="balance-scale-heading" style={srOnlyStyles}>
          {t(complexBalanceScaleConfig.TRANSLATION_KEYS.AL_KHWARIZMI_BALANCE_SCALE_ACTIVITY)}
        </h2>

        <div
          className="flex justify-between items-center max-w-md mx-auto mb-4"
          role="status"
          aria-live="polite"
          aria-label={t(complexBalanceScaleConfig.TRANSLATION_KEYS.CURRENT_QUANTITIES)}
        >
          {/* Left plate items */}
          <div className="flex flex-col items-center">
            <span className="font-semibold text-lg" id="dates-left-label">
              {t(complexBalanceScaleConfig.TRANSLATION_KEYS.DATES_ON_LEFT)}
            </span>
            <span className="text-2xl font-bold" aria-labelledby="dates-left-label">
              {datesOnLeftPlate ? scaleLeftCount : 0}
            </span>
          </div>

          {/* Right plate items - stacked */}
          <div className="flex flex-col items-center gap-2">
            {/* Only show dates on right counter if we're not in step 5 (since they're removed) */}
            {currentStep < 5 && (
              <div className="flex flex-col items-center">
                <span className="font-semibold text-lg" id="dates-right-label">
                  {t(complexBalanceScaleConfig.TRANSLATION_KEYS.DATES_ON_RIGHT)}
                </span>
                <span className="text-2xl font-bold" aria-labelledby="dates-right-label">
                  {datesOnRightPlate ? scaleRightDateCount : 0}
                </span>
              </div>
            )}
            <div className="flex flex-col items-center">
              <span className="font-semibold text-lg" id="dirhams-count-label">
                {t(complexBalanceScaleConfig.TRANSLATION_KEYS.NUMBER_OF_DIRHAMS)}
              </span>
              <span className="text-2xl font-bold" aria-labelledby="dirhams-count-label">
                {coinsOnRightPlate ? scaleRightCoinCount : 0}
              </span>
            </div>
          </div>
        </div>

        <div
          className="relative mb-2 -mt-14 flex justify-center"
          role="img"
          aria-label={t(complexBalanceScaleConfig.TRANSLATION_KEYS.BALANCE_SCALE_VISUALIZATION)}
        >
          <svg width="700" height="320" viewBox="0 0 700 400">
            {/* Base */}
            <rect x="275" y="330" width="150" height="45" rx="8" fill="#8B4513" stroke="#3E2723" strokeWidth="3" />
            <rect x="325" y="285" width="50" height="45" fill="#A0522D" stroke="#3E2723" strokeWidth="3" />

            {/* Vertical post */}
            <rect x="345" y="135" width="15" height="150" fill="#8B4513" stroke="#3E2723" strokeWidth="2" />

            {/* Balance beam that rotates */}
            <g ref={beamRef} style={{ transformOrigin: '350px 142px' }}>
              <rect
                x="175"
                y="135"
                width="350"
                height="15"
                rx="3"
                fill="#A0522D"
                stroke="#3E2723"
                strokeWidth="3"
              />

              {/* Left chain */}
              <line x1="225" y1="150" x2="225" y2="225" stroke="#696969" strokeWidth="3" />

              {/* Right chain */}
              <line x1="475" y1="150" x2="475" y2="225" stroke="#696969" strokeWidth="3" />

              {/* Left plate */}
              <g>
                <ellipse cx="225" cy="240" rx="90" ry="40" fill="transparent" />
                <ellipse cx="225" cy="240" rx="60" ry="15" fill="#8B4513" stroke="#3E2723" strokeWidth="3" />
                <ellipse cx="225" cy="235" rx="60" ry="15" fill="#FFF8E1" stroke="#3E2723" strokeWidth="2" />

                {/* Dates on left plate */}
                {datesOnLeftPlate && (
                  <g>
                    {Array.from({ length: scaleLeftCount }).map((_, index) => {
                      const itemsPerRow = 4;
                      const row = Math.floor(index / itemsPerRow);
                      const col = index % itemsPerRow;
                      const xPos = 195 + col * 15;
                      const yPos = 225 - row * 10;

                      return (
                        <g key={`plate-date-left-${index}`} transform={`translate(${xPos}, ${yPos})`}>
                          <rect width="10" height="16" rx="2" fill="#8B4513" />
                          <rect x="2" y="2" width="6" height="12" rx="1" fill="#5D4037" />
                          <rect x="3" y="4" width="4" height="8" rx="1" fill="#1E1E1E" />
                        </g>
                      );
                    })}
                  </g>
                )}
              </g>

              {/* Right plate */}
              <g>
                <ellipse cx="475" cy="240" rx="90" ry="40" fill="transparent" />
                <ellipse cx="475" cy="240" rx="60" ry="15" fill="#8B4513" stroke="#3E2723" strokeWidth="3" />
                <ellipse cx="475" cy="235" rx="60" ry="15" fill="#FFF8E1" stroke="#3E2723" strokeWidth="2" />

                {/* Dates on right plate */}
                {datesOnRightPlate && scaleRightDateCount > 0 && (
                  <g>
                    {Array.from({ length: scaleRightDateCount }).map((_, index) => {
                      const xPos = 465 + index * 15;
                      const yPos = 225;

                      return (
                        <g key={`plate-date-right-${index}`} transform={`translate(${xPos}, ${yPos})`}>
                          <rect width="10" height="16" rx="2" fill="#8B4513" />
                          <rect x="2" y="2" width="6" height="12" rx="1" fill="#5D4037" />
                          <rect x="3" y="4" width="4" height="8" rx="1" fill="#1E1E1E" />
                        </g>
                      );
                    })}
                  </g>
                )}

                {/* Coins on right plate */}
                {coinsOnRightPlate && (
                  <g>
                    {Array.from({ length: Math.ceil(scaleRightCoinCount / 5) }).map((_, stackIndex) => {
                      const itemsPerRow = 6;
                      const row = Math.floor(stackIndex / itemsPerRow);
                      const col = stackIndex % itemsPerRow;
                      const xPos = 440 + col * 12;
                      const yPos = 210 + row * 12;

                      const coinsInThisStack =
                        stackIndex === Math.floor(scaleRightCoinCount / 5) && scaleRightCoinCount % 5 !== 0
                          ? scaleRightCoinCount % 5
                          : 5;

                      return (
                        <g key={`plate-coin-stack-${stackIndex}`} transform={`translate(${xPos}, ${yPos})`}>
                          <svg width="12" height="12" viewBox="0 0 50 60">
                            <defs>
                              <linearGradient
                                id={`plateCoinGradient-${stackIndex}`}
                                x1="0%"
                                y1="0%"
                                x2="0%"
                                y2="100%"
                              >
                                <stop offset="0%" stopColor="#FFD700" />
                                <stop offset="100%" stopColor="#FFA500" />
                              </linearGradient>
                            </defs>

                            {Array.from({ length: Math.min(3, coinsInThisStack) }).map((_, coinIndex) => {
                              const yPosition = 50 - (coinIndex + 1) * 8;

                              return (
                                <g
                                  key={`plate-coin-${stackIndex}-${coinIndex}`}
                                  transform={`translate(0, ${yPosition})`}
                                >
                                  <path
                                    d="M5,8 C5,3.5 15,0 25,0 C35,0 45,3.5 45,8 L45,12 C45,16.5 35,20 25,20 C15,20 5,16.5 5,12 Z"
                                    fill={`url(#plateCoinGradient-${stackIndex})`}
                                    stroke="#B8860B"
                                    strokeWidth="0.5"
                                  />
                                  <ellipse
                                    cx="25"
                                    cy="8"
                                    rx="20"
                                    ry="7"
                                    fill={`url(#plateCoinGradient-${stackIndex})`}
                                    stroke="#B8860B"
                                    strokeWidth="0.5"
                                  />
                                </g>
                              );
                            })}
                          </svg>
                        </g>
                      );
                    })}
                  </g>
                )}
              </g>
            </g>

            {/* Shadow */}
            <ellipse cx="350" cy="375" rx="150" ry="7" fill="rgba(0, 0, 0, 0.2)" />
          </svg>
        </div>

        {/* Removal buttons for specific quantities */}
        {showRemovalButtons() && (
          <div
            className="flex justify-center gap-4 mb-3"
            role="group"
            aria-label={t(complexBalanceScaleConfig.TRANSLATION_KEYS.REMOVAL_OPERATIONS)}
          >
            {currentStep === 3 && removalPhase === 0 && (
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors"
                onClick={removeDatesFromRight}
                aria-label={t(complexBalanceScaleConfig.TRANSLATION_KEYS.REMOVE_2_DATES_RIGHT)}
              >
                {t(complexBalanceScaleConfig.TRANSLATION_KEYS.REMOVE_DATES_RIGHT_BUTTON)}
              </button>
            )}

            {currentStep === 4 && removalPhase === 1 && (
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors"
                onClick={removeDatesFromLeft}
                aria-label={t(complexBalanceScaleConfig.TRANSLATION_KEYS.REMOVE_2_DATES_LEFT)}
              >
                {t(complexBalanceScaleConfig.TRANSLATION_KEYS.REMOVE_DATES_LEFT_BUTTON)}
              </button>
            )}
          </div>
        )}

        {/* Halving buttons - both available simultaneously */}
        {showHalvingButtons() && (
          <div
            className="flex justify-center gap-4 mb-3"
            role="group"
            aria-label={t(complexBalanceScaleConfig.TRANSLATION_KEYS.REMOVAL_OPERATIONS)}
          >
            <button
              className="bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={removeHalfDates}
              disabled={scaleLeftCount <= 1}
              aria-label={t(complexBalanceScaleConfig.TRANSLATION_KEYS.REMOVE_HALF_DATES_ARIA)}
            >
              {t(complexBalanceScaleConfig.TRANSLATION_KEYS.REMOVE_HALF_DATES)}
            </button>

            <button
              className="bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={removeHalfCoins}
              disabled={scaleRightCoinCount <= 7.5}
              aria-label={t(complexBalanceScaleConfig.TRANSLATION_KEYS.REMOVE_HALF_COINS_ARIA)}
            >
              {t(complexBalanceScaleConfig.TRANSLATION_KEYS.REMOVE_HALF_COINS)}
            </button>
          </div>
        )}

        {/* Item containers */}
        {currentStep <= 2 && (
          <div
            className="flex justify-center w-full gap-8 mb-6"
            role="group"
            aria-label={t(complexBalanceScaleConfig.TRANSLATION_KEYS.DRAGGABLE_ITEMS)}
          >
            {/* Dates container */}
            <div className="flex flex-col items-center">
              <h3 className="font-semibold mb-2" id="dates-container-label">
                All {t(complexBalanceScaleConfig.TRANSLATION_KEYS.DATES)} (10)
              </h3>
              <div
                className={`border-2 ${datesOnLeftPlate ? 'border-gray-300 bg-gray-100' : 'border-amber-800 bg-amber-100'} rounded-lg p-3 h-52 w-56 flex flex-col items-center justify-between ${currentStep >= 1 && !datesOnLeftPlate ? 'cursor-pointer hover:bg-amber-50 transition-colors' : ''}`}
                onClick={currentStep >= 1 && !datesOnLeftPlate ? handleDatesClick : undefined}
                role={currentStep >= 1 && !datesOnLeftPlate ? 'button' : 'group'}
                aria-label={
                  t(complexBalanceScaleConfig.TRANSLATION_KEYS.DATES_CONTAINER_ARIA) +
                  ` ${containerLeftCount} ` +
                  t(complexBalanceScaleConfig.TRANSLATION_KEYS.DATES) +
                  '. ' +
                  (currentStep >= 1 && !datesOnLeftPlate
                    ? t(complexBalanceScaleConfig.TRANSLATION_KEYS.CLICK_TO_PLACE)
                    : t(complexBalanceScaleConfig.TRANSLATION_KEYS.NOT_INTERACTIVE))
                }
                tabIndex={currentStep >= 1 && !datesOnLeftPlate ? 0 : -1}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && currentStep >= 1 && !datesOnLeftPlate) {
                    e.preventDefault();
                    handleDatesClick();
                  }
                }}
              >
                <div className={`grid grid-cols-4 gap-1 mt-2 ${datesOnLeftPlate ? 'opacity-30' : ''}`}>
                  {Array.from({ length: containerLeftCount }).map((_, index) => (
                    <div
                      key={`date-${index}`}
                      className="w-8 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center"
                      title={t(complexBalanceScaleConfig.TRANSLATION_KEYS.DATE)}
                    >
                      <div className="w-5 h-9 bg-amber-900 rounded-lg flex items-center justify-center">
                        <div className="w-1 h-4 bg-gray-900 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`text-center font-semibold text-lg ${datesOnLeftPlate ? 'text-gray-800' : ''}`}>
                  {containerLeftCount} {t(complexBalanceScaleConfig.TRANSLATION_KEYS.DATES)}
                </div>
              </div>
            </div>

            {/* Family dates + coins container */}
            <div className="flex flex-col items-center">
              <h3 className="font-semibold mb-2" id="family-container-label">
                {t(complexBalanceScaleConfig.TRANSLATION_KEYS.FAMILY_DATES_AND_COINS)}
              </h3>
              <div
                className={`border-2 ${datesOnRightPlate && coinsOnRightPlate ? 'border-gray-300 bg-gray-100' : 'border-amber-800 bg-amber-100'} rounded-lg p-3 h-52 w-56 flex flex-col items-center justify-between ${currentStep >= 2 && !datesOnRightPlate && !coinsOnRightPlate ? 'cursor-pointer hover:bg-amber-50 transition-colors' : ''}`}
                onClick={
                  currentStep >= 2 && !datesOnRightPlate && !coinsOnRightPlate ? handleRightItemsClick : undefined
                }
                role={currentStep >= 2 && !datesOnRightPlate && !coinsOnRightPlate ? 'button' : 'group'}
                aria-label={
                  t(complexBalanceScaleConfig.TRANSLATION_KEYS.FAMILY_CONTAINER_ARIA) +
                  '. ' +
                  (currentStep >= 2 && !datesOnRightPlate && !coinsOnRightPlate
                    ? t(complexBalanceScaleConfig.TRANSLATION_KEYS.CLICK_TO_PLACE)
                    : t(complexBalanceScaleConfig.TRANSLATION_KEYS.NOT_INTERACTIVE))
                }
                tabIndex={currentStep >= 2 && !datesOnRightPlate && !coinsOnRightPlate ? 0 : -1}
                onKeyDown={(e) => {
                  if (
                    (e.key === 'Enter' || e.key === ' ') &&
                    currentStep >= 2 &&
                    !datesOnRightPlate &&
                    !coinsOnRightPlate
                  ) {
                    e.preventDefault();
                    handleRightItemsClick();
                  }
                }}
              >
                <div
                  className={`flex flex-col items-center gap-3 ${datesOnRightPlate && coinsOnRightPlate ? 'opacity-30' : ''}`}
                >
                  {/* 2 Dates */}
                  <div className="flex gap-2">
                    {containerRightCount > 0 &&
                      Array.from({ length: 2 }).map((_, index) => (
                        <div
                          key={`family-date-${index}`}
                          className="w-8 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center"
                          title={t(complexBalanceScaleConfig.TRANSLATION_KEYS.FAMILY_DATE)}
                        >
                          <div className="w-5 h-9 bg-amber-900 rounded-lg flex items-center justify-center">
                            <div className="w-1 h-4 bg-gray-900 rounded-full"></div>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Coins representation */}
                  <div className="text-xs font-semibold text-center">+</div>
                  <div className="grid grid-cols-6 gap-1">
                    {containerRightCount > 0 &&
                      Array.from({ length: 12 }).map((_, stackIndex) => (
                        <div key={`family-coin-stack-${stackIndex}`} className="w-4 h-4">
                          <svg viewBox="0 0 50 50" width="16" height="16">
                            <circle cx="25" cy="25" r="20" fill="#FFD700" stroke="#B8860B" strokeWidth="2" />
                          </svg>
                        </div>
                      ))}
                  </div>
                </div>
                <div
                  className={`text-center font-semibold text-sm ${datesOnRightPlate && coinsOnRightPlate ? 'text-gray-800' : ''}`}
                >
                  {containerRightCount > 0
                    ? t(complexBalanceScaleConfig.TRANSLATION_KEYS.FAMILY_CONTAINER_CONTENT)
                    : t(complexBalanceScaleConfig.TRANSLATION_KEYS.PLACED_ON_SCALE)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feedback messages */}
        {(errorMessage || successMessage) && (
          <div
            className={`mt-2 p-3 rounded-lg text-center ${successMessage ? 'bg-green-100 border border-green-800 text-green-800' : 'bg-red-100 border border-red-300 text-red-800'}`}
            role="alert"
            aria-live="assertive"
            id="feedback-message"
          >
            {successMessage || errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default BalanceScale;
