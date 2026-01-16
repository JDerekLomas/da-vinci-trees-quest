import React from 'react';
import { TheADSREnvelop } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';

const InteractiveInputBox: React.FC<{ interaction: TheADSREnvelop }> = ({ interaction }) => {
  const { t } = useTranslations();
  return (
    <>
      <div id="the-adsr-description" className="sr-only">
        {t(interaction.longDescription)}
      </div>
      <img
        className="w-full m-auto"
        role="img"
        src={t(interaction.image)}
        alt={t(interaction.alt)}
        aria-describedby="the-adsr-description"
      />
    </>
  );
};

export default InteractiveInputBox;
