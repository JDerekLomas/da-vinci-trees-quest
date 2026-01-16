import { useCallback, useState } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import { GraphConfig } from './interface';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts';
import parse from 'html-react-parser';
import useScreenSize from '../../../hooks/useScreenSize';
import React from 'react';

interface LineGraphProps {
  graphConfig?: GraphConfig;
  chartData: Record<string, number | null>[];
}

interface FocusedPointPayload {
  color: string;
  value: number;
  yLabel: string;
  dataKey: string;
  shape?: string;
}

interface FocusedPoint {
  x: number;
  payload: FocusedPointPayload[];
  cx: number;
  cy: number;
}

const shapeTypes = ['circle', 'square', 'triangle', 'diamond', 'hexagon', 'cross'];

const renderCustomShape = (cx: number, cy: number, size: number, fill: string, stroke: string, shape: string) => {
  const halfSize = size / 2;
  const strokeWidth = 1;

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
            strokeWidth={strokeWidth + 1}
          />
          <line
            x1={cx}
            y1={cy - crossSize}
            x2={cx}
            y2={cy + crossSize}
            stroke={stroke}
            strokeWidth={strokeWidth + 1}
          />
        </g>
      );
    }
    case 'hexagon': {
      // Calculate points for a hexagon
      const points = [];
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const x = cx + halfSize * Math.cos(angle);
        const y = cy + halfSize * Math.sin(angle);
        points.push(`${x},${y}`);
      }
      return <polygon points={points.join(' ')} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    }
    case 'circle':
    default:
      return <circle cx={cx} cy={cy} r={halfSize} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
  }
};

const LineGraph: React.FC<LineGraphProps> = ({ graphConfig, chartData }) => {
  const { t } = useTranslations(),
    [showTooltip, setShowTooltip] = useState(false),
    [focusedPoint, setFocusedPoint] = useState<FocusedPoint | null>(null),
    { isZoomed200, isVerticalScreen } = useScreenSize();

  const getXTooltip = (key: string, label: string, valueAccessor?: string) => {
    const tooltip = t(key);

    if (valueAccessor) return tooltip.replace(`{{${valueAccessor}}}`, label);

    return `${tooltip} ${label}`;
  };

  const getAriaLabel = useCallback(
    (yLabel?: string, x?: number, y?: number) => {
      if (x === undefined || y === undefined || !graphConfig) return '';

      return `Y: ${parse(t(yLabel || ''))} ${y?.toFixed(2)} at X: ${t(graphConfig.x.label)} ${x}`;
    },
    [graphConfig, t],
  );

  React.useEffect(() => {
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
    (props: any) => {
      if (!graphConfig) return null;

      const { cx, cy, payload, dataKey, fill } = props,
        idx = graphConfig.lines.findIndex((line) => line.dataKey === dataKey),
        yLabel = graphConfig.lines[idx].tooltipLabel,
        stroke = graphConfig.lines[idx].stroke,
        name = graphConfig.lines[idx].name;
      const showSolidDot = graphConfig.lines[idx].isLineEndPoint(payload['x']);
      const lineKeys = graphConfig.lines.map((line) => line.dataKey);
      const hasDistinctValues = lineKeys.every((key, index, arr) => {
        if (index === 0) return true;
        return payload[key] !== payload[arr[index - 1]];
      });

      const showHollowDot =
        graphConfig.lines[idx].isLineStartPoint(payload['x']) &&
        (hasDistinctValues ||
          payload['x'] === 0 ||
          graphConfig.lines[idx].dataKey.includes('oldPrice') ||
          graphConfig.lines[idx].dataKey.includes('originalPrice'));

      const shape = shapeTypes[idx % shapeTypes.length];

      if (!cy) return null;

      return (
        <g
          tabIndex={0}
          aria-label={getAriaLabel(name, payload['x'], payload[dataKey])}
          role="application"
          onClick={(e) => {
            e.stopPropagation();
            setShowTooltip(true);
            setFocusedPoint({
              cx,
              cy,
              x: payload['x'],
              payload: [
                {
                  color: stroke,
                  value: payload[dataKey],
                  yLabel,
                  dataKey,
                  shape,
                },
              ],
            });
          }}
          onFocus={() => {
            setShowTooltip(true);
            setFocusedPoint({
              cx,
              cy,
              x: payload['x'],
              payload: [
                {
                  color: stroke,
                  dataKey: dataKey,
                  value: payload[dataKey],
                  yLabel,
                  shape,
                },
              ],
            });
          }}
          onBlur={() => {
            setShowTooltip(false);
            setFocusedPoint(null);
          }}
        >
          {showSolidDot || showHollowDot ? (
            renderCustomShape(
              cx,
              cy,
              showSolidDot || showHollowDot ? 8 : 1,
              showSolidDot ? stroke : showHollowDot ? fill : stroke,
              stroke,
              shape,
            )
          ) : (
            <circle cx={cx} cy={cy} r={0.5} fill={stroke} stroke={stroke} strokeWidth={1} />
          )}
        </g>
      );
    },
    [graphConfig, getAriaLabel],
  );

  const CustomLegend = useCallback(
    (props: any) => {
      if (!graphConfig?.showLegend) return null;
      const { payload } = props;

      return (
        <ul className="flex items-center justify-center flex-wrap gap-4" style={{ fontSize: '16px' }}>
          {payload.map((entry: any, index: number) => {
            const shape = shapeTypes[index % shapeTypes.length];
            return (
              <li key={`legend-${index}`} className="flex items-center">
                <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginRight: '4px' }}>
                  <line x1="0" y1="8" x2="8" y2="8" stroke={entry.color} strokeWidth="2" />
                  <line x1="16" y1="8" x2="24" y2="8" stroke={entry.color} strokeWidth="2" />
                  {renderCustomShape(12, 8, 6, entry.color, entry.color, shape)}
                </svg>
                <span>{entry.value}</span>
              </li>
            );
          })}
        </ul>
      );
    },
    [graphConfig?.showLegend],
  );

  if (!graphConfig) return null;

  return (
    <div className="h-[256px] w-full" role="region" aria-label={t(graphConfig?.ariaLabel || '')} tabIndex={0}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            bottom: 30,
            left: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d4" />
          <XAxis
            dataKey="x"
            label={{
              value: `${t(graphConfig?.x.label)}`,
              position: 'bottom',
              offset: 12,
              style: {
                fill: '#262626',
                fontSize: 12,
              },
            }}
            tickCount={11}
            domain={[graphConfig?.x.min, graphConfig?.x.max]}
            type="number"
            allowDecimals={false}
            tick={{
              fontSize: 12,
              fill: '#262626',
            }}
          />
          <YAxis
            label={{
              value: `${t(graphConfig?.y.label)}`,
              angle: -90,
              position: 'insideLeft',
              offset: -15,
              style: {
                fill: '#262626',
                fontSize: 12,
              },
            }}
            allowDecimals={false}
            tick={{ fontSize: 12, fill: '#262626' }}
          />

          <Tooltip
            position={{ x: focusedPoint?.cx, y: focusedPoint?.cy }}
            content={({ active, payload, label }) => {
              if (active || (showTooltip && focusedPoint)) {
                const xValue = focusedPoint ? focusedPoint.x : label,
                  tooltipPayload = focusedPoint ? focusedPoint.payload : payload;

                // Get the line configurations for all items in the tooltip
                const tooltipItems = tooltipPayload?.map((item) => {
                  const lineIndex = graphConfig.lines.findIndex((line) => line.dataKey === item.dataKey);
                  return {
                    item,
                    lineIndex,
                    isStartPoint: graphConfig?.lines[lineIndex]?.isLineStartPoint(xValue),
                  };
                });

                // If all items are start points, don't show the tooltip
                if (tooltipItems?.every(({ isStartPoint }) => isStartPoint)) {
                  return null;
                }

                return (
                  <div
                    className="bg-white max-w-40 xl:max-w-48 p-3 border rounded shadow-sm"
                    role="tooltip"
                    aria-live="polite"
                  >
                    <p className="text-m font-medium mb-1">
                      {getXTooltip(graphConfig?.x?.tooltipLabel, xValue, graphConfig?.x?.tooltipLabelValue)}
                    </p>
                    {tooltipItems?.map(({ item, lineIndex, isStartPoint }, index) => {
                      // Skip rendering tooltip items for start points
                      if (isStartPoint) return null;

                      const yLabel = focusedPoint
                        ? t((item as FocusedPointPayload).yLabel)
                        : t(graphConfig.lines[lineIndex].tooltipLabel);

                      return (
                        <p
                          className="text-m mb-1"
                          style={{
                            color: item.color,
                          }}
                          key={`tooltip-${index}`}
                        >
                          {parse(yLabel)}
                          {Number(item.value).toFixed(2)}
                        </p>
                      );
                    })}
                  </div>
                );
              }
              return null;
            }}
            wrapperStyle={
              focusedPoint
                ? {
                    visibility: showTooltip ? 'visible' : undefined,
                    position: showTooltip ? 'absolute' : 'unset',
                    transform: `translate(${(focusedPoint.cx ?? 0) - 120}px, ${(focusedPoint.cy ?? 0) - 100}px)`,
                  }
                : {}
            }
          />
          {graphConfig?.showLegend && (
            <Legend
              verticalAlign={isZoomed200 || isVerticalScreen ? 'bottom' : 'top'}
              height={isZoomed200 || isVerticalScreen ? 52 : 36}
              content={<CustomLegend />}
              wrapperStyle={{
                fontSize: '16px',
                marginBottom: `${isZoomed200 || isVerticalScreen ? '-36px' : ''}`,
              }}
            />
          )}
          {graphConfig?.referenceAreas?.map((referenceArea, index) => (
            <ReferenceArea
              key={`referenceArea-${index}`}
              x1={referenceArea.start}
              x2={referenceArea.end}
              fill={referenceArea.fillColor}
              fillOpacity={referenceArea.fillOpacity}
            />
          ))}
          {graphConfig?.referenceLines?.map((referenceLine, index) => {
            const lineLabel = t(referenceLine?.label || ''),
              shouldMoveHorizontal = lineLabel.length >= 12;

            return (
              <ReferenceLine
                key={`referenceLine-${index}`}
                x={referenceLine.value}
                stroke={referenceLine.stroke}
                strokeDasharray="3 3"
                label={{
                  value: `${lineLabel}`,
                  position: 'bottom',
                  fontSize: 12,
                  fill: '#262626',
                  dy: 20,
                  dx: (isZoomed200 || isVerticalScreen) && shouldMoveHorizontal ? (index === 0 ? -8 : 8) : 0,
                }}
              />
            );
          })}
          {graphConfig?.lines.map((line, index) => (
            <Line
              tabIndex={0}
              key={`line-${index}`}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              strokeWidth={2}
              dot={<CustomDot isActive={false} />}
              activeDot={<CustomDot isActive={true} accessKey={line.dataKey} yLabel={line.tooltipLabel} />}
              name={t(line.name)}
              role="application"
              aria-label={t(line.name)}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
