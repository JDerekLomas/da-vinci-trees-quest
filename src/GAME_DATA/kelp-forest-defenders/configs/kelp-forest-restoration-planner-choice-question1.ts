import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue: string) => selectedValue === 'value1',
  options: [
    { value: 'value0', label: 'scenes.S14.S14_D5_F54_C2_option_A' },
    { value: 'value1', label: 'scenes.S14.S14_D5_F54_C2_option_B' },
    { value: 'value2', label: 'scenes.S14.S14_D5_F54_C2_option_C' },
    { value: 'value3', label: 'scenes.S14.S14_D5_F54_C2_option_D' }
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
