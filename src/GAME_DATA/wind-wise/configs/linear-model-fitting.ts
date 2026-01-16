import { Interaction, WindPowerDataPoint } from '../interactives/interface';

const interaction: Interaction = {
  type: 'linear-model-fitting',
  getEquation: (paramObject: Record<string, number>) => {
    const { slope, intercept } = paramObject;
    if (slope === undefined || intercept === undefined) return '';
    return `<span style="font-style: italic; color: #E0002B">P</span> = <span style="font-style: italic; color: #DB0072">${Math.abs(slope)}</span> <span style="font-style: italic; color: #0061FC">v</span> ${intercept >= 0 ? '+' : '−'} <span style="font-style: italic; color: #677600">${Math.abs(intercept)}</span>`;
  },
  inputs: [
    {
      id: 'slope',
      type: 'slider',
      label: 'scenes.S6.S6_D0_F12_C9.inputLabels.slope',
      min: -100,
      max: 150,
      step: 10,
      value: 50,
    },
    {
      id: 'intercept',
      type: 'slider',
      label: 'scenes.S6.S6_D0_F12_C9.inputLabels.intercept',
      min: -400,
      max: 400,
      step: 50,
      value: 0,
    },
  ],
  bestFit: { slope: 140, intercept: -350 },
  getModelPoints: (data: WindPowerDataPoint[], paramObject: Record<string, number>) => {
    const { slope, intercept } = paramObject;
    if (data.length === 0 || slope === undefined || intercept === undefined) return [];
    const points: WindPowerDataPoint[] = [];
    const xMax = Math.max(...data.map((d) => d.windSpeed), 20);
    for (let x = 0; x <= xMax; x += 0.5) {
      points.push({ windSpeed: x, power: slope * x + intercept });
    }
    return points;
  },
  getModelFit: (data: WindPowerDataPoint[], paramObject: Record<string, number>) => {
    const { slope, intercept } = paramObject;
    if (data.length === 0 || slope === undefined || intercept === undefined) return 0;
    const yMean = data.reduce((sum, point) => sum + point.power, 0) / data.length;
    const ssTotal = data.reduce((sum, point) => sum + Math.pow(point.power - yMean, 2), 0);
    const ssResidual = data.reduce(
      (sum, point) => sum + Math.pow(point.power - (slope * point.windSpeed + intercept), 2),
      0,
    );
    return Math.max(0, Math.min(100, (1 - ssResidual / ssTotal) * 100));
  },
  getAnnouncements: (id: string, prevValue: number, currValue: number) => {    
    switch (id) {
      case 'slope':
        if (currValue > 0) {
          return currValue > prevValue ? 'scenes.S6.S6_D0_F12_C9.announcements.slope.msg1' : 'scenes.S6.S6_D0_F12_C9.announcements.slope.msg2';
        } else if (currValue == 0) {
          return 'scenes.S6.S6_D0_F12_C9.announcements.slope.msg3';
        } else {
          return currValue > prevValue
            ? 'scenes.S6.S6_D0_F12_C9.announcements.slope.msg4'
            : 'scenes.S6.S6_D0_F12_C9.announcements.slope.msg5';
        }
      case 'intercept':
        if (currValue > prevValue) return 'scenes.S6.S6_D0_F12_C9.announcements.intercept.msg1';
        else return 'scenes.S6.S6_D0_F12_C9.announcements.intercept.msg2';
      default:
        return '';
    }
  },
  showInputs: true,
  showModelFit: true,
  graphConfig: {
    ariaLabel: 'scenes.S6.S6_D0_F12_C9.graphConfig.ariaLabel',
    showScatterPlot: true,
    showLinePlot: true,
    showReferenceLine: true,
    xAxis: {
      domain: [0, 20],
      labelValue: 'scenes.S6.S6_D0_F12_C9.graphConfig.xAxisLabel',
    },
    yAxis: {
      domain: [-500, 1600],
      labelValue: 'scenes.S6.S6_D0_F12_C9.graphConfig.yAxisLabel',
    },
    scatter: {
      name: 'scenes.S6.S6_D0_F12_C9.graphConfig.scatterName',
    },
    line: {
      name: 'scenes.S6.S6_D0_F12_C9.graphConfig.lineName',
    },
    tooltip: {
      xLabel: 'scenes.S6.S6_D0_F12_C9.graphConfig.tooltip.xLabel',
      yLabel: 'scenes.S6.S6_D0_F12_C9.graphConfig.tooltip.yLabel',
    },
  },
  translations: {
    modelPerformance: 'scenes.S6.S6_D0_F12_C9.translations.modelPerformance',
    optimizeFit: 'scenes.S6.S6_D0_F12_C9.translations.optimizeFit',
  },
};

export default interaction;
