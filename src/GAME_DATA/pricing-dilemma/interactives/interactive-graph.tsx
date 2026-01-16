import React, { useCallback, useEffect, useState } from 'react';
import { Input, Interaction, TextboxConfig } from './interface';
import parse from 'html-react-parser';
import { useTranslations } from '../../../hooks/useTranslations';
import LineGraph from './line-graph';
import '../../../shared/slider.css';

const InteractiveGraph: React.FC<{ interaction: Interaction }> = ({ interaction }) => {
  const [showOldPrice, setShowOldPrice] = useState(false);
  const createDefaultValueObject = (inputs?: Input[]) => {
    if (!inputs) return null;

    const defaultValueObj: Record<string, number> = {};

    inputs.forEach((input) => {
      if (input.type === 'slider' && input.sliderConfig) {
        defaultValueObj[input.id] = input.sliderConfig.defaultValue;
      } else if (input.textboxConfig) {
        defaultValueObj[input.id] = input.textboxConfig.min;
      }
    });

    return defaultValueObj;
  };

  const getToggleLabel = () => {
    const formulaTitle = interaction?.formulas?.[0]?.title;
    if (formulaTitle) {
      return t(formulaTitle);
    }
    const baseLine = interaction?.graphConfig?.lines.find((line) => {
      const dataKey = line.dataKey;
      return dataKey.includes('oldPrice') || dataKey.includes('base') || dataKey.includes('price');
    });

    if (baseLine?.name) {
      return t(baseLine.name);
    }
    return t('scenes.distance_based_price_calculator.graph.old_price.name');
  };

  const [inputValues, setInputValues] = useState<Record<string, number> | null>(
      createDefaultValueObject(interaction.inputs),
    ),
    [chartData, setChartData] = useState<Record<string, number | null>[]>([]),
    { t } = useTranslations();

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min),
      max = Number(input.max),
      value = Number(input.value),
      percent = ((value - min) / (max - min)) * 100;

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

      const data: Record<string, number | null>[] = [],
        min = interaction.graphConfig?.x.min,
        max = interaction.graphConfig?.x.max,
        steps = interaction.graphConfig?.x.steps;

      for (let i = min; i <= max; i += steps) {
        const obj: Record<string, number | null> = {};
        obj['x'] = +i.toFixed(1);

        interaction.graphConfig?.lines.forEach((line) => {
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

  const handleInputChange = (id: string, value: string, input?: TextboxConfig) => {
    if (value === '' || !input) {
      setInputValues((prev) => ({ ...prev, [id]: 0 }));
      return;
    }

    const cleanValue = value.replace(/^0+/, '') || '0',
      numValue = Number(cleanValue);

    if (!isNaN(numValue) && numValue >= input.min && numValue <= input.max) {
      setInputValues((prev) => ({ ...prev, [id]: numValue }));
    }
  };

  const renderInput = useCallback(
    (input: Input) => {
      if (input.type === 'slider') {
        return (
          <>
            <label htmlFor={`slider-${input.id}`}>
              {input.title && (
                <h3
                  className="font-semibold text-m"
                  style={{
                    color: input.titleColor || '#000',
                  }}
                >
                  {t(input.title)}
                </h3>
              )}
              {input.label && <h3 className="mb-1 text-m">{t(input.label)}</h3>}
              {input.sliderConfig && (
                <div className="sliderContainer">
                  <input
                    id={`slider-${input.id}`}
                    type="range"
                    value={inputValues ? inputValues[input.id] : ''}
                    onChange={(e) => {
                      setInputValues((prev) => ({ ...prev, [input.id]: +e.target.value }));
                      updateSliderBackground(e.target as HTMLInputElement);
                    }}
                    min={input.sliderConfig.min}
                    max={input.sliderConfig.max}
                    step={input.sliderConfig.step}
                    className="global-slider w-full"
                    aria-valuetext={`${t(input.title!)}: $${inputValues ? inputValues[input.id] : ''}`}
                  />
                </div>
              )}
            </label>
            <div
              className="mt-2 text-m font-medium"
              style={{
                color: input.titleColor || '#000',
              }}
            >
              ${inputValues && inputValues[input.id]}
            </div>
          </>
        );
      }

      return (
        <div className="flex items-center">
          <label className="text-m font-medium flex items-center" htmlFor={input.id}>
            {parse(t(input.label))}
            <div className="flex items-center text-m">
              {input.textboxConfig?.prefix && <span className="ml-1">{input.textboxConfig.prefix}</span>}
              <input
                id={input.id}
                type="number"
                value={inputValues ? inputValues[input.id] : ''}
                onChange={(e) => handleInputChange(input.id, e.target.value, input?.textboxConfig)}
                onBlur={() => {
                  if (inputValues && inputValues[input.id] === 0) {
                    setInputValues((prev) => ({
                      ...prev,
                      [input.id]: input.textboxConfig ? input.textboxConfig.min : 0,
                    }));
                  }
                }}
                className="border rounded px-2 py-1 w-full ml-1 border-[#333333]"
              />
            </div>
          </label>
        </div>
      );
    },
    [inputValues, t, updateSliderBackground],
  );

  return (
    <div className="max-w-4xl mx-auto font-avenir-next" role="region">
      {interaction.inputs && interaction.inputs.length && (
        <div
          className={`grid grid-cols-1 ${interaction.inputs.length === 1 ? '' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-4`}
        >
          {interaction.inputs.map((input, index) => {
            return <div key={`input-${index}`}>{renderInput(input)}</div>;
          })}
        </div>
      )}
      {interaction.bodyAsHtml && <div className="text-m">{parse(t(interaction.bodyAsHtml))}</div>}
      {interaction?.formulas && interaction?.formulas.length && (
        <>
          <div className={`grid grid-cols-1 ${interaction.formulas.length > 1 ? 'xl:grid-cols-2 gap-x-2' : ''}`}>
            {interaction.formulas.map((formula, index) => {
              return formula.displayFormula ? (
                <div key={`formula-${index}`}>
                  {parse(formula.displayFormula(inputValues, t(formula.title || '')) || '')}
                </div>
              ) : null;
            })}
          </div>
          <div className="flex items-center gap-2 mt-2 mb-1">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showOldPrice}
                onChange={(e) => setShowOldPrice(e.target.checked)}
              />
              <div className="w-11 h-6 bg-[#949494] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-m font-medium text-gray-700">{`${t(interaction.graphConfig?.show || '')}${getToggleLabel()}`}</span>
            </label>
          </div>
        </>
      )}
      <LineGraph
        chartData={chartData}
        graphConfig={
          interaction?.graphConfig
            ? {
                ...interaction.graphConfig,
                lines: interaction.graphConfig.lines.filter((line) => {
                  if (!showOldPrice) {
                    return !(
                      line.dataKey.includes('oldPrice') ||
                      line.dataKey.includes('baseZone') ||
                      line.dataKey.includes('originalPrice')
                    );
                  }
                  return true;
                }),
              }
            : undefined
        }
      />
    </div>
  );
};

export default InteractiveGraph;
