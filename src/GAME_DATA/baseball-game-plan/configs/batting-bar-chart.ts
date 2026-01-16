import { BattingAnalysisInteraction } from '../interactives/interface';

const interaction: BattingAnalysisInteraction = {
  title: 'scenes.S12.S12_D0_F60_C9.title',
  type: 'batting-analysis',
  ariaLabel: 'scenes.S12.S12_D0_F60_C9.aria_label',
  data: [
    { binStart: 0.22, binEnd: 0.239, SteadySteve: 0, StreakySam: 6 },
    { binStart: 0.24, binEnd: 0.259, SteadySteve: 1, StreakySam: 9 },
    { binStart: 0.26, binEnd: 0.279, SteadySteve: 6, StreakySam: 7 },
    { binStart: 0.28, binEnd: 0.299, SteadySteve: 14, StreakySam: 5 },
    { binStart: 0.3, binEnd: 0.319, SteadySteve: 11, StreakySam: 3 },
    { binStart: 0.32, binEnd: 0.339, SteadySteve: 3, StreakySam: 2 },
    { binStart: 0.34, binEnd: 0.359, SteadySteve: 0, StreakySam: 2 },
    { binStart: 0.36, binEnd: 0.379, SteadySteve: 0, StreakySam: 1 },
  ],

  translations: {
    stats: {
      mean: 'scenes.S12.S12_D0_F60_C9.stats.mean',
      median: 'scenes.S12.S12_D0_F60_C9.stats.median',
      std_dev: 'scenes.S12.S12_D0_F60_C9.stats.std_dev',
    },
    values: {
      sam: {
        mean: 0.305,
        median: 0.270,
        std_dev: 0.037,
      },
      steve: {
        mean: 0.295,
        median: 0.290,
        std_dev: 0.02,
      },
    },
    chart: {
      batting_average: 'scenes.S12.S12_D0_F60_C9.chart.batting_average',
      number_of_games: 'scenes.S12.S12_D0_F60_C9.chart.number_of_games',
      tooltip: {
        games: 'scenes.S12.S12_D0_F60_C9.chart.tooltip.games',
        range_prefix: 'scenes.S12.S12_D0_F60_C9.chart.tooltip.range_prefix',
        average_suffix: 'scenes.S12.S12_D0_F60_C9.chart.tooltip.average_suffix',
      },
    },
    players: {
      steady_steve: 'scenes.S12.S12_D0_F60_C9.players.steady_steve',
      streaky_sam: 'scenes.S12.S12_D0_F60_C9.players.streaky_sam',
    },
    accessibility: {
      chart: {
        histogram_prefix: 'scenes.S12.S12_D0_F60_C9.accessibility.chart.histogram_prefix',
        games: 'scenes.S12.S12_D0_F60_C9.accessibility.chart.games',
        in_range: 'scenes.S12.S12_D0_F60_C9.accessibility.chart.in_range',
        batting_average: 'scenes.S12.S12_D0_F60_C9.accessibility.chart.batting_average',
      },
    },
  },
};

export default interaction;
