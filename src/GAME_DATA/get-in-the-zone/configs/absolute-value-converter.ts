import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  title: 'scenes.S12.S12_D0_F80_C9.header.title',
  type: 'absolute-value-converter',
  ariaLabel: 'scenes.S12.S12_D0_F80_C9.header.title',
  rangeVisualizationLabel: 'scenes.S12.S12_D0_F80_C9.rangeVisualizationLabel',
  absoluteValueLabel: 'scenes.S12.S12_D0_F80_C9.absoluteValueLabel',
  middlePoint: {
    heading: 'scenes.S12.S12_D0_F80_C9.middlePoint.heading',
    label: 'scenes.S12.S12_D0_F80_C9.middlePoint.label',
    formula: 'scenes.S12.S12_D0_F80_C9.middlePoint.formula',
  },
  deviation: {
    heading: 'scenes.S12.S12_D0_F80_C9.deviation.heading',
    label: 'scenes.S12.S12_D0_F80_C9.deviation.label',
    formula: 'scenes.S12.S12_D0_F80_C9.deviation.formula',
  },
  lowerBoundInput: {
    id: 'lower-bound',
    label: 'scenes.S12.S12_D0_F80_C9.lowerBoundLabel',
    type: 'slider',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
  },
  upperBoundInput: {
    id: 'upper-bound',
    label: 'scenes.S12.S12_D0_F80_C9.upperBoundLabel',
    type: 'slider',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 60,
  },
};

export default interaction;
