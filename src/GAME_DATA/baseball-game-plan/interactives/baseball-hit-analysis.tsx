import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import { Toggle } from './toggle-button';
import { HitsAnalysisInteraction } from './interface';
import { ToggleHits } from './toggle-hits-button';

interface DataPoint {
  x: number;
  y: number;
  count: number;
  isHighlighted?: boolean;
  game?: number;
  gameNumber?: number;
}

interface HitsAnalysisProps {
  interaction: HitsAnalysisInteraction;
  onInteractionChange?: (state: { isCorrect?: boolean; isEmpty?: boolean; value?: string }) => void;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const useContainerWidth = () => {
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.getBoundingClientRect().width);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return { width, containerRef };
};

const ScatterPlot: React.FC<HitsAnalysisProps> = ({ interaction, onInteractionChange, onInteraction }) => {
  const { t } = useTranslations();
  const { width: containerWidth, containerRef } = useContainerWidth();
  const [game24Hits, setGame24Hits] = useState<number | null>(null);
  const [game25Hits, setGame25Hits] = useState<number | null>(null);
  const [showNewGames, setShowNewGames] = useState(true);
  const [median, setMedian] = useState(0);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  const aspectRatio = 0.42;
  const width = containerWidth || 1350;
  const height = width * aspectRatio;
  const padding = width * 0.08;
  const xMin = 6;
  const xMax = 17;

  const baseData: DataPoint[] = [
    { x: 13, y: 0, count: 1, gameNumber: 1 },
    { x: 10, y: 0, count: 1, gameNumber: 2 },
    { x: 14, y: 0, count: 1, gameNumber: 3 },
    { x: 8, y: 0, count: 1, gameNumber: 4 },
    { x: 12, y: 0, count: 1, gameNumber: 5 },
    { x: 9, y: 0, count: 1, gameNumber: 6 },
    { x: 15, y: 0, count: 1, gameNumber: 7 },
    { x: 11, y: 0, count: 1, gameNumber: 8 },
    { x: 13, y: 1, count: 1, gameNumber: 9 },
    { x: 7, y: 0, count: 1, gameNumber: 10 },
    { x: 16, y: 0, count: 1, gameNumber: 11 },
    { x: 10, y: 1, count: 1, gameNumber: 12 },
    { x: 14, y: 1, count: 1, gameNumber: 13 },
    { x: 9, y: 1, count: 1, gameNumber: 14 },
    { x: 12, y: 1, count: 1, gameNumber: 15 },
    { x: 8, y: 1, count: 1, gameNumber: 16 },
    { x: 15, y: 1, count: 1, gameNumber: 17 },
    { x: 11, y: 1, count: 1, gameNumber: 18 },
    { x: 13, y: 2, count: 1, gameNumber: 19 },
    { x: 10, y: 2, count: 1, gameNumber: 20 },
    { x: 14, y: 2, count: 1, gameNumber: 21 },
    { x: 9, y: 2, count: 1, gameNumber: 22 },
    { x: 16, y: 1, count: 1, gameNumber: 23 },
  ];

  const hasSelectedGames = game24Hits !== null || game25Hits !== null;

  const xScale = (x: number): number => ((x - xMin) / (xMax - xMin)) * (width - 2 * padding) + padding;

  const yScale = (y: number): number => {
    const multiplier = 0.18;
    return height - ((y + 1) * multiplier * (height - 2 * padding) + padding);
  };

  const getTooltipPosition = (point: DataPoint) => {
    const x = xScale(point.x);
    const y = yScale(point.y);

    return {
      left: `${(x / width) * 100}%`,
      top: `${(y / height) * 100}%`,
    };
  };
  const getCombinedData = () => {
    const countMap = new Map();
    const combinedData = [...baseData];

    baseData.forEach((point) => {
      const key = point.x;
      if (!countMap.has(key)) {
        countMap.set(key, 0);
      }
      countMap.set(key, countMap.get(key) + 1);
    });

    if (showNewGames) {
      if (game24Hits !== null) {
        const key = game24Hits;
        if (!countMap.has(key)) {
          countMap.set(key, 0);
        }
        combinedData.push({
          x: game24Hits,
          y: countMap.get(key),
          count: countMap.get(key) + 1,
          isHighlighted: true,
          game: 24,
        });
        countMap.set(key, countMap.get(key) + 1);
      }

      if (game25Hits !== null) {
        const key = game25Hits;
        if (!countMap.has(key)) {
          countMap.set(key, 0);
        }
        combinedData.push({
          x: game25Hits,
          y: countMap.get(key),
          count: countMap.get(key) + 1,
          isHighlighted: true,
          game: 25,
        });
        countMap.set(key, countMap.get(key) + 1);
      }
    }

    return combinedData.map((point, index) => ({
      ...point,
      gameNumber: index + 1,
    }));
  };

  const getPerformanceText = (hits: number): string => {
    if (hits > median) return t('scenes.S6.S6_D0_F18_C9.performance.above');
    if (hits == median) return t('scenes.S6.S6_D0_F18_C9.performance.exact');
    if (hits < median) return t('scenes.S6.S6_D0_F18_C9.performance.below');
    return t('scenes.S6.S6_D0_F18_C9.performance.poor');
  };

  useEffect(() => {
    const baseGameHits = interaction.data.map((game) => game.hits);
    const allGameHits = [...baseGameHits];
    if (showNewGames) {
      if (game24Hits !== null) {
        allGameHits.push(game24Hits);
      }
      if (game25Hits !== null) {
        allGameHits.push(game25Hits);
      }
    }
    const sorted = [...allGameHits].sort((a, b) => a - b);
    let medianValue;
    if (sorted.length === 0) {
      medianValue = 0;
    } else if (sorted.length % 2 === 0) {
      const lowerMiddle = sorted[sorted.length / 2 - 1];
      const upperMiddle = sorted[sorted.length / 2];
      medianValue = (lowerMiddle + upperMiddle) / 2;
    } else {
      const middleIndex = Math.floor(sorted.length / 2);
      medianValue = sorted[middleIndex];
    }

    setMedian(medianValue);
  }, [game24Hits, game25Hits, showNewGames]);

  useEffect(() => {
    if (game24Hits === 10 && game25Hits === 14) {
      onInteraction({
        'keep-the-median-same': true,
      });
    }
    if (game24Hits === 8 && game25Hits === 10) {
      onInteraction({
        'lower-the-median': true,
      });
    }
  }, [game24Hits, game25Hits, onInteraction]);

  useEffect(() => {
    if (onInteractionChange) {
      onInteractionChange({
        value: JSON.stringify({
          game24: game24Hits,
          game25: game25Hits,
          median: median,
        }),
      });
    }
  }, [game24Hits, game25Hits, median, onInteractionChange]);
  return (
    <div
      className="w-full flex justify-center"
      ref={containerRef}
      role="region"
      aria-label={t(interaction.ariaLabel)}
    >
      <div className="space-y-4 w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Game 24 Controls */}
          <div className="bg-white rounded-lg p-2 border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[#006BE0]">{t('scenes.S6.S6_D0_F18_C9.game_24')}</span>
              <span className={`text-gray-600 ${game24Hits ? 'font-bold' : ''}`}>
                {game24Hits
                  ? `${game24Hits} ${t('scenes.S6.S6_D0_F18_C9.hits')}`
                  : t('scenes.S6.S6_D0_F18_C9.not_selected')}
              </span>
            </div>
            <div className="grid grid-cols-6 gap-2 sm:flex sm:gap-2">
              {interaction.gameOptions.map((hits) => (
                <ToggleHits
                  key={hits}
                  hits={hits}
                  pressed={game24Hits === hits}
                  onPressedChange={() => setGame24Hits(game24Hits === hits ? null : hits)}
                  className={`w-full sm:flex-1 h-8 rounded border ${
                    game24Hits === hits
                      ? 'bg-[#006BE0] text-white border-transparent'
                      : 'bg-white hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  {hits}
                </ToggleHits>
              ))}
            </div>
          </div>

          {/* Game 25 Controls */}
          <div className="bg-white rounded-lg p-2 border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[#A22DDC]">{t('scenes.S6.S6_D0_F18_C9.game_25')}</span>
              <span className={`text-gray-600 ${game25Hits ? 'font-bold' : ''}`}>
                {game25Hits
                  ? `${game25Hits} ${t('scenes.S6.S6_D0_F18_C9.hits')}`
                  : t('scenes.S6.S6_D0_F18_C9.not_selected')}
              </span>
            </div>
            <div className="grid grid-cols-6 gap-2 sm:flex sm:gap-2">
              {interaction.gameOptions.map((hits) => (
                <ToggleHits
                  key={hits}
                  hits={hits}
                  pressed={game25Hits === hits}
                  onPressedChange={() => setGame25Hits(game25Hits === hits ? null : hits)}
                  className={`w-full sm:flex-1 h-8 rounded border ${
                    game25Hits === hits
                      ? 'bg-[#A22DDC] text-white border-transparent'
                      : 'bg-white hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  {hits}
                </ToggleHits>
              ))}
            </div>
          </div>

          {/* Show/Hide Games Toggle */}
          <div className="bg-gray-50 rounded-lg p-2 border border-gray-200 md:col-span-2">
            <Toggle
              pressed={showNewGames}
              onPressedChange={(pressed) => {
                if (hasSelectedGames) {
                  setShowNewGames(pressed);
                }
              }}
              disabled={!hasSelectedGames}
              className="w-full flex items-center justify-center"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    showNewGames && hasSelectedGames ? 'bg-gray-600' : 'bg-gray-400'
                  }`}
                />
                {t(
                  showNewGames ? 'scenes.S6.S6_D0_F18_C9.hide_new_games' : 'scenes.S6.S6_D0_F18_C9.show_new_games',
                )}
              </div>
            </Toggle>
          </div>
          <div className="bg-white rounded-lg p-2 border border-gray-200 md:col-span-2 flex justify-center items-center">
            <div className="text-center">
              <span className="text-gray-600 block">{t('scenes.S6.S6_D0_F18_C9.median')}</span>
              <span className="text-gray-600">{median}</span>
            </div>
          </div>
        </div>

        {/* Scatter Plot */}
        <div className="relative">
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            className="bg-white rounded-lg"
            aria-label="Scatter plot showing distribution of hits"
          >
            {/* Grid lines */}
            {Array.from({ length: xMax - xMin + 1 }, (_, i) => i + xMin).map((tick) => (
              <line
                key={tick}
                x1={xScale(tick)}
                y1={padding}
                x2={xScale(tick)}
                y2={height - padding}
                stroke="#f0f0f0"
                strokeWidth="1"
              />
            ))}

            {/* Median line */}
            <line
              x1={xScale(median)}
              y1={padding}
              x2={xScale(median)}
              y2={height - padding}
              stroke="#4B5563"
              strokeWidth="1"
              strokeDasharray="4"
            />

            {/* X-axis line */}
            <line
              x1={padding}
              y1={height - padding}
              x2={width - padding}
              y2={height - padding}
              stroke="#4B5563"
              strokeWidth="1"
            />

            {/* X-axis labels */}
            {Array.from({ length: xMax - xMin + 1 }, (_, i) => i + xMin).map((tick) => (
              <text
                key={tick}
                x={xScale(tick)}
                y={height - padding + 20}
                textAnchor="middle"
                className="text-m text-gray-500"
              >
                {tick}
              </text>
            ))}

            {/* Data points */}
            {getCombinedData().map((point, index) => {
              const isSelected = selectedGame === index;
              return (
                <g key={`${point.x}-${point.y}-${index}`}>
                  <circle
                    cx={xScale(point.x)}
                    cy={yScale(point.y)}
                    r={width * 0.008}
                    fill={
                      point.isHighlighted
                        ? point.game === 24
                          ? interaction.colors.game24
                          : interaction.colors.game25
                        : interaction.colors.baseGames
                    }
                    opacity={selectedGame !== null && !isSelected ? 0.3 : 1}
                    stroke={point.isHighlighted ? 'white' : 'none'}
                    strokeWidth={2}
                    tabIndex={0}
                    aria-label={`Data point at x: ${point.x}, y: ${point.y}.`}
                    role="img"
                    onFocus={() => {
                      setActivePoint(index);
                      setSelectedGame(index);
                    }}
                    onBlur={() => {
                      setActivePoint(null);
                      setSelectedGame(null);
                    }}
                    onMouseEnter={() => {
                      setActivePoint(index);
                      setSelectedGame(index);
                    }}
                    onMouseLeave={() => {
                      setActivePoint(null);
                      setSelectedGame(null);
                    }}
                    className="focus:ring-2 focus:ring-black-500 focus:ring-offset-2 cursor-pointer"
                  />
                </g>
              );
            })}

            {/* X-axis label */}
            <text
              x={width / 1.9}
              y={height - padding + 50}
              textAnchor="middle"
              className="text-m md:text-base text-gray-400"
            >
              {t('scenes.S6.S6_D0_F18_C9.number_of_hits')}
            </text>
          </svg>

          {/* Tooltip */}
          {activePoint !== null && (
            <div
              className="absolute bg-white p-3 border border-gray-200 rounded-lg shadow-sm"
              style={{
                ...getTooltipPosition(getCombinedData()[activePoint]),
                transform: 'translate(-50%, 20px)',
                zIndex: 10,
                maxWidth: '200px',
                minWidth: '150px',
              }}
            >
              <p className="text-xl mb-2">
                {`${t('scenes.S6.S6_D0_F18_C9.game')} ${
                  getCombinedData()[activePoint].game || getCombinedData()[activePoint].gameNumber
                }: ${getCombinedData()[activePoint].x} ${t('scenes.S6.S6_D0_F18_C9.hits')}`}
              </p>
              <p className="text-m text-gray-600 mb-1">{getPerformanceText(getCombinedData()[activePoint].x)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScatterPlot;
