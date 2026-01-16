import React, { useCallback, useEffect, useRef, useState } from 'react';
import { InputBoxInteraction, InteractionState } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { ENTER_KEY } from '../../../constants/constants';
import useKeyPress from '../../../hooks/useKeyPress';
import './interactive-inputbox.css';

interface InteractiveFillInBlankInputBoxProps {
  interaction: InputBoxInteraction;
  onInteraction: (state: InteractionState) => void;
  interactionState: InteractionState | undefined;
  onSubmit: () => void;
  isSubmitTriggered?: boolean;
}

const InteractiveInputBox: React.FC<InteractiveFillInBlankInputBoxProps> = ({
  interaction,
  onInteraction,
  interactionState,
  onSubmit,
  isSubmitTriggered,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isInputFieldFocused, setIsInputFieldFocused] = useState<boolean>(false);
  const { t } = useTranslations();

  const inputRef = useRef<HTMLInputElement>(null);

  const checkAnswer = useCallback(() => {
    if (inputValue.trim() === '') {
      onInteraction({ isCorrect: false, isEmpty: true });
      return;
    }

    const isCorrect = interaction.correctnessFunction ? interaction.correctnessFunction(inputValue) : true;

    onInteraction({ isCorrect, isEmpty: false, value: inputValue });
  }, [inputValue, interaction, onInteraction]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    checkAnswer();
  };

  useEffect(() => {
    onInteraction({ isCorrect: false, isEmpty: true });
    checkAnswer();
  }, [onInteraction, checkAnswer]);

  useEffect(() => {
    if (isSubmitTriggered || interactionState?.isCorrect) {
      setIsCorrect(true);
      if (interactionState?.isCorrect && interactionState.value) {
        setInputValue(interactionState.value);
      }
      return;
    }
  }, [interactionState, isSubmitTriggered]);

  const handleSubmit = () => {
    if (isInputFieldFocused) {
      onSubmit();
    }
  };

  useKeyPress({
    className: 'interactive-input-box',
    selector: "input",
    keyPressed: ENTER_KEY,
    callback: handleSubmit,
  });

  return (
    <div className="relative mt-5">
      <div className="w-full flex gap-x-3 items-center interactive-input-box">
        {interaction.prefixText && <div dangerouslySetInnerHTML={{ __html: t(interaction.prefixText) }} />}
        <input
          ref={inputRef}
          type="text"
          className={`interactive-input-box w-16 mb-2 border rounded-[0.125rem] text-1.5xl font-medium px-2 py-[6px] text-center ${
            isCorrect
              ? 'bg-gray-100 border-gray-300 text-gray-700 cursor-not-allowed text-center'
              : 'border-[#333333]'
          }`}
          aria-label={t('scenes.common.enter_answer')}
          tabIndex={0}
          value={inputValue}
          onChange={handleInputChange}
          disabled={isCorrect}
          onFocus={() => {
            setIsInputFieldFocused(true);
          }}
          onBlur={() => {
            setIsInputFieldFocused(false);
          }}
        />
        {interaction.postfixText && <div dangerouslySetInnerHTML={{ __html: t(interaction.postfixText) }} />}
      </div>
    </div>
  );
};

export default InteractiveInputBox;