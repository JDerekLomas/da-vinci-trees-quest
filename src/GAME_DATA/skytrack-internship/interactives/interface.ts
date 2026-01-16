export interface SliderConfig {
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export interface TextboxConfig {
  prefix?: string;
  min: number;
  max: number;
}

export interface Input {
  id: string;
  type: 'slider' | 'textbox';
  title?: string;
  label: string;
  titleColor?: string;
  sliderConfig?: SliderConfig;
  textboxConfig?: TextboxConfig;
}

export interface YAxisConfig {
  label: string;
  ticks?: number[];
}

export interface XAxisConfig extends YAxisConfig {
  min: number;
  max: number;
  steps: number;
  tooltipLabel: string;
  tooltipLabelValue: string;
}

export interface ReferenceArea {
  start: number;
  end: number;
  fillColor: string;
  fillOpacity: number;
}

export interface ReferenceLine {
  value: number;
  stroke: string;
  label?: string;
}

export interface Line {
  dataKey: string;
  stroke: string;
  name: string;
  tooltipLabel: string;
  calculateYValue: (xValue: number, inputValues?: Record<string, number>) => number;
}

export interface GraphConfig {
  title?: string;
  ariaLabel?: string;
  x: XAxisConfig;
  y: YAxisConfig;
  referenceAreas?: ReferenceArea[];
  referenceLines?: ReferenceLine[];
  lines: Line[];
  showLegend?: boolean;
  height?: number;
}

export interface Formula {
  title?: string;
  displayFormula?: (
    inputValues?: Record<string, number> | null,
    translations?: Record<string, string>,
  ) => string | null;
}

export interface DisplayFormula {
  label: string;
  formula: (inputs: Record<string, number>) => string;
}

export interface SavingsCalculatorLabels {
  totalSavings: string;
  calculation_result: string;
  data_visualization: string;
  x_units_y_dollars_label: string;
}

export interface Interaction {
  title?: string;
  type?: string;
  ariaLabel?: string;
  inputs?: Input[];
  graphConfig?: GraphConfig;
  formulas?: Formula[];
  labels?: SavingsCalculatorLabels;
  displayFormulas?: DisplayFormula[];
  bodyAsHtml?: string;
}

export interface InteractionProps {
  interaction: Interaction;
  onInteraction?: (state: InteractionState) => void;
}

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
}

export interface ChartDataPoint {
  x: number;
  [key: string]: number;
}

export interface FocusedPoint {
  dataKey: string;
  x: number;
  value: number;
  cx: number;
  cy: number;
}

export interface InputBoxInteraction {
  prefixText?: string;
  correctnessFunction: (inputValues: string | number) => boolean;
}


export interface DotProps {
  cx?: number; 
  cy?: number; 
  r?: number; 
  index?: number;
  stroke?: string; 
  strokeWidth?: number;
  fill?: string; 
  dataKey?: string; 
  payload?: Record<string, unknown>;
  value?: string | number;
  name?: string;
  label?: string;
  className?: string;
  isActive?: boolean;
  accessKey?: string;
  yLabel?: string;
}

export interface LegendPayloadItem {
  color: string;
  dataKey?: string;
  payload?: Record<string, unknown>;
  type?: string;
  value: string;
}
