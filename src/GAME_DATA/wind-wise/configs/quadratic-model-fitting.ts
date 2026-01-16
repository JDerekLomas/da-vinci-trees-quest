import { Interaction, WindPowerDataPoint } from '../interactives/interface';

const interaction: Interaction = {
  type: 'quadratic-model-fitting',
  getEquation: (paramObject: Record<string, number>) => {
    const { bend, slope, intercept } = paramObject;
    if (bend === undefined || slope === undefined || intercept === undefined) return '';
    return `<span style="font-style: italic;  color: #E0002B">P</span> = <span style="font-style: italic; color: #8E24AA">${bend}</span> <span style="font-style: italic; color: #0061FC">v²</span> ${slope >= 0 ? '+' : '−'} <span style="font-style: italic; color: #DB0072">${Math.abs(slope)}</span> <span style="font-style: italic; color: #0061FC">v</span> ${intercept >= 0 ? '+' : '−'} <span style="font-style: italic; color: #677600">${Math.abs(intercept)}</span>`;
  },
  inputs: [
    {
      id: 'bend',
      type: 'slider',
      label: 'scenes.S8.S8_D0_F29_C9.inputLabels.bend',
      min: 0,
      max: 10,
      step: 0.1,
      value: 2,
    },
    {
      id: 'slope',
      type: 'slider',
      label: 'scenes.S8.S8_D0_F29_C9.inputLabels.slope',
      min: 0,
      max: 100,
      step: 1,
      value: 50,
    },
    {
      id: 'intercept',
      type: 'slider',
      label: 'scenes.S8.S8_D0_F29_C9.inputLabels.intercept',
      min: -200,
      max: 100,
      step: 10,
      value: -100,
    },
  ],
  bestFit: { bend: 2.3, slope: 95, intercept: -170 },
  getModelPoints: (data: WindPowerDataPoint[], paramObject: Record<string, number>) => {
    const { bend, slope, intercept } = paramObject;
    if (data.length === 0 || bend === undefined || slope === undefined || intercept === undefined) return [];
    const points = [];
    const xMax = Math.max(...data.map((d) => d.windSpeed), 20);
    for (let x = 0; x <= xMax; x += 0.5) {
      points.push({
        windSpeed: x,
        power: bend * Math.pow(x, 2) + slope * x + intercept,
      });
    }
    return points;
  },
  getModelFit: (data: WindPowerDataPoint[], paramObject: Record<string, number>) => {
    const { bend, slope, intercept } = paramObject;
    if (data.length === 0 || bend === undefined || slope === undefined || intercept === undefined) return 0;
    // Calculate predicted values for each point
    const predictedValues = data.map(
      (point) => bend * Math.pow(point.windSpeed, 2) + slope * point.windSpeed + intercept,
    );
    // Calculate mean of observed values
    const yMean = data.reduce((sum, point) => sum + point.power, 0) / data.length;
    // Calculate total sum of squares (SS Total)
    const ssTotal = data.reduce((sum, point) => sum + Math.pow(point.power - yMean, 2), 0);
    // Calculate sum of squared residuals (SS Residual)
    const ssResidual = data.reduce((sum, point, i) => sum + Math.pow(point.power - predictedValues[i], 2), 0);
    // Calculate R-squared (bounded between 0 and 100)
    const rSquared = Math.max(0, Math.min(100, (1 - ssResidual / ssTotal) * 100));
    return rSquared;
  },
  getAnnouncements: (id: string, prevValue: number, currValue: number) => {
    switch (id) {
      case 'bend':
        return currValue > prevValue
          ? 'scenes.S8.S8_D0_F29_C9.announcements.bend.msg1'
          : 'scenes.S8.S8_D0_F29_C9.announcements.bend.msg2';
      case 'slope':
        return currValue > prevValue
          ? 'scenes.S8.S8_D0_F29_C9.announcements.slope.msg1'
          : 'scenes.S8.S8_D0_F29_C9.announcements.slope.msg2';
      case 'intercept':
        return currValue > prevValue
          ? 'scenes.S8.S8_D0_F29_C9.announcements.intercept.msg1'
          : 'scenes.S8.S8_D0_F29_C9.announcements.intercept.msg2';
      default:
        return '';
    }
  },
  showInputs: true,
  showModelFit: true,
  graphConfig: {
    ariaLabel: 'scenes.S8.S8_D0_F29_C9.graphConfig.ariaLabel',
    showScatterPlot: true,
    showLinePlot: true,
    showReferenceLine: true,
    xAxis: {
      domain: [0, 20],
      labelValue: 'scenes.S8.S8_D0_F29_C9.graphConfig.xAxisLabel',
    },
    yAxis: {
      domain: [-500, 1600],
      labelValue: 'scenes.S8.S8_D0_F29_C9.graphConfig.yAxisLabel',
    },
    scatter: {
      name: 'scenes.S8.S8_D0_F29_C9.graphConfig.scatterName',
    },
    line: {
      name: 'scenes.S8.S8_D0_F29_C9.graphConfig.lineName',
    },
    tooltip: {
      xLabel: 'scenes.S8.S8_D0_F29_C9.graphConfig.tooltip.xLabel',
      yLabel: 'scenes.S8.S8_D0_F29_C9.graphConfig.tooltip.yLabel',
    },
  },
  translations: {
    modelPerformance: 'scenes.S8.S8_D0_F29_C9.translations.modelPerformance',
    optimizeFit: 'scenes.S8.S8_D0_F29_C9.translations.optimizeFit',
  },
};

export default interaction;
