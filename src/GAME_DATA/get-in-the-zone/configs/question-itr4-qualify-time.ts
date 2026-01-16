import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'value-a',
  options: [
    { value: 'value-a', label: 'scenes.S12.S12_D15_FX_C1_optionA' },
    { value: 'value-b', label: 'scenes.S12.S12_D15_FX_C1_optionB' },
    { value: 'value-c', label: 'scenes.S12.S12_D15_FX_C1_optionC' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
