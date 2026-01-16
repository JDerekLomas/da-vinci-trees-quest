const interaction = {
  totalSteps: 2,
  features: [
    {
      id: 'triangleGarden',
      name: 'scenes.S10.S10_D0_F82_C9.translations.step2.triangleGarden',
      color: 0xf59e0b, // Amber
      position: { x: 290, z: 180 }, // Updated position
      size: { width: 30, height: 2, depth: 30 },
      description: 'scenes.S10.S10_D0_F82_C9.translations.step2.triangleGardenDescription',
      labelOffset: { x: 0, y: 10, z: 0 },
      // Predefined points for measurements - Updated positions and names to alphabetical
      points: [
        { id: 'p1', name: 'A', position: { x: 290, y: 2, z: 165 } },
        { id: 'p2', name: 'B', position: { x: 305, y: 2, z: 187.5 } },
        { id: 'p3', name: 'C', position: { x: 275, y: 2, z: 187.5 } },
        { id: 'p4', name: 'D', position: { x: 290, y: 2, z: 180 } },
      ],
    },
    {
      id: 'plaza',
      name: 'scenes.S10.S10_D0_F82_C9.translations.step2.rectanglePlaza',
      color: 0x10b981, // Emerald
      position: { x: 330, z: 220 }, // Central structure at (330, 220)
      size: { width: 50, height: 2, depth: 50 },
      description: 'scenes.S10.S10_D0_F82_C9.translations.step2.rectanglePlazaDescription',
      labelOffset: { x: 0, y: 15, z: 0 },
      // Predefined points for measurements - Updated positions and names to alphabetical
      points: [
        {
          id: 'p1',
          name: 'A',
          position: { x: 305, y: 5, z: 195 },
        },
        {
          id: 'p2',
          name: 'B',
          position: { x: 355, y: 5, z: 195 },
        },
        {
          id: 'p3',
          name: 'C',
          position: { x: 355, y: 5, z: 245 },
        },
        {
          id: 'p4',
          name: 'D',
          position: { x: 305, y: 5, z: 245 },
        },
        { id: 'p5', name: 'E', position: { x: 330, y: 2, z: 220 } },
      ],
    },
    {
      id: 'reservoir',
      name: 'scenes.S10.S10_D0_F82_C9.translations.step2.circleReservoir',
      color: 0x0ea5e9, // Sky blue
      position: { x: 270, z: 210 }, // Updated position
      size: { width: 20, height: 2, depth: 20 },
      description: 'Circular water reservoir',
      labelOffset: { x: 0, y: 15, z: 0 },
      // Predefined points for measurements - Updated positions and names to alphabetical
      points: [
        { id: 'p1', name: 'A', position: { x: 270, y: 2, z: 200 } },
        { id: 'p2', name: 'B', position: { x: 280, y: 2, z: 210 } },
        { id: 'p3', name: 'C', position: { x: 270, y: 2, z: 220 } },
        { id: 'p4', name: 'D', position: { x: 260, y: 2, z: 210 } },
        { id: 'p5', name: 'E', position: { x: 270, y: 2, z: 210 } },
      ],
    },
  ],
  additionalStructures: [
    {
      id: 'residential',
      position: { x: 390, z: 220 }, // Updated position
      size: { width: 30, height: 5, depth: 80 },
    },
    {
      id: 'defensiveWall',
      position: { x: 330, z: 220 }, // Centered at (330, 220)
      size: { width: 160, height: 6, depth: 160 },
    },
    {
      id: 'smallPyramid1',
      position: { x: 370, z: 180 }, // Updated position
      size: { width: 20, height: 15, depth: 20 },
    },
    {
      id: 'smallPyramid2',
      position: { x: 290, z: 260 }, // Updated position
      size: { width: 20, height: 15, depth: 20 },
    },
    {
      id: 'palaceComplex',
      position: { x: 350, z: 185 }, // Updated position
      size: { width: 25, height: 8, depth: 20 },
    },
    {
      id: 'marketArea',
      position: { x: 360, z: 255 }, // Updated position
      size: { width: 35, height: 3, depth: 25 },
    },
  ],
  getCalculationMethod: (featureId: string) => {
    if (featureId === 'triangleGarden') {
      return 'scenes.S10.S10_D0_F82_C9.translations.step2.triangleMeasureMethod';
    } else if (featureId === 'plaza') {
      return 'scenes.S10.S10_D0_F82_C9.translations.step2.rectangleMeasureMethod';
    } else if (featureId === 'reservoir') {
      return 'scenes.S10.S10_D0_F82_C9.translations.step2.circleMeasureMethod';
    } else if (featureId === 'ballCourt') {
      return 'scenes.S10.S10_D0_F82_C9.translations.step2.polygonMeasureMethod';
    } else {
      return 'scenes.S10.S10_D0_F82_C9.translations.step2.defaultMeasureMethod';
    }
  },
  translations: {
    canvasDescription: 'scenes.S10.S10_D0_F82_C9.translations.canvasDescription',
    step1: {
      enabled: 'scenes.S10.S10_D0_F82_C9.translations.step1.enabled',
      disabled: 'scenes.S10.S10_D0_F82_C9.translations.step1.disabled',
      mode: 'scenes.S10.S10_D0_F82_C9.translations.step1.mode',
      description: 'scenes.S10.S10_D0_F82_C9.translations.step1.description',
      toggleLays: 'scenes.S10.S10_D0_F82_C9.translations.step1.toggleLays',
      vegetation: 'scenes.S10.S10_D0_F82_C9.translations.step1.vegetation',
      ground: 'scenes.S10.S10_D0_F82_C9.translations.step1.ground',
    },
    step2: {
      mode: 'scenes.S10.S10_D0_F82_C9.translations.step2.mode',
      description: 'scenes.S10.S10_D0_F82_C9.translations.step2.description',
      selectFeature: 'scenes.S10.S10_D0_F82_C9.translations.step2.selectFeature',
      selectedPoints: 'scenes.S10.S10_D0_F82_C9.translations.step2.selectedPoints',
      selectedPointsDescription: 'scenes.S10.S10_D0_F82_C9.translations.step2.selectedPointsDescription',
      measurements: 'scenes.S10.S10_D0_F82_C9.translations.step2.measurements',
      measurementDescription: 'scenes.S10.S10_D0_F82_C9.translations.step2.measurementDescription',
      point: 'scenes.S10.S10_D0_F82_C9.translations.step2.point',
      distance: 'scenes.S10.S10_D0_F82_C9.translations.step2.distance',
      area: 'scenes.S10.S10_D0_F82_C9.translations.step2.area',
      perimeter: 'scenes.S10.S10_D0_F82_C9.translations.step2.perimeter',
      reset: 'scenes.S10.S10_D0_F82_C9.translations.step2.reset',
    },
  },
};

export default interaction;
