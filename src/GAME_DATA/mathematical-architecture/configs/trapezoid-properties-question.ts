import { Interaction } from '../interface';

const trapezoidPropertiesConfig: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'opt2',
  options: [
    {
      value: 'opt1',
      label: 'scenes.S11.question_3.option_1',
    },
    {
      value: 'opt2',
      label: 'scenes.S11.question_3.option_2',
    },
    {
      value: 'opt3',
      label: 'scenes.S11.question_3.option_3',
    },
    {
      value: 'opt4',
      label: 'scenes.S11.question_3.option_4',
    },
  ],
  ariaLabel: '',
  title: '',
};

export default trapezoidPropertiesConfig;
