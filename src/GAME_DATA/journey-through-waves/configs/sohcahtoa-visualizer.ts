import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'sohcahtoa-visualizer',
  title: 'scenes.S3X.S3X_D0_F9_C9.title',
  ariaLabel: 'scenes.S3X.S3X_D0_F9_C9.ariaLabel',
  functions: [
    {
      value: 'sine',
      label: 'scenes.S3X.S3X_D0_F9_C9.translations.sine',
      mnemonic: 'SOH',
      formula: 'scenes.S3X.S3X_D0_F9_C9.translations.sineFormula',
    },
    {
      value: 'cosine',
      label: 'scenes.S3X.S3X_D0_F9_C9.translations.cosine',
      mnemonic: 'CAH',
      formula: 'scenes.S3X.S3X_D0_F9_C9.translations.cosineFormula',
    },
    {
      value: 'tangent',
      label: 'scenes.S3X.S3X_D0_F9_C9.translations.tangent',
      mnemonic: 'TOA',
      formula: 'scenes.S3X.S3X_D0_F9_C9.translations.tangentFormula',
    },
  ],
  interactiveConstants: {
    SVG_WIDTH: 400,
    SVG_HEIGHT: 300,
    TRIANGLE_START_X: 50,
    TRIANGLE_START_Y: 250,
    TRIANGLE_END_X: 250,
    TRIANGLE_END_Y: 250,
    ADJACENT_LENGTH: 200,
    FIXED_ANGLE: 35,
  },
  colors: {
    sine: { opposite: '#E0002B', adjacent: '#888888', hypotenuse: '#0061FC' },
    cosine: { opposite: '#888888', adjacent: '#E0002B', hypotenuse: '#0061FC' },
    tangent: { opposite: '#E0002B', adjacent: '#0061FC', hypotenuse: '#888888' },
  },
  translations: {
    opposite: 'scenes.S3X.S3X_D0_F9_C9.translations.opposite',
    adjacent: 'scenes.S3X.S3X_D0_F9_C9.translations.adjacent',
    hypotenuse: 'scenes.S3X.S3X_D0_F9_C9.translations.hypotenuse',
    sineFormula: 'scenes.S3X.S3X_D0_F9_C9.translations.sineFormula',
    cosineFormula: 'scenes.S3X.S3X_D0_F9_C9.translations.cosineFormula',
    tangentFormula: 'scenes.S3X.S3X_D0_F9_C9.translations.tangentFormula',
    selectFunction: 'scenes.S3X.S3X_D0_F9_C9.translations.selectFunction',
  },
};

export default interaction;
