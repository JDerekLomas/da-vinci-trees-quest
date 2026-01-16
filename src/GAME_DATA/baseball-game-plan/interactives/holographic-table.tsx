import React from 'react';
import { HoloGraphicTableInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';

interface HolographicTableProps {
  interaction: HoloGraphicTableInteraction;
}

type TranslationKeys =
  | 'scenes.S4.S4_D0_F10_C9.teams.blue_devils'
  | 'scenes.S4.S4_D0_F10_C9.teams.hawks'
  | 'scenes.S4.S4_D0_F10_C9.teams.tiger'
  | 'scenes.S4.S4_D0_F10_C9.teams.eagles'
  | 'scenes.S4.S4_D0_F10_C9.teams.bulldogs'
  | 'scenes.S4.S4_D0_F10_C9.averages.last_five'
  | 'scenes.S4.S4_D0_F10_C9.averages.season';

const HolographicTable: React.FC<HolographicTableProps> = ({ interaction }) => {
  const { t } = useTranslations();

  const translations: Record<TranslationKeys | string, string> = {
    'scenes.S4.S4_D0_F10_C9.last_five_games': t('scenes.S4.S4_D0_F10_C9.last_five_games'),
    'scenes.S4.S4_D0_F10_C9.hits': t('scenes.S4.S4_D0_F10_C9.hits'),
    'scenes.S4.S4_D0_F10_C9.runs': t('scenes.S4.S4_D0_F10_C9.runs'),
    'scenes.S4.S4_D0_F10_C9.errors': t('scenes.S4.S4_D0_F10_C9.errors'),
    'scenes.S4.S4_D0_F10_C9.pitch_count': t('scenes.S4.S4_D0_F10_C9.pitch_count'),
    'scenes.S4.S4_D0_F10_C9.teams.blue_devils': t('scenes.S4.S4_D0_F10_C9.teams.blue_devils'),
    'scenes.S4.S4_D0_F10_C9.teams.hawks': t('scenes.S4.S4_D0_F10_C9.teams.hawks'),
    'scenes.S4.S4_D0_F10_C9.teams.tiger': t('scenes.S4.S4_D0_F10_C9.teams.tiger'),
    'scenes.S4.S4_D0_F10_C9.teams.eagles': t('scenes.S4.S4_D0_F10_C9.teams.eagles'),
    'scenes.S4.S4_D0_F10_C9.teams.bulldogs': t('scenes.S4.S4_D0_F10_C9.teams.bulldogs'),
    'scenes.S4.S4_D0_F10_C9.averages.last_five': t('scenes.S4.S4_D0_F10_C9.averages.last_five'),
    'scenes.S4.S4_D0_F10_C9.averages.season': t('scenes.S4.S4_D0_F10_C9.averages.season'),
    'scenes.S4.S4_D0_F10_C9.season_average': t('scenes.S4.S4_D0_F10_C9.season_average'),
  };

  const getTranslation = (key: string) => {
    return translations[key] || key;
  };

  // Filter out the season average row from the main data
  const mainTableData = interaction.data.filter(
    row => row.firstCol !== 'scenes.S4.S4_D0_F10_C9.averages.season'
  );

  // Find the season average row
  const seasonAverageRow = interaction.data.find(
    row => row.firstCol === 'scenes.S4.S4_D0_F10_C9.averages.season'
  );

  return (
    <div
      className="w-full max-w-4xl mx-auto mb-8 font-avenir-next text-[20px] leading-[30px]"
      role="region"
      aria-label={t(interaction.ariaLabel)}
    >
      {/* Main Table */}
      <table className="w-full border-collapse bg-white mb-6">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-3 text-left font-bold">
              {translations['scenes.S4.S4_D0_F10_C9.last_five_games']}
            </th>
            <th className="border border-gray-200 px-4 py-3 text-center font-bold">
              {translations['scenes.S4.S4_D0_F10_C9.hits']}
            </th>
            <th className="border border-gray-200 px-4 py-3 text-center font-bold">
              {translations['scenes.S4.S4_D0_F10_C9.runs']}
            </th>
            <th className="border border-gray-200 px-4 py-3 text-center font-bold">
              {translations['scenes.S4.S4_D0_F10_C9.errors']}
            </th>
            <th className="border border-gray-200 px-4 py-3 text-center font-bold">
              {translations['scenes.S4.S4_D0_F10_C9.pitch_count']}
            </th>
          </tr>
        </thead>
        <tbody>
          {mainTableData.map((row, index) => (
            <tr
              key={index}
              className={`
                ${row.firstCol === 'scenes.S4.S4_D0_F10_C9.averages.last_five' ? 'bg-gray-100 font-bold' : 'font-medium'} 
                hover:bg-gray-50
              `}
            >
              <td className="border border-gray-200 px-4 py-3 text-left align-middle">
                {getTranslation(row.firstCol as string)}
              </td>
              <td className="border border-gray-200 px-4 py-3 text-center align-middle">{row.secondCol}</td>
              <td className="border border-gray-200 px-4 py-3 text-center align-middle">{row.thirdCol}</td>
              <td className="border border-gray-200 px-4 py-3 text-center align-middle">{row.fourthCol}</td>
              <td className="border border-gray-200 px-4 py-3 text-center align-middle">{row.fifthCol}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Season Average Table */}
      {seasonAverageRow && (
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-3 text-left font-bold">
                
              </th>
              <th className="border border-gray-200 px-4 py-3 text-center font-bold">
                {translations['scenes.S4.S4_D0_F10_C9.hits']}
              </th>
              <th className="border border-gray-200 px-4 py-3 text-center font-bold">
                {translations['scenes.S4.S4_D0_F10_C9.runs']}
              </th>
              <th className="border border-gray-200 px-4 py-3 text-center font-bold">
                {translations['scenes.S4.S4_D0_F10_C9.errors']}
              </th>
              <th className="border border-gray-200 px-4 py-3 text-center font-bold">
                {translations['scenes.S4.S4_D0_F10_C9.pitch_count']}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-100 font-bold hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-3 text-left align-middle">
                {getTranslation(seasonAverageRow.firstCol as string)}
              </td>
              <td className="border border-gray-200 px-4 py-3 text-center align-middle">{seasonAverageRow.secondCol}</td>
              <td className="border border-gray-200 px-4 py-3 text-center align-middle">{seasonAverageRow.thirdCol}</td>
              <td className="border border-gray-200 px-4 py-3 text-center align-middle">{seasonAverageRow.fourthCol}</td>
              <td className="border border-gray-200 px-4 py-3 text-center align-middle">{seasonAverageRow.fifthCol}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HolographicTable;