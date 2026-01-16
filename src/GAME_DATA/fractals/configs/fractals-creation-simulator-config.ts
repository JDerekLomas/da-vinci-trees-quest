import { FractalsCreationSimulatorConfig } from '../interactives/interface';

const fractalsCreationSimulatorConfig: FractalsCreationSimulatorConfig = {
  instruction: 'scenes.S9.S9_D0_FX_C9.instruction',
  constant: [
    {
      id: 'realPart',
      label: 'scenes.S9.S9_D0_FX_C9.realPart',
      min: -2,
      max: 2,
      step: 0.01,
      defaultValue: -0.7,
      groupLabel: 'scenes.common.constant',
    },
    {
      id: 'imaginaryPart',
      label: 'scenes.S9.S9_D0_FX_C9.imaginaryPart',
      min: -2,
      max: 2,
      step: 0.01,
      defaultValue: 0.27,
      groupLabel: 'scenes.common.constant',
    },
  ],
  buttons: {
    plotPoint: 'scenes.S9.S9_D0_FX_C9.buttons.plotPoint',
    clearAllPoints: 'scenes.S9.S9_D0_FX_C9.buttons.clearAllPoints',
    startIterations: 'scenes.S9.S9_D0_FX_C9.buttons.startIterations',
  },
  visualizations: {
    left: {
      title: 'scenes.S9.S9_D0_FX_C9.visualizations.left.title',
      description: 'scenes.S9.S9_D0_FX_C9.visualizations.left.description',
      ariaLabel: 'scenes.S9.S9_D0_FX_C9.visualizations.left.ariaLabel',
    },
    right: {
      title: 'scenes.S9.S9_D0_FX_C9.visualizations.right.title',
      description: 'scenes.S9.S9_D0_FX_C9.visualizations.right.description',
      ariaLabel: 'scenes.S9.S9_D0_FX_C9.visualizations.right.ariaLabel',
    },
  },
  animationStarted: 'scenes.S9.S9_D0_FX_C9.animation_started',
  animationStopped: 'scenes.S9.S9_D0_FX_C9.animation_stopped',
  pointPlotted: 'scenes.S9.S9_D0_FX_C9.point_plotted',
  pointsRemoved: 'scenes.S9.S9_D0_FX_C9.points_removed',
};

export default fractalsCreationSimulatorConfig;
