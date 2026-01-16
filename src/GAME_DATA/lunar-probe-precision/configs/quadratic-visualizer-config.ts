import { QuadraticVisualizerInteraction } from '../interactives/interface';

const Interaction: QuadraticVisualizerInteraction = {
  type: 'quadratic-visualizer',
  title: 'scenes.S12.S12_D0_FSQ4_C9.title',
  ariaLabel: 'scenes.S12.S12_D0_FSQ4_C9.ariaLabel',
  description: 'scenes.S12.S12_D0_FSQ4_C9.description',
  instruction: 'scenes.S12.S12_D0_FSQ4_C9.instruction',
  currentPoints: 'scenes.S12.S12_D0_FSQ4_C9.currentPoints',
  controls: {
    parabolaOpening: 'scenes.S12.S12_D0_FSQ4_C9.controls.parabolaOpening',
    firstRoot: 'scenes.S12.S12_D0_FSQ4_C9.controls.firstRoot',
    secondRoot: 'scenes.S12.S12_D0_FSQ4_C9.controls.secondRoot',
    meters: 'scenes.S12.S12_D0_FSQ4_C9.controls.meters',
    aAriaLabel: 'scenes.S12.S12_D0_FSQ4_C9.controls.aAriaLabel',
    x1AriaLabel: 'scenes.S12.S12_D0_FSQ4_C9.controls.x1AriaLabel',
    x2AriaLabel: 'scenes.S12.S12_D0_FSQ4_C9.controls.x2AriaLabel',
  },
  graph: {
    xAxisLabel: 'scenes.S12.S12_D0_FSQ4_C9.graph.xAxisLabel',
    yAxisLabel: 'scenes.S12.S12_D0_FSQ4_C9.graph.yAxisLabel',
    tooltipDistance: 'scenes.S12.S12_D0_FSQ4_C9.graph.tooltipDistance',
    tooltipHeight: 'scenes.S12.S12_D0_FSQ4_C9.graph.tooltipHeight',
  },
  points: {
    launchPoint: 'scenes.S12.S12_D0_FSQ4_C9.points.launchPoint',
    targetPoint: 'scenes.S12.S12_D0_FSQ4_C9.points.targetPoint',
    probePosition: 'scenes.S12.S12_D0_FSQ4_C9.points.probePosition',
  },
  buttons: {
    resetProbe: 'scenes.S12.S12_D0_FSQ4_C9.buttons.resetProbe',
    launchProbe: 'scenes.S12.S12_D0_FSQ4_C9.buttons.launchProbe',
  },
  feedback: {
    success: 'scenes.S12.S12_D0_FSQ4_C9.feedback.success',
    error: {
      invalidTrajectory: 'scenes.S12.S12_D0_FSQ4_C9.feedback.error.invalidTrajectory',
      needTwoRoots: 'scenes.S12.S12_D0_FSQ4_C9.feedback.error.needTwoRoots',
    },
    hit: 'scenes.S12.S12_D0_FSQ4_C9.feedback.hit',
    miss: 'scenes.S12.S12_D0_FSQ4_C9.feedback.miss'

  },
  aria: {
    simulator: 'scenes.S12.S12_D0_FSQ4_C9.aria.simulator',
    controls: 'scenes.S12.S12_D0_FSQ4_C9.aria.controls',
    equation: 'scenes.S12.S12_D0_FSQ4_C9.aria.equation',
    graph: 'scenes.S12.S12_D0_FSQ4_C9.aria.graph',
    resetButton: 'scenes.S12.S12_D0_FSQ4_C9.aria.resetButton',
    launchButton: 'scenes.S12.S12_D0_FSQ4_C9.aria.launchButton',
  },

  // Configuration values
  xAxisMin: -10,
  xAxisMax: 80,
  yAxisMin: -30,
  yAxisMax: 100,

  aCoefficient: {
    min: -0.1,
    max: 0.1,
    step: 0.001,
    default: 0.01,
  },

  roots: {
    min: -10,
    max: 80,
    step: 1,
    defaultX1: 25,
    defaultX2: 75,
  },

  animationDuration: 2000,
  tolerance: 0.1,
};

export default Interaction;
