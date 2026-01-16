import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'interactive-1-que-a',
  options: [
    { value: 'interactive-1-que-a', label: 'scenes.S5.S5_D0_FX_C9.translations.slide2.questionOption1' },
    { value: 'interactive-1-que-b', label: 'scenes.S5.S5_D0_FX_C9.translations.slide2.questionOption2' },
    { value: 'interactive-1-que-c', label: 'scenes.S5.S5_D0_FX_C9.translations.slide2.questionOption3' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
