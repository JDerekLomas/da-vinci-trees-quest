// Base interface for common properties
export interface BaseInteraction {
  title: string;
  type: string;
  ariaLabel: string;
  hint?: string;
}

// Input interfaces
export interface Input {
  id: string;
  label: string;
  type: 'slider' | 'number';
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit?: string;
}

// Lunar probe specific interfaces
export interface YAxisConfig {
  label: string;
  min: number;
  max: number;
}

export interface XAxisConfig extends YAxisConfig {
  steps: number;
}

export interface ProbeVisualization {
  width: number;
  height: number;
  background: string;
  trajectory: {
    stroke: string;
    strokeWidth: number;
    hintOpacity: number;
    fullOpacity: number;
  };
}

export interface EnvironmentConfig {
  gravity: number;
  target: {
    x: number;
    y: number;
    radius: number;
    color: {
      default: string;
      hit: string;
    };
  };
  grid: {
    lines: number;
    spacing: number;
    color: string;
  };
  stars: {
    count: number;
    minSize: number;
    maxSize: number;
    minOpacity: number;
    maxOpacity: number;
  };
}

export interface GraphConfig {
  title?: string;
  ariaLabel: string;
  x: XAxisConfig;
  y: YAxisConfig;
  visualization: ProbeVisualization;
  showLegend?: boolean;
}

// Input box interfaces
export interface InputBoxInteraction extends BaseInteraction {
  prefixText?: string;
  type: 'input-box';
  label?: string;
  correctnessFunction: (inputValues: string | number) => boolean;
}

export interface TwoInputBoxInteraction extends BaseInteraction {
  prefixText1?: string;
  prefixText2?: string;
  label1?: string;
  label2?: string;
  type: 'two-input-box';
  correctnessFunction: (value1: string | number, value2: string | number) => boolean;
}

// Interface for probe-trajectory interactions
export interface ProbeTrajectoryInteraction extends BaseInteraction {
  image: string;
  type: 'probe-trajectory';
  longDescription: string;
  alt: string;
}

// Interface for lunar-skylight interactions
export interface LunarSkylightInteraction extends BaseInteraction {
  image: string;
  type: 'lunar-skylight';
  longDescription: string;
  alt: string;
}

export interface ThreeInputBoxInteraction extends BaseInteraction {
  prefixText1?: string;
  prefixText2?: string;
  prefixText3?: string;
  label1?: string;
  label2?: string;
  label3?: string;
  type: 'three-input-box';
  correctnessFunction: (value1: string | number, value2: string | number, value3: string | number) => boolean;
}

// Lunar probe specific interaction interface
export interface LunarProbeInteraction extends BaseInteraction {
  type: 'lunar-probe';
  inputs: Input[];
  graphConfig: GraphConfig;
  environment: EnvironmentConfig;
  labels: {
    reset: string;
    launch: string;
    launching: string;
    targetHit: string;
    targetPosition: string;
    adjustControls: string;
    hit: string;
    miss: string;
  };
}

// Lunar probe interface
export interface Point {
  x: number;
  y: number;
  t: number;
  isPerfectTrajectory?: boolean;
}

export interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export interface InputValues {
  [key: string]: number;
  velocity: number;
  angle: number;
}

interface SliderInput {
  id: string;
  type: 'slider';
  label: string;
  description: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export interface QuadraticExplorerInteraction {
  type: 'quadratic-explorer';
  ariaLabel: string;
  inputGroupLabel: string;
  inputs: SliderInput[];
  target: {
    x: number;
    y: number;
    epsilon?: number;
  };
  xRange: number;
  yRange: number;
  animation: {
    duration: number;
    pointDensity: number;
  };
  labels: {
    reset: string;
    start: string;
    launching: string;
    targetHit: string;
    target: string;
    position: string;
    xIntercepts: string;
    adjustCurve: string;
    probeInMotion: string;
    launch?: string;
    xAxisLabel: string;
    yAxisLabel: string;
    tooltipDistance: string;
    tooltipHeight: string;
    hit: string;
    miss: string;
  };
  equation: {
    currentEquation: string;
    plus: string;
    minus: string;
    equals: string;
    square: string;
  };
}

export interface TrajectoryAlignmentInteraction extends BaseInteraction {
  type: 'trajectory-alignment';
  inputGroupLabel: string;
  heading: string;
  labels: {
    reset: string;
    start: string;
    hit: string;
    miss: string;
  };
  controls: {
    value: string;
    a: {
      label: string;
      description: string;
      ariaLabel: string;
      min: number;
      max: number;
      step: number;
      defaultValue: number;
    };
    h: {
      label: string;
      description: string;
      ariaLabel: string;
      min: number;
      max: number;
      step: number;
      defaultValue: number;
    };
    k: {
      label: string;
      description: string;
      ariaLabel: string;
      min: number;
      max: number;
      step: number;
      defaultValue: number;
    };
  };
  mission: string;
  xIntercepts: string;
  equation: {
    ariaLabel: string;
  };
  status: {
    perfect: string;
    keepAdjusting: string;
    targetBelowLevel: string;
  };
  graph: {
    axis: {
      x: {
        label: string;
        ariaLabel: string;
        var: string;
        min: number;
        max: number;
        ticks: number[];
      };
      y: {
        label: string;
        ariaLabel: string;
        var: string;
        min: number;
        max: number;
        ticks: number[];
      };
    };
    line: {
      color: string;
      width: number;
      name: string;
    };
    points: {
      start: {
        color: string;
        radius: number;
      };
      end: {
        color: string;
        radius: number;
      };
    };
    tooltip: {
      ariaLabel: string;
      unit: string;
    };
    ariaDescription: string;
  };
}

export interface QuadraticVisualizerInteraction extends BaseInteraction {
  // Text content paths
  description: string;
  instruction: string;
  currentPoints: string;
  controls: {
    parabolaOpening: string;
    firstRoot: string;
    secondRoot: string;
    meters: string;
    aAriaLabel: string;
    x1AriaLabel: string;
    x2AriaLabel: string;
  };
  graph: {
    xAxisLabel: string;
    yAxisLabel: string;
    tooltipDistance: string;
    tooltipHeight: string;
  };
  points: {
    launchPoint: string;
    targetPoint: string;
    probePosition: string;
  };
  buttons: {
    resetProbe: string;
    launchProbe: string;
  };
  feedback: {
    success: string;
    error: {
      invalidTrajectory: string;
      needTwoRoots: string;
    };
    hit: string;
    miss: string;
  };
  aria: {
    simulator: string;
    controls: string;
    equation: string;
    graph: string;
    resetButton: string;
    launchButton: string;
  };

  // Configuration
  xAxisMin: number;
  xAxisMax: number;
  yAxisMin: number;
  yAxisMax: number;

  aCoefficient: {
    min: number;
    max: number;
    step: number;
    default: number;
  };

  roots: {
    min: number;
    max: number;
    step: number;
    defaultX1: number;
    defaultX2: number;
  };

  animationDuration: number;
  tolerance: number;
}

// Image Slideshow Interaction
export interface ImageSlideshowInteraction extends BaseInteraction {
  type: 'image-slideshow';
  slides?: string[];
  slidesPrefix?: string;
  autoScrollInterval?: number;
}

// Union type for all possible interactions
export type Interaction =
  | InputBoxInteraction
  | TwoInputBoxInteraction
  | ProbeTrajectoryInteraction
  | LunarSkylightInteraction
  | ThreeInputBoxInteraction
  | LunarProbeInteraction
  | QuadraticExplorerInteraction
  | TrajectoryAlignmentInteraction
  | QuadraticVisualizerInteraction
  | ImageSlideshowInteraction;

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value1?: string;
  value2?: string;
  value3?: string;
}

export interface InteractionComponentProps {
  interaction: Interaction;
  onInteractionChange: (state: InteractionState) => void;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
}

export interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
}
