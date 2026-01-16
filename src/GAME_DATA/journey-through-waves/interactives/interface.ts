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

export interface HarmonicInput extends InputElement {
  type: 'harmonic-input';
  label: string;
  color: string;
  enabled: boolean;
  freq: number;
  freqMul: number;
  phase: SliderInput;
  amplitude: SliderInput;
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

export interface CircleToWaveVisualizerInteraction extends BaseInteraction {
  type: 'circle-to-wave-visualizer';
  angleInput: Input;
  speedInput: Input;
  interactiveConstants: {
    [key: string]: number;
  };
  specialAngles: {
    [key: number]: { sin: string; cos: string };
  };
  translations: {
    [key: string]: string;
  };
}

export interface HarmonicSeriesBuilderInteraction extends BaseInteraction {
  type: 'harmonic-series-builder';
  harmonicInputs: Input[];
  waveTypes: Array<{ label: string; value: string }>;
  harmonicConfig: Array<{ id: string; color: string; shape: string }>;
  translations: {
    [key: string]: string;
  };
}

export interface BeatFrequencyDemoInteraction extends BaseInteraction {
  type: 'beat-frequency-demo';
  freqInputs: Input[];
  translations: {
    [key: string]: string;
  };
  ratios?: {
    [key: string]: {
      name: string;
      description: string;
      ratio: number;
    };
  };
}

export interface FourierVisualizerInteraction extends BaseInteraction {
  type: 'fourier-visualizer';
  translations: {
    [key: string]: string;
  };
  baseFreq: number;
  harmonicInputs: HarmonicInput[];
  waveTypes: Array<{ label: string; value: string }>;
  getInitialHarmonics: (type: string) => Array<{
    id: string;
    amp: number;
    phase: number;
    freqMul: number;
  }>;
}

export interface SOHCAHTOAVisualizerInteraction extends BaseInteraction {
  type: 'sohcahtoa-visualizer';
  angleInput?: Input;
  functions: Array<{
    value: string;
    label: string;
    mnemonic: string;
    formula: string;
  }>;
  interactiveConstants: {
    [key: string]: number;
  };
  colors: {
    [key: string]: { opposite: string; adjacent: string; hypotenuse: string };
  };
  translations: {
    [key: string]: string;
  };
}

// Union type for all possible interactions
export type Interaction =
  | InputBoxInteraction
  | RadioButtonInteraction
  | CircleToWaveVisualizerInteraction
  | HarmonicSeriesBuilderInteraction
  | BeatFrequencyDemoInteraction
  | FourierVisualizerInteraction
  | SOHCAHTOAVisualizerInteraction;

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
}
export interface InteractionComponentProps {
  interaction: Interaction;
  onInteractionChange: (state: InteractionState) => void;
}

export interface RadioButtonInteraction {
  title: string;
  prefixText?: string;
  type: 'radio-button';
  options: { value: string; label: string }[];
  correctnessFunction?: (selectedValue: string) => boolean;
  ariaLabel?: string;
}
