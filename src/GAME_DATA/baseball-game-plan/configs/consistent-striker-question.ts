import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'lucas',
  options: [
    { value: 'ethan', label: 'Ethan Miller' },
    { value: 'lucas', label: 'Lucas Johnson' },
    { value: 'grant', label: 'Grant Hawthorne' }
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;