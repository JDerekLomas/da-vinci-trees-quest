import { PitchingComparisonInteraction } from '../interactives/interface';

const interaction: PitchingComparisonInteraction = {
  title: 'pitching.title',
  type: 'pitching-comparison',
  ariaLabel: 'pitching.aria_label',
  steveData: [
    { binStart: 80, binEnd: 81, value: 6 },
    { binStart: 82, binEnd: 83, value: 13 },
    { binStart: 84, binEnd: 85, value: 19 },
    { binStart: 86, binEnd: 87, value: 24 },
    { binStart: 88, binEnd: 89, value: 19 },
    { binStart: 90, binEnd: 91, value: 13 },
    { binStart: 92, binEnd: 93, value: 6 },
    { binStart: 94, binEnd: 95, value: 6 },
    { binStart: 96, binEnd: 97, value: 0 },
    { binStart: 98, binEnd: 99, value: 0 },
    { binStart: 100, binEnd: 101, value: 0 },
  ],
  samData: [
    { binStart: 80, binEnd: 81, value: 20 },
    { binStart: 82, binEnd: 83, value: 16 },
    { binStart: 84, binEnd: 85, value: 15 },
    { binStart: 86, binEnd: 87, value: 14 },
    { binStart: 88, binEnd: 89, value: 8 },
    { binStart: 90, binEnd: 91, value: 7 },
    { binStart: 92, binEnd: 93, value: 6 },
    { binStart: 94, binEnd: 95, value: 6 },
    { binStart: 96, binEnd: 97, value: 3 },
    { binStart: 98, binEnd: 99, value: 3 },
    { binStart: 100, binEnd: 101, value: 2 },
  ],
};

export default interaction;
