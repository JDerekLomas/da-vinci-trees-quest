import { Interaction } from '../interface';

const parallelogramPropertiesConfig: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'opt4',
  options: [
    {
      value: 'opt1',
      label: 'scenes.S9.question_2.option_1',
    },
    {
      value: 'opt2',
      label: 'scenes.S9.question_2.option_2',
    },
    {
      value: 'opt3',
      label: 'scenes.S9.question_2.option_3',
    },
    {
      value: 'opt4',
      label: 'scenes.S9.question_2.option_4',
    },
  ],
  ariaLabel: '',
  title: '',
};

export default parallelogramPropertiesConfig;
