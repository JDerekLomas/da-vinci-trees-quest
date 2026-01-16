import { QuadraticExplorerInteraction } from '../interactives/interface';

const interaction: QuadraticExplorerInteraction = {
  type: 'quadratic-explorer',
  ariaLabel: 'scenes.S8.S8_D0_FSQ4_C9.aria.graph',
  inputGroupLabel: 'scenes.S8.S8_D0_FSQ4_C9.controls.groupLabel',
  inputs: [
    {
      id: 'a',
      type: 'slider',
      label: 'scenes.S8.S8_D0_FSQ4_C9.controls.a.label',
      description: 'scenes.S8.S8_D0_FSQ4_C9.controls.a.description',
      min: -0.02,
      max: 0.02,
      step: 0.001,
      defaultValue: -0.005,
    },
    {
      id: 'b',
      type: 'slider',
      label: 'scenes.S8.S8_D0_FSQ4_C9.controls.b.label',
      description: 'scenes.S8.S8_D0_FSQ4_C9.controls.b.description',
      min: -2,
      max: 2,
      step: 0.05,
      defaultValue: 0.5,
    },
    {
      id: 'c',
      type: 'slider',
      label: 'scenes.S8.S8_D0_FSQ4_C9.controls.c.label',
      description: 'scenes.S8.S8_D0_FSQ4_C9.controls.c.description',
      min: 0,
      max: 50,
      step: 1,
      defaultValue: 10,
    },
  ],
  xRange: 100,
  yRange: 50,
  target: {
    x: 50,
    y: 0,
    epsilon: 0.01,
  },
  animation: {
    duration: 4000, // this is to control the speed of trajectory
    pointDensity: 200,
  },
  labels: {
    reset: 'scenes.S8.S8_D0_FSQ4_C9.buttons.reset',
    start: 'scenes.S8.S8_D0_FSQ4_C9.buttons.start',
    launching: 'scenes.S8.S8_D0_FSQ4_C9.buttons.launching',
    targetHit: 'scenes.S8.S8_D0_FSQ4_C9.buttons.targetHit',
    target: 'scenes.S8.S8_D0_FSQ4_C9.status.target',
    position: 'scenes.S8.S8_D0_FSQ4_C9.status.position',
    xIntercepts: 'scenes.S8.S8_D0_FSQ4_C9.status.xIntercepts',
    adjustCurve: 'scenes.S8.S8_D0_FSQ4_C9.status.adjustCurve',
    probeInMotion: 'scenes.S8.S8_D0_FSQ4_C9.status.probeInMotion',
    launch: 'scenes.S8.S8_D0_FSQ4_C9.buttons.launch',
    xAxisLabel: 'scenes.S8.S8_D0_FSQ4_C9.graph.xAxisLabel',
    yAxisLabel: 'scenes.S8.S8_D0_FSQ4_C9.graph.yAxisLabel',
    tooltipDistance: 'scenes.S8.S8_D0_FSQ4_C9.graph.tooltipDistance',
    tooltipHeight: 'scenes.S8.S8_D0_FSQ4_C9.graph.tooltipHeight',
    hit: 'scenes.S8.S8_D0_FSQ4_C9.status.hit',
    miss: 'scenes.S8.S8_D0_FSQ4_C9.status.miss'
  },
  equation: {
    currentEquation: 'scenes.S8.S8_D0_FSQ4_C9.equation.currentEquation',
    plus: 'scenes.S8.S8_D0_FSQ4_C9.equation.plus',
    minus: 'scenes.S8.S8_D0_FSQ4_C9.equation.minus',
    equals: 'scenes.S8.S8_D0_FSQ4_C9.equation.equals',
    square: 'scenes.S8.S8_D0_FSQ4_C9.equation.square',
  },
};

export default interaction;
