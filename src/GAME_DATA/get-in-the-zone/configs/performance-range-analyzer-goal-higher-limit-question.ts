import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  type: 'input-box',
  title: '',
  ariaLabel: '',
  prefixText: 'scenes.S10.S10_D0_F60_C9.upperRange',
  correctnessFunction: (value: string | number) => Number(value) === 58,
};

export default interaction;
