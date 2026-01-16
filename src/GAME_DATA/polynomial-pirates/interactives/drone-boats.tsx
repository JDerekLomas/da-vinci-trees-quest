/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTranslations } from '../../../hooks/useTranslations';

const DroneBoats: React.FC<{ interaction: any }> = ({ interaction }) => {
  const { t } = useTranslations();

  return (
    <div className="flex flex-col items-center">
      <figure className="w-full overflow-hidden">
        <img src={interaction.imageUrl} alt={t(interaction.description)} className="w-full" tabIndex={0} />
      </figure>
    </div>
  );
};

export default DroneBoats;
