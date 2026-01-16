import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'input-box',
  correctnessFunction: (value: string | number) => Number(Number(value).toFixed(1)) === 1.4,
  ariaLabel: '',
  title: '',
};

export default interaction;