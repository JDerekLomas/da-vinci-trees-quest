import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  graphConfig: {
    initialPosition: { x: 0, y: 0 },
    targetPositions: [{ x: 3, y: 0 }],
    enableReset: true,
    gridSize: 4,
    gridStep: 1,
    carColor: '#006BE0',
    wheelColor: '#1E3A8A',
    lightColor: '#FBBF24',
    axisColor: '#374151',
    gridColor: '#e0e0e0',
    ariaLabel: 'scenes.S4.S4_D0_F11_C9.ariaLabels.ariaLabel',
    translations: {
      resetButton: 'scenes.S4.S4_D0_F11_C9.resetButton',
      targetReached: 'scenes.S4.S4_D0_F11_C9.targetReached',
      moveForward: 'scenes.S4.S4_D0_F11_C9.moveForward',
      gridLine: 'scenes.S4.S4_D0_F11_C9.gridLine',
      reach: 'scenes.S4.S4_D0_F11_C9.reach',
      target: 'scenes.S4.S4_D0_F11_C9.target',
      reached: 'scenes.S4.S4_D0_F11_C9.reached',
      frontPoint: 'scenes.S4.S4_D0_F11_C9.ariaLabels.frontPoint',
      rearPoint: 'scenes.S4.S4_D0_F11_C9.ariaLabels.rearPoint',
      carPosition: 'scenes.S4.S4_D0_F11_C9.carPosition',
      targetFlag: 'scenes.S4.S4_D0_F11_C9.targetFlag',
    },
    movement: {
      enabledKeys: ['ArrowRight'],
      stepSize: 1,
    },
  },
};

export default interaction;
