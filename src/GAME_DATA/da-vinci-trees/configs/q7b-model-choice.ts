import { RadioButtonInteraction } from '../interactives/interface';

const interaction: RadioButtonInteraction = {
  type: 'radio-button',
  title: 'scenes.q7b.heading',
  ariaLabel: 'Model choice question',
  options: [
    { label: 'Model it as a cylinder and multiply by a form factor (0.4–0.6)', value: '0' },
    { label: 'Model it as a cone using V = ⅓πr²h', value: '1' },
    { label: 'Measure every branch individually for exact volume', value: '2' },
    { label: 'Assume all trees have the same volume regardless of size', value: '3' },
  ],
  correctnessFunction: (selectedValue: string) => selectedValue === '0',
};

export default interaction;
