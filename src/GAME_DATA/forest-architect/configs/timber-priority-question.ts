import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'timber-priority-que-a',
  options: [
    { value: 'timber-priority-que-a', label: 'scenes.S9.S9_D3_F56_C9_optionA' },
    { value: 'timber-priority-que-b', label: 'scenes.S9.S9_D3_F56_C9_optionB' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;