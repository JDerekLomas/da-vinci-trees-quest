import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useTranslations } from '../../../hooks/useTranslations';
import interaction from '../configs/interactive-2';
const variables_colors = {
  N: '#E0002B',
  K: '#0061FC',
};

// Define types for our data structures
interface RatioType {
  name: string;
  ratio: number;
  color: string;
  fraction: string;
}

interface ApproximationType {
  divisions: number;
  steps: number;
  approxRatio: number;
  error: number;
  highlighted: boolean;
}

interface BestApproximationType {
  steps: number;
  error: number;
  ratio: number;
  exactSteps: number;
}

interface TooltipInfoType {
  x: number;
  y: number;
  division: number;
  steps: number;
  error: number;
  visible: boolean;
}

const MusicalTemperamentExplorer: React.FC = () => {
  const { t } = useTranslations();
  const [divisions, setDivisions] = useState<number>(8);
  const [approximations, setApproximations] = useState<ApproximationType[]>([]);
  const [bestApproximation, setBestApproximation] = useState<BestApproximationType>({
    steps: 0,
    error: 0,
    ratio: 1,
    exactSteps: 0,
  });
  const [focusedPoint, setFocusedPoint] = useState<number | null>(null);
  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfoType | null>(null);

  // We're not using setSelectedRatio, but keeping the state for future extensibility
  const [selectedRatio] = useState<RatioType>({
    name: 'Perfect Fifth',
    ratio: 3 / 2,
    color: '#008217',
    fraction: '3:2',
  });

  useEffect(() => {
    calculateApproximations();
  }, [divisions, selectedRatio]);

  const calculateApproximations = (): void => {
    const log2Ratio = Math.log2(selectedRatio.ratio);

    // Calculate errors for different divisions
    const approxData: ApproximationType[] = [];
    let bestError = 100;

    for (let div = 5; div <= 24; div++) {
      const div_stepSize = 1 / div;
      const div_idealSteps = log2Ratio / div_stepSize;
      const div_nearestStep = Math.round(div_idealSteps);
      const approxRatio = Math.pow(2, div_nearestStep * div_stepSize);
      const error = (Math.abs(approxRatio - selectedRatio.ratio) / selectedRatio.ratio) * 100;

      approxData.push({
        divisions: div,
        steps: div_nearestStep,
        approxRatio: approxRatio,
        error: error,
        highlighted: div === divisions,
      });

      if (div === divisions) {
        setBestApproximation({
          steps: div_nearestStep,
          ratio: approxRatio,
          error: error,
          exactSteps: div_idealSteps,
        });
      }

      if (error < bestError) {
        bestError = error;
      }
    }

    setApproximations(approxData);
  };

  // Error color based on magnitude
  const getErrorColor = (error: number): string => {
    if (error < 0.5) return 'text-[#008217]';
    if (error < 2) return 'text-yellow-700';
    return 'text-[#E0002B]';
  };

  // Format percentage for display
  const formatPercent = (value: number | undefined): string => {
    if (value === undefined) return '0%';
    return value.toFixed(2) + '%';
  };

  // Updated keyboard event handler for dots
  const handleDotKeyDown = (
    e: React.KeyboardEvent,
    division: number,
    cx: number,
    cy: number,
    steps: number,
    error: number,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setFocusedPoint(division);

      // Set tooltip info for overlay
      const tooltipY = cy < 100 ? cy + 10 : cy - 80;
      setTooltipInfo({
        x: cx,
        y: tooltipY,
        division,
        steps,
        error,
        visible: true,
      });
    }
  };

  // Updated blur handler
  const handleDotBlur = () => {
    setFocusedPoint(null);
    setTooltipInfo(null);
  };

  return (
    <div className="w-full mb-6">
      <div>
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className=" bg-white rounded-lg text-base w-full">
            <span className="sr-only">
              k {t(interaction.approximatelyEquals)} 0.58496 {t(interaction.multipliedBy)} N
            </span>
            <span className="font-besley text-lg mb-1" aria-hidden="true">
              <span className={`text-[${variables_colors['K']}] font-bold italic`}>k</span> ≈ <b>0.58496</b> ·{' '}
              <span className={`text-[${variables_colors['N']}] font-bold italic`}>N</span>
            </span>
            <p className="mb-1 text-lg">
              {' '}
              {t(interaction.forText)}{' '}
              <span className="font-besley">
                <span className={`text-[${variables_colors['N']}] italic font-bold`}>N</span> ={' '}
                <b className={`text-[${variables_colors['N']}]`}>{divisions}</b>
              </span>
              :
            </p>
            <div className="mb-1" role="alert" aria-live="polite" aria-atomic="true">
              <span className="sr-only">
                k {t(interaction.approximatelyEquals)} 0.58496 {t(interaction.multipliedBy)} {divisions},{' '}
                {t(interaction.approximatelyEquals)} {(0.58496 * divisions).toFixed(3)}
              </span>
              <span className="font-besley text-lg" aria-hidden="true">
                <span className={`text-[${variables_colors['K']}] font-bold italic`}>k</span> ≈ <b>0.58496</b> ·{' '}
                <span className={`text-[${variables_colors['N']}] font-bold`}>{divisions}</span> ≈{' '}
                <span className={`text-[${variables_colors['K']}] font-bold`}>
                  {(0.58496 * divisions).toFixed(3)}
                </span>
              </span>
            </div>
            <div className="text-base flex justify-between">
              <div className={`text-base font-medium mt-1 ${getErrorColor(bestApproximation.error)}`}>
                {t(interaction.errorText)}: {formatPercent(bestApproximation.error)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-semibold text-sm">
            {t(interaction.testValuesText)} (
            <span className={`text-[${variables_colors['N']}] font-bold font-besley italic`}>N</span>):
          </h3>
        </div>
        <div className="w-full rounded-lg sliderContainer">
          <input
            type="range"
            min={5}
            max={24}
            step={1}
            value={divisions}
            onChange={(e) => setDivisions(Number(e.target.value))}
            className="w-full global-slider"
            aria-label={t(interaction.sliderAriaLabel)}
            aria-valuemin={5}
            aria-valuemax={24}
            aria-valuenow={divisions}
            style={{
              background: `linear-gradient(to right, #006BE0 0%, #006BE0 ${((divisions - 5) / (24 - 5)) * 100}%, #757575 ${((divisions - 5) / (24 - 5)) * 100}%, #757575 100%)`,
            }}
          />
        </div>

        <div className="flex text-xs text-gray-500 justify-between" aria-hidden="true">
          <span>5</span>
          <span>11</span>
          <span>18</span>
          <span>24</span>
        </div>
      </div>

      <div className="flex flex-col items-center w-full mt-4 relative">
        <ResponsiveContainer height={300}>
          <LineChart
            data={approximations}
            margin={{ top: 50, right: 30, bottom: 20, left: 0 }}
            aria-label={t(interaction.chartAriaLabel)}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis
              dataKey="divisions"
              type="number"
              domain={[5, 24]}
              ticks={[5, 10, 12, 15, 19, 24]}
              label={{ value: `N (${t(interaction.stepInOctaveText)})`, position: 'bottom', dy: 0 }}
            />
            <YAxis
              label={{ value: t(interaction.yAxisLabel), angle: -90, position: 'insideLeft', dx: 10, dy: 30 }}
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              allowDecimals={true}
            />
            <Legend
              iconSize={16}
              verticalAlign="top"
              wrapperStyle={{ fontSize: 16, marginLeft: 80 }}
              payload={[{ value: t(interaction.approximationErrorText), type: 'line' as const, color: '#1a5fb4' }]}
            />
            <Tooltip
              formatter={(value: number) => [value.toFixed(3) + '%', t(interaction.errorLabel)]}
              labelFormatter={(value: number) => {
                const item = approximations.find((d) => d.divisions === value);
                if (!item) return `N = ${value}`;
                const k = 0.58496 * value;
                return (
                  <span>
                    <span className={`text-[${variables_colors['N']}] font-bold italic font-besley`}>N</span> ={' '}
                    {value},
                    <span className={`text-[${variables_colors['K']}] font-bold italic font-besley`}> k</span> ≈{' '}
                    {k.toFixed(3)},<span> {t(interaction.closestLabel)}:</span> {item.steps}
                  </span>
                );
              }}
              contentStyle={{ fontFamily: 'Besley' }}
            />
            <Line
              type="monotone"
              dataKey="error"
              stroke="#1a5fb4"
              strokeWidth={2}
              connectNulls={true}
              dot={React.useMemo(() => {
                return (props: { cx?: number; cy?: number; payload?: ApproximationType }) => {
                  if (!props || !props.payload || !props.cx || !props.cy) {
                    return <circle cx={0} cy={0} r={0} fill="none" />;
                  }
                  const { cx, cy, payload } = props;
                  const specialPoints = [10, 12, 19, 24];

                  if (specialPoints.includes(payload.divisions)) {
                    return (
                      <g>
                        <circle
                          role="button"
                          cx={cx}
                          cy={cy}
                          r={5}
                          fill={payload.divisions === 10 ? '#E0002B' : '#008217'}
                          stroke="white"
                          strokeWidth={2}
                          tabIndex={0}
                          onKeyDown={(e) =>
                            handleDotKeyDown(e, payload.divisions, cx, cy, payload.steps, payload.error)
                          }
                          onFocus={() => {
                            setFocusedPoint(payload.divisions);
                            const tooltipY = cy < 100 ? cy + 10 : cy - 80;
                            setTooltipInfo({
                              x: cx,
                              y: tooltipY,
                              division: payload.divisions,
                              steps: payload.steps,
                              error: payload.error,
                              visible: true,
                            });
                          }}
                          onBlur={handleDotBlur}
                          aria-label={t(interaction.pointAriaLabel)}
                        />
                        {payload.divisions === 12 && (
                          <text x={cx} y={cy - 30} textAnchor="middle" fill="#008217" fontSize="12">
                            7/12
                          </text>
                        )}
                        {payload.divisions === 19 && (
                          <text x={cx} y={cy - 25} textAnchor="middle" fill="#008217" fontSize="12">
                            11/19
                          </text>
                        )}
                        {payload.divisions === 24 && (
                          <text x={cx} y={cy - 35} textAnchor="middle" fill="#008217" fontSize="12">
                            14/24
                          </text>
                        )}
                        {payload.divisions === 10 && (
                          <text x={cx - 3} y={cy - 15} textAnchor="middle" fill="#E0002B" fontSize="12">
                            6/10
                          </text>
                        )}
                      </g>
                    );
                  } else if (payload.highlighted) {
                    return (
                      <g>
                        <circle
                          role="button"
                          cx={cx}
                          cy={cy}
                          r={5}
                          fill="#1a5fb4"
                          stroke="white"
                          strokeWidth={2}
                          tabIndex={0}
                          onKeyDown={(e) =>
                            handleDotKeyDown(e, payload.divisions, cx, cy, payload.steps, payload.error)
                          }
                          onFocus={() => {
                            setFocusedPoint(payload.divisions);
                            const tooltipY = cy < 100 ? cy + 10 : cy - 80;
                            setTooltipInfo({
                              x: cx,
                              y: tooltipY,
                              division: payload.divisions,
                              steps: payload.steps,
                              error: payload.error,
                              visible: true,
                            });
                          }}
                          onBlur={handleDotBlur}
                          aria-label={t(interaction.pointAriaLabel)}
                        />
                      </g>
                    );
                  } else {
                    return (
                      <g>
                        <circle
                          role="button"
                          cx={cx}
                          cy={cy}
                          r={3}
                          fill="white"
                          stroke="#1a5fb4"
                          strokeWidth={1}
                          tabIndex={0}
                          onKeyDown={(e) =>
                            handleDotKeyDown(e, payload.divisions, cx, cy, payload.steps, payload.error)
                          }
                          onFocus={() => {
                            setFocusedPoint(payload.divisions);
                            const tooltipY = cy < 100 ? cy + 10 : cy - 80;
                            setTooltipInfo({
                              x: cx,
                              y: tooltipY,
                              division: payload.divisions,
                              steps: payload.steps,
                              error: payload.error,
                              visible: true,
                            });
                          }}
                          onBlur={handleDotBlur}
                          aria-label={t(interaction.pointAriaLabel)}
                        />
                      </g>
                    );
                  }
                };
              }, [focusedPoint])}
            />
            <ReferenceLine
              x={12}
              stroke="#008217"
              strokeDasharray="3 3"
              label={{
                value: 'N=12',
                position: 'top',
                fill: '#E0002B',
                fontFamily: 'Besley',
                fontStyle: 'italic',
                fontWeight: 'bold',
              }}
            />
            <ReferenceLine
              y={1}
              stroke="#666"
              strokeDasharray="3 3"
              label={{ value: '1%', position: 'right', fill: '#666' }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Tooltip overlay */}
        {tooltipInfo && tooltipInfo.visible && (
          <div
            className="absolute bg-white p-2 rounded shadow-md border text-base"
            style={{
              position: 'absolute',
              left: tooltipInfo.x - 100,
              top: tooltipInfo.y,
              width: '250px',
              zIndex: 1000,
              pointerEvents: 'none',
            }}
          >
            <span>
              <span className={`text-[${variables_colors['N']}] font-bold italic`}>N</span> ={' '}
              {tooltipInfo.division},<span className={`text-[${variables_colors['K']}] font-bold italic`}> k</span>{' '}
              ≈ {(0.58496 * tooltipInfo.division).toFixed(3)},<span> {t(interaction.closestLabel)}:</span>{' '}
              {tooltipInfo.steps}
              <div className="mt-1 text-[#436db9]">
                {t(interaction.errorLabel)}: {tooltipInfo.error.toFixed(3)}%
              </div>
            </span>
          </div>
        )}

        <div className="flex flex-col items-center w-full mt-4">
          {(() => {
            if (divisions === 12) {
              return (
                <div className="bg-green-100 text-center w-full p-2 rounded-lg text-green-800 text-sm mt-1">
                  <div className="font-semibold">{t(interaction.excellentChoiceText)}</div>
                  <div>{t(interaction.excellentChoiceDescription)}</div>
                </div>
              );
            } else if (divisions === 17) {
              return (
                <div className="bg-blue-100 text-center w-full p-2 rounded-lg text-blue-800 text-sm mt-1">
                  <div className="font-semibold">{t(interaction.seventeenToneText)}</div>
                  <div>{t(interaction.seventeenToneDescription)}</div>
                </div>
              );
            } else if (divisions === 19) {
              return (
                <div className="bg-blue-100 text-center w-full p-2 rounded-lg text-blue-800 text-sm mt-1">
                  <div className="font-semibold">{t(interaction.nineteenToneText)}</div>
                  <div>{t(interaction.nineteenToneDescription)}</div>
                </div>
              );
            } else if (divisions === 24) {
              return (
                <div className="bg-yellow-100 text-center w-full p-2 rounded-lg text-yellow-800 text-sm mt-1">
                  <div className="font-semibold">{t(interaction.veryAccurateText)}</div>
                  <div>{t(interaction.veryAccurateDescription)}</div>
                </div>
              );
            } else {
              return <div className="invisible w-full p-2 mt-1 rounded-lg text-sm">&nbsp;</div>;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default MusicalTemperamentExplorer;
