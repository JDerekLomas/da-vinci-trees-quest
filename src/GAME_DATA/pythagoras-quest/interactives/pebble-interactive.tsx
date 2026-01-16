import React, { useState, useEffect, useCallback } from 'react';
import { PebbleInteractiveConfig } from '../configs/pebble-interactive';
import { useTranslations } from '../../../hooks/useTranslations';
import { useGameContext } from '../../../hooks/useGameContext';
import { useEventListener } from '../../../hooks/useEventListener';
import '../../../shared/slider.css';

interface DisplayFlags {
  showSlider?: boolean;
}

interface Payload {
  step: number;
  target: string;
  disabled?: string;
  displayFlags?: DisplayFlags;
}

const PebbleInteractive: React.FC<{ interaction: PebbleInteractiveConfig }> = ({ interaction }) => {
  const { t } = useTranslations();
  const { dialogIndex } = useGameContext();
  const { payload } = useEventListener('pebble-interactive') as { payload: Payload };

  const { totalSteps, translations } = interaction;
  const { tStage1, tStage2, tCommon, tAccessibility } = translations;

  const [currentStep, setCurrentStep] = useState(dialogIndex === 1 ? 1 : totalSteps);
  const [step1Count, setStep1Count] = useState(8);
  const [step2Count, setStep2Count] = useState(16);

  const currentCount = currentStep === 1 ? step1Count : step2Count;
  const setCurrentCount = currentStep === 1 ? setStep1Count : setStep2Count;

  // Helper functions for accessibility
  const tInterpolate = (key: string, variables: Record<string, string | number> = {}) => {
    let translatedString = t(key);
    Object.entries(variables).forEach(([variable, value]) => {
      const placeholder = `{{${variable}}}`;
      translatedString = translatedString.replace(new RegExp(placeholder, 'g'), String(value));
    });
    return translatedString;
  };

  const getDisplayFlag = (payload: Payload | null, flagName: keyof DisplayFlags): boolean => {
    if (!payload) {
      return true;
    }
    const flag = payload.displayFlags?.[flagName];
    if (flag === false) {
      return false;
    }
    return true;
  };

  // Update current step based on payload
  useEffect(() => {
    if (payload && payload?.step && payload.step !== currentStep) {
      setCurrentStep(payload.step);
    }
  }, [payload, currentStep, totalSteps]);

  const Pebble = ({ isLeftover = false, delay = 0 }) => (
    <div
      className={`w-6 h-6 rounded-full transition-all duration-150 ${isLeftover ? 'bg-[#006BE2]' : 'bg-[#949494]'}`}
      style={{
        animationDelay: `${delay}ms`,
        animation: 'fadeIn 0.15s ease-in-out forwards',
      }}
      role="img"
      aria-label={isLeftover ? t(tAccessibility.leftoverPebble) : t(tAccessibility.pebble)}
    />
  );

  const EvenOddVisualization = ({ count }: { count: number }) => {
    const isEven = count % 2 === 0;
    const isPerfectSquare = Math.sqrt(count) % 1 === 0;
    const squareSide = Math.floor(Math.sqrt(count));
    const pebbles = [];

    for (let i = 0; i < count; i++) {
      pebbles.push(<Pebble key={i} delay={i * 10} isLeftover={true} />);
    }

    return (
      <div className="flex flex-col items-center gap-6" role="region" aria-labelledby="even-odd-visualization">
        <h3 id="even-odd-visualization" className="sr-only">
          {t(tAccessibility.evenOddVisualization)}
        </h3>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-4xl">
          {/* Original Rectangle Arrangement */}
          <div className="flex flex-col items-center gap-4 flex-1" role="region" aria-labelledby="rectangle-section">
            <div
              className="grid gap-1.5 justify-center"
              style={{
                gridTemplateRows: 'repeat(2, auto)',
                gridAutoFlow: 'column',
              }}
              role="group"
              aria-label={tInterpolate(tAccessibility.pebbleGrid, { count })}
            >
              {pebbles}
            </div>
            <div className={`text-lg ${isEven ? 'text-green-600' : 'text-red-600'}`} role="status" aria-live="polite">
              {isEven ? t(tStage1.evenOdd.even) : t(tStage1.evenOdd.odd)}
            </div>
          </div>

          {/* Square Arrangement (only show if perfect square) */}
          {isPerfectSquare && (
            <div className="flex flex-col items-center gap-4 flex-1" role="region" aria-labelledby="square-section">
              <div
                className="grid gap-1.5 justify-center"
                style={{
                  gridTemplateColumns: `repeat(${squareSide}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${squareSide}, minmax(0, 1fr))`,
                }}
                role="group"
                aria-label={tInterpolate(tAccessibility.squareSection, { count })}
              >
                {pebbles}
              </div>
              <div className="text-lg text-blue-600" role="status" aria-live="polite">
                {tInterpolate(tStage2.shapes.perfectSquare, { side: squareSide })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ShapeVisualization = ({ count }: { count: number }) => {
    const isTriangular = (Math.sqrt(8 * count + 1) - 1) % 2 === 0;
    const isSquare = Math.sqrt(count) % 1 === 0;
    const squareSide = Math.floor(Math.sqrt(count));

    // Triangle calculation
    const trianglePebbles = [];
    let pebblesPlaced = 0;
    let rowNum = 1;

    while (pebblesPlaced < count) {
      const pebblesInRow = Math.min(rowNum, count - pebblesPlaced);
      const triangleRow = [];

      for (let i = 0; i < pebblesInRow; i++) {
        triangleRow.push(<Pebble key={`tri-${pebblesPlaced + i}`} isLeftover={isTriangular} />);
      }

      trianglePebbles.push(
        <div key={`row-${rowNum}`} className="flex gap-1.5 justify-center">
          {triangleRow}
        </div>,
      );

      pebblesPlaced += pebblesInRow;
      rowNum++;
    }

    // Square calculation
    const squarePebbles = [];
    for (let i = 0; i < count; i++) {
      squarePebbles.push(<Pebble key={`sq-${i}`} isLeftover={isSquare} />);
    }

    return (
      <div
        className="flex flex-col lg:flex-row items-start justify-center gap-8 w-full max-w-4xl"
        role="region"
        aria-labelledby="shape-visualization"
      >
        <h3 id="shape-visualization" className="sr-only">
          {t(tAccessibility.shapeVisualization)}
        </h3>

        {/* Triangle Section */}
        <div className="flex flex-col items-center gap-4 flex-1" role="region" aria-labelledby="triangle-section">
          <h4 id="triangle-section" className="text-xl font-semibold text-gray-700">
            {t(tStage2.shapes.triangle)}
          </h4>
          <div
            className="flex flex-col items-center gap-1.5 min-h-[200px] justify-center"
            role="group"
            aria-label={tInterpolate(tAccessibility.triangleSection, { count })}
          >
            {trianglePebbles}
          </div>
          <div
            className={`text-lg ${isTriangular ? 'text-green-600' : 'text-red-600'}`}
            role="status"
            aria-live="polite"
          >
            {isTriangular ? t(tStage2.shapes.perfectTriangle) : t(tStage2.shapes.notTriangle)}
          </div>
        </div>

        {/* Square Section */}
        <div className="flex flex-col items-center gap-4 flex-1" role="region" aria-labelledby="square-section">
          <h4 id="square-section" className="text-xl font-semibold text-gray-700">
            {t(tStage2.shapes.square)}
          </h4>
          <div className="w-full flex flex-col items-center justify-between">
            <div className="min-h-[200px] flex justify-center items-center">
              <div
                className="grid gap-1.5 w-fit"
                role="group"
                aria-label={tInterpolate(tAccessibility.squareSection, { count })}
                style={{
                  gridTemplateColumns: `repeat(${squareSide}, minmax(0, 1fr))`,
                  justifyItems: 'center',
                }}
              >
                {squarePebbles}
              </div>
            </div>
            <div
              className={`text-lg mt-4 ${isSquare ? 'text-green-600' : 'text-red-500'}`}
              role="status"
              aria-live="polite"
            >
              {isSquare ? t(tStage2.shapes.perfectSquare) : t(tStage2.shapes.notSquare)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  const handleCountChange = (newCount: number) => {
    setCurrentCount(newCount);
  };

  useEffect(() => {
    const pebbleSlider = document.getElementById('pebble-slider') as HTMLInputElement;
    if (pebbleSlider) {
      updateSliderBackground(pebbleSlider);
    }
  }, [currentCount, updateSliderBackground]);

  return (
    <div className="w-full max-w-screen-md mx-auto">
      {/* Instructions */}
      <div className="text-center mb-4">
        <p className="text-gray-600 text-lg">
          {currentStep === 1 ? t(tStage1.description) : t(tStage2.description)}
        </p>
      </div>
      <div className="w-full border-2 rounded-lg border-[#006BE2] p-6 mb-8">
        <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
        {/* Controls */}
        {getDisplayFlag(payload, 'showSlider') && (
          <section aria-labelledby="controls-heading" className="mb-4">
            <h2 id="controls-heading" className="sr-only">
              {t(tAccessibility.controlsSection)}
            </h2>
            <div className="w-full flex gap-4 flex-col justify-center lg:flex-row">
              <div className="w-full slider-first">
                <label className="block text-lg font-bold">
                  {t(tCommon.pebbles)} : <span className="text-slate-600 font-besley">{currentCount}</span>
                </label>
                <div className="relative">
                  <input
                    id="pebble-slider"
                    type="range"
                    min="1"
                    max={currentStep === 1 ? '25' : '30'}
                    value={currentCount}
                    onChange={(e) => handleCountChange(parseInt(e.target.value))}
                    className="global-slider w-full"
                    aria-label={tInterpolate(tAccessibility.pebbleSlider, { count: currentCount })}
                    aria-describedby="pebble-count"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Visualization Area */}
        <section
          aria-labelledby="visualization-heading"
          className="p-8 mb-6 min-h-[300px] flex items-center justify-center"
        >
          <h2 id="visualization-heading" className="sr-only">
            {t(tAccessibility.visualizationSection)}
          </h2>
          {currentStep === 1 ? (
            <EvenOddVisualization count={currentCount} />
          ) : (
            <ShapeVisualization count={currentCount} />
          )}
        </section>
      </div>
    </div>
  );
};

export default PebbleInteractive;
