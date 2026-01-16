import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'postulate-que-c',
  options: [
    { value: 'postulate-que-a', label: 'scenes.S7.S7_D17_FX_C9_optionA' },
    { value: 'postulate-que-b', label: 'scenes.S7.S7_D17_FX_C9_optionB' },
    { value: 'postulate-que-c', label: 'scenes.S7.S7_D17_FX_C9_optionC' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
