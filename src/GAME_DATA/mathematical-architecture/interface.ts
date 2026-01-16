export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
  value2?: string;
}

export interface BaseInteraction {
  title: string;
  type: string;
  ariaLabel: string;
  hint?: string;
}

export interface InputBoxInteraction extends BaseInteraction {
  prefixText?: string;
  type: 'input-box';
  correctnessFunction: (inputValues: string | number) => boolean;
  postfixText?: string;
}

export interface RadioButtonInteraction {
  title: string;
  prefixText?: string;
  type: 'radio-button';
  options: { value: string; label: string }[];
  correctnessFunction?: (selectedValue: string) => boolean;
  ariaLabel?: string;
}

export type Interaction = InputBoxInteraction | RadioButtonInteraction;

export interface AngleSumExplorerConfig {
  translations: Record<string, string>;
}

export interface AngleSumExplorerProps {
  interaction: AngleSumExplorerConfig;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

export interface AngleSumExplorerState {
  currentSides: number;
}

export interface QuadrilateralExplorerConfig {
  translations: Record<string, string>;
}

export interface QuadrilateralExplorerProps {
  interaction: QuadrilateralExplorerConfig;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

export interface DomeShapeSimulatorConfig {
  translations: Record<string, string>;
}

export interface DomeShapeSimulatorProps {
  interaction: DomeShapeSimulatorConfig;
}

export interface DomeShapeSimulatorState {
  currentPanelType: 'parallelogram_p100' | 'parallelogram_p300' | 'trapezoid';
}

export interface DomeBuilderConfig {
  translations: Record<string, string>;
}

export interface DomeBuilderProps {
  interaction: DomeBuilderConfig;
  onInteraction?: (state: Record<string, string | number | boolean | null>) => void;
}

export interface DomeBuilderState {
  currentStep: number;
}

export interface PanelInspectorConfig {
  translations: Record<string, string>;
}

export interface PanelInspectorProps {
  interaction: PanelInspectorConfig;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

export interface ParallelogramVerifierConfig {
  translations: Record<string, string>;
}

export interface ParallelogramVerifierProps {
  interaction: ParallelogramVerifierConfig;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

export interface GeodesicDomesConfig {
  translations: Record<string, string>;
}

export interface GeodesicDomesProps {
  interaction: GeodesicDomesConfig;
}

export interface GeodesicDomesState {
  currentStep: number;
}

export interface TrapezoidExplorerState {
  currentStep: number;
}

export interface ShapeTilingConfig {
  translations: Record<string, string>;
}

export interface ShapeTilingProps {
  interaction: ShapeTilingConfig;
}
