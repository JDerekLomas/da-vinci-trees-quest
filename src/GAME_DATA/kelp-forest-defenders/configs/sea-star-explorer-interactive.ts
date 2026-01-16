import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'sea-star-explorer',
  title: 'scenes.S9.S9_D0_F16_C9.header.title',
  ariaLabel: 'scenes.S9.S9_D0_F16_C9.header.title',
  preTrendLabel: 'scenes.S9.S9_D0_F16_C9.preTrendLabel',
  postTrendLabel: 'scenes.S9.S9_D0_F16_C9.postTrendLabel',
  futureProjectionLabel: 'scenes.S9.S9_D0_F16_C9.futureProjectionLabel',
  showKelpDataLabel: 'scenes.S9.S9_D0_F16_C9.showKelpDataLabel',
  kelpDensityLabel: 'scenes.S9.S9_D0_F16_C9.kelpDensityLabel',
  starDensityLabel: 'scenes.S9.S9_D0_F16_C9.starDensityLabel',
  unit: 'scenes.S9.S9_D0_F16_C9.unit',
  note: 'scenes.S9.S9_D0_F16_C9.note',
  select: {
    from: 'scenes.S9.S9_D0_F16_C9.select.from',
    to: 'scenes.S9.S9_D0_F16_C9.select.to',
  },
  starData: [
    { year: 2003, pycno: 0.015, kelp: 1.531 },
    { year: 2004, pycno: 0.021, kelp: 2.516 },
    { year: 2005, pycno: 0.011, kelp: 2.535 },
    { year: 2006, pycno: 0.013, kelp: 1.923 },
    { year: 2007, pycno: 0.013, kelp: 2.432 },
    { year: 2008, pycno: 0.012, kelp: 2.441 },
    { year: 2009, pycno: 0.021, kelp: 2.721 },
    { year: 2010, pycno: 0.016, kelp: 3.139 },
    { year: 2011, pycno: 0.022, kelp: 1.951 },
    { year: 2012, pycno: 0.029, kelp: 2.789 },
    { year: 2013, pycno: 0.051, kelp: 2.921 },
    { year: 2014, pycno: 0.001, kelp: 1.974 },
    { year: 2015, pycno: 0.001, kelp: 2.684 },
    { year: 2016, pycno: 0.0, kelp: 2.177 },
    { year: 2017, pycno: 0.0, kelp: 0.599 },
    { year: 2018, pycno: 0.0, kelp: 1.306 },
    { year: 2019, pycno: 0.0, kelp: 0.468 },
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
      sumY += point.pycno;
      sumXY += point.year * point.pycno;
      sumXX += point.year * point.year;
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return {
      slope: Number(slope.toFixed(4)),
      intercept: Number((intercept + slope * 2000).toFixed(4)),
    };
  },
  graphConfig: {
    margin: { top: 10, right: 15, left: 10, bottom: 35 },
    lines: [
      {
        yAxisId: 'left',
        dataKey: 'pycno',
        stroke: '#5A3714',
        strokeWidth: 2,
        name: 'scenes.S9.S9_D0_F16_C9.starDensityLabel',
        label: 'scenes.S9.S9_D0_F16_C9.xAxisLabel',
      },
      {
        yAxisId: 'right',
        dataKey: 'kelp',
        stroke: '#005F20',
        strokeWidth: 2,
        name: 'scenes.S9.S9_D0_F16_C9.kelpDensityLabel',
        label: 'scenes.S9.S9_D0_F16_C9.xAxisLabel',
      },
    ],
    earlyTrendLine: {
      yAxisId: 'left',
      dataKey: 'earlyTrend',
      stroke: '#0055B2',
      strokeWidth: 2,
      name: 'scenes.S9.S9_D0_F16_C9.preTrendLabel',
      strokeDasharray: '5 5',
    },
    lateTrendLine: {
      yAxisId: 'left',
      dataKey: 'lateTrend',
      stroke: '#A6001A',
      strokeWidth: 2,
      name: 'scenes.S9.S9_D0_F16_C9.postTrendLabel',
      strokeDasharray: '5 5',
    },
    x: {
      dataKey: 'year',
      label: {
        value: 'scenes.S9.S9_D0_F16_C9.xAxisLabel',
        dy: 35,
        fill: '#333333',
        angle: -45,
      },
      tick: { fontSize: 12, dx: -10, dy: 10 },
    },
    yLeft: {
      yAxisId: 'left',
      label: {
        value: 'scenes.S9.S9_D0_F16_C9.yAxisLeftLabel',
        angle: -90,
        fill: '#5A3714',
        dx: -30,
      },
      tick: { fontSize: 12, dx: 0, dy: 0 },
    },
    yRight: {
      yAxisId: 'right',
      label: {
        value: 'scenes.S9.S9_D0_F16_C9.yAxisRightLabel',
        angle: 90,
        fill: '#005F20',
        dx: 5,
      },
      tick: { fontSize: 12, dx: 0, dy: 0 },
    },
    y: {
      yAxisId: 'left',
      label: {
        value: 'scenes.S9.S9_D0_F16_C9.yAxisLeftLabel',
        angle: -90,
        fill: '#5A3714',
        dx: -30,
      },
      tick: { fontSize: 12, dx: 0, dy: 0 },
    },
    unit: 'scenes.S9.S9_D0_F16_C9.unit',
  },
};

export default interaction;
