import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'input-box',
  correctnessFunction: (value: string | number) => Number(value) === 0.76,
  ariaLabel: '',
  title: '',
};

export default interaction;
