const interaction = {
  totalSteps: 7,
  gridConfig: {
    size: 400,
    margins: { top: 15, right: 20, bottom: 70, left: 80 },
    lines: 10,
  },
  defaultTriangle: {
    vertices: [
      { x: 5.01, y: 5.45 }, // Point P (Bearing A–B intersection)
      { x: 7.19, y: 7.87 }, // Point Q (Bearing A–C intersection)
      { x: 3.88, y: 7.4 }, // Point R (Bearing B–C intersection)
    ],
    sides: [3.26, 3.34, 2.25], // Updated side lengths for new Cocked Hat Triangle
    area: 3.49, // Updated area for new Cocked Hat Triangle
  },
  stages: [
    {
      name: 'scenes.S8.S8_D0_FX_C9.translations.stage1.title',
      slides: [
        {
          name: 'scenes.S8.S8_D0_FX_C9.translations.stage1.perpendicularBisectors.title',
        },
        {
          name: 'scenes.S8.S8_D0_FX_C9.translations.stage1.circumcenter.title',
        },
        {
          name: 'scenes.S8.S8_D0_FX_C9.translations.stage1.circumscribedCircle.title',
        },
      ],
    },
    {
      name: 'scenes.S8.S8_D0_FX_C9.translations.stage2.title',
      slides: [
        {
          name: 'scenes.S8.S8_D0_FX_C9.translations.stage2.angleBisectors.title',
        },
        {
          name: 'scenes.S8.S8_D0_FX_C9.translations.stage2.incenter.title',
        },
        {
          name: 'scenes.S8.S8_D0_FX_C9.translations.stage2.inscribedCircle.title',
        },
      ],
    },
    {
      name: 'scenes.S8.S8_D0_FX_C9.translations.stage3.title',
      slides: [
        {
          name: 'scenes.S8.S8_D0_FX_C9.translations.stage3.comparison.title',
        },
      ],
    },
  ],
  translations: {
    tAriaLabel: 'scenes.S8.S8_D0_FX_C9.translations.ariaLabel',
    tStage: 'scenes.S8.S8_D0_FX_C9.translations.stage',
    tCircumscribedCircle: 'scenes.S8.S8_D0_FX_C9.translations.circumscribedCircle',
    tInscribedCircle: 'scenes.S8.S8_D0_FX_C9.translations.inscribedCircle',
    tSearchAreaComparison: 'scenes.S8.S8_D0_FX_C9.translations.searchAreaComparison',
    tAxes: {
      xAxisLabel: 'scenes.S8.S8_D0_FX_C9.translations.axes.xAxisLabel',
      yAxisLabel: 'scenes.S8.S8_D0_FX_C9.translations.axes.yAxisLabel',
    },
    tStage1: {
      title: 'scenes.S8.S8_D0_FX_C9.translations.stage1.title',
      description: 'scenes.S8.S8_D0_FX_C9.translations.stage1.description',
      perpendicularBisectors: {
        title: 'scenes.S8.S8_D0_FX_C9.translations.stage1.perpendicularBisectors.title',
        description: 'scenes.S8.S8_D0_FX_C9.translations.stage1.perpendicularBisectors.description',
        points: [
          'scenes.S8.S8_D0_FX_C9.translations.stage1.perpendicularBisectors.points.midpoint',
          'scenes.S8.S8_D0_FX_C9.translations.stage1.perpendicularBisectors.points.perpendicular',
          'scenes.S8.S8_D0_FX_C9.translations.stage1.perpendicularBisectors.points.equidistant',
        ],
        showButton: 'scenes.S8.S8_D0_FX_C9.translations.stage1.perpendicularBisectors.showButton',
        hideButton: 'scenes.S8.S8_D0_FX_C9.translations.stage1.perpendicularBisectors.hideButton',
      },
      circumcenter: {
        title: 'scenes.S8.S8_D0_FX_C9.translations.stage1.circumcenter.title',
        description: 'scenes.S8.S8_D0_FX_C9.translations.stage1.circumcenter.description',
        points: [
          'scenes.S8.S8_D0_FX_C9.translations.stage1.circumcenter.points.intersection',
          'scenes.S8.S8_D0_FX_C9.translations.stage1.circumcenter.points.equidistant',
          'scenes.S8.S8_D0_FX_C9.translations.stage1.circumcenter.points.center',
        ],
        showButton: 'scenes.S8.S8_D0_FX_C9.translations.stage1.circumcenter.showButton',
        hideButton: 'scenes.S8.S8_D0_FX_C9.translations.stage1.circumcenter.showButton',
      },
      circumscribedCircle: {
        title: 'scenes.S8.S8_D0_FX_C9.translations.stage1.circumscribedCircle.title',
        description: 'scenes.S8.S8_D0_FX_C9.translations.stage1.circumscribedCircle.description',
        radius: 'scenes.S8.S8_D0_FX_C9.translations.stage1.circumscribedCircle.radius',
        showButton: 'scenes.S8.S8_D0_FX_C9.translations.stage1.circumscribedCircle.showButton',
        hideButton: 'scenes.S8.S8_D0_FX_C9.translations.stage1.circumscribedCircle.hideButton',
        steps: {
          identifyValues: 'scenes.S8.S8_D0_FX_C9.translations.stage1.circumscribedCircle.steps.identifyValues',
          substituteFormula:
            'scenes.S8.S8_D0_FX_C9.translations.stage1.circumscribedCircle.steps.substituteFormula',
          calculate: 'scenes.S8.S8_D0_FX_C9.translations.stage1.circumscribedCircle.steps.calculate',
          conclusion: 'scenes.S8.S8_D0_FX_C9.translations.stage1.circumscribedCircle.steps.conclusion',
        },
        values: {
          sideA: 'scenes.S8.S8_D0_FX_C9.translations.stage1.circumscribedCircle.values.sideA',
          sideB: 'scenes.S8.S8_D0_FX_C9.translations.stage1.circumscribedCircle.values.sideB',
          sideC: 'scenes.S8.S8_D0_FX_C9.translations.stage1.circumscribedCircle.values.sideC',
          area: 'scenes.S8.S8_D0_FX_C9.translations.stage1.circumscribedCircle.values.area',
        },
      },
    },
    tStage2: {
      title: 'scenes.S8.S8_D0_FX_C9.translations.stage2.title',
      description: 'scenes.S8.S8_D0_FX_C9.translations.stage2.description',
      angleBisectors: {
        title: 'scenes.S8.S8_D0_FX_C9.translations.stage2.angleBisectors.title',
        description: 'scenes.S8.S8_D0_FX_C9.translations.stage2.angleBisectors.description',
        points: [
          'scenes.S8.S8_D0_FX_C9.translations.stage2.angleBisectors.points.equalParts',
          'scenes.S8.S8_D0_FX_C9.translations.stage2.angleBisectors.points.threeLines',
        ],
        showButton: 'scenes.S8.S8_D0_FX_C9.translations.stage2.angleBisectors.showButton',
        hideButton: 'scenes.S8.S8_D0_FX_C9.translations.stage2.angleBisectors.hideButton',
      },
      incenter: {
        title: 'scenes.S8.S8_D0_FX_C9.translations.stage2.incenter.title',
        description: 'scenes.S8.S8_D0_FX_C9.translations.stage2.incenter.description',
        points: [
          'scenes.S8.S8_D0_FX_C9.translations.stage2.incenter.points.intersection',
          'scenes.S8.S8_D0_FX_C9.translations.stage2.incenter.points.equidistant',
        ],
        showButton: 'scenes.S8.S8_D0_FX_C9.translations.stage2.incenter.showButton',
        hideButton: 'scenes.S8.S8_D0_FX_C9.translations.stage2.incenter.hideButton',
      },
      inscribedCircle: {
        title: 'scenes.S8.S8_D0_FX_C9.translations.stage2.inscribedCircle.title',
        description: 'scenes.S8.S8_D0_FX_C9.translations.stage2.inscribedCircle.description',
        radius: 'scenes.S8.S8_D0_FX_C9.translations.stage2.inscribedCircle.radius',
        showButton: 'scenes.S8.S8_D0_FX_C9.translations.stage2.inscribedCircle.showButton',
        hideButton: 'scenes.S8.S8_D0_FX_C9.translations.stage2.inscribedCircle.hideButton',
        steps: {
          identifyValues: 'scenes.S8.S8_D0_FX_C9.translations.stage2.inscribedCircle.steps.identifyValues',
          substituteFormula: 'scenes.S8.S8_D0_FX_C9.translations.stage2.inscribedCircle.steps.substituteFormula',
          calculate: 'scenes.S8.S8_D0_FX_C9.translations.stage2.inscribedCircle.steps.calculate',
          conclusion: 'scenes.S8.S8_D0_FX_C9.translations.stage2.inscribedCircle.steps.conclusion',
        },
        values: {
          area: 'scenes.S8.S8_D0_FX_C9.translations.stage2.inscribedCircle.values.area',
          semiPerimeter: 'scenes.S8.S8_D0_FX_C9.translations.stage2.inscribedCircle.values.semiPerimeter',
        },
      },
    },
    tStage3: {
      title: 'scenes.S8.S8_D0_FX_C9.translations.stage3.title',
      description: 'scenes.S8.S8_D0_FX_C9.translations.stage3.description',
      comparison: {
        title: 'scenes.S8.S8_D0_FX_C9.translations.stage3.comparison.title',
        circumscribed: 'scenes.S8.S8_D0_FX_C9.translations.stage3.comparison.circumscribed',
        inscribed: 'scenes.S8.S8_D0_FX_C9.translations.stage3.comparison.inscribed',
        properties: {
          property: 'scenes.S8.S8_D0_FX_C9.translations.stage3.comparison.properties.property',
          circumscribed: 'scenes.S8.S8_D0_FX_C9.translations.stage3.comparison.properties.circumscribed',
          inscribed: 'scenes.S8.S8_D0_FX_C9.translations.stage3.comparison.properties.inscribed',
          radius: 'scenes.S8.S8_D0_FX_C9.translations.stage3.comparison.properties.radius',
          area: 'scenes.S8.S8_D0_FX_C9.translations.stage3.comparison.properties.area',
          coverage: 'scenes.S8.S8_D0_FX_C9.translations.stage3.comparison.properties.coverage',
        },
      },
      analysis: {
        title: 'scenes.S8.S8_D0_FX_C9.translations.stage3.analysis.title',
        areaRatio: 'scenes.S8.S8_D0_FX_C9.translations.stage3.analysis.areaRatio',
        explanation: 'scenes.S8.S8_D0_FX_C9.translations.stage3.analysis.explanation',
        ratioLabel: 'scenes.S8.S8_D0_FX_C9.translations.stage3.analysis.ratioLabel',
      },
    },
    tCommon: {
      nauticalMiles: 'scenes.S8.S8_D0_FX_C9.translations.common.nauticalMiles',
      radius: 'scenes.S8.S8_D0_FX_C9.translations.common.radius',
      squareNauticalMiles: 'scenes.S8.S8_D0_FX_C9.translations.common.squareNauticalMiles',
      next: 'scenes.S8.S8_D0_FX_C9.translations.common.next',
      previous: 'scenes.S8.S8_D0_FX_C9.translations.common.previous',
      reset: 'scenes.S8.S8_D0_FX_C9.translations.common.reset',
      measureRadius: 'scenes.S8.S8_D0_FX_C9.translations.common.measureRadius',
      hideRadius: 'scenes.S8.S8_D0_FX_C9.translations.common.hideRadius',
      step: 'scenes.S8.S8_D0_FX_C9.translations.common.step',
      of: 'scenes.S8.S8_D0_FX_C9.translations.common.of',
      circumcenter: 'scenes.S8.S8_D0_FX_C9.translations.common.circumcenter',
      incenter: 'scenes.S8.S8_D0_FX_C9.translations.common.incenter',
      rightAngle: 'scenes.S8.S8_D0_FX_C9.translations.common.rightAngle',
      circumscribedCircle: 'scenes.S8.S8_D0_FX_C9.translations.common.circumscribedCircle',
      inscribedCircle: 'scenes.S8.S8_D0_FX_C9.translations.common.inscribedCircle',
    },
    tAccessibility: {
      // Instructions and guidance
      instructions: {
        title: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.instructions.title',
        overview: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.instructions.overview',
        tabNavigation: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.instructions.tabNavigation',
        buttonInteraction: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.instructions.buttonInteraction',
        escapeKey: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.instructions.escapeKey',
      },

      // Live announcements
      perpendicularBisectorsShown: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.perpendicularBisectorsShown',
      circumcenterShown: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.circumcenterShown',
      circumscribedCircleShown: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.circumscribedCircleShown',
      angleBisectorsShown: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.angleBisectorsShown',
      incenterShown: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.incenterShown',
      inscribedCircleShown: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.inscribedCircleShown',

      // Radius measurements
      radiusShown: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.radiusShown',
      radiusHidden: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.radiusHidden',
      radiusMeasurementsHidden: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.radiusMeasurementsHidden',

      // Section headings
      visualizationSection: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.visualizationSection',
      instructionalContent: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.instructionalContent',
      radiusMeasurementSection: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.radiusMeasurementSection',

      // Chart descriptions
      chartDescription: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.chartDescription',
      detailedChartDescription: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.detailedChartDescription',
      svgTitle: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.svgTitle',

      // Stage announcements
      currentStage: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.currentStage',

      // Geometric elements
      geometricElements: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.geometricElements',
      triangleDescription: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.triangleDescription',
      perpendicularBisector: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.perpendicularBisector',
      angleBisector: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.angleBisector',
      midpoint: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.midpoint',

      // Points and centers
      circumcenterPoint: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.circumcenterPoint',
      incenterPoint: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.incenterPoint',
      vertex: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.vertex',

      // Circles
      circumscribedCircleDescription:
        'scenes.S8.S8_D0_FX_C9.translations.accessibility.circumscribedCircleDescription',
      inscribedCircleDescription: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.inscribedCircleDescription',
      circumscribedCirclePresent: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.circumscribedCirclePresent',
      inscribedCirclePresent: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.inscribedCirclePresent',

      // Circle comparison
      circleComparison: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.circleComparison',
      circumscribedCircleComparison:
        'scenes.S8.S8_D0_FX_C9.translations.accessibility.circumscribedCircleComparison',
      inscribedCircleComparison: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.inscribedCircleComparison',
      circumscribedCircleCaption: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.circumscribedCircleCaption',
      inscribedCircleCaption: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.inscribedCircleCaption',

      // Measurement elements
      radiusMeasurement: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.radiusMeasurement',
      radiusLabel: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.radiusLabel',
      tangentPoint: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.tangentPoint',

      // Coordinate system
      coordinateLabels: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.coordinateLabels',
      xAxisLabel: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.xAxisLabel',
      yAxisLabel: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.yAxisLabel',
      sideLength: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.sideLength',

      // Button labels
      showCircumRadiusButton: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.showCircumRadiusButton',
      hideCircumRadiusButton: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.hideCircumRadiusButton',
      showInscribedRadiusButton: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.showInscribedRadiusButton',
      hideInscribedRadiusButton: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.hideInscribedRadiusButton',
      radiusButtonHelp: 'scenes.S8.S8_D0_FX_C9.translations.accessibility.radiusButtonHelp',
    },
  },
};

export type CircleCalculatorConfig = typeof interaction;
export default interaction;
