import { useState, useContext, useEffect } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';
import { GameContext } from '../../../contexts/GameContext';
import interaction from '../configs/interactive-2';

interface RaceSegmentCalculatorProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

interface RaceSegmentCalculatorState {
  step: number;
}

const RaceSegmentCalculator: React.FC<RaceSegmentCalculatorProps> = ({ onInteraction }) => {
  const { t } = useTranslations();
  const { payload } = useEventListener('interactive-2');
  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};

  // Initialize state from interactiveResponses or default values
  const savedState =
    interactiveResponses?.interactive_2 && typeof interactiveResponses?.interactive_2 === 'object'
      ? (interactiveResponses?.interactive_2 as unknown as RaceSegmentCalculatorState)
      : undefined;

  // Initial segment data
  const [step, setStep] = useState<number>(savedState?.step ?? 0);
  const [segments, setSegments] = useState<{ id: number; name: string; range: string; distance: number; time: number; speed: number | null; color: string; fontColor: string; }[]>([
    { id: 1, name: "Segment 1", range: "0-50 m", distance: 50, time: 7.2, speed: null, color: "#60A5FA", fontColor: "#000f4c" },
    { id: 2, name: "Segment 2", range: "50-100 m", distance: 50, time: 6.4, speed: null, color: "#35d39a", fontColor: "#00360a" },
    { id: 3, name: "Segment 3", range: "100-150 m", distance: 50, time: 7.1, speed: null, color: "#FBBF24", fontColor: "#512e00" },
    { id: 4, name: "Segment 4", range: "150-200 m", distance: 50, time: 7.8, speed: null, color: "#F87171", fontColor: "#250000" }
  ]);

  const [calculated, setCalculated] = useState(false);
  const totalTime = 28.5;
  const [showRunner, setShowRunner] = useState(false);
  const [runnerPosition, setRunnerPosition] = useState(0);

  // Distance-Rate-Time Calculator states
  const [distance, setDistance] = useState('50');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [calculateFor, setCalculateFor] = useState('rate');
  const [calculationResult, setCalculationResult] = useState('');

  const colors = {
    "distance": "#E0002B",
    "speed": "#0061FC",
    "time": "#008217"
  }

  // Event Bus Controls
  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      setStep(payload.step as number);
    }
  }, [payload]);

  // Save state to context whenever relevant state changes
  useEffect(() => {
    if (!setInteractiveResponses) return;

    const currentState: RaceSegmentCalculatorState = {
      step: step
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setInteractiveResponses((prev: any) => ({
      ...prev,
      interactive_2: currentState,
    }));
  }, [step, setInteractiveResponses]);

  // Calculate speeds for all segments
  const calculateSpeeds = () => {
    onInteraction({
      'step-0-completed': true,
    });

    const updatedSegments = segments.map(segment => ({
      ...segment,
      speed: +(segment.distance / segment.time).toFixed(2)
    }));

    setSegments(updatedSegments);
    setCalculated(true);

    // Trigger the runner animation
    setTimeout(() => {
      setShowRunner(true);
      animateRunner();
    }, 500);
  };

  // Helper function to determine what should be calculated
  const updateCalculateFor = (d: string, r: string, t: string) => {
    if (d && r && !t) {
      setCalculateFor('time');
    } else if (d && !r && t) {
      setCalculateFor('rate');
    } else if (!d && r && t) {
      setCalculateFor('distance');
    }
  };

  // Animate runner along the track
  const animateRunner = () => {
    setRunnerPosition(0);
    let currentPosition = 0;

    const interval = setInterval(() => {
      if (currentPosition >= 100) {
        clearInterval(interval);
        return;
      }

      currentPosition += 1;
      setRunnerPosition(currentPosition);

    }, 50);
  };

  // Handle calculation for Distance-Rate-Time calculator
  const handleCalculate = () => {
    if (calculateFor === 'distance' && rate && time) {
      const result = parseFloat(rate) * parseFloat(time);
      setDistance(result.toFixed(2));
      setCalculationResult(`<p class="text-lg font-bold font-besley"><span style={{ color: colors.distance }}>Distance</span> = ${result.toFixed(2)} meters</p>`);

    }
    else if (calculateFor === 'rate' && distance && time) {
      const result = parseFloat(distance) / parseFloat(time);
      setRate(result.toFixed(2));
      setCalculationResult(`<p className="text-lg font-bold font-besley"><span style={{ color: colors.speed }}>Speed</span> = ${result.toFixed(2)} meters/second</p>`);
    }
    else if (calculateFor === 'time' && distance && rate) {
      const result = parseFloat(distance) / parseFloat(rate);
      setTime(result.toFixed(2));
      setCalculationResult(`<p class="text-lg font-bold font-besley"><span style={{ color: colors.time }}>Time</span> = ${result.toFixed(2)} seconds</p>`);
    }
    else {
      setCalculationResult('<p className="text-lg font-medium">Please enter exactly two values to calculate the third.</p>');
    }
  };

  const trashIcon = (width: number, height: number) => <svg aria-label={t(interaction.ariaDeleteIcon)} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
  return (
    <div className="mb-5">
      {/* Race Performance Visualization Header */}
      <div className="flex justify-between items-center w-full">
        <h2 className="text-xl max-[1000px]:text-base font-semibold text-black">{t(interaction.racePerformanceVisualization)}:</h2>
        <div className="flex items-center px-4 py-2 max-[1000px]:px-0 max-[1000px]:py-0" role="text" aria-label={`${t(interaction.ariaLabelCurrentTime)} and ${t(interaction.ariaLabelQualifyingTime)}`} tabIndex={0}>
          <span className="text-gray-700 mr-2 max-[1000px]:mr-0 max-[1000px]:text-base">{t(interaction.currentTime)}:</span>
          <span aria-hidden="true" className="font-bold text-xl text-black mr-4 max-[1000px]:mr-0 max-[1000px]:text-base">{totalTime}s</span><span className="sr-only">{totalTime} {t(interaction.seconds)}</span>
          <span className="mx-3 text-gray-400">|</span>
          <span className="text-gray-700 mr-2 ml-4 max-[1000px]:mr-0 max-[1000px]:ml-0 max-[1000px]:text-base">{t(interaction.qualifyingTime)}:</span>
          <span aria-hidden="true" className="font-bold text-xl text-black whitespace-nowrap max-[1000px]:text-base">&lt;= 26.0s</span><span className="sr-only">{t(interaction.lessThanOrEqualTo)} 26 {t(interaction.seconds)}</span>
        </div>
      </div>

      {/* Race Performance Visualization */}
      <div className="px-4">
        <div className="mb-6 mt-4 relative">
          <div className="h-20 w-full bg-gray-200 rounded-lg overflow-hidden flex">
            {segments.map((segment, index) => (
              <div
                key={segment.id}
                className="h-full flex items-center justify-center text-white font-bold relative"
                style={{
                  width: '25%',
                  backgroundColor: segment.color,
                  color: segment.fontColor,
                  borderRight: index < 3 ? '2px dashed white' : 'none'
                }}
                role="text"
                aria-label={`${t(interaction.ariaLabelSegment[segment.id - 1])}`}
                tabIndex={0}
              >
                <div aria-hidden="true" className="absolute top-1 text-xs md:text-base">{segment.range}</div>
                <div aria-hidden="true" className="text-base md:text-base">{segment.time}s</div>
              </div>
            ))}

            {/* Start/Finish markers */}
            <div className="absolute top-0 left-0 h-full w-1 bg-black z-10"></div>
            <div className="absolute top-0 right-0 h-full w-1 bg-black z-10"></div>

            {/* Runner icon - current performance */}
            {showRunner && (
              <div
                className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-100 z-20"
                style={{ left: `${runnerPosition}%` }}
              >
                <div className="h-10 w-10 rounded-full bg-indigo-700 border-2 border-white flex items-center justify-center text-white font-bold shadow-lg">
                  N
                </div>
              </div>
            )}

            {/* Qualifying line */}
            <div className="absolute top-0 h-full border-l-4 border-dashed border-gray-700 z-10" style={{ left: '91.2%' }}>
              <div className="absolute top-full mt-1 -ml-8 text-base font-bold text-black">26.0s</div>
            </div>
          </div>

          {/* Time scale below track */}
          <div className="w-full flex justify-between mt-2 px-0.5" aria-hidden="true">
            <div className="text-base ml-1">0s</div>
            <div className="text-base ml-6">7.2s</div>
            <div className="text-base ml-6">13.6s</div>
            <div className="text-base ml-6">20.7s</div>
            <div className="text-xs mr-1">28.5s</div>
          </div>
        </div>
      </div>

      {/* Speed comparison visualization */}
      {calculated && (
        <div className="mt-10 mb-4">
          <h3 className="text-lg font-semibold text-black mb-3 max-[1000px]:text-base">{t(interaction.speedAnalysisBySegment)}:</h3>
          <div className="h-16 w-full flex mt-6 px-4">
            {segments.map((segment) => (
              <div key={segment.id} className="flex-1 px-1">
                <div className="h-full flex flex-col items-center">
                  <div className="text-base font-medium text-black mb-1">{t(interaction.segment)} {segment.id}</div>
                  <div
                    className="w-full rounded-t-lg transition-all duration-500 ease-out flex items-end justify-center"
                    style={{
                      backgroundColor: segment.color,
                      height: `${(segment.speed! / 8) * 100}%`,
                    }}
                  >
                    <span aria-hidden="true" className={`text-${segment.fontColor} text-lg max-[900px]:text-base font-bold pb-1`}>{segment.speed} m/s</span><span className="sr-only">{segment.speed} {t(interaction.metersPerSeconds)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center gap-4 mb-8 max-[900px]:flex-col max-[900px]:gap-2 max-[870px]:mt-10">
        <button
          onClick={calculateSpeeds}
          disabled={calculated}
          className="bg-[#006be0] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#006ce0ee] font-bold disabled:bg-[#757575] disabled:cursor-not-allowed"
        >
          {t(interaction.calculateSpeedsAndAnalyzeRace)}
        </button>
        <button
          onClick={() => {
            setCalculated(false);
            setShowRunner(false);
            setRunnerPosition(0);
          }}
          disabled={calculated && runnerPosition !== 100}
          className="bg-white text-[#006be0] border border-[#006be0] px-6 py-3 rounded-lg shadow-md hover:bg-[#dbeafe] disabled:border-[#757575] disabled:cursor-not-allowed disabled:text-[#757575] disabled:hover:bg-gray-100"
        >
          {t(interaction.reset)}
        </button>
      </div>

      {step === 1 && (
        <>
      <div>
        <h3 className="text-xl max-[1000px]:text-base font-semibold text-black mb-2">{t(interaction.distanceSpeedTimeFormulas)}:</h3>
        <div className="flex flex-row justify-evenly text-center mt-4 gap-4 max-[960px]:gap-8 max-[960px]:flex-col max-[960px]:mt-10 max-[960px]:m-12">
          {/* Distance = Speed × Time */}
          <div role="text" aria-label={t(interaction.ariaLabelDistanceFormular)} tabIndex={0} className="flex items-center text-base italic font-bold font-besley justify-center border-r-2 max-[960px]:pb-4 max-[960px]:border-r-0 max-[960px]:border-b-2 pr-8">
            <span aria-hidden="true"><span style={{ color: colors.distance }}>{t(interaction.distance)}</span> = <span style={{ color: colors.speed }}>{t(interaction.speed)}</span> × <span style={{ color: colors.time }}>{t(interaction.time)}</span></span>
          </div>
          {/* Speed = Distance ÷ Time */}
          <div role="text" aria-label={t(interaction.ariaLabelSpeedFormular)} className="flex items-center text-base italic font-bold font-besley justify-center border-r-2 max-[960px]:border-r-0 max-[960px]:border-b-2  pr-10 max-[960px]:pb-4">
            <div aria-hidden="true" className="flex items-center text-base italic font-bold font-besley justify-center">
              <span className="mr-2"><span style={{ color: colors.speed }}>{t(interaction.speed)}</span> =</span>
              <span className="inline-flex flex-col items-center">
                <span style={{ color: colors.distance }}>{t(interaction.distance)}</span>
                <span className="border-t border-black w-full text-center" style={{ color: colors.time }}>{t(interaction.time)}</span>
              </span>
            </div>
          </div>
          {/* Time = Distance ÷ Speed */}
          <div role="text" aria-label={t(interaction.ariaLabelTimeFormular)} className="flex items-center text-base italic font-bold font-besley justify-center">
            <div aria-hidden="true" className="flex items-center text-base italic font-bold font-besley justify-center">
              <span className="mr-2"><span style={{ color: colors.time }}>{t(interaction.time)}</span> =</span>
              <span className="inline-flex flex-col items-center">
                <span style={{ color: colors.distance }}>{t(interaction.distance)}</span>
                <span className="border-t border-black w-full text-center" style={{ color: colors.speed }}>{t(interaction.speed)}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl max-[1000px]:text-base font-semibold text-black mb-4">{t(interaction.distanceSpeedTimeCalculator)}:</h3>
        <div className="flex flex-row justify-center gap-8 mb-6">
          <div className="w-full">
            <div className="flex justify-between items-start mb-2 min-h-12">
              <label className={`text-[${colors.distance}] font-besley font-bold italic text-base leading-tight`}>
                {t(interaction.distance)} ({t(interaction.meters)})
              </label>
              <button
                onClick={() => {
                  setDistance('');
                  updateCalculateFor('', rate, time);
                }}
                className="text-base text-gray-500 hover:text-red-500 flex-shrink-0"
              >
                {trashIcon(16, 16)}
              </button>
            </div>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter distance"
              value={distance}
              onChange={(e) => {
                if (Number(e.target.value) <= 1000) {
                  setDistance(e.target.value);
                  updateCalculateFor(e.target.value, rate, time);
                }
                else {
                  setDistance('1000');
                  updateCalculateFor('1000', rate, time);
                }
              }}
              min={0}
              max={1000}
            />
          </div>

          <div className="w-full">
            <div className="flex justify-between items-start mb-2 min-h-12">
              <label className={`text-[${colors.speed}] font-besley font-bold italic text-base leading-tight`}>
                {t(interaction.speed)} ({t(interaction.metersPerSecond)})
              </label>
              <button
                onClick={() => {
                  setRate('');
                  updateCalculateFor(distance, '', time);
                }}
                className="text-base text-gray-500 hover:text-red-500 flex-shrink-0"
              >
                {trashIcon(16, 16)}
              </button>
            </div>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter speed"
              value={rate}
              onChange={(e) => {
                if (Number(e.target.value) <= 1000) {
                  setRate(e.target.value);
                  updateCalculateFor(distance, e.target.value, time);
                }
                else {
                  setRate('1000');
                  updateCalculateFor(distance, '1000', time);
                }
              }}
              min={0}
              max={1000}
            />
          </div>

          <div className="w-full">
            <div className="flex justify-between items-start mb-2 min-h-12">
              <label className={`text-[${colors.time}] font-besley font-bold italic text-base leading-tight`}>
                {t(interaction.time)} ({t(interaction.seconds)})
              </label>
              <button
                onClick={() => {
                  setTime('');
                  updateCalculateFor(distance, rate, '');
                }}
                className="text-base text-gray-500 hover:text-red-500 flex-shrink-0"
              >
                {trashIcon(16, 16)}
              </button>
            </div>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              placeholder="Enter time"
              value={time}
              onChange={(e) => {
                if (Number(e.target.value) <= 1000) {
                  setTime(e.target.value);
                  updateCalculateFor(distance, rate, e.target.value);
                }
                else {
                  setTime('1000');
                  updateCalculateFor(distance, rate, '1000');
                }
              }}
              min={0}
              max={1000}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleCalculate}
            className={`px-6 py-3 rounded-lg text-white font-bold ${calculateFor === 'distance' ? 'bg-[#006be0] hover:bg-[#006ce0ee]' :
              calculateFor === 'rate' ? 'bg-[#006be0] hover:bg-[#006ce0ee]' :
                'bg-[#006be0] hover:bg-[#006ce0ee]'
              }`}
          >
            {t(interaction.calculate)}
          </button>
        </div>

        {calculationResult && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-black mb-4">{t(interaction.solutionLabel)}:</h3>
            <div>
              {calculateFor === 'distance' && rate && time && (
                <>
                  <p className="text-lg font-bold font-besley italic flex flex-wrap items-center">
                    <span className="mr-2" style={{ color: colors.distance }}>{t(interaction.distance)}</span>
                    <span className="mr-2">=</span>

                    <span className="mr-2" style={{ color: colors.speed }}>{t(interaction.speed)}</span>
                    <span className="mx-1">×</span>
                    <span className="ml-2" style={{ color: colors.time }}>{t(interaction.time)}</span>
                  </p>

                  <p className="text-lg font-bold font-besley flex flex-wrap items-center mt-4">
                    <span className="mr-2 italic" style={{ color: colors.distance }}>{t(interaction.distance)}</span>
                    <span className="mr-2">=</span>

                    <span className="whitespace-nowrap mr-2" style={{ color: colors.speed }}>
                      {rate} {t(interaction.metersPerSecond)}
                    </span>
                    <span className="mx-1">×</span>
                    <span className="whitespace-nowrap ml-2" style={{ color: colors.time }}>
                      {time} {t(interaction.seconds)}
                    </span>
                  </p>

                  <p className="text-lg font-bold font-besley flex flex-wrap items-center mt-4">
                    <span className="mr-2 italic" style={{ color: colors.distance }}>{t(interaction.distance)}</span>
                    <span className="mr-2">=</span>

                    <span className="whitespace-nowrap">
                      {(parseFloat(rate) * parseFloat(time)).toFixed(2)} {t(interaction.meters)}
                    </span>
                  </p>
                </>
              )}
              {calculateFor === 'rate' && distance && time && (
                <>
                  <p className="text-lg font-bold font-besley flex items-center flex-wrap">
                    <span className="mr-2 italic" style={{ color: colors.speed }}>{t(interaction.speed)}</span>
                    <span className="mr-2">=</span>

                    <span className="inline-flex flex-col items-center justify-center mx-1" style={{ color: colors.distance }}>
                      <span>{t(interaction.distance)}</span>
                      <span className="border-t border-black w-full text-center" style={{ color: colors.time }}>
                        {t(interaction.time)}
                      </span>
                    </span>
                  </p>
                  <p className="text-lg font-bold font-besley flex items-center flex-wrap mt-4">
                    <span className="mr-2 italic" style={{ color: colors.speed }}>{t(interaction.speed)}</span>
                    <span className="mr-2">=</span>

                    <span className="inline-flex flex-col items-center justify-center mx-1" style={{ color: colors.distance }}>
                      <span>{distance} {t(interaction.meters)}</span>
                      <span className="border-t border-black w-full text-center" style={{ color: colors.time }}>
                        {time} {t(interaction.seconds)}
                      </span>
                    </span>
                  </p>

                  <p className="text-lg font-bold font-besley flex items-center flex-wrap mt-4">
                    <span className="mr-2 italic" style={{ color: colors.speed }}>{t(interaction.speed)}</span>
                    <span className="mr-2">=</span>

                    <span>
                      {(parseFloat(distance) / parseFloat(time)).toFixed(2)} {t(interaction.metersPerSecond)}
                    </span>
                  </p>
                </>
              )}
              {calculateFor === 'time' && distance && rate && (
                <>
                  <p className="text-lg font-bold font-besley italic flex items-center flex-wrap">
                    <span className="mr-2" style={{ color: colors.time }}>{t(interaction.time)}</span>
                    <span className="mr-2">=</span>

                    <span className="inline-flex flex-col items-center justify-center mx-1" style={{ color: colors.distance }}>
                      <span>{t(interaction.distance)}</span>
                      <span className="border-t border-black w-full text-center" style={{ color: colors.speed }}>
                        {t(interaction.speed)}
                      </span>
                    </span>
                  </p>

                  <p className="text-lg font-bold font-besley flex items-center flex-wrap mt-4">
                    <span className="mr-2 italic" style={{ color: colors.time }}>{t(interaction.time)}</span>
                    <span className="mr-2">=</span>

                    <span className="inline-flex flex-col items-center justify-center mx-1" style={{ color: colors.distance }}>
                      <span>{distance} {t(interaction.meters)}</span>
                      <span className="border-t border-black w-full text-center" style={{ color: colors.speed }}>
                        {rate} {t(interaction.metersPerSecond)}
                      </span>
                    </span>
                  </p>

                  <p className="text-lg font-bold font-besley  flex items-center flex-wrap mt-4">
                    <span className="mr-2 italic" style={{ color: colors.time }}>{t(interaction.time)}</span>
                    <span className="mr-2">=</span>

                    <span>
                      {(parseFloat(distance) / parseFloat(rate)).toFixed(2)} {t(interaction.seconds)}
                    </span>
                  </p>
                </>
              )}
              {!(
                (calculateFor === 'distance' && rate && time) ||
                (calculateFor === 'rate' && distance && time) ||
                (calculateFor === 'time' && distance && rate)
              ) && (
                  <p className="text-lg font-medium">{t(interaction.pleaseEnterExactlyTwoValuesToCalculateTheThird)}</p>
                )}
            </div>
          </div>
        )}
      </div>
        </>
      )}

    </div>
  );
};

export default RaceSegmentCalculator;