/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTranslations } from '../../../hooks/useTranslations';

const DigitalSoundSynthesizer: React.FC<{ interaction: any }> = ({ interaction }) => {
  const { t } = useTranslations();

  return (
    <div className="flex flex-col items-center">
      <img
        src={interaction.imageUrl}
        alt={t(interaction.alt)}
        aria-describedby="digital-sound-synthesizer-description"
        className="rounded-lg xl:w-[90%]"
      />
      <p className="text-center text-gray-700 mt-4 px-4" id="digital-sound-synthesizer-description">
        {t(interaction.description)}
      </p>
    </div>
  );
};

export default DigitalSoundSynthesizer;
