import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import interaction from '../configs/interactive-4';

interface Interactive_4Props {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const Interactive_4: React.FC<Interactive_4Props> = () => {
  const { t } = useTranslations();

  // State variables
  const [timeTrialResult, setTimeTrialResult] = useState(25);
  const [timeTrialResultInput, setTimeTrialResultInput] = useState('');
  const [calculatedRange, setCalculatedRange] = useState(
    null as {
      baseline: number;
      bestCase: number;
      worstCase: number;
      qualifies: boolean;
    } | null,
  );
  const [qualifyingTime] = useState(26.0);
  const [qualificationMargin, setQualificationMargin] = useState(null as string | null);

  // Constants from the model
  const raceMultiplier = 0.95;
  const maxRaceDayFactor = 0.8;

  // Main prediction calculation
  const calculatePrediction = useCallback(() => {
    // Base calculation
    const baseline = raceMultiplier * timeTrialResult;
    const bestCase = baseline - maxRaceDayFactor;
    const worstCase = baseline + maxRaceDayFactor;

    setCalculatedRange({
      baseline,
      bestCase,
      worstCase,
      qualifies: worstCase < qualifyingTime,
    });

    // Calculate margin from qualifying time
    if (worstCase < qualifyingTime) {
      setQualificationMargin((qualifyingTime - worstCase).toFixed(2));
    } else {
      setQualificationMargin(null);
    }
  }, [timeTrialResult, qualifyingTime]);

  // Calculate prediction on initial render and when inputs change
  useEffect(() => {
    calculatePrediction();
  }, [timeTrialResult, calculatePrediction]);

  // Component for the number line visualization
  const NumberLine = ({
    min,
    max,
    markers,
    highlightRange,
  }: {
    min: number;
    max: number;
    markers: number[];
    highlightRange: { min: number; max: number };
  }) => {
    const range = max - min;

    // Convert a value to its position percentage on the number line
    const valueToPosition = (value: number) => {
      return ((value - min) / range) * 100;
    };

    return (
      <div className="w-full h-24 relative">
        {/* The line itself */}
        <div className="absolute top-12 left-0 right-0 h-1 bg-gray-400"></div>

        {/* The arrow ends */}
        <div className="absolute top-11 -left-2">
          <div className="w-0 h-0 border-t-4 border-b-4 border-r-6 border-t-transparent border-b-transparent border-r-gray-400"></div>
        </div>
        <div className="absolute top-11 -right-2">
          <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-t-transparent border-b-transparent border-l-gray-400"></div>
        </div>

        {/* Tick marks and labels */}
        {markers.map((value: number, index: number) => (
          <div key={index} className="absolute" style={{ left: `${valueToPosition(value)}%` }}>
            <div className="h-4 w-0.5 bg-black mt-10"></div>
            <div className="text-base text-center mt-1 text-black" style={{ transform: 'translateX(-50%)' }}>
              {value.toFixed(2)}s
            </div>
          </div>
        ))}

        {/* Highlighted range if provided */}
        {highlightRange && (
          <div
            className="absolute h-6 bg-[#006be0] opacity-70 rounded"
            style={{
              left: `${valueToPosition(highlightRange.min)}%`,
              width: `${valueToPosition(highlightRange.max) - valueToPosition(highlightRange.min)}%`,
              top: '28px',
            }}
          ></div>
        )}

        {/* Qualifying time marker if in range */}
        {qualifyingTime >= min && qualifyingTime <= max && (
          <div className="absolute h-full" style={{ left: `${valueToPosition(qualifyingTime)}%` }}>
            <div className="h-16 w-0.5 bg-green-500 border-dashed border-l border-green-500"></div>
            <div
              className="absolute -top-6 text-base font-bold text-[#008832] whitespace-nowrap"
              style={{
                // Adjust label position when it's near the edges
                ...(valueToPosition(qualifyingTime) < 10
                  ? { left: '0', transform: 'translateX(0)' }
                  : valueToPosition(qualifyingTime) > 90
                    ? { left: '0', transform: 'translateX(-100%)' }
                    : { transform: 'translateX(-50%)' }),
              }}
            >
              Qualifying: {qualifyingTime}s
            </div>
          </div>
        )}
      </div>
    );
  };

  // Visualization for the absolute value inequality
  const AbsoluteValueVisualization = () => {
    return (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold text-black mb-1">Race Day Factor Range</h3>
        <p className="text-base text-black mb-3">
          <span className="font-besley font-bold">
            <span className="italic text-[#633300]">|RDF|</span> ≤ 0.8
          </span>{' '}
          means the Race Day Factor is between <strong className="text-[#633300]">-0.8</strong> and{' '}
          <strong className="text-[#633300]">+0.8</strong>
        </p>

        <div className="w-full h-16 relative mb-2">
          {/* The number line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-black"></div>

          {/* Zero marker */}
          <div className="absolute" style={{ left: '50%' }}>
            <div className="h-4 w-0.5 bg-gray-600 mt-6"></div>
            <div
              className="text-base text-center mt-1 font-medium text-black"
              style={{ transform: 'translateX(-50%)' }}
            >
              0
            </div>
          </div>

          {/* -0.8 marker */}
          <div className="absolute" style={{ left: '20%' }}>
            <div className="h-4 w-0.5 bg-gray-600 mt-6"></div>
            <div
              className="text-base text-center mt-1 font-medium text-black"
              style={{ transform: 'translateX(-50%)' }}
            >
              -0.8
            </div>
          </div>

          {/* +0.8 marker */}
          <div className="absolute" style={{ left: '80%' }}>
            <div className="h-4 w-0.5 bg-gray-600 mt-6"></div>
            <div
              className="text-base text-center mt-1 font-medium text-black"
              style={{ transform: 'translateX(-50%)' }}
            >
              +0.8
            </div>
          </div>

          {/* Highlighted range */}
          <div
            className="absolute h-4 bg-[#006be0] opacity-70 rounded"
            style={{
              left: '20%',
              width: '60%',
              top: '6px',
            }}
          ></div>
        </div>
      </div>
    );
  };

  const handleTimeTrialResultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === '') {
      setTimeTrialResultInput('');
      setTimeTrialResult(0);
      return;
    }

    // Allow only valid numbers with up to 6 decimal places
    if (!/^\d*\.?\d{0,6}$/.test(inputValue)) return;

    const value = parseFloat(inputValue);

    if (isNaN(value)) return;

    if (value < 0) {
      setTimeTrialResultInput('0');
      setTimeTrialResult(0);
      return;
    } else if (value > 1000) {
      setTimeTrialResultInput('1000');
      setTimeTrialResult(1000);
      return;
    }

    setTimeTrialResult(value);
    setTimeTrialResultInput(inputValue); // Keep the original input to preserve decimal places
  };

  return (
    <div className="mb-5">
      <div>
        <div className="flex items-center mb-4">
          <div className="text-black mr-auto">
            <span className="text-xl font-bold">{t(interaction.predictionFormula)}: </span>
            <span className="text-base font-besley font-bold">
              <span className="italic text-[#DB0072]">{t(interaction.raceTime)}</span> = 0.95 ×{' '}
              <span className="italic text-[#0061FC]">{t(interaction.timeTrial)}</span> +{' '}
              <span className="italic text-[#633300]">{t(interaction.raceDayFactor)}</span>
            </span>
          </div>
        </div>

        <AbsoluteValueVisualization />

        <div className="mb-4">
          <div className="flex items-center mb-2">
            <label className="text-base font-bold text-black w-1/3">{t(interaction.timeTrialResult)}:</label>
            <input
              value={timeTrialResultInput}
              onChange={handleTimeTrialResultChange}
              className="flex-1 p-2 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-center"
              aria-label={t(interaction.inputFieldAria)}
            />
            <span className="ml-2 text-base text-black">seconds</span>
          </div>
        </div>

        {calculatedRange && (
          <div>
            <div className="mt-5">
              <div className="text-base font-bold text-black mb-1">{t(interaction.calculationSteps)}:</div>
              <div className="ml-4 mt-2">
                <div>
                  1. {t(interaction.basePrediction)} ={' '}
                  <span className="font-bold font-besley">
                    0.95 × <span className="text-[#0061FC]">{timeTrialResult}</span> ={' '}
                    <span className="text-[#DB0072]">{(0.95 * timeTrialResult).toFixed(2)} s</span>
                  </span>
                </div>
                <div>
                  2. {t(interaction.baseCase)} ={' '}
                  <span className="font-bold font-besley">
                    <span className="text-[#DB0072]">{(0.95 * timeTrialResult).toFixed(2)}</span> -{' '}
                    <span className="text-[#633300]">0.8</span> ={' '}
                    <span className="text-[#DB0072]">{(0.95 * timeTrialResult - 0.8).toFixed(2)} s</span>
                  </span>
                </div>
                <div>
                  3. {t(interaction.worstCase)} ={' '}
                  <span className="font-bold font-besley">
                    <span className="text-[#DB0072]">{(0.95 * timeTrialResult).toFixed(2)}</span> +{' '}
                    <span className="text-[#633300]">0.8</span> ={' '}
                    <span className="text-[#DB0072]">{(0.95 * timeTrialResult + 0.8).toFixed(2)} s</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="p-3 bg-green-100 rounded-lg text-center">
                <div className="text-xs font-bold text-gray-600">{t(interaction.baseCase)}</div>
                <div className="font-bold text-green-700 text-lg mt-1">{calculatedRange.bestCase.toFixed(2)}s</div>
                <div className="text-xs font-bold text-green-700 mt-1">
                  ({t(interaction.raceDayFactor)} = -0.8)
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg text-center">
                <div className="text-xs font-bold text-gray-600">{t(interaction.basePrediction)}</div>
                <div className="font-bold text-blue-700 text-lg mt-1">{calculatedRange.baseline.toFixed(2)}s</div>
                <div className="text-xs font-bold text-blue-700 mt-1">({t(interaction.raceDayFactor)} = 0)</div>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg text-center">
                <div className="text-xs font-bold text-gray-600">{t(interaction.worstCase)}</div>
                <div className="font-bold text-orange-700 text-lg mt-1">
                  {calculatedRange.worstCase.toFixed(2)}s
                </div>
                <div className="text-xs font-bold text-orange-700 mt-1">
                  ({t(interaction.raceDayFactor)} = +0.8)
                </div>
              </div>
            </div>

            <div
              className={`p-3 rounded-lg text-center mt-4 ${calculatedRange.qualifies ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            >
              {calculatedRange.qualifies ? (
                <>
                  <span className="font-medium">{t(interaction.qualificationStatus)}: </span>
                  <span className="font-bold">{t(interaction.willQualify)}!</span>
                  <div className="text-base mt-2">
                    {t(interaction.willQualifyDescription)} {qualificationMargin} {t(interaction.seconds)}
                  </div>
                </>
              ) : (
                <>
                  <span className="font-medium">{t(interaction.qualificationStatus)}: </span>
                  <span className="font-bold">{t(interaction.mayNotQualify)}</span>
                  <div className="text-base mt-1">{t(interaction.mayNotQualifyDescription)}</div>
                </>
              )}
            </div>

            <div className="mt-4">
              <h4 className="font-bold text-black mb-5">{t(interaction.predictedRaceTimeRange)}:</h4>
              <NumberLine
                min={Math.floor(calculatedRange.bestCase - 0.5)}
                max={Math.ceil(calculatedRange.worstCase + 0.5)}
                markers={[
                  calculatedRange.bestCase,
                  calculatedRange.baseline,
                  calculatedRange.worstCase,
                  qualifyingTime,
                ]}
                highlightRange={{
                  min: calculatedRange.bestCase,
                  max: calculatedRange.worstCase,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interactive_4;
