import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  type: 'input-box',
  title: '',
  ariaLabel: '',
  prefixText: 'scenes.S10.S10_D0_F60_C9.lowerRange',
  correctnessFunction: (value: string | number) => Number(value) === 55,
};

export default interaction;
