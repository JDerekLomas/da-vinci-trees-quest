/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { ArithmeticOperationsConfig, Point } from './interface';
import useScreenSize from '../../../hooks/useScreenSize';
import { ComplexPlane } from './ComplexPlane';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';
import { GameContext } from '../../../contexts/GameContext';

interface ArithmeticOperationsState {
  currentIndex: number;
}

const ArithmeticOperations: React.FC<{ interaction: ArithmeticOperationsConfig }> = ({ interaction }) => {
  const points: Point[] = [
      {
        realPart: 1.5,
        imaginaryPart: 1,
      },
      {
        realPart: 1.25,
        imaginaryPart: 3,
        color: '#2563eb',
      },
    ],
    { isZoomed200, isVerticalScreen } = useScreenSize(),
    { t } = useTranslations(),
    gameContext = useContext(GameContext),
    { interactiveResponses, setInteractiveResponses } = gameContext || {},
    savedState =
      interactiveResponses?.arithmetic_operations &&
      typeof interactiveResponses?.arithmetic_operations === 'object'
        ? (interactiveResponses?.arithmetic_operations as unknown as ArithmeticOperationsState)
        : undefined,
    [currentIndex, setCurrentIndex] = useState(savedState?.currentIndex ?? 0),
    { payload } = useEventListener('arithmetic-operations');

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      setCurrentIndex(payload.step as number);
    }
  }, [payload]);

  useEffect(() => {
    if (!setInteractiveResponses) return;

    const currentState: ArithmeticOperationsState = { currentIndex };
    setInteractiveResponses((prev: any) => ({
      ...prev,
      arithmetic_operations: currentState,
    }));
  }, [currentIndex, setInteractiveResponses]);

  return (
    <div className="w-full bg-white">
      <h3 className="text-center text-xl font-semibold">{t('scenes.common.complex_plane')}</h3>
      <div
        className={`text-center mb-4 flex ${currentIndex === 0 ? 'justify-center items-center gap-x-1' : 'flex-col items-center'}`}
      >
        <p>
          {t('scenes.common.complex_number')}
          {currentIndex === 0 ? '' : 's'}:
        </p>
        <p>
          <span className="font-besley font-bold text-[#DB0072]">1.5</span> +{' '}
          <span className="font-besley font-bold text-[#0061FC]">1</span>
          <span className="font-besley font-bold italic text-[#008217]">i</span>{' '}
          {currentIndex === 1 && (
            <span>
              ({t('scenes.S8.S8_X.S8_D0_FX_C9.distance_from_origin')}{' '}
              <strong className="text-red-600">1.80 {t('scenes.S8.S8_X.S8_D0_FX_C9.units')}</strong>)
            </span>
          )}
        </p>
        {currentIndex === 1 && (
          <p>
            <span className="font-besley font-bold text-[#DB0072]">1.25</span> +{' '}
            <span className="font-besley font-bold text-[#0061FC]">3</span>
            <span className="font-besley font-bold italic text-[#008217]">i</span>{' '}
            <span>
              ({t('scenes.S8.S8_X.S8_D0_FX_C9.distance_from_origin')}{' '}
              <strong className="text-[#2563eb]">3.25 {t('scenes.S8.S8_X.S8_D0_FX_C9.units')}</strong>)
            </span>
          </p>
        )}
      </div>
      <ComplexPlane
        gridSize={isZoomed200 || isVerticalScreen ? 200 : 400}
        points={currentIndex === 1 ? points : points.slice(0, 1)}
        min={interaction.complexPlaneConfig.min}
        max={interaction.complexPlaneConfig.max}
        step={interaction.complexPlaneConfig.step}
        dimension={interaction.complexPlaneConfig.dimension}
        showDistanceFromOrigin={currentIndex === 1}
      />
    </div>
  );
};

export default ArithmeticOperations;
