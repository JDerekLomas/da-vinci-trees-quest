import React, { useContext, useEffect, useState } from 'react';
import { InteractiveSlideShowState, Slide } from './interface';
import { useEventListener } from '../../../hooks/useEventListener';
import { GameContext } from '../../../contexts/GameContext';
import { useTranslations } from '../../../hooks/useTranslations';

import Image1 from '../assets/backgrounds/ancient_civilisation.webp';
import Image2 from '../assets/backgrounds/map1.webp';
import Image3 from '../assets/backgrounds/map2.webp';
import Image4 from '../assets/backgrounds/infinity_ship.webp';
import Image5 from '../assets/backgrounds/ship_cabin.webp';

const InteractiveSlideShow: React.FC = () => {
  const { t } = useTranslations();
  const slides: Slide[] = [
    {
      image: Image1,
      imageAlt: t('scenes.S3.S3_D0_FX_C0.imgDescription'),
    },
    {
      image: Image2,
      imageAlt: t('scenes.S3.S3_D0_FX_C0.imgDescription2'),
    },
    {
      image: Image3,
      imageAlt: t('scenes.S3.S3_D0_FX_C0.imgDescription3'),
    },
    {
      image: Image4,
      imageAlt: t('scenes.S3.S3_D0_FX_C0.imgDescription4'),
    },
    {
      image: Image5,
      imageAlt: t('scenes.S3.S3_D0_FX_C0.imgDescription5'),
    },
  ];
  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};
  const savedState =
    interactiveResponses?.interactive_slideshow && typeof interactiveResponses?.interactive_slideshow === 'object'
      ? (interactiveResponses?.interactive_slideshow as unknown as InteractiveSlideShowState)
      : undefined;
  const [currentSlide, setCurrentSlide] = useState(savedState?.currentSlide ?? 1);
  const { payload } = useEventListener('interactive-slideshow');

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
      interactive_slideshow: currentState,
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
