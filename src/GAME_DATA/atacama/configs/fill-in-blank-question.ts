import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'greater-than',
  options: [
    { value: 'less-than', label: '<' },
    { value: 'equal', label: '=' },
    { value: 'greater-than', label: '>' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
