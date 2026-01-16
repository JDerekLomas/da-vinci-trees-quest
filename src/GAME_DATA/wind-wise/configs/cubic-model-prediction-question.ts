import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'que5-b',
  options: [
    { value: 'que5-a', label: 'scenes.S10.S10_D5_FX_C1_optionA' },
    { value: 'que5-b', label: 'scenes.S10.S10_D5_FX_C1_optionB' },
    { value: 'que5-c', label: 'scenes.S10.S10_D5_FX_C1_optionC' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;