import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import interaction from '../configs/interactive-3.ts';

function TrainingDataCard() {
  const { t } = useTranslations();
  return (
    <div className="w-full p-0 bg-white space-y-4 text-black">
      {/* Header */}
      <div>
        <p className="text-base break-words">
          {t(interaction.maximumSpeed)}:{" "}
          <span aria-hidden="true" className="text-blue-600 font-bold">8.0 {t(interaction.mpers)}</span>
          <span className="sr-only">{t(interaction.eightMetersPerSecond)}</span>
        </p>
      </div>

      {/* Training Summary Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Monday */}
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 min-w-0 break-words">
          <h3 className="font-semibold">{t(interaction.monday)}</h3>
          <p aria-hidden="true" className="text-base font-bold">75% (6 {t(interaction.mpers)})</p>
          <span className="sr-only">{t(interaction.seventyFivePercentIntensity)}</span>
          <p className="text-base text-gray-600 mt-1">
            {t(interaction.tooEasyMinimalImprovement)}
          </p>
        </div>

        {/* Wednesday */}
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 min-w-0 break-words">
          <h3 className="font-semibold">{t(interaction.wednesday)}</h3>
          <p aria-hidden="true" className="text-base font-bold">95% (7.6 {t(interaction.mpers)})</p>
          <span className="sr-only">{t(interaction.ninetyFivePercentIntensity)}</span>
          <p className="text-base text-gray-600 mt-1">
            {t(interaction.excellentButExcessiveSoreness)}
          </p>
        </div>

        {/* Friday */}
        <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4 min-w-0 break-words">
          <h3 className="font-semibold">{t(interaction.friday)}</h3>
          <p aria-hidden="true" className="text-base font-bold">82% (6.6 {t(interaction.mpers)})</p>
          <span className="sr-only">{t(interaction.eightyTwoPercentIntensity)}</span>
          <p className="text-base text-gray-600 mt-1">
            {t(interaction.goodBalanceOfChallengeAndRecovery)}
          </p>
        </div>
      </div>
    </div>
  );
}

const TrainingIntensityOptimizer = () => {
  const { t } = useTranslations();
  // State variables
  const [workoutType, setWorkoutType] = useState('regular');
  const [distance, setDistance] = useState('35');
  const [maxSpeed] = useState(8.0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [calculatedResults, setCalculatedResults] = useState<{
    intensityRange: { min: number, max: number },
    speedRange: { min: string, max: string },
    timeRange: { min: string, max: string },
    specialized: boolean
  } | null>(null);
  const [specializedWorkout, setSpecializedWorkout] = useState(false);

  // Training intensity ranges (as percentages)
  const intensityRanges = useMemo(() => ({
    recovery: { min: 60, max: 80, color: "green" },
    regular: { min: 80, max: 90, color: "yellow" },
    peak: { min: 90, max: 95, color: "red" }
  }), []);

  // Calculate results function
  const calculateTargets = useCallback(() => {
    const selectedRange = intensityRanges[workoutType as keyof typeof intensityRanges];

    // Calculate speed ranges based on intensity percentages
    const minSpeedValue = (selectedRange.min / 100 * maxSpeed).toFixed(1);
    const maxSpeedValue = (selectedRange.max / 100 * maxSpeed).toFixed(1);

    // Calculate time ranges based on distance and speed
    const minTime = (Number(distance) / (selectedRange.max / 100 * maxSpeed)).toFixed(1);
    const maxTime = (Number(distance) / (selectedRange.min / 100 * maxSpeed)).toFixed(1);

    setCalculatedResults({
      intensityRange: selectedRange,
      speedRange: { min: minSpeedValue, max: maxSpeedValue },
      timeRange: { min: minTime, max: maxTime },
      specialized: specializedWorkout
    });
  }, [workoutType, distance, specializedWorkout, maxSpeed, intensityRanges]);

  // Update handleWorkoutTypeChange to calculate results
  const handleWorkoutTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWorkoutType(e.target.value);
    setSpecializedWorkout(false);
    // Results will be calculated in useEffect
  };

  // Update handleDistanceChange to calculate results
  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // set distance if value is a number or a valid decimal number
    const inputValue = e.target.value;
    
    // Allow empty input, digits, and at most one decimal point with up to 6 digits after
    if (inputValue === '' || /^\d*\.?\d{0,6}$/.test(inputValue)) {
      const numValue = Number(inputValue);
      
      // Check if it's within the valid range
      if (numValue >= 0 && numValue <= 1000) {
        setDistance(inputValue);
      } else if (inputValue === '' || inputValue === '.') {
        // Allow typing a decimal point or clearing the field
        setDistance(inputValue);
      }
    }

    // Results will be calculated in useEffect
  };

  // Update handleSpecializedToggle to calculate results
  const handleSpecializedToggle = () => {
    setSpecializedWorkout(!specializedWorkout);
    // Results will be calculated in useEffect
  };

  // Use useEffect to calculate results whenever inputs change
  useEffect(() => {
    calculateTargets();
  }, [workoutType, distance, specializedWorkout, calculateTargets]);

  // Format the inequality text based on workout type
  const getInequalityText = () => {
    if (!calculatedResults) return "";

    if (calculatedResults.specialized) {
      return "60% ≤ i ≤ 80% OR 90% ≤ i ≤ 95%";
    } else {
      return `${calculatedResults.intensityRange.min}% ≤ i ≤ ${calculatedResults.intensityRange.max}%`;
    }
  };

  // Format the speed inequality text
  const getSpeedInequalityText = () => {
    if (!calculatedResults) return "";

    if (calculatedResults.specialized) {
      // Special case for OR condition
      const recMinSpeed = (intensityRanges.recovery.min / 100 * maxSpeed).toFixed(1);
      const recMaxSpeed = (intensityRanges.recovery.max / 100 * maxSpeed).toFixed(1);
      const peakMinSpeed = (intensityRanges.peak.min / 100 * maxSpeed).toFixed(1);
      const peakMaxSpeed = (intensityRanges.peak.max / 100 * maxSpeed).toFixed(1);

      return `${recMinSpeed} ≤ s ≤ ${recMaxSpeed} OR ${peakMinSpeed} ≤ s ≤ ${peakMaxSpeed}`;
    } else {
      return `${calculatedResults.speedRange.min} ≤ s ≤ ${calculatedResults.speedRange.max}`;
    }
  };

  return (
    <div className="mb-5">
      <div className="w-full bg-white rounded-xl border-[#757575] border-2 p-4 mb-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-between text-left"
          aria-expanded={isCollapsed}
        >
          <span className="text-base font-bold leading-none text-black">
            {t(interaction.ninaTrainingData)}
          </span>
          <svg
            className={`w-5 h-5 transition-transform ${isCollapsed ? "" : "rotate-180"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div
          className={`mt-2 overflow-hidden transition-all duration-300 ${isCollapsed ? "max-h-0 opacity-0" : "max-h-96 opacity-100"
            }`}
        >
          <TrainingDataCard />
        </div>
      </div>


      {/* Training zones visualization */}
      <div>
        <h2 className="text-xl font-bold text-black">{t(interaction.trainingIntensityZones)}:</h2>

        <div className="mt-4">

          {/* Horizontal bar */}
          <div className="h-100  rounded-lg overflow-hidden flex">
            {/* Recovery zone */}
            <div
              role="text"
              aria-label={t(interaction.ariaLabelRecovery)}
              tabIndex={0}
              className="h-full bg-green-400 flex flex-col items-center justify-center text-[#005f09] text-base font-bold "
              style={{ width: '34%' }}
            >
              <div aria-hidden={true} className="text-base mt-1 max-[900px]:mt-2">{t(interaction.recovery)}</div>
              <div aria-hidden={true} className="text-base">60-80%</div>
              <div aria-hidden={true} className="px-2">4.80 - 6.40 m/s</div>
            </div>

            {/* Regular zone */}
            <div
              role="text"
              aria-label={t(interaction.ariaLabelRegular)}
              tabIndex={0}
              className="h-full bg-yellow-400 flex flex-col items-center justify-center text-[#705400] text-base font-bold"
              style={{ width: '33%' }}
            >
              <div aria-hidden={true} className="text-base mt-1 max-[900px]:mt-2">{t(interaction.regular)}</div>
              <div aria-hidden={true} className="text-base">80-90%</div>
              <div aria-hidden={true} className="px-2">6.40 - 7.20 m/s</div>
            </div>

            {/* Peak zone */}
            <div
              role="text"
              aria-label={t(interaction.ariaLabelPeak)}
              tabIndex={0}
              className="h-full bg-red-400 flex flex-col items-center justify-center text-[#5f0000] text-base font-bold"
              style={{ width: '33%' }}
            >
              <div aria-hidden={true} className="text-base mt-1 max-[900px]:mt-2">{t(interaction.peak)}</div>
              <div aria-hidden={true} className="text-base">90-95%</div>
              <div aria-hidden={true} className="px-2">7.20 - 7.60 m/s</div>
            </div>
          </div>

        </div>
      </div>

      {/* Workout calculator */}
      <div>
        <h2 className="text-xl font-bold text-black mt-8">{t(interaction.workoutCalculator)}:</h2>

        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <label className="block text-base font-medium mb-1 text-black">{t(interaction.workoutType)}</label>
            <select
              aria-label={t(interaction.selectFieldAria)}
              className="w-full p-2 border border-gray-300 rounded-md text-black disabled:bg-[#757575] disabled:text-gray-200 disabled:cursor-not-allowed"
              value={workoutType}
              onChange={handleWorkoutTypeChange}
              disabled={specializedWorkout}
            >
              <option value="recovery">{t(interaction.recovery)} (60-80%)</option>
              <option value="regular">{t(interaction.regular)} (80-90%)</option>
              <option value="peak">{t(interaction.peak)} (90-95%)</option>
            </select>
          </div>

          <div>
            <label className="block text-base font-medium mb-1 text-black">{t(interaction.distance)}</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              value={distance}
              onChange={handleDistanceChange}
              aria-label={t(interaction.inputFieldAria)}
            />
          </div>
        </div>

        <div className="mt-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={specializedWorkout}
              onChange={handleSpecializedToggle}
            />
            <span className="text-base font-medium ml-2">{t(interaction.specialized)}</span>
          </label>
        </div>
      </div>

      {/* Results display */}
      {calculatedResults && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-black mb-3">
            {specializedWorkout ? t(interaction.specializedWorkout) :
              workoutType === 'recovery' ? t(interaction.recoveryWorkout) :
                workoutType === 'regular' ? t(interaction.regularWorkout) : t(interaction.peakWorkout)}:
          </h2>

          <div className="space-y-4">
            <div>
              <div role="text" aria-label={t(interaction.ariaLabelIntensityRange)} className="text-base font-medium text-gray-700"><span aria-hidden={true}>{t(interaction.intensityRange)}</span></div>
              <div className="text-xl font-bold text-indigo-700 mt-1">{getInequalityText()}</div>
            </div>

            <div>
              <div role="text" aria-label={t(interaction.ariaLabelSpeedRange)} className="text-base font-medium text-gray-700"><span aria-hidden={true}>{t(interaction.speedRange)}</span></div>
              <div className="text-xl font-bold text-indigo-700 mt-1">{getSpeedInequalityText()}</div>
            </div>

            <div>
              <div role="text" aria-label={t(interaction.ariaLabelTimeFor) + ' ' + distance + ' ' + t(interaction.meters)} className="text-base font-medium text-gray-700"><span aria-hidden={true}>{t(interaction.timeRange)} {distance}m:</span></div>
              {specializedWorkout ? (
                <div className="mt-1">
                  <div className="text-lg font-bold text-green-700">{t(interaction.recovery)}: {(Number(distance) / (0.8 * maxSpeed)).toFixed(1)} <span role="text" aria-label={t(interaction.ariaLabelTo)}>-</span> {(Number(distance) / (0.6 * maxSpeed)).toFixed(1)} {t(interaction.seconds)}</div>
                  <div className="text-lg font-bold text-red-700">{t(interaction.peak)}: {(Number(distance) / (0.95 * maxSpeed)).toFixed(1)} <span role="text" aria-label={t(interaction.ariaLabelTo)}>-</span> {(Number(distance) / (0.9 * maxSpeed)).toFixed(1)} {t(interaction.seconds)}</div>
                </div>
              ) : (
                <div className="text-xl font-bold text-indigo-700 mt-1">{calculatedResults.timeRange.min} <span role="text" aria-label={t(interaction.ariaLabelTo)}>-</span> {calculatedResults.timeRange.max} {t(interaction.seconds)}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingIntensityOptimizer;