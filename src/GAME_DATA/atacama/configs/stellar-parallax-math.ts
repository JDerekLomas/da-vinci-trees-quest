import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  title: '',
  ariaLabel: 'scenes.S7.S7_D0_F57_C9.ariaLabel',
  type: 'stellar-parallax-math',
  parallaxInput: {
    type: 'slider',
    id: 'parallax',
    label: 'scenes.S7.S7_D0_F57_C9.translations.parallax',
    min: 0.001,
    max: 0.5,
    step: 0.001,
    defaultValue: 0.1,
  },
  translations: {
    sun: 'scenes.S7.S7_D0_F57_C9.translations.sun',
    earthPosition1: 'scenes.S7.S7_D0_F57_C9.translations.earthPosition1',
    earthPosition2: 'scenes.S7.S7_D0_F57_C9.translations.earthPosition2',
    star: 'scenes.S7.S7_D0_F57_C9.translations.star',
    distance: 'scenes.S7.S7_D0_F57_C9.translations.distance',
    arcseconds: 'scenes.S7.S7_D0_F57_C9.translations.arcseconds',
    parsecs: 'scenes.S7.S7_D0_F57_C9.translations.parsecs',
    au: 'scenes.S7.S7_D0_F57_C9.translations.au',
    astronomicalUnit: 'scenes.S7.S7_D0_F57_C9.translations.astronomicalUnit',
  },
};

export default interaction;
