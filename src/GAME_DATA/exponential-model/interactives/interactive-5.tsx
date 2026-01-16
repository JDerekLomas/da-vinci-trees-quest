import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { useTranslations } from '../../../hooks/useTranslations';
import config from '../configs/interactive-5';

interface TimelineDataPoint {
  year: number;
  age: number;
  weeklyProfit: number;
  portfolioValue: number;
  businessValue: number;
  totalValue: number;
}

const MillionaireCalculator = () => {
  const [currentAge, setCurrentAge] = useState(config.defaultValues.currentAge);
  const [weeklyProfit, setWeeklyProfit] = useState(config.defaultValues.weeklyProfit);
  const [investmentPercentage, setInvestmentPercentage] = useState(config.defaultValues.investmentPercentage);
  const [businessGrowthRate, setBusinessGrowthRate] = useState(config.defaultValues.businessGrowthRate);
  const [investmentReturn, setInvestmentReturn] = useState(config.defaultValues.investmentReturn);
  const [timelineData, setTimelineData] = useState<TimelineDataPoint[]>([]);
  const [milestones, setMilestones] = useState({
    millionaireAge: 0,
    thousandaireAge: 0,
    hundredThousandaireAge: 0,
    firstSixFigures: 0,
  });

  // Add keyboard navigation state
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);

  // Add keyboard navigation handlers
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

  const { t } = useTranslations();

  useEffect(() => {
    calculateTimeline();
  }, [currentAge, weeklyProfit, investmentPercentage, businessGrowthRate, investmentReturn]);

  const calculateTimeline = () => {
    const data = [];
    const maxYears = config.constants.maxYears;

    let currentWeeklyProfit = weeklyProfit;
    let portfolioValue = 0;
    let businessValue =
      currentWeeklyProfit * config.constants.weeksPerYear * config.constants.businessValueMultiplier;

    const milestoneData = {
      millionaireAge: 0,
      thousandaireAge: 0,
      hundredThousandaireAge: 0,
      firstSixFigures: 0,
    };

    for (let year = 0; year <= maxYears; year++) {
      const age = currentAge + year;
      const totalValue = portfolioValue + businessValue;

      if (totalValue >= config.milestones.million && milestoneData.millionaireAge === 0) {
        milestoneData.millionaireAge = age;
      }
      if (totalValue >= config.milestones.hundredThousand && milestoneData.hundredThousandaireAge === 0) {
        milestoneData.hundredThousandaireAge = age;
      }
      if (totalValue >= config.milestones.thousand && milestoneData.thousandaireAge === 0) {
        milestoneData.thousandaireAge = age;
      }
      if (portfolioValue >= config.milestones.hundredThousand && milestoneData.firstSixFigures === 0) {
        milestoneData.firstSixFigures = age;
      }

      data.push({
        year,
        age,
        weeklyProfit: currentWeeklyProfit,
        portfolioValue,
        businessValue,
        totalValue,
      });

      const yearlyProfit = currentWeeklyProfit * config.constants.weeksPerYear;
      const investmentAmount = yearlyProfit * (investmentPercentage / 100);

      portfolioValue = portfolioValue * (1 + investmentReturn / 100) + investmentAmount;

      currentWeeklyProfit = currentWeeklyProfit * (1 + businessGrowthRate / 100);
      businessValue =
        currentWeeklyProfit * config.constants.weeksPerYear * config.constants.businessValueMultiplier;
    }

    setTimelineData(data);
    setMilestones(milestoneData);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const businessColor = config.colors.business;
  const portfolioColor = config.colors.portfolio;
  const totalColor = config.colors.total;

  const getSliderAriaValueText = (value: number, unit: string) => {
    return `${value} ${unit}`;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <section
          className="bg-white rounded-xl"
          role="region"
          aria-labelledby="parameters-heading"
          aria-describedby="calculator-description"
        >
          <h2 id="parameters-heading" className="text-md font-bold mb-2 pb-1">
            {t(config.translations.adjustParameters)}
          </h2>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mb-3">
            <div className="p-3 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-1">
                <label className="text-md font-medium flex items-center" htmlFor="current-age">
                  {t(config.translations.currentAge)}
                </label>
                <span className="text-md font-bold text-[#5C0000]" aria-hidden="true">
                  {currentAge}
                </span>
              </div>
              <input
                id="current-age"
                type="range"
                min={config.sliders.currentAge.min}
                max={config.sliders.currentAge.max}
                step={config.sliders.currentAge.step}
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="global-slider w-full"
                style={{
                  background: `linear-gradient(to right, #007bff 0%, #007bff ${((currentAge - config.sliders.currentAge.min) / (config.sliders.currentAge.max - config.sliders.currentAge.min)) * 100}%, #949494 ${((currentAge - config.sliders.currentAge.min) / (config.sliders.currentAge.max - config.sliders.currentAge.min)) * 100}%, #949494 100%)`,
                }}
                aria-label={t(config.translations.currentAgeSlider)}
                aria-valuemin={config.sliders.currentAge.min}
                aria-valuemax={config.sliders.currentAge.max}
                aria-valuenow={currentAge}
                aria-valuetext={getSliderAriaValueText(currentAge, t(config.translations.yearsOld))}
                aria-describedby="current-age-description"
              />
              <div id="current-age-description" className="sr-only">
                {t(config.translations.setCurrentAgeBetween)} {config.sliders.currentAge.min}{' '}
                {t(config.translations.and)} {config.sliders.currentAge.max} {t(config.translations.years)}.{' '}
                {t(config.translations.currentlySetTo)} {currentAge} {t(config.translations.yearsOld)}.
              </div>
            </div>

            <div className="p-3 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-1">
                <label className="text-md font-medium flex items-center" htmlFor="weekly-profit">
                  {t(config.translations.weeklyBusinessProfit)}
                </label>
                <span className={`text-md font-bold text-[${totalColor}]`} aria-hidden="true">
                  ${weeklyProfit}
                </span>
              </div>
              <input
                id="weekly-profit"
                type="range"
                min={config.sliders.weeklyProfit.min}
                max={config.sliders.weeklyProfit.max}
                step={config.sliders.weeklyProfit.step}
                value={weeklyProfit}
                onChange={(e) => setWeeklyProfit(Number(e.target.value))}
                className="global-slider w-full"
                style={{
                  background: `linear-gradient(to right, #007bff 0%, #007bff ${((weeklyProfit - config.sliders.weeklyProfit.min) / (config.sliders.weeklyProfit.max - config.sliders.weeklyProfit.min)) * 100}%, #949494 ${((weeklyProfit - config.sliders.weeklyProfit.min) / (config.sliders.weeklyProfit.max - config.sliders.weeklyProfit.min)) * 100}%, #949494 100%)`,
                }}
                aria-label={t(config.translations.weeklyBusinessProfitSlider)}
                aria-valuemin={config.sliders.weeklyProfit.min}
                aria-valuemax={config.sliders.weeklyProfit.max}
                aria-valuenow={weeklyProfit}
                aria-valuetext={getSliderAriaValueText(weeklyProfit, t(config.translations.dollarsPerWeek))}
                aria-describedby="weekly-profit-description"
              />
              <div id="weekly-profit-description" className="sr-only">
                {t(config.translations.setWeeklyBusinessProfitBetween)} ${config.sliders.weeklyProfit.min}{' '}
                {t(config.translations.and)} ${config.sliders.weeklyProfit.max}.{' '}
                {t(config.translations.currentlySetTo)} ${weeklyProfit} {t(config.translations.perWeek)}.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mb-3">
            <div className="p-3 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-1">
                <label className="text-md font-medium flex items-center" htmlFor="investment-percentage">
                  {t(config.translations.percentageToInvest)}
                </label>
                <span className="text-md font-bold text-[#9B303A]" aria-hidden="true">
                  {investmentPercentage}%
                </span>
              </div>
              <input
                id="investment-percentage"
                type="range"
                min={config.sliders.investmentPercentage.min}
                max={config.sliders.investmentPercentage.max}
                step={config.sliders.investmentPercentage.step}
                value={investmentPercentage}
                onChange={(e) => setInvestmentPercentage(Number(e.target.value))}
                className="global-slider w-full"
                style={{
                  background: `linear-gradient(to right, #007bff 0%, #007bff ${((investmentPercentage - config.sliders.investmentPercentage.min) / (config.sliders.investmentPercentage.max - config.sliders.investmentPercentage.min)) * 100}%, #949494 ${((investmentPercentage - config.sliders.investmentPercentage.min) / (config.sliders.investmentPercentage.max - config.sliders.investmentPercentage.min)) * 100}%, #949494 100%)`,
                }}
                aria-label={t(config.translations.investmentPercentageSlider)}
                aria-valuemin={config.sliders.investmentPercentage.min}
                aria-valuemax={config.sliders.investmentPercentage.max}
                aria-valuenow={investmentPercentage}
                aria-valuetext={getSliderAriaValueText(
                  investmentPercentage,
                  t(config.translations.percentToInvest),
                )}
                aria-describedby="investment-percentage-description"
              />
              <div id="investment-percentage-description" className="sr-only">
                {t(config.translations.setPercentageOfBusinessProfitToInvestBetween)}{' '}
                {config.sliders.investmentPercentage.min}% {t(config.translations.and)}{' '}
                {config.sliders.investmentPercentage.max}%. {t(config.translations.currentlySetTo)}{' '}
                {investmentPercentage}%.
              </div>
            </div>

            <div className="p-3 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-1">
                <label className="text-md font-medium flex items-center" htmlFor="business-growth">
                  {t(config.translations.businessGrowthRate)}
                </label>
                <span className={`text-md font-bold text-[${portfolioColor}]`} aria-hidden="true">
                  {businessGrowthRate}%
                </span>
              </div>
              <input
                id="business-growth"
                type="range"
                min={config.sliders.businessGrowthRate.min}
                max={config.sliders.businessGrowthRate.max}
                step={config.sliders.businessGrowthRate.step}
                value={businessGrowthRate}
                onChange={(e) => setBusinessGrowthRate(Number(e.target.value))}
                className="global-slider w-full"
                style={{
                  background: `linear-gradient(to right, #007bff 0%, #007bff ${((businessGrowthRate - config.sliders.businessGrowthRate.min) / (config.sliders.businessGrowthRate.max - config.sliders.businessGrowthRate.min)) * 100}%, #949494 ${((businessGrowthRate - config.sliders.businessGrowthRate.min) / (config.sliders.businessGrowthRate.max - config.sliders.businessGrowthRate.min)) * 100}%, #949494 100%)`,
                }}
                aria-label={t(config.translations.businessGrowthRateSlider)}
                aria-valuemin={config.sliders.businessGrowthRate.min}
                aria-valuemax={config.sliders.businessGrowthRate.max}
                aria-valuenow={businessGrowthRate}
                aria-valuetext={getSliderAriaValueText(
                  businessGrowthRate,
                  t(config.translations.percentAnnualGrowth),
                )}
                aria-describedby="business-growth-description"
              />
              <div id="business-growth-description" className="sr-only">
                {t(config.translations.setAnnualBusinessGrowthRateBetween)} {config.sliders.businessGrowthRate.min}
                % {t(config.translations.and)} {config.sliders.businessGrowthRate.max}%.{' '}
                {t(config.translations.currentlySetTo)} {businessGrowthRate}% {t(config.translations.perYear)}.
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-1">
              <label className="text-md font-medium flex items-center" htmlFor="investment-return">
                {t(config.translations.investmentReturnApr)}
              </label>
              <span className={`text-md font-bold text-[${totalColor}]`} aria-hidden="true">
                {investmentReturn}%
              </span>
            </div>
            <input
              id="investment-return"
              type="range"
              min={config.sliders.investmentReturn.min}
              max={config.sliders.investmentReturn.max}
              step={config.sliders.investmentReturn.step}
              value={investmentReturn}
              onChange={(e) => setInvestmentReturn(Number(e.target.value))}
              className="global-slider w-full"
              style={{
                background: `linear-gradient(to right, #007bff 0%, #007bff ${((investmentReturn - config.sliders.investmentReturn.min) / (config.sliders.investmentReturn.max - config.sliders.investmentReturn.min)) * 100}%, #949494 ${((investmentReturn - config.sliders.investmentReturn.min) / (config.sliders.investmentReturn.max - config.sliders.investmentReturn.min)) * 100}%, #949494 100%)`,
              }}
              aria-label={t(config.translations.investmentReturnRateSlider)}
              aria-valuemin={config.sliders.investmentReturn.min}
              aria-valuemax={config.sliders.investmentReturn.max}
              aria-valuenow={investmentReturn}
              aria-valuetext={getSliderAriaValueText(investmentReturn, t(config.translations.percentAnnualReturn))}
              aria-describedby="investment-return-description"
            />
            <div id="investment-return-description" className="sr-only">
              {t(config.translations.setExpectedAnnualInvestmentReturnBetween)}{' '}
              {config.sliders.investmentReturn.min}% {t(config.translations.and)}{' '}
              {config.sliders.investmentReturn.max}%. {t(config.translations.currentlySetTo)} {investmentReturn}%{' '}
              {t(config.translations.perYear)}.
            </div>
          </div>
        </section>

        <section
          className="bg-white p-4 rounded-xl shadow-md"
          role="region"
          aria-labelledby="chart-heading"
          aria-describedby="chart-description"
        >
          <h2 id="chart-heading" className="text-md font-bold mb-2 flex items-center justify-center">
            {t(config.translations.yourPathToMillion)}
          </h2>
          <div id="chart-description" className="sr-only mb-4">
            {t(config.translations.chartShowsProjectedWealthGrowthOverTime)}{' '}
            {t(config.translations.chartDisplaysDataFromAge)} {currentAge} {t(config.translations.toAge)}{' '}
            {currentAge + 30}.
          </div>

          <div className="sr-only" aria-label={t(config.translations.chartDataSummary)}>
            <h3>{t(config.translations.keyDataPoints)}:</h3>
            <ul>
              <li>
                {t(config.translations.startingAge)}: {currentAge}
              </li>
              <li>
                {t(config.translations.currentWeeklyProfit)}: ${weeklyProfit}
              </li>
              <li>
                {t(config.translations.investmentPercentage)}: {investmentPercentage}%
              </li>
              <li>
                {t(config.translations.businessGrowthRate)}: {businessGrowthRate}%{' '}
                {t(config.translations.annually)}
              </li>
              <li>
                {t(config.translations.investmentReturnRate)}: {investmentReturn}%{' '}
                {t(config.translations.annually)}
              </li>
              {timelineData[config.display.tenYearInterval] && (
                <li>
                  {t(config.translations.projectedNetWorthAtAge)} {currentAge + config.display.tenYearInterval}:{' '}
                  {formatCurrency(timelineData[config.display.tenYearInterval].totalValue)}
                </li>
              )}
              {timelineData[config.display.twentyYearInterval] && (
                <li>
                  {t(config.translations.projectedNetWorthAtAge)} {currentAge + config.display.twentyYearInterval}:{' '}
                  {formatCurrency(timelineData[config.display.twentyYearInterval].totalValue)}
                </li>
              )}
              {milestones.millionaireAge > 0 && (
                <li>
                  {t(config.translations.projectedToReachMillionAtAge)} {milestones.millionaireAge}
                </li>
              )}
            </ul>
          </div>

          <div
            className="h-64 relative"
            aria-labelledby="chart-heading"
            aria-describedby="chart-description chart-data-summary"
          >
            <ResponsiveContainer width="100%" height="100%" >
              <AreaChart data={timelineData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="age"
                  stroke="#000000"
                  tickLine={false}
                  role="img"
                  aria-label={t(config.translations.ageInYears)}
                />
                <YAxis
                  tickFormatter={(value) =>
                    value >= config.formatting.millionThreshold
                      ? `$${(value / config.formatting.millionDivisor).toFixed(1)}M`
                      : value >= config.formatting.thousandThreshold
                        ? `$${value / config.formatting.thousandDivisor}K`
                        : `$${value}`
                  }
                  stroke="#000000"
                  tickLine={false}
                  axisLine={false}
                  role="img"
                  aria-label={t(config.translations.dollarAmount)}
                />
                <Tooltip
                  cursor={false}
                  content={(props) => {
                    if (!props.active || !props.payload || props.payload.length === 0 || isKeyboardFocus) {
                      return null;
                    }
                    
                    const currentAge = props.label;
                    const dataPoint = timelineData.find(d => d.age === currentAge);
                    
                    if (!dataPoint) return null;
                    
                    return (
                      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-10 pointer-events-none">
                        <div className="text-base font-medium text-gray-900">
                          {t(config.translations.age)} {props.label}
                        </div>
                        <div className="text-base text-black">
                          {t(config.translations.totalNetWorth)}: <span className="text-lg font-bold" style={{ color: totalColor }}>
                            {formatCurrency(dataPoint.totalValue)}
                          </span>
                        </div>
                        <div className="text-base text-black">
                          {t(config.translations.investmentPortfolio)}: <span className="text-lg font-bold" style={{ color: portfolioColor }}>
                            {formatCurrency(dataPoint.portfolioValue)}
                          </span>
                        </div>
                        <div className="text-base text-black">
                          {t(config.translations.businessValue)}: <span className="text-lg font-bold" style={{ color: businessColor }}>
                            {formatCurrency(dataPoint.businessValue)}
                          </span>
                        </div>
                      </div>
                    );
                  }}
                />
                <Legend verticalAlign="top" height={30} />
                <defs>
                  <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={portfolioColor} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={portfolioColor} stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="businessGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={businessColor} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={businessColor} stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={totalColor} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={totalColor} stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <ReferenceLine
                  y={config.milestones.million}
                  stroke="#000000"
                  strokeDasharray="3 3"
                  label={{
                    value: t(config.translations.millionaireGoal),
                    position: 'insideBottomLeft',
                    fill: '#000000',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="portfolioValue"
                  name={t(config.translations.investmentPortfolio)}
                  stroke={portfolioColor}
                  fill="url(#portfolioGradient)"
                  strokeWidth={2}
                  activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="businessValue"
                  name={t(config.translations.businessValue)}
                  stroke={businessColor}
                  fill="url(#businessGradient)"
                  strokeWidth={2}
                  activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="totalValue"
                  name={t(config.translations.totalNetWorth)}
                  stroke={totalColor}
                  fill="url(#totalGradient)"
                  strokeWidth={2}
                  activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* Invisible focusable elements for keyboard navigation */}
            {timelineData.map((point, index) => {
              // Calculate the Y position based on the data value
              const chartHeight = 264; // Total height of chart container
              const chartMargin = { top: 5, bottom: 5 }; // From AreaChart margin
              const availableHeight = chartHeight - chartMargin.top - chartMargin.bottom;
              
              // Find the max value to calculate relative position
              const maxValue = Math.max(
                ...timelineData.map(d => Math.max(d.totalValue, d.portfolioValue, d.businessValue))
              );
              
              // Calculate Y position (inverted because SVG coordinates start from top)
              const yPercent = 1 - (Math.max(point.totalValue, point.portfolioValue, point.businessValue) / maxValue);
              const yPosition = chartMargin.top + (yPercent * availableHeight * 0.8); // 0.8 to account for some padding
              
              return (
                <button
                  key={`focus-point-${index}`}
                  className="absolute w-4 h-4 opacity-0 focus:opacity-100 focus:bg-blue-500 focus:rounded-full focus:outline-2 focus:outline-blue-600 focus:outline-offset-2"
                  style={{
                    left: `${5 + (index * (90 / (timelineData.length - 1)))}%`,
                    top: `${yPosition}px`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10
                  }}
                  onFocus={() => handleFocus(index)}
                  onBlur={handleBlur}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  aria-label={`${t(config.translations.age)} ${point.age}: ${t(config.translations.totalNetWorth)} ${formatCurrency(point.totalValue)}, ${t(config.translations.investmentPortfolio)} ${formatCurrency(point.portfolioValue)}, ${t(config.translations.businessValue)} ${formatCurrency(point.businessValue)}`}
                />
              );
            })}

            {/* Custom tooltip for keyboard focus only */}
            {activeIndex !== null && isKeyboardFocus && (
              (() => {
                const activePoint = timelineData[activeIndex];
                if (!activePoint) return null;
                
                // Calculate the same Y position for the tooltip
                const chartHeight = 264;
                const chartMargin = { top: 5, bottom: 5 };
                const availableHeight = chartHeight - chartMargin.top - chartMargin.bottom;
                
                const maxValue = Math.max(
                  ...timelineData.map(d => Math.max(d.totalValue, d.portfolioValue, d.businessValue))
                );
                
                const yPercent = 1 - (Math.max(activePoint.totalValue, activePoint.portfolioValue, activePoint.businessValue) / maxValue);
                const yPosition = chartMargin.top + (yPercent * availableHeight * 0.8);
                
                return (
                  <div
                    className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-20 pointer-events-none"
                    style={{
                      left: `${5 + (activeIndex * (90 / (timelineData.length - 1)))}%`,
                      top: `${Math.max(10, yPosition - 80)}px`, // Offset above the point, with minimum top margin
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <div className="text-base font-medium text-gray-900">
                      {t(config.translations.age)} {activePoint.age}
                    </div>
                    <div className="text-base text-black">
                      {t(config.translations.totalNetWorth)}: <span className="text-lg font-bold" style={{ color: totalColor }}>
                        {formatCurrency(activePoint.totalValue)}
                      </span>
                    </div>
                    <div className="text-base text-black">
                      {t(config.translations.investmentPortfolio)}: <span className="text-lg font-bold" style={{ color: portfolioColor }}>
                        {formatCurrency(activePoint.portfolioValue)}
                      </span>
                    </div>
                    <div className="text-base text-black">
                      {t(config.translations.businessValue)}: <span className="text-lg font-bold" style={{ color: businessColor }}>
                        {formatCurrency(activePoint.businessValue)}
                      </span>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        </section>

        <section
          className="grid grid-cols-1 xl:grid-cols-2 gap-3 mb-5"
          role="region"
          aria-labelledby="milestones-heading"
        >
          <h2 id="milestones-heading" className="sr-only">
            {t(config.translations.financialMilestonesAndProjections)}
          </h2>

          <article
            className="bg-white p-3 rounded-xl shadow-md border-l-4 border-[#5C0000]"
            role="region"
            aria-labelledby="key-milestones-heading"
          >
            <h3 id="key-milestones-heading" className="text-md font-bold mb-2 flex items-center">
              {t(config.translations.keyMilestones)}
            </h3>
            <div
              className="space-y-2"
              role="list"
              aria-label={t(config.translations.financialMilestoneAchievements)}
            >
              <div className="flex justify-between" role="listitem">
                <span className="text-md text-slate-600">{t(config.translations.firstThousand)}:</span>
                <span
                  className="text-md font-bold text-slate-800"
                  aria-label={`${t(config.translations.firstThousandDollarsAtAge)} ${milestones.thousandaireAge || t(config.translations.unknown)}`}
                >
                  {t(config.translations.age)} {milestones.thousandaireAge || '-'}
                </span>
              </div>
              <div className="flex justify-between" role="listitem">
                <span className="text-md text-slate-600">{t(config.translations.firstHundredThousand)}:</span>
                <span
                  className="text-md font-bold text-slate-800"
                  aria-label={`${t(config.translations.firstHundredThousandDollarsAtAge)} ${milestones.hundredThousandaireAge || t(config.translations.unknown)}`}
                >
                  {t(config.translations.age)} {milestones.hundredThousandaireAge || '-'}
                </span>
              </div>
              <div className="flex justify-between border-t border-blue-200 pt-1 mt-1" role="listitem">
                <span className="text-md font-semibold text-slate-700">{t(config.translations.millionaire)}:</span>
                <span
                  className="text-md font-bold text-[#5C0000]"
                  aria-label={`${t(config.translations.millionaireStatusAtAge)} ${milestones.millionaireAge || t(config.translations.unknown)}`}
                >
                  {t(config.translations.age)} {milestones.millionaireAge || '-'}
                </span>
              </div>
            </div>
          </article>

          <article
            className={`bg-white p-3 rounded-xl shadow-md border-l-4 border-[${totalColor}]`}
            role="region"
            aria-labelledby="projection-heading"
          >
            <h3 id="projection-heading" className="text-md font-bold mb-2 flex items-center">
              {t(config.translations.valueAtAge)} {currentAge + config.display.fifteenYearInterval}
            </h3>
            <div
              className="space-y-2"
              role="list"
              aria-label={t(config.translations.projectedValuesAtAgeFifteenYearsFromNow)}
            >
              {timelineData[config.display.fifteenYearInterval] && (
                <>
                  <div className="flex justify-between" role="listitem">
                    <span className="text-md text-slate-600">{t(config.translations.portfolio)}:</span>
                    <span
                      className="text-md font-bold text-slate-800"
                      aria-label={`${t(config.translations.portfolioValue)}: ${formatCurrency(timelineData[config.display.fifteenYearInterval].portfolioValue)}`}
                    >
                      {formatCurrency(timelineData[config.display.fifteenYearInterval].portfolioValue)}
                    </span>
                  </div>
                  <div className="flex justify-between" role="listitem">
                    <span className="text-md text-slate-600">{t(config.translations.business)}:</span>
                    <span
                      className="text-md font-bold text-slate-800"
                      aria-label={`${t(config.translations.businessValue)}: ${formatCurrency(timelineData[config.display.fifteenYearInterval].businessValue)}`}
                    >
                      {formatCurrency(timelineData[config.display.fifteenYearInterval].businessValue)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-purple-200 pt-1 mt-1" role="listitem">
                    <span className="text-md font-semibold text-slate-700">
                      {t(config.translations.totalNetWorth)}:
                    </span>
                    <span
                      className={`text-md font-bold text-[${totalColor}]`}
                      aria-label={`${t(config.translations.totalNetWorth)}: ${formatCurrency(timelineData[config.display.fifteenYearInterval].totalValue)}`}
                    >
                      {formatCurrency(timelineData[config.display.fifteenYearInterval].totalValue)}
                    </span>
                  </div>
                </>
              )}
            </div>
          </article>
        </section>

        {milestones.millionaireAge > 0 && milestones.millionaireAge <= config.achievements.earlyMillionaireAge && (
          <aside
            className="bg-white p-3 rounded-xl shadow-md border-l-4 border-amber-500 flex items-center"
            role="status"
            aria-live="polite"
            aria-label={t(config.translations.achievementNotification)}
          >
            <div>
              <p className="font-bold text-amber-800 text-md">{t(config.translations.earlyFinancialFreedom)}</p>
              <p className="text-amber-700 text-md">
                {t(config.translations.youWillBeMillionaireBeforeTurning)}{' '}
                {config.achievements.earlyMillionaireAge}. {t(config.translations.keepUpGreatWork)}
              </p>
            </div>
          </aside>
        )}

        {investmentReturn < config.achievements.conservativeReturnThreshold && (
          <aside
            className="bg-white p-3 rounded-xl shadow-md border-l-4 border-[#235790] text-center"
            role="note"
            aria-labelledby="investment-note-heading"
          >
            <h3 id="investment-note-heading" className="font-bold text-[#235790] text-md">
              {t(config.translations.investmentStrategyNote)}
            </h3>
            <p className="text-slate-700 text-md">
              {t(config.translations.yourInvestmentReturnIsConservative)}{' '}
              {t(config.translations.considerDiversifyingIntoIndexFunds)}
            </p>
          </aside>
        )}
      </div>
    </div>
  );
};

export default MillionaireCalculator;
