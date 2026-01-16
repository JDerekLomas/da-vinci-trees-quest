import { TrajectoryAlignmentInteraction } from '../interactives/interface';

const interaction: TrajectoryAlignmentInteraction = {
  type: 'trajectory-alignment',
  title: 'scenes.S10.S10_D0_FSQ4_C9.title',
  heading: 'scenes.S10.S10_D0_FSQ4_C9.heading',
  ariaLabel: 'scenes.S10.S10_D0_FSQ4_C9.aria.graph',
  inputGroupLabel: 'scenes.S10.S10_D0_FSQ4_C9.controls.groupLabel',
  controls: {
    value: 'scenes.S10.S10_D0_FSQ4_C9.controls.value',
    a: {
      label: 'a',
      description: 'scenes.S10.S10_D0_FSQ4_C9.controls.a.description',
      ariaLabel: 'scenes.S10.S10_D0_FSQ4_C9.controls.a.ariaLabel',
      min: -0.5,
      max: 0,
      step: 0.001,
      defaultValue: -0.2,
    },
    h: {
      label: 'h',
      description: 'scenes.S10.S10_D0_FSQ4_C9.controls.h.description',
      ariaLabel: 'scenes.S10.S10_D0_FSQ4_C9.controls.h.ariaLabel',
      min: 0,
      max: 80,
      step: 0.5,
      defaultValue: 40,
    },
    k: {
      label: 'k',
      description: 'scenes.S10.S10_D0_FSQ4_C9.controls.k.description',
      ariaLabel: 'scenes.S10.S10_D0_FSQ4_C9.controls.k.ariaLabel',
      min: 0,
      max: 150,
      step: 0.5,
      defaultValue: 15,
    },
  },
  mission: 'scenes.S10.S10_D0_FSQ4_C9.mission',
  xIntercepts: 'scenes.S10.S10_D0_FSQ4_C9.xIntercepts',
  status: {
    perfect: 'scenes.S10.S10_D0_FSQ4_C9.status.perfect',
    keepAdjusting: 'scenes.S10.S10_D0_FSQ4_C9.status.keepAdjusting',
    targetBelowLevel: 'scenes.S10.S10_D0_FSQ4_C9.status.targetBelowLevel',
  },
  graph: {
    ariaDescription: 'scenes.S10.S10_D0_FSQ4_C9.graph.ariaDescription',
    axis: {
      x: {
        label: 'scenes.S10.S10_D0_FSQ4_C9.graph.axis.x.label',
        var: 'scenes.S10.S10_D0_FSQ4_C9.graph.axis.x.var',
        ariaLabel: 'scenes.S10.S10_D0_FSQ4_C9.graph.axis.x.ariaLabel',
        min: 0,
        max: 80,
        ticks: [0, 20, 40, 60, 80],
      },
      y: {
        label: 'scenes.S10.S10_D0_FSQ4_C9.graph.axis.y.label',
        var: 'scenes.S10.S10_D0_FSQ4_C9.graph.axis.y.var',
        ariaLabel: 'scenes.S10.S10_D0_FSQ4_C9.graph.axis.y.ariaLabel',
        min: 0,
        max: 150,
        ticks: [0, 50, 100, 150],
      },
    },
    line: {
      color: '#48bb78',
      width: 2,
      name: 'Probe Path',
    },
    points: {
      start: {
        color: 'blue',
        radius: 4,
      },
      end: {
        color: 'red',
        radius: 4,
      },
    },
    tooltip: {
      ariaLabel: 'scenes.S10.S10_D0_FSQ4_C9.graph.tooltip.ariaLabel',
      unit: 'ft',
    },
  },
  equation: {
    ariaLabel: 'scenes.S10.S10_D0_FSQ4_C9.equation.ariaLabel',
  },
  labels: {
    reset: 'scenes.S10.S10_D0_FSQ4_C9.status.reset',
    start: 'scenes.S10.S10_D0_FSQ4_C9.status.launch',
    hit: 'scenes.S10.S10_D0_FSQ4_C9.status.hit',
    miss: 'scenes.S10.S10_D0_FSQ4_C9.status.miss',
  }
};

export default interaction;
