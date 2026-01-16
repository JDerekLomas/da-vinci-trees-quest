import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'interactive-3-que-b',
  options: [
    { value: 'interactive-3-que-a', label: 'scenes.S9.S9_D5_FX_C9_optionA' },
    { value: 'interactive-3-que-b', label: 'scenes.S9.S9_D5_FX_C9_optionB' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
