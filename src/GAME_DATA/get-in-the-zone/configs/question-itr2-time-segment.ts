import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'segment-b',
  options: [
    { value: 'segment-a', label: 'scenes.S8.S8_D13_FX_C1_optionA' },
    { value: 'segment-b', label: 'scenes.S8.S8_D13_FX_C1_optionB' },
    { value: 'segment-c', label: 'scenes.S8.S8_D13_FX_C1_optionC' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
