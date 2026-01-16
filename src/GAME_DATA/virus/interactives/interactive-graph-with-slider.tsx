/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GraphBasedInteraction } from './interface';
import './interactive-graph-with-slider.css';
import { useTranslations } from '../../../hooks/useTranslations';
import parse from 'html-react-parser';
import '../../../shared/slider.css';

interface ExponentialGraphProps {
  interaction: GraphBasedInteraction;
}

interface FocusedPoint {
  dataKey: string;
  x: number;
  value: number;
  cx: number;
  cy: number;
}

const stripHTML = (html: string): string => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

const ExponentialGraph: React.FC<ExponentialGraphProps> = ({ interaction }) => {
  const { t } = useTranslations();

  const [inputValues, setInputValues] = useState<Record<string, number>>(() => {
    return (
      interaction.inputs?.reduce(
        (acc, input) => ({
          ...acc,
          [input.id]: input.defaultValue,
        }),
        {},
      ) ?? {}
    );
  });

  const [showTooltip, setShowTooltip] = useState(false);
  const [focusedPoint, setFocusedPoint] = useState<FocusedPoint | null>(null);

  const calculateData = useMemo(() => {
    if (!interaction.formulas?.cases) return [];

    const data = [];
    const xMax = interaction.graph_config?.x.max ?? 5;

    for (let x = 0; x <= xMax; x++) {
      data.push({
        day: x,
        cases: Math.round(interaction.formulas.cases(x, inputValues)),
      });
    }
    return data;
  }, [inputValues, interaction]);

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  const updateSliderProgress = (element: Element) => {
    if (!(element instanceof HTMLInputElement)) return;

    const min = Number(element.min);
    const max = Number(element.max);
    const value = Number(element.value);
    const progress = ((value - min) / (max - min)) * 100;
    element.style.setProperty('--slider-progress', `${progress}%`);
  };

  useEffect(() => {
    interaction.inputs?.forEach((input) => {
      const slider = document.getElementById(`slider-${input.id}`) as HTMLInputElement;
      if (slider) {
        updateSliderProgress(slider);
        updateSliderBackground(slider);
      }
    });
  }, [inputValues, interaction.inputs]);

  const generateAriaLabel = useCallback(
    (day: number, cases: number) => {
      return `X: ${t(interaction.graph_config.x.label)} ${day}: Y: ${cases} ${t(
        interaction.graph_config.y.label,
      )}`;
    },
    [interaction.graph_config.x.label, interaction.graph_config.y.label, t],
  );

  const getStrokeColor = useCallback((key: string) => {
    if (key.toLowerCase().includes('revenue')) return '#005F20';
    if (key.toLowerCase().includes('cost')) return '#A6001A';
    return '#006be0';
  }, []);

  const CustomDot = useCallback(
    (props: any) => {
      const { cx, cy, payload, dataKey, fill, strokeWidth, isActive } = props;
      const ariaLabel = generateAriaLabel(payload.day, payload[dataKey]);
      const stroke = getStrokeColor(dataKey);

      return (
        <circle
          cx={cx}
          cy={cy}
          r={isActive ? 6 : 4}
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
              x: payload.day,
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

  const handleSliderChange = (id: string, value: number, event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prev) => ({ ...prev, [id]: value }));
    updateSliderProgress(event.target);
    updateSliderBackground(event.target);
  };

  const a = inputValues.initialValue;
  const b = inputValues.growthFactor;

  return (
    <div className="graph-container">
      <p className="text-lg font-medium mb-1">{interaction.labels?.instruction}</p>

      <div>
        {interaction.inputs?.map((input) => (
          <div key={input.id} className="mb-1">
            <div aria-live="off">
              <label className="slider-label" htmlFor={`slider-${input.id}`}>
                {parse(t(input.label))}
              </label>
              : {inputValues[input.id]}
            </div>
            <input
              type="range"
              className="global-slider"
              min={input.min}
              max={input.max}
              step={input.step}
              value={inputValues[input.id]}
              onChange={(e) => handleSliderChange(input.id, Number(e.target.value), e)}
              tabIndex={0}
              id={`slider-${input.id}`}
              aria-valuetext={`${stripHTML(t(input.label))}: ${inputValues[input.id]}`}
            />
          </div>
        ))}
      </div>

      {/* Dynamic Equation Display (Centered) */}
      <div className="text-center mx-auto my-2 font-besley">
        <div
          role="text"
          aria-label={`N of t equals ${a} multiplied by ${b} to the power of t`}
          className="inline-flex items-center text-xl font-semibold italic leading-tight"
        >
          <span className="text-red-700">N(t)</span>
          <span className="mx-2">=</span>
          <span className="text-blue-700">{a}</span>
          <span className="mx-1">•</span>
          <span className="text-purple-700">{b}</span>
          <sup className="text-green-700 ml-1">t</sup>
        </div>
      </div>

      <div style={{ height: '300px', width: '100%' }} aria-label={t(interaction.ariaLabel)} tabIndex={0}>
        <h3 className="graph-title">{t(interaction.labels?.title)}</h3>
        <p className="graph-subtitle">{t(interaction.labels?.subtitle)}</p>
        <ResponsiveContainer>
          <LineChart data={calculateData} margin={{ top: 10, right: 30, left: 40, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              domain={[interaction.graph_config?.x.min ?? 0, interaction.graph_config?.x.max ?? 5]}
              label={{
                value: t(interaction.graph_config?.x.label),
                position: 'bottom',
                offset: 0,
              }}
            />
            <YAxis
              domain={[interaction.graph_config?.y.min ?? 0, interaction.graph_config?.y.max ?? 1600]}
              label={{
                value: t(interaction.graph_config?.y.label),
                angle: -90,
                position: 'insideLeft',
                offset: -24,
              }}
            />
            <Tooltip
              position={{ x: focusedPoint?.cx, y: focusedPoint?.cy }}
              content={({ active, payload, label }) => {
                const shouldShowTooltip = active || (showTooltip && focusedPoint);
                if (shouldShowTooltip) {
                  const tooltipPayload = focusedPoint
                    ? [
                        {
                          name: t(interaction.graph_config?.y.label),
                          value: focusedPoint.value,
                          color: getStrokeColor(focusedPoint.dataKey),
                        },
                      ]
                    : payload;
                  const tooltipLabel = focusedPoint ? focusedPoint.x : label;
                  const roundedLabel = Math.round(Number(tooltipLabel));
                  return (
                    <div className="bg-white border p-2 shadow-lg">
                      <p>{`${t(interaction.graph_config.x.label)}: ${roundedLabel}`}</p>
                      {tooltipPayload &&
                        tooltipPayload.map((entry, index) => (
                          <p key={index} style={{ color: entry.color }}>
                            {`${t(interaction.graph_config?.y.label)}: ${
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
            <Line
              type="monotone"
              dataKey="cases"
              stroke="#4285F4"
              strokeWidth={2}
              dot={<CustomDot />}
              activeDot={<CustomDot isActive={true} />}
              role="img"
              aria-label={`${t(interaction.graph_config.y.label)} & ${t(interaction.graph_config.x.label)}`}
              tabIndex={0}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExponentialGraph;
