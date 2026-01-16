import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  type: 'input-box',
  correctnessFunction: (value: string | number) => Number(value) === 25,
  ariaLabel: '',
  title: '',
};

export default interaction;
