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
  title?: string;
  label: string;
  type: 'slider' | 'textbox';
  sliderConfig?: SliderConfig;
  titleColor?: string;
  textboxConfig?: TextboxConfig;
}

export interface YAxisConfig {
  label: string;
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
  calculateYValue: (xValue: number, inputValues?: Record<string, number>) => number | null;
  isLineStartPoint: (xValue: number) => boolean;
  isLineEndPoint: (xValue: number) => boolean;
  tooltipLabel: string;
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
  show: string;
}

export interface Formula {
  title?: string;
  displayFormula?: (inputValues?: Record<string, number> | null, title?: string) => string | null;
}

export interface Column {
  name: string;
  accessor: string;
}

export interface TableConfig {
  columns: Column[];
  tableData: Record<string, string>[];
}

export interface Interaction {
  ariaLabel?: string;
  bodyAsHtml?: string;
  inputs?: Input[];
  graphConfig?: GraphConfig;
  formulas?: Formula[];
  graphs?: GraphConfig[];
  tableConfig?: TableConfig;
}

export interface InputBoxInteraction {
  prefixText?: string;
  correctnessFunction: (inputValues: string | number) => boolean;
}

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
}
