export interface Tuning {
  name: string;
  ratio: number;
  display: string;
  ariaLabel: string;
}

export interface TheVirtualMonochordConfig {
  translations: Record<string, string>;
}

export interface TheVirtualMonochordProps {
  interaction: TheVirtualMonochordConfig;
}

export interface LadderProblemPayload {
  step: number;
  target: string;
  flags?: {
    enableStep1?: boolean;
    enableStep2?: boolean;
  };
}

export interface TheLadderProblemConfig {
  translations: Record<string, string>;
}

export interface TheLadderProblemProps {
  interaction: TheLadderProblemConfig;
}

// Pythagorean Theorem Proofs Types
export interface Pebble {
  x: number;
  y: number;
  tx: number;
  ty: number;
  color: string;
}

export interface CanvasCoordinates {
  originX: number;
  originY: number;
  angle: number;
  scale: number;
}

export interface CameraOffset {
  x: number;
  y: number;
}

export interface DragStart {
  x: number;
  y: number;
}

export interface ViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ViewState {
  viewBox: ViewBox;
  isPanning: boolean;
  startPoint: { x: number; y: number };
}

export interface Point {
  x: number;
  y: number;
}

export interface Triple {
  a: number;
  b: number;
  label: string;
  ariaLabel: string;
}

export interface Colors {
  a: string;
  b: string;
  c: string;
}

export interface PythagoreanTheoremProofsConfig {
  translations: Record<string, string>;
}

export interface PythagoreanTheoremProofsProps {
  interaction: PythagoreanTheoremProofsConfig;
}

export interface PythagoreanTheoremProofsState {
  currentProof: number;
}

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
