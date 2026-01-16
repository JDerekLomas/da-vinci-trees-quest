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
  unit?: string;
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
  referenceLines?: ReferenceLine[];
  lines: Line[];
  showLegend?: boolean;
}

export interface DotProps {
  cx: number;
  cy: number;
  dataKey: string;
  payload?: Record<string, unknown>;
  stroke: string;
  name?: string;
  label?: string;
  isActive?: boolean;
  index?: number;
  r?: number;
}

export interface LegendPayloadItem {
  color: string;
  dataKey: string;
  inactive: boolean;
  payload?: Record<string, unknown>;
  type: string;
  value: string;
}

export interface CustomLegendProps {
  payload?: LegendPayloadItem[];
}

export interface DataTable {
  headers: [string, string];
  rows: [string | number, string | number][];
  caption?: string;
}

export interface PlantGrowthConfig {
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
  zoneLabels: {
    notEnough: string;
    justRight: string;
    tooMuch: string;
  };
  curveLabel: string;
  optimalLabel: string;
  dataPointLabel: string;
  curveEquation?: string;
  vertexLabel: string;
  nitrogenLabel: string;
}

export interface Interaction {
  title?: string;
  type?: string;
  ariaLabel?: string;
  inputs?: Input[];
  graphConfig?: GraphConfig;
  dataTable?: DataTable;
  displayCards?: DisplayCard[];
  equationSolution?: string;
  bodyAsHtml?: string;
  plantGrowthConfig?: PlantGrowthConfig;
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

export interface InputBoxInteraction {
  prefixText?: string;
  correctnessFunction: (inputValues: string | number) => boolean;
}

export interface DataPoint {
  x: number;
  y: number;
}

export interface PlantGrowthExplorerProps {
  scatterData: DataPoint[];
  optimalCurvePoints: DataPoint[];
  vertex: DataPoint;
}

export interface DisplayCard {
  id: string;
  title: string;
  textColor: string;
  getDisplayValue: (xValue: number) => number;
}
