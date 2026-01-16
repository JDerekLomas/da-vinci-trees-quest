import { useState, useEffect, useRef } from 'react';
import { Positions } from './interface';
import { useEventListener } from '../../../hooks/useEventListener';
import { useTranslations } from '../../../hooks/useTranslations';
import { useGameContext } from '../../../hooks/useGameContext';
import opticalIllusionsLibraryConfig from '../configs/optical-illusions-library-config';

interface InteractiveIllusionsGalleryProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const CafeWallIllusion: React.FC<InteractiveIllusionsGalleryProps> = ({ onInteraction }) => {
  const [showGridLines, setShowGridLines] = useState(false);

  const { t } = useTranslations();

  useEffect(() => {
    if (showGridLines) {
      onInteraction({
        'show-grid-lines': true,
      });
    }
  });

  return (
    <div className="w-full flex flex-col items-center">
      <div
        className={`relative w-full max-w-lg h-64 mb-8 overflow-visible`}
        role="figure"
        aria-label={t('scenes.S4.S4_D0_F21_C9.ariaLabels.cafe_wall_illusion')}
      >
        <div className="absolute inset-0 overflow-hidden">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => (
            <div key={row} className="flex w-full" style={{ height: '12.5%' }}>
              {Array.from({ length: 16 }).map((_, i) => {
                const isOffset = row % 2 === 1;
                const shouldBeFilled = isOffset ? i % 2 === 0 : i % 2 === 1;

                return (
                  <div
                    key={i}
                    className={`h-full transition-colors duration-300 ${shouldBeFilled ? 'bg-black' : 'bg-white'}`}
                    style={{
                      width: '6.25%',
                      marginLeft: isOffset && i === 0 ? '3.125%' : '0',
                      marginRight: isOffset && i === 15 ? '3.125%' : '0',
                    }}
                  />
                );
              })}
            </div>
          ))}

          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="absolute w-full h-1 bg-[#757575]" style={{ top: `${i * 12.5}%` }} />
          ))}
        </div>

        {showGridLines && (
          <div className="absolute inset-0 animate-fadeIn overflow-visible">
            {Array.from({ length: 17 }).map((_, i) => (
              <div key={i} className="absolute h-full w-0.5" style={{ left: `${i * 6.25}%` }} />
            ))}

            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="absolute h-0.5 bg-[#EB0000] z-10"
                style={{
                  top: `${i * 12.5}%`,
                  left: '-5%',
                  width: '110%',
                }}
              />
            ))}

            <div
              className="absolute h-0.5 bg-[#238B21] z-20 animate-pulse"
              style={{
                top: '25%',
                left: '-5%',
                width: '110%',
              }}
            />
            <div
              className="absolute h-0.5 bg-[#238B21] z-20 animate-pulse"
              style={{
                top: '75%',
                left: '-5%',
                width: '110%',
              }}
            />

            <div
              className="absolute right-2 top-2 bg-white px-2 py-1 rounded shadow-md text-xs"
              style={{
                zIndex: 50,
              }}
            >
              <div className="flex items-center text-[#000000]">
                <div className="w-3 h-0.5 bg-[#EB0000] mr-1"></div>
                <span>{t('scenes.S4.S4_D0_F21_C9.mortar')}</span>
              </div>
              <div className="flex items-center mt-1 text-[#000000]">
                <div className="w-3 h-0.5 bg-[#238B21] mr-1"></div>
                <span>{t('scenes.S4.S4_D0_F21_C9.reference')}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setShowGridLines(!showGridLines)}
          className="px-4 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2lg:px-4 lg:py-2 bg-[#006BE0] hover:bg-blue-600 text-white"
        >
          {showGridLines
            ? t('scenes.S4.S4_D0_F21_C9.hide_grid_lines')
            : t('scenes.S4.S4_D0_F21_C9.show_grid_lines')}
        </button>
      </div>
    </div>
  );
};

const HermanGridIllusion = () => {
  const [showExplanation, setShowExplanation] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [positions, setPositions] = useState<Positions[]>([]);

  const { t } = useTranslations();

  const BASE_CONTAINER_WIDTH = opticalIllusionsLibraryConfig.baseContainerWidth;
  const BASE_CONTAINER_HEIGHT = opticalIllusionsLibraryConfig.baseContainerHeight;
  const BASE_VALUES = {
    firstX: opticalIllusionsLibraryConfig.firstX,
    firstY: opticalIllusionsLibraryConfig.firstY,
    colInterval: opticalIllusionsLibraryConfig.colInterval,
    rowInterval: opticalIllusionsLibraryConfig.rowInterval,
  };

  useEffect(() => {
    const calculatePositions = () => {
      if (!containerRef.current) return;

      const { width, height } = containerRef.current.getBoundingClientRect();

      const widthRatio = width / (BASE_CONTAINER_WIDTH - 45);
      const heightRatio = height / (BASE_CONTAINER_HEIGHT - 15);

      const dynamicColInterval = BASE_VALUES.colInterval * widthRatio;
      const dynamicRowInterval = BASE_VALUES.rowInterval * heightRatio;

      const dynamicFirstX = BASE_VALUES.firstX * widthRatio;
      const dynamicFirstY = BASE_VALUES.firstY * heightRatio;

      const newPositions = [];
      for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 7; col++) {
          newPositions.push({
            x: dynamicFirstX + col * dynamicColInterval,
            y: dynamicFirstY + row * dynamicRowInterval,
          });
        }
      }
      setPositions(newPositions);
    };

    calculatePositions();
    window.addEventListener('resize', calculatePositions);
    return () => window.removeEventListener('resize', calculatePositions);
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div
        ref={containerRef}
        className="relative w-full max-w-lg h-64 mb-8 bg-white p-2 overflow-hidden"
        role="figure"
        aria-label={t('scenes.S4.S4_D0_F21_C9.ariaLabels.hermann_grid_illusion')}
      >
        <div className="w-full h-full grid grid-cols-8 grid-rows-8 gap-2 bg-white">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="bg-black" />
          ))}
        </div>

        {showExplanation && (
          <div className="absolute inset-0 pointer-events-none">
            {positions.map((pos: { x: number; y: number }, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 border-2 border-[#A22DDC] rounded-full"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
                }}
              />
            ))}

            <div className="absolute right-8 top-16 bg-white border-2 border-[#006BE0] rounded-full w-24 h-24 shadow-lg flex items-center justify-center z-30">
              <div className="w-16 h-16 bg-black relative">
                <div className="absolute top-0 bottom-0 left-7 w-2 bg-white"></div>
                <div className="absolute left-0 right-0 top-7 h-2 bg-white"></div>
                <div className="absolute left-7 top-7 w-2 h-2 bg-white"></div>
                <div className="absolute left-6 top-6 w-4 h-4 rounded-full border-2 border-[#A22DDC]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => setShowExplanation(!showExplanation)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        {showExplanation
          ? t('scenes.S4.S4_D0_F21_C9.hide_explanation')
          : t('scenes.S4.S4_D0_F21_C9.show_explanation')}
      </button>
    </div>
  );
};

const InteractiveIllusionsGallery: React.FC<InteractiveIllusionsGalleryProps> = ({ onInteraction }) => {
  const { dialogIndex } = useGameContext();
  const isFirstIndex = dialogIndex === 1;

  const [currentIllusion, setCurrentIllusion] = useState(isFirstIndex ? 0 : 1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('');

  const { t } = useTranslations();

  const illusions = [
    {
      id: 'cafe-wall',
      title: t('scenes.S4.S4_D0_F21_C9.cafe_wall_illusion'),
      subtitle: t('scenes.S4.S4_D0_F21_C9.cafe_wall_illusion_subtitle'),
      component: CafeWallIllusion,
    },
    {
      id: 'herman-grid',
      title: t('scenes.S4.S4_D0_F21_C9.hermann_grid_illusions'),
      subtitle: t('scenes.S4.S4_D0_F21_C9.hermann_grid_illusions_subtitle'),
      component: HermanGridIllusion,
    },
  ];

  const { payload } = useEventListener('optical-illusions-library');

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'illusion' in payload && payload.illusion !== currentIllusion) {
      moveToNewIllusion(payload.illusion as number);
    }
  }, [payload]);

  const moveToNewIllusion = (newIllusion: number) => {
    if (newIllusion > currentIllusion) {
      nextIllusion();
    }
    if (newIllusion < currentIllusion) {
      prevIllusion();
    }
  };

  const nextIllusion = () => {
    if (currentIllusion < illusions.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setDirection('left');
      setTimeout(() => {
        setCurrentIllusion(currentIllusion + 1);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const prevIllusion = () => {
    if (currentIllusion > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setDirection('right');
      setTimeout(() => {
        setCurrentIllusion(currentIllusion - 1);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const illusion = illusions[currentIllusion];
  const IllusionComponent = illusion.component;

  return (
    <div className="flex flex-col text-white overflow-hidden">
      <div className="fixed overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-20 animate-float"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative bg-white text-[#757575] overflow-hidden max-w-4xl w-full">
        <div
          className={`transition-all duration-500 ease-in-out ${isTransitioning ? (direction === 'left' ? 'opacity-0 -translate-x-10' : 'opacity-0 translate-x-10') : 'opacity-100'}`}
        >
          <div className="px-8 pb-4">
            <p className="text-2xl font-bold text-[#000000] mb-2 text-center">{illusion.title}</p>
            {illusion.subtitle && (
              <p className="text-lg text-[#000000] mb-4 text-center italic">{illusion.subtitle}</p>
            )}
          </div>

          <div className="flex justify-center items-center px-8 py-6">
            <IllusionComponent onInteraction={onInteraction} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveIllusionsGallery;
