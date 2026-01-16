// Interactive component interfaces for Da Vinci Trees quest

export interface DaVinciTreeInteraction {
  type: 'da-vinci-tree';
  title: string;
  ariaLabel: string;
}

export interface ConiferTreeInteraction {
  type: 'conifer-tree';
  title: string;
  ariaLabel: string;
}

export interface VolumeComparisonInteraction {
  type: 'volume-comparison';
  title: string;
  ariaLabel: string;
}

export interface CrossSectionRuleInteraction {
  type: 'cross-section-rule';
  title: string;
  ariaLabel: string;
}

export interface FormFactorInteraction {
  type: 'form-factor';
  title: string;
  ariaLabel: string;
}

export interface InputBoxInteraction {
  type: 'input-box';
  title: string;
  ariaLabel: string;
  correctnessFunction: (input: string | number) => boolean;
  prefixText?: string;
  suffixText?: string;
  placeholder?: string;
}

export interface RadioButtonInteraction {
  type: 'radio-button';
  title: string;
  prefixText?: string;
  ariaLabel?: string;
  options: {
    label: string;
    value: string;
  }[];
  correctnessFunction?: (selectedValue: string) => boolean;
}

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
}

export type InteractionType =
  | DaVinciTreeInteraction
  | ConiferTreeInteraction
  | VolumeComparisonInteraction
  | CrossSectionRuleInteraction
  | FormFactorInteraction
  | InputBoxInteraction
  | RadioButtonInteraction;
