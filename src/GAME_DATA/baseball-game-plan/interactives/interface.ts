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

// Interface for holographic-table interactions
export interface HoloGraphicTableInteraction extends BaseInteraction {
  type: 'holographic-table';
  data: {
    firstCol: number | string;
    secondCol: number;
    thirdCol: number;
    fourthCol: number;
    fifthCol: number;
  }[];
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
  options: { value: string; label: string }[];
  correctnessFunction?: (selectedValue: string) => boolean;
  ariaLabel?: string;
}

// Interface for High Pitch Performance Interactive
export interface PitcherStats {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
}

export interface BoxPlotInteraction extends BaseInteraction {
  type: 'box-plot';
  starterData: {
    [key: string]: PitcherStats;
  };
  defaultStarter: string;
  xAxisRange: {
    min: number;
    max: number;
    step: number;
  };
}

// Union type for all possible interactions
export type Interaction =
  | InputBoxInteraction
  | HoloGraphicTableInteraction
  | HitsAnalysisInteraction
  | DistributionAnalysisInteraction
  | RadioButtonInteraction;

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
}
export interface InteractionComponentProps {
  interaction: Interaction;
  onInteractionChange: (state: InteractionState) => void;
}

export interface DistributionAnalysisInteraction extends BaseInteraction {
  type: 'distribution-analysis';
  data: {
    binStart: number;
    binEnd: number;
    OurTeam: number;
    Eagles: number;
  }[];
}
export interface HitsAnalysisData {
  id: number;
  date: string;
  hits: number;
}

export interface HitsAnalysisInteraction extends BaseInteraction {
  type: 'hits-analysis';
  data: HitsAnalysisData[];
  gameOptions: number[];
  colors: {
    baseGames: string;
    game24: string;
    game25: string;
    medianLine: string;
    grid: string;
    axis: string;
  };
  labels: {
    game24: string;
    game25: string;
    median: string;
    showGames: string;
    hideGames: string;
    notSelected: string;
    hits: string;
  };
  chart: {
    width: number;
    height: number;
    margin: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };
}

export interface PitchingBin {
  binStart: number;
  binEnd: number;
  value: number;
}

export interface PitchingComparisonInteraction {
  title: string;
  type: 'pitching-comparison';
  ariaLabel: string;
  steveData: PitchingBin[];
  samData: PitchingBin[];
}

export interface BattingAnalysisInteraction {
  title: string;
  type: 'batting-analysis';
  ariaLabel: string;
  data: BattingBin[];
  translations: BattingTranslations;
}

export interface BattingBin {
  binStart: number;
  binEnd: number;
  SteadySteve: number;
  StreakySam: number;
}

export interface PlayerStats {
  mean: number;
  median: number;
  stdDev: number;
}

export interface BattingTranslations {
  stats: {
    mean: string;
    median: string;
    std_dev: string;
  };
  values: {
    sam: {
      mean: number;
      median: number;
      std_dev: number;
    };
    steve: {
      mean: number;
      median: number;
      std_dev: number;
    };
  };
  chart: {
    batting_average: string;
    number_of_games: string;
    tooltip: {
      games: string;
      range_prefix: string;
      average_suffix: string;
    };
  };
  players: {
    steady_steve: string;
    streaky_sam: string;
  };
  accessibility: {
    chart: {
      histogram_prefix: string;
      games: string;
      in_range: string;
      batting_average: string;
    };
  };
}
