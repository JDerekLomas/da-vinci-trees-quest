import { useContext, useState, useEffect } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import interaction from '../configs/interactive2a';
import { ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import { useEventListener } from '../../../hooks/useEventListener';
import { GameContext } from '../../../contexts/GameContext';

interface PolynomialExplorerProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

interface PolynomialExplorerState {
  step: number;
  showMisconception?: boolean;
}

// Add interface for data points
interface DataPoint {
  windSpeed: number;
  modelPower: number;
}

// Add interface for coefficients
interface Coefficients {
  linear: number;
  quadratic: number;
}

// Add type for model types
type ModelType = 'linear' | 'quadratic' | 'cubic_misconception' | 'combined_correct';

// Add interface for CustomSlider props
interface CustomSliderProps {
  id: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (values: number[]) => void;
}

// Add interface for CoefficientControl props
interface CoefficientControlProps {
  id: string;
  type: keyof Coefficients;
  label: string;
  color?: string;
}

const MODEL_COLORS = {
  linear: '#c4458b', // Pink-400
  quadratic: '#633300', // Blue-400
  cubic_misconception: '#de3238', // Red-400
  combined_correct: '#008933', // Green-400
};

const PolynomialExplorer: React.FC<PolynomialExplorerProps> = () => {
  const { t } = useTranslations();
  const { payload } = useEventListener('interactive2a');
  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};

  // Initialize state from interactiveResponses or default values
  const savedState =
    interactiveResponses?.interactive2a && typeof interactiveResponses?.interactive2a === 'object'
      ? (interactiveResponses?.interactive2a as unknown as PolynomialExplorerState)
      : undefined;

  const [step, setStep] = useState(savedState?.step ?? 1);
  const [coefficients, setCoefficients] = useState<Coefficients>({
    linear: 60.0, // Initial value set to 60
    quadratic: 20.0, // Initial value set to 20
  });

  const [yAxisMax, setYAxisMax] = useState(3600);

  // Y-axis slider min and max values
  const yAxisSliderMin = 3600;
  const yAxisSliderMax = 20000;
  const [showMisconception, setShowMisconception] = useState(savedState?.showMisconception ?? false);

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      const newStep = payload.step as number;
      setStep(newStep);

      if (newStep === 1) {
        setYAxisMax(3600);
      }
      // Automatically show misconception when step 3 is reached
      if (newStep === 3) {
        setShowMisconception(true);
      }
    }
  }, [payload]);

  useEffect(() => {
    if (!setInteractiveResponses) return;

    const currentState: PolynomialExplorerState = {
      step: step,
      showMisconception: showMisconception,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setInteractiveResponses((prev: any) => ({
      ...prev,
      interactive2a: currentState,
    }));
  }, [step, showMisconception, setInteractiveResponses]);

  const calculateTermValue = (x: number, type: ModelType): number | null => {
    const { linear, quadratic } = coefficients;

    switch (type) {
      case 'linear':
        return linear * x;
      case 'quadratic':
        return quadratic * Math.pow(x, 2);
      case 'cubic_misconception': {
        // This implements the misconception - combines coefficients into a cubic term
        const value = (linear + quadratic) * Math.pow(x, 3);
        // Return null instead of a value if it exceeds the y-axis max
        // This will cause the line to stop rather than continue horizontally
        return value > yAxisMax ? null : value;
      }
      case 'combined_correct': {
        // The correct way - add the terms
        const value = linear * x + quadratic * Math.pow(x, 2);
        return value > yAxisMax ? null : value;
      }
      default:
        return 0;
    }
  };

  const generateModelPoints = (type: ModelType): DataPoint[] => {
    const points: DataPoint[] = [];
    const xMax = 12;

    for (let x = 0; x <= xMax; x += 0.001) {
      const roundedX = parseFloat(x.toFixed(1));
      const modelPower = calculateTermValue(roundedX, type);

      if (modelPower !== null) {
        points.push({
          windSpeed: roundedX,
          modelPower: parseFloat(modelPower.toFixed(1)),
        });
      } else {
        // When we hit a null value, stop generating points
        break;
      }
    }

    return points;
  };

  const toggleMisconception = () => {
    if (step === 2 || step === 3) {
      setShowMisconception(!showMisconception);
    }
  };

  // Custom Slider component
  const CustomSlider: React.FC<CustomSliderProps> = ({ id, value, min, max, step, onChange }) => {
    return (
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange([parseInt(e.target.value)])}
          id={id}
          className="global-slider"
          style={{
            background: `linear-gradient(to right, #007bff ${((value - min) / (max - min)) * 100}%, #949494 ${((value - min) / (max - min)) * 100}%)`,
          }}
        />
      </div>
    );
  };

  const CoefficientControl: React.FC<CoefficientControlProps> = ({ id, type, label }) => {
    const value = coefficients[type] || 0;
    const isDisabled = step === 2;

    return (
      <div className="h-full">
        <div className="">
          <div className="flex justify-between items-center mb-4 mr-4">
            <label htmlFor={id} className="font-bold text-lg">
              {label}
            </label>
            <span className="text-lg">{value}</span>
          </div>

          {step === 1 && (
            <div className="sliderContainer mr-4 mt-4">
              <input
                id={id}
                type="range"
                min={0}
                max={100}
                value={value}
                onChange={(e) => {
                  const newValue = parseFloat(e.target.value);
                  if (!isNaN(newValue)) {
                    setCoefficients((prev) => ({ ...prev, [type]: newValue }));
                  }
                }}
                className="w-full global-slider"
                style={{
                  background: `linear-gradient(to right, #007bff ${((value - 0) / (100 - 0)) * 100}%, #949494 ${((value - 0) / (100 - 0)) * 100}%)`,
                }}
                disabled={isDisabled}
              />
            </div>
          )}

          {type === 'linear' ? (
            <p className="text-lg text-black mt-4 font-besley font-bold">
              <i>
                <span className="text-[#E0002B]">P</span>
              </i>
              (
              <i>
                <span className="text-[#0061FC]">v</span>
              </i>
              ) = {value.toFixed(1)}{' '}
              <i>
                <span className="text-[#0061FC]">v</span>
              </i>
            </p>
          ) : (
            <p className="text-lg text-black mt-4 font-besley font-bold">
              <i>
                <span className="text-[#E0002B]">P</span>
              </i>
              (
              <i>
                <span className="text-[#0061FC]">v</span>
              </i>
              ) = {value.toFixed(1)}{' '}
              <i>
                <span className="text-[#0061FC]">
                  v<sup>2</sup>
                </span>
              </i>
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="grid gap-6 pt-4">
        <div className="">
          {step === 1 ? (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <CoefficientControl
                id="linearCoefficient"
                type="linear"
                label={t(interaction.linearTerm)}
                color={MODEL_COLORS.linear}
              />
              <CoefficientControl
                id="quadraticCoefficient"
                type="quadratic"
                label={t(interaction.quadraticTerm)}
                color={MODEL_COLORS.quadratic}
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-lg">{t(interaction.correctCombinedPolynomial)}</span>
                    </div>
                    <p className="text-base text-black font-besley font-bold">
                      <i>
                        <span className="text-[#E0002B]">P</span>
                      </i>
                      (
                      <i>
                        <span className="text-[#0061FC]">v</span>
                      </i>
                      ) = {coefficients.linear.toFixed(1)}{' '}
                      <i>
                        <span className="text-[#0061FC]">v</span>
                      </i>{' '}
                      + {coefficients.quadratic.toFixed(1)}{' '}
                      <i>
                        <span className="text-[#0061FC]">
                          v<sup>2</sup>
                        </span>
                      </i>
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg">{t(interaction.misconceptionHeading)}</span>
                  </div>
                  <p className="text-base text-black font-besley font-bold">
                    <i>
                      <span className="text-[#E0002B]">P</span>
                    </i>
                    (
                    <i>
                      <span className="text-[#0061FC]">v</span>
                    </i>
                    ) = {(coefficients.linear + coefficients.quadratic).toFixed(1)}{' '}
                    <i>
                      <span className="text-[#0061FC]">
                        v<sup>3</sup>
                      </span>
                    </i>
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  className="px-2 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-4 lg:py-2 bg-[#006BE0] hover:bg-blue-600 text-white"
                  onClick={toggleMisconception}
                >
                  {showMisconception ? t(interaction.hideMisconception) : t(interaction.showMisconception)}
                </button>
              </div>

              <div className="mt-2">
                <label htmlFor="yAxisMaxSlider" className="block text-base font-medium text-black mb-2">
                  <strong>{t(interaction.yAxisScale)}:</strong> {yAxisMax}
                </label>
                <div className="px-2">
                  <CustomSlider
                    id="yAxisMaxSlider"
                    value={yAxisMax}
                    max={yAxisSliderMax}
                    min={yAxisSliderMin}
                    step={400}
                    onChange={(values) => setYAxisMax(values[0])}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="">
          <div className="h-full">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="120%">
                <ComposedChart margin={{ top: 10, right: 10, bottom: 15, left: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="windSpeed"
                    type="number"
                    domain={[0, 12]}
                    label={{
                      value: t(interaction.xLabel),
                      position: 'bottom',
                      offset: 0,
                      fill: '#4b5563',
                      style: { textAnchor: 'middle' },
                    }}
                    tick={{ fill: '#4b5563' }}
                    tickFormatter={(value) => Math.ceil(value).toLocaleString()}
                  />
                  <YAxis
                    type="number"
                    domain={[0, yAxisMax]}
                    label={{
                      value: t(interaction.yLabel),
                      angle: -90,
                      position: 'insideLeft',
                      offset: -22,
                      style: { textAnchor: 'middle' },
                      fill: '#4b5563',
                    }}
                    tick={{ fill: '#4b5563' }}
                    tickFormatter={(value) => Math.ceil(value).toLocaleString()}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem',
                    }}
                    formatter={(value, name) => {
                      if (name === 'Linear Term') {
                        return [
                          <div key="linear" className="text-black">
                            {`${t(interaction.linearTerm)}:`} <strong className={`text-[#c4458b]`}>{value}</strong>
                          </div>,
                        ];
                      }
                      if (name === 'Quadratic Term') {
                        return [
                          <div key="quadratic" className="text-black">
                            {`${t(interaction.quadraticTerm)}:`}{' '}
                            <strong className={`text-[#633300]`}>{value}</strong>
                          </div>,
                        ];
                      }
                      if (name === 'Correct Combined') {
                        return [
                          <div key="combined_correct" className="text-black">
                            {`${t(interaction.correctCombined)}:`}{' '}
                            <strong className={`text-[#008933]`}>{value}</strong>
                          </div>,
                        ];
                      }
                      if (name === 'Misconception (v³)') {
                        return [
                          <div key="cubic_misconception" className="text-black">
                            {`${t(interaction.misconception)}:`}{' '}
                            <strong className={`text-[#de3238]`}>{value}</strong>
                          </div>,
                        ];
                      }
                      return [value, name];
                    }}
                    labelFormatter={(label) => (
                      <div className="text-black">
                        {`${t(interaction.windSpeed)}:`} <strong className="text-[#0061FC]">{label} m/s</strong>
                      </div>
                    )}
                    separator=""
                  />
                  <Legend verticalAlign="top" offset={1} />

                  {step === 1 && (
                    <>
                      <Line
                        name={t(interaction.linearTerm)}
                        data={generateModelPoints('linear')}
                        dataKey="modelPower"
                        stroke={MODEL_COLORS.linear}
                        strokeWidth={3}
                        dot={false}
                      />
                      <Line
                        name={t(interaction.quadraticTerm)}
                        data={generateModelPoints('quadratic')}
                        dataKey="modelPower"
                        stroke={MODEL_COLORS.quadratic}
                        strokeWidth={3}
                        dot={false}
                      />
                    </>
                  )}

                  {step >= 2 && (
                    <>
                      <Line
                        name={t(interaction.correctCombined)}
                        data={generateModelPoints('combined_correct')}
                        dataKey="modelPower"
                        stroke={MODEL_COLORS.combined_correct}
                        strokeWidth={3}
                        dot={false}
                      />

                      {showMisconception && (
                        <Line
                          name={t(interaction.misconception)}
                          data={generateModelPoints('cubic_misconception')}
                          dataKey="modelPower"
                          stroke={MODEL_COLORS.cubic_misconception}
                          strokeWidth={3}
                          strokeDasharray="5 5"
                          dot={false}
                        />
                      )}
                    </>
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolynomialExplorer;
