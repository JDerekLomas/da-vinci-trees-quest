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
}

// Interface for input-box interactions
export interface InputBoxInteraction extends BaseInteraction {
  prefixText?: string;
  type: 'input-box';
  correctnessFunction: (inputValues: string | number) => boolean;
}

export interface DrumBeatsWithoutADSRInteraction extends BaseInteraction {
  type: 'drum-beats-without-adsr';
  kickInput?: Input;
  cymbalInput?: Input;
  tempoPresets?: Array<{
    name: string;
    kickBpm: number;
    cymbalBpm: number;
  }>;
  translations: {
    [key: string]: string;
  };
}

export interface AttackPhaseFunctionInteraction extends BaseInteraction {
  type: 'attack-phase-function';
  totalSteps: number;
  inputs: SliderInput[];
  translations: {
    [key: string]: string;
  };
}

export interface TransformationsOnKickDrumInteraction extends BaseInteraction {
  type: 'transformations-on-kick-drum';
  totalSteps: number;
  inputs: SliderInput[];
  translations: {
    [key: string]: string;
  };
}

export interface TransformationsOnCymbalInteraction extends BaseInteraction {
  type: 'transformations-on-cymbal';
  inputs: SliderInput[];
  translations: {
    [key: string]: string;
  };
}

export interface RemixBeatsWithADSRInteraction extends BaseInteraction {
  type: 'remix-beats-with-adsr';
  totalSteps: number;
  kickInput?: Input;
  cymbalInput?: Input;
  tempoPresets?: Array<{
    name: string;
    kickBpm: number;
    cymbalBpm: number;
  }>;
  adsrInputs: {
    kick: {
      [key: string]: SliderInput;
    };
    cymbal: {
      [key: string]: SliderInput;
    };
  };
  translations: {
    [key: string]: string;
  };
}

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
}
// Union type for all possible interactions
export type Interaction =
  | InputBoxInteraction
  | RadioButtonInteraction
  | FourInputBoxInteraction
  | TheADSREnvelop
  | DrumBeatsWithoutADSRInteraction
  | AttackPhaseFunctionInteraction
  | TransformationsOnKickDrumInteraction
  | TransformationsOnCymbalInteraction
  | RemixBeatsWithADSRInteraction;

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

export interface FourInputBoxInteraction extends BaseInteraction {
  prefixText1?: string;
  prefixText2?: string;
  prefixText3?: string;
  prefixText4?: string;
  label1?: string;
  label2?: string;
  label3?: string;
  label4?: string;
  type: 'four-input-box';
  correctnessFunction: (
    value1: string | number,
    value2: string | number,
    value3: string | number,
    value4: string | number,
  ) => boolean;
}

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value1?: string;
  value2?: string;
  value3?: string;
  value4?: string;
}

export interface TheADSREnvelop extends BaseInteraction {
  image: string;
  type: 'the-ADSR-envelop';
  longDescription: string;
  alt: string;
}
