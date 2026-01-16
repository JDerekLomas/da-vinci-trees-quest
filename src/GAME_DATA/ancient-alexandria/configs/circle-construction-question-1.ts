import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'interactive-1-que-b',
  options: [
    { value: 'interactive-1-que-a', label: 'scenes.S4.S4_D6_FX_C9_optionA' },
    { value: 'interactive-1-que-b', label: 'scenes.S4.S4_D6_FX_C9_optionB' },
    { value: 'interactive-1-que-c', label: 'scenes.S4.S4_D6_FX_C9_optionC' },
    { value: 'interactive-1-que-d', label: 'scenes.S4.S4_D6_FX_C9_optionD' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
