import { RadioButtonInteraction } from '../interactives/interface';

const interaction: RadioButtonInteraction = {
  title: '',
  ariaLabel: '',
  type: 'radio-button',
  correctnessFunction: (selectedValue: string) => selectedValue === 'value3',
  options: [
    { value: 'value1', label: 'scenes.S27.S27_D17_F145_C1_optionA' },
    { value: 'value2', label: 'scenes.S27.S27_D17_F145_C1_optionB' },
    { value: 'value3', label: 'scenes.S27.S27_D17_F145_C1_optionC' },
  ],
};

export default interaction;
