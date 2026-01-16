import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'que4-c',
  options: [
    { value: 'que4-a', label: 'scenes.S10.S10_D2_F44_C9_optionA' },
    { value: 'que4-b', label: 'scenes.S10.S10_D2_F44_C9_optionB' },
    { value: 'que4-c', label: 'scenes.S10.S10_D2_F44_C9_optionC' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction; 

