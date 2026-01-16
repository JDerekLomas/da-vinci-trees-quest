import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  inputs: [
    {
      id: 'nitrogenLevel',
      type: 'slider',
      title: 'scenes.S9.S9_D0_F21C3A_C9.title',
      titleColor: '#0055B2',
      label: 'scenes.S9.S9_D0_F21C3A_C9.labels.nitrogen_level',
      unit: 'scenes.S9.S9_D0_F21C3A_C9.labels.unit',
      sliderConfig: {
        min: 0,
        max: 8,
        step: 0.1,
        defaultValue: 2.5,
      },
    },
  ],
  displayCards: [
    {
      id: 'revenue',
      title: 'scenes.S9.S9_D0_F21C3A_C9.labels.revenue',
      textColor: '#0055B2',
      getDisplayValue: (xValue: number) => {
        return 50 * (-0.5 * xValue * xValue + 4 * xValue + 10);
      },
    },
    {
      id: 'cost',
      title: 'scenes.S9.S9_D0_F21C3A_C9.labels.cost',
      textColor: '#A6001A',
      getDisplayValue: (xValue: number) => {
        return 75 * xValue + 600;
      },
    },
  ],
  graphConfig: {
    ariaLabel: 'scenes.S9.S9_D0_F21C3A_C9.title',
    x: {
      label: 'scenes.S9.S9_D0_F21C3A_C9.graph.x_axis_label',
      min: 0,
      max: 8,
      steps: 0.1,
      tooltipLabel: 'scenes.S9.S9_D0_F21C3A_C9.graph.tooltip.tooltipX',
      tooltipLabelValue: 'nitrogenLevel',
    },
    y: {
      label: 'scenes.S9.S9_D0_F21C3A_C9.graph.y_axis_label',
    },
    referenceLines: [
      {
        value: 1,
        stroke: '#94a3b8',
        label: 'scenes.S9.S9_D0_F21C3A_C9.labels.ref_line_1',
      },
      {
        value: 4,
        stroke: '#94a3b8',
        label: 'scenes.S9.S9_D0_F21C3A_C9.labels.ref_line_2',
      },
    ],
    lines: [
      {
        dataKey: 'revenue',
        stroke: '#0055B2',
        name: 'scenes.S9.S9_D0_F21C3A_C9.graph.tooltip.revenue',
        tooltipLabel: 'scenes.S9.S9_D0_F21C3A_C9.labels.nitrogen_level',
        calculateYValue: (xValue: number) => {
          return 50 * (-0.5 * xValue * xValue + 4 * xValue + 10);
        },
      },
      {
        dataKey: 'cost',
        stroke: '#A6001A',
        name: 'scenes.S9.S9_D0_F21C3A_C9.graph.tooltip.cost',
        tooltipLabel: 'scenes.S9.S9_D0_F21C3A_C9.labels.nitrogen_level',
        calculateYValue: (xValue: number) => {
          return 75 * xValue + 600;
        },
      },
    ],
    showLegend: true,
  },
  equationSolution: 'scenes.S9.S9_D0_F21C3A_C9.equation_solution',
};

export default interaction;
