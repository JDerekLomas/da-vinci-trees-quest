import { RadioButtonInteraction } from '../interactives/interface';

const interaction: RadioButtonInteraction = {
  type: 'radio-button',
  title: 'scenes.q2.heading',
  ariaLabel: 'Deciduous tree shape question',
  options: [
    { label: 'A cylinder (V = πr²h)', value: '0' },
    { label: 'A cone (V = ⅓πr²h)', value: '1' },
    { label: 'A sphere (V = ⁴⁄₃πr³)', value: '2' },
    { label: 'A cube (V = s³)', value: '3' },
  ],
  correctnessFunction: (selectedValue: string) => selectedValue === '0',
};

export default interaction;
