import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue: string) => selectedValue === 'value0',
  options: [
    { value: 'value0', label: '√3/2' },
    { value: 'value1', label: '-1/2' },
    { value: 'value2', label: '-√3/2' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
