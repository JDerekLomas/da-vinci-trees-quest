/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import { useTranslations } from '../../../hooks/useTranslations';
import parse from 'html-react-parser';

const CustomSlider = ({
  value,
  onChange,
  min,
  max,
  step,
  label,
  unit,
}: {
  value: number;
  onChange: any;
  min: number;
  max: number;
  step: number;
  label: string;
  unit: string;
}) => {
  const { t } = useTranslations();
  return (
    <div className="space-y-2" role="region" aria-labelledby="slider-label">
      <div className="flex justify-between items-center" role="group">
        <label className="block text-lg font-semibold mb-2" htmlFor="accessible-slider" id="slider-label">
          {label}
        </label>
        <span className="px-3 py-1 text-md font-medium rounded-full">
          {value} <span aria-hidden="true">{unit}</span>
          <span className="sr-only">{t('scenes.common.mph')}</span>
        </span>
      </div>
      <input
        id="accessible-slider"
        type="range"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        min={min}
        max={max}
        step={step}
        aria-labelledby="slider-label"
        className="w-full global-slider"
        style={{
          background: `linear-gradient(to right, #006BE0 0%, #006BE0 ${((value - min) / (max - min)) * 100}%, #949494 ${((value - min) / (max - min)) * 100}%, #949494 100%)`,
        }}
      />
    </div>
  );
};

const DroneSpeedVsFlightTimeGraph = ({
  onInteraction,
}: {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}) => {
  const { t } = useTranslations();
  const [selectedSpeed, setSelectedSpeed] = useState(7);

  const prevSelectedSpeed = useRef(selectedSpeed);

  useEffect(() => {
    if (prevSelectedSpeed.current !== selectedSpeed) {
      onInteraction({
        'drone-speed-captured': true,
      });
    }
    prevSelectedSpeed.current = selectedSpeed;
  }, [selectedSpeed]);

  const calculatePowerConsumption = (speed: number) => {
    return 0.0788 * Math.pow(speed + 5, 3);
  };

  const generateData = () => {
    const data = [];
    for (let speed = 6; speed <= 13.5; speed += 0.5) {
      const powerConsumption = calculatePowerConsumption(speed);
      data.push({
        speed,
        powerConsumption: powerConsumption,
      });
    }
    return data;
  };

  const chartData = useMemo(() => generateData(), []);

  const currentPowerConsumption = calculatePowerConsumption(selectedSpeed);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div className="bg-white">
          <div>
            <CustomSlider
              label={t('scenes.S9.S9_D0_FX_C9.labels.drone_speed')}
              unit={t('scenes.S9.S9_D0_FX_C9.units.mph')}
              value={selectedSpeed}
              onChange={setSelectedSpeed}
              min={6}
              max={13.5}
              step={0.5}
            />
          </div>
        </div>

        <div className="w-full">
          <div className="bg-white">
            <h3 className="text-lg font-semibold mb-4">{t('scenes.S9.S9_D0_FX_C9.labels.power_consumption')}</h3>
            <div className="mb-2">
              <div className="text-center mb-2" aria-hidden="true">
                <span className="text-2xl">
                  {parse(t('scenes.S9.S9_D0_FX_C9.labels.formula_title'))}
                  <sup>3</sup>
                </span>
              </div>
              <span className="sr-only">{t('scenes.S9.S9_D0_FX_C9.labels.formula_aria_label')}</span>
              <p className="text-center text-lg">{parse(t('scenes.S9.S9_D0_FX_C9.labels.formula_explanation'))}</p>
            </div>
          </div>
        </div>

        <div className="w-full flex items-start gap-x-4">
          <div className="bg-white w-full">
            <h3 className="text-lg font-semibold mb-4">{t('scenes.S9.S9_D0_FX_C9.labels.speed_vs_power')}</h3>
            <div className="flex flex-row gap-10 justify-self-center mb-4 rounded-lg text-md">
              <p className="font-bold">
                {t('scenes.S9.S9_D0_FX_C9.labels.selected_speed_prefix') + ' '}
                <span className="min-w-[80px] inline-block">
                  {selectedSpeed} <span aria-hidden="true">{t('scenes.S9.S9_D0_FX_C9.units.mph')}</span>
                  <span className="sr-only">{t('scenes.common.mph')}</span>
                </span>
              </p>
              <p className="font-bold">
                {t('scenes.S9.S9_D0_FX_C9.labels.power_consumption_prefix') + ' '}
                <span className="min-w-[80px] inline-block">
                  {currentPowerConsumption.toFixed(2)}{' '}
                  <span aria-hidden="true">{t('scenes.S9.S9_D0_FX_C9.units.watts')}</span>
                  <span className="sr-only">{t('scenes.common.watts')}</span>
                </span>
              </p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
                  <XAxis
                    dataKey="speed"
                    label={{
                      value: t('scenes.S9.S9_D0_FX_C9.labels.speed_label'),
                      position: 'insideBottom',
                      offset: -10,
                      fill: '#000000',
                    }}
                    domain={[6, 13]}
                    ticks={[6, 7, 8, 9, 10, 11, 12, 13]}
                    stroke="#000000"
                  />
                  <YAxis
                    label={{
                      value: parse(t('scenes.S9.S9_D0_FX_C9.labels.power_label')),
                      angle: -90,
                      position: 'insideLeft',
                      offset: 4,
                      dy: 110,
                      fill: '#000000',
                    }}
                    domain={[0, 'auto']}
                    stroke="#000000"
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      value.toFixed(2),
                      t('scenes.S9.S9_D0_FX_C9.labels.power_label'),
                    ]}
                    labelFormatter={(value) => parse(t('scenes.S9.S9_D0_FX_C9.labels.speed_label')) + ': ' + value}
                  />
                  <Line
                    type="monotone"
                    dataKey="powerConsumption"
                    stroke="#006BE0"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 8 }}
                    name="Power Consumption"
                    fill="#000000"
                  />
                  <ReferenceDot
                    x={selectedSpeed}
                    y={calculatePowerConsumption(selectedSpeed)}
                    r={8}
                    fill="#006BE0"
                    stroke="white"
                    strokeWidth={2}
                  />
                  {chartData.map((entry, index) =>
                    entry.speed === selectedSpeed ? (
                      <line
                        key={`marker-${index}`}
                        x1={0}
                        y1={0}
                        x2={0}
                        y2={0}
                        stroke="none"
                        strokeWidth={0}
                        strokeDasharray="3 3"
                        fill="#000000"
                      >
                        <animate
                          attributeName="x1"
                          from={0}
                          to={((selectedSpeed - 10) / 10) * 100 + '%'}
                          dur="0.5s"
                          fill="#000000"
                        />
                        <animate
                          attributeName="x2"
                          from={0}
                          to={((selectedSpeed - 10) / 10) * 100 + '%'}
                          dur="0.5s"
                          fill="#000000"
                        />
                        <animate attributeName="y1" from={0} to={0} dur="0.5s" fill="#000000" />
                        <animate attributeName="y2" from={0} to={'100%'} dur="0.5s" fill="#000000" />
                        <animate attributeName="stroke" from="none" to="#E0002B" dur="0.5s" fill="#000000" />
                        <animate attributeName="strokeWidth" from={0} to={2} dur="0.5s" fill="#000000" />
                      </line>
                    ) : null,
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DroneSpeedVsFlightTimeGraph;
