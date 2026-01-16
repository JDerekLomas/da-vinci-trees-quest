import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { WindPowerDataExplorerInteraction } from '../interactives/interface';
import { useTranslations } from '../../../hooks/useTranslations';
import WindPowerData from '../configs/wind-power-data';
import parse from 'html-react-parser';
import {
  Line,
  XAxis,
  YAxis,
  Legend,
  Scatter,
  Tooltip,
  CartesianGrid,
  ComposedChart,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

interface DataExplorerProps {
  interaction: WindPowerDataExplorerInteraction;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const stripHTML = (html: string): string => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

const DataExplorer = ({ interaction, onInteraction }: DataExplorerProps) => {
  const { t } = useTranslations();

  const { inputs, bestFit, showInputs, showModelFit, getModelPoints, getModelFit, getEquation, getAnnouncements } =
    interaction;
  const { modelPerformance, optimizeFit } = interaction.translations;
  const {
    line,
    xAxis,
    yAxis,
    scatter,
    tooltip,
    showLinePlot,
    showScatterPlot,
    showReferenceLine,
    ariaLabel: graphAriaLabel,
  } = interaction.graphConfig;

  const graphRef = useRef<HTMLDivElement>(null);
  const [inputSliders, setInputSliders] = useState(inputs.filter((input) => input.type === 'slider'));
  const [announcement, setAnnouncement] = useState('');

  const data = React.useMemo(() => WindPowerData, []);
  const paramObject = useMemo(
    () => Object.fromEntries(inputSliders.map((input) => [input.id, input.value])),
    [inputSliders],
  );
  const modelFit = useMemo(() => getModelFit(data, paramObject), [data, getModelFit, paramObject]);
  const modelPoints = useMemo(() => getModelPoints(data, paramObject), [data, getModelPoints, paramObject]);
  const equation = useMemo(() => getEquation(paramObject), [getEquation, paramObject]);

  const getModelFitColor = (modelFit: number) => {
    if (modelFit < 50) return 'text-[#A6001A]';
    if (modelFit < 75) return 'text-[#5A3714]';
    return 'text-[#005F20]';
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

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const sliderValue = inputSliders.find((input) => input.id === e.target.id)?.value ?? 0;
    setAnnouncement(getAnnouncements(e.target.id, sliderValue, value));
    setInputSliders((prev) => prev.map((input) => (input.id === e.target.id ? { ...input, value } : input)));
    setTimeout(() => {
      setAnnouncement('');
    }, 0);
  };

  const handleOptimizeFit = () => {
    onInteraction({
      optimize_fit: true,
    });
    setInputSliders((prev) => {
      return prev.map((input) => {
        const bestFitValue = bestFit[input.id as keyof typeof bestFit];
        if (bestFitValue !== undefined) {
          return { ...input, value: bestFitValue };
        }
        return input;
      });
    });
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="text-base">
            {t(tooltip.xLabel)}: {payload[0].payload.windSpeed.toFixed(2)}
          </p>
          <p className="text-base">
            {t(tooltip.yLabel)}: {payload[0].payload.power.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomScatterShape = (props: any) => {
    const { cx, cy, fill, payload } = props;
    const ariaLabel = Object.entries(payload)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
    return <circle role="img" aria-label={ariaLabel} cx={cx} cy={cy} r={4} fill={fill} />;
  };

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

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Controls Row */}
      <div className="flex flex-col lg:flex-row  gap-4">
        {/* Sliders Card */}
        {showInputs && (
          <div className="w-full flex flex-col gap-2 rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            {inputSliders.map((input) => (
              <div key={input.id} className="flex flex-col gap-2">
                <div aria-live="off" className="text-base font-semibold">
                  <label htmlFor={input.id}>{parse(t(input.label))}</label>: {input.value}
                </div>
                <input
                  id={input.id}
                  type="range"
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  value={input.value}
                  onChange={handleSliderChange}
                  className="global-slider w-full mb-4"
                  aria-valuetext={`${stripHTML(t(input.label))}: ${input.value}`}
                />
              </div>
            ))}
          </div>
        )}

        {/* Model Fit Card */}
        {showModelFit && (
          <div className="w-full flex flex-col items-center justify-around rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2 font-bold text-gray-700" aria-hidden>
              {t(modelPerformance)}
            </div>
            <div className={`text-4xl font-bold mb-4 ${getModelFitColor(modelFit)}`} aria-hidden>
              {modelFit.toFixed(1)}%
            </div>
            <div className="sr-only" aria-live="polite">
              {t(modelPerformance)} {modelFit.toFixed(1)}%
            </div>
            <button
              onClick={handleOptimizeFit}
              className="bg-[#006be0] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              {t(optimizeFit)}
            </button>
          </div>
        )}
      </div>

      {/* Formula */}
      {equation && (
        <div className="flex justify-center">
          <div className="rounded-lg border border-gray-200 p-2 shadow-sm hover:shadow-md transition-shadow">
            <span className="font-besley font-bold">{parse(equation)}</span>
          </div>
        </div>
      )}

      {/* Graph */}
      <div ref={graphRef} tabIndex={0} role="region" aria-label={t(graphAriaLabel)}>
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart margin={{ top: 5, right: 20, bottom: 40, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="windSpeed"
              type="number"
              domain={xAxis.domain}
              label={{ value: t(xAxis.labelValue ?? ''), position: 'bottom', offset: 5 }}
            />
            <YAxis
              dataKey="power"
              type="number"
              domain={[-500, 2500]}
              allowDataOverflow={true}
              label={{
                value: t(yAxis.labelValue ?? ''),
                angle: -90,
                position: 'left',
                dy: -70,
                offset: 10,
              }}
            />
            <Legend
              verticalAlign="top"
              iconSize={12}
              wrapperStyle={{
                paddingBottom: '15px',
                fontSize: '16px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            {showScatterPlot && (
              <Scatter
                isAnimationActive={false}
                name={t(scatter.name)}
                data={data}
                fill="#8200C3"
                dataKey="power"
                shape={<CustomScatterShape />}
              />
            )}
            {showLinePlot && (
              <Line
                name={t(line.name)}
                data={modelPoints}
                dataKey="power"
                stroke="#5A3714"
                dot={false}
                strokeWidth={2}
              />
            )}
            {showReferenceLine && <ReferenceLine y={0} stroke="black" strokeWidth={2} />}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Announcement */}
      <div className="sr-only" aria-live="polite">
        {t(announcement)}
      </div>
    </div>
  );
};

export default DataExplorer;
