import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'que2-a',
  options: [
    { value: 'que2-a', label: 'scenes.S6.S6_D5_FX_C1_optionA' },
    { value: 'que2-b', label: 'scenes.S6.S6_D5_FX_C1_optionB' },
    { value: 'que2-c', label: 'scenes.S6.S6_D5_FX_C1_optionC' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;