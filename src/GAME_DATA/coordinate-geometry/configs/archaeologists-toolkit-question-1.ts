import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'a',
  options: [
    { value: 'a', label: 'scenes.S10.S10_D0_F82_C9.translations.square' },
    { value: 'b', label: 'scenes.S10.S10_D0_F82_C9.translations.trapezoid' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
