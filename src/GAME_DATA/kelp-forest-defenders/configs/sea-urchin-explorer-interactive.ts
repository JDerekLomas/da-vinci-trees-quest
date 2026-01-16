import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'sea-urchin-explorer',
  title: 'scenes.S8.S8_D0_F13_C9.header.title',
  ariaLabel: 'scenes.S8.S8_D0_F13_C9.header.title',
  preTrendLabel: 'scenes.S8.S8_D0_F13_C9.preTrendLabel',
  postTrendLabel: 'scenes.S8.S8_D0_F13_C9.postTrendLabel',
  futureProjectionLabel: 'scenes.S8.S8_D0_F13_C9.futureProjectionLabel',
  showKelpDataLabel: 'scenes.S8.S8_D0_F13_C9.showKelpDataLabel',
  kelpDensityLabel: 'scenes.S8.S8_D0_F13_C9.kelpDensityLabel',
  urchinDensityLabel: 'scenes.S8.S8_D0_F13_C9.urchinDensityLabel',
  unit: 'scenes.S8.S8_D0_F13_C9.unit',
  note: 'scenes.S8.S8_D0_F13_C9.note',
  select: {
    from: 'scenes.S8.S8_D0_F13_C9.select.from',
    to: 'scenes.S8.S8_D0_F13_C9.select.to',
  },
  urchinData: [
    { year: 2003, urchins: 0.054, kelp: 1.531 },
    { year: 2004, urchins: 0.06, kelp: 2.516 },
    { year: 2005, urchins: 0.019, kelp: 2.535 },
    { year: 2006, urchins: 0.037, kelp: 1.923 },
    { year: 2007, urchins: 0.07, kelp: 2.432 },
    { year: 2008, urchins: 0.108, kelp: 2.441 },
    { year: 2009, urchins: 0.047, kelp: 2.72 },
    { year: 2010, urchins: 0.027, kelp: 3.138 },
    { year: 2011, urchins: 0.033, kelp: 1.951 },
    { year: 2012, urchins: 0.038, kelp: 2.789 },
    { year: 2013, urchins: 0.057, kelp: 2.921 },
    { year: 2014, urchins: 0.474, kelp: 1.974 },
    { year: 2015, urchins: 2.337, kelp: 2.684 },
    { year: 2016, urchins: 2.281, kelp: 2.177 },
    { year: 2017, urchins: 7.507, kelp: 0.599 },
    { year: 2018, urchins: 9.182, kelp: 1.306 },
    { year: 2019, urchins: 11.86, kelp: 0.468 },
  ],
  dateRange: {
    start: 2003,
    end: 2019,
  },
  trendLines: {
    early: true,
    late: true,
  },
  startYearOptions: [2003, 2005, 2010, 2015],
  endYearOptions: [2005, 2010, 2015, 2019],
  calculateTrendLine: (data) => {
    const n = data.length;
    let sumX = 0,
      sumY = 0,
      sumXY = 0,
      sumXX = 0;

    data.forEach((point) => {
      sumX += point.year;
      sumY += point.urchins;
      sumXY += point.year * point.urchins;
      sumXX += point.year * point.year;
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return {
      slope: Number(slope.toFixed(2)),
      intercept: Number((intercept + slope * 2000).toFixed(2)),
    };
  },
  graphConfig: {
    margin: { top: 10, right: 15, left: 5, bottom: 35 },
    lines: [
      {
        yAxisId: 'left',
        dataKey: 'urchins',
        stroke: '#9F008F',
        strokeWidth: 2,
        name: 'scenes.S8.S8_D0_F13_C9.urchinDensityLabel',
        label: 'scenes.S8.S8_D0_F13_C9.xAxisLabel',
      },
      {
        yAxisId: 'right',
        dataKey: 'kelp',
        stroke: '#005F20',
        strokeWidth: 2,
        name: 'scenes.S8.S8_D0_F13_C9.kelpDensityLabel',
        label: 'scenes.S8.S8_D0_F13_C9.xAxisLabel',
      },
    ],
    earlyTrendLine: {
      yAxisId: 'left',
      dataKey: 'earlyTrend',
      stroke: '#0055B2',
      strokeWidth: 2,
      name: 'scenes.S8.S8_D0_F13_C9.preTrendLabel',
      strokeDasharray: '5 5',
    },
    lateTrendLine: {
      yAxisId: 'left',
      dataKey: 'lateTrend',
      stroke: '#A6001A',
      strokeWidth: 2,
      name: 'scenes.S8.S8_D0_F13_C9.postTrendLabel',
      strokeDasharray: '5 5',
    },
    x: {
      dataKey: 'year',
      label: {
        value: 'scenes.S8.S8_D0_F13_C9.xAxisLabel',
        dy: 35,
        fill: '#333333',
        angle: -45,
      },
      tick: { fontSize: 12, dx: -10, dy: 10 },
    },
    y: {
      yAxisId: 'left',
      label: {
        value: 'scenes.S8.S8_D0_F13_C9.yAxisLeftLabel',
        angle: -90,
        fill: '#9F008F',
        dx: -25,
      },
      tick: { fontSize: 12, dx: 0, dy: 0 },
    },
    yLeft: {
      yAxisId: 'left',
      label: {
        value: 'scenes.S8.S8_D0_F13_C9.yAxisLeftLabel',
        angle: -90,
        fill: '#9F008F',
        dx: -25,
      },
      tick: { fontSize: 12, dx: 0, dy: 0 },
    },
    yRight: {
      yAxisId: 'right',
      label: {
        value: 'scenes.S8.S8_D0_F13_C9.yAxisRightLabel',
        angle: 90,
        fill: '#005F20',
        dx: 5,
      },
      tick: { fontSize: 12, dx: 0, dy: 0 },
    },
    unit: 'scenes.S8.S8_D0_F13_C9.unit',
  },
};

export default interaction;
