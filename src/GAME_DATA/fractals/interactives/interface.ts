export interface SliderConfig {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  groupLabel?: string;
  valuePrefix?: string;
}

export interface PatternPreset {
  name: string;
  values: {
    realPart: number;
    imaginaryPart: number;
  };
  bgColor: string;
}

export interface FractalsExplorerConfig {
  presetInstruction: string;
  presets: PatternPreset[];
  parameters: SliderConfig[];
  canvasAriaLabel: string;
  presetsAriaLabel: string;
  patternChangeAnnouncement: {
    presetSelected: string;
    parameterChanged: string;
  };
  zoom: SliderConfig;
}

export interface Point {
  realPart: number;
  imaginaryPart: number;
  color?: string;
}

export interface ComplexPlaneConfig {
  dimension: number;
  min: number;
  max: number;
  step: number;
}

export interface ComplexNumberPlotterConfig {
  parameters: SliderConfig[];
  instruction: string;
  buttons: {
    plotNumber: string;
    clearAll: string;
  };
  complexPlaneConfig: ComplexPlaneConfig;
}

export interface ArithmeticOperationsConfig {
  complexPlaneConfig: ComplexPlaneConfig;
}

export interface ColorTheme {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface TerrainGeneratorConfig {
  parameters: SliderConfig[];
  instruction: string;
  colorThemesLabel: string;
  themeSelectorAriaLabel: string;
  colorThemes: ColorTheme[];
  presetsLabel: string;
  presets: PatternPreset[];
  presetsAriaLabel: string;
  landscapeCanvas: {
    ariaLabel: string;
  };
  presetSelected: string;
  themeSelected: string;
  landscapeChanged: string;
}

export interface SimulationButtons {
  plotPoint: string;
  clearAllPoints: string;
  startIterations: string;
}

export interface Visualization {
  title: string;
  description: string;
  ariaLabel: string;
}

export interface Visualizations {
  left: Visualization;
  right: Visualization;
}

export interface FractalsCreationSimulatorConfig {
  instruction: string;
  constant: SliderConfig[];
  buttons: SimulationButtons;
  visualizations: Visualizations;
  animationStarted: string;
  animationStopped: string;
  pointPlotted: string;
  pointsRemoved: string;
}

export interface RadioButtonInteraction {
  title: string;
  prefixText?: string;
  type: 'radio-button';
  options: { value: string; label: string }[];
  correctnessFunction?: (selectedValue: string) => boolean;
  ariaLabel?: string;
}

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
}

export type Interaction = RadioButtonInteraction;

export interface ImageContainerConfig {
  imageUrl: string;
  imgDescription: string;
}
