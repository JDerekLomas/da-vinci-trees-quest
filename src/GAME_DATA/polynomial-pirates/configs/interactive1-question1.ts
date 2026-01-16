import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'interactive-1-que-a',
  options: [
    { value: 'interactive-1-que-a', label: 'scenes.S3.S3_D4_FX_C9_optionA' },
    { value: 'interactive-1-que-b', label: 'scenes.S3.S3_D4_FX_C9_optionB' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
