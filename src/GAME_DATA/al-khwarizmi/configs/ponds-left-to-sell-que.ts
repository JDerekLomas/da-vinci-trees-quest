import { RadioButtonInteraction } from '../interactives/interface';

const interaction: RadioButtonInteraction = {
  title: '',
  ariaLabel: '',
  type: 'radio-button',
  correctnessFunction: (selectedValue: string) => selectedValue === 'value2',
  options: [
    { value: 'value1', label: 'scenes.S21.S21_D3_F102_C9_optionA' },
    { value: 'value2', label: 'scenes.S21.S21_D3_F102_C9_optionB' },
    { value: 'value3', label: 'scenes.S21.S21_D3_F102_C9_optionC' },
  ],
};

export default interaction;
