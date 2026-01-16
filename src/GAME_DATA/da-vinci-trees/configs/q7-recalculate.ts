import { RadioButtonInteraction } from '../interactives/interface';

const interaction: RadioButtonInteraction = {
  type: 'radio-button',
  title: 'scenes.q7.heading',
  ariaLabel: 'Form factor application question',
  options: [
    { label: 'About 16 m³ (double 8)', value: '0' },
    { label: 'Still 8 m³ (unchanged)', value: '1' },
    { label: 'About 4 m³ (half of 8)', value: '2' },
    { label: 'About 0.5 m³', value: '3' },
  ],
  correctnessFunction: (selectedValue: string) => selectedValue === '2',
};

export default interaction;
