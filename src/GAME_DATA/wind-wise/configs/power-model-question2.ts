import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'que7-c',
  options: [
    { value: 'que7-a', label: 'scenes.S14.S14_D11_FX_C9_optionA' },
    { value: 'que7-b', label: 'scenes.S14.S14_D11_FX_C9_optionB' },
    { value: 'que7-c', label: 'scenes.S14.S14_D11_FX_C9_optionC' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
