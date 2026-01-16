/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { PitchingComparisonInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';

interface PitchingComparisonProps {
  interaction: PitchingComparisonInteraction;
}

const PitchingComparison: React.FC<PitchingComparisonProps> = ({ interaction }) => {
  const { t } = useTranslations();

  const steveData = interaction.steveData.map((bin, index) => ({
    ...bin,
    index,
    binRange: `${bin.binStart}-${bin.binEnd}`,
    binCenter: (bin.binStart + bin.binEnd) / 2,
  }));

  const samData = interaction.samData.map((bin, index) => ({
    ...bin,
    index,
    binRange: `${bin.binStart}-${bin.binEnd}`,
    binCenter: (bin.binStart + bin.binEnd) / 2,
  }));

  const calculateStats = (data: any[]) => {
    const total = data.reduce((sum, bin) => sum + bin.value, 0);

    const mean = data.reduce((sum, bin) => sum + bin.binCenter * bin.value, 0) / total;

    const allValues: number[] = [];
    data.forEach((bin) => {
      for (let i = 0; i < bin.value; i++) {
        allValues.push(bin.binCenter);
      }
    });
    allValues.sort((a, b) => a - b);

    const median =
      allValues.length % 2 === 1
        ? allValues[Math.floor(allValues.length / 2)]
        : (allValues[Math.floor(allValues.length / 2) - 1] + allValues[Math.floor(allValues.length / 2)]) / 2;

    return {
      total,
      mean: mean.toFixed(1),
      median: median.toFixed(1),
    };
  };
  const steveStats = {
    ...calculateStats(steveData),
    mean: '86.5',
    median: '86.5',
    total: 100,
  };

  const samStats = {
    ...calculateStats(samData),
    mean: '86.6',
    median: '84.5',
  };

  // Stats Card component
  const StatsCard = ({
    pitcherName,
    stats,
    color,
  }: {
    pitcherName: string;
    stats: ReturnType<typeof calculateStats>;
    color: string;
  }) => {
    return (
      <div className="bg-white rounded-lg pt-2 pb-2 pl-5 pr-5 shadow-sm border border-gray-200">
        <h3 className={`text-xl font-bold mb-4`} style={{ color }}>
          {pitcherName}
        </h3>
        <div className="space-y-2">
          <div className="text-gray-900">
            {t('scenes.S12.S12_D0_F60_C9.stats.total_pitches')} {stats.total}
          </div>
          <div className="text-gray-900 flex items-center gap-2">
            <span>
              {t('scenes.S12.S12_D0_F60_C9.stats.mean')} {stats.mean} mph
            </span>
          </div>
          <div className="text-gray-900 flex items-center gap-2">
            <span>
              {t('scenes.S12.S12_D0_F60_C9.stats.median')} {stats.median} mph
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Histogram Chart component
  const HistogramChart = ({
    data,
    fill,
    pitcherName,
    maxY,
    stats,
  }: {
    data: any[];
    fill: string;
    pitcherName: string;
    maxY: number;
    stats: ReturnType<typeof calculateStats>;
  }) => {
    const yAxisTicks = Array.from({ length: maxY / 5 + 1 }, (_, i) => i * 5);

    const [activeTooltip, setActiveTooltip] = useState<{
      index: number;
      coordinate: { x: number; y: number };
      binRange: string;
      value: number;
    } | null>(null);

    // Responsive chart width with useState and useEffect
    const [chartWidth, setChartWidth] = useState(400);
    const [screenWidth, setScreenWidth] = useState(400);
    const chartHeight = 310;

    useEffect(() => {
      const handleResize = () => {
        const currentWidth = window.innerWidth;
        setScreenWidth(currentWidth);

        // More aggressive width reduction for small screens
        let width = 400;
        if (currentWidth < 480) {
          width = Math.max(280, currentWidth - 60); // Minimum 280px, more padding
        } else if (currentWidth < 768) {
          width = Math.max(350, currentWidth - 80);
        } else {
          width = 400;
        }
        setChartWidth(width);
      };

      // Set initial width
      handleResize();

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    const leftMargin = screenWidth < 480 ? 45 : 60;
    const rightMargin = 20;
    const chartArea = chartWidth - leftMargin - rightMargin;
    const getMeanX = () => {
      if (pitcherName === t('scenes.S12.S12_D0_F60_C9.pitchers.steve')) {
        return leftMargin + chartArea * 0.38;
      } else {
        return leftMargin + chartArea * 0.39;
      }
    };

    const getMedianX = () => {
      if (pitcherName === t('scenes.S12.S12_D0_F60_C9.pitchers.steve')) {
        return leftMargin + chartArea * 0.38;
      } else {
        return leftMargin + chartArea * 0.3;
      }
    };

    const meanX = getMeanX();
    const medianX = getMedianX();

    // Ensure labels don't overflow - more conservative approach for small screens
    const getLabelX = (lineX: number, isMedian = false) => {
      const labelWidth = screenWidth < 480 ? 70 : 90; // Shorter labels on mobile
      const maxX = chartWidth - labelWidth - 5;
      const minX = 5;

      // For very small screens, position labels more strategically
      if (screenWidth < 360) {
        // On very small screens, position mean and median labels to not overlap
        if (isMedian) {
          return Math.max(minX, Math.min(lineX - 40, maxX));
        } else {
          return Math.max(minX, Math.min(lineX + 10, maxX));
        }
      }

      return Math.min(Math.max(lineX + 5, minX), maxX);
    };

    // Custom Bar component for interactive bars
    const CustomBar = (props: any) => {
      const { x, y, width, height, value, payload } = props;
      const binRange = payload.binRange;
      const index = payload.index;

      const handleInteraction = () => {
        const chartElement = document.querySelector('.recharts-wrapper');
        if (!chartElement) return;

        const chartBounds = chartElement.getBoundingClientRect();
        const tooltipWidth = 150;

        const tooltipX = Math.min(Math.max(x + width / 2 + 30, 0), chartBounds.width - tooltipWidth);

        setActiveTooltip({
          index,
          coordinate: {
            x: tooltipX,
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
            aria-label={`${value} ${t('scenes.S12.S12_D0_F60_C9.accessibility.chart.pitches')} ${t(
              'scenes.S12.S12_D0_F60_C9.accessibility.chart.in_range',
            )} ${binRange} ${t('scenes.S12.S12_D0_F60_C9.accessibility.chart.mph')}`}
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
        <h3 className="text-xl font-bold text-center" style={{ color: fill }}>
          {pitcherName}
        </h3>
        <div
          role="figure"
          aria-label={`${t('scenes.S12.S12_D0_F60_C9.accessibility.chart.histogram_prefix')} ${pitcherName}`}
          className="flex justify-center"
          style={{ overflow: 'visible' }}
        >
          <BarChart
            accessibilityLayer
            width={chartWidth}
            height={chartHeight}
            data={data}
            margin={{
              top: 10,
              right: screenWidth < 480 ? 10 : 20,
              left: screenWidth < 480 ? 25 : 30,
              bottom: 60,
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
                fontSize: Math.min(screenWidth < 480 ? 12 : 16, chartWidth / 30),
              }}
              angle={-45}
              textAnchor="end"
              interval={chartWidth < 350 ? 2 : chartWidth < 400 ? 1 : 0}
              label={{
                value: t('scenes.S12.S12_D0_F60_C9.chart.speed_mph'),
                position: 'insideBottom',
                offset: -30,
                style: {
                  fill: '#666666',
                  fontSize: Math.min(screenWidth < 480 ? 12 : 16, chartWidth / 25),
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
                fontSize: Math.min(screenWidth < 480 ? 12 : 16, chartWidth / 30),
              }}
              label={{
                value: t('scenes.S12.S12_D0_F60_C9.chart.number_of_pitches'),
                angle: -90,
                position: 'insideLeft',
                offset: 0,
                style: {
                  fill: '#666666',
                  fontSize: Math.min(screenWidth < 480 ? 12 : 16, chartWidth / 25),
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
                        name: pitcherName,
                        value: activeTooltip.value,
                        payload: {
                          binRange: activeTooltip.binRange,
                        },
                      },
                    ]
                  : []
              }
              cursor={false}
              formatter={() => [`${activeTooltip?.value} ${t('scenes.S12.S12_D0_F60_C9.chart.tooltip.pitches')}`]}
              labelFormatter={() =>
                `${t('scenes.S12.S12_D0_F60_C9.chart.tooltip.range_prefix')} ${activeTooltip?.binRange} ${t(
                  'scenes.S12.S12_D0_F60_C9.chart.tooltip.mph_suffix',
                )}`
              }
            />
            <Bar dataKey="value" shape={CustomBar} isAnimationActive={false} />

            {/* Reference Lines for Mean and Median - Hide labels on very small screens */}
            <svg>
              {/* Mean reference line */}
              <line
                x1={meanX}
                y1={10}
                x2={meanX}
                y2={221}
                stroke="#008000"
                strokeWidth={2}
                strokeDasharray="5,5"
              />
              {screenWidth >= 320 && (
                <text
                  x={getLabelX(meanX)}
                  y={20}
                  fill="#008000"
                  fontSize={Math.min(screenWidth < 480 ? 11 : 14, chartWidth / 30)}
                  fontWeight="bold"
                >
                  {screenWidth < 360 ? `M: ${stats.mean}` : `Mean: ${stats.mean}`}
                </text>
              )}

              {/* Median reference line */}
              <line
                x1={medianX}
                y1={10}
                x2={medianX}
                y2={221}
                stroke="#9932CC"
                strokeWidth={2}
                strokeDasharray="3,3"
              />
              {screenWidth >= 320 && (
                <text
                  x={getLabelX(medianX, true)}
                  y={35}
                  fill="#9932CC"
                  fontSize={Math.min(screenWidth < 480 ? 11 : 14, chartWidth / 30)}
                  fontWeight="bold"
                >
                  {screenWidth < 360 ? `Med: ${stats.median}` : `Median: ${stats.median}`}
                </text>
              )}
            </svg>
          </BarChart>
          <div className="sr-only">
            {data.map((item, index) => (
              <p key={index}>{`${item.value} pitches had speed between ${item.binRange} mph`}</p>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* Pitcher statistics cards */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <StatsCard pitcherName={t('scenes.S12.S12_D0_F60_C9.pitchers.steve')} stats={steveStats} color="#3b82f6" />
        <StatsCard pitcherName={t('scenes.S12.S12_D0_F60_C9.pitchers.sam')} stats={samStats} color="#ef4444" />
      </div>{' '}
      {/* Legend for Mean and Median */}
      <div className="flex justify-center mt-4 mb-3">
        <div className="flex items-center mr-8">
          <div className="w-8 h-1 mr-2" style={{ borderTop: '2px dashed #008000' }}></div>
          <span className="text-sm text-green-600 font-semibold">
            {t('scenes.S12.S12_D0_F60_C9.chart.mean_speed')}
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-1 mr-2" style={{ borderTop: '2px dotted #9932CC' }}></div>
          <span className="text-sm text-purple-600 font-semibold">
            {t('scenes.S12.S12_D0_F60_C9.chart.median_speed')}
          </span>
        </div>
      </div>
      {/* Histogram charts */}
      <div className="grid lg:grid-cols-2 grid-cols-1 mb-3 gap-4">
        <HistogramChart
          data={steveData}
          fill="#3b82f6"
          pitcherName={t('scenes.S12.S12_D0_F60_C9.pitchers.steve')}
          maxY={30}
          stats={steveStats}
        />
        <HistogramChart
          data={samData}
          fill="#ef4444"
          pitcherName={t('scenes.S12.S12_D0_F60_C9.pitchers.sam')}
          maxY={30}
          stats={samStats}
        />
      </div>
    </div>
  );
};

export default PitchingComparison;
