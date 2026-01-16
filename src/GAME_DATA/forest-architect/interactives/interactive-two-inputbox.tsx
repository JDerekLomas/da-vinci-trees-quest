import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TwoInputBoxInteraction, InteractionState } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { ENTER_KEY } from '../../../constants/constants';
import useKeyPress from '../../../hooks/useKeyPress';
import './interactive-two-inputbox.css';
import { useSvgIcon } from '../../../hooks/useSvgIcon';

interface InteractiveInputBoxProps {
  interaction: TwoInputBoxInteraction;
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
  const [inputValue1, setInputValue1] = useState<string>('');
  const [inputValue2, setInputValue2] = useState<string>('');
  const [showCheckmark, setShowCheckmark] = useState<boolean>(false);
  const [isInputFieldFocused, setIsInputFieldFocused] = useState<boolean>(false);
  const { t } = useTranslations();
  const CheckmarkIcon = useSvgIcon('correct-checkmark');

  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);

  const checkAnswers = useCallback(() => {
    if (inputValue1.trim() === '' || inputValue2.trim() === '') {
      onInteraction({ isCorrect: false, isEmpty: true });
      return;
    }

    const isCorrect = interaction.correctnessFunction(inputValue1, inputValue2);

    onInteraction({
      isCorrect,
      isEmpty: false,
      value: inputValue1,
      value2: inputValue2,
    });
  }, [inputValue1, inputValue2, interaction, onInteraction]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, inputNumber: 1 | 2) => {
    const newValue = event.target.value;
    if (inputNumber === 1) {
      setInputValue1(newValue);
    } else {
      setInputValue2(newValue);
    }
    checkAnswers();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key.toLowerCase() === 'e') {
      event.preventDefault();
    }
  };

  useEffect(() => {
    onInteraction({ isCorrect: false, isEmpty: true });
    checkAnswers();
  }, [onInteraction, checkAnswers]);

  useEffect(() => {
    if (isSubmitTriggered || interactionState?.isCorrect) {
      setShowCheckmark(true);
      if (interactionState?.isCorrect && interactionState.value && interactionState.value2) {
        setInputValue1(interactionState.value);
        setInputValue2(interactionState.value2);
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

  const renderInput = (
    inputNumber: 1 | 2,
    value: string,
    ref: React.RefObject<HTMLInputElement>,
    prefixText?: string,
  ) => (
    <div className="relative w-full interactive-input-box">
      {prefixText && (
        <div
          className="whitespace-nowrap mb-2 lg:mb-0 lg:mr-4 lg:w-48"
          dangerouslySetInnerHTML={{
            __html: t(prefixText),
          }}
        />
      )}
      <div className="flex gap-x-2 items-center w-full">
        <input
          ref={ref}
          type="number"
          className={`interactive-input-box w-full border rounded-[0.125rem] text-1.5xl font-medium px-4 py-[4px] ${
            showCheckmark ? 'bg-gray-100 border-gray-300 text-gray-700 cursor-not-allowed' : 'border-[#333333]'
          }`}
          placeholder={t('scenes.common.enter_answer')}
          aria-label={`${t('scenes.common.enter_answer')} ${inputNumber}`}
          tabIndex={0}
          value={value}
          onChange={(e) => handleInputChange(e, inputNumber)}
          onKeyDown={handleKeyDown}
          disabled={showCheckmark}
          onFocus={() => setIsInputFieldFocused(true)}
          onBlur={() => setIsInputFieldFocused(false)}
        />
        {showCheckmark && (
          <div className="relative right-0">
            <CheckmarkIcon />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative mt-5">
      <div className="flex flex-col lg:hidden w-full space-y-4">
        {interaction.prefixText1 && renderInput(1, inputValue1, input1Ref, interaction.prefixText1)}
        {interaction.prefixText2 && renderInput(2, inputValue2, input2Ref, interaction.prefixText2)}
      </div>
      <div className="hidden lg:grid lg:grid-cols-[auto_1fr] lg:gap-x-4 lg:gap-y-4 lg:items-center w-full">
        {interaction.prefixText1 && (
          <div className="whitespace-nowrap" dangerouslySetInnerHTML={{ __html: t(interaction.prefixText1) }} />
        )}
        {renderInput(1, inputValue1, input1Ref)}

        {interaction.prefixText2 && (
          <div className="whitespace-nowrap" dangerouslySetInnerHTML={{ __html: t(interaction.prefixText2) }} />
        )}
        {renderInput(2, inputValue2, input2Ref)}
      </div>
    </div>
  );
};

export default InteractiveInputBox;
