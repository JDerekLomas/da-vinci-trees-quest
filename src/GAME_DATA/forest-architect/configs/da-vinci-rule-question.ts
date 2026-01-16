import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'da-vinci-rule-que-b',
  options: [
    { value: 'da-vinci-rule-que-a', label: 'scenes.S5.S5_D12_F28_C9_optionA' },
    { value: 'da-vinci-rule-que-b', label: 'scenes.S5.S5_D12_F28_C9_optionB' },
    { value: 'da-vinci-rule-que-c', label: 'scenes.S5.S5_D12_F28_C9_optionC' },
    { value: 'da-vinci-rule-que-d', label: 'scenes.S5.S5_D12_F28_C9_optionD' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;