import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue: string) => selectedValue === 'value1',
  options: [
    { value: 'value0', label: 'scenes.S10.S10_D3_F86_C2_option1' },
    { value: 'value1', label: 'scenes.S10.S10_D3_F86_C2_option2' },
    { value: 'value2', label: 'scenes.S10.S10_D3_F86_C2_option3' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
