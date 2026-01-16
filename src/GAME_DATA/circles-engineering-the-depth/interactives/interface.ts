// Interface for input elements
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
  correctnessFunction?: (inputValues: string | number) => boolean;
}

// Interface for input-box interactions
export interface InputBoxInteraction extends BaseInteraction {
  prefixText?: string;
  type: 'input-box';
  correctnessFunction: (inputValues: string | number) => boolean;
}

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
}

export interface UnderWaterTunnelInteraction extends BaseInteraction {
  image: string;
  type: 'underwater-tunnel';
  longDescription: string;
  alt: string;
}

export interface calculatingTangentInteraction extends BaseInteraction {
  type: 'calculating-tangent';
  depthInput: Input;
  totalSteps: number;
  CONSTS: Record<string, number>;
  translations: Record<string, string>;
}

export interface AnchorAngleInteraction extends BaseInteraction {
  type: 'anchor-angle';
  depthInput: Input;
  totalSteps: number;
  CONSTS: Record<string, number>;
  translations: Record<string, string>;
}


export interface SvgElementsData {
  points?: Array<{
    x: number;
    y: number;
    label: string;
    labelX?: number;
    labelY?: number;
    showCoordinates?: boolean;
  }>;
  lines?: Array<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    stroke?: string;
    dashed?: boolean;
    strokeWidth?: string;
  }>;
  labels?: Array<{
    x: number;
    y: number;
    text: string;
    fill?: string;
    fontSize?: string;
    fontStyle?: string;
    textAnchor?: string;
  }>;
}

export interface TunnelDiameterInteraction extends BaseInteraction {
  type: 'tunnel-diameter';
  totalSteps: number;
  CONSTS: Record<string, number>;
  translations: Record<string, string>;
  slideConfigs: {
    [key: string]: { [key: string]: (object | string | number | boolean | undefined) };
  }
  getBaseGeometryElements: (coordinates: { [key: string]: number }, slideNo: number) => SvgElementsData;
}

export interface CeilingLightAngleInteraction extends BaseInteraction {
  type: 'ceiling-light-angle';
  totalSteps: number;
  diameterInput: Input;
  sliderConfigs: {
    [key: string]: { [key: string]: (object | string | number | boolean | undefined) };
  }
};

// Union type for all possible interactions
export type Interaction =
  | InputBoxInteraction
  | UnderWaterTunnelInteraction
  | AnchorAngleInteraction
  | calculatingTangentInteraction
  | TunnelDiameterInteraction;