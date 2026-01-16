import React, { useCallback, useContext, useEffect, useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ScatterChart,
  Scatter,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { DistributionAnalysisProps, DistributionAnalysisState } from './interface';
import { useEventListener } from '../../../hooks/useEventListener';
import { GameContext } from '../../../contexts/GameContext';
import { useTranslations } from '../../../hooks/useTranslations';
import parse from 'html-react-parser';
import '../../../shared/slider.css';

const DistributionAnalysis: React.FC<DistributionAnalysisProps> = ({ interaction }) => {
  const { translations } = interaction;
  const { t } = useTranslations();
  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};
  const savedState =
    interactiveResponses?.distribution_analysis && typeof interactiveResponses?.distribution_analysis === 'object'
      ? (interactiveResponses?.distribution_analysis as unknown as DistributionAnalysisState)
      : undefined;
  const { payload } = useEventListener('distribution-analysis');

  const [threshold, setThreshold] = useState(savedState?.threshold ?? 5);

  // Statistical parameters matching the existing color scheme
  const placeboMean = 4;
  const placeboStd = 4;
  const neuroBoostMean = 9;
  const neuroBoostStd = 5;

  const normalPDF = (x: number, mean: number, std: number) => {
    const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(std, 2));
    return (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
  };

  const normalCDF = (x: number, mean: number, std: number) => {
    const z = (x - mean) / std;
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp((-z * z) / 2);
    const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z > 0 ? 1 - p : p;
  };

  const combinedBellData = useMemo(() => {
    const data = [];
    for (let x = -10; x <= 25; x += 0.5) {
      data.push({
        x,
        placebo: normalPDF(x, placeboMean, placeboStd),
        neuroBoost: normalPDF(x, neuroBoostMean, neuroBoostStd),
      });
    }
    return data;
  }, []);

  const erfInv = (x: number) => {
    const a = 0.147;
    const b = 2 / (Math.PI * a) + Math.log(1 - x * x) / 2;
    const sqrt1 = Math.sqrt(b * b - Math.log(1 - x * x) / a);
    const sqrt2 = Math.sqrt(sqrt1 - b);
    return (x < 0 ? -1 : 1) * sqrt2;
  };

  const generateQQData = (mean: number, std: number) => {
    const data = [];
    const n = 30;
    for (let i = 0; i < n; i++) {
      const p = (i + 0.5) / n;
      const z = Math.sqrt(2) * erfInv(2 * p - 1);
      const theoretical = mean + std * z;
      const sample = mean + std * z + (Math.random() - 0.5) * std * 0.3;
      data.push({ theoretical, sample });
    }
    return data;
  };

  const placeboQQData = useMemo(() => generateQQData(placeboMean, placeboStd), []);
  const neuroBoostQQData = useMemo(() => generateQQData(neuroBoostMean, neuroBoostStd), []);

  const percentageAbove = useMemo(() => {
    const cdf = normalCDF(threshold, neuroBoostMean, neuroBoostStd);
    return Math.round((1 - cdf) * 100);
  }, [threshold]);

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    if (payload && typeof payload === 'object') {
      if ('threshold' in payload && typeof payload.threshold === 'number') {
        setThreshold(payload.threshold);
      }
    }
  }, [payload]);

  useEffect(() => {
    if (setInteractiveResponses) {
      setInteractiveResponses((prev) => ({
        ...prev,
        distribution_analysis: { threshold },
      }));
    }
  }, [threshold, setInteractiveResponses]);

  useEffect(() => {
    // Use a small timeout to ensure DOM elements are available
    const timeoutId = setTimeout(() => {
      const thresholdSlider = document.getElementById(`slider-threshold`) as HTMLInputElement;

      if (thresholdSlider) {
        updateSliderBackground(thresholdSlider);
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [threshold, updateSliderBackground]);

  return (
    <div className="w-full flex flex-col text-lg">
      <div className="overflow-auto mb-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Main distribution chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">{t(translations.distributionOfImprovement)}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={combinedBellData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="x"
                  label={{ value: t(translations.percentageImprovement), position: 'bottom' }}
                  domain={[-10, 25]}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  label={{ value: t(translations.density), angle: -90, position: 'insideLeft' }}
                  tick={{ fontSize: 12 }}
                />
                <ReferenceLine
                  x={threshold}
                  stroke="#dc2626"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  label={{
                    value: `${threshold}%`,
                    position: 'top',
                    fill: '#dc2626',
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="placebo"
                  stroke="#DB0072"
                  strokeWidth={3}
                  dot={false}
                  name={t(translations.placebo)}
                />
                <Line
                  type="monotone"
                  dataKey="neuroBoost"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={false}
                  name={t(translations.neuroBoost)}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#DB0072] rounded"></div>
                <span className="text-sm text-slate-700">{t(translations.placebo)}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#10b981] rounded"></div>
                <span className="text-sm text-slate-700">{t(translations.neuroBoost)}</span>
              </div>
            </div>
          </div>

          {/* Q-Q Plot and Population Prediction */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Q-Q Plot */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-lg font-semibold text-slate-700 mb-4">{t(translations.qqPlotNormalityCheck)}</p>
              <ResponsiveContainer width="100%" height={250}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 30, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="theoretical"
                    type="number"
                    domain={[-10, 25]}
                    label={{ value: t(translations.theoretical), position: 'bottom' }}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    dataKey="sample"
                    type="number"
                    domain={[-10, 25]}
                    label={{ value: t(translations.sample), angle: -90, position: 'insideLeft' }}
                    tick={{ fontSize: 11 }}
                  />
                  <ReferenceLine
                    segment={[
                      { x: -10, y: -10 },
                      { x: 25, y: 25 },
                    ]}
                    stroke="#6b7280"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <Scatter data={placeboQQData} fill="#DB0072" />
                  <Scatter data={neuroBoostQQData} fill="#10b981" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            {/* Population Prediction */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-lg font-semibold text-slate-700 mb-4">{t(translations.populationPrediction)}</p>
              <div className="space-y-4">
                <div className="slider">
                  <label className="block">
                    <span className="font-bold">{t(translations.threshold)}:</span>
                    <span> {threshold}%</span>
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      id="slider-threshold"
                      min="0"
                      max="20"
                      step="0.5"
                      value={threshold}
                      onChange={(e) => setThreshold(parseFloat(e.target.value))}
                      className="global-slider w-full"
                      aria-valuetext={`${t(translations.threshold)}: ${threshold}%`}
                    />
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 text-center">
                  <div className="text-3xl font-bold text-blue-700">{percentageAbove}%</div>
                  <div className="text-sm text-slate-600 mt-1">
                    {parse(t(translations.wouldSeeImprovement).replace('{threshold}', threshold.toString()))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Normality confirmation */}
          <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-700 font-semibold">✓ {t(translations.dataNormallyDistributed)}</span>
              <span className="text-slate-600">({t(translations.andersonDarlingP)})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributionAnalysis;
