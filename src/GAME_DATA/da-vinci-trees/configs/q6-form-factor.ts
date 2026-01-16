import { RadioButtonInteraction } from '../interactives/interface';

const interaction: RadioButtonInteraction = {
  type: 'radio-button',
  title: 'scenes.q6.heading',
  ariaLabel: 'Form factor range question',
  options: [
    { label: 'Exactly 1.0', value: '0' },
    { label: 'Greater than 1.0', value: '1' },
    { label: 'Less than 0.1', value: '2' },
    { label: 'Between 0.4 and 0.6', value: '3' },
  ],
  correctnessFunction: (selectedValue: string) => selectedValue === '3',
};

export default interaction;
