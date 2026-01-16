import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'que1-b',
  options: [
    { value: 'que1-a', label: 'scenes.S6.S6_D4_FX_C1_optionA' },
    { value: 'que1-b', label: 'scenes.S6.S6_D4_FX_C1_optionB' },
    { value: 'que1-c', label: 'scenes.S6.S6_D4_FX_C1_optionC' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;