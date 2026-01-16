import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  title: '',
  type: 'input-box',
  correctnessFunction: (value: string | number) => Number(value) === 1600,
  ariaLabel: '',
};

export default interaction;
