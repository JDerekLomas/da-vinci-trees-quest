import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === '21',
  options: [
    { value: '21', label: '21' },
    { value: '14', label: '14' },
    { value: '18', label: '18' },
    { value: '20', label: '20' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
