export interface Input {
  id: string;
  label?: string;
  type?: 'button' | 'slider' | 'number';
  min?: number;
  max?: number;
  step?: number;
  defaultValue: number;
}

export interface BaseInteraction {
  title: string;
  type: string;
  ariaLabel: string;
  hint?: string;
}

export interface InputBoxInteraction extends BaseInteraction {
  prefixText?: string;
  type: 'input-box';
  correctnessFunction: (inputValues: string | number) => boolean;
  postfixText?: string;
}

export type Interaction = InputBoxInteraction | TwoInputBoxInteraction | RadioButtonInteraction;

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
  value2?: string;
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

export interface TwoInputBoxInteraction extends BaseInteraction {
  prefixText1?: string;
  prefixText2?: string;
  type: 'two-input-box';
  correctnessFunction: (value1: string | number, value2: string | number) => boolean;
  postfixText1?: string;
  postfixText2?: string;
}

export interface InteractionComponentProps {
  interaction: Interaction;
  onInteractionChange: (state: InteractionState) => void;
}
