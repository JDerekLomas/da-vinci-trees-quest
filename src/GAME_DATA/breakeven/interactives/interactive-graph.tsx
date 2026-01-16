/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GraphBasedInteraction, InteractionState } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import parse from 'html-react-parser';
import '../../../shared/slider.css';

type DataPoint = Record<string, number>;

interface FocusedPoint {
  dataKey: string;
  x: number;
  value: number;
  cx: number;
  cy: number;
}

interface InteractiveGraphProps {
  interaction: GraphBasedInteraction;
  onInteraction: (state: InteractionState) => void;
}

const InteractiveGraph: React.FC<InteractiveGraphProps> = ({ interaction }) => {
  const [inputValues, setInputValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(interaction.inputs.map((input) => [input.id, input.defaultValue])),
  );
  const [showTooltip, setShowTooltip] = useState(false);
  const [focusedPoint, setFocusedPoint] = useState<FocusedPoint | null>(null);

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  const { t } = useTranslations();

  useEffect(() => {
    interaction.inputs.forEach((input) => {
      if (input.type === 'slider') {
        const slider = document.getElementById(`slider-${input.id}`) as HTMLInputElement;
        if (slider) {
          updateSliderBackground(slider);
        }
      }
    });
  }, [inputValues, interaction.inputs, updateSliderBackground]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('circle')) {
        setShowTooltip(false);
        setFocusedPoint(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const calculateData = useMemo(() => {
    const data: DataPoint[] = [];
    const { x } = interaction.graph_config;
    const step = x.step || (x.max - x.min) / 30;

    for (let xValue = x.min; xValue <= x.max; xValue += step) {
      const dataPoint: DataPoint = { x: xValue };

      for (const [key, formula] of Object.entries(interaction.formulas)) {
        dataPoint[key] = formula(xValue, inputValues);
      }

      data.push(dataPoint);
    }

    interaction.intersectionFormulas?.forEach(({ formula1, formula2, solveForX }) => {
      const intersectionX = solveForX(inputValues);
      if (intersectionX !== null && intersectionX >= x.min && intersectionX <= x.max) {
        const intersectionPoint: DataPoint = { x: intersectionX };

        intersectionPoint[formula1] = interaction.formulas[formula1](intersectionX, inputValues);
        intersectionPoint[formula2] = interaction.formulas[formula2](intersectionX, inputValues);

        data.push(intersectionPoint);
      }
    });

    return data;
  }, [interaction, inputValues]);

  const handleInputChange = (id: string, value: string, input: (typeof interaction.inputs)[0]) => {
    if (value === '') {
      setInputValues((prev) => ({ ...prev, [id]: 0 }));
      return;
    }

    const cleanValue = value.replace(/^0+/, '') || '0';
    const numValue = Number(cleanValue);
    if (!isNaN(numValue) && numValue >= input.min && numValue <= input.max) {
      setInputValues((prev) => ({ ...prev, [id]: numValue }));
    }
  };

  const calculateTotal = useCallback(() => {
    const xValue = inputValues['x'] ?? interaction.graph_config.x.max;
    return Object.entries(interaction.formulas).reduce(
      (acc, [key, formula]) => {
        acc[key] = formula(xValue, inputValues).toFixed(2);
        return acc;
      },
      {} as Record<string, string>,
    );
  }, [interaction.formulas, inputValues, interaction.graph_config.x.max]);

  const generateAriaLabel = useCallback(
    (dataKey: string, x: number, y: number) => {
      const xLabel = t(interaction.graph_config.x.label);
      const yLabel = t(interaction.labels[dataKey]);
      return `Y: ${yLabel}: ${y.toFixed(2)} at X: ${xLabel} ${x}`;
    },
    [t, interaction.graph_config.x.label, interaction.labels],
  );

  const getStrokeColor = useCallback((key: string) => {
    if (key.toLowerCase().includes('revenue')) return '#005F20';
    if (key.toLowerCase().includes('cost')) return '#A6001A';
    return '#006be0';
  }, []);

  const CustomDot = useCallback(
    (props: any) => {
      const { cx, cy, payload, dataKey, fill, strokeWidth, isActive } = props;
      const ariaLabel = generateAriaLabel(dataKey, payload.x, payload[dataKey]);
      const stroke = getStrokeColor(dataKey);

      return (
        <circle
          cx={cx}
          cy={cy}
          fill={isActive ? stroke : fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          tabIndex={0}
          aria-label={ariaLabel}
          role="application"
          onFocus={() => {
            setShowTooltip(true);
            setFocusedPoint({
              dataKey,
              x: payload.x,
              value: payload[dataKey],
              cx,
              cy,
            });
          }}
          onBlur={() => {
            setShowTooltip(false);
            setFocusedPoint(null);
          }}
        />
      );
    },
    [generateAriaLabel, getStrokeColor],
  );

  return (
    <div className="max-w-4xl mx-auto" role="region" aria-labelledby="chart-title">
      <h3 id="chart-title" className="text-xl font-bold mb-4">
        {t(interaction.labels.data_visualization)}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {interaction.inputs.map((input) => (
          <div key={input.id} className="flex flex-col">
            {input.type === 'slider' ? (
              <div className="sliderContainer">
                <div aria-live="off">
                  <label htmlFor={`slider-${input.id}`} className="text-m font-medium mb-1">
                    {t(input.label)}
                  </label>
                  : ${inputValues[input.id]}
                </div>
                <input
                  id={`slider-${input.id}`}
                  type="range"
                  value={inputValues[input.id]}
                  onChange={(e) => {
                    setInputValues((prev) => ({
                      ...prev,
                      [input.id]: +e.target.value,
                    }));
                    updateSliderBackground(e.target as HTMLInputElement);
                  }}
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  className="global-slider w-full"
                  aria-valuetext={`${t(input.label)}: $${inputValues[input.id]}`}
                />
              </div>
            ) : (
              <div>
                <div>
                  <label htmlFor={input.id} className="text-m font-medium mb-1">
                    {t(input.label)}
                  </label>
                  : {inputValues[input.id]}
                </div>
                <input
                  id={input.id}
                  value={inputValues[input.id] || ''}
                  onChange={(e) => handleInputChange(input.id, e.target.value, input)}
                  onBlur={() => {
                    if (inputValues[input.id] === 0) {
                      setInputValues((prev) => ({
                        ...prev,
                        [input.id]: input.min,
                      }));
                    }
                  }}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {interaction.displayFormulas && (
        <div className="mb-4 mt-4">
          {interaction.displayFormulas.map((formulaDisplay, index) => (
            <p key={index} className="text-lg font-medium">
              {t(formulaDisplay.label)}: {parse(formulaDisplay.formula(inputValues))}
            </p>
          ))}
          <p className="text-m text-gray-600">{parse(t(interaction.labels.x_units_y_dollars_label))}</p>
        </div>
      )}

      {!interaction?.hideCalculationResult && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">{t(interaction.labels.calculation_result)}</h4>
          <ul className="border border-gray-300 rounded-lg p-2 mb-4">
            {Object.entries(calculateTotal()).map(([key, value]) => (
              <li key={key} className="text-center font-semibold text-lg" style={{ color: getStrokeColor(key) }}>
                {t(interaction.labels[key])}: ${value}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="h-80 mb-5" role="region" aria-label={t(interaction.ariaLabel)} tabIndex={0}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={calculateData} margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="x"
              type="number"
              domain={[interaction.graph_config.x.min, interaction.graph_config.x.max]}
              tickCount={11}
              label={{
                value: t(interaction.graph_config.x.label),
                position: 'insideBottom',
                offset: -10,
              }}
            />
            <YAxis
              domain={[interaction.graph_config.y.min, interaction.graph_config.y.max]}
              label={{
                value: t(interaction.graph_config.y.label),
                angle: -90,
                position: 'insideLeft',
                offset: -20,
                style: { textAnchor: 'middle' },
              }}
              tickFormatter={(value) => `$${value}`}
              width={60}
            />
            <Tooltip
              position={{
                x: focusedPoint?.cx,
                y: focusedPoint?.cy,
              }}
              content={({ active, payload, label }) => {
                const shouldShowTooltip = active || (showTooltip && focusedPoint);
                if (shouldShowTooltip) {
                  const tooltipPayload = focusedPoint
                    ? [
                        {
                          name: interaction.labels[focusedPoint.dataKey],
                          value: focusedPoint.value,
                          color: getStrokeColor(focusedPoint.dataKey),
                        },
                      ]
                    : payload;
                  const tooltipLabel = focusedPoint ? focusedPoint.x : label;
                  const roundedLabel = Number(tooltipLabel).toFixed(2);

                  return (
                    <div className="bg-white border p-2 shadow-lg">
                      <p>{`${t(interaction.graph_config.x.label)}: ${roundedLabel}`}</p>
                      {tooltipPayload &&
                        tooltipPayload.map((entry, index) => (
                          <p
                            key={index}
                            style={{
                              color: entry.color,
                            }}
                          >
                            {`${t(entry.name as string)}: $${
                              typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value
                            }`}
                          </p>
                        ))}
                    </div>
                  );
                }
                return null;
              }}
              wrapperStyle={
                focusedPoint
                  ? {
                      visibility: showTooltip ? 'visible' : undefined,
                      position: showTooltip ? 'absolute' : 'unset',
                      transform: `translate(${(focusedPoint.cx ?? 0) - 150}px, ${(focusedPoint.cy ?? 0) - 120}px)`,
                    }
                  : {}
              }
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              layout="horizontal"
              wrapperStyle={{
                border: '1px solid #d5d5d5',
                borderRadius: '5px',
                bottom: '-20px',
              }}
              iconSize={10}
              iconType="plainline"
            />
            {Object.keys(interaction.formulas).map((key) => (
              <Line
                tabIndex={0}
                key={key}
                type="monotone"
                dataKey={key}
                stroke={getStrokeColor(key)}
                name={t(interaction.labels[key])}
                dot={<CustomDot />}
                activeDot={<CustomDot isActive={true} key={key} />}
                role="img"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InteractiveGraph;
