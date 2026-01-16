import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { useTranslations } from '../../../hooks/useTranslations';
import parse from 'html-react-parser';
import { Interaction, Input, CustomLegendProps } from './interface';
import '../../../shared/slider.css';
import { DotProps } from '../../skytrack-internship/interactives/interface';

interface FocusedPoint {
  dataKey: string;
  x: number;
  y: number;
  value: number;
  name: string;
  color: string;
  shape?: string;
}

const shapeTypes = ['circle', 'square', 'triangle', 'diamond', 'cross'];

const renderCustomShape = (cx: number, cy: number, size: number, fill: string, stroke: string, shape: string) => {
  const halfSize = size / 2;
  const strokeWidth = 2;

  switch (shape) {
    case 'square':
      return (
        <rect
          x={cx - halfSize}
          y={cy - halfSize}
          width={size}
          height={size}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      );
    case 'triangle':
      return (
        <polygon
          points={`${cx},${cy - halfSize} ${cx - halfSize},${cy + halfSize} ${cx + halfSize},${cy + halfSize}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      );
    case 'diamond':
      return (
        <polygon
          points={`${cx},${cy - halfSize} ${cx + halfSize},${cy} ${cx},${cy + halfSize} ${cx - halfSize},${cy}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      );
    case 'cross': {
      const crossSize = halfSize * 0.8;
      return (
        <g>
          <line
            x1={cx - crossSize}
            y1={cy}
            x2={cx + crossSize}
            y2={cy}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <line
            x1={cx}
            y1={cy - crossSize}
            x2={cx}
            y2={cy + crossSize}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        </g>
      );
    }
    case 'circle':
    default:
      return <circle cx={cx} cy={cy} r={halfSize} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
  }
};

const CostBenefitChart: React.FC<{ interaction: Interaction }> = ({ interaction }) => {
  const { t } = useTranslations();
  const [showTooltip, setShowTooltip] = useState(false);
  const [focusedPoint, setFocusedPoint] = useState<FocusedPoint | null>(null);

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
  const currentNitrogen = inputValues?.nitrogenLevel ?? 0;

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  const yDomain = useMemo(() => {
    let minY = Infinity,
      maxY = -Infinity;
    chartData.forEach((point) => {
      minY = Math.min(minY, point.revenue, point.cost);
      maxY = Math.max(maxY, point.revenue, point.cost);
    });
    const padding = (maxY - minY) * 0.1;
    return [Math.floor((minY - padding) / 200) * 200, Math.ceil((maxY + padding) / 200) * 200];
  }, [chartData]);

  const xTicks = useMemo(() => {
    return Array.from({ length: Math.floor((interaction.graphConfig?.x.max ?? 8) + 1) }, (_, i) => i);
  }, [interaction.graphConfig?.x.max]);

  const getXTooltip = (key: string, label: string, valueAccessor?: string) => {
    const tooltip = t(key);
    if (valueAccessor) {
      return tooltip.replace(`{{${valueAccessor}}}`, label);
    }
    return `${tooltip} ${label}`;
  };

  const generateChartData = useCallback(() => {
    if (!interaction.graphConfig) return [];
    const data: Record<string, number>[] = [];
    const { min, max, steps } = interaction.graphConfig.x;
    for (let i = min; i <= max; i += steps) {
      const obj: Record<string, number> = {};
      obj['x'] = +i.toFixed(1);
      interaction.graphConfig.lines.forEach((line) => {
        obj[line.dataKey] = line.calculateYValue(i);
      });
      data.push(obj);
    }
    return data;
  }, [interaction.graphConfig]);

  useEffect(() => {
    setChartData(generateChartData());
  }, [generateChartData]);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const graphElement = document.querySelector('.recharts-wrapper');
      if (graphElement && !graphElement.contains(event.target as Node)) {
        setShowTooltip(false);
        setFocusedPoint(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const CustomDot = useCallback(
    (props: DotProps) => {
      if (props.cx === undefined || props.cy === undefined || !props.dataKey || !props.payload) {
        return null;
      }

      const { cx, cy, dataKey, payload, stroke, name = '', label = '', isActive } = props;
      const isCurrentPoint = payload.x === currentNitrogen || isActive;

      if (!isCurrentPoint && !isActive) return null;

      const lineIndex = interaction.graphConfig?.lines.findIndex((line) => line.dataKey === dataKey) ?? 0;
      const shape = shapeTypes[lineIndex % shapeTypes.length];
      const size = isActive ? 12 : 10;
      const value = typeof payload[dataKey] === 'number' ? payload[dataKey] : 0;

      return (
        <g
          tabIndex={0}
          role="application"
          aria-label={`${name} ${value.toFixed(0)} at ${label} ${payload.x || '0'}`}
          onFocus={() => {
            setShowTooltip(true);
            setFocusedPoint({
              x: cx,
              y: cy,
              dataKey,
              value: typeof payload[dataKey] === 'number' ? payload[dataKey] : 0,
              name,
              color: stroke || '#000',
              shape,
            });
          }}
          onBlur={() => {
            setShowTooltip(false);
            setFocusedPoint(null);
          }}
          onClick={(e) => {
            e.stopPropagation();
            setShowTooltip(true);
            setFocusedPoint({
              x: cx,
              y: cy,
              dataKey,
              value: typeof payload[dataKey] === 'number' ? payload[dataKey] : 0,
              name,
              color: stroke || '#000',
              shape,
            });
          }}
        >
          {renderCustomShape(cx, cy, size, 'white', stroke || '#000', shape)}
        </g>
      );
    },
    [currentNitrogen, interaction.graphConfig?.lines],
  );

  const CustomLegend = (props: CustomLegendProps) => {
    const { payload = [] } = props;

    if (!payload.length || !interaction.graphConfig?.showLegend) return null;

    return (
      <ul className="flex justify-center flex-wrap gap-4 pt-2 pb-6" style={{ width: '100%' }}>
        {payload.map((entry, index) => {
          const shape = shapeTypes[index % shapeTypes.length];
          return (
            <li key={`legend-${index}`} className="flex items-center">
              <svg width="32" height="16" viewBox="0 0 32 16">
                <line x1="2" y1="8" x2="30" y2="8" stroke={entry.color} strokeWidth="2" />
                {renderCustomShape(16, 8, 6, 'white', entry.color, shape)}
              </svg>
              <span className="ml-2" style={{ fontSize: '16px' }}>
                {entry.value}
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderInput = useCallback(
    (input: Input) => {
      if (input.type === 'slider' && input.sliderConfig) {
        return (
          <div className="block text-lg font-medium">
            <div aria-live="off">
              <label className="slider-label" htmlFor={`slider-${input.id}`}>
                {parse(t(input.label))}
              </label>
              : {inputValues?.[input.id] ?? 0} {t(input.unit || '')}
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
                  aria-valuetext={`${t(input.label)} ${inputValues?.[input.id] ?? 0} ${t(input.unit || '')}`}
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
    <div className="w-full max-w-4xl space-y-2">
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          {interaction.inputs?.map((input, index) => <div key={`input-${index}`}>{renderInput(input)}</div>)}
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          {interaction.displayCards?.map((card) => (
            <div key={card.id} className="p-3 rounded-lg">
              <div className="font-bold" style={{ color: card.textColor }}>
                {t(card.title)}
              </div>
              <div className="text-xl">${card.getDisplayValue(currentNitrogen).toFixed(0)}</div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="h-[265px] w-full"
        role="region"
        aria-label={t(interaction.graphConfig?.ariaLabel || '')}
        tabIndex={0}
      >
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{ top: 0, right: 0, bottom: 40, left: 25 }}
            onClick={() => {
              setShowTooltip(false);
              setFocusedPoint(null);
            }}
          >
            <CartesianGrid strokeOpacity={0.3} fill="#f8fafc" />
            <XAxis
              dataKey="x"
              label={{
                value: t(interaction.graphConfig?.x.label || ''),
                position: 'bottom',
                offset: 10,
              }}
              domain={[interaction.graphConfig?.x.min ?? 0, interaction.graphConfig?.x.max ?? 0]}
              ticks={xTicks}
            />
            <YAxis
              label={{
                value: t(interaction.graphConfig?.y.label || ''),
                angle: -90,
                position: 'left',
                offset: 10,
              }}
              domain={yDomain}
            />
            <Tooltip
              position={focusedPoint ? { x: focusedPoint.x, y: focusedPoint.y } : undefined}
              content={({ active, payload, label }) => {
                if (showTooltip && focusedPoint) {
                  return (
                    <div
                      className="bg-white p-3 border border-slate-200 rounded shadow-sm"
                      role="tooltip"
                      aria-live="polite"
                    >
                      <p className="text-m font-medium">
                        {getXTooltip(
                          interaction.graphConfig?.x?.tooltipLabel || '',
                          currentNitrogen.toString(),
                          interaction.graphConfig?.x?.tooltipLabelValue || '',
                        )}
                      </p>
                      <p
                        className="text-m"
                        style={{
                          color: focusedPoint.color,
                        }}
                      >
                        {focusedPoint.name}: ${focusedPoint.value?.toFixed(0)}
                      </p>
                    </div>
                  );
                }
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border border-slate-200 rounded shadow-sm" role="tooltip">
                      <p className="text-m font-medium">
                        {getXTooltip(
                          interaction.graphConfig?.x?.tooltipLabel || '',
                          label,
                          interaction.graphConfig?.x?.tooltipLabelValue || '',
                        )}
                      </p>
                      {payload.map((entry: any, index: number) => (
                        <p
                          key={`tooltip-${index}`}
                          className="text-m"
                          style={{
                            color: entry.color,
                          }}
                        >
                          {entry.name}: ${entry.value.toFixed(0)}
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
                      visibility: showTooltip ? 'visible' : 'hidden',
                      position: 'absolute',
                      transform: `translate(${focusedPoint.x < 150 ? 10 : focusedPoint.x - 120}px, ${
                        focusedPoint.y < 120 ? 10 : focusedPoint.y - 100
                      }px)`,
                      zIndex: 1000,
                    }
                  : undefined
              }
            />
            {interaction.graphConfig?.showLegend && (
              <Legend
                verticalAlign="top"
                align="center"
                layout="horizontal"
                wrapperStyle={{ paddingBottom: '20px' }}
                content={<CustomLegend />}
              />
            )}
            {interaction.graphConfig?.referenceLines?.map((referenceLine, index) => (
              <ReferenceLine
                key={`referenceLine-${index}`}
                x={referenceLine.value}
                stroke={referenceLine.stroke}
                strokeDasharray="3 3"
                label={{
                  value: t(referenceLine?.label || ''),
                  position: 'top',
                }}
              />
            ))}
            {interaction?.graphConfig?.lines.map((line) => (
              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.stroke}
                name={t(line.name)}
                dot={<CustomDot name={t(line.name)} label={t(line.tooltipLabel)} />}
                activeDot={(props: any) => {
                  const lineIndex =
                    interaction.graphConfig?.lines.findIndex((l) => l.dataKey === line.dataKey) ?? 0;
                  const shape = shapeTypes[lineIndex % shapeTypes.length];
                  return <g>{renderCustomShape(props.cx, props.cy, 12, line.stroke, line.stroke, shape)}</g>;
                }}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      {parse(t(interaction.equationSolution || ''))}
    </div>
  );
};

export default CostBenefitChart;
