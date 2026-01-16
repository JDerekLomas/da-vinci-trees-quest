import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'height-to-diameter-ratio-que-a',
  options: [
    { value: 'height-to-diameter-ratio-que-a', label: 'scenes.S7.S7_D13_F47_C9_optionA' },
    { value: 'height-to-diameter-ratio-que-b', label: 'scenes.S7.S7_D13_F47_C9_optionB' },
    { value: 'height-to-diameter-ratio-que-c', label: 'scenes.S7.S7_D13_F47_C9_optionC' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
