import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'que6-b',
  options: [
    { value: 'que6-a', label: 'scenes.S14.S14_D6_FX_C9_optionA' },
    { value: 'que6-b', label: 'scenes.S14.S14_D6_FX_C9_optionB' },
    { value: 'que6-c', label: 'scenes.S14.S14_D6_FX_C9_optionC' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
