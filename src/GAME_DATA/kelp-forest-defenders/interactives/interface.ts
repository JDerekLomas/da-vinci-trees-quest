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

export interface Line {
  yAxisId?: string;
  name: string;
  nameTextValue?: string;
  dataKey: string;
  stroke: string;
  strokeWidth: number;
  label?: string;
  strokeDasharray?: string;
  dot?: boolean | { r: number };
  activeDot?: { r: number };
  legendType?: string;
  isAnimationActive?: boolean;
  connectNulls?: boolean;
}

interface AxisConfig {
  label: {
    value: string;
    valueText?: string;
    position?: string;
    fill?: string;
    angle?: number;
    dx?: number;
    dy?: number;
    fontSize?: number;
    fontWeight?: string;
  };
  tick: {
    fontSize: number;
    dx?: number;
    dy?: number;
    fill?: string;
  };
}

export interface XAxisConfig extends AxisConfig {
  dataKey: string;
  angle?: number;
  textAnchor?: string;
  height?: number;
}

export interface YAxisConfig extends AxisConfig {
  yAxisId?: string;
}

export interface GraphConfig {
  margin: { top: number; right: number; left: number; bottom: number };
  lines: Line[];
  earlyTrendLine?: Line;
  lateTrendLine?: Line;
  x: XAxisConfig;
  y: YAxisConfig;
  yLeft?: YAxisConfig;
  yRight?: YAxisConfig;
  unit?: string;
}

export interface KelpDataPoint {
  year: number;
  kelp: number;
}
export interface UrchinDataPoint {
  year: number;
  urchins: number;
  kelp: number;
}

export interface StarDataPoint {
  year: number;
  pycno: number;
  kelp: number;
}

export interface OcenDataPoint {
  kelp: number;
  urchin: number;
  stars: number;
  year: number;
}

export interface ResidualDataPoint {
  year: number;
  actual: number;
  residuals: number;
  kelpHealth: number;
  story: string;
  whatItMeans: string;
  whatToDo: string;
  healthStatus: string;
}

export interface BaseExplorerInteraction extends BaseInteraction {
  preTrendLabel: string;
  postTrendLabel: string;
  futureProjectionLabel: string;
  kelpDensityLabel?: string;
  unit: string;
  note: string;
  select: {
    from: string;
    to: string;
  };
  dateRange: {
    start: number;
    end: number;
  };
  trendLines: {
    early: boolean;
    late: boolean;
  };
  startYearOptions: number[];
  endYearOptions: number[];
  graphConfig: GraphConfig;
}

export interface StepConfig {
  title: string;
  subtitle: string;
  titleText?: string;
  subtitleText?: string;
  endYear: number;
  defaultTrends: {
    early: boolean;
    late: boolean;
    projection: boolean;
  };
  description: string;
  descriptionText?: string;
}

export interface KelpForestExplorerInteraction extends BaseExplorerInteraction {
  type: 'kelp-forest-explorer';
  kelpData: KelpDataPoint[];
  kelpDensityLabel: string;
  steps: StepConfig[];
  controls?: {
    showTrend?: string;
    showTrendText?: string;
    hideTrend?: string;
    hideTrendText?: string;
    preTrend?: string;
    preTrendText?: string;
    postTrend?: string;
    postTrendText?: string;
    showFutureProjection?: string;
    showFutureProjectionText?: string;
    next?: string;
    nextText?: string;
    previous?: string;
    previousText?: string;
  };
  tooltip?: {
    year?: string;
    yearText?: string;
    observedKelpDensity?: string;
    observedKelpDensityText?: string;
    individuals?: string;
    individualsText?: string;
  };
  calculateTrendLine: (data: KelpDataPoint[]) => {
    slope: number;
    intercept: number;
  };
}

export interface SeaUrchinExplorerInteraction extends BaseExplorerInteraction {
  type: 'sea-urchin-explorer';
  urchinData: UrchinDataPoint[];
  showKelpDataLabel: string;
  kelpDensityLabel: string;
  urchinDensityLabel: string;
  calculateTrendLine: (data: UrchinDataPoint[]) => {
    slope: number;
    intercept: number;
  };
}

export interface SeaStarExplorerInteraction extends BaseExplorerInteraction {
  type: 'sea-star-explorer';
  starData: StarDataPoint[];
  showKelpDataLabel: string;
  kelpDensityLabel: string;
  starDensityLabel: string;
  calculateTrendLine: (data: StarDataPoint[]) => {
    slope: number;
    intercept: number;
  };
}

export interface OcenLifeExplorerInteraction extends BaseInteraction {
  type: 'ocean-life-explorer';
  creature: 'urchin' | 'stars';
  kelpDensityLabel: string;
  yourLineLabel: string;
  unit: string;
  inputs: Input[];
  ocenData: OcenDataPoint[];
  creatures: {
    urchin: {
      name: string;
      unit: string;
      color: string;
      description: string;
    };
    stars: {
      name: string;
      unit: string;
      color: string;
      description: string;
    };
  };
  calculateCorrelation: (creature: keyof OcenDataPoint, ocenData: OcenDataPoint[]) => string;
  calculateBestFit: (
    creature: keyof OcenDataPoint,
    ocenData: OcenDataPoint[],
  ) => {
    slope: number;
    intercept: number;
  };
}

export interface ResidualExplorerInteraction extends BaseInteraction {
  type: 'residual-explorer';
  xAxisLabel: string;
  yAxisLabel: string;
  yAxisResidualLabel: string;
  predictedTrendLabel: string;
  actualCountLabel: string;
  residualsLabel: string;
  kelpHealthLabel: string;
  dangerZoneLabel: string;
  showResidualLabel: string;
  actualUrchinLabel: string;
  predictedUrchinLabel: string;
  residualAriaLabel: string;
  dataAriaLabel: string;
  tooltipLabels: {
    year: string;
    urchins: string;
    kelpHealth: string;
    whatHappened: string;
    whatToDo: string;
    healthStatus: string;
    whatItMeans: string;
    healthStatusSick: string;
    healthStatusGettingSick: string;
    healthStatusHealthy: string;
    moreText: string;
    lessText: string;
  };
  data: ResidualDataPoint[];
  colors: {
    positive: string;
    negative: string;
    kelp: {
      healthy: string;
      warning: string;
      danger: string;
    };
    scatter: string;
    prediction: string;
    dangerLine: string;
  };
}

export interface RestorationPlannerInteraction extends BaseInteraction {
  type: 'ecosystem-explorer';
  title: string;
  unit: string;
  sliderInput: Input;
  historicalData: OcenDataPoint[];
  projectionLabels: {
    heading: string;
    urchin: string;
    kelp: string;
  };
  chart: {
    heading: {
      label1: string;
      label2: string;
    };
    axisLabel: {
      x1: string;
      x2: string;
      y1: string;
      y2: string;
    };
    legend: {
      historicalDataLabel: string;
      modelProjectionLabel: string;
      projectedPatternLabel: string;
    };
  };
}

// Image Slideshow Interaction
export interface ImageSlideshowInteraction extends BaseInteraction {
  type: 'image-slideshow';
  slides?: string[];
  slidesPrefix?: string;
  autoScrollInterval?: number;
}

// Union type for all possible interactions
export type Interaction =
  | InputBoxInteraction
  | RadioButtonInteraction
  | KelpForestExplorerInteraction
  | SeaUrchinExplorerInteraction
  | SeaStarExplorerInteraction
  | OcenLifeExplorerInteraction
  | ResidualExplorerInteraction
  | RestorationPlannerInteraction
  | ImageSlideshowInteraction;

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
}
export interface InteractionComponentProps {
  interaction: Interaction;
  onInteractionChange: (state: InteractionState) => void;
}
