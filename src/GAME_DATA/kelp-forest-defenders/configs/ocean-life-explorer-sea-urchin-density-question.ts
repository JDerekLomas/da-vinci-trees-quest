import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  type: 'input-box',
  title: 'Sea Urchin Density',
  ariaLabel: 'Enter sea urchin density value',
  correctnessFunction: (value: string | number) => Number(value) === 11,
};

export default interaction;
