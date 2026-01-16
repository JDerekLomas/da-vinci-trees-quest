import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  title: '',
  type: 'input-box',
  correctnessFunction: (value: string | number) => Number(value) === 12800,
  ariaLabel: '',
};

export default interaction;
