import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue: string) => selectedValue === 'value0',
  options: [
    { value: 'value0', label: 'scenes.S14.S14_D3_F52_C2_option_A' },
    { value: 'value1', label: 'scenes.S14.S14_D3_F52_C2_option_B' }
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
