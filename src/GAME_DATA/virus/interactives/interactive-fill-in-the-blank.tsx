import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FillInTheBlankInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { BUTTON_STYLES, ENTER_KEY } from '../../../constants/constants';
import useKeyPress from '../../../hooks/useKeyPress';
import { SUPERSCRIPTS } from '../../../constants/constants';

interface FillInTheBlankProps {
  interaction: FillInTheBlankInteraction;
}

const FillInTheBlank: React.FC<FillInTheBlankProps> = ({ interaction }) => {
  const { t } = useTranslations();

  const inputRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState<string>('');

  const getSpokenNumber = (num: number): string => {
    if (num >= 1e8) {
      const exponent = Math.floor(Math.log10(num));
      const base = num / Math.pow(10, exponent);
      const roundedBase = Math.round(base * 100) / 100;
      return `${roundedBase} times 10 to the power of ${exponent}`;
    }
    return num.toLocaleString().replace(/,/g, ' ');
  };

  const formatLargeNumber = (num: number): string => {
    if (num >= 1e8) {
      const exponent = Math.floor(Math.log10(num));
      const base = num / Math.pow(10, exponent);
      const roundedBase = Math.round(base * 100) / 100;
      return `${roundedBase} × 10${formatExponent(exponent)}`;
    }
    return num.toLocaleString();
  };

  const formatExponent = (exp: number): string => {
    return exp
      .toString()
      .split('')
      .map((digit) => SUPERSCRIPTS[digit as keyof typeof SUPERSCRIPTS])
      .join('');
  };

  const handleCalculate = useCallback(() => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      const calculatedResult = interaction.fill_in_the_blank_config?.calculateResult(inputValue) || null;
      setResult(calculatedResult);

      if (calculatedResult !== null) {
        const spokenNumber = getSpokenNumber(calculatedResult);
        // Set the announcement which will be read by the live region
        setAnnouncement(
          `${t(interaction.fill_in_the_blank_config?.resultPrefix || '')} ${spokenNumber} ${t(interaction.fill_in_the_blank_config?.resultSuffix || '').replace('{input}', inputValue)}`,
        );
      }
    }
  }, [interaction.fill_in_the_blank_config, t]);

  useEffect(() => {
    if (interaction.fill_in_the_blank_config?.input.defaultValue && inputRef.current) {
      inputRef.current.value = interaction.fill_in_the_blank_config?.input.defaultValue.toString();
    }
    // Perform initial calculation when component mounts
    handleCalculate();
  }, [handleCalculate, interaction.fill_in_the_blank_config?.input.defaultValue]);

  useKeyPress({
    className: 'fill-in-the-blank-input-box',
    selector: "input[type='number']",
    keyPressed: ENTER_KEY,
    callback: handleCalculate,
  });

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
            <div
              dangerouslySetInnerHTML={{
                __html: interaction.fill_in_the_blank_config?.equation,
              }}
            />
          </div>
        )}
        <div className="flex items-center mb-4 w-full">
          <span className="mr-2 text-[32px]">
            <span
              dangerouslySetInnerHTML={{
                __html: t(interaction.fill_in_the_blank_config?.input.leftText || ''),
              }}
            />{' '}
          </span>
          <input
            type="number"
            ref={inputRef}
            placeholder={t(interaction.fill_in_the_blank_config?.input.placeholder || '')}
            className="fill-in-the-blank-input-box border border-[#333333] rounded-[2px] px-4 py-[6px] flex-1 font-medium text-[1.375rem]"
            min="0"
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              if (Number(target.value) < 0) {
                target.value = '0';
              }
              // onInputChange(target.value);
            }}
            aria-label={t(interaction.fill_in_the_blank_config?.input.placeholder || '')}
          />
          <span className="ml-2 text-2xl font-medium">
            {t(interaction.fill_in_the_blank_config?.input.rightText || '')}
          </span>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-between">
          <div className="sr-only" role="status" aria-live="assertive" aria-atomic="true">
            {announcement}
          </div>
          <div className="w-[80%]">
            <button
              style={BUTTON_STYLES.base}
              className={`w-full ${BUTTON_STYLES.classes.common} ${BUTTON_STYLES.classes.primary.enabled}`}
              onClick={handleCalculate}
            >
              {t(interaction.fill_in_the_blank_config?.buttonText || '')}
            </button>
          </div>
          <div
            className={`${
              result === null && 'hidden'
            } my-10 py-4 w-[80%] flex flex-col justify-end text-center gap-2 bg-[#E8E8E8]`}
            aria-hidden="true"
          >
            <p className="font-medium text-2xl">{t(interaction.fill_in_the_blank_config?.resultPrefix || '')}</p>
            <p className="text-3xl font-bold">{result !== null ? formatLargeNumber(result) : '0'}</p>
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
