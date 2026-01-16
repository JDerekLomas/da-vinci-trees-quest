const interaction = {
  totalSteps: 2,
  stages: [
    {
      name: 'scenes.S7.S7_D0_FX_C9.translations.stage1.title',
      slides: [
        {
          name: 'scenes.S7.S7_D0_FX_C9.translations.stage1.evenOdd.title',
        },
      ],
    },
    {
      name: 'scenes.S7.S7_D0_FX_C9.translations.stage2.title',
      slides: [
        {
          name: 'scenes.S7.S7_D0_FX_C9.translations.stage2.shapes.title',
        },
      ],
    },
  ],
  translations: {
    tStage: 'scenes.S7.S7_D0_FX_C9.translations.stage',
    tStage1: {
      title: 'scenes.S7.S7_D0_FX_C9.translations.stage1.title',
      description: 'scenes.S7.S7_D0_FX_C9.translations.stage1.description',
      evenOdd: {
        title: 'scenes.S7.S7_D0_FX_C9.translations.stage1.evenOdd.title',
        description: 'scenes.S7.S7_D0_FX_C9.translations.stage1.evenOdd.description',
        even: 'scenes.S7.S7_D0_FX_C9.translations.stage1.evenOdd.even',
        odd: 'scenes.S7.S7_D0_FX_C9.translations.stage1.evenOdd.odd',
      },
    },
    tStage2: {
      title: 'scenes.S7.S7_D0_FX_C9.translations.stage2.title',
      description: 'scenes.S7.S7_D0_FX_C9.translations.stage2.description',
      shapes: {
        title: 'scenes.S7.S7_D0_FX_C9.translations.stage2.shapes.title',
        description: 'scenes.S7.S7_D0_FX_C9.translations.stage2.shapes.description',
        triangle: 'scenes.S7.S7_D0_FX_C9.translations.stage2.shapes.triangle',
        square: 'scenes.S7.S7_D0_FX_C9.translations.stage2.shapes.square',
        perfectTriangle: 'scenes.S7.S7_D0_FX_C9.translations.stage2.shapes.perfectTriangle',
        notTriangle: 'scenes.S7.S7_D0_FX_C9.translations.stage2.shapes.notTriangle',
        perfectSquare: 'scenes.S7.S7_D0_FX_C9.translations.stage2.shapes.perfectSquare',
        notSquare: 'scenes.S7.S7_D0_FX_C9.translations.stage2.shapes.notSquare',
      },
    },
    tCommon: {
      pebbles: 'scenes.S7.S7_D0_FX_C9.translations.common.pebbles',
      next: 'scenes.S7.S7_D0_FX_C9.translations.common.next',
      back: 'scenes.S7.S7_D0_FX_C9.translations.common.back',
      exploreShapes: 'scenes.S7.S7_D0_FX_C9.translations.common.exploreShapes',
      backToEvenOdd: 'scenes.S7.S7_D0_FX_C9.translations.common.backToEvenOdd',
    },
    tAccessibility: {
      instructions: {
        title: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.instructions.title',
        overview: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.instructions.overview',
        sliderInteraction: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.instructions.sliderInteraction',
        buttonInteraction: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.instructions.buttonInteraction',
      },
      visualizationSection: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.visualizationSection',
      controlsSection: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.controlsSection',
      pebbleSlider: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.pebbleSlider',
      evenOddVisualization: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.evenOddVisualization',
      shapeVisualization: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.shapeVisualization',
      triangleSection: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.triangleSection',
      squareSection: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.squareSection',
      pebbleCount: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.pebbleCount',
      evenLabel: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.evenLabel',
      oddLabel: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.oddLabel',
      perfectTriangleLabel: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.perfectTriangleLabel',
      notTriangleLabel: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.notTriangleLabel',
      perfectSquareLabel: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.perfectSquareLabel',
      notSquareLabel: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.notSquareLabel',
      stepChanged: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.stepChanged',
      countChanged: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.countChanged',
      currentStage: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.currentStage',
      pebble: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.pebble',
      leftoverPebble: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.leftoverPebble',
      pebbleGrid: 'scenes.S7.S7_D0_FX_C9.translations.accessibility.pebbleGrid',
    },
  },
};

export type PebbleInteractiveConfig = typeof interaction;
export default interaction;
