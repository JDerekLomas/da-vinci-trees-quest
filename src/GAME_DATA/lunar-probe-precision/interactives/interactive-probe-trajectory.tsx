import React from 'react';
import { ProbeTrajectoryInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';

const InteractiveInputBox: React.FC<{ interaction: ProbeTrajectoryInteraction }> = ({ interaction }) => {
  const { t } = useTranslations();
  return (
    <>
      <img
        className="w-[105%] mt-[-10px] m-auto"
        role="img"
        src={interaction.image}
        alt={t(interaction.alt)}
        aria-describedby="lunar-probe-description"
      />
      <div id="lunar-probe-description" hidden>
        {t(interaction.longDescription)}
      </div>
    </>
  );
};

export default InteractiveInputBox;
