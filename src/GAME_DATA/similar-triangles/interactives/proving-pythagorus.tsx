/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect, useContext } from 'react';
import { GameContext } from '../../../contexts/GameContext';
import { useEventListener } from '../../../hooks/useEventListener';
import { useTranslations } from '../../../hooks/useTranslations';
import { getAssetPath } from '../../../utils/assetPath';
import parse from 'html-react-parser';

// Define types for equation states
type EquationState = {
  blank1: string | null;
  blank2: string | null;
  blank3?: string | null;
};

type Step2EquationState = {
  blank1: string | null;
  blank2: string | null;
};

type Step3EquationState = {
  blank1: string | null;
  blank2: string | null;
};

// Define types for drop handlers
type DropTargetsRefType = {
  [key: string]: HTMLDivElement | null;
};

type DragItemsRefType = {
  [key: string]: HTMLDivElement | null;
};

// Define interface for storing interactive state
interface PythagorasSimilarityProofState {
  currentStep: number;
  equation: EquationState;
  step2Equation: Step2EquationState;
  step3Equation: Step3EquationState;
  showSuccess: boolean;
  showError: boolean;
  isFormulaComplete: boolean;
  showStep2Success: boolean;
  showStep2Error: boolean;
  isStep2Complete: boolean;
  showStep3Success: boolean;
  showStep3Error: boolean;
  isStep3Complete: boolean;
}

// Define color constants for variables
const COLORS = {
  AB: '#0055B2',
  BC: '#0055B2',
  AC: '#0055B2',
  DC: '#0055B2',
  AD: '#A13C34',
  CB: '#0055B2',
  DB: '#8200C3',
  CD: '#0055B2',
  a: '#0055B2',
  b: '#0055B2',
  c: '#0055B2',
  x: '#9F008F',
};

// Font styles
const equationStyle = 'font-besley font-bold';
const variableStyle = 'font-besley font-bold italic';

interface PythagorasSimilarityProofProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const PythagorasSimilarityProof: React.FC<PythagorasSimilarityProofProps> = ({ onInteraction }) => {
  const { t } = useTranslations();
  // Get the GameContext for state persistence
  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};
  const { payload } = useEventListener('proving-pythagorus');

  // Default screen reader instruction text
  const screenReaderInstructions = t('scenes.S6.S6_D0_FX_C9.drag-drop-instructions');

  // Initialize state from interactiveResponses or default values
  const savedState =
    interactiveResponses?.pythagoras_proof && typeof interactiveResponses?.pythagoras_proof === 'object'
      ? (interactiveResponses?.pythagoras_proof as unknown as PythagorasSimilarityProofState)
      : undefined;

  const [currentStep, setCurrentStep] = useState(savedState?.currentStep ?? 0);
  const [draggedOver, setDraggedOver] = useState<string | null>(null);
  const [equation, setEquation] = useState<EquationState>({
    blank1: savedState?.equation?.blank1 ?? null,
    blank2: savedState?.equation?.blank2 ?? null,
    blank3: savedState?.equation?.blank3 ?? null,
  });
  const [, setIsDragging] = useState<string | null>(null);
  const [touchItem, setTouchItem] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(savedState?.showSuccess ?? false);
  const [showError, setShowError] = useState(savedState?.showError ?? false);
  const [isFormulaComplete, setIsFormulaComplete] = useState(savedState?.isFormulaComplete ?? false);
  const [step2Equation, setStep2Equation] = useState<Step2EquationState>({
    blank1: savedState?.step2Equation?.blank1 ?? null,
    blank2: savedState?.step2Equation?.blank2 ?? null,
  });
  const [showStep2Success, setShowStep2Success] = useState(savedState?.showStep2Success ?? false);
  const [showStep2Error, setShowStep2Error] = useState(savedState?.showStep2Error ?? false);
  const [isStep2Complete, setIsStep2Complete] = useState(savedState?.isStep2Complete ?? false);
  const [step3Equation, setStep3Equation] = useState<Step3EquationState>({
    blank1: savedState?.step3Equation?.blank1 ?? null,
    blank2: savedState?.step3Equation?.blank2 ?? null,
  });
  const [showStep3Success, setShowStep3Success] = useState(savedState?.showStep3Success ?? false);
  const [showStep3Error, setShowStep3Error] = useState(savedState?.showStep3Error ?? false);
  const [isStep3Complete, setIsStep3Complete] = useState(savedState?.isStep3Complete ?? false);

  // Refs for draggable elements
  const dragItemsRef = useRef<DragItemsRefType>({});
  const dropTargetsRef = useRef<DropTargetsRefType>({});

  // Add these new states for touch dragging visualization
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const [showTouchDragPreview, setShowTouchDragPreview] = useState(false);

  // Listen for event payload to allow direct navigation to specific step
  useEffect(() => {
    // Listen for any external navigation events that might come in
    const handleNavEvent = (e: CustomEvent) => {
      if (e.detail && typeof e.detail === 'object' && 'step' in e.detail) {
        setCurrentStep(e.detail.step as number);
      }
    };

    window.addEventListener('pythagoras-proof-nav', handleNavEvent as EventListener);
    return () => {
      window.removeEventListener('pythagoras-proof-nav', handleNavEvent as EventListener);
    };
  }, []);

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      setCurrentStep(payload.step as number);
    }
  }, [payload]);

  // Save state to context whenever relevant state changes
  useEffect(() => {
    if (!setInteractiveResponses) return;

    const currentState: PythagorasSimilarityProofState = {
      currentStep,
      equation,
      step2Equation,
      step3Equation,
      showSuccess,
      showError,
      isFormulaComplete,
      showStep2Success,
      showStep2Error,
      isStep2Complete,
      showStep3Success,
      showStep3Error,
      isStep3Complete,
    };

    setInteractiveResponses((prev: any) => ({
      ...prev,
      pythagoras_proof: currentState,
    }));

    // Optionally report state to the onInteraction prop as well
    onInteraction({
      step: currentStep,
      isFormulaComplete,
      isStep2Complete,
      isStep3Complete,
    });
  }, [
    currentStep,
    equation,
    step2Equation,
    step3Equation,
    showSuccess,
    showError,
    isFormulaComplete,
    showStep2Success,
    showStep2Error,
    isStep2Complete,
    showStep3Success,
    showStep3Error,
    isStep3Complete,
    setInteractiveResponses,
    onInteraction,
  ]);

  // Move these functions to after the initial state definitions and before handleKeyPress
  // Add announceForScreenReader function (around line 115, before handleKeyPress)
  const announceForScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.setAttribute('role', 'status');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  // Add handleDragEnd function
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    // Reset ARIA attributes and visual styling
    if (e.currentTarget) {
      e.currentTarget.setAttribute('aria-grabbed', 'false');
      e.currentTarget.style.opacity = '1';
    }
    setIsDragging(null);
  };

  // Enhanced handleKeyPress function to work with screen readers using arrow keys
  const handleKeyPress = (e: React.KeyboardEvent, side: string, currentStepNum: number) => {
    // Respond to Enter, Space, and NVDA arrow key presses (sometimes NVDA translates arrows to other keys)
    if (
      e.key === 'Enter' ||
      e.key === ' ' ||
      e.key === 'Space' ||
      e.key === 'ArrowDown' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'Tab' || // Include Tab key for NVDA
      e.key === 'Return' || // Some screen readers use Return
      e.key === 'NumpadEnter' // Numpad Enter key
    ) {
      // For Tab key we just want to allow normal navigation
      if (e.key === 'Tab') {
        return;
      }

      // For other keys, prevent default and handle the action
      e.preventDefault();
      e.stopPropagation();

      // Just call our shared handler function to keep the logic in one place
      handleNVDAClick(side, currentStepNum);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, side: string) => {
    e.dataTransfer.setData('text/plain', side);
    setIsDragging(side);

    // Update ARIA attributes for screen readers
    if (e.currentTarget) {
      e.currentTarget.setAttribute('aria-grabbed', 'true');
    }

    // For visual effect, set opacity
    e.currentTarget.style.opacity = '0.5';
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, blank: string) => {
    e.preventDefault();
    setDraggedOver(blank);
  };

  const handleDragLeave = () => {
    setDraggedOver(null);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent, side: string) => {
    e.preventDefault();
    setTouchItem(side);

    // Set initial touch position
    const touch = e.touches[0];
    setTouchPosition({ x: touch.clientX, y: touch.clientY });
    setShowTouchDragPreview(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!touchItem) return;

    // Update touch position for the visual feedback
    const touch = e.touches[0];
    setTouchPosition({ x: touch.clientX, y: touch.clientY });

    // Get touch position
    const touchElement = document.elementFromPoint(touch.clientX, touch.clientY);

    // Find which drop target the touch is over
    if (touchElement) {
      const dropTarget = Object.keys(dropTargetsRef.current).find(
        (key) => dropTargetsRef.current[key] && dropTargetsRef.current[key]?.contains(touchElement),
      );

      if (dropTarget) {
        setDraggedOver(dropTarget);
      } else {
        setDraggedOver(null);
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent, currentStepNum: number) => {
    e.preventDefault();
    if (!touchItem) return;

    // Hide the touch preview
    setShowTouchDragPreview(false);

    // Get last touch position
    const lastTouch = e.changedTouches[0];
    const touchElement = document.elementFromPoint(lastTouch.clientX, lastTouch.clientY);

    // Find which drop target the touch ended on
    if (touchElement) {
      const dropTarget = Object.keys(dropTargetsRef.current).find(
        (key) => dropTargetsRef.current[key] && dropTargetsRef.current[key]?.contains(touchElement),
      );

      if (dropTarget) {
        const syntheticEvent = {
          preventDefault: () => {},
          dataTransfer: {
            getData: () => touchItem,
          },
        } as unknown as React.DragEvent<HTMLDivElement>;

        if (currentStepNum === 0) {
          handleDrop(syntheticEvent, dropTarget);
        } else if (currentStepNum === 2) {
          handleStep2Drop(syntheticEvent, dropTarget);
        } else if (currentStepNum === 3) {
          handleStep3Drop(syntheticEvent, dropTarget);
        }
      }
    }

    setTouchItem(null);
    setDraggedOver(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, blank: string) => {
    e.preventDefault();
    const side = e.dataTransfer.getData('text/plain');
    setDraggedOver(null);

    // Update equation state
    setEquation((prev) => {
      // Remove the side from any other position if it exists
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (newState[key as keyof EquationState] === side) {
          newState[key as keyof EquationState] = null;
        }
      });

      // Place it in the new position
      newState[blank as keyof EquationState] = side;

      // Check if all blanks are filled to validate formula
      const updatedEquation = { ...prev, [blank]: side };
      const allFilled = Object.values(updatedEquation).every((value) => value !== null);

      if (allFilled) {
        // Either AB^2 + BC^2 = AC^2 or BC^2 + AB^2 = AC^2 is correct
        const isCorrect =
          (updatedEquation.blank1 === 'AC' &&
            updatedEquation.blank2 === 'CB' &&
            updatedEquation.blank3 === 'AB') ||
          (updatedEquation.blank1 === 'CB' && updatedEquation.blank2 === 'AC' && updatedEquation.blank3 === 'AB');

        if (isCorrect) {
          setShowSuccess(true);
          setShowError(false);
          setIsFormulaComplete(true);
          onInteraction({
            'step-0-completed': true,
          });
        } else {
          setShowSuccess(false);
          setShowError(true);
          setIsFormulaComplete(false);
        }
      }

      return newState;
    });
  };

  const handleStep2Drop = (e: React.DragEvent<HTMLDivElement>, blank: string) => {
    e.preventDefault();
    const side = e.dataTransfer.getData('text/plain');
    setDraggedOver(null);

    // Remove step prefix if present
    const actualBlank = blank.replace('step2_', '');

    // Update step2 equation state
    setStep2Equation((prev) => {
      // Remove the side from any other position if it exists
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (newState[key as keyof Step2EquationState] === side) {
          newState[key as keyof Step2EquationState] = null;
        }
      });

      // Place it in the new position
      newState[actualBlank as keyof Step2EquationState] = side;

      // Check if all blanks are filled to validate formula
      const updatedEquation = { ...prev, [actualBlank]: side };
      const allFilled = Object.values(updatedEquation).every((value) => value !== null);

      if (allFilled) {
        // Check if correct: blank1 should be DC and blank2 should be BC
        const isCorrect = updatedEquation.blank1 === 'DB' && updatedEquation.blank2 === 'CB';

        if (isCorrect) {
          setShowStep2Success(true);
          setShowStep2Error(false);
          setIsStep2Complete(true);
          onInteraction({
            'step-2-completed': true,
          });
        } else {
          setShowStep2Success(false);
          setShowStep2Error(true);
          setIsStep2Complete(false);
        }
      }

      return newState;
    });
  };

  const handleStep3Drop = (e: React.DragEvent<HTMLDivElement>, blank: string) => {
    e.preventDefault();
    const side = e.dataTransfer.getData('text/plain');
    setDraggedOver(null);

    // Remove step prefix if present
    const actualBlank = blank.replace('step3_', '');

    // Update step3 equation state
    setStep3Equation((prev) => {
      // Remove the side from any other position if it exists
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (newState[key as keyof Step3EquationState] === side) {
          newState[key as keyof Step3EquationState] = null;
        }
      });

      // Place it in the new position
      newState[actualBlank as keyof Step3EquationState] = side;

      // Check if all blanks are filled to validate formula
      const updatedEquation = { ...prev, [actualBlank]: side };
      const allFilled = Object.values(updatedEquation).every((value) => value !== null);

      if (allFilled) {
        // Check if correct: blank1 should be AD and blank2 should be AB
        const isCorrect = updatedEquation.blank1 === 'AD' && updatedEquation.blank2 === 'AC';

        if (isCorrect) {
          setShowStep3Success(true);
          setShowStep3Error(false);
          setIsStep3Complete(true);
          onInteraction({
            'step-3-completed': true,
          });
        } else {
          setShowStep3Success(false);
          setShowStep3Error(true);
          setIsStep3Complete(false);
        }
      }

      return newState;
    });
  };

  // Get available sides that haven't been placed yet
  const getAvailableSides = () => {
    const placed = Object.values(equation).filter(Boolean) as string[];
    return ['AC', 'CB', 'AB'].filter((side) => !placed.includes(side));
  };

  // Get available sides for step 2 that haven't been placed yet
  const getStep2AvailableSides = () => {
    const placed = Object.values(step2Equation).filter(Boolean) as string[];
    return ['DB', 'CB'].filter((side) => !placed.includes(side));
  };

  // Get available sides for step 3 that haven't been placed yet
  const getStep3AvailableSides = () => {
    const placed = Object.values(step3Equation).filter(Boolean) as string[];
    return ['AD', 'AC'].filter((side) => !placed.includes(side));
  };

  // Reset functions remain the same
  const resetEquation = () => {
    setEquation({
      blank1: null,
      blank2: null,
      blank3: null,
    });
    setIsFormulaComplete(false);
    setShowSuccess(false);
    setShowError(false);
  };

  const resetStep2Equation = () => {
    setStep2Equation({
      blank1: null,
      blank2: null,
    });
    setIsStep2Complete(false);
    setShowStep2Success(false);
    setShowStep2Error(false);
  };

  const resetStep3Equation = () => {
    setStep3Equation({
      blank1: null,
      blank2: null,
    });
    setIsStep3Complete(false);
    setShowStep3Success(false);
    setShowStep3Error(false);
  };

  // Helper functions to style variable text
  const getVariableColor = (variable: string) => {
    return COLORS[variable as keyof typeof COLORS] || 'currentColor';
  };

  // Step content with JSX instead of strings
  const steps = [
    {
      title: t('scenes.S6.S6_D0_FX_C9.pythagorean-theorem'),
      content: () => (
        <div>
          <p className="mb-3">{parse(t('scenes.S6.S6_D0_FX_C9.pythagorean-explanation'))}</p>

          {/* Drag and drop interactive element */}
          <div className="mb-4 mt-4">
            <div className="flex justify-center gap-4 mb-4">
              {getAvailableSides().map((side) => (
                <div
                  key={side}
                  ref={(el) => (dragItemsRef.current[side] = el)}
                  className="w-12 h-12 flex items-center justify-center text-white rounded cursor-move hover:bg-opacity-90 transition-colors border border-gray-400"
                  style={{ backgroundColor: '#FFFFFF', color: getVariableColor(side) }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, side)}
                  onDragEnd={(e) => handleDragEnd(e)}
                  onTouchStart={(e) => handleTouchStart(e, side)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={(e) => handleTouchEnd(e, 0)}
                  tabIndex={0}
                  role="button"
                  aria-label={t(`scenes.S6.S6_D0_FX_C9.drag-${side}`)}
                  aria-grabbed="false"
                  aria-describedby={`desc-${side}`}
                  onKeyDown={(e) => handleKeyPress(e, side, 0)}
                  onClick={() => handleNVDAClick(side, 0)}
                >
                  <span className={variableStyle}>{side}</span>
                  <span id={`desc-${side}`} className="sr-only">
                    {screenReaderInstructions}
                  </span>
                </div>
              ))}
            </div>

            <div className={`flex items-center justify-center gap-2 my-4 ${equationStyle}`}>
              <div
                ref={(el) => (dropTargetsRef.current.blank1 = el)}
                className={`w-12 h-12 border-2 border-dashed rounded flex items-center justify-center text-center ${
                  draggedOver === 'blank1'
                    ? 'border-blue-400 bg-blue-500/20'
                    : equation.blank1
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-gray-400'
                }`}
                style={{ color: equation.blank1 ? getVariableColor(equation.blank1) : 'inherit' }}
                onDragOver={(e) => handleDragOver(e, 'blank1')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'blank1')}
                role="region"
                aria-label={t('scenes.S6.S6_D0_FX_C9.first-blank-equation')}
              >
                <span className={equation.blank1 ? variableStyle : ''}>{equation.blank1 || '?'}</span>
              </div>
              <span className="text-xl font-medium" aria-hidden="true">
                ²
              </span>
              <span className="sr-only">{t('scenes.S6.S6_D0_FX_C9.squared')}</span>
              <span className="mx-2 text-xl" aria-hidden="true">
                +
              </span>
              <span className="sr-only">{t('scenes.S6.S6_D0_FX_C9.plus')}</span>
              <div
                ref={(el) => (dropTargetsRef.current.blank2 = el)}
                className={`w-12 h-12 border-2 border-dashed rounded flex items-center justify-center text-center ${
                  draggedOver === 'blank2'
                    ? 'border-blue-400 bg-blue-500/20'
                    : equation.blank2
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-gray-400'
                }`}
                style={{ color: equation.blank2 ? getVariableColor(equation.blank2) : 'inherit' }}
                onDragOver={(e) => handleDragOver(e, 'blank2')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'blank2')}
                role="region"
                aria-label={t('scenes.S6.S6_D0_FX_C9.second-blank-equation')}
              >
                <span className={equation.blank2 ? variableStyle : ''}>{equation.blank2 || '?'}</span>
              </div>
              <span className="text-xl font-medium" aria-hidden="true">
                ²
              </span>
              <span className="mx-2 text-xl" aria-hidden="true">
                =
              </span>
              <span className="sr-only">{t('scenes.S6.S6_D0_FX_C9.equals')}</span>
              <div
                ref={(el) => (dropTargetsRef.current.blank3 = el)}
                className={`w-12 h-12 border-2 border-dashed rounded flex items-center justify-center text-center ${
                  draggedOver === 'blank3'
                    ? 'border-blue-400 bg-blue-500/20'
                    : equation.blank3
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-gray-400'
                }`}
                style={{ color: equation.blank3 ? getVariableColor(equation.blank3) : 'inherit' }}
                onDragOver={(e) => handleDragOver(e, 'blank3')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'blank3')}
                role="region"
                aria-label={t('scenes.S6.S6_D0_FX_C9.third-blank-equation')}
              >
                <span className={equation.blank3 ? variableStyle : ''}>{equation.blank3 || '?'}</span>
              </div>
              <span className="text-xl font-medium" aria-hidden="true">
                ²
              </span>
              <span className="sr-only">{t('scenes.S6.S6_D0_FX_C9.squared')}</span>
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={resetEquation}
                className="px-4 py-2 text-md bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              >
                {t('scenes.S6.S6_D0_FX_C9.reset')}
              </button>
            </div>
          </div>
        </div>
      ),
      instruction: () => {
        if (showError) {
          return <span className="text-red-800 font-medium">{t('scenes.S6.S6_D0_FX_C9.formula-incorrect')}</span>;
        } else if (showSuccess) {
          return (
            <span className="text-green-800 font-medium">{t('scenes.S6.S6_D0_FX_C9.correct-click-next')}</span>
          );
        } else {
          return (
            <span className="text-blue-600 font-medium">{t('scenes.S6.S6_D0_FX_C9.drag-drop-pythagorean')}</span>
          );
        }
      },
      svgContent: (
        <img
          src={getAssetPath('/assets/image/step-1.png')}
          alt={t('scenes.S6.S6_D0_FX_C9.triangle-visualization')}
          aria-label={t('scenes.S6.S6_D0_FX_C9.aria-label-step-0')}
        />
      ),
    },
    {
      title: t('scenes.S6.S6_D0_FX_C9.step-1-altitude'),
      content: () => (
        <div>
          <p className="mb-3">{parse(t('scenes.S6.S6_D0_FX_C9.altitude-explanation'))}</p>
        </div>
      ),
      instruction: () => <p>{parse(t('scenes.S6.S6_D0_FX_C9.three-similar-triangles'))}</p>,
      svgContent: (
        <img
          src={getAssetPath('/assets/image/step-2.png')}
          alt={t('scenes.S6.S6_D0_FX_C9.triangle-visualization')}
          crossOrigin="anonymous"
          aria-label={t('scenes.S6.S6_D0_FX_C9.aria-label-step-1')}
        />
      ),
    },
    {
      title: t('scenes.S6.S6_D0_FX_C9.step-2-first-pair'),
      content: () => (
        <div>
          <p className="mb-3">{parse(t('scenes.S6.S6_D0_FX_C9.first-pair-explanation'))}</p>

          {/* Drag and drop for Step 2 */}
          <div className="mb-4 mt-4">
            <div className="flex justify-center gap-4 mb-4">
              {getStep2AvailableSides().map((side) => (
                <div
                  key={side}
                  ref={(el) => (dragItemsRef.current[`step2_${side}`] = el)}
                  className="w-12 h-12 flex items-center justify-center text-white rounded cursor-move hover:bg-opacity-90 transition-colors border border-gray-400"
                  style={{ backgroundColor: '#FFFFFF', color: side === 'CB' ? '#000000' : getVariableColor(side) }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, side)}
                  onDragEnd={(e) => handleDragEnd(e)}
                  onTouchStart={(e) => handleTouchStart(e, side)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={(e) => handleTouchEnd(e, 2)}
                  tabIndex={0}
                  role="button"
                  aria-label={t(`scenes.S6.S6_D0_FX_C9.drag-${side}`)}
                  aria-grabbed="false"
                  aria-describedby={`desc-step2-${side}`}
                  onKeyDown={(e) => handleKeyPress(e, side, 2)}
                  onClick={() => handleNVDAClick(side, 2)}
                >
                  <span className={variableStyle}>{side}</span>
                  <span id={`desc-step2-${side}`} className="sr-only">
                    {screenReaderInstructions}
                  </span>
                </div>
              ))}
            </div>

            <div className={`flex items-center justify-center gap-2 my-4 ${equationStyle}`}>
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  <span className={variableStyle}>CB</span>
                  <div className="border-t border-black w-full my-1"></div>
                  <span className={variableStyle} style={{ color: COLORS.AB }}>
                    AB
                  </span>
                </div>
                <span className="mx-2 flex items-center"> = </span>
                <div className="flex flex-col items-center">
                  <div
                    ref={(el) => (dropTargetsRef.current.step2_blank1 = el)}
                    className={`w-12 h-12 border-2 border-dashed rounded flex items-center justify-center text-center ${
                      draggedOver === 'step2_blank1'
                        ? 'border-blue-400 bg-blue-500/20'
                        : step2Equation.blank1
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-gray-400'
                    }`}
                    style={{
                      color: step2Equation.blank1
                        ? step2Equation.blank1 === 'CB'
                          ? '#000000'
                          : getVariableColor(step2Equation.blank1)
                        : 'inherit',
                    }}
                    onDragOver={(e) => handleDragOver(e, 'step2_blank1')}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleStep2Drop(e, 'blank1')}
                    role="region"
                    aria-label={t('scenes.S6.S6_D0_FX_C9.first-blank-step2')}
                  >
                    <span className={step2Equation.blank1 ? variableStyle : ''}>
                      {step2Equation.blank1 || '?'}
                    </span>
                  </div>
                  <div className="border-t border-black w-full my-1"></div>
                  <div
                    ref={(el) => (dropTargetsRef.current.step2_blank2 = el)}
                    className={`w-12 h-12 border-2 border-dashed rounded flex items-center justify-center text-center ${
                      draggedOver === 'step2_blank2'
                        ? 'border-blue-400 bg-blue-500/20'
                        : step2Equation.blank2
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-gray-400'
                    }`}
                    style={{
                      color: step2Equation.blank2
                        ? step2Equation.blank2 === 'CB'
                          ? '#000000'
                          : getVariableColor(step2Equation.blank2)
                        : 'inherit',
                    }}
                    onDragOver={(e) => handleDragOver(e, 'step2_blank2')}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleStep2Drop(e, 'blank2')}
                    role="region"
                    aria-label={t('scenes.S6.S6_D0_FX_C9.second-blank-step2')}
                  >
                    <span className={step2Equation.blank2 ? variableStyle : ''}>
                      {step2Equation.blank2 || '?'}
                    </span>
                  </div>
                </div>
              </div>
              <span className="sr-only">{t('scenes.S6.S6_D0_FX_C9.formula-1-step-2')}</span>
              <span className="sr-only">{t('scenes.S6.S6_D0_FX_C9.divided')}</span>
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={resetStep2Equation}
                className="px-4 py-2 text-md bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              >
                {t('scenes.S6.S6_D0_FX_C9.reset')}
              </button>
            </div>

            {isStep2Complete && (
              <>
                <div className={`mt-4 mb-3 py-2 bg-blue-50 rounded ${equationStyle}`} aria-hidden="true">
                  <p className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex items-center">
                        <div className="flex flex-col items-center">
                          <span style={{ color: '#000000' }}>CB</span>
                          <div className="border-t border-black w-full my-1"></div>
                          <span style={{ color: COLORS.AB }}>AB</span>
                        </div>
                        <span className="mx-2 flex items-center">=</span>
                        <div className="flex flex-col items-center">
                          <span style={{ color: COLORS.DB }}>DB</span>
                          <div className="border-t border-black w-full my-1"></div>
                          <span style={{ color: '#000000' }}>CB</span>
                        </div>
                      </div>
                    </div>
                  </p>
                  <p className="text-center mt-3">
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex items-center">
                        <div className="flex flex-col items-center">
                          <span style={{ color: '#000000' }} className={variableStyle}>
                            a
                          </span>
                          <div className="border-t border-black w-full my-1"></div>
                          <span style={{ color: COLORS.c }} className={variableStyle}>
                            c
                          </span>
                        </div>
                        <span className="mx-2 flex items-center">=</span>
                        <div className="flex flex-col items-center">
                          <span style={{ color: COLORS.x }} className={variableStyle}>
                            x
                          </span>
                          <div className="border-t border-black w-full my-1"></div>
                          <span style={{ color: '#000000' }} className={variableStyle}>
                            a
                          </span>
                        </div>
                      </div>
                    </div>
                  </p>
                  <p className="text-center mt-3">
                    <span style={{ color: '#000000' }} className={variableStyle}>
                      a
                    </span>
                    ² ={' '}
                    <span style={{ color: COLORS.c }} className={variableStyle}>
                      c
                    </span>
                    <span style={{ color: COLORS.x }} className={variableStyle}>
                      x
                    </span>
                  </p>
                </div>
                <span className="sr-only">{t('scenes.S6.S6_D0_FX_C9.formula-2-step-2')}</span>
              </>
            )}
          </div>
        </div>
      ),
      instruction: () => {
        if (showStep2Error) {
          return <span className="text-red-800 font-medium">{t('scenes.S6.S6_D0_FX_C9.formula-incorrect')}</span>;
        } else if (showStep2Success) {
          return (
            <span className="text-green-800 font-medium">{t('scenes.S6.S6_D0_FX_C9.correct-first-equation')}</span>
          );
        } else {
          return (
            <span className="text-blue-800 font-medium">{t('scenes.S6.S6_D0_FX_C9.drag-drop-proportion')}</span>
          );
        }
      },
      svgContent: (
        <img
          src={getAssetPath('/assets/image/step-3.png')}
          alt={t('scenes.S6.S6_D0_FX_C9.triangle-visualization')}
          aria-label={t('scenes.S6.S6_D0_FX_C9.aria-label-step-2')}
        />
      ),
    },
    {
      title: t('scenes.S6.S6_D0_FX_C9.step-3-second-pair'),
      content: () => (
        <div>
          <div
            className={`bg-gray-50 p-3 flex flex-col gap-y-2 rounded-md border border-gray-200 mb-3 ${equationStyle}`}
          >
            <p className="font-medium">
              {t('scenes.S6.S6_D0_FX_C9.equation-1')}:{' '}
              <span aria-hidden="true">
                <span style={{ color: COLORS.a }} className={variableStyle}>
                  a
                </span>
                ² ={' '}
                <span style={{ color: COLORS.c }} className={variableStyle}>
                  c
                </span>
                <span style={{ color: COLORS.x }} className={variableStyle}>
                  x
                </span>
              </span>
              <span className="sr-only">{t('scenes.S6.S6_D0_FX_C9.formula-1-step-4')}</span>
            </p>
          </div>
          <p className="mb-3">{parse(t('scenes.S6.S6_D0_FX_C9.second-pair-explanation'))}</p>

          {/* Drag and drop for Step 3 */}
          <div className="mb-3 mt-3">
            <div className="flex justify-center gap-4 mb-4">
              {getStep3AvailableSides().map((side) => (
                <div
                  key={side}
                  ref={(el) => (dragItemsRef.current[`step3_${side}`] = el)}
                  className="w-12 h-12 flex items-center justify-center text-white rounded cursor-move hover:bg-opacity-90 transition-colors border border-gray-400"
                  style={{ backgroundColor: '#FFFFFF', color: side === 'AC' ? '#000000' : getVariableColor(side) }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, side)}
                  onDragEnd={(e) => handleDragEnd(e)}
                  onTouchStart={(e) => handleTouchStart(e, side)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={(e) => handleTouchEnd(e, 3)}
                  tabIndex={0}
                  role="button"
                  aria-label={t(`scenes.S6.S6_D0_FX_C9.drag-${side}`)}
                  aria-grabbed="false"
                  aria-describedby={`desc-step3-${side}`}
                  onKeyDown={(e) => handleKeyPress(e, side, 3)}
                  onClick={() => handleNVDAClick(side, 3)}
                >
                  <span className={variableStyle}>{side}</span>
                  <span id={`desc-step3-${side}`} className="sr-only">
                    {screenReaderInstructions}
                  </span>
                </div>
              ))}
            </div>

            <div className={`flex items-center justify-center gap-2 my-4 ${equationStyle}`}>
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  <span className={variableStyle}>AC</span>
                  <div className="border-t border-black w-full my-1"></div>
                  <span className={variableStyle} style={{ color: COLORS.AB }}>
                    AB
                  </span>
                </div>
                <span className="mx-2 flex items-center"> = </span>
                <div className="flex flex-col items-center">
                  <div
                    ref={(el) => (dropTargetsRef.current.step3_blank1 = el)}
                    className={`w-12 h-12 border-2 border-dashed rounded flex items-center justify-center text-center ${
                      draggedOver === 'step3_blank1'
                        ? 'border-blue-400 bg-blue-500/20'
                        : step3Equation.blank1
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-gray-400'
                    }`}
                    style={{
                      color: step3Equation.blank1
                        ? step3Equation.blank1 === 'AC'
                          ? '#000000'
                          : getVariableColor(step3Equation.blank1)
                        : 'inherit',
                    }}
                    onDragOver={(e) => handleDragOver(e, 'step3_blank1')}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleStep3Drop(e, 'blank1')}
                    role="region"
                    aria-label={t('scenes.S6.S6_D0_FX_C9.first-blank-step3')}
                  >
                    <span className={step3Equation.blank1 ? variableStyle : ''}>
                      {step3Equation.blank1 || '?'}
                    </span>
                  </div>
                  <div className="border-t border-black w-full my-1"></div>
                  <div
                    ref={(el) => (dropTargetsRef.current.step3_blank2 = el)}
                    className={`w-12 h-12 border-2 border-dashed rounded flex items-center justify-center text-center ${
                      draggedOver === 'step3_blank2'
                        ? 'border-blue-400 bg-blue-500/20'
                        : step3Equation.blank2
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-gray-400'
                    }`}
                    style={{
                      color: step3Equation.blank2
                        ? step3Equation.blank2 === 'AC'
                          ? '#000000'
                          : getVariableColor(step3Equation.blank2)
                        : 'inherit',
                    }}
                    onDragOver={(e) => handleDragOver(e, 'step3_blank2')}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleStep3Drop(e, 'blank2')}
                    role="region"
                    aria-label={t('scenes.S6.S6_D0_FX_C9.second-blank-step3')}
                  >
                    <span className={step3Equation.blank2 ? variableStyle : ''}>
                      {step3Equation.blank2 || '?'}
                    </span>
                  </div>
                </div>
              </div>
              <span className="sr-only">{t('scenes.S6.S6_D0_FX_C9.formula-2-step-3')}</span>
              <span className="sr-only">{t('scenes.S6.S6_D0_FX_C9.divided')}</span>
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={resetStep3Equation}
                className="px-4 py-2 text-md bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              >
                {t('scenes.S6.S6_D0_FX_C9.reset')}
              </button>
            </div>

            {isStep3Complete && (
              <>
                <div className={`mt-4 mb-3 py-2 bg-blue-50 rounded ${equationStyle}`} aria-hidden="true">
                  <p className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex items-center">
                        <div className="flex flex-col items-center">
                          <span style={{ color: '#000000' }}>AC</span>
                          <div className="border-t border-black w-full my-1"></div>
                          <span style={{ color: COLORS.AB }}>AB</span>
                        </div>
                        <span className="mx-2 flex items-center">=</span>
                        <div className="flex flex-col items-center">
                          <span style={{ color: COLORS.AD }}>AD</span>
                          <div className="border-t border-black w-full my-1"></div>
                          <span style={{ color: '#000000' }}>AC</span>
                        </div>
                      </div>
                    </div>
                  </p>
                  <p className="text-center mt-3">
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex items-center">
                        <div className="flex flex-col items-center">
                          <span className={variableStyle} style={{ color: '#000000' }}>
                            b
                          </span>
                          <div className="border-t border-black w-full my-1"></div>
                          <span className={variableStyle} style={{ color: COLORS.c }}>
                            c
                          </span>
                        </div>
                        <span className="mx-2 flex items-center">=</span>
                        <div className="flex flex-col items-center">
                          <span className={variableStyle} style={{ color: COLORS.c }}>
                            c - <span style={{ color: COLORS.x }}>x</span>
                          </span>
                          <div className="border-t border-black w-full my-1"></div>
                          <span className={variableStyle} style={{ color: '#000000' }}>
                            b
                          </span>
                        </div>
                      </div>
                    </div>
                  </p>
                  <p className="text-center mt-3">
                    <span style={{ color: '#000000' }} className={variableStyle}>
                      b
                    </span>
                    ² ={' '}
                    <span style={{ color: COLORS.c }} className={variableStyle}>
                      c
                    </span>
                    ² -{' '}
                    <span style={{ color: COLORS.c }} className={variableStyle}>
                      c
                    </span>
                    <span style={{ color: COLORS.x }} className={variableStyle}>
                      x
                    </span>
                  </p>
                </div>
                <span className="sr-only">{t('scenes.S6.S6_D0_FX_C9.formula-3-step-3')}</span>
              </>
            )}
          </div>
        </div>
      ),
      instruction: () => {
        if (showStep3Error) {
          return <span className="text-red-800 font-medium">{t('scenes.S6.S6_D0_FX_C9.formula-incorrect')}</span>;
        } else if (showStep3Success) {
          return (
            <span className="text-green-800 font-medium">
              {t('scenes.S6.S6_D0_FX_C9.correct-second-equation')}
            </span>
          );
        } else {
          return (
            <span className="text-blue-600 font-medium">{t('scenes.S6.S6_D0_FX_C9.drag-drop-proportion')}</span>
          );
        }
      },
      svgContent: (
        <img
          src={getAssetPath('/assets/image/step-4.png')}
          alt={t('scenes.S6.S6_D0_FX_C9.triangle-visualization')}
          aria-label={t('scenes.S6.S6_D0_FX_C9.aria-label-step-3')}
        />
      ),
    },
    {
      title: t('scenes.S6.S6_D0_FX_C9.step-4-adding-equations'),
      content: () => (
        <div>
          <div
            className={`bg-gray-50 p-3 flex flex-col gap-y-2 rounded-md border border-gray-200 mb-3 ${equationStyle}`}
          >
            <p className="font-medium">
              {t('scenes.S6.S6_D0_FX_C9.equation-1')}:{' '}
              <span aria-hidden="true">
                <span style={{ color: COLORS.a }} className={variableStyle}>
                  a
                </span>
                ² ={' '}
                <span style={{ color: COLORS.b }} className={variableStyle}>
                  c
                </span>
                <span style={{ color: COLORS.x }} className={variableStyle}>
                  x
                </span>
              </span>
              <span className="sr-only">{t('scenes.S6.S6_D0_FX_C9.formula-1-step-4')}</span>
            </p>
            <p className="font-medium">
              {t('scenes.S6.S6_D0_FX_C9.equation-2')}:{' '}
              <span className="" aria-hidden="true">
                <span style={{ color: COLORS.b }} className={variableStyle}>
                  b
                </span>
                ² ={' '}
                <span style={{ color: COLORS.c }} className={variableStyle}>
                  c
                </span>
                ² -{' '}
                <span style={{ color: COLORS.c }} className={variableStyle}>
                  c
                </span>
                <span style={{ color: COLORS.x }} className={variableStyle}>
                  x
                </span>
              </span>
              <span className="sr-only">{t('scenes.S6.S6_D0_FX_C9.formula-2-step-4')}</span>
            </p>
          </div>
          <p className="mb-3">{t('scenes.S6.S6_D0_FX_C9.add-equations')}</p>
          <div className={`mb-3 ${equationStyle}`} aria-hidden="true">
            <p className="text-center">
              <span style={{ color: COLORS.a }} className={variableStyle}>
                a
              </span>
              ² +{' '}
              <span style={{ color: COLORS.b }} className={variableStyle}>
                b
              </span>
              ² ={' '}
              <span style={{ color: COLORS.c }} className={variableStyle}>
                c
              </span>
              <span style={{ color: COLORS.x }} className={variableStyle}>
                x
              </span>{' '}
              +{' '}
              <span style={{ color: COLORS.c }} className={variableStyle}>
                c
              </span>
              ² -{' '}
              <span style={{ color: COLORS.c }} className={variableStyle}>
                c
              </span>
              <span style={{ color: COLORS.x }} className={variableStyle}>
                x
              </span>
            </p>
            <p className="text-center mt-2">
              <span style={{ color: COLORS.a }} className={variableStyle}>
                a
              </span>
              ² +{' '}
              <span style={{ color: COLORS.b }} className={variableStyle}>
                b
              </span>
              ² ={' '}
              <span style={{ color: COLORS.c }} className={variableStyle}>
                c
              </span>
              ²
            </p>
            <p className="text-center mt-4 text-lg">
              <span className="font-normal">{t('scenes.S6.S6_D0_FX_C9.therefore')}</span>{' '}
              <span style={{ color: COLORS.CB }} className={variableStyle}>
                CB
              </span>
              ² +{' '}
              <span style={{ color: COLORS.AC }} className={variableStyle}>
                AC
              </span>
              ² ={' '}
              <span style={{ color: COLORS.AB }} className={variableStyle}>
                AB
              </span>
              ²
            </p>
          </div>
          <span className="sr-only">{t('scenes.S6.S6_D0_FX_C9.formula-3-step-4')}</span>
        </div>
      ),
      instruction: () => (
        <div>
          <p className="mt-2">{t('scenes.S6.S6_D0_FX_C9.proof-completed')}</p>
        </div>
      ),
      svgContent: (
        <img
          src={getAssetPath('/assets/image/step-5.png')}
          alt={t('scenes.S6.S6_D0_FX_C9.triangle-visualization')}
          aria-label={t('scenes.S6.S6_D0_FX_C9.aria-label-step-4')}
        />
      ),
    },
  ];

  // Add a function to handle NVDA navigation and clicks for all steps
  const handleNVDAClick = (side: string, currentStepNum: number) => {
    // Create a synthetic event that can be passed to the drop handlers
    const syntheticEvent = {
      preventDefault: () => {},
      dataTransfer: { getData: () => side },
    } as unknown as React.DragEvent<HTMLDivElement>;

    // Handle different steps
    if (currentStepNum === 0) {
      const blanks = ['blank1', 'blank2', 'blank3'];
      const firstEmpty = blanks.find((key) => !equation[key as keyof EquationState]);
      if (firstEmpty) {
        announceForScreenReader(`${side} moved to ${firstEmpty}`);
        handleDrop(syntheticEvent, firstEmpty);
      }
    } else if (currentStepNum === 2) {
      const blanks = ['blank1', 'blank2'];
      const firstEmpty = blanks.find((key) => !step2Equation[key as keyof Step2EquationState]);
      if (firstEmpty) {
        announceForScreenReader(`${side} moved to ${firstEmpty}`);
        handleStep2Drop(syntheticEvent, `step2_${firstEmpty}`);
      }
    } else if (currentStepNum === 3) {
      const blanks = ['blank1', 'blank2'];
      const firstEmpty = blanks.find((key) => !step3Equation[key as keyof Step3EquationState]);
      if (firstEmpty) {
        announceForScreenReader(`${side} moved to ${firstEmpty}`);
        handleStep3Drop(syntheticEvent, `step3_${firstEmpty}`);
      }
    }
  };

  return (
    <div className="flex flex-col mx-auto overflow-y-auto" tabIndex={0}>
      {/* Touch drag preview overlay */}
      {showTouchDragPreview && touchItem && (
        <div
          style={{
            position: 'fixed',
            left: touchPosition.x - 24,
            top: touchPosition.y - 24,
            zIndex: 9999,
            pointerEvents: 'none',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            color: getVariableColor(touchItem),
            borderRadius: '0.25rem',
            border: '1px solid #9CA3AF',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transform: 'scale(1.1)',
            transition: 'transform 0.1s',
          }}
        >
          <span className={variableStyle}>{touchItem}</span>
        </div>
      )}

      <div className="flex justify-center w-full mb-4">
        <div
          className="relative border border-gray-200 bg-white rounded-lg overflow-hidden"
          style={{ width: '550px', height: '350px' }}
        >
          <div className="absolute inset-0 scale-75">{steps[currentStep].svgContent}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 w-full">
        <h2 className="text-xl font-semibold mb-3">{steps[currentStep].title}</h2>

        {steps[currentStep].content()}

        <div className="mb-5 text-md italic">{steps[currentStep].instruction()}</div>
      </div>
    </div>
  );
};

export default PythagorasSimilarityProof;
