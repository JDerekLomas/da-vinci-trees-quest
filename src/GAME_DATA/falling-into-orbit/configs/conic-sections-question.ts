import { RadioButtonInteraction } from '../interactives/interface';

const conicSectionsQuestionConfig: RadioButtonInteraction = {
  title: 'scenes.S9.S9_D12_FX_C1',
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'opt1',
  options: [
    {
      value: 'opt1',
      label: 'scenes.S9.question_1.option_1',
    },
    {
      value: 'opt2',
      label: 'scenes.S9.question_1.option_2',
    },
    {
      value: 'opt3',
      label: 'scenes.S9.question_1.option_3',
    },
    {
      value: 'opt4',
      label: 'scenes.S9.question_1.option_4',
    },
  ],
};

export default conicSectionsQuestionConfig;
