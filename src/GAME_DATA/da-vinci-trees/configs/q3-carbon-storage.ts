import { RadioButtonInteraction } from '../interactives/interface';

const interaction: RadioButtonInteraction = {
  type: 'radio-button',
  title: 'scenes.q3.heading',
  ariaLabel: 'Carbon percentage question',
  options: [
    { label: 'About 25%', value: '0' },
    { label: 'About 75%', value: '1' },
    { label: 'About 50%', value: '2' },
    { label: 'About 10%', value: '3' },
  ],
  correctnessFunction: (selectedValue: string) => selectedValue === '2',
};

export default interaction;
