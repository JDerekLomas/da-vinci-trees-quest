import React from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import { Interaction } from './interface';
import './data-table.css';

interface DataTableProps {
  interaction: Interaction;
}

const DataTable: React.FC<DataTableProps> = ({ interaction }) => {
  const { t } = useTranslations();

  if (!interaction.dataTable) {
    return null;
  }

  const { headers, rows, caption } = interaction.dataTable;

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>{t(headers[0])}</th>
            <th>{t(headers[1])}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
        {caption && <caption className="sr-only">{caption}</caption>}
      </table>
    </div>
  );
};

export default DataTable;
