import { useState, useRef, useCallback, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  ReferenceDot,
  ResponsiveContainer,
} from 'recharts';
import { useTranslations } from '../../../hooks/useTranslations';
import inverseSquareConfig from '../configs/inverse-square-graph';
import '../../../shared/slider.css';

const SLIDER_MIN = 1.0;
const SLIDER_MAX = 5.0;
const SLIDER_STEP = 0.1;

const InverseSquareGraph = () => {
  const { t } = useTranslations();
  const [d1, setD1] = useState(1.0);
  const [d2, setD2] = useState(2.0);
  const [focusedPoint] = useState<{ cx: number; cy: number; payload: any } | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  // For blue progress bar on slider
  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #e0e0e0 ${percent}%)`;
  }, []);

  useEffect(() => {
    const d1Slider = document.getElementById('slider-d1') as HTMLInputElement;
    const d2Slider = document.getElementById('slider-d2') as HTMLInputElement;
    if (d1Slider) updateSliderBackground(d1Slider);
    if (d2Slider) updateSliderBackground(d2Slider);
  }, [d1, d2, updateSliderBackground]);

  const generateData = () => {
    const data = [];
    for (let d2_d1 = 1.0; d2_d1 <= 5.0; d2_d1 += 0.05) {
      data.push({
        distanceRatio: d2_d1,
        intensityRatio: d2_d1 * d2_d1,
      });
    }
    return data;
  };

  const data = generateData();
  const distanceRatio = d2 / d1;
  const intensityRatio = (d2 / d1) * (d2 / d1);

  // Find the closest data point for the current ratio for the red dot
  const closestPoint = data.reduce((prev, curr) =>
    Math.abs(curr.distanceRatio - distanceRatio) < Math.abs(prev.distanceRatio - distanceRatio) ? curr : prev,
  );

  return (
    <div
      className="w-full max-w-2xl mx-auto"
      role="region"
      aria-label={t(inverseSquareConfig.ariaLabel)}
      ref={chartContainerRef}
    >
      {/* Equation and meanings */}
      <div className="flex flex-row items-center justify-between mb-2 gap-4">
        <div className="flex-1 text-left">
          <div
            aria-hidden="true"
            className="font-besley text-2xl md:text-2xl font-bold"
            style={{ lineHeight: 1.2 }}
          >
            <span className="text-[#E0002B]">
              <i>I</i>
              <sub className="text-[#E0002B]">1</sub>
            </span>
            /
            <span className="text-[#8E24AA]">
              <i>I</i>
              <sub className="text-[#8E24AA]">2</sub>
            </span>{' '}
            ={' '}
            <span>
              (<i className="text-[#008217]">d</i>
              <sub className="text-[#008217]">2</sub>/<i className="text-[#677600]">d</i>
              <sub className="text-[#677600]">1</sub>)<sup className="text-[#DB0072]">2</sup>
            </span>
          </div>
        </div>
        <div className="flex-1 text-left text-xs md:text-sm">
          <div className="font-besley mb-1">
            <span className="text-[#E0002B]">
              <i>I</i>
              <sub className="text-[#E0002B]">1</sub>
            </span>{' '}
            {t(inverseSquareConfig.and)}
            <span className="text-[#8E24AA]">
              <i>I</i>
              <sub className="text-[#8E24AA]">2</sub>
            </span>{' '}
            {t(inverseSquareConfig.intensitiesDescription)}
          </div>
          <div className="font-besley">
            <span className="text-[#677600]">
              <i>d</i>
              <sub className="text-[#677600]">1</sub>
            </span>{' '}
            {t(inverseSquareConfig.and)}
            <span className="text-[#008217]">
              <i>d</i>
              <sub className="text-[#008217]">2</sub>
            </span>{' '}
            {t(inverseSquareConfig.distancesDescription)}
          </div>
        </div>
      </div>
      {/* Padding below equation */}
      <div className="py-4" />
      {/* Sliders in a single row, label/value above, slider below */}
      <div className="flex flex-row gap-8 items-end mb-4">
        {/* D1 Slider */}
        <div className="flex-1 min-w-[120px]">
          <div className="flex flex-row items-center justify-between mb-1">
            <label htmlFor="slider-d1" className="font-semibold text-gray-700 text-base md:text-lg">
              d₁ (Distance 1)
            </label>
            <span className="font-besley text-base">{d1.toFixed(1)}</span>
          </div>
          <input
            id="slider-d1"
            type="range"
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            step={SLIDER_STEP}
            value={d1}
            onChange={(e) => setD1(Number(e.target.value))}
            className="global-slider w-full"
            aria-label="Distance 1"
          />
        </div>
        {/* D2 Slider */}
        <div className="flex-1 min-w-[120px]">
          <div className="flex flex-row items-center justify-between mb-1">
            <label htmlFor="slider-d2" className="font-semibold text-gray-700 text-base md:text-lg">
              d₂ (Distance 2)
            </label>
            <span className="font-besley text-base">{d2.toFixed(1)}</span>
          </div>
          <input
            id="slider-d2"
            type="range"
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            step={SLIDER_STEP}
            value={d2}
            onChange={(e) => setD2(Number(e.target.value))}
            className="global-slider w-full"
            aria-label="Distance 2"
          />
        </div>
      </div>
      {/* Padding above ratios */}
      <div className="py-4" />
      {/* Ratios Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 mb-2 flex flex-row items-center justify-center gap-6 text-sm md:text-base">
        <div className="font-semibold text-blue-700">
          Distance Ratio: <span className="font-besley">d₂/d₁ = {distanceRatio.toFixed(2)}</span>
        </div>
        <div className="font-semibold text-pink-700">
          Intensity Ratio:{' '}
          <span className="font-besley">
            I₁/I₂ = ({distanceRatio.toFixed(2)})² = {intensityRatio.toFixed(2)}
          </span>
        </div>
      </div>
      {/* Padding below ratios */}
      <div className="py-4" />
      {/* Graph - take full width */}
      <div className="w-full" style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 30 }}
            role="graphics-document"
            aria-label={t(inverseSquareConfig.chartAriaLabel)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="distanceRatio"
              type="number"
              domain={[1, 5]}
              tickFormatter={(value) => value.toFixed(1)}
            >
              <Label value={t(inverseSquareConfig.xAxisLabel)} position="bottom" offset={10} />
            </XAxis>
            <YAxis domain={[1, 25]} tickFormatter={(value) => value.toFixed(0)}>
              <Label value={t(inverseSquareConfig.yAxisLabel)} angle={-90} position="middle" dx={-18} />
            </YAxis>
            <Tooltip
              content={({ active, payload, label }) => {
                if (active || focusedPoint) {
                  const xValue = focusedPoint ? focusedPoint.payload.distanceRatio : label;
                  const tooltipPayload = focusedPoint
                    ? [
                        {
                          color: '#2563eb',
                          value: focusedPoint.payload.intensityRatio,
                          yLabel: t(inverseSquareConfig.tooltipIntensityLabel),
                        },
                      ]
                    : payload;
                  return (
                    <div className="bg-white p-3 border rounded shadow-sm" role="tooltip" aria-live="polite">
                      {`${t(inverseSquareConfig.tooltipDistanceLabel)}: ${xValue.toFixed(2)}`}
                      {tooltipPayload?.map((item, index) => (
                        <div className="text-m mb-1" style={{ color: item.color }} key={`tooltip-${index}`}>
                          {t(inverseSquareConfig.tooltipIntensityLabel)}: {Number(item.value).toFixed(2)}
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
              wrapperStyle={
                focusedPoint
                  ? {
                      visibility: 'visible',
                      position: 'absolute',
                      transform: `translate(${focusedPoint.cx < 150 ? 10 : focusedPoint.cx - 120}px, ${
                        focusedPoint.cy < 120 ? 10 : focusedPoint.cy - 100
                      }px)`,
                      maxWidth: '200px',
                      zIndex: 1000,
                    }
                  : {}
              }
            />
            <Line type="monotone" dataKey="intensityRatio" stroke="#2563eb" dot={false} strokeWidth={2} />
            {/* Red indicator dot for current ratio */}
            <ReferenceDot
              x={closestPoint.distanceRatio}
              y={closestPoint.intensityRatio}
              r={7}
              fill="#E0002B"
              stroke="#fff"
              strokeWidth={2}
              isFront
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InverseSquareGraph;
