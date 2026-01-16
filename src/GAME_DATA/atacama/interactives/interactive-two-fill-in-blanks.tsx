import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TwoInputBoxInteraction, InteractionState } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { ENTER_KEY } from '../../../constants/constants';
import useKeyPress from '../../../hooks/useKeyPress';
import './interactive-two-inputbox.css';

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
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isInputFieldFocused, setIsInputFieldFocused] = useState<boolean>(false);
  const { t } = useTranslations();

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
      setIsCorrect(true);
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

  return (
    <div className="relative mt-5 flex flex-col gap-2">
      {/* First Input Container */}
      <div className="relative">
        <div className="w-full flex gap-x-3 items-center interactive-input-box text-xl mb-2">
          {interaction.prefixText1 && (
            <div
              className="whitespace-nowrap"
              dangerouslySetInnerHTML={{
                __html: t(interaction.prefixText1),
              }}
            />
          )}
          <input
            ref={input1Ref}
            type="number"
            className={`interactive-input-box w-16 mb-2 border rounded-[0.125rem] text-1.5xl font-medium px-2 py-[6px] text-center ${
              isCorrect
                ? 'bg-gray-100 border-gray-300 text-gray-700 cursor-not-allowed text-center'
                : 'border-[#333333]'
            }`}
            aria-label={`${t('scenes.common.enter_answer')} 1`}
            tabIndex={0}
            value={inputValue1}
            onChange={(e) => handleInputChange(e, 1)}
            onKeyDown={handleKeyDown}
            disabled={isCorrect}
            onFocus={() => setIsInputFieldFocused(true)}
            onBlur={() => setIsInputFieldFocused(false)}
          />
          {interaction.postfixText1 && <div dangerouslySetInnerHTML={{ __html: t(interaction.postfixText1) }} />}
        </div>
      </div>

      {/* Second Input Container */}
      <div className="relative">
        <div className="w-full flex gap-x-3 items-center interactive-input-box text-xl mb-2">
          {interaction.prefixText2 && (
            <div
              className="whitespace-nowrap"
              dangerouslySetInnerHTML={{
                __html: t(interaction.prefixText2),
              }}
            />
          )}
          <input
            ref={input2Ref}
            type="number"
            className={`interactive-input-box w-16 mb-2 border rounded-[0.125rem] text-1.5xl font-medium px-2 py-[6px] text-center ${
              isCorrect
                ? 'bg-gray-100 border-gray-300 text-gray-700 cursor-not-allowed text-center'
                : 'border-[#333333]'
            }`}
            aria-label={`${t('scenes.common.enter_answer')} 2`}
            tabIndex={0}
            value={inputValue2}
            onChange={(e) => handleInputChange(e, 2)}
            onKeyDown={handleKeyDown}
            disabled={isCorrect}
            onFocus={() => setIsInputFieldFocused(true)}
            onBlur={() => setIsInputFieldFocused(false)}
          />
          {interaction.postfixText2 && <div dangerouslySetInnerHTML={{ __html: t(interaction.postfixText2) }} />}
        </div>
      </div>
    </div>
  );
};

export default InteractiveInputBox;
