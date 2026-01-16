import React, { useCallback, useEffect, useState } from 'react';
import { Input, Interaction } from './interface';
import parse from 'html-react-parser';
import LineGraph from './line-graph';
import { useTranslations } from '../../../hooks/useTranslations';
import '../../../shared/slider.css';

const SavingsCalculator: React.FC<{ interaction: Interaction }> = ({ interaction }) => {
  const { t } = useTranslations();

  const translations = {
    'scenes.S4.S4_D0_F10_C9.formula.title': t('scenes.S4.S4_D0_F10_C9.formula.title'),
    'scenes.S4.S4_D0_F10_C9.formula.where': t('scenes.S4.S4_D0_F10_C9.formula.where'),
    'scenes.S4.S4_D0_F10_C9.formula.total_savings': t('scenes.S4.S4_D0_F10_C9.formula.total_savings'),
    'scenes.S4.S4_D0_F10_C9.formula.number_of_months': t('scenes.S4.S4_D0_F10_C9.formula.number_of_months'),
    'scenes.S4.S4_D0_F10_C9.formula.monthly_savings': t('scenes.S4.S4_D0_F10_C9.formula.monthly_savings'),
    'scenes.S6.S6_D0_F19_C9.formula.new_saving_formula': t('scenes.S6.S6_D0_F19_C9.formula.new_saving_formula'),
    'scenes.S6.S6_D0_F19_C9.formula.previous_saving_formula': t(
      'scenes.S6.S6_D0_F19_C9.formula.previous_saving_formula',
    ),
    'scenes.S6.S6_D0_F19_C9.formula.where': t('scenes.S6.S6_D0_F19_C9.formula.where'),
    'scenes.S6.S6_D0_F19_C9.formula.month': t('scenes.S6.S6_D0_F19_C9.formula.month'),
    'scenes.S6.S6_D0_F19_C9.formula.in_dollar': t('scenes.S6.S6_D0_F19_C9.formula.in_dollar'),
    'scenes.S6.S6_D0_F19_C9.formula.monthly_stipend': t('scenes.S6.S6_D0_F19_C9.formula.monthly_stipend'),
    'scenes.S6.S6_D0_F19_C9.formula.expenses': t('scenes.S6.S6_D0_F19_C9.formula.expenses'),
    'scenes.S6.S6_D0_F19_C9.formula.total_expense_formula': t(
      'scenes.S6.S6_D0_F19_C9.formula.total_expense_formula',
    ),
    'scenes.S6.S6_D0_F19_C9.formula.monthly_savings_formula': t(
      'scenes.S6.S6_D0_F19_C9.formula.monthly_savings_formula',
    ),
    'scenes.S7.S7_D0_F20_C10.formula.old_saving_formula': t('scenes.S7.S7_D0_F20_C10.formula.old_saving_formula'),
    'scenes.S7.S7_D0_F20_C10.formula.new_saving_formula': t('scenes.S7.S7_D0_F20_C10.formula.new_saving_formula'),
    'scenes.S7.S7_D0_F20_C10.formula.where': t('scenes.S7.S7_D0_F20_C10.formula.where'),
    'scenes.S7.S7_D0_F20_C10.formula.month': t('scenes.S7.S7_D0_F20_C10.formula.month'),
    'scenes.S7.S7_D0_F20_C10.formula.in_dollar': t('scenes.S7.S7_D0_F20_C10.formula.in_dollar'),
    'scenes.S7.S7_D0_F20_C10.formula.monthly_contribution': t(
      'scenes.S7.S7_D0_F20_C10.formula.monthly_contribution',
    ),
    'scenes.S7.S7_D0_F20_C10.formula.initial_savings': t('scenes.S7.S7_D0_F20_C10.formula.initial_savings'),
  };

  const createDefaultValueObject = (inputs?: Input[]) => {
    if (!inputs) return null;

    const defaultValueObj: Record<string, number> = {};
    inputs.forEach((input) => {
      if (input.type === 'slider' && input.sliderConfig) {
        defaultValueObj[input.id] = input.sliderConfig.defaultValue;
      }
    });
    return defaultValueObj;
  };

  const [inputValues, setInputValues] = useState<Record<string, number> | null>(
    createDefaultValueObject(interaction.inputs),
  );
  const [chartData, setChartData] = useState<Record<string, number>[]>([]);

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    interaction.inputs?.forEach((input) => {
      if (input.type === 'slider') {
        const slider = document.getElementById(`slider-${input.id}`) as HTMLInputElement;
        if (slider) {
          updateSliderBackground(slider);
        }
      }
    });
  }, [inputValues, interaction.inputs, updateSliderBackground]);

  const generateChartData = useCallback(
    (inputValues: Record<string, number> | null) => {
      if (!interaction.graphConfig) return [];

      const data: Record<string, number>[] = [];
      const { min, max, steps } = interaction.graphConfig.x;

      for (let i = min; i <= max; i += steps) {
        const obj: Record<string, number> = {};
        obj['x'] = +i.toFixed(1);

        interaction.graphConfig.lines.forEach((line) => {
          obj[line.dataKey] = line.calculateYValue(i, inputValues || undefined);
        });
        data.push(obj);
      }
      return data;
    },
    [interaction],
  );

  useEffect(() => {
    setChartData(generateChartData(inputValues));
  }, [inputValues, generateChartData]);

  const renderInput = useCallback(
    (input: Input) => {
      if (input.type === 'slider' && input.sliderConfig) {
        return (
          <div className="flex flex-col w-full">
            <div aria-live="off">
              <label className={`slider-label text-[${input.titleColor}]`} htmlFor={`slider-${input.id}`}>
                {parse(t(input.label))}
              </label>
              : ${inputValues?.[input.id] ?? 0}
            </div>
            <div className="w-full">
              <div className="sliderContainer">
                <input
                  id={`slider-${input.id}`}
                  type="range"
                  value={inputValues?.[input.id] ?? 0}
                  onChange={(e) => {
                    setInputValues((prev) => ({
                      ...prev,
                      [input.id]: +e.target.value,
                    }));
                    updateSliderBackground(e.target as HTMLInputElement);
                  }}
                  min={input.sliderConfig.min}
                  max={input.sliderConfig.max}
                  step={input.sliderConfig.step}
                  className="global-slider w-full"
                  aria-valuetext={`${t(input.label)}: $${inputValues?.[input.id] ?? 0}`}
                />
              </div>
            </div>
          </div>
        );
      }
      return null;
    },
    [inputValues, t, updateSliderBackground],
  );

  return (
    <div className="w-full h-full overflow-hidden" role="region">
      <div className="w-full max-w-7xl mx-auto px-4 py-4">
        <div
          className={`${
            interaction.inputs && interaction.inputs.length === 3
              ? 'grid grid-cols-3 gap-8'
              : interaction.inputs && interaction.inputs.length === 2
                ? 'grid grid-cols-2 gap-8'
                : ''
          } mb-4`}
        >
          {interaction.inputs?.map((input, index) => <div key={`input-${index}`}>{renderInput(input)}</div>)}
        </div>

        {interaction.formulas?.map((formula, index) => {
          return formula.displayFormula ? (
            <div key={`formula-${index}`} className="mt-2 mb-2">
              {parse(formula.displayFormula(inputValues, translations) || '')}
            </div>
          ) : null;
        })}

        <div className="w-full mt-8">
          <LineGraph chartData={chartData} graphConfig={interaction.graphConfig} />
        </div>
      </div>
    </div>
  );
};

export default SavingsCalculator;
