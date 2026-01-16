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
import { DollarSign, TrendingUp, AlertTriangle } from './common-icons';
import { useTranslations } from '../../../hooks/useTranslations';
import interaction from '../configs/interactive-2';

interface PaymentData {
  month: number;
  balance: number;
  interest: number;
  targetLine: number;
}

const CreditCardSimulator = () => {
  const { t } = useTranslations();
  const [debtAmount, setDebtAmount] = useState(1000);
  const [interestRate, setInterestRate] = useState(19.99);
  const [minimumPayment, setMinimumPayment] = useState(3);
  const [targetDebt, setTargetDebt] = useState(1000);
  const [paymentData, setPaymentData] = useState<PaymentData[]>([]);
  const [highlightDebt, setHighlightDebt] = useState(true);
  const [maxMonths, setMaxMonths] = useState(84);

  const [debtResults, setDebtResults] = useState({
    months: 0,
    totalInterest: 0,
    totalPaid: 0,
    monthlyPayment: 0,
  });

  // Add keyboard navigation state
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check screen size for responsive legend
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

  // Calculate debt growth over time
  const calculateDebtGrowth = () => {
    const monthlyRate = interestRate / 100 / 12;
    let balance = debtAmount;
    let totalInterest = 0;
    const chartData = [];
    let monthsToTarget = 0;
    let debt10Years = 0;

    // Calculate for up to 15 years (180 months) or until target is reached
    const maxCalculationMonths = 180;

    for (let month = 0; month <= maxCalculationMonths; month++) {
      if (month > 0) {
        // Apply interest
        const interestThisMonth = balance * monthlyRate;
        totalInterest += interestThisMonth;

        // Calculate minimum payment
        const payment = Math.max(balance * (minimumPayment / 100), 25);

        // Apply payment and interest
        balance = balance + interestThisMonth - payment;

        // Check when debt hits target
        if (balance >= targetDebt && monthsToTarget === 0) {
          monthsToTarget = month;
        }

        // Store 10-year debt amount
        if (month === 120) {
          debt10Years = balance;
        }
      }

      // Add data point for chart (every month for better tooltip experience)
      chartData.push({
        month: month,
        balance: Math.max(0, balance),
        interest: totalInterest,
        targetLine: targetDebt,
      });
    }

    // Calculate max months to show (round up to nearest year)
    let displayMonths = 84; // default 7 years
    if (monthsToTarget > 0) {
      const yearsNeeded = Math.ceil(monthsToTarget / 12);
      displayMonths = yearsNeeded * 12;
    }

    // Limit the chart data to display months
    const displayData = chartData.slice(0, displayMonths + 1);

    setPaymentData(displayData);
    setMaxMonths(displayMonths);
    setDebtResults({
      months: monthsToTarget,
      totalPaid: Math.max(debt10Years, 0),
      totalInterest,
      monthlyPayment: Math.max(debtAmount * (minimumPayment / 100), 25),
    });
  };

  useEffect(() => {
    calculateDebtGrowth();
  }, [debtAmount, interestRate, minimumPayment, targetDebt]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };
  const formatYears = (months: number) => {
    if (months < 12) return `${months} months`;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths > 0) {
      return `${months} months (${years}y ${remainingMonths}m)`;
    } else {
      return `${months} months (${years} years)`;
    }
  };

  // Color theme
  const dangerColor = '#E0002B'; // red-500

  return (
    <div className="mt-[-20px] mb-5">
      <div>
        {debtResults.months > 0 && (
          <div
            className="flex items-center justify-centerfont-bold text-lg px-4 py-2 rounded-full shadow mx-auto w-fit mt-3 border-2"
            style={{ color: dangerColor, borderColor: dangerColor }}
          >
            <AlertTriangle className="h-5 w-5 mr-2" />
            {t(interaction.debtHits)} ${targetDebt.toLocaleString()} {t(interaction.inJust)} {debtResults.months}{' '}
            {t(interaction.months)}!
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {/* Input Controls */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-slate-800 mb-2 border-b border-slate-200 pb-1">
            {t(interaction.adjustParameters)}
          </h1>

          <div className="grid grid-cols-1 min-[1000px]:grid-cols-2 gap-3 mb-3">
            <div className="p-2">
              <div aria-live="off" className="flex justify-between items-center mb-1 mt-1">
                <label htmlFor="debtAmount" className="text-base font-medium text-slate-800 flex items-center">
                  <DollarSign className="h-4 w-4 mr-4 mb-1 text-blue-600" />
                  {t(interaction.purchaseAmount)}
                </label>
                <span className="text-base font-bold text-blue-600">${debtAmount}</span>
              </div>
              <div className="sliderContainer mt-2">
                <input
                  id="debtAmount"
                  type="range"
                  min="500"
                  max="8000"
                  step="500"
                  value={debtAmount}
                  onChange={(e) => setDebtAmount(Number(e.target.value))}
                  className="global-slider w-full h-2"
                  style={{
                    background: `linear-gradient(to right, #007bff ${((debtAmount - 500) / (8000 - 500)) * 100}%, #e0e0e0 ${((debtAmount - 500) / (8000 - 500)) * 100}%)`,
                  }}
                  aria-valuetext={`${t(interaction.purchaseAmount)}: $${debtAmount}`}
                />
              </div>
            </div>

            <div className="p-2">
              <div aria-live="off" className="flex justify-between items-center mb-1">
                <label htmlFor="interestRate" className="text-base font-medium text-slate-800 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-4 mb-1 text-red-600" />
                  {t(interaction.interestRateAPR)}
                </label>
                <span className="text-base font-bold text-red-600">{interestRate}%</span>
              </div>
              <div className="sliderContainer mt-2">
                <input
                  id="interestRate"
                  type="range"
                  min="6.99"
                  max="31.99"
                  step="1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="global-slider w-full h-2"
                  style={{
                    background: `linear-gradient(to right, #007bff ${((interestRate - 6.99) / (31.99 - 6.99)) * 100}%, #e0e0e0 ${((interestRate - 6.99) / (31.99 - 6.99)) * 100}%)`,
                  }}
                  aria-valuetext={`${t(interaction.interestRateAPR)}: ${interestRate}%`}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 min-[1000px]:grid-cols-2 gap-3">
            <div className="p-2">
              <div aria-live="off" className="flex justify-between items-center mb-1">
                <label htmlFor="minimumPayment" className="text-base font-medium text-slate-800 flex items-center">
                  <DollarSign className="h-4 w-4 mr-4 mb-1 text-purple-600" />
                  {t(interaction.minimumPayment)}
                </label>
                <span className="text-base font-bold text-purple-600">{minimumPayment}%</span>
              </div>
              <div className="sliderContainer mt-2">
                <input
                  id="minimumPayment"
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={minimumPayment}
                  onChange={(e) => setMinimumPayment(Number(e.target.value))}
                  className="global-slider w-full h-2"
                  style={{
                    background: `linear-gradient(to right, #007bff ${((minimumPayment - 1) / (5 - 1)) * 100}%, #e0e0e0 ${((minimumPayment - 1) / (5 - 1)) * 100}%)`,
                  }}
                  aria-valuetext={`${t(interaction.minimumPayment)}: ${minimumPayment}%`}
                />
              </div>
            </div>

            <div className="p-2">
              <div aria-live="off" className="flex justify-between items-center mb-1">
                <label htmlFor="latePayments" className="text-base font-medium text-slate-800 flex items-center">
                  <DollarSign className="h-4 w-4 mr-4 mb-1 text-blue-600" />
                  {t(interaction.latePayments)}
                </label>
                <span className="text-base font-bold text-[#8E24AA]">{targetDebt}</span>
              </div>
              <div className="sliderContainer mt-2">
                <input
                  id="latePayments"
                  type="range"
                  min="1000"
                  max="15000"
                  step="1000"
                  value={targetDebt}
                  onChange={(e) => setTargetDebt(Number(e.target.value))}
                  className="global-slider w-full h-2"
                  style={{
                    background: `linear-gradient(to right, #007bff ${((targetDebt - 1000) / (15000 - 1000)) * 100}%, #e0e0e0 ${((targetDebt - 1000) / (15000 - 1000)) * 100}%)`,
                  }}
                  aria-valuetext={`${t(interaction.latePayments)}: ${targetDebt}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-slate-800 mb-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-4 text-red-500" />
              {t(interaction.theDebtTrap)}
            </h1>

            {/* Toggle Button */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setHighlightDebt(true)}
                className={'px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all'}
                style={{
                  backgroundColor: highlightDebt ? dangerColor : 'transparent',
                  color: highlightDebt ? 'white' : dangerColor,
                }}
              >
                {t(interaction.currentDebt)}
              </button>
              <button
                onClick={() => setHighlightDebt(false)}
                className={'px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all'}
                style={{
                  backgroundColor: !highlightDebt ? '#006BE0' : 'transparent',
                  color: !highlightDebt ? 'white' : '#006BE0',
                }}
              >
                {t(interaction.totalInterest)}
              </button>
            </div>
          </div>

          <div className={`relative ${isSmallScreen ? 'h-80' : 'h-64'}`}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={paymentData}
                margin={
                  isSmallScreen
                    ? { top: 5, right: 5, left: 5, bottom: 50 }
                    : { top: 5, right: 5, left: 5, bottom: 5 }
                }
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  stroke="#64748b"
                  tickLine={false}
                  label={{ value: 'Months', position: 'insideBottom', offset: -20 }}
                  tickFormatter={(month) => {
                    if (month === 0) return '0';
                    if (month % 12 === 0) return `Yr ${month / 12}`;
                    if (month % 6 === 0) return `${month}m`;
                    return '';
                  }}
                  domain={[0, maxMonths]}
                  type="number"
                  scale="linear"
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  tickFormatter={(value) => `$${Math.round(value)}`}
                  stroke="#64748b"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={false}
                  formatter={(value, name) => {
                    if (name === 'balance') return [formatCurrency(Number(value)), 'Current Debt'];
                    if (name === 'interest') return [formatCurrency(Number(value)), 'Total Interest Paid'];
                    return [formatCurrency(Number(value)), name];
                  }}
                  labelFormatter={(month) => {
                    const years = Math.floor(month / 12);
                    const months = month % 12;
                    if (years === 0) return `Month ${month}`;
                    if (months === 0) return `${month} months (Year ${years})`;
                    return `${month} months (Year ${years}, Month ${months})`;
                  }}
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'white',
                  }}
                />
                <Legend
                  verticalAlign={isSmallScreen ? 'bottom' : 'top'}
                  height={30}
                  wrapperStyle={isSmallScreen ? { paddingTop: '10px' } : { paddingBottom: '10px' }}
                />
                <defs>
                  <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={dangerColor} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={dangerColor} stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="interestGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#006BE0" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#006BE0" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="balance"
                  name={t(interaction.currentDebt)}
                  stroke={dangerColor}
                  fill="url(#balanceGradient)"
                  strokeWidth={highlightDebt ? 4 : 2}
                  fillOpacity={highlightDebt ? 0.8 : 0.3}
                  dot={false}
                  activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="interest"
                  name={t(interaction.totalInterest)}
                  stroke="#006BE0"
                  fill="url(#interestGradient)"
                  strokeWidth={!highlightDebt ? 4 : 2}
                  fillOpacity={!highlightDebt ? 0.8 : 0.3}
                  dot={false}
                  activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                />
                <ReferenceLine
                  y={targetDebt}
                  stroke="#64748b"
                  strokeDasharray="3 3"
                  label={{ value: `Target ${formatCurrency(targetDebt)}`, position: 'insideRight' }}
                />
                <ReferenceLine
                  y={debtAmount}
                  stroke="#64748b"
                  strokeDasharray="3 3"
                  label={{ value: `Original ${formatCurrency(debtAmount)}`, position: 'inside' }}
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* Invisible focusable elements for keyboard navigation */}
            {paymentData.map((point, index) => {
              // Calculate the Y position based on the data value
              const chartHeight = isSmallScreen ? 320 : 264; // Total height of chart container
              const chartMargin = isSmallScreen ? { top: 5, bottom: 50 } : { top: 5, bottom: 5 }; // From AreaChart margin
              const availableHeight = chartHeight - chartMargin.top - chartMargin.bottom;

              // Find the max value to calculate relative position
              const maxValue = Math.max(...paymentData.map((d) => Math.max(d.balance, d.interest)));

              // Calculate Y position (inverted because SVG coordinates start from top)
              const yPercent = 1 - point.balance / maxValue;
              const yPosition = chartMargin.top + yPercent * availableHeight * 0.8; // 0.8 to account for some padding

              return (
                <button
                  key={`focus-point-${index}`}
                  className="absolute w-4 h-4 opacity-0 focus:opacity-100 focus:bg-red-500 focus:rounded-full focus:outline-2 focus:outline-red-600 focus:outline-offset-2"
                  style={{
                    left: `${5 + point.month * (90 / Math.max(...paymentData.map((d) => d.month)))}%`,
                    top: `${yPosition}px`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                  }}
                  onFocus={() => handleFocus(point.month)}
                  onBlur={handleBlur}
                  onMouseEnter={() => handleMouseEnter(point.month)}
                  onMouseLeave={handleMouseLeave}
                  aria-label={`${t(interaction.month)} ${point.month}: ${t(interaction.balance)} ${formatCurrency(point.balance)}`}
                />
              );
            })}

            {/* Custom tooltip for keyboard focus only */}
            {activeIndex !== null &&
              isKeyboardFocus &&
              (() => {
                const activePoint = paymentData.find((d) => d.month === activeIndex);
                if (!activePoint) return null;

                // Calculate the same Y position for the tooltip
                const chartHeight = isSmallScreen ? 320 : 264;
                const chartMargin = isSmallScreen ? { top: 5, bottom: 50 } : { top: 5, bottom: 5 };
                const availableHeight = chartHeight - chartMargin.top - chartMargin.bottom;

                const maxValue = Math.max(...paymentData.map((d) => Math.max(d.balance, d.interest)));

                const yPercent = 1 - activePoint.balance / maxValue;
                const yPosition = chartMargin.top + yPercent * availableHeight * 0.8;

                return (
                  <div
                    className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-20 pointer-events-none"
                    style={{
                      left: `${5 + activeIndex * (90 / Math.max(...paymentData.map((d) => d.month)))}%`,
                      top: `${Math.max(10, yPosition - 80)}px`, // Offset above the point, with minimum top margin
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <div className="text-base font-medium text-gray-900">
                      {t(interaction.month)} {activeIndex}
                    </div>
                    <div className="text-base text-black">
                      {t(interaction.balance)}:{' '}
                      <span className="text-lg font-bold" style={{ color: dangerColor }}>
                        {formatCurrency(activePoint.balance)}
                      </span>
                    </div>
                    <div className="text-base text-black">
                      {t(interaction.interestPaid)}:{' '}
                      <span className="text-lg font-bold" style={{ color: '#0061FC' }}>
                        {formatCurrency(activePoint.interest)}
                      </span>
                    </div>
                  </div>
                );
              })()}
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-l shadow-md border-l-4">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <h4 className="font-bold">
                {t(interaction.monthsUntilDebtReaches)} ${targetDebt.toLocaleString()}
              </h4>
            </div>
            <div className="text-l font-bold">
              {debtResults.months > 0 ? formatYears(debtResults.months) : t(interaction.never)}
            </div>
            <p className="text-xs mt-1">{t(interaction.makingMinimumPaymentsOnly)}</p>
          </div>

          <div className="p-4 rounded-l shadow-md border-l-4">
            <div className="flex items-center mb-2">
              <DollarSign className="h-5 w-5 mr-2" />
              <h4 className="font-bold">{t(interaction.monthlyPayment)}</h4>
            </div>
            <div className="text-l font-bold">{formatCurrency(debtResults.monthlyPayment)}</div>
            <p className="text-xs mt-1">
              {minimumPayment}% {t(interaction.minimumPayment)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardSimulator;
