import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'b',
  options: [
    { value: 'a', label: 'scenes.S10.S10_D0_F82_C9.translations.scalene' },
    { value: 'b', label: 'scenes.S10.S10_D0_F82_C9.translations.isosceles' },
    { value: 'c', label: 'scenes.S10.S10_D0_F82_C9.translations.equilateral' },
    { value: 'd', label: 'scenes.S10.S10_D0_F82_C9.translations.right' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
