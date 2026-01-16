import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'wider-spacing-que-a',
  options: [
    { value: 'wider-spacing-que-a', label: 'scenes.S9.S9_D6_F59_C9_optionA' },
    { value: 'wider-spacing-que-b', label: 'scenes.S9.S9_D6_F59_C9_optionB' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;