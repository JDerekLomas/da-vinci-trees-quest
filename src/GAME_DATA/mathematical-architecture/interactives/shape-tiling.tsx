import React from 'react';
import { ShapeTilingProps } from '../interface';
import { useTranslations } from '../../../hooks/useTranslations';

const ShapeTiling: React.FC<ShapeTilingProps> = ({ interaction }) => {
  const { translations } = interaction;
  const { t } = useTranslations();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="rounded-lg overflow-hidden 2xl:w-4/5 2xl:mx-auto">
        <img
          src={t(translations.tessellationImg)}
          alt={t(translations.tessellationImgAlt)}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default ShapeTiling;
