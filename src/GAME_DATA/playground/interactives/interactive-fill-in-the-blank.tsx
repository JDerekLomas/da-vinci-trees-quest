import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FillInTheBlankInteraction } from './interface';
import { MathJax } from 'better-react-mathjax';
import { useTranslations } from '../../../hooks/useTranslations';

interface FillInTheBlankProps {
  interaction: FillInTheBlankInteraction;
}

const FillInTheBlank: React.FC<FillInTheBlankProps> = ({ interaction }) => {
  const { t } = useTranslations();

  const inputRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = useCallback(() => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      const calculatedResult = interaction.fill_in_the_blank_config?.calculateResult(inputValue) || null;
      setResult(calculatedResult);
    }
  }, [interaction.fill_in_the_blank_config]);

  useEffect(() => {
    if (interaction.fill_in_the_blank_config?.input.defaultValue && inputRef.current) {
      inputRef.current.value = interaction.fill_in_the_blank_config?.input.defaultValue.toString();
    }
    // Perform initial calculation when component mounts
    handleCalculate();
  }, [handleCalculate, interaction.fill_in_the_blank_config?.input.defaultValue]);

  return (
    <div className="h-full">
      <div className={`flex flex-col justify-start items-start gap-6 h-full`}>
        {interaction.fill_in_the_blank_config?.subtitle && (
          <h2 className="text-[1.375rem] font-medium text-[#333333]">
            {t(interaction.fill_in_the_blank_config?.subtitle)}
          </h2>
        )}
        {interaction.fill_in_the_blank_config?.equation && (
          <div className="mb-4 font-semibold text-[40px]">
            <MathJax inline dynamic>
              {interaction.fill_in_the_blank_config?.equation}
            </MathJax>
          </div>
        )}
        <div className="flex items-center mb-4 w-full">
          <span className="mr-2 text-[32px]">
            <span className="text-[#A6001A]">{t(interaction.fill_in_the_blank_config?.input.leftText || '')}</span>{' '}
            =
          </span>
          <input
            type="number"
            ref={inputRef}
            placeholder={t(interaction.fill_in_the_blank_config?.input.placeholder || '')}
            className="border border-[#333333] rounded-[2px] px-4 py-[6px] flex-1 font-medium text-[1.375rem]"
            min="0"
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              if (Number(target.value) < 0) {
                target.value = '0';
              }
              // onInputChange(target.value);
            }}
          />
          <span className="ml-2 text-2xl font-medium">
            {t(interaction.fill_in_the_blank_config?.input.rightText || '')}
          </span>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-between">
          <div className="w-[80%]">
            <button className="w-full p-2 bg-[#006BE0] text-white" onClick={handleCalculate}>
              {t(interaction.fill_in_the_blank_config?.buttonText || '')}
            </button>
          </div>
          <div
            className={`${
              result === null && 'hidden'
            } my-10 py-4 w-[80%] flex flex-col justify-end text-center gap-2 bg-[#E8E8E8]`}
          >
            <p className="font-medium text-2xl">{t(interaction.fill_in_the_blank_config?.resultPrefix || '')}</p>
            <p className="text-3xl font-bold">{result?.toLocaleString() || 0}</p>
            <p className="text-[22px] font-medium">
              {t(interaction.fill_in_the_blank_config?.resultSuffix || '').replace(
                '{input}',
                inputRef.current?.value || '',
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FillInTheBlank;
