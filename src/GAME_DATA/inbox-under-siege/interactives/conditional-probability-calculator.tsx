/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import conditionalProbabilityCalculatorConfig from '../configs/conditional-probability-calculator';
import { useTranslations } from '../../../hooks/useTranslations';

interface SpamProbabilityCalculatorProps {
  onInteraction: (data: Record<string, unknown>) => void;
}

const SpamProbabilityCalculator = ({ onInteraction }: SpamProbabilityCalculatorProps) => {
  const { t } = useTranslations();
  const [probTable, setProbTable] = useState({
    spam: {
      free: '',
      notFree: '',
      win: '',
      notWin: '',
    },
    notSpam: {
      free: '0.15',
      notFree: '0.850',
      win: '0.05',
      notWin: '0.950',
    },
  });

  const [probabilities, setProbabilities] = useState({
    pFreeGivenSpam: 0,
    pFreeGivenNotSpam: 0.15,
    pWinGivenSpam: 0,
    pWinGivenNotSpam: 0.05,
    independenceProbabilitySpam: 0,
    independenceProbabilityNotSpam: 0.0075,
  });

  const calculateProbabilities = () => {
    const pFreeGivenSpam = probTable.spam.free ? Number(probTable.spam.free) : 0;
    const pFreeGivenNotSpam = 0.15; // Static value
    const pWinGivenSpam = probTable.spam.win ? Number(probTable.spam.win) : 0;
    const pWinGivenNotSpam = 0.05; // Static value
    const independenceProbabilitySpam = Number((pFreeGivenSpam * pWinGivenSpam).toFixed(3));
    const independenceProbabilityNotSpam = Number((pFreeGivenNotSpam * pWinGivenNotSpam).toFixed(3));

    setProbabilities({
      ...probabilities,
      pFreeGivenSpam,
      pFreeGivenNotSpam,
      pWinGivenSpam,
      pWinGivenNotSpam,
      independenceProbabilitySpam,
      independenceProbabilityNotSpam,
    });
  };

  const handleInputChange = (category: string, type: string, value: string) => {
    const numValue: any = value === '' ? '' : Number(value);
    if (numValue === '' || (!isNaN(numValue) && numValue >= 0 && numValue <= 1)) {
      const newProbTable: any = { ...probTable };
      newProbTable[category][type] = value;

      if (type === 'free' && value !== '') {
        newProbTable[category].notFree = (1 - numValue).toFixed(3);
      } else if (type === 'win' && value !== '') {
        newProbTable[category].notWin = (1 - numValue).toFixed(3);
      }

      setProbTable(newProbTable);
    }
  };

  useEffect(() => {
    calculateProbabilities();
  }, [probTable]);

  const translationMapping: Map<string, string> = new Map();
  translationMapping.set(
    t(conditionalProbabilityCalculatorConfig.win_spam),
    t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_win_given_spam'),
  );
  translationMapping.set(
    t(conditionalProbabilityCalculatorConfig.win_not_spam),
    t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_win_given_not_spam'),
  );
  translationMapping.set(
    t(conditionalProbabilityCalculatorConfig.free_spam),
    t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_free_given_spam'),
  );
  translationMapping.set(
    t(conditionalProbabilityCalculatorConfig.free_not_spam),
    t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_free_given_not_spam'),
  );

  const barData = [
    {
      name: t('scenes.S7.S7_D0_F34_C9.conditional_probability.p_free_given_spam'),
      Probability: probabilities.pFreeGivenSpam,
      category: 'FREE',
      fill: '#006BE0', // blue-500
      pattern: 'dots',
    },
    {
      name: t('scenes.S7.S7_D0_F34_C9.conditional_probability.p_free_given_not_spam'),
      Probability: probabilities.pFreeGivenNotSpam,
      category: 'FREE',
      fill: '#006BE0', // blue-500
      pattern: 'dots',
    },
    {
      name: t('scenes.S7.S7_D0_F34_C9.conditional_probability.p_win_given_spam'),
      Probability: probabilities.pWinGivenSpam,
      category: 'WIN',
      fill: '#EB0000', // red-500
      pattern: 'lines',
    },
    {
      name: t('scenes.S7.S7_D0_F34_C9.conditional_probability.p_win_given_not_spam'),
      Probability: probabilities.pWinGivenNotSpam,
      category: 'WIN',
      fill: '#EB0000', // red-500
      pattern: 'lines',
    },
  ];

  if (
    (probTable.spam.free === '0.95' || probTable.spam.free === '.95') &&
    (probTable.spam.win === '0.80' ||
      probTable.spam.win === '0.8' ||
      probTable.spam.win === '.80' ||
      probTable.spam.win === '.8')
  ) {
    onInteraction({ 'step-1-completed': true });
  }

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="w-full max-w-4xl bg-white">
        <div className="space-y-6">
          {/* Probability Table */}
          <div className="rounded-lg pl-4 mb-10">
            <h2 className="text-sm font-semibold mb-3" id="feature-frequency-table">
              {t('scenes.S7.S7_D0_F34_C9.conditional_probability.feature_frequency_table')}
            </h2>
            <div className="overflow-x-auto">
              <table
                className="w-full text-sm border-collapse border border-[#757575]"
                aria-labelledby="feature-frequency-table"
              >
                <thead>
                  <tr>
                    <th className="p-2 text-left" scope="col"></th>
                    <th
                      className="p-2 text-left font-medium text-[#006BE0] border border-[#757575]"
                      scope="col"
                      aria-label={t('scenes.S7.S7_D0_F34_C9.conditional_probability.free_present')}
                    >
                      {t('scenes.S7.S7_D0_F34_C9.conditional_probability.free_present')}
                    </th>
                    <th
                      className="p-2 text-left font-medium text-[#006BE0] border border-[#757575]"
                      scope="col"
                      aria-label={t('scenes.S7.S7_D0_F34_C9.conditional_probability.free_absent')}
                    >
                      {t('scenes.S7.S7_D0_F34_C9.conditional_probability.free_absent')}
                    </th>
                    <th
                      className="p-2 text-left font-medium text-[#EB0000] border border-[#757575]"
                      scope="col"
                      aria-label={t('scenes.S7.S7_D0_F34_C9.conditional_probability.win_present')}
                    >
                      {t('scenes.S7.S7_D0_F34_C9.conditional_probability.win_present')}
                    </th>
                    <th
                      className="p-2 text-left font-medium text-[#EB0000] border border-[#757575]"
                      scope="col"
                      aria-label={t('scenes.S7.S7_D0_F34_C9.conditional_probability.win_absent')}
                    >
                      {t('scenes.S7.S7_D0_F34_C9.conditional_probability.win_absent')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="p-2 font-medium border border-[#757575]" scope="row">
                      {t('scenes.S7.S7_D0_F34_C9.conditional_probability.spam')}
                    </th>
                    <td className="p-2 border border-[#757575]">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="1"
                        value={probTable.spam.free}
                        onChange={(e) => handleInputChange('spam', 'free', e.target.value)}
                        className="w-24 p-1 text-sm border border-[#757575] rounded bg-white"
                        aria-live="off"
                        aria-label={`${t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_free_present_spam')}: ${probTable.spam.free}`}
                      />
                      <span className="sr-only">{`${t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_free_present_spam')}: ${probTable.spam.free}`}</span>
                    </td>
                    <td className="p-2 border border-[#757575]">
                      <span
                        className="inline-block w-24 p-1 text-sm"
                        role="region"
                        aria-label={`${t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_free_absent_spam')}: ${probTable.spam.notFree}`}
                      >
                        {probTable.spam.notFree}
                      </span>
                    </td>
                    <td className="p-2 border border-[#757575]">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="1"
                        value={probTable.spam.win}
                        onChange={(e) => handleInputChange('spam', 'win', e.target.value)}
                        className="w-24 p-1 text-sm border border-[#757575] rounded bg-white"
                        aria-live="off"
                        aria-label={`${t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_win_present_spam')}: ${probTable.spam.win}`}
                      />
                      <span className="sr-only">{`${t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_win_present_spam')}: ${probTable.spam.win}`}</span>
                    </td>
                    <td className="p-2 border border-[#757575]">
                      <span
                        className="inline-block w-24 p-1 text-sm"
                        role="region"
                        aria-label={`${t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_win_absent_spam')}: ${probTable.spam.notWin}`}
                      >
                        {probTable.spam.notWin}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th className="p-2 font-medium border border-[#757575]" scope="row">
                      {t('scenes.S7.S7_D0_F34_C9.conditional_probability.not_spam')}
                    </th>
                    <td className="p-2 border border-[#757575]">
                      <span
                        className="inline-block w-24 p-1 text-sm"
                        role="region"
                        aria-label={`${t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_free_present_not_spam')}: 0.15`}
                      >
                        0.15
                      </span>
                    </td>
                    <td className="p-2 border border-[#757575]">
                      <span
                        className="inline-block w-24 p-1 text-sm"
                        role="region"
                        aria-label={`${t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_free_absent_not_spam')}: 0.850`}
                      >
                        0.850
                      </span>
                    </td>
                    <td className="p-2 border border-[#757575]">
                      <span
                        className="inline-block w-24 p-1 text-sm"
                        role="region"
                        aria-label={`${t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_win_present_not_spam')}: 0.05`}
                      >
                        0.05
                      </span>
                    </td>
                    <td className="p-2 border border-[#757575]">
                      <span
                        className="inline-block w-24 p-1 text-sm"
                        role="region"
                        aria-label={`${t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_win_absent_not_spam')}: 0.950`}
                      >
                        0.950
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Probability Display */}
          <div className="rounded-lg pl-4">
            <h2 className="text-sm font-semibold mb-3" id="conditional-probabilities">
              {t('scenes.S7.S7_D0_F34_C9.conditional_probability.conditional_probabilities')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 border border-[#006BE0]"
                      style={{ background: 'url(#dots)' }}
                      aria-hidden="true"
                    >
                      <svg width="12" height="12" className="w-full h-full">
                        <pattern id="dotPattern" width="4" height="4" patternUnits="userSpaceOnUse">
                          <circle cx="2" cy="2" r="1" fill="#006BE0" />
                        </pattern>
                        <rect width="14" height="14" fill="url(#dotPattern)" />
                      </svg>
                    </div>
                    <span className="sr-only">
                      {t('scenes.S7.S7_D0_F34_C9.conditional_probability.blue_dotted_legend')}
                    </span>
                    <span className="text-[#006BE0]" aria-hidden="true">
                      {t('scenes.S7.S7_D0_F34_C9.conditional_probability.p_free_given_spam')} =
                    </span>
                    <span className="font-medium text-[#006BE0]" aria-hidden="true">
                      {probabilities.pFreeGivenSpam.toFixed(3)}
                    </span>
                    <span className="sr-only" aria-live="off">
                      {t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_free_given_spam')}{' '}
                      {probabilities.pFreeGivenSpam.toFixed(3)}
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 border border-[#006BE0]"
                      style={{ background: 'url(#dots)' }}
                      aria-hidden="true"
                    >
                      <svg width="12" height="12" className="w-full h-full">
                        <pattern id="dotPattern2" width="4" height="4" patternUnits="userSpaceOnUse">
                          <circle cx="2" cy="2" r="1" fill="#006BE0" />
                        </pattern>
                        <rect width="14" height="14" fill="url(#dotPattern2)" />
                      </svg>
                    </div>
                    <span className="sr-only">
                      {t('scenes.S7.S7_D0_F34_C9.conditional_probability.blue_dotted_legend')}
                    </span>
                    <span className="text-[#006BE0]" aria-hidden="true">
                      {t('scenes.S7.S7_D0_F34_C9.conditional_probability.p_free_given_not_spam')} =
                    </span>
                    <span className="font-medium text-[#006BE0]" aria-hidden="true">
                      {probabilities.pFreeGivenNotSpam.toFixed(3)}
                    </span>
                    <span className="sr-only" aria-live="off">
                      {t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_free_given_not_spam')}{' '}
                      {probabilities.pFreeGivenNotSpam.toFixed(3)}
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 border border-[#EB0000]"
                      style={{ background: 'url(#lines)' }}
                      aria-hidden="true"
                    >
                      <svg width="12" height="12" className="w-full h-full">
                        <pattern id="linePattern2" width="4" height="4" patternUnits="userSpaceOnUse">
                          <line x1="0" y1="2" x2="4" y2="2" stroke="#EB0000" strokeWidth="1" />
                        </pattern>
                        <rect width="14" height="12" fill="url(#linePattern2)" />
                      </svg>
                    </div>
                    <span className="sr-only">
                      {t('scenes.S7.S7_D0_F34_C9.conditional_probability.red_lines_legend')}
                    </span>
                    <span className="text-[#EB0000]" aria-hidden="true">
                      {t('scenes.S7.S7_D0_F34_C9.conditional_probability.p_win_given_spam')} =
                    </span>
                    <span className="font-medium text-[#EB0000]" aria-hidden="true">
                      {probabilities.pWinGivenSpam.toFixed(3)}
                    </span>
                    <span className="sr-only" aria-live="off">
                      {t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_win_given_spam')}{' '}
                      {probabilities.pWinGivenSpam.toFixed(3)}
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 border border-[#EB0000]"
                      style={{ background: 'url(#lines)' }}
                      aria-hidden="true"
                    >
                      <svg width="12" height="12" className="w-full h-full">
                        <pattern id="linePattern2" width="4" height="4" patternUnits="userSpaceOnUse">
                          <line x1="0" y1="2" x2="4" y2="2" stroke="#EB0000" strokeWidth="1" />
                        </pattern>
                        <rect width="14" height="12" fill="url(#linePattern2)" />
                      </svg>
                    </div>
                    <span className="sr-only">
                      {t('scenes.S7.S7_D0_F34_C9.conditional_probability.red_lines_legend')}
                    </span>
                    <span className="text-[#EB0000]" aria-hidden="true">
                      {t('scenes.S7.S7_D0_F34_C9.conditional_probability.p_win_given_not_spam')} =
                    </span>
                    <span className="font-medium text-[#EB0000]" aria-hidden="true">
                      {probabilities.pWinGivenNotSpam.toFixed(3)}
                    </span>
                    <span className="sr-only" aria-live="off">
                      {t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_win_given_not_spam')}{' '}
                      {probabilities.pWinGivenNotSpam.toFixed(3)}
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="bg-white p-3 rounded-lg shadow-sm text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <span aria-hidden="true">
                      {t('scenes.S7.S7_D0_F34_C9.conditional_probability.p_free_win_given_spam')} ≈{' '}
                      {probabilities.independenceProbabilitySpam.toFixed(3)}
                    </span>
                    <span
                      className="sr-only"
                      aria-hidden="false"
                    >{`${t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_free_win_given_spam')} ${probabilities.independenceProbabilitySpam.toFixed(3)}.`}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span aria-hidden="true">
                      {t('scenes.S7.S7_D0_F34_C9.conditional_probability.p_free_win_given_not_spam')} ≈{' '}
                      {probabilities.independenceProbabilityNotSpam.toFixed(3)}
                    </span>
                    <span
                      className="sr-only"
                      aria-hidden="false"
                    >{`${t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_free_win_given_not_spam')} ${probabilities.independenceProbabilityNotSpam.toFixed(3)}.`}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="rounded-lg p-4">
            <h2 className="text-sm font-semibold mb-3" id="probability-visualization" aria-live="off">
              {t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_visualization')}
            </h2>
            <div className="h-48" aria-labelledby="probability-visualization" role="figure">
              <BarChart
                width={600}
                height={180}
                data={barData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                aria-label={t('scenes.S7.S7_D0_F34_C9.conditional_probability.bar_chart_description')}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="undefined" />
                <XAxis dataKey="name" stroke="#000000" fontSize={12} angle={-15} textAnchor="end" height={60} />
                <YAxis domain={[0, 1]} stroke="#000000" fontSize={12} />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === 'Probability') {
                      return [value, t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability')];
                    }
                    return [value, name];
                  }}
                />
                <defs>
                  <pattern id="dots" patternUnits="userSpaceOnUse" width="10" height="10">
                    <circle cx="5" cy="5" r="2" fill="#006BE0" />
                  </pattern>
                  <pattern id="lines" patternUnits="userSpaceOnUse" width="10" height="10">
                    <line x1="0" y1="5" x2="10" y2="5" stroke="#EB0000" strokeWidth="2" />
                  </pattern>
                </defs>
                <Bar
                  dataKey="Probability"
                  fill="#006BE0" // Assuming a default color, replace with appropriate logic if needed
                  stroke="#EB0000" // Assuming a default color, replace with appropriate logic if needed
                  strokeWidth={1}
                  fillOpacity={1}
                  shape={(props: any) => {
                    return (
                      <rect
                        {...props}
                        fill={props.payload.pattern ? `url(#${props.payload.pattern})` : props.fill}
                        stroke={props.fill}
                        strokeWidth={1}
                        role="graphics-symbol"
                        title={t('scenes.S7.S7_D0_F34_C9.conditional_probability.bar')}
                        aria-live="off"
                      />
                    );
                  }}
                />
              </BarChart>
              {/* Added to avoid blank announcement in NVDA */}
              <span className="sr-only"></span>
            </div>
            <div className="sr-only" aria-live="off">
              This chart shows the conditional probabilities:
              <ul>
                <li>
                  {t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_free_given_spam')}{' '}
                  {probabilities.pFreeGivenSpam.toFixed(3)}
                </li>
                <li>
                  {t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_free_given_not_spam')}{' '}
                  {probabilities.pFreeGivenNotSpam.toFixed(3)}
                </li>
                <li>
                  {t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_win_given_spam')}{' '}
                  {probabilities.pWinGivenSpam.toFixed(3)}
                </li>
                <li>
                  {t('scenes.S7.S7_D0_F34_C9.conditional_probability.probability_win_given_not_spam')}{' '}
                  {probabilities.pWinGivenNotSpam.toFixed(3)}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpamProbabilityCalculator;
