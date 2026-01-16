import React, { useCallback, useEffect } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import '../../../shared/slider.css';

interface SliderInputProps {
  label: string;
  id: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  groupLabel?: string;
  valuePrefix?: string;
}

export const SliderInput: React.FC<SliderInputProps> = ({
  label,
  id,
  min,
  max,
  step,
  value,
  onChange,
  groupLabel,
  valuePrefix,
}) => {
  const { t } = useTranslations();

  const updateSliderBackground = useCallback(
    (input: HTMLInputElement) => {
      const percent = ((value - min) / (max - min)) * 100;
      input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
    },
    [value, min, max],
  );

  useEffect(() => {
    const slider = document.getElementById(`slider-${id}`) as HTMLInputElement;
    if (slider) {
      updateSliderBackground(slider);
    }
  }, [id, updateSliderBackground]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <label htmlFor={`slider-${id}`} className="flex items-center" aria-hidden="true">
          {groupLabel && <h4 className="sr-only">{t(groupLabel)}</h4>}
          <h4 className="font-semibold">{t(label)}:</h4>
          <span>&nbsp;{value}</span>
          {valuePrefix && <span>{valuePrefix}</span>}
        </label>
        <div className="sliderContainer">
          <input
            id={`slider-${id}`}
            type="range"
            value={value}
            onChange={(e) => {
              onChange(+e.target.value);
              updateSliderBackground(e.target as HTMLInputElement);
            }}
            min={min}
            max={max}
            step={step}
            className="global-slider w-full"
            aria-valuetext={`${groupLabel ? `${t(groupLabel)} ` : ''}${t(label)}: ${value} ${valuePrefix ?? ''}`}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">
          {min}
          {valuePrefix ?? ''}
        </span>
        <span className="sr-only">{t('scenes.common.rangeLabel')}</span>
        <span className="text-sm">
          {max}
          {valuePrefix ?? ''}
        </span>
      </div>
    </div>
  );
};
