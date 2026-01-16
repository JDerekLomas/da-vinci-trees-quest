import React, { useContext, useEffect, useMemo, useState, useRef } from 'react';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { GameContext } from '../../../contexts/GameContext';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';
import interaction from '../configs/kelp-forest-explorer-interactive';

export interface KelpForestExplorerInteraction {
  id: string;
}

interface InteractiveState {
  step: number;
}

interface StepConfig {
  title: string;
  subtitle: string;
  titleText?: string;
  subtitleText?: string;
  endYear: number;
  defaultTrends: {
    early: boolean;
    late: boolean;
    projection: boolean;
  };
  description: string;
  descriptionText?: string;
}

interface KelpDataPoint {
  year: number;
  kelp: number | null;
  earlyTrend?: number | null;
  lateTrend?: number | null;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const kelpData: KelpDataPoint[] = [
  { year: 2001, kelp: 4.91 },
  { year: 2002, kelp: 4.44 },
  { year: 2003, kelp: 1.53 },
  { year: 2004, kelp: 2.52 },
  { year: 2005, kelp: 2.53 },
  { year: 2006, kelp: 1.92 },
  { year: 2007, kelp: 2.43 },
  { year: 2008, kelp: 2.44 },
  { year: 2009, kelp: 2.72 },
  { year: 2010, kelp: 3.14 },
  { year: 2011, kelp: 1.95 },
  { year: 2012, kelp: 2.79 },
  { year: 2013, kelp: 2.92 },
  { year: 2014, kelp: 1.97 },
  { year: 2015, kelp: 2.68 },
  { year: 2016, kelp: 2.18 },
  { year: 2017, kelp: 0.6 },
  { year: 2018, kelp: 1.31 },
  { year: 2019, kelp: 0.47 },
];

const calculateTrendLine = (data: Array<KelpDataPoint>) => {
  const n = data.length;
  let sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumXX = 0;

  data.forEach((point) => {
    if (point.kelp !== null) {
      sumX += point.year;
      sumY += point.kelp;
      sumXY += point.year * point.kelp;
      sumXX += point.year * point.year;
    }
  });

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return {
    slope: Number(slope.toFixed(2)),
    intercept: Number((intercept + slope * 2000).toFixed(2)),
  };
};

const CustomToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, checked, onChange, disabled }) => {
  return (
    <div className={`flex items-center gap-2 ${disabled ? 'opacity-50' : ''}`}>
      <button
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
          checked ? 'bg-teal-600' : 'bg-gray-200'
        } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={disabled}
        type="button"
        aria-pressed={checked}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className="text-base">{label}</span>
    </div>
  );
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  const { t } = useTranslations();

  if (active && payload && payload.length > 0) {
    return (
      <div className="bg-white p-4 border rounded shadow-lg">
        {' '}
        <p className="font-bold mb-2">
          {t(interaction.year)}: {label}
        </p>
        {payload.map((entry: any, index: number) => {
          if (entry.value !== null && entry.dataKey !== 'kelp') {
            return (
              <p key={index} className="text-base" style={{ color: entry.color }}>
                {entry.name}: {entry.value.toFixed(2)} {t(interaction.individuals)}
              </p>
            );
          } else if (entry.dataKey === 'kelp' && entry.value !== null) {
            return (
              <p key={index} className="text-base" style={{ color: entry.color }}>
                {t(interaction.observedKelpDensityValue)}: {entry.value.toFixed(2)} {t(interaction.individuals)}
              </p>
            );
          }
          return null;
        })}
      </div>
    );
  }
  return null;
};

const futureYears = Array.from({ length: 11 }, (_, i) => 2020 + i);

const KelpForestExplorer: React.FC<{
  interaction: KelpForestExplorerInteraction;
}> = ({}) => {
  const { t } = useTranslations();
  const { payload } = useEventListener('kelp-forest-explorer-interactive-chart');
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(600);

  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};

  const savedState =
    interactiveResponses?.kelp_forest_explorer_interactive_chart &&
    typeof interactiveResponses?.kelp_forest_explorer_interactive_chart === 'object'
      ? (interactiveResponses?.kelp_forest_explorer_interactive_chart as unknown as InteractiveState)
      : undefined;

  const [step, setStep] = useState<number>(savedState?.step ?? 1);
  const [showProjection, setShowProjection] = useState(false);
  const [dateRange, setDateRange] = useState({ start: 2001, end: 2013 });
  const [showTrendLines, setShowTrendLines] = useState({ early: false, late: false });
  const [endYearOptions, setEndYearOptions] = useState([2013, 2019]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setChartWidth(Math.max(300, containerWidth - 48));
      }
    };

    updateWidth();

    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const steps: StepConfig[] = [
    {
      title: t(interaction.observingKelpData),
      subtitle: t(interaction.observingKelpDataSubtitle),
      endYear: 2013,
      defaultTrends: { early: false, late: false, projection: false },
      description: t(interaction.observingKelpDataDescription),
    },
    {
      title: t(interaction.understandingTrendLines),
      subtitle: t(interaction.understandingTrendLinesSubtitle),
      endYear: 2013,
      defaultTrends: { early: true, late: false, projection: true },
      description: t(interaction.understandingTrendLinesDescription),
    },
    {
      title: t(interaction.detectingEcosystemChanges),
      subtitle: t(interaction.detectingEcosystemChangesSubtitle),
      endYear: 2019,
      defaultTrends: { early: true, late: true, projection: false },
      description: t(interaction.detectingEcosystemChangesDescription),
    },
  ];

  const { earlyTrend, lateTrend } = useMemo(() => {
    const early = kelpData.filter((d) => d.year < 2014);
    const late = kelpData.filter((d) => d.year >= 2014);
    return {
      earlyTrend: calculateTrendLine(early),
      lateTrend: calculateTrendLine(late),
    };
  }, []);

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      setStep(payload.step as number);
    }
  }, [payload]);

  // Save state to context whenever relevant state changes
  useEffect(() => {
    if (!setInteractiveResponses) return;

    const currentState: InteractiveState = { step };

    setInteractiveResponses((prev: any) => ({
      ...prev,
      kelp_forest_explorer_interactive_chart: currentState,
    }));
  }, [step, setInteractiveResponses]);

  const enrichedData = useMemo(
    () =>
      kelpData.map((point) => {
        const earlyTrendValue = Number((earlyTrend.slope * (point.year - 2000) + earlyTrend.intercept).toFixed(2));

        const lateTrendValue = Number((lateTrend.slope * (point.year - 2000) + lateTrend.intercept).toFixed(2));

        return {
          ...point,
          kelp: point.kelp !== null ? Number(point.kelp.toFixed(2)) : null,
          earlyTrend: earlyTrendValue,
          lateTrend: lateTrendValue,
        };
      }),
    [earlyTrend, lateTrend],
  );

  const projectedData = useMemo(() => {
    if (!showProjection) return [];

    return futureYears.map((year) => {
      const earlyProjection = earlyTrend.slope * (year - 2000) + earlyTrend.intercept;
      const earlyProjectionValue = Number(earlyProjection.toFixed(2));

      const lateProjection = lateTrend.slope * (year - 2000) + lateTrend.intercept;
      const lateProjectionValue = lateProjection > 0 ? Number(lateProjection.toFixed(2)) : NaN;

      return {
        year,
        kelp: NaN,
        earlyTrend: earlyProjectionValue,
        lateTrend: lateProjectionValue,
      };
    });
  }, [showProjection, earlyTrend, lateTrend]);

  // Controls to show based on step
  const getControlsForStep = (stepNum: number) => {
    switch (stepNum) {
      case 1:
        return { showTrendToggle: false, showProjectionToggle: false };
      case 2:
        return { showTrendToggle: true, showProjectionToggle: true };
      case 3:
        return { showTrendToggle: true, showProjectionToggle: false };
      default:
        return { showTrendToggle: false, showProjectionToggle: false };
    }
  };

  const controls = getControlsForStep(step);
  const currentConfig = steps[step - 1];

  // Fix filtered data to match reference implementation with proper end year domain
  const filteredData = useMemo(() => {
    let endYear = currentConfig.endYear;

    if (showProjection) {
      endYear = 2030;
    }

    const combinedData = [...enrichedData];

    // Only add projected data when projection is enabled
    if (showProjection) {
      combinedData.push(...projectedData);
    }

    return combinedData.filter((item) => item.year >= dateRange.start && item.year <= endYear);
  }, [enrichedData, projectedData, dateRange.start, showProjection, currentConfig.endYear]);

  useEffect(() => {
    if (showProjection && !endYearOptions.includes(2030)) {
      setEndYearOptions((prev) => [...prev, 2030]);
    } else if (!showProjection) {
      setEndYearOptions((prev) => prev.filter((year) => year <= 2019));
    }
  }, [showProjection, endYearOptions]);

  useEffect(() => {
    setDateRange((prev) => ({
      ...prev,
      end: endYearOptions[endYearOptions.length - 1],
    }));
  }, [endYearOptions]);

  // Only reset toggle states when changing steps
  useEffect(() => {
    if (step > 0 && step <= steps.length) {
      const currentConfig = steps[step - 1];

      // Reset the trend line toggles and projection based on the step's default settings
      setShowTrendLines({
        early: currentConfig.defaultTrends.early,
        late: currentConfig.defaultTrends.late,
      });
      setShowProjection(currentConfig.defaultTrends.projection);

      // Update date range for the new step
      setDateRange({
        start: step === 1 ? 2005 : 2001,
        end: currentConfig.endYear,
      });
    }
  }, [step]);

  return (
    <div className="w-full">
      <div className="flex items-center space-x-1 mt-[-10px]">
        {' '}
        <h1 className="text-xl font-bold">{t(currentConfig.title) || currentConfig.titleText}</h1>
      </div>{' '}
      <div className="mt-2">
        <p className="text-base">{currentConfig.description}</p>
      </div>
      {controls.showTrendToggle && (
        <div className="flex flex-wrap gap-4 justify-center p-2 mt-2">
          <button
            onClick={() => {
              setShowTrendLines((prev) => ({ ...prev, early: !prev.early }));
            }}
            type="button"
            className={`px-3 py-1 text-base rounded-md flex items-center ${
              showTrendLines.early
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'border border-gray-300 hover:bg-gray-100'
            }`}
          >
            {showTrendLines.early ? t(interaction.hidePre2014Trend) : t(interaction.showPre2014Trend)}
          </button>

          {step === 3 && (
            <button
              onClick={() => {
                setShowTrendLines((prev) => ({ ...prev, late: !prev.late }));
              }}
              type="button"
              className={`px-3 py-1 text-base rounded-md transition-colors flex items-center ${
                showTrendLines.late
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {showTrendLines.late ? t(interaction.hidePost2014Trend) : t(interaction.showPost2014Trend)}
            </button>
          )}

          {controls.showProjectionToggle && (
            <CustomToggleSwitch
              label={t(interaction.showFutureProjection)}
              checked={showProjection}
              onChange={(checked) => {
                setShowProjection(checked);
                if (checked && !endYearOptions.includes(2030)) {
                  setEndYearOptions((prev) => [...prev, 2030]);
                  setDateRange((prev) => ({ ...prev, end: 2030 }));
                }
              }}
              disabled={false}
            />
          )}
        </div>
      )}
      <div ref={containerRef}>
        <ComposedChart
          width={chartWidth}
          height={400}
          data={filteredData}
          margin={{ top: 40, right: 30, left: 60, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="year"
            type="number"
            domain={[dateRange.start, showProjection ? 2030 : currentConfig.endYear]}
            label={{
              value: t(interaction.surveyYear),
              position: 'bottom',
              dy: 10,
              fontSize: 16,
              fontWeight: 'bold',
              fill: '#115e59',
            }}
            tick={{ fontSize: 16, fill: '#115e59' }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            label={{
              value: t(interaction.giantKelpDensity),
              angle: -90,
              position: 'center',
              dx: -20,
              fontSize: 16,
              fontWeight: 'bold',
              fill: '#115e59',
            }}
            tick={{ fontSize: 16, fill: '#115e59' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{
              paddingBottom: '12px',
            }}
          />

          {/* Always show kelp data */}
          <Line
            type="monotone"
            dataKey="kelp"
            stroke="#115e59"
            name={t(interaction.observedKelpDensity)}
            strokeWidth={2}
            dot={{ r: 4 }}
            legendType="circle"
            activeDot={{ r: 6 }}
          />

          {/* Only render trend lines when the respective toggle is ON */}
          {showTrendLines.early && (
            <Line
              type="monotone"
              dataKey="earlyTrend"
              stroke="#0369a1"
              name={t(interaction.trend20032013)}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              isAnimationActive={true}
              connectNulls
            />
          )}

          {showTrendLines.late && (
            <Line
              type="monotone"
              dataKey="lateTrend"
              stroke="#dc2626"
              name={t(interaction.postTrend2014)}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              isAnimationActive={true}
              connectNulls
            />
          )}
        </ComposedChart>{' '}
      </div>
    </div>
  );
};

export default KelpForestExplorer;
