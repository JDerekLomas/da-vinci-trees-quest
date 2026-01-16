import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  type: 'input-box',
  title: '',
  ariaLabel: '',
  correctnessFunction: (value: string | number) => Number(value) === 7.48,
};

export default interaction;
