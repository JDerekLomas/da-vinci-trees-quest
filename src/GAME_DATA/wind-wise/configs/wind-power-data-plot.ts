import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'wind-power-data-plot',
  getEquation: () => {
    return '';
  },
  inputs: [],
  bestFit: {},
  getModelPoints: () => [],
  getModelFit: () => 0,
  getAnnouncements: () => '',
  showInputs: false,
  showModelFit: false,
  graphConfig: {
    ariaLabel: 'scenes.S4.S4_D0_F7_C9.graphConfig.ariaLabel',
    showScatterPlot: true,
    showLinePlot: false,
    showReferenceLine: false,
    xAxis: {
      domain: [0, 20],
      labelValue: 'scenes.S4.S4_D0_F7_C9.graphConfig.xAxisLabel',
    },
    yAxis: {
      domain: [-500, 1600],
      labelValue: 'scenes.S4.S4_D0_F7_C9.graphConfig.yAxisLabel',
    },
    scatter: {
      name: 'scenes.S4.S4_D0_F7_C9.graphConfig.scatterName',
    },
    line: {
      name: 'scenes.S4.S4_D0_F7_C9.graphConfig.lineName',
    },
    tooltip: {
      xLabel: 'scenes.S4.S4_D0_F7_C9.graphConfig.tooltip.xLabel',
      yLabel: 'scenes.S4.S4_D0_F7_C9.graphConfig.tooltip.yLabel',
    },
  },
  translations: {},
};

export default interaction;
