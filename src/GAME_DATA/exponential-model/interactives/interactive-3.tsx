/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslations } from '../../../hooks/useTranslations';
import interaction from '../configs/interactive-3';

// Custom SVG Icons

const TrendingUpIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
  </svg>
);

const CalculatorIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
  </svg>
);

const PlayCircleIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
  </svg>
);

const TargetIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
  </svg>
);

const InfoIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

interface ProjectionData {
  month: number;
  views: number;
  salesPerVideo: number;
  weeklySales: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  currentMonthlyRevenue: number;
  growthMultiplier: string;
}

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
  position: { x: number; y: number };
  triggerRef: React.RefObject<HTMLButtonElement>;
  isTarget: boolean;
  t: (key: string) => string;
}

const Popover: React.FC<PopoverProps> = ({ isOpen, onClose, content, position, isTarget, t }) => {
  const [adjustedPosition, setAdjustedPosition] = useState(() => {
    const popoverWidth = 350;
    const popoverHeight = 220;

    let newX = position.x - popoverWidth - 15;
    let newY = position.y;

    if (newX < 10) {
      newX = position.x + 30;
    }

    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    if (newY + popoverHeight > viewportHeight) {
      newY = viewportHeight - popoverHeight - 20;
    }

    if (newY < 10) {
      newY = 10;
    }

    return { x: newX, y: newY };
  });
  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const viewportHeight = window.innerHeight;
      const popoverWidth = 350;
      const popoverHeight = 220;

      let newX = position.x - popoverWidth - 15; // Position to the left by default
      let newY = position.y;

      if (newX < 10) {
        newX = position.x + 30;
      }

      if (newY + popoverHeight > viewportHeight) {
        newY = viewportHeight - popoverHeight - 20;
      }

      if (newY < 10) {
        newY = 10;
      }

      setAdjustedPosition({ x: newX, y: newY });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [isOpen, position]);

  if (!isOpen) return null;
  const borderColor = isTarget ? '#008217' : '#E0002B';
  const headerColor = isTarget ? '#065F46' : '#991B1B';

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose}></div>
      <div
        className="fixed z-50 bg-white rounded-xl shadow-xl p-6 max-w-sm"
        style={{
          left: adjustedPosition.x,
          top: adjustedPosition.y,
          border: `2px solid ${borderColor}`,
          backgroundColor: 'white',
        }}
      >
        <div className="flex justify-between items-start mb-4">
          <h4 className="text-lg font-bold flex items-center" style={{ color: headerColor }}>
            <InfoIcon className="h-5 w-5 mr-2" style={{ color: borderColor }} />
            {t(interaction.monthlyRevenueBreakdown)}
          </h4>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={t(interaction.closePopover)}
          >
            ×
          </button>
        </div>
        <div>{content}</div>
      </div>
    </>
  );
};

const SocialMediaStrategy = () => {
  const { t } = useTranslations();
  const [viewsPerVideo] = useState<number>(12000);
  const [currentConversion, setCurrentConversion] = useState<number>(0.2);
  const [targetConversion, setTargetConversion] = useState<number>(3.0);
  const [currentVideos, setCurrentVideos] = useState<number>(1);
  const [targetVideos, setTargetVideos] = useState<number>(3);
  const [unitPrice] = useState<number>(5);
  const [monthlyGrowth] = useState<number>(10);
  const [projectionMonths] = useState<number>(6);
  const [projectionData, setProjectionData] = useState<ProjectionData[]>([]);

  // Tooltip states
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Popover states
  const [currentPopoverState, setCurrentPopoverState] = useState<{
    isOpen: boolean;
    position: { x: number; y: number };
    triggerRef: React.RefObject<HTMLButtonElement>;
  } | null>(null);

  const [targetPopoverState, setTargetPopoverState] = useState<{
    isOpen: boolean;
    position: { x: number; y: number };
    triggerRef: React.RefObject<HTMLButtonElement>;
  } | null>(null);

  const currentInfoButtonRef = React.useRef<HTMLButtonElement>(null);
  const targetInfoButtonRef = React.useRef<HTMLButtonElement>(null);

  // Function to update slider background based on value
  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #e0e0e0 ${percent}%)`;
  }, []);

  // Update slider backgrounds when values change
  useEffect(() => {
    const currentConversionSlider = document.getElementById('slider-current-conversion') as HTMLInputElement;
    if (currentConversionSlider) updateSliderBackground(currentConversionSlider);
  }, [currentConversion, updateSliderBackground]);

  useEffect(() => {
    const targetConversionSlider = document.getElementById('slider-target-conversion') as HTMLInputElement;
    if (targetConversionSlider) updateSliderBackground(targetConversionSlider);
  }, [targetConversion, updateSliderBackground]);

  useEffect(() => {
    const currentVideosSlider = document.getElementById('slider-current-videos') as HTMLInputElement;
    if (currentVideosSlider) updateSliderBackground(currentVideosSlider);
  }, [currentVideos, updateSliderBackground]);

  useEffect(() => {
    const targetVideosSlider = document.getElementById('slider-target-videos') as HTMLInputElement;
    if (targetVideosSlider) updateSliderBackground(targetVideosSlider);
  }, [targetVideos, updateSliderBackground]);

  // Check screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Tooltip handlers
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

  const calculateProjections = () => {
    // Centralized calculations
    const currentSalesPerVideo = Math.round(viewsPerVideo * (currentConversion / 100));
    const currentWeeklySales = currentSalesPerVideo * currentVideos;
    const currentWeeklyRevenue = currentWeeklySales * unitPrice;
    const currentMonthlyRevenue = currentWeeklyRevenue * 4; // Added monthly calculation

    const targetSalesPerVideo = Math.round(viewsPerVideo * (targetConversion / 100));
    const targetWeeklySales = targetSalesPerVideo * targetVideos;
    const targetWeeklyRevenue = targetWeeklySales * unitPrice;
    const targetMonthlyRevenue = targetWeeklyRevenue * 4;
    const monthlyData: ProjectionData[] = [];
    const monthlyGrowthRate = monthlyGrowth / 100;

    for (let month = 0; month <= projectionMonths; month++) {
      const growthMultiplier = Math.pow(1 + monthlyGrowthRate, month);
      const monthViews = Math.round(viewsPerVideo * growthMultiplier);

      // Target strategy calculations
      const monthTargetSalesPerVideo = Math.round(monthViews * (targetConversion / 100));
      const monthTargetWeeklySales = monthTargetSalesPerVideo * targetVideos;
      const monthTargetWeeklyRevenue = monthTargetWeeklySales * unitPrice;
      const monthTargetMonthlyRevenue = monthTargetWeeklyRevenue * 4;

      // Current strategy calculations
      const monthCurrentSalesPerVideo = Math.round(monthViews * (currentConversion / 100));
      const monthCurrentWeeklySales = monthCurrentSalesPerVideo * currentVideos;
      const monthCurrentWeeklyRevenue = monthCurrentWeeklySales * unitPrice;
      const monthCurrentMonthlyRevenue = monthCurrentWeeklyRevenue * 4;

      monthlyData.push({
        month: month,
        views: monthViews,
        salesPerVideo: monthTargetSalesPerVideo,
        weeklySales: monthTargetWeeklySales,
        weeklyRevenue: monthTargetWeeklyRevenue,
        monthlyRevenue: monthTargetMonthlyRevenue, // Target monthly revenue
        currentMonthlyRevenue: monthCurrentMonthlyRevenue, // Current monthly revenue
        growthMultiplier: growthMultiplier.toFixed(2),
      });
    }

    setProjectionData(monthlyData);

    // Store calculated values for consistent use
    (window as any).calculatedValues = {
      currentSalesPerVideo,
      currentWeeklySales,
      currentWeeklyRevenue,
      currentMonthlyRevenue, // Added
      targetSalesPerVideo,
      targetWeeklySales,
      targetWeeklyRevenue,
      targetMonthlyRevenue, // Added
      improvementMultiplier: (targetMonthlyRevenue / currentMonthlyRevenue).toFixed(1), // Changed to monthly
    };
  };

  useEffect(() => {
    calculateProjections();
  }, [
    viewsPerVideo,
    currentConversion,
    targetConversion,
    currentVideos,
    targetVideos,
    unitPrice,
    monthlyGrowth,
    projectionMonths,
  ]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };
  // Get calculated values (with fallbacks for initial render)
  const calculatedValues = (window as any).calculatedValues || {
    currentSalesPerVideo: Math.round(viewsPerVideo * (currentConversion / 100)),
    currentWeeklySales: Math.round(viewsPerVideo * (currentConversion / 100)) * currentVideos,
    currentWeeklyRevenue: Math.round(viewsPerVideo * (currentConversion / 100)) * currentVideos * unitPrice,
    currentMonthlyRevenue: Math.round(viewsPerVideo * (currentConversion / 100)) * currentVideos * unitPrice * 4,
    targetSalesPerVideo: Math.round(viewsPerVideo * (targetConversion / 100)),
    targetWeeklySales: Math.round(viewsPerVideo * (targetConversion / 100)) * targetVideos,
    targetWeeklyRevenue: Math.round(viewsPerVideo * (targetConversion / 100)) * targetVideos * unitPrice,
    targetMonthlyRevenue: Math.round(viewsPerVideo * (targetConversion / 100)) * targetVideos * unitPrice * 4,
    improvementMultiplier: (
      (Math.round(viewsPerVideo * (targetConversion / 100)) * targetVideos * unitPrice * 4) /
      (Math.round(viewsPerVideo * (currentConversion / 100)) * currentVideos * unitPrice * 4)
    ).toFixed(1),
  }; // Generate popover content
  const generatePopoverContent = (isTarget: boolean) => {
    const videos = isTarget ? targetVideos : currentVideos;
    const salesPerVideo = isTarget ? calculatedValues.targetSalesPerVideo : calculatedValues.currentSalesPerVideo;
    const monthlyRevenue = isTarget
      ? calculatedValues.targetMonthlyRevenue
      : calculatedValues.currentMonthlyRevenue;

    return (
      <div className="text-gray-700 leading-relaxed">
        <div className="mb-2">{t(interaction.sellingPrice)} = $5</div>
        <div className="mb-3">
          {t(interaction.oneMonth)} = 4 {t(interaction.weeks)}
        </div>
        <div className="mb-2">
          = {videos} × 4 × {salesPerVideo} × $5
        </div>
        <div className="text-lg font-bold" style={{ color: isTarget ? '#008217' : '#E0002B' }}>
          = {formatCurrency(monthlyRevenue)}
        </div>
      </div>
    );
  };

  const handleInfoClick = (
    isTarget: boolean,
    event: React.MouseEvent<HTMLButtonElement>,
    buttonRef: React.RefObject<HTMLButtonElement>,
  ) => {
    const currentState = isTarget ? targetPopoverState : currentPopoverState;
    const setState = isTarget ? setTargetPopoverState : setCurrentPopoverState;

    if (currentState?.triggerRef === buttonRef) {
      setState(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    setState({
      isOpen: true,
      position: {
        x: rect.left - 10,
        y: rect.bottom + 10,
      },
      triggerRef: buttonRef,
    });
  };
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Interactive Controls */}
      <div className="p-2 mb-2 mt-[-20px]">
        <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
          <h1 className="text-lg font-bold text-slate-800 flex items-center">
            <CalculatorIcon className="h-5 w-5 mr-2" style={{ color: '#23272f' }} />
            {t(interaction.controls)}
          </h1>
          <div
            className="flex items-center font-bold text-base px-3 py-1 rounded-full border-2"
            style={{ color: '#008217', borderColor: '#008217', backgroundColor: '#F0FFF0' }}
          >
            <TrendingUpIcon className="h-4 w-4 mr-1" style={{ color: '#008217' }} />
            {calculatedValues.improvementMultiplier}x {t(interaction.revenueGrowth)}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-700">🎯 {t(interaction.conversion)}</h4>
            <div className="p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <label className="text-base font-medium text-slate-800">{t(interaction.currentConversion)}</label>
                <span className="text-lg font-bold" style={{ color: '#E0002B' }}>
                  {currentConversion}%
                </span>
              </div>
              <input
                id="slider-current-conversion"
                type="range"
                min="0.1"
                max="2.0"
                step="0.1"
                value={currentConversion}
                onChange={(e) => setCurrentConversion(Number(e.target.value))}
                className="w-full h-3 rounded-lg global-slider cursor-pointer"
                aria-label={t(interaction.currentConversion)}
              />
              <div className="flex justify-between text-base mt-1">
                <span>{t(interaction.minCurrentConversion)}</span>
                <span>{t(interaction.maxCurrentConversion)}</span>
              </div>
            </div>
            <div className="p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <label className="text-base font-medium text-slate-800">{t(interaction.targetConversion)}</label>
                <span className="text-lg font-bold" style={{ color: '#008217' }}>
                  {targetConversion}%
                </span>
              </div>
              <input
                id="slider-target-conversion"
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={targetConversion}
                onChange={(e) => setTargetConversion(Number(e.target.value))}
                className="w-full h-3 rounded-lg global-slider cursor-pointer"
                aria-label={t(interaction.targetConversion)}
              />
              <div className="flex justify-between text-base mt-1">
                <span>{t(interaction.minTargetConversion)}</span>
                <span>{t(interaction.maxTargetConversion)}</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-700">📅 {t(interaction.posting)}</h4>
            <div className="p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <label className="text-base font-medium text-slate-800">{t(interaction.currentVideosWeek)}</label>
                <span className="text-lg font-bold" style={{ color: '#633300' }}>
                  {currentVideos}
                </span>
              </div>
              <input
                id="slider-current-videos"
                type="range"
                min="1"
                max="7"
                step="1"
                value={currentVideos}
                onChange={(e) => setCurrentVideos(Number(e.target.value))}
                className="w-full h-3 rounded-lg global-slider cursor-pointer"
                style={{ background: 'linear-gradient(to right, #633300 0%, #e0e0e0 0%)' }}
                aria-label={t(interaction.currentVideosWeek)}
              />
              <div className="flex justify-between text-base mt-1" style={{ color: '#633300' }}>
                <span>{t(interaction.minCurrentVideos)}</span>
                <span>{t(interaction.maxCurrentVideos)}</span>
              </div>
            </div>
            <div className="p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <label className="text-base font-medium text-slate-800">{t(interaction.targetVideosWeek)}</label>
                <span className="text-lg font-bold" style={{ color: '#00749D' }}>
                  {targetVideos}
                </span>
              </div>
              <input
                id="slider-target-videos"
                type="range"
                min="1"
                max="14"
                step="1"
                value={targetVideos}
                onChange={(e) => setTargetVideos(Number(e.target.value))}
                className="w-full h-3 rounded-lg global-slider cursor-pointer"
                style={{ background: 'linear-gradient(to right, #00749D 0%, #e0e0e0 0%)' }}
                aria-label={t(interaction.targetVideosWeek)}
              />
              <div className="flex justify-between text-base mt-1" style={{ color: '#00749D' }}>
                <span>{t(interaction.minTargetVideos)}</span>
                <span>{t(interaction.maxTargetVideos)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Growth Projection Chart */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-lg font-bold text-slate-800 flex items-center">
            <TrendingUpIcon className="h-5 w-5 mr-2" style={{ color: '#0061FC' }} />
            {t(interaction.monthGrowthProjection)} ({monthlyGrowth}% {t(interaction.monthlyGrowth)})
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-1 mr-2" style={{ backgroundColor: '#E0002B' }}></div>
              <span>{t(interaction.currentStrategy)}</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-1 mr-2" style={{ backgroundColor: '#008217' }}></div>
              <span>{t(interaction.targetStrategy)}</span>
            </div>
          </div>
        </div>
        <div className={`relative ${isSmallScreen ? 'h-80' : 'h-64'}`}>
          <ResponsiveContainer width="100%" height="100%" aria-label={t(interaction.chartAriaLabel)}>
            <LineChart
              accessibilityLayer
              data={projectionData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                stroke="#64748b"
                label={{ value: t(interaction.month), position: 'insideBottom', offset: -10 }}
              />
              <YAxis
                yAxisId="revenue"
                orientation="left"
                stroke="#64748b"
                tickFormatter={(value: number) => `$${(value / 1000).toFixed(0)}K`}
                label={{ value: `${t(interaction.monthlyRevenue)} ($)`, angle: -90, dx: -40, position: 'center' }}
              />
              <Tooltip
                formatter={(value: number, name: string) => {
                  if (name === 'monthlyRevenue') {
                    // Find the exact month from the data point
                    const dataPoint = projectionData.find((d) => d.monthlyRevenue === value);
                    if (dataPoint) {
                      if (dataPoint.month === 0) {
                        return [formatCurrency(value), t(interaction.baselineTarget)];
                      }
                      const growthMultiplier = Math.pow(1 + monthlyGrowth / 100, dataPoint.month).toFixed(1);
                      return [
                        formatCurrency(value),
                        t(interaction.monthlyRevenueGrowth).replace('{growthMultiplier}', `${growthMultiplier}`) +
                          ` (${t(interaction.targetStrategy)})`,
                      ];
                    }
                    return [
                      formatCurrency(value),
                      `${t(interaction.monthlyRevenue)} (${t(interaction.targetStrategy)})`,
                    ];
                  }
                  if (name === 'currentMonthlyRevenue') {
                    // Find the exact month from the data point
                    const dataPoint = projectionData.find((d) => d.currentMonthlyRevenue === value);
                    if (dataPoint) {
                      if (dataPoint.month === 0) {
                        return [formatCurrency(value), t(interaction.baselineCurrent)];
                      }
                      const growthMultiplier = Math.pow(1 + monthlyGrowth / 100, dataPoint.month).toFixed(1);
                      return [
                        formatCurrency(value),
                        t(interaction.monthlyRevenueGrowth).replace('{growthMultiplier}', `${growthMultiplier}`) +
                          ` (${t(interaction.currentStrategy)})`,
                      ];
                    }
                    return [
                      formatCurrency(value),
                      `${t(interaction.monthlyRevenue)} (${t(interaction.currentStrategy)})`,
                    ];
                  }
                }}
                labelFormatter={(month: number) => {
                  if (month === 0) {
                    return t(interaction.baseline);
                  }
                  return `${t(interaction.month)} ${month}`;
                }}
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Line
                yAxisId="revenue"
                type="monotone"
                dataKey="currentMonthlyRevenue"
                stroke="#E0002B"
                strokeWidth={4}
                strokeOpacity={1}
                dot={{ fill: '#E0002B', strokeWidth: 2, r: 5 }}
                name="currentMonthlyRevenue"
              />
              <Line
                yAxisId="revenue"
                type="monotone"
                dataKey="monthlyRevenue"
                stroke="#008217"
                strokeWidth={4}
                strokeOpacity={1}
                dot={{ fill: '#008217', strokeWidth: 2, r: 5 }}
                name="monthlyRevenue"
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Invisible focusable elements for keyboard navigation */}
          {projectionData.map((point, index) => {
            const chartHeight = isSmallScreen ? 320 : 320;
            const chartMargin = { top: 20, bottom: 20, left: 20, right: 30 };
            const availableHeight = chartHeight - chartMargin.top - chartMargin.bottom;

            const maxValue = Math.max(
              ...projectionData.map((d) => Math.max(d.monthlyRevenue, d.currentMonthlyRevenue)),
            );
            const yPercent = 1 - point.monthlyRevenue / maxValue;
            const yPosition = chartMargin.top + yPercent * availableHeight * 0.8;

            // Fixed X positioning calculation to match the actual chart points
            const maxMonth = Math.max(...projectionData.map((d) => d.month));
            const xPercent = maxMonth === 0 ? 0 : point.month / maxMonth;
            const xPosition = 8 + xPercent * 82; // Chart area spans roughly from 8% to 90%

            return (
              <button
                key={`focus-point-${index}`}
                className="absolute w-4 h-4 opacity-0 focus:opacity-100 focus:bg-blue-500 focus:rounded-full focus:outline-2 focus:outline-blue-600 focus:outline-offset-2"
                style={{
                  left: `${xPosition}%`,
                  top: `${yPosition}px`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                }}
                onFocus={() => handleFocus(point.month)}
                onBlur={handleBlur}
                onMouseEnter={() => handleMouseEnter(point.month)}
                onMouseLeave={handleMouseLeave}
                aria-label={`${t(interaction.month)} ${point.month}: ${t(interaction.targetStrategy)} ${formatCurrency(point.monthlyRevenue)}, ${t(interaction.currentStrategy)} ${formatCurrency(point.currentMonthlyRevenue)}`}
              />
            );
          })}

          {/* Custom tooltip for keyboard focus */}
          {activeIndex !== null &&
            isKeyboardFocus &&
            (() => {
              const activePoint = projectionData.find((d) => d.month === activeIndex);
              if (!activePoint) return null;

              const chartHeight = isSmallScreen ? 320 : 320;
              const chartMargin = { top: 20, bottom: 20, left: 20, right: 30 };
              const availableHeight = chartHeight - chartMargin.top - chartMargin.bottom;

              const maxValue = Math.max(
                ...projectionData.map((d) => Math.max(d.monthlyRevenue, d.currentMonthlyRevenue)),
              );
              const yPercent = 1 - activePoint.monthlyRevenue / maxValue;
              const yPosition = chartMargin.top + yPercent * availableHeight * 0.8;
              const growthMultiplier = Math.pow(1 + monthlyGrowth / 100, activePoint.month).toFixed(1);

              // Fixed X positioning to match the invisible buttons
              const maxMonth = Math.max(...projectionData.map((d) => d.month));
              const xPercent = maxMonth === 0 ? 0 : activePoint.month / maxMonth;
              const xPosition = 8 + xPercent * 82; // Match the button positioning

              return (
                <div
                  className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-20 pointer-events-none"
                  style={{
                    left: `${xPosition}%`,
                    top: `${Math.max(10, yPosition - 120)}px`,
                    transform: 'translateX(-50%)',
                    minWidth: '250px',
                  }}
                >
                  <div className="text-base font-medium text-gray-900 mb-2">
                    {activeIndex === 0 ? t(interaction.baseline) : `${t(interaction.month)} ${activeIndex}`}
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium">
                      <span style={{ color: '#008217' }}>
                        {t(interaction.monthlyRevenueGrowth).replace('{growthMultiplier}', growthMultiplier)}:{' '}
                        {t(interaction.targetStrategy)}:
                      </span>{' '}
                      <span className="font-medium" style={{ color: '#008217' }}>
                        {formatCurrency(activePoint.monthlyRevenue)}
                      </span>
                    </div>
                    <div className="font-medium">
                      <span style={{ color: '#E0002B' }}>
                        {t(interaction.monthlyRevenueGrowth).replace('{growthMultiplier}', growthMultiplier)}:{' '}
                        {t(interaction.currentStrategy)}:
                      </span>{' '}
                      <span className="font-medium" style={{ color: '#E0002B' }}>
                        {formatCurrency(activePoint.currentMonthlyRevenue)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}
        </div>
      </div>
      {/* Current vs Target Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div
          className="p-6 rounded-xl shadow-lg border-l-4 relative"
          style={{ borderLeftColor: '#E0002B', backgroundColor: '#FFF0F0' }}
        >
          <div className="flex justify-between items-start mb-4">
            <h1
              className="text-lg font-bold flex items-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:rounded"
              style={{ color: '#E0002B' }}
              tabIndex={0}
              role="heading"
              aria-level={3}
            >
              <PlayCircleIcon className="h-5 w-5 mr-2" style={{ color: '#E0002B' }} />
              {t(interaction.currentStrategy)}
            </h1>
            <button
              ref={currentInfoButtonRef}
              onClick={(e) => handleInfoClick(false, e, currentInfoButtonRef)}
              className="p-1 hover:bg-red-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
              aria-label={`${t(interaction.showCalculationBreakdown)}: ${t(interaction.currentStrategy)}`}
            >
              <InfoIcon className="h-4 w-4" style={{ color: '#E0002B' }} />
              <span id="current-strategy-info" className="sr-only">
                {t(interaction.showCalculationBreakdown)} - {t(interaction.currentStrategy)}:{' '}
                {t(interaction.conversionRateLabel)} {currentConversion}%, {t(interaction.videosWeekLabel)}{' '}
                {currentVideos}, {t(interaction.monthlyRevenueLabel)}{' '}
                {formatCurrency(calculatedValues.currentMonthlyRevenue)}
              </span>
            </button>
          </div>

          <div className="space-y-3">
            <div
              className="flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:rounded p-1"
              tabIndex={0}
            >
              <span className="text-base text-gray-600">{t(interaction.conversionRateLabel)}</span>
              <span className="font-bold" style={{ color: '#E0002B' }}>
                {currentConversion}%
              </span>
            </div>
            <div
              className="flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:rounded p-1"
              tabIndex={0}
            >
              <span className="text-base text-gray-600">{t(interaction.videosWeekLabel)}</span>
              <span className="font-bold" style={{ color: '#E0002B' }}>
                {currentVideos}
              </span>
            </div>
            <div
              className="flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:rounded p-1"
              tabIndex={0}
            >
              <span className="text-base text-gray-600">{t(interaction.salesVideoLabel)}</span>
              <span className="font-bold" style={{ color: '#E0002B' }}>
                {calculatedValues.currentSalesPerVideo}
              </span>
            </div>
            <div
              className="flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:rounded p-1"
              tabIndex={0}
            >
              <span className="text-base text-gray-600">{t(interaction.sellingPrice)}:</span>
              <span className="font-bold" style={{ color: '#E0002B' }}>
                $5
              </span>
            </div>
            <div className="border-t pt-3" style={{ borderTopColor: '#E0002B' }}>
              <div
                className="flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:rounded p-1"
                tabIndex={0}
              >
                <span className="text-sm text-gray-600">{t(interaction.weeklyRevenueLabel)}</span>
                <span className="text-sm font-bold" style={{ color: '#E0002B' }}>
                  {formatCurrency(calculatedValues.currentWeeklyRevenue)}
                </span>
              </div>
              <div
                className="flex justify-between items-center mt-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:rounded p-1"
                tabIndex={0}
              >
                <span className="text-base text-gray-600">{t(interaction.monthlyRevenueLabel)}:</span>
                <span className="text-xl font-bold" style={{ color: '#E0002B' }}>
                  {formatCurrency(calculatedValues.currentMonthlyRevenue)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="p-6 rounded-xl shadow-lg border-l-4 relative"
          style={{ borderLeftColor: '#008217', backgroundColor: '#F0FFF0' }}
        >
          <div className="flex justify-between items-start mb-4">
            <h1
              className="text-lg font-bold flex items-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 focus:rounded"
              style={{ color: '#008217' }}
              tabIndex={0}
              role="heading"
              aria-level={3}
            >
              <TargetIcon className="h-5 w-5 mr-2" style={{ color: '#008217' }} />
              {t(interaction.targetStrategy)}
            </h1>
            <button
              ref={targetInfoButtonRef}
              onClick={(e) => handleInfoClick(true, e, targetInfoButtonRef)}
              className="p-1 hover:bg-green-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
              aria-label={`${t(interaction.showCalculationBreakdown)}: ${t(interaction.targetStrategy)}`}
            >
              <InfoIcon className="h-4 w-4" style={{ color: '#008217' }} />
              <span id="current-strategy-info" className="sr-only">
                {t(interaction.showCalculationBreakdown)} - {t(interaction.targetStrategy)}:{' '}
                {t(interaction.conversionRateLabel)} {currentConversion}%, {t(interaction.videosWeekLabel)}{' '}
                {currentVideos}, {t(interaction.monthlyRevenueLabel)}{' '}
                {formatCurrency(calculatedValues.currentMonthlyRevenue)}
              </span>
            </button>
          </div>
          <div className="space-y-3">
            <div
              className="flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 focus:rounded p-1"
              tabIndex={0}
            >
              <span className="text-base text-gray-600">{t(interaction.conversionRateLabel)}</span>
              <span className="font-bold" style={{ color: '#008217' }}>
                {targetConversion}%
              </span>
            </div>
            <div
              className="flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 focus:rounded p-1"
              tabIndex={0}
            >
              <span className="text-base text-gray-600">{t(interaction.videosWeekLabel)}</span>
              <span className="font-bold" style={{ color: '#008217' }}>
                {targetVideos}
              </span>
            </div>
            <div
              className="flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 focus:rounded p-1"
              tabIndex={0}
            >
              <span className="text-base text-gray-600">{t(interaction.salesVideoLabel)}</span>
              <span className="font-bold" style={{ color: '#008217' }}>
                {calculatedValues.targetSalesPerVideo}
              </span>
            </div>
            <div
              className="flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 focus:rounded p-1"
              tabIndex={0}
            >
              <span className="text-base text-gray-600">{t(interaction.sellingPrice)}:</span>
              <span className="font-bold" style={{ color: '#008217' }}>
                $5
              </span>
            </div>
            <div className="border-t pt-3" style={{ borderTopColor: '#008217' }}>
              <div
                className="flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 focus:rounded p-1"
                tabIndex={0}
              >
                <span className="text-sm text-gray-600">{t(interaction.weeklyRevenueLabel)}</span>
                <span className="text-sm font-bold" style={{ color: '#008217' }}>
                  {formatCurrency(calculatedValues.targetWeeklyRevenue)}
                </span>
              </div>
              <div
                className="flex justify-between items-center mt-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 focus:rounded p-1"
                tabIndex={0}
              >
                <span className="text-base text-gray-600">{t(interaction.monthlyRevenueLabel)}:</span>
                <span className="text-xl font-bold" style={{ color: '#008217' }}>
                  {formatCurrency(calculatedValues.targetMonthlyRevenue)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Exponential Growth Formula */}
      <div className="mb-4">
        <h1 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
          <CalculatorIcon className="h-5 w-5 mr-2" style={{ color: '#8E24AA' }} />
          {t(interaction.exponentialGrowthFormula)}
        </h1>
        <div className="p-3 rounded-lg border-l-4" style={{ borderLeftColor: '#8E24AA' }}>
          <div className="text-center">
            <span className="sr-only">{t(interaction.formulaAriaLabel)}</span>
            <div className="text-2xl font-mono font-bold text-slate-800 mb-2" aria-hidden="true">
              <span className="font-besley italic" style={{ color: '#0061FC' }}>
                R
              </span>
              (
              <span className="font-besley italic" style={{ color: '#8E24AA' }}>
                t
              </span>
              ) =&nbsp;
              <span className="font-besley italic" style={{ color: '#008217' }}>
                R₀&nbsp;
              </span>
              × (1 +&nbsp;
              <span className="font-besley italic" style={{ color: '#E0002B' }}>
                g
              </span>
              )<span style={{ color: '#8E24AA' }}>ᵗ</span>
            </div>
            <div className="text-base text-slate-600 grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <div className="p-2 rounded-lg" style={{ color: '#0061FC' }}>
                <strong className="font-besley italic">R</strong>(<strong className="font-besley italic">t</strong>
                ) = {t(interaction.revenueAfter)} <span className="font-besley italic">t </span>
                {t(interaction.months)}
              </div>
              <div className="p-2 rounded-lg" style={{ color: '#008217' }}>
                <strong className="font-besley italic">R</strong>₀ = {t(interaction.initialMonthlyRevenue)} (
                {formatCurrency(calculatedValues.targetMonthlyRevenue)})
              </div>
              <div className="p-2 rounded-lg" style={{ color: '#E0002B' }}>
                <strong className="font-besley italic">g</strong> = {t(interaction.monthlyGrowthRate)} (
                {monthlyGrowth}% = 0.
                {monthlyGrowth})
              </div>
              <div className="p-3 rounded-lg" style={{ color: '#8E24AA' }}>
                <strong className="font-besley italic">t</strong> = {t(interaction.timeInMonths)}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Popovers */}
      {currentPopoverState && (
        <Popover
          isOpen={currentPopoverState.isOpen}
          onClose={() => setCurrentPopoverState(null)}
          content={generatePopoverContent(false)}
          position={currentPopoverState.position}
          triggerRef={currentPopoverState.triggerRef}
          isTarget={false}
          t={t}
        />
      )}
      {targetPopoverState && (
        <Popover
          isOpen={targetPopoverState.isOpen}
          onClose={() => setTargetPopoverState(null)}
          content={generatePopoverContent(true)}
          position={targetPopoverState.position}
          triggerRef={targetPopoverState.triggerRef}
          isTarget={true}
          t={t}
        />
      )}
    </div>
  );
};

export default SocialMediaStrategy;
