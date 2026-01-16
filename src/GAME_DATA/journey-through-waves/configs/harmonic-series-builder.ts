import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'harmonic-series-builder',
  harmonicInputs: [
    {
      id: 'harmonic-1',
      type: 'slider',
      label: 'scenes.S6.S6_D0_F44_C9.translations.harmonic1',
      min: 0,
      max: 1,
      value: 0.5,
      step: 0.01,
      unit: 'Hz',
    },
    {
      id: 'harmonic-2',
      type: 'slider',
      label: 'scenes.S6.S6_D0_F44_C9.translations.harmonic2',
      min: 0,
      max: 1,
      value: 0.5,
      step: 0.01,
      unit: 'Hz',
    },
    {
      id: 'harmonic-3',
      type: 'slider',
      label: 'scenes.S6.S6_D0_F44_C9.translations.harmonic3',
      min: 0,
      max: 1,
      value: 0.5,
      step: 0.01,
      unit: 'Hz',
    },
  ],
  waveTypes: [
    {
      label: 'scenes.S6.S6_D0_F44_C9.translations.customWave',
      value: 'custom',
    },
    {
      label: 'scenes.S6.S6_D0_F44_C9.translations.squareWave',
      value: 'square',
    },
    {
      label: 'scenes.S6.S6_D0_F44_C9.translations.sawtoothWave',
      value: 'sawtooth',
    },
  ],
  harmonicConfig: [
    {
      id: 'h1',
      shape: 'triangle',
      color: '#E0002B',
    },
    {
      id: 'h2',
      shape: 'square',
      color: '#008217',
    },
    {
      id: 'h3',
      shape: 'diamond',
      color: '#8E24AA',
    },
    {
      id: 'total',
      shape: 'circle',
      color: '#0061FC',
    },
  ],
  translations: {
    xAxisLabel: 'scenes.S6.S6_D0_F44_C9.translations.xAxisLabel',
    yAxisLabel: 'scenes.S6.S6_D0_F44_C9.translations.yAxisLabel',
    combinedWaveLabel: "scenes.S6.S6_D0_F44_C9.translations.combinedWaveLabel",
    showCombinedWaveLabel : "scenes.S6.S6_D0_F44_C9.translations.showCombinedWaveLabel",
    waveTypeLabel: 'scenes.S6.S6_D0_F44_C9.translations.waveTypeLabel',
    play: 'scenes.S6.S6_D0_F44_C9.translations.play',
    pause: 'scenes.S6.S6_D0_F44_C9.translations.pause',
  },
};

export default interaction;
