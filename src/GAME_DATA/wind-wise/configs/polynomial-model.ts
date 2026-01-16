import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'polinomial-model-explorer',
  inputs: [
    {
      id: 'cubic',
      type: 'slider',
      label: 'scenes.S14.S14_D0_F73_C9.inputLabels.cubic',
      min: 0,
      max: 10,
      step: 0.1,
      value: 0.4,
      disabled: false,
    },
    {
      id: 'quadratic',
      type: 'slider',
      label: 'scenes.S14.S14_D0_F73_C9.inputLabels.quadratic',
      min: 0,
      max: 10,
      step: 0.1,
      value: 5,
      disabled: true,
    },
    {
      id: 'linear',
      type: 'slider',
      label: 'scenes.S14.S14_D0_F73_C9.inputLabels.linear',
      min: 0,
      max: 10,
      step: 0.1,
      value: 3.5,
      disabled: true,
    },
  ],
  modelComponents: {
    cubic: {
      label: 'scenes.S14.S14_D0_F73_C9.modelComponents.cubic',
      color: '#005F20',
      value: 0,
      shape: 'triangle',
    },
    quadratic: {
      label: 'scenes.S14.S14_D0_F73_C9.modelComponents.quadratic',
      color: '#0055B2',
      value: 0,
      shape: 'square',
    },
    linear: {
      label: 'scenes.S14.S14_D0_F73_C9.modelComponents.linear',
      color: '#9F008F',
      value: 0,
      shape: 'diamond',
    },
    full: {
      label: 'scenes.S14.S14_D0_F73_C9.modelComponents.full',
      color: '#5A3714',
      value: 0,
      shape: 'circle',
    },
  },
  graphConfig: {
    ariaLabel: 'scenes.S14.S14_D0_F73_C9.graphConfig.ariaLabel',
    xAxis: {
      domain: [0, 20],
      labelValue: 'scenes.S14.S14_D0_F73_C9.graphConfig.xAxisLabel',
    },
    yAxis: {
      domain: [0, 1600],
      labelValue: 'scenes.S14.S14_D0_F73_C9.graphConfig.yAxisLabel',
    },
    scatter: {
      name: 'scenes.S14.S14_D0_F73_C9.graphConfig.scatterName',
    },
  },
  translations: {
    fitLabel: 'scenes.S14.S14_D0_F73_C9.translations.fitLabel',
    modelComponentsLabel: 'scenes.S14.S14_D0_F73_C9.translations.modelComponentsLabel',
  },
};

export default interaction;
