import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  type: 'input-box',
  title: '',
  ariaLabel: '',
  correctnessFunction: (value: string | number) => Number(value) === 5.05,
};

export default interaction;
