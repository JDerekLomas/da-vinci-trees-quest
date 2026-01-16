export interface CoordinateSystemConfig {
  title: string;
  ariaLabels: {
    root: string;
    resetButton: string;
    frontPoint: string;
    rearPoint: string;
    targetFlag: string;
    targetReached: string;
    gridLine: string;
    carPosition: string;
  };
  initialPosition: { x: number; y: number };
  targetPosition: { x: number; y: number };
  gridRange: number[];
  resetButton: {
    label: string;
    position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    enabled: boolean;
  };
  labels: {
    xAxis: string;
    yAxis: string;
    moveForward: string;
    reachTarget: string;
    targetReached: string;
  };
  colors: {
    grid: string;
    axis: string;
    point: string;
    targetFlag: {
      reached: string;
      notReached: string;
    };
    celebrationText: string;
  };
  movement: {
    enabledKeys: string[]; // e.g., ['ArrowRight']
    stepSize: number; // e.g., 1
  };
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

export interface InteractionState {
  interactionType?: string;
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
}
export interface Position {
  x: number;
  y: number;
}

export interface CarGraphConfig {
  initialPosition?: Position;
  transactions?: number;
  rotateMove?: boolean;
  targetPositions?: Position[];
  fuelPosition?: Position;
  fuelRotation?: boolean;
  showFuelBar?: boolean;
  showRotationAxis?: boolean;
  rotationPoint?: Position;
  showSteps?: boolean;
  enableRotation?: boolean;
  enableReset?: boolean;
  enableDirectionChange?: boolean;
  backwardRotation?: boolean;
  gridSize?: number;
  gridStep?: number;
  carColor?: string;
  wheelColor?: string;
  lightColor?: string;
  axisColor?: string;
  gridColor?: string;
  fuelBarColor?: string;
  fuelLowColor?: string;
  fuelMediumColor?: string;
  fuelHighColor?: string;
  ariaLabel?: string;
  translations?: Record<string, string>;
  movement?: {
    enabledKeys: string[]; // e.g., ['ArrowRight', 'ArrowLeft']
    stepSize: number; // e.g., 0.1
  };
  animationDuration?: number;
  rotationAngle?: number;
  translationPoints?: { x: number; y: number; isCorrect?: boolean }[];
  rotationAxes?: Position[];
  rotationDegrees?: number[];
}

export interface Interaction {
  title?: string;
  type?: string;
  ariaLabel?: string;
  graphConfig?: CarGraphConfig;
  bodyAsHtml?: string;
}
