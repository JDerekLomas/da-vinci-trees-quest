import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'tan-p-que-a',
  options: [
    { value: 'tan-p-que-a', label: 'scenes.S6.S6_D2_F51_C9_optionA' },
    { value: 'tan-p-que-b', label: 'scenes.S6.S6_D2_F51_C9_optionB' },
    { value: 'tan-p-que-c', label: 'scenes.S6.S6_D2_F51_C9_optionC' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;