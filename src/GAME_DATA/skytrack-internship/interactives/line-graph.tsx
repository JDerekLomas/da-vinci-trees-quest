import React, { useCallback, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DotProps, GraphConfig, LegendPayloadItem } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import parse from 'html-react-parser';
import useScreenSize from '../../../hooks/useScreenSize';

interface LineGraphProps {
  graphConfig?: GraphConfig;
  chartData: Record<string, number>[];
}

interface FocusedPointPayload {
  color: string;
  value: number;
  yLabel: string;
}

interface FocusedPoint {
  x: number;
  payload: FocusedPointPayload[];
  cx: number;
  cy: number;
}

const shapeTypes = ['circle', 'square', 'triangle', 'diamond', 'cross'];

const LineGraph: React.FC<LineGraphProps> = ({ chartData, graphConfig }) => {
  const { t } = useTranslations();
  const [showTooltip, setShowTooltip] = useState(false);
  const [focusedPoint, setFocusedPoint] = useState<FocusedPoint | null>(null);
  const { isZoomed200, isVerticalScreen } = useScreenSize();

  const getAriaLabel = useCallback(
    (yLabel?: string, x?: number, y?: number) => {
      if (x === undefined || y === undefined || !graphConfig) return '';

      return `Y: ${parse(t(yLabel || ''))} ${y.toFixed(2)} at X: ${t(graphConfig.x.label)} ${x}`;
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

  const renderCustomShape = (
    cx: number,
    cy: number,
    size: number,
    fill: string,
    stroke: string,
    shape: string,
  ) => {
    const halfSize = size / 2;
    const strokeWidth = 1.5;

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
              strokeWidth={strokeWidth}
            />
            <line
              x1={cx}
              y1={cy - crossSize}
              x2={cx}
              y2={cy + crossSize}
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
          </g>
        );
      }
      case 'circle':
      default:
        return <circle cx={cx} cy={cy} r={halfSize} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    }
  };

  const CustomDot = useCallback(
    (props: DotProps) => {
      if (!graphConfig) return null;
  
      // Safely destructure props with defaults
      const { cx = 0, cy = 0, isActive = false, payload = {}, dataKey = '' } = props;
  
      // Safety check
      if (!dataKey || typeof cx !== 'number' || typeof cy !== 'number') return null;
  
      const idx = graphConfig.lines.findIndex((line) => line.dataKey === dataKey);
      if (idx === -1) return null;
  
      const yLabel = graphConfig.lines[idx].tooltipLabel;
      const stroke = graphConfig.lines[idx].stroke;
      const name = graphConfig.lines[idx].name;
  
      const shape = shapeTypes[idx % shapeTypes.length];
      const size = isActive ? 6 : 5;
      const dotFill = 'white';
  
      // Type assertion for payload access
      const xValue = payload && 'x' in payload ? Number(payload['x']) : 0;
      const dataValue = payload && dataKey in payload ? Number(payload[dataKey]) : 0;
  
      return (
        <g
          tabIndex={0}
          aria-label={getAriaLabel(name, xValue, dataValue)}
          role="application"
          onClick={(e) => {
            e.stopPropagation();
            setShowTooltip(true);
            setFocusedPoint({
              cx,
              cy,
              x: xValue,
              payload: [
                {
                  color: stroke,
                  value: dataValue,
                  yLabel,
                },
              ],
            });
          }}
          onFocus={() => {
            setShowTooltip(true);
            setFocusedPoint({
              cx,
              cy,
              x: xValue,
              payload: [
                {
                  color: stroke,
                  value: dataValue,
                  yLabel,
                },
              ],
            });
          }}
          onBlur={() => {
            setShowTooltip(false);
            setFocusedPoint(null);
          }}
        >
          {renderCustomShape(cx, cy, size, dotFill, stroke, shape)}
        </g>
      );
    },
    [graphConfig, getAriaLabel],
  );

  const CustomLegend = (props: { payload?: LegendPayloadItem[] }) => {
    const { payload = [] } = props;

    return (
      <ul className="flex justify-center flex-wrap gap-4 pt-2 pb-6" style={{ width: '100%' }}>
        {payload.map((entry, index) => {
          const shape = shapeTypes[index % shapeTypes.length];
          return (
            <li key={`legend-${index}`} className="flex items-center">
              <svg width="32" height="16" viewBox="0 0 32 16">
                <line x1="2" y1="8" x2="30" y2="8" stroke={entry.color} strokeWidth="2" />
                {renderCustomShape(16, 8, 6, 'white', entry.color, shape)}
              </svg>
              <span className="ml-2" style={{ fontSize: '16px' }}>
                {entry.value}
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

  if (!graphConfig) return null;

  const defaultYAxisTicks = [20000, 40000, 60000, 80000];
  const yAxisTicks = graphConfig.y.ticks || defaultYAxisTicks;

  const xAxisTicks = Array.from(
    { length: Math.floor((graphConfig.x.max - graphConfig.x.min) / 2) + 1 },
    (_, i) => i * 2,
  );

  return (
    <div
      className="w-full"
      style={{ height: graphConfig.height || 256 }}
      role="region"
      aria-label={t(graphConfig?.ariaLabel || '')}
      tabIndex={0}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 10, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <Legend
            height={isZoomed200 || isVerticalScreen ? 52 : 36}
            align="center"
            verticalAlign="top"
            iconSize={10}
            content={<CustomLegend />}
          />
          <XAxis
            dataKey="x"
            type="number"
            domain={[graphConfig.x.min, graphConfig.x.max]}
            ticks={xAxisTicks}
            label={{
              style: {
                textAnchor: 'middle',
                fontSize: 16,
              },
              value: t(graphConfig.x.label),
              position: 'bottom',
              offset: 5,
            }}
            tick={{ fontSize: 16 }}
          />
          <YAxis
            domain={[0, 24000]}
            ticks={yAxisTicks}
            label={{
              value: t(graphConfig.y.label),
              angle: -90,
              position: 'insideLeft',
              offset: -14,
              style: {
                textAnchor: 'middle',
                fontSize: 16,
              },
            }}
            tickFormatter={(value) => `${value}`}
            tick={{ fontSize: 16 }}
            axisLine={{ strokeWidth: 1 }}
            tickLine={{ strokeWidth: 1 }}
            scale="linear"
            allowDecimals={false}
          />
          <Tooltip
            position={{ x: focusedPoint?.cx, y: focusedPoint?.cy }}
            content={({ active, payload, label }) => {
              if (active || (showTooltip && focusedPoint)) {
                const xValue = focusedPoint ? focusedPoint.x : label;
                const tooltipPayload = focusedPoint ? focusedPoint.payload : payload;

                return (
                  <div
                    className="bg-white max-w-40 xl:max-w-48 p-3 border rounded shadow-sm"
                    role="tooltip"
                    aria-live="polite"
                  >
                    <p className="text-m font-medium mb-1">{`${t(graphConfig.x.tooltipLabel)} ${xValue}`}</p>
                    {tooltipPayload?.map((item, index) => {
                      const yLabel = focusedPoint
                        ? t((item as FocusedPointPayload).yLabel)
                        : t(graphConfig.lines[index].tooltipLabel);

                      return (
                        <div className="text-m mb-1" style={{ color: item.color }} key={`tooltip-${index}`}>
                          <p>{parse(yLabel)}</p>
                          <p className="font-bold">${Number(item.value).toFixed(2)}</p>
                        </div>
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
                    transform: `translate(${focusedPoint.cx < 150 ? 10 : focusedPoint.cx - 120}px, ${
                      focusedPoint.cy < 120 ? 10 : focusedPoint.cy - 100
                    }px)`,
                    maxWidth: '200px',
                    zIndex: 1000,
                  }
                : {}
            }
          />
          {graphConfig.lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              name={t(line.name)}
              strokeDasharray={line.dataKey === 'goal' ? '5 5' : undefined}
              dot={<CustomDot isActive={false} />}
              activeDot={<CustomDot isActive={true} accessKey={line.dataKey} yLabel={line.tooltipLabel} />}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
