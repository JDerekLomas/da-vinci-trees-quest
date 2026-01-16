export interface UserResponses {
  userAngle: number;
  referenceAngle: number;
  error: number;
}

export interface AnglePerceptionProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

export interface AnglePerceptionStates {
  isStartDisabled: boolean;
}

export interface Input {
  id: string;
  label: string;
  type: 'slider' | 'number';
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export interface BaseInteraction {
  title: string;
  type: string;
  ariaLabel: string;
  hint?: string;
  correctnessFunction?: (inputValues: string | number) => boolean;
}

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
  correctnessFunction?: (selectedValue: string) => boolean;
  ariaLabel?: string;
}

export type Interaction = InputBoxInteraction | RadioButtonInteraction;

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
}
export interface InteractionComponentProps {
  interaction: Interaction;
  onInteractionChange: (state: InteractionState) => void;
}

export interface Positions {
  x: number;
  y: number;
}

export interface KanizaTriangleAnalysisProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

export interface HelmholtzSquareIllusionProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}
