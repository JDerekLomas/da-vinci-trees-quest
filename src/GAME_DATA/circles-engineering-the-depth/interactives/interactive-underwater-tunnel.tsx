import React from 'react';
import { UnderWaterTunnelInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';

const InteractiveInputBox: React.FC<{ interaction: UnderWaterTunnelInteraction }> = ({ interaction }) => {
  const { t } = useTranslations();
  return (
    <>
      <img
        className="w-full m-auto"
        role="img"
        src={interaction.image}
        alt={t(interaction.alt)}
        aria-describedby="underwater-tunnel-description"
      />
      <div id="underwater-tunnel-description" hidden>
        {t(interaction.longDescription)}
      </div>
    </>
  );
};

export default InteractiveInputBox;