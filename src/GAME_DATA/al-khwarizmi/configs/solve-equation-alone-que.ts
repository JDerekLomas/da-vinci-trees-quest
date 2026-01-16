import { RadioButtonInteraction } from '../interactives/interface';

const interaction: RadioButtonInteraction = {
  title: '',
  ariaLabel: '',
  type: 'radio-button',
  correctnessFunction: (selectedValue: string) => selectedValue === 'value2',
  options: [
    { value: 'value1', label: 'scenes.S27.S27_D16_F144_C1_optionA' },
    { value: 'value2', label: 'scenes.S27.S27_D16_F144_C1_optionB' },
  ],
};

export default interaction;
