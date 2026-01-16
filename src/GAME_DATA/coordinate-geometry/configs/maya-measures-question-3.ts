import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'a',
  options: [
    { value: 'a', label: 'scenes.S8.S8_D9_F66_C2_optionA' },
    { value: 'b', label: 'scenes.S8.S8_D9_F66_C2_optionB' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
