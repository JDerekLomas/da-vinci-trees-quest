import React, { useCallback, useState } from 'react';
import { Interaction, TextboxConfig } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import parse from 'html-react-parser';
import { BUTTON_STYLES } from '../../../constants/constants';

const DeliveryPriceCalculator: React.FC<{ interaction: Interaction }> = ({ interaction }) => {
  const [inputValues, setInputValues] = useState<Record<string, number>>({
      distance: 0,
      weight: 0,
    }),
    { t } = useTranslations(),
    [showResult, setShowResult] = useState(false),
    [result, setResult] = useState({
      distance: 0,
      weight: 0,
      distancePrice: 0,
      weightPrice: 0,
    });

  const handleInputChange = (id: string, value: string, input?: TextboxConfig) => {
    if (value === '' || !input) {
      setInputValues((prev) => ({ ...prev, [id]: 0 }));
      return;
    }

    const cleanValue = value.replace(/^0+/, '') || '0',
      numValue = Number(cleanValue);

    if (!isNaN(numValue) && numValue >= input.min && numValue <= input.max) {
      setInputValues((prev) => ({ ...prev, [id]: numValue }));
    }
  };

  const calculateDistancePrice = (distance: number) => {
    if (distance === 0) return 0;
    else if (distance > 0 && distance <= 5) return 1;
    else if (distance > 5 && distance <= 15) return 1 + 2 * (distance - 5);

    return 21 + 4 * (distance - 15);
  };

  const calculateWeightPrice = (distance: number, weight: number) => {
    if (distance <= 5) return 2 * weight;
    else if (distance > 5 && distance <= 15) return 3 * weight;

    return 4 * weight;
  };

  const calculateResult = useCallback(() => {
    setShowResult(true);

    const { distance, weight } = inputValues;
    setResult({
      distance,
      weight,
      distancePrice: calculateDistancePrice(distance),
      weightPrice: calculateWeightPrice(distance, weight),
    });
  }, [setShowResult, setResult, inputValues]);

  return (
    <div>
      <h3 className="text-m font-semibold">{t('scenes.delivery_price_calculator.formula_title')}</h3>
      <div>
        <p className="font-medium text-m">{t('scenes.delivery_price_calculator.formula1')}</p>
        <div className="bg-gray-50 p-2 rounded-lg mt-1">
          <div
            className="text-m"
            role="text"
            aria-label="p of d and w equals: 1 plus 2 times w, where 0 is less than d which is less than or equal to 5; 1 plus 2 times d minus 5 plus 3 times w, where 5 is less than d which is less than or equal to 15; 1 plus 20 plus 4 times d minus 15 plus 4 times w, where 15 is less than d which is less than or equal to 50"
          >
            <div className="flex items-baseline gap-2" aria-hidden="true">
              <span>
                <span className="font-besley text-[#A6001A] italic">P</span>(
                <span className="font-besley text-[#A6001A] italic">d</span>,{' '}
                <span className="font-besley text-[#A6001A] italic">w</span>)
              </span>{' '}
              = {'{'}
            </div>
            <div className="flex flex-col gap-y-1 my-1 ml-4" aria-hidden="true">
              <p>
                <span className="text-[#0055B2]">1 + 2</span>
                <span className="font-besley text-[#0055B2] italic">w</span>,{' '}
                <span className="text-[#2E7D32]">
                  0 {'<'} <span className="font-besley italic">d</span> ≤ 5
                </span>
              </p>
              <p>
                <span className="text-[#0055B2]">1 + 2(</span>
                <span className="font-besley text-[#0055B2] italic">d</span>
                <span className="text-[#0055B2]"> - 5) + 3</span>
                <span className="font-besley text-[#0055B2] italic">w</span>,{' '}
                <span className="text-[#2E7D32]">
                  5 {'<'} <span className="font-besley italic">d</span> ≤ 15
                </span>
              </p>
              <p>
                <span className="text-[#0055B2]">1 + 20 + 4(</span>
                <span className="font-besley text-[#0055B2] italic">d</span>
                <span className="text-[#0055B2]"> - 15) + 4</span>
                <span className="font-besley text-[#0055B2] italic">w</span>,
                <span className="text-[#2E7D32]">
                  15 {'<'} <span className="font-besley italic">d</span> ≤ 50
                </span>
              </p>
            </div>
            <div aria-hidden="true">{'}'}</div>
          </div>
        </div>
      </div>
      <p className="my-2 text-m">{parse(t('scenes.delivery_price_calculator.explanation'))}</p>
      <hr></hr>
      <div className="grid grid-cols-1 mb-2 lg:grid-cols-2 lg:gap-x-2" aria-live="polite">
        <div>
          <div className="grid grid-cols-1 gap-2 mt-3 text-m">
            {interaction?.inputs?.map((input, index) => (
              <div key={`input-${index}`}>
                <label htmlFor={input.id}>
                  {t(input.label)}
                  <input
                    id={input.id}
                    type='number'
                    value={inputValues ? inputValues[input.id] : ''}
                    onChange={(e) => handleInputChange(input.id, e.target.value, input?.textboxConfig)}
                    onBlur={() => {
                      if (inputValues && inputValues[input.id] === 0) {
                        setInputValues((prev) => ({
                          ...prev,
                          [input.id]: input.textboxConfig ? input.textboxConfig.min : 0,
                        }));
                      }
                    }}
                    className="border rounded px-2 py-1 w-full mt-1 border-[#333333]"
                  />
                </label>
              </div>
            ))}
          </div>
          <button
            style={BUTTON_STYLES.base}
            className={`w-full mt-4 ${BUTTON_STYLES.classes.common} ${BUTTON_STYLES.classes.primary.enabled}`}
            onClick={calculateResult}
          >
            {t('scenes.delivery_price_calculator.calculate')}
          </button>
        </div>
        {showResult && (
          <div className="bg-gray-50 h-fit rounded p-2 mt-3 flex flex-col gap-y-1 text-m">
            <p>
              <span className="font-besley">P</span>({result.distance}, {result.weight}) ={' '}
              {result.distancePrice + result.weightPrice}
            </p>
            <div className="grid grid-cols-2">
              <p>{t('scenes.delivery_price_calculator.distance_component')}</p>
              <p>${result.distancePrice}</p>
            </div>
            <div className="grid grid-cols-2">
              <p>{t('scenes.delivery_price_calculator.weight_component')}</p>
              <p>${result.weightPrice}</p>
            </div>
            <hr></hr>
            <div className="grid grid-cols-2 font-semibold">
              <p>{t('scenes.delivery_price_calculator.total_price')}</p>
              <p>${result.distancePrice + result.weightPrice}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryPriceCalculator;
