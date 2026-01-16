import { Interaction } from '../interactives/interface';

const preItr3Question2Config: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'opt3',
  options: [
    {
      value: 'opt1',
      label:
        '(<span style="font-family: Besley; font-weight: bold; color: #DB0072;">-1.25</span>, <span style="font-family: Besley; font-weight: bold; color: #0061FC;">-3</span>)',
    },
    {
      value: 'opt2',
      label:
        '(<span style="font-family: Besley; font-weight: bold; color: #DB0072;">3</span>, <span style="font-family: Besley; font-weight: bold; color: #0061FC;">1.25</span>)',
    },
    {
      value: 'opt3',
      label:
        '(<span style="font-family: Besley; font-weight: bold; color: #DB0072;">1.25</span>, <span style="font-family: Besley; font-weight: bold; color: #0061FC;">3</span>)',
    },
  ],
  ariaLabel: '',
  title: '',
};

export default preItr3Question2Config;
