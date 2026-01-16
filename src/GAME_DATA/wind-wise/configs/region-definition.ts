import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'region-definition',
  inputs: [
    {
      id: 'cutIn',
      type: 'slider',
      label: 'scenes.S12.S12_D0_F58_C9.inputLabels.cutIn',
      min: 0,
      max: 5,
      step: 0.1,
      value: 4,
    },
    {
      id: 'rated',
      type: 'slider',
      label: 'scenes.S12.S12_D0_F58_C9.inputLabels.rated',
      min: 5,
      max: 20,
      step: 0.1,
      value: 16,
    },
  ],
  getFeedback: (current: number, type: string): string => {
    const expected = type === 'cutIn' ? 1.4 : 12.3;
    const diff = Math.abs(current - expected);
    const percentage = (diff / expected) * 100;

    if (type === 'cutIn') {
      if (current === expected) return 'scenes.S12.S12_D0_F58_C9.feedback.cutIn1';
      if (percentage <= 10) return 'scenes.S12.S12_D0_F58_C9.feedback.cutIn2';
      if (percentage <= 25) return 'scenes.S12.S12_D0_F58_C9.feedback.cutIn3';
      return 'scenes.S12.S12_D0_F58_C9.feedback.cutIn4';
    } else {
      if (current === expected) return 'scenes.S12.S12_D0_F58_C9.feedback.rated1';
      if (percentage <= 10) return 'scenes.S12.S12_D0_F58_C9.feedback.rated2';
      if (percentage <= 25) return 'scenes.S12.S12_D0_F58_C9.feedback.rated3';
      return 'scenes.S12.S12_D0_F58_C9.feedback.rated4';
    }
  },
  graphConfig: {
    ariaLabel: 'scenes.S12.S12_D0_F58_C9.graphConfig.ariaLabel',
    xAxis: {
      labelValue: 'scenes.S12.S12_D0_F58_C9.graphConfig.xAxisLabel',
      domain: [0, 20],
    },
    yAxis: {
      labelValue: 'scenes.S12.S12_D0_F58_C9.graphConfig.yAxisLabel',
      domain: [0, 1600],
    },
    scatter: {
      name: 'scenes.S12.S12_D0_F58_C9.graphConfig.scatterName',
    },
    tooltip: {
      xLabel: 'scenes.S12.S12_D0_F58_C9.graphConfig.tooltip.xLabel',
      yLabel: 'scenes.S12.S12_D0_F58_C9.graphConfig.tooltip.yLabel',
    },
  },
  mph: 'scenes.S12.S12_D0_F58_C9.mph',
  feedback: {
    cutIn1: 'scenes.S12.S12_D0_F58_C9.translations.feedback.cutIn1',
    cutIn2: 'scenes.S12.S12_D0_F58_C9.translations.feedback.cutIn2',
    cutIn3: 'scenes.S12.S12_D0_F58_C9.translations.feedback.cutIn3',
    cutIn4: 'scenes.S12.S12_D0_F58_C9.translations.feedback.cutIn4',
    rated1: 'scenes.S12.S12_D0_F58_C9.translations.feedback.rated1',
    rated2: 'scenes.S12.S12_D0_F58_C9.translations.feedback.rated2',
    rated3: 'scenes.S12.S12_D0_F58_C9.translations.feedback.rated3',
    rated4: 'scenes.S12.S12_D0_F58_C9.translations.feedback.rated4',
  },
};

export default interaction;
