const soundLevelConfig = {
  formula: {
    formula: 'scenes.S12.S12_D0_F76_C9.formula.formula',
    for: 'scenes.S12.S12_D0_F76_C9.formula.for',
    identicalSourcesWithLevel: 'scenes.S12.S12_D0_F76_C9.formula.identicalSourcesWithLevel',
    equation: 'scenes.S12.S12_D0_F76_C9.formula.equation',
    equation2: 'scenes.S12.S12_D0_F76_C9.formula.equation2',
  },
  SPEAKER_WIDTH: 4,
  SPEAKER_Y: 20,
  MIN_DB: 80,
  MAX_DB: 100,
  listeners: {
    1: { id: 1, x: 50, y: 46, name: 'scenes.S12.S12_D0_F76_C9.staticText.listener' },
    2: { id: 2, x: 33, y: 63, name: 'scenes.S12.S12_D0_F76_C9.staticText.listener' },
    3: { id: 3, x: 68, y: 63, name: 'scenes.S12.S12_D0_F76_C9.staticText.listener' },
    4: { id: 4, x: 25, y: 85, name: 'scenes.S12.S12_D0_F76_C9.staticText.listener' },
    5: { id: 5, x: 50, y: 85, name: 'scenes.S12.S12_D0_F76_C9.staticText.listener' },
    6: { id: 6, x: 75, y: 85, name: 'scenes.S12.S12_D0_F76_C9.staticText.listener' },
  },
  speakerOptions: {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    6: 6,
    8: 8,
  },
  sliderLabel: 'scenes.S12.S12_D0_F76_C9.sliderLabel',
  combinedSoundLevel: 'scenes.S12.S12_D0_F76_C9.combinedSoundLevel',
  baseLevelPerSpeaker: 'scenes.S12.S12_D0_F76_C9.baseLevelPerSpeaker',
  recommendedAction: 'scenes.S12.S12_D0_F76_C9.recommendedAction',
  levelGuideTitle: 'scenes.S12.S12_D0_F76_C9.levelGuideTitle',
  levelGuide: {
    danger: { label: 'scenes.S12.S12_D0_F76_C9.levelGuide.danger', color: 'bg-[#EB0000]' },
    optimal: { label: 'scenes.S12.S12_D0_F76_C9.levelGuide.optimal', color: 'bg-[#238B21]' },
    low: { label: 'scenes.S12.S12_D0_F76_C9.levelGuide.low', color: 'bg-[#C38504]' },
  },
  exposureLimits: {
    danger: 'scenes.S12.S12_D0_F76_C9.exposureLimits.danger',
    optimal: 'scenes.S12.S12_D0_F76_C9.exposureLimits.optimal',
    low: 'scenes.S12.S12_D0_F76_C9.exposureLimits.low',
  },
  safetyInfo: {
    danger: {
      label: 'scenes.S12.S12_D0_F76_C9.safetyInfo.danger.label',
      description: 'scenes.S12.S12_D0_F76_C9.safetyInfo.danger.description',
      color: 'border-[#EB0000]',
    },
    optimal: {
      label: 'scenes.S12.S12_D0_F76_C9.safetyInfo.optimal.label',
      description: 'scenes.S12.S12_D0_F76_C9.safetyInfo.optimal.description',
      color: 'border-[#238B21]',
    },
    low: {
      label: 'scenes.S12.S12_D0_F76_C9.safetyInfo.low.label',
      description: 'scenes.S12.S12_D0_F76_C9.safetyInfo.low.description',
      color: 'border-[#C38504]',
    },
  },
  staticText: {
    soundLevelUpdatedTo: 'scenes.S12.S12_D0_F76_C9.staticText.soundLevelUpdatedTo',
    with: 'scenes.S12.S12_D0_F76_C9.staticText.with',
    speaker: 'scenes.S12.S12_D0_F76_C9.staticText.speaker',
    speakers: 'scenes.S12.S12_D0_F76_C9.staticText.speakers',
    atPosition: 'scenes.S12.S12_D0_F76_C9.staticText.atPosition',
    set: 'scenes.S12.S12_D0_F76_C9.staticText.set',
    standard: 'scenes.S12.S12_D0_F76_C9.staticText.standard',
    maximum: 'scenes.S12.S12_D0_F76_C9.staticText.maximum',
    stage: 'scenes.S12.S12_D0_F76_C9.staticText.stage',
  },
};

export default soundLevelConfig;
