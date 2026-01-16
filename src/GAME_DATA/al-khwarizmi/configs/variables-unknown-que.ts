import { RadioButtonInteraction } from '../interactives/interface';

const interaction: RadioButtonInteraction = {
  title: '',
  ariaLabel: '',
  type: 'radio-button',
  correctnessFunction: (selectedValue: string) => selectedValue === 'value1',
  options: [
    { value: 'value1', label: 'scenes.S27.S27_D14_F142_C1_optionA' },
    { value: 'value2', label: 'scenes.S27.S27_D14_F142_C1_optionB' },
    { value: 'value3', label: 'scenes.S27.S27_D14_F142_C1_optionC' },
    { value: 'value4', label: 'scenes.S27.S27_D14_F142_C1_optionD' },
  ],
};

export default interaction;
