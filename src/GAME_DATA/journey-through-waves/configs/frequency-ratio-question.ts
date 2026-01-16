import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue: string) => selectedValue === 'value1',
  options: [
    { value: 'value0', label: '1:1' },
    { value: 'value1', label: '1:2' },
    { value: 'value2', label: '1:3' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
