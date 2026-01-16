import React from 'react';
import { MerchantLedgerTableInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';

type TranslationKeys =
  | 'scenes.S8.S8_D0_F16_C9.amount_header'
  | 'scenes.S8.S8_D0_F16_C9.description_header'
  | 'scenes.S8.S8_D0_F16_C9.transactions.shop_rent'
  | 'scenes.S8.S8_D0_F16_C9.transactions.helper_wage'
  | 'scenes.S8.S8_D0_F16_C9.transactions.dates_sold_3lb'
  | 'scenes.S8.S8_D0_F16_C9.transactions.storage_baskets'
  | 'scenes.S8.S8_D0_F16_C9.transactions.market_stall_fee'
  | 'scenes.S8.S8_D0_F16_C9.transactions.dates_sold_5lb'
  | 'scenes.S8.S8_D0_F16_C9.transactions.caravan_purchase'
  | 'scenes.S8.S8_D0_F16_C9.transactions.dates_sold_7lb';

interface MerchantLedgerTableProps {
  interaction: MerchantLedgerTableInteraction;
}

const MerchantLedgerTable: React.FC<MerchantLedgerTableProps> = ({ interaction }) => {
  const { t } = useTranslations();

  const translations: Record<TranslationKeys | string, string> = {
    'scenes.S8.S8_D0_F16_C9.amount_header': t('scenes.S8.S8_D0_F16_C9.amount_header'),
    'scenes.S8.S8_D0_F16_C9.description_header': t('scenes.S8.S8_D0_F16_C9.description_header'),
    'scenes.S8.S8_D0_F16_C9.transactions.shop_rent': t('scenes.S8.S8_D0_F16_C9.transactions.shop_rent'),
    'scenes.S8.S8_D0_F16_C9.transactions.helper_wage': t('scenes.S8.S8_D0_F16_C9.transactions.helper_wage'),
    'scenes.S8.S8_D0_F16_C9.transactions.dates_sold_3lb': t('scenes.S8.S8_D0_F16_C9.transactions.dates_sold_3lb'),
    'scenes.S8.S8_D0_F16_C9.transactions.storage_baskets': t(
      'scenes.S8.S8_D0_F16_C9.transactions.storage_baskets',
    ),
    'scenes.S8.S8_D0_F16_C9.transactions.market_stall_fee': t(
      'scenes.S8.S8_D0_F16_C9.transactions.market_stall_fee',
    ),
    'scenes.S8.S8_D0_F16_C9.transactions.dates_sold_5lb': t('scenes.S8.S8_D0_F16_C9.transactions.dates_sold_5lb'),
    'scenes.S8.S8_D0_F16_C9.transactions.caravan_purchase': t(
      'scenes.S8.S8_D0_F16_C9.transactions.caravan_purchase',
    ),
    'scenes.S8.S8_D0_F16_C9.transactions.dates_sold_7lb': t('scenes.S8.S8_D0_F16_C9.transactions.dates_sold_7lb'),
  };

  const getTranslation = (key: string) => {
    return translations[key] || key;
  };

  return (
    <div
      className="w-full max-w-4xl mx-auto mb-8 font-avenir-next text-[20px] leading-[30px]"
      role="region"
      aria-label={t(interaction.ariaLabel)}
    >
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-3 text-center font-bold">
              {translations['scenes.S8.S8_D0_F16_C9.amount_header']}
            </th>
            <th className="border border-gray-200 px-4 py-3 text-left font-bold">
              {translations['scenes.S8.S8_D0_F16_C9.description_header']}
            </th>
          </tr>
        </thead>
        <tbody>
          {interaction.data.map((row, index) => (
            <tr key={index} className="font-medium hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-3 text-center align-middle font-bold">
                {row.amount} dirhams
              </td>
              <td className="border border-gray-200 px-4 py-3 text-left align-middle">
                {getTranslation(row.description)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MerchantLedgerTable;
