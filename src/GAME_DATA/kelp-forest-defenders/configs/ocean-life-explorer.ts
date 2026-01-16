import { Interaction, OcenDataPoint } from '../interactives/interface';

const interaction: Interaction = {
  type: 'ocean-life-explorer',
  title: 'Ocean Life Explorer',
  creature: 'urchin',
  unit: 'scenes.S11.S11_D0_F22_C9.unit',
  ariaLabel: 'scenes.S11.S11_D0_F22_C9.ariaLabel',
  kelpDensityLabel: 'scenes.S11.S11_D0_F22_C9.kelpDensityLabel',
  yourLineLabel: 'scenes.S11.S11_D0_F22_C9.yourLineLabel',
  creatures: {
    urchin: {
      name: 'scenes.S11.S11_D0_F22_C9.creatures.urchin.name',
      unit: 'scenes.S11.S11_D0_F22_C9.unit',
      color: '#8200C3',
      description: 'scenes.S11.S11_D0_F22_C9.creatures.urchin.description',
    },
    stars: {
      name: 'scenes.S11.S11_D0_F22_C9.creatures.stars.name',
      unit: 'scenes.S11.S11_D0_F22_C9.unit',
      color: '#0055B2',
      description: 'scenes.S11.S11_D0_F22_C9.creatures.stars.description',
    },
  },
  inputs: [
    {
      id: 'slope',
      type: 'slider',
      label: 'scenes.S11.S11_D0_F22_C9.inputs.slope.label',
      defaultValue: -1,
      min: -50,
      max: 10,
      step: 1,
    },
    {
      id: 'intercept',
      type: 'slider',
      label: 'scenes.S11.S11_D0_F22_C9.inputs.intercept.label',
      defaultValue: 5,
      min: 0,
      max: 20,
      step: 1,
    },
    {
      id: 'slope',
      type: 'slider',
      label: 'scenes.S11.S11_D0_F22_C9.inputs.slope.label',
      defaultValue: 25,
      min: 0,
      max: 50,
      step: 1,
    },
    {
      id: 'intercept',
      type: 'slider',
      label: 'scenes.S11.S11_D0_F22_C9.inputs.intercept.label',
      defaultValue: -5,
      min: -50,
      max: 50,
      step: 1,
    },
  ],
  ocenData: [
    { kelp: 1.530555556, urchin: 0.05416666665, stars: 38.76, year: 2003 },
    { kelp: 2.515972222, urchin: 0.05972222225, stars: 70.13, year: 2004 },
    { kelp: 2.534722222, urchin: 0.01944444445, stars: 70.73, year: 2005 },
    { kelp: 1.923148148, urchin: 0.037037037, stars: 51.26, year: 2006 },
    { kelp: 2.432175926, urchin: 0.06990740742, stars: 67.47, year: 2007 },
    { kelp: 2.440833333, urchin: 0.1083333334, stars: 67.74, year: 2008 },
    { kelp: 2.720833334, urchin: 0.0472222222, stars: 76.66, year: 2009 },
    { kelp: 3.138194445, urchin: 0.02708333335, stars: 89.94, year: 2010 },
    { kelp: 1.950925926, urchin: 0.03333333333, stars: 52.15, year: 2011 },
    { kelp: 2.789351852, urchin: 0.03796296292, stars: 78.84, year: 2012 },
    { kelp: 2.920601852, urchin: 0.05740740742, stars: 83.02, year: 2013 },
    { kelp: 1.974074074, urchin: 0.4740740742, stars: 52.88, year: 2014 },
    { kelp: 2.683564815, urchin: 2.337037037, stars: 75.47, year: 2015 },
    { kelp: 2.177222222, urchin: 2.280555555, stars: 59.35, year: 2016 },
    { kelp: 0.5988425927, urchin: 7.50671296, stars: 9.1, year: 2017 },
    { kelp: 1.305787037, urchin: 9.18217592, stars: 31.61, year: 2018 },
    { kelp: 0.4684027779, urchin: 11.86041667, stars: 5.0, year: 2019 },
  ],
  calculateCorrelation: (creature: keyof OcenDataPoint, ocenData: OcenDataPoint[]): string => {
    const kelpData = ocenData.map((d) => d.kelp);
    const creatureData = ocenData.map((d) => d[creature]);
    const n = ocenData.length;
    const kelpMean = kelpData.reduce((a, b) => a + b) / n;
    const varMean = creatureData.reduce((a, b) => a + b) / n;
    const numerator = kelpData.reduce((sum, x, i) => sum + (x - kelpMean) * (creatureData[i] - varMean), 0);
    const kelpStdDev = Math.sqrt(kelpData.reduce((sum, x) => sum + Math.pow(x - kelpMean, 2), 0) / n);
    const varStdDev = Math.sqrt(creatureData.reduce((sum, x) => sum + Math.pow(x - varMean, 2), 0) / n);
    return (numerator / (n * kelpStdDev * varStdDev)).toFixed(2);
  },
  calculateBestFit: (creature: keyof OcenDataPoint, ocenData: OcenDataPoint[]) => {
    const xVals = ocenData.map((d) => d.kelp);
    const yVals = ocenData.map((d) => d[creature]);
    const n = ocenData.length;
    const xMean = xVals.reduce((a, b) => a + b) / n;
    const yMean = yVals.reduce((a, b) => a + b) / n;
    const numerator = xVals.reduce((sum, x, i) => sum + (x - xMean) * (yVals[i] - yMean), 0);
    const denominator = xVals.reduce((sum, x) => sum + Math.pow(x - xMean, 2), 0);
    const slope = numerator / denominator;
    const intercept = yMean - slope * xMean;
    return { slope, intercept };
  },
};

export default interaction;
