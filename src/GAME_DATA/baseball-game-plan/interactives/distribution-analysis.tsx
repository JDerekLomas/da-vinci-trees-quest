/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { DistributionAnalysisInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';

interface DistributionAnalysisProps {
  interaction: DistributionAnalysisInteraction;
}

const DistributionAnalysis: React.FC<DistributionAnalysisProps> = ({ interaction }) => {
  const { t } = useTranslations();

  const data = interaction.data.map((bin, index) => ({
    ...bin,
    index,
    binRange: `${bin.binStart}-${bin.binEnd}`,
    binCenter: (bin.binStart + bin.binEnd) / 2,
  }));


  const calculateStats = (teamData: 'OurTeam' | 'Eagles') => {
    const total = data.reduce((sum, bin) => sum + bin[teamData], 0);
    const mean = data.reduce((sum, bin) => sum + (bin.binCenter * bin[teamData]), 0) / total;

    const variance =
      data.reduce((sum, bin) => {
        return sum + Math.pow(bin.binCenter - mean, 2) * bin[teamData];
      }, 0) / total;

    const stdDev = Math.sqrt(variance);

    return {
      total,
      mean: mean.toFixed(2),
      stdDev: stdDev.toFixed(2),
    };
  };

  const StatsCard = ({
    teamName,
    stats,
    color,
  }: {
    teamName: string;
    stats: ReturnType<typeof calculateStats>;
    color: string;
  }) => {
    const { t } = useTranslations();

    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className={`text-xl font-bold mb-4`} style={{ color }}>
          {teamName}
        </h3>
        <div className="space-y-2">
          <div className="text-gray-900">
            {t('scenes.S10.S10_D0_F52_C9.stats.total_games')} {stats.total}
          </div>
          <div className="text-gray-900 flex items-center gap-2">
            <span
              dangerouslySetInnerHTML={{
                __html: `${t('scenes.S10.S10_D0_F52_C9.stats.mean')} ${stats.mean}`,
              }}
            />
          </div>
          <div className="text-gray-900 flex items-center gap-2">
            <span
              dangerouslySetInnerHTML={{
                __html: `${t('scenes.S10.S10_D0_F52_C9.stats.std_dev')} ${stats.stdDev}`,
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const HistogramChart = ({
    data,
    dataKey,
    fill,
    teamName,
    maxY,
  }: {
    data: any[];
    dataKey: string;
    fill: string;
    teamName: string;
    maxY: number;
  }) => {
    const yAxisTicks = Array.from({ length: maxY / 3 + 1 }, (_, i) => i * 3);

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
        const tooltipWidth = 150;

        const tooltipX = Math.min(x + width / 2 + 30, chartBounds.width - tooltipWidth);

        setActiveTooltip({
          index,
          coordinate: {
            x: Math.max(0, tooltipX),
            y: Math.max(y, 20),
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
            opacity={0.9}
            stroke={'#000000'}
            strokeWidth={activeTooltip?.index === index ? 1 : 0.5}
            tabIndex={0}
            role="graphics-symbol"
            aria-label={`${value} ${t('scenes.S10.S10_D0_F52_C9.accessibility.chart.games')} ${t(
              'scenes.S10.S10_D0_F52_C9.accessibility.chart.in_range',
            )} ${binRange} ${t('scenes.S10.S10_D0_F52_C9.accessibility.chart.runs')}`}
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
          {teamName}
        </h3>
        <div
          role="figure"
          aria-label={`${t('scenes.S10.S10_D0_F52_C9.accessibility.chart.histogram_prefix')} ${teamName}`}
          className="flex justify-center"
        >
          <BarChart
            accessibilityLayer
            width={400}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 30,
              bottom: 25,
            }}
            barCategoryGap={0}
            barGap={0}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} stroke="#666666" vertical={false} />
            <XAxis
              dataKey="binRange"
              tickLine={false}
              axisLine={{ stroke: '#666666' }}
              tick={{
                fill: '#666666',
                fontSize: 12,
              }}
              label={{
                value: t('scenes.S10.S10_D0_F52_C9.chart.runs_per_game'),
                position: 'bottom',
                offset: 3,
                style: {
                  fill: '#666666',
                  fontSize: 12,
                },
              }}
            />
            <YAxis
              domain={[0, maxY]}
              ticks={yAxisTicks}
              tickLine={false}
              axisLine={{ stroke: '#666666' }}
              tick={{
                fill: '#666666',
                fontSize: 12,
              }}
              label={{
                value: t('scenes.S10.S10_D0_F52_C9.chart.number_of_games'),
                angle: -90,
                position: 'insideLeft',
                offset: 0,
                style: {
                  fill: '#666666',
                  fontSize: 12,
                  textAnchor: 'middle',
                },
              }}
            />
            <Tooltip
              active={activeTooltip !== null}
              position={activeTooltip ? activeTooltip.coordinate : undefined}
              isAnimationActive={false}
              payload={
                activeTooltip
                  ? [
                      {
                        name: teamName,
                        value: activeTooltip.value,
                        payload: {
                          binRange: activeTooltip.binRange,
                        },
                      },
                    ]
                  : []
              }
              cursor={false}
              formatter={() => [`${activeTooltip?.value} ${t('scenes.S10.S10_D0_F52_C9.chart.tooltip.games')}`]}
              labelFormatter={() =>
                `${t('scenes.S10.S10_D0_F52_C9.chart.tooltip.range_prefix')} ${activeTooltip?.binRange} ${t(
                  'scenes.S10.S10_D0_F52_C9.chart.tooltip.runs_suffix',
                )}`
              }
            />
            <Bar dataKey={dataKey} shape={CustomBar} isAnimationActive={false} />
          </BarChart>
          <div className="sr-only">
            {data.map((item, index) => (
              <p key={index}>{`${item[dataKey]} games had between ${item.binRange} runs`}</p>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ourStats = calculateStats('OurTeam');
  const eaglesStats = calculateStats('Eagles');

  return (
    <div className="w-full space-y-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <StatsCard
          teamName={t('scenes.S10.S10_D0_F52_C9.team_statistics.park_high')}
          stats={ourStats}
          color="#006BE0"
        />
        <StatsCard
          teamName={t('scenes.S10.S10_D0_F52_C9.team_statistics.eagles')}
          stats={eaglesStats}
          color="#EB0000"
        />
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <HistogramChart
          data={data}
          dataKey="OurTeam"
          fill="#006BE0"
          teamName={t('scenes.S10.S10_D0_F52_C9.teams.park_high')}
          maxY={18}
        />
        <HistogramChart
          data={data}
          dataKey="Eagles"
          fill="#EB0000"
          teamName={t('scenes.S10.S10_D0_F52_C9.teams.eagles')}
          maxY={18}
        />
      </div>
    </div>
  );
};

export default DistributionAnalysis;