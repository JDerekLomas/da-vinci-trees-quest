import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { BattingAnalysisInteraction, PlayerStats } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';

interface BattingAnalysisProps {
  interaction: BattingAnalysisInteraction;
}

const BattingAnalysis: React.FC<BattingAnalysisProps> = ({ interaction }) => {
  const { t } = useTranslations();

  const data = interaction.data.map((bin, index) => ({
    ...bin,
    index,
    binRange: `${bin.binStart.toFixed(3)}-${bin.binEnd.toFixed(3)}`,
    binCenter: (bin.binStart + bin.binEnd) / 2,
  }));

  const StatsCard = ({
    playerKey,
    stats,
    color,
  }: {
    playerKey: 'steady_steve' | 'streaky_sam';
    stats: PlayerStats;
    color: string;
  }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-xl font-bold mb-4" style={{ color }}>
        {t(interaction.translations.players[playerKey])}
      </h3>
      <div className="space-y-2">
        <div className="text-gray-900">
          {t(interaction.translations.stats.mean)}: {stats.mean}
        </div>
        <div className="text-gray-900">
        {t(interaction.translations.stats.median)}: {Number(stats.median).toFixed(3)}
        </div>
      </div>
    </div>
  );

  const HistogramChart = ({
    data,
    dataKey,
    fill,
    playerKey,
  }: {
    data: any[];
    dataKey: string;
    fill: string;
    playerKey: 'steady_steve' | 'streaky_sam';
  }) => {
    const [activeTooltip, setActiveTooltip] = useState<{
      index: number;
      coordinate: { x: number; y: number };
      binRange: string;
      value: number;
    } | null>(null);

    const CustomBar = (props: any) => {
      const { x, y, width, height, value, payload } = props;
      const binRange = payload.binRange;
      const index = payload.index;

      const handleInteraction = () => {
        const chartElement = document.querySelector('.recharts-wrapper');
        if (!chartElement) return;

        const chartBounds = chartElement.getBoundingClientRect();
        const tooltipWidth = 140;

        const tooltipX = Math.min(x + width / 2 + 30, chartBounds.width - tooltipWidth - 160);

        setActiveTooltip({
          index,
          coordinate: {
            x: Math.max(tooltipX),
            y: Math.max(y - 80, 20),
          },
          binRange,
          value,
        });
      };
      const handleLeave = () => {
        setActiveTooltip(null);
      };

      return (
        <g>
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={fill}
            stroke="#000000"
            strokeWidth={activeTooltip?.index === index ? 2 : 1}
            tabIndex={0}
            role="graphics-symbol"
            aria-label={`${value} ${t(interaction.translations.chart.tooltip.games)} ${t(
              interaction.translations.chart.tooltip.range_prefix,
            )} ${binRange} ${t(interaction.translations.chart.tooltip.average_suffix)}`}
            onFocus={handleInteraction}
            onBlur={handleLeave}
            onMouseEnter={handleInteraction}
            onMouseLeave={handleLeave}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' && index < data.length - 1) {
                const nextElement = document.querySelector(`[data-bar-index="${index + 1}"]`) as HTMLElement;
                if (nextElement) {
                  nextElement.focus();
                  e.preventDefault();
                }
              }
              if (e.key === 'ArrowLeft' && index > 0) {
                const prevElement = document.querySelector(`[data-bar-index="${index - 1}"]`) as HTMLElement;
                if (prevElement) {
                  prevElement.focus();
                  e.preventDefault();
                }
              }
            }}
            data-bar-index={index}
          />
        </g>
      );
    };

    return (
      <div>
        <h3 className="text-xl font-bold text-center mb-4" style={{ color: fill }}>
          {t(interaction.translations.players[playerKey])}
        </h3>
        <div
          role="figure"
          aria-label={`${t(
            interaction.translations.accessibility.chart.histogram_prefix,
          )} ${t(interaction.translations.players[playerKey])}`}
          className="overflow-hidden"
        >
          <BarChart
            accessibilityLayer
            width={350}
            height={300}
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 60 }}
            barCategoryGap={0}
            barGap={0}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
            <XAxis
              dataKey="binRange"
              angle={-45}
              dy={15}
              tickLine={false}
              axisLine={{ stroke: '#666666' }}
              tick={{ fill: '#666666', fontSize: 9 }}
              label={{
                value: t(interaction.translations.chart.batting_average),
                position: 'bottom',
                offset: 40,
                style: { fill: '#666666', fontSize: 12 },
              }}
            />
            <YAxis
              domain={[0, 16]}
              tickLine={false}
              axisLine={{ stroke: '#666666' }}
              tick={{ fill: '#666666', fontSize: 12 }}
              label={{
                value: t(interaction.translations.chart.number_of_games),
                angle: -90,
                position: 'insideLeft',
                offset: 15,
                style: {
                  fill: '#666666',
                  fontSize: 12,
                  textAnchor: 'middle',
                },
              }}
            />
            <Tooltip
              active={activeTooltip !== null}
              isAnimationActive={false}
              position={activeTooltip ? activeTooltip.coordinate : undefined}
              formatter={() => [`${activeTooltip?.value} ${t(interaction.translations.chart.tooltip.games)}`]}
              labelFormatter={() =>
                `${t(interaction.translations.chart.tooltip.range_prefix)} ${activeTooltip?.binRange} ${t(
                  interaction.translations.chart.tooltip.average_suffix,
                )}`
              }
              cursor={false}
            />
            <Bar dataKey={dataKey} shape={CustomBar} isAnimationActive={false} />
          </BarChart>
          <div className="sr-only">
            {data.map((item, index) => (
              <p key={index}>{`${item[dataKey]} games had a batting average between ${item.binRange}`}</p>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const steveStats: PlayerStats = {
    mean: interaction.translations.values.steve.mean,
    median: interaction.translations.values.steve.median,
    stdDev: interaction.translations.values.steve.std_dev,
  };

  const samStats: PlayerStats = {
    mean: interaction.translations.values.sam.mean,
    median: interaction.translations.values.sam.median,
    stdDev: interaction.translations.values.sam.std_dev,
  };

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <StatsCard playerKey="steady_steve" stats={steveStats} color="#3b82f6" />
        <StatsCard playerKey="streaky_sam" stats={samStats} color="#ef4444" />
      </div>

      <div className="grid grid-cols-2 gap-0">
        <HistogramChart data={data} dataKey="SteadySteve" fill="#3b82f6" playerKey="steady_steve" />
        <HistogramChart data={data} dataKey="StreakySam" fill="#ef4444" playerKey="streaky_sam" />
      </div>
    </div>
  );
};

export default BattingAnalysis;
