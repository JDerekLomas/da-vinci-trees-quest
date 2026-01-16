import { useState, useEffect, DragEvent, KeyboardEvent, useCallback } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import parse from 'html-react-parser';
import interactive5V1Config from '../configs/interactive-5-v1';
import { useEventListener } from '../../../hooks/useEventListener';
import { useGameContext } from '../../../hooks/useGameContext';

interface DisplayFlags {
  hideStep1Options?: boolean;
  showStep2Options?: boolean;
  showStep3Options?: boolean;
}

interface Payload {
  step: number;
  target: string;
  disabled?: string;
  displayFlags?: DisplayFlags;
}

const CaravanProfitDivision = ({
  onInteraction,
}: {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}) => {
  const { dialogIndex } = useGameContext();
  const isFirstIndex = dialogIndex === 1;
  // Current step (now 5 steps)
  // Get config
  const config = interactive5V1Config;
  const { t } = useTranslations();

  // Current step
  const [currentStep, setCurrentStep] = useState(isFirstIndex ? 1 : 5);

  // Equation only mode - shows only equations without interactive elements
  const [equationOnly, setEquationOnly] = useState(isFirstIndex ? false : true);

  // Substitute flag - shows substitution results (1, 2, 3)
  const [substitute, setSubstitute] = useState<number | null>(null);

  // Step 1: First equation M + L + C = 4500
  const [equation1, setEquation1] = useState([...config.equations.step1.structure]);

  // Step 2: Second equation M = 2 * C
  const [equation2, setEquation2] = useState([...config.equations.step2.structure]);

  // Step 3: Third equation L = C + 500
  const [equation3, setEquation3] = useState([...config.equations.step3.structure]);

  // Step 4: Substitution process
  const [substitutionStep, setSubstitutionStep] = useState(1); // 1, 2, 3, 4, 5
  const [substitution1, setSubstitution1] = useState([...config.substitutionSteps.step1.structure]);
  const [substitution2, setSubstitution2] = useState([...config.substitutionSteps.step2.structure]);
  const [simplified, setSimplified] = useState([...config.substitutionSteps.step3.structure]);
  const [solved, setSolved] = useState([...config.substitutionSteps.step4.structure]);
  const [finalStep, setFinalStep] = useState([...config.substitutionSteps.step5.structure]);
  const [showFinalResult, setShowFinalResult] = useState(false);

  // Error and success messages
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Step completion tracking
  const [step1Completed, setStep1Completed] = useState(false);
  const [step2Completed, setStep2Completed] = useState(false);
  const [step3Completed, setStep3Completed] = useState(false);
  const [step4SubStep1Completed, setStep4SubStep1Completed] = useState(false);
  const [step4SubStep2Completed, setStep4SubStep2Completed] = useState(false);
  const [step4SubStep3Completed, setStep4SubStep3Completed] = useState(false);
  const [step4SubStep4Completed, setStep4SubStep4Completed] = useState(false);
  const [step4SubStep5Completed, setStep4SubStep5Completed] = useState(false);

  const { payload } = useEventListener('interactive-5-v1');

  /**
   * Navigate to a specific step and optionally a substep (for step 4 only).
   * This function preserves the state of all steps, allowing users to navigate
   * between steps while maintaining their progress.
   *
   * @param step - The step to navigate to (1-4)
   * @param subStep - Optional substep for step 4 only (1-5)
   *
   * Features:
   * - Validates step and substep parameters
   * - Preserves all equation and substitution state
   * - Clears error/success messages when navigating
   * - Handles special case of step 4 with 5 substeps
   * - Maintains user progress across navigation
   * - Sets all previous steps/substeps as completed
   */
  const moveToNewStep = useCallback(
    (step: number, subStep?: number) => {
      // Validate step parameter
      if (step < 1 || step > config.steps.totalSteps) {
        console.warn(`Invalid step: ${step}. Must be between 1 and ${config.steps.totalSteps}`);
        return;
      }

      // Validate subStep parameter (only applicable for step 4)
      if (step === 4 && subStep !== undefined) {
        if (subStep < 1 || subStep > 5) {
          console.warn(`Invalid subStep: ${subStep}. Must be between 1 and 5 for step 4`);
          return;
        }
      } else if (step !== 4 && subStep !== undefined) {
        console.warn(`subStep parameter is only applicable for step 4. Ignoring subStep: ${subStep}`);
      }

      // Set the current step
      setCurrentStep(step);

      // Handle step 4 substep navigation
      if (step === 4 && subStep !== undefined) {
        setSubstitutionStep(subStep);
      }

      // Set completion states based on target step
      // All previous steps should be completed
      if (step > 1) {
        setStep1Completed(true);
      }
      if (step > 2) {
        setStep2Completed(true);
      }
      if (step > 3) {
        setStep3Completed(true);
      }

      // For step 4, handle substep completion
      if (step === 4) {
        if (subStep !== undefined) {
          // Set all substeps up to the target substep as completed
          if (subStep > 1) setStep4SubStep1Completed(true);
          if (subStep > 2) setStep4SubStep2Completed(true);
          if (subStep > 3) setStep4SubStep3Completed(true);
          if (subStep > 4) setStep4SubStep4Completed(true);
          if (subStep > 5) setStep4SubStep5Completed(true);
        }
      }

      // Clear error and success messages when navigating
      setErrorMessage('');
      setSuccessMessage('');

      // Note: We don't reset the state of equations or substitution steps
      // This preserves the user's progress when they navigate between steps
      // The state will show whatever was last attempted/completed for each step
    },
    [config.steps.totalSteps, payload],
  );

  useEffect(() => {
    setEquationOnly(false);
    setSubstitute(null);
    if (payload && typeof payload === 'object') {
      // Handle equationOnly flag
      if ('equationOnly' in payload) {
        setEquationOnly(payload.equationOnly as boolean);
      }

      // Handle substitute flag
      if ('substitute' in payload) {
        setSubstitute(payload.substitute as number);
      }

      // Handle step navigation
      if ('step' in payload && (payload.step !== currentStep || payload.step === 4)) {
        if ('subStep' in payload && payload.subStep != substitutionStep) {
          moveToNewStep(payload.step as number, payload.subStep as number);
        } else {
          moveToNewStep(payload.step as number);
        }
      }
    }
  }, [payload, currentStep, substitutionStep, moveToNewStep]);

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
    if (step4SubStep1Completed) {
      onInteraction({
        'step-4-substep-1-completed': true,
      });
    }
    if (step4SubStep2Completed) {
      onInteraction({
        'step-4-substep-2-completed': true,
      });
    }
    if (step4SubStep3Completed) {
      onInteraction({
        'step-4-substep-3-completed': true,
      });
    }
    if (step4SubStep4Completed) {
      onInteraction({
        'step-4-substep-4-completed': true,
      });
    }
    if (step4SubStep5Completed) {
      onInteraction({
        'step-4-substep-5-completed': true,
      });
    }
  }, [
    step1Completed,
    step2Completed,
    step3Completed,
    step4SubStep1Completed,
    step4SubStep2Completed,
    step4SubStep3Completed,
    step4SubStep4Completed,
    step4SubStep5Completed,
    onInteraction,
  ]);

  // Auto-hide success messages
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Accessibility announcements
  useEffect(() => {
    // Announce step changes
    const stepAnnouncement = document.getElementById('step-announcement');
    if (stepAnnouncement) {
      stepAnnouncement.textContent = `${t(config.translations.step)} ${currentStep} ${t(config.translations.of)} ${config.steps.totalSteps} ${t(config.translations.loaded)}. ${getStepDescription(currentStep)}`;
    }
  }, [currentStep]);

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

  // Get step description for screen readers
  const getStepDescription = (step: number) => {
    const descriptions = config.steps.stepDescriptions;
    if (step >= 1 && step <= descriptions.length) {
      const descriptionKey = descriptions[step - 1];
      const translationKey = config.translations[descriptionKey as keyof typeof config.translations];
      if (typeof translationKey === 'string') {
        return t(translationKey);
      }
    }
    return '';
  };

  // Announce equation updates for screen readers
  const announceEquationUpdate = (_step: number, equation: (string | null)[]) => {
    const equationText = equation.map((item) => item || t(config.translations.empty)).join(' ');
    const announcement = document.getElementById('equation-announcement');
    if (announcement) {
      announcement.textContent = `${t(config.translations.equation_updated)}: ${equationText}`;
    }
  };

  // Handle drag start
  const handleDragStart = (e: DragEvent<HTMLDivElement>, value: string) => {
    e.dataTransfer.setData('text/plain', value);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag over
  const handleDragOver = (e: { preventDefault: () => void; dataTransfer: { dropEffect: string } }) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Find first empty position in an equation
  const findFirstEmptyPosition = (equation: (string | null)[]) => {
    for (let i = 0; i < equation.length; i++) {
      if (equation[i] === null) {
        return i;
      }
    }
    return -1; // No empty position found
  };

  // Handle drop for Step 1 (First equation)
  const handleDropStep1 = (e: DragEvent<HTMLDivElement>, position: number) => {
    e.preventDefault();
    const draggedValue = e.dataTransfer.getData('text/plain');
    const newEquation = [...equation1];
    newEquation[position] = draggedValue;
    setEquation1(newEquation);
    // Check if correct equation: any permutation of M + L + C = 4500
    const variables = [newEquation[0], newEquation[2], newEquation[4]].sort();
    const expectedVariables = config.equations.step1.correctVariables;
    if (
      JSON.stringify(variables) === JSON.stringify(expectedVariables) &&
      newEquation[6] === config.equations.step1.correctTotal
    ) {
      setSuccessMessage(t(config.translations.perfect));
      setErrorMessage('');
      setStep1Completed(true);
    } else if (
      newEquation[0] !== null &&
      newEquation[2] !== null &&
      newEquation[4] !== null &&
      newEquation[6] !== null
    ) {
      setErrorMessage(t(config.translations.not_quite_right));
    }
    announceEquationUpdate(1, newEquation);
  };

  // Handle drop for Step 2 (Second equation)
  const handleDropStep2 = (e: DragEvent<HTMLDivElement>, position: number) => {
    e.preventDefault();
    const draggedValue = e.dataTransfer.getData('text/plain');
    const newEquation = [...equation2];
    newEquation[position] = draggedValue;
    setEquation2(newEquation);
    // Check if correct equation: M = 2 * C or 2 * C = M or M = C * 2 or C * 2 = M
    const isValid = config.equations.step2.correctFormats.some(
      (format) => JSON.stringify([newEquation[0], newEquation[2], newEquation[4]]) === JSON.stringify(format),
    );
    if (isValid) {
      setSuccessMessage(t(config.translations.excellent));
      setErrorMessage('');
      setStep2Completed(true);
    } else if (newEquation[0] !== null && newEquation[2] !== null && newEquation[4] !== null) {
      setErrorMessage(t(config.translations.remember));
    }
    announceEquationUpdate(2, newEquation);
  };

  // Handle drop for Step 3 (Third equation)
  const handleDropStep3 = (e: DragEvent<HTMLDivElement>, position: number) => {
    e.preventDefault();
    const draggedValue = e.dataTransfer.getData('text/plain');
    const newEquation = [...equation3];
    newEquation[position] = draggedValue;
    setEquation3(newEquation);
    // Check if correct equation: L = C + 500 or L = 500 + C (addition is commutative)
    const isValid = config.equations.step3.correctFormats.some(
      (format) => JSON.stringify([newEquation[0], newEquation[2], newEquation[4]]) === JSON.stringify(format),
    );
    if (isValid) {
      setSuccessMessage(t(config.translations.perfect));
      setErrorMessage('');
      setStep3Completed(true);
    } else if (newEquation[0] !== null && newEquation[2] !== null && newEquation[4] !== null) {
      setErrorMessage(t(config.translations.remember));
    }
    announceEquationUpdate(3, newEquation);
  };

  // Handle drop for Substitution steps
  const handleDropSubstitution = (e: DragEvent<HTMLDivElement>, position: number) => {
    e.preventDefault();
    const draggedValue = e.dataTransfer.getData('text/plain');
    if (substitutionStep === 1) {
      const newSub = [...substitution1];
      newSub[position] = draggedValue;
      setSubstitution1(newSub);
      if (newSub[0] === config.substitutionSteps.step1.correctValues[0]) {
        setSuccessMessage(t(config.translations.good));
        // setSubstitutionStep(config.substitutionSteps.step1.nextStep);
        setStep4SubStep1Completed(true);
      }
    } else if (substitutionStep === 2) {
      const newSub = [...substitution2];
      newSub[position] = draggedValue;
      setSubstitution2(newSub);
      if (newSub[2] === config.substitutionSteps.step2.correctValues[0]) {
        setSuccessMessage(t(config.translations.excellent));
        // setSubstitutionStep(config.substitutionSteps.step2.nextStep);
        setStep4SubStep2Completed(true);
      }
    } else if (substitutionStep === 3) {
      const newSimplified = [...simplified];
      newSimplified[position] = draggedValue;
      setSimplified(newSimplified);
      if (newSimplified[0] === config.substitutionSteps.step3.correctValues[0]) {
        setSuccessMessage(t(config.translations.perfect));
        // setSubstitutionStep(config.substitutionSteps.step3.nextStep);
        setStep4SubStep3Completed(true);
      }
    } else if (substitutionStep === 4) {
      const newSolved = [...solved];
      newSolved[position] = draggedValue;
      setSolved(newSolved);
      if (
        newSolved[0] === config.substitutionSteps.step4.correctValues[0] &&
        newSolved[2] === config.substitutionSteps.step4.correctValues[1]
      ) {
        setSuccessMessage(t(config.translations.excellent));
        // setSubstitutionStep(config.substitutionSteps.step4.nextStep);
        setStep4SubStep4Completed(true);
      }
    } else if (substitutionStep === 5) {
      const newFinalStep = [...finalStep];
      newFinalStep[position] = draggedValue;
      setFinalStep(newFinalStep);
      if (
        (newFinalStep[0] === config.substitutionSteps.step5.correctValues[0] &&
          newFinalStep[2] === config.substitutionSteps.step5.correctValues[1]) ||
        (newFinalStep[0] === config.substitutionSteps.step5.correctValues[1] &&
          newFinalStep[2] === config.substitutionSteps.step5.correctValues[0])
      ) {
        setSuccessMessage(t(config.translations.perfect));
        setShowFinalResult(true);
        setStep4SubStep5Completed(true);
      }
    }
  };

  // Handle click or keyboard activation for Step 1
  const handleActivateStep1 = (value: string) => {
    const emptyPosition = findFirstEmptyPosition(equation1);
    if (emptyPosition !== -1) {
      const newEquation = [...equation1];
      newEquation[emptyPosition] = value;
      setEquation1(newEquation);

      // Check if correct equation: any permutation of M + L + C = 4500
      const variables = [newEquation[0], newEquation[2], newEquation[4]].sort();
      const expectedVariables = config.equations.step1.correctVariables;

      if (
        JSON.stringify(variables) === JSON.stringify(expectedVariables) &&
        newEquation[6] === config.equations.step1.correctTotal
      ) {
        setSuccessMessage(t(config.translations.perfect));
        setErrorMessage('');
        setStep1Completed(true);
      } else if (
        newEquation[0] !== null &&
        newEquation[2] !== null &&
        newEquation[4] !== null &&
        newEquation[6] !== null
      ) {
        setErrorMessage(t(config.translations.not_quite_right));
      }
      announceEquationUpdate(1, newEquation);
    }
  };

  // Handle click or keyboard activation for Step 2
  const handleActivateStep2 = (value: string) => {
    const emptyPosition = findFirstEmptyPosition(equation2);
    if (emptyPosition !== -1) {
      const newEquation = [...equation2];
      newEquation[emptyPosition] = value;
      setEquation2(newEquation);

      // Check if correct equation: M = 2 * C or 2 * C = M or M = C * 2 or C * 2 = M
      const isValid =
        (newEquation[0] === 'M' && newEquation[2] === '2' && newEquation[4] === 'C') ||
        (newEquation[0] === 'M' && newEquation[2] === 'C' && newEquation[4] === '2') ||
        (newEquation[0] === '2' && newEquation[2] === 'C' && newEquation[4] === 'M') ||
        (newEquation[0] === 'C' && newEquation[2] === '2' && newEquation[4] === 'M');

      if (isValid) {
        setSuccessMessage(t('scenes.S27.S27_D0_FX_C9.new.excellent'));
        setErrorMessage('');
        setStep2Completed(true);
      } else if (newEquation[0] !== null && newEquation[2] !== null && newEquation[4] !== null) {
        setErrorMessage(t('scenes.S27.S27_D0_FX_C9.new.remember'));
      }
      announceEquationUpdate(2, newEquation);
    }
  };

  // Handle click or keyboard activation for Step 3
  const handleActivateStep3 = (value: string) => {
    const emptyPosition = findFirstEmptyPosition(equation3);
    if (emptyPosition !== -1) {
      const newEquation = [...equation3];
      newEquation[emptyPosition] = value;
      setEquation3(newEquation);

      // Check if correct equation: L = C + 500 or L = 500 + C (addition is commutative)
      const isValid =
        (newEquation[0] === 'L' && newEquation[2] === 'C' && newEquation[4] === '500') ||
        (newEquation[0] === 'L' && newEquation[2] === '500' && newEquation[4] === 'C');

      if (isValid) {
        setSuccessMessage(t('scenes.S27.S27_D0_FX_C9.new.perfect'));
        setErrorMessage('');
        setStep3Completed(true);
      } else if (newEquation[0] !== null && newEquation[2] !== null && newEquation[4] !== null) {
        setErrorMessage(t('scenes.S27.S27_D0_FX_C9.new.remember'));
      }
      announceEquationUpdate(3, newEquation);
    }
  };

  // Handle click or keyboard activation for substitution steps
  const handleActivateSubstitution = (value: string, step: number) => {
    if (step === 1) {
      const emptyPosition = findFirstEmptyPosition(substitution1);
      if (emptyPosition !== -1) {
        const newSub = [...substitution1];
        newSub[emptyPosition] = value;
        setSubstitution1(newSub);

        if (newSub[0] === '2C') {
          setSuccessMessage(t('scenes.S27.S27_D0_FX_C9.new.good'));
          // setSubstitutionStep(2);
          setStep4SubStep1Completed(true);
        }
      }
    } else if (step === 2) {
      const emptyPosition = findFirstEmptyPosition(substitution2);
      if (emptyPosition !== -1) {
        const newSub = [...substitution2];
        newSub[emptyPosition] = value;
        setSubstitution2(newSub);

        if (newSub[2] === 'C + 500') {
          setSuccessMessage(t('scenes.S27.S27_D0_FX_C9.new.excellent'));
          // setSubstitutionStep(3);
          setStep4SubStep2Completed(true);
        }
      }
    } else if (step === 3) {
      const emptyPosition = findFirstEmptyPosition(simplified);
      if (emptyPosition !== -1) {
        const newSimplified = [...simplified];
        newSimplified[emptyPosition] = value;
        setSimplified(newSimplified);

        if (newSimplified[0] === '4C') {
          setSuccessMessage(t('scenes.S27.S27_D0_FX_C9.new.perfect'));
          // setSubstitutionStep(4);
          setStep4SubStep3Completed(true);
        }
      }
    } else if (step === 4) {
      const emptyPosition = findFirstEmptyPosition(solved);
      if (emptyPosition !== -1) {
        const newSolved = [...solved];
        newSolved[emptyPosition] = value;
        setSolved(newSolved);

        if (newSolved[0] === '4C' && newSolved[2] === '4000') {
          setSuccessMessage(t('scenes.S27.S27_D0_FX_C9.new.excellent'));
          // setSubstitutionStep(5);
          setStep4SubStep4Completed(true);
        }
      }
    } else if (step === 5) {
      const emptyPosition = findFirstEmptyPosition(finalStep);
      if (emptyPosition !== -1) {
        const newFinalStep = [...finalStep];
        newFinalStep[emptyPosition] = value;
        setFinalStep(newFinalStep);

        if (newFinalStep[0] === 'C' && newFinalStep[2] === '1000') {
          setSuccessMessage(t('scenes.S27.S27_D0_FX_C9.new.perfect'));
          setShowFinalResult(true);
          setStep4SubStep5Completed(true);
        }
      }
    }
  };

  // Handle keyboard events for accessibility
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, value: string, step?: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (step) {
        handleActivateSubstitution(value, step);
      } else if (currentStep === 1) {
        handleActivateStep1(value);
      } else if (currentStep === 2) {
        handleActivateStep2(value);
      } else if (currentStep === 3) {
        handleActivateStep3(value);
      }
    }
  };

  // Add global keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      // Alt + R to reset current step
      if (e.altKey && e.key === 'r') {
        e.preventDefault();
        switch (currentStep) {
          case 1:
            resetStep1();
            break;
          case 2:
            resetStep2();
            break;
          case 3:
            resetStep3();
            break;
          case 4:
            resetStep4();
            break;
        }
      }

      // Alt + N to go to next step
      if (e.altKey && e.key === 'n' && currentStep < 4 && isStepComplete()) {
        e.preventDefault();
        goToNextStep();
      }

      // Alt + P to go to previous step
      if (e.altKey && e.key === 'p' && currentStep > 1) {
        e.preventDefault();
        goToPreviousStep();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentStep]);

  // Handle click events
  const handleClick = (value: string, step?: number) => {
    if (step) {
      handleActivateSubstitution(value, step);
    } else if (currentStep === 1) {
      handleActivateStep1(value);
    } else if (currentStep === 2) {
      handleActivateStep2(value);
    } else if (currentStep === 3) {
      handleActivateStep3(value);
    }
  };

  // Reset functions
  const resetStep1 = () => {
    setEquation1([...config.equations.step1.structure]);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const resetStep2 = () => {
    setEquation2([...config.equations.step2.structure]);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const resetStep3 = () => {
    setEquation3([...config.equations.step3.structure]);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const resetStep4 = () => {
    setSubstitutionStep(1);
    setSubstitution1([...config.substitutionSteps.step1.structure]);
    setSubstitution2([...config.substitutionSteps.step2.structure]);
    setSimplified([...config.substitutionSteps.step3.structure]);
    setSolved([...config.substitutionSteps.step4.structure]);
    setFinalStep([...config.substitutionSteps.step5.structure]);
    setShowFinalResult(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Check if current step is complete
  const isStepComplete = useCallback(() => {
    switch (currentStep) {
      case 1: {
        const variables = [equation1[0], equation1[2], equation1[4]].sort();
        const expectedVariables = config.equations.step1.correctVariables;
        return (
          JSON.stringify(variables) === JSON.stringify(expectedVariables) &&
          equation1[6] === config.equations.step1.correctTotal
        );
      }
      case 2:
        return config.equations.step2.correctFormats.some(
          (format) => JSON.stringify([equation2[0], equation2[2], equation2[4]]) === JSON.stringify(format),
        );
      case 3:
        return config.equations.step3.correctFormats.some(
          (format) => JSON.stringify([equation3[0], equation3[2], equation3[4]]) === JSON.stringify(format),
        );
      case 4:
        return showFinalResult;
      default:
        return false;
    }
  }, [currentStep, showFinalResult]);

  // Navigation functions
  const goToNextStep = () => {
    if (isStepComplete()) {
      moveToNewStep(currentStep + 1);
    } else {
      setErrorMessage(t(config.translations.please_complete_current_step_before_proceeding));
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      moveToNewStep(currentStep - 1);
    }
  };

  // Handle touch events for tablet drag and drop
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, value: string) => {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    const element = e.currentTarget;

    // Prevent scrolling during drag
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    // Create a drag preview element (similar to mouse drag)
    const dragPreview = element.cloneNode(true) as HTMLElement;
    dragPreview.style.position = 'fixed';
    dragPreview.style.top = `${touch.clientY - 24}px`;
    dragPreview.style.left = `${touch.clientX - 32}px`;
    dragPreview.style.zIndex = '10000';
    dragPreview.style.opacity = '0.8';
    dragPreview.style.pointerEvents = 'none';
    dragPreview.style.transform = 'scale(1.1)';
    dragPreview.style.transition = 'none';

    // Add the preview to the document
    document.body.appendChild(dragPreview);

    // Store references for touch move/end
    element.setAttribute('data-dragged-value', value);
    element.setAttribute('data-drag-preview', 'true');
    element.setAttribute('data-touch-start-x', touch.clientX.toString());
    element.setAttribute('data-touch-start-y', touch.clientY.toString());

    // Store the preview element reference
    (window as { currentDragPreview?: HTMLElement }).currentDragPreview = dragPreview;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    const dragPreview = (window as { currentDragPreview?: HTMLElement }).currentDragPreview;

    if (dragPreview) {
      // Move the drag preview with the touch
      dragPreview.style.top = `${touch.clientY - 24}px`;
      dragPreview.style.left = `${touch.clientX - 32}px`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const element = e.currentTarget;
    const draggedValue = element.getAttribute('data-dragged-value');

    // Restore scrolling
    document.body.style.overflow = '';
    document.body.style.touchAction = '';

    // Remove the drag preview
    const dragPreview = (window as { currentDragPreview?: HTMLElement }).currentDragPreview;
    if (dragPreview) {
      document.body.removeChild(dragPreview);
      (window as { currentDragPreview?: HTMLElement }).currentDragPreview = undefined;
    }

    // Clear the data attributes
    element.removeAttribute('data-dragged-value');
    element.removeAttribute('data-drag-preview');
    element.removeAttribute('data-touch-start-x');
    element.removeAttribute('data-touch-start-y');

    if (draggedValue) {
      // Find the drop target under the touch point
      const touch = e.changedTouches[0];
      const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

      if (dropTarget && dropTarget.hasAttribute('data-drop-position')) {
        const position = parseInt(dropTarget.getAttribute('data-drop-position') || '0');
        const step = dropTarget.getAttribute('data-drop-step');

        // Call the appropriate drop handler directly with the value
        if (step === '1') {
          const newEquation = [...equation1];
          newEquation[position] = draggedValue;
          setEquation1(newEquation);
          // Check if correct equation: any permutation of M + L + C = 4500
          const variables = [newEquation[0], newEquation[2], newEquation[4]].sort();
          const expectedVariables = config.equations.step1.correctVariables;
          if (
            JSON.stringify(variables) === JSON.stringify(expectedVariables) &&
            newEquation[6] === config.equations.step1.correctTotal
          ) {
            setSuccessMessage(t(config.translations.perfect));
            setErrorMessage('');
          } else if (
            newEquation[0] !== null &&
            newEquation[2] !== null &&
            newEquation[4] !== null &&
            newEquation[6] !== null
          ) {
            setErrorMessage(t(config.translations.not_quite_right));
          }
        } else if (step === '2') {
          const newEquation = [...equation2];
          newEquation[position] = draggedValue;
          setEquation2(newEquation);
          // Check if correct equation: M = 2 * C or 2 * C = M or M = C * 2 or C * 2 = M
          const isValid = config.equations.step2.correctFormats.some(
            (format) =>
              JSON.stringify([newEquation[0], newEquation[2], newEquation[4]]) === JSON.stringify(format),
          );
          if (isValid) {
            setSuccessMessage(t(config.translations.excellent));
            setErrorMessage('');
          } else if (newEquation[0] !== null && newEquation[2] !== null && newEquation[4] !== null) {
            setErrorMessage(t(config.translations.remember));
          }
        } else if (step === '3') {
          const newEquation = [...equation3];
          newEquation[position] = draggedValue;
          setEquation3(newEquation);
          // Check if correct equation: L = C + 500 or L = 500 + C (addition is commutative)
          const isValid = config.equations.step3.correctFormats.some(
            (format) =>
              JSON.stringify([newEquation[0], newEquation[2], newEquation[4]]) === JSON.stringify(format),
          );
          if (isValid) {
            setSuccessMessage(t(config.translations.perfect));
            setErrorMessage('');
          } else if (newEquation[0] !== null && newEquation[2] !== null && newEquation[4] !== null) {
            setErrorMessage(t(config.translations.remember));
          }
        } else if (step === 'substitution') {
          if (substitutionStep === 1) {
            const newSub = [...substitution1];
            newSub[position] = draggedValue;
            setSubstitution1(newSub);
            if (
              newSub[0] === config.substitutionSteps.step1.correctValues[0] &&
              newSub[2] === config.substitutionSteps.step1.correctValues[1]
            ) {
              setSuccessMessage(t(config.translations.good));
              // setSubstitutionStep(config.substitutionSteps.step1.nextStep);
              setStep4SubStep1Completed(true);
            }
          } else if (substitutionStep === 2) {
            const newSub = [...substitution2];
            newSub[position] = draggedValue;
            setSubstitution2(newSub);
            if (newSub[2] === config.substitutionSteps.step2.correctValues[0]) {
              setSuccessMessage(t(config.translations.excellent));
              // setSubstitutionStep(config.substitutionSteps.step2.nextStep);
              setStep4SubStep2Completed(true);
            }
          } else if (substitutionStep === 3) {
            const newSimplified = [...simplified];
            newSimplified[position] = draggedValue;
            setSimplified(newSimplified);
            if (newSimplified[0] === config.substitutionSteps.step3.correctValues[0]) {
              setSuccessMessage(t(config.translations.perfect));
              // setSubstitutionStep(config.substitutionSteps.step3.nextStep);
              setStep4SubStep3Completed(true);
            }
          } else if (substitutionStep === 4) {
            const newSolved = [...solved];
            newSolved[position] = draggedValue;
            setSolved(newSolved);
            if (
              newSolved[0] === config.substitutionSteps.step4.correctValues[0] &&
              newSolved[2] === config.substitutionSteps.step4.correctValues[1]
            ) {
              setSuccessMessage(t(config.translations.excellent));
              // setSubstitutionStep(config.substitutionSteps.step4.nextStep);
              setStep4SubStep4Completed(true);
            }
          } else if (substitutionStep === 5) {
            const newFinalStep = [...finalStep];
            newFinalStep[position] = draggedValue;
            setFinalStep(newFinalStep);
            if (
              newFinalStep[0] === config.substitutionSteps.step5.correctValues[0] &&
              newFinalStep[2] === config.substitutionSteps.step5.correctValues[1]
            ) {
              setSuccessMessage(t(config.translations.perfect));
              setShowFinalResult(true);
              setStep4SubStep5Completed(true);
            }
          }
        }
      }
    }
  };

  // Initialize completion states based on current step and substep
  useEffect(() => {
    // Set completion states based on current step
    if (currentStep > 1) {
      setStep1Completed(true);
    }
    if (currentStep > 2) {
      setStep2Completed(true);
    }
    if (currentStep > 3) {
      setStep3Completed(true);
    }

    // For step 4, handle substep completion
    if (currentStep === 4) {
      if (substitutionStep > 1) setStep4SubStep1Completed(true);
      if (substitutionStep > 2) setStep4SubStep2Completed(true);
      if (substitutionStep > 3) setStep4SubStep3Completed(true);
      if (substitutionStep > 4) setStep4SubStep4Completed(true);
      if (substitutionStep > 5) setStep4SubStep5Completed(true);
    }
  }, []); // Only run once on mount

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6" role="region" aria-label={t(config.translations.step1.region_label)}>
            <div
              className="mt-4 text-center text-blue-800 text-sm"
              role="note"
              aria-label={t('scenes.S27.S27_D0_FX_C9.new.step1.variable_definitions_note')}
            >
              <p>{parse(t('scenes.S27.S27_D0_FX_C9.new.step1.variable_definitions'))}</p>
            </div>
            <div className="border-2 border-blue-800 rounded-lg p-6" role="group" aria-labelledby="step1-title">
              <h3 id="step1-title" className="text-xl font-bold mb-4 text-center text-blue-800">
                {t(config.translations.step1.title)}
              </h3>

              <div
                className="flex justify-center items-center gap-2 mb-6 flex-wrap"
                role="group"
                aria-label={t(config.translations.step1.equation_building_area)}
              >
                <div
                  className="w-16 h-12 border-2 border-blue-800 rounded-lg flex items-center justify-center text-lg font-bold bg-white"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropStep1(e, 0)}
                  data-drop-step="1"
                  data-drop-position="0"
                  role="textbox"
                  aria-label={`${t(config.translations.step1.first_variable_slot)} ${equation1[0] || t(config.translations.empty)}`}
                  tabIndex={0}
                >
                  {equation1[0]}
                </div>
                <div
                  className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                  aria-label={t(config.translations.plus_sign)}
                >
                  +
                </div>
                <div
                  className="w-16 h-12 border-2 border-blue-800 rounded-lg flex items-center justify-center text-lg font-bold bg-white"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropStep1(e, 2)}
                  data-drop-step="1"
                  data-drop-position="2"
                  role="textbox"
                  aria-label={`${t(config.translations.step1.second_variable_slot)} ${equation1[2] || t(config.translations.empty)}`}
                  tabIndex={0}
                >
                  {equation1[2]}
                </div>
                <div
                  className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                  aria-label={t(config.translations.plus_sign)}
                >
                  +
                </div>
                <div
                  className="w-16 h-12 border-2 border-blue-800 rounded-lg flex items-center justify-center text-lg font-bold bg-white"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropStep1(e, 4)}
                  data-drop-step="1"
                  data-drop-position="4"
                  role="textbox"
                  aria-label={`${t(config.translations.step1.third_variable_slot)} ${equation1[4] || t(config.translations.empty)}`}
                  tabIndex={0}
                >
                  {equation1[4]}
                </div>
                <div
                  className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                  aria-label={t(config.translations.equals_sign)}
                >
                  =
                </div>
                <div
                  className="w-20 h-12 border-2 border-blue-800 rounded-lg flex items-center justify-center text-lg font-bold bg-white"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropStep1(e, 6)}
                  data-drop-step="1"
                  data-drop-position="6"
                  role="textbox"
                  aria-label={`${t(config.translations.step1.total_amount_slot)} ${equation1[6] || t(config.translations.empty)}`}
                  tabIndex={0}
                >
                  {equation1[6]}
                </div>
              </div>

              {!getDisplayFlag(payload as Payload, 'hideStep1Options') && (
                <>
                  <div
                    className="flex justify-center gap-4 flex-wrap"
                    role="group"
                    aria-label={t(config.translations.step1.draggable_items_area)}
                  >
                    <div
                      className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, 'M')}
                      onClick={() => handleClick('M')}
                      onKeyDown={(e) => handleKeyDown(e, 'M')}
                      onTouchStart={(e) => handleTouchStart(e, 'M')}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      tabIndex={0}
                      role="button"
                      aria-label={t(config.translations.step1.merchant_share_button)}
                    >
                      M
                    </div>
                    <div
                      className="w-20 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, '4500')}
                      onClick={() => handleClick('4500')}
                      onKeyDown={(e) => handleKeyDown(e, '4500')}
                      onTouchStart={(e) => handleTouchStart(e, '4500')}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      tabIndex={0}
                      role="button"
                      aria-label={t(config.translations.step1.total_profit_4500_button)}
                    >
                      4500
                    </div>
                    <div
                      className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, 'L')}
                      onClick={() => handleClick('L')}
                      onKeyDown={(e) => handleKeyDown(e, 'L')}
                      onTouchStart={(e) => handleTouchStart(e, 'L')}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      tabIndex={0}
                      role="button"
                      aria-label={t(config.translations.step1.lead_merchant_share_button)}
                    >
                      L
                    </div>
                    <div
                      className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, 'C')}
                      onClick={() => handleClick('C')}
                      onKeyDown={(e) => handleKeyDown(e, 'C')}
                      onTouchStart={(e) => handleTouchStart(e, 'C')}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      tabIndex={0}
                      role="button"
                      aria-label={t(config.translations.step1.caravan_master_share_button)}
                    >
                      C
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <button
                      className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded-lg"
                      onClick={resetStep1}
                      aria-label={t('scenes.S27.S27_D0_FX_C9.new.step1.reset_button_aria')}
                    >
                      {t('scenes.S27.S27_D0_FX_C9.new.reset')}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div
            className="space-y-6"
            role="region"
            aria-label={t('scenes.S27.S27_D0_FX_C9.new.step2.region_label')}
          >
            {/* Show previous equation */}
            <div
              className="border border-gray-800 rounded-lg p-4"
              role="note"
              aria-label={t('scenes.S27.S27_D0_FX_C9.new.step2.previous_equation_note')}
            >
              <div className="text-center text-gray-800">
                <strong>{t('scenes.S27.S27_D0_FX_C9.new.step2.equation_1_label')}</strong> M + L + C = 4500
              </div>
            </div>
            <div
              className="mt-4 text-center text-blue-800 text-sm"
              role="note"
              aria-label={t('scenes.S27.S27_D0_FX_C9.new.step1.variable_definitions_note')}
            >
              <p>{parse(t('scenes.S27.S27_D0_FX_C9.new.step1.variable_definitions'))}</p>
            </div>

            <div className="border-2 border-purple-800 rounded-lg p-6" role="group" aria-labelledby="step2-title">
              <h3 id="step2-title" className="text-xl font-bold mb-4 text-center text-purple-800">
                {t('scenes.S27.S27_D0_FX_C9.new.step2.title')}
              </h3>

              <div
                className="flex justify-center items-center gap-2 mb-6"
                role="group"
                aria-label={t('scenes.S27.S27_D0_FX_C9.new.step2.equation_building_area')}
              >
                <div
                  className="w-16 h-12 border-2 border-purple-800 rounded-lg flex items-center justify-center text-lg font-bold bg-white"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropStep2(e, 0)}
                  data-drop-step="2"
                  data-drop-position="0"
                  role="textbox"
                  aria-label={`${t('scenes.S27.S27_D0_FX_C9.new.step2.first_variable_slot')} ${equation2[0] || t('scenes.S27.S27_D0_FX_C9.new.empty')}`}
                  tabIndex={0}
                >
                  {equation2[0]}
                </div>
                <div
                  className="w-12 h-12 bg-purple-800 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                  aria-label={t('scenes.S27.S27_D0_FX_C9.new.equals_sign')}
                >
                  =
                </div>
                <div
                  className="w-16 h-12 border-2 border-purple-800 rounded-lg flex items-center justify-center text-lg font-bold bg-white"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropStep2(e, 2)}
                  data-drop-step="2"
                  data-drop-position="2"
                  role="textbox"
                  aria-label={`${t('scenes.S27.S27_D0_FX_C9.new.step2.second_variable_slot')} ${equation2[2] || t('scenes.S27.S27_D0_FX_C9.new.empty')}`}
                  tabIndex={0}
                >
                  {equation2[2]}
                </div>
                <div
                  className="w-12 h-12 bg-purple-800 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                  aria-label={t('scenes.S27.S27_D0_FX_C9.new.step2.multiplication_sign')}
                >
                  ×
                </div>
                <div
                  className="w-16 h-12 border-2 border-purple-800 rounded-lg flex items-center justify-center text-lg font-bold bg-white"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropStep2(e, 4)}
                  data-drop-step="2"
                  data-drop-position="4"
                  role="textbox"
                  aria-label={`${t('scenes.S27.S27_D0_FX_C9.new.step2.third_variable_slot')} ${equation2[4] || t('scenes.S27.S27_D0_FX_C9.new.empty')}`}
                  tabIndex={0}
                >
                  {equation2[4]}
                </div>
              </div>

              {getDisplayFlag(payload as Payload, 'showStep2Options') && (
                <>
                  <div
                    className="flex justify-center gap-4"
                    role="group"
                    aria-label={t('scenes.S27.S27_D0_FX_C9.new.step2.draggable_items_area')}
                  >
                    <div
                      className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, 'M')}
                      onClick={() => handleClick('M')}
                      onKeyDown={(e) => handleKeyDown(e, 'M')}
                      onTouchStart={(e) => handleTouchStart(e, 'M')}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      tabIndex={0}
                      role="button"
                      aria-label={t('scenes.S27.S27_D0_FX_C9.new.step2.merchant_share_button')}
                    >
                      M
                    </div>
                    <div
                      className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, '2')}
                      onClick={() => handleClick('2')}
                      onKeyDown={(e) => handleKeyDown(e, '2')}
                      onTouchStart={(e) => handleTouchStart(e, '2')}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      tabIndex={0}
                      role="button"
                      aria-label={t('scenes.S27.S27_D0_FX_C9.new.step2.multiplier_2_button')}
                    >
                      2
                    </div>
                    <div
                      className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, 'C')}
                      onClick={() => handleClick('C')}
                      onKeyDown={(e) => handleKeyDown(e, 'C')}
                      onTouchStart={(e) => handleTouchStart(e, 'C')}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      tabIndex={0}
                      role="button"
                      aria-label={t('scenes.S27.S27_D0_FX_C9.new.step2.caravan_master_share_button')}
                    >
                      C
                    </div>
                    <div
                      className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, 'L')}
                      onClick={() => handleClick('L')}
                      onKeyDown={(e) => handleKeyDown(e, 'L')}
                      onTouchStart={(e) => handleTouchStart(e, 'L')}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      tabIndex={0}
                      role="button"
                      aria-label={t('scenes.S27.S27_D0_FX_C9.new.step2.lead_merchant_share_button')}
                    >
                      L
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <button
                      className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded-lg"
                      onClick={resetStep2}
                      aria-label={t('scenes.S27.S27_D0_FX_C9.new.step2.reset_button_aria')}
                    >
                      {t('scenes.S27.S27_D0_FX_C9.new.reset')}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div
            className="space-y-6"
            role="region"
            aria-label={t('scenes.S27.S27_D0_FX_C9.new.step3.region_label')}
          >
            {/* Show previous equations */}
            <div
              className="border border-gray-800 rounded-lg p-4 space-y-2"
              role="note"
              aria-label={t('scenes.S27.S27_D0_FX_C9.new.step3.previous_equations_note')}
            >
              <div className="text-center text-gray-800">
                <strong>{t('scenes.S27.S27_D0_FX_C9.new.step3.equation_1_label')}</strong> M + L + C = 4500
              </div>
              <div className="text-center text-gray-800">
                <strong>{t('scenes.S27.S27_D0_FX_C9.new.step3.equation_2_label')}</strong> M = 2 × C
              </div>
            </div>
            <div
              className="mt-4 text-center text-blue-800 text-sm"
              role="note"
              aria-label={t('scenes.S27.S27_D0_FX_C9.new.step1.variable_definitions_note')}
            >
              <p>{parse(t('scenes.S27.S27_D0_FX_C9.new.step1.variable_definitions'))}</p>
            </div>

            <div className="border-2 border-green-800 rounded-lg p-6" role="group" aria-labelledby="step3-title">
              <h3 id="step3-title" className="text-xl font-bold mb-4 text-center text-green-800">
                {t('scenes.S27.S27_D0_FX_C9.new.step3.title')}
              </h3>

              <div
                className="flex justify-center items-center gap-2 mb-6"
                role="group"
                aria-label={t('scenes.S27.S27_D0_FX_C9.new.step3.equation_building_area')}
              >
                <div
                  className="w-16 h-12 border-2 border-green-800 rounded-lg flex items-center justify-center text-lg font-bold bg-white"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropStep3(e, 0)}
                  data-drop-step="3"
                  data-drop-position="0"
                  role="textbox"
                  aria-label={`${t('scenes.S27.S27_D0_FX_C9.new.step3.first_variable_slot')} ${equation3[0] || t('scenes.S27.S27_D0_FX_C9.new.empty')}`}
                  tabIndex={0}
                >
                  {equation3[0]}
                </div>
                <div
                  className="w-12 h-12 bg-green-800 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                  aria-label={t('scenes.S27.S27_D0_FX_C9.new.equals_sign')}
                >
                  =
                </div>
                <div
                  className="w-16 h-12 border-2 border-green-800 rounded-lg flex items-center justify-center text-lg font-bold bg-white"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropStep3(e, 2)}
                  data-drop-step="3"
                  data-drop-position="2"
                  role="textbox"
                  aria-label={`${t('scenes.S27.S27_D0_FX_C9.new.step3.second_variable_slot')} ${equation3[2] || t('scenes.S27.S27_D0_FX_C9.new.empty')}`}
                  tabIndex={0}
                >
                  {equation3[2]}
                </div>
                <div
                  className="w-12 h-12 bg-green-800 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                  aria-label={t('scenes.S27.S27_D0_FX_C9.new.plus_sign')}
                >
                  +
                </div>
                <div
                  className="w-20 h-12 border-2 border-green-800 rounded-lg flex items-center justify-center text-lg font-bold bg-white"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropStep3(e, 4)}
                  data-drop-step="3"
                  data-drop-position="4"
                  role="textbox"
                  aria-label={`${t('scenes.S27.S27_D0_FX_C9.new.step3.amount_slot')} ${equation3[4] || t('scenes.S27.S27_D0_FX_C9.new.empty')}`}
                  tabIndex={0}
                >
                  {equation3[4]}
                </div>
              </div>

              {getDisplayFlag(payload as Payload, 'showStep3Options') && (
                <>
                  <div
                    className="flex justify-center gap-4"
                    role="group"
                    aria-label={t('scenes.S27.S27_D0_FX_C9.new.step3.draggable_items_area')}
                  >
                    <div
                      className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, 'M')}
                      onClick={() => handleClick('M')}
                      onKeyDown={(e) => handleKeyDown(e, 'M')}
                      onTouchStart={(e) => handleTouchStart(e, 'M')}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      tabIndex={0}
                      role="button"
                      aria-label={t('scenes.S27.S27_D0_FX_C9.new.step2.merchant_share_button')}
                    >
                      M
                    </div>
                    <div
                      className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, 'C')}
                      onClick={() => handleClick('C')}
                      onKeyDown={(e) => handleKeyDown(e, 'C')}
                      onTouchStart={(e) => handleTouchStart(e, 'C')}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      tabIndex={0}
                      role="button"
                      aria-label={t('scenes.S27.S27_D0_FX_C9.new.step3.caravan_master_share_button')}
                    >
                      C
                    </div>
                    <div
                      className="w-20 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, '500')}
                      onClick={() => handleClick('500')}
                      onKeyDown={(e) => handleKeyDown(e, '500')}
                      onTouchStart={(e) => handleTouchStart(e, '500')}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      tabIndex={0}
                      role="button"
                      aria-label={t('scenes.S27.S27_D0_FX_C9.new.step3.amount_500_button')}
                    >
                      500
                    </div>
                    <div
                      className="w-20 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, 'L')}
                      onClick={() => handleClick('L')}
                      onKeyDown={(e) => handleKeyDown(e, 'L')}
                      onTouchStart={(e) => handleTouchStart(e, 'L')}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      tabIndex={0}
                      role="button"
                      aria-label={t('scenes.S27.S27_D0_FX_C9.new.step3.lead_merchant_share_button')}
                    >
                      L
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <button
                      className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded-lg"
                      onClick={resetStep3}
                      aria-label={t('scenes.S27.S27_D0_FX_C9.new.step3.reset_button_aria')}
                    >
                      {t('scenes.S27.S27_D0_FX_C9.new.reset')}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div
            className="space-y-6"
            role="region"
            aria-label={t('scenes.S27.S27_D0_FX_C9.new.step_4_solve_using_substitution_method')}
          >
            {/* Show all three equations */}
            <div
              className="border border-gray-800 rounded-lg p-4 space-y-2"
              role="note"
              aria-label={t('scenes.S27.S27_D0_FX_C9.new.all_three_equations')}
            >
              <div className="text-center text-gray-800">
                <strong>{t('scenes.S27.S27_D0_FX_C9.new.equation_1')}</strong> M + L + C = 4500
              </div>
              <div className="text-center text-gray-800">
                <strong>{t('scenes.S27.S27_D0_FX_C9.new.equation_2')}</strong> M = 2C
              </div>
              <div className="text-center text-gray-800">
                <strong>{t('scenes.S27.S27_D0_FX_C9.new.equation_3')}</strong> L = C + 500
              </div>
            </div>
            <div
              className="mt-4 text-center text-blue-800 text-sm"
              role="note"
              aria-label={t('scenes.S27.S27_D0_FX_C9.new.step1.variable_definitions_note')}
            >
              <p>{parse(t('scenes.S27.S27_D0_FX_C9.new.step1.variable_definitions'))}</p>
            </div>

            <div className="border-2 border-yellow-800 rounded-lg p-6" role="group" aria-labelledby="step4-title">
              <h3 id="step4-title" className="text-xl font-bold mb-4 text-center text-yellow-800">
                {t('scenes.S27.S27_D0_FX_C9.new.substitution_method')}
              </h3>

              {/* Only show substitution steps if not showing final result */}
              {!showFinalResult ? (
                <>
                  {/* Step 1: Substitute M */}
                  {substitutionStep >= 1 && (
                    <div
                      className="mb-6"
                      role="group"
                      aria-label={`${t('scenes.S27.S27_D0_FX_C9.new.substitution_step')} ${substitutionStep} ${t('scenes.S27.S27_D0_FX_C9.new.of')} 4`}
                    >
                      <div className="text-center mb-4">
                        <p className="text-lg font-bold text-yellow-800 mb-2">
                          {t('scenes.S27.S27_D0_FX_C9.new.step')} 1: {t('scenes.S27.S27_D0_FX_C9.new.substitute')}{' '}
                          M = 2C
                        </p>
                      </div>
                      <div
                        className="flex justify-center items-center gap-2 mb-4 flex-wrap"
                        role="group"
                        aria-label={t('scenes.S27.S27_D0_FX_C9.new.substitution_equation_building_area')}
                      >
                        <div
                          className="w-20 h-12 border-2 border-yellow-800 rounded-lg flex items-center justify-center text-lg font-bold bg-white"
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDropSubstitution(e, 0)}
                          data-drop-step="substitution"
                          data-drop-position="0"
                          role="textbox"
                          aria-label={`${t('scenes.S27.S27_D0_FX_C9.new.first_variable_slot')} ${substitution1[0] || t('scenes.S27.S27_D0_FX_C9.new.empty')}`}
                          tabIndex={0}
                        >
                          {substitution1[0]}
                        </div>
                        <div
                          className="w-12 h-12 bg-yellow-800 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.plus_sign')}
                        >
                          +
                        </div>
                        <div
                          className="w-16 h-12 bg-yellow-800 rounded-lg flex items-center justify-center text-lg font-bold text-white"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.lead_merchant_share_button')}
                        >
                          L
                        </div>
                        <div
                          className="w-12 h-12 bg-yellow-800 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.plus_sign')}
                        >
                          +
                        </div>
                        <div
                          className="w-16 h-12 bg-yellow-800 rounded-lg flex items-center justify-center text-lg font-bold text-white"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.c_caravan_master_share')}
                        >
                          {t('scenes.S27.S27_D0_FX_C9.new.c')}
                        </div>
                        <div
                          className="w-12 h-12 bg-yellow-800 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.equals_sign')}
                        >
                          =
                        </div>
                        <div
                          className="w-20 h-12 bg-yellow-800 rounded-lg flex items-center justify-center text-lg font-bold text-white"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.total_profit_value')}
                        >
                          {t('scenes.S27.S27_D0_FX_C9.new.total_profit_value')}
                        </div>
                      </div>

                      {substitutionStep === 1 && (
                        <div
                          className="flex justify-center gap-4"
                          role="group"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.draggable_items_substitution_1')}
                        >
                          <div
                            className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, '2C')}
                            onClick={() => handleClick('2C', 1)}
                            onKeyDown={(e) => handleKeyDown(e, '2C', 1)}
                            onTouchStart={(e) => handleTouchStart(e, '2C')}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            tabIndex={0}
                            role="button"
                            aria-label={t('scenes.S27.S27_D0_FX_C9.new.two_c')}
                          >
                            2C
                          </div>
                          <div
                            className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, 'C')}
                            onClick={() => handleClick('C', 1)}
                            onKeyDown={(e) => handleKeyDown(e, 'C', 1)}
                            onTouchStart={(e) => handleTouchStart(e, 'C')}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            tabIndex={0}
                            role="button"
                            aria-label={t('scenes.S27.S27_D0_FX_C9.new.c')}
                          >
                            C
                          </div>
                          <div
                            className="w-20 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, 'C + 500')}
                            onClick={() => handleClick('C + 500', 1)}
                            onKeyDown={(e) => handleKeyDown(e, 'C + 500', 1)}
                            onTouchStart={(e) => handleTouchStart(e, 'C + 500')}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            tabIndex={0}
                            role="button"
                            aria-label={t('scenes.S27.S27_D0_FX_C9.new.c_plus_500')}
                          >
                            C + 500
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 2: Substitute L */}
                  {substitutionStep >= 2 && (
                    <div
                      className="mb-6"
                      role="group"
                      aria-label={`${t('scenes.S27.S27_D0_FX_C9.new.substitution_step')} ${substitutionStep} ${t('scenes.S27.S27_D0_FX_C9.new.of')} 4`}
                    >
                      <div className="text-center mb-4">
                        <p className="text-lg font-bold text-yellow-800 mb-2">
                          {t('scenes.S27.S27_D0_FX_C9.new.step')} 2: {t('scenes.S27.S27_D0_FX_C9.new.substitute')}{' '}
                          L = C + 500
                        </p>
                      </div>
                      <div
                        className="flex justify-center items-center gap-2 mb-4 flex-wrap"
                        role="group"
                        aria-label={t('scenes.S27.S27_D0_FX_C9.new.substitution_equation_building_area')}
                      >
                        <div
                          className="w-16 h-12 bg-yellow-800 rounded-lg flex items-center justify-center text-lg font-bold text-white"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.two_c')}
                        >
                          {t('scenes.S27.S27_D0_FX_C9.new.two_c')}
                        </div>
                        <div
                          className="w-12 h-12 bg-yellow-800 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.plus_sign')}
                        >
                          +
                        </div>
                        <div
                          className="w-24 h-12 border-2 border-yellow-800 rounded-lg flex items-center justify-center text-sm font-bold bg-white"
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDropSubstitution(e, 2)}
                          data-drop-step="substitution"
                          data-drop-position="2"
                          role="textbox"
                          aria-label={`${t('scenes.S27.S27_D0_FX_C9.new.expression_slot')} ${substitution2[2] || t('scenes.S27.S27_D0_FX_C9.new.empty')}`}
                          tabIndex={0}
                        >
                          {substitution2[2]}
                        </div>
                        <div
                          className="w-12 h-12 bg-yellow-800 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.plus_sign')}
                        >
                          +
                        </div>
                        <div
                          className="w-16 h-12 bg-yellow-800 rounded-lg flex items-center justify-center text-lg font-bold text-white"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.c_caravan_master_share')}
                        >
                          {t('scenes.S27.S27_D0_FX_C9.new.c')}
                        </div>
                        <div
                          className="w-12 h-12 bg-yellow-800 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.equals_sign')}
                        >
                          =
                        </div>
                        <div
                          className="w-20 h-12 bg-yellow-800 rounded-lg flex items-center justify-center text-lg font-bold text-white"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.total_profit_value')}
                        >
                          {t('scenes.S27.S27_D0_FX_C9.new.total_profit_value')}
                        </div>
                      </div>

                      {substitutionStep === 2 && (
                        <div
                          className="flex justify-center gap-4"
                          role="group"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.draggable_items_substitution_2')}
                        >
                          <div
                            className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, '2C')}
                            onClick={() => handleClick('2C', 2)}
                            onKeyDown={(e) => handleKeyDown(e, '2C', 2)}
                            onTouchStart={(e) => handleTouchStart(e, '2C')}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            tabIndex={0}
                            role="button"
                            aria-label={t('scenes.S27.S27_D0_FX_C9.new.two_c')}
                          >
                            2C
                          </div>
                          <div
                            className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, 'C')}
                            onClick={() => handleClick('C', 2)}
                            onKeyDown={(e) => handleKeyDown(e, 'C', 2)}
                            onTouchStart={(e) => handleTouchStart(e, 'C')}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            tabIndex={0}
                            role="button"
                            aria-label={t('scenes.S27.S27_D0_FX_C9.new.c')}
                          >
                            C
                          </div>
                          <div
                            className="w-20 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, 'C + 500')}
                            onClick={() => handleClick('C + 500', 2)}
                            onKeyDown={(e) => handleKeyDown(e, 'C + 500', 2)}
                            onTouchStart={(e) => handleTouchStart(e, 'C + 500')}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            tabIndex={0}
                            role="button"
                            aria-label={t('scenes.S27.S27_D0_FX_C9.new.c_plus_500')}
                          >
                            C + 500
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 3: Combine like terms */}
                  {substitutionStep >= 3 && (
                    <div
                      className="mb-6"
                      role="group"
                      aria-label={`${t('scenes.S27.S27_D0_FX_C9.new.substitution_step')} ${substitutionStep} ${t('scenes.S27.S27_D0_FX_C9.new.of')} 4`}
                    >
                      <div className="text-center mb-4">
                        <p className="text-lg font-bold text-yellow-800 mb-2">
                          {t('scenes.S27.S27_D0_FX_C9.new.step')} 3:{' '}
                          {t('scenes.S27.S27_D0_FX_C9.new.combine_like_terms')}
                        </p>
                      </div>
                      <div
                        className="flex justify-center items-center gap-2 mb-4 flex-wrap"
                        role="group"
                        aria-label={t('scenes.S27.S27_D0_FX_C9.new.simplified_equation_building_area')}
                      >
                        <div
                          className="w-16 h-12 border-2 border-yellow-800 rounded-lg flex items-center justify-center text-lg font-bold bg-white"
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDropSubstitution(e, 0)}
                          data-drop-step="substitution"
                          data-drop-position="0"
                          role="textbox"
                          aria-label={`${t('scenes.S27.S27_D0_FX_C9.new.combined_terms_slot')} ${simplified[0] || t('scenes.S27.S27_D0_FX_C9.new.empty')}`}
                          tabIndex={0}
                        >
                          {simplified[0]}
                        </div>
                        <div
                          className="w-12 h-12 bg-yellow-800 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.plus_sign')}
                        >
                          +
                        </div>
                        <div
                          className="w-20 h-12 bg-yellow-800 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.500')}
                        >
                          500
                        </div>
                        <div
                          className="w-12 h-12 bg-yellow-800 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.equals_sign')}
                        >
                          =
                        </div>
                        <div
                          className="w-20 h-12 bg-yellow-800 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.4500')}
                        >
                          4500
                        </div>
                      </div>

                      {substitutionStep === 3 && (
                        <div
                          className="flex justify-center gap-4"
                          role="group"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.draggable_items_substitution_3')}
                        >
                          <div
                            className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, '4C')}
                            onClick={() => handleClick('4C', 3)}
                            onKeyDown={(e) => handleKeyDown(e, '4C', 3)}
                            onTouchStart={(e) => handleTouchStart(e, '4C')}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            tabIndex={0}
                            role="button"
                            aria-label={t('scenes.S27.S27_D0_FX_C9.new.four_c')}
                          >
                            4C
                          </div>
                          <div
                            className="w-20 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, '2C')}
                            onClick={() => handleClick('2C', 3)}
                            onKeyDown={(e) => handleKeyDown(e, '2C', 3)}
                            onTouchStart={(e) => handleTouchStart(e, '2C')}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            tabIndex={0}
                            role="button"
                            aria-label={t('scenes.S27.S27_D0_FX_C9.new.two_c')}
                          >
                            2C
                          </div>
                          <div
                            className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, '3C')}
                            onClick={() => handleClick('3C', 3)}
                            onKeyDown={(e) => handleKeyDown(e, '3C', 3)}
                            onTouchStart={(e) => handleTouchStart(e, '3C')}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            tabIndex={0}
                            role="button"
                            aria-label={t('scenes.S27.S27_D0_FX_C9.new.three_c')}
                          >
                            3C
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 4: Solve for 4C */}
                  {substitutionStep >= 4 && !showFinalResult && (
                    <div
                      className="mb-6"
                      role="group"
                      aria-label={`${t('scenes.S27.S27_D0_FX_C9.new.substitution_step')} ${substitutionStep} ${t('scenes.S27.S27_D0_FX_C9.new.of')} 4`}
                    >
                      <div className="text-center mb-4">
                        <p className="text-lg font-bold text-yellow-800 mb-2">
                          {t('scenes.S27.S27_D0_FX_C9.new.step')} 4: {t('scenes.S27.S27_D0_FX_C9.new.solve_for')} C
                        </p>
                      </div>
                      <div
                        className="flex justify-center items-center gap-2 mb-4"
                        role="group"
                        aria-label={t('scenes.S27.S27_D0_FX_C9.new.final_solution_building_area')}
                      >
                        <div
                          className="w-16 h-12 border-2 border-yellow-800 rounded-lg flex items-center justify-center text-lg font-bold bg-white"
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDropSubstitution(e, 0)}
                          data-drop-step="substitution"
                          data-drop-position="0"
                          role="textbox"
                          aria-label={`${t('scenes.S27.S27_D0_FX_C9.new.variable_slot')} ${solved[0] || t('scenes.S27.S27_D0_FX_C9.new.empty')}`}
                          tabIndex={0}
                        >
                          {solved[0]}
                        </div>
                        <div
                          className="w-12 h-12 bg-yellow-800 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.equals_sign')}
                        >
                          =
                        </div>
                        <div
                          className="w-20 h-12 border-2 border-yellow-800 rounded-lg flex items-center justify-center text-lg font-bold bg-white"
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDropSubstitution(e, 2)}
                          data-drop-step="substitution"
                          data-drop-position="2"
                          role="textbox"
                          aria-label={`${t('scenes.S27.S27_D0_FX_C9.new.solution_slot')} ${solved[2] || t('scenes.S27.S27_D0_FX_C9.new.empty')}`}
                          tabIndex={0}
                        >
                          {solved[2]}
                        </div>
                      </div>

                      {substitutionStep === 4 && (
                        <div
                          className="flex justify-center gap-4"
                          role="group"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.draggable_items_substitution_4')}
                        >
                          <div
                            className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, '4C')}
                            onClick={() => handleClick('4C', 4)}
                            onKeyDown={(e) => handleKeyDown(e, '4C', 4)}
                            onTouchStart={(e) => handleTouchStart(e, '4C')}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            tabIndex={0}
                            role="button"
                            aria-label={t('scenes.S27.S27_D0_FX_C9.new.four_c')}
                          >
                            4C
                          </div>
                          <div
                            className="w-20 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, '4000')}
                            onClick={() => handleClick('4000', 4)}
                            onKeyDown={(e) => handleKeyDown(e, '4000', 4)}
                            onTouchStart={(e) => handleTouchStart(e, '4000')}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            tabIndex={0}
                            role="button"
                            aria-label={t('scenes.S27.S27_D0_FX_C9.new.4000')}
                          >
                            4000
                          </div>
                          <div
                            className="w-20 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, '5000')}
                            onClick={() => handleClick('5000', 4)}
                            onKeyDown={(e) => handleKeyDown(e, '5000', 4)}
                            onTouchStart={(e) => handleTouchStart(e, '5000')}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            tabIndex={0}
                            role="button"
                            aria-label={t('scenes.S27.S27_D0_FX_C9.new.5000')}
                          >
                            5000
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 5: Final solution for C */}
                  {substitutionStep >= 5 && !showFinalResult && (
                    <div
                      className="mb-6"
                      role="group"
                      aria-label={`${t('scenes.S27.S27_D0_FX_C9.new.substitution_step')} ${substitutionStep} ${t('scenes.S27.S27_D0_FX_C9.new.of')} 5`}
                    >
                      <div className="text-center mb-4">
                        <p className="text-lg font-bold text-yellow-800 mb-2">
                          {t('scenes.S27.S27_D0_FX_C9.new.step')} 5: {t('scenes.S27.S27_D0_FX_C9.new.solve_for')} C
                        </p>
                      </div>
                      <div
                        className="flex justify-center items-center gap-2 mb-4"
                        role="group"
                        aria-label={t('scenes.S27.S27_D0_FX_C9.new.final_solution_building_area')}
                      >
                        <div
                          className="w-16 h-12 border-2 border-yellow-800 rounded-lg flex items-center justify-center text-lg font-bold bg-white"
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDropSubstitution(e, 0)}
                          data-drop-step="substitution"
                          data-drop-position="0"
                          role="textbox"
                          aria-label={`${t('scenes.S27.S27_D0_FX_C9.new.variable_slot')} ${finalStep[0] || t('scenes.S27.S27_D0_FX_C9.new.empty')}`}
                          tabIndex={0}
                        >
                          {finalStep[0]}
                        </div>
                        <div
                          className="w-12 h-12 bg-yellow-800 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.equals_sign')}
                        >
                          =
                        </div>
                        <div
                          className="w-20 h-12 border-2 border-yellow-800 rounded-lg flex items-center justify-center text-lg font-bold bg-white"
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDropSubstitution(e, 2)}
                          data-drop-step="substitution"
                          data-drop-position="2"
                          role="textbox"
                          aria-label={`${t('scenes.S27.S27_D0_FX_C9.new.solution_slot')} ${finalStep[2] || t('scenes.S27.S27_D0_FX_C9.new.empty')}`}
                          tabIndex={0}
                        >
                          {finalStep[2]}
                        </div>
                      </div>

                      {substitutionStep === 5 && (
                        <div
                          className="flex justify-center gap-4"
                          role="group"
                          aria-label={t('scenes.S27.S27_D0_FX_C9.new.draggable_items_substitution_5')}
                        >
                          <div
                            className="w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, 'C')}
                            onClick={() => handleClick('C', 5)}
                            onKeyDown={(e) => handleKeyDown(e, 'C', 5)}
                            onTouchStart={(e) => handleTouchStart(e, 'C')}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            tabIndex={0}
                            role="button"
                            aria-label={t('scenes.S27.S27_D0_FX_C9.new.c')}
                          >
                            C
                          </div>
                          <div
                            className="w-20 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-lg font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-700"
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, '1000')}
                            onClick={() => handleClick('1000', 5)}
                            onKeyDown={(e) => handleKeyDown(e, '1000', 5)}
                            onTouchStart={(e) => handleTouchStart(e, '1000')}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            tabIndex={0}
                            role="button"
                            aria-label={t('scenes.S27.S27_D0_FX_C9.new.1000')}
                          >
                            1000
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div
                  className="mb-6 text-center"
                  role="group"
                  aria-label={t('scenes.S27.S27_D0_FX_C9.new.final_result')}
                >
                  <div className="text-3xl font-bold text-green-800 mb-4">C = 1000</div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return <div>{t('scenes.S27.S27_D0_FX_C9.new.loading')}</div>;
    }
  };

  // Render equations only (when equationOnly is true)
  const renderEquationsOnly = () => {
    return (
      <div
        className="border border-gray-800 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3"
        role="note"
        aria-label={t('scenes.S27.S27_D0_FX_C9.new.all_three_equations')}
      >
        <div className="text-center text-gray-800 text-base sm:text-lg">
          <strong>{t('scenes.S27.S27_D0_FX_C9.new.equation_1')}</strong> M + L + C = 4500
        </div>
        <div className="text-center text-gray-800 text-base sm:text-lg">
          <strong>{t('scenes.S27.S27_D0_FX_C9.new.equation_2')}</strong> M = 2C
        </div>
        <div className="text-center text-gray-800 text-base sm:text-lg">
          <strong>{t('scenes.S27.S27_D0_FX_C9.new.equation_3')}</strong> L = C + 500
        </div>
      </div>
    );
  };

  // Render substitute content (when substitute flag is set)
  const renderSubstituteContent = () => {
    if (!substitute) return null;

    const getSubstituteContent = () => {
      switch (substitute) {
        case 1:
          return (
            <div className="text-center text-gray-800 text-base sm:text-lg">
              <strong>C = 1000</strong>
            </div>
          );
        case 2:
          return (
            <div className="space-y-2 sm:space-y-3">
              <div className="text-center text-gray-800 text-base sm:text-lg">
                <strong>C = 1000</strong>
              </div>
              <div className="text-center text-gray-800 text-base sm:text-lg">
                <strong>L = 1500</strong>
              </div>
            </div>
          );
        case 3:
          return (
            <div className="space-y-2 sm:space-y-3">
              <div className="text-center text-gray-800 text-base sm:text-lg">
                <strong>C = 1000</strong>
              </div>
              <div className="text-center text-gray-800 text-base sm:text-lg">
                <strong>L = 1500</strong>
              </div>
              <div className="text-center text-gray-800 text-base sm:text-lg">
                <strong>M = 2000</strong>
              </div>
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div
        className="border border-gray-800 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3"
        role="note"
        aria-label={t('scenes.S27.S27_D0_FX_C9.new.substitution_results')}
      >
        {getSubstituteContent()}
      </div>
    );
  };

  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen p-4"
      role="main"
      aria-label="Caravan Profit Division Interactive"
    >
      {/* Accessibility Instructions */}
      <div className="sr-only" aria-live="polite">
        <p>{t(config.translations.welcome_to_caravan_profit_division)}</p>
        <p>{t(config.translations.drag_drop_click_enter_space)}</p>
        <p>
          {t(config.translations.current_step)}: {currentStep} {t(config.translations.of)}{' '}
          {config.steps.totalSteps}
        </p>
      </div>

      {/* Live regions for accessibility announcements */}
      <div id="step-announcement" className="sr-only" aria-live="polite" aria-atomic="true"></div>
      <div id="equation-announcement" className="sr-only" aria-live="polite" aria-atomic="true"></div>
      <div id="progress-announcement" className="sr-only" aria-live="polite" aria-atomic="true"></div>

      {/* Main Interactive Card */}
      <div className="bg-white w-full max-w-4xl mb-6" role="region" aria-label="Interactive Content">
        {substitute ? (
          // Show substitute content when substitute flag is set
          <div className="p-4 sm:p-6 space-y-4">
            {equationOnly && <div className="mb-4">{renderEquationsOnly()}</div>}
            <div className="mt-4">{renderSubstituteContent()}</div>
          </div>
        ) : equationOnly || currentStep === 5 ? (
          // Show equations only when equationOnly is true or currentStep is 5
          <div className="p-4 sm:p-6">{renderEquationsOnly()}</div>
        ) : (
          // Show normal step content
          renderStepContent()
        )}

        {/* Feedback messages - only show when not in equationOnly mode and not showing substitute content */}
        {!equationOnly && !substitute && (errorMessage || successMessage) && (
          <div
            className={`mt-4 p-3 rounded-lg text-center ${successMessage ? 'border border-green-800 text-green-800' : 'border border-red-800 text-red-800'}`}
            role="alert"
            aria-live="assertive"
            aria-label={
              successMessage ? t(config.translations.success_message) : t(config.translations.error_message)
            }
          >
            {successMessage || errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default CaravanProfitDivision;
