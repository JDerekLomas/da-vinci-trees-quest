import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'beat-frequency-demo', // Use allowed type for two-frequency audio
  freqInputs: [
    {
      id: 'frequency1',
      type: 'slider',
      label: 'scenes.S5X.S5X_D0_F39_C9.translations.firstFrequency',
      min: 110,
      max: 880,
      value: 220,
      step: 1,
      unit: 'Hz',
    },
    {
      id: 'frequency2',
      type: 'slider',
      label: 'scenes.S5X.S5X_D0_F39_C9.translations.secondFrequency',
      min: 110,
      max: 880,
      value: 330,
      step: 1,
      unit: 'Hz',
    },
  ],
  translations: {
    play: 'scenes.S5X.S5X_D0_F39_C9.translations.play',
    stop: 'scenes.S5X.S5X_D0_F39_C9.translations.stop',
    firstFrequency: 'scenes.S5X.S5X_D0_F39_C9.translations.firstFrequency',
    secondFrequency: 'scenes.S5X.S5X_D0_F39_C9.translations.secondFrequency',
    ratio: 'scenes.S5X.S5X_D0_F39_C9.translations.ratio',
    playSounds: 'scenes.S5X.S5X_D0_F39_C9.translations.playSounds',
    stopSounds: 'scenes.S5X.S5X_D0_F39_C9.translations.stopSounds',
  },
  ratios: {
    unison: {
      name: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.unison.name',
      description: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.unison.description',
      ratio: 1,
    },
    minorSecond: {
      name: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.minorSecond.name',
      description: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.minorSecond.description',
      ratio: 16 / 15,
    },
    majorSecond: {
      name: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.majorSecond.name',
      description: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.majorSecond.description',
      ratio: 9 / 8,
    },
    minorThird: {
      name: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.minorThird.name',
      description: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.minorThird.description',
      ratio: 6 / 5,
    },
    majorThird: {
      name: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.majorThird.name',
      description: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.majorThird.description',
      ratio: 5 / 4,
    },
    perfectFourth: {
      name: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.perfectFourth.name',
      description: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.perfectFourth.description',
      ratio: 4 / 3,
    },
    tritone: {
      name: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.tritone.name',
      description: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.tritone.description',
      ratio: Math.sqrt(2),
    },
    perfectFifth: {
      name: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.perfectFifth.name',
      description: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.perfectFifth.description',
      ratio: 3 / 2,
    },
    minorSeventh: {
      name: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.minorSeventh.name',
      description: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.minorSeventh.description',
      ratio: 16 / 9,
    },
    majorSeventh: {
      name: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.majorSeventh.name',
      description: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.majorSeventh.description',
      ratio: 15 / 8,
    },
    octave: {
      name: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.octave.name',
      description: 'scenes.S5X.S5X_D0_F39_C9.translations.ratios.octave.description',
      ratio: 2,
    },
  },
};

export default interaction;
