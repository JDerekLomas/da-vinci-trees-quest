/* eslint-disable @typescript-eslint/no-explicit-any */
export interface VerticalAnglesProofProps {
  firstEquation: { [key: string]: string | null };
  secondEquation: { [key: string]: string | null };
  lines: { line1: { x: number; y: number }[]; line2: { x: number; y: number }[] };
  isDrawing: boolean;
  currentLine: number;
  step: number;
  activeNotion: string | null;
  isDragging: { piece: string } | null;
  draggedOver: string | null;
  error: string | null;
  activeAngle: string | null;
  showSummary: boolean;
  proofStep: number;
  isReviewing: boolean;
}

export type Interaction = RadioButtonInteraction;

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
  value2?: string;
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

export interface Line {
  start: Point;
  end: Point;
}

export interface ProofStep {
  id: string;
  title: string;
  statement: string | JSX.Element;
  explanation: string;
  validPairs: any;
  validAngles?: string[];
}

// Type Definitions
export interface Point {
  x: number;
  y: number;
}

export interface Equation {
  left: string | null;
  right: string | null;
}

export interface ProofStep {
  id: string;
  title: string;
  statement: string | JSX.Element;
  explanation: string;
  validPairs: any;
  equation?: Equation;
}

export interface CompletedStep extends ProofStep {
  equation: Equation;
}

export interface ErrorModalProps {
  message: string | null;
}
export interface TrianglePoints {
  A: Point | null;
  B: Point | null;
  C: Point | null;
}

export interface ParallelLine {
  start: Point;
  end: Point;
  secondStart: Point | null;
  secondEnd: Point | null;
}

export interface Equation {
  left: string | null;
  right: string | null;
  center?: string | null;
}

export interface Equations {
  altInterior1: Equation;
  altInterior2: Equation;
  straightLine: Equation;
  completion: Equation;
}

export interface Step {
  title: string;
  instruction: string;
}

export interface ErrorModalProps {
  message: string | null;
  onClose: () => void;
}

export interface SummarySlideProps {
  onClose: () => void;
}

export interface CorrespondingAnglesProofState {
  step: number;
  firstLine: Line | null;
  point: Point | null;
  secondLine: Line | null;
  transversal: Line | null;
  firstEquation: Equation;
  secondEquation: Equation;
  isDragging: string | null;
  draggedOver: 'left' | 'right' | null;
  activeAngle: string | null;
  proofStep: number;
  completedSteps: CompletedStep[];
  isReviewing: boolean;
  showSummary: boolean;
}
