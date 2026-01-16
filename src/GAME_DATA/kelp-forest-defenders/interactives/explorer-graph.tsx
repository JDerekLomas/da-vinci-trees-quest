import React, { useCallback, useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  TooltipProps,
} from 'recharts';
import { GraphConfig } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';

interface FocusedPoint {
  dataKey: string;
  x: number;
  y: number;
  name: string;
  value: number;
  label: number;
  color?: string;
  shape?: string;
}

interface ExplorerGraphProps {
  graphConfig: GraphConfig;
  chartData: Record<string, number | null>[];
  xDomain: [number, number];
  xTicks: number[];
  yLeftDomain?: [number, number];
  yRightDomain?: [number, number];
  showKelp?: boolean;
  showTrendLine: {
    early: boolean;
    late: boolean;
  };
}

const shapeTypes = ['circle', 'square', 'triangle', 'diamond', 'cross'];

const renderCustomShape = (cx: number, cy: number, size: number, fill: string, stroke: string, shape: string) => {
  const halfSize = size / 2;
  const strokeWidth = 2;

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

interface DotProps {
  cx?: number;
  cy?: number;
  r?: number;
  index?: number;
  dataKey?: string;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  name?: string;
  value?: number;
  payload?: Record<string, any>;
}

const getShapeForDataKey = (dataKey: string | undefined, allDataKeys: string[]): string => {
  if (!dataKey) return 'circle';
  const index = allDataKeys.indexOf(dataKey);
  if (index === -1) return 'circle';
  return shapeTypes[index % shapeTypes.length];
};

const ExplorerGraph: React.FC<ExplorerGraphProps> = ({
  graphConfig,
  chartData,
  xDomain,
  xTicks,
  yLeftDomain,
  yRightDomain,
  showKelp,
  showTrendLine,
}) => {
  const { t } = useTranslations();
  const [showTooltip, setShowTooltip] = useState(false);
  const [focusedPoint, setFocusedPoint] = useState<FocusedPoint | null>(null);

  const allDataKeys = [
    ...graphConfig.lines.map((line) => line.dataKey),
    graphConfig.earlyTrendLine?.dataKey,
    graphConfig.lateTrendLine?.dataKey,
  ].filter(Boolean) as string[];

  const CustomDot = useCallback(
    (props: DotProps) => {
      const { cx, cy, dataKey, payload, stroke, name } = props;
      const label = props.payload?.year;

      if (cx == null || cy == null || !payload || !dataKey) return null;

      const shape = getShapeForDataKey(dataKey, allDataKeys);

      return (
        <g
          tabIndex={0}
          role="application"
          aria-label={`${name} ${payload[dataKey]}, ${t(graphConfig.x.label.value)} ${label}`}
          onFocus={() => {
            setShowTooltip(true);
            setFocusedPoint({
              x: cx,
              y: cy,
              dataKey,
              value: payload[dataKey],
              name: name || '',
              label: label,
              color: stroke,
              shape,
            });
          }}
          onBlur={() => {
            setShowTooltip(false);
            setFocusedPoint(null);
          }}
          onClick={(e) => {
            e.stopPropagation();
            setShowTooltip(true);
            setFocusedPoint({
              x: cx,
              y: cy,
              dataKey,
              value: payload[dataKey],
              name: name || '',
              label: label,
              color: stroke,
              shape,
            });
          }}
        >
          {renderCustomShape(cx, cy, 6, 'white', stroke || '#000000', shape)}
        </g>
      );
    },
    [allDataKeys, t, graphConfig.x.label.value],
  );

  const CustomLegend = useCallback(
    (props: { payload?: Array<{ dataKey?: string; value: string; color: string }> }) => {
      const { payload } = props;
      if (!payload || !payload.length) return null;

      return (
        <ul
          className="flex justify-center flex-wrap gap-4 pt-2 pb-6"
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '16px',
          }}
        >
          {payload.map((entry, index) => {
            const shape = getShapeForDataKey(entry.dataKey, allDataKeys);
            return (
              <li key={`legend-${index}`} className="flex items-center">
                <svg width="32" height="16" viewBox="0 0 32 16">
                  <line x1="0" y1="8" x2="32" y2="8" stroke={entry.color} strokeWidth="2" />
                  {renderCustomShape(16, 8, 7, 'white', entry.color, shape)}
                </svg>
                <span className="ml-2">{entry.value}</span>
              </li>
            );
          })}
        </ul>
      );
    },
    [allDataKeys],
  );

  const CustomTooltip = useCallback(
    ({ active, payload, label }: TooltipProps<number, string>) => {
      if (showTooltip && focusedPoint) {
        return (
          <div className="bg-white p-4 border rounded shadow-lg">
            <p className="text-m text-[#333333]">
              {t(graphConfig.x.label.value || '')}: {focusedPoint.label}
            </p>
            <p
              className="text-m"
              style={{
                color: focusedPoint.color,
              }}
            >
              {focusedPoint.name}: {focusedPoint.value} {t(graphConfig.unit || '')}
            </p>
          </div>
        );
      }
      if (active && payload && payload.length) {
        return (
          <div className="bg-white p-4 border rounded shadow-lg">
            <p className="text-m text-[#333333]">
              {t(graphConfig.x.label.value || '')}: {label}
            </p>
            {payload.map((entry, index) => {
              if (entry.value !== null) {
                return (
                  <p
                    key={index}
                    className="text-m"
                    style={{
                      color: entry.color,
                    }}
                  >
                    {entry.name}: {entry.value} {t(graphConfig.unit || '')}
                  </p>
                );
              }
              return null;
            })}
          </div>
        );
      }
      return null;
    },
    [focusedPoint, graphConfig.unit, graphConfig.x.label.value, showTooltip, t],
  );

  return (
    <ResponsiveContainer>
      <ComposedChart data={chartData} margin={graphConfig.margin}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="year"
          domain={xDomain}
          label={{
            value: t(graphConfig.x.label.value),
            dy: graphConfig.x.label.dy,
            fill: graphConfig.x.label.fill,
          }}
          angle={graphConfig.x.label.angle}
          tick={graphConfig.x.tick}
          ticks={xTicks}
        />
        <YAxis
          yAxisId="left"
          domain={yLeftDomain}
          label={{
            value: t(graphConfig.yLeft?.label?.value || ''),
            angle: graphConfig.yLeft?.label?.angle,
            fill: graphConfig.yLeft?.label?.fill,
            dx: graphConfig.yLeft?.label?.dx,
          }}
          tick={graphConfig.yLeft?.tick}
        />
        {showKelp && (
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={yRightDomain}
            label={{
              value: t(graphConfig.yRight?.label.value || ''),
              angle: graphConfig.yRight?.label.angle || 90,
              fill: graphConfig.yRight?.label.fill || '',
              dx: graphConfig.yRight?.label.dx || 0,
            }}
            tick={graphConfig.yRight?.tick || {}}
          />
        )}
        <Tooltip
          position={focusedPoint ? { x: focusedPoint.x, y: focusedPoint.y } : undefined}
          content={<CustomTooltip />}
          wrapperStyle={
            focusedPoint
              ? {
                  visibility: showTooltip ? 'visible' : 'hidden',
                  position: 'absolute',
                  transform: `translate(${
                    focusedPoint.x < 150 ? 10 : focusedPoint.x > 600 ? focusedPoint.x - 300 : focusedPoint.x - 200
                  }px, ${focusedPoint.y < 120 ? 10 : focusedPoint.y - 100}px)`,
                  zIndex: 1000,
                }
              : undefined
          }
        />
        <Legend
          verticalAlign="top"
          align="center"
          content={<CustomLegend />}
          wrapperStyle={{
            paddingBottom: '15px',
            fontSize: '16px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        />
        {graphConfig.lines.map((line) =>
          line.dataKey !== 'kelp' || (line.dataKey === 'kelp' && showKelp) ? (
            <Line
              key={line.dataKey}
              yAxisId={line.yAxisId}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              name={t(line.name)}
              strokeWidth={line.strokeWidth}
              dot={<CustomDot />}
              activeDot={(props: any) => {
                const lineIndex = graphConfig.lines.findIndex((l) => l.dataKey === line.dataKey) ?? 0;
                const shape = shapeTypes[lineIndex % shapeTypes.length];
                if (props.payload[line.dataKey] === 0 || props.payload[line.dataKey] === null) {
                  return <g></g>;
                }
                return <g>{renderCustomShape(props.cx, props.cy, 8, line.stroke, line.stroke, shape)}</g>;
              }}
            />
          ) : null,
        )}

        {showTrendLine.early && graphConfig.earlyTrendLine && (
          <Line
            yAxisId={graphConfig.earlyTrendLine.yAxisId}
            type="monotone"
            dataKey={graphConfig.earlyTrendLine.dataKey}
            stroke={graphConfig.earlyTrendLine.stroke}
            name={t(graphConfig.earlyTrendLine.name)}
            strokeWidth={graphConfig.earlyTrendLine.strokeWidth}
            strokeDasharray={graphConfig.earlyTrendLine.strokeDasharray}
            dot={<CustomDot />}
            activeDot={(props: any) => {
              const lineIndex = allDataKeys.indexOf(graphConfig.earlyTrendLine!.dataKey);
              const shape = shapeTypes[lineIndex % shapeTypes.length];
              if (
                props.payload[graphConfig.earlyTrendLine!.dataKey] === 0 ||
                props.payload[graphConfig.earlyTrendLine!.dataKey] === null
              ) {
                return <g></g>;
              }
              return (
                <g>
                  {renderCustomShape(
                    props.cx,
                    props.cy,
                    8,
                    graphConfig.earlyTrendLine!.stroke,
                    graphConfig.earlyTrendLine!.stroke,
                    shape,
                  )}
                </g>
              );
            }}
          />
        )}

        {showTrendLine.late && graphConfig.lateTrendLine && (
          <Line
            yAxisId={graphConfig.lateTrendLine.yAxisId}
            type="monotone"
            dataKey={graphConfig.lateTrendLine.dataKey}
            stroke={graphConfig.lateTrendLine.stroke}
            name={t(graphConfig.lateTrendLine.name)}
            strokeWidth={graphConfig.lateTrendLine.strokeWidth}
            strokeDasharray={graphConfig.lateTrendLine.strokeDasharray}
            dot={<CustomDot />}
            activeDot={(props: any) => {
              const lineIndex = allDataKeys.indexOf(graphConfig.lateTrendLine!.dataKey);
              const shape = shapeTypes[lineIndex % shapeTypes.length];
              if (
                props.payload[graphConfig.lateTrendLine!.dataKey] === 0 ||
                props.payload[graphConfig.lateTrendLine!.dataKey] === null
              ) {
                return <g></g>;
              }
              return (
                <g>
                  {renderCustomShape(
                    props.cx,
                    props.cy,
                    8,
                    graphConfig.lateTrendLine!.stroke,
                    graphConfig.lateTrendLine!.stroke,
                    shape,
                  )}
                </g>
              );
            }}
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ExplorerGraph;
