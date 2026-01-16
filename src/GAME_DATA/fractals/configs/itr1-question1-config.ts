import { Interaction } from '../interactives/interface';

const itr1Question1Config: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'opt3',
  options: [
    {
      value: 'opt1',
      label: 'scenes.S5.question_1.option_1',
    },
    {
      value: 'opt2',
      label: 'scenes.S5.question_1.option_2',
    },
    {
      value: 'opt3',
      label: 'scenes.S5.question_1.option_3',
    },
  ],
  ariaLabel: '',
  title: '',
};

export default itr1Question1Config;
