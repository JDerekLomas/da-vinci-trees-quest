import { RadioButtonInteraction } from '../interactives/interface';

const interaction: RadioButtonInteraction = {
  title: '',
  type: 'radio-button',
  options: [
    { value: 'value0', label: 'scenes.S5.S5_D7_F21_C1_option1' },
    { value: 'value1', label: 'scenes.S5.S5_D7_F21_C1_option2' },
    { value: 'value2', label: 'scenes.S5.S5_D7_F21_C1_option3' },
    { value: 'value3', label: 'scenes.S5.S5_D7_F21_C1_option4' },
  ],
  correctnessFunction: (selectedValue: string) => selectedValue === 'value0',
  ariaLabel: '',
};

export default interaction;
