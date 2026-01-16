export interface Input {
  id: string;
  label: string;
  type?: 'slider' | 'number';
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}
export interface RadioButtonInteraction {
  title: string;
  prefixText?: string;
  type: 'radio-button';
  options: { value: string; label: string }[];
  correctnessFunction: (selectedValue: string) => boolean;
  ariaLabel?: string;
}

export interface BaseInteraction {
  title: string;
  type: string;
  ariaLabel: string;
  hint?: string;
  correctnessFunction?: (inputValues: string | number) => boolean;
}

export interface InputBoxInteraction extends BaseInteraction {
  prefixText?: string;
  type: 'input-box';
  correctnessFunction: (inputValues: string | number) => boolean;
  placeholder_1?: string;
  placeholder_2?: string;
}

export interface HeartRateCalculatorInteraction {
  zones: {
    veryLight: Zone;
    light: Zone;
    moderate: Zone;
    high: Zone;
    maximal: Zone;
  };
  translations: {
    age: string;
    years: string;
    heartRate: string;
    bpm: string;
    maxHeartRateFormula: string;
    mhr: string;
    currentZone: string;
    outsideZones: string;
    adjustIntensityMessage: string;
    lowerLimit: string;
    upperLimit: string;
    isText: string;
  };
}

export interface Range {
  label: string;
  lower: {
    value: number;
    label: string;
  };
  upper: {
    value: number;
    label: string;
  };
}

export interface PerformanceRangeAnalyzerInteraction extends BaseInteraction {
  type: 'performance-range-analyzer';
  lowerTimeInput: Input;
  upperTimeInput: Input;
  improvementInput: {
    id: string;
    label: string;
  };
  currentTimeRange: Range;
  targetTimeRange: Range;
  goalTimeRange: Range;
}

export interface AbsoluteValueConverterInteraction extends BaseInteraction {
  type: 'absolute-value-converter';
  lowerBoundInput: Input;
  upperBoundInput: Input;
  rangeVisualizationLabel: string;
  absoluteValueLabel: string;
  middlePoint: {
    heading: string;
    label: string;
    formula: string;
  };
  deviation: {
    heading: string;
    label: string;
    formula: string;
  };
}

export type Interaction =
  | InputBoxInteraction
  | PerformanceRangeAnalyzerInteraction
  | AbsoluteValueConverterInteraction
  | HeartRateCalculatorInteraction
  | RunningCalculatorInteraction
  | RadioButtonInteraction;

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
}

export interface InteractionComponentProps {
  interaction: Interaction;
  onInteractionChange: (state: InteractionState) => void;
}

export interface RunningCalculatorInteraction {
  prDistanceInput: Input;
  prTimeInput: Input;
  targetDistanceInput: Input;
  labels: {
    pace: string;
    targetTime: string;
    currentRun: string;
    targetRun: string;
  };
}

export interface RunningCalculatorProps {
  interaction: RunningCalculatorInteraction;
}

export interface Calculations {
  speed: number;
  pace: number;
  targetTime: number;
}

export interface ProgressRingProps {
  size: number;
  progress: number;
  time: number;
  distance: number;
  isAnimating: boolean;
  label: string;
}

export interface CustomTooltipProps {
  title?: string;
  content: string;
  children: React.ReactNode;
}

export interface ZoneMessages {
  message1: string;
  message2: string;
  message3: string;
}

export interface Zone {
  name: string;
  min: number;
  max: number;
  textColor: string;
  emoji: string;
  pulseSpeed: number;
  messages: ZoneMessages;
}
