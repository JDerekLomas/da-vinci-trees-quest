import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue: string) => selectedValue === 'value3',
  options: [
    { value: 'value0', label: 'scenes.S8.S8_D8_F56_C1_option_A' },
    { value: 'value1', label: 'scenes.S8.S8_D8_F56_C1_option_B' },
    { value: 'value2', label: 'scenes.S8.S8_D8_F56_C1_option_C' },
    { value: 'value3', label: 'scenes.S8.S8_D8_F56_C1_option_D' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
