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
import { ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { useTranslations } from '../../../hooks/useTranslations';

interface IconProps {
  className?: string;
  size?: number;
}

const AlertTriangle = ({ className, size = 24 }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CompoundInterestCalculator = () => {
  const [weeklyContribution, setWeeklyContribution] = useState(100);
  const [annualReturn, setAnnualReturn] = useState(5);
  const [projectionData, setProjectionData] = useState<
    { year: number; totalValue: number; totalContributed: number; totalGrowth: number }[]
  >([]);

  // Add keyboard navigation state
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setResults] = useState({});
  const initialInvestment = 0;
  const years = 10;

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

  const calculateCompoundInterest = () => {
    const data = [];
    const monthlyRate = annualReturn / 100 / 12;
    const totalMonths = years * 12;
    const monthlyContribution = (weeklyContribution * 52) / 12;

    let totalValue = initialInvestment;
    let totalContributed = initialInvestment;

    // Add initial point
    data.push({
      year: 0,
      totalValue: totalValue,
      totalContributed: totalContributed,
      investmentGrowth: 0
    });

    for (let month = 1; month <= totalMonths; month++) {
      // Apply compound interest
      totalValue = totalValue * (1 + monthlyRate);

      // Add monthly contribution
      totalValue += monthlyContribution;
      totalContributed += monthlyContribution;

      // Add data point every 12 months
      if (month % 12 === 0) {
        const year = month / 12;
        const investmentGrowth = totalValue - totalContributed;

        data.push({
          year: year,
          totalValue: totalValue,
          totalContributed: totalContributed,
          investmentGrowth: investmentGrowth
        });
      }
    }

    const finalValue = totalValue;
    const finalContributed = totalContributed;
    const finalGrowth = finalValue - finalContributed;
    const annualSavings = weeklyContribution * 52;
    const doublingTime = 72 / annualReturn;

    // Convert data to match the expected type for setProjectionData
    const formattedData = data.map(({ year, totalValue, totalContributed, investmentGrowth }) => ({
      year,
      totalValue,
      totalContributed,
      totalGrowth: investmentGrowth // Renamed to match the expected property name
    }));

    setProjectionData(formattedData);
    setResults({
      finalValue,
      finalContributed,
      finalGrowth,
      weeklyContribution,
      annualSavings,
      doublingTime,
      returnRate: annualReturn
    });
  };

  useEffect(() => {
    calculateCompoundInterest();
  }, [weeklyContribution, annualReturn]);


  const formatCurrency = (value: bigint | ValueType) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(Number(value));
  };

  // Rule of 72 calculation for doubling time
  const doublingTime = Math.round((72 / annualReturn) * 10) / 10;

  const totalValueColor = '#008217'; // emerald-500
  const totalContributedColor = '#0061FC'; // blue-500  
  const totalGrowthColor = '#8E24AA'; // violet-500

  return (
    <div className="w-full" role="region" aria-label={t('scenes.S11.S11_D0_FX_C9.title')}>
      <div className="flex flex-col gap-4">
        {/* Input Controls */}
        <div className="bg-white" role="region" aria-label={t('scenes.S11.S11_D0_FX_C9.calculator_controls')}>
          <h1 className="text-base font-bold mb-2 pb-1" id="parameters-heading">
            {t('scenes.S11.S11_D0_FX_C9.investment_parameters')}
          </h1>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mb-3">
            <div className="p-3 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-1">
                <label className="text-md font-medium flex items-center" htmlFor="weekly-contribution">
                  {t('scenes.S11.S11_D0_FX_C9.weekly_contribution')}
                </label>
                <span
                  className="text-md font-bold text-[#235790]"
                  aria-label={`${t('scenes.S11.S11_D0_FX_C9.current_weekly_contribution')} $${weeklyContribution}`}
                >
                  ${weeklyContribution}
                </span>
              </div>
              <input
                id="weekly-contribution"
                type="range"
                min="10"
                max="200"
                step="10"
                value={weeklyContribution}
                onChange={(e) => setWeeklyContribution(Number(e.target.value))}
                className="global-slider w-full"
                style={{
                  background: `linear-gradient(to right, #007bff 0%, #007bff ${((weeklyContribution - 10) / (200 - 10)) * 100}%, #e0e0e0 ${((weeklyContribution - 10) / (200 - 10)) * 100}%, #e0e0e0 100%)`,
                }}
                aria-label={t('scenes.S11.S11_D0_FX_C9.weekly_contribution_slider')}
                aria-valuemin={10}
                aria-valuemax={200}
                aria-valuenow={weeklyContribution}
                aria-valuetext={`$${weeklyContribution}`}
                placeholder="0"
              />
            </div>

            <div className="p-3 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-1">
                <label className="text-md font-medium flex items-center" htmlFor="annual-return">
                  {t('scenes.S11.S11_D0_FX_C9.annual_return_rate')}
                </label>
                <span
                  className="text-md font-bold text-purple-600"
                  aria-label={`${t('scenes.S11.S11_D0_FX_C9.current_annual_return_rate')} ${annualReturn}%`}
                >
                  {annualReturn}%
                </span>
              </div>
              <input
                id="annual-return"
                type="range"
                min="4"
                max="12"
                step="0.5"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(Number(e.target.value))}
                className="global-slider w-full"
                style={{
                  background: `linear-gradient(to right, #007bff 0%, #007bff ${((annualReturn - 4) / (12 - 4)) * 100}%, #e0e0e0 ${((annualReturn - 4) / (12 - 4)) * 100}%, #e0e0e0 100%)`,
                }}
                aria-label={t('scenes.S11.S11_D0_FX_C9.annual_return_rate_slider')}
                aria-valuemin={4}
                aria-valuemax={12}
                aria-valuenow={annualReturn}
                aria-valuetext={`${annualReturn}%`}
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <div
          className="shadow-md p-4 mb-2 rounded-xl"
          role="region"
          aria-label={t('scenes.S11.S11_D0_FX_C9.formula_explanation')}
        >
          <p className="font-bold text-md mb-2" id="formula-heading">
            {t('scenes.S11.S11_D0_FX_C9.compound_interest_formula')}
          </p>
          <div
            className="bg-white p-2 rounded-lg text-md mb-2 flex items-center justify-center"
            role="math"
            aria-label={t('scenes.S11.S11_D0_FX_C9.compound_interest_formula_description')}
          >
            <span aria-hidden="true" className="text-2xl font-besley">
              <span className="text-[#8200C3] font-bold italic">A</span>
              <span> = </span>
              <span className="text-[#9F008F] font-bold italic">P</span>
              <span> (1 + </span>
              <span className="text-[#0055B2] font-bold italic">r</span>
              <span>)</span>
              <sup className="text-[#A13C34] font-bold italic">t</sup>
              <span> + </span>
              <span className="text-[#006400] font-bold italic">PMT</span>
              <span className="text-black text-xl font-bold"> × </span>
              <span
                style={{
                  fontFamily: 'Courier New, monospace',
                  fontSize: '1.5em',
                  transform: 'scaleY(1.8)',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                }}
              >
                [
              </span>
              <span
                style={{
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: '0.9em',
                    lineHeight: '1.2',
                  }}
                >
                  <div style={{ borderBottom: '2px solid black' }}>
                    (1 + <span className="text-[#0055B2] font-bold italic">r</span>)
                    <sup className="text-[#A13C34] font-bold italic">t</sup> - 1
                  </div>
                  <div>
                    <span className="text-[#0055B2] font-bold italic">r</span>
                  </div>
                </div>
              </span>
              <span
                style={{
                  fontFamily: 'Courier New, monospace',
                  fontSize: '1.5em',
                  transform: 'scaleY(1.8)',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                }}
              >
                ]
              </span>
            </span>
          </div>
          <p className="text-md text-left" role="list" aria-label={t('scenes.S11.S11_D0_FX_C9.formula_variables')}>
            {t('scenes.S11.S11_D0_FX_C9.where')}:<br />
            <span role="listitem">
              <span className="text-[#8200C3] font-bold italic font-besley text-lg">A</span> ={' '}
              {t('scenes.S11.S11_D0_FX_C9.final_amount')}
            </span>
            <br />
            <span role="listitem">
              <span className="text-[#9F008F] font-bold italic font-besley text-lg">P</span> ={' '}
              {t('scenes.S11.S11_D0_FX_C9.principal').replace('{initialInvestment}', initialInvestment.toString())}
            </span>
            <br />
            <span role="listitem">
              <span className="text-[#0055B2] font-bold italic font-besley text-lg">r</span> ={' '}
              {t('scenes.S11.S11_D0_FX_C9.annual_interest_rate').replace(
                '{annualReturn}',
                annualReturn.toString(),
              )}
            </span>
            <br />
            <span role="listitem">
              <span className="text-[#A13C34] font-bold italic font-besley text-lg">t</span> ={' '}
              {t('scenes.S11.S11_D0_FX_C9.time_in_years').replace('{years}', years.toString())}
            </span>
            <br />
            <span role="listitem">
              <span className="text-[#006400] font-bold italic font-besley text-lg">PMT</span> ={' '}
              {t('scenes.S11.S11_D0_FX_C9.weekly_payment').replace(
                '{weeklyContribution}',
                weeklyContribution.toString(),
              )}
            </span>
            <br />
            <span role="listitem">
              {t('scenes.S11.S11_D0_FX_C9.rule_of_72').replace('{doublingTime}', doublingTime.toString())}
            </span>
          </p>
        </div>

        {/* Main Chart */}
        <div className="">
          <h2 className="text-md font-bold mb-5 flex items-center justify-center" id="chart-title">
            {years} {t('scenes.S11.S11_D0_FX_C9.year_investment_growth_projection')}
          </h2>
          <div className="h-64 relative" role="region" aria-labelledby="chart-title">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={projectionData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                role="img"
                aria-label={t('scenes.S11.S11_D0_FX_C9.investment_growth_projection_chart')}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="undefined" />
                <XAxis
                  dataKey="year"
                  stroke="#000000"
                  tickLine={false}
                  role="img"
                  aria-label={t('scenes.S11.S11_D0_FX_C9.years_axis')}
                />
                <YAxis
                  tickFormatter={(value) =>
                    value >= 1000000
                      ? `$${(value / 1000000).toFixed(1)}M`
                      : value >= 1000
                        ? `$${Math.round(value / 1000)}K`
                        : `$${value}`
                  }
                  stroke="#000000"
                  tickLine={false}
                  axisLine={false}
                  role="img"
                  aria-label={t('scenes.S11.S11_D0_FX_C9.value_in_usd')}
                />
                <Tooltip
                  cursor={false}
                  content={(props) => {
                    if (!props.active || !props.payload || props.payload.length === 0 || isKeyboardFocus) {
                      return null;
                    }

                    const currentYear = props.label;
                    const dataPoint = projectionData.find(d => d.year === currentYear);

                    if (!dataPoint) return null;

                    return (
                      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-10 pointer-events-none">
                        <div className="text-base font-medium text-gray-900">
                          {t('scenes.S11.S11_D0_FX_C9.year')} {props.label}
                        </div>
                        <div className="text-base text-black">
                          {t('scenes.S11.S11_D0_FX_C9.total_value')}: <span className="text-lg font-bold" style={{ color: totalValueColor }}>
                            {formatCurrency(dataPoint.totalValue)}
                          </span>
                        </div>
                        <div className="text-base text-black">
                          {t('scenes.S11.S11_D0_FX_C9.total_contributed')}: <span className="text-lg font-bold" style={{ color: totalContributedColor }}>
                            {formatCurrency(dataPoint.totalContributed)}
                          </span>
                        </div>
                        <div className="text-base text-black">
                          {t('scenes.S11.S11_D0_FX_C9.investment_growth')}: <span className="text-lg font-bold" style={{ color: totalGrowthColor }}>
                            {formatCurrency(dataPoint.totalGrowth)}
                          </span>
                        </div>
                      </div>
                    );
                  }}
                />
                <Legend verticalAlign="top" height={30} />
                <defs>
                  <linearGradient id="totalValueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={totalValueColor} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={totalValueColor} stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="totalContributedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={totalContributedColor} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={totalContributedColor} stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="totalGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={totalGrowthColor} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={totalGrowthColor} stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <ReferenceLine
                  y={initialInvestment}
                  stroke="#000000"
                  strokeDasharray="3 3"
                  label={{
                    value: t('scenes.S11.S11_D0_FX_C9.starting_point'),
                    position: 'insideBottomLeft',
                    fill: '#000000',
                  }}
                  role="img"
                  aria-label={`${t('scenes.S11.S11_D0_FX_C9.starting_point')}: $${initialInvestment}`}
                />
                <Area
                  type="monotone"
                  dataKey="totalValue"
                  name={t('scenes.S11.S11_D0_FX_C9.total_value')}
                  stroke={totalValueColor}
                  fill="url(#totalValueGradient)"
                  strokeWidth={2}
                  activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                  role="img"
                  aria-label={t('scenes.S11.S11_D0_FX_C9.total_investment_value_area')}
                />
                <Area
                  type="monotone"
                  dataKey="totalContributed"
                  name={t('scenes.S11.S11_D0_FX_C9.total_contributed')}
                  stroke={totalContributedColor}
                  fill="url(#totalContributedGradient)"
                  strokeWidth={2}
                  activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                  role="img"
                  aria-label={t('scenes.S11.S11_D0_FX_C9.total_contributed_area')}
                />
                <Area
                  type="monotone"
                  dataKey="totalGrowth"
                  name={t('scenes.S11.S11_D0_FX_C9.investment_growth')}
                  stroke={totalGrowthColor}
                  fill="url(#totalGrowthGradient)"
                  strokeWidth={2}
                  activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                  role="img"
                  aria-label={t('scenes.S11.S11_D0_FX_C9.investment_growth_area')}
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* Invisible focusable elements for keyboard navigation */}
            {projectionData.map((point, index) => {
              // Calculate the Y position based on the data value
              const chartHeight = 264; // Total height of chart container
              const chartMargin = { top: 5, bottom: 5 }; // From AreaChart margin
              const availableHeight = chartHeight - chartMargin.top - chartMargin.bottom;

              // Find the max value to calculate relative position
              const maxValue = Math.max(
                ...projectionData.map(d => Math.max(d.totalValue, d.totalContributed, d.totalGrowth))
              );

              // Calculate Y position (inverted because SVG coordinates start from top)
              const yPercent = 1 - (Math.max(point.totalValue, point.totalContributed, point.totalGrowth) / maxValue);
              const yPosition = chartMargin.top + (yPercent * availableHeight * 0.8); // 0.8 to account for some padding

              return (
                <button
                  key={`focus-point-${index}`}
                  className="absolute w-4 h-4 opacity-0 focus:opacity-100 focus:bg-blue-500 focus:rounded-full focus:outline-2 focus:outline-blue-600 focus:outline-offset-2"
                  style={{
                    left: `${5 + (index * (90 / (projectionData.length - 1)))}%`,
                    top: `${yPosition}px`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10
                  }}
                  onFocus={() => handleFocus(index)}
                  onBlur={handleBlur}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  aria-label={`${t('scenes.S11.S11_D0_FX_C9.year')} ${point.year}: ${t('scenes.S11.S11_D0_FX_C9.total_value')} ${formatCurrency(point.totalValue)}, ${t('scenes.S11.S11_D0_FX_C9.total_contributed')} ${formatCurrency(point.totalContributed)}, ${t('scenes.S11.S11_D0_FX_C9.investment_growth')} ${formatCurrency(point.totalGrowth)}`}
                />
              );
            })}

            {/* Custom tooltip for keyboard focus only */}
            {activeIndex !== null && isKeyboardFocus && (
              (() => {
                const activePoint = projectionData[activeIndex];
                if (!activePoint) return null;

                // Calculate the same Y position for the tooltip
                const chartHeight = 264;
                const chartMargin = { top: 5, bottom: 5 };
                const availableHeight = chartHeight - chartMargin.top - chartMargin.bottom;

                const maxValue = Math.max(
                  ...projectionData.map(d => Math.max(d.totalValue, d.totalContributed, d.totalGrowth))
                );

                const yPercent = 1 - (Math.max(activePoint.totalValue, activePoint.totalContributed, activePoint.totalGrowth) / maxValue);
                const yPosition = chartMargin.top + (yPercent * availableHeight * 0.8);

                return (
                  <div
                    className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-20 pointer-events-none"
                    style={{
                      left: `${5 + (activeIndex * (90 / (projectionData.length - 1)))}%`,
                      top: `${Math.max(10, yPosition - 80)}px`, // Offset above the point, with minimum top margin
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <div className="text-base font-medium text-gray-900">
                      {t('scenes.S11.S11_D0_FX_C9.year')} {activePoint.year}
                    </div>
                    <div className="text-base text-black">
                      {t('scenes.S11.S11_D0_FX_C9.total_value')}: <span className="text-lg font-bold" style={{ color: totalValueColor }}>
                        {formatCurrency(activePoint.totalValue)}
                      </span>
                    </div>
                    <div className="text-base text-black">
                      {t('scenes.S11.S11_D0_FX_C9.total_contributed')}: <span className="text-lg font-bold" style={{ color: totalContributedColor }}>
                        {formatCurrency(activePoint.totalContributed)}
                      </span>
                    </div>
                    <div className="text-base text-black">
                      {t('scenes.S11.S11_D0_FX_C9.investment_growth')}: <span className="text-lg font-bold" style={{ color: totalGrowthColor }}>
                        {formatCurrency(activePoint.totalGrowth)}
                      </span>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div
          className="grid grid-cols-1 xl:grid-cols-3 gap-3 mb-5"
          role="region"
          aria-label={t('scenes.S11.S11_D0_FX_C9.investment_summary_comparison')}
        >
          <div
            className="p-3 rounded-xl shadow-md border-l-4 border-[#008217]"
            role="article"
            aria-label={t('scenes.S11.S11_D0_FX_C9.total_value_summary')}
          >
            <h1 className="text-md font-bold mb-2 flex items-center">
              {t('scenes.S11.S11_D0_FX_C9.final_value')}
            </h1>
            <div className="space-y-2">
              <div className="flex justify-between" role="text">
                <span className="text-md text-slate-600">
                  {t('scenes.S11.S11_D0_FX_C9.after_years').replace('{years}', years.toString())}
                </span>
                <span
                  className="text-md font-bold"
                  aria-label={t('scenes.S11.S11_D0_FX_C9.final_value_after_years').replace(
                    '{years}',
                    years.toString(),
                  )}
                >
                  {formatCurrency(projectionData[years]?.totalValue || 0)}
                </span>
              </div>
              <div className="flex justify-between border-t border-green-200 pt-1 mt-1" role="text">
                <span className="text-md font-semibold">{t('scenes.S11.S11_D0_FX_C9.weekly_savings')}</span>
                <span
                  className="text-base font-bold text-[#008217]"
                  aria-label={t('scenes.S11.S11_D0_FX_C9.weekly_savings_amount').replace(
                    '{weeklyContribution}',
                    weeklyContribution.toString(),
                  )}
                >
                  ${weeklyContribution}
                </span>
              </div>
              <div className="flex justify-between border-t border-green-200 pt-1 mt-1" role="text">
                <span className="text-md font-semibold">{t('scenes.S11.S11_D0_FX_C9.annual_savings')}</span>
                <span
                  className="text-base font-bold text-[#008217]"
                  aria-label={t('scenes.S11.S11_D0_FX_C9.annual_savings_amount').replace(
                    '{amount}',
                    formatCurrency(weeklyContribution * 52),
                  )}
                >
                  {formatCurrency(weeklyContribution * 52)}
                </span>
              </div>
            </div>
          </div>

          <div
            className="p-3 rounded-xl shadow-md border-l-4 border-[#0061FC]"
            role="article"
            aria-label={t('scenes.S11.S11_D0_FX_C9.total_contributed_summary')}
          >
            <h1 className="text-md font-bold mb-2 flex items-center">
              {t('scenes.S11.S11_D0_FX_C9.total_contributed')}
            </h1>
            <div className="space-y-2">
              <div className="flex justify-between" role="text">
                <span className="text-md text-slate-600">{t('scenes.S11.S11_D0_FX_C9.your_money_in')}</span>
                <span
                  className="text-md font-bold"
                  aria-label={t('scenes.S11.S11_D0_FX_C9.total_contributed_over_years').replace(
                    '{years}',
                    years.toString(),
                  )}
                >
                  {formatCurrency(projectionData[years]?.totalContributed || 0)}
                </span>
              </div>
              <div className="flex justify-between border-t border-blue-200 pt-1 mt-1" role="text">
                <span className="text-md font-semibold text-slate-700">
                  {t('scenes.S11.S11_D0_FX_C9.initial_amount')}
                </span>
                <span
                  className="text-base font-bold text-[#0061FC]"
                  aria-label={t('scenes.S11.S11_D0_FX_C9.initial_investment_amount').replace(
                    '{initialInvestment}',
                    initialInvestment.toString(),
                  )}
                >
                  ${initialInvestment}
                </span>
              </div>
              <div className="flex justify-between border-t border-blue-200 pt-1 mt-1" role="text">
                <span className="text-md font-semibold text-slate-700">
                  {t('scenes.S11.S11_D0_FX_C9.weekly_contributions')}
                </span>
                <span
                  className="text-base font-bold text-[#0061FC]"
                  aria-label={t('scenes.S11.S11_D0_FX_C9.total_weekly_contributions').replace(
                    '{amount}',
                    formatCurrency((projectionData[years]?.totalContributed || 0) - initialInvestment),
                  )}
                >
                  {formatCurrency((projectionData[years]?.totalContributed || 0) - initialInvestment)}
                </span>
              </div>
            </div>
          </div>

          <div
            className="p-3 rounded-xl shadow-md border-l-4 border-[#8E24AA]"
            role="article"
            aria-label={t('scenes.S11.S11_D0_FX_C9.investment_growth_summary')}
          >
            <h1 className="text-md font-bold mb-2 flex items-center">
              {t('scenes.S11.S11_D0_FX_C9.investment_growth')}
            </h1>
            <div className="space-y-2">
              <div className="flex justify-between" role="text">
                <span className="text-md text-slate-600">{t('scenes.S11.S11_D0_FX_C9.compound_interest')}</span>
                <span
                  className="text-md font-bold"
                  aria-label={t('scenes.S11.S11_D0_FX_C9.investment_growth_over_years').replace(
                    '{years}',
                    years.toString(),
                  )}
                >
                  {formatCurrency(projectionData[years]?.totalGrowth || 0)}
                </span>
              </div>
              <div className="flex justify-between border-t border-purple-200 pt-1 mt-1" role="text">
                <span className="text-md font-semibold text-slate-700">
                  {t('scenes.S11.S11_D0_FX_C9.return_rate')}
                </span>
                <span
                  className="text-base font-bold text-[#8E24AA]"
                  aria-label={t('scenes.S11.S11_D0_FX_C9.annual_return_rate_display').replace(
                    '{rate}',
                    annualReturn.toString(),
                  )}
                >
                  {annualReturn}%
                </span>
              </div>
              <div className="flex justify-between border-t border-purple-200 pt-1 mt-1" role="text">
                <span className="text-md font-semibold text-slate-700">
                  {t('scenes.S11.S11_D0_FX_C9.doubling_time')}
                </span>
                <span
                  className="text-base font-bold text-[#8E24AA]"
                  aria-label={t('scenes.S11.S11_D0_FX_C9.money_doubles_every_years').replace(
                    '{time}',
                    doublingTime.toString(),
                  )}
                >
                  ~{doublingTime} {t('scenes.S11.S11_D0_FX_C9.years')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {projectionData[years]?.totalValue >= 1000000 && (
          <div
            className="bg-gradient-to-r from-amber-50 to-amber-100 p-3 rounded-xl shadow-md border-l-4 border-amber-500 flex items-center"
            role="alert"
            aria-label={t('scenes.S11.S11_D0_FX_C9.millionaire_achievement')}
          >
            <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" aria-hidden="true" />
            <div>
              <p className="font-bold text-amber-800 text-md">
                {t('scenes.S11.S11_D0_FX_C9.millionaire_status_achieved')}
              </p>
              <p className="text-amber-700 text-md">
                {t('scenes.S11.S11_D0_FX_C9.millionaire_description')
                  .replace('{weeklyContribution}', weeklyContribution.toString())
                  .replace('{annualReturn}', annualReturn.toString())
                  .replace('{totalValue}', formatCurrency(projectionData[years]?.totalValue || 0))
                  .replace('{years}', years.toString())}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;
