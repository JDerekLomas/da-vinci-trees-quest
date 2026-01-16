import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'transformations-on-kick-drum',
  totalSteps: 2,
  inputs: [
    {
      id: 'verticalShift',
      type: 'slider',
      label: 'scenes.S7.S7_D0_F59_C9.translations.verticalShiftLabel',
      min: -0.5,
      max: 0.5,
      value: 0.1,
      step: 0.1,
    },
    {
      id: 'verticalScale',
      type: 'slider',
      label: 'scenes.S7.S7_D0_F59_C9.translations.verticalScaleLabel',
      min: 0.5,
      max: 2,
      value: 1.2,
      step: 0.1,
    },
    {
      id: 'horizontalShift',
      type: 'slider',
      label: 'scenes.S7.S7_D0_F59_C9.translations.horizontalShiftLabel',
      min: -0.5,
      max: 0.5,
      value: 0.2,
      step: 0.1,
    },
    {
      id: 'horizontalScale',
      type: 'slider',
      label: 'scenes.S7.S7_D0_F59_C9.translations.horizontalScaleLabel',
      min: 0.5,
      max: 2,
      value: 0.8,
      step: 0.1,
    },
  ],
  translations: {
    adsrValuesLabel: 'scenes.S7.S7_D0_F59_C9.translations.adsrValuesLabel',
    transformationsParamsLabel: 'scenes.S7.S7_D0_F59_C9.translations.transformationsParamsLabel',
    testLabel: 'scenes.S7.S7_D0_F59_C9.translations.testLabel',
    playLabel: 'scenes.S7.S7_D0_F59_C9.translations.playLabel',
    transformed: 'scenes.S7.S7_D0_F59_C9.translations.transformed',
    xAxisLabel: 'scenes.S7.S7_D0_F59_C9.translations.xAxisLabel',
    yAxisLabel: 'scenes.S7.S7_D0_F59_C9.translations.yAxisLabel',
    target: 'scenes.S7.S7_D0_F59_C9.translations.target',
  },
};

export default interaction;
