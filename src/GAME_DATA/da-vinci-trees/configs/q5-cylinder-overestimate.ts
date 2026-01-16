import { RadioButtonInteraction } from '../interactives/interface';

const interaction: RadioButtonInteraction = {
  type: 'radio-button',
  title: 'scenes.q5.heading',
  ariaLabel: 'Cylinder overestimate question',
  options: [
    { label: 'Too low (an underestimate)', value: '0' },
    { label: 'Too high (an overestimate)', value: '1' },
    { label: 'Exactly right', value: '2' },
    { label: 'Impossible to know', value: '3' },
  ],
  correctnessFunction: (selectedValue: string) => selectedValue === '1',
};

export default interaction;
