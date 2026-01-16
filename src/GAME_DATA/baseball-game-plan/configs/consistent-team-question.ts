import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'parkHigh',
  options: [
    { value: 'parkHigh', label: 'Park High' },
    { value: 'eagles', label: 'Eagles' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
