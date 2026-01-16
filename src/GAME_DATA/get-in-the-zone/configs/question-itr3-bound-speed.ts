import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  type: 'input-box',
  title: '',
  ariaLabel: '',
  prefixText: 'scenes.S10.S10_D7_FX_C1_prefix_text',
  placeholder_1: 'scenes.common.enter_answer',
  placeholder_2: 'scenes.common.enter_answer',
  correctnessFunction: (value: string | number) => value === '6.4,7.2',
};

export default interaction;
