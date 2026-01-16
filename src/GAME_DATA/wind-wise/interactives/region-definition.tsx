import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import WindPowerData from '../configs/wind-power-data';
import { useTranslations } from '../../../hooks/useTranslations';
import { RegionDefinitionInteraction } from './interface';
import parse from 'html-react-parser';
import {
  XAxis,
  YAxis,
  Legend,
  Scatter,
  Tooltip,
  ComposedChart,
  CartesianGrid,
  ReferenceLine,
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts';

interface RegionDefinitionProps {
  interaction: RegionDefinitionInteraction;
}

const RegionDefinition = React.memo(({ interaction }: RegionDefinitionProps) => {
  const { t } = useTranslations();

  const { inputs, getFeedback, graphConfig, mph } = interaction;
  const { ariaLabel, xAxis, yAxis, scatter, tooltip } = graphConfig;

  const [inputSliders, setInputSliders] = useState(inputs.filter((input) => input.type === 'slider'));
  const graphRef = useRef<HTMLDivElement>(null);

  const data = useMemo(() => WindPowerData, []);
  const cutInSpeed = useMemo(() => inputSliders.find((input) => input.id === 'cutIn')?.value ?? 0, [inputSliders]);
  const ratedSpeed = useMemo(() => inputSliders.find((input) => input.id === 'rated')?.value ?? 0, [inputSliders]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setInputSliders((prev) => prev.map((input) => (input.id === e.target.id ? { ...input, value } : input)));
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

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {inputSliders.map((input) => (
          <div key={input.id} className="flex flex-col gap-2">
            <div aria-live="off" className="text-base font-semibold">
              <label htmlFor={input.id}>{t(input.label)}</label>: {input.value} {t(mph)}
            </div>
            <input
              id={input.id}
              type="range"
              min={input.min}
              max={input.max}
              step={input.step}
              value={input.value}
              onChange={handleSliderChange}
              className="global-slider w-full mb-2"
              aria-valuetext={`${t(input.label)}: ${input.value}`}
            />
            <p className="text-base font-medium text-gray-600" aria-live="polite">
              {parse(t(getFeedback(input.value, input.id)))}
            </p>
          </div>
        ))}
      </div>

      {/* Graph */}
      <div className="h-96" ref={graphRef} tabIndex={0} role="region" aria-label={t(ariaLabel)}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart margin={{ top: 5, right: 15, bottom: 30, left: 15 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <ReferenceArea x1={0} x2={cutInSpeed} fill="#A6001A" fillOpacity={0.1} strokeOpacity={0} />
            <ReferenceArea x1={cutInSpeed} x2={ratedSpeed} fill="#005F20" fillOpacity={0.1} strokeOpacity={0} />
            <ReferenceArea x1={ratedSpeed} x2={20} fill="#0055B2" fillOpacity={0.1} strokeOpacity={0} />
            <XAxis
              dataKey="windSpeed"
              type="number"
              domain={xAxis.domain}
              label={{
                value: t(xAxis.labelValue ?? ''),
                position: 'bottom',
                offset: 10,
              }}
            />
            <YAxis
              type="number"
              domain={yAxis.domain}
              label={{
                value: t(yAxis.labelValue ?? ''),
                angle: -90,
                position: 'left',
                dy: -105,
                offset: 5,
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              iconSize={12}
              wrapperStyle={{
                paddingBottom: '5px',
                fontSize: '16px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            />
            <ReferenceLine x={cutInSpeed} stroke="#374151" strokeDasharray="3 3" />
            <ReferenceLine x={ratedSpeed} stroke="#374151" strokeDasharray="3 3" />
            <Scatter
              isAnimationActive={false}
              name={t(scatter.name)}
              data={data}
              fill="#8200C3"
              fillOpacity={0.8}
              dataKey="power"
              cx="windSpeed"
              cy="power"
              shape={<CustomScatterShape />}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

export default RegionDefinition;
