import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  type: 'input-box',
  title: 'Residual Explorer Question',
  ariaLabel: 'Enter the residual at 2020',
  correctnessFunction: (value: string | number) => Number(value) === 2,
};

export default interaction;
