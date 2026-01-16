import { RadioButtonInteraction } from '../interactives/interface';

const normalDistributionQuestionConfig: RadioButtonInteraction = {
  title: 'scenes.S11.S11_D3_FX_C1',
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
  ariaLabel: 'Normal distribution question with multiple choice options',
};

export default normalDistributionQuestionConfig;
