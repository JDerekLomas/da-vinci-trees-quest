import { Interaction } from '../interactives/interface';

const preItr3Question1Config: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'opt1',
  options: [
    {
      value: 'opt1',
      label:
        '(<span style="font-family: Besley; font-weight: bold; color: #DB0072;">1.5</span>, <span style="font-family: Besley; font-weight: bold; color: #0061FC;">1</span>)',
    },
    {
      value: 'opt2',
      label:
        '(<span style="font-family: Besley; font-weight: bold; color: #DB0072;">1</span>, <span style="font-family: Besley; font-weight: bold; color: #0061FC;">1.5</span>)',
    },
    {
      value: 'opt3',
      label:
        '(<span style="font-family: Besley; font-weight: bold; color: #DB0072;">-1.5</span>, <span style="font-family: Besley; font-weight: bold; color: #0061FC;">-1</span>)',
    },
  ],
  ariaLabel: '',
  title: '',
};

export default preItr3Question1Config;
