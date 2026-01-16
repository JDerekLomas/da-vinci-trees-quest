import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  type: 'input-box',
  title: '',
  ariaLabel: '',
  prefixText: 'scenes.S10.S10_D7_FX_C1_upper_bound',
  correctnessFunction: (value: string | number) => Number(value) === 7.2,
};

export default interaction;
