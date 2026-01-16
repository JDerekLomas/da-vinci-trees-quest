const speakerOptimizerConfig = {
  title: 'scenes.S18.S18_D0_F98_C9.title', // "Speaker Distance Optimizer"
  formulas: {
    inverseSquare: {
      label: 'scenes.S18.S18_D0_F98_C9.formulas.inverseSquare.label', // "Formula 1: Inverse Square Law"
      formula: 'scenes.S18.S18_D0_F98_C9.formulas.inverseSquare.formula', // "L₂ = L₁ - 20 * log₁₀(r₂/r₁)"
      ariaLabel: 'scenes.S18.S18_D0_F98_C9.formulas.inverseSquare.ariaLabel', // "L2 equals L1 minus 20 times log base 10 of r2 divided by r1"
    },
    logarithmicAddition: {
      label: 'scenes.S18.S18_D0_F98_C9.formulas.logarithmicAddition.label', // "Formula 2: Logarithmic Addition"
      formula: 'scenes.S18.S18_D0_F98_C9.formulas.logarithmicAddition.formula', // "Lₜₒₜₐₗ = 10 * log₁₀(Σ 10^(Lᵢ/10))"
      ariaLabel: 'scenes.S18.S18_D0_F98_C9.formulas.logarithmicAddition.ariaLabel', // "L total equals 10 times log base 10 of the sum of 10 raised to the power of L i divided by 10"
    },
  },
  sliderLabels: {
    distance: 'scenes.S18.S18_D0_F98_C9.sliderLabels.distance', // "Speaker Distance"
    intensity: 'scenes.S18.S18_D0_F98_C9.sliderLabels.intensity', // "Speaker Sound Intensity (at 1 meter)"
  },
  staticText: {
    stage: 'scenes.S18.S18_D0_F98_C9.staticText.stage', // "Stage"
    selectedPoint: 'scenes.S18.S18_D0_F98_C9.staticText.selectedPoint', // "Selected Point"
    speaker: 'scenes.S18.S18_D0_F98_C9.staticText.speaker', // "Speaker"
    listener: 'scenes.S18.S18_D0_F98_C9.staticText.listener', // "Listener"
    audience: 'scenes.S18.S18_D0_F98_C9.staticText.audience', // "Audience"
    meter: 'scenes.S18.S18_D0_F98_C9.staticText.meter', // "meter"
    simulationArea: 'scenes.S18.S18_D0_F98_C9.staticText.simulationArea', // "Speaker simulation area"
    calculationsHeading: 'scenes.S18.S18_D0_F98_C9.staticText.calculationsHeading', // "Sound Calculations"
    speakerDetails: 'scenes.S18.S18_D0_F98_C9.staticText.speakerDetails', // "Speaker Details"
    soundLevel: 'scenes.S18.S18_D0_F98_C9.staticText.soundLevel', // "Sound Level"
    soundLevelZones: 'scenes.S18.S18_D0_F98_C9.staticText.soundLevelZones', // "Sound Level Zones"
    speakersAt: 'scenes.S18.S18_D0_F98_C9.staticText.speakersAt', // "Speakers at"
    combinedLevel: 'scenes.S18.S18_D0_F98_C9.staticText.combinedLevel', // "Combined Level"
  },
  zones: {
    tooWeak: 'scenes.S18.S18_D0_F98_C9.zones.tooWeak', // "Too Weak: <75 dB"
    optimal: 'scenes.S18.S18_D0_F98_C9.zones.optimal', // "Optimal: 75-95 dB"
    danger: 'scenes.S18.S18_D0_F98_C9.zones.danger', // "Danger Zone: >95 dB"
  },
  dimensions: {
    audienceStartX: 30,
    audienceEndX: 70,
    audienceStartY: 25,
    audienceEndY: 70,
  },
  defaults: {
    speakerDistance: 50,
    sourceLevel: 85,
  },
  wave: {
    count: 5,
    interval: 20,
    scaleFactor: 0.8,
  },
  a11y: {
    instructions: 'scenes.S18.S18_D0_F98_C9.a11y.instructions', // "Use arrow keys to adjust sliders. Press Home or End to set minimum or maximum values."
    sliderStepInfo: 'scenes.S18.S18_D0_F98_C9.a11y.sliderStepInfo', // "Hold Shift with arrow keys for larger steps."
    speakerPositionChange: 'scenes.S18.S18_D0_F98_C9.a11y.speakerPositionChange', // "Speaker positions updated."
    soundLevelChange: 'scenes.S18.S18_D0_F98_C9.a11y.soundLevelChange', // "Sound level updated to"
    distanceAnnouncement: 'scenes.S18.S18_D0_F98_C9.a11y.distanceAnnouncement', // "Distance is now"
    intensityAnnouncement: 'scenes.S18.S18_D0_F98_C9.a11y.intensityAnnouncement', // "Intensity is now"
  },
};

export default speakerOptimizerConfig;
