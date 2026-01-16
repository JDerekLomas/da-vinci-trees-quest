import React, { useState } from 'react';
import { BoxPlotInteraction, PitcherStats } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';

interface BoxPlotProps {
  interaction: BoxPlotInteraction;
}

interface BoxPlotPoints {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  color: string;
}

interface BoxPlotVisualizationProps {
  data: PitcherStats;
  points: BoxPlotPoints;
}

interface StatsLabelsProps {
  data: PitcherStats;
  points: BoxPlotPoints;
  t: (key: string) => string;
}

interface XAxisProps {
  range: { min: number; max: number; step: number };
  getBoxPlotPoints: (data: PitcherStats, color: string) => BoxPlotPoints;
  t: (key: string) => string;
}

const BoxPlotVisualization: React.FC<BoxPlotVisualizationProps> = ({ points }) => (
  <g transform="translate(0, 100)">
    {/* Main horizontal line */}
    <line
      x1={points.min}
      x2={points.max}
      y1="0"
      y2="0"
      stroke={points.color}
      strokeWidth="2"
      role="presentation"
    />

    {/* Whisker ends */}
    <line x1={points.min} x2={points.min} y1="-10" y2="10" stroke={points.color} strokeWidth="2" role="img" />
    <line x1={points.max} x2={points.max} y1="-10" y2="10" stroke={points.color} strokeWidth="2" role="img" />

    {/* Box */}
    <rect
      x={points.q1}
      y="-15"
      width={points.q3 - points.q1}
      height="30"
      fill={points.color === '#3b82f6' ? '#93c5fd' : '#c4b5fd'}
      stroke={points.color}
      strokeWidth="2"
      role="img"
    />

    {/* Median line */}
    <line
      x1={points.median}
      x2={points.median}
      y1="-15"
      y2="15"
      stroke={points.color === '#3b82f6' ? '#1d4ed8' : '#6d28d9'}
      strokeWidth="3"
      role="img"
    />

    {/* Data points */}
    <circle cx={points.min} cy="0" r="4" fill={points.color} role="img" />
    <circle cx={points.max} cy="0" r="4" fill={points.color} role="img" />
  </g>
);

const StatsLabels: React.FC<StatsLabelsProps> = ({ data, points, t }) => (
  <g fontSize="12" fill="#1e293b" textAnchor="middle">
    <text x={points.min} y="60" fontWeight="bold" aria-hidden="true">
      {t('scenes.S8.S8_D0_F35_C9.stats.min')}
    </text>
    <text x={points.min} y="75" aria-hidden="true">
      {data.min}
    </text>

    <text x={points.q1} y="60" fontWeight="bold" dx="-8" aria-hidden="true">
      {t('scenes.S8.S8_D0_F35_C9.stats.q1')}
    </text>
    <text x={points.q1} y="75" dx="-10" aria-hidden="true">
      {data.q1}
    </text>

    <text x={points.median} y="60" fontWeight="bold" dx="3" aria-hidden="true">
      {t('scenes.S8.S8_D0_F35_C9.stats.median')}
    </text>
    <text x={points.median} y="75" dx="10" aria-hidden="true">
      {data.median}
    </text>

    <text x={points.q3} y="60" fontWeight="bold" aria-hidden="true">
      {t('scenes.S8.S8_D0_F35_C9.stats.q3')}
    </text>
    <text x={points.q3} y="75" aria-hidden="true">
      {data.q3}
    </text>

    <text x={points.max} y="60" fontWeight="bold" aria-hidden="true">
      {t('scenes.S8.S8_D0_F35_C9.stats.max')}
    </text>
    <text x={points.max} y="75" aria-hidden="true">
      {data.max}
    </text>

    {/* Screen reader only */}
    <foreignObject x="0" y="0" width="800" height="200">
      <div className="sr-only">
        {t('scenes.S8.S8_D0_F35_C9.stats.min')}: {data.min}, &nbsp;
        {t('scenes.S8.S8_D0_F35_C9.stats.q1')}: {data.q1}, &nbsp;
        {t('scenes.S8.S8_D0_F35_C9.stats.median')}: {data.median},&nbsp;
        {t('scenes.S8.S8_D0_F35_C9.stats.q3')}: {data.q3},&nbsp;
        {t('scenes.S8.S8_D0_F35_C9.stats.max')}: {data.max}
      </div>
    </foreignObject>
  </g>
);
const XAxis: React.FC<XAxisProps> = ({ range, getBoxPlotPoints, t }) => {
  const ticks = Array.from(
    { length: (range.max - range.min) / range.step + 1 },
    (_, i) => range.min + i * range.step,
  );

  return (
    <g>
      {/* Main axis line */}
      <line x1="100" y1="140" x2="700" y2="140" stroke="#475569" strokeWidth="2" />

      {/* Ticks and labels */}
      {ticks.map((value) => {
        const x = getBoxPlotPoints({ min: value, q1: 0, median: 0, q3: 0, max: 0 }, '')['min'];
        return (
          <g key={value}>
            <line x1={x} y1="140" x2={x} y2="145" stroke="#475569" strokeWidth="1" />
            <text x={x} y="160" textAnchor="middle" fontSize="12" fill="#64748b">
              {value}
            </text>
          </g>
        );
      })}

      {/* X-axis label */}
      <text x="400" y="190" textAnchor="middle" fontSize="14" fill="#475569">
        {t('scenes.S8.S8_D0_F35_C9.x_axis_label')}
      </text>
    </g>
  );
};

const BaseballStats: React.FC<BoxPlotProps> = ({ interaction }) => {
  const { t } = useTranslations();
  const [selectedStarter, setSelectedStarter] = useState<string>(interaction.defaultStarter);

  const getBoxPlotPoints = (data: PitcherStats, color: string): BoxPlotPoints => {
    const { min: xMin, max: xMax } = interaction.xAxisRange;
    const svgStart = 100;
    const svgWidth = 600;

    const scale = (value: number): number => {
      const clampedValue = Math.max(xMin, Math.min(xMax, value));
      return svgStart + (clampedValue - xMin) * (svgWidth / (xMax - xMin));
    };

    return {
      min: scale(data.min),
      q1: scale(data.q1),
      median: scale(data.median),
      q3: scale(data.q3),
      max: scale(data.max),
      color,
    };
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2 space-y-4">
      <p className="text-center text-gray-600">{t('scenes.S8.S8_D0_F35_C9.subtitle')}</p>

      <div className="bg-blue-50 rounded-lg shadow p-4">
        <h2 className="text-xl font-bold text-blue-800 mb-4 text-center">
          {t('scenes.S8.S8_D0_F35_C9.pitcher')}
        </h2>
        <h6 className="text-base font-semibold text-blue-600 mb-4 text-center">
          {t('scenes.S8.S8_D0_F35_C9.select_pitcher')}
        </h6>

        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="flex flex-wrap justify-center gap-2">
            {Object.keys(interaction.starterData).map((pitcher) => (
              <button
                key={pitcher}
                onClick={() => setSelectedStarter(pitcher)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedStarter === pitcher
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}
              >
                {t(pitcher)}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mb-2 text-lg font-bold text-gray-800">
          {t('scenes.S8.S8_D0_F35_C9.distribution_analysis')}
        </div>
        <div aria-label={t(interaction.ariaLabel)} className="sr-only"></div>
        <svg viewBox="0 0 800 200" className="w-full">
          <text x="400" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">
            {t(selectedStarter)}
          </text>
          {(() => {
            const data = interaction.starterData[selectedStarter];
            const points = getBoxPlotPoints(data, '#3b82f6');
            return (
              <>
                <StatsLabels data={data} points={points} t={t} />
                <BoxPlotVisualization data={data} points={points} />
              </>
            );
          })()}
          <XAxis range={interaction.xAxisRange} getBoxPlotPoints={getBoxPlotPoints} t={t} />
        </svg>
      </div>
    </div>
  );
};

export default BaseballStats;
