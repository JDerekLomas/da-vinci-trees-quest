/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useState,
  useEffect,
  DragEvent,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useCallback,
} from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import INTERACTIVE_5_CONFIG from '../configs/interactive-5';
import { useEventListener } from '../../../hooks/useEventListener';
import { useGameContext } from '../../../hooks/useGameContext';

const TOTAL_STEPS = 10;

interface TooltipState {
  visible: boolean;
  text: string;
  x: number;
  y: number;
}

const RiskManagementInteractive = ({ onInteraction }: { onInteraction: (state: Record<string, string | number | boolean | null>) => void }) => {
  const { dialogIndex } = useGameContext();
  const isFirstIndex = dialogIndex === 1;
  // Current step (now 10 steps to match story)
  const [currentStep, setCurrentStep] = useState(isFirstIndex ? 1 : 10);

  // Step 1: Uncertainty formula
  const [uncertaintyFormula, setUncertaintyFormula] = useState(
    INTERACTIVE_5_CONFIG.initialState.uncertaintyFormula,
  );

  // Step 2: Maximum demand calculation
  const [maxDemand, setMaxDemand] = useState(INTERACTIVE_5_CONFIG.initialState.maxDemand);

  // Step 3: Minimum demand calculation
  const [minDemand, setMinDemand] = useState(INTERACTIVE_5_CONFIG.initialState.minDemand);

  // Step 4: Zero risk answer
  const [zeroRiskAnswer, setZeroRiskAnswer] = useState(INTERACTIVE_5_CONFIG.initialState.zeroRiskAnswer);
  const [step4PredictedValue, setStep4PredictedValue] = useState(
    INTERACTIVE_5_CONFIG.staticValues.initialPredictedValue,
  );

  // Step 5: High risk answer
  const [highRiskAnswer, setHighRiskAnswer] = useState(INTERACTIVE_5_CONFIG.initialState.highRiskAnswer);
  const [step5PredictedValue, setStep5PredictedValue] = useState(
    INTERACTIVE_5_CONFIG.staticValues.initialPredictedValue,
  );

  // Step 6: Low risk scenario (prediction 80)
  const [lowRiskStock, setLowRiskStock] = useState(INTERACTIVE_5_CONFIG.initialState.lowRiskStock);
  const [step6PredictedValue, setStep6PredictedValue] = useState(
    INTERACTIVE_5_CONFIG.staticValues.initialPredictedValue + 10,
  );

  // Step 7: Damascus allocation for low risk
  const [lowRiskDamascus, setLowRiskDamascus] = useState(INTERACTIVE_5_CONFIG.initialState.lowRiskDamascus);

  // Step 8: High risk scenario (prediction 70)
  const [highRiskStock, setHighRiskStock] = useState(INTERACTIVE_5_CONFIG.initialState.highRiskStock);
  const [step8PredictedValue, setStep8PredictedValue] = useState(
    INTERACTIVE_5_CONFIG.staticValues.initialPredictedValue,
  );

  // Step 9: Damascus allocation for high risk
  const [highRiskDamascus, setHighRiskDamascus] = useState(INTERACTIVE_5_CONFIG.initialState.highRiskDamascus);

  // Error and success messages
  const [errorMessage, setErrorMessage] = useState(INTERACTIVE_5_CONFIG.initialState.errorMessage);
  const [successMessage, setSuccessMessage] = useState(INTERACTIVE_5_CONFIG.initialState.successMessage);

  const { t } = useTranslations();

  const { payload } = useEventListener('interactive-5');

  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    text: '',
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload && payload.step !== currentStep) {
      moveToNewStep(payload.step as number);
    }
  }, [payload]);

  // Function to move to a new step
  const moveToNewStep = (newStep: number) => {
    // Validate step number is within bounds
    if (newStep < 1 || newStep > TOTAL_STEPS) {
      return;
    }

    // If moving forward, check if current step is complete
    if (newStep > currentStep && !isStepComplete()) {
      setErrorMessage(t(INTERACTIVE_5_CONFIG.translationKeys.complete_current_step));
      return;
    }

    // Initialize state based on the target step
    switch (newStep) {
      case 1:
        setUncertaintyFormula(INTERACTIVE_5_CONFIG.initialState.uncertaintyFormula);
        break;
      case 2:
        setMaxDemand(INTERACTIVE_5_CONFIG.initialState.maxDemand);
        break;
      case 3:
        setMinDemand(INTERACTIVE_5_CONFIG.initialState.minDemand);
        break;
      case 4:
        setZeroRiskAnswer(INTERACTIVE_5_CONFIG.initialState.zeroRiskAnswer);
        setStep4PredictedValue(INTERACTIVE_5_CONFIG.staticValues.initialPredictedValue);
        break;
      case 5:
        setHighRiskAnswer(INTERACTIVE_5_CONFIG.initialState.highRiskAnswer);
        setStep5PredictedValue(INTERACTIVE_5_CONFIG.staticValues.initialPredictedValue);
        break;
      case 6:
        setLowRiskStock(INTERACTIVE_5_CONFIG.initialState.lowRiskStock);
        setStep6PredictedValue(INTERACTIVE_5_CONFIG.staticValues.initialPredictedValue + 10);
        break;
      case 7:
        setLowRiskDamascus(INTERACTIVE_5_CONFIG.initialState.lowRiskDamascus);
        break;
      case 8:
        setHighRiskStock(INTERACTIVE_5_CONFIG.initialState.highRiskStock);
        setStep8PredictedValue(INTERACTIVE_5_CONFIG.staticValues.initialPredictedValue);
        break;
      case 9:
        setHighRiskDamascus(INTERACTIVE_5_CONFIG.initialState.highRiskDamascus);
        break;
      case 10:
        break;
    }

    // Update step
    setCurrentStep(newStep);
    
    // Clear any existing messages
    setErrorMessage('');
    setSuccessMessage('');

    // Reset completion states for steps after the new step
    if (newStep < 10) {
      setStep1Completed(newStep > 1);
      setStep2Completed(newStep > 2);
      setStep3Completed(newStep > 3);
      setStep4Completed(newStep > 4);
      setStep5Completed(newStep > 5);
      setStep6Completed(newStep > 6);
      setStep7Completed(newStep > 7);
      setStep8Completed(newStep > 8);
      setStep9Completed(newStep > 9);
    }
  };

  const [step1Completed, setStep1Completed] = useState(false);
  const [step2Completed, setStep2Completed] = useState(false);
  const [step3Completed, setStep3Completed] = useState(false);
  const [step4Completed, setStep4Completed] = useState(false);
  const [step5Completed, setStep5Completed] = useState(false);
  const [step6Completed, setStep6Completed] = useState(false);
  const [step7Completed, setStep7Completed] = useState(false);
  const [step8Completed, setStep8Completed] = useState(false);
  const [step9Completed, setStep9Completed] = useState(false);

  // Auto-hide success messages
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, INTERACTIVE_5_CONFIG.staticValues.successMessageTimeout);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Add new state for tracking focused element
  const [focusedElement, setFocusedElement] = useState<string | null>(
    INTERACTIVE_5_CONFIG.initialState.focusedElement,
  );

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

  // Handle drop for Step 1 (Uncertainty formula)
  const handleDropStep1 = (e: DragEvent<HTMLDivElement>, position: number) => {
    e.preventDefault();
    const draggedValue = e.dataTransfer.getData('text/plain');

    const newFormula = [...uncertaintyFormula];
    newFormula[position] = draggedValue;
    setUncertaintyFormula(newFormula);

    // Check if correct formula: |Actual demand - d| = 10
    if (
      newFormula[1] === t(INTERACTIVE_5_CONFIG.translationKeys.actual_demand) &&
      newFormula[3] === 'd' &&
      newFormula[6] === '10'
    ) {
      setSuccessMessage(t(INTERACTIVE_5_CONFIG.translationKeys.perfect_absolute_value));
      setErrorMessage('');
    } else if (newFormula[1] !== null && newFormula[3] !== null && newFormula[6] !== null) {
      setErrorMessage(t(INTERACTIVE_5_CONFIG.translationKeys.think_difference));
    }
  };

  // Reset functions for each step
  const resetStep1 = () => {
    setUncertaintyFormula(INTERACTIVE_5_CONFIG.initialState.uncertaintyFormula);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const resetStep2 = () => {
    setMaxDemand(INTERACTIVE_5_CONFIG.initialState.maxDemand);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const resetStep3 = () => {
    setMinDemand(INTERACTIVE_5_CONFIG.initialState.minDemand);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const resetStep4 = () => {
    setZeroRiskAnswer(INTERACTIVE_5_CONFIG.initialState.zeroRiskAnswer);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const resetStep5 = () => {
    setHighRiskAnswer(INTERACTIVE_5_CONFIG.initialState.highRiskAnswer);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const resetStep6 = () => {
    setLowRiskStock(INTERACTIVE_5_CONFIG.initialState.lowRiskStock);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const resetStep7 = () => {
    setLowRiskDamascus(INTERACTIVE_5_CONFIG.initialState.lowRiskDamascus);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const resetStep8 = () => {
    setHighRiskStock(INTERACTIVE_5_CONFIG.initialState.highRiskStock);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const resetStep9 = () => {
    setHighRiskDamascus(INTERACTIVE_5_CONFIG.initialState.highRiskDamascus);
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Check if current step is complete
  const isStepComplete = useCallback(() => {
    switch (currentStep) {
      case 1:
        return (
          uncertaintyFormula[1] === t(INTERACTIVE_5_CONFIG.translationKeys.actual_demand) &&
          uncertaintyFormula[3] === 'd' &&
          uncertaintyFormula[6] === '10'
        );
      case 2:
        return parseInt(maxDemand) === 80;
      case 3:
        return parseInt(minDemand) === 60;
      case 4:
        return parseInt(zeroRiskAnswer) === 80;
      case 5:
        return parseInt(highRiskAnswer) === 60;
      case 6:
        return parseInt(lowRiskStock) === 90;
      case 7:
        return parseInt(lowRiskDamascus) === 10;
      case 8:
        return parseInt(highRiskStock) === 60;
      case 9:
        return parseInt(highRiskDamascus) === 40;
      case 10:
        return true; // Final step is just display
      default:
        return false;
    }
  }, [currentStep, uncertaintyFormula, maxDemand, minDemand, zeroRiskAnswer, highRiskAnswer, lowRiskStock, lowRiskDamascus, highRiskStock, highRiskDamascus]);

  useEffect(() => {
    if(isStepComplete() && currentStep === 1) {
      setStep1Completed(true);
    }
    if(isStepComplete() && currentStep === 2) {
      setStep2Completed(true);
    }
    if(isStepComplete() && currentStep === 3) {
      setStep3Completed(true);
    }
    if(isStepComplete() && currentStep === 4) {
      setStep4Completed(true);
    }
    if(isStepComplete() && currentStep === 5) {
      setStep5Completed(true);
    }
    if(isStepComplete() && currentStep === 6) {
      setStep6Completed(true);
    }
    if(isStepComplete() && currentStep === 7) {
      setStep7Completed(true);
    }
    if(isStepComplete() && currentStep === 8) {
      setStep8Completed(true);
    }
    if(isStepComplete() && currentStep === 9) {
      setStep9Completed(true);
    }
  }, [isStepComplete, currentStep]);

  useEffect(() => {
    if(step1Completed) {
      onInteraction({
        'step-1-completed': true,
      });
    }
    if(step2Completed) {
      onInteraction({
        'step-2-completed': true,
      });
    }
    if(step3Completed) {
      onInteraction({
        'step-3-completed': true,
      });
    }
    if(step4Completed) {
      onInteraction({
        'step-4-completed': true,
      });
    }
    if(step5Completed) {
      onInteraction({
      'step-5-completed': true,
    });
    }
    if(step6Completed) {
      onInteraction({
        'step-6-completed': true,
      });
    }
    if(step7Completed) {
      onInteraction({
        'step-7-completed': true,
      });
    }
    if(step8Completed) {
      onInteraction({
        'step-8-completed': true,
      });
    }
    if(step9Completed) {
      onInteraction({
        'step-9-completed': true,
      });
    }
  }, [currentStep, step1Completed, step2Completed, step3Completed, step4Completed, step5Completed, step6Completed, step7Completed, step8Completed, step9Completed, onInteraction]);

  // Add keyboard handler for moving elements
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, value: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      placeElementInFirstEmptySpot(value);
    }
  };

  // Add click handler for placing elements
  const handleClick = (value: string) => {
    placeElementInFirstEmptySpot(value);
  };

  // Function to place element in first empty spot
  const placeElementInFirstEmptySpot = (value: string) => {
    const emptyPosition = uncertaintyFormula.findIndex((item) => item === null);
    if (emptyPosition !== -1) {
      const newFormula = [...uncertaintyFormula];
      newFormula[emptyPosition] = value;
      setUncertaintyFormula(newFormula);
      setFocusedElement(null);
    }
  };

  const showTooltip = (text: string, event: React.MouseEvent | React.TouchEvent) => {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    setTooltip({
      visible: true,
      text,
      x: rect.left + (rect.width / 2),
      y: rect.bottom + 5
    });
  };

  const hideTooltip = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  // Render risk visualization component
  const renderRiskVisualization = (
    predictedValue:
      | string
      | number
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | Iterable<ReactNode>
      | null
      | undefined,
  ) => {
    const variation = INTERACTIVE_5_CONFIG.staticValues.uncertaintyVariation;
    const highRiskValue = Math.max(0, Number(predictedValue) - variation);
    const lowRiskValue = Math.min(100, Number(predictedValue) + variation);
    const cardPosition = Math.max(0, Math.min(85, (highRiskValue / 100) * 100));
    const cardWidth = Math.max(10, ((lowRiskValue - highRiskValue) / 100) * 100);

    return (
      <div
        className="border-2 border-amber-800 rounded-lg p-8 mb-8"
        role="region"
        aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_risk_visualization)}
      >
        {/* Slider */}
        <div className="mb-8">
          <label className="block text-amber-800 text-md font-bold mb-4" htmlFor="prediction-slider">
            {t('scenes.S27.S27_D0_FX_C9.predicted_value')}: {predictedValue}
          </label>
        </div>

        {/* Scale Bar */}
        <div
          className="relative mb-8"
          role="region"
          aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_risk_scale)}
        >
          <div className="relative h-8 bg-orange-400 rounded-lg shadow-md">
            <div className="absolute left-0 -bottom-10 text-orange-700 text-md font-bold" aria-hidden="true">
              0
            </div>
            <div className="absolute right-0 -bottom-10 text-orange-700 text-md font-bold" aria-hidden="true">
              100
            </div>

            {/* Risk Card */}
            <div
              className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-300"
              style={{
                left: `${cardPosition}%`,
                width: `${cardWidth}%`,
                minWidth: '120px',
              }}
              role="region"
              aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_risk_range)}
            >
              <div className="bg-white border-3 border-blue-500 rounded-xl shadow-lg p-1">
                <div className="flex justify-between items-center">
                  {/* High Risk (H) */}
                  <div className="text-center">
                    <div
                      className="w-8 h-8 bg-red-500 border-2 border-red-700 rounded-lg flex items-center justify-center transform rotate-45 mb-1"
                      role="img"
                      aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_high_risk_indicator)}
                    >
                      <span className="transform -rotate-45 text-md font-bold text-white">H</span>
                    </div>
                    <div
                      className="text-md font-bold text-red-600"
                      aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_high_risk_value)}
                    >
                      {highRiskValue}
                    </div>
                  </div>

                  {/* Predicted (P) */}
                  <div className="text-center mx-3">
                    <div
                      className="w-10 h-10 bg-blue-500 border-2 border-blue-400 rounded-full flex items-center justify-center mb-1"
                      role="img"
                      aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_predicted_value_indicator)}
                    >
                      <span className="text-md font-bold text-white">P</span>
                    </div>
                    <div
                      className="text-md font-bold text-blue-600"
                      aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_predicted_value)}
                    >
                      {predictedValue}
                    </div>
                  </div>

                  {/* Low Risk (L) */}
                  <div className="text-center">
                    <div
                      className="w-8 h-8 bg-green-700 border-2 border-green-700 rounded-lg flex items-center justify-center transform rotate-45 mb-1"
                      role="img"
                      aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_low_risk_indicator)}
                    >
                      <span className="transform -rotate-45 text-md font-bold text-white">L</span>
                    </div>
                    <div
                      className="text-md font-bold text-green-700"
                      aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_low_risk_value)}
                    >
                      {lowRiskValue}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div
          className="flex justify-center items-center gap-6 text-md mt-12"
          role="region"
          aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_risk_legend)}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 bg-red-500 rounded transform rotate-45"
              role="img"
              aria-label={t('scenes.S27.S27_D0_FX_C9.aria_high_risk_symbol')}
            ></div>
            <span className="text-amber-800 font-semibold">
              H = <span className="font-besley italic font-bold">{t('scenes.S27.S27_D0_FX_C9.p_minus_10')}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 bg-blue-500 rounded-full"
              role="img"
              aria-label={t('scenes.S27.S27_D0_FX_C9.aria_predicted_value_symbol')}
            ></div>
            <span className="text-amber-800 font-semibold">{t('scenes.S27.S27_D0_FX_C9.p_equals_predicted')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 bg-green-700 rounded transform rotate-45"
              role="img"
              aria-label={t('scenes.S27.S27_D0_FX_C9.aria_low_risk_symbol')}
            ></div>
            <span className="text-amber-800 font-semibold">
              L = <span className="font-besley italic font-bold">{t('scenes.S27.S27_D0_FX_C9.p_plus_10')}</span>
            </span>
          </div>
        </div>
      </div>
    );
  };
  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div
            className="space-y-6"
            role="region"
            aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_step_1)}
          >
            <div className="border-2 border-green-700 rounded-lg p-6">
              <h3
                className="text-xl font-bold mb-4 text-center text-green-800"
                aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_modeling_uncertainty)}
              >
                {t(INTERACTIVE_5_CONFIG.translationKeys.modeling_uncertainty)}
              </h3>

              <div
                className="flex justify-center items-center gap-2 mb-6 flex-wrap relative"
                role="group"
                aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_formula_construction)}
              >
                <div 
                  className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center text-2xl font-bold text-white hover:bg-green-600 active:bg-green-600 touch-action-manipulation cursor-help transition-colors duration-200" 
                  role="button"
                  aria-label={t('scenes.S27.S27_D0_FX_C9.absolute_value_start')}
                  onMouseEnter={(e) => showTooltip(t('scenes.S27.S27_D0_FX_C9.absolute_value_start'), e)}
                  onMouseLeave={hideTooltip}
                  onClick={(e) => showTooltip(t('scenes.S27.S27_D0_FX_C9.absolute_value_start'), e)}
                  onTouchStart={(e) => {
                    e.currentTarget.classList.add('bg-green-600');
                    showTooltip(t('scenes.S27.S27_D0_FX_C9.absolute_value_start'), e);
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.classList.remove('bg-green-600');
                    setTimeout(hideTooltip, 1500);
                  }}
                >
                  |
                </div>
                <div
                  className="w-40 h-12 border-2 border-green-700 rounded-lg flex items-center justify-center text-md font-bold bg-white font-besley italic text-center px-2"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropStep1(e, 1)}
                  role="textbox"
                  aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_drop_zone_actual_demand)}
                  aria-multiline="false"
                >
                  {uncertaintyFormula[1]}
                </div>
                <div 
                  className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center text-xl font-bold text-white hover:bg-green-600 active:bg-green-600 touch-action-manipulation cursor-help transition-colors duration-200"
                  role="button"
                  aria-label={t('scenes.S27.S27_D0_FX_C9.minus_symbol')}
                  onMouseEnter={(e) => showTooltip(t('scenes.S27.S27_D0_FX_C9.minus_symbol'), e)}
                  onMouseLeave={hideTooltip}
                  onClick={(e) => showTooltip(t('scenes.S27.S27_D0_FX_C9.minus_symbol'), e)}
                  onTouchStart={(e) => {
                    e.currentTarget.classList.add('bg-green-600');
                    showTooltip(t('scenes.S27.S27_D0_FX_C9.minus_symbol'), e);
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.classList.remove('bg-green-600');
                    setTimeout(hideTooltip, 1500);
                  }}
                >
                  -
                </div>
                <div
                  className="w-12 h-12 border-2 border-green-700 rounded-lg flex items-center justify-center text-xl font-bold bg-white font-besley italic text-center"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropStep1(e, 3)}
                  role="textbox"
                  aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_drop_zone_d)}
                  aria-multiline="false"
                >
                  {uncertaintyFormula[3]}
                </div>
                <div 
                  className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center text-2xl font-bold text-white hover:bg-green-600 active:bg-green-600 touch-action-manipulation cursor-help transition-colors duration-200"
                  role="button"
                  aria-label={t('scenes.S27.S27_D0_FX_C9.absolute_value_end')}
                  onMouseEnter={(e) => showTooltip(t('scenes.S27.S27_D0_FX_C9.absolute_value_end'), e)}
                  onMouseLeave={hideTooltip}
                  onClick={(e) => showTooltip(t('scenes.S27.S27_D0_FX_C9.absolute_value_end'), e)}
                  onTouchStart={(e) => {
                    e.currentTarget.classList.add('bg-green-600');
                    showTooltip(t('scenes.S27.S27_D0_FX_C9.absolute_value_end'), e);
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.classList.remove('bg-green-600');
                    setTimeout(hideTooltip, 1500);
                  }}
                >
                  |
                </div>
                <div 
                  className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center text-2xl font-bold text-white hover:bg-green-600 active:bg-green-600 touch-action-manipulation cursor-help transition-colors duration-200"
                  role="button"
                  aria-label={t('scenes.S27.S27_D0_FX_C9.equals_symbol')}
                  onMouseEnter={(e) => showTooltip(t('scenes.S27.S27_D0_FX_C9.equals_symbol'), e)}
                  onMouseLeave={hideTooltip}
                  onClick={(e) => showTooltip(t('scenes.S27.S27_D0_FX_C9.equals_symbol'), e)}
                  onTouchStart={(e) => {
                    e.currentTarget.classList.add('bg-green-600');
                    showTooltip(t('scenes.S27.S27_D0_FX_C9.equals_symbol'), e);
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.classList.remove('bg-green-600');
                    setTimeout(hideTooltip, 1500);
                  }}
                >
                  =
                </div>
                <div
                  className="w-16 h-12 border-2 border-green-700 rounded-lg flex items-center justify-center text-xl font-bold bg-white font-besley italic text-center"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropStep1(e, 6)}
                  role="textbox"
                  aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_drop_zone_10)}
                  aria-multiline="false"
                >
                  {uncertaintyFormula[6]}
                </div>
              </div>

              <div
                className="flex justify-center gap-4 flex-wrap"
                role="group"
                aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_draggable_elements)}
              >
                <div
                  className={`w-40 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-md font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-800 font-besley italic text-center px-2 ${focusedElement === t(INTERACTIVE_5_CONFIG.translationKeys.actual_demand) ? 'ring-2 ring-white ring-offset-2' : ''}`}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, t(INTERACTIVE_5_CONFIG.translationKeys.actual_demand))}
                  onKeyDown={(e) => handleKeyDown(e, t(INTERACTIVE_5_CONFIG.translationKeys.actual_demand))}
                  onClick={() => handleClick(t(INTERACTIVE_5_CONFIG.translationKeys.actual_demand))}
                  tabIndex={0}
                  role="button"
                  aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_drag_actual_demand)}
                  aria-grabbed={focusedElement === t(INTERACTIVE_5_CONFIG.translationKeys.actual_demand)}
                >
                  {t(INTERACTIVE_5_CONFIG.translationKeys.actual_demand)}
                </div>
                <div
                  className={`w-12 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-xl font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-800 font-besley italic ${focusedElement === 'd' ? 'ring-2 ring-white ring-offset-2' : ''}`}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, 'd')}
                  onKeyDown={(e) => handleKeyDown(e, 'd')}
                  onClick={() => handleClick('d')}
                  tabIndex={0}
                  role="button"
                  aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_drag_d)}
                  aria-grabbed={focusedElement === 'd'}
                >
                  d
                </div>
                <div
                  className={`w-16 h-12 bg-amber-800 rounded-lg shadow-md flex items-center justify-center text-xl font-bold text-white cursor-grab active:cursor-grabbing hover:bg-amber-800 font-besley italic ${focusedElement === '10' ? 'ring-2 ring-white ring-offset-2' : ''}`}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, '10')}
                  onKeyDown={(e) => handleKeyDown(e, '10')}
                  onClick={() => handleClick('10')}
                  tabIndex={0}
                  role="button"
                  aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_drag_10)}
                  aria-grabbed={focusedElement === '10'}
                >
                  10
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg"
                  onClick={resetStep1}
                  aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_reset_formula)}
                >
                  {t(INTERACTIVE_5_CONFIG.translationKeys.reset)}
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="border-2 border-orange-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-center text-orange-800">
                {t(INTERACTIVE_5_CONFIG.translationKeys.understanding_range)}
              </h3>

              <div className="bg-white p-4 rounded-lg mb-4">
                <p className="text-center text-lg">
                  {t('scenes.S27.S27_D0_FX_C9.this_week_prediction')}:{' '}
                  <strong className="font-besley italic">{t('scenes.S27.S27_D0_FX_C9.70_pounds')}</strong>
                </p>
                <p className="text-center text-md text-gray-800 mt-2">
                  {t('scenes.S27.S27_D0_FX_C9.using_formula')}:{' '}
                  <span className="font-besley italic">
                    |{t('scenes.S27.S27_D0_FX_C9.actual_demand')} - d| = 10
                  </span>
                </p>
              </div>

              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="text-lg font-bold">
                  {t(INTERACTIVE_5_CONFIG.translationKeys.maximum_possible_demand)}:
                </div>
                <input
                  type="number"
                  value={maxDemand}
                  onChange={(e) => setMaxDemand(e.target.value)}
                  className="w-20 h-12 text-center text-xl font-bold border-2 border-orange-800 rounded"
                  placeholder="?"
                  aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_enter_maximum_demand)}
                  aria-required="true"
                />
                <div className="text-lg">{t(INTERACTIVE_5_CONFIG.translationKeys.pounds)}</div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg"
                  onClick={resetStep2}
                  aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_reset_maximum_demand)}
                >
                  {t(INTERACTIVE_5_CONFIG.translationKeys.reset)}
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="border-2 border-blue-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-center text-blue-800">
                {t(INTERACTIVE_5_CONFIG.translationKeys.minimum_demand)}
              </h3>

              <div className="bg-white p-4 rounded-lg mb-4">
                <p className="text-center text-lg">
                  {t('scenes.S27.S27_D0_FX_C9.this_week_prediction')}:{' '}
                  <strong className="font-besley italic">{t('scenes.S27.S27_D0_FX_C9.70_pounds')}</strong>
                </p>
                <p className="text-center text-md text-gray-800 mt-2">
                  {t('scenes.S27.S27_D0_FX_C9.maximum_demand')}:{' '}
                  <span className="font-besley italic">{t('scenes.S27.S27_D0_FX_C9.80_pounds')}</span>
                </p>
              </div>

              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="text-lg font-bold">
                  {t(INTERACTIVE_5_CONFIG.translationKeys.minimum_possible_demand)}:
                </div>
                <input
                  type="number"
                  value={minDemand}
                  onChange={(e) => setMinDemand(e.target.value)}
                  className="w-20 h-12 text-center text-xl font-bold border-2 border-blue-800 rounded"
                  placeholder={t('scenes.S27.S27_D0_FX_C9.placeholder_question')}
                  aria-label={t('scenes.S27.S27_D0_FX_C9.aria_enter_minimum_demand')}
                  aria-required="true"
                />
                <div className="text-lg">{t(INTERACTIVE_5_CONFIG.translationKeys.pounds)}</div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg"
                  onClick={resetStep3}
                  aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_reset_minimum_demand)}
                >
                  {t(INTERACTIVE_5_CONFIG.translationKeys.reset)}
                </button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {/* Risk Visualization */}
            {renderRiskVisualization(step4PredictedValue)}

            {/* Scenario Card */}
            <div className="border-2 border-red-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-center text-red-800">
                {t(INTERACTIVE_5_CONFIG.translationKeys.zero_risk_strategy)}
              </h3>

              <div className="bg-white p-4 rounded-lg mb-4">
                <p className="text-center text-lg">
                  <strong>
                    📋 {t('scenes.S27.S27_D0_FX_C9.set_slider_to_predicted_value')}{' '}
                    <span className="font-besley italic">{t('scenes.S27.S27_D0_FX_C9.70_pounds')}</span>
                  </strong>
                </p>
                <p className="text-center text-md text-gray-600 mt-2">
                  {t('scenes.S27.S27_D0_FX_C9.guarantee_no_shortages')}
                </p>
              </div>

              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="text-lg font-bold">
                  {t(INTERACTIVE_5_CONFIG.translationKeys.stock_in_baghdad)}:
                </div>
                <input
                  type="number"
                  value={zeroRiskAnswer}
                  onChange={(e) => setZeroRiskAnswer(e.target.value)}
                  className="w-20 h-12 text-center text-xl font-bold border-2 border-red-600 rounded"
                  placeholder={t('scenes.S27.S27_D0_FX_C9.placeholder_question')}
                  aria-label={t('scenes.S27.S27_D0_FX_C9.aria_enter_stock_baghdad')}
                  aria-required="true"
                />
                <div className="text-lg">{t(INTERACTIVE_5_CONFIG.translationKeys.pounds)}</div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg"
                  onClick={resetStep4}
                  aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_reset_zero_risk_stock)}
                >
                  {t(INTERACTIVE_5_CONFIG.translationKeys.reset)}
                </button>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            {/* Risk Visualization */}
            {renderRiskVisualization(step5PredictedValue)}

            {/* Scenario Card */}
            <div className="border-2 border-yellow-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-center text-yellow-800">
                {t(INTERACTIVE_5_CONFIG.translationKeys.high_risk_strategy)}
              </h3>

              <div className="bg-white p-4 rounded-lg mb-4">
                <p className="text-center text-lg">
                  <strong>
                    📋 {t('scenes.S27.S27_D0_FX_C9.set_slider_to_predicted_value')}{' '}
                    <span className="font-besley italic">{t('scenes.S27.S27_D0_FX_C9.70_pounds')}</span>
                  </strong>
                </p>
                <p className="text-center text-md text-gray-800 mt-2">
                  {t('scenes.S27.S27_D0_FX_C9.maximum_risk_gambling')}
                </p>
              </div>

              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="text-lg font-bold">
                  {t(INTERACTIVE_5_CONFIG.translationKeys.stock_in_baghdad)}:
                </div>
                <input
                  type="number"
                  value={highRiskAnswer}
                  onChange={(e) => setHighRiskAnswer(e.target.value)}
                  className="w-20 h-12 text-center text-xl font-bold border-2 border-yellow-800 rounded"
                  placeholder={t('scenes.S27.S27_D0_FX_C9.placeholder_question')}
                  aria-label={t('scenes.S27.S27_D0_FX_C9.aria_enter_stock_baghdad')}
                  aria-required="true"
                />
                <div className="text-lg">{t(INTERACTIVE_5_CONFIG.translationKeys.pounds)}</div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg"
                  onClick={resetStep5}
                  aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_reset_high_risk_stock)}
                >
                  {t(INTERACTIVE_5_CONFIG.translationKeys.reset)}
                </button>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            {/* Risk Visualization */}
            {renderRiskVisualization(step6PredictedValue)}

            {/* Scenario Card */}
            <div className="border-2 border-purple-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-center text-purple-900">
                {t(INTERACTIVE_5_CONFIG.translationKeys.low_risk_scenario)}
              </h3>

              <div className="bg-white p-4 rounded-lg mb-4">
                <p className="text-center text-lg">
                  <strong>
                    📋 {t('scenes.S27.S27_D0_FX_C9.set_slider_to_predicted_value')}{' '}
                    <span className="font-besley italic">{t('scenes.S27.S27_D0_FX_C9.80_pounds')}</span>
                  </strong>
                </p>
                <p className="text-center text-lg mt-2">{t('scenes.S27.S27_D0_FX_C9.holiday_season_damascus')}</p>
                <p className="text-center text-md text-gray-600 mt-2">
                  {t('scenes.S27.S27_D0_FX_C9.low_risk_stock_question')}
                </p>
              </div>

              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="text-lg font-bold">
                  {t(INTERACTIVE_5_CONFIG.translationKeys.stock_for_low_risk)}:
                </div>
                <input
                  type="number"
                  value={lowRiskStock}
                  onChange={(e) => setLowRiskStock(e.target.value)}
                  className="w-20 h-12 text-center text-xl font-bold border-2 border-purple-600 rounded"
                  placeholder={t('scenes.S27.S27_D0_FX_C9.placeholder_question')}
                  aria-label={t('scenes.S27.S27_D0_FX_C9.aria_enter_stock_low_risk')}
                  aria-required="true"
                />
                <div className="text-lg">{t(INTERACTIVE_5_CONFIG.translationKeys.pounds)}</div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg"
                  onClick={resetStep6}
                  aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_reset_low_risk_stock)}
                >
                  {t(INTERACTIVE_5_CONFIG.translationKeys.reset)}
                </button>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="border-2 border-indigo-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-center text-indigo-900">
                {t(INTERACTIVE_5_CONFIG.translationKeys.damascus_allocation_low_risk)}
              </h3>

              <div className="bg-white p-4 rounded-lg mb-4">
                <p className="text-center text-lg">
                  {t('scenes.S27.S27_D0_FX_C9.total_inventory')}:{' '}
                  <strong className="font-besley italic">{t('scenes.S27.S27_D0_FX_C9.100_pounds')}</strong>
                </p>
                <p className="text-center text-lg mt-2">
                  {t('scenes.S27.S27_D0_FX_C9.baghdad_stock')}:{' '}
                  <strong className="font-besley italic">{t('scenes.S27.S27_D0_FX_C9.90_pounds')}</strong>
                </p>
              </div>

              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="text-lg font-bold">
                  {t(INTERACTIVE_5_CONFIG.translationKeys.send_to_damascus)}:
                </div>
                <input
                  type="number"
                  value={lowRiskDamascus}
                  onChange={(e) => setLowRiskDamascus(e.target.value)}
                  className="w-20 h-12 text-center text-xl font-bold border-2 border-indigo-800 rounded"
                  placeholder={t('scenes.S27.S27_D0_FX_C9.placeholder_question')}
                  aria-label={t('scenes.S27.S27_D0_FX_C9.aria_enter_damascus_allocation')}
                  aria-required="true"
                />
                <div className="text-lg">{t(INTERACTIVE_5_CONFIG.translationKeys.pounds)}</div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg"
                  onClick={resetStep7}
                  aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_reset_damascus_allocation)}
                >
                  {t(INTERACTIVE_5_CONFIG.translationKeys.reset)}
                </button>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            {/* Risk Visualization */}
            {renderRiskVisualization(step8PredictedValue)}

            {/* Scenario Card */}
            <div className="border-2 border-pink-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-center text-pink-900">
                {t('scenes.S27.S27_D0_FX_C9.high_risk_scenario')}
              </h3>

              <div className="bg-white p-4 rounded-lg mb-4">
                <p className="text-center text-lg">
                  <strong>
                    📋 {t('scenes.S27.S27_D0_FX_C9.set_slider_to_predicted_value')}{' '}
                    <span className="font-besley italic">{t('scenes.S27.S27_D0_FX_C9.70_pounds')}</span>
                  </strong>
                </p>
                <p className="text-center text-lg mt-2">{t('scenes.S27.S27_D0_FX_C9.daughters_wedding')}</p>
                <p className="text-center text-lg mt-2">{t('scenes.S27.S27_D0_FX_C9.damascus_prices_high')}</p>
                <p className="text-center text-md text-gray-600 mt-2">
                  {t('scenes.S27.S27_D0_FX_C9.high_risk_stock_question')}
                </p>
              </div>

              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="text-lg font-bold">
                  {t(INTERACTIVE_5_CONFIG.translationKeys.stock_for_high_risk)}:
                </div>
                <input
                  type="number"
                  value={highRiskStock}
                  onChange={(e) => setHighRiskStock(e.target.value)}
                  className="w-20 h-12 text-center text-xl font-bold border-2 border-pink-800 rounded"
                  placeholder={t('scenes.S27.S27_D0_FX_C9.placeholder_question')}
                  aria-label={t('scenes.S27.S27_D0_FX_C9.aria_enter_stock_high_risk')}
                  aria-required="true"
                />
                <div className="text-lg">{t(INTERACTIVE_5_CONFIG.translationKeys.pounds)}</div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg"
                  onClick={resetStep8}
                  aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_reset_high_risk_stock)}
                >
                  {t(INTERACTIVE_5_CONFIG.translationKeys.reset)}
                </button>
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div className="border-2 border-teal-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-center text-teal-900">
                {t(INTERACTIVE_5_CONFIG.translationKeys.damascus_allocation_high_risk)}
              </h3>

              <div className="bg-white p-4 rounded-lg mb-4">
                <p className="text-center text-lg">
                  {t('scenes.S27.S27_D0_FX_C9.total_inventory')}:{' '}
                  <strong className="font-besley italic">{t('scenes.S27.S27_D0_FX_C9.100_pounds')}</strong>
                </p>
                <p className="text-center text-lg mt-2">
                  {t('scenes.S27.S27_D0_FX_C9.baghdad_stock')}:{' '}
                  <strong className="font-besley italic">{t('scenes.S27.S27_D0_FX_C9.60_pounds')}</strong>
                </p>
              </div>

              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="text-lg font-bold">
                  {t(INTERACTIVE_5_CONFIG.translationKeys.send_to_damascus)}:
                </div>
                <input
                  type="number"
                  value={highRiskDamascus}
                  onChange={(e) => setHighRiskDamascus(e.target.value)}
                  className="w-20 h-12 text-center text-xl font-bold border-2 border-teal-800 rounded"
                  placeholder={t('scenes.S27.S27_D0_FX_C9.placeholder_question')}
                  aria-label={t('scenes.S27.S27_D0_FX_C9.aria_enter_damascus_allocation')}
                  aria-required="true"
                />
                <div className="text-lg">{t(INTERACTIVE_5_CONFIG.translationKeys.pounds)}</div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg"
                  onClick={resetStep9}
                  aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_reset_damascus_allocation)}
                >
                  {t(INTERACTIVE_5_CONFIG.translationKeys.reset)}
                </button>
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            <div className="border-2 border-green-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-center text-green-900">
                {t(INTERACTIVE_5_CONFIG.translationKeys.wisdom_achieved)}
              </h3>

              <div className="bg-white p-6 rounded-lg shadow-inner">
                <div className="text-center space-y-4">
                  <p className="text-lg font-semibold text-gray-800">
                    {t(INTERACTIVE_5_CONFIG.translationKeys.congratulations)}
                  </p>
                  <p className="text-md text-gray-700">
                    {t(INTERACTIVE_5_CONFIG.translationKeys.mastered_risk_management)}
                  </p>

                  <div className="p-4 rounded-lg border border-yellow-800">
                    <p className="text-md text-gray-900 italic">
                      "{t(INTERACTIVE_5_CONFIG.translationKeys.mathematics_doesnt_just_optimize)}"
                    </p>
                    <p className="text-md text-gray-900 mt-2">
                      - {t(INTERACTIVE_5_CONFIG.translationKeys.al_khwarizmi)}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-3 rounded border">
                      <h4 className="font-bold text-red-900">
                        {t(INTERACTIVE_5_CONFIG.translationKeys.low_risk_strategy)}
                      </h4>
                      <p className="text-md text-red-900">
                        {t(INTERACTIVE_5_CONFIG.translationKeys.low_risk_strategy_description)}
                      </p>
                    </div>
                    <div className="p-3 rounded border">
                      <h4 className="font-bold text-yellow-900">
                        {t(INTERACTIVE_5_CONFIG.translationKeys.high_risk_strategy)}
                      </h4>
                      <p className="text-md text-yellow-900">
                        {t(INTERACTIVE_5_CONFIG.translationKeys.high_risk_strategy_description)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>{t(INTERACTIVE_5_CONFIG.translationKeys.loading)}</div>;
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen"
      role="main"
      aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_risk_management)}
    >
      {/* Main Interactive Card */}
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-4xl"
        role="region"
        aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_interactive_content)}
      >
        <p className="text-center text-amber-800 mb-6 font-bold border rounded-lg border-amber-800 p-2"><span style={{ fontFamily: 'Besley, serif', fontStyle: 'italic' }}>d</span> = {t(INTERACTIVE_5_CONFIG.translationKeys.pounds_predicted)}</p>
        {renderStepContent()}

        {/* Feedback messages */}
        {(errorMessage || successMessage) && (
          <div
            className={`mt-4 p-3 rounded-lg text-center ${successMessage ? 'border border-green-700 text-green-800' : 'border border-red-700 text-red-800'}`}
            role="alert"
            aria-live="polite"
            aria-label={
              successMessage
                ? t(INTERACTIVE_5_CONFIG.translationKeys.aria_success_message)
                : t(INTERACTIVE_5_CONFIG.translationKeys.aria_error_message)
            }
          >
            {successMessage || errorMessage}
          </div>
        )}
      </div>

      {/* Add instructions for keyboard users */}
      <div
        className="mt-4 text-md text-gray-600 text-center"
        role="note"
        aria-label={t(INTERACTIVE_5_CONFIG.translationKeys.aria_keyboard_instructions)}
      >
        <p>{t(INTERACTIVE_5_CONFIG.translationKeys.keyboard_instructions)}</p>
      </div>

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

export default RiskManagementInteractive;
