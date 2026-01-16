// Interface for input elements
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
  disabled?: boolean;
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

// Interface for wind power data points
export type WindPowerDataPoint = {
  windSpeed: number;
  power: number;
};

// Interface for wind power data explorer interactions
export interface WindPowerDataExplorerInteraction extends BaseInteraction {
  type: 'wind-power-data-plot' | 'linear-model-fitting' | 'quadratic-model-fitting' | 'cubic-model-fitting';
  inputs: Input[];
  bestFit: Record<string, number>;
  getEquation: (paramObject: Record<string, number>) => string;
  getModelPoints: (data: WindPowerDataPoint[], paramObject: Record<string, number>) => WindPowerDataPoint[];
  getModelFit: (data: WindPowerDataPoint[], paramObject: Record<string, number>) => number;
  getAnnouncements: (id: string, pervValue: number, currValue: number) => string;
  showInputs?: boolean;
  showModelFit?: boolean;
  graphConfig: {
    ariaLabel: string;
    showScatterPlot: boolean;
    showLinePlot: boolean;
    showReferenceLine: boolean;
    xAxis: {
      labelValue?: string;
      domain?: number[];
    };
    yAxis: {
      labelValue?: string;
      domain?: number[];
    };
    scatter: {
      name: string;
    };
    line: {
      name: string;
    };
    tooltip: {
      xLabel: string;
      yLabel: string;
    };
  };
  translations: Record<string, string>;
}

export interface RegionDefinitionInteraction extends BaseInteraction {
  type: 'region-definition';
  inputs: Input[];
  getFeedback: (current: number, type: string) => string;
  mph: string;
  feedback: Record<string, string>;
  graphConfig: {
    ariaLabel: string;
    xAxis: {
      labelValue?: string;
      domain?: number[];
    };
    yAxis: {
      labelValue?: string;
      domain?: number[];
    };
    scatter: {
      name: string;
    };
    tooltip: {
      xLabel: string;
      yLabel: string;
    };
  };
}

export interface PolynomialModelExplorerInteraction extends BaseInteraction {
  type: 'polinomial-model-explorer';
  inputs: Input[];
  modelComponents: Record<string, { label: string; color: string; value: number; shape: string }>;
  graphConfig: {
    ariaLabel: string;
    xAxis: {
      labelValue?: string;
      domain?: number[];
    };
    yAxis: {
      labelValue?: string;
      domain?: number[];
    };
    scatter: {
      name: string;
    };
  };
  translations: Record<string, string>;
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
  options: RadioOptions[];
  correctnessFunction?: (selectedValue: string) => boolean;
  ariaLabel?: string;
}

export interface RadioOptions {
  value: string;
  label: string;
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
  | WindPowerDataExplorerInteraction
  | RegionDefinitionInteraction
  | PolynomialModelExplorerInteraction;
