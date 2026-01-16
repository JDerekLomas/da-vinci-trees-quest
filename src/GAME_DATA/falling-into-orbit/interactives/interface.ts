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
  unit?: string;
}

// Union type for all possible inputs
export type Input = SliderInput;

// Base interface for common properties
export interface BaseInteraction {
  title?: string;
  type: string;
  ariaLabel?: string;
  hint?: string;
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
  options: { value: string; label: string }[];
  correctnessFunction: (selectedValue: string) => boolean;
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

// Union type for all possible interactions
export type Interaction = InputBoxInteraction | RadioButtonInteraction | TwoInputBoxInteraction;

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
  value2?: string;
}

export interface InteractionComponentProps {
  interaction: Interaction;
  onInteractionChange: (state: InteractionState) => void;
}

// 3D Cone Slicer Interfaces

export interface ThreeDConeSlicerConfig {
  translations: Record<string, string>;
}

export interface ThreeDConeSlicerProps {
  interaction: ThreeDConeSlicerConfig;
}

export interface ConicDrawParams {
  a?: number;
  b?: number;
  p?: number;
  v_offset?: number;
  vertical?: boolean;
}

export type ConicType = 'Circle' | 'Ellipse' | 'Parabola' | 'Hyperbola';

// Newton's Canon Interfaces

export interface NewtonsCanonConfig {
  translations: Record<string, string>;
}

export interface NewtonsCanonProps {
  interaction: NewtonsCanonConfig;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

// Projectile Simulation Interfaces

export interface ProjectileSimulationConfig {
  translations: Record<string, string>;
}

export interface ProjectileSimulationProps {
  interaction: ProjectileSimulationConfig;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

// Satellite Launch Simulator Interfaces

export interface SatelliteLaunchSimulatorConfig {
  translations: Record<string, string>;
}

export interface SatelliteLaunchSimulatorProps {
  interaction: SatelliteLaunchSimulatorConfig;
}
