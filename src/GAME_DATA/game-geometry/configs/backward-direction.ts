import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  graphConfig: {
    initialPosition: { x: 0, y: 0 },
    targetPositions: [
      { x: 0, y: -3 },
      { x: -3, y: 0 },
    ],
    transactions: 2,
    backwardRotation: true,
    rotationPoint: { x: 0, y: 0 },
    showSteps: false,
    enableRotation: true,
    enableReset: true,
    enableDirectionChange: true,
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
      frontPoint: 'scenes.S4.S4_D0_F11_C9.frontPoint',
      rearPoint: 'scenes.S4.S4_D0_F11_C9.rearPoint',
      carPosition: 'scenes.S4.S4_D0_F11_C9.carPosition',
      targetFlag: 'scenes.S4.S4_D0_F11_C9.targetFlag',
      changeDirectionButton: 'scenes.S6.S6_D0_F25_C9.changeDirectionButton',
      moveBackward: 'scenes.S6.S6_D0_F25_C9.moveBackward',
      moveDownward: 'scenes.S6.S6_D0_F25_C9.moveDownward',
      rotationPoint: 'scenes.S6.S6_D0_F25_C9.rotationPoint',
      rotateCar: 'scenes.S6.S6_D0_F25_C9.rotateCar',
      carRotatedBy: 'scenes.S6.S6_D0_F25_C9.carRotatedBy',
      degreesAtRotationAxis: 'scenes.S6.S6_D0_F25_C9.degreesAtRotationAxis',
      rotateCarBy90: 'scenes.S6.S6_D0_F25_C9.rotateCarBy90',
      rotateCarBy180: 'scenes.S6.S6_D0_F25_C9.rotateCarBy180',
    },
    movement: {
      enabledKeys: ['ArrowDown', 'ArrowLeft'],
      stepSize: 1,
    },
    rotationAxes: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
    rotationDegrees: [90, 180],
  },
};

export default interaction;
