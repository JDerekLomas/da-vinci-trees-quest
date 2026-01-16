import { RadioButtonInteraction } from '../interactives/interface';

const interaction: RadioButtonInteraction = {
  type: 'radio-button',
  title: 'scenes.q1.heading',
  ariaLabel: 'Da Vinci rule question',
  options: [
    { label: '0.16 m² (the same as the trunk)', value: '0' },
    { label: '0.08 m² (half the trunk area)', value: '1' },
    { label: '0.32 m² (double the trunk area)', value: '2' },
    { label: 'It depends on how many branches there are', value: '3' },
  ],
  correctnessFunction: (selectedValue: string) => selectedValue === '0',
};

export default interaction;
