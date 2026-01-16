import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  type: 'input-box',
  title: '',
  ariaLabel: '',
  prefixText: 'scenes.S10.S10_D17_FX_C1_prefix_text',
  placeholder_1: 'scenes.common.enter_answer',
  placeholder_2: 'scenes.common.enter_answer',
  correctnessFunction: (value: string | number) => value === '15.6,20.8',
};

export default interaction;
