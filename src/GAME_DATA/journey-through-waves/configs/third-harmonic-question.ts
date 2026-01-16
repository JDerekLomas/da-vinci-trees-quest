import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'input-box',
  title: '',
  ariaLabel: '',
  correctnessFunction: (value: string | number) => Number(value) === 1320,
};

export default interaction;
