import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'input-box',
  correctnessFunction: (value: string | number) => Number(value) === 12.3,
  ariaLabel: '',
  title: '',
};

export default interaction;