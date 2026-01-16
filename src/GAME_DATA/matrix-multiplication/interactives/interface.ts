// Matrix Multiplication Quest Interactive Interfaces

// Base interface for common properties
export interface BaseInteraction {
  title: string;
  type: string;
  ariaLabel: string;
  hint?: string;
  correctnessFunction?: (inputValues: string | number) => boolean;
}

// Interface for input-box interactions
export interface InputBoxInteraction extends BaseInteraction {
  prefixText?: string;
  type: 'input-box';
  correctnessFunction: (inputValues: string | number) => boolean;
}

// Interface for matrix calculator interactions
export interface MatrixCalculatorInteraction extends BaseInteraction {
  type: 'matrix-calculator';
  matrixA: number[][];
  matrixB: number[][];
  showSteps?: boolean;
}

// Interface for transformation visualizer interactions
export interface TransformationVisualizerInteraction extends BaseInteraction {
  type: 'transformation-visualizer';
  initialShape: 'square' | 'triangle' | 'custom';
  showGrid: boolean;
  allowRotation: boolean;
  allowScaling: boolean;
}

// Interface for image transformer interactions
export interface ImageTransformerInteraction extends BaseInteraction {
  type: 'image-transformer';
  initialRotation?: number;
  initialScaleX?: number;
  initialScaleY?: number;
  initialShearX?: number;
  initialShearY?: number;
  showMatrix?: boolean;
  showPresets?: boolean;
  allowAnimation?: boolean;
}

// Union type for all possible interactions
export type Interaction = InputBoxInteraction | MatrixCalculatorInteraction | TransformationVisualizerInteraction | ImageTransformerInteraction;

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
}
