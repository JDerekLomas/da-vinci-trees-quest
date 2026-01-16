import React, { useCallback, useEffect, useRef, useState } from 'react';
import { InputBoxInteraction, InteractionState } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { useSvgIcon } from '../../../hooks/useSvgIcon';
import { ENTER_KEY } from '../../../constants/constants';
import useKeyPress from '../../../hooks/useKeyPress';
import './interactive-inputbox.css';

interface InteractiveInputBoxProps {
  interaction: InputBoxInteraction;
  onInteraction: (state: InteractionState) => void;
  interactionState: InteractionState | undefined;
  onSubmit: () => void;
  isSubmitTriggered?: boolean;
}

const InteractiveInputBox: React.FC<InteractiveInputBoxProps> = ({
  interaction,
  onInteraction,
  interactionState,
  onSubmit,
  isSubmitTriggered,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputValue2, setInputValue2] = useState<string>('');
  const [showCheckmark, setShowCheckmark] = useState<boolean>(false);
  const [showCheckmark2, setShowCheckmark2] = useState<boolean>(false);
  const [isInputFieldFocused, setIsInputFieldFocused] = useState<boolean>(false);
  const { t } = useTranslations();
  const CheckmarkIcon = useSvgIcon('correct-checkmark');

  const inputRef = useRef<HTMLInputElement>(null);

  const sanitizeNumber = (value: string): string | null => {
    if (!/^\d*\.?\d*$/.test(value)) return null;
    const [integerPart, decimalPart] = value.split('.');
    if (decimalPart && decimalPart.length > 2) return null;
    return decimalPart !== undefined
      ? `${integerPart}.${decimalPart}`
      : integerPart;
  };


  const checkAnswer = useCallback(() => {
    if (inputValue.trim() === '' || inputValue2.trim() === '') {
      onInteraction({ isCorrect: false, isEmpty: true });
      return;
    }
    // Merge the two input values with a comma
    const mergedValue = `${inputValue},${inputValue2}`;
    const isCorrect = interaction.correctnessFunction ? interaction.correctnessFunction(mergedValue) : true;

    onInteraction({ isCorrect, isEmpty: false, value: mergedValue });
  }, [inputValue, inputValue2, interaction, onInteraction]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const sanitized = sanitizeNumber(newValue);

    if (sanitized !== null) {
      setInputValue(sanitized);
      checkAnswer();
    }
  };

  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const sanitized = sanitizeNumber(newValue);

    if (sanitized !== null) {
      setInputValue2(sanitized);
      checkAnswer();
    }
  };

  useEffect(() => {
    onInteraction({ isCorrect: false, isEmpty: true });
    checkAnswer();
  }, [onInteraction, checkAnswer]);

  useEffect(() => {
    if (isSubmitTriggered || interactionState?.isCorrect) {
      setShowCheckmark(true);
      setShowCheckmark2(true);
      if (interactionState?.isCorrect && interactionState.value) {
        const [value1, value2] = interactionState.value.split(',');
        setInputValue(value1);
        setInputValue2(value2);
      }
    }
  }, [interactionState, isSubmitTriggered]);

  const handleSubmit = () => {
    if (isInputFieldFocused) {
      onSubmit();
    }
  };

  useKeyPress({
    className: 'interactive-input-box',
    selector: "input[type='number']",
    keyPressed: ENTER_KEY,
    callback: handleSubmit,
  });

  return (
    <div className="relative mt-5">
      <div className="flex flex-wrap min-[1560px]:justify-center justify-normal gap-x-3 gap-y-3 items-center w-full mx-auto">
        {/* Input 1 Container */}
        <div className="relative min-w-[75px] max-w-[150px] flex-1">
          <input
            ref={inputRef}
            type="number"
            className={`interactive-input-box w-full border rounded-[0.125rem] text-1.5xl font-medium px-4 py-[6px] ${showCheckmark
              ? 'bg-gray-100 border-gray-300 text-gray-700 cursor-not-allowed pr-12'
              : 'border-[#333333]'
              }`}
            placeholder={t(interaction.placeholder_1 || '')}
            aria-label={t('scenes.common.enter_answer')}
            tabIndex={0}
            value={inputValue}
            onChange={handleInputChange}
            disabled={showCheckmark}
            onFocus={() => setIsInputFieldFocused(true)}
            onBlur={() => setIsInputFieldFocused(false)}
          />
          {showCheckmark && (
            <div className="absolute right-3 top-[45%] transform -translate-y-1/2">
              <CheckmarkIcon />
            </div>
          )}
        </div>

        {/* Prefix Text */}
        {interaction.prefixText && (
          <div className="text-base" dangerouslySetInnerHTML={{ __html: t(interaction.prefixText) }} />
        )}

        {/* Input 2 Container */}
        <div className="relative min-w-[75px] max-w-[150px] flex-1">
          <input
            ref={inputRef}
            type="number"
            className={`interactive-input-box w-full border rounded-[0.125rem] text-1.5xl font-medium px-4 py-[6px] ${showCheckmark2
              ? 'bg-gray-100 border-gray-300 text-gray-700 cursor-not-allowed pr-12'
              : 'border-[#333333]'
              }`}
            placeholder={t(interaction.placeholder_2 || '')}
            aria-label={t('scenes.common.enter_answer')}
            tabIndex={0}
            value={inputValue2}
            onChange={handleInputChange2}
            disabled={showCheckmark2}
            onFocus={() => setIsInputFieldFocused(true)}
            onBlur={() => setIsInputFieldFocused(false)}
          />
          {showCheckmark2 && (
            <div className="absolute right-3 top-[45%] transform -translate-y-1/2">
              <CheckmarkIcon />
            </div>
          )}
        </div>
      </div>
    </div>


  );
};

export default InteractiveInputBox;
