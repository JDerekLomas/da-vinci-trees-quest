import React from 'react';
import { ImageContainerConfig } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';

const ImageContainer: React.FC<{ interaction: ImageContainerConfig }> = ({ interaction }) => {
  const { t } = useTranslations();

  return (
    <figure className="w-full lg:w-[75%] mx-auto flex justify-center items-center">
      <img src={interaction.imageUrl} alt={t(interaction.imgDescription)} tabIndex={0} />
    </figure>
  );
};

export default ImageContainer;
