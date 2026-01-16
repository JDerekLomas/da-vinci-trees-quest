import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Line, XAxis, YAxis, Scatter, ComposedChart, CartesianGrid, ResponsiveContainer } from 'recharts';
import { PolynomialModelExplorerInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import WindPowerData from '../configs/wind-power-data';
import ToggleSwitch from './toggle-switch';
import parse from 'html-react-parser';

interface DataPoint {
  windSpeed: number;
  power: number;
}

interface ModelPoint {
  windSpeed: number;
  modelPower: number;
}

interface PolynomialExplorerProps {
  interaction: PolynomialModelExplorerInteraction;
}

const stripHTML = (html: string): string => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

const renderShape = (cx: number, cy: number, size: number, fill: string, stroke: string, shape: string) => {
  const halfSize = size / 2;
  const shapeMap = {
    square: (
      <rect
        x={cx - halfSize}
        y={cy - halfSize}
        width={size}
        height={size}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
      />
    ),
    triangle: (
      <polygon
        points={`${cx},${cy - halfSize} ${cx - halfSize},${cy + halfSize} ${cx + halfSize},${cy + halfSize}`}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
      />
    ),
    diamond: (
      <polygon
        points={`${cx},${cy - halfSize} ${cx + halfSize},${cy} ${cx},${cy + halfSize} ${cx - halfSize},${cy}`}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
      />
    ),
    circle: <circle cx={cx} cy={cy} r={halfSize} fill={fill} stroke={stroke} strokeWidth={1} />,
  };
  return shapeMap[shape as keyof typeof shapeMap] || shapeMap.circle;
};

const createDotRenderer =
  (color: string, shape: string, size = 8, gap = 5) =>
  (props: { cx?: number; cy?: number; index?: number }) => {
    const index = props.index || 0;
    if (index % gap !== 0) return <g />;
    return renderShape(props.cx || 0, props.cy || 0, size, color, 'white', shape);
  };

const ShapeIcon: React.FC<{ shape: string; color: string; size?: number }> = ({ shape, color, size = 12 }) => (
  <svg width={size} height={size} className="inline-block mr-2">
    {renderShape(size / 2, size / 2, size - 2, color, 'white', shape)}
  </svg>
);

const PolynomialModelExplorer = ({ interaction }: PolynomialExplorerProps) => {
  const { t } = useTranslations();

  const { inputs, graphConfig, translations } = interaction;
  const { ariaLabel, xAxis, yAxis, scatter } = graphConfig;
  const { fitLabel, modelComponentsLabel } = translations;

  const [inputSliders, setInputSliders] = useState(inputs.filter((input) => input.type === 'slider'));
  const [modelComponents, setModalComponents] = useState(interaction.modelComponents);
  const graphRef = useRef<HTMLDivElement>(null);

  const cubicTerm = inputSliders.find((input) => input.id === 'cubic')!;
  const quadraticTerm = inputSliders.find((input) => input.id === 'quadratic')!;
  const linearTerm = inputSliders.find((input) => input.id === 'linear')!;

  const data = useMemo(() => WindPowerData, []);

  const calculatePolyValue = useCallback(
    (x: number, type: string): number => {
      if (x < 1.4) return 0;
      if (x > 12.3) return 1500;

      const terms = {
        cubic: !cubicTerm.disabled ? cubicTerm.value * x ** 3 : 0,
        quadratic: !quadraticTerm.disabled ? quadraticTerm.value * x ** 2 : 0,
        linear: !linearTerm.disabled ? linearTerm.value * x : 0,
      };

      const y =
        type === 'full'
          ? Object.values(terms).reduce((sum, val) => sum + val, 0)
          : terms[type as keyof typeof terms] || 0;

      return Math.min(y, 1500);
    },
    [inputSliders],
  );

  const generateModelPoints = useMemo(
    () =>
      (type: string): ModelPoint[] => {
        const points: ModelPoint[] = [];
        const xMax = 20;
        points.push({ windSpeed: 0, modelPower: 0 });
        for (let x = 0.1; x <= xMax; x += 0.1) {
          points.push({
            windSpeed: x,
            modelPower: calculatePolyValue(x, type),
          });
        }
        return points;
      },
    [calculatePolyValue],
  );

  const calculateFitPercentage = useMemo(
    () =>
      (actualData: DataPoint[], modelPoints: ModelPoint[]): number => {
        if (!actualData?.length || !modelPoints?.length) return 0;
        const actualY = actualData.map((d) => d.power);
        const meanY = actualY.reduce((sum, val) => sum + val, 0) / actualY.length;
        const totalSS = actualY.reduce((sum, y) => sum + Math.pow(y - meanY, 2), 0);
        if (totalSS === 0) return 0;
        const residualSS = actualData.reduce((sum, point) => {
          const modelY = modelPoints.find((m) => Math.abs(m.windSpeed - point.windSpeed) < 0.1)?.modelPower || 0;
          return sum + Math.pow(point.power - modelY, 2);
        }, 0);
        return Math.max(0, Math.min(100, (1 - residualSS / totalSS) * 100));
      },
    [],
  );

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setInputSliders((prev) => prev.map((input) => (input.id === e.target.id ? { ...input, value } : input)));
  };

  const handelToggleSwitch = (id: string) => {
    setInputSliders((prev) =>
      prev.map((input) => (input.id === id ? { ...input, disabled: !input.disabled } : input)),
    );
  };

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    inputSliders.forEach((input) => {
      const slider = document.getElementById(input.id) as HTMLInputElement;
      if (slider) {
        updateSliderBackground(slider);
      }
    });
  }, [inputSliders, updateSliderBackground]);

  useEffect(() => {
    if (!data || data.length <= 0) return;
    Object.entries(modelComponents).forEach(([key, value]) => {
      const newValue = calculateFitPercentage(data, generateModelPoints(key));
      setModalComponents((prev) => {
        return {
          ...prev,
          [key]: {
            ...value,
            value: newValue,
          },
        };
      });
    });
  }, [data, inputSliders]);

  // hide the dots from screen readers
  useEffect(() => {
    if (!graphRef.current) return;
    const observer = new MutationObserver(() => {
      graphRef.current?.querySelectorAll('.recharts-scatter-symbol').forEach((dot) => {
        dot.removeAttribute('role');
        dot.setAttribute('aria-hidden', 'true');
      });
    });
    observer.observe(graphRef.current, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const CustomScatterShape = (props: any) => {
    const { cx, cy, fill, fillOpacity, payload } = props;
    const ariaLabel = Object.entries(payload || {})
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
    return (
      <circle role="img" aria-label={ariaLabel} cx={cx} cy={cy} r={4} fill={fill} fillOpacity={fillOpacity} />
    );
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Equation */}
      <div className="flex items-center justify-center gap-4 text-lg font-besley mx-auto max-w-2xl rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
        <div>
          <span className="italic text-[#E0002B]">P(v)</span> ={' '}
        </div>
        <div className="flex flex-col border-l-2 pl-4 space-y-2">
          <div className="flex justify-between items-center text-[#0061FC]">
            <div>0</div>
            <div className="ml-8 font-bold">
              <span className="italic">v</span> &lt; 1.4
            </div>
          </div>
          <div className="flex justify-between items-center text-[#005F20]">
            <div>
              {!cubicTerm.disabled && cubicTerm.value !== 0 && (
                <>
                  <span className="text-[#008217]">{cubicTerm.value.toFixed(2)}</span>
                  <span className="italic text-[#0061FC]"> v³ </span>
                </>
              )}
              {!quadraticTerm.disabled && quadraticTerm.value !== 0 && (
                <span>
                  {quadraticTerm.value >= 0 && !cubicTerm.disabled ? '+' : ''}{' '}
                  <span className="text-[#8E24AA]">{quadraticTerm.value.toFixed(2)}</span>
                  <span className="italic text-[#0061FC]"> v² </span>
                </span>
              )}
              {!linearTerm.disabled && linearTerm.value !== 0 && (
                <span>
                  {linearTerm.value >= 0 && (!cubicTerm.disabled || !quadraticTerm.disabled) ? '+' : ''}{' '}
                  <span className="text-[#DB0072]">{linearTerm.value.toFixed(2)}</span>
                  <span className="italic text-[#0061FC]"> v</span>
                </span>
              )}
              {/* all terms are disabled */}
              {inputSliders.every((input) => input.disabled) && (
                <span>
                  <span className="text-[#0061FC]">0</span>
                </span>
              )}
            </div>
            <div className="ml-8 font-bold text-[#0061FC]">
              1.4 ≤ <span className="italic">v</span> ≤ 12.3
            </div>
          </div>
          <div className="flex justify-between items-center text-[#0061FC]">
            <div>1500</div>
            <div className="ml-8 font-bold">
              <span className="italic">v</span> &gt; 12.3
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
        {/* Sliders */}
        <div className="w-full flex flex-col gap-4 rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
          {inputSliders.map((input) => (
            <div key={input.id} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div aria-live="off">
                  <label htmlFor={input.id}>{parse(t(input.label))}</label>: {input.value}
                </div>
                <ToggleSwitch
                  id={input.id}
                  label={stripHTML(t(input.label))}
                  checked={!input.disabled!}
                  toggleSwitch={handelToggleSwitch}
                />
              </div>
              <input
                id={input.id}
                type="range"
                min={input.min}
                max={input.max}
                step={input.step}
                value={input.value}
                disabled={input.disabled}
                onChange={handleSliderChange}
                className="global-slider w-full mb-4"
                aria-valuetext={`${stripHTML(t(input.label))}: ${input.value}`}
              />
            </div>
          ))}
        </div>

        {/* Model Components */}
        <div className="w-full flex flex-col rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="font-bold text-xl mb-6 text-gray-800">{t(modelComponentsLabel)}</h2>
          <ul>
            {Object.entries(modelComponents).map(([key, value]) => (
              <li key={key} className="flex items-center gap-2 mb-4 last:mb-0" aria-live="polite">
                <div className="flex items-center">
                  <ShapeIcon shape={value.shape} color={value.color} size={16} />
                  <span className="text-lg">{t(value.label)}</span>
                </div>
                <span className="ml-auto text-lg font-bold text-end" style={{ color: value.color }}>
                  {value.value.toFixed(1)}% {t(fitLabel)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Graph */}
      <div className="h-96" ref={graphRef} tabIndex={0} role="region" aria-label={t(ariaLabel)}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart margin={{ top: 5, right: 15, bottom: 40, left: 15 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="windSpeed"
              type="number"
              domain={xAxis.domain}
              label={{
                value: t(xAxis.labelValue!),
                position: 'bottom',
                offset: 10,
              }}
              tick={{ fill: '#4b5563' }}
            />
            <YAxis
              type="number"
              domain={yAxis.domain}
              label={{
                value: t(yAxis.labelValue!),
                angle: -90,
                position: 'left',
                dy: -50,
                offset: 5,
              }}
            />

            <Scatter
              isAnimationActive={false}
              name={t(scatter.name)}
              data={data}
              fill="#8200C3"
              fillOpacity={0.6}
              dataKey="power"
              cx="windSpeed"
              cy="power"
              shape={<CustomScatterShape />}
            />

            {inputSliders.map(
              (input) =>
                !input.disabled && (
                  <Line
                    key={input.id}
                    name={t(input.label)}
                    data={generateModelPoints(input.id)}
                    dataKey="modelPower"
                    stroke={modelComponents[input.id].color}
                    dot={createDotRenderer(modelComponents[input.id].color, modelComponents[input.id].shape)}
                    strokeWidth={2}
                  />
                ),
            )}

            <Line
              name={t(modelComponents.full.label)}
              data={generateModelPoints('full')}
              dataKey="modelPower"
              stroke={modelComponents.full.color}
              dot={createDotRenderer(modelComponents.full.color, modelComponents.full.shape)}
              strokeWidth={3}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PolynomialModelExplorer;
