import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  type: 'input-box',
  title: 'Sea Star Density Question',
  ariaLabel: 'Enter the sea star density',
  correctnessFunction: (value: string | number) => Number(value) === 10,
};

export default interaction;
