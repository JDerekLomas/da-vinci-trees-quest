import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useGameContext } from '../../../hooks/useGameContext';
import { useEventListener } from '../../../hooks/useEventListener';
import interactive1Config from '../configs/interactive-1';
import { format } from './utils';
import { useTranslations } from '../../../hooks/useTranslations';

interface SliderProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface SlimeTimeExponentialGrowthProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

interface Payload {
  target: string;
  step: number;
}

const SlimeTimeExponentialGrowth = ({ onInteraction }: SlimeTimeExponentialGrowthProps) => {
  const { t } = useTranslations();
  const { totalSteps, translations } = interactive1Config;
  const { slide1, slide2, slide3 } = translations;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const { dialogIndex } = useGameContext();
  const { payload } = useEventListener('interactive-1') as { payload: Payload };

  const [step, setStep] = useState(dialogIndex === 1 ? 1 : totalSteps);
  const [initialRevenue, setInitialRevenue] = useState(20);
  const [projectionYears, setProjectionYears] = useState(2);
  const [customGrowthRate, setCustomGrowthRate] = useState(9900);
  const [unitPrice, setUnitPrice] = useState(5);
  const [showRealisticGrowth, setShowRealisticGrowth] = useState(false);

  const currentSlide = useRef(1);

  useEffect(() => {
    if (projectionYears === 5) {
      onInteraction({
        'set-years': true,
      })
    } else {
      onInteraction({
        'set-years': false,
      })
    }

    if (showRealisticGrowth) {
      onInteraction({
        'show-realistic-growth': true,
      })
    } else {
      onInteraction({
        'show-realistic-growth': false,
      })
    }
  }, [onInteraction, projectionYears, showRealisticGrowth])

  // Check screen size for responsive legend
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // handle slide change
  useEffect(() => {
    if (payload && payload.step) {
      currentSlide.current = payload.step;
      setStep(payload.step);
    }
  }, [payload]);

  const nextSlide = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevSlide = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toLocaleString()}`;
  };

  const initialRevenueData = useMemo(
    () => [
      {
        year: 0,
        revenue: 20,
      },
      {
        year: 0.25,
        revenue: 63,
      },
      {
        year: 0.5,
        revenue: 200,
      },
      {
        year: 0.75,
        revenue: 632,
      },
      {
        year: 1,
        revenue: 2000,
      },
    ],
    [],
  );

  const formulaData = useMemo(() => {
    const data = [];
    for (let year = 0; year <= projectionYears; year++) {
      const value = initialRevenue * Math.pow(1 + customGrowthRate / 100, year);
      data.push({ year, revenue: Math.round(value) });
    }
    return data;
  }, [customGrowthRate, initialRevenue, projectionYears]);

  const comparisonData = useMemo(() => {
    const data = [];
    for (let year = 0; year <= projectionYears; year++) {
      const currentRate = initialRevenue * Math.pow(1 + customGrowthRate / 100, year);
      const realistic10 = initialRevenue * Math.pow(1.1, year);
      data.push({
        year,
        current: Math.round(currentRate),
        realistic: Math.round(realistic10),
      });
    }
    return data;
  }, [customGrowthRate, initialRevenue, projectionYears]);

  const handleFocus = (index: number | null) => {
    setActiveIndex(index);
    setIsKeyboardFocus(true);
  };

  const handleBlur = () => {
    setActiveIndex(null);
    setIsKeyboardFocus(false);
  };

  const handleMouseEnter = (index: number | null) => {
    setActiveIndex(index);
    setIsKeyboardFocus(false);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
    setIsKeyboardFocus(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Step Content */}
      {/* Step 1: Two-Year Growth */}
      {step === 1 && (
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <div className="flex flex-col w-full gap-4">
            <h1 className="text-lg font-bold text-slate-800 flex">{t(slide1.heading)}</h1>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="flex flex-col gap-4 items-center bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border-2 border-green-200 shadow-md justify-center">
                <div className="text-xl font-bold text-[#008217]">{t(slide1.sliderLabel1)} : $20</div>
                <div className="text-xl font-bold text-[#008217]">{t(slide1.sliderLabel2)} : $2000</div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-100 p-6 rounded-xl border-2 border-yellow-300 shadow-md">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-800 mb-2">100x {t(slide1.growthLabel1)}</div>
                  <div className="text-base text-yellow-800 mb-2">{t(slide1.growthLabel2)}</div>
                  <div className="text-yellow-800 px-3 py-1 rounded-full inline-block font-semibold">
                    {t(slide1.growthLabel3)}: <span className="text-lg">9900%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-4">
            <h1 className="text-lg font-bold text-slate-800 text-center">{t(slide1.graphHeading)}</h1>
            <div className={`relative ${isSmallScreen ? 'h-80' : 'h-64'}`}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart margin={{ top: 10, right: 0, bottom: 20, left: 10 }} data={initialRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="year"
                    label={{ value: t(slide1.xAxisLabel), position: 'insideBottom', offset: -15 }}
                    domain={[0, 1]}
                    type="number"
                    tickFormatter={(value) => (value === 0 ? '0' : value === 1 ? '1' : value.toString())}
                  />
                  <YAxis
                    tickFormatter={formatCurrency}
                    label={{ value: t(slide1.yAxisLabel), angle: -90, position: 'insideLeft', offset: 0, dy: 40 }}
                  />
                  <Tooltip
                    formatter={(value) => [formatCurrency(Number(value)), t(slide1.yAxisLabel)]}
                    labelFormatter={(label) => `${t(slide1.xAxisLabel)}: ${label}`}
                    contentStyle={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>

              {/* Invisible focusable elements for keyboard navigation */}
              {initialRevenueData.map((point, index) => {
                const chartHeight = 320; // h-80 = 320px
                const chartMargin = { top: 10, bottom: 20 };
                const availableHeight = chartHeight - chartMargin.top - chartMargin.bottom;

                const maxValue = Math.max(...initialRevenueData.map(d => d.revenue));
                const yPercent = 1 - point.revenue / maxValue;
                const yPosition = chartMargin.top + yPercent * availableHeight * 0.8;

                return (
                  <button
                    key={`focus-point-step1-${index}`}
                    className="absolute w-4 h-4 opacity-0 focus:opacity-100 focus:bg-purple-500 focus:rounded-full focus:outline-2 focus:outline-purple-600 focus:outline-offset-2"
                    style={{
                      left: `${5 + point.year * (90 / Math.max(...initialRevenueData.map((d) => d.year)))}%`, // Adjust based on your X-axis range
                      top: `${yPosition}px`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10,
                    }}
                    onFocus={() => handleFocus(point.year)}
                    onBlur={handleBlur}
                    onMouseEnter={() => handleMouseEnter(point.year)}
                    onMouseLeave={handleMouseLeave}
                    aria-label={`Year ${point.year}: Revenue ${formatCurrency(point.revenue)}`}
                  />
                );
              })}
              {/* Custom tooltip for keyboard focus only */}
              {activeIndex !== null &&
                isKeyboardFocus &&
                (() => {
                  const activePoint = initialRevenueData.find((d) => d.year === activeIndex);
                  if (!activePoint) return null;

                  // Calculate the same Y position for the tooltip
                  const chartHeight = isSmallScreen ? 320 : 264;
                  const chartMargin = isSmallScreen ? { top: 5, bottom: 50 } : { top: 5, bottom: 5 };
                  const availableHeight = chartHeight - chartMargin.top - chartMargin.bottom;

                  const maxValue = Math.max(...initialRevenueData.map((d) => d.revenue));

                  const yPercent = 1 - activePoint.revenue / maxValue;
                  const yPosition = chartMargin.top + yPercent * availableHeight * 0.8;

                  return (
                    <div
                      className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-20 pointer-events-none"
                      style={{
                        left: `${5 + activeIndex * (90 / Math.max(...initialRevenueData.map((d) => d.year)))}%`,
                        top: `${yPosition - 20}px`, // Offset above the point, with minimum top margin
                        transform: 'translateX(-50%)',
                      }}
                    >
                      <div className="text-base font-medium text-gray-900">
                        {t(interactive1Config.translations.slide1.xAxisLabel)} {activeIndex}
                      </div>
                      <div className="text-base text-black">
                        {t(interactive1Config.translations.slide1.yAxisLabel)}:{' '}
                        <span className="text-lg font-bold" style={{ color: 'purple' }}>
                          {formatCurrency(activePoint.revenue)}
                        </span>
                      </div>
                    </div>
                  );
                })()}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Formula */}
      {step === 2 && (
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <div className="flex flex-col w-full gap-4">
            <h1 className="text-lg font-bold text-slate-800">{t(slide2.heading)}</h1>
            <div className="flex flex-col w-full gap-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Slider
                  id="initialRevenue"
                  label={t(slide2.sliderLabel1)}
                  value={initialRevenue}
                  min={10}
                  max={1000}
                  step={10}
                  unit="$"
                  onChange={(e) => setInitialRevenue(Number(e.target.value))}
                />
                <Slider
                  id="projectionYears"
                  label={t(slide2.sliderLabel3)}
                  value={projectionYears}
                  min={1}
                  max={5}
                  step={1}
                  onChange={(e) => setProjectionYears(Number(e.target.value))}
                />
              </div>

              <Slider
                id="customGrowthRate"
                label={t(slide2.sliderLabel2)}
                value={customGrowthRate}
                min={10}
                max={10000}
                step={10}
                unit="%"
                onChange={(e) => setCustomGrowthRate(Number(e.target.value))}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex flex-col w-full gap-4 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
                  <div className="text-2xl font-besley font-bold" role="math" aria-label={t(slide2.formulaLabel1)}>
                    <span className="italic text-[#0061FC]">R</span>(
                    <span className="italic text-[#8E24AA]">t</span>) ={' '}
                    <span className="italic text-[#008217]">R₀ </span>× (1 +{' '}
                    <span className="italic text-[#E0002B]">g</span>)
                    <span className="italic text-[#8E24AA]">
                      <sup>t</sup>
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="font-besley italic text-[#0061FC]">R</span>(
                      <span className="font-besley italic text-[#8E24AA]">t</span>) = {t(slide2.formulaLabel2)}
                    </div>
                    <div>
                      <span className="font-besley italic text-[#008217]">R₀</span> = {t(slide2.formulaLabel3)}
                    </div>
                    <div>
                      <span className="font-besley italic text-[#E0002B]">g</span> = {t(slide2.formulaLabel4)}
                    </div>
                    <div>
                      <span className="font-besley italic text-[#8E24AA]">t</span> = {t(slide2.formulaLabel5)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6 items-start bg-gradient-to-br from-yellow-50 to-amber-100 p-6 rounded-xl border-2 border-yellow-300 shadow-md">
                  <div className="text-yellow-800 text-xl font-bold">{t(slide2.resultLabel)}</div>
                  <div className="text-3xl font-bold text-yellow-800">
                    {formatCurrency(initialRevenue * Math.pow(1 + customGrowthRate / 100, projectionYears))}
                  </div>
                  <div className="text-yellow-800 text-lg font-besley font-bold">
                    <span className="sr-only">
                      {format(t(slide2.calculationLabel), {
                        initialRevenue,
                        customGrowthRate,
                        projectionYears,
                      })}
                    </span>
                    <span aria-hidden="true">
                      ${initialRevenue} × (1 + {customGrowthRate}%)<sup>{projectionYears}</sup>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-4">
            <h1 className="text-lg font-bold text-slate-800 text-center">{t(slide2.graphHeading)}</h1>
            <div className={`relative ${isSmallScreen ? 'h-80' : 'h-64'}`}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formulaData} margin={{ top: 10, right: 0, bottom: 20, left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="year"
                    label={{ value: t(slide2.xAxisLabel), position: 'insideBottom', offset: -15 }}
                  />
                  <YAxis
                    tickFormatter={formatCurrency}
                    label={{
                      value: t(slide2.yAxisLabel),
                      angle: -90,
                      position: 'insideLeft',
                      offset: -25,
                      dy: 40,
                    }}
                  />
                  <Tooltip
                    formatter={(value) => [formatCurrency(Number(value)), t(slide2.yAxisLabel)]}
                    labelFormatter={(label) => `${t(slide2.xAxisLabel)}: ${label}`}
                    contentStyle={{
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
              {/* Invisible focusable elements for keyboard navigation */}
              {formulaData.map((point, index) => {
                const chartHeight = 384; // h-96 = 384px
                const chartMargin = { top: 10, bottom: 20 };
                const availableHeight = chartHeight - chartMargin.top - chartMargin.bottom;

                const maxValue = Math.max(...formulaData.map(d => d.revenue));
                const yPercent = 1 - point.revenue / maxValue;
                const yPosition = chartMargin.top + yPercent * availableHeight * 0.8;

                return (
                  <button
                    key={`focus-point-step2-${index}`}
                    className="absolute w-4 h-4 opacity-0 focus:opacity-100 focus:bg-purple-500 focus:rounded-full focus:outline-2 focus:outline-purple-600 focus:outline-offset-2"
                    style={{
                      left: `${5 + point.year * (90 / Math.max(...formulaData.map((d) => d.year)))}%`, // Adjust based on your X-axis range
                      top: `${yPosition - 45}px`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10,
                    }}
                    onFocus={() => handleFocus(point.year)}
                    onBlur={handleBlur}
                    onMouseEnter={() => handleMouseEnter(point.year)}
                    onMouseLeave={handleMouseLeave}
                    aria-label={`Year ${point.year}: Revenue ${formatCurrency(point.revenue)}`}
                  />
                );
              })}
              {/* Custom tooltip for keyboard focus only */}
              {activeIndex !== null &&
                isKeyboardFocus &&
                (() => {
                  const activePoint = formulaData.find((d) => d.year === activeIndex);
                  if (!activePoint) return null;

                  // Calculate the same Y position for the tooltip
                  const chartHeight = isSmallScreen ? 320 : 264;
                  const chartMargin = isSmallScreen ? { top: 5, bottom: 50 } : { top: 5, bottom: 5 };
                  const availableHeight = chartHeight - chartMargin.top - chartMargin.bottom;

                  const maxValue = Math.max(...formulaData.map((d) => d.revenue));

                  const yPercent = 1 - activePoint.revenue / maxValue;
                  const yPosition = chartMargin.top + yPercent * availableHeight * 0.8;

                  return (
                    <div
                      className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-20 pointer-events-none"
                      style={{
                        left: `${5 + activeIndex * (90 / Math.max(...formulaData.map((d) => d.year)))}%`,
                        top: `${yPosition - 25}px`, // Offset above the point, with minimum top margin
                        transform: 'translateX(-50%)',
                      }}
                    >
                      <div className="text-base font-medium text-gray-900">
                        {t(interactive1Config.translations.slide2.xAxisLabel)} {activeIndex}
                      </div>
                      <div className="text-base text-black">
                        {t(interactive1Config.translations.slide2.yAxisLabel)}:{' '}
                        <span className="text-lg font-bold" style={{ color: 'purple' }}>
                          {formatCurrency(activePoint.revenue)}
                        </span>
                      </div>
                    </div>
                  );
                })()}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Units Reality Check */}
      {step === 3 && (
        <div className="flex flex-col w-full gap-4">
          <h1 className="text-lg font-bold text-slate-800">{t(slide3.heading)}</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            <Slider
              id="unitPrice"
              label={t(slide3.sliderLabel1)}
              value={unitPrice}
              min={1}
              max={20}
              step={0.5}
              unit="$"
              onChange={(e) => setUnitPrice(Number(e.target.value))}
            />
            <Slider
              id="projectionYears"
              label={t(slide3.sliderLabel2)}
              value={projectionYears}
              min={1}
              max={5}
              step={1}
              onChange={(e) => setProjectionYears(Number(e.target.value))}
            />
          </div>
          {/* Show only selected projection */}
          <div className="text-lg font-bold text-slate-800">{t(slide3.growthComparisonLabel)}</div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-center gap-4 bg-gradient-to-br from-yellow-50 to-amber-100 p-4 rounded-xl border-2 border-yellow-300 shadow-md">
              <div className="text-yellow-600">{t(slide3.jarNeededLabel)}</div>
              <div className="text-3xl font-bold text-yellow-800">
                {Math.round(
                  (initialRevenue * Math.pow(1 + customGrowthRate / 100, projectionYears)) / unitPrice,
                ).toLocaleString()}
              </div>
              <div className="text-yellow-800">
                {formatCurrency(initialRevenue * Math.pow(1 + customGrowthRate / 100, projectionYears))} ÷ $
                {unitPrice} {t(slide3.jarCalculationLabel)}
              </div>
            </div>
            <div className="flex flex-col 2xl:flex-row justify-between w-full gap-2 border-2 shadow-md rounded-xl p-4">
              <div className="flex flex-col gap-2">
                {!showRealisticGrowth ? (
                  <>
                    <div className="text-[#E0002B] font-semibold">
                      {t(slide3.currentGrowthLabel)}: {customGrowthRate}%
                    </div>
                    <div className="font-bold text-xl">
                      {formatCurrency(initialRevenue * Math.pow(1 + customGrowthRate / 100, projectionYears))}
                    </div>
                    <div className="text-[#E0002B]">{format(t(slide3.afterLabel), { projectionYears })}</div>
                  </>
                ) : (
                  <>
                    <div className="text-[#008217] font-semibold">{t(slide3.realisticGrowthLabel)}: 10%</div>
                    <div className="font-bold text-xl">
                      {formatCurrency(initialRevenue * Math.pow(1.1, projectionYears))}
                    </div>
                    <div className="text-[#008217]">{format(t(slide3.afterLabel), { projectionYears })}</div>
                  </>
                )}
              </div>
              {/* Toggle Button */}
              <div className="flex justify-between items-center">
                <div className="bg-white p-1 rounded-lg border border-gray-200 inline-flex gap-2">
                  <button
                    onClick={() => setShowRealisticGrowth(false)}
                    className={`px-4 py-2 rounded-md font-semibold transition-all ${!showRealisticGrowth ? 'bg-[#E0002B] text-white shadow-sm' : 'text-[#E0002B]'
                      }`}
                  >
                    {format(t(slide3.toggleLabel1), { customGrowthRate })}
                  </button>
                  <button
                    onClick={() => setShowRealisticGrowth(true)}
                    className={`px-4 py-2 rounded-md font-semibold transition-all ${showRealisticGrowth ? 'bg-[#008217] text-white shadow-sm' : 'text-[#008217]'
                      }`}
                  >
                    {t(slide3.toggleLabel2)}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800 text-center">{t(slide3.graphHeading)}</h2>
              <div className="px-3 py-1 rounded-full font-semibold">
                {showRealisticGrowth ? (
                  <span className="text-[#008217]">
                    {t(slide3.tShowing)}: {t(slide3.realisticGrowthLabel)} (10%)
                  </span>
                ) : (
                  <span className="text-[#E0002B]">
                    {t(slide3.tShowing)}: {t(slide3.currentGrowthLabel)} ({customGrowthRate}%)
                  </span>
                )}
              </div>
            </div>
            <div className={`relative ${isSmallScreen ? 'h-96' : 'h-64'}`}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={comparisonData} margin={{ top: 10, right: 0, bottom: 20, left: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="year"
                    label={{ value: t(slide3.xAxisLabel), position: 'insideBottom', offset: -15 }}
                  />
                  <YAxis
                    tickFormatter={formatCurrency}
                    label={{
                      value: t(slide3.yAxisLabel),
                      angle: -90,
                      position: 'insideLeft',
                      offset: showRealisticGrowth ? 0 : -20,
                      dy: 40,
                    }}
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      formatCurrency(Number(value)),
                      name === 'current'
                        ? `${t(slide3.currentGrowthLabel)} (${customGrowthRate}%)`
                        : `${t(slide3.realisticGrowthLabel)} (10%)`,
                    ]}
                    labelFormatter={(label) => `${t(slide3.xAxisLabel)}: ${label}`}
                    contentStyle={{
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                    }}
                  />
                  {showRealisticGrowth ? (
                    <Area
                      type="monotone"
                      dataKey="realistic"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                      strokeWidth={3}
                    />
                  ) : (
                    <Area
                      type="monotone"
                      dataKey="current"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.3}
                      strokeWidth={3}
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>

              {/* Invisible focusable elements for keyboard navigation */}
              {comparisonData.map((point, index) => {
                const chartHeight = isSmallScreen ? 384 : 256; // h-96 = 384px, h-64 = 256px
                const chartMargin = { top: 10, bottom: 20, left: 30 };
                const availableHeight = chartHeight - chartMargin.top - chartMargin.bottom;

                const currentValue = showRealisticGrowth ? point.realistic : point.current;
                const maxValue = Math.max(...comparisonData.map(d => Math.max(d.current, d.realistic)));
                const yPercent = 1 - currentValue / maxValue;
                const yPosition = chartMargin.top + yPercent * availableHeight * 0.8;

                return (
                  <button
                    key={`focus-point-step3-${index}`}
                    className="absolute w-4 h-4 opacity-0 focus:opacity-100 focus:bg-red-500 focus:rounded-full focus:outline-2 focus:outline-red-600 focus:outline-offset-2"
                    style={{
                      left: `${chartMargin.left + (point.year / Math.max(...comparisonData.map(d => d.year))) * (100 - chartMargin.left - 5)}%`,
                      top: `${yPosition}px`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10,
                    }}
                    onFocus={() => handleFocus(point.year)}
                    onBlur={handleBlur}
                    onMouseEnter={() => handleMouseEnter(point.year)}
                    onMouseLeave={handleMouseLeave}
                    aria-label={`Year ${point.year}: Revenue ${formatCurrency(currentValue)} (${showRealisticGrowth ? 'Realistic 10%' : `Custom ${customGrowthRate}%`})`}
                  />
                );
              })}
              {/* Custom tooltip for keyboard focus only */}
              {activeIndex !== null && isKeyboardFocus && (() => {
                const activePoint = comparisonData.find((d) => d.year === activeIndex);
                if (!activePoint) return null;

                const chartHeight = isSmallScreen ? 384 : 256;
                const chartMargin = { top: 10, bottom: 20, left: 30 };
                const availableHeight = chartHeight - chartMargin.top - chartMargin.bottom;

                const currentValue = showRealisticGrowth ? activePoint.realistic : activePoint.current;
                const maxValue = Math.max(...comparisonData.map((d) => Math.max(d.current, d.realistic)));
                const yPercent = 1 - currentValue / maxValue;
                const yPosition = chartMargin.top + yPercent * availableHeight * 0.8;

                return (
                  <div
                    className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-20 pointer-events-none"
                    style={{
                      left: `${chartMargin.left + (activeIndex / Math.max(...comparisonData.map(d => d.year))) * (100 - chartMargin.left - 5)}%`,
                      top: `${Math.max(10, yPosition - 90)}px`,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <div className="text-base font-medium text-gray-900">
                      Year {activeIndex}
                    </div>
                    <div className="text-base text-black">
                      Revenue:{' '}
                      <span className="text-lg font-bold" style={{ color: showRealisticGrowth ? '#10b981' : '#ef4444' }}>
                        {formatCurrency(currentValue)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {showRealisticGrowth ? 'Realistic Growth (10%)' : `Custom Growth (${customGrowthRate}%)`}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between w-full py-4">
        <button
          onClick={prevSlide}
          disabled={step === 1}
          className={`px-2 py-1 lg:px-4 lg:py-2 rounded text-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white ${step === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#006BE0] hover:bg-blue-600'
            }`}
        >
          {t('dialog.button.back')}
        </button>

        <button
          onClick={nextSlide}
          disabled={step === currentSlide.current}
          className={`px-2 py-1 lg:px-4 lg:py-2 rounded text-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white ${step === currentSlide.current ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#006BE0] hover:bg-blue-600'
            }`}
        >
          {t('dialog.button.next')}
        </button>
      </div>
    </div>
  );
};

export default SlimeTimeExponentialGrowth;

const Slider = ({ id, label, value, min, max, step, unit, onChange }: SliderProps) => {
  const sliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const updateSliderBackground = (input: HTMLInputElement) => {
      const min = Number(input.min);
      const max = Number(input.max);
      const value = Number(input.value);
      const percent = ((value - min) / (max - min)) * 100;
      input.style.background = `linear-gradient(to right, #007bff ${percent}%, #e0e0e0 ${percent}%)`;
    };
    if (sliderRef.current) {
      updateSliderBackground(sliderRef.current);
    }
  }, [value]);

  return (
    <div key={id} className="h-full w-full text-lg font-medium flex flex-col gap-2">
      <div aria-live="off" className="text-base font-semibold flex justify-between">
        <label htmlFor={`slider-${id}`}>{label}</label>
        <span>
          {value} {unit}
        </span>
      </div>
      <div className="w-full">
        <div>
          <input
            ref={sliderRef}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            id={`slider-${id}`}
            onChange={onChange}
            className="global-slider w-full"
            aria-valuetext={`${label} : ${value} ${unit}`}
          />
        </div>
      </div>
    </div>
  );
};
