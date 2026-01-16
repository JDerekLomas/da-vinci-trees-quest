const intensityConfig = {
  title: 'Intensity and Decibel Relationship',
  flipButton: {
    label: 'scenes.S9.S9_D0_F50_C9.flipButton.label',
    icon: 'ArrowRightLeft',
  },
  formulas: {
    intensityToDb: 'dB = 10 * log₁₀(I/I₀)',
    dbToIntensity: 'I = I₀ * 10^(dB/10)',
    intensityToDbAriaLabel: 'scenes.S9.S9_D0_F50_C9.formulas.intensityToDb.ariaLabel', // "dB equals 10 times log base 10 of I divided by I zero"
    dbToIntensityAriaLabel: 'scenes.S9.S9_D0_F50_C9.formulas.dbToIntensity.ariaLabel', // "I equals I zero times 10 raised to the power of dB divided by 10"
  },
  sliders: {
    intensity: {
      label: 'scenes.S9.S9_D0_F50_C9.sliders.intensity.label',
      min: 1,
      max: 100,
      step: 0.5,
      unit: '',
    },
    decibels: {
      label: 'scenes.S9.S9_D0_F50_C9.sliders.decibels.label',
      min: 0,
      max: 20,
      step: 0.1,
      unit: 'dB',
    },
  },
  tooltips: {
    intensity: 'scenes.S9.S9_D0_F50_C9.tooltips.intensity',
    decibels: 'scenes.S9.S9_D0_F50_C9.tooltips.decibels',
  },
  axes: {
    intensityPlain: 'scenes.S9.S9_D0_F50_C9.axes.intensityPlain',
    intensity: 'scenes.S9.S9_D0_F50_C9.axes.intensity',
    decibels: 'scenes.S9.S9_D0_F50_C9.axes.decibels',
  },
  equations: {
    intensity: 'scenes.S9.S9_D0_F50_C9.equations.intensity',
    decibel: 'scenes.S9.S9_D0_F50_C9.equations.decibel',
  },
  dataPoint: 'scenes.S9.S9_D0_F50_C9.dataPoint',
  note: 'scenes.S9.S9_D0_F50_C9.note',
  noteMsg: 'scenes.S9.S9_D0_F50_C9.noteMsg',
  corresponding: 'scenes.S9.S9_D0_F50_C9.corresponding',
  majorTicks: [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
};

export default intensityConfig;
