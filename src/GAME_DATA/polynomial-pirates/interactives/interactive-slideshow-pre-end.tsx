import React, { useContext, useEffect, useState } from 'react';
import { InteractiveSlideShowState, Slide } from './interface';
import { useEventListener } from '../../../hooks/useEventListener';
import { GameContext } from '../../../contexts/GameContext';
import { useTranslations } from '../../../hooks/useTranslations';

import Image1 from '../assets/backgrounds/submarine.webp';
import Image2 from '../assets/backgrounds/sank_ship.webp';
import Image3 from '../assets/backgrounds/treasure.webp';

const InteractiveSlideShow: React.FC = () => {
  const { t } = useTranslations();
  const slides: Slide[] = [
    {
      image: Image1,
      imageAlt: t('scenes.S10.S10_D0_FX_C0.imgDescription'),
    },
    {
      image: Image2,
      imageAlt: t('scenes.S10.S10_D0_FX_C0.imgDescription2'),
    },
    {
      image: Image3,
      imageAlt: t('scenes.S10.S10_D0_FX_C0.imgDescription3'),
    },
  ];
  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};
  const savedState =
    interactiveResponses?.interactive_slideshow_pre_end &&
    typeof interactiveResponses?.interactive_slideshow_pre_end === 'object'
      ? (interactiveResponses?.interactive_slideshow_pre_end as unknown as InteractiveSlideShowState)
      : undefined;
  const [currentSlide, setCurrentSlide] = useState(savedState?.currentSlide ?? 1);
  const { payload } = useEventListener('interactive-slideshow-pre-end');

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'slide' in payload && typeof payload.slide === 'number') {
      setCurrentSlide(payload.slide);
    }
  }, [payload]);

  useEffect(() => {
    if (!setInteractiveResponses) return;

    const currentState: InteractiveSlideShowState = { currentSlide };
    setInteractiveResponses((prev: any) => ({
      ...prev,
      interactive_slideshow_pre_end: currentState,
    }));
  }, [setInteractiveResponses, currentSlide]);

  return (
    <div className="w-full">
      <img
        src={slides[currentSlide - 1].image}
        alt={slides[currentSlide - 1].imageAlt}
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default InteractiveSlideShow;
