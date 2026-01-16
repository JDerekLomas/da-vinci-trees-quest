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

// Union type for all possible interactions
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

export interface RadioButtonInteraction {
  title: string;
  prefixText?: string;
  type: 'radio-button';
  options: { value: string; label: string }[];
  correctnessFunction?: (selectedValue: string) => boolean;
  ariaLabel?: string;
}

// Image Slideshow Interaction
export interface ImageSlideshowInteraction extends BaseInteraction {
  type: 'image-slideshow';
  slides?: string[];
  slidesPrefix?: string;
  autoScrollInterval?: number;
}

export interface Slide {
  image: string;
  imageAlt: string;
}

export interface InteractiveSlideShowState {
  currentSlide: number;
}
