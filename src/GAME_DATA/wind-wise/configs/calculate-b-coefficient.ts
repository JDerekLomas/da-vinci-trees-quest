import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'que3-b',
  options: [
    { value: 'que3-a', label: 'scenes.S8.S8_D2_F30_C9_optionA' },
    { value: 'que3-b', label: 'scenes.S8.S8_D2_F30_C9_optionB' },
    { value: 'que3-c', label: 'scenes.S8.S8_D2_F30_C9_optionC' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
