import { BoxPlotInteraction } from '../interactives/interface';

const interaction: BoxPlotInteraction = {
  title: 'scenes.S8.S8_D0_F35_C9.title',
  type: 'box-plot',
  ariaLabel: 'scenes.S8.S8_D0_F35_C9.aria_label',
  starterData: {
    'scenes.S8.S8_D0_F35_C9.pitchers.scherzer': {
      min: 35,
      q1: 45,
      median: 52,
      q3: 58,
      max: 65,
    },
    'scenes.S8.S8_D0_F35_C9.pitchers.cole': {
      min: 32,
      q1: 47,
      median: 50,
      q3: 54,
      max: 63,
    },
    'scenes.S8.S8_D0_F35_C9.pitchers.degrom': {
      min: 30,
      q1: 42,
      median: 51,
      q3: 57,
      max: 64,
    },
    'scenes.S8.S8_D0_F35_C9.pitchers.all': {
      min: 30,
      q1: 43,
      median: 51,
      q3: 57,
      max: 65,
    },
  },
  defaultStarter: 'scenes.S8.S8_D0_F35_C9.pitchers.all',
  xAxisRange: {
    min: 0,
    max: 70,
    step: 10,
  },
};

export default interaction;
