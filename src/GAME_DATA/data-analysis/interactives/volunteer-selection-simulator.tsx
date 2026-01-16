import React, { useEffect, useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { VolunteerSelectionSimulatorProps } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';

const VolunteerSelectionSimulator: React.FC<VolunteerSelectionSimulatorProps> = ({
  interaction,
  onInteraction,
}) => {
  const [showVolunteers, setShowVolunteers] = useState(false);
  const { translations } = interaction;
  const { t } = useTranslations();
  const { payload } = useEventListener('volunteer-selection-simulator');

  // Get translated labels
  const generalPopulationLabel = t(translations.generalPopulation);
  const volunteersLabel = t(translations.volunteers);

  // Generate bell curve data for general population (500 people)
  const generateData = useMemo(() => {
    const ranges = ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100'];
    // Bell curve distribution centered around 50-60
    const populationCounts = [5, 15, 35, 60, 85, 90, 70, 45, 20, 8];

    // Volunteers skew left (lower scores)
    const volunteerCounts = [4, 12, 28, 35, 15, 4, 1, 1, 0, 0];

    return ranges.map((range, index) => ({
      range,
      [generalPopulationLabel]: populationCounts[index],
      ...(showVolunteers && { [volunteersLabel]: volunteerCounts[index] }),
    }));
  }, [showVolunteers, generalPopulationLabel, volunteersLabel]);

  const handleSimulate = () => {
    setShowVolunteers(true);
  };

  const handleReset = () => {
    setShowVolunteers(false);
  };

  useEffect(() => {
    if (
      payload &&
      typeof payload === 'object' &&
      'checkForVolunteerSelectionSimulation' in payload &&
      payload.checkForVolunteerSelectionSimulation &&
      showVolunteers
    ) {
      onInteraction({
        'volunteer-selection-simulation-done': true,
      });
    }
  }, [payload, showVolunteers, onInteraction]);

  return (
    <div className="w-full flex flex-col gap-6 items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Main visualization area */}
        <div className="-mb-6">
          <h3 className="text-center text-lg font-medium mb-4 text-slate-700">
            {t(translations.generalPopulationMemoryPerformance)}
          </h3>

          {/* Bar Chart */}
          <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={generateData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="range"
                  label={{
                    value: t(translations.lowToHighPerformance),
                    position: 'insideBottom',
                    offset: 0,
                    style: { fontSize: '14px', fill: '#64748b' },
                  }}
                  tick={{ fontSize: '12px', fill: '#64748b' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  label={{
                    value: t(translations.numberOfPeople),
                    angle: -90,
                    offset: 10,
                    position: 'insideLeft',
                    style: { fontSize: '14px', fill: '#64748b' },
                  }}
                  tick={{ fontSize: '12px', fill: '#64748b' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '13px',
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '20px', paddingLeft: '70px', fontSize: '14px' }}
                  iconType="square"
                />
                <Bar dataKey={generalPopulationLabel} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                {showVolunteers && <Bar dataKey={volunteersLabel} fill="#ef4444" radius={[4, 4, 0, 0]} />}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Buttons */}
        <div className="text-center mb-6 flex gap-4 flex-col lg:flex-row lg:justify-center lg:items-center">
          <button
            onClick={handleSimulate}
            disabled={showVolunteers}
            className="px-8 py-3 text-lg rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:hover:bg-[#006BE0] disabled:bg-gray-400"
          >
            {t(translations.simulateVolunteerSelection)}
          </button>
          <button
            onClick={handleReset}
            className="px-8 py-3 text-lg rounded transition-colors text-center text-blue-600 bg-white border border-[#006BE0] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            {t(translations.reset)}
          </button>
        </div>

        {/* Message */}
        {showVolunteers && (
          <div className="mb-6 border-2 border-[#006BE0] rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-center text-lg">
              <strong className="text-blue-600">{t(translations.selfSelectionBias)}</strong>{' '}
              {t(translations.volunteersNotRepresentative)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerSelectionSimulator;
