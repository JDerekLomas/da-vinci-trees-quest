import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  title: '',
  ariaLabel: 'scenes.S4.S4_D0_F15_C9.ariaLabel',
  type: 'right-angle-triangle-explorer',
  inputs: [
    {
      id: 'angle-30',
      type: 'button',
      defaultValue: 30,
    },
    {
      id: 'angle-45',
      type: 'button',
      defaultValue: 45,
    },
    {
      id: 'angle-60',
      type: 'button',
      defaultValue: 60,
    },
  ],
  translations: {
    angle: 'scenes.S4.S4_D0_F15_C9.translations.angle',
    adjecentSide: 'scenes.S4.S4_D0_F15_C9.translations.adjecentSide',
    oppositeSide: 'scenes.S4.S4_D0_F15_C9.translations.oppositeSide',
    hypotenuse: 'scenes.S4.S4_D0_F15_C9.translations.hypotenuse',
    tanFormula: 'scenes.S4.S4_D0_F15_C9.translations.tanFormula',
    tanFormulaText: 'scenes.S4.S4_D0_F15_C9.translations.tanFormulaText',
  },
};

export default interaction;
