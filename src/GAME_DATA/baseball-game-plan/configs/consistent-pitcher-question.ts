import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'steve',
  options: [
    { value: 'steve', label: 'Steve' },
    { value: 'sam', label: 'Sam' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
