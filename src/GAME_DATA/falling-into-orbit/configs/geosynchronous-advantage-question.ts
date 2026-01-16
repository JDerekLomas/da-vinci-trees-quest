import { RadioButtonInteraction } from '../interactives/interface';

const geosynchronousAdvantageQuestionConfig: RadioButtonInteraction = {
  title: 'scenes.S11.S11_D8_FX_C1',
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'opt2',
  options: [
    {
      value: 'opt1',
      label: 'scenes.S11.question_1.option_1',
    },
    {
      value: 'opt2',
      label: 'scenes.S11.question_1.option_2',
    },
    {
      value: 'opt3',
      label: 'scenes.S11.question_1.option_3',
    },
    {
      value: 'opt4',
      label: 'scenes.S11.question_1.option_4',
    },
  ],
};

export default geosynchronousAdvantageQuestionConfig;
