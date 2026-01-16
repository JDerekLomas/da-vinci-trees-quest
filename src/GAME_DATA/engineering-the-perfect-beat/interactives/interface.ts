interface InputElement {
  id: string;
  type: string;
  arialLabel?: string;
}

// Interface for slider input elements
export interface SliderInput extends InputElement {
  type: 'slider';
  label: string;
  min: number;
  max: number;
  value: number;
  step?: number;
  unit?: string;
}

// Union type for all possible inputs
export type Input = SliderInput;

// Base interface for common properties
export interface BaseInteraction {
  title?: string;
  type: string;
  ariaLabel?: string;
  hint?: string;
  correctnessFunction?: (inputValues: string | number) => boolean;
}

// Interface for input-box interactions
export interface InputBoxInteraction extends BaseInteraction {
  prefixText?: string;
  type: 'input-box';
  correctnessFunction: (inputValues: string | number) => boolean;
}

// Interface for radio button interactions
export interface RadioButtonInteraction {
  title: string;
  prefixText?: string;
  type: 'radio-button';
  options: { value: string; label: string }[];
  correctnessFunction?: (selectedValue: string) => boolean;
  ariaLabel?: string;
}

// Interface for sound wave visualizer interactions
export interface SoundWaveVisualizerInteraction extends BaseInteraction {
  type: 'sound-wave-visualizer';
  graphDescription1: string;
  graphDescription2: string;
  currentSelection: string;
  tableHeaders: {
    source: string;
    pressure: string;
    scaled: string;
    log: string;
  };
  tabs: {
    linear: string;
    log: string;
  };
  descriptions: {
    linear: string;
    log: string;
  };
  data: {
    [key: string]: string | number;
  };
  srRowDescription: string;
  soundSource: string;
  logarithmicScale: string;
  scaledPressure: string;
  dataPointFor: string;
  previous: string;
  next: string;
}

// Union type for all possible interactions
export type Interaction = InputBoxInteraction | RadioButtonInteraction | SoundWaveVisualizerInteraction;

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
}

export interface InteractionComponentProps {
  interaction: Interaction;
  onInteractionChange: (state: InteractionState) => void;
}

// Data interfaces
export interface SoundPressureData {
  source: string;
  pressure: number;
  scaled: number;
  log: number;
}

export interface IntensityData {
  intensity: number;
  decibels: number;
}

export interface IntensityConfig {
  title: string;
  flipButton: {
    label: string;
    icon: string;
  };
  formulas: {
    intensityToDb: string;
    dbToIntensity: string;
  };
  sliders: {
    intensity: {
      label: string;
      min: number;
      max: number;
      step: number;
      unit: string;
    };
    decibels: {
      label: string;
      min: number;
      max: number;
      step: number;
      unit: string;
    };
  };
  tooltips: {
    intensity: string;
    decibels: string;
  };
  axes: {
    intensity: string;
    decibels: string;
  };
  note: string;
  majorTicks: number[];
}

export interface SoundLevelData {
  id: number;
  x: number;
  y: number;
  name: string;
}

export interface SoundLevelConfig {
  title: string;
  formulaDescription: string;
  formula: string;
  formulaExplanation: (speakerCount: number) => string;
  SPEAKER_WIDTH: number;
  SPEAKER_Y: number;
  MIN_DB: number;
  MAX_DB: number;
  listeners: SoundLevelData[];
  speakerOptions: number[];
  sliderLabel: string;
  combinedSoundLevel: string;
  baseLevelPerSpeaker: string;
  recommendedAction: string;
  levelGuideTitle: string;
  levelGuide: { label: string; color: string }[];
  exposureLimits: {
    danger: string;
    optimal: string;
    low: string;
  };
  safetyInfo: {
    danger: { label: string; description: string; color: string };
    optimal: { label: string; description: string; color: string };
    low: { label: string; description: string; color: string };
  };
}

export interface WavefrontProps {
  radius: number;
  intensity: number;
}

export interface RaysProps {
  distance: number;
}

export interface Scene3DProps {
  distance: number;
}

export interface ControlsProps {
  distance: number;
  onDistanceChange: (value: number) => void;
}

export interface InverseSquareConfig {
  title: string;
  ariaLabel: string;
  chartAriaLabel: string;
  xAxisLabel: string;
  yAxisLabel: string;
  tooltipIntensityLabel: string;
  tooltipDistanceLabel: string;
}
