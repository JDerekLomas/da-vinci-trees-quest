import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ThreeInputBoxInteraction, InteractionState } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { ENTER_KEY } from '../../../constants/constants';
import useKeyPress from '../../../hooks/useKeyPress';
import './interactive-three-inputbox.css';
import { useSvgIcon } from '../../../hooks/useSvgIcon';

interface InteractiveInputBoxProps {
  interaction: ThreeInputBoxInteraction;
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
  const [inputValue3, setInputValue3] = useState<string>('');
  const [showCheckmark, setShowCheckmark] = useState<boolean>(false);
  const [isInputFieldFocused, setIsInputFieldFocused] = useState<boolean>(false);
  const { t } = useTranslations();
  const CheckmarkIcon = useSvgIcon('correct-checkmark');

  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  const input3Ref = useRef<HTMLInputElement>(null);

  const checkAnswers = useCallback(() => {
    if (inputValue1.trim() === '' || inputValue2.trim() === '' || inputValue3.trim() === '') {
      onInteraction({ isCorrect: false, isEmpty: true });
      return;
    }

    const isCorrect = interaction.correctnessFunction(inputValue1, inputValue2, inputValue3);

    onInteraction({
      isCorrect,
      isEmpty: false,
      value1: inputValue1,
      value2: inputValue2,
      value3: inputValue3,
    });
  }, [inputValue1, inputValue2, inputValue3, interaction, onInteraction]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, inputNumber: 1 | 2 | 3) => {
    const newValue = event.target.value;
    switch (inputNumber) {
      case 1:
        setInputValue1(newValue);
        break;
      case 2:
        setInputValue2(newValue);
        break;
      case 3:
        setInputValue3(newValue);
        break;
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
      if (
        interactionState?.isCorrect &&
        interactionState.value1 &&
        interactionState.value2 &&
        interactionState.value3
      ) {
        setInputValue1(interactionState.value1);
        setInputValue2(interactionState.value2);
        setInputValue3(interactionState.value3);
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
    inputNumber: 1 | 2 | 3,
    value: string,
    ref: React.RefObject<HTMLInputElement>,
    prefixText?: string,
  ) => (
    <div className="relative w-full flex gap-x-3 items-center interactive-input-box">
      {prefixText && (
        <div
          className="whitespace-nowrap"
          dangerouslySetInnerHTML={{
            __html: t(prefixText),
          }}
        />
      )}
      <input
        ref={ref}
        type="number"
        className={`interactive-input-box w-full mb-2 border rounded-[0.125rem] text-1.5xl font-medium px-4 py-[6px] ${
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
        <div className="absolute right-3 top-[45%] transform -translate-y-1/2">
          <CheckmarkIcon />
        </div>
      )}
    </div>
  );

  return (
    <div className="relative mt-5 flex flex-col gap-4">
      {renderInput(1, inputValue1, input1Ref, interaction.prefixText1)}
      {renderInput(2, inputValue2, input2Ref, interaction.prefixText2)}
      {renderInput(3, inputValue3, input3Ref, interaction.prefixText3)}
    </div>
  );
};

export default InteractiveInputBox;
