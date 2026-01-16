import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'ecosystem-explorer',
  title: 'scenes.S14.S14_D0_F50_C9.header.title',
  ariaLabel: 'scenes.S14.S14_D0_F50_C9.header.title',
  unit: 'scenes.S14.S14_D0_F50_C9.unit',
  sliderInput: {
    id: 'stars',
    type: 'slider',
    label: 'scenes.S14.S14_D0_F50_C9.sliderInput.label',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 0,
  },
  projectionLabels: {
    heading: 'scenes.S14.S14_D0_F50_C9.projectionLabels.heading',
    urchin: 'scenes.S14.S14_D0_F50_C9.projectionLabels.urchin',
    kelp: 'scenes.S14.S14_D0_F50_C9.projectionLabels.kelp',
  },
  chart: {
    heading: {
      label1: 'scenes.S14.S14_D0_F50_C9.chart.heading.label1',
      label2: 'scenes.S14.S14_D0_F50_C9.chart.heading.label2',
    },
    axisLabel: {
      x1: 'scenes.S14.S14_D0_F50_C9.chart.axisLabel.x1',
      x2: 'scenes.S14.S14_D0_F50_C9.chart.axisLabel.x2',
      y1: 'scenes.S14.S14_D0_F50_C9.chart.axisLabel.y1',
      y2: 'scenes.S14.S14_D0_F50_C9.chart.axisLabel.y2',
    },
    legend: {
      historicalDataLabel: 'scenes.S14.S14_D0_F50_C9.chart.legend.historicalDataLabel',
      modelProjectionLabel: 'scenes.S14.S14_D0_F50_C9.chart.legend.modelProjectionLabel',
      projectedPatternLabel: 'scenes.S14.S14_D0_F50_C9.chart.legend.projectedPatternLabel',
    },
  },
  historicalData: [
    { year: 2014, kelp: 1.97, urchin: 0.474, stars: 0.001 },
    { year: 2015, kelp: 2.68, urchin: 2.337, stars: 0.001 },
    { year: 2016, kelp: 2.18, urchin: 2.281, stars: 0 },
    { year: 2017, kelp: 0.6, urchin: 7.507, stars: 0 },
    { year: 2018, kelp: 1.31, urchin: 9.182, stars: 0.0002 },
    { year: 2019, kelp: 0.47, urchin: 11.86, stars: 0 },
  ],
};

export default interaction;
