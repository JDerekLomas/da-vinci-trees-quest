import { Interaction } from '../interactives/interface';

const itr2Question1Config: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'opt2',
  options: [
    {
      value: 'opt1',
      label:
        '(<span style="font-family: Besley; font-weight: bold; color: #DB0072;">2</span>, <span style="font-family: Besley; font-weight: bold; color: #0061FC;">-3</span>)',
    },
    {
      value: 'opt2',
      label:
        '(<span style="font-family: Besley; font-weight: bold; color: #DB0072;">-2</span>, <span style="font-family: Besley; font-weight: bold; color: #0061FC;">3</span>)',
    },
    {
      value: 'opt3',
      label:
        '(<span style="font-family: Besley; font-weight: bold; color: #DB0072;">-2</span>, <span style="font-family: Besley; font-weight: bold; color: #0061FC;">-3</span>)',
    },
  ],
  ariaLabel: '',
  title: '',
};

export default itr2Question1Config;
