import React from 'react';
import { Interaction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';

const InteractiveDataTable: React.FC<{ interaction: Interaction }> = ({ interaction }) => {
  const { t } = useTranslations();

  if (!interaction.tableConfig) return null;

  return (
    <div className="w-full max-w-[32rem]" role="region" aria-label={t(interaction.ariaLabel || '')}>
      <div className="w-full mx-auto">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr>
              {interaction.tableConfig?.columns.map((column, index) => (
                <th key={`column-${index}`} className="border-2 border-[#E4E4E4] px-4 py-3 text-center font-bold">
                  {t(column.name)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {interaction.tableConfig?.tableData.map((row, index) => (
              <tr key={`row-${index}`}>
                {interaction.tableConfig?.columns.map((column, index) => (
                  <td key={`table-data-${index}`} className="border-2 border-[#E4E4E4] px-4 py-3 text-center">
                    {row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InteractiveDataTable;
