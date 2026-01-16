export interface Input {
  id: string;
  label: string;
  type: 'slider' | 'number';
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export interface FormulaDisplay {
  label: string;
  formula: (inputValues: { [key: string]: number }) => string;
}

// Base interface for common properties
export interface BaseInteraction {
  title: string;
  type: string;
  ariaLabel: string;
  hint?: string;
  correctnessFunction?: (inputValues: string | number) => boolean;
}

// Interface for graph-based interactions
export interface GraphBasedInteraction extends BaseInteraction {
  type:
    | 'revenue-function-generator'
    | 'cost-function-calculator'
    | 'break-even-analysis'
    | 'exponential-model-finder';
  inputs: {
    id: string;
    label: string;
    ariaLabel: string;
    type: 'slider' | 'number';
    min: number;
    max: number;
    step: number;
    defaultValue: number;
  }[];
  graph_config: {
    x: {
      min: number;
      max: number;
      label: string;
    };
    y: {
      min: number;
      max: number;
      label: string;
    };
  };
  formulas: {
    [key: string]: (x: number, inputValues: { [key: string]: number }) => number;
  };
  labels: {
    [key: string]: string;
  };
  displayFormulas: {
    label: string;
    formula: (inputValues: { [key: string]: number }) => string;
  }[];
}

// Interface for fill-in-the-blank interactions
export interface FillInTheBlankInteraction extends BaseInteraction {
  type: 'exponential-function';
  fill_in_the_blank_config: {
    subtitle?: string;
    equation?: string;
    input: {
      leftText: string;
      rightText: string;
      placeholder: string;
      defaultValue?: number;
    };
    buttonText: string;
    resultPrefix: string;
    resultSuffix: string;
    calculateResult: (input: string) => number | null;
  };
}

// Interface for holographic-table interactions
export interface HoloGraphicTableInteraction extends BaseInteraction {
  type: 'holographic-table';
  data: {
    firstCol: number;
    secondCol: number;
  }[];
}

export interface FormulaDisplay {
  label: string;
  formula: (inputValues: { [key: string]: number }) => string;
}

// Interface for input-box interactions
export interface InputBoxInteraction extends BaseInteraction {
  prefixText?: string;
  type: 'input-box';
  correctnessFunction: (inputValues: string | number) => boolean;
}

// Union type for all possible interactions
export type Interaction =
  | InputBoxInteraction
  | GraphBasedInteraction
  | FillInTheBlankInteraction
  | HoloGraphicTableInteraction;

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
}
export interface InteractionComponentProps {
  interaction: Interaction;
  onInteractionChange: (state: InteractionState) => void;
}

interface LineChartCustomDotPropsPayload {
  day: number;
  cases: number;
}

export interface LineChartCustomDotProps {
  cx?: number;
  cy?: number;
  payload?: LineChartCustomDotPropsPayload;
  fill?: string;
  strokeWidth?: number;
  isActive?: boolean;
}
