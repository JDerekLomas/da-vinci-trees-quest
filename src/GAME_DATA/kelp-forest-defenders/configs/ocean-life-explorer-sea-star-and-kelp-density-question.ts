import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue: string) => selectedValue === 'value2',
  options: [
    { value: 'value0', label: 'scenes.S11.S11_D10_F31_C9_option_A' },
    { value: 'value1', label: 'scenes.S11.S11_D10_F31_C9_option_B' },
    { value: 'value2', label: 'scenes.S11.S11_D10_F31_C9_option_C' },
    { value: 'value3', label: 'scenes.S11.S11_D10_F31_C9_option_D' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
