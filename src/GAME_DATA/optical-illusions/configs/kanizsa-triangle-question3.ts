import { RadioButtonInteraction } from '../interactives/interface';

const interaction: RadioButtonInteraction = {
  title: '',
  ariaLabel: '',
  type: 'radio-button',
  correctnessFunction: (selectedValue: string) => selectedValue === 'value2',
  options: [
    { value: 'value0', label: 'scenes.S8.S8_D0_F49_C9.sas' },
    { value: 'value1', label: 'scenes.S8.S8_D0_F49_C9.sss' },
    { value: 'value2', label: 'scenes.S8.S8_D0_F49_C9.asa' },
  ],
};

export default interaction;
