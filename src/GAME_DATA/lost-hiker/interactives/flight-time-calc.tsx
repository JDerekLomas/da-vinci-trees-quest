/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts';
import { useTranslations } from '../../../hooks/useTranslations';
import parse from 'html-react-parser';

const FlightTimeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const DistanceIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const RangeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const TimeLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const TravelTimeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const SuccessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const FailureIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const DroneFlightTime: React.FC<{
  interaction: any;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}> = ({ interaction, onInteraction }) => {
  const { t } = useTranslations();
  const { ariaLabel, translations, speedInput, mission } = interaction;
  const [droneSpeed, setDroneSpeed] = useState<number>(speedInput.defaultValue);
  const [flightTime, setFlightTime] = useState<{ hours: number; minutes: number }>({ hours: 0, minutes: 0 });
  const [focusedPoint, setFocusedPoint] = useState<{ cx: number; cy: number; payload: any } | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const prevDroneSpeed = useRef(droneSpeed);

  useEffect(() => {
    if (prevDroneSpeed.current !== droneSpeed) {
      onInteraction({
        'flight-time-capture': true,
      });
    }
    prevDroneSpeed.current = droneSpeed;
  }, [droneSpeed]);

  const calculateFlightTime = useCallback((v: number) => {
    return 3776 / Math.pow(v + 5, 3);
  }, []);

  const chartData = useMemo(() => {
    const data = [];
    for (let speed = speedInput.min; speed <= speedInput.max; speed += 0.5) {
      data.push({
        speed,
        flightTime: calculateFlightTime(speed),
      });
    }
    return data;
  }, [calculateFlightTime, speedInput.min, speedInput.max]);

  const currentFlightTime = useMemo(() => calculateFlightTime(droneSpeed), [droneSpeed, calculateFlightTime]);

  useEffect(() => {
    const hours = Math.floor(currentFlightTime);
    const minutes = Math.floor((currentFlightTime - hours) * 60);
    setFlightTime({ hours, minutes });
  }, [currentFlightTime]);

  const totalDistance = useMemo(() => droneSpeed * currentFlightTime, [droneSpeed, currentFlightTime]);
  const travelTimeOneWay = useMemo(() => mission.distance / droneSpeed, [droneSpeed, mission.distance]);

  const isMissionSuccess = useMemo(() => {
    return totalDistance >= mission.roundtripDistance && travelTimeOneWay <= mission.maxTravelTime;
  }, [totalDistance, travelTimeOneWay, mission.roundtripDistance, mission.maxTravelTime]);

  const getMissionOutcomeMessage = useCallback(() => {
    if (isMissionSuccess) return t(translations.missionSuccess);
    if (totalDistance < mission.roundtripDistance) return t(translations.missionFailureRange);
    return t(translations.missionFailureTime);
  }, [isMissionSuccess, totalDistance, mission.roundtripDistance, t, translations]);

  const formatTime = useCallback((timeInHours: number) => {
    const hours = Math.floor(timeInHours);
    const minutes = Math.round((timeInHours - hours) * 60);
    return `<span aria-hidden='true'>${hours}h ${minutes}m</span><span className='sr-only'>${hours} ${t('scenes.common.hours')} ${t('scenes.common.and')} ${minutes} ${t('scenes.common.minutes')}</span>`;
  }, []);

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #3b82f6 ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    const speedSlider = document.getElementById(`slider-${speedInput.id}`) as HTMLInputElement;
    if (speedSlider) {
      updateSliderBackground(speedSlider);
    }
  }, [droneSpeed, updateSliderBackground, speedInput.id]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setDroneSpeed(chartData[index].speed);
    }
  };

  return (
    <div aria-label={t(ariaLabel)} className="max-w-4xl mx-auto mt-[-15px]" ref={chartContainerRef}>
      <div className="grid grid-cols-1 gap-6 mb-6">
        {/* Combined slider and mission status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Speed slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-base font-medium text-gray-700 mb-3" htmlFor={`slider-${speedInput.id}`}>
                {t(speedInput.label)}{' '}
                <span className="sr-only">{t('scenes.S11.S11_D0_FX_C9.translations.slider')}</span>
              </label>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-base font-medium rounded-full mb-3">
                {droneSpeed} <span aria-hidden="true">{t(translations.speedUnit)}</span>
                <span className="sr-only">{t('scenes.common.mph')}</span>
              </span>
            </div>
            <input
              id={`slider-${speedInput.id}`}
              type="range"
              value={droneSpeed}
              onChange={(e) => setDroneSpeed(Number(e.target.value))}
              min={speedInput.min}
              max={speedInput.max}
              step={speedInput.step}
              placeholder={speedInput.defaultValue}
              className="w-full global-slider"
            />
            <div className="flex justify-between text-base text-gray-700 px-1">
              <span className="sr-only">{t('scenes.S11.S11_D0_FX_C9.translations.minimum_speed')}</span>
              <span>{speedInput.min}</span>
              <span className="sr-only">{t('scenes.S11.S11_D0_FX_C9.translations.maximum_speed')}</span>
              <span>{speedInput.max}</span>
            </div>
          </div>

          {/* Mission status card */}
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: isMissionSuccess ? 'rgb(220, 252, 231)' : 'rgba(248, 113, 113, 0.1)',
            }}
          >
            <div className="flex items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full bg-white ${isMissionSuccess ? 'text-[#005F20]' : 'text-[#A6001A]'} mr-3`}
              >
                {isMissionSuccess ? <SuccessIcon /> : <FailureIcon />}
              </div>
              <div>
                <h4 className="font-medium text-lg">
                  {t(translations.missionStatus)}:{' '}
                  {isMissionSuccess ? t(translations.success) : t(translations.failure)}
                </h4>
                <p className="text-gray-600 text-base mt-1">{getMissionOutcomeMessage()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formula section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2" aria-hidden="true">
            <h3 className="text-lg font-medium text-gray-800 whitespace-nowrap">
              {t(translations.formulaTitle)}:
            </h3>
            <span className="text-lg sm:text-xl">
              <span className="font-besley italic" style={{ color: '#005F20' }}>
                t
              </span>{' '}
              ={' '}
              <div style={{ display: 'inline-block', verticalAlign: 'middle', textAlign: 'center' }}>
                <div style={{ padding: '5px 0', fontFamily: 'Besley', color: '#006BE0' }}>3,776</div>
                <div style={{ borderTop: '1px solid black', padding: '5px 0' }}>
                  (
                  <span className="font-besley italic" style={{ color: '#00749D' }}>
                    v
                  </span>{' '}
                  +{' '}
                  <span className="font-besley" style={{ color: '#266449' }}>
                    5
                  </span>
                  )³
                </div>
              </div>
            </span>
          </div>
          <span className="sr-only">{t('scenes.S11.S11_D0_FX_C9.translations.formula')}</span>
          <div className="text-base text-gray-700 mt-2">
            <p>
              {t(translations.formulaDescription1)}{' '}
              <span className="font-besley italic" style={{ color: '#005F20' }}>
                t
              </span>{' '}
              {t(translations.formulaDescription2)}{' '}
              <span className="font-besley italic" style={{ color: '#00749D' }}>
                v
              </span>{' '}
              {parse(t(translations.formulaDescription3))}
            </p>
          </div>
        </div>

        {/* Stats and chart */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Stats panel */}
          <div className="w-full lg:w-[40%]">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t(translations.currentStatsTitle)}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {/* Flight Time */}
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <FlightTimeIcon />
                </div>
                <span className="sr-only">{t('scenes.S11.S11_D0_FX_C9.translations.flightTimeIcon')}</span>
                <div>
                  <div className="text-base text-gray-700">{t(translations.flightTime)}</div>
                  <div className="text-lg font-bold text-gray-800">{parse(formatTime(currentFlightTime))}</div>
                </div>
              </div>

              {/* Target Distance */}
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <DistanceIcon />
                </div>
                <span className="sr-only">{t('scenes.S11.S11_D0_FX_C9.translations.distanceIcon')}</span>
                <div>
                  <div className="text-base text-gray-700">{t(translations.targetDistance)}</div>
                  <div className="text-lg font-bold text-gray-800">
                    {mission.distance} {t(translations.distanceUnit)}
                  </div>
                  <div className="text-base text-gray-700">
                    ({t(translations.roundtrip)}: {mission.roundtripDistance} {t(translations.distanceUnit)})
                  </div>
                </div>
              </div>

              {/* Max Range */}
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <RangeIcon />
                </div>
                <span className="sr-only">{t('scenes.S11.S11_D0_FX_C9.translations.rangeIcon')}</span>
                <div>
                  <div className="text-base text-gray-700">{t(translations.maxRange)}</div>
                  <div
                    className="text-lg font-bold"
                    style={{ color: totalDistance >= mission.roundtripDistance ? '#005F20' : '#A6001A' }}
                  >
                    {totalDistance.toFixed(1)} {t(translations.distanceUnit)}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <TimeLeftIcon />
                </div>
                <span className="sr-only">{t('scenes.S11.S11_D0_FX_C9.translations.timeLeftIcon')}</span>
                <div>
                  <div className="text-base text-gray-700">{parse(t(translations.timeLeft))}</div>
                  <div className="text-lg font-bold text-gray-800">
                    {parse(t('scenes.S11.S11_D0_FX_C9.translations.time_left'))}
                  </div>
                </div>
              </div>

              {/* Travel Time */}
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <TravelTimeIcon />
                </div>
                <span className="sr-only">{t('scenes.S11.S11_D0_FX_C9.translations.travelTimeIcon')}</span>
                <div>
                  <div className="text-base text-gray-700">{t(translations.travelTime)}</div>
                  <div
                    className="text-lg font-bold"
                    style={{ color: travelTimeOneWay <= mission.maxTravelTime ? '#005F20' : '#A6001A' }}
                  >
                    {parse(formatTime(travelTimeOneWay))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="w-full lg:w-[60%]">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t(translations.chartTitle)}</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="speed"
                    label={{
                      value: `${t(translations.speedLabel)} (${t('scenes.common.mph')})`,
                      position: 'bottom',
                      offset: 0,
                    }}
                    domain={[speedInput.min, speedInput.max]}
                    ticks={[6, 7, 8, 9, 10, 11, 12, 13]}
                  />
                  <YAxis
                    dataKey="flightTime"
                    label={{
                      value: `${t(translations.flightTime)} (${t(translations.hours)})`,
                      angle: -90,
                      position: 'middle',
                      dx: -30,
                    }}
                    domain={[0, 'auto']}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active || focusedPoint) {
                        const speed = focusedPoint ? focusedPoint.payload.speed : label;
                        const flightTime = focusedPoint ? focusedPoint.payload.flightTime : payload?.[0]?.value;

                        return (
                          <div className="bg-white p-3 border rounded shadow-sm" role="tooltip">
                            <div className="sr-only">
                              {t(translations.speedLabel)}: {speed} {t('scenes.common.mph')},
                              {t(translations.flightTime)}: {parse(formatTime(Number(flightTime)))}
                            </div>
                            <div aria-hidden="true">
                              <div className="text-base mb-1">
                                {t(translations.speedLabel)}: {speed} {t(translations.speedUnit)}
                              </div>
                              <div className="text-base" style={{ color: '#3b82f6' }}>
                                {t(translations.flightTime)}: {parse(formatTime(Number(flightTime)))}
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                    wrapperStyle={
                      focusedPoint
                        ? {
                            visibility: 'visible',
                            position: 'absolute',
                            transform: `translate(${focusedPoint.cx < 100 ? 10 : focusedPoint.cx - 50}px, ${
                              focusedPoint.cy < 100 ? 10 : focusedPoint.cy - 300
                            }px)`,
                            maxWidth: '250px',
                            zIndex: 1000,
                            pointerEvents: 'none',
                          }
                        : {}
                    }
                  />
                  <Line type="monotone" dataKey="flightTime" stroke="#3b82f6" strokeWidth={3} dot={false} />
                  <ReferenceDot
                    x={droneSpeed}
                    y={calculateFlightTime(droneSpeed)}
                    r={6}
                    fill="#2563eb"
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                  {chartData.map((entry, index) => (
                    <ReferenceDot
                      key={index}
                      x={entry.speed}
                      y={entry.flightTime}
                      r={8}
                      fill="transparent"
                      stroke="none"
                      tabIndex={0}
                      role="button"
                      aria-label={`${t(translations.speedLabel)}: ${entry.speed} ${t('scenes.common.mph')}, ${t(
                        translations.flightTime,
                      )}: ${flightTime.hours} ${t('scenes.common.hours')} ${t('scenes.common.and')} ${flightTime.minutes} ${t('scenes.common.minutes')}`}
                      onKeyDown={(e) => handleKeyDown(e as React.KeyboardEvent, index)}
                      onFocus={() => {
                        const chartRect = chartContainerRef.current?.getBoundingClientRect();
                        if (chartRect) {
                          const xScale = (chartRect.width - 40) / (speedInput.max - speedInput.min);
                          const yScale = (chartRect.height - 40) / 3;
                          const cx = (entry.speed - speedInput.min) * xScale;
                          const cy = chartRect.height - entry.flightTime * yScale;
                          setFocusedPoint({
                            cx,
                            cy,
                            payload: entry,
                          });
                        }
                      }}
                      onBlur={() => {
                        setFocusedPoint(null);
                      }}
                      onMouseEnter={() => setFocusedPoint(null)}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DroneFlightTime;
