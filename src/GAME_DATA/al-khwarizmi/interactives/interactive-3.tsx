/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import INTERACTIVE_3_CONFIG from '../configs/interactive-3';
import { useEventListener } from '../../../hooks/useEventListener';
import { useGameContext } from '../../../hooks/useGameContext';

interface DisplayFlags {
  hideAvailableValues?: boolean;
  showDivideLeftSideBy?: boolean;
}

interface Payload {
  step: number;
  target: string;
  disabled?: string;
  displayFlags?: DisplayFlags;
}

const EquationBuilder = ({
  onInteraction,
}: {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}) => {
  const {
    FIRST_NUMBER_VALUE,
    SECOND_NUMBER_VALUE,
    DEFAULT_LEFT_DIVISION_VALUE,
    DEFAULT_RIGHT_DIVISION_VALUE,
    INITIAL_RESULT_LEFT,
    INITIAL_RESULT_RIGHT,
    TRANSLATION_KEYS,
  } = INTERACTIVE_3_CONFIG;

  const { dialogIndex } = useGameContext();
  const isFirstIndex = dialogIndex === 1;

  const [currentStep, setCurrentStep] = useState(isFirstIndex ? 1 : 4);

  const [placeholders, setPlaceholders] = useState<(string | null)[]>([null, null, null]);
  const firstNumberValue = FIRST_NUMBER_VALUE;
  const secondNumberValue = SECOND_NUMBER_VALUE;

  const [leftDivisionValue, setLeftDivisionValue] = useState(DEFAULT_LEFT_DIVISION_VALUE);
  const [isEditingLeftDivisionValue, setIsEditingLeftDivisionValue] = useState(false);
  const [leftDivisionApplied, setLeftDivisionApplied] = useState(false);
  const [resultLeft, setResultLeft] = useState(INITIAL_RESULT_LEFT);
  const [leftDivisionAttempts, setLeftDivisionAttempts] = useState(0);

  const [rightDivisionValue, setRightDivisionValue] = useState(DEFAULT_RIGHT_DIVISION_VALUE);
  const [isEditingRightDivisionValue, setIsEditingRightDivisionValue] = useState(false);
  const [rightDivisionApplied, setRightDivisionApplied] = useState(false);
  const [resultRight, setResultRight] = useState(INITIAL_RESULT_RIGHT);
  const [rightDivisionAttempts, setRightDivisionAttempts] = useState(0);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const beamRef = useRef<SVGGElement>(null);

  const liveRegionRef = useRef<HTMLDivElement>(null);
  const statusRegionRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslations();

  const { payload } = useEventListener('interactive-3');

  // Add step completion tracking
  const [step1Completed, setStep1Completed] = useState(false);
  const [step2Part1Completed, setStep2Part1Completed] = useState(false);
  const [step2Part2Completed, setStep2Part2Completed] = useState(false);
  const [step3Completed, setStep3Completed] = useState(false);

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload && payload.step !== currentStep) {
      moveToNewStep(payload.step as number);
    }
  }, [payload]);

  const isEquationCorrect = useCallback(() => {
    const [left1, left2, right] = placeholders;
    const firstNumberStr = firstNumberValue.toString();
    const secondNumberStr = secondNumberValue.toString();

    return (
      (left1 === firstNumberStr && left2 === 'x' && right === secondNumberStr) ||
      (left1 === 'x' && left2 === firstNumberStr && right === secondNumberStr)
    );
  }, [placeholders, firstNumberValue, secondNumberValue]);

  useEffect(() => {
    // Step 1 completion: Equation is correct
    if (currentStep === 1) {
      if (isEquationCorrect()) {
        setStep1Completed(true);
      } else {
        setStep1Completed(false);
      }
    }

    // Step 2 Part 1: Just entering the value 5
    if (currentStep === 2) {
      if (leftDivisionValue === 5) {
        setStep2Part1Completed(true);
      } else {
        setStep2Part1Completed(false);
      }
    }

    // Step 2 Part 2: Actually applying the division
    if (currentStep === 2) {
      if (leftDivisionApplied && leftDivisionValue === 5) {
        setStep2Part2Completed(true);
      } else {
        setStep2Part2Completed(false);
      }
    }

    // Step 3: Right side division
    if (currentStep === 3) {
      if (rightDivisionApplied && rightDivisionValue === 5) {
        setStep3Completed(true);
      } else {
        setStep3Completed(false);
      }
    }
  }, [
    isEquationCorrect,
    currentStep,
    leftDivisionApplied,
    rightDivisionApplied,
    leftDivisionValue,
    rightDivisionValue,
  ]);

  useEffect(() => {
    // Notify parent of completion status
    if (step1Completed) {
      onInteraction({
        'step-1-completed': true,
      });
    }
    if (step2Part1Completed) {
      onInteraction({
        'step-2-part-1-completed': true,
      });
    }
    if (step2Part2Completed) {
      onInteraction({
        'step-2-part-2-completed': true,
      });
    }
    if (step3Completed) {
      onInteraction({
        'step-3-completed': true,
      });
    }
  }, [step1Completed, step2Part1Completed, step2Part2Completed, step3Completed, onInteraction]);

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

  const moveToNewStep = (newStep: number) => {
    setCurrentStep(newStep);
    setErrorMessage('');
    setSuccessMessage('');

    // Always reset completion states for the new step and all following steps
    if (newStep <= 1) {
      setStep1Completed(false);
      setStep2Part1Completed(false);
      setStep2Part2Completed(false);
      setStep3Completed(false);
    } else if (newStep <= 2) {
      setStep2Part1Completed(false);
      setStep2Part2Completed(false);
      setStep3Completed(false);
    } else if (newStep <= 3) {
      setStep3Completed(false);
    }

    // Reset to fresh state for each step
    if (newStep === 1) {
      // Fresh start for step 1
      setLeftDivisionValue(DEFAULT_LEFT_DIVISION_VALUE);
      setRightDivisionValue(DEFAULT_RIGHT_DIVISION_VALUE);
      setLeftDivisionApplied(false);
      setRightDivisionApplied(false);
      setIsEditingLeftDivisionValue(false);
      setIsEditingRightDivisionValue(false);
      setResultLeft(INITIAL_RESULT_LEFT);
      setResultRight(INITIAL_RESULT_RIGHT);
      setPlaceholders([null, null, null]);
    } else if (newStep === 2) {
      // Fresh start for step 2 - no assumptions about division being applied
      setLeftDivisionValue(DEFAULT_LEFT_DIVISION_VALUE);
      setRightDivisionValue(DEFAULT_RIGHT_DIVISION_VALUE);
      setLeftDivisionApplied(false);
      setRightDivisionApplied(false);
      setIsEditingLeftDivisionValue(false);
      setIsEditingRightDivisionValue(false);
      setResultLeft(INITIAL_RESULT_LEFT);
      setResultRight(INITIAL_RESULT_RIGHT);
    } else if (newStep === 3) {
      // Fresh start for step 3
      setRightDivisionValue(DEFAULT_RIGHT_DIVISION_VALUE);
      setRightDivisionApplied(false);
      setIsEditingRightDivisionValue(false);
      setResultRight(INITIAL_RESULT_RIGHT);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, chipValue: string) => {
    e.dataTransfer.setData('text/plain', chipValue);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, placeholderIndex: number) => {
    e.preventDefault();
    const draggedValue = e.dataTransfer.getData('text/plain');

    const newPlaceholders = [...placeholders];
    newPlaceholders[placeholderIndex] = draggedValue;
    setPlaceholders(newPlaceholders);

    if (newPlaceholders.every((p) => p !== null)) {
      if (
        (newPlaceholders[0] === firstNumberValue.toString() &&
          newPlaceholders[1] === 'x' &&
          newPlaceholders[2] === secondNumberValue.toString()) ||
        (newPlaceholders[0] === 'x' &&
          newPlaceholders[1] === firstNumberValue.toString() &&
          newPlaceholders[2] === secondNumberValue.toString())
      ) {
        setSuccessMessage(t(TRANSLATION_KEYS.EQUATION_SUCCESS));
        setErrorMessage('');
      } else {
        setErrorMessage(t(TRANSLATION_KEYS.EQUATION_ERROR));
      }
    }
  };

  const handleChipClick = (chipValue: string) => {
    const firstEmptyIndex = placeholders.findIndex((p) => p === null);

    if (firstEmptyIndex !== -1) {
      const newPlaceholders = [...placeholders];
      newPlaceholders[firstEmptyIndex] = chipValue;
      setPlaceholders(newPlaceholders);

      if (newPlaceholders.every((p) => p !== null)) {
        if (
          (newPlaceholders[0] === firstNumberValue.toString() &&
            newPlaceholders[1] === 'x' &&
            newPlaceholders[2] === secondNumberValue.toString()) ||
          (newPlaceholders[0] === 'x' &&
            newPlaceholders[1] === firstNumberValue.toString() &&
            newPlaceholders[2] === secondNumberValue.toString())
        ) {
          setSuccessMessage(t(TRANSLATION_KEYS.EQUATION_SUCCESS));
          setErrorMessage('');
        } else {
          setErrorMessage(t(TRANSLATION_KEYS.EQUATION_ERROR));
        }
      }
    }
  };

  const resetPlaceholders = () => {
    setPlaceholders([null, null, null]);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const applyLeftDivision = () => {
    if (!leftDivisionValue || leftDivisionValue <= 0) {
      setErrorMessage(t(TRANSLATION_KEYS.ENTER_POSITIVE_NUMBER));
      return;
    }

    const newLeftValue = 5 / leftDivisionValue;
    setResultLeft(newLeftValue);
    setLeftDivisionApplied(true);

    if (leftDivisionValue === 5) {
      setSuccessMessage(t(TRANSLATION_KEYS.LEFT_DIVISION_SUCCESS));
      setErrorMessage('');
    } else {
      setLeftDivisionAttempts((prev) => prev + 1);
      if (leftDivisionAttempts >= 1) {
        // After 2 attempts, force the correct value
        setLeftDivisionValue(5);
        setResultLeft(1);
        setErrorMessage(t(TRANSLATION_KEYS.ENFORCING_CORRECT_VALUE));
      } else if (leftDivisionValue === 2) {
        setErrorMessage(
          `${t(TRANSLATION_KEYS.DIVIDING_BY)} ${leftDivisionValue} ${t(TRANSLATION_KEYS.GIVES_US)} ${newLeftValue.toFixed(2)} ${t(TRANSLATION_KEYS.DATES_FRACTION)}`,
        );
      } else if (leftDivisionValue === 3) {
        setErrorMessage(
          `${t(TRANSLATION_KEYS.DIVIDING_BY)} ${leftDivisionValue} ${t(TRANSLATION_KEYS.GIVES_US)} ${newLeftValue.toFixed(2)} ${t(TRANSLATION_KEYS.DATES_FRACTION)}`,
        );
      } else if (leftDivisionValue === 4) {
        setErrorMessage(
          `${t(TRANSLATION_KEYS.DIVIDING_BY)} ${leftDivisionValue} ${t(TRANSLATION_KEYS.GIVES_US)} ${newLeftValue.toFixed(2)} ${t(TRANSLATION_KEYS.DATES_FRACTION)}`,
        );
      } else {
        setErrorMessage(
          `${t(TRANSLATION_KEYS.DIVIDING_BY)} ${leftDivisionValue} ${t(TRANSLATION_KEYS.NO_WHOLE_NUMBER)}`,
        );
      }
    }
  };

  const resetLeftDivision = () => {
    setLeftDivisionApplied(false);
    setResultLeft(INITIAL_RESULT_LEFT);
    setLeftDivisionValue(DEFAULT_LEFT_DIVISION_VALUE);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const applyRightDivision = () => {
    if (!rightDivisionValue || rightDivisionValue <= 0) {
      setErrorMessage(t(TRANSLATION_KEYS.ENTER_POSITIVE_NUMBER));
      return;
    }

    const newRightValue = 25 / rightDivisionValue;
    setResultRight(newRightValue);
    setRightDivisionApplied(true);

    if (rightDivisionValue === 5) {
      setSuccessMessage(t(TRANSLATION_KEYS.RIGHT_DIVISION_SUCCESS));
      setErrorMessage('');
    } else {
      setRightDivisionAttempts((prev) => prev + 1);
      if (rightDivisionAttempts >= 1) {
        // After 2 attempts, force the correct value
        setRightDivisionValue(5);
        setResultRight(5);
        setErrorMessage(t(TRANSLATION_KEYS.ENFORCING_CORRECT_VALUE));
      } else {
        setErrorMessage(
          `${t(TRANSLATION_KEYS.DIVIDING_BY)} ${rightDivisionValue} ${t(TRANSLATION_KEYS.DOESNT_BALANCE)} ${t(TRANSLATION_KEYS.REMEMBER_ONE_DATE)}`,
        );
      }
    }
  };

  const resetRightDivision = () => {
    setRightDivisionApplied(false);
    setResultRight(INITIAL_RESULT_RIGHT);
    setRightDivisionValue(DEFAULT_RIGHT_DIVISION_VALUE);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const getDatesCount = () => {
    if (currentStep <= 1) return 5;
    if (currentStep >= 2 && leftDivisionApplied) {
      if (leftDivisionValue === 5) return 1;
      return Math.ceil(resultLeft);
    }
    return 5;
  };

  const getCoinStacksCount = () => {
    if (currentStep <= 2) return 5;
    if (currentStep >= 3 && rightDivisionApplied) {
      if (rightDivisionValue === 5) return 1;
      return 5;
    }
    return 5;
  };

  useEffect(() => {
    if (beamRef.current && currentStep >= 2) {
      let tiltAngle = 0;

      if (currentStep === 2) {
        if (leftDivisionApplied) {
          tiltAngle = 15;
        }
      } else if (currentStep === 3) {
        if (!rightDivisionApplied) {
          tiltAngle = 15;
        } else if (rightDivisionValue === 5) {
          tiltAngle = 0;
        } else {
          tiltAngle = 15;
        }
      } else if (currentStep === 4) {
        tiltAngle = 0;
      }

      beamRef.current.style.transform = `rotate(${tiltAngle}deg)`;
      beamRef.current.style.transformOrigin = 'center';
      beamRef.current.style.transition = 'transform 0.5s ease-in-out';
    }
  }, [currentStep, leftDivisionApplied, rightDivisionApplied, leftDivisionValue, rightDivisionValue]);

  const renderStep1 = () => {
    return (
      <div role="region" aria-labelledby="step1-heading">
        <h2 id="step1-heading" className="sr-only">
          {t(TRANSLATION_KEYS.STEP_1_BUILD_EQUATION)}
        </h2>

        <div
          className="flex justify-center items-center gap-4 mb-12"
          role="group"
          aria-labelledby="equation-group"
        >
          <div id="equation-group" className="sr-only">
            {t(TRANSLATION_KEYS.EQUATION_PLACEHOLDERS)}
          </div>

          <div className="flex gap-4" role="group" aria-label={t(TRANSLATION_KEYS.LEFT_SIDE_EQUATION)}>
            <div
              className="w-16 h-16 rounded-lg border-2 border-amber-600 flex items-center justify-center text-xl font-bold"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 0)}
              style={placeholders[0] === 'x' ? { fontFamily: 'Besley, serif', fontStyle: 'italic' } : {}}
              role="button"
              tabIndex={0}
              aria-label={`${t(TRANSLATION_KEYS.FIRST_POSITION)} ${t(TRANSLATION_KEYS.CURRENTLY_CONTAINS)} ${placeholders[0] || t(TRANSLATION_KEYS.EMPTY)}`}
              aria-describedby="equation-instructions"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const availableValues = [firstNumberValue.toString(), 'x', secondNumberValue.toString()];
                  const currentIndex = availableValues.indexOf(placeholders[0] || '');
                  const nextIndex = (currentIndex + 1) % availableValues.length;
                  const newPlaceholders = [...placeholders];
                  newPlaceholders[0] = availableValues[nextIndex];
                  setPlaceholders(newPlaceholders);

                  if (liveRegionRef.current) {
                    liveRegionRef.current.textContent = `${t(TRANSLATION_KEYS.FIRST_POSITION_CHANGED)} ${availableValues[nextIndex]}`;
                  }
                }
              }}
            >
              {placeholders[0]}
            </div>
            <div
              className="w-16 h-16 rounded-lg border-2 border-amber-600 flex items-center justify-center text-xl font-bold"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 1)}
              style={placeholders[1] === 'x' ? { fontFamily: 'Besley, serif', fontStyle: 'italic' } : {}}
              role="button"
              tabIndex={0}
              aria-label={`${t(TRANSLATION_KEYS.SECOND_POSITION)} ${t(TRANSLATION_KEYS.CURRENTLY_CONTAINS)} ${placeholders[1] || t(TRANSLATION_KEYS.EMPTY)}`}
              aria-describedby="equation-instructions"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const availableValues = [firstNumberValue.toString(), 'x', secondNumberValue.toString()];
                  const currentIndex = availableValues.indexOf(placeholders[1] || '');
                  const nextIndex = (currentIndex + 1) % availableValues.length;
                  const newPlaceholders = [...placeholders];
                  newPlaceholders[1] = availableValues[nextIndex];
                  setPlaceholders(newPlaceholders);

                  if (liveRegionRef.current) {
                    liveRegionRef.current.textContent = `${t(TRANSLATION_KEYS.SECOND_POSITION_CHANGED)} ${availableValues[nextIndex]}`;
                  }
                }
              }}
            >
              {placeholders[1]}
            </div>
          </div>

          <div
            className="text-5xl font-bold text-amber-600"
            aria-label={t(TRANSLATION_KEYS.EQUALS)}
            role="presentation"
          >
            =
          </div>

          <div
            className="w-16 h-16 rounded-lg border-2 border-amber-600 flex items-center justify-center text-xl font-bold"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 2)}
            style={placeholders[2] === 'x' ? { fontFamily: 'Besley, serif', fontStyle: 'italic' } : {}}
            role="button"
            tabIndex={0}
            aria-label={`${t(TRANSLATION_KEYS.RESULT_POSITION)} ${t(TRANSLATION_KEYS.CURRENTLY_CONTAINS)} ${placeholders[2] || t(TRANSLATION_KEYS.EMPTY)}`}
            aria-describedby="equation-instructions"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const availableValues = [firstNumberValue.toString(), 'x', secondNumberValue.toString()];
                const currentIndex = availableValues.indexOf(placeholders[2] || '');
                const nextIndex = (currentIndex + 1) % availableValues.length;
                const newPlaceholders = [...placeholders];
                newPlaceholders[2] = availableValues[nextIndex];
                setPlaceholders(newPlaceholders);

                if (liveRegionRef.current) {
                  liveRegionRef.current.textContent = `${t(TRANSLATION_KEYS.RESULT_POSITION_CHANGED)} ${availableValues[nextIndex]}`;
                }
              }
            }}
          >
            {placeholders[2]}
          </div>
        </div>

        <div id="equation-instructions" className="sr-only">
          {t(TRANSLATION_KEYS.KEYBOARD_INSTRUCTIONS)}
        </div>

        {!getDisplayFlag(payload as Payload, 'hideAvailableValues') && (
          <div
            className="border-2 border-amber-800 rounded-lg p-6 mb-2"
            role="group"
            aria-labelledby="values-heading"
          >
            <h2 id="values-heading" className="text-xl font-bold mb-4 text-center text-amber-800">
              {t(TRANSLATION_KEYS.AVAILABLE_VALUES)}
            </h2>
            <div
              className="flex justify-center gap-8"
              role="group"
              aria-label={t(TRANSLATION_KEYS.DRAGGABLE_VALUES)}
            >
              <div
                className="w-16 h-16 bg-amber-600 rounded-lg shadow-md flex items-center justify-center text-xl font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-500 transition-colors"
                draggable={true}
                onDragStart={(e) => handleDragStart(e, firstNumberValue.toString())}
                onClick={() => handleChipClick(firstNumberValue.toString())}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleChipClick(firstNumberValue.toString());
                  }
                }}
                aria-label={`${t(TRANSLATION_KEYS.ADD)} ${firstNumberValue} ${t(TRANSLATION_KEYS.TO_EQUATION)} ${t(TRANSLATION_KEYS.CLICK_AUTO_FILL)}`}
              >
                {firstNumberValue}
              </div>

              <div
                className="w-16 h-16 bg-amber-700 rounded-lg shadow-md flex items-center justify-center text-xl font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-600 transition-colors"
                draggable={true}
                onDragStart={(e) => handleDragStart(e, 'x')}
                onClick={() => handleChipClick('x')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleChipClick('x');
                  }
                }}
                aria-label={`${t(TRANSLATION_KEYS.ADD_MULTIPLICATION)} ${t(TRANSLATION_KEYS.CLICK_AUTO_FILL)}`}
                style={{ fontFamily: 'Besley, serif', fontStyle: 'italic' }}
              >
                x
              </div>

              <div
                className="w-16 h-16 bg-amber-600 rounded-lg shadow-md flex items-center justify-center text-xl font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-500 transition-colors"
                draggable={true}
                onDragStart={(e) => handleDragStart(e, secondNumberValue.toString())}
                onClick={() => handleChipClick(secondNumberValue.toString())}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleChipClick(secondNumberValue.toString());
                  }
                }}
                aria-label={`${t(TRANSLATION_KEYS.ADD)} ${secondNumberValue} ${t(TRANSLATION_KEYS.TO_EQUATION)} ${t(TRANSLATION_KEYS.CLICK_AUTO_FILL)}`}
              >
                {secondNumberValue}
              </div>
            </div>
            <div className="mt-4 text-center text-amber-800">
              <p>{t(TRANSLATION_KEYS.DRAG_INSTRUCTIONS)}</p>
            </div>

            <div className="flex justify-center mt-6">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                onClick={resetPlaceholders}
                aria-label={t(TRANSLATION_KEYS.RESET_ALL_POSITIONS)}
              >
                {t(TRANSLATION_KEYS.RESET_EQUATION)}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderStep2 = () => {
    const leftPlateContent = leftDivisionApplied
      ? leftDivisionValue === 5
        ? `1 ${t(TRANSLATION_KEYS.DATE)}`
        : `${resultLeft.toFixed(2)} ${t(TRANSLATION_KEYS.DATES)}`
      : `5 ${t(TRANSLATION_KEYS.DATES)}`;

    const scaleState =
      leftDivisionApplied && leftDivisionValue !== 5
        ? t(TRANSLATION_KEYS.SCALE_TIPPED_RIGHT)
        : leftDivisionApplied
          ? t(TRANSLATION_KEYS.SCALE_BALANCED)
          : t(TRANSLATION_KEYS.SCALE_LEVEL);

    return (
      <div role="region" aria-labelledby="step2-heading">
        <h2 id="step2-heading" className="sr-only">
          {t(TRANSLATION_KEYS.STEP_2_DIVIDE_LEFT)}
        </h2>

        <div className="mb-4 flex justify-center" role="img" aria-labelledby="scale-description">
          <div id="scale-description" className="sr-only">
            {`${t(TRANSLATION_KEYS.BALANCE_SCALE_SHOWING)} ${leftPlateContent} ${t(TRANSLATION_KEYS.ON_LEFT_PLATE)} ${t(TRANSLATION_KEYS.AND)} 25 ${t(TRANSLATION_KEYS.COINS)} ${t(TRANSLATION_KEYS.ON_RIGHT_PLATE)} ${scaleState}`}
          </div>
          <svg width="500" height="190" viewBox="0 0 500 280" aria-hidden="true" focusable="false">
            <rect x="175" y="230" width="150" height="30" rx="8" fill="#8B4513" stroke="#3E2723" strokeWidth="3" />
            <rect x="225" y="200" width="50" height="30" fill="#A0522D" stroke="#3E2723" strokeWidth="3" />

            <rect x="245" y="90" width="10" height="110" fill="#8B4513" stroke="#3E2723" strokeWidth="2" />

            <g ref={beamRef} transform="rotate(0)">
              <rect
                x="125"
                y="90"
                width="250"
                height="10"
                rx="3"
                fill="#A0522D"
                stroke="#3E2723"
                strokeWidth="3"
              />

              <line x1="175" y1="100" x2="175" y2="150" stroke="#696969" strokeWidth="3" />

              <line x1="325" y1="100" x2="325" y2="150" stroke="#696969" strokeWidth="3" />

              <g>
                <ellipse cx="175" cy="160" rx="50" ry="10" fill="#8B4513" stroke="#3E2723" strokeWidth="3" />
                <ellipse cx="175" cy="157" rx="50" ry="10" fill="#FFF8E1" stroke="#3E2723" strokeWidth="2" />

                <g>
                  {Array.from({ length: getDatesCount() }).map((_, index) => {
                    const totalWidth = getDatesCount() * 12;
                    const startX = 175 - totalWidth / 2;
                    const xPos = startX + index * 12;
                    const yPos = 143;

                    return (
                      <g key={`plate-left-date-${index}`} transform={`translate(${xPos}, ${yPos})`}>
                        <rect width="10" height="16" rx="2" fill="#8B4513" />
                        <rect x="1" y="1" width="8" height="14" rx="1" fill="#5D4037" />
                        <rect x="4" y="3" width="2" height="10" rx="1" fill="#1E1E1E" />
                      </g>
                    );
                  })}
                </g>
              </g>

              <g>
                <ellipse cx="325" cy="160" rx="50" ry="10" fill="#8B4513" stroke="#3E2723" strokeWidth="3" />
                <ellipse cx="325" cy="157" rx="50" ry="10" fill="#FFF8E1" stroke="#3E2723" strokeWidth="2" />

                <g>
                  {Array.from({ length: 5 }).map((_, stackIndex) => {
                    const totalWidth = 5 * 17;
                    const startX = 325 - totalWidth / 2;
                    const xPos = startX + stackIndex * 17;
                    const yPos = 152;

                    return (
                      <g key={`plate-coin-stack-${stackIndex}`} transform={`translate(${xPos}, ${yPos})`}>
                        <svg width="15" height="10" viewBox="0 0 50 40">
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

                          {Array.from({ length: 5 }).map((_, coinIndex) => {
                            const yPosition = 30 - (coinIndex + 1) * 6;

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
              </g>
            </g>

            <ellipse cx="250" cy="260" rx="150" ry="7" fill="rgba(0, 0, 0, 0.2)" />
          </svg>
        </div>

        <div className="flex justify-center mb-4">
          <div
            className="bg-blue-200 text-black p-3 rounded-lg flex items-center gap-x-6 border border-blue-400"
            role="status"
            aria-live="polite"
          >
            <div>
              <strong>{t(TRANSLATION_KEYS.LEFT_PLATE)}</strong> {leftPlateContent}
            </div>
            <div>
              <strong>{t(TRANSLATION_KEYS.RIGHT_PLATE)}</strong> 25 {t(TRANSLATION_KEYS.COINS)}
            </div>
          </div>
        </div>

        <div
          className="border-2 border-amber-800 rounded-lg p-4 mb-4"
          role="group"
          aria-labelledby="left-division-heading"
        >
          <h2 id="left-division-heading" className="text-xl font-bold mb-4 text-center text-amber-800">
            {t(TRANSLATION_KEYS.DIVIDE_LEFT_SIDE)}
          </h2>

          <div
            className="flex justify-center items-center gap-4 mb-4"
            role="group"
            aria-label={t(TRANSLATION_KEYS.CURRENT_EQUATION_DISPLAY)}
          >
            <div className="flex gap-2">
              <div
                className="w-14 h-14 bg-amber-600 rounded-lg shadow-md flex items-center justify-center text-xl font-bold text-white"
                aria-label="5"
              >
                5
              </div>
              <div
                className="w-14 h-14 bg-amber-700 rounded-lg shadow-md flex items-center justify-center text-xl font-bold text-white"
                style={{ fontFamily: 'Besley, serif', fontStyle: 'italic' }}
                aria-label={t(TRANSLATION_KEYS.TIMES)}
              >
                x
              </div>
            </div>
            <div className="text-2xl font-bold text-amber-600" aria-label={t(TRANSLATION_KEYS.EQUALS)}>
              =
            </div>
            <div
              className="w-14 h-14 bg-amber-600 rounded-lg shadow-md flex items-center justify-center text-xl font-bold text-white"
              aria-label="25"
            >
              25
            </div>
          </div>

          {getDisplayFlag(payload as Payload, 'showDivideLeftSideBy') && (
            <div
              className="flex items-center justify-center gap-4"
              role="group"
              aria-labelledby="division-controls"
            >
              <label id="division-controls" className="text-lg font-bold">
                {t(TRANSLATION_KEYS.DIVIDE_LEFT_BY)}
              </label>
              <div
                className="w-20 h-20 rounded-lg shadow-md flex items-center justify-center text-2xl font-bold text-black cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                onClick={() => !leftDivisionApplied && setIsEditingLeftDivisionValue(true)}
                role="button"
                tabIndex={leftDivisionApplied ? -1 : 0}
                aria-label={`${t(TRANSLATION_KEYS.DIVISION_VALUE)} ${leftDivisionValue} ${t(TRANSLATION_KEYS.CLICK_TO_EDIT)}`}
                aria-describedby="division-instructions"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (!leftDivisionApplied) {
                      setIsEditingLeftDivisionValue(true);
                    }
                  }
                }}
              >
                {isEditingLeftDivisionValue ? (
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={leftDivisionValue}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      setLeftDivisionValue(Math.min(5, Math.max(1, value)));
                    }}
                    onBlur={() => setIsEditingLeftDivisionValue(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setIsEditingLeftDivisionValue(false);
                      }
                    }}
                    className="w-14 h-14 text-center text-black text-xl font-bold border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent"
                    autoFocus
                    aria-label={t(TRANSLATION_KEYS.ENTER_DIVISION_VALUE)}
                  />
                ) : (
                  leftDivisionValue
                )}
              </div>
              <button
                className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                onClick={applyLeftDivision}
                disabled={leftDivisionApplied}
                aria-label={`${t(TRANSLATION_KEYS.APPLY_DIVISION_BY)} ${leftDivisionValue} ${t(TRANSLATION_KEYS.TO_LEFT_SIDE)}`}
              >
                {t(TRANSLATION_KEYS.DIVIDE)}
              </button>
              {leftDivisionApplied && (
                <button
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                  onClick={resetLeftDivision}
                  aria-label={t(TRANSLATION_KEYS.RESET_LEFT_DIVISION)}
                >
                  {t(TRANSLATION_KEYS.RESET)}
                </button>
              )}
            </div>
          )}

          <div id="division-instructions" className="sr-only">
            {t(TRANSLATION_KEYS.DIVISION_INSTRUCTIONS)}
          </div>

          {leftDivisionApplied && (
            <div
              className={`mt-4 p-3 ${leftDivisionValue === 5 ? 'bg-green-100 border border-green-500 text-green-800' : 'bg-amber-100 border border-amber-500 text-amber-800'} rounded-lg text-center`}
              role="status"
              aria-live="polite"
            >
              <div className="mb-2">
                {t(TRANSLATION_KEYS.AFTER_DIVIDING_LEFT)} {leftDivisionValue}:
              </div>
              <div
                className="flex justify-center items-center gap-4"
                role="group"
                aria-label={t(TRANSLATION_KEYS.RESULT_OF_DIVISION)}
              >
                <div
                  className="w-14 h-14 bg-amber-600 rounded-lg shadow-md flex items-center justify-center text-xl font-bold text-white"
                  aria-label={`${t(TRANSLATION_KEYS.RESULT)} ${resultLeft === 1 ? '1' : resultLeft.toFixed(2)}`}
                >
                  {resultLeft === 1 ? '1' : resultLeft.toFixed(2)}
                </div>
                <div
                  className="w-14 h-14 bg-amber-700 rounded-lg shadow-md flex items-center justify-center text-xl font-bold text-white"
                  style={{ fontFamily: 'Besley, serif', fontStyle: 'italic' }}
                  aria-label={t(TRANSLATION_KEYS.TIMES)}
                >
                  x
                </div>
                <div className="text-xl font-bold" aria-label={t(TRANSLATION_KEYS.EQUALS)}>
                  =
                </div>
                <div
                  className="w-14 h-14 bg-amber-600 rounded-lg shadow-md flex items-center justify-center text-xl font-bold text-white"
                  aria-label="25"
                >
                  25
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    const rightPlateContent = rightDivisionApplied
      ? rightDivisionValue === 5
        ? `5 ${t(TRANSLATION_KEYS.COINS)}`
        : `${resultRight.toFixed(2)} ${t(TRANSLATION_KEYS.COINS)}`
      : `25 ${t(TRANSLATION_KEYS.COINS)}`;

    const scaleState = !rightDivisionApplied
      ? t(TRANSLATION_KEYS.SCALE_TIPPED_RIGHT)
      : rightDivisionValue === 5
        ? t(TRANSLATION_KEYS.SCALE_BALANCED)
        : t(TRANSLATION_KEYS.SCALE_STILL_TIPPED);

    return (
      <div role="region" aria-labelledby="step3-heading">
        <h2 id="step3-heading" className="sr-only">
          {t(TRANSLATION_KEYS.STEP_3_DIVIDE_RIGHT)}
        </h2>

        <div className="relative mb-4 flex justify-center" role="img" aria-labelledby="scale-description-step3">
          <div id="scale-description-step3" className="sr-only">
            {`${t(TRANSLATION_KEYS.BALANCE_SCALE_SHOWING)} 1 ${t(TRANSLATION_KEYS.DATE)} ${t(TRANSLATION_KEYS.ON_LEFT_PLATE)} ${t(TRANSLATION_KEYS.AND)} ${rightPlateContent} ${t(TRANSLATION_KEYS.ON_RIGHT_PLATE)} ${scaleState}`}
          </div>
          <svg width="500" height="190" viewBox="0 0 500 280" aria-hidden="true" focusable="false">
            <rect x="175" y="230" width="150" height="30" rx="8" fill="#8B4513" stroke="#3E2723" strokeWidth="3" />
            <rect x="225" y="200" width="50" height="30" fill="#A0522D" stroke="#3E2723" strokeWidth="3" />

            <rect x="245" y="90" width="10" height="110" fill="#8B4513" stroke="#3E2723" strokeWidth="2" />

            <g ref={beamRef} transform="rotate(15)">
              <rect
                x="125"
                y="90"
                width="250"
                height="10"
                rx="3"
                fill="#A0522D"
                stroke="#3E2723"
                strokeWidth="3"
              />

              <line x1="175" y1="100" x2="175" y2="150" stroke="#696969" strokeWidth="3" />

              <line x1="325" y1="100" x2="325" y2="150" stroke="#696969" strokeWidth="3" />

              <g>
                <ellipse cx="175" cy="160" rx="50" ry="10" fill="#8B4513" stroke="#3E2723" strokeWidth="3" />
                <ellipse cx="175" cy="157" rx="50" ry="10" fill="#FFF8E1" stroke="#3E2723" strokeWidth="2" />

                <g transform={`translate(175, 143)`}>
                  <rect width="10" height="16" rx="2" fill="#8B4513" />
                  <rect x="1" y="1" width="8" height="14" rx="1" fill="#5D4037" />
                  <rect x="4" y="3" width="2" height="10" rx="1" fill="#1E1E1E" />
                </g>
              </g>

              <g>
                <ellipse cx="325" cy="160" rx="50" ry="10" fill="#8B4513" stroke="#3E2723" strokeWidth="3" />
                <ellipse cx="325" cy="157" rx="50" ry="10" fill="#FFF8E1" stroke="#3E2723" strokeWidth="2" />

                <g>
                  {Array.from({ length: getCoinStacksCount() }).map((_, stackIndex) => {
                    const totalWidth = getCoinStacksCount() * 17;
                    const startX = 325 - totalWidth / 2;
                    const xPos = startX + stackIndex * 17;
                    const yPos = 152;

                    const coinsPerStack = 5;

                    return (
                      <g key={`plate-coin-stack-${stackIndex}`} transform={`translate(${xPos}, ${yPos})`}>
                        <svg width="15" height="10" viewBox="0 0 50 40">
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

                          {Array.from({ length: coinsPerStack }).map((_, coinIndex) => {
                            const yPosition = 30 - (coinIndex + 1) * 6;

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
              </g>
            </g>

            <ellipse cx="250" cy="260" rx="150" ry="7" fill="rgba(0, 0, 0, 0.2)" />
          </svg>
        </div>

        <div className="flex justify-center mb-4">
          <div
            className="bg-blue-200 text-black p-3 rounded-lg flex items-center gap-x-6 border border-blue-400"
            role="status"
            aria-live="polite"
          >
            <div>
              <strong>{t(TRANSLATION_KEYS.LEFT_PLATE)}</strong> 1 {t(TRANSLATION_KEYS.DATE)}
            </div>
            <div>
              <strong>{t(TRANSLATION_KEYS.RIGHT_PLATE)}</strong> {rightPlateContent}
            </div>
          </div>
        </div>

        <div
          className="border-2 border-amber-800 rounded-lg p-4 mb-4"
          role="group"
          aria-labelledby="right-division-heading"
        >
          <h2 id="right-division-heading" className="text-xl font-bold mb-4 text-center text-amber-800">
            {t(TRANSLATION_KEYS.DIVIDE_RIGHT_SIDE)}
          </h2>

          <div
            className="flex justify-center items-center gap-4 mb-4"
            role="group"
            aria-label={t(TRANSLATION_KEYS.CURRENT_EQUATION_DISPLAY)}
          >
            <div
              className="w-14 h-14 bg-amber-700 rounded-lg shadow-md flex items-center justify-center text-xl font-bold text-white"
              style={{ fontFamily: 'Besley, serif', fontStyle: 'italic' }}
              aria-label={t(TRANSLATION_KEYS.X_UNKNOWN_VALUE)}
            >
              x
            </div>
            <div className="text-2xl font-bold text-amber-600" aria-label={t(TRANSLATION_KEYS.EQUALS)}>
              =
            </div>
            <div
              className="w-14 h-14 bg-amber-600 rounded-lg shadow-md flex items-center justify-center text-xl font-bold text-white"
              aria-label="25"
            >
              25
            </div>
          </div>

          <div
            className="flex items-center justify-center gap-4"
            role="group"
            aria-labelledby="right-division-controls"
          >
            <label id="right-division-controls" className="text-lg font-bold">
              {t(TRANSLATION_KEYS.DIVIDE_RIGHT_BY)}
            </label>
            <div
              className="w-20 h-20 rounded-lg shadow-md flex items-center justify-center text-2xl font-bold text-black cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={() => !rightDivisionApplied && setIsEditingRightDivisionValue(true)}
              role="button"
              tabIndex={rightDivisionApplied ? -1 : 0}
              aria-label={`${t(TRANSLATION_KEYS.DIVISION_VALUE)} ${rightDivisionValue} ${t(TRANSLATION_KEYS.CLICK_TO_EDIT)}`}
              aria-describedby="right-division-instructions"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (!rightDivisionApplied) {
                    setIsEditingRightDivisionValue(true);
                  }
                }
              }}
            >
              {isEditingRightDivisionValue ? (
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rightDivisionValue}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    setRightDivisionValue(Math.min(5, Math.max(1, value)));
                  }}
                  onBlur={() => setIsEditingRightDivisionValue(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setIsEditingRightDivisionValue(false);
                    }
                  }}
                  className="w-14 h-14 text-center text-black text-xl font-bold border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent"
                  autoFocus
                  aria-label={t(TRANSLATION_KEYS.ENTER_DIVISION_VALUE)}
                />
              ) : (
                rightDivisionValue
              )}
            </div>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
              onClick={applyRightDivision}
              disabled={rightDivisionApplied}
              aria-label={`${t(TRANSLATION_KEYS.APPLY_DIVISION_BY)} ${rightDivisionValue} ${t(TRANSLATION_KEYS.TO_RIGHT_SIDE)}`}
            >
              {t(TRANSLATION_KEYS.DIVIDE)}
            </button>
            {rightDivisionApplied && (
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                onClick={resetRightDivision}
                aria-label={t(TRANSLATION_KEYS.RESET_RIGHT_DIVISION)}
              >
                {t(TRANSLATION_KEYS.RESET)}
              </button>
            )}
          </div>

          <div id="right-division-instructions" className="sr-only">
            {t(TRANSLATION_KEYS.RIGHT_DIVISION_INSTRUCTIONS)}
          </div>

          {rightDivisionApplied && (
            <div
              className={`mt-4 p-3 ${rightDivisionValue === 5 ? 'bg-green-100 border border-green-500 text-green-800' : 'border border-amber-500 text-amber-800'} rounded-lg text-center`}
              role="status"
              aria-live="polite"
            >
              <div className="mb-2">
                {t(TRANSLATION_KEYS.AFTER_DIVIDING_RIGHT)} {rightDivisionValue}:
              </div>
              <div
                className="flex justify-center items-center gap-4"
                role="group"
                aria-label={t(TRANSLATION_KEYS.RESULT_OF_DIVISION)}
              >
                <div
                  className="w-14 h-14 bg-amber-700 rounded-lg shadow-md flex items-center justify-center text-xl font-bold text-white"
                  style={{ fontFamily: 'Besley, serif', fontStyle: 'italic' }}
                  aria-label={t(TRANSLATION_KEYS.X_UNKNOWN_VALUE)}
                >
                  x
                </div>
                <div className="text-xl font-bold" aria-label={t(TRANSLATION_KEYS.EQUALS)}>
                  =
                </div>
                <div
                  className="w-14 h-14 bg-amber-600 rounded-lg shadow-md flex items-center justify-center text-xl font-bold text-white"
                  aria-label={`${t(TRANSLATION_KEYS.RESULT)} ${resultRight === 5 ? '5' : resultRight.toFixed(2)}`}
                >
                  {resultRight === 5 ? '5' : resultRight.toFixed(2)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderStep4 = () => {
    return (
      <div role="region" aria-labelledby="step4-heading">
        <h2 id="step4-heading" className="sr-only">
          {t(TRANSLATION_KEYS.STEP_4_FINAL_SOLUTION)}
        </h2>

        <div className="relative mb-4 flex justify-center" role="img" aria-labelledby="final-scale-description">
          <div id="final-scale-description" className="sr-only">
            {t(TRANSLATION_KEYS.FINAL_SCALE_DESCRIPTION)}
          </div>
          <svg width="500" height="190" viewBox="0 0 500 280" aria-hidden="true" focusable="false">
            <rect x="175" y="230" width="150" height="30" rx="8" fill="#8B4513" stroke="#3E2723" strokeWidth="3" />
            <rect x="225" y="200" width="50" height="30" fill="#A0522D" stroke="#3E2723" strokeWidth="3" />

            <rect x="245" y="90" width="10" height="110" fill="#8B4513" stroke="#3E2723" strokeWidth="2" />

            <g ref={beamRef} transform="rotate(0)">
              <rect
                x="125"
                y="90"
                width="250"
                height="10"
                rx="3"
                fill="#A0522D"
                stroke="#3E2723"
                strokeWidth="3"
              />

              <line x1="175" y1="100" x2="175" y2="150" stroke="#696969" strokeWidth="3" />

              <line x1="325" y1="100" x2="325" y2="150" stroke="#696969" strokeWidth="3" />

              <g>
                <ellipse cx="175" cy="160" rx="50" ry="10" fill="#8B4513" stroke="#3E2723" strokeWidth="3" />
                <ellipse cx="175" cy="157" rx="50" ry="10" fill="#FFF8E1" stroke="#3E2723" strokeWidth="2" />

                <g transform={`translate(175, 143)`}>
                  <rect width="10" height="16" rx="2" fill="#8B4513" />
                  <rect x="1" y="1" width="8" height="14" rx="1" fill="#5D4037" />
                  <rect x="4" y="3" width="2" height="10" rx="1" fill="#1E1E1E" />
                </g>
              </g>

              <g>
                <ellipse cx="325" cy="160" rx="50" ry="10" fill="#8B4513" stroke="#3E2723" strokeWidth="3" />
                <ellipse cx="325" cy="157" rx="50" ry="10" fill="#FFF8E1" stroke="#3E2723" strokeWidth="2" />

                <g transform={`translate(325, 152)`}>
                  <svg width="15" height="10" viewBox="0 0 50 40">
                    <defs>
                      <linearGradient id="finalCoinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFD700" />
                        <stop offset="100%" stopColor="#FFA500" />
                      </linearGradient>
                    </defs>

                    {Array.from({ length: 5 }).map((_, coinIndex) => {
                      const yPosition = 30 - (coinIndex + 1) * 6;

                      return (
                        <g key={`final-coin-${coinIndex}`} transform={`translate(0, ${yPosition})`}>
                          <path
                            d="M5,8 C5,3.5 15,0 25,0 C35,0 45,3.5 45,8 L45,12 C45,16.5 35,20 25,20 C15,20 5,16.5 5,12 Z"
                            fill="url(#finalCoinGradient)"
                            stroke="#B8860B"
                            strokeWidth="0.5"
                          />
                          <ellipse
                            cx="25"
                            cy="8"
                            rx="20"
                            ry="7"
                            fill="url(#finalCoinGradient)"
                            stroke="#B8860B"
                            strokeWidth="0.5"
                          />
                        </g>
                      );
                    })}
                  </svg>
                </g>
              </g>
            </g>

            <ellipse cx="250" cy="260" rx="150" ry="7" fill="rgba(0, 0, 0, 0.2)" />
          </svg>
        </div>

        <div className="flex justify-center mb-6">
          <div
            className="bg-blue-200 text-black p-3 rounded-lg flex items-center gap-x-6 border border-blue-400"
            role="status"
            aria-live="polite"
          >
            <div>
              <strong>{t(TRANSLATION_KEYS.LEFT_PLATE)}</strong> 1 {t(TRANSLATION_KEYS.DATE)}
            </div>
            <div>
              <strong>{t(TRANSLATION_KEYS.RIGHT_PLATE)}</strong> 5 {t(TRANSLATION_KEYS.COINS)}
            </div>
          </div>
        </div>

        <div
          className="bg-green-100 border-2 border-green-500 rounded-lg p-6 mb-4"
          role="region"
          aria-labelledby="solution-heading"
        >
          <h2 id="solution-heading" className="sr-only">
            {t(TRANSLATION_KEYS.FINAL_SOLUTION)}
          </h2>
          <div
            className="flex justify-center items-center gap-4"
            role="group"
            aria-label={t(TRANSLATION_KEYS.FINAL_EQUATION_SOLUTION)}
          >
            <div
              className="w-20 h-20 bg-amber-700 rounded-lg shadow-md flex items-center justify-center text-xl font-bold text-white"
              style={{ fontFamily: 'Besley, serif', fontStyle: 'italic' }}
              aria-label={t(TRANSLATION_KEYS.X_SOLVED_FOR)}
            >
              x
            </div>
            <div className="text-4xl font-bold text-green-800" aria-label={t(TRANSLATION_KEYS.EQUALS)}>
              =
            </div>
            <div
              className="w-20 h-20 bg-amber-600 rounded-lg shadow-md flex items-center justify-center text-xl font-bold text-white"
              aria-label={t(TRANSLATION_KEYS.SOLUTION_5)}
            >
              5
            </div>
          </div>
          <div className="sr-only">{t(TRANSLATION_KEYS.EQUATION_SOLVED_EXPLANATION)}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <div className="bg-white w-full max-w-4xl mb-6">
        <p className="text-center text-amber-800 mb-6 font-bold border rounded-lg border-amber-800 p-2">
          <span style={{ fontFamily: 'Besley, serif', fontStyle: 'italic' }}>x</span> ={' '}
          {t(TRANSLATION_KEYS.ONE_DATE)}
        </p>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}

        {(errorMessage || successMessage) && (
          <div
            className={`mb-4 p-3 rounded-lg text-center ${successMessage ? 'bg-green-100 border border-green-500 text-green-800' : 'bg-red-200 border border-red-400 text-black'}`}
            role="alert"
            aria-live="assertive"
          >
            {successMessage || errorMessage}
          </div>
        )}

        <div ref={liveRegionRef} className="sr-only" aria-live="polite" aria-atomic="true"></div>
        <div ref={statusRegionRef} className="sr-only" aria-live="assertive" aria-atomic="true"></div>
      </div>
    </div>
  );
};

export default EquationBuilder;
