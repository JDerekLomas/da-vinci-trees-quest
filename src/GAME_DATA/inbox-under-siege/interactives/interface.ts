export interface Input {
  id: string;
  label: string;
  type: 'slider' | 'number';
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

// Base interface for common properties
export interface BaseInteraction {
  title: string;
  type: string;
  ariaLabel: string;
  hint?: string;
  correctnessFunction?: (inputValues: string | number) => boolean;
}

// Interface for input-box interactions
export interface InputBoxInteraction extends BaseInteraction {
  prefixText?: string;
  type: 'input-box';
  correctnessFunction: (inputValues: string | number) => boolean;
}

// Union type for all possible interactions
export type Interaction = InputBoxInteraction;

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
}

export type SpamOrNotSpamCategory = 'spam' | 'notSpam';

export interface ThresholdData {
  threshold: number;
  cost: number;
  spamMisses: number;
  legitMisses: number;
}
