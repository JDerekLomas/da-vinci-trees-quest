import { Interaction } from '../interactives/interface';

const KEY = 'scenes.S3X.S3X_D0_F9_C9.translations';

const interaction: Interaction = {
  type: 'sohcahtoa-visualizer',
  title: 'scenes.S3X.S3X_D0_F9_C9.title',
  ariaLabel: 'scenes.S3X.S3X_D0_F9_C9.ariaLabel',
  angleInput: {
    id: 'sohcahtoa-angle',
    type: 'slider',
    label: `${KEY}.angle`,
    min: 5,
    max: 85,
    value: 35,
    step: 1,
    unit: '°',
  },
  sizeInput: {
    id: 'sohcahtoa-size',
    type: 'slider',
    label: `${KEY}.size`,
    min: 1,
    max: 10,
    value: 5,
    step: 0.5,
  },
  functions: [
    { value: 'sine', label: `${KEY}.sine`, short: `${KEY}.sinShort`, mnemonic: 'SOH' },
    { value: 'cosine', label: `${KEY}.cosine`, short: `${KEY}.cosShort`, mnemonic: 'CAH' },
    { value: 'tangent', label: `${KEY}.tangent`, short: `${KEY}.tanShort`, mnemonic: 'TOA' },
  ],
  colors: {
    opposite: '#E0002B',
    adjacent: '#0061FC',
    hypotenuse: '#8E24AA',
    inactive: '#B0B0B0',
  },
  translations: {
    opposite: `${KEY}.opposite`,
    adjacent: `${KEY}.adjacent`,
    hypotenuse: `${KEY}.hypotenuse`,
    pickRatio: `${KEY}.pickRatio`,
    dragHint: `${KEY}.dragHint`,
    sameRatio: `${KEY}.sameRatio`,
    unitSine: `${KEY}.unitSine`,
    unitCosine: `${KEY}.unitCosine`,
    traceTitle: `${KEY}.traceTitle`,
    traceEmpty: `${KEY}.traceEmpty`,
    clearTrace: `${KEY}.clearTrace`,
    announcement: `${KEY}.announcement`,
  },
};

export default interaction;
