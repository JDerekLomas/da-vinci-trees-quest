import { RadioButtonInteraction } from '../interactives/interface';

const interaction: RadioButtonInteraction = {
  title: '',
  ariaLabel: '',
  type: 'radio-button',
  correctnessFunction: (selectedValue: string) => selectedValue === 'more',
  options: [
    { value: 'more', label: 'scenes.S27.S27_D9_F143_C1_optionA' },
    { value: 'less', label: 'scenes.S27.S27_D9_F143_C1_optionB' },
  ],
};

export default interaction;