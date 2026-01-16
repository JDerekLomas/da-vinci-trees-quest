import React, { useCallback, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts';
import { useTranslations } from '../../../hooks/useTranslations';
import parse from 'html-react-parser';
import useScreenSize from '../../../hooks/useScreenSize';
import './plant-growth-chart.css';
import { Interaction } from './interface';

interface PlantGrowthExplorerProps {
  interaction: Interaction;
}

const PlantGrowthExplorer: React.FC<PlantGrowthExplorerProps> = ({ interaction }) => {
  const { t } = useTranslations();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showOptimalCurve, setShowOptimalCurve] = useState(false);
  const [focusedPoint, setFocusedPoint] = useState<any | null>(null);
  const { isZoomed200, isVerticalScreen } = useScreenSize();
  const plantGrowthConfig = interaction.plantGrowthConfig;

  if (!plantGrowthConfig) {
    return <></>;
  }

  const {
    xAxisLabel,
    yAxisLabel,
    zoneLabels,
    curveLabel,
    dataPointLabel,
    optimalLabel,
    vertexLabel,
    nitrogenLabel,
  } = plantGrowthConfig;

  const chartData = [
    { x: 0, y: 10 },
    { x: 2, y: 16 },
    { x: 4, y: 18 },
    { x: 6, y: 16 },
    { x: 8, y: 10 },
    { x: 10, y: 0 },
  ];

  const getXTooltip = (key: string, label: string) => {
    const tooltip = t(key) + ': ';
    return `${tooltip} ${label}`;
  };

  const CustomDot = useCallback(
    (props: any) => {
      const { cx, cy, stroke, payload } = props;
      const ariaLabel = `X: ${t(xAxisLabel)}: ${payload.x}, Y: ${t(yAxisLabel)}: ${payload.y}`;

      return (
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill={stroke}
          stroke="gray"
          strokeWidth={1}
          tabIndex={0}
          aria-label={ariaLabel}
          role="img"
          className="custom-dot"
          onFocus={() => {
            setShowTooltip(true);
            setFocusedPoint({
              cx,
              cy,
              x: payload.x,
              y: payload.y,
              payload: [{ color: stroke, value: payload.y }],
            });
          }}
          onBlur={() => {
            setShowTooltip(false);
            setFocusedPoint(null);
          }}
        />
      );
    },
    [t],
  );

  return (
    <div className="chart-wrapper" role="region" aria-label={t(xAxisLabel)} tabIndex={0}>
      <div className="controls">
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={showOptimalCurve}
            onChange={() => setShowOptimalCurve(!showOptimalCurve)}
            aria-label={t(curveLabel)}
            autoFocus
          />
          <span className="checkbox-text">{t(curveLabel)}</span>
          <div className="curve-equation">
            ( <span className="variable variable-y" style={{ color: '#E0002B' }}>
              y
            </span>{' '}
            = <span className="constant" style={{ color: '#8E24AA' }}>-0.5 </span>
            <span className="variable" style={{ color: '#0061FC' }}>x²</span> <span className="constant">+</span>{' '}
            <span className="constant" style={{ color: '#DB0072' }}>4 </span>
            <span className="variable" style={{ color: '#0061FC' }}>x</span> <span className="constant">+</span>{' '}
            <span className="constant" style={{ color: '#008217' }}>10</span> )
          </div>
        </label>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 30, right: 40, bottom: 90, left: 80 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="x"
              label={{
                value: t(xAxisLabel),
                position: 'bottom',
                offset: 40,
                fontSize: 16,
              }}
              domain={[0, 10]}
              type="number"
              allowDecimals={false}
              tickCount={11}
            ></XAxis>
            <YAxis
              label={{
                value: t(yAxisLabel),
                angle: -90,
                position: 'center',
                dx: -35,
                fontSize: 16,
              }}
              allowDecimals={false}
              domain={[0, 30]}
              tickCount={7}
            />
            <Tooltip
              position={{
                x: focusedPoint?.cx,
                y: focusedPoint?.cy,
              }}
              content={({ active, payload, label }) => {
                if (active || (showTooltip && focusedPoint)) {
                  const xValue = focusedPoint ? focusedPoint.x : label;
                  const yValue = focusedPoint ? focusedPoint.y : payload?.[0]?.value;

                  return (
                    <div className="custom-tooltip" role="tooltip" aria-live="polite">
                      <p className="text-m font-medium mb-1">{getXTooltip(nitrogenLabel, xValue)}</p>
                      <p className="text-m mb-1">
                        {parse(t(optimalLabel))}
                        :&nbsp;
                        {Number(yValue).toFixed(2)}
                      </p>
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
            {/* Background Zones */}
            <ReferenceArea
              x1={0}
              x2={3}
              y1={0}
              y2={30}
              fill="rgba(255, 250, 114, 0.5)"
              label={{
                value: t(zoneLabels.notEnough),
                position: 'bottom',
                offset: 40,
                fill: 'rgb(131, 98, 0)',
              }}
            />
            <ReferenceArea
              x1={3}
              x2={5}
              y1={0}
              y2={30}
              fill="rgba(122, 254, 168, 0.5)"
              label={{
                value: t(zoneLabels.justRight),
                position: 'bottom',
                offset: 40,
                fill: 'rgb(28, 128, 61)',
              }}
            />
            <ReferenceArea
              x1={5}
              x2={10}
              y1={0}
              y2={30}
              fill="rgba(248, 130, 130, 0.5)"
              label={{
                value: t(zoneLabels.tooMuch),
                position: 'bottom',
                offset: 40,
                fill: 'rgb(239, 68, 68)',
              }}
            />

            <Legend
              verticalAlign={isZoomed200 || isVerticalScreen ? 'bottom' : 'top'}
              height={isZoomed200 || isVerticalScreen ? 52 : 36}
              wrapperStyle={{
                fontSize: '16px',
                marginBottom: `${isZoomed200 || isVerticalScreen ? '-36px' : ''}`,
              }}
              formatter={(value, entry) => {
                const { color } = entry;
                return <span style={{ color }}>{value}</span>;
              }}
            />

            <Line
              type="monotone"
              dataKey="y"
              stroke="#6366F1"
              strokeWidth={0}
              dot={<CustomDot />}
              activeDot={{
                r: 6,
                fill: '#6366F1',
                stroke: 'gray',
                strokeWidth: 1,
              }}
              name={t(dataPointLabel)}
              role="img"
              aria-label={t(dataPointLabel)}
              legendType="circle"
            />
            {showOptimalCurve && (
              <>
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
                  name={t(optimalLabel)}
                  legendType="line"
                />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="#A6001A"
                  strokeWidth={0}
                  dot={(props) => {
                    if (props.payload.x === 4) {
                      return (
                        <circle cx={props.cx} cy={props.cy} r={6} fill="#A6001A" stroke="none" strokeWidth={0} />
                      );
                    }
                    return <></>;
                  }}
                  activeDot={false}
                  name={t(vertexLabel)}
                  legendType="circle"
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PlantGrowthExplorer;
