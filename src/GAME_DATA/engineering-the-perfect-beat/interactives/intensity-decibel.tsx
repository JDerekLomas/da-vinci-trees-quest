import React, { useState, useCallback, useEffect, useRef } from 'react';
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
import intensityConfig from '../configs/intensity-decibel';
import { IntensityData } from './interface';
import '../../../shared/slider.css';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';

const DbIntensityChart: React.FC = () => {
  const { t } = useTranslations();
  const [axesFlipped, setAxesFlipped] = useState(true);
  const [intensityValue, setIntensityValue] = useState(1);
  const [dbValue, setDbValue] = useState(0);
  const [focusedPoint, setFocusedPoint] = useState<{ cx: number; cy: number; payload: IntensityData } | null>(
    null,
  );
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { payload } = useEventListener('intensity-decibel');

  const generateData = useCallback(() => {
    const data: IntensityData[] = [];

    if (axesFlipped) {
      // When axes flipped: dB on X-axis, use fixed iteration count to avoid floating-point issues
      for (let i = 0; i <= 200; i++) {
        // 201 points from 0 to 20 dB
        const db = (i / 200) * 20; // This ensures we get exactly 20.0
        const intensity = Math.pow(10, db / 10);
        data.push({
          intensity: Number(intensity.toFixed(2)),
          decibels: Number(db.toFixed(1)),
        });
      }
    } else {
      // Normal: intensity on X-axis, generate data by intensity increments
      for (let i = 1; i <= 100; i += 0.5) {
        const db = 10 * Math.log10(i);
        data.push({
          intensity: Number(i.toFixed(2)),
          decibels: Number(db.toFixed(1)),
        });
      }
    }
    return data;
  }, [axesFlipped]);

  const data = generateData();

  const handleIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setIntensityValue(value);
    setDbValue(Number((10 * Math.log10(value)).toFixed(1)));
  };

  const handleDbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setDbValue(value);
    setIntensityValue(Number(Math.pow(10, value / 10).toFixed(2)));
  };

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #e0e0e0 ${percent}%)`;
  }, []);

  useEffect(() => {
    const intensitySlider = document.getElementById('slider-intensity') as HTMLInputElement;
    const decibelSlider = document.getElementById('slider-decibels') as HTMLInputElement;

    if (!axesFlipped && intensitySlider) {
      updateSliderBackground(intensitySlider);
    } else if (axesFlipped && decibelSlider) {
      updateSliderBackground(decibelSlider);
    }
  }, [intensityValue, dbValue, updateSliderBackground, axesFlipped]);

  // Listen for axis flipping from sceneData events
  useEffect(() => {
    if (payload && typeof payload === 'object' && 'flipAxes' in payload) {
      setAxesFlipped(payload.flipAxes as boolean);
    }
  }, [payload]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIntensityValue(data[index].intensity);
      setDbValue(data[index].decibels);
    }
  };

  const ArrowRightLeft = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4 4-4M17 8l4 4-4 4M3 12h18" />
    </svg>
  );

  return (
    <div className="w-full max-w-4xl" ref={chartContainerRef}>
      <div className="sr-only" aria-live="polite">
        {axesFlipped ? t(intensityConfig.equations.intensity) : t(intensityConfig.equations.decibel)}
      </div>
      <p
        className="text-2xl font-besley text-center"
        aria-hidden="true"
        role="text"
        aria-label={
          axesFlipped
            ? t(intensityConfig.formulas.dbToIntensityAriaLabel)
            : t(intensityConfig.formulas.intensityToDbAriaLabel)
        }
      >
        {axesFlipped ? (
          <>
            <span style={{ color: '#0061FC' }}>
              <i>I</i>
            </span>{' '}
            ={' '}
            <span style={{ color: '#633300' }}>
              <i>I</i>
            </span>
            <sub style={{ color: '#633300' }}>0</sub> × <span style={{ color: '#DB0072' }}>10</span>
            <sup>
              (
              <div
                style={{
                  display: 'inline-block',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  margin: '0 2px',
                  fontSize: '12px',
                }}
              >
                <div
                  style={{
                    display: 'block',
                    borderBottom: '1px solid #374151',
                    paddingBottom: '2px',
                    lineHeight: '1.2',
                  }}
                >
                  <span style={{ color: '#E0002B' }}>
                    <i>dB</i>
                  </span>
                </div>
                <div style={{ display: 'block', paddingTop: '2px', lineHeight: '1.2' }}>
                  <span style={{ color: '#DB0072' }}>10</span>
                </div>
              </div>
              )
            </sup>
          </>
        ) : (
          <>
            <span style={{ color: '#E0002B' }}>
              <i>dB</i>
            </span>{' '}
            = <span style={{ color: '#DB0072' }}>10</span> ×{' '}
            <span style={{ color: '#8E24AA' }}>
              log
              <sub>10</sub>
            </span>{' '}
            (
            <div
              style={{
                display: 'inline-block',
                textAlign: 'center',
                verticalAlign: 'middle',
                margin: '0 2px',
                fontSize: '12px',
              }}
            >
              <div
                style={{
                  display: 'block',
                  borderBottom: '1px solid #374151',
                  paddingBottom: '2px',
                  lineHeight: '1.2',
                }}
              >
                <span style={{ color: '#0061FC' }}>
                  <i>I</i>
                </span>
              </div>
              <div style={{ display: 'block', paddingTop: '2px', lineHeight: '1.2' }}>
                <span style={{ color: '#633300' }}>
                  <i>I</i>
                </span>
                <sub style={{ color: '#633300' }}>0</sub>
              </div>
            </div>
            )
          </>
        )}
      </p>

      {/* Slider controls and flip button */}
      <div className="flex items-center justify-between">
        <div className="flex-1 mr-8">
          {!axesFlipped ? (
            <div>
              <label
                className="block mb-2"
                aria-label={t(intensityConfig.sliders.intensity.label)}
                aria-hidden="true"
              >
                {t(intensityConfig.sliders.intensity.label)}{' '}
                <span className="font-besley" aria-hidden="true">
                  (
                  <div
                    style={{
                      display: 'inline-block',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      margin: '0 2px',
                      fontSize: '12px',
                    }}
                  >
                    <div
                      style={{
                        display: 'block',
                        borderBottom: '1px solid #374151',
                        paddingBottom: '2px',
                        lineHeight: '1.2',
                      }}
                    >
                      <i>
                        <span style={{ color: '#0061FC' }}>I</span>
                      </i>
                    </div>
                    <div style={{ display: 'block', paddingTop: '2px', lineHeight: '1.2' }}>
                      <i>
                        <span style={{ color: '#633300' }}>I</span>
                      </i>
                      <sub>
                        <span style={{ color: '#633300' }}>0</span>
                      </sub>
                    </div>
                  </div>
                  )
                </span>
                : {intensityValue}
              </label>
              <input
                id="slider-intensity"
                type="range"
                min={intensityConfig.sliders.intensity.min}
                max={intensityConfig.sliders.intensity.max}
                step={intensityConfig.sliders.intensity.step}
                value={intensityValue}
                onChange={handleIntensityChange}
                className="global-slider"
                aria-label={t(intensityConfig.sliders.intensity.label)}
              />
              <p className="mt-2 text-gray-600" aria-hidden="true">
                {t(intensityConfig.corresponding)}{' '}
                <span className="font-besley">
                  <i>
                    <span style={{ color: '#E0002B' }}>dB</span>
                  </i>
                </span>
                : {dbValue} dB
              </p>
            </div>
          ) : (
            <div>
              <label className="block mb-2" aria-hidden="true">
                {t(intensityConfig.sliders.decibels.label)} (dB): {dbValue}
              </label>
              <input
                id="slider-decibels"
                type="range"
                min={intensityConfig.sliders.decibels.min}
                max={intensityConfig.sliders.decibels.max}
                step={intensityConfig.sliders.decibels.step}
                value={dbValue}
                onChange={handleDbChange}
                className="global-slider"
                aria-label={t(intensityConfig.sliders.decibels.label)}
              />
              <p className="mt-2 text-gray-600" aria-hidden="true">
                {t(intensityConfig.corresponding)}{' '}
                <span className="font-besley">
                  <div
                    style={{
                      display: 'inline-block',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      margin: '0 2px',
                      fontSize: '12px',
                    }}
                  >
                    <div
                      style={{
                        display: 'block',
                        borderBottom: '1px solid #374151',
                        paddingBottom: '2px',
                        lineHeight: '1.2',
                      }}
                    >
                      <i>
                        <span style={{ color: '#0061FC' }}>I</span>
                      </i>
                    </div>
                    <div style={{ display: 'block', paddingTop: '2px', lineHeight: '1.2' }}>
                      <i>
                        <span style={{ color: '#633300' }}>I</span>
                      </i>
                      <sub>
                        <span style={{ color: '#633300' }}>0</span>
                      </sub>
                    </div>
                  </div>
                </span>
                : {intensityValue}
              </p>
            </div>
          )}
        </div>
        <button
          onClick={() => setAxesFlipped(!axesFlipped)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
          aria-label={t(intensityConfig.flipButton.label)}
        >
          <ArrowRightLeft />
          {t(intensityConfig.flipButton.label)}
        </button>
        <div className="sr-only" aria-live="polite">
          {axesFlipped
            ? `${t(intensityConfig.sliders.decibels.label)}: ${dbValue} dB, ${t(
                intensityConfig.corresponding,
              )} ${t(intensityConfig.sliders.intensity.label)}: ${intensityValue}`
            : `${t(intensityConfig.sliders.intensity.label)}: ${intensityValue}, ${t(
                intensityConfig.corresponding,
              )} ${t(intensityConfig.sliders.decibels.label)}: ${dbValue} dB`}
        </div>
      </div>

      {/* Graph container */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={axesFlipped ? 'decibels' : 'intensity'}
              label={{
                value: axesFlipped ? t(intensityConfig.axes.decibels) : t(intensityConfig.axes.intensity),
                position: 'bottom',
                offset: 0,
              }}
              type="number"
              domain={axesFlipped ? [0, 20] : [1, 100]}
              tickCount={axesFlipped ? 6 : undefined}
            />
            <YAxis
              dataKey={axesFlipped ? 'intensity' : 'decibels'}
              label={{
                value: axesFlipped ? t(intensityConfig.axes.intensity) : t(intensityConfig.axes.decibels),
                angle: -90,
                position: 'middle',
                dx: -20,
              }}
              domain={axesFlipped ? [1, 100] : [0, 20]}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active || focusedPoint) {
                  const xValue = focusedPoint
                    ? focusedPoint.payload[axesFlipped ? 'decibels' : 'intensity']
                    : label;
                  const tooltipPayload = focusedPoint
                    ? [
                        {
                          color: '#2563eb',
                          value: focusedPoint.payload[axesFlipped ? 'intensity' : 'decibels'],
                          yLabel: axesFlipped ? 'Intensity' : 'Decibels',
                        },
                      ]
                    : payload;

                  return (
                    <div className="bg-white p-3 border rounded shadow-sm" role="tooltip" aria-hidden={!active}>
                      {axesFlipped ? (
                        <>
                          <div className="sr-only">
                            {t(intensityConfig.sliders.decibels.label)}
                            {': '}
                            {xValue}
                          </div>
                          <div aria-hidden="true">
                            {t(intensityConfig.axes.decibels)}: {xValue}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="sr-only">
                            {t(intensityConfig.sliders.intensity.label)}
                            {': '}
                            {xValue}
                          </div>
                          <span aria-hidden="true">
                            {t(intensityConfig.axes.intensityPlain)} (
                            <span className="font-besley">
                              <div
                                style={{
                                  display: 'inline-block',
                                  textAlign: 'center',
                                  verticalAlign: 'middle',
                                  margin: '0 2px',
                                  fontSize: '12px',
                                }}
                              >
                                <div
                                  style={{
                                    display: 'block',
                                    borderBottom: '1px solid #374151',
                                    paddingBottom: '2px',
                                    lineHeight: '1.2',
                                  }}
                                >
                                  <i>
                                    <span style={{ color: '#0061FC' }}>I</span>
                                  </i>
                                </div>
                                <div style={{ display: 'block', paddingTop: '2px', lineHeight: '1.2' }}>
                                  <i>
                                    <span style={{ color: '#633300' }}>I</span>
                                  </i>
                                  <sub>
                                    <span style={{ color: '#633300' }}>0</span>
                                  </sub>
                                </div>
                              </div>
                            </span>
                            ): {xValue}
                          </span>
                        </>
                      )}
                      {tooltipPayload?.map((item, index) => (
                        <div className="text-m mb-1" style={{ color: item.color }} key={`tooltip-${index}`}>
                          {axesFlipped ? (
                            <>
                              <div className="sr-only">
                                {t(intensityConfig.sliders.intensity.label)}
                                {': '}
                                {item.value}
                              </div>
                              <span aria-hidden="true">
                                {t(intensityConfig.axes.intensityPlain)} (
                                <span className="font-besley">
                                  <div
                                    style={{
                                      display: 'inline-block',
                                      textAlign: 'center',
                                      verticalAlign: 'middle',
                                      margin: '0 2px',
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: 'block',
                                        borderBottom: '1px solid #374151',
                                        paddingBottom: '2px',
                                        lineHeight: '1.2',
                                      }}
                                    >
                                      <i>
                                        <span style={{ color: '#0061FC' }}>I</span>
                                      </i>
                                    </div>
                                    <div style={{ display: 'block', paddingTop: '2px', lineHeight: '1.2' }}>
                                      <i>
                                        <span style={{ color: '#633300' }}>I</span>
                                      </i>
                                      <sub>
                                        <span style={{ color: '#633300' }}>0</span>
                                      </sub>
                                    </div>
                                  </div>
                                </span>
                                )
                              </span>
                              :
                            </>
                          ) : (
                            <>
                              <div className="sr-only">
                                {t(intensityConfig.sliders.decibels.label)}
                                {': '}
                                {item.value}
                              </div>
                              <span aria-hidden="true">{t(intensityConfig.axes.decibels)}</span>:
                            </>
                          )}{' '}
                          {Number(item.value).toFixed(2)}
                        </div>
                      ))}
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
                      transform: `translate(${focusedPoint.cx < 150 ? 10 : focusedPoint.cx - 120}px, ${
                        focusedPoint.cy < 120 ? 10 : focusedPoint.cy - 100
                      }px)`,
                      maxWidth: '250px',
                      zIndex: 1000,
                      pointerEvents: 'none',
                    }
                  : {}
              }
            />
            <Line type="monotone" dataKey={axesFlipped ? 'intensity' : 'decibels'} stroke="#2563eb" dot={false} />
            <ReferenceDot
              x={axesFlipped ? dbValue : intensityValue}
              y={axesFlipped ? intensityValue : dbValue}
              r={4}
              fill="red"
              stroke="none"
            />
            {data.map((entry, index) => (
              <ReferenceDot
                key={index}
                x={entry[axesFlipped ? 'decibels' : 'intensity']}
                y={entry[axesFlipped ? 'intensity' : 'decibels']}
                r={6}
                fill="transparent"
                stroke="none"
                tabIndex={0}
                role="button"
                aria-label={`${t(intensityConfig.dataPoint)}: ${t(intensityConfig.axes.intensityPlain)} ${entry.intensity}, ${t(
                  intensityConfig.axes.decibels,
                )} ${entry.decibels}`}
                onKeyDown={(e) => handleKeyDown(e as React.KeyboardEvent, index)}
                onFocus={() => {
                  const chartRect = chartContainerRef.current?.getBoundingClientRect();
                  if (chartRect) {
                    const xRange = axesFlipped ? 20 : 100;
                    const yRange = axesFlipped ? 100 : 20;
                    const xScale = (chartRect.width - 60) / xRange;
                    const yScale = (chartRect.height - 60) / yRange;
                    const cx =
                      30 + (entry[axesFlipped ? 'decibels' : 'intensity'] - (axesFlipped ? 0 : 1)) * xScale;
                    const cy =
                      chartRect.height -
                      30 -
                      (entry[axesFlipped ? 'intensity' : 'decibels'] - (axesFlipped ? 1 : 0)) * yScale;
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

      <div className="mt-4">
        <p className="text-base text-gray-600">
          {t(intensityConfig.note)}
          <span className="font-besley">
            <i>
              <span style={{ color: '#633300' }}>I</span>
            </i>
            <sub>
              <span style={{ color: '#633300' }}>0</span>
            </sub>
          </span>
          {t(intensityConfig.noteMsg)}
        </p>
      </div>
    </div>
  );
};

export default DbIntensityChart;
