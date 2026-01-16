import React, { useMemo } from 'react';
import { SubgroupDistributionAnalysisProps } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ReferenceLine,
} from 'recharts';

const SubgroupDistributionAnalysis: React.FC<SubgroupDistributionAnalysisProps> = ({ interaction }) => {
  const { translations } = interaction;
  const { t } = useTranslations();

  const filteredDistributionData = useMemo(() => {
    return [
      { improvement: 2, frequency: 1 },
      { improvement: 4, frequency: 2 },
      { improvement: 6, frequency: 3 },
      { improvement: 8, frequency: 3 },
      { improvement: 10, frequency: 2 },
      { improvement: 12, frequency: 1 },
      { improvement: 14, frequency: 1 },
      { improvement: 16, frequency: 1 },
      { improvement: 22, frequency: 1 },
    ];
  }, []);

  const generateFilteredQQData = () => {
    return [
      { theoretical: -1.5, sample: -1.2 },
      { theoretical: -1.2, sample: -0.9 },
      { theoretical: -0.9, sample: -0.5 },
      { theoretical: -0.6, sample: -0.2 },
      { theoretical: -0.4, sample: 0.1 },
      { theoretical: -0.2, sample: 0.4 },
      { theoretical: 0, sample: 0.7 },
      { theoretical: 0.2, sample: 1.1 },
      { theoretical: 0.4, sample: 1.6 },
      { theoretical: 0.6, sample: 2.1 },
      { theoretical: 0.9, sample: 2.9 },
      { theoretical: 1.2, sample: 3.7 },
      { theoretical: 1.5, sample: 4.8 },
      { theoretical: 1.8, sample: 5.6 },
      { theoretical: 2.2, sample: 7.2 },
    ];
  };

  const filteredQQData = useMemo(() => generateFilteredQQData(), []);

  return (
    <div className="interactive-container">
      <div className="space-y-6">
        {/* Main Distribution Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800">{t(translations.chartTitle)}</h3>
              <p className="text-sm text-gray-600">{t(translations.chartDescription)}</p>
            </div>
            <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold text-sm">
              {t(translations.subgroupLabel)}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredDistributionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="improvement" label={{ value: t(translations.xAxisLabel), position: 'bottom' }} />
              <YAxis label={{ value: t(translations.yAxisLabel), angle: -90, position: 'insideLeft' }} />
              <Bar dataKey="frequency" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Q-Q Plot and Test Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Q-Q Plot */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">{t(translations.qqPlotTitle)}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 30, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="theoretical"
                  type="number"
                  domain={[-2, 2.5]}
                  label={{ value: t(translations.qqPlotXLabel), position: 'bottom' }}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  dataKey="sample"
                  type="number"
                  domain={[-2, 8]}
                  label={{ value: t(translations.qqPlotYLabel), angle: -90, position: 'insideLeft' }}
                  tick={{ fontSize: 11 }}
                />
                <ReferenceLine
                  segment={[
                    { x: -2, y: -2 },
                    { x: 2.5, y: 2.5 },
                  ]}
                  stroke="#6b7280"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
                <Scatter data={filteredQQData} fill="#3b82f6" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Statistical Test Results */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">{t(translations.testResultsTitle)}</h3>
            <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-300 mb-4">
              <div className="text-center">
                <div className="text-sm font-semibold text-orange-900 mb-2">{t(translations.shapiroWilkTest)}</div>
                <div className="text-4xl font-bold text-orange-700 mb-1">p = 0.02</div>
                <div className="text-sm text-gray-600 font-medium">(p &lt; 0.05)</div>
              </div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
              <p className="font-bold text-yellow-900 mb-2 text-sm">{t(translations.notNormalDistribution)}</p>
              <p className="text-gray-700 text-sm">{t(translations.standardMethodsUnreliable)}</p>
            </div>
          </div>
        </div>

        {/* Warning Message */}
        <div className="bg-orange-50 rounded-lg p-4 mb-6 border-l-4 border-orange-500">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-orange-700 font-semibold">{t(translations.deviationWarning)}</span>
            <span className="text-gray-600">({t(translations.differentApproachesNeeded)})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubgroupDistributionAnalysis;
