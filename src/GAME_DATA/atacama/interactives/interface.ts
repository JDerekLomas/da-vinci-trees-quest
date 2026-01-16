export interface Input {
  id: string;
  label?: string;
  type?: 'button' | 'slider' | 'number';
  min?: number;
  max?: number;
  step?: number;
  defaultValue: number;
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

export interface RightAngleTriangleExplorerInteraction extends BaseInteraction {
  type: 'right-angle-triangle-explorer';
  inputs: Input[];
  translations: {
    angle: string;
    adjecentSide: string;
    oppositeSide: string;
    hypotenuse: string;
    tanFormula: string;
    tanFormulaText: string;
  };
}

export interface StellarParallaxInteraction extends BaseInteraction {
  type: 'stellar-parallax';
  enableMotion: boolean,
  showMotionControls: boolean,
  translations: {
    star: string;
    sun: string;
    earth: string;
    position1: string;
    position2: string;
    months: string;
    parallaxLabel: string;
    baseline: string;
    baselineLabel: string;
    startMotion: string;
    stopMotion: string;
    animationStartMessage: string;
    animationStopMessage: string;
    animationPositionMessage1: string;
    animationPositionMessage2: string;
  };
}

export interface SignalTriangulationInteraction extends BaseInteraction {
  type: 'signal-triangulation';
  showDescription: boolean;
  translations: {
    dragInstructions: string;
    resetButton: string;
    measurementsTitle: string;
    antenna1Label: string;
    antenna2Label: string;
    sourceLabel: string;
    distance: string;
    interactiveInstructions: string;
    sourceButtonInstructions: string;
    sourceMovedAnnouncement: string;
    horizontalDistanceLabel: string;
    verticalDistanceLabel: string;
    antenna1AngleSetter: string;
    antenna2AngleSetter: string;
    sinLeft: string;
    sinRight: string;
    forThisTriangle: string;
  };
}

export interface StellarParallaxEquationInteraction extends BaseInteraction {
  type: 'stellar-parallax-equation';
  translations: {
    star: string;
    sun: string;
    earth: string;
    position1: string;
    position2: string;
    months: string;
    parallaxLabel: string;
    baseline: string;
    baselineLabel: string;
    equations: string;
  };
}

export interface StellarParallaxMathInteraction extends BaseInteraction {
  type: 'stellar-parallax-math';
  parallaxInput: Input;
  translations: {
    sun: string;
    earthPosition1: string;
    earthPosition2: string;
    star: string;
    distance: string;
    arcseconds: string;
    parsecs: string;
    au: string;
    astronomicalUnit: string;
  };
}

export type Interaction =
  | InputBoxInteraction
  | RightAngleTriangleExplorerInteraction
  | StellarParallaxInteraction
  | StellarParallaxEquationInteraction
  | StellarParallaxMathInteraction
  | SignalTriangulationInteraction
  | TwoInputBoxInteraction
  | RadioButtonInteraction;

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

export interface TwoInputBoxInteraction extends BaseInteraction {
  prefixText1?: string;
  prefixText2?: string;
  type: 'two-input-box';
  correctnessFunction: (value1: string | number, value2: string | number) => boolean;
  postfixText1?: string;
  postfixText2?: string;
}

export interface InteractionComponentProps {
  interaction: Interaction;
  onInteractionChange: (state: InteractionState) => void;
}
