import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue: string) => selectedValue === 'value1',
  options: [
    { value: 'value0', label: '45°' },
    { value: 'value1', label: '90°' },
    { value: 'value2', label: '180°' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
