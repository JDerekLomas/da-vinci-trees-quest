import React, { useState, useEffect, useCallback } from 'react';
import { PerformanceRangeAnalyzerInteraction, Range } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import useScreenSize from '../../../hooks/useScreenSize';
import NumberLine from './number-line';
import '../../../shared/slider.css';

const PerformanceRangeAnalyzer: React.FC<{
  interaction: PerformanceRangeAnalyzerInteraction;
}> = ({ interaction }) => {
  const { t } = useTranslations();
  const { lowerTimeInput, upperTimeInput, improvementInput, currentTimeRange, targetTimeRange, goalTimeRange } =
    interaction;
  const { isVerticalScreen } = useScreenSize();

  const [numberLineRange, setNumberLineRange] = useState<{
    start: number;
    end: number;
  }>({
    start: lowerTimeInput.defaultValue - 5,
    end: upperTimeInput.defaultValue + 5,
  });
  const [improvement, setImprovement] = useState<number>(1);
  const [currentRange, setCurrentRange] = useState<Range>(currentTimeRange);
  const [targetRange, setTargetRange] = useState<Range>(targetTimeRange);
  const [goalRange, setGoalRange] = useState<Range>(goalTimeRange);

  const improvementOptions = [1, 2, 3, 4, 5];

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

  const handleCurrentRangeChange = (field: keyof Range, value: string): void => {
    const numValue = Number(value);
    setCurrentRange((prev) => {
      const newRange = { ...prev };

      if (field === 'lower') {
        newRange.lower = { ...newRange.lower, value: numValue };
        if (numValue >= newRange.upper.value) {
          newRange.upper = { ...newRange.upper, value: numValue + 1 };
        }
      } else if (field === 'upper') {
        newRange.upper = { ...newRange.upper, value: numValue };
        if (numValue <= newRange.lower.value) {
          if (numValue === 0) {
            return prev;
          }
          newRange.lower = { ...newRange.lower, value: numValue - 1 };
        }
      }
      return newRange;
    });
  };

  const handleImprovementChange = (value: string): void => {
    const numValue = Number(value);
    if (numValue >= 1 && numValue <= 5) {
      setImprovement(numValue);
    }
  };

  useEffect(() => {
    const lowestNeeded = Math.floor((currentRange.lower.value - 5) / 5) * 5;
    const highestNeeded = currentRange.upper.value + 5;
    setNumberLineRange({ start: lowestNeeded, end: highestNeeded });
  }, [currentRange]);

  useEffect(() => {
    setTargetRange((prev) => ({
      ...prev,
      lower: {
        ...prev.lower,
        value: currentRange.lower.value - improvement,
      },
      upper: {
        ...prev.upper,
        value: currentRange.upper.value - improvement,
      },
    }));
  }, [currentRange, improvement]);

  useEffect(() => {
    setGoalRange((prev) => {
      if (targetRange.upper.value < currentRange.lower.value) {
        return {
          ...prev,
          lower: { ...prev.lower, value: targetRange.lower.value },
          upper: { ...prev.upper, value: targetRange.upper.value },
        };
      } else {
        return {
          ...prev,
          lower: { ...prev.lower, value: targetRange.lower.value },
          upper: { ...prev.upper, value: currentRange.lower.value },
        };
      }
    });
  }, [currentRange, targetRange]);

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    const lowerTimeSlider = document.getElementById(`slider-${lowerTimeInput.id}`) as HTMLInputElement;
    if (lowerTimeSlider) {
      updateSliderBackground(lowerTimeSlider);
    }
    const upperTimeSlider = document.getElementById(`slider-${upperTimeInput.id}`) as HTMLInputElement;
    if (upperTimeSlider) {
      updateSliderBackground(upperTimeSlider);
    }
  }, [currentRange, updateSliderBackground, lowerTimeInput.id, upperTimeInput.id]);

  return (
    <div className="w-full space-y-14">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-6">
        <div className="text-lg font-medium flex flex-col">
          <div aria-live="off" className="text-base font-semibold">
            <label htmlFor={`slider-${lowerTimeInput.id}`}>{t(lowerTimeInput.label)}</label>:{' '}
            {currentRange.lower.value}
          </div>
          <div className="w-full mt-4">
            <div className="sliderContainer mr-4">
              <input
                id={`slider-${lowerTimeInput.id}`}
                type="range"
                value={currentRange.lower.value ?? 0}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= lowerTimeInput.min && value <= lowerTimeInput.max) {
                    handleCurrentRangeChange('lower', value.toString());
                  }
                }}
                step={lowerTimeInput.step}
                min={lowerTimeInput.min}
                max={lowerTimeInput.max}
                className="global-slider w-full"
                aria-valuetext={`${t(currentRange.lower.label)}: ${currentRange.lower.value}`}
              />
            </div>
          </div>
        </div>
        <div className="text-lg font-medium flex flex-col">
          <div aria-live="off" className="text-base font-semibold">
            <label htmlFor={`slider-${upperTimeInput.id}`}>{t(upperTimeInput.label)}</label>:{' '}
            {currentRange.upper.value}
          </div>
          <div className="w-full mt-4">
            <div className="sliderContainer mr-4">
              <input
                id={`slider-${upperTimeInput.id}`}
                type="range"
                value={currentRange.upper.value ?? 0}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= upperTimeInput.min && value <= upperTimeInput.max) {
                    handleCurrentRangeChange('upper', value.toString());
                  }
                }}
                step={upperTimeInput.step}
                min={upperTimeInput.min}
                max={upperTimeInput.max}
                className="global-slider w-full"
                aria-valuetext={`${t(currentRange.upper.label)}: ${currentRange.upper.value}`}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between space-y-2">
          <label className="text-base font-semibold" htmlFor={improvementInput.id}>
            {t(improvementInput.label)}
          </label>
          <select
            id={improvementInput.id}
            value={improvement}
            onChange={(e) => handleImprovementChange(e.target.value)}
            className="w-full mb-2 border border-[#333333] rounded-[0.125rem] px-4 py-[6px] text-2xl font-medium focus:outline-none focus:outline-blue-500 focus:outline-offset-2"
          >
            {improvementOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#E0002B]">{t(currentTimeRange.label)}</h2>
          <div className="font-besley font-bold text-center text-lg text-[#E0002B]">
            {currentRange.lower.value} {'≤'} <span className="italic">t</span> {'≤'} {currentRange.upper.value}
          </div>
        </div>
        <div className="px-5" aria-live="off">
          <NumberLine
            stroke="#E0002B"
            range={currentRange}
            generateTicks={generateTicks}
            getPositionPercentage={getPositionPercentage}
            filledDots={true}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#5A3714]">{t(targetTimeRange.label)}</h2>
          <div className="font-besley font-bold text-center text-lg text-[#5A3714]">
            {targetRange.lower.value} {'≤'} <span className="italic">t</span> {'≤'} {targetRange.upper.value}
          </div>
        </div>
        <div className="px-5">
          <NumberLine
            stroke="#5A3714"
            range={targetRange}
            generateTicks={generateTicks}
            getPositionPercentage={getPositionPercentage}
            filledDots={true}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#005F20]">{t(goalTimeRange.label)}</h2>
          <div className="font-besley font-bold text-center text-lg text-[#005F20]">
            {goalRange.lower.value} {'≤'} <span className="italic">t</span> {'≤'} {goalRange.upper.value}
          </div>
        </div>
        <div className="px-5">
          <NumberLine
            stroke="#005F20"
            range={goalRange}
            generateTicks={generateTicks}
            getPositionPercentage={getPositionPercentage}
            filledDots={true}
          />
        </div>
      </div>
    </div>
  );
};

export default PerformanceRangeAnalyzer;