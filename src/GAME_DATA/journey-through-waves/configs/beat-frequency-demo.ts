import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'beat-frequency-demo',
  ariaLabel: 'scenes.S8.S8_D0_F62_C9.translations.ariaLabel',
  freqInputs: [
    {
      id: 'frequency1',
      type: 'slider',
      label: 'scenes.S8.S8_D0_F62_C9.translations.freqLabel1',
      min: 400,
      max: 480,
      value: 440,
      step: 1,
      unit: 'Hz',
    },
    {
      id: 'frequency2',
      type: 'slider',
      label: 'scenes.S8.S8_D0_F62_C9.translations.freqLabel2',
      min: 400,
      max: 480,
      value: 444,
      step: 1,
      unit: 'Hz',
    },
  ],
  translations: {
    play: 'scenes.S8.S8_D0_F62_C9.translations.play',
    pause: 'scenes.S8.S8_D0_F62_C9.translations.pause',
    freqLabel1: 'scenes.S8.S8_D0_F62_C9.translations.freqLabel1',
    freqLabel2: 'scenes.S8.S8_D0_F62_C9.translations.freqLabel2',
    beatfreqLabel: 'scenes.S8.S8_D0_F62_C9.translations.beatfreqLabel',
    description: 'scenes.S8.S8_D0_F62_C9.translations.description',
  },
};

export default interaction;
