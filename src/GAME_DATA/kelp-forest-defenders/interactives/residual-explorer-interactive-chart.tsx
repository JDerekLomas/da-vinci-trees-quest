import { useState, useCallback, useEffect } from 'react';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ComposedChart,
  Scatter,
} from 'recharts';
import { useTranslations } from '../../../hooks/useTranslations';

// Define interfaces for our data types
interface DataPoint {
  year: number;
  kelp: number;
  urchins: number;
  story: string;
  predicted?: number;
  residual?: number;
  residualColor?: string;
}

interface FocusedPoint {
  x: number;
  y: number;
  dataKey: string;
  value: number;
  name: string;
  label: number;
  color: string;
  shape: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<any>;
  label?: any;
}

interface CustomDotProps {
  cx?: number;
  cy?: number;
  dataKey?: string;
  payload?: any;
  stroke?: string;
  fill?: string;
  name?: string;
}

interface CustomLegendProps {
  payload?: Array<{
    value?: string;
    dataKey?: string;
    color: string;
    type?: string;
  }>;
}

const KelpForestHealthTracker = () => {
  const { t } = useTranslations();
  const [showResiduals, setShowResiduals] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [focusedPoint, setFocusedPoint] = useState<FocusedPoint | null>(null);
  // Sample data focused on the relationship between kelp and urchins
  const baseData = [
    {
      year: 2015,
      kelp: 4.5,
      urchins: 0.1,
      story: t('scenes.S12.S12_D0_F35_C9.storyData.0.text'),
    },
    {
      year: 2016,
      kelp: 4.0,
      urchins: 0.6,
      story: t('scenes.S12.S12_D0_F35_C9.storyData.1.text'),
    },
    {
      year: 2017,
      kelp: 2.8,
      urchins: 1.8,
      story: t('scenes.S12.S12_D0_F35_C9.storyData.2.text'),
    },
    {
      year: 2018,
      kelp: 2.2,
      urchins: 3.5,
      story: t('scenes.S12.S12_D0_F35_C9.storyData.3.text'),
    },
    {
      year: 2019,
      kelp: 1.5,
      urchins: 5.2,
      story: t('scenes.S12.S12_D0_F35_C9.storyData.4.text'),
    },
    {
      year: 2020,
      kelp: 1.0,
      urchins: 7.0,
      story: t('scenes.S12.S12_D0_F35_C9.storyData.5.text'),
    },
    {
      year: 2021,
      kelp: 0.7,
      urchins: 9.5,
      story: t('scenes.S12.S12_D0_F35_C9.storyData.6.text'),
    },
  ];

  // Prepare data for scatter plot showing kelp vs urchins relationship
  const scatterData = baseData.map((d) => ({
    kelp: d.kelp,
    urchins: d.urchins,
    year: d.year,
    story: d.story,
  }));

  // Calculate linear regression for kelp vs urchins
  const calculateRegression = () => {
    const n = scatterData.length;
    const sumX = scatterData.reduce((acc, d) => acc + d.kelp, 0);
    const sumY = scatterData.reduce((acc, d) => acc + d.urchins, 0);
    const sumXY = scatterData.reduce((acc, d) => acc + d.kelp * d.urchins, 0);
    const sumXX = scatterData.reduce((acc, d) => acc + d.kelp * d.kelp, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return scatterData.map((d) => {
      const predicted = slope * d.kelp + intercept;
      const residual = d.urchins - predicted;
      const residualColor = residual >= 0 ? '#27ae60' : '#e74c3c';

      return {
        ...d,
        predicted: predicted,
        residual: residual,
        residualColor: residualColor,
      };
    });
  };

  const data = calculateRegression();

  // Get min and max kelp values for the trend line
  const maxKelp = Math.max(...data.map((d) => d.kelp));

  // Toggle between views
  const toggleView = () => {
    setShowResiduals(!showResiduals);
    setShowTooltip(false);
    setFocusedPoint(null);
  };

  // Shape assignments for different data types
  const shapeAssignments = {
    urchins: 'circle',
    predicted: 'diamond',
    residual: 'circle',
    kelp: 'square',
  };
  // Render custom shapes for data points
  const renderCustomShape = (
    cx: number,
    cy: number,
    size: number,
    fill: string,
    stroke: string,
    shape: string,
    strokeWidth = 1,
  ) => {
    const halfSize = size / 2;

    switch (shape) {
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
      case 'circle':
      default:
        return <circle cx={cx} cy={cy} r={halfSize} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    }
  }; // Custom dot component for better interactivity
  const CustomDot = useCallback(
    (props: CustomDotProps) => {
      const { cx = 0, cy = 0, dataKey = '', payload, fill = '', stroke = '', name = '' } = props;

      if (!payload) return null;

      const shape = shapeAssignments[dataKey as keyof typeof shapeAssignments] || 'circle';
      const actualFill = dataKey === 'predicted' ? 'white' : fill || stroke;
      const strokeWidth = dataKey === 'predicted' ? 2 : 1;
      const ariaLabel = t(
        `scenes.S12.S12_D0_F35_C9.ariaLabels.dataPointFormat`
          .replace('{name}', String(name || dataKey))
          .replace('{value}', String(payload[dataKey]))
          .replace('{year}', String(payload.year)),
      );

      return (
        <g
          tabIndex={0}
          role="button"
          aria-label={ariaLabel}
          onFocus={() => {
            setShowTooltip(true);
            setFocusedPoint({
              x: cx,
              y: cy,
              dataKey,
              value: payload[dataKey],
              name: name || dataKey,
              label: payload.year,
              color: fill || stroke,
              shape,
            } as FocusedPoint);
          }}
          onBlur={() => {
            setShowTooltip(false);
            setFocusedPoint(null);
          }}
          onMouseEnter={() => {
            setShowTooltip(true);
            setFocusedPoint({
              x: cx,
              y: cy,
              dataKey,
              value: payload[dataKey],
              name: name || dataKey,
              label: payload.year,
              color: fill || stroke,
              shape,
            } as FocusedPoint);
          }}
          onMouseLeave={() => {
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
              name: name || dataKey,
              label: payload.year,
              color: fill || stroke,
              shape,
            } as FocusedPoint);
          }}
        >
          {renderCustomShape(cx, cy, 8, actualFill, stroke, shape, strokeWidth)}
        </g>
      );
    },
    [t],
  ); // Custom legend component
  const CustomLegend = useCallback(
    (props: CustomLegendProps) => {
      const { payload } = props;
      if (!payload) return null;

      return (
        <ul className="flex justify-center pt-2 m-0 list-none">
          {payload.map((entry, index: number) => {
            const dataKey =
              entry.dataKey ||
              (entry.value && entry.value.includes('Regression')
                ? 'predicted'
                : entry.value && entry.value.includes('Observed')
                  ? 'urchins'
                  : entry.value && entry.value.includes('Residuals')
                    ? 'residual'
                    : 'circle');

            const shape = shapeAssignments[dataKey as keyof typeof shapeAssignments] || 'circle';
            const fillColor = dataKey === 'predicted' ? 'white' : entry.color;

            return (
              <li key={`legend-item-${index}`} className="flex items-center mr-5 mb-1">
                <svg width="22" height="16" viewBox="0 0 22 16">
                  <g>
                    {dataKey === 'predicted' ? (
                      <>
                        <line x1="0" y1="8" x2="10" y2="8" stroke={entry.color} strokeWidth="2" />
                        <line x1="12" y1="8" x2="22" y2="8" stroke={entry.color} strokeWidth="2" />
                        {renderCustomShape(11, 8, 8, fillColor, entry.color, shape, 2)}
                      </>
                    ) : (
                      renderCustomShape(11, 8, 8, fillColor, entry.color, shape, dataKey === 'predicted' ? 2 : 1)
                    )}
                  </g>
                </svg>
                <span className="ml-2 text-base">{entry.value}</span>
              </li>
            );
          })}
        </ul>
      );
    },
    [t],
  ); // Custom tooltip - simplified based on reference implementation
  const CustomTooltip = useCallback(
    ({ active, payload }: TooltipProps) => {
      if (active && payload && payload.length) {
        const dataPoint = payload[0].payload;

        return (
          <div className="bg-white p-3 rounded-md shadow-md border border-gray-200">
            <div className="font-bold mb-1">
              {t('scenes.S12.S12_D0_F35_C9.tooltipLabels.year')} {dataPoint.year}
            </div>

            {!showResiduals ? (
              <>
                <p>
                  {t('scenes.S12.S12_D0_F35_C9.tooltipLabels.kelp')} <strong>{dataPoint.kelp.toFixed(1)}</strong>{' '}
                  {t('scenes.S12.S12_D0_F35_C9.tooltipLabels.stipesUnit')}
                </p>
                <p>
                  {t('scenes.S12.S12_D0_F35_C9.tooltipLabels.urchins')}{' '}
                  <strong>{dataPoint.urchins.toFixed(1)}</strong>{' '}
                  {t('scenes.S12.S12_D0_F35_C9.tooltipLabels.individualsUnit')}
                </p>
                <p>
                  {t('scenes.S12.S12_D0_F35_C9.tooltipLabels.predicted')}{' '}
                  <strong>{dataPoint.predicted.toFixed(1)}</strong>
                </p>
              </>
            ) : (
              <>
                <p>
                  {t('scenes.S12.S12_D0_F35_C9.tooltipLabels.kelp')} <strong>{dataPoint.kelp.toFixed(1)}</strong>{' '}
                  {t('scenes.S12.S12_D0_F35_C9.tooltipLabels.stipesUnit')}
                </p>
                <p>
                  {t('scenes.S12.S12_D0_F35_C9.tooltipLabels.residual')}{' '}
                  <strong>{dataPoint.residual.toFixed(1)}</strong>
                </p>
              </>
            )}
          </div>
        );
      }

      return null;
    },
    [showResiduals, t],
  );

  // Set aria labels for scatter points after the chart is rendered
  useEffect(() => {
    const setAriaLabels = () => {
      const tooltipElements = document.getElementsByClassName('recharts-scatter-symbol');
      if (tooltipElements.length === 0) return false;

      let allLabelsSet = true; // Track if all labels were set successfully

      Array.from(tooltipElements).forEach((element) => {
        const child = element.children[0];
        if (child) {
          const ariaLabel = child.getAttribute('aria-label');
          if (ariaLabel) {
            element.setAttribute('aria-label', ariaLabel);
            // Verify the label was actually set
            if (element.getAttribute('aria-label') !== ariaLabel) {
              allLabelsSet = false;
            }
          } else {
            allLabelsSet = false;
          }
        } else {
          allLabelsSet = false;
        }
      });

      return allLabelsSet; // Only return true if all labels were successfully set
    };

    const retryAttempts = 5;
    const baseDelay = 100;
    const attemptSetLabels = (attempt: number) => {
      if (attempt >= retryAttempts) {
        return;
      }
      const success = setAriaLabels();
      if (!success) {
        const delay = baseDelay * Math.pow(2, attempt);
        setTimeout(() => attemptSetLabels(attempt + 1), delay);
      }
    };

    attemptSetLabels(0);
  }, [showResiduals]);
  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto">
      {/* Information Box */}
      <div className="bg-white mb-6">
        <div className="flex items-start gap-2">
          {!showResiduals ? (
            <div>
              <h2 className="text-lg font-bold">{t('scenes.S12.S12_D0_F35_C9.infoBoxKelp.title')}</h2>
              <ul className="list-disc pl-6 mt-2">
                <li>{t('scenes.S12.S12_D0_F35_C9.infoBoxKelp.point1')}</li>
                <li>{t('scenes.S12.S12_D0_F35_C9.infoBoxKelp.point2')}</li>
                <li>{t('scenes.S12.S12_D0_F35_C9.infoBoxKelp.point3')}</li>
              </ul>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-bold">{t('scenes.S12.S12_D0_F35_C9.infoBoxResiduals.title')}</h2>
              <ul className="list-disc pl-6 mt-2">
                <li>{t('scenes.S12.S12_D0_F35_C9.infoBoxResiduals.point1')}</li>
                <li>{t('scenes.S12.S12_D0_F35_C9.infoBoxResiduals.point2')}</li>
                <li>{t('scenes.S12.S12_D0_F35_C9.infoBoxResiduals.point3')}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="w-full flex justify-center">
          <button
            onClick={toggleView}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label={
              showResiduals
                ? t('scenes.S12.S12_D0_F35_C9.ariaLabels.showOriginalData')
                : t('scenes.S12.S12_D0_F35_C9.ariaLabels.showResidualPlot')
            }
          >
            {showResiduals
              ? t('scenes.S12.S12_D0_F35_C9.buttonText.showOriginalData')
              : t('scenes.S12.S12_D0_F35_C9.buttonText.showResidualPlot')}
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-96 w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          {!showResiduals ? (
            <ComposedChart data={data} margin={{ top: 10, right: 80, bottom: 30, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="kelp"
                label={{
                  value: t('scenes.S12.S12_D0_F35_C9.axisLabels.kelpDensity'),
                  position: 'insideBottom',
                  offset: -10,
                }}
                domain={[0, Math.ceil(maxKelp)]}
                ticks={[0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]}
                tickFormatter={(value) => value.toFixed(1)}
              />{' '}
              <YAxis
                label={{
                  value: t('scenes.S12.S12_D0_F35_C9.axisLabels.urchinDensity'),
                  angle: -90,
                  position: 'center',
                }}
                domain={[0, 'dataMax + 1']}
                tickFormatter={(value) => Math.round(value).toString()}
              />
              <Tooltip
                content={CustomTooltip}
                position={focusedPoint ? { x: focusedPoint.x, y: focusedPoint.y - 10 } : undefined}
                wrapperStyle={
                  focusedPoint
                    ? {
                        visibility: showTooltip ? 'visible' : 'hidden',
                        position: 'absolute',
                        transform: `translate(${
                          focusedPoint.x < 150
                            ? 10
                            : focusedPoint.x > 600
                              ? focusedPoint.x - 320
                              : focusedPoint.x - 160
                        }px, ${focusedPoint.y < 200 ? 10 : focusedPoint.y - 220}px)`,
                        zIndex: 1000,
                      }
                    : undefined
                }
              />
              <Legend
                align="center"
                verticalAlign="top"
                content={<CustomLegend />}
                wrapperStyle={{ paddingBottom: '10px' }}
              />
              {/* Regression Line */}
              <Line
                data={data}
                type="monotone"
                dataKey="predicted"
                name={t('scenes.S12.S12_D0_F35_C9.legendLabels.linearRegression')}
                stroke="#2e7d32"
                strokeWidth={2}
                dot={
                  <CustomDot
                    dataKey="predicted"
                    name={t('scenes.S12.S12_D0_F35_C9.legendLabels.linearRegression')}
                    fill="white"
                    stroke="#2e7d32"
                  />
                }
                isAnimationActive={false}
              />
              {/* Actual Data Points */}
              <Scatter
                dataKey="urchins"
                name={t('scenes.S12.S12_D0_F35_C9.legendLabels.observedData')}
                fill="#6a1b9a"
                shape={(props: any) => (
                  <CustomDot
                    {...props}
                    dataKey="urchins"
                    name={t('scenes.S12.S12_D0_F35_C9.legendLabels.observedData')}
                    fill="#6a1b9a"
                    stroke="#ffffff"
                  />
                )}
                isAnimationActive={false}
              />
            </ComposedChart>
          ) : (
            <ComposedChart data={data} margin={{ top: 10, right: 155, bottom: 30, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="kelp"
                label={{
                  value: t('scenes.S12.S12_D0_F35_C9.axisLabels.kelpDensity'),
                  position: 'insideBottom',
                  offset: -10,
                }}
                domain={[0, Math.ceil(maxKelp)]}
                ticks={[0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]}
                tickFormatter={(value: number) => value.toFixed(1)}
              />
              <YAxis
                label={{
                  value: t('scenes.S12.S12_D0_F35_C9.axisLabels.residual'),
                  angle: -90,
                  position: 'center',
                  offset: -5,
                }}
                domain={[
                  Math.floor(Math.min(...data.map((d: DataPoint) => d.residual || 0)) - 0.5),
                  Math.ceil(Math.max(...data.map((d: DataPoint) => d.residual || 0)) + 0.5),
                ]}
                tickFormatter={(value: number) => Math.round(value).toString()}
              />
              <Tooltip
                content={CustomTooltip}
                position={focusedPoint ? { x: focusedPoint.x, y: focusedPoint.y - 10 } : undefined}
                wrapperStyle={
                  focusedPoint
                    ? {
                        visibility: showTooltip ? 'visible' : 'hidden',
                        position: 'absolute',
                        transform: `translate(${
                          focusedPoint.x < 150
                            ? 10
                            : focusedPoint.x > 600
                              ? focusedPoint.x - 320
                              : focusedPoint.x - 160
                        }px, ${focusedPoint.y < 200 ? 10 : focusedPoint.y - 220}px)`,
                        zIndex: 1000,
                      }
                    : undefined
                }
              />
              <Legend
                align="center"
                verticalAlign="top"
                content={<CustomLegend />}
                wrapperStyle={{ paddingBottom: '10px' }}
              />
              {/* Zero Reference Line */}{' '}
              <ReferenceLine
                y={0}
                stroke="#666"
                strokeDasharray="3 3"
                label={{
                  value: t('scenes.S12.S12_D0_F35_C9.referenceLabels.perfectPrediction'),
                  position: 'right',
                  fill: '#666',
                  fontSize: 16,
                  offset: 2,
                }}
              />
              {/* Residual Points */}
              <Scatter
                dataKey="residual"
                name={t('scenes.S12.S12_D0_F35_C9.legendLabels.residuals')}
                fill="#000000"
                shape={(props: CustomDotProps) => (
                  <CustomDot
                    {...props}
                    dataKey="residual"
                    name={t('scenes.S12.S12_D0_F35_C9.legendLabels.residuals')}
                    fill={(props.payload && props.payload.residualColor) || '#000000'}
                    stroke="#ffffff"
                  />
                )}
                isAnimationActive={false}
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KelpForestHealthTracker;
