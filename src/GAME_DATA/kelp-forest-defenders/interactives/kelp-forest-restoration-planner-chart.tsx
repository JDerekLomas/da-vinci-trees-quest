import React, { useState, useCallback, useMemo } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import { RestorationPlannerInteraction } from './interface';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Health status type
interface HealthStatus {
  status: string;
  color: string;
}

const KelpForestRestorationPlanner: React.FC<{
  interaction: RestorationPlannerInteraction;
}> = ({ interaction }) => {
  const { t } = useTranslations();
  const { unit } = interaction;

  // State for selected restoration strategy
  const [selectedStrategy, setSelectedStrategy] = useState('none');

  // Reset function to return to default state
  const resetStrategy = () => {
    setSelectedStrategy('none');
  };

  // Historical data - starting point for our projections
  const startingPoint = { kelp: 0.47, urchins: 11.86 }; // 2019 data

  // Generate timeline data for long-term restoration projection
  const timelineData = useMemo(() => {
    // Project into the future to 2035
    const years = [];
    for (let i = 0; i <= 16; i++) {
      years.push(i);
    }

    // Different projections based on strategy
    switch (selectedStrategy) {
      case 'stars':
        // Sea Star Reintroduction - gradual improvement
        return years.map((year) => ({
          year: 2019 + year,
          kelp: year === 0 ? startingPoint.kelp : Math.min(4.5, startingPoint.kelp + year * 0.28),
          urchins: year === 0 ? startingPoint.urchins : Math.max(0.5, startingPoint.urchins - year * 0.8),
        }));

      case 'culling':
        // Urchin Culling - rapid urchin decrease, moderate kelp increase
        return years.map((year) => ({
          year: 2019 + year,
          kelp: year === 0 ? startingPoint.kelp : Math.min(5, startingPoint.kelp + year * 0.3),
          urchins:
            year === 0
              ? startingPoint.urchins
              : year <= 3
                ? Math.max(0.5, startingPoint.urchins - year * 3.8)
                : 0.5,
        }));

      case 'transplant':
        // Kelp Transplantation - kelp increases but urchins remain high
        return years.map((year) => ({
          year: 2019 + year,
          kelp: year === 0 ? startingPoint.kelp : Math.min(2.5, startingPoint.kelp + year * 0.15),
          urchins: year === 0 ? startingPoint.urchins : startingPoint.urchins - year * 0.1, // Slight urchin decline
        }));

      default:
        // No Intervention - continued decline
        return years.map((year) => ({
          year: 2019 + year,
          kelp: year === 0 ? startingPoint.kelp : Math.max(0, startingPoint.kelp - 0.1 * Math.min(year, 5)),
          urchins:
            year === 0 ? startingPoint.urchins : Math.min(15, startingPoint.urchins + 0.3 * Math.min(year, 10)),
        }));
    }
  }, [selectedStrategy, startingPoint]);

  // Get final projected kelp value
  const finalKelp = timelineData[timelineData.length - 1].kelp;

  // Determine ecosystem health status
  const healthStatus = useMemo((): HealthStatus => {
    if (finalKelp < 0.5)
      return {
        status: t('scenes.S14.S14_D0_F50_C9.restoration.health.critical'),
        color: 'text-red-600',
      };
    if (finalKelp < 1.5)
      return {
        status: t('scenes.S14.S14_D0_F50_C9.restoration.health.poor'),
        color: 'text-orange-500',
      };
    if (finalKelp < 2.5)
      return {
        status: t('scenes.S14.S14_D0_F50_C9.restoration.health.moderate'),
        color: 'text-yellow-600',
      };
    return {
      status: t('scenes.S14.S14_D0_F50_C9.restoration.health.healthy'),
      color: 'text-green-600',
    };
  }, [finalKelp, t]);

  // Custom tooltip for chart
  const CustomTooltip = useCallback(
    ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white p-2 border border-gray-200 rounded shadow-md text-base">
            <p className="font-bold">
              {t('scenes.S14.S14_D0_F50_C9.restoration.year')}: {label}
            </p>
            <p className="text-green-600">
              {t('scenes.S14.S14_D0_F50_C9.restoration.kelp')}: {payload[0].value.toFixed(1)} {t(unit)}
            </p>
            <p className="text-purple-600">
              {t('scenes.S14.S14_D0_F50_C9.restoration.urchins')}: {payload[1].value.toFixed(1)} {t(unit)}
            </p>
          </div>
        );
      }
      return null;
    },
    [t, unit],
  );

  return (
    <div className="flex flex-col max-w-5xl mx-auto">
      {/* Simple Introduction */}
      <div className="p-3 rounded-lg mb-2 mt-[-20px]">
        <p className="text-center">
          {selectedStrategy === 'none'
            ? t('scenes.S14.S14_D0_F50_C9.restoration.intro')
            : t('scenes.S14.S14_D0_F50_C9.restoration.selected')}
        </p>
      </div>

      {/* Strategy Selection - Simple Cards */}
      <div className="flex flex-row gap-2 justify-center mb-2">
        <button
          className={`p-2 rounded-lg border text-base ${selectedStrategy === 'stars' ? 'bg-blue-100 border-blue-400 font-bold' : 'bg-white border-gray-300'}`}
          onClick={() => setSelectedStrategy('stars')}
          aria-label={t('scenes.S14.S14_D0_F50_C9.restoration.buttons.stars')}
          aria-pressed={selectedStrategy === 'stars'}
        >
          <div className="text-center">
            <div className="text-base mb-0">⭐</div>
            <div>{t('scenes.S14.S14_D0_F50_C9.restoration.buttons.stars')}</div>
          </div>
        </button>

        <button
          className={`p-2 rounded-lg border text-base ${selectedStrategy === 'culling' ? 'bg-red-100 border-red-400 font-bold' : 'bg-white border-gray-300'}`}
          onClick={() => setSelectedStrategy('culling')}
          aria-label={t('scenes.S14.S14_D0_F50_C9.restoration.buttons.culling')}
          aria-pressed={selectedStrategy === 'culling'}
        >
          <div className="text-center">
            <div className="text-base mb-0">🦔</div>
            <div>{t('scenes.S14.S14_D0_F50_C9.restoration.buttons.culling')}</div>
          </div>
        </button>

        <button
          className={`p-2 rounded-lg border text-base ${selectedStrategy === 'transplant' ? 'bg-green-100 border-green-400 font-bold' : 'bg-white border-gray-300'}`}
          onClick={() => setSelectedStrategy('transplant')}
          aria-label={t('scenes.S14.S14_D0_F50_C9.restoration.buttons.transplant')}
          aria-pressed={selectedStrategy === 'transplant'}
        >
          <div className="text-center">
            <div className="text-base mb-0">🌱</div>
            <div>{t('scenes.S14.S14_D0_F50_C9.restoration.buttons.transplant')}</div>
          </div>
        </button>

        {selectedStrategy !== 'none' && (
          <button
            className="p-2 rounded-lg border text-base bg-gray-100 border-gray-300"
            onClick={resetStrategy}
            aria-label={t('scenes.S14.S14_D0_F50_C9.restoration.buttons.reset')}
          >
            <div className="text-center">
              <div className="text-base mb-0">↩️</div>
              <div>{t('scenes.S14.S14_D0_F50_C9.restoration.buttons.reset')}</div>
            </div>
          </button>
        )}
      </div>

      {/* Strategy Description */}
      <div
        className={`p-2 rounded-lg mb-2 text-base ${
          selectedStrategy === 'none'
            ? 'bg-gray-50'
            : selectedStrategy === 'stars'
              ? 'bg-blue-50'
              : selectedStrategy === 'culling'
                ? 'bg-red-50'
                : selectedStrategy === 'transplant'
                  ? 'bg-green-50'
                  : 'bg-gray-50'
        }`}
        aria-live="polite"
      >
        {selectedStrategy === 'none' && (
          <div>
            <p className="font-bold">{t('scenes.S14.S14_D0_F50_C9.restoration.strategy.none.title')}</p>
            <p>{t('scenes.S14.S14_D0_F50_C9.restoration.strategy.none.description')}</p>
          </div>
        )}

        {selectedStrategy === 'stars' && (
          <div>
            <p className="font-bold">{t('scenes.S14.S14_D0_F50_C9.restoration.strategy.stars.title')}</p>
            <p>{t('scenes.S14.S14_D0_F50_C9.restoration.strategy.stars.description')}</p>
          </div>
        )}

        {selectedStrategy === 'culling' && (
          <div>
            <p className="font-bold">{t('scenes.S14.S14_D0_F50_C9.restoration.strategy.culling.title')}</p>
            <p>{t('scenes.S14.S14_D0_F50_C9.restoration.strategy.culling.description')}</p>
          </div>
        )}

        {selectedStrategy === 'transplant' && (
          <div>
            <p className="font-bold">{t('scenes.S14.S14_D0_F50_C9.restoration.strategy.transplant.title')}</p>
            <p>{t('scenes.S14.S14_D0_F50_C9.restoration.strategy.transplant.description')}</p>
          </div>
        )}
      </div>

      {/* Projection Graph */}
      <div className="bg-white rounded-lg shadow-md p-2 mb-2">
        <h3 className="text-center font-bold mb-1 text-base">{t('scenes.S14.S14_D0_F50_C9.restoration.future_projection')}</h3>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData} margin={{ top: 10, right: 20, bottom: 30, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="year"
                label={{ value: t('year'), position: 'bottom', offset: -5 }}
                ticks={[2019, 2023, 2027, 2031, 2035]}
                tick={{ fontSize: 16 }}
              />
              <YAxis
                domain={[0, 15]}
                label={{ value: t('amount'), angle: -90, position: 'insideLeft', offset: 5 }}
                tick={{ fontSize: 16 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" align="center" wrapperStyle={{ fontSize: '16px' }} />

              <Line
                type="monotone"
                dataKey="kelp"
                name={t('scenes.S14.S14_D0_F50_C9.restoration.kelp')}
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: '#22c55e', r: 3 }}
                activeDot={{ r: 6, fill: '#22c55e' }}
                isAnimationActive={false}
              />

              <Line
                type="monotone"
                dataKey="urchins"
                name={t('scenes.S14.S14_D0_F50_C9.restoration.urchins')}
                stroke="#a855f7"
                strokeWidth={2}
                dot={{ fill: '#a855f7', r: 3 }}
                activeDot={{ r: 6, fill: '#a855f7' }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Simple Results Box */}
      <div className="bg-blue-50 p-3 rounded-lg text-center" aria-live="polite">
        <h3 className="font-bold mb-1">{t('scenes.S14.S14_D0_F50_C9.restoration.health.title')}</h3>
        <p className={`text-lg ${healthStatus.color} font-bold`}>
          {t('scenes.S14.S14_D0_F50_C9.restoration.health.status')} {healthStatus.status}
        </p>
        <p className="mt-2">
          {selectedStrategy === 'none' && t('scenes.S14.S14_D0_F50_C9.restoration.strategy.none.result')}
          {selectedStrategy === 'stars' && t('scenes.S14.S14_D0_F50_C9.restoration.strategy.stars.result')}
          {selectedStrategy === 'culling' && t('scenes.S14.S14_D0_F50_C9.restoration.strategy.culling.result')}
          {selectedStrategy === 'transplant' &&
            t('scenes.S14.S14_D0_F50_C9.restoration.strategy.transplant.result')}
        </p>
      </div>

      <div className="text-base text-center text-gray-500 mt-3">
        {t('scenes.S14.S14_D0_F50_C9.restoration.footer')}
      </div>
    </div>
  );
};

export default KelpForestRestorationPlanner;
