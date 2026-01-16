import React from 'react';
import { HoloGraphicTableInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';

interface HolographicTableProps {
  interaction: HoloGraphicTableInteraction;
}

const HolographicTable: React.FC<HolographicTableProps> = ({ interaction }) => {
  const { t } = useTranslations();

  return (
    <div
      style={{ width: '100%', maxWidth: '23rem', marginBottom: '2rem' }}
      role="region"
      aria-label="Disease cases table"
    >
      <div className="w-[100%] mx-auto mt-6 text-lg">
       <table className="w-full border-collapse bg-white">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-3 text-left font-bold">
                {t('scenes.common.day')}
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left font-bold">
                {t('scenes.common.number_of_cases')}
              </th>
            </tr>
          </thead>
          <tbody>
            {interaction.data.map((row) => (
              <tr key={row.firstCol}>
                <td className="border border-gray-200 px-4 py-3">{row.firstCol}</td>
                <td className="border border-gray-200 px-4 py-3">{row.secondCol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HolographicTable;
