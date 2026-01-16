import { useState } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import interaction from '../configs/interactive-1';

// Component for number line with ticks
const NumberLineWithTicks = ({ min, max, ticks, hide = false }: { min: number, max: number, ticks: number[], hide: boolean }) => {
  // Calculate position as percentage of total range
  const getPositionPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <div className="relative w-full h-16" aria-hidden={true}>
      {/* Horizontal line */}
      <div className="absolute top-5 w-full h-0.5 bg-gray-400" />

      {/* Arrow ends */}
      <div className="absolute top-4 -left-3">
        <div className="w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-gray-400" />
      </div>
      <div className="absolute top-4 -right-3">
        <div className="w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-gray-400" />
      </div>

      {/* Ticks and labels */}
      {ticks.map((tick) => (
        <div
          key={tick}
          className="absolute"
          style={{
            left: `${getPositionPercentage(tick) + 1}%`,
            transform: 'translateX(-50%)',
          }}
        >
          {hide && tick === 26 ? (
            <>
              <div className="h-3 w-0.5 mt-3.5" />
              <div className="text-xs text-center mt-1 ml-2">{tick}</div>
            </>
          ) : (
            <>
              <div className="h-3 w-0.5 bg-gray-600 mt-3.5" />
              <div className="text-xs text-center mt-1">{tick}</div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

// Range indicator component
const RangeIndicator = ({ range, color, label, numberLineRange }: { range: { min: number, max: number }, color: { bg: string, text: string, bgLight: string, border: string, bgCircle: string }, label: string, numberLineRange: { min: number, max: number } }) => {
  // Calculate position as percentage of total range with dynamic scale adjustment
  const getPositionPercentage = (value: number) => {
    // Normal calculation if within range
    return ((value - adjustedNumberLineRange.min) / (adjustedNumberLineRange.max - adjustedNumberLineRange.min)) * 100;
  };

  // Determine if we need to adjust the number line range
  const adjustedNumberLineRange = {
    min: Math.min(numberLineRange.min, range.min),
    max: Math.max(numberLineRange.max, range.max)
  };

  // Dynamically determine tick spacing based on range size
  const getTicksForRange = (min: number, max: number) => {
    const rangeSize = max - min;

    // For primary range (20-32) or smaller ranges, show all integer ticks
    if (rangeSize <= 32 || (min >= 20 && max <= 32)) {
      return Array.from(
        { length: max - min + 1 },
        (_, i) => i + min
      );
    }
    // For medium ranges, show every 2nd tick
    else if (rangeSize <= 60) {
      return Array.from(
        { length: Math.ceil((max - min + 1) / 2) },
        (_, i) => min + i * 2
      );
    }
    // For large ranges, show every 5th tick
    else if (rangeSize <= 100) {
      const startTick = Math.ceil(min / 5) * 5; // Round to nearest 5
      return Array.from(
        { length: Math.ceil((max - startTick + 1) / 5) + 1 },
        (_, i) => startTick + i * 5
      );
    }
    // For very large ranges (100-200), show every 10th tick
    else if (rangeSize <= 200) {
      const startTick = Math.ceil(min / 10) * 10; // Round to nearest 10
      return Array.from(
        { length: Math.ceil((max - startTick + 1) / 10) + 1 },
        (_, i) => startTick + i * 10
      );
    }
    // For extremely large ranges (200-500), show every 25th tick
    else if (rangeSize <= 500) {
      const startTick = Math.ceil(min / 25) * 25; // Round to nearest 25
      return Array.from(
        { length: Math.ceil((max - startTick + 1) / 25) + 1 },
        (_, i) => startTick + i * 25
      );
    }
    // For massive ranges (500+), show every 50th or 100th tick
    else if (rangeSize <= 1000) {
      const startTick = Math.ceil(min / 50) * 50; // Round to nearest 50
      return Array.from(
        { length: Math.ceil((max - startTick + 1) / 50) + 1 },
        (_, i) => startTick + i * 50
      );
    }
    // For extremely massive ranges (1000+)
    else {
      const startTick = Math.ceil(min / 100) * 100; // Round to nearest 100
      return Array.from(
        { length: Math.ceil((max - startTick + 1) / 100) + 1 },
        (_, i) => startTick + i * 100
      );
    }
  };

  // Get appropriate ticks based on the range
  const ticks = getTicksForRange(adjustedNumberLineRange.min, adjustedNumberLineRange.max);

  return (
    <div className={`p-4`}>
      <h3 className={`font-bold mb-1`}>{label}</h3>
      <p className="text-gray-600">{range.min} ≤ t ≤ {range.max} seconds</p>

      <div className="relative h-20"> {/* Increased height to accommodate larger numbers */}
        {/* The range line */}
        <div
          className={`absolute h-2 ${color.bg} rounded-full`}
          style={{
            left: `${getPositionPercentage(range.min)}%`,
            width: `${getPositionPercentage(range.max) - getPositionPercentage(range.min)}%`,
            top: '12px',
          }}
        />

        {/* The number line */}
        <div className="mt-4 overflow-visible">
          <NumberLineWithTicks
            hide={false}
            min={adjustedNumberLineRange.min}
            max={adjustedNumberLineRange.max}
            ticks={ticks}
          />
        </div>

        {/* The endpoints */}
        <div
          className={`absolute w-6 h-6 ${color.border} ${color.bgCircle} rounded-full -ml-3 -mt-2 flex items-center justify-center`}
          style={{
            left: `${getPositionPercentage(range.min)}%`,
            top: '14px',
          }}
        >
          {/* <span className="text-xs font-bold">{range.min}</span> */}
        </div>
        <div
          className={`absolute w-6 h-6 ${color.border} ${color.bgCircle} rounded-full -ml-3 -mt-2 flex items-center justify-center`}
          style={{
            left: `${getPositionPercentage(range.max)}%`,
            top: '14px',
          }}
        >
          {/* <span className="text-xs font-bold">{range.max}</span> */}
        </div>
      </div>
    </div>
  );
};

interface PerformanceRangeAnalyzerProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const PerformanceRangeAnalyzer = ({ onInteraction }: PerformanceRangeAnalyzerProps) => {
  // State variables
  const { t } = useTranslations();
  const [currentMin, setCurrentMin] = useState(23);
  const [currentMax, setCurrentMax] = useState(31);
  const [improvement, setImprovement] = useState(0);
  const [feedback, setFeedback] = useState('');
  const numberLineRange = { min: 20, max: 32 };
  const qualifyingTime = 26;

  // Calculate the new range based on improvement
  const targetMin = currentMin - improvement;
  const targetMax = currentMax - improvement;

  // Detect if target range qualifies
  const qualifies = targetMax <= qualifyingTime;

  // Handle input changes
  const handleCurrentMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value < currentMax) {
      setCurrentMin(value);
    }
  };

  const handleCurrentMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > currentMin) {
      setCurrentMax(value);
    }
  };

  const handleImprovementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setImprovement(value);

      // Update feedback
      if (value === 4) {
        setFeedback(t(interaction.feedback_1));
      } else if (value < 4) {
        setFeedback(t(interaction.feedback_2));
      } else if (value > 4) {
        setFeedback(t(interaction.feedback_3));
      } else {
        setFeedback('');
      }
    }
  };

  if (currentMin === 27 && currentMax === 30) {
    onInteraction({
      'step-0-completed': true,
    });
  }

  return (
    <div>
      {/* Input controls */}
      <div className="grid grid-cols-3 gap-4 mb-8 text-black">
        <div className="flex flex-col justify-between min-h-[4rem]">
          <label className="text-base font-medium">
            {t(interaction.label_1)}: <span className="font-semibold">{currentMin}</span>
          </label>
          <div className="sliderContainer">
            <input
              type="range"
              value={currentMin}
              min={20}
              max={40}
              aria-label={t(interaction.label_1)}
              onChange={handleCurrentMinChange}
              style={{
                background: `linear-gradient(to right, #007bff ${((currentMin - 20) / (40 - 20)) * 100}%, #e0e0e0 ${((currentMin - 20) / (40 - 20)) * 100}%)`
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500 mt-2"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between min-h-[4rem]">
          <label className="text-base font-medium">
            {t(interaction.label_2)}: <span className="font-semibold">{currentMax}</span>
          </label>
          <div className="sliderContainer">
            <input
              type="range"
              value={currentMax}
              min={20}
              max={40}
              aria-label={t(interaction.label_2)}
              onChange={handleCurrentMaxChange}
              style={{
                background: `linear-gradient(to right, #007bff ${((currentMax - 20) / (40 - 20)) * 100}%, #e0e0e0 ${((currentMax - 20) / (40 - 20)) * 100}%)`
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500 mt-2"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between min-h-[4rem]">
          <label className="text-base font-medium">
            {t(interaction.label_3)}: <span className="font-semibold">{improvement}</span>
          </label>
          <div className="sliderContainer">
            <input
              type="range"
              value={improvement}
              min={0}
              max={10}
              aria-label={t(interaction.label_3)}
              onChange={handleImprovementChange}
              style={{
                background: `linear-gradient(to right, #007bff ${((improvement - 0) / (10 - 0)) * 100}%, #e0e0e0 ${((improvement - 0) / (10 - 0)) * 100}%)`
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500 mt-2"
            />
          </div>
        </div>

      </div>

      {/* The qualifying line visualization */}
      <div className="relative mb-2 p-4 rounded-lg ">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold" role="text" aria-label={t(interaction.ariaLabelQualifying)}>{t(interaction.labelQualifying)}</h3>
        </div>
        <div className="relative h-14">
          <div className="absolute top-5 w-full h-0.5 bg-gray-300"></div>
          <div
            className="absolute h-full w-1 border-dashed border-2 border-gray-500 z-0"
            style={{ left: `${((qualifyingTime - numberLineRange.min) / (numberLineRange.max - numberLineRange.min)) * 100 - 1.1}%` }}
          >
            <div className="absolute -bottom-8 -left-32 w-64 text-center">
              <span className="font-bold text-yellow-700">{t(interaction.qualifyingTime)}</span>
            </div>
          </div>
          <NumberLineWithTicks
            hide={true}
            min={numberLineRange.min}
            max={numberLineRange.max}
            ticks={Array.from({ length: (numberLineRange.max - numberLineRange.min) / 2 + 1 }, (_, i) => numberLineRange.min + i * 2)}
          />
        </div>
      </div>

      {/* Range visualizations */}
      <div className="">
        <RangeIndicator
          range={{ min: currentMin, max: currentMax }}
          color={{
            bg: "bg-[#0061FC]",
            text: "text-blue-700",
            bgLight: "bg-blue-50",
            border: "border-2 border-[#0061FC]",
            bgCircle: "bg-[#0061FC]"
          }}
          label={t(interaction.labelCurrentTime)}
          numberLineRange={numberLineRange}
        />

        <RangeIndicator
          range={{ min: targetMin, max: targetMax }}
          color={{
            bg: qualifies ? "bg-[#008217]" : "bg-[#E0002B]",
            text: qualifies ? "text-[#008217]" : "text-[#E0002B]",
            bgLight: qualifies ? "bg-[#008217]" : "bg-[#E0002B]",
            border: qualifies ? "border-2 border-[#008217]" : "border-2 border-[#E0002B]",
            bgCircle: qualifies ? "bg-[#008217]" : "bg-[#E0002B]"
          }}
          label={qualifies ? t(interaction.labelImprovedTimeQualifying) : t(interaction.labelImprovedTimeNotQualifying)}
          numberLineRange={numberLineRange}
        />
      </div>

      {/* Feedback section */}
      {feedback && (
        <div className={`p-4 rounded-lg text-center ${qualifies ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} mb-6`}>
          {feedback}
        </div>
      )}
    </div>
  );
};

export default PerformanceRangeAnalyzer;