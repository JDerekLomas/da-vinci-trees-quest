import React, { useState, useEffect, useCallback } from 'react';
import { AbsoluteValueConverterInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import useScreenSize from '../../../hooks/useScreenSize';
import '../../../shared/slider.css';

const AbsoluteValueConverter: React.FC<{
  interaction: AbsoluteValueConverterInteraction;
}> = ({ interaction }) => {
  const { t } = useTranslations();
  const { deviation, middlePoint, lowerBoundInput, upperBoundInput, absoluteValueLabel, rangeVisualizationLabel } =
    interaction;
  const { isVerticalScreen } = useScreenSize();
  const [lowerBound, setLowerBound] = useState<number>(lowerBoundInput.defaultValue);
  const [upperBound, setUpperBound] = useState<number>(upperBoundInput.defaultValue);
  const [numberLineRange, setNumberLineRange] = useState({
    start: lowerBound - 5,
    end: upperBound + 5,
  });
  const [calculations, setCalculations] = useState<{
    middle: number;
    deviation: number;
  }>({
    middle: 0,
    deviation: 0,
  });

  const handleLowerBoundChange = (value: string): void => {
    const newValue = Number(value);
    if (!isNaN(newValue)) {
      if (newValue >= upperBound) {
        setLowerBound(upperBound);
        setUpperBound(upperBound + 1);
      } else {
        setLowerBound(newValue);
      }
    }
  };

  const handleUpperBoundChange = (value: string): void => {
    const newValue = Number(value);
    if (!isNaN(newValue)) {
      if (newValue <= lowerBound) {
        if (lowerBound !== 0) {
          setUpperBound(lowerBound);
          setLowerBound(lowerBound - 1);
        }
      } else {
        setUpperBound(newValue);
      }
    }
  };

  const generateTicks = (): number[] => {
    const ticks: number[] = [];
    const totalRange = numberLineRange.end - numberLineRange.start;
    const totalTicks = isVerticalScreen ? 10 : 20;
    const step = Math.max(1, Math.ceil(totalRange / totalTicks));
    for (let i = numberLineRange.start; i <= numberLineRange.end; i += step) {
      ticks.push(i);
    }
    return ticks;
  };

  const getPositionPercentage = (value: number): number => {
    const totalRange = numberLineRange.end - numberLineRange.start;
    return ((value - numberLineRange.start) / totalRange) * 100;
  };

  useEffect(() => {
    const middle = (lowerBound + upperBound) / 2;
    const deviation = (upperBound - lowerBound) / 2;
    setCalculations({ middle, deviation });

    const padding = Math.max(5, Math.ceil((upperBound - lowerBound) * 0.2));
    const lowestNeeded = Math.floor((lowerBound - padding) / 5) * 5;
    const highestNeeded = Math.ceil((upperBound + padding) / 5) * 5;
    setNumberLineRange({ start: lowestNeeded, end: highestNeeded });
  }, [lowerBound, upperBound]);

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    const lowerTimeSlider = document.getElementById(`slider-${lowerBoundInput.id}`) as HTMLInputElement;
    if (lowerTimeSlider) {
      updateSliderBackground(lowerTimeSlider);
    }
    const upperTimeSlider = document.getElementById(`slider-${upperBoundInput.id}`) as HTMLInputElement;
    if (upperTimeSlider) {
      updateSliderBackground(upperTimeSlider);
    }
  }, [lowerBound, upperBound, updateSliderBackground]);

  return (
    <div className="w-full space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="text-lg font-medium flex flex-col">
          <div className="text-base font-semibold" aria-live="off">
            <label htmlFor={`slider-${lowerBoundInput.id}`}>{t(lowerBoundInput.label)}</label>: {lowerBound}
          </div>
          <div className="w-full mt-4">
            <div className="mr-4">
              <input
                id={`slider-${lowerBoundInput.id}`}
                type="range"
                value={lowerBound ?? 0}
                onChange={(e) => handleLowerBoundChange(e.target.value)}
                step={lowerBoundInput.step}
                min={lowerBoundInput.min}
                max={lowerBoundInput.max}
                className="global-slider w-full"
                aria-valuetext={`${t(lowerBoundInput.label)}: ${lowerBound}`}
              />
            </div>
          </div>
        </div>
        <div className="text-lg font-medium flex flex-col">
          <div className="text-base font-semibold" aria-live="off">
            <label htmlFor={`slider-${upperBoundInput.id}`}>{t(upperBoundInput.label)}</label>: {upperBound}
          </div>
          <div className="w-full mt-4">
            <div className="mr-4">
              <input
                id={`slider-${upperBoundInput.id}`}
                type="range"
                value={upperBound ?? 0}
                onChange={(e) => handleUpperBoundChange(e.target.value)}
                step={upperBoundInput.step}
                min={upperBoundInput.min}
                max={upperBoundInput.max}
                className="global-slider w-full"
                aria-valuetext={`${t(upperBoundInput.label)}: ${upperBound}`}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#E0002B]">{t(rangeVisualizationLabel)}</h2>
          <div className="font-besley font-bold text-center text-lg text-[#E0002B]">
            {lowerBound} {'<'} <span className="italic">t</span> {'<'} {upperBound}
          </div>
        </div>
        <div className="px-5" aria-live="off">
          <div className="relative h-16">
            <div
              className="absolute h-1 bg-[#E0002B]"
              style={{
                left: `${getPositionPercentage(lowerBound)}%`,
                width: `${getPositionPercentage(upperBound) - getPositionPercentage(lowerBound)}%`,
                top: '18px',
              }}
            />
            <div
              className="absolute w-4 h-4 border-4 border-[#E0002B] bg-white rounded-full"
              style={{
                left: `${getPositionPercentage(lowerBound)}%`,
                top: '12px',
                transform: 'translateX(-50%)',
              }}
              role="img"
              aria-label={`Lower Bound: ${lowerBound}`}
            />
            <div
              className="absolute w-4 h-4 border-4 border-[#E0002B] bg-white rounded-full"
              style={{
                left: `${getPositionPercentage(upperBound)}%`,
                top: '12px',
                transform: 'translateX(-50%)',
              }}
              role="img"
              aria-label={`Upper Bound: ${upperBound}`}
            />
            <div className="absolute w-full bottom-0 h-8">
              <div className="absolute w-full h-0.5 bg-black" />
              <div className="absolute w-5 h-0.5 bg-black -left-4" />
              <div
                className="absolute w-0 h-0 -left-8"
                style={{
                  top: -4,
                  left: -20,
                  borderTop: '5px solid transparent',
                  borderBottom: '5px solid transparent',
                  borderRight: '5px solid black',
                }}
              />
              <div className="absolute w-5 h-0.5 bg-black -right-4" />
              <div
                className="absolute w-0 h-0 -right-8"
                style={{
                  top: -4,
                  right: -20,
                  borderTop: '5px solid transparent',
                  borderBottom: '5px solid transparent',
                  borderLeft: '5px solid black',
                }}
              />
              <div className="absolute w-full h-full">
                {generateTicks().map((tick) => (
                  <div
                    key={tick}
                    className="absolute flex items-center flex-col"
                    style={{
                      left: `${getPositionPercentage(tick)}%`,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <div className="h-2 border-l-2 border-black" />
                    <div className="text-m text-center">{tick}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-center mb-4">{t(absoluteValueLabel)}</h2>
        <div className="font-besley text-4xl font-bold text-center">
          |<span className="italic text-[#E0002B]">t</span> −{' '}
          <span className="text-[#DB0072]">{calculations.middle.toFixed(2)}</span>| {'<'}{' '}
          <span className="text-[#8E24AA]">{calculations.deviation.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold mb-4">{t(middlePoint.heading)}</h3>
          <div className="space-y-2 font-besley">
            <div>{t(middlePoint.formula)}</div>
            <div>
              = ({lowerBound} + {upperBound}) ÷ 2
            </div>
          </div>
          <div className="text-2xl font-bold mt-4 text-[#005F20]">
            {t(middlePoint.label)} = {calculations.middle.toFixed(2)}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">{t(deviation.heading)}</h3>
          <div className="space-y-2 font-besley">
            <div>{t(deviation.formula)}</div>
            <div>
              = ({upperBound} − {lowerBound}) ÷ 2
            </div>
          </div>
          <div className="text-2xl font-bold mt-4 text-[#5A3714]">
            {t(deviation.label)} = {calculations.deviation.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbsoluteValueConverter;
