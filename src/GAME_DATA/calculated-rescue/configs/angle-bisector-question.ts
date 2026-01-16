import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue: string) => selectedValue === 'value1',
  options: [
    { value: 'value0', label: 'scenes.S8.S8_D15_F15_C2_option1' },
    { value: 'value1', label: 'scenes.S8.S8_D15_F15_C2_option2' },
    { value: 'value2', label: 'scenes.S8.S8_D15_F15_C2_option3' },
    { value: 'value3', label: 'scenes.S8.S8_D15_F15_C2_option4' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
