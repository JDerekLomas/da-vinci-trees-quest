import React, { useCallback, useEffect, useRef, useState, useId } from 'react';
import { RadioButtonInteraction, InteractionState } from './interface';
import useKeyPress from '../../../hooks/useKeyPress';
import { ENTER_KEY } from '../../../constants/constants';
import { useTranslations } from '../../../hooks/useTranslations';

interface InteractiveRadioButtonProps {
  interaction: RadioButtonInteraction;
  onInteraction: (state: InteractionState) => void;
  interactionState: InteractionState | undefined;
  onSubmit: () => void;
  isSubmitTriggered?: boolean;
}

const InteractiveRadioButton: React.FC<InteractiveRadioButtonProps> = ({
  interaction,
  onInteraction,
  interactionState,
  onSubmit,
  isSubmitTriggered,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [ansChecked, setAnsChecked] = useState<boolean>(false);
  const radioRef = useRef<HTMLInputElement>(null);
  const uniqueId = useId();
  const { t } = useTranslations();

  const checkAnswer = useCallback(() => {
    if (!selectedOption) {
      onInteraction({ isCorrect: false, isEmpty: true });
      return;
    }

    const isCorrect = interaction.correctnessFunction ? interaction.correctnessFunction(selectedOption) : true;

    onInteraction({ isCorrect, isEmpty: false, value: selectedOption });
  }, [selectedOption, interaction, onInteraction]);

  useEffect(() => {
    onInteraction({ isCorrect: false, isEmpty: true });
    checkAnswer();
  }, [onInteraction, checkAnswer]);

  useEffect(() => {
    if (isSubmitTriggered || interactionState?.isCorrect) {
      setAnsChecked(true);
      if (interactionState?.isCorrect && interactionState.value) {
        setSelectedOption(interactionState.value);
      }
    }
  }, [interactionState, isSubmitTriggered]);

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    checkAnswer();
  };

  const handleSubmit = () => {
    if (selectedOption) {
      onSubmit();
    }
  };

  useKeyPress({
    className: 'interactive-radio-group',
    selector: "input[type='radio']",
    keyPressed: ENTER_KEY,
    callback: handleSubmit,
  });

  return (
    <div className="mt-2 flex flex-col gap-2">
      {interaction.options.map((option) => (
        <label key={option.value} className="grid grid-cols-[24px_1fr] gap-2 items-center">
          <input
            ref={radioRef}
            type="radio"
            name={`interactive-radio-${uniqueId}`}
            value={option.value}
            disabled={ansChecked}
            checked={selectedOption === option.value}
            onChange={() => handleOptionChange(option.value)}
            className="w-6 h-6"
          />
          <span className="font-avenir-next" style={{ fontSize: '20px', lineHeight: '150%', color: '#333333' }}>
            {t(option.label)}
          </span>
        </label>
      ))}
    </div>
  );
};

export default InteractiveRadioButton;
