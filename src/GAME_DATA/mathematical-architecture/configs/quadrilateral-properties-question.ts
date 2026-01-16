import { Interaction } from '../interface';

const itr4Question2Config: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'opt2',
  options: [
    {
      value: 'opt1',
      label: 'scenes.S7.question_1.option_1',
    },
    {
      value: 'opt2',
      label: 'scenes.S7.question_1.option_2',
    },
    {
      value: 'opt3',
      label: 'scenes.S7.question_1.option_3',
    },
  ],
  ariaLabel: '',
  title: '',
};

export default itr4Question2Config;
