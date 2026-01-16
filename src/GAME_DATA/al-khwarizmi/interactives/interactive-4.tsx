/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import interactive4Config from '../configs/interactive-4';
import { useEventListener } from '../../../hooks/useEventListener';
import { useGameContext } from '../../../hooks/useGameContext';

// Add this interface after other interfaces
interface TooltipState {
  visible: boolean;
  text: string;
  x: number;
  y: number;
}

interface DisplayFlags {
  showBaghdadProfitBuilder?: boolean;
  showDamascusProfitBuilder?: boolean;
  showTotalProfitBuilder?: boolean;
}

interface Payload {
  step: number;
  target: string;
  disabled?: string;
  displayFlags?: DisplayFlags;
}

const ProfitOptimizer = ({
  onInteraction,
}: {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}) => {
  const { dialogIndex } = useGameContext();
  const isFirstIndex = dialogIndex === 1;
  // Current step (now 5 steps)
  const [currentStep, setCurrentStep] = useState(isFirstIndex ? 1 : 4);

  // State for formulas and equations
  const [baghdadProfitFormula, setBaghdadProfitFormula] = useState<(string | null)[]>([null, '*', null]);
  const [damascusProfitFormula, setDamascusProfitFormula] = useState<(string | null)[]>([null, '*', null]);
  const [totalProfitEquation, setTotalProfitEquation] = useState<(string | null)[]>([
    'P(x)',
    '=',
    '10x',
    '+',
    null,
    null,
  ]);
  const [expandedResult, setExpandedResult] = useState<(string | null)[]>([null, '+', null, '-', null]);
  const [finalResult, setFinalResult] = useState<(string | null)[]>([null, '-', null]);
  const [simplificationSubStep, setSimplificationSubStep] = useState(1); // 1 or 2

  // Error and success messages
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Add step completion tracking states
  const [step1Completed, setStep1Completed] = useState(false);
  const [step2Completed, setStep2Completed] = useState(false);
  const [step3Completed, setStep3Completed] = useState(false);
  const [step4Part1Completed, setStep4Part1Completed] = useState(false);
  const [step4Part2Completed, setStep4Part2Completed] = useState(false);

  // Add this state after other state declarations
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    text: '',
    x: 0,
    y: 0,
  });

  const { t } = useTranslations();

  const { payload } = useEventListener('interactive-4');

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      const newStep = payload.step as number;
      if (newStep !== currentStep || currentStep === 4) {
        // For step 4, check if simplificationSubStep is provided
        if (newStep === 4 && 'simplificationSubStep' in payload) {
          moveToNewStep(newStep, payload.simplificationSubStep as number);
        } else {
          // For other steps, use default simplificationSubStep of 1
          moveToNewStep(newStep, 1);
        }
      }
    }
  }, [payload]);

  const moveToNewStep = (newStep: number, newSimplificationSubStep: number = 1) => {
    setCurrentStep(newStep);
    setErrorMessage('');
    setSuccessMessage('');

    // Reset all state variables to start fresh
    if (newStep <= 1) {
      // Reset step 1 specific state variables
      setBaghdadProfitFormula([null, '*', null] as (string | null)[]);
      setDamascusProfitFormula([null, '*', null] as (string | null)[]);
    } else if (newStep <= 2) {
      // Reset step 2 specific state variables
      setTotalProfitEquation(['P(x)', '=', null, '+', null, null] as (string | null)[]);
      setExpandedResult([null, '+', null, '-', null] as (string | null)[]);
    } else if (newStep <= 3) {
      // Reset step 3 specific state variables
      setFinalResult([null, '-', null] as (string | null)[]);
    } else if (newStep === 4) {
      // For step 4, we need to handle the simplification substeps
      if (newSimplificationSubStep === 1) {
        // First substep: Show expanded form
        setExpandedResult([null, '+', null, '-', null] as (string | null)[]);
        setFinalResult([null, '-', null] as (string | null)[]);
      } else {
        // Second substep: Show simplified form
        setFinalResult([null, '-', null] as (string | null)[]);
      }
      setSimplificationSubStep(newSimplificationSubStep);
    }
  };

  // Auto-hide success messages
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

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

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, value: string) => {
    e.dataTransfer.setData('text/plain', value);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle drop for Step 1 (Baghdad profit formula)
  const handleDropStep1 = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    const draggedValue = e.dataTransfer.getData('text/plain');

    const newFormula = [...baghdadProfitFormula] as any[];
    newFormula[position] = draggedValue;
    setBaghdadProfitFormula(newFormula);

    // Check if correct formula is built: 10 * x or x * 10 (multiplication is pre-placed)
    if ((newFormula[0] === '10' && newFormula[2] === 'x') || (newFormula[0] === 'x' && newFormula[2] === '10')) {
      setSuccessMessage(t(interactive4Config.TRANSLATION_KEYS.BAGHDAD_PROFIT_SUCCESS));
      setErrorMessage('');
    } else if (newFormula[0] !== null && newFormula[2] !== null) {
      setErrorMessage(t(interactive4Config.TRANSLATION_KEYS.BAGHDAD_PROFIT_ERROR));
    }
  };

  // Handle drop for Step 2 (Damascus profit formula)
  const handleDropStep2 = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    const draggedValue = e.dataTransfer.getData('text/plain');

    const newFormula = [...damascusProfitFormula] as any[];
    newFormula[position] = draggedValue;
    setDamascusProfitFormula(newFormula);

    // Check if correct formula: (100-x) * 16 or 16 * (100-x) (multiplication is pre-placed)
    if (
      (newFormula[0] === '(100-x)' && newFormula[2] === '16') ||
      (newFormula[0] === '16' && newFormula[2] === '(100-x)')
    ) {
      setSuccessMessage(t(interactive4Config.TRANSLATION_KEYS.DAMASCUS_PROFIT_SUCCESS));
      setErrorMessage('');
    } else if (newFormula[0] !== null && newFormula[2] !== null) {
      setErrorMessage(t(interactive4Config.TRANSLATION_KEYS.DAMASCUS_PROFIT_ERROR));
    }
  };

  // Handle drop for Step 3 (Total profit equation)
  const handleDropStep3 = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    const draggedValue = e.dataTransfer.getData('text/plain');

    const newEquation = [...totalProfitEquation];
    newEquation[position] = draggedValue;
    setTotalProfitEquation(newEquation);

    // Check if correct equation: P(x) = 10x + 16(100-x) or P(x) = 10x + (100-x)16 (+ is pre-placed)
    if (
      (newEquation[2] === '10x' &&
        newEquation[3] === '+' &&
        newEquation[4] === '16' &&
        newEquation[5] === '(100-x)') ||
      (newEquation[2] === '10x' &&
        newEquation[3] === '+' &&
        newEquation[4] === '(100-x)' &&
        newEquation[5] === '16')
    ) {
      setSuccessMessage(t(interactive4Config.TRANSLATION_KEYS.TOTAL_PROFIT_SUCCESS));
      setErrorMessage('');
    } else if (newEquation.slice(2).every((item) => item !== null)) {
      setErrorMessage(t(interactive4Config.TRANSLATION_KEYS.TOTAL_PROFIT_ERROR));
    }
  };

  // Handle drop for Step 4.1 (Expansion)
  const handleDropStep4_1 = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    const draggedValue = e.dataTransfer.getData('text/plain');

    const newResult = [...expandedResult];
    newResult[position] = draggedValue;
    setExpandedResult(newResult);

    // Check if correct expansion: 10x + 1600 - 16x (+ and - are pre-placed)
    // Only accept valid combinations: 10x + 1600 - 16x or 1600 + 10x - 16x
    if (
      (newResult[0] === '10x' &&
        newResult[1] === '+' &&
        newResult[2] === '1600' &&
        newResult[3] === '-' &&
        newResult[4] === '16x') ||
      (newResult[0] === '1600' &&
        newResult[1] === '+' &&
        newResult[2] === '10x' &&
        newResult[3] === '-' &&
        newResult[4] === '16x')
    ) {
      setSuccessMessage(t(interactive4Config.TRANSLATION_KEYS.EXPANSION_SUCCESS));
      setErrorMessage('');
    } else if (newResult[0] !== null && newResult[2] !== null && newResult[4] !== null) {
      setErrorMessage(t(interactive4Config.TRANSLATION_KEYS.EXPANSION_ERROR));
    }
  };

  // Handle drop for Step 4.2 (Final simplification)
  const handleDropStep4_2 = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    const draggedValue = e.dataTransfer.getData('text/plain');

    const newResult = [...finalResult];
    newResult[position] = draggedValue;
    setFinalResult(newResult);

    // Check if correct simplification: 1600 - 6x (- is pre-placed)
    // Only accept 1600 - 6x (not 6x - 1600)
    if (newResult[0] === '1600' && newResult[1] === '-' && newResult[2] === '6x') {
      setSuccessMessage(t(interactive4Config.TRANSLATION_KEYS.SIMPLIFICATION_SUCCESS));
      setErrorMessage('');
    } else if (newResult[0] !== null && newResult[2] !== null) {
      setErrorMessage(t(interactive4Config.TRANSLATION_KEYS.SIMPLIFICATION_ERROR));
    }
  };

  // Reset functions for each step
  const resetStep1 = () => {
    setBaghdadProfitFormula([null, '*', null]);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const resetStep2 = () => {
    setDamascusProfitFormula([null, '*', null]);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const resetStep3 = () => {
    setTotalProfitEquation(['P(x)', '=', null, '+', null, null]);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const resetStep4SubStep1 = () => {
    setExpandedResult([null, '+', null, '-', null]);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const resetStep4SubStep2 = () => {
    setFinalResult([null, '-', null]);
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Check if current step is complete
  const isStepComplete = useCallback(() => {
    switch (currentStep) {
      case 1:
        return (
          (baghdadProfitFormula[0] === '10' && baghdadProfitFormula[2] === 'x') ||
          (baghdadProfitFormula[0] === 'x' && baghdadProfitFormula[2] === '10')
        );
      case 2:
        return (
          (damascusProfitFormula[0] === '(100-x)' && damascusProfitFormula[2] === '16') ||
          (damascusProfitFormula[0] === '16' && damascusProfitFormula[2] === '(100-x)')
        );
      case 3:
        return (
          (totalProfitEquation[2] === '10x' &&
            totalProfitEquation[3] === '+' &&
            totalProfitEquation[4] === '16' &&
            totalProfitEquation[5] === '(100-x)') ||
          (totalProfitEquation[2] === '10x' &&
            totalProfitEquation[3] === '+' &&
            totalProfitEquation[4] === '(100-x)' &&
            totalProfitEquation[5] === '16')
        );
      case 4:
        if (simplificationSubStep === 1) {
          return (
            (expandedResult[0] === '10x' &&
              expandedResult[1] === '+' &&
              expandedResult[2] === '1600' &&
              expandedResult[3] === '-' &&
              expandedResult[4] === '16x') ||
            (expandedResult[0] === '1600' &&
              expandedResult[1] === '+' &&
              expandedResult[2] === '10x' &&
              expandedResult[3] === '-' &&
              expandedResult[4] === '16x')
          );
        } else if (simplificationSubStep === 2) {
          return finalResult[0] === '1600' && finalResult[1] === '-' && finalResult[2] === '6x';
        }
        return false;
      case 5:
        return true; // Step 5 is just display, always complete
      default:
        return false;
    }
  }, [
    currentStep,
    simplificationSubStep,
    baghdadProfitFormula,
    damascusProfitFormula,
    totalProfitEquation,
    expandedResult,
    finalResult,
  ]);

  // Track completion conditions
  useEffect(() => {
    if (isStepComplete() && currentStep === 1) {
      setStep1Completed(true);
    }
    if (isStepComplete() && currentStep === 2) {
      setStep2Completed(true);
    }
    if (isStepComplete() && currentStep === 3) {
      setStep3Completed(true);
    }
    if (isStepComplete() && currentStep === 4 && simplificationSubStep === 1) {
      setStep4Part1Completed(true);
    }
    if (isStepComplete() && currentStep === 4 && simplificationSubStep === 2) {
      setStep4Part2Completed(true);
    }
  }, [
    currentStep,
    simplificationSubStep,
    baghdadProfitFormula,
    damascusProfitFormula,
    totalProfitEquation,
    expandedResult,
    finalResult,
    isStepComplete,
  ]);

  // Notify parent of completion status
  useEffect(() => {
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
  }, [
    currentStep,
    simplificationSubStep,
    step1Completed,
    step2Completed,
    step4Part1Completed,
    step4Part2Completed,
    step3Completed,
    onInteraction,
  ]);

  // Get instructions for current step
  const getInstructions = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <p>{t(interactive4Config.TRANSLATION_KEYS.BUILD_BAGHDAD_PROFIT)}</p>
          </div>
        );
      case 2:
        return (
          <div>
            <p>{t(interactive4Config.TRANSLATION_KEYS.BUILD_DAMASCUS_PROFIT)}</p>
          </div>
        );
      case 3:
        return (
          <div>
            <p>
              <strong>{t(interactive4Config.TRANSLATION_KEYS.AL_KHWARIZMI)}:</strong>{' '}
              {t(interactive4Config.TRANSLATION_KEYS.COMBINE_PROFITS)}
            </p>
          </div>
        );
      case 4:
        if (simplificationSubStep === 1) {
          return (
            <div>
              <p>
                <strong>{t(interactive4Config.TRANSLATION_KEYS.AL_KHWARIZMI)}:</strong>{' '}
                {t(interactive4Config.TRANSLATION_KEYS.EXPAND_EQUATION)}
              </p>
            </div>
          );
        } else {
          return (
            <div>
              <p>
                <strong>{t(interactive4Config.TRANSLATION_KEYS.AL_KHWARIZMI)}:</strong>{' '}
                {t(interactive4Config.TRANSLATION_KEYS.COMBINE_TERMS)}
              </p>
            </div>
          );
        }
      case 5:
        return (
          <div>
            <p>{t(interactive4Config.TRANSLATION_KEYS.FINAL_EQUATION)}</p>
          </div>
        );
      default:
        return <p>{t(interactive4Config.TRANSLATION_KEYS.OPTIMIZE_TRADING)}</p>;
    }
  };

  // Add keyboard handler for draggable elements
  const handleKeyDown = (e: React.KeyboardEvent, value: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Find the first empty slot in the current step
      let emptySlot = -1;
      switch (currentStep) {
        case 1:
          emptySlot = baghdadProfitFormula.findIndex((slot) => slot === null);
          if (emptySlot !== -1) {
            const newFormula = [...baghdadProfitFormula] as any[];
            newFormula[emptySlot] = value;
            setBaghdadProfitFormula(newFormula);
            // Check if correct formula is built
            if (
              (newFormula[0] === '10' && newFormula[2] === 'x') ||
              (newFormula[0] === 'x' && newFormula[2] === '10')
            ) {
              setSuccessMessage(t(interactive4Config.TRANSLATION_KEYS.BAGHDAD_PROFIT_SUCCESS));
              setErrorMessage('');
            } else if (newFormula[0] !== null && newFormula[2] !== null) {
              setErrorMessage(t(interactive4Config.TRANSLATION_KEYS.BAGHDAD_PROFIT_ERROR));
            }
          }
          break;
        case 2:
          emptySlot = damascusProfitFormula.findIndex((slot) => slot === null);
          if (emptySlot !== -1) {
            const newFormula = [...damascusProfitFormula] as any[];
            newFormula[emptySlot] = value;
            setDamascusProfitFormula(newFormula);
            // Check if correct formula
            if (
              (newFormula[0] === '(100-x)' && newFormula[2] === '16') ||
              (newFormula[0] === '16' && newFormula[2] === '(100-x)')
            ) {
              setSuccessMessage(t(interactive4Config.TRANSLATION_KEYS.DAMASCUS_PROFIT_SUCCESS));
              setErrorMessage('');
            } else if (newFormula[0] !== null && newFormula[2] !== null) {
              setErrorMessage(t(interactive4Config.TRANSLATION_KEYS.DAMASCUS_PROFIT_ERROR));
            }
          }
          break;
        case 3:
          emptySlot = totalProfitEquation.findIndex((slot) => slot === null);
          if (emptySlot !== -1) {
            const newEquation = [...totalProfitEquation];
            newEquation[emptySlot] = value;
            setTotalProfitEquation(newEquation);
            // Check if correct equation
            if (
              (newEquation[2] === '10x' &&
                newEquation[3] === '+' &&
                newEquation[4] === '16' &&
                newEquation[5] === '(100-x)') ||
              (newEquation[2] === '10x' &&
                newEquation[3] === '+' &&
                newEquation[4] === '(100-x)' &&
                newEquation[5] === '16')
            ) {
              setSuccessMessage(t(interactive4Config.TRANSLATION_KEYS.TOTAL_PROFIT_SUCCESS));
              setErrorMessage('');
            } else if (newEquation.slice(2).every((item) => item !== null)) {
              setErrorMessage(t(interactive4Config.TRANSLATION_KEYS.TOTAL_PROFIT_ERROR));
            }
          }
          break;
        case 4:
          if (simplificationSubStep === 1) {
            emptySlot = expandedResult.findIndex((slot) => slot === null);
            if (emptySlot !== -1) {
              const newResult = [...expandedResult];
              newResult[emptySlot] = value;
              setExpandedResult(newResult);
              // Check if correct expansion
              if (
                (newResult[0] === '10x' &&
                  newResult[1] === '+' &&
                  newResult[2] === '1600' &&
                  newResult[3] === '-' &&
                  newResult[4] === '16x') ||
                (newResult[0] === '1600' &&
                  newResult[1] === '+' &&
                  newResult[2] === '10x' &&
                  newResult[3] === '-' &&
                  newResult[4] === '16x')
              ) {
                setSuccessMessage(t(interactive4Config.TRANSLATION_KEYS.EXPANSION_SUCCESS));
                setErrorMessage('');
              } else if (newResult[0] !== null && newResult[2] !== null && newResult[4] !== null) {
                setErrorMessage(t(interactive4Config.TRANSLATION_KEYS.EXPANSION_ERROR));
              }
            }
          } else {
            emptySlot = finalResult.findIndex((slot) => slot === null);
            if (emptySlot !== -1) {
              const newResult = [...finalResult];
              newResult[emptySlot] = value;
              setFinalResult(newResult);
              // Check if correct simplification
              if (newResult[0] === '1600' && newResult[1] === '-' && newResult[2] === '6x') {
                setSuccessMessage(t(interactive4Config.TRANSLATION_KEYS.SIMPLIFICATION_SUCCESS));
                setErrorMessage('');
              } else if (newResult[0] !== null && newResult[2] !== null) {
                setErrorMessage(t(interactive4Config.TRANSLATION_KEYS.SIMPLIFICATION_ERROR));
              }
            }
          }
          break;
      }
    }
  };

  // Add click handler for draggable elements
  const handleClick = (value: string) => {
    // Find the first empty slot in the current step
    let emptySlot = -1;
    switch (currentStep) {
      case 1:
        emptySlot = baghdadProfitFormula.findIndex((slot) => slot === null);
        if (emptySlot !== -1) {
          const newFormula = [...baghdadProfitFormula] as any[];
          newFormula[emptySlot] = value;
          setBaghdadProfitFormula(newFormula);
          // Check if correct formula is built
          if (
            (newFormula[0] === '10' && newFormula[2] === 'x') ||
            (newFormula[0] === 'x' && newFormula[2] === '10')
          ) {
            setSuccessMessage(t(interactive4Config.TRANSLATION_KEYS.BAGHDAD_PROFIT_SUCCESS));
            setErrorMessage('');
          } else if (newFormula[0] !== null && newFormula[2] !== null) {
            setErrorMessage(t(interactive4Config.TRANSLATION_KEYS.BAGHDAD_PROFIT_ERROR));
          }
        }
        break;
      case 2:
        emptySlot = damascusProfitFormula.findIndex((slot) => slot === null);
        if (emptySlot !== -1) {
          const newFormula = [...damascusProfitFormula] as any[];
          newFormula[emptySlot] = value;
          setDamascusProfitFormula(newFormula);
          // Check if correct formula
          if (
            (newFormula[0] === '(100-x)' && newFormula[2] === '16') ||
            (newFormula[0] === '16' && newFormula[2] === '(100-x)')
          ) {
            setSuccessMessage(t(interactive4Config.TRANSLATION_KEYS.DAMASCUS_PROFIT_SUCCESS));
            setErrorMessage('');
          } else if (newFormula[0] !== null && newFormula[2] !== null) {
            setErrorMessage(t(interactive4Config.TRANSLATION_KEYS.DAMASCUS_PROFIT_ERROR));
          }
        }
        break;
      case 3:
        emptySlot = totalProfitEquation.findIndex((slot) => slot === null);
        if (emptySlot !== -1) {
          const newEquation = [...totalProfitEquation];
          newEquation[emptySlot] = value;
          setTotalProfitEquation(newEquation);
          // Check if correct equation
          if (
            (newEquation[2] === '10x' &&
              newEquation[3] === '+' &&
              newEquation[4] === '16' &&
              newEquation[5] === '(100-x)') ||
            (newEquation[2] === '10x' &&
              newEquation[3] === '+' &&
              newEquation[4] === '(100-x)' &&
              newEquation[5] === '16')
          ) {
            setSuccessMessage(t(interactive4Config.TRANSLATION_KEYS.TOTAL_PROFIT_SUCCESS));
            setErrorMessage('');
          } else if (newEquation.slice(2).every((item) => item !== null)) {
            setErrorMessage(t(interactive4Config.TRANSLATION_KEYS.TOTAL_PROFIT_ERROR));
          }
        }
        break;
      case 4:
        if (simplificationSubStep === 1) {
          emptySlot = expandedResult.findIndex((slot) => slot === null);
          if (emptySlot !== -1) {
            const newResult = [...expandedResult];
            newResult[emptySlot] = value;
            setExpandedResult(newResult);
            // Check if correct expansion
            if (
              (newResult[0] === '10x' &&
                newResult[1] === '+' &&
                newResult[2] === '1600' &&
                newResult[3] === '-' &&
                newResult[4] === '16x') ||
              (newResult[0] === '1600' &&
                newResult[1] === '+' &&
                newResult[2] === '10x' &&
                newResult[3] === '-' &&
                newResult[4] === '16x')
            ) {
              setSuccessMessage(t(interactive4Config.TRANSLATION_KEYS.EXPANSION_SUCCESS));
              setErrorMessage('');
            } else if (newResult[0] !== null && newResult[2] !== null && newResult[4] !== null) {
              setErrorMessage(t(interactive4Config.TRANSLATION_KEYS.EXPANSION_ERROR));
            }
          }
        } else {
          emptySlot = finalResult.findIndex((slot) => slot === null);
          if (emptySlot !== -1) {
            const newResult = [...finalResult];
            newResult[emptySlot] = value;
            setFinalResult(newResult);
            // Check if correct simplification
            if (newResult[0] === '1600' && newResult[1] === '-' && newResult[2] === '6x') {
              setSuccessMessage(t(interactive4Config.TRANSLATION_KEYS.SIMPLIFICATION_SUCCESS));
              setErrorMessage('');
            } else if (newResult[0] !== null && newResult[2] !== null) {
              setErrorMessage(t(interactive4Config.TRANSLATION_KEYS.SIMPLIFICATION_ERROR));
            }
          }
        }
        break;
    }
  };

  // Modify the draggable button component to include click handling
  const DraggableButton = ({
    value,
    className,
    ariaLabel,
  }: {
    value: string;
    className: string;
    stepDescription: string;
    ariaLabel?: string;
  }) => (
    <div
      className={`${className} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
      draggable={true}
      onDragStart={(e) => handleDragStart(e, value)}
      onKeyDown={(e) => handleKeyDown(e, value)}
      onClick={() => handleClick(value)}
      tabIndex={0}
      role="button"
      aria-label={`${ariaLabel ?? value}. ${t(interactive4Config.TRANSLATION_KEYS.DROP_INSTRUCTIONS)}`}
      aria-grabbed="false"
    >
      {value}
    </div>
  );

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return getDisplayFlag(payload as Payload, 'showBaghdadProfitBuilder') ? (
          <div
            className="space-y-6"
            role="region"
            aria-label={t(interactive4Config.TRANSLATION_KEYS.BAGHDAD_PROFIT_REGION)}
          >
            <div className="border-2 border-[#0066CC] rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-center text-[#003366]" id="baghdad-heading">
                {t(interactive4Config.TRANSLATION_KEYS.BAGHDAD_PROFIT_FORMULA)}
              </h3>
              <div
                className="flex justify-center items-center gap-4 mb-6"
                role="group"
                aria-labelledby="baghdad-heading"
              >
                <div className="text-lg font-bold">
                  {t(interactive4Config.TRANSLATION_KEYS.BAGHDAD_PROFIT_EQUALS)}
                </div>
                <div
                  className="w-16 h-16 border-2 border-[#0066CC] rounded-lg flex items-center justify-center text-2xl font-bold bg-white font-besley italic"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropStep1(e, 0)}
                  role="textbox"
                  aria-label={`${t(interactive4Config.TRANSLATION_KEYS.FIRST_VALUE_SLOT)} - ${baghdadProfitFormula[0] || t(interactive4Config.TRANSLATION_KEYS.EMPTY)}. ${t(interactive4Config.TRANSLATION_KEYS.DROP_INSTRUCTIONS)}`}
                  aria-readonly="true"
                  tabIndex={0}
                >
                  {baghdadProfitFormula[0]}
                </div>
                <div
                  className="w-16 h-16 bg-[#0066CC] rounded-lg flex items-center justify-center text-2xl font-bold text-white hover:bg-[#0055AA] active:bg-[#0055AA] touch-action-manipulation cursor-help transition-colors duration-200"
                  role="button"
                  aria-label={t('scenes.S21.S21_D0_F100_C9.multiplication_symbol')}
                  onMouseEnter={(e) => showTooltip(t('scenes.S21.S21_D0_F100_C9.multiplication_symbol'), e)}
                  onMouseLeave={hideTooltip}
                  onClick={(e) => showTooltip(t('scenes.S21.S21_D0_F100_C9.multiplication_symbol'), e)}
                  onTouchStart={(e) => {
                    e.currentTarget.classList.add('bg-[#0055AA]');
                    showTooltip(t('scenes.S21.S21_D0_F100_C9.multiplication_symbol'), e);
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.classList.remove('bg-[#0055AA]');
                    setTimeout(hideTooltip, 1500);
                  }}
                >
                  *
                </div>
                <div
                  className="w-16 h-16 border-2 border-[#0066CC] rounded-lg flex items-center justify-center text-2xl font-bold bg-white font-besley italic"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropStep1(e, 2)}
                  role="textbox"
                  aria-label={`${t(interactive4Config.TRANSLATION_KEYS.SECOND_VALUE_SLOT)} - ${baghdadProfitFormula[2] || t(interactive4Config.TRANSLATION_KEYS.EMPTY)}. ${t(interactive4Config.TRANSLATION_KEYS.DROP_INSTRUCTIONS)}`}
                  aria-readonly="true"
                  tabIndex={0}
                >
                  {baghdadProfitFormula[2]}
                </div>
              </div>

              <div
                className="flex justify-center gap-4 mb-6"
                role="group"
                aria-label={t(interactive4Config.TRANSLATION_KEYS.AVAILABLE_VALUES)}
              >
                <DraggableButton
                  value="10"
                  className="w-16 h-16 bg-[#B22222] rounded-lg shadow-md flex items-center justify-center text-2xl font-bold text-white cursor-grab active:cursor-grabbing hover:bg-[#8B0000] font-besley italic"
                  stepDescription={t(interactive4Config.TRANSLATION_KEYS.PROFIT_PER_POUND_BAGHDAD)}
                />
                <DraggableButton
                  value="x"
                  className="w-16 h-16 bg-[#B22222] rounded-lg shadow-md flex items-center justify-center text-2xl font-bold text-white cursor-grab active:cursor-grabbing hover:bg-[#8B0000] font-besley italic"
                  stepDescription={t(interactive4Config.TRANSLATION_KEYS.POUNDS_SOLD_BAGHDAD)}
                />
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg"
                  onClick={resetStep1}
                  aria-label={t(interactive4Config.TRANSLATION_KEYS.RESET_BAGHDAD_FORMULA)}
                >
                  {t(interactive4Config.TRANSLATION_KEYS.RESET)}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="border-2 border-blue-800 rounded-lg p-4">
            <div className="text-center text-blue-800 font-bold">
              {t(interactive4Config.TRANSLATION_KEYS.BAGHDAD_PROFIT_FORMULA)} :{' '}
              <span className="font-besley italic font-bold">10x</span>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Show previous step result */}
            <div className="border-2 border-blue-800 rounded-lg p-4">
              <div className="text-center text-blue-800 font-bold">
                {t(interactive4Config.TRANSLATION_KEYS.BAGHDAD_PROFIT_FORMULA)} :{' '}
                <span className="font-besley italic font-bold">10x</span>
              </div>
            </div>

            {/* Damascus Profit Formula */}
            {getDisplayFlag(payload as Payload, 'showDamascusProfitBuilder') && (
              <div className="border-2 border-[#4B0082] rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-center text-[#2E0854]">
                  {t(interactive4Config.TRANSLATION_KEYS.DAMASCUS_PROFIT_FORMULA)}
                </h3>

                <p className="text-center text-md mb-4">
                  {t(interactive4Config.TRANSLATION_KEYS.DAMASCUS_PROFIT_FORMULA_DISPLAY)}
                </p>

                <div className="flex justify-center items-center gap-4 mb-6">
                  <div className="text-lg font-bold">
                    {t(interactive4Config.TRANSLATION_KEYS.DAMASCUS_PROFIT_EQUALS)}
                  </div>
                  <div
                    className="w-24 h-16 border-2 border-purple-600 rounded-lg flex items-center justify-center text-lg font-bold bg-white font-besley italic"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDropStep2(e, 0)}
                    role="textbox"
                    aria-label={t(interactive4Config.TRANSLATION_KEYS.DROP_ZONE_FIRST_VALUE)}
                  >
                    {damascusProfitFormula[0]}
                  </div>
                  <div
                    className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center text-2xl font-bold text-white hover:bg-purple-500 active:bg-purple-500 touch-action-manipulation cursor-help transition-colors duration-200"
                    role="button"
                    aria-label={t('scenes.S21.S21_D0_F100_C9.multiplication_symbol')}
                    onMouseEnter={(e) => showTooltip(t('scenes.S21.S21_D0_F100_C9.multiplication_symbol'), e)}
                    onMouseLeave={hideTooltip}
                    onClick={(e) => showTooltip(t('scenes.S21.S21_D0_F100_C9.multiplication_symbol'), e)}
                    onTouchStart={(e) => {
                      e.currentTarget.classList.add('bg-purple-500');
                      showTooltip(t('scenes.S21.S21_D0_F100_C9.multiplication_symbol'), e);
                    }}
                    onTouchEnd={(e) => {
                      e.currentTarget.classList.remove('bg-purple-500');
                      setTimeout(hideTooltip, 1500);
                    }}
                  >
                    *
                  </div>
                  <div
                    className="w-16 h-16 border-2 border-purple-600 rounded-lg flex items-center justify-center text-2xl font-bold bg-white font-besley italic"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDropStep2(e, 2)}
                    role="textbox"
                    aria-label={t(interactive4Config.TRANSLATION_KEYS.DROP_ZONE_SECOND_VALUE)}
                  >
                    {damascusProfitFormula[2]}
                  </div>
                </div>

                <div className="flex justify-center gap-4 mb-4">
                  <DraggableButton
                    value="(100-x)"
                    className="w-24 h-16 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-900 font-besley italic"
                    stepDescription={`(100 - x)`}
                    ariaLabel={t(interactive4Config.TRANSLATION_KEYS.HUNDRED_MINUS_X)}
                  />
                  <DraggableButton
                    value="16"
                    className="w-16 h-16 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-2xl font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-900 font-besley italic"
                    stepDescription={`16`}
                  />
                  <DraggableButton
                    value="x"
                    className="w-16 h-16 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-2xl font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-900 font-besley italic"
                    stepDescription={`x`}
                  />
                  <DraggableButton
                    value="18"
                    className="w-16 h-16 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-2xl font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-900 font-besley italic"
                    stepDescription={`18`}
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg"
                    onClick={resetStep2}
                    aria-label={t(interactive4Config.TRANSLATION_KEYS.RESET_DAMASCUS_FORMULA)}
                  >
                    {t(interactive4Config.TRANSLATION_KEYS.RESET)}
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Show previous steps results */}
            <div className="flex gap-4 justify-center flex-wrap">
              <div className="border-2 border-blue-800 rounded-lg p-4 flex-1 min-w-fit">
                <div className="text-center text-blue-800 font-bold">
                  {t(interactive4Config.TRANSLATION_KEYS.BAGHDAD_PROFIT_FORMULA)} :{' '}
                  <span className="font-besley italic font-bold">10x</span>
                </div>
              </div>
              <div className="border-2 border-purple-800 rounded-lg p-4 flex-1 min-w-fit">
                <div className="text-center text-purple-800 font-bold">
                  {t(interactive4Config.TRANSLATION_KEYS.DAMASCUS_PROFIT_FORMULA)} :{' '}
                  <span className="font-besley italic font-bold">(100-x)*16</span>
                </div>
              </div>
            </div>
            {getDisplayFlag(payload as Payload, 'showTotalProfitBuilder') && (
              <div className="border-2 border-[#8B0000] rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-center text-[#4B0000]">
                  {t(interactive4Config.TRANSLATION_KEYS.TOTAL_PROFIT_EQUATION)}
                </h3>

                <div className="flex justify-center items-center gap-2 mb-6 flex-wrap">
                  <div className="w-16 h-12 bg-red-600 rounded-lg flex items-center justify-center text-md font-bold text-white font-besley italic">
                    P(x)
                  </div>
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-xl font-bold text-white">
                    =
                  </div>
                  <div
                    className="w-16 h-12 border-2 border-red-600 rounded-lg flex items-center justify-center text-lg font-bold bg-white font-besley italic"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDropStep3(e, 2)}
                    role="textbox"
                    aria-label={t(interactive4Config.TRANSLATION_KEYS.DROP_ZONE_FIRST_VALUE)}
                  >
                    {totalProfitEquation[2]}
                  </div>
                  <div
                    className="w-12 h-12 border-2 border-red-600 rounded-lg flex items-center justify-center text-xl font-bold bg-white font-besley italic"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDropStep3(e, 3)}
                    role="textbox"
                    aria-label={t(interactive4Config.TRANSLATION_KEYS.DROP_ZONE_SECOND_VALUE)}
                  >
                    {totalProfitEquation[3]}
                  </div>
                  <div
                    className="w-16 h-12 border-2 border-red-600 rounded-lg flex items-center justify-center text-xl font-bold bg-white font-besley italic"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDropStep3(e, 4)}
                    role="textbox"
                    aria-label={t(interactive4Config.TRANSLATION_KEYS.DROP_ZONE_THIRD_VALUE)}
                  >
                    {totalProfitEquation[4]}
                  </div>
                  <div
                    className="w-24 h-12 border-2 border-red-600 rounded-lg flex items-center justify-center text-md font-bold bg-white font-besley italic"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDropStep3(e, 5)}
                    role="textbox"
                    aria-label={t(interactive4Config.TRANSLATION_KEYS.DROP_ZONE_FOURTH_VALUE)}
                  >
                    {totalProfitEquation[5]}
                  </div>
                </div>

                <div className="flex justify-center gap-2 flex-wrap mb-4">
                  <DraggableButton
                    value="10x"
                    className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-900 font-besley italic"
                    stepDescription="10x"
                  />
                  <DraggableButton
                    value="16"
                    className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-xl font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-900 font-besley italic"
                    stepDescription="16"
                  />
                  <DraggableButton
                    value="(100-x)"
                    className="w-24 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-md font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-900 font-besley italic"
                    stepDescription="100-x"
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg"
                    onClick={resetStep3}
                    aria-label={t(interactive4Config.TRANSLATION_KEYS.RESET_TOTAL_PROFIT_EQUATION)}
                  >
                    {t(interactive4Config.TRANSLATION_KEYS.RESET)}
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="border-2 border-[#006400] rounded-lg p-6">
              <h3 className="text-xl font-bold mb-6 text-center text-[#004D00]">
                {t(interactive4Config.TRANSLATION_KEYS.STEP_4)} -{' '}
                {t(interactive4Config.TRANSLATION_KEYS.SIMPLIFYING_FUNCTION)}
              </h3>

              {/* Show the progression */}
              <div className="space-y-4 mb-6">
                {/* Original equation - always visible */}
                <div className="bg-white p-3 rounded-lg border-2 border-gray-300">
                  <div className="text-xl font-mono text-center">
                    <span className="font-besley italic font-bold">P(x)</span> ={' '}
                    <span className="font-besley italic font-bold">10x + 16(100-x)</span>
                  </div>
                </div>

                {/* Step 4.1: Expansion */}
                {simplificationSubStep === 1 && (
                  <div>
                    <div className="text-lg font-bold text-center mb-4">
                      {t(interactive4Config.TRANSLATION_KEYS.FIRST)}{' '}
                      {t(interactive4Config.TRANSLATION_KEYS.EXPAND_EQUATION)}:
                    </div>
                    <div className="flex justify-center items-center gap-4 mb-6">
                      <div className="text-lg">
                        <span className="font-besley italic font-bold">P(x)</span> =
                      </div>
                      <div
                        className="w-16 h-12 border-2 border-yellow-800 rounded-lg flex items-center justify-center text-lg font-bold bg-white font-besley italic"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDropStep4_1(e, 0)}
                        role="textbox"
                        aria-label={t(interactive4Config.TRANSLATION_KEYS.DROP_ZONE_FIRST_VALUE)}
                      >
                        {expandedResult[0]}
                      </div>
                      <div className="w-12 h-12 bg-yellow-800 rounded-lg flex items-center justify-center text-xl font-bold text-white">
                        +
                      </div>
                      <div
                        className="w-20 h-12 border-2 border-yellow-800 rounded-lg flex items-center justify-center text-lg font-bold bg-white font-besley italic"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDropStep4_1(e, 2)}
                        role="textbox"
                        aria-label={t(interactive4Config.TRANSLATION_KEYS.DROP_ZONE_SECOND_VALUE)}
                      >
                        {expandedResult[2]}
                      </div>
                      <div className="w-12 h-12 bg-yellow-800 rounded-lg flex items-center justify-center text-xl font-bold text-white">
                        -
                      </div>
                      <div
                        className="w-16 h-12 border-2 border-yellow-800 rounded-lg flex items-center justify-center text-lg font-bold bg-white font-besley italic"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDropStep4_1(e, 4)}
                        role="textbox"
                        aria-label={t(interactive4Config.TRANSLATION_KEYS.DROP_ZONE_THIRD_VALUE)}
                      >
                        {expandedResult[4]}
                      </div>
                    </div>

                    <div className="flex justify-center gap-4">
                      <DraggableButton
                        value="10x"
                        className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-900 font-besley italic"
                        stepDescription="10x"
                      />
                      <DraggableButton
                        value="16x"
                        className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-900 font-besley italic"
                        stepDescription="16x"
                      />
                      <DraggableButton
                        value="1600"
                        className="w-20 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-900 font-besley italic"
                        stepDescription="1600"
                      />
                    </div>
                  </div>
                )}

                {/* Step 4.2: Final combination */}
                {simplificationSubStep === 2 && (
                  <div>
                    <div className="p-3 rounded-lg border-2 border-green-800 mb-4">
                      <div className="text-xl font-mono text-center">
                        <span className="font-besley italic font-bold">P(x)</span> ={' '}
                        <span className="font-besley italic font-bold">10x + 1600 - 16x</span>
                      </div>
                    </div>

                    <div className="text-lg font-bold text-center mb-4">
                      {t(interactive4Config.TRANSLATION_KEYS.NOW)}{' '}
                      {t(interactive4Config.TRANSLATION_KEYS.COMBINE_LIKE_TERMS)} (10x - 16x = -6x):
                    </div>
                    <div className="flex justify-center items-center gap-4 mb-6">
                      <div className="text-lg">
                        <span className="font-besley italic font-bold">P(x)</span> =
                      </div>
                      <div
                        className="w-20 h-12 border-2 border-yellow-800 rounded-lg flex items-center justify-center text-lg font-bold bg-white font-besley italic"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDropStep4_2(e, 0)}
                        role="textbox"
                        aria-label={t(interactive4Config.TRANSLATION_KEYS.DROP_ZONE_FIRST_VALUE)}
                      >
                        {finalResult[0]}
                      </div>
                      <div className="w-12 h-12 bg-yellow-800 rounded-lg flex items-center justify-center text-xl font-bold text-white">
                        -
                      </div>
                      <div
                        className="w-16 h-12 border-2 border-yellow-800 rounded-lg flex items-center justify-center text-lg font-bold bg-white font-besley italic"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDropStep4_2(e, 2)}
                        role="textbox"
                        aria-label={t(interactive4Config.TRANSLATION_KEYS.DROP_ZONE_SECOND_VALUE)}
                      >
                        {finalResult[2]}
                      </div>
                    </div>

                    <div className="flex justify-center gap-4">
                      <DraggableButton
                        value="1600"
                        className="w-20 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-900 font-besley italic"
                        stepDescription="1600"
                      />
                      <DraggableButton
                        value="6x"
                        className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-900 font-besley italic"
                        stepDescription="6x"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg"
                  onClick={simplificationSubStep === 1 ? resetStep4SubStep1 : resetStep4SubStep2}
                  aria-label={t(interactive4Config.TRANSLATION_KEYS.RESET_SIMPLIFICATION)}
                >
                  {t(interactive4Config.TRANSLATION_KEYS.RESET)}
                </button>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="border-2 border-[#006400] rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-8 text-center text-[#004D00]">
                {t(interactive4Config.TRANSLATION_KEYS.FINAL_SIMPLIFIED_EQUATION)}
              </h3>

              <div className="flex justify-center items-center gap-4">
                <div className="w-20 h-16 bg-green-700 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white font-besley italic">
                  P(x)
                </div>
                <div className="w-16 h-16 bg-green-700 rounded-lg shadow-md flex items-center justify-center text-2xl font-bold text-white">
                  =
                </div>
                <div className="w-20 h-16 bg-green-700 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white font-besley italic">
                  1600
                </div>
                <div
                  className="w-16 h-16 bg-green-700 rounded-lg shadow-md flex items-center justify-center text-2xl font-bold text-white"
                  aria-label={t(interactive4Config.TRANSLATION_KEYS.MINUS)}
                >
                  -
                </div>
                <div className="w-20 h-16 bg-green-700 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white font-besley italic">
                  6x
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Loading...</div>;
    }
  };

  // Add these handler functions after other handler declarations
  const showTooltip = (text: string, event: React.MouseEvent | React.TouchEvent) => {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    setTooltip({
      visible: true,
      text,
      x: rect.left + rect.width / 2,
      y: rect.bottom + 5,
    });
  };

  const hideTooltip = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen"
      role="main"
      aria-label={t(interactive4Config.TRANSLATION_KEYS.PROFIT_OPTIMIZER)}
    >
      {/* Main Interactive Card */}
      <div
        className="bg-white p-6 w-full max-w-4xl mb-2"
        role="region"
        aria-label={t(interactive4Config.TRANSLATION_KEYS.INTERACTIVE_AREA)}
      >
        <p className="text-center text-amber-800 mb-6 font-bold border rounded-lg border-amber-800 p-2">
          <span style={{ fontFamily: 'Besley, serif', fontStyle: 'italic' }}>x</span> ={' '}
          {t(interactive4Config.TRANSLATION_KEYS.POUNDS_SOLD_IN_BAGHDAD)}
        </p>
        {renderStepContent()}

        {/* Feedback messages */}
        {(errorMessage || successMessage) && (
          <div
            className={`mt-4 p-3 rounded-lg text-center ${successMessage ? 'border border-green-500 text-green-800' : 'bg-red-100 border border-red-300 text-red-800'}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            {successMessage || errorMessage}
          </div>
        )}
      </div>

      {/* Hidden live region for step changes */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {`${t(interactive4Config.TRANSLATION_KEYS.STEP)} ${currentStep} ${t(interactive4Config.TRANSLATION_KEYS.OF_5)}: ${getInstructions()?.props?.children?.props?.children}`}
      </div>

      {/* Add the tooltip component at the end of the main return statement, before the closing div */}
      <div
        className={`fixed z-50 bg-black text-white px-3 py-2 rounded-lg text-sm transform -translate-x-1/2 transition-opacity duration-200 ${tooltip.visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{
          left: `${tooltip.x}px`,
          top: `${tooltip.y}px`,
        }}
        role="tooltip"
      >
        {tooltip.text}
      </div>
    </div>
  );
};

export default ProfitOptimizer;
