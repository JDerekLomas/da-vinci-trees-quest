import { RadioButtonInteraction } from '../interactives/interface';

const interaction: RadioButtonInteraction = {
  type: 'radio-button',
  title: 'scenes.q8.heading',
  ariaLabel: 'Forest carbon estimation question',
  options: [
    { label: 'Measure every single tree in the forest', value: '0' },
    { label: 'Measure sample plots and scale up to the whole forest', value: '1' },
    { label: 'Guess based on the forest size', value: '2' },
    { label: 'Cut down all trees and weigh them', value: '3' },
  ],
  correctnessFunction: (selectedValue: string) => selectedValue === '1',
};

export default interaction;
