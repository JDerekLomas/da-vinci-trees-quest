import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import { Input, OcenLifeExplorerInteraction } from './interface';
import parse from 'html-react-parser';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  TooltipProps,
} from 'recharts';
import '../../../shared/slider.css';

interface FocusedPoint {
  x: number;
  y: number;
  name: string;
  value: number;
  label: number;
  color: string;
  shape: string;
}

interface ScatterPoint {
  x: number;
  y: number;
  // year: number;
}

const renderCustomShape = (cx: number, cy: number, r: number, fill: string | undefined, shape: string) => {
  if (shape === 'triangle') {
    const height = r * 1.5;
    const width = r * 1.5;
    return (
      <polygon
        points={`${cx},${cy - height} ${cx - width},${cy + height} ${cx + width},${cy + height}`}
        fill={fill}
      />
    );
  }
  return <circle cx={cx} cy={cy} r={r} fill={fill} />;
};

const OceanLifeExplorer: React.FC<{
  interaction: OcenLifeExplorerInteraction;
}> = ({ interaction }) => {
  const { t } = useTranslations();

  const {
    unit,
    inputs,
    ocenData,
    creature,
    creatures,
    ariaLabel,
    yourLineLabel,
    kelpDensityLabel,
    calculateBestFit,
    calculateCorrelation,
  } = interaction;

  const [score, setScore] = useState<number>(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [yAxisCreature, setYAxisCreature] = useState(creature);
  const [focusedPoint, setFocusedPoint] = useState<FocusedPoint | null>(null);

  const createDefaultValueObject = (inputs?: Input[]) =>
    inputs?.reduce(
      (acc, input) => {
        if (input.type === 'slider') acc[input.id] = input.defaultValue;
        return acc;
      },
      {} as Record<string, number>,
    ) ?? null;

  const [inputValues, setInputValues] = useState<Record<string, number> | null>(createDefaultValueObject(inputs));

  const calculateScore = useCallback(
    (slope: number, intercept: number): number => {
      const bestFit = calculateBestFit(yAxisCreature, ocenData);
      const bestSlope = Math.round(bestFit.slope);
      const bestIntercept = Math.round(bestFit.intercept);
      const slopeDiff = Math.abs(bestSlope - slope);
      const interceptDiff = Math.abs(bestIntercept - intercept);
      const slopeRange = 200;
      const interceptRange = 150;
      const normalizedSlopeDiff = slopeDiff / slopeRange;
      const normalizedInterceptDiff = interceptDiff / interceptRange;
      const slopeAccuracy = Math.max(0, 100 - normalizedSlopeDiff * 100);
      const interceptAccuracy = Math.max(0, 100 - normalizedInterceptDiff * 100);
      const finalAccuracy = (slopeAccuracy + interceptAccuracy) / 2.0;
      return parseFloat(finalAccuracy.toFixed(1));
    },
    [calculateBestFit, yAxisCreature, ocenData],
  );

  const isCloseToTarget = (): boolean => {
    if (!inputValues) return false;
    const bestFit = calculateBestFit(yAxisCreature, ocenData);
    const roundedBestSlope = Math.round(bestFit.slope);
    const roundedBestIntercept = Math.round(bestFit.intercept);
    const roundedSlope = Math.round(inputValues['slope']);
    const roundedIntercept = Math.round(inputValues['intercept']);
    return roundedBestSlope === roundedSlope && roundedBestIntercept === roundedIntercept;
  };

  const getEquation = (): string => {
    if (!inputValues) return '';
    const roundedSlope = Math.round(inputValues['slope']);
    const roundedIntercept = Math.round(inputValues['intercept']);
    if (roundedIntercept === 0) {
      return `<span style="font-family: Besley"><span style="color: #E0002B; font-style: italic" >y</span> = <span style="color: #DB0072">${roundedSlope}</span><span style="color: #0061FC; font-style: italic"> x</span></span>`;
    }
    const sign = roundedIntercept >= 0 ? '+' : '';
    return `<span style="font-family: Besley"><span style="color: #E0002B; font-style: italic" >y</span> = <span style="color: #DB0072">${roundedSlope}</span><span style="color: #0061FC; font-style: italic"> x</span> ${sign} <span style="color: #677600">${roundedIntercept}</span>`;
  };

  const scatterData: ScatterPoint[] = ocenData.reduce((acc, d) => {
    const exists = acc.some((point) => point.x === d.kelp && point.y === d[yAxisCreature]);
    if (!exists) {
      acc.push({
        x: d.kelp,
        y: d[yAxisCreature],
        // year: d.year,
      });
    }
    return acc;
  }, [] as ScatterPoint[]);

  const getLinePoints = () => {
    const points: { x: number; y: number }[] = [];
    if (!inputValues) return points;
    const steps = 0.1;
    for (let x = 0; x <= 4; x += steps) {
      // Round the values to the 1 decimal place
      const X = Math.round(x * 10) / 10;
      const Y = Math.round((inputValues['slope'] * x + inputValues['intercept']) * 10) / 10;
      points.push({
        x: X,
        y: Y,
      });
    }
    return points;
  };
  // console.log(getLinePoints());
  const CustomTooltip = useCallback(
    ({ active, payload }: TooltipProps<number, string>) => {
      if (showTooltip) {
        return (
          <div className="bg-white p-3 border rounded shadow">
            <p>
              {t(kelpDensityLabel)}: {focusedPoint?.label} {t(unit)}
            </p>
            <p style={{ color: focusedPoint?.color }}>
              {t(focusedPoint?.name || '')}: {focusedPoint?.value} {t(creatures[yAxisCreature].unit)}
            </p>
          </div>
        );
      }
      if (active && payload && payload.length) {
        return (
          <div className="bg-white p-3 border rounded shadow">
            <p>
              {t(kelpDensityLabel)}: {payload[0]?.value} {t(unit)}
            </p>
            <p style={{ color: creatures[yAxisCreature].color }}>
              {t(creatures[yAxisCreature].name)}: {payload[1]?.value} {t(creatures[yAxisCreature].unit)}
            </p>
          </div>
        );
      }
      return null;
    },
    [t, unit, creatures, showTooltip, focusedPoint, yAxisCreature, kelpDensityLabel],
  );

  const getScoreComments = () => {
    if (isCloseToTarget()) return t('scenes.S11.S11_D0_F22_C9.score.perfect');
    else if (score > 90) return t('scenes.S11.S11_D0_F22_C9.score.amazing');
    else if (score > 70) return t('scenes.S11.S11_D0_F22_C9.score.close');
    else return t('scenes.S11.S11_D0_F22_C9.score.try');
  };

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #e0e0e0 ${percent}%)`;
  }, []);

  useEffect(() => {
    if (inputValues) setScore(calculateScore(inputValues['slope'], inputValues['intercept']));
  }, [inputValues, calculateScore]);

  useEffect(() => {
    interaction.inputs?.forEach((input) => {
      if (input.type === 'slider') {
        const slider = document.getElementById(`slider-${input.id}`) as HTMLInputElement;
        if (slider) {
          updateSliderBackground(slider);
        }
      }
    });
  }, [inputValues, interaction.inputs, updateSliderBackground]);

  // Set aria labels for scatter points after the chart is rendered
  useEffect(() => {
    const setAriaLabels = () => {
      const tooltipElements = document.getElementsByClassName('recharts-scatter-symbol');
      if (tooltipElements.length === 0) return false;

      let allLabelsSet = true;

      Array.from(tooltipElements).forEach((element: Element) => {
        const child = element.children[0];
        if (child) {
          const ariaLabel = child.getAttribute('aria-label');
          if (ariaLabel) {
            element.setAttribute('aria-label', ariaLabel);
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

      return allLabelsSet;
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
  }, [yAxisCreature, inputValues]);

  const renderInput = useCallback(
    (input: Input) => {
      if (input.type === 'slider') {
        return (
          <div className="block text-lg font-medium">
            <div aria-live="off">
              <label className="slider-label" htmlFor={`slider-${input.id}`}>
                {t(input.label)}
              </label>
              : {inputValues?.[input.id] ?? 0}
            </div>
            <div className="w-full">
              <div className="sliderContainer">
                <input
                  id={`slider-${input.id}`}
                  type="range"
                  value={inputValues?.[input.id] ?? 0}
                  onChange={(e) => {
                    setInputValues((prev) => ({
                      ...prev,
                      [input.id]: +e.target.value,
                    }));
                    updateSliderBackground(e.target as HTMLInputElement);
                  }}
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  className="global-slider w-full"
                  aria-valuetext={`${t(input.label)}: ${inputValues?.[input.id] ?? 0}`}
                />
              </div>
            </div>
          </div>
        );
      }
      return null;
    },
    [inputValues, t, updateSliderBackground],
  );

  const CustomLegend = useCallback((props: any) => {
    const { payload } = props;
    if (!payload) return null;

    return (
      <ul className="flex items-center justify-center flex-wrap gap-6" style={{ fontSize: '14px' }}>
        {payload.map((entry: any, index: number) => {
          const shape = index === 0 ? 'triangle' : 'circle';
          const shapeSvg =
            shape === 'triangle' ? (
              <polygon points="6,2 2,10 10,10" fill={entry.color} style={{ marginRight: '8px' }} />
            ) : (
              <circle cx="6" cy="6" r="4" fill={entry.color} style={{ marginRight: '8px' }} />
            );

          return (
            <li key={`legend-${index}`} className="flex items-center">
              <svg width="14" height="14" viewBox="0 0 12 12" style={{ marginRight: '4px' }}>
                {shapeSvg}
              </svg>
              <span>{entry.value}</span>
            </li>
          );
        })}
      </ul>
    );
  }, []);

  return (
    <div className="w-full">
      <div>
        {parse(t('scenes.S11.S11_D0_F22_C9.missionText'))}
        {parse(t('scenes.S11.S11_D0_F22_C9.correlationText'))}
        <div className="flex gap-4">
          <p>
            {parse(t('scenes.S11.S11_D0_F22_C9.urchinText'))}: {calculateCorrelation('urchin', ocenData)}
          </p>
          <p>
            {parse(t('scenes.S11.S11_D0_F22_C9.starText'))}: {calculateCorrelation('stars', ocenData)}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-end">
        <div>
          <label className="text-lg block mb-2">{parse(t('scenes.S11.S11_D0_F22_C9.selectText'))}:</label>
          <select
            className="w-32 md:w-64 p-2 border rounded-md"
            value={yAxisCreature}
            aria-label={t('scenes.S11.S11_D0_F22_C9.selectAriaLabel')}
            onChange={(e) => setYAxisCreature(e.target.value as 'urchin' | 'stars')}
          >
            {Object.entries(creatures).map(([key, value]) => (
              <option key={key} value={key}>
                {t(value.name)} - {t(value.description)}
              </option>
            ))}
          </select>
        </div>
        <div className="text-xl text-gray-600">
          {parse(t('scenes.S11.S11_D0_F22_C9.score.label'))}: {score}
          /100
          {getScoreComments()}
        </div>

        {yAxisCreature === 'urchin' ? (
          <>
            <div key={`input-urchin-slider-1`}>{renderInput(interaction.inputs[0])}</div>
            <div key={`input-urchin-slider-2`}>{renderInput(interaction.inputs[1])}</div>
          </>
        ) : (
          <>
            <div key={`input-stars-slider-1`}>{renderInput(interaction.inputs[2])}</div>
            <div key={`input-stars-slider-2`}>{renderInput(interaction.inputs[3])}</div>
          </>
        )}
      </div>

      <div className="flex items-center justify-center pt-2">
        <span>
          {t(interaction.yourLineLabel)}
          {': '}
          <strong>{parse(getEquation())}</strong>
        </span>
      </div>

      <div className="h-[330px] w-full" role="region" aria-label={t(ariaLabel)} tabIndex={0}>
        <ResponsiveContainer>
          <ScatterChart
            margin={{
              top: 5,
              right: 5,
              bottom: 30,
              left: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="x"
              type="number"
              domain={[0, 4]}
              ticks={[0, 1, 2, 3, 4]}
              label={{
                value: `${t(kelpDensityLabel)} [${t(unit)}]`,
                dy: 20,
                fill: '#666666',
              }}
            />
            <YAxis
              dataKey="y"
              type="number"
              domain={yAxisCreature === 'urchin' ? [0, 15] : [0, 100]}
              tick={{ fontSize: 12 }}
              label={{
                value: `${t(creatures[yAxisCreature].name)} [${t(creatures[yAxisCreature].unit)}]`,
                angle: -90,
                dx: -20,
                fill: creatures[yAxisCreature].color,
              }}
            />
            <Tooltip
              position={focusedPoint ? { x: focusedPoint.x, y: focusedPoint.y } : undefined}
              content={<CustomTooltip />}
              wrapperStyle={
                focusedPoint
                  ? {
                      visibility: showTooltip ? 'visible' : 'hidden',
                      position: 'absolute',
                      transform: `translate(${
                        focusedPoint.x < 150
                          ? 10
                          : focusedPoint.x > 600
                            ? focusedPoint.x - 300
                            : focusedPoint.x - 200
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
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            />
            <Scatter
              r={5}
              tabIndex={0}
              data={scatterData}
              fill={creatures[yAxisCreature].color}
              color={creatures[yAxisCreature].color}
              name={t(creatures[yAxisCreature].name)}
              isAnimationActive={false}
              shape={(props: any) => {
                const { cx, cy, r, payload, name, fill } = props;
                return (
                  <>
                    {renderCustomShape(cx, cy, r, fill, 'triangle')}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={0}
                      fill="transparent"
                      tabIndex={0}
                      onFocus={() => {
                        setShowTooltip(true);
                        setFocusedPoint({
                          x: cx,
                          y: cy,
                          name: name,
                          value: payload.y,
                          label: payload.x,
                          color: fill,
                          shape: 'triangle',
                        });
                      }}
                      onBlur={() => {
                        setShowTooltip(false);
                        setFocusedPoint(null);
                      }}
                      role="img"
                      aria-label={`${name} ${payload['y']}, ${t(kelpDensityLabel)} ${payload['x']}`}
                    />
                  </>
                );
              }}
            />
            <Scatter
              r={5}
              tabIndex={0}
              data={getLinePoints()}
              line={{
                stroke: isCloseToTarget() ? '#005F20' : '#666666',
                strokeWidth: isCloseToTarget() ? 3 : 2,
              }}
              fill={isCloseToTarget() ? '#005F20' : '#666666'}
              name={t(yourLineLabel)}
              isAnimationActive={false}
              shape={(props: any) => {
                const { cx, cy, r, payload, name, fill } = props;
                return (
                  <>
                    {renderCustomShape(cx, cy, r, fill, 'circle')}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={0}
                      fill="transparent"
                      tabIndex={0}
                      onFocus={() => {
                        setShowTooltip(true);
                        setFocusedPoint({
                          x: cx,
                          y: cy,
                          name: name,
                          value: payload.y,
                          label: payload.x,
                          color: fill,
                          shape: 'circle',
                        });
                      }}
                      onBlur={() => {
                        setShowTooltip(false);
                        setFocusedPoint(null);
                      }}
                      role="img"
                      aria-label={`${name} ${payload['y']}, ${t(kelpDensityLabel)} ${payload['x']}`}
                    />
                  </>
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OceanLifeExplorer;
