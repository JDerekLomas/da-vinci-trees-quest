import React, { useEffect, useMemo, useState } from 'react';
import { SeaStarExplorerInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import ToggleSwitch from './toggle-switch';
import ExplorerGraph from './explorer-graph';

const SeaStarDensityExplorer: React.FC<{
  interaction: SeaStarExplorerInteraction;
}> = ({ interaction }) => {
  const { t } = useTranslations();
  const [showKelp, setShowKelp] = useState(false);
  const [showProjection, setShowProjection] = useState(false);
  const [dateRange, setDateRange] = useState(interaction.dateRange);
  const [showTrendLines, setShowTrendLines] = useState(interaction.trendLines);
  const [endYearOptions, setEndYearOptions] = useState(interaction.endYearOptions);

  const { earlyTrend, lateTrend } = useMemo(() => {
    const early = interaction.starData.filter((d) => d.year < 2014);
    const late = interaction.starData.filter((d) => d.year >= 2014);
    return {
      earlyTrend: interaction.calculateTrendLine(early),
      lateTrend: interaction.calculateTrendLine(late),
    };
  }, [interaction]);

  const enrichedData = useMemo(
    () =>
      interaction.starData.map((point) => ({
        ...point,
        pycno: Number(point.pycno.toFixed(4)),
        kelp: Number(point.kelp.toFixed(4)),
        earlyTrend:
          point.year < 2014
            ? Number((earlyTrend.slope * (point.year - 2000) + earlyTrend.intercept).toFixed(4))
            : null,
        lateTrend:
          point.year >= 2014
            ? Number((lateTrend.slope * (point.year - 2000) + lateTrend.intercept).toFixed(4))
            : null,
      })),
    [interaction.starData, earlyTrend, lateTrend],
  );

  const projectedData = useMemo(() => {
    if (!showProjection) return [];
    return Array.from({ length: 11 }, (_, i) => {
      const year = 2020 + i;
      const projection = lateTrend.slope * (year - 2000) + lateTrend.intercept;
      return {
        year,
        pycno: null,
        kelp: null,
        earlyTrend: null,
        lateTrend: Number(projection.toFixed(4)) >= 0 ? Number(projection.toFixed(4)) : null,
      };
    });
  }, [showProjection, lateTrend]);

  const filteredData = useMemo(
    () =>
      [...enrichedData, ...projectedData].filter(
        (item) => item.year >= dateRange.start && item.year <= dateRange.end,
      ),
    [dateRange.end, dateRange.start, enrichedData, projectedData],
  );

  const updateDateRange = (start: number, end: number): void => {
    setDateRange({
      start: Math.min(start, end),
      end: Math.max(start, end),
    });
  };

  const dataMax = Math.max(
    ...filteredData
      .map((item) => [item.pycno, item.earlyTrend, item.lateTrend].filter((val) => val !== null))
      .flat(),
  );

  const xTicks = useMemo(
    () => Array.from({ length: dateRange.end - dateRange.start + 1 }, (_, i) => dateRange.start + i),
    [dateRange],
  );

  useEffect(() => {
    if (showProjection && !endYearOptions.includes(2030)) {
      setEndYearOptions((prev) => [...prev, 2030]);
    } else if (!showProjection) {
      setEndYearOptions((prev) => prev.filter((year) => year <= 2019));
    }
  }, [showProjection]);

  useEffect(() => {
    setDateRange((prev) => ({
      ...prev,
      end: endYearOptions[endYearOptions.length - 1],
    }));
  }, [endYearOptions]);
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-wrap gap-4 justify-center p-2 mt-2">
        <button
          onClick={() => {
            setShowTrendLines((prev) => ({
              ...prev,
              early: !prev.early,
            }));
          }}
          disabled={dateRange.start > 2014}
          type="button"
          className={`px-3 py-1 text-base rounded-md flex items-center ${
            showTrendLines.early
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'border border-gray-300 hover:bg-gray-100'
          } ${dateRange.start > 2014 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {showTrendLines.early ? t('scenes.S6.S6_D0_F9_C9.hidePre2014Trend') : t(interaction.preTrendLabel)}
        </button>

        <button
          onClick={() => {
            setShowTrendLines((prev) => ({
              ...prev,
              late: !prev.late,
            }));
          }}
          disabled={dateRange.end < 2014}
          type="button"
          className={`px-3 py-1 text-base rounded-md transition-colors flex items-center ${
            showTrendLines.late
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'border border-gray-300 hover:bg-gray-100'
          } ${dateRange.end < 2014 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {showTrendLines.late ? t('scenes.S6.S6_D0_F9_C9.hidePost2014Trend') : t(interaction.postTrendLabel)}
        </button>
      </div>      <div className="grid grid-cols-2 gap-x-16 gap-y-4 mt-4">
        <ToggleSwitch
          disabled={dateRange.end < 2014}
          label={t(interaction.futureProjectionLabel)}
          checked={showProjection}
          onChange={(checked) => setShowProjection(checked)}
        />

        <ToggleSwitch
          label={t(interaction.showKelpDataLabel)}
          checked={showKelp}
          onChange={(checked) => setShowKelp(checked)}
        />
      </div>

      {showProjection && (
        <div className="text-m text-[#005F20] text-center pt-4 italic">{t(interaction.note)}</div>
      )}

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <select
          value={dateRange.start}
          onChange={(e) => updateDateRange(Number(e.target.value), dateRange.end)}
          className="text-m p-1 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          aria-label="Select start year"
          id="start-year"
        >
          {interaction.startYearOptions.map((year) => (
            <option key={year} value={year}>
              {t(interaction.select.from)}: {year}
            </option>
          ))}
        </select>
        <select
          value={dateRange.end}
          onChange={(e) => updateDateRange(dateRange.start, Number(e.target.value))}
          className="text-m p-1 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          aria-label="Select end year"
          id="end-year"
        >
          {endYearOptions
            .filter((year) => year > dateRange.start)
            .map((year) => (
              <option key={year} value={year}>
                {t(interaction.select.to)}: {year}
              </option>
            ))}
        </select>
      </div>
      <div className="h-[480px] w-full" role="region" aria-label={t(interaction.ariaLabel || '')} tabIndex={0}>
        <ExplorerGraph
          chartData={filteredData}
          graphConfig={interaction.graphConfig}
          xDomain={[dateRange.start, dateRange.end]}
          xTicks={xTicks}
          yLeftDomain={[0, Math.ceil(dataMax * 100) / 100]}
          yRightDomain={[0, 6]}
          showKelp={showKelp}
          showTrendLine={showTrendLines}
        />
      </div>
    </div>
  );
};

export default SeaStarDensityExplorer;
