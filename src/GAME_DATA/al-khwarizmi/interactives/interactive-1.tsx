import { useState, useRef, useEffect } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import interactive1Config from '../configs/interactive-1';
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
  showTakeAwayHalfDates?: boolean;
  showTakeAwayHalfCoins?: boolean;
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
  const [initialDateCount] = useState(8);
  const [initialCoinCount] = useState(40);
  const [expectedDatesOnScale] = useState(8);
  const [expectedCoinsOnScale] = useState(40);
  const [currentStep, setCurrentStep] = useState(isFirstIndex ? 1 : 4);
  const [datesOnLeftPlate, setDatesOnLeftPlate] = useState(false);
  const [coinsOnRightPlate, setCoinsOnRightPlate] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Add state variables to track step completion
  const [step1Completed, setStep1Completed] = useState(false);
  const [step2Completed, setStep2Completed] = useState(false);
  const [step3Part1Completed, setStep3Part1Completed] = useState(false);
  const [step3Part2Completed, setStep3Part2Completed] = useState(false);
  const [step4Part1Completed, setStep4Part1Completed] = useState(false);
  const [step4Part2Completed, setStep4Part2Completed] = useState(false);
  const [step4Part3Completed, setStep4Part3Completed] = useState(false);

  const { t } = useTranslations();

  const [scaleLeftCount, setScaleLeftCount] = useState(8);
  const [scaleRightCount, setScaleRightCount] = useState(40);

  const [subStep, setSubStep] = useState(0);
  const [isSubStep1Completed, setIsSubStep1Completed] = useState(false);
  const [isSubStep2Completed, setIsSubStep2Completed] = useState(false);

  const [halvingPhase, setHalvingPhase] = useState(0);

  const beamRef = useRef<SVGRectElement | null>(null);

  const { payload } = useEventListener('interactive-1');

  useEffect(() => {
    if(payload && typeof payload === 'object' && 'subStep' in payload) {
      setSubStep(payload.subStep as number);
    }
    if (payload && typeof payload === 'object' && 'step' in payload && payload.step !== currentStep) {
      moveToNewStep(payload.step as number);
    }
  }, [payload]);

  useEffect(() => {
    // Step 1 completion: Dates placed on left plate with correct count
    if (currentStep === 1 && datesOnLeftPlate && scaleLeftCount === expectedDatesOnScale) {
      setStep1Completed(true);
    }

    // Step 2 completion: Coins placed on right plate with correct count
    if (currentStep === 2 && coinsOnRightPlate && scaleRightCount === expectedCoinsOnScale) {
      setStep2Completed(true);
    }

    // Step 3 completion: Both parts need to be completed
    if (currentStep === 3) {
      // Part 1: First halving of dates
      if (halvingPhase === 1 && scaleLeftCount === Math.floor(initialDateCount / 2)) {
        setStep3Part1Completed(true);
      }
      // Part 2: First halving of coins
      if (halvingPhase === 2 && scaleRightCount === Math.floor(initialCoinCount / 2)) {
        setStep3Part2Completed(true);
      }
    }

    // Step 4 completion: All three parts need to be completed
    if (currentStep === 4) {
      // Part 1: Second halving of dates
      if (scaleLeftCount === Math.floor(initialDateCount / 4)) {
        setStep4Part1Completed(true);
      }
      // Part 2: Second halving of coins
      if (scaleRightCount === Math.floor(initialCoinCount / 4)) {
        setStep4Part2Completed(true);
      }
      // Part 3: Final balance achieved
      if (scaleLeftCount === 1 && scaleRightCount === 5) {
        setStep4Part3Completed(true);
      }
    }
  }, [
    currentStep,
    datesOnLeftPlate,
    coinsOnRightPlate,
    scaleLeftCount,
    scaleRightCount,
    halvingPhase,
    step1Completed,
    step2Completed,
    step3Part1Completed,
    step3Part2Completed,
    step4Part1Completed,
    step4Part2Completed,
    step4Part3Completed,
    onInteraction,
    initialDateCount,
    initialCoinCount,
    expectedDatesOnScale,
    expectedCoinsOnScale,
  ]);

  useEffect(() => {
    // Notify parent component of completion status
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
    if (step3Part1Completed) {
      onInteraction({
        'step-3-part-1-completed': true,
      });
    }
    if (step3Part2Completed) {
      onInteraction({
        'step-3-part-2-completed': true,
      });
    }
    if (step4Part1Completed) {
      onInteraction({
        'step-4-part-1-completed': true,
      });
    }
    if (step4Part2Completed) {
      onInteraction({
        'step-4-part-2-completed': true,
      });
    }
    if (step4Part3Completed) {
      onInteraction({
        'step-4-part-3-completed': true,
      });
    }
  }, [
    currentStep,
    step1Completed,
    step2Completed,
    step3Part1Completed,
    step3Part2Completed,
    step4Part1Completed,
    step4Part2Completed,
    step4Part3Completed,
    onInteraction,
  ]);

  const moveToNewStep = (newStep: number) => {
    setCurrentStep(newStep);
    setErrorMessage('');
    setSuccessMessage('');

    if (newStep === 1) {
      setDatesOnLeftPlate(false);
      setCoinsOnRightPlate(false);
      setScaleLeftCount(initialDateCount);
      setScaleRightCount(initialCoinCount);
      setHalvingPhase(0);
    } else if (newStep === 2) {
      setDatesOnLeftPlate(true);
      setCoinsOnRightPlate(false);
      setScaleLeftCount(initialDateCount);
      setScaleRightCount(initialCoinCount);
      setHalvingPhase(0);
    } else if (newStep === 3) {
      setDatesOnLeftPlate(true);
      setCoinsOnRightPlate(true);
      setScaleLeftCount(initialDateCount);
      setScaleRightCount(initialCoinCount);
      setHalvingPhase(0);
    } else if (newStep === 4) {
      setDatesOnLeftPlate(true);
      setCoinsOnRightPlate(true);
      setScaleLeftCount(Math.floor(initialDateCount / 2));
      setScaleRightCount(Math.floor(initialCoinCount / 2));
      setHalvingPhase(0);
    } else {
      // For steps beyond 4, keep plates on, keep halved values
      setDatesOnLeftPlate(true);
      setCoinsOnRightPlate(true);
      setScaleLeftCount(Math.floor(initialDateCount / 4));
      setScaleRightCount(Math.floor(initialCoinCount / 4));
      setHalvingPhase(0);
    }
  };

  useEffect(() => {
    if (beamRef.current) {
      let tiltAngle = 0;

      if (currentStep === 1) {
        if (datesOnLeftPlate) {
          tiltAngle = -12;
        }
      } else if (currentStep === 2) {
        if (datesOnLeftPlate && !coinsOnRightPlate) {
          tiltAngle = -12;
        } else if (datesOnLeftPlate && coinsOnRightPlate) {
          tiltAngle = 0;
        }
      } else if (currentStep >= 3) {
        // For steps 3 and beyond, use gradual tilting logic based on halving steps
        const currentRatio = scaleLeftCount > 0 ? scaleRightCount / scaleLeftCount : 0;
        const targetRatio = 40 / 8; // 5 dirhams per date from initial state
        
        // Simple approach: count how many halving steps we are from the starting point
        const startingDates = 8;
        const startingCoins = 40;
        
        // Calculate steps from starting point
        const dateSteps = Math.log2(startingDates / scaleLeftCount);
        const coinSteps = Math.log2(startingCoins / scaleRightCount);
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
        if (scaleLeftCount === 1 && scaleRightCount === 5) {
          tiltAngle = 0; // Perfect balance at the end
        } else if (Math.abs(currentRatio - targetRatio) < 0.1) {
          tiltAngle = 0; // Balanced when ratio is close to target
        } else if (currentRatio > targetRatio) {
          tiltAngle = tiltMagnitude; // Right heavy
        } else {
          tiltAngle = -tiltMagnitude; // Left heavy
        }
      }

      beamRef.current.style.transition = 'transform 0.5s ease-in-out';
      beamRef.current.style.transform = `rotate(${tiltAngle}deg)`;
    }
  }, [datesOnLeftPlate, coinsOnRightPlate, currentStep, halvingPhase, scaleLeftCount, scaleRightCount]);

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
      if (scaleLeftCount === expectedDatesOnScale) {
        setDatesOnLeftPlate(true);
        setSuccessMessage(
          t(interactive1Config.TRANSLATION_KEYS.EXCELLENT_SEE_SCALE_TIPS) +
            ' ' +
            t(interactive1Config.TRANSLATION_KEYS.NOW_NEED_BALANCE),
        );
        setErrorMessage('');
      } else {
        setErrorMessage(
          t(interactive1Config.TRANSLATION_KEYS.NEED_EXACTLY) +
            ' ' +
            expectedDatesOnScale +
            ' ' +
            t(interactive1Config.TRANSLATION_KEYS.DATES_LEFT_SIDE) +
            ' ' +
            t(interactive1Config.TRANSLATION_KEYS.CURRENTLY_HAVE) +
            ' ' +
            scaleLeftCount +
            ' ' +
            t(interactive1Config.TRANSLATION_KEYS.DATES_SELECTED),
        );
        setSuccessMessage('');
      }
    }
  };

  const handleCoinsClick = () => {
    if (currentStep === 2 && !coinsOnRightPlate) {
      if (scaleRightCount === expectedCoinsOnScale) {
        setCoinsOnRightPlate(true);
        setSuccessMessage(
          t(interactive1Config.TRANSLATION_KEYS.PERFECT_SCALE_BALANCED) +
            ' ' +
            expectedDatesOnScale +
            ' ' +
            t(interactive1Config.TRANSLATION_KEYS.DATES_EQUALS) +
            ' ' +
            expectedCoinsOnScale +
            ' ' +
            t(interactive1Config.TRANSLATION_KEYS.DIRHAMS),
        );
        setErrorMessage('');
      } else {
        setErrorMessage(
          t(interactive1Config.TRANSLATION_KEYS.NEED_EXACTLY) +
            ' ' +
            expectedCoinsOnScale +
            ' ' +
            t(interactive1Config.TRANSLATION_KEYS.DIRHAMS_RIGHT_SIDE) +
            ' ' +
            t(interactive1Config.TRANSLATION_KEYS.CURRENTLY_HAVE) +
            ' ' +
            scaleRightCount +
            ' ' +
            t(interactive1Config.TRANSLATION_KEYS.DIRHAMS_SELECTED),
        );
        setSuccessMessage('');
      }
    }
  };

  const takeAwayHalfDates = () => {
    const newDateCount = Math.floor(scaleLeftCount / 2);
    setScaleLeftCount(newDateCount);
    if (currentStep === 3) {
      setHalvingPhase(1);
    }
    setSuccessMessage(
      t(interactive1Config.TRANSLATION_KEYS.SCALE_TIPS_TOWARD_COINS) +
        ' ' +
        t(interactive1Config.TRANSLATION_KEYS.TO_RESTORE_BALANCE) +
        ' ' +
        t(interactive1Config.TRANSLATION_KEYS.WHAT_MUST_WE_DO),
    );
    setErrorMessage('');
  };

  const takeAwayHalfCoins = () => {
    const newCoinCount = Math.floor(scaleRightCount / 2);
    setScaleRightCount(newCoinCount);
    if (currentStep === 3) {
      setHalvingPhase(0);
      if (newCoinCount === 20) {
        setStep3Part2Completed(true);
      }
    }

    if (scaleLeftCount === 1 && newCoinCount === 5) {
      setSuccessMessage(
        t(interactive1Config.TRANSLATION_KEYS.LOOK_WHAT_REMAINS) +
          ' ' +
          '1 ' +
          t(interactive1Config.TRANSLATION_KEYS.DATE) +
          ' ' +
          'and ' +
          newCoinCount +
          ' ' +
          t(interactive1Config.TRANSLATION_KEYS.DIRHAMS) +
          ' ' +
          t(interactive1Config.TRANSLATION_KEYS.PERFECTLY_BALANCED) +
          ' ' +
          t(interactive1Config.TRANSLATION_KEYS.SCALE_REVEALED_TRUTH),
      );
    } else {
      setSuccessMessage(
        t(interactive1Config.TRANSLATION_KEYS.WONDERFUL) +
          ' ' +
          t(interactive1Config.TRANSLATION_KEYS.NOW_WE_HAVE) +
          ' ' +
          scaleLeftCount +
          ' ' +
          t(interactive1Config.TRANSLATION_KEYS.DATES) +
          ' ' +
          'and ' +
          newCoinCount +
          ' ' +
          t(interactive1Config.TRANSLATION_KEYS.DIRHAMS) +
          ' ' +
          t(interactive1Config.TRANSLATION_KEYS.STILL_BALANCED),
      );
    }
    setErrorMessage('');
  };

  const showSingleHalvingButton = () => {
    // Check display flags first
    if (currentStep === 3) {
      if (halvingPhase === 0 && scaleLeftCount === 8 && scaleRightCount === 40) {
        return getDisplayFlag(payload as Payload | null, 'showTakeAwayHalfDates') && !step3Part1Completed
      }
      if (halvingPhase === 1 && scaleLeftCount === 4 && scaleRightCount === 40) {
        return getDisplayFlag(payload as Payload | null, 'showTakeAwayHalfCoins') && !step3Part2Completed
      }
    }
    return false;
  };

  const showDualHalvingButtons = () => {
    // Check display flags first
    if (!getDisplayFlag(payload as Payload | null, 'showHalvingButtons')) {
      return false;
    }

    return currentStep === 4 && scaleLeftCount <= 4 && scaleRightCount <= 20;
  };

  const getSingleButtonText = () => {
    if (halvingPhase === 0) {
      return t(interactive1Config.TRANSLATION_KEYS.REMOVE_HALF_DATES);
    }
    return t(interactive1Config.TRANSLATION_KEYS.REMOVE_HALF_COINS);
  };

  const handleSingleButtonClick = () => {
    if (halvingPhase === 0) {
      takeAwayHalfDates();
    } else {
      takeAwayHalfCoins();
    }
  };

  useEffect(() => {
    if(scaleLeftCount === 2) {
      setIsSubStep1Completed(true);
    }
    if(scaleRightCount === 10) {
      setIsSubStep2Completed(true);
    }
  }, [scaleLeftCount, scaleRightCount]);

  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen"
      role="main"
      aria-label={t(interactive1Config.TRANSLATION_KEYS.AL_KHWARIZMI_BALANCE_SCALE_ACTIVITY)}
    >
      <div className="bg-white w-full max-w-4xl mb-6" role="region" aria-labelledby="balance-scale-heading">
        <h2 id="balance-scale-heading" style={srOnlyStyles}>
          {t(interactive1Config.TRANSLATION_KEYS.BALANCE_SCALE_ACTIVITY)}
        </h2>

        <div
          className="flex justify-center gap-8"
          role="status"
          aria-live="polite"
          aria-label={t(interactive1Config.TRANSLATION_KEYS.CURRENT_QUANTITIES)}
        >
          <div className="flex flex-col items-center">
            <span className="font-semibold text-lg" id="dates-count-label">
              {t(interactive1Config.TRANSLATION_KEYS.NUMBER_OF_DATES)}
            </span>
            <span className="text-2xl font-bold text-amber-800" aria-labelledby="dates-count-label">
              {scaleLeftCount}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-lg" id="dirhams-count-label">
              {t(interactive1Config.TRANSLATION_KEYS.NUMBER_OF_DIRHAMS)}
            </span>
            <span className="text-2xl font-bold text-amber-800" aria-labelledby="dirhams-count-label">
              {scaleRightCount}
            </span>
          </div>
        </div>

        <div
          className="relative mb-2 -mt-14 flex justify-center"
          role="img"
          aria-label={
            t(interactive1Config.TRANSLATION_KEYS.BALANCE_SCALE_SHOWING) +
            ' ' +
            (datesOnLeftPlate
              ? scaleLeftCount + ' ' + t(interactive1Config.TRANSLATION_KEYS.DATES_ON_LEFT_PLATE)
              : t(interactive1Config.TRANSLATION_KEYS.EMPTY_LEFT_PLATE)) +
            ' ' +
            t(interactive1Config.TRANSLATION_KEYS.AND) +
            ' ' +
            (coinsOnRightPlate
              ? scaleRightCount + ' ' + t(interactive1Config.TRANSLATION_KEYS.DIRHAMS_ON_RIGHT_PLATE)
              : t(interactive1Config.TRANSLATION_KEYS.EMPTY_RIGHT_PLATE)) +
            '. ' +
            t(interactive1Config.TRANSLATION_KEYS.SCALE_IS) +
            ' ' +
            (datesOnLeftPlate && coinsOnRightPlate
              ? t(interactive1Config.TRANSLATION_KEYS.BALANCED)
              : datesOnLeftPlate
                ? t(interactive1Config.TRANSLATION_KEYS.TILTED_LEFT)
                : coinsOnRightPlate
                  ? t(interactive1Config.TRANSLATION_KEYS.TILTED_RIGHT)
                  : t(interactive1Config.TRANSLATION_KEYS.EMPTY))
          }
        >
          <svg width="700" height="320" viewBox="0 0 700 400">
            <rect x="275" y="330" width="150" height="45" rx="8" fill="#8B4513" stroke="#3E2723" strokeWidth="3" />
            <rect x="325" y="285" width="50" height="45" fill="#A0522D" stroke="#3E2723" strokeWidth="3" />

            <rect x="345" y="135" width="15" height="150" fill="#8B4513" stroke="#3E2723" strokeWidth="2" />

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

              <line x1="225" y1="150" x2="225" y2="225" stroke="#696969" strokeWidth="3" />

              <line x1="475" y1="150" x2="475" y2="225" stroke="#696969" strokeWidth="3" />

              <g>
                <ellipse cx="225" cy="240" rx="90" ry="40" fill="transparent" />

                <ellipse cx="225" cy="240" rx="60" ry="15" fill="#8B4513" stroke="#3E2723" strokeWidth="3" />
                <ellipse cx="225" cy="235" rx="60" ry="15" fill="#FFF8E1" stroke="#3E2723" strokeWidth="2" />

                {datesOnLeftPlate && (
                  <g>
                    {Array.from({ length: scaleLeftCount }).map((_, index) => {
                      const itemsPerRow = 3;
                      const row = Math.floor(index / itemsPerRow);
                      const col = index % itemsPerRow;
                      const xPos = 195 + col * 20;
                      const yPos = 225 - row * 12;

                      return (
                        <g key={`plate-date-${index}`} transform={`translate(${xPos}, ${yPos})`}>
                          <rect width="12" height="20" rx="2" fill="#8B4513" />
                          <rect x="2" y="2" width="8" height="16" rx="1" fill="#5D4037" />
                          <rect x="4" y="5" width="4" height="10" rx="1" fill="#1E1E1E" />
                        </g>
                      );
                    })}
                  </g>
                )}
              </g>

              <g>
                <ellipse cx="475" cy="240" rx="90" ry="40" fill="transparent" />

                <ellipse cx="475" cy="240" rx="60" ry="15" fill="#8B4513" stroke="#3E2723" strokeWidth="3" />
                <ellipse cx="475" cy="235" rx="60" ry="15" fill="#FFF8E1" stroke="#3E2723" strokeWidth="2" />

                {coinsOnRightPlate && (
                  <g>
                    {Array.from({ length: Math.ceil(scaleRightCount / 5) }).map((_, stackIndex) => {
                      const itemsPerRow = 4;
                      const row = Math.floor(stackIndex / itemsPerRow);
                      const col = stackIndex % itemsPerRow;
                      const xPos = 445 + col * 15;
                      const yPos = 215 + row * 15;

                      const coinsInThisStack =
                        stackIndex === Math.floor(scaleRightCount / 5) && scaleRightCount % 5 !== 0
                          ? scaleRightCount % 5
                          : 5;

                      return (
                        <g key={`plate-coin-stack-${stackIndex}`} transform={`translate(${xPos}, ${yPos})`}>
                          <svg width="15" height="15" viewBox="0 0 50 60">
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

            <ellipse cx="350" cy="375" rx="150" ry="7" fill="rgba(0, 0, 0, 0.2)" />
          </svg>
        </div>

        {showSingleHalvingButton() && (
          <div
            className="flex justify-center gap-4 mb-3"
            role="group"
            aria-label={t(interactive1Config.TRANSLATION_KEYS.HALVING_OPERATIONS)}
          >
            <button
              className="bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 px-6 rounded-lg shadow-md"
              onClick={handleSingleButtonClick}
              aria-label={
                halvingPhase === 0
                  ? t(interactive1Config.TRANSLATION_KEYS.REMOVE_HALF_DATES_LEFT_SIDE)
                  : t(interactive1Config.TRANSLATION_KEYS.REMOVE_HALF_DIRHAMS_RIGHT_SIDE)
              }
              aria-describedby="instructions-text"
            >
              {getSingleButtonText()}
            </button>
          </div>
        )}

        {showDualHalvingButtons() && (
          <div
            className="flex justify-center gap-4 mb-3"
            role="group"
            aria-label={t(interactive1Config.TRANSLATION_KEYS.HALVING_OPERATIONS)}
          >
            {getDisplayFlag(payload as Payload, 'showTakeAwayHalfDates') && ((subStep == 1 && !isSubStep1Completed) || (subStep === 3)) && <button
              className={`font-bold py-2 px-6 rounded-lg shadow-md ${
                scaleLeftCount <= 1
                  ? 'bg-amber-700 cursor-not-allowed'
                  : 'bg-amber-800 hover:bg-amber-900 text-white'
              }`}
              onClick={takeAwayHalfDates}
              disabled={scaleLeftCount <= 1}
              aria-label={t(interactive1Config.TRANSLATION_KEYS.REMOVE_HALF_DATES_LEFT_SIDE)}
              aria-describedby="instructions-text"
            >
              {t(interactive1Config.TRANSLATION_KEYS.REMOVE_HALF_DATES)}
            </button>}

            {getDisplayFlag(payload as Payload, 'showTakeAwayHalfCoins') && ((subStep == 2 && !isSubStep2Completed) || (subStep === 3)) && (<button
              className={`font-bold py-2 px-6 rounded-lg shadow-md ${
                scaleRightCount <= 5
                  ? 'bg-amber-700 cursor-not-allowed'
                  : 'bg-amber-800 hover:bg-amber-900 text-white'
              }`}
              onClick={takeAwayHalfCoins}
              disabled={scaleRightCount <= 5}
              aria-label={t(interactive1Config.TRANSLATION_KEYS.REMOVE_HALF_DIRHAMS_RIGHT_SIDE)}
              aria-describedby="instructions-text"
            >
              {t(interactive1Config.TRANSLATION_KEYS.REMOVE_HALF_COINS)}
            </button>)}
          </div>
        )}

        {currentStep <= 2 && (
          <div
            className="flex justify-center w-full gap-4 mb-6"
            role="group"
            aria-label={t(interactive1Config.TRANSLATION_KEYS.DRAGGABLE_ITEMS)}
          >
            <div className="flex flex-col items-center">
              <h3 className="font-semibold mb-2" id="dirhams-container-label">
                {t(interactive1Config.TRANSLATION_KEYS.DIRHAMS)}
              </h3>
              <div
                className={`border-2 ${coinsOnRightPlate ? 'border-gray-300 bg-gray-100' : 'border-amber-800 bg-amber-100'} rounded-lg p-2 h-48 w-50 flex flex-col items-center justify-between ${currentStep >= 1 && !coinsOnRightPlate ? 'cursor-pointer hover:bg-amber-50' : ''}`}
                onClick={currentStep >= 1 && !coinsOnRightPlate ? handleCoinsClick : undefined}
                role={currentStep >= 1 && !coinsOnRightPlate ? 'button' : 'group'}
                aria-label={
                  t(interactive1Config.TRANSLATION_KEYS.DIRHAMS_CONTAINER_WITH) +
                  ' ' +
                  (coinsOnRightPlate ? '0' : scaleRightCount) +
                  ' ' +
                  t(interactive1Config.TRANSLATION_KEYS.DIRHAMS) +
                  '. ' +
                  (currentStep >= 1 && !coinsOnRightPlate
                    ? t(interactive1Config.TRANSLATION_KEYS.CLICK_TO_PLACE_SCALE)
                    : t(interactive1Config.TRANSLATION_KEYS.NOT_CURRENTLY_INTERACTIVE))
                }
                aria-describedby={coinsOnRightPlate ? undefined : 'dirhams-container-label'}
                tabIndex={currentStep >= 1 && !coinsOnRightPlate ? 0 : -1}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && currentStep >= 1 && !coinsOnRightPlate) {
                    e.preventDefault();
                    handleCoinsClick();
                  }
                }}
              >
                <div className="w-full flex flex-wrap justify-center gap-1 mt-2">
                  {Array.from({ length: Math.ceil(scaleRightCount / 5) }).map((_, stackIndex) => {
                    const coinsInThisStack =
                      stackIndex === Math.floor(scaleRightCount / 5) && scaleRightCount % 5 !== 0
                        ? scaleRightCount % 5
                        : 5;

                    return (
                      <div
                        key={`coin-stack-${stackIndex}`}
                        className="relative mx-1 mb-1"
                        style={{ height: '40px', width: '30px' }}
                      >
                        <svg viewBox="0 0 50 60" width="30" height="40">
                          <defs>
                            <linearGradient id={`coinGradient-${stackIndex}`} x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#FFD700" />
                              <stop offset="100%" stopColor="#FFA500" />
                            </linearGradient>
                          </defs>

                          {Array.from({ length: coinsInThisStack }).map((_, coinIndex) => {
                            const yPosition = 40 - (coinIndex + 1) * 6;

                            return (
                              <g key={`coin-${stackIndex}-${coinIndex}`} transform={`translate(0, ${yPosition})`}>
                                <path
                                  d="M5,8 C5,3.5 15,0 25,0 C35,0 45,3.5 45,8 L45,12 C45,16.5 35,20 25,20 C15,20 5,16.5 5,12 Z"
                                  fill={`url(#coinGradient-${stackIndex})`}
                                  stroke="#B8860B"
                                  strokeWidth="0.5"
                                />
                                <ellipse
                                  cx="25"
                                  cy="8"
                                  rx="20"
                                  ry="7"
                                  fill={`url(#coinGradient-${stackIndex})`}
                                  stroke="#B8860B"
                                  strokeWidth="0.5"
                                />
                                <ellipse cx="25" cy="6" rx="15" ry="4" fill="#FFE449" opacity="0.6" />
                              </g>
                            );
                          })}
                        </svg>
                      </div>
                    );
                  })}
                </div>
                <div className={`text-center font-semibold text-lg ${coinsOnRightPlate ? 'text-gray-800' : ''}`}>
                  {coinsOnRightPlate ? '0' : scaleRightCount} {t(interactive1Config.TRANSLATION_KEYS.DIRHAMS)}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="font-semibold mb-2" id="dates-container-label">
                {t(interactive1Config.TRANSLATION_KEYS.DATES)}
              </h3>
              <div
                className={`border-2 ${datesOnLeftPlate ? 'border-gray-300 bg-gray-100' : 'border-amber-800 bg-amber-100'} rounded-lg p-2 h-48 w-full flex flex-col items-center justify-between ${currentStep >= 1 && !datesOnLeftPlate ? 'cursor-pointer hover:bg-amber-50' : ''}`}
                onClick={currentStep >= 1 && !datesOnLeftPlate ? handleDatesClick : undefined}
                role={currentStep >= 1 && !datesOnLeftPlate ? 'button' : 'group'}
                aria-label={
                  t(interactive1Config.TRANSLATION_KEYS.DATES_CONTAINER_WITH) +
                  ' ' +
                  (datesOnLeftPlate ? '0' : scaleLeftCount) +
                  ' ' +
                  t(interactive1Config.TRANSLATION_KEYS.DATES) +
                  '. ' +
                  (currentStep >= 1 && !datesOnLeftPlate
                    ? t(interactive1Config.TRANSLATION_KEYS.CLICK_TO_PLACE_SCALE)
                    : t(interactive1Config.TRANSLATION_KEYS.NOT_CURRENTLY_INTERACTIVE))
                }
                aria-describedby={datesOnLeftPlate ? undefined : 'dates-container-label'}
                tabIndex={currentStep >= 1 && !datesOnLeftPlate ? 0 : -1}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && currentStep >= 1 && !datesOnLeftPlate) {
                    e.preventDefault();
                    handleDatesClick();
                  }
                }}
              >
                <div
                  className={`flex flex-wrap justify-center gap-2 mt-2 ${datesOnLeftPlate ? 'opacity-30' : ''}`}
                >
                  {Array.from({ length: scaleLeftCount }).map((_, index) => (
                    <div
                      key={`date-${index}`}
                      className="w-10 h-16 bg-amber-800 rounded-lg shadow-md flex items-center justify-center"
                      title="Date"
                    >
                      <div className="w-6 h-12 bg-amber-900 rounded-lg flex items-center justify-center">
                        <div className="w-2 h-6 bg-gray-900 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`text-center font-semibold text-lg ${datesOnLeftPlate ? 'text-gray-800' : ''}`}>
                  {datesOnLeftPlate ? '0' : scaleLeftCount} {t(interactive1Config.TRANSLATION_KEYS.DATES)}
                </div>
              </div>
            </div>
          </div>
        )}

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
