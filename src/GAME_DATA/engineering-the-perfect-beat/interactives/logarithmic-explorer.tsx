import React, { useState, useEffect, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  Label,
} from 'recharts';
import interaction from '../configs/logarithmic-explorer';
import { useTranslations } from '../../../hooks/useTranslations';
import { SoundPressureData } from './interface';
import { useEventListener } from '../../../hooks/useEventListener';

const SoundPressureViz: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'linear' | 'log'>('linear');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLogIndex, setCurrentLogIndex] = useState(0); // Keep in sync with currentIndex
  const containerRef = useRef<HTMLDivElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);
  const [focusedPoint, setFocusedPoint] = useState<{ cx: number; cy: number; payload: SoundPressureData } | null>(
    null,
  );
  const [chartHeight, setChartHeight] = useState(450);
  const { t } = useTranslations();
  const { payload } = useEventListener('logarithmic-explorer');

  const data: SoundPressureData[] = Array.from({ length: 6 }, (_, i) => {
    const index = (i + 1).toString();
    return {
      source: t(interaction.data[`source${index}` as keyof typeof interaction.data] as string),
      pressure: interaction.data[`pressure${index}` as keyof typeof interaction.data] as number,
      scaled: interaction.data[`scaled${index}` as keyof typeof interaction.data] as number,
      log: interaction.data[`log${index}` as keyof typeof interaction.data] as number,
    };
  });

  const maxY = Math.max(...data.map((item) => item.pressure));
  const ticks = Array.from({ length: Math.ceil(maxY / 0.0000001) + 1 }, (_, i) => i * 0.0000001);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight) {
        setChartHeight(window.innerHeight - 230);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerHeight]);

  useEffect(() => {
    if (activeTab === 'linear' && containerRef.current) {
      const { current } = containerRef;
      const currentValue = data[currentIndex].pressure;
      const maxValue = maxY;
      const containerHeight = 450;
      const totalHeight = 50000;

      const proportion = 1 - currentValue / maxValue;
      const scrollPosition = Math.max(
        0,
        Math.min(totalHeight - containerHeight, proportion * (totalHeight - containerHeight)),
      );

      current.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }

    // Announce changes to screen readers
    if (announcementRef.current) {
      const currentData = activeTab === 'linear' ? data[currentIndex] : data[currentLogIndex];
      announcementRef.current.textContent = `${t(interaction.currentSelection)}: ${currentData.source}, ${formatPressure(currentData.pressure)}`;
    }
  }, [currentIndex, currentLogIndex, activeTab, data, maxY]);

  // Listen for tab changes from sceneData events
  useEffect(() => {
    if (payload && typeof payload === 'object' && 'tab' in payload) {
      setActiveTab(payload.tab as 'linear' | 'log');
    }
  }, [payload]);

  // Keep both indices in sync when switching tabs
  useEffect(() => {
    if (activeTab === 'log') {
      setCurrentLogIndex(currentIndex);
    } else {
      setCurrentIndex(currentLogIndex);
    }
  }, [activeTab]);

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : data.length - 1;
    setCurrentIndex(newIndex);
    setCurrentLogIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setCurrentLogIndex(newIndex);
  };

  const handleLogPrevious = () => {
    const newIndex = currentLogIndex > 0 ? currentLogIndex - 1 : data.length - 1;
    setCurrentLogIndex(newIndex);
    setCurrentIndex(newIndex);
  };

  const handleLogNext = () => {
    const newIndex = currentLogIndex < data.length - 1 ? currentLogIndex + 1 : 0;
    setCurrentLogIndex(newIndex);
    setCurrentIndex(newIndex);
  };

  const formatScientificNotation = (value: number): string => {
    if (value === 0) return '0';

    const exponent = Math.floor(Math.log10(Math.abs(value)));
    const coefficient = value / Math.pow(10, exponent);
    const superscriptMap: { [key: string]: string } = {
      0: '⁰',
      1: '¹',
      2: '²',
      3: '³',
      4: '⁴',
      5: '⁵',
      6: '⁶',
      7: '⁷',
      8: '⁸',
      9: '⁹',
      '-': '⁻',
    };

    const exponentStr = String(exponent)
      .split('')
      .map((char) => superscriptMap[char as keyof typeof superscriptMap] || char)
      .join('');

    return `${coefficient.toFixed(2)} × 10${exponentStr}`;
  };
  const formatPressure = (value?: number): string => {
    if (value === undefined) return 'N/A';
    return `${formatScientificNotation(value)} psi`;
  };

  const ChevronLeft = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );

  const ChevronRight = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setCurrentIndex(index);
    }
  };
  const logContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full">
      {/* Screen reader announcements */}
      <div ref={announcementRef} aria-live="polite" className="sr-only" aria-atomic="true" />

      <div>
        <div className="border-b">
          <div className="flex items-center justify-between">
            {/* Accessible tab list */}
            <div role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === 'linear'}
                aria-controls="linear-tabpanel"
                id="linear-tab"
                className={`px-4 ${activeTab === 'linear' ? 'border-b-2 border-blue-500 text-blue-700' : ''}`}
                onClick={() => setActiveTab('linear')}
              >
                {t(interaction.tabs.linear)}
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'log'}
                aria-controls="log-tabpanel"
                id="log-tab"
                className={`px-4 ${activeTab === 'log' ? 'border-b-2 border-blue-500 text-blue-700' : ''}`}
                onClick={() => setActiveTab('log')}
              >
                {t(interaction.tabs.log)}
              </button>
            </div>

            {activeTab === 'linear' && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handlePrevious}
                  className="rounded-full hover:bg-gray-100"
                  aria-label={`${t(interaction.previous)} ${t(interaction.soundSource)}`}
                >
                  <ChevronLeft />
                </button>
                <span className="text-base font-medium">
                  {data[currentIndex].source} ({formatPressure(data[currentIndex].pressure)})
                </span>
                <button
                  onClick={handleNext}
                  className="rounded-full hover:bg-gray-100"
                  aria-label={`${t(interaction.next)} ${t(interaction.soundSource)}`}
                >
                  <ChevronRight />
                </button>
              </div>
            )}
            {activeTab === 'log' && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLogPrevious}
                  className="rounded-full hover:bg-gray-100"
                  aria-label={`${t(interaction.previous)} ${t(interaction.soundSource)}`}
                >
                  <ChevronLeft />
                </button>
                <span className="text-base font-medium">
                  {data[currentLogIndex].source} ({formatPressure(data[currentLogIndex].pressure)})
                </span>
                <button
                  onClick={handleLogNext}
                  className="rounded-full hover:bg-gray-100"
                  aria-label={`${t(interaction.next)} ${t(interaction.soundSource)}`}
                >
                  <ChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          {/* Linear scale tab panel */}
          <div role="tabpanel" id="linear-tabpanel" aria-labelledby="linear-tab" tabIndex={0}>
            {activeTab === 'linear' && (
              <div>
                <div>
                  <div
                    ref={containerRef}
                    className="overflow-x-auto overflow-y-auto"
                    style={{ height: chartHeight }}
                  >
                    <div style={{ height: '50000px', minWidth: '600px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={data}
                          margin={{ top: 30, right: 50, left: 65, bottom: 50 }}
                          aria-label={t(interaction.graphDescription2)}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                          <XAxis
                            dataKey="source"
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            interval={0}
                            label={{ value: t(interaction.soundSource), position: 'bottom', offset: 30 }}
                          />
                          <YAxis
                            domain={[0, maxY]}
                            height={100}
                            width={82}
                            ticks={ticks}
                            tickFormatter={(value) => formatScientificNotation(value)}
                            label={{
                              value: `${t(interaction.scaledPressure)} (psi)`,
                              angle: -90,
                              position: 'left',
                              offset: 20,
                            }}
                          />
                          <Tooltip
                            content={({ active, payload, label }) => {
                              if (active || focusedPoint) {
                                const xValue = focusedPoint ? focusedPoint.payload.source : label;
                                const tooltipPayload = focusedPoint
                                  ? [
                                      {
                                        color: '#2563eb',
                                        value: focusedPoint.payload.pressure,
                                        yLabel: t(interaction.scaledPressure),
                                      },
                                    ]
                                  : payload;

                                return (
                                  <div
                                    className="bg-white p-2 shadow-lg rounded"
                                    role="tooltip"
                                    aria-live="polite"
                                  >
                                    <p>{`${t(interaction.soundSource)}: ${xValue}`}</p>
                                    {tooltipPayload?.map((item, index) => (
                                      <div
                                        className="text-m mb-1"
                                        style={{ color: item.color }}
                                        key={`tooltip-${index}`}
                                      >
                                        <p>{`${t(interaction.scaledPressure)}: ${formatPressure(Number(item.value))}`}</p>
                                      </div>
                                    ))}
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Line type="monotone" dataKey="pressure" stroke="#2563eb" strokeWidth={2} dot={false} />
                          {data.map((entry, index) => (
                            <ReferenceDot
                              key={entry.source}
                              x={entry.source}
                              y={entry.pressure}
                              r={4}
                              fill="#2563eb"
                              stroke="none"
                              tabIndex={0}
                              role="button"
                              aria-label={`${t(interaction.dataPointFor)} ${entry.source}, ${formatPressure(entry.pressure)}`}
                              onKeyDown={(e) => handleKeyDown(e as React.KeyboardEvent, index)}
                              onFocus={() => {
                                const chartRect = containerRef.current?.getBoundingClientRect();
                                if (chartRect) {
                                  const xScale = (chartRect.width - 40) / 100;
                                  const yScale = (chartRect.height - 40) / 24;
                                  const cx = entry.pressure * xScale;
                                  const cy = chartRect.height - entry.pressure * yScale;
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
                            ></ReferenceDot>
                          ))}

                          <ReferenceDot
                            x={data[currentIndex].source}
                            y={data[currentIndex].pressure}
                            r={8}
                            fill="#ef4444"
                            stroke="none"
                            tabIndex={0}
                            role="button"
                            aria-label={`${data[currentIndex].source}, ${data[currentIndex].pressure}`}
                          >
                            <Label
                              value={data[currentIndex].source}
                              position="top"
                              offset={5}
                              fill="#ef4444"
                              fontWeight="bold"
                            />
                          </ReferenceDot>
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                <div className="text-base text-gray-600">{t(interaction.descriptions.linear)}</div>
              </div>
            )}
          </div>

          {/* Log scale tab panel */}

          <div
            ref={logContainerRef}
            role="tabpanel"
            id="log-tabpanel"
            aria-labelledby="log-tab"
            tabIndex={0}
            hidden={activeTab !== 'log'}
          >
            {activeTab === 'log' && (
              <div>
                <div style={{ height: chartHeight }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data}
                      margin={{ top: 25, right: 50, left: 65, bottom: 50 }}
                      aria-label={t(interaction.graphDescription1)}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis
                        dataKey="source"
                        height={120}
                        angle={-45}
                        textAnchor="end"
                        interval={0}
                        label={{ value: t(interaction.soundSource), position: 'bottom', offset: 30 }}
                      />
                      <YAxis
                        dataKey="scaled"
                        scale="log"
                        domain={[1, 'auto']}
                        label={{
                          value: t(interaction.logarithmicScale),
                          angle: -90,
                          position: 'middle',
                          dx: -50,
                        }}
                      />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active || focusedPoint) {
                            const xValue = focusedPoint ? focusedPoint.payload.source : label;
                            const tooltipPayload = focusedPoint
                              ? [
                                  {
                                    color: '#2563eb',
                                    value: focusedPoint.payload.scaled,
                                    yLabel: t(interaction.scaledPressure),
                                  },
                                ]
                              : payload;

                            return (
                              <div className="bg-white p-2 shadow-lg rounded" role="tooltip" aria-live="polite">
                                <p>{`${t(interaction.soundSource)}: ${xValue}`}</p>
                                {tooltipPayload?.map((item, index) => (
                                  <div
                                    className="text-m mb-1"
                                    style={{ color: item.color }}
                                    key={`tooltip-${index}`}
                                  >
                                    <p>{`${t(interaction.scaledPressure)}: ${Number(item.value).toFixed(2)}`}</p>
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
                                left: `${Math.max(
                                  -30,
                                  Math.min(
                                    focusedPoint.cx - 300,
                                    logContainerRef.current ? logContainerRef.current.clientWidth - 550 : 0,
                                  ),
                                )}px`,
                                top: `${Math.max(10, Math.min(focusedPoint.cy - 700, chartHeight - 120))}px`,
                                maxWidth: '250px',
                                zIndex: 1000,
                                pointerEvents: 'none',
                              }
                            : {}
                        }
                      />
                      <Line type="monotone" dataKey="scaled" stroke="#2563eb" strokeWidth={2} dot={false} />
                      {data.map((entry, index) => (
                        <ReferenceDot
                          key={entry.source}
                          x={entry.source}
                          y={entry.scaled}
                          r={4}
                          fill="#2563eb"
                          stroke="none"
                          tabIndex={0}
                          role="button"
                          aria-label={`${t(interaction.dataPointFor)} ${entry.source}, ${formatPressure(entry.pressure)}`}
                          onFocus={() => {
                            if (!logContainerRef.current) return;

                            const containerRect = logContainerRef.current.getBoundingClientRect();
                            const xInterval = containerRect.width / (data.length - 1);
                            const yMax = Math.max(...data.map((d) => d.scaled));

                            const cx = containerRect.left + index * xInterval;
                            const cy =
                              containerRect.top +
                              containerRect.height -
                              (entry.scaled / yMax) * containerRect.height;

                            setFocusedPoint({
                              cx,
                              cy,
                              payload: entry,
                            });
                          }}
                          onBlur={() => setFocusedPoint(null)}
                          onKeyDown={(e) => handleKeyDown(e as React.KeyboardEvent, index)}
                        />
                      ))}

                      <ReferenceDot
                        x={data[currentLogIndex].source}
                        y={data[currentLogIndex].scaled}
                        r={8}
                        fill="#ef4444"
                        stroke="none"
                        tabIndex={0}
                        role="button"
                        aria-label={`${data[currentLogIndex].source}, ${data[currentLogIndex].pressure}`}
                      >
                        <Label
                          value={data[currentLogIndex].source}
                          position="top"
                          offset={5}
                          fill="#ef4444"
                          fontWeight="bold"
                        />
                      </ReferenceDot>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-base text-gray-600">{t(interaction.descriptions.log)}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundPressureViz;
