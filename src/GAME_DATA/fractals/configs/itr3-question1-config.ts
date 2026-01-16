import { Interaction } from '../interactives/interface';

const itr3Question1Config: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'opt2',
  options: [
    {
      value: 'opt1',
      label: '<span style="font-family: Besley; font-weight: bold;">1</span>',
    },
    {
      value: 'opt2',
      label: '<span style="font-family: Besley; font-weight: bold;">2</span>',
    },
    {
      value: 'opt3',
      label: '<span style="font-family: Besley; font-weight: bold;">3</span>',
    },
  ],
  ariaLabel: '',
  title: '',
};

export default itr3Question1Config;
