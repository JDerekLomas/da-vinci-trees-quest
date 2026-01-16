import React, { useContext, useEffect } from 'react';
import { useEventListener } from '../../../hooks/useEventListener';
import { GeodesicDomesProps, GeodesicDomesState } from '../interface';
import { useTranslations } from '../../../hooks/useTranslations';

import Dome1 from '../assets/images/geodesic_dome1.webp';
import Dome2 from '../assets/images/geodesic_dome2.webp';
import { GameContext } from '../../../contexts/GameContext';

const GeodesicDomes: React.FC<GeodesicDomesProps> = ({ interaction }) => {
  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};
  const savedState =
    interactiveResponses?.geodesic_domes && typeof interactiveResponses?.geodesic_domes === 'object'
      ? (interactiveResponses?.geodesic_domes as unknown as GeodesicDomesState)
      : undefined;
  const [currentStep, setCurrentStep] = React.useState(savedState?.currentStep ?? 1);
  const { payload } = useEventListener('geodesic-domes');
  const { translations } = interaction;
  const { t } = useTranslations();

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload && typeof payload.step === 'number') {
      setCurrentStep(payload.step);
    }
  }, [payload]);

  useEffect(() => {
    if (!setInteractiveResponses) return;

    const currentState: GeodesicDomesState = { currentStep };
    setInteractiveResponses((prev: any) => ({
      ...prev,
      geodesic_domes: currentState,
    }));
  }, [setInteractiveResponses, currentStep]);

  return (
    <div className="w-full flex flex-col gap-6">
      {currentStep === 1 && (
        <div className="rounded-lg overflow-hidden 2xl:w-4/5 2xl:mx-auto">
          <img src={Dome1} alt={t(translations.geodesicDome1Alt)} className="w-full h-auto object-cover" />
        </div>
      )}
      {currentStep === 2 && (
        <div className="rounded-lg overflow-hidden 2xl:w-4/5 2xl:mx-auto">
          <img src={Dome2} alt={t(translations.geodesicDome2Alt)} className="w-full h-auto object-cover" />
        </div>
      )}
    </div>
  );
};

export default GeodesicDomes;
