import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  title: 'scenes.S10.S10_D0_F60_C9.header.title',
  type: 'performance-range-analyzer',
  ariaLabel: 'scenes.S10.S10_D0_F60_C9.header.title',
  lowerTimeInput: {
    id: 'lowerTimeInput',
    label: 'scenes.S10.S10_D0_F60_C9.lowerTimeInputLabel',
    type: 'slider',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
  },
  upperTimeInput: {
    id: 'upperTimeInput',
    label: 'scenes.S10.S10_D0_F60_C9.upperTimeInputLabel',
    type: 'slider',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 60,
  },
  improvementInput: {
    id: 'improvementInput',
    label: 'scenes.S10.S10_D0_F60_C9.improvementInputLabel',
  },
  currentTimeRange: {
    label: 'scenes.S10.S10_D0_F60_C9.currentTimeRange.label',
    lower: {
      value: 50,
      label: 'scenes.S10.S10_D0_F60_C9.currentTimeRange.lowerLabel',
    },
    upper: {
      value: 60,
      label: 'scenes.S10.S10_D0_F60_C9.currentTimeRange.upperLabel',
    },
  },
  targetTimeRange: {
    label: 'scenes.S10.S10_D0_F60_C9.targetTimeRange.label',
    lower: {
      value: 49,
      label: 'scenes.S10.S10_D0_F60_C9.targetTimeRange.lowerLabel',
    },
    upper: {
      value: 59,
      label: 'scenes.S10.S10_D0_F60_C9.targetTimeRange.upperLabel',
    },
  },
  goalTimeRange: {
    label: 'scenes.S10.S10_D0_F60_C9.goalTimeRange.label',
    lower: {
      value: 49,
      label: 'scenes.S10.S10_D0_F60_C9.goalTimeRange.lowerLabel',
    },
    upper: {
      value: 50,
      label: 'scenes.S10.S10_D0_F60_C9.goalTimeRange.upperLabel',
    },
  },
};

export default interaction;
