import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'cylindrical-conical-ratio-que-a',
  options: [
    { value: 'cylindrical-conical-ratio-que-a', label: 'scenes.S5.S5_D9_F25_C9_optionA' },
    { value: 'cylindrical-conical-ratio-que-b', label: 'scenes.S5.S5_D9_F25_C9_optionB' },
    { value: 'cylindrical-conical-ratio-que-c', label: 'scenes.S5.S5_D9_F25_C9_optionC' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
