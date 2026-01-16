import { RadioButtonInteraction } from '../interactives/interface';

const satelliteOrbitQuestionConfig: RadioButtonInteraction = {
  title: 'scenes.S13.S13_D15_FX_C1',
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'opt2',
  options: [
    {
      value: 'opt1',
      label: 'scenes.S13.question_1.option_1',
    },
    {
      value: 'opt2',
      label: 'scenes.S13.question_1.option_2',
    },
    {
      value: 'opt3',
      label: 'scenes.S13.question_1.option_3',
    },
    {
      value: 'opt4',
      label: 'scenes.S13.question_1.option_4',
    },
  ],
};

export default satelliteOrbitQuestionConfig;
