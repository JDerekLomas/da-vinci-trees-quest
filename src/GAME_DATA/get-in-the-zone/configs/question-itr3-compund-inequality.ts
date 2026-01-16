import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'value-a',
  options: [
    { value: 'value-a', label: 'scenes.S10.S10_D12_FX_C1_optionA' },
    { value: 'value-b', label: 'scenes.S10.S10_D12_FX_C1_optionB' },
    { value: 'value-c', label: 'scenes.S10.S10_D12_FX_C1_optionC' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
