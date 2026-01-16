import { ComplexNumberPlotterConfig } from '../interactives/interface';

const complexNumberPlotterConfig: ComplexNumberPlotterConfig = {
  parameters: [
    {
      id: 'realPart',
      label: 'scenes.S7.S7_D0_FX_C9.realPart',
      min: -4,
      max: 4,
      step: 0.5,
      defaultValue: 0,
    },
    {
      id: 'imaginaryPart',
      label: 'scenes.S7.S7_D0_FX_C9.imaginaryPart',
      min: -4,
      max: 4,
      step: 0.5,
      defaultValue: 0,
    },
  ],
  instruction: 'scenes.S7.S7_D0_FX_C9.instruction',
  buttons: {
    plotNumber: 'scenes.S7.S7_D0_FX_C9.plotNumber',
    clearAll: 'scenes.S7.S7_D0_FX_C9.clearAll',
  },
  complexPlaneConfig: {
    dimension: 8,
    min: -4,
    max: 4,
    step: 1,
  },
};

export default complexNumberPlotterConfig;
